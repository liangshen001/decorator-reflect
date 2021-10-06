import {DecoratorDefinition} from "./decorator-definition";
import {ParameterDefinition} from "./parameter-definition";
import {ReflectMetadataUtil} from "../util/reflect-metadata-util";
import {PayloadDefinition} from "./payload-definition";
import {ParametersPayloadDefinition} from "./parameters-payload-definition";


export class MethodDefinition<R extends Function = any> extends ParametersPayloadDefinition {
    private constructor(public target: Object,
                        public name: string | symbol,
                        public parameters: ParameterDefinition[],
                        public returnType: R,
                        public isStatic: boolean = target instanceof Function) {
        super();
    }
    static of(target: Object, propertyKey: string | symbol, paramTypes: ParameterDefinition[], returnType: Function): MethodDefinition {
        return new MethodDefinition(target, propertyKey, paramTypes, returnType);
    }

    setParameterDecorator(index: number, decorator: DecoratorDefinition) {
        let parameter = this.parameters[index];
        if (!parameter) {
            parameter = ParameterDefinition.of(this.target, this.name, index, undefined);
            this.parameters[index] = parameter;
        }
        parameter.addDecorator(decorator)
        return parameter;
    }
}
