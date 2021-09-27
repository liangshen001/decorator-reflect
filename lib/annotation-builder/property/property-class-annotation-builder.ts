import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {PropertyMethodClassAnnotationBuilder} from './property-method-class-annotation-builder';
import {ParameterPropertyClassAnnotationBuilder} from '../parameter/parameter-property-class-annotation-builder';

type PropertyClassDecorator = PropertyDecorator & ClassDecorator;
type PropertyClassAnnotation<O> = PropertyClassDecorator & ((option?: O) => PropertyClassDecorator);

type PropertyClassAnnotationBuilder<O> = {
    build(): PropertyClassAnnotation<O>;
    class(
        classHandler?: ClassHandler<O>
    ): PropertyClassAnnotationBuilder<O>;
    method(
        methodHandler?: MethodHandler<O>
    ): PropertyMethodClassAnnotationBuilder<O>;
    property(
        propertyHandler?: PropertyHandler<O>
    ): PropertyClassAnnotationBuilder<O>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyClassAnnotationBuilder<O>;
}

// class PropertyClassDecoratorFactoryBuilder<O>
//     extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public propertyHandlers: PropertyHandler<O>[],
//         public classHandlers: ClassHandler<O>[]
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): PropertyClassDecoratorFactory<O> {
//         return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(undefined, this.propertyHandler,
//             undefined, this.classHandler, this.defaultOption, this.metadataKey);
//     }
//     public class(
//         classHandler: ClassHandler<O>
//     ): PropertyClassDecoratorFactoryBuilder<O> {
//         return new PropertyClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.propertyHandler, classHandler);
//     }
//
//     public method(
//         methodHandler: MethodHandler<O>
//     ): PropertyMethodClassDecoratorFactoryBuilder<O> {
//         return new PropertyMethodClassDecoratorFactoryBuilder<O>(
//             this.defaultOption, this.metadataKey, this.propertyHandler, methodHandler, this.classHandler);
//     }
//
//     public property(
//         propertyHandler: PropertyHandler<O>
//     ): PropertyClassDecoratorFactoryBuilder<O> {
//         return new PropertyClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, propertyHandler, this.classHandler);
//     }
//
//     public parameter(
//         parameterHandler: ParameterHandler<O>
//     ): ParameterPropertyClassAnnotationBuilder<O> {
//         return new ParameterPropertyClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.classHandler
//         );
//     }
//
// }

export {PropertyClassAnnotation, PropertyClassAnnotationBuilder, PropertyClassDecorator};
