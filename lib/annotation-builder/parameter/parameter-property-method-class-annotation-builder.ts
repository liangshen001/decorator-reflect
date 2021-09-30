import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";

type ParameterPropertyMethodClassDecorator = ParameterDecorator & PropertyDecorator & MethodDecorator & ClassDecorator;
type ParameterPropertyMethodClassAnnotation<O, P> =
    (P extends void ? ParameterPropertyMethodClassDecorator : void) & ((option: P) => ParameterPropertyMethodClassDecorator) & Annotation<O, P>;

type ParameterPropertyMethodClassAnnotationBuilder<O, P> = {
    build(): ParameterPropertyMethodClassAnnotation<O, P>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyMethodClassAnnotationBuilder<O, P>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterPropertyMethodClassAnnotationBuilder<O, P>;
    class(classHandler?: ClassHandler<O>): ParameterPropertyMethodClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>)
        : ParameterPropertyMethodClassAnnotationBuilder<O, P>;
}

export {ParameterPropertyMethodClassAnnotation, ParameterPropertyMethodClassAnnotationBuilder, ParameterPropertyMethodClassDecorator};
