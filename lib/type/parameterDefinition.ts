import {DecoratorDefinition} from "./decoratorDefinition";

export type ParameterDefinition = {
    type: Function;
    decorators: DecoratorDefinition[];
}
