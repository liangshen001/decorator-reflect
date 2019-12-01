
export type DecoratorFactory<V = any> = {
    metadataKey: symbol;
    // 为了保存泛型中的类型 实际为空
    __metadataValueType: V;
};
