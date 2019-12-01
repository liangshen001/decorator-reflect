import 'reflect-metadata';
import {DecoratorFactory} from "../bean/decorator-factory";
import {MakeDecoratorUtil} from "./make-decorator-util";
import {Constructor} from "../bean/constructor";

/**
 * 提供一系列创建 装饰器的工场方法
 * 如果参数为空 小括号必须写 不在支持 不写小括号 '()'
 */
export class DecoratorUtil {
    constructor() {}

    public static getMetadata<V>(metadataInfo: DecoratorFactory<V>, target: Object, propertyKey?: string, parameterIndex?: number)
        : (V extends void ? true : V) | undefined {
        if (propertyKey) {
            if (parameterIndex === undefined) {
                return <any> Reflect.getMetadata(metadataInfo.metadataKey, target, propertyKey);
            }
            const key = MakeDecoratorUtil.getParameterPropertyKey(propertyKey, parameterIndex);
            return <any> Reflect.getMetadata(metadataInfo.metadataKey, target, key);
        }
        return <any> Reflect.getMetadata(metadataInfo.metadataKey, target);
    }

    public static getProperties(target: Object): [string | symbol, Function][] {
        let _isStatic: boolean;
        let classType: Function;

        if (target instanceof Function) {
            _isStatic = true;
            classType = target;
        } else {
            _isStatic = false;
            classType = target.constructor;
        }
        const class$ = MakeDecoratorUtil.classesMap.get(classType);

        if (class$) {
            return class$.properties.filter(({isStatic}) => isStatic === _isStatic).map(({name, type}) => [name, type])
        }
        return [];
    }

    public static getMethods(target: Object): [string | symbol, Function[], Function][] {
        let _isStatic: boolean;
        let classType: Function;

        if (target instanceof Function) {
            _isStatic = true;
            classType = target;
        } else {
            _isStatic = false;
            classType = target.constructor;
        }
        const class$ = MakeDecoratorUtil.classesMap.get(classType);
        if (class$) {
            return class$.methods.filter(({isStatic}) => isStatic === _isStatic).map(({name, parameters, returnType}) => [name, parameters.map(({type}) => type), returnType])
        }
        return [];
    }
    public static getConstructorParamTypes(target: Object): Function[] {
        return Reflect.getMetadata("design:paramtypes", target);
    }
}
