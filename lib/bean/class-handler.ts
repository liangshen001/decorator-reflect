
export type ClassHandler<V, OC> =
    (<TFunction extends Function>(option: OC, target: TFunction, paramTypes: Function[]) => V) | void;
