
export type Annotation<O> = {
    metadataKey: symbol | string;
    // 为了保存泛型中的类型 实际为空
    __optionType?: O;
};
