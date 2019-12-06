import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {PropertyMethodClassDecoratorFactoryBuilder} from './property-method-class-decorator-factory-builder';
import {ParameterPropertyClassDecoratorFactoryBuilder} from '../parameter/parameter-property-class-decorator-factory-builder';
import {MakeDecoratorUtil} from "../../util/make-decorator-util";

type PropertyClassDecoratorFactory<O> = (option: O) => (PropertyDecorator & ClassDecorator);

class PropertyClassDecoratorFactoryBuilder<O>
    extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public propertyHandler: PropertyHandler<O>,
        public classHandler: ClassHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): PropertyClassDecoratorFactory<O> {
        return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(undefined, this.propertyHandler,
            undefined, this.classHandler, this.defaultOption, this.metadataKey);
    }
    public class(
        classHandler: ClassHandler<O>
    ): PropertyClassDecoratorFactoryBuilder<O> {
        return new PropertyClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.propertyHandler, classHandler);
    }

    public method(
        methodHandler: MethodHandler<O>
    ): PropertyMethodClassDecoratorFactoryBuilder<O> {
        return new PropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.propertyHandler, methodHandler, this.classHandler);
    }

    public property(
        propertyHandler: PropertyHandler<O>
    ): PropertyClassDecoratorFactoryBuilder<O> {
        return new PropertyClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, propertyHandler, this.classHandler);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterPropertyClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.classHandler
        );
    }

}

export {PropertyClassDecoratorFactory, PropertyClassDecoratorFactoryBuilder};
