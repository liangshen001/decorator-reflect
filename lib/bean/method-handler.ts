export type MethodHandler<O> = ((target: Object, propertyKey: string, descriptor: PropertyDescriptor,
                                    option: O, isStatic: boolean, paramTypes: Function[], returnType: Function) => PropertyDescriptor | void);
