import {MethodHandler} from "../bean/method-handler";
import {PropertyHandler} from "../bean/property-handler";
import {ClassHandler} from "../bean/class-handler";
import {ParameterHandler} from "../bean/parameter-handler";
import {DecoratorDefinition} from "../type/decoratorDefinition";
import {ClassDefinition} from "../type/classDefinition";
import {ReflectUtil} from "./reflect-util";

/**
 * 构建装饰器工具类
 */
export class MakeDecoratorUtil {

    public static classesMap = new Map<Function, ClassDefinition<any>>();

    public static getParameterPropertyKey(propertyKey: string | symbol, parameterIndex: number) {
        propertyKey = propertyKey ? propertyKey : '&constructor';
        return `${propertyKey.toString()}&${parameterIndex}`;
    }

    /**
     * 创建 可用于所有'目标'(方法参数，属性，方法，类)上的装饰器
     * @param parameterHandler
     * @param propertyHandler
     * @param methodHandler
     * @param classHandler
     * @param defaultOption
     * @param metadataKey
     */
    public static makeDecoratorFactory<O>(
        parameterHandler?: ParameterHandler<O>,
        propertyHandler?: PropertyHandler<O>,
        methodHandler?: MethodHandler<O>,
        classHandler?: ClassHandler<O>,
        defaultOption?: O | ((o: O) => O),
        metadataKey?: string | symbol
    ): any {
        const factory = (option: any) =>
            function a(...args: any[]) {
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
                    return MakeDecoratorUtil.makeClassDecorator<O>(
                        classHandler, metadataKey, factory)(option)(args[0]);
                } else if (args.length === 3) {
                    if (args[2] === undefined) {
                        // 外理属性装饰器
                        return MakeDecoratorUtil.makePropertyDecorator<O>(
                            propertyHandler, metadataKey, factory)(option)(args[0], args[1]);
                    } else {
                        if (typeof args[2] === 'number') {
                            // 处理参数装饰器
                            return MakeDecoratorUtil.makeParameterDecorator<O>(
                                parameterHandler, metadataKey, factory)(option)(args[0], args[1], args[2]);
                        } else {
                            // 处理方法装饰器
                            return MakeDecoratorUtil.makeMethodDecorator<O>(
                                methodHandler, metadataKey, factory)(option)(args[0], args[1], args[2]);
                        }
                    }
                }
            };
        factory.metadataKey = metadataKey;
        return factory;
    }

    /**
     * 创建方法装饰器
     * @param handler
     * @param metadataKey
     * @param factory
     */
    private static makeMethodDecorator<O>(
        handler: MethodHandler<O>,
        metadataKey?: string | symbol,
        factory?: any
    ): (option: O) => MethodDecorator {
        return option =>
            (target, propertyKey, descriptor) => {

                Reflect.defineMetadata(metadataKey, option, target, propertyKey);
                /***********************************************设置methodinfo************************************************/
                this.pushClass(target, {
                    method: {
                        decorator: {
                            type: factory,
                            option
                        },
                        propertyKey
                    }
                });
                if (handler) {
                    const paramTypes = ReflectUtil.getMetadataParamsTypes(target, propertyKey);
                    const returnType = ReflectUtil.getMetadataReturnType(target, propertyKey);
                    return handler(target, <string> propertyKey, descriptor, option, paramTypes, returnType);
                }
                return descriptor;
            };
    }

    /**
     * 保存类的相关信息用于反射
     * @param target
     * @param options
     */
    private static pushClass(target: Object, options: {
        method?: {
            propertyKey: string | symbol;
            decorator?: DecoratorDefinition;
            parameter?: {
                decorator: DecoratorDefinition;
                index: number;
            }
        };
        property?: {
            decorator: DecoratorDefinition;
            propertyKey: string | symbol;
        };
        class?: {
            decorator: DecoratorDefinition;
        };

    }) {
        let isStatic;
        let classType;
        if (target instanceof Function) {
            isStatic = true;
            classType = target;
        } else {
            isStatic = false;
            classType = target.constructor;
        }

        let classInfo: ClassDefinition<Function>;
        if (this.classesMap.has(classType)) {
            classInfo = this.classesMap.get(classType)!;
        } else {
            const paramtypes = ReflectUtil.getMetadataParamsTypes(classType);

            classInfo = {
                decorators: [],
                methods: [],
                properties: [],
                name: classType.name,
                type: classType,
                parameters: paramtypes.map(type => ({
                    decorators: [],
                    type: type
                })),
            };
            this.classesMap.set(classType, classInfo);
        }

        if (options.class) {
            classInfo.decorators.push(options.class.decorator);
        } else if (options.method) {
            if (options.method.propertyKey === undefined) {
                if (options.method.parameter) {
                    if (!classInfo.parameters.length) {
                        const paramtypes = ReflectUtil.getMetadataParamsTypes(classType);
                        classInfo.parameters = paramtypes.map(type => ({
                            decorators: [],
                            type: type
                        }));
                    }
                    const parameter = classInfo.parameters[options.method.parameter.index];
                    parameter.decorators.push(options.method.parameter.decorator);
                }
            } else {
                let method = classInfo.methods.find(method => method.name == options.method!.propertyKey);
                if (!method) {
                    const paramtypes = ReflectUtil.getMetadataParamsTypes(target, options.method.propertyKey);
                    const returntype = ReflectUtil.getMetadataReturnType(target, options.method.propertyKey);
                    method = {
                        name: options.method.propertyKey,
                        decorators: [],
                        returnType: returntype,
                        parameters: paramtypes.map(type => ({
                            decorators: [],
                            type: type
                        })),
                        isStatic
                    };
                    classInfo.methods.push(method);
                }
                if (options.method.decorator) {
                    method.decorators.push(options.method.decorator);
                }

                if (options.method.parameter) {
                    const parameter = method.parameters[options.method.parameter.index];
                    parameter.decorators.push(options.method.parameter.decorator);
                }
            }
        } else if (options.property) {
            let property = classInfo.properties.find(property => property.name == options.property!.propertyKey);
            if (!property) {
                const type = ReflectUtil.getMetadataType(target, options.property.propertyKey);
                property = {
                    type,
                    decorators: [],
                    name: options.property.propertyKey,
                    isStatic
                };
                classInfo.properties.push(property);
            }
            property.decorators.push(options.property.decorator);
        }
    }

    /**
     * 创建属性装饰器工场 不使用metadata
     * @param handler
     * @param metadataKey
     * @param factory
     */

    private static makePropertyDecorator<O>(
        handler?: PropertyHandler<O>,
        metadataKey?: string | symbol,
        factory?: any
    ): (option: O) => PropertyDecorator {
        return option =>
            (target, propertyKey) => {
                Reflect.defineMetadata(metadataKey, option, target, propertyKey);
                /********************************************************************************************************/
                this.pushClass(target, {
                    property: {
                        decorator: {
                            type: factory,
                            option
                        },
                        propertyKey
                    }
                });
                if (handler) {
                    const type = ReflectUtil.getMetadataType(target, propertyKey);
                    handler(target, <string> propertyKey, option, type);
                }
            };
    }

    /**
     * 创建类装饰器
     * @param handler
     * @param metadataKey
     * @param factory
     * @return
     */

    private static makeClassDecorator<O>(
        handler?: ClassHandler<O>,
        metadataKey?: string | symbol,
        factory?: any
    ): (option: O) => ClassDecorator {
        return option =>
            <TFunction extends Function>(target: TFunction) => {
                const paramTypes = ReflectUtil.getMetadataParamsTypes(target);
                Reflect.defineMetadata(metadataKey, option, target);
                this.pushClass(target, {
                    class: {
                        decorator: {
                            type: factory,
                            option
                        }
                    }
                });
                if (handler) {
                    return handler(target, option, paramTypes);
                }
                return target;
            };
    }

    /**
     * 创建方法参数装饰器 为方法定义一个metadata值为 该方法带有此装饰器的参数集合
     * @param handler
     * @param metadataKey
     * @param factory
     */
    private static makeParameterDecorator<O, V = void>(
        handler?: ParameterHandler<O>,
        metadataKey?: string | symbol,
        factory?: any
    ): (option: O) => ParameterDecorator {
        return option =>
            (target, propertyKey, parameterIndex) => {
                const paramtypes = ReflectUtil.getMetadataParamsTypes(target, propertyKey);
                const key = MakeDecoratorUtil.getParameterPropertyKey(propertyKey, parameterIndex);
                Reflect.defineMetadata(metadataKey, option, target, key);
                this.pushClass(target, {
                    method: {
                        parameter: {
                            decorator: {
                                type: factory,
                                // metadataValue,
                                option
                            },
                            index: parameterIndex
                        },
                        propertyKey
                    }
                });

                if (handler) {
                    handler(target, <string> propertyKey, parameterIndex, option, paramtypes[parameterIndex]);
                }
            };
    }
}
