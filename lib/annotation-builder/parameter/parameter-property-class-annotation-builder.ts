import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodClassAnnotationBuilder} from './parameter-property-method-class-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";


type ParameterPropertyClassDecorator = ParameterDecorator & PropertyDecorator & ClassDecorator;
type ParameterPropertyClassAnnotation<O, P> = (P extends void ? ParameterPropertyClassDecorator : void) & ((option: P) => ParameterPropertyClassDecorator) & Annotation<O, P>;

type ParameterPropertyClassAnnotationBuilder<O, P> = {
    build(): ParameterPropertyClassAnnotation<O, P>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyClassAnnotationBuilder<O, P>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterPropertyMethodClassAnnotationBuilder<O, P>;
    class(classHandler?: ClassHandler<O>): ParameterPropertyClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyClassAnnotationBuilder<O, P>;
}


export {ParameterPropertyClassAnnotation, ParameterPropertyClassAnnotationBuilder, ParameterPropertyClassDecorator};
