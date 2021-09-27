import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodAnnotationBuilder} from './parameter-property-method-annotation-builder';
import {ParameterPropertyClassAnnotationBuilder} from './parameter-property-class-annotation-builder';


type ParameterPropertyDecorator = ParameterDecorator & PropertyDecorator;
type ParameterPropertyAnnotation<O> = ((option?: O) => ParameterPropertyDecorator) & ParameterPropertyDecorator

type ParameterPropertyAnnotationBuilder<O> = {
    build(): ParameterPropertyAnnotation<O>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyAnnotationBuilder<O>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterPropertyMethodAnnotationBuilder<O>;
    class(classHandler?: ClassHandler<O>): ParameterPropertyClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyAnnotationBuilder<O>;
}

// class ParameterPropertyAnnotationBuilder2<O>
//     extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public parameterHandler: ParameterHandler<O>,
//         public propertyHandler: PropertyHandler<O>
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): ParameterPropertyAnnotation<O> {
//         return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, this.propertyHandler,
//             undefined, undefined, this.defaultOption, this.metadataKey);
//     }
//
//     public parameter(
//         parameterHandler?: ParameterHandler<O>
//     ): ParameterPropertyAnnotationBuilder<O> {
//         return new ParameterPropertyAnnotationBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler);
//     }
//     public method(
//         methodHandler?: MethodHandler<O>
//     ): ParameterPropertyMethodAnnotationBuilder<O> {
//         return new ParameterPropertyMethodAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, methodHandler
//         );
//     }
//
//     public class(classHandler?: ClassHandler<O>): ParameterPropertyClassAnnotationBuilder<O> {
//         return new ParameterPropertyClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, classHandler
//         );
//     }
//
//     public property(propertyHandler?: PropertyHandler<O>): ParameterPropertyAnnotationBuilder<O> {
//         return new ParameterPropertyAnnotationBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler);
//     }
//
// }

export {ParameterPropertyAnnotation, ParameterPropertyAnnotationBuilder, ParameterPropertyDecorator};
