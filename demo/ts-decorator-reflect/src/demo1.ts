import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";

const Log = DecoratorBuilder.create()
    .method((target, propertyKey, descriptor, option) => ({
        ...descriptor,
        value: function(...args: object[]) {
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
    constructor() {
    }
    @Log()
    public method() {
        return 'test';
    }
}

new Demo1Class().method()

interface Fish {
    fish: string
}
interface Water {
    water: string
}
interface Bird {
    bird: string
}
interface Sky {
    sky: string
}
//naked type
type Condition<T> = T extends Fish ? Water : Sky;


let condition1: Condition<Fish | Bird> = { water: '水', sky: '' };
let condition2: Condition<Fish | Bird> = { sky: '天空' };

