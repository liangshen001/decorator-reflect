import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {PropertyMethodClassDecoratorFactoryBuilder} from './property-method-class-decorator-factory-builder';
import {ParameterPropertyMethodDecoratorFactoryBuilder} from '../parameter/parameter-property-method-decorator-factory-builder';
import {MakeDecoratorUtil} from "../../util/make-decorator-util";


type PropertyMethodDecoratorFactory<O> = (option: O) => (PropertyDecorator & MethodDecorator);

class PropertyMethodDecoratorFactoryBuilder<O> extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public propertyHandler: PropertyHandler<O>,
        public methodHandler: MethodHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): PropertyMethodDecoratorFactory<O> {
        return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(undefined, this.propertyHandler,
            this.methodHandler, undefined, this.defaultOption, this.metadataKey);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterPropertyMethodDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.methodHandler
        )
    }

    public method(
        methodHandler: MethodHandler<O>
    ): PropertyMethodDecoratorFactoryBuilder<O> {
        return new PropertyMethodDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.propertyHandler, methodHandler);
    }

    public class(
        classHandler: ClassHandler<O>
    ): PropertyMethodClassDecoratorFactoryBuilder<O> {
        return new PropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.propertyHandler, this.methodHandler, classHandler);
    }

    public property(
        propertyHandler: PropertyHandler<O>
    ): PropertyMethodDecoratorFactoryBuilder<O> {
        return new PropertyMethodDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, propertyHandler, this.methodHandler);
    }
}

export {PropertyMethodDecoratorFactory, PropertyMethodDecoratorFactoryBuilder};
