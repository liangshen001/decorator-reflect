import {Decorator} from "./decorator";
import {Parameter} from "./parameter";


export type Method = {
    /**
     * 方法返回类型
     */
    returnType: Function;
    parameters: Parameter[];
    /**
     * 方法名称
     */
    name: string | symbol;

    decorators: Decorator[];

    isStatic: boolean;
}
