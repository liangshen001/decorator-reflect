import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {PropertyMethodClassAnnotationBuilder} from '../property/property-method-class-annotation-builder';
import {ParameterMethodClassAnnotationBuilder} from '../parameter/parameter-method-class-annotation-builder';
import {Annotation} from "../../bean/annotation";
type MethodClassDecorator = MethodDecorator & ClassDecorator

type MethodClassAnnotation<O, P> = (P extends void ? MethodClassDecorator : void) & ((option: P) => MethodClassDecorator) & Annotation<O, P>;

type MethodClassAnnotationBuilder<O, P> = {
    build(): MethodClassAnnotation<O, P>;
    class(classHandler?: ClassHandler<O>): MethodClassAnnotationBuilder<O, P>;
    method(methodHandler?: MethodHandler<O>): MethodClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>): PropertyMethodClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>): PropertyMethodClassAnnotationBuilder<O, P>;
    parameter(parameterHandler?: ParameterHandler<O>): ParameterMethodClassAnnotationBuilder<O, P>;
}
export {MethodClassAnnotation, MethodClassAnnotationBuilder, MethodClassDecorator};
