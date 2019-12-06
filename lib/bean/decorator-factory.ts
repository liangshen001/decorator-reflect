
export type DecoratorFactory<O = any> = {
    metadataKey: symbol | string;
    // 为了保存泛型中的类型 实际为空
    // __metadataValueType: V;
    __optionType?: O;
};
