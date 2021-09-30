import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodAnnotationBuilder} from './parameter-property-method-annotation-builder';
import {ParameterPropertyClassAnnotationBuilder} from './parameter-property-class-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";


type ParameterPropertyDecorator = ParameterDecorator & PropertyDecorator;
type ParameterPropertyAnnotation<O, P> = (P extends void ? ParameterPropertyDecorator : void) & ((option: P) => ParameterPropertyDecorator) & Annotation<O, P>

type ParameterPropertyAnnotationBuilder<O, P> = {
    build(): ParameterPropertyAnnotation<O, P>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyAnnotationBuilder<O, P>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterPropertyMethodAnnotationBuilder<O, P>;
    class(classHandler?: ClassHandler<O>): ParameterPropertyClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyAnnotationBuilder<O, P>;
}

export {ParameterPropertyAnnotation, ParameterPropertyAnnotationBuilder, ParameterPropertyDecorator};
