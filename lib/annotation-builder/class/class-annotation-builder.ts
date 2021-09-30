import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {MethodClassAnnotationBuilder} from '../method/method-class-annotation-builder';
import {PropertyClassAnnotationBuilder} from '../property/property-class-annotation-builder';
import {ParameterClassAnnotationBuilder} from '../parameter/parameter-class-annotation-builder';
import {Annotation} from "../../bean/annotation";

type ClassAnnotation<O> = ((option?: O) => ClassDecorator) & Annotation<O>;
// type ClassDecoratorFactory<O> =
//     O extends void ?
//         (ClassDecorator & (() => ClassDecorator)) :
//         (option: O) => ClassDecorator;

type ClassAnnotationBuilder<O> = {
    build(): ClassAnnotation<O>;
    class(classHandler?: ClassHandler<O>): ClassAnnotationBuilder<O>;
    method(methodHandler?: MethodHandler<O>): MethodClassAnnotationBuilder<O>;
    property(propertyHandler?: PropertyHandler<O>): PropertyClassAnnotationBuilder<O>;
    parameter(parameterHandler?: ParameterHandler<O>): ParameterClassAnnotationBuilder<O>;
}

// class ClassAnnotationBuilder<O> extends AbstractAnnotationBuilder<O> {
//
//     constructor(
//         public defaultOption: O | ((o: O) => O) | undefined,
//         public metadataKey: string | symbol | undefined,
//         public classHandlers: ClassHandler<O>[]
//     ) {
//         super(defaultOption, metadataKey, [], [], [], classHandlers);
//     }
//
//     public build(): ClassAnnotation<O> {
//         return super.build();
//     }
//
//     public class(classHandler?: ClassHandler<O>): ClassAnnotationBuilder<O> {
//         if (classHandler) {
//             this.classHandlers.push(classHandler);
//         }
//         return this;
//     }
//
//     public method(methodHandler?: MethodHandler<O>): MethodClassAnnotationBuilder<O> {
//         const methodHandlers = methodHandler ? [methodHandler] : [];
//         return new MethodClassAnnotationBuilder<O>(this.defaultOption, this.metadataKey, methodHandlers, this.classHandlers);
//     }
//
//     public property(propertyHandler?: PropertyHandler<O>): PropertyClassDecoratorFactoryBuilder<O> {
//         const propertyHandlers = propertyHandler ? [propertyHandler] : [];
//         return new PropertyClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, propertyHandlers, this.classHandlers);
//     }
//
//     public parameter(parameterHandler?: ParameterHandler<O>): ParameterClassDecoratorFactoryBuilder<O> {
//         const parameterHandlers = parameterHandler ? [parameterHandler] : [];
//         return new ParameterClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, parameterHandlers, this.classHandlers);
//     }
//
// }


export {ClassAnnotation, ClassAnnotationBuilder};
