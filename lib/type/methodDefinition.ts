import {AnnotationDefinition} from "./annotationDefinition";
import {ParameterDefinition} from "./parameterDefinition";


export type MethodDefinition = {
    /**
     * 方法返回类型
     */
    returnType: Function;
    parameters: ParameterDefinition[];
    /**
     * 方法名称
     */
    name: string | symbol;

    annotations: AnnotationDefinition[];

    isStatic: boolean;
}
