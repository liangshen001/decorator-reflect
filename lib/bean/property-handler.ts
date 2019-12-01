export type PropertyHandler<V, OP> =
    ((option: OP, target: Object, propertyKey: string, type: Function) => V) | void;
