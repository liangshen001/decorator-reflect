import {DecoratorDefinition} from "./decorator-definition";
import {PropertyDefinition} from "./property-definition";
import {MethodDefinition} from "./method-definition";
import {ParameterDefinition} from "./parameter-definition";
import {DecoratorsPayloadDefinition} from "./decorators-payload-definition";
import {Annotation} from "../bean/annotation";
import {ParametersPayloadDefinition} from "./parameters-payload-definition";


export class ClassDefinition<T extends Function = any> extends ParametersPayloadDefinition {
    properties: PropertyDefinition[] = [];
    methods: MethodDefinition[] = [];
    private constructor(public type: T,
                        public name: string = type.name) {
        super();
    }

    static of<T extends Function>(type: T): ClassDefinition<T> {
        return new ClassDefinition(type);
    }

    getMethodDefinitions<O, P>(decorator: Annotation<O, P>) {
        return this.methods.filter(i => i.hasDecoratorDefinition(decorator));
    }

    getPropertyDefinitions<O, P>(decorator: Annotation<O, P>) {
        return this.properties.filter(i => i.hasDecoratorDefinition(decorator));
    }

    getParameterDefinitions<O, P>(decorator: Annotation<O, P>) {
        return [
            ...this.getConstructorParameterDefinitions(decorator),
            ...this.methods.flatMap(i => i.getParameterDefinitions(decorator))
        ];
    }

    getConstructorParameterDefinitions<O, P>(decorator: Annotation<O, P>) {
        return super.getParameterDefinitions(decorator);
    }
}
