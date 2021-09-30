import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {Annotation} from "../../bean/annotation";

type ParameterPropertyMethodClassDecorator = ParameterDecorator & PropertyDecorator & MethodDecorator & ClassDecorator;
type ParameterPropertyMethodClassAnnotation<O> =
    ParameterPropertyMethodClassDecorator & ((option?: O) => ParameterPropertyMethodClassDecorator) & Annotation<O>;

type ParameterPropertyMethodClassAnnotationBuilder<O> = {
    build(): ParameterPropertyMethodClassAnnotation<O>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyMethodClassAnnotationBuilder<O>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterPropertyMethodClassAnnotationBuilder<O>;
    class(classHandler?: ClassHandler<O>): ParameterPropertyMethodClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>)
        : ParameterPropertyMethodClassAnnotationBuilder<O>;
}

// class ParameterPropertyMethodClassAnnotationBuilder2<O>
//     extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public parameterHandler: ParameterHandler<O>,
//         public propertyHandler: PropertyHandler<O>,
//         public methodHandler: MethodHandler<O>,
//         public classHandler: ClassHandler<O>
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): ParameterPropertyMethodClassAnnotation<O> {
//         return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, this.propertyHandler,
//             this.methodHandler, this.classHandler, this.defaultOption, this.metadataKey);
//     }
//
//     public parameter(
//         parameterHandler?: ParameterHandler<O>
//     ): ParameterPropertyMethodClassAnnotationBuilder<O> {
//         return new ParameterPropertyMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.methodHandler, this.classHandler);
//     }
//     public method(
//         methodHandler?: MethodHandler<O>
//     ): ParameterPropertyMethodClassAnnotationBuilder<O> {
//         return new ParameterPropertyMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, methodHandler, this.classHandler);
//     }
//     public class(classHandler?: ClassHandler<O>): ParameterPropertyMethodClassAnnotationBuilder<O> {
//         return new ParameterPropertyMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, this.methodHandler, classHandler);
//     }
//
//     public property(propertyHandler?: PropertyHandler<O>)
//         : ParameterPropertyMethodClassAnnotationBuilder<O> {
//         return new ParameterPropertyMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.methodHandler, this.classHandler);
//     }
//
// }

export {ParameterPropertyMethodClassAnnotation, ParameterPropertyMethodClassAnnotationBuilder, ParameterPropertyMethodClassDecorator};
