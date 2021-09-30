import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodClassAnnotationBuilder} from './parameter-method-class-annotation-builder';
import {ParameterPropertyClassAnnotationBuilder} from './parameter-property-class-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";

type ParameterClassDecorator = ParameterDecorator & ClassDecorator;

type ParameterClassAnnotation<O, P> = (P extends void ? ParameterClassDecorator : void) & ((option: P) => ParameterClassDecorator) & Annotation<O, P>;

type ParameterClassAnnotationBuilder<O, P> = {
    build(): ParameterClassAnnotation<O, P>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterClassAnnotationBuilder<O, P>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterMethodClassAnnotationBuilder<O, P>;
    class(classHandler?: ClassHandler<O>): ParameterClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyClassAnnotationBuilder<O, P>;

}

export {ParameterClassAnnotation, ParameterClassAnnotationBuilder, ParameterClassDecorator};
