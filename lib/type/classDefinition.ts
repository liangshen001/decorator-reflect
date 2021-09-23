import {AnnotationDefinition} from "./annotationDefinition";
import {PropertyDefinition} from "./propertyDefinition";
import {MethodDefinition} from "./methodDefinition";
import {ParameterDefinition} from "./parameterDefinition";

export type ClassDefinition<T extends Function> = {
    name: string;
    type: T;
    annotations: AnnotationDefinition[];
    properties: PropertyDefinition[];
    methods: MethodDefinition[];
    parameters: ParameterDefinition[];
}
