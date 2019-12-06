export type MethodHandler<O> = (<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>, option: O,
                                    paramTypes: Function[], returnType: Function) => TypedPropertyDescriptor<T> | void) | void;
