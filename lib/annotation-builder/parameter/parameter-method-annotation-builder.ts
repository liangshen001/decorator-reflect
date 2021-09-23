import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodClassAnnotationBuilder} from './parameter-method-class-annotation-builder';
import {ParameterPropertyMethodAnnotationBuilder} from './parameter-property-method-annotation-builder';

type ParameterMethodDecoratorFactory<O> = (option: O) => (ParameterDecorator & MethodDecorator);

type ParameterMethodAnnotationBuilder<O> = {
    build(): ParameterMethodDecoratorFactory<O>;
    parameter(parameterHandler?: ParameterHandler<O>): ParameterMethodAnnotationBuilder<O>;
    method(
        methodHandler?: MethodHandler<O>
    ): ParameterMethodAnnotationBuilder<O>;
    class(classHandler?: ClassHandler<O>): ParameterMethodClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): ParameterPropertyMethodAnnotationBuilder<O>;
}

// class ParameterMethodAnnotationBuilder2<O> extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public parameterHandler: ParameterHandler<O>,
//         public methodHandler: MethodHandler<O>
//     ) {
//         super(defaultOption, metadataKey);
//     }
//
//     public build(): ParameterMethodDecoratorFactory<O> {
//         return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, undefined,
//             this.methodHandler, undefined, this.defaultOption, this.metadataKey);
//     }
//
//     public parameter(parameterHandler?: ParameterHandler<O>
//     ): ParameterMethodAnnotationBuilder<O> {
//         return new ParameterMethodAnnotationBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler, this.methodHandler);
//     }
//     public method(
//         methodHandler?: MethodHandler<O>
//     ): ParameterMethodAnnotationBuilder<O> {
//         return new ParameterMethodAnnotationBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandler, methodHandler);
//     }
//     public class(classHandler?: ClassHandler<O>): ParameterMethodClassAnnotationBuilder<O> {
//         return new ParameterMethodClassAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, this.methodHandler, classHandler);
//     }
//
//     public property(propertyHandler?: PropertyHandler<O>): ParameterPropertyMethodAnnotationBuilder<O> {
//         return new ParameterPropertyMethodAnnotationBuilder<O>(
//             this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.methodHandler
//         )
//     }
// }

export {ParameterMethodDecoratorFactory, ParameterMethodAnnotationBuilder};
