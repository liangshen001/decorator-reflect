export type MethodHandler<V, OM> = (<T>(option: OM, target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>,
                                        paramTypes: Function[], returnType: Function) => V) | void;
