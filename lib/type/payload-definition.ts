import {DecoratorDefinition} from "./decorator-definition";
import {Annotation} from "../bean/annotation";

export abstract class PayloadDefinition {
    protected constructor(public decorators: DecoratorDefinition[] = []) {
    }
    addDecorator(decorator: DecoratorDefinition) {
        this.decorators.push(decorator);
    }

    hasDecorator<O, P>(decorator: Annotation<O, P>) {
        return this.decorators.some(i => i.type === decorator);
    }
}
