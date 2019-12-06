/**
 * 反射出的装饰器信息
 */
import {DecoratorFactory} from "../bean/decorator-factory";

/**
 * 装饰器
 * DF 装饰器工厂类型
 * V  装饰器metadata值类型
 */
export type Decorator<DF extends DecoratorFactory<O> = any, O = any> = {
    /**
     * 装饰器工场实例
     */
    decoratorFactory: DF;

    option: O;
}

