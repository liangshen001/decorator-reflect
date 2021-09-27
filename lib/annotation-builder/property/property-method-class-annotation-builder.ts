import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodClassAnnotationBuilder} from '../parameter/parameter-property-method-class-annotation-builder';

type PropertyMethodClassDecorator = MethodDecorator & ClassDecorator & PropertyDecorator;
type PropertyMethodClassAnnotation<O> = PropertyMethodClassDecorator & ((option?: O) => PropertyMethodClassDecorator);

type PropertyMethodClassAnnotationBuilder<O> = {
    build(): PropertyMethodClassAnnotation<O>;
    class(classHandler?: ClassHandler<O>): PropertyMethodClassAnnotationBuilder<O>;
    method(methodHandler?: MethodHandler<O>): PropertyMethodClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): PropertyMethodClassAnnotationBuilder<O>;
    parameter(parameterHandler?: ParameterHandler<O>)
        : ParameterPropertyMethodClassAnnotationBuilder<O>;
}

// class PropertyMethodClassDecoratorFactoryBuilder<O>
//     extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public propertyHandler: PropertyHandler<O>,
//         public methodHandler: MethodHandler<O>,
//         public classHandler: ClassHandler<O>
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): PropertyMethodClassDecoratorFactory<O> {
//         return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(undefined, this.propertyHandler,
//             this.methodHandler, this.classHandler, this.defaultOption, this.metadataKey);
//     }
//
//     public class(classHandler: ClassHandler<O>): PropertyMethodClassDecoratorFactoryBuilder<O> {
//         return new PropertyMethodClassDecoratorFactoryBuilder<O>(
//             this.defaultOption, this.metadataKey, this.propertyHandler, this.methodHandler, classHandler);
//     }
//
//     public method(methodHandler: MethodHandler<O>): PropertyMethodClassDecoratorFactoryBuilder<O> {
//         return new PropertyMethodClassDecoratorFactoryBuilder<O>(
//             this.defaultOption, this.metadataKey, this.propertyHandler, methodHandler, this.classHandler);
//     }
//     public property(propertyHandler: PropertyHandler<O>): PropertyMethodClassDecoratorFactoryBuilder<O> {
//         return new PropertyMethodClassDecoratorFactoryBuilder<O>(
//             this.defaultOption, this.metadataKey, propertyHandler, this.methodHandler, this.classHandler
//         );
//     }
//
//     public parameter(parameterHandler: ParameterHandler<O>)
//         : ParameterPropertyMethodClassAnnotationBuilder<O> {
//         return new ParameterPropertyMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.methodHandler, this.classHandler
//         );
//     }
//
// }

export {PropertyMethodClassAnnotation, PropertyMethodClassAnnotationBuilder, PropertyMethodClassDecorator};
