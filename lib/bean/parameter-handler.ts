export type ParameterHandler<V, OPA> =
    ((option: OPA, target: Object, propertyKey: string, parameterIndex: number, type: Function) => V) | void;
