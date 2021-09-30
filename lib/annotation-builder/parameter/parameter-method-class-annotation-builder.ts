import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodClassAnnotationBuilder} from './parameter-property-method-class-annotation-builder';
import {Annotation} from "../../bean/annotation";

type ParameterMethodClassDecorator = ParameterDecorator & MethodDecorator & ClassDecorator;
type ParameterMethodClassAnnotation<O> = ParameterMethodClassDecorator & ((option?: O) => ParameterMethodClassDecorator) & Annotation<O>;

type ParameterMethodClassAnnotationBuilder<O> = {
    build(): ParameterMethodClassAnnotation<O>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterMethodClassAnnotationBuilder<O>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterMethodClassAnnotationBuilder<O>;
    class(classHandler?: ClassHandler<O>): ParameterMethodClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>)
        : ParameterPropertyMethodClassAnnotationBuilder<O>;
}


// class ParameterMethodClassAnnotationBuilder2<O>
//     extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public parameterHandler: ParameterHandler<O>,
//         public methodHandler: MethodHandler<O>,
//         public classHandler: ClassHandler<O>
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): ParameterMethodClassAnnotation<O> {
//         return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, undefined,
//             this.methodHandler, this.classHandler, this.defaultOption, this.metadataKey);
//     }
//
//     public parameter(
//         parameterHandler?: ParameterHandler<O>
//     ): ParameterMethodClassAnnotationBuilder<O> {
//         return new ParameterMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, parameterHandler, this.methodHandler, this.classHandler);
//     }
//     public method(
//         methodHandler?: MethodHandler<O>
//     ): ParameterMethodClassAnnotationBuilder<O> {
//         return new ParameterMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, methodHandler, this.classHandler);
//     }
//     public class(classHandler?: ClassHandler<O>): ParameterMethodClassAnnotationBuilder<O> {
//         return new ParameterMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, this.methodHandler, classHandler);
//     }
//
//     public property(propertyHandler?: PropertyHandler<O>)
//         : ParameterPropertyMethodClassAnnotationBuilder<O> {
//         return new ParameterPropertyMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.methodHandler, this.classHandler);
//     }
//
// }

export {ParameterMethodClassAnnotation, ParameterMethodClassAnnotationBuilder, ParameterMethodClassDecorator};
