import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodClassDecoratorFactoryBuilder} from './parameter-property-method-class-decorator-factory-builder';
import {MakeDecoratorUtil} from "../../util/make-decorator-util";


type ParameterPropertyMethodDecoratorFactory<O> = (option: O) => (ParameterDecorator & PropertyDecorator & MethodDecorator);

class ParameterPropertyMethodDecoratorFactoryBuilder<O>
    extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public parameterHandler: ParameterHandler<O>,
        public propertyHandler: PropertyHandler<O>,
        public methodHandler: MethodHandler<O>,
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): ParameterPropertyMethodDecoratorFactory<O> {
        return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, this.propertyHandler,
            this.methodHandler, undefined, this.defaultOption, this.metadataKey);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterPropertyMethodDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.methodHandler);
    }
    public method(
        methodHandler: MethodHandler<O>
    ): ParameterPropertyMethodDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, methodHandler);
    }
    public class(classHandler: ClassHandler<O>): ParameterPropertyMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, this.methodHandler, classHandler);
    }

    public property(propertyHandler: PropertyHandler<O>): ParameterPropertyMethodDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.methodHandler);
    }

}

export {ParameterPropertyMethodDecoratorFactory, ParameterPropertyMethodDecoratorFactoryBuilder};
