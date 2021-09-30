export class ReflectMetadataUtil {

    public static getParamsTypes(target: Function): Function[];
    public static getParamsTypes(target: Object, propertyKey: string | symbol): Function[];
    public static getParamsTypes(target: Object | Function, propertyKey?: string | symbol): Function[] {
        if (propertyKey === undefined) {
            return Reflect.getMetadata('design:paramtypes', target);
        }
        return Reflect.getMetadata('design:paramtypes', target, propertyKey) || [];
    }
    public static getReturnType(target: Object, propertyKey: string | symbol): Function {
        return Reflect.getMetadata('design:returntype', target, propertyKey);
    }

    public static getType(target: Object, propertyKey: string | symbol): Function {
        return Reflect.getMetadata('design:type', target, propertyKey);
    }
}
