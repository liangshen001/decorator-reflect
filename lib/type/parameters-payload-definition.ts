import {DecoratorsPayloadDefinition} from "./decorators-payload-definition";
import {ParameterDefinition} from "./parameter-definition";
import {Annotation} from "../bean/annotation";

export class ParametersPayloadDefinition extends DecoratorsPayloadDefinition {
    parameters: ParameterDefinition[] = [];

    getParameterDefinitions<O, P>(decorator: Annotation<O, P>) {
        return this.parameters.filter(i => i.hasDecoratorDefinition(decorator));
    }
}
