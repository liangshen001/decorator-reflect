import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {PropertyClassDecoratorFactoryBuilder} from './property-class-decorator-factory-builder';
import {PropertyMethodDecoratorFactoryBuilder} from './property-method-decorator-factory-builder';
import {ParameterPropertyDecoratorFactoryBuilder} from '../parameter/parameter-property-decorator-factory-builder';
import {MakeDecoratorUtil} from "../../util/make-decorator-util";

type PropertyDecoratorFactory<OP> = (option: OP) => PropertyDecorator;

class PropertyDecoratorFactoryBuilder<O> extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public propertyHandler: PropertyHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): PropertyDecoratorFactory<O> {
        return MakeDecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<O>(
            undefined, this.propertyHandler, undefined, undefined, this.defaultOption, this.metadataKey);
    }
    public class(
        classHandler: ClassHandler<O>
    ): PropertyClassDecoratorFactoryBuilder<O> {
        return new PropertyClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.propertyHandler, classHandler);
    }

    public method(
        methodHandler: MethodHandler<O>
    ): PropertyMethodDecoratorFactoryBuilder<O> {
        return new PropertyMethodDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.propertyHandler, methodHandler);
    }

    public property(
        propertyHandler: PropertyHandler<O>
    ): PropertyDecoratorFactoryBuilder<O> {
        return new PropertyDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, propertyHandler);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterPropertyDecoratorFactoryBuilder<O> {
        return new ParameterPropertyDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler);
    }

}

export {PropertyDecoratorFactory, PropertyDecoratorFactoryBuilder};
