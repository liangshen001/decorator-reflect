import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodAnnotationBuilder} from './parameter-method-annotation-builder';
import {ParameterClassAnnotationBuilder} from './parameter-class-annotation-builder';
import {ParameterPropertyAnnotationBuilder} from './parameter-property-annotation-builder';

type ParameterAnnotation<O> = ParameterDecorator & ((option?: O) => ParameterDecorator);

type ParameterAnnotationBuilder<O> = {
    build(): ParameterAnnotation<O>;
    parameter(
        parameterHandler?: ParameterHandler<O>
    ): ParameterAnnotationBuilder<O>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterMethodAnnotationBuilder<O>;
    class(classHandler?: ClassHandler<O>): ParameterClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyAnnotationBuilder<O>;
}

// class ParameterAnnotationBuilder2<O> extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public parameterHandlers: ParameterHandler<O>[]
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): ParameterAnnotation<O> {
//         return MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandlers[0], undefined,
//             undefined, undefined, this.defaultOption, this.metadataKey);
//     }
//
//     public parameter(
//         parameterHandler?: ParameterHandler<O>
//     ): ParameterAnnotationBuilder<O> {
//         if (parameterHandler) {
//             this.parameterHandlers.push(parameterHandler);
//         }
//         return this;
//     }
//     public method(
//         methodHandler?: MethodHandler<O>
//     ): ParameterMethodAnnotationBuilder<O> {
//         const methodHandlers = methodHandler ? [methodHandler] : [];
//         return new ParameterMethodAnnotationBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandlers, methodHandlers);
//     }
//     public class(classHandler?: ClassHandler<O>): ParameterClassDecoratorFactoryBuilder<O> {
//         const classHandlers = classHandler ? [classHandler] : [];
//         return new ParameterClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandlers, classHandlers);
//     }
//
//     public property(propertyHandler?: PropertyHandler<O>): ParameterPropertyAnnotationBuilder<O> {
//         return new ParameterPropertyAnnotationBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandlers, propertyHandler);
//     }
//
// }

export {ParameterAnnotation, ParameterAnnotationBuilder};
