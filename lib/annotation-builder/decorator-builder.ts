import 'reflect-metadata';
import {ParameterHandler} from '../bean/parameter-handler';
import {PropertyHandler} from '../bean/property-handler';
import {ClassHandler} from '../bean/class-handler';
import {MethodHandler} from '../bean/method-handler';
import {ParameterAnnotationBuilder} from './parameter/parameter-annotation-builder';
import {MethodAnnotationBuilder} from './method/method-annotation-builder';
import {ClassAnnotationBuilder} from './class/class-annotation-builder';
import {PropertyAnnotationBuilder} from './property/property-annotation-builder';
import {MakeAnnotationUtil} from "../util/make-annotation-util";
import {Annotation} from "../bean/annotation";

class DecoratorBuilder<O, P> {
    parameterHandlers: ParameterHandler<O>[] = [];
    propertyHandlers: PropertyHandler<O>[] = [];
    methodHandlers: MethodHandler<O>[] = [];
    classHandlers: ClassHandler<O>[] = [];

    protected constructor(public defaultOption?: O | ((o: P) => O),
                          public metadataKey?: string | symbol) {}

    public static create<O = void, P = O>(defaultOption?: O | ((o: P) => O), metadataKey?: string | symbol): DecoratorBuilder<O, P> {
        return new DecoratorBuilder<O, P>(defaultOption, metadataKey || Symbol());
    }

    public parameter(parameterHandler?: ParameterHandler<O>): ParameterAnnotationBuilder<O, P> {
        if (parameterHandler) {
            this.parameterHandlers.push(parameterHandler);
        }
        return <any> this;
    }

    public method(methodHandler?: MethodHandler<O>): MethodAnnotationBuilder<O, P> {
        if (methodHandler) {
            this.methodHandlers.push(methodHandler);
        }
        return <any> this;
    }

    public class(classHandler?: ClassHandler<O>): ClassAnnotationBuilder<O, P> {
        if (classHandler) {
            this.classHandlers.push(<ClassHandler<O>> classHandler);
        }
        return <any> this;
    }
    public property(propertyHandler?: PropertyHandler<O>): PropertyAnnotationBuilder<O, P> {
        if (propertyHandler) {
            this.propertyHandlers.push(propertyHandler);
        }
        return <any> this;
    }

    protected build(): Annotation<O, P> {
        return MakeAnnotationUtil.makeDecoratorFactory<O, P>(this.parameterHandlers, this.propertyHandlers,
            this.methodHandlers, this.classHandlers, this.defaultOption, this.metadataKey);
    }
}

export {DecoratorBuilder, DecoratorBuilder as DecoratorFactoryBuilder, DecoratorBuilder as AnnotationBuilder};
