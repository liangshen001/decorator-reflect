import {PayloadDefinition} from "./payload-definition";
import {ReflectMetadataUtil} from "../util/reflect-metadata-util";


export class PropertyDefinition<T extends Function = any> extends PayloadDefinition {

    private constructor(public target: Object,
                        public type: T,
                        public name: string | symbol,
                        public isStatic: boolean) {
        super();
    }

    static of(target: Object, propertyKey: string | symbol, type: Function): PropertyDefinition {
        return new PropertyDefinition(target, type, propertyKey, target instanceof Function);
    }

}
