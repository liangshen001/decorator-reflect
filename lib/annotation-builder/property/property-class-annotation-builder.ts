import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {PropertyMethodClassAnnotationBuilder} from './property-method-class-annotation-builder';
import {ParameterPropertyClassAnnotationBuilder} from '../parameter/parameter-property-class-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";

type PropertyClassDecorator = PropertyDecorator & ClassDecorator;
type PropertyClassAnnotation<O, P> = (P extends void ? PropertyClassDecorator : void) & ((option: P) => PropertyClassDecorator) & Annotation<O, P>;

type PropertyClassAnnotationBuilder<O, P> = {
    build(): PropertyClassAnnotation<O, P>;
    class(
        classHandler?: ClassHandler<O>
    ): PropertyClassAnnotationBuilder<O, P>;
    method(
        methodHandler?: MethodHandler<O>
    ): PropertyMethodClassAnnotationBuilder<O, P>;
    property(
        propertyHandler?: PropertyHandler<O>
    ): PropertyClassAnnotationBuilder<O, P>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyClassAnnotationBuilder<O, P>;
}

export {PropertyClassAnnotation, PropertyClassAnnotationBuilder, PropertyClassDecorator};
