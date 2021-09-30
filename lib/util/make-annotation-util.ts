import {MethodHandler} from "../bean/method-handler";
import {PropertyHandler} from "../bean/property-handler";
import {ClassHandler} from "../bean/class-handler";
import {ParameterHandler} from "../bean/parameter-handler";
import {DecoratorDefinition} from "../type/decorator-definition";
import {ClassDefinition} from "../type/class-definition";
import {ReflectMetadataUtil} from "./reflect-metadata-util";
import {MethodDefinition} from "../type/method-definition";
import {ParameterDefinition} from "../type/parameter-definition";
import {PropertyDefinition} from "../type/property-definition";
import {ReflectUtil} from "./reflect-util";

/**
 * 构建装饰器工具类
 */
export class MakeAnnotationUtil {

    public static getParameterPropertyKey(propertyKey: string | symbol, parameterIndex: number) {
        propertyKey = propertyKey ? propertyKey : '&constructor';
        return `${propertyKey.toString()}&${parameterIndex}`;
    }

    static makeDecorator<O>(
        args: any[],
        decoratorFactory: any,
        option: any,
        parameterHandlers: ParameterHandler<O>[],
        propertyHandlers: PropertyHandler<O>[],
        methodHandlers: MethodHandler<O>[],
        classHandlers: ClassHandler<O>[],
        defaultOption?: O | ((o: O) => O),
        metadataKey?: string | symbol
    ) {
        // 默认值
        if (defaultOption) {
            if (defaultOption instanceof Function) {
                option = defaultOption(option);
            } else if (option === undefined) {
                option = defaultOption;
            }
        }
        // args 参数为装饰器 回调参数 不同种类的装饰器有不同的参数
        if (args.length === 1) {
            // 处理类装饰器
            return MakeAnnotationUtil.makeClassDecorator<O>(
                classHandlers, metadataKey, decoratorFactory)(option)(args[0]);
        } else if (args.length === 3) {
            //      || 这里babel propertyDecorator有第三个参数 有值 值中有initializer属性 因为适配
            if (args[2] === undefined || args[2].initializer) {
                // 外理属性装饰器
                return MakeAnnotationUtil.makePropertyDecorator<O>(
                    propertyHandlers, metadataKey, decoratorFactory)(option)(args[0], args[1]);
            } else {
                if (typeof args[2] === 'number') {
                    // 处理参数装饰器
                    return MakeAnnotationUtil.makeParameterDecorator<O>(
                        parameterHandlers, metadataKey, decoratorFactory)(option)(args[0], args[1], args[2]);
                } else {
                    // 处理方法装饰器
                    return MakeAnnotationUtil.makeMethodDecorator<O>(
                        methodHandlers, metadataKey, decoratorFactory)(option)(args[0], args[1], args[2]);
                }
            }
        }
    }

    /**
     * 创建 可用于所有'目标'(方法参数，属性，方法，类)上的装饰器
     * @param parameterHandlers
     * @param propertyHandlers
     * @param methodHandlers
     * @param classHandlers
     * @param defaultOption
     * @param metadataKey
     */
    public static makeDecoratorFactory<O>(
        parameterHandlers: ParameterHandler<O>[],
        propertyHandlers: PropertyHandler<O>[],
        methodHandlers: MethodHandler<O>[],
        classHandlers: ClassHandler<O>[],
        defaultOption?: O | ((o: O) => O),
        metadataKey?: string | symbol
    ): any {
        const decoratorFactory = (...params: any[]) => {
            // // 装饰器工场无参时可省略()  但是类装饰器工场的第一个参数将不能为function类型 否则会断定为无参类型进而报错，停用
            if (params.length > 1) {
                return this.makeDecorator(params, decoratorFactory, undefined, parameterHandlers,
                    propertyHandlers, methodHandlers, classHandlers, defaultOption, metadataKey)
            }
            return (...args: any[]) => {
                return this.makeDecorator(args, decoratorFactory, params[0], parameterHandlers, propertyHandlers,
                    methodHandlers, classHandlers, defaultOption, metadataKey)
            }
        };
        decoratorFactory.metadataKey = metadataKey;
        return decoratorFactory;
    }

