import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodClassAnnotationBuilder} from './parameter-property-method-class-annotation-builder';


type ParameterPropertyMethodDecoratorFactory<O> = (option: O) => (ParameterDecorator & PropertyDecorator & MethodDecorator);

type ParameterPropertyMethodAnnotationBuilder<O> = {
    build(): ParameterPropertyMethodDecoratorFactory<O>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyMethodAnnotationBuilder<O>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterPropertyMethodAnnotationBuilder<O>;
    class(classHandler?: ClassHandler<O>): ParameterPropertyMethodClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyMethodAnnotationBuilder<O>;
}

// class ParameterPropertyMethodAnnotationBuilder<O>
//     extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public parameterHandler: ParameterHandler<O>,
//         public propertyHandler: PropertyHandler<O>,
//         public methodHandler: MethodHandler<O>,
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): ParameterPropertyMethodDecoratorFactory<O> {
//         return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, this.propertyHandler,
//             this.methodHandler, undefined, this.defaultOption, this.metadataKey);
//     }
//
//     public parameter(
//         parameterHandler?: ParameterHandler<O>
//     ): ParameterPropertyMethodAnnotationBuilder<O> {
//         return new ParameterPropertyMethodAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.methodHandler);
//     }
//     public method(
//         methodHandler?: MethodHandler<O>
//     ): ParameterPropertyMethodAnnotationBuilder<O> {
//         return new ParameterPropertyMethodAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, methodHandler);
//     }
//     public class(classHandler?: ClassHandler<O>): ParameterPropertyMethodClassAnnotationBuilder<O> {
//         return new ParameterPropertyMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, this.methodHandler, classHandler);
//     }
//
//     public property(propertyHandler?: PropertyHandler<O>): ParameterPropertyMethodAnnotationBuilder<O> {
//         return new ParameterPropertyMethodAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.methodHandler);
//     }
//
// }

export {ParameterPropertyMethodDecoratorFactory, ParameterPropertyMethodAnnotationBuilder};
