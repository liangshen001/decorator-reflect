import 'reflect-metadata';
import {
    AbstractDecoratorFactoryBuilder
} from './abstract-decorator-factory-builder';
import {ParameterHandler} from '../bean/parameter-handler';
import {PropertyHandler} from '../bean/property-handler';
import {ClassHandler} from '../bean/class-handler';
import {MethodHandler} from '../bean/method-handler';
import {ParameterDecoratorFactoryBuilder} from './parameter/parameter-decorator-factory-builder';
import {MethodDecoratorFactoryBuilder} from './method/method-decorator-factory-builder';
import {ClassDecoratorFactoryBuilder} from './class/class-decorator-factory-builder';
import {PropertyDecoratorFactoryBuilder} from './property/property-decorator-factory-builder';

class DecoratorFactoryBuilder<O> extends AbstractDecoratorFactoryBuilder<O> {

    public static create<O>(defaultOption?: O | ((o: O) => O), metadataKey?: string | symbol): DecoratorFactoryBuilder<O> {
        return new DecoratorFactoryBuilder<O>(defaultOption, metadataKey || Symbol());
    }

    public parameter(parameterHandler: ParameterHandler<O>): ParameterDecoratorFactoryBuilder<O> {
        return new ParameterDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler);
    }

    public method(methodHandler: MethodHandler<O>): MethodDecoratorFactoryBuilder<O> {
        return new MethodDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, methodHandler);
    }

    public class(classHandler: ClassHandler<O>): ClassDecoratorFactoryBuilder<O> {
        return new ClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, classHandler);
    }
    public property(propertyHandler: PropertyHandler<O>): PropertyDecoratorFactoryBuilder<O> {
        return new PropertyDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, propertyHandler);
    }

    protected build(): any {
    }
}

export {DecoratorFactoryBuilder};

