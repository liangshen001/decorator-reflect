import {DecoratorFactory} from "./decorator-factory";

export type MetadataDecoratorFactory<RESOURCE, V> = RESOURCE & DecoratorFactory<V>;
