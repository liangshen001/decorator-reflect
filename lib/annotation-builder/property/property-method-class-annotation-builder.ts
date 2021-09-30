import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodClassAnnotationBuilder} from '../parameter/parameter-property-method-class-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";

type PropertyMethodClassDecorator = MethodDecorator & ClassDecorator & PropertyDecorator;
type PropertyMethodClassAnnotation<O, P> = (P extends void ? PropertyMethodClassDecorator : void) & ((option: P) => PropertyMethodClassDecorator) & Annotation<O, P>;

type PropertyMethodClassAnnotationBuilder<O, P> = {
    build(): PropertyMethodClassAnnotation<O, P>;
    class(classHandler?: ClassHandler<O>): PropertyMethodClassAnnotationBuilder<O, P>;
    method(methodHandler?: MethodHandler<O>): PropertyMethodClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>): PropertyMethodClassAnnotationBuilder<O, P>;
    parameter(parameterHandler?: ParameterHandler<O>)
        : ParameterPropertyMethodClassAnnotationBuilder<O, P>;
}

export {PropertyMethodClassAnnotation, PropertyMethodClassAnnotationBuilder, PropertyMethodClassDecorator};
