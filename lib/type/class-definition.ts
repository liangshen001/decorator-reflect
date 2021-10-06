import {DecoratorDefinition} from "./decorator-definition";
import {PropertyDefinition} from "./property-definition";
import {MethodDefinition} from "./method-definition";
import {ParameterDefinition} from "./parameter-definition";
import {PayloadDefinition} from "./payload-definition";
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

    addMethod(target: Object, propertyKey: string | symbol, paramTypes: Function[], returnType: Function): MethodDefinition {
        const method = MethodDefinition.of(target, propertyKey, paramTypes.map(
            (i, index) => ParameterDefinition.of(target, propertyKey, index, i)), returnType);
        this.methods.push(method);
        return method;
    }

    addDecorator(decorator: DecoratorDefinition) {
        this.decorators.push(decorator);
    }

    resetParameters(paramTypes: Function[]) {
        this.parameters = paramTypes.map(
            (i, index) => ParameterDefinition.of(this.type, undefined, index, i));
    }

    addProperty(target: Object, propertyKey: string | symbol, type: Function): PropertyDefinition {
        const property = PropertyDefinition.of(target, propertyKey, type);
        this.properties.push(property);
        return property;
    }

    setParameterDecorator(index: number, decorator: DecoratorDefinition) {
        if (!this.parameters) {
            this.parameters = [];
        }
        let parameter = this.parameters[index];
        if (!parameter) {
            parameter = ParameterDefinition.of(this.type, undefined, index, undefined);
            this.parameters[index] = parameter;
        }
        parameter.addDecorator(decorator);
        return parameter;
    }

    getMethods<O, P>(decorator: Annotation<O, P>) {
        return this.methods.filter(i => i.hasDecorator(decorator));
    }

    getProperties<O, P>(decorator: Annotation<O, P>) {
        return this.properties.filter(i => i.hasDecorator(decorator));
    }

    getParameters<O, P>(decorator: Annotation<O, P>) {
        return [
            ...this.getConstructorParameters(decorator),
            ...this.methods.flatMap(i => i.getParameters(decorator))
        ];
    }

    getConstructorParameters<O, P>(decorator: Annotation<O, P>) {
        return super.getParameters(decorator);
    }
}
