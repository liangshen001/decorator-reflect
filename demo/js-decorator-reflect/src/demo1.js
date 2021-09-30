import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";

const Log = DecoratorBuilder.create()
    .method((target, propertyKey, descriptor, option) => ({
        ...descriptor,
        value: function(...args) {
            console.time();
            try {
                console.log('call method:', propertyKey, ', paramaters:', args);
                const returnValue = descriptor.value.apply(this, args)
                console.log('call method:', propertyKey, ', return:', returnValue);
                return returnValue;
            } finally {
                console.timeEnd();
            }
        }
    })).build();

class Demo1Class {
    constructor(a) {
    }
    @Log
    method(a) {
        console.log('call method')
        return 'test';
    }
}

new Demo1Class().method(2)

