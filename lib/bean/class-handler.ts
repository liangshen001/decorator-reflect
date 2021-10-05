import {ClassDefinition} from "../type/class-definition";

export type ClassHandler<O> = (<TFunction extends Function>(target: TFunction, option: O, definition: ClassDefinition<TFunction>) => (TFunction | void));
