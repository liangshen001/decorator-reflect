import {DecoratorDefinition} from "./decoratorDefinition";
import {ParameterDefinition} from "./parameterDefinition";


export type MethodDefinition = {
    /**
     * 方法返回类型
     */
    returnType: Function;
    parameters: ParameterDefinition[];
    /**
     * 方法名称
     */
    name: string | symbol;

    decorators: DecoratorDefinition[];

    isStatic: boolean;
}
