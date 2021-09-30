import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodAnnotationBuilder} from '../parameter/parameter-method-annotation-builder';
import {MethodClassAnnotationBuilder} from './method-class-annotation-builder';
import {PropertyMethodAnnotationBuilder} from '../property/property-method-annotation-builder';
import {Annotation} from "../../bean/annotation";

type MethodAnnotation<O> = MethodDecorator & ((option?: O) => MethodDecorator) & Annotation<O>;
// type MethodDecoratorFactory<O> =
//     O extends void ?
//         (MethodDecorator & ((option: O) => MethodDecorator)) :
//         (option: O) => MethodDecorator;

type MethodAnnotationBuilder<O> = {
    build(): MethodAnnotation<O>;
    parameter(parameterHandler?: ParameterHandler<O>): ParameterMethodAnnotationBuilder<O>;
    method(methodHandler?: MethodHandler<O>): MethodAnnotationBuilder<O>;
    class(classHandler?: ClassHandler<O>): MethodClassAnnotationBuilder<O>;
    method(methodHandler?: MethodHandler<O>): MethodAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): PropertyMethodAnnotationBuilder<O>;
}

// class MethodAnnotationBuilder<O> extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public methodHandlers: MethodHandler<O>[]
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): MethodAnnotation<O> {
//         return MakeDecoratorUtil.makeDecoratorFactory<O>(undefined, undefined,
//             this.methodHandlers[0], undefined, this.defaultOption, this.metadataKey);
//     }
//
//     public parameter(
//         parameterHandler?: ParameterHandler<O>
//     ): ParameterMethodAnnotationBuilder<O> {
//         const parameterHandlers = parameterHandler ? [parameterHandler] : [];
//         return new ParameterMethodAnnotationBuilder<O>(this.defaultOption, this.metadataKey, parameterHandlers, this.methodHandlers);
//     }
//
//     public method(
//         methodHandler?: MethodHandler<O>
//     ): MethodAnnotationBuilder<O> {
//         if (methodHandler) {
//             this.methodHandlers.push(methodHandler);
//         }
//         return this;
//     }
//     public class(
//         classHandler?: ClassHandler<O>
//     ): MethodClassAnnotationBuilder<O> {
//         const classHandlers = classHandler ? [classHandler] : [];
//         return new MethodClassAnnotationBuilder<O>(this.defaultOption, this.metadataKey, this.methodHandlers, classHandlers);
//     }
//
//     public property(
//         propertyHandler?: PropertyHandler<O>
//     ): PropertyMethodAnnotationBuilder<O> {
//         const propertyHandlers = propertyHandler ? [propertyHandler] : [];
//         return new PropertyMethodAnnotationBuilder<O>(this.defaultOption, this.metadataKey, propertyHandlers, this.methodHandlers);
//     }
// }

export {MethodAnnotation, MethodAnnotationBuilder};
