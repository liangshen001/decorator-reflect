import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodClassDecoratorFactoryBuilder} from './parameter-method-class-decorator-factory-builder';
import {ParameterPropertyMethodDecoratorFactoryBuilder} from './parameter-property-method-decorator-factory-builder';
import {MakeDecoratorUtil} from "../../util/make-decorator-util";

type ParameterMethodDecoratorFactory<O> = (option: O) => (ParameterDecorator & MethodDecorator);

class ParameterMethodDecoratorFactoryBuilder<O> extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public parameterHandler: ParameterHandler<O>,
        public methodHandler: MethodHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): ParameterMethodDecoratorFactory<O> {
        return <any> MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, undefined,
            this.methodHandler, undefined, this.defaultOption, this.metadataKey);
    }

    public parameter(parameterHandler: ParameterHandler<O>
    ): ParameterMethodDecoratorFactoryBuilder<O> {
        return new ParameterMethodDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler, this.methodHandler);
    }
    public method(
        methodHandler: MethodHandler<O>
    ): ParameterMethodDecoratorFactoryBuilder<O> {
        return new ParameterMethodDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandler, methodHandler);
    }
    public class(classHandler: ClassHandler<O>): ParameterMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, this.methodHandler, classHandler);
    }

    public property(propertyHandler: PropertyHandler<O>): ParameterPropertyMethodDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.methodHandler
        )
    }
}

export {ParameterMethodDecoratorFactory, ParameterMethodDecoratorFactoryBuilder};
