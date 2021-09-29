import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";

const Log = DecoratorBuilder.create(123).class((target) => {
}).method((target, propertyKey, descriptor, option) => {
}).build();

@Log(342)
class Demo1Class {
    constructor(a: number) {
    }
    @Log(342)
    public method() {
        console.log('call method')
    }
}

console.log(ReflectUtil.getClassDefinition(Demo1Class));

