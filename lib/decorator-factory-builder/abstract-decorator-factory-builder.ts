import {ParameterHandler} from '../bean/parameter-handler';
import {PropertyHandler} from '../bean/property-handler';
import {ClassHandler} from '../bean/class-handler';
import {MethodHandler} from '../bean/method-handler';
import {MetadataDecoratorFactory} from "../bean/metadata-decorator-factory";

abstract class AbstractDecoratorFactoryBuilder<O> {

    constructor(public defaultOption?: O | ((o: O) => O), public metadataKey?: string | symbol) {}

    public abstract parameter(parameterHandler: ParameterHandler<O>): any;

    public abstract property(propertyHandler: PropertyHandler<O>): any;

    public abstract method(methodHandler: MethodHandler<O>): any;

    public abstract class(classHandler: ClassHandler<O>): any;

    protected abstract build(): MetadataDecoratorFactory<any, any>;
}

export {AbstractDecoratorFactoryBuilder};

