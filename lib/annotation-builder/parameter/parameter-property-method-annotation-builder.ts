import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodClassAnnotationBuilder} from './parameter-property-method-class-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";


type ParameterPropertyMethodDecorator = ParameterDecorator & PropertyDecorator & MethodDecorator;
type ParameterPropertyMethodAnnotation<O, P> = (P extends void ? ParameterPropertyMethodDecorator : void) & ((option: P) => ParameterPropertyMethodDecorator) & Annotation<O, P>;

type ParameterPropertyMethodAnnotationBuilder<O, P> = {
    build(): ParameterPropertyMethodAnnotation<O, P>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyMethodAnnotationBuilder<O, P>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterPropertyMethodAnnotationBuilder<O, P>;
    class(classHandler?: ClassHandler<O>): ParameterPropertyMethodClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyMethodAnnotationBuilder<O, P>;
}


export {ParameterPropertyMethodAnnotation, ParameterPropertyMethodAnnotationBuilder, ParameterPropertyMethodDecorator};
