import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {PropertyMethodClassAnnotationBuilder} from './property-method-class-annotation-builder';
import {ParameterPropertyMethodAnnotationBuilder} from '../parameter/parameter-property-method-annotation-builder';


type PropertyMethodDecoratorFactory<O> = (option: O) => (PropertyDecorator & MethodDecorator);

type PropertyMethodAnnotationBuilder<O> = {
    build(): PropertyMethodDecoratorFactory<O>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyMethodAnnotationBuilder<O>;
    method(
        methodHandler?: MethodHandler<O>
    ): PropertyMethodAnnotationBuilder<O>;
    class(
        classHandler?: ClassHandler<O>
    ): PropertyMethodClassAnnotationBuilder<O>;
    property(
        propertyHandler?: PropertyHandler<O>
    ): PropertyMethodAnnotationBuilder<O>;
}

// class PropertyMethodAnnotationBuilder2<O> extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public propertyHandler: PropertyHandler<O>,
//         public methodHandler: MethodHandler<O>
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): PropertyMethodDecoratorFactory<O> {
//         return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(undefined, this.propertyHandler,
//             this.methodHandler, undefined, this.defaultOption, this.metadataKey);
//     }
//
//     public parameter(
//         parameterHandler: ParameterHandler<O>
//     ): ParameterPropertyMethodAnnotationBuilder<O> {
//         return new ParameterPropertyMethodAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.methodHandler
//         )
//     }
//
//     public method(
//         methodHandler: MethodHandler<O>
//     ): PropertyMethodAnnotationBuilder<O> {
//         return new PropertyMethodAnnotationBuilder<O>(this.defaultOption, this.metadataKey, this.propertyHandler, methodHandler);
//     }
//
//     public class(
//         classHandler: ClassHandler<O>
//     ): PropertyMethodClassDecoratorFactoryBuilder<O> {
//         return new PropertyMethodClassDecoratorFactoryBuilder<O>(
//             this.defaultOption, this.metadataKey, this.propertyHandler, this.methodHandler, classHandler);
//     }
//
//     public property(
//         propertyHandler: PropertyHandler<O>
//     ): PropertyMethodAnnotationBuilder<O> {
//         return new PropertyMethodAnnotationBuilder<O>(this.defaultOption, this.metadataKey, propertyHandler, this.methodHandler);
//     }
// }

export {PropertyMethodDecoratorFactory, PropertyMethodAnnotationBuilder};
