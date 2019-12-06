export type PropertyHandler<O> =
    ((option: O, target: Object, propertyKey: string, type: Function) => void) | void;
