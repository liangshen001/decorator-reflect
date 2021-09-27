import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodClassAnnotationBuilder} from './parameter-method-class-annotation-builder';
import {ParameterPropertyClassAnnotationBuilder} from './parameter-property-class-annotation-builder';

type ParameterClassDecorator = ParameterDecorator & ClassDecorator;

type ParameterClassAnnotation<O> = ParameterClassDecorator & ((option?: O) => ParameterClassDecorator);

type ParameterClassAnnotationBuilder<O> = {
    build(): ParameterClassAnnotation<O>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterClassAnnotationBuilder<O>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterMethodClassAnnotationBuilder<O>;
    class(classHandler?: ClassHandler<O>): ParameterClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyClassAnnotationBuilder<O>;

}

// class ParameterClassDecoratorFactoryBuilder2<O>
//     extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public parameterHandlers: ParameterHandler<O>[],
//         public classHandlers: ClassHandler<O>[]
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): ParameterClassDecoratorFactory<O> {
//         return MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, undefined,
//             undefined, this.classHandler, this.defaultOption, this.metadataKey);
//     }
//
//     public parameter(
//         parameterHandler?: ParameterHandler<O>
//     ): ParameterClassDecoratorFactoryBuilder<O> {
//         return new ParameterClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler, this.classHandler);
//     }
//     public method(
//         methodHandler?: MethodHandler<O>
//     ): ParameterMethodClassAnnotationBuilder<O> {
//         return new ParameterMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, methodHandler, this.classHandler);
//     }
//     public class(classHandler?: ClassHandler<O>): ParameterClassDecoratorFactoryBuilder<O> {
//         return new ParameterClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandler, classHandler);
//     }
//
//     public property(propertyHandler?: PropertyHandler<O>): ParameterPropertyClassAnnotationBuilder<O> {
//         return new ParameterPropertyClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.classHandler);
//     }
//
// }

export {ParameterClassAnnotation, ParameterClassAnnotationBuilder, ParameterClassDecorator};
