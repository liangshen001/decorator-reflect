import {MethodHandler} from "../bean/method-handler";
import {PropertyHandler} from "../bean/property-handler";
import {ClassHandler} from "../bean/class-handler";
import {ParameterHandler} from "../bean/parameter-handler";
import {Decorator} from "../type/decorator";
import {Class} from "../type/class";

export class MakeDecoratorUtil {


    public static classesMap = new Map<Object, Class>();

    public static getParameterPropertyKey(propertyKey: string | undefined, parameterIndex: number) {
        propertyKey = propertyKey ? propertyKey : '&constructor';
        return `${propertyKey}&${parameterIndex}`;
    }

    /**
     * 创建 可用于所有'目标'(方法参数，属性，方法，类)上的装饰器
     * @param parameterHandler
     * @param propertyHandler
     * @param methodHandler
     * @param classHandler
     * @param metadataKey
     */
    public static makeParameterAndPropertyAndMethodAndClassDecorator<O>(
        parameterHandler?: ParameterHandler<O>,
        propertyHandler?: PropertyHandler<O>,
        methodHandler?: MethodHandler<O>,
        classHandler?: ClassHandler<O>,
        defaultOption?: O | ((o: O) => O),
        metadataKey?: string | symbol
    ): any {
        const factory = (option: any) =>
            (...args: any[]) => {
                // 默认值
                if (defaultOption) {
                    if (defaultOption instanceof Function) {
                        option = defaultOption(option);
                    } else if (!option) {
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
                const paramtypes = Reflect.getMetadata('design:paramtypes', target, propertyKey) || [];
                const returntype = Reflect.getMetadata('design:returntype', target, propertyKey);

                let metadataValue;
                if (handler) {
                    metadataValue = (<any>handler)(option, target, propertyKey, descriptor, paramtypes, returntype);
                    if (metadataValue === undefined) {
                        metadataValue = true;
                    }
                } else {
                    metadataValue = option || true;
                }
                Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
                /***********************************************设置methodinfo************************************************/
                this.pushClass(target, {
                    method: {
                        decorator: {
                            decoratorFactory: factory,
                            metadataValue,
                            option
                        },
                        propertyKey
                    }
                });
                return descriptor;
            };
    }

    /**
     * 保存类的相关信息用于反射
     * @param target
     * @param options
     */
    private static pushClass(target: object, options: {
        method?: {
            propertyKey: string | symbol;
            decorator?: Decorator;
            parameter?: {
                decorator: Decorator;
                index: number;
            }
        };
        property?: {
            decorator: Decorator;
            propertyKey: string | symbol;
        };
        class?: {
            decorator: Decorator;
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

        let classInfo: Class;
        if (this.classesMap.has(classType)) {
            classInfo = this.classesMap.get(classType)!;
        } else {
            const paramtypes: Function[] = Reflect.getMetadata('design:paramtypes', classType) || [];

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
                        const paramtypes: Function[] = Reflect.getMetadata('design:paramtypes', classType) || [];
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
                    const paramtypes: Function[] = Reflect.getMetadata('design:paramtypes', target, options.method.propertyKey) || [];
                    const returntype: Function = Reflect.getMetadata('design:returntype', target, options.method.propertyKey);
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
                const type = Reflect.getMetadata('design:type', target, options.property.propertyKey);
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
                const type = Reflect.getMetadata('design:type', target, propertyKey);
                let metadataValue;
                if (handler) {
                    metadataValue = (<any>handler)(option, target, propertyKey, type);
                    if (metadataValue === undefined) {
                        metadataValue = true;
                    }
                } else {
                    metadataValue = option || true;
                }
                Reflect.defineMetadata(metadataKey, option, target, propertyKey);
                /********************************************************************************************************/
                this.pushClass(target, {
                    property: {
                        decorator: {
                            decoratorFactory: factory,
                            option
                        },
                        propertyKey
                    }
                });
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
                const paramtypes = Reflect.getMetadata('design:paramtypes', target) || [];
                let metadataValue;
                if (handler) {
                    metadataValue = (<any>handler)(option, target, paramtypes);
                    if (metadataValue === undefined) {
                        metadataValue = true;
                    }
                } else {
                    metadataValue = option || true;
                }
                Reflect.defineMetadata(metadataKey, metadataValue, target);
                this.pushClass(target, {
                    class: {
                        decorator: {
                            decoratorFactory: factory,
                            metadataValue,
                            option
                        }
                    }
                });
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
                const paramtypes = Reflect.getMetadata('design:paramtypes', target, propertyKey) || [];
                const key = MakeDecoratorUtil.getParameterPropertyKey(<any>propertyKey, parameterIndex);
                let metadataValue;
                if (handler) {
                    metadataValue = (<any>handler)(option, target, propertyKey, parameterIndex, paramtypes[parameterIndex]);
                    if (metadataValue === undefined) {
                        metadataValue = true;
                    }
                } else {
                    metadataValue = option || true;
                }
                Reflect.defineMetadata(metadataKey, metadataValue, target, key);
                this.pushClass(target, {
                    method: {
                        parameter: {
                            decorator: {
                                decoratorFactory: factory,
                                metadataValue,
                                option
                            },
                            index: parameterIndex
                        },
                        propertyKey
                    }
                });
            };
    }
}
