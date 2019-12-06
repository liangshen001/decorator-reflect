import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterDecoratorFactory} from './parameter-decorator-factory-builder';
import {PropertyDecoratorFactory} from '../property/property-decorator-factory-builder';
import {MethodDecoratorFactory} from '../method/method-decorator-factory-builder';
import {ClassDecoratorFactory} from '../class/class-decorator-factory-builder';
import {MakeDecoratorUtil} from "../../util/make-decorator-util";

type ParameterPropertyMethodClassDecoratorFactory<O> = ParameterDecoratorFactory<O> & PropertyDecoratorFactory<O> & MethodDecoratorFactory<O> & ClassDecoratorFactory<O>;


class ParameterPropertyMethodClassDecoratorFactoryBuilder<O>
    extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public parameterHandler: ParameterHandler<O>,
        public propertyHandler: PropertyHandler<O>,
        public methodHandler: MethodHandler<O>,
        public classHandler: ClassHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): ParameterPropertyMethodClassDecoratorFactory<O> {
        return <any> MakeDecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<O>(
            this.parameterHandler, this.propertyHandler, this.methodHandler, this.classHandler, this.defaultOption, this.metadataKey);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterPropertyMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.methodHandler, this.classHandler);
    }
    public method(
        methodHandler: MethodHandler<O>
    ): ParameterPropertyMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, methodHandler, this.classHandler);
    }
    public class(classHandler: ClassHandler<O>): ParameterPropertyMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, this.methodHandler, classHandler);
    }

    public property(propertyHandler: PropertyHandler<O>)
        : ParameterPropertyMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.methodHandler, this.classHandler);
    }

}

export {ParameterPropertyMethodClassDecoratorFactory, ParameterPropertyMethodClassDecoratorFactoryBuilder};
