import {DecoratorDefinition} from "./decorator-definition";
import {Annotation} from "../bean/annotation";

export abstract class DecoratorsPayloadDefinition {
    protected constructor(public decorators: DecoratorDefinition[] = []) {
    }

    hasDecoratorDefinition<O, P>(decorator: Annotation<O, P>) {
        return this.decorators.some(i => i.type === decorator);
    }

    getDecoratorDefinitions<O, P>(decorator: Annotation<O, P>) {
        return this.decorators.filter(i => i.type === decorator);
    }
}
