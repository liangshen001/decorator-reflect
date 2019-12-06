import 'reflect-metadata';
import {MakeDecoratorUtil} from "./make-decorator-util";
import {ClassDefinition} from "../type/classDefinition";

export class ReflectUtil {

    public static getClassDefinition<T extends Function>(target: T): ClassDefinition<T> {
        const classDefinition = MakeDecoratorUtil.classesMap.get(target);
        if (classDefinition) {
            return classDefinition;
        }
        return {
            type: target,
            name: target.name,
            parameters: [],
            methods: [],
            decorators: [],
            properties: []
        }
    }

    public static getMetadataParamsTypes(target: Function): Function[];
    public static getMetadataParamsTypes(target: Object, propertyKey: string | symbol): Function[];
    public static getMetadataParamsTypes(target: Object | Function, propertyKey?: string | symbol): Function[] {
        if (propertyKey === undefined) {
            return Reflect.getMetadata('design:paramtypes', target) || [];
        }
        return Reflect.getMetadata('design:paramtypes', target, propertyKey) || [];
    }
    public static getMetadataReturnType(target: Object, propertyKey: string | symbol): Function {
        return Reflect.getMetadata('design:returntype', target, propertyKey);
    }

    public static getMetadataType(target: Object, propertyKey: string | symbol): Function {
        return Reflect.getMetadata('design:type', target, propertyKey);
    }
}

