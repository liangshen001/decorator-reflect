import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodAnnotationBuilder} from './parameter-method-annotation-builder';
import {ParameterClassAnnotationBuilder} from './parameter-class-annotation-builder';
import {ParameterPropertyAnnotationBuilder} from './parameter-property-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";

type ParameterAnnotation<O, P> = (P extends void ? ParameterDecorator : void) & ((option: P) => ParameterDecorator) & Annotation<O, P>;

type ParameterAnnotationBuilder<O, P> = {
    build(): ParameterAnnotation<O, P>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterAnnotationBuilder<O, P>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterMethodAnnotationBuilder<O, P>;
    class(classHandler?: ClassHandler<O>): ParameterClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyAnnotationBuilder<O, P>;
}

export {ParameterAnnotation, ParameterAnnotationBuilder};
