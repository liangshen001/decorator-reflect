import {ParameterDefinition} from "../type/parameter-definition";

export type ParameterHandler<O> =
    ((target: Object, propertyKey: string, parameterIndex: number, option: O, definition: ParameterDefinition) => void);
