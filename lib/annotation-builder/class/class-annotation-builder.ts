import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {MethodClassAnnotationBuilder} from '../method/method-class-annotation-builder';
import {PropertyClassAnnotationBuilder} from '../property/property-class-annotation-builder';
import {ParameterClassAnnotationBuilder} from '../parameter/parameter-class-annotation-builder';
import {Annotation} from "../../bean/annotation";

type ClassAnnotation<O, P> = ((option: P) => ClassDecorator) & Annotation<O, P>;
// type ClassDecoratorFactory<O> =
//     O extends void ?
//         (ClassDecorator & (() => ClassDecorator)) :
//         (option: O) => ClassDecorator;

type ClassAnnotationBuilder<O, P> = {
    build(): ClassAnnotation<O, P>;
    class(classHandler?: ClassHandler<O>): ClassAnnotationBuilder<O, P>;
    method(methodHandler?: MethodHandler<O>): MethodClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>): PropertyClassAnnotationBuilder<O, P>;
    parameter(parameterHandler?: ParameterHandler<O>): ParameterClassAnnotationBuilder<O, P>;
}


export {ClassAnnotation, ClassAnnotationBuilder};
