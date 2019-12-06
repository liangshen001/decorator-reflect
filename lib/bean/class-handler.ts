
export type ClassHandler<O> =
    (<TFunction extends Function>(option: O, target: TFunction, paramTypes: Function[]) => void) | void;
