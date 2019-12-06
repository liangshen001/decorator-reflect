import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodDecoratorFactoryBuilder} from './parameter-method-decorator-factory-builder';
import {ParameterClassDecoratorFactoryBuilder} from './parameter-class-decorator-factory-builder';
import {ParameterPropertyDecoratorFactoryBuilder} from './parameter-property-decorator-factory-builder';
import {MetadataDecoratorFactory} from "../../bean/metadata-decorator-factory";
import {MakeDecoratorUtil} from "../../util/make-decorator-util";

type ParameterDecoratorFactory<O> = (option: O) => ParameterDecorator;

class ParameterDecoratorFactoryBuilder<O> extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public parameterHandler: ParameterHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): ParameterDecoratorFactory<O> {
        return MakeDecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<O>(
            this.parameterHandler, undefined, undefined, undefined, this.defaultOption, this.metadataKey);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterDecoratorFactoryBuilder<O> {
        return new ParameterDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler);
    }
    public method(
        methodHandler: MethodHandler<O>
    ): ParameterMethodDecoratorFactoryBuilder<O> {
        return new ParameterMethodDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandler, methodHandler);
    }
    public class(classHandler: ClassHandler<O>): ParameterClassDecoratorFactoryBuilder<O> {
        return new ParameterClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandler, classHandler);
    }

    public property(propertyHandler: PropertyHandler<O>): ParameterPropertyDecoratorFactoryBuilder<O> {
        return new ParameterPropertyDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler);
    }

}

export {ParameterDecoratorFactory, ParameterDecoratorFactoryBuilder};
