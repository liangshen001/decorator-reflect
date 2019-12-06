export type ParameterHandler<O> =
    ((target: Object, propertyKey: string, parameterIndex: number, option: O, type: Function) => void) | void;
