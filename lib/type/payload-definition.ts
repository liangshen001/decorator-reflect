import {DecoratorDefinition} from "./decorator-definition";

export abstract class PayloadDefinition {
    protected constructor(public decorators: DecoratorDefinition[] = []) {
    }
    addDecorator(decorator: DecoratorDefinition) {
        this.decorators.push(decorator);
    }
}
