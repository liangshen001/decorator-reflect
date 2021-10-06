import {PayloadDefinition} from "./payload-definition";

export class ParameterDefinition<T extends Function = any> extends PayloadDefinition {
    private constructor(public target: Object,
                        public propertyKey: string | symbol | undefined,
                        public index: number,
                        public type?: T) {
        super();
    }

    static of<T extends Function>(target: Object, propertyKey: string | symbol | undefined, index: number, type?: T) {
        return new ParameterDefinition(target, propertyKey, index, type);
    }
}
