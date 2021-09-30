import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodClassAnnotationBuilder} from './parameter-property-method-class-annotation-builder';
import {Annotation} from "../../bean/annotation";
import {MethodClassDecorator} from "../method/method-class-annotation-builder";

type ParameterMethodClassDecorator = ParameterDecorator & MethodDecorator & ClassDecorator;
type ParameterMethodClassAnnotation<O, P> = (P extends void ? ParameterMethodClassDecorator : void) & ((option: P) => ParameterMethodClassDecorator) & Annotation<O, P>;

type ParameterMethodClassAnnotationBuilder<O, P> = {
    build(): ParameterMethodClassAnnotation<O, P>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterMethodClassAnnotationBuilder<O, P>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterMethodClassAnnotationBuilder<O, P>;
    class(classHandler?: ClassHandler<O>): ParameterMethodClassAnnotationBuilder<O, P>;
    property(propertyHandler?: PropertyHandler<O>)
        : ParameterPropertyMethodClassAnnotationBuilder<O, P>;
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
