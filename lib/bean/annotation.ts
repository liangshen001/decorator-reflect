
export type Annotation<O = any, P = any> = {
    metadataKey: symbol | string;
    OPTION_TYPE: O;
    PARAM_TYPE: P;
};
