import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterMethodDecoratorFactoryBuilder} from '../parameter/parameter-method-decorator-factory-builder';
import {MethodClassDecoratorFactoryBuilder} from './method-class-decorator-factory-builder';
import {PropertyMethodDecoratorFactoryBuilder} from '../property/property-method-decorator-factory-builder';
import {MetadataDecoratorFactory} from "../../bean/metadata-decorator-factory";
import {MakeDecoratorUtil} from "../../util/make-decorator-util";

type MethodDecoratorFactory<O> = (option: O) => MethodDecorator;
// type MethodDecoratorFactory<O> =
//     O extends void ?
//         (MethodDecorator & ((option: O) => MethodDecorator)) :
//         (option: O) => MethodDecorator;

class MethodDecoratorFactoryBuilder<O> extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public methodHandler: MethodHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): MethodDecoratorFactory<O> {
        return MakeDecoratorUtil.makeDecoratorFactory<O>(undefined, undefined,
            this.methodHandler, undefined, this.defaultOption, this.metadataKey);
    }

    public parameter(
        parameterHandler: ParameterHandler<O>
    ): ParameterMethodDecoratorFactoryBuilder<O> {
        return new ParameterMethodDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler, this.methodHandler);
    }

    public method(
        methodHandler: MethodHandler<O>
    ): MethodDecoratorFactoryBuilder<O> {
        return new MethodDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, methodHandler);
    }
    public class(
        classHandler: ClassHandler<O>
    ): MethodClassDecoratorFactoryBuilder<O> {
        return new MethodClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, this.methodHandler, classHandler);
    }

    public property(
        propertyHandler: PropertyHandler<O>
    ): PropertyMethodDecoratorFactoryBuilder<O> {
        return new PropertyMethodDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, propertyHandler, this.methodHandler);
    }
}

export {MethodDecoratorFactory, MethodDecoratorFactoryBuilder};
