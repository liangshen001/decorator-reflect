import {MethodDefinition} from "../type/method-definition";

export type MethodHandler<O> = ((target: Object, propertyKey: string, descriptor: PropertyDescriptor,
                                    option: O, definition: MethodDefinition) => PropertyDescriptor | void);
