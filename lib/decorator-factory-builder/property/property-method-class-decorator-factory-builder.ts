import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ClassDecoratorFactory} from '../class/class-decorator-factory-builder';
import {PropertyDecoratorFactory} from './property-decorator-factory-builder';
import {MethodDecoratorFactory} from '../method/method-decorator-factory-builder';
import {ParameterPropertyMethodClassDecoratorFactoryBuilder} from '../parameter/parameter-property-method-class-decorator-factory-builder';
import {PropertyMethodDecoratorFactory} from './property-method-decorator-factory-builder';
import {PropertyClassDecoratorFactory} from './property-class-decorator-factory-builder';
import {MethodClassDecoratorFactory} from '../method/method-class-decorator-factory-builder';
import {MetadataDecoratorFactory} from "../../bean/metadata-decorator-factory";
import {MakeDecoratorUtil} from "../../util/make-decorator-util";

type PropertyMethodClassDecoratorFactory<O> = MethodDecoratorFactory<O> & ClassDecoratorFactory<O> & PropertyDecoratorFactory<O>;


class PropertyMethodClassDecoratorFactoryBuilder<O>
    extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public propertyHandler: PropertyHandler<O>,
        public methodHandler: MethodHandler<O>,
        public classHandler: ClassHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): PropertyMethodClassDecoratorFactory<O> {
        return <any> MakeDecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<O>(
            undefined, this.propertyHandler, this.methodHandler, this.classHandler, this.defaultOption, this.metadataKey);
    }

    public class(classHandler: ClassHandler<O>): PropertyMethodClassDecoratorFactoryBuilder<O> {
        return new PropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.propertyHandler, this.methodHandler, classHandler);
    }

    public method(methodHandler: MethodHandler<O>): PropertyMethodClassDecoratorFactoryBuilder<O> {
        return new PropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.propertyHandler, methodHandler, this.classHandler);
    }
    public property(propertyHandler: PropertyHandler<O>): PropertyMethodClassDecoratorFactoryBuilder<O> {
        return new PropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, propertyHandler, this.methodHandler, this.classHandler
        );
    }

    public parameter(parameterHandler: ParameterHandler<O>)
        : ParameterPropertyMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.methodHandler, this.classHandler
        );
    }

}

export {PropertyMethodClassDecoratorFactory, PropertyMethodClassDecoratorFactoryBuilder};
