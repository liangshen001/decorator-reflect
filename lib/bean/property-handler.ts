export type PropertyHandler<O> =
    ((target: Object, propertyKey: string, option: O, type: Function) => void) | void;
