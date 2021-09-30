/**
 * 反射出的装饰器信息
 */
import {Annotation} from "../bean/annotation";

/**
 * 装饰器
 * A 装饰器工厂类型
 * O  装饰器metadata值类型
 */
export class DecoratorDefinition<A extends Annotation<O> = any, O = any> {
    constructor(public type: A,
                public option: O) {
    }

}

