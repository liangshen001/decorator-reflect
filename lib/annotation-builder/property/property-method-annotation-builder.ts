import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {PropertyMethodClassAnnotationBuilder} from './property-method-class-annotation-builder';
import {ParameterPropertyMethodAnnotationBuilder} from '../parameter/parameter-property-method-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";


type PropertyMethodDecorator = PropertyDecorator & MethodDecorator;
type PropertyMethodAnnotation<O, P> = (P extends void ? PropertyMethodDecorator : void) & ((option: P) => PropertyMethodDecorator) & Annotation<O, P>;

type PropertyMethodAnnotationBuilder<O, P> = {
    build(): PropertyMethodAnnotation<O, P>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyMethodAnnotationBuilder<O, P>;
    method(
        methodHandler?: MethodHandler<O>
    ): PropertyMethodAnnotationBuilder<O, P>;
    class(
        classHandler?: ClassHandler<O>
    ): PropertyMethodClassAnnotationBuilder<O, P>;
    property(
        propertyHandler?: PropertyHandler<O>
    ): PropertyMethodAnnotationBuilder<O, P>;
}


export {PropertyMethodAnnotation, PropertyMethodAnnotationBuilder, PropertyMethodDecorator};
