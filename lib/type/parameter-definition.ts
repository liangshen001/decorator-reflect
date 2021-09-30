import {PayloadDefinition} from "./payload-definition";

export class ParameterDefinition<T extends Function = any> extends PayloadDefinition {
    private constructor(public type?: T) {
        super();
    }

    static of<T extends Function>(type?: T) {
        return new ParameterDefinition(type);
    }
}
