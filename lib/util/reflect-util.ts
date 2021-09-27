
import {MakeAnnotationUtil} from "./make-annotation-util";
import {ClassDefinition} from "../type/classDefinition";
import {MethodDefinition} from "../type/methodDefinition";
import {PropertyDefinition} from "../type/propertyDefinition";
import {DecoratorDefinition} from "../type/decoratorDefinition";
import {ParameterDefinition} from "../type/parameterDefinition";

export class ReflectUtil {

    public static getClassDefinition<T extends Function>(target: T): ClassDefinition<T> {
        const classDefinition = MakeAnnotationUtil.classesMap.get(target);
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

    public static getMethodDefinition<T extends Function>(target: T, name: string): MethodDefinition | undefined {
        let classDefinition = ReflectUtil.getClassDefinition(target);
        return classDefinition.methods.find(i => i.name === name);
    }

    public static getParameterDefinitionForClass<T extends Function>(target: T, index: number): ParameterDefinition | undefined {
        let classDefinition = ReflectUtil.getClassDefinition(target);
        return classDefinition.parameters.find((i, _index) => index === _index);
    }

    public static getPropertyDefinition<T extends Function>(target: T, name: string): PropertyDefinition | undefined {
        let classDefinition = ReflectUtil.getClassDefinition(target);
        return classDefinition.properties.find(i => i.name === name);
    }

    public static getParameterDefinitionForMethod<T extends Function>(target: T, name: string, index: number): ParameterDefinition | undefined {
        let methodDefinition = ReflectUtil.getMethodDefinition(target, name);
        return methodDefinition?.parameters.find((i, _index) => index === _index);
    }

    public static getDecoratorDefinitionForClass<T extends Function>(target: T, decorator: Function): DecoratorDefinition | undefined {
        let classDefinition = ReflectUtil.getClassDefinition(target);
        return classDefinition.decorators.find(i => i.type === decorator);
    }

    public static getDecoratorDefinitionForMethod<T extends Function>(target: T, name: string, decorator: Function): DecoratorDefinition | undefined {
        let methodDefinition = ReflectUtil.getMethodDefinition(target, name);
        return methodDefinition?.decorators.find(i => i.type === decorator);
    }

    public static getDecoratorDefinitionForProperty<T extends Function>(target: T, name: string, decorator: Function): DecoratorDefinition | undefined {
        let methodDefinition = ReflectUtil.getPropertyDefinition(target, name);
        return methodDefinition?.decorators.find(i => i.type === decorator);
    }

    public static getDecoratorDefinitionForMethodParameter<T extends Function>(target: T, name: string, index: number, decorator: Function): DecoratorDefinition | undefined {
        let parameterDefinitionForMethod = ReflectUtil.getParameterDefinitionForMethod(target, name, index);
        return parameterDefinitionForMethod?.decorators.find(i => i.type === decorator);
    }

    public static getAnnotationDefinitionForClassParameter<T extends Function>(target: T, index: number, decorator: Function): DecoratorDefinition | undefined {
        let parameterDefinitionForClass = ReflectUtil.getParameterDefinitionForClass(target, index);
        return parameterDefinitionForClass?.decorators.find(i => i.type === decorator);
    }
}

