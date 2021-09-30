import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodAnnotationBuilder} from '../parameter/parameter-method-annotation-builder';
import {MethodClassAnnotationBuilder} from './method-class-annotation-builder';
import {PropertyMethodAnnotationBuilder} from '../property/property-method-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {DecoratorBuilder} from "../decorator-builder";

type MethodAnnotation<O, P> = (P extends void ? MethodDecorator : void) & ((option: P) => MethodDecorator) & Annotation<O, P>;

type MethodAnnotationBuilder<O, P> = {
    build(): MethodAnnotation<O, P>;
    parameter(parameterHandler?: ParameterHandler<O>): ParameterMethodAnnotationBuilder<O, P>;
    method(methodHandler?: MethodHandler<O>): MethodAnnotationBuilder<O, P>;
    class(classHandler?: ClassHandler<O>): MethodClassAnnotationBuilder<O, P>;
    method(methodHandler?: MethodHandler<O>): MethodAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>): PropertyMethodAnnotationBuilder<O, P>;
}

export {MethodAnnotation, MethodAnnotationBuilder};

