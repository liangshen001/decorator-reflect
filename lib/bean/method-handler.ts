export type MethodHandler<O> = (<T>(option: O, target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>,
                                        paramTypes: Function[], returnType: Function) => void) | void;
