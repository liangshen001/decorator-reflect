import {AbstractDecoratorFactoryBuilder} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {MethodDecoratorFactory} from './method-decorator-factory-builder';
import {ClassDecoratorFactory} from '../class/class-decorator-factory-builder';
import {PropertyMethodClassDecoratorFactoryBuilder} from '../property/property-method-class-decorator-factory-builder';
import {ParameterMethodClassDecoratorFactoryBuilder} from '../parameter/parameter-method-class-decorator-factory-builder';
import {MetadataDecoratorFactory} from "../../bean/metadata-decorator-factory";
import {MakeDecoratorUtil} from "../../util/make-decorator-util";


type MethodClassDecoratorFactory<O> = (option: O) => MethodDecorator & ClassDecorator;

class MethodClassDecoratorFactoryBuilder<O> extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public methodHandler: MethodHandler<O>,
        public classHandler: ClassHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): MethodClassDecoratorFactory<O> {
        return MakeDecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<O>(
            undefined, undefined, this.methodHandler, this.classHandler, this.defaultOption, this.metadataKey);
    }

    public class(classHandler: ClassHandler<O>): MethodClassDecoratorFactoryBuilder<O> {
        return new MethodClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.methodHandler, classHandler);
    }

    public method(methodHandler: MethodHandler<O>): MethodClassDecoratorFactoryBuilder<O> {
        return new MethodClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, methodHandler, this.classHandler);
    }
    public property(propertyHandler: PropertyHandler<O>): PropertyMethodClassDecoratorFactoryBuilder<O> {
        return new PropertyMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, propertyHandler, this.methodHandler, this.classHandler);
    }

    public parameter(parameterHandler: ParameterHandler<O>): ParameterMethodClassDecoratorFactoryBuilder<O> {
        return new ParameterMethodClassDecoratorFactoryBuilder<O>(
            this.defaultOption, this.metadataKey, parameterHandler, this.methodHandler, this.classHandler
        );
    }

}
export {MethodClassDecoratorFactory, MethodClassDecoratorFactoryBuilder};
