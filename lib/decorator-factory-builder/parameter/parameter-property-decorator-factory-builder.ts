import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterPropertyMethodDecoratorFactoryBuilder} from './parameter-property-method-decorator-factory-builder';
import {ParameterPropertyClassDecoratorFactoryBuilder} from './parameter-property-class-decorator-factory-builder';
import {MakeDecoratorUtil} from "../../util/make-decorator-util";

type ParameterPropertyDecoratorFactory<O> = (option: O) => (ParameterDecorator & PropertyDecorator)


class ParameterPropertyDecoratorFactoryBuilder<O>
    extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public parameterHandler: ParameterHandler<O>,
        public propertyHandler: PropertyHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): ParameterPropertyDecoratorFactory<O> {
        return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, this.propertyHandler,
            undefined, undefined, this.defaultOption, this.metadataKey);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterPropertyDecoratorFactoryBuilder<O> {
        return new ParameterPropertyDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler);
    }
    public method(
        methodHandler: MethodHandler<O>
    ): ParameterPropertyMethodDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, methodHandler
        );
    }

    public class(classHandler: ClassHandler<O>): ParameterPropertyClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, classHandler
        );
    }

    public property(propertyHandler: PropertyHandler<O>): ParameterPropertyDecoratorFactoryBuilder<O> {
        return new ParameterPropertyDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler);
    }

}

export {ParameterPropertyDecoratorFactory, ParameterPropertyDecoratorFactoryBuilder};
