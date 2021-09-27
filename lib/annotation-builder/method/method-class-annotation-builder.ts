import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {PropertyMethodClassAnnotationBuilder} from '../property/property-method-class-annotation-builder';
import {ParameterMethodClassAnnotationBuilder} from '../parameter/parameter-method-class-annotation-builder';
type MethodClassDecorator = MethodDecorator & ClassDecorator

type MethodClassAnnotation<O> = MethodClassDecorator & ((option?: O) => MethodClassDecorator);

type MethodClassAnnotationBuilder<O> = {
    build(): MethodClassAnnotation<O>;
    class(classHandler?: ClassHandler<O>): MethodClassAnnotationBuilder<O>;
    method(methodHandler?: MethodHandler<O>): MethodClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): PropertyMethodClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): PropertyMethodClassAnnotationBuilder<O>;
    parameter(parameterHandler?: ParameterHandler<O>): ParameterMethodClassAnnotationBuilder<O>;
}

// class MethodClassAnnotationBuilder<O> extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public methodHandlers: MethodHandler<O>[],
//         public classHandlers: ClassHandler<O>[]
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): MethodClassAnnotationFactory<O> {
//         return MakeDecoratorUtil.makeDecoratorFactory<O>(undefined, undefined,
//             this.methodHandlers[0], this.classHandlers[0], this.defaultOption, this.metadataKey);
//     }
//
//     public class(classHandler?: ClassHandler<O>): MethodClassAnnotationBuilder<O> {
//         if (classHandler) {
//             this.classHandlers.push(classHandler);
//         }
//         return this;
//     }
//
//     public method(methodHandler?: MethodHandler<O>): MethodClassAnnotationBuilder<O> {
//         if (methodHandler) {
//             this.classHandlers.push(methodHandler);
//         }
//         return this;
//     }
//     public property(propertyHandler?: PropertyHandler<O>): PropertyMethodClassDecoratorFactoryBuilder<O> {
//         const propertyHandlers = propertyHandler ? [propertyHandler] : [];
//         return new PropertyMethodClassDecoratorFactoryBuilder<O>(
//             this.defaultOption, this.metadataKey, propertyHandlers, this.methodHandlers, this.classHandlers);
//     }
//
//     public parameter(parameterHandler?: ParameterHandler<O>): ParameterMethodClassAnnotationBuilder<O> {
//         const parameterHandlers = parameterHandler ? [parameterHandler] : [];
//         return new ParameterMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, parameterHandlers, this.methodHandlers, this.classHandlers
//         );
//     }
//
// }
export {MethodClassAnnotation, MethodClassAnnotationBuilder, MethodClassDecorator};
