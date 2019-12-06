import {AbstractDecoratorFactoryBuilder} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {MethodClassDecoratorFactoryBuilder} from '../method/method-class-decorator-factory-builder';
import {PropertyClassDecoratorFactoryBuilder} from '../property/property-class-decorator-factory-builder';
import {ParameterClassDecoratorFactoryBuilder} from '../parameter/parameter-class-decorator-factory-builder';
import {MakeDecoratorUtil} from "../../util/make-decorator-util";

type ClassDecoratorFactory<O> = (option: O) => ClassDecorator;
// type ClassDecoratorFactory<O> =
//     O extends void ?
//         (ClassDecorator & (() => ClassDecorator)) :
//         (option: O) => ClassDecorator;

class ClassDecoratorFactoryBuilder<O> extends AbstractDecoratorFactoryBuilder<O> {

    constructor(
        public defaultOption: O | ((o: O) => O) | undefined,
        public metadataKey: string | symbol | undefined,
        public classHandler: ClassHandler<O>
    ) {
        super(defaultOption, metadataKey);
    }

    public build(): ClassDecoratorFactory<O> {
        return MakeDecoratorUtil.makeDecoratorFactory<O>(undefined, undefined,
            undefined, this.classHandler, this.defaultOption, this.metadataKey);
    }

    public class(classHandler: ClassHandler<O>): ClassDecoratorFactoryBuilder<O> {
        return new ClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, classHandler);
    }

    public method(methodHandler: MethodHandler<O>): MethodClassDecoratorFactoryBuilder<O> {
        return new MethodClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, methodHandler, this.classHandler);
    }

    public property(propertyHandler: PropertyHandler<O>): PropertyClassDecoratorFactoryBuilder<O> {
        return new PropertyClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, propertyHandler, this.classHandler);
    }

    public parameter(parameterHandler: ParameterHandler<O>): ParameterClassDecoratorFactoryBuilder<O> {
        return new ParameterClassDecoratorFactoryBuilder<O>(this.defaultOption, this.metadataKey, parameterHandler, this.classHandler);
    }

}

export {ClassDecoratorFactory, ClassDecoratorFactoryBuilder};
