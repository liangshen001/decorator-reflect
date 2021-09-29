import {DecoratorDefinition} from "./decoratorDefinition";


export type PropertyDefinition = {
    /**
     * 属性类型
     */
    type?: Function;
    /**
     * 属性名称
     */
    name: string | symbol;

    decorators: DecoratorDefinition[];

    isStatic: boolean;
}
