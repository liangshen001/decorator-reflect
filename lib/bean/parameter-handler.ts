export type ParameterHandler<O> =
    ((option: O, target: Object, propertyKey: string, parameterIndex: number, type: Function) => void) | void;
