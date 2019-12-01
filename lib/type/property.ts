import {Decorator} from "./decorator";


export type Property = {
    /**
     * 属性类型
     */
    type: Function;
    /**
     * 属性名称
     */
    name: string | symbol;

    decorators: Decorator[];

    isStatic: boolean;
}
