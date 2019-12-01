import {Decorator} from "./decorator";
import {Property} from "./property";
import {Method} from "./method";
import {Parameter} from "./parameter";

export type Class<T extends Function = any> = {
    name: string;
    type: Function;
    decorators: Decorator[];
    properties: Property[];
    methods: Method[];
    parameters: Parameter[];
}