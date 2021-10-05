import {PropertyDefinition} from "../type/property-definition";

export type PropertyHandler<O> =( (target: Object, propertyKey: string, option: O, definition: PropertyDefinition) => void);
