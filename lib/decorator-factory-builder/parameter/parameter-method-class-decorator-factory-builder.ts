import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodDecoratorFactory} from './parameter-method-decorator-factory-builder';
import {ParameterClassDecoratorFactory} from './parameter-class-decorator-factory-builder';
import {ParameterDecoratorFactory} from './parameter-decorator-factory-builder';
import {MethodDecoratorFactory} from '../method/method-decorator-factory-builder';
import {ClassDecoratorFactory} from '../class/class-decorator-factory-builder';
import {ParameterPropertyMethodClassDecoratorFactoryBuilder} from './parameter-property-method-class-decorator-factory-builder';
import {MethodClassDecoratorFactory} from '../method/method-class-decorator-factory-builder';
import {MetadataDecoratorFactory} from "../../bean/metadata-decorator-factory";
import {MakeDecoratorUtil} from "../../util/make-decorator-util";


type ParameterMethodClassDecoratorFactory<O> = ParameterDecoratorFactory<O> & MethodDecoratorFactory<O> & ClassDecoratorFactory<O>;


class ParameterMethodClassDecoratorFactoryBuilder<O>
    extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public parameterHandler: ParameterHandler<O>,
        public methodHandler: MethodHandler<O>,
        public classHandler: ClassHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): ParameterMethodClassDecoratorFactory<O> {
        return <any> MakeDecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<O>(
            this.parameterHandler, undefined, this.methodHandler, this.classHandler, this.defaultOption, this.metadataKey);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, parameterHandler, this.methodHandler, this.classHandler);
    }
    public method(
        methodHandler: MethodHandler<O>
    ): ParameterMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, methodHandler, this.classHandler);
    }
    public class(classHandler: ClassHandler<O>): ParameterMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, this.methodHandler, classHandler);
    }

    public property(propertyHandler: PropertyHandler<O>)
        : ParameterPropertyMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterPropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, this.parameterHandler, propertyHandler, this.methodHandler, this.classHandler);
    }

}

export {ParameterMethodClassDecoratorFactory, ParameterMethodClassDecoratorFactoryBuilder};