    /**
     * 创建方法装饰器
     * @param handlers
     * @param metadataKey
     * @param factory
     */
    private static makeMethodDecorator<O>(
        handlers: MethodHandler<O>[],
        metadataKey?: string | symbol,
        factory?: any
    ): (option: O) => MethodDecorator {
        return option =>
            (target, propertyKey, descriptor) => {

                Reflect.defineMetadata(metadataKey, option, target, propertyKey);
                /***********************************************设置methodinfo************************************************/
                const paramTypes = ReflectMetadataUtil.getParamsTypes(target, propertyKey);
                const returnType = ReflectMetadataUtil.getReturnType(target, propertyKey);

                const classInfo = ReflectUtil.getDefinition(target);

                let method = classInfo.methods.find(method => method.name === propertyKey);
                if (!method) {
                    method = classInfo.addMethod(target, propertyKey, paramTypes, returnType);
                }
                method.addDecorator(new DecoratorDefinition(factory, option));

                return handlers.reduce((p, v) => {
                    const p2 = v(target, <string>propertyKey, p, option, target instanceof Function, paramTypes, returnType);
                    return p2 || p;
                }, descriptor);
            };
    }

    /**
     * 创建属性装饰器工场 不使用metadata
     * @param handlers
     * @param metadataKey
     * @param factory
     */
    private static makePropertyDecorator<O>(
        handlers: PropertyHandler<O>[],
        metadataKey?: string | symbol,
        factory?: any
    ): (option: O) => PropertyDecorator {
        return option =>
            (target, propertyKey) => {
                Reflect.defineMetadata(metadataKey, option, target, propertyKey);
                /********************************************************************************************************/
                const type = ReflectMetadataUtil.getType(target, propertyKey);
                const classInfo = ReflectUtil.getDefinition(target);
                let property = classInfo.properties.find(property => property.name == propertyKey);
                if (!property) {
                    property = classInfo.addProperty(target, propertyKey, type);
                }
                property.addDecorator(new DecoratorDefinition(factory, option));

                if (handlers.length) {
                    handlers.forEach(handler => {
                        handler(target, <string>propertyKey, option, typeof target === 'function', type);
                    });
                }
            };
    }

    /**
     * 创建类装饰器
     * @param handlers
     * @param metadataKey
     * @param decorator
     * @return
     */

    private static makeClassDecorator<O>(
        handlers: ClassHandler<O>[],
        metadataKey?: string | symbol,
        decorator?: any
    ): (option: O) => ClassDecorator {
        return option =>
            <TFunction extends Function>(target: TFunction) => {
                Reflect.defineMetadata(metadataKey, option, target);
                const paramTypes = ReflectMetadataUtil.getParamsTypes(target);

                const classInfo = ReflectUtil.getDefinition(target);
                classInfo.addDecorator(new DecoratorDefinition(decorator, option));
                classInfo.resetParameters(paramTypes);

                return handlers.reduce((p, v) => {
                    const p2 = v(p, option, paramTypes);
                    return p2 || p;
                }, target)
            };
    }

    /**
     * 创建方法参数装饰器 为方法定义一个metadata值为 该方法带有此装饰器的参数集合
     * @param handlers
     * @param metadataKey
     * @param factory
     */
    private static makeParameterDecorator<O, V = void>(
        handlers: ParameterHandler<O>[],
        metadataKey?: string | symbol,
        factory?: any
    ): (option: O) => ParameterDecorator {
        return option =>
            (target, propertyKey, parameterIndex) => {
                const key = MakeAnnotationUtil.getParameterPropertyKey(propertyKey, parameterIndex);
                Reflect.defineMetadata(metadataKey, option, target, key);

                const paramTypes = ReflectMetadataUtil.getParamsTypes(target, propertyKey);
                const returnType = ReflectMetadataUtil.getReturnType(target, propertyKey);

                const classInfo = ReflectUtil.getDefinition(target);
                const decoratorDefinition = new DecoratorDefinition(factory, option);
                if (propertyKey === undefined) {
                    classInfo.resetParameters(paramTypes);
                    classInfo.setParameterDecorator(parameterIndex, decoratorDefinition);
                } else {
                    let method = classInfo.methods.find(method => method.name === propertyKey);
                    if (!method) {
                        method = classInfo.addMethod(target, propertyKey, paramTypes, returnType);
                    }
                    method.setParameterDecorator(parameterIndex, decoratorDefinition);
                }

                handlers.forEach(handler => {
                    handler(target, <string>propertyKey, parameterIndex, option, paramTypes && paramTypes[parameterIndex]);
                });
                // return handlers.reduce((p, v) => {
                //     const p2 = v(target, <string> propertyKey, p, option, paramTypes, returnType);
                //     return p2 || p;
                // }, descriptor);

                // if (handler) {
                //     handler(target, <string> propertyKey, parameterIndex, option, paramtypes[parameterIndex]);
                // }
            };
    }
}
