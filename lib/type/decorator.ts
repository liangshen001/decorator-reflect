/**
 * 反射出的装饰器信息
 */
import {DecoratorFactory} from "../bean/decorator-factory";

/**
 * 装饰器
 * DF 装饰器工厂类型
 * V  装饰器metadata值类型
 */
export type Decorator<V = any, DF extends DecoratorFactory<V> = any> = {
    /**
     * 装饰器工场实例
     */
    decoratorFactory: DF;

    /**
     *
     */
    metadataValue: V;

    option: any | undefined;
}

