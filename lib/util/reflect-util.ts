
import {MakeAnnotationUtil} from "./make-annotation-util";
import {ClassDefinition} from "../type/classDefinition";
import {MethodDefinition} from "../type/methodDefinition";
import {PropertyDefinition} from "../type/propertyDefinition";
import {AnnotationDefinition} from "../type/annotationDefinition";
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
            annotations: [],
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

    public static getAnnotationDefinitionForClass<T extends Function>(target: T, decorator: Function): AnnotationDefinition | undefined {
        let classDefinition = ReflectUtil.getClassDefinition(target);
        return classDefinition.annotations.find(i => i.type === decorator);
    }

    public static getAnnotationDefinitionForMethod<T extends Function>(target: T, name: string, decorator: Function): AnnotationDefinition | undefined {
        let methodDefinition = ReflectUtil.getMethodDefinition(target, name);
        return methodDefinition?.annotations.find(i => i.type === decorator);
    }

    public static getAnnotationDefinitionForProperty<T extends Function>(target: T, name: string, decorator: Function): AnnotationDefinition | undefined {
        let methodDefinition = ReflectUtil.getPropertyDefinition(target, name);
        return methodDefinition?.annotations.find(i => i.type === decorator);
    }

    public static getAnnotationDefinitionForMethodParameter<T extends Function>(target: T, name: string, index: number, decorator: Function): AnnotationDefinition | undefined {
        let parameterDefinitionForMethod = ReflectUtil.getParameterDefinitionForMethod(target, name, index);
        return parameterDefinitionForMethod?.annotations.find(i => i.type === decorator);
    }

    public static getAnnotationDefinitionForClassParameter<T extends Function>(target: T, index: number, decorator: Function): AnnotationDefinition | undefined {
        let parameterDefinitionForClass = ReflectUtil.getParameterDefinitionForClass(target, index);
        return parameterDefinitionForClass?.annotations.find(i => i.type === decorator);
    }
}

