import {AnnotationDefinition} from "./annotationDefinition";


export type PropertyDefinition = {
    /**
     * 属性类型
     */
    type: Function;
    /**
     * 属性名称
     */
    name: string | symbol;

    annotations: AnnotationDefinition[];

    isStatic: boolean;
}
