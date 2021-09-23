import {MethodHandler} from "../bean/method-handler";
import {PropertyHandler} from "../bean/property-handler";
import {ClassHandler} from "../bean/class-handler";
import {ParameterHandler} from "../bean/parameter-handler";
import {AnnotationDefinition} from "../type/annotationDefinition";
import {ClassDefinition} from "../type/classDefinition";
import {ReflectMetadataUtil} from "./reflect-metadata-util";

/**
 * 构建装饰器工具类
 */
export class MakeAnnotationUtil {

    public static classesMap = new Map<Function, ClassDefinition<any>>();

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
            if (args[2] === undefined) {
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
        const decoratorFactory = (option?: any) => {
            // // 装饰器工场无参时可省略()  但是类装饰器工场的第一个参数将不能为function类型 否则会断定为无参类型进而报错，停用
            // if (params.length === 1 && typeof params[0] === 'function') {
            //     return this.makeDecorator(params, decoratorFactory, undefined, parameterHandler,
            //         propertyHandler, methodHandler, classHandler, defaultOption, metadataKey)
            // }
            return (...args: any[]) => {
                return this.makeDecorator(args, decoratorFactory, option, parameterHandlers, propertyHandlers,
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
                this.pushClass(target, {
                    method: {
                        decorator: {
                            type: factory,
                            option
                        },
                        propertyKey
                    }
                });
                if (handlers.length) {
                    const paramTypes = ReflectMetadataUtil.getParamsTypes(target, propertyKey);
                    const returnType = ReflectMetadataUtil.getReturnType(target, propertyKey);
                    return handlers.reduce((p, v) => {
                        const p2 = v(target, <string> propertyKey, p, option, typeof target === 'function', paramTypes, returnType);
                        return p2 || p;
                    }, descriptor);
                }
                // if (handler) {
                //     const paramTypes = ReflectMetadataUtil.getParamsTypes(target, propertyKey);
                //     const returnType = ReflectMetadataUtil.getReturnType(target, propertyKey);
                //     return handler(target, <string> propertyKey, descriptor, option, paramTypes, returnType);
                // }
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
            decorator?: AnnotationDefinition;
            parameter?: {
                decorator: AnnotationDefinition;
                index: number;
            }
        };
        property?: {
            decorator: AnnotationDefinition;
            propertyKey: string | symbol;
        };
        class?: {
            decorator: AnnotationDefinition;
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
            const paramtypes = ReflectMetadataUtil.getParamsTypes(classType);

            classInfo = {
                annotations: [],
                methods: [],
                properties: [],
                name: classType.name,
                type: classType,
                parameters: paramtypes.map(type => ({
                    annotations: [],
                    type: type
                })),
            };
            this.classesMap.set(classType, classInfo);
        }

        if (options.class) {
            classInfo.annotations.push(options.class.decorator);
        } else if (options.method) {
            if (options.method.propertyKey === undefined) {
                if (options.method.parameter) {
                    if (!classInfo.parameters.length) {
                        const paramtypes = ReflectMetadataUtil.getParamsTypes(classType);
                        classInfo.parameters = paramtypes.map(type => ({
                            annotations: [],
                            type: type
                        }));
                    }
                    const parameter = classInfo.parameters[options.method.parameter.index];
                    parameter.annotations.push(options.method.parameter.decorator);
                }
            } else {
                let method = classInfo.methods.find(method => method.name == options.method!.propertyKey);
                if (!method) {
                    const paramtypes = ReflectMetadataUtil.getParamsTypes(target, options.method.propertyKey);
                    const returntype = ReflectMetadataUtil.getReturnType(target, options.method.propertyKey);
                    method = {
                        name: options.method.propertyKey,
                        annotations: [],
                        returnType: returntype,
                        parameters: paramtypes.map(type => ({
                            annotations: [],
                            type: type
                        })),
                        isStatic
                    };
                    classInfo.methods.push(method);
                }
                if (options.method.decorator) {
                    method.annotations.push(options.method.decorator);
                }

                if (options.method.parameter) {
                    const parameter = method.parameters[options.method.parameter.index];
                    parameter.annotations.push(options.method.parameter.decorator);
                }
            }
        } else if (options.property) {
            let property = classInfo.properties.find(property => property.name == options.property!.propertyKey);
            if (!property) {
                const type = ReflectMetadataUtil.getType(target, options.property.propertyKey);
                property = {
                    type,
                    annotations: [],
                    name: options.property.propertyKey,
                    isStatic
                };
                classInfo.properties.push(property);
            }
            property.annotations.push(options.property.decorator);
        }
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
                this.pushClass(target, {
                    property: {
                        decorator: {
                            type: factory,
                            option
                        },
                        propertyKey
                    }
                });
                if (handlers.length) {
                    const type = ReflectMetadataUtil.getType(target, propertyKey);
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
                this.pushClass(target, {
                    class: {
                        decorator: {
                            type: decorator,
                            option
                        }
                    }
                });

                if (handlers.length) {
                    const paramTypes = ReflectMetadataUtil.getParamsTypes(target);
                    return handlers.reduce((p, v) => {
                        const p2 = (<any>v)(p, option, paramTypes);
                        return p2 || p;
                    }, target)
                }
                return target;
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

                if (handlers.length) {
                    const paramTypes = ReflectMetadataUtil.getParamsTypes(target, propertyKey);
                    handlers.forEach(handler => {
                        handler(target, <string> propertyKey, parameterIndex, option, paramTypes[parameterIndex]);
                    });
                    // return handlers.reduce((p, v) => {
                    //     const p2 = v(target, <string> propertyKey, p, option, paramTypes, returnType);
                    //     return p2 || p;
                    // }, descriptor);
                }

                // if (handler) {
                //     handler(target, <string> propertyKey, parameterIndex, option, paramtypes[parameterIndex]);
                // }
            };
    }
}
