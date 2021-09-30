import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodClassAnnotationBuilder} from './parameter-property-method-class-annotation-builder';
import {Annotation} from "../../bean/annotation";


type ParameterPropertyClassDecorator = ParameterDecorator & PropertyDecorator & ClassDecorator;
type ParameterPropertyClassAnnotation<O> = ParameterPropertyClassDecorator & ((option?: O) => ParameterPropertyClassDecorator) & Annotation<O>;

type ParameterPropertyClassAnnotationBuilder<O> = {
    build(): ParameterPropertyClassAnnotation<O>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterPropertyClassAnnotationBuilder<O>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterPropertyMethodClassAnnotationBuilder<O>;
    class(classHandler?: ClassHandler<O>): ParameterPropertyClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyClassAnnotationBuilder<O>;
}

// class ParameterPropertyClassAnnotationBuilder2<O>
//     extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public parameterHandler: ParameterHandler<O>,
//         public propertyHandler: PropertyHandler<O>,
//         public classHandler: ClassHandler<O>,
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): ParameterPropertyClassAnnotation<O> {
//         return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, this.propertyHandler,
//             undefined, this.classHandler, this.defaultOption, this.metadataKey);
//     }
//
//     public parameter(
//         parameterHandler?: ParameterHandler<O>
//     ): ParameterPropertyClassAnnotationBuilder<O> {
//         return new ParameterPropertyClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.classHandler);
//     }
//     public method(
//         methodHandler?: MethodHandler<O>
//     ): ParameterPropertyMethodClassAnnotationBuilder<O> {
//         return new ParameterPropertyMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, methodHandler, this.classHandler);
//     }
//     public class(classHandler?: ClassHandler<O>): ParameterPropertyClassAnnotationBuilder<O> {
//         return new ParameterPropertyClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, classHandler);
//     }
//
//     public property(propertyHandler?: PropertyHandler<O>): ParameterPropertyClassAnnotationBuilder<O> {
//         return new ParameterPropertyClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.classHandler);
//     }
//
// }

export {ParameterPropertyClassAnnotation, ParameterPropertyClassAnnotationBuilder, ParameterPropertyClassDecorator};
