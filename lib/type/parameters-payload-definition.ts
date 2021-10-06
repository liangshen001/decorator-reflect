import {PayloadDefinition} from "./payload-definition";
import {ParameterDefinition} from "./parameter-definition";
import {Annotation} from "../bean/annotation";

export class ParametersPayloadDefinition extends PayloadDefinition {
    parameters: ParameterDefinition[] = [];

    getParameters<O, P>(decorator: Annotation<O, P>) {
        return this.parameters.filter(i => i.hasDecorator(decorator));
    }
}
