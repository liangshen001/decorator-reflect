import {AnnotationBuilder} from "../lib/annotation-builder/annotation-builder";

const Log = AnnotationBuilder.create()
    .method((target, propertyKey, descriptor, option) => ({
        ...descriptor,
        value: function(...args: object[]) {
            console.time();
            try {
                return descriptor.value.apply(this, args);
            } finally {
                console.timeEnd();
            }
        }
    })).build();


class Demo1Class {
    @Log()
    public method() {
        console.log('call method')
    }
}

new Demo1Class().method();

