
export type ClassHandler<O> = (<TFunction extends Function>(target: TFunction, option: O, paramTypes: Function[]) => (TFunction | void));
