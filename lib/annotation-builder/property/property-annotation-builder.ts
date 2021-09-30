import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {PropertyClassAnnotationBuilder} from './property-class-annotation-builder';
import {PropertyMethodAnnotationBuilder} from './property-method-annotation-builder';
import {ParameterPropertyAnnotationBuilder} from '../parameter/parameter-property-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";

type PropertyAnnotation<O, P> = (P extends void ? PropertyDecorator : void) & ((option: P) => PropertyDecorator) & Annotation<O, P>;

type PropertyAnnotationBuilder<O, P> = {
    build(): PropertyAnnotation<O, P>;
    class(
        classHandler?: ClassHandler<O>
    ): PropertyClassAnnotationBuilder<O, P>;
    method(
        methodHandler?: MethodHandler<O>
    ): PropertyMethodAnnotationBuilder<O, P>;
    property(
        propertyHandler?: PropertyHandler<O>
    ): PropertyAnnotationBuilder<O, P>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyAnnotationBuilder<O, P>;
}

// class PropertyDecoratorFactoryBuilder<O> extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public propertyHandler: PropertyHandler<O>
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): PropertyDecoratorFactory<O> {
//         return MakeDecoratorUtil.makeDecoratorFactory<O>(undefined, this.propertyHandler,
//             undefined, undefined, this.defaultOption, this.metadataKey);
//     }
//     public class(
//         classHandler: ClassHandler<O>
//     ): PropertyClassAnnotationBuilder<O> {
//         return new PropertyClassAnnotationBuilder<O>(this.defaultOption, this.metadataKey, this.propertyHandler, classHandler);
//     }
//
//     public method(
//         methodHandler: MethodHandler<O>
//     ): PropertyMethodAnnotationBuilder<O> {
//         return new PropertyMethodAnnotationBuilder<O>(this.defaultOption, this.metadataKey, this.propertyHandler, methodHandler);
//     }
//
//     public property(
//         propertyHandler: PropertyHandler<O>
//     ): PropertyDecoratorFactoryBuilder<O> {
//         return new PropertyDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, propertyHandler);
//     }
//
//     public parameter(
//         parameterHandler: ParameterHandler<O>
//     ): ParameterPropertyAnnotationBuilder<O> {
//         return new ParameterPropertyAnnotationBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler);
//     }
//
// }

export {PropertyAnnotation, PropertyAnnotationBuilder};
