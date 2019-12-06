import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterClassDecoratorFactory} from './parameter-class-decorator-factory-builder';
import {ParameterPropertyDecoratorFactory} from './parameter-property-decorator-factory-builder';
import {ParameterDecoratorFactory} from './parameter-decorator-factory-builder';
import {PropertyDecoratorFactory} from '../property/property-decorator-factory-builder';
import {ClassDecoratorFactory} from '../class/class-decorator-factory-builder';
import {ParameterPropertyMethodClassDecoratorFactoryBuilder} from './parameter-property-method-class-decorator-factory-builder';
import {PropertyClassDecoratorFactory} from '../property/property-class-decorator-factory-builder';
import {MetadataDecoratorFactory} from "../../bean/metadata-decorator-factory";
import {MakeDecoratorUtil} from "../../util/make-decorator-util";


type ParameterPropertyClassDecoratorFactory<O> = ParameterDecoratorFactory<O> & PropertyDecoratorFactory<O> & ClassDecoratorFactory<O>;

class ParameterPropertyClassDecoratorFactoryBuilder<O>
    extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public parameterHandler: ParameterHandler<O>,
        public propertyHandler: PropertyHandler<O>,
        public classHandler: ClassHandler<O>,
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): ParameterPropertyClassDecoratorFactory<O> {
        return <any> MakeDecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<O>(
            this.parameterHandler, this.propertyHandler, undefined, this.classHandler, this.defaultOption, this.metadataKey);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterPropertyClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, parameterHandler, this.propertyHandler, this.classHandler);
    }
    public method(
        methodHandler: MethodHandler<O>
    ): ParameterPropertyMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, methodHandler, this.classHandler);
    }
    public class(classHandler: ClassHandler<O>): ParameterPropertyClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, this.propertyHandler, classHandler);
    }

    public property(propertyHandler: PropertyHandler<O>): ParameterPropertyClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.classHandler);
    }

}

export {ParameterPropertyClassDecoratorFactory, ParameterPropertyClassDecoratorFactoryBuilder};
