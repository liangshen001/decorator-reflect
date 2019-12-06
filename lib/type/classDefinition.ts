import {DecoratorDefinition} from "./decoratorDefinition";
import {PropertyDefinition} from "./propertyDefinition";
import {MethodDefinition} from "./methodDefinition";
import {ParameterDefinition} from "./parameterDefinition";

export type ClassDefinition<T extends Function> = {
    name: string;
    type: T;
    decorators: DecoratorDefinition[];
    properties: PropertyDefinition[];
    methods: MethodDefinition[];
    parameters: ParameterDefinition[];
}
