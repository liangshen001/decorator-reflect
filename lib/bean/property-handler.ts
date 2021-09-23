export type PropertyHandler<O> =( (target: Object, propertyKey: string, option: O, isStatic: boolean, type: Function) => void);
