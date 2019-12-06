import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodClassDecoratorFactoryBuilder} from './parameter-method-class-decorator-factory-builder';
import {ParameterPropertyClassDecoratorFactoryBuilder} from './parameter-property-class-decorator-factory-builder';
import {MakeDecoratorUtil} from "../../util/make-decorator-util";


type ParameterClassDecoratorFactory<O> = (option: O) => (ParameterDecorator & ClassDecorator);

class ParameterClassDecoratorFactoryBuilder<O>
    extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public parameterHandler: ParameterHandler<O>,
        public classHandler: ClassHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): ParameterClassDecoratorFactory<O> {
        return MakeDecoratorUtil.makeDecoratorFactory<O>(this.parameterHandler, undefined,
            undefined, this.classHandler, this.defaultOption, this.metadataKey);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterClassDecoratorFactoryBuilder<O> {
        return new ParameterClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler, this.classHandler);
    }
    public method(
        methodHandler: MethodHandler<O>
    ): ParameterMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, methodHandler, this.classHandler);
    }
    public class(classHandler: ClassHandler<O>): ParameterClassDecoratorFactoryBuilder<O> {
        return new ParameterClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandler, classHandler);
    }

    public property(propertyHandler: PropertyHandler<O>): ParameterPropertyClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.classHandler);
    }

}

export {ParameterClassDecoratorFactory, ParameterClassDecoratorFactoryBuilder};
