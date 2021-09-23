import {AnnotationDefinition} from "./annotationDefinition";

export type ParameterDefinition = {
    type: Function;
    annotations: AnnotationDefinition[];
}
