import {DecoratorDefinition} from "./decorator-definition";
import {PropertyDefinition} from "./property-definition";
import {MethodDefinition} from "./method-definition";
import {ParameterDefinition} from "./parameter-definition";
import {PayloadDefinition} from "./payload-definition";


export class ClassDefinition<T extends Function = any> extends PayloadDefinition {
    name: string;
    properties: PropertyDefinition[];
    methods: MethodDefinition[];
    parameters?: ParameterDefinition[];
    private constructor(public type: T) {
        super();
        this.name = type.name;
        this.properties = [];
        this.methods = [];
    }

    static of<T extends Function>(type: T): ClassDefinition<T> {
        return new ClassDefinition(type);
    }

    addMethod(target: Object, propertyKey: string | symbol, paramTypes: Function[], returnType: Function): MethodDefinition {
        const method = MethodDefinition.of(target, propertyKey, paramTypes.map(ParameterDefinition.of), returnType);
        this.methods.push(method);
        return method;
    }

    addDecorator(decorator: DecoratorDefinition) {
        this.decorators.push(decorator);
    }

    resetParameters(paramTypes: Function[]) {
        this.parameters = paramTypes?.map(ParameterDefinition.of);
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
            parameter = ParameterDefinition.of();
            this.parameters[index] = parameter;
        }
        parameter.addDecorator(decorator);
    }
}
