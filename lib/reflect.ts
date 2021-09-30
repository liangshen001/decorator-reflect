import {ClassDefinition} from "./type/class-definition";
import {MethodDefinition} from "./type/method-definition";
import {ParameterDefinition} from "./type/parameter-definition";
import {PropertyDefinition} from "./type/property-definition";
import {DecoratorDefinition} from "./type/decorator-definition";
import {ReflectUtil} from "./util/reflect-util";
import {Annotation} from "./bean/annotation";

export namespace Reflect {
    /**
     * 获取类定义
     * @param target
     */
    export declare function getClassDefinition<T extends Function>(target: T): ClassDefinition<T>;

    /**
     * 获取指定方法的定义
     * @param target
     * @param name
     */
    export declare function getMethodDefinition<T extends Function>(target: T, name: string): MethodDefinition | undefined;

    /**
     * 获取类的构造器指定参数的定义
     * @param target
     * @param index
     */
    export declare function getParameterDefinitionForClass<T extends Function>(target: T, index: number): ParameterDefinition | undefined;

    /**
     * 获取指定属性定义
     * @param target
     * @param name
     */
    export declare function getPropertyDefinition<T extends Function>(target: T, name: string): PropertyDefinition | undefined;

    /**
     * 获取类指定方法的指定参数的定义
     * @param target
     * @param name
     * @param index
     */
    export declare function getParameterDefinitionForMethod<T extends Function>(target: T, name: string, index: number): ParameterDefinition | undefined;

    /**
     * 获取类的指定装饰器的定义
     * @param target
     * @param decorator
     */
    export declare function getDecoratorDefinitionForClass<T extends Function>(target: T, decorator: Function): DecoratorDefinition | undefined;

    /**
     * 获取指定方法的指定装饰器的定义
     * @param target
     * @param name
     * @param decorator
     */
    export declare function getDecoratorDefinitionForMethod<T extends Function>(target: T, name: string, decorator: Function): DecoratorDefinition | undefined;

    /**
     * 获取指定属性的指定装饰器的定义
     * @param target
     * @param name
     * @param decorator
     */
    export declare function getDecoratorDefinitionForProperty<T extends Function>(target: T, name: string, decorator: Function): DecoratorDefinition | undefined;

    /**
     * 获取指定方法参数的指定装饰器的定义
     * @param target
     * @param name
     * @param index
     * @param decorator
     */
    export declare function getDecoratorDefinitionForMethodParameter<T extends Function>(target: T, name: string, index: number, decorator: Function): DecoratorDefinition | undefined;

    /**
     * 获取类构造器指定参数的指定装饰器的定义
     * @param target
     * @param index
     * @param decorator
     */
    export declare function getDecoratorDefinitionForClassParameter<T extends Function>(target: T, index: number, decorator: Function): DecoratorDefinition | undefined;

    declare const global: any;
    (function (this: any, factory: (exporter: <K extends keyof typeof Reflect>(key: K, value: typeof Reflect[K]) => void) => void) {
        const root = typeof global === "object" ? global :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();

        let exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }

        factory(exporter);

        function makeExporter(target: typeof Reflect, previous?: <K extends keyof typeof Reflect>(key: K, value: typeof Reflect[K]) => void) {
            return <K extends keyof typeof Reflect>(key: K, value: typeof Reflect[K]) => {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value });
                }
                if (previous) previous(key, value);
            };
        }
    })
    (function (exporter) {
        exporter('getClassDefinition', ReflectUtil.getClassDefinition)
        exporter('getMethodDefinition', ReflectUtil.getMethodDefinition)
        exporter('getParameterDefinitionForClass', ReflectUtil.getParameterDefinitionForClass)
        exporter('getPropertyDefinition', ReflectUtil.getPropertyDefinition)
        exporter('getParameterDefinitionForMethod', ReflectUtil.getParameterDefinitionForMethod)
        exporter('getDecoratorDefinitionForClass', ReflectUtil.getDecoratorDefinitionForClass)
        exporter('getDecoratorDefinitionForMethod', ReflectUtil.getDecoratorDefinitionForMethod)
        exporter('getDecoratorDefinitionForProperty', ReflectUtil.getDecoratorDefinitionForProperty)
        exporter('getDecoratorDefinitionForMethodParameter', ReflectUtil.getDecoratorDefinitionForMethodParameter)
        exporter('getDecoratorDefinitionForClassParameter', ReflectUtil.getAnnotationDefinitionForClassParameter)
    });
}



