import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";

type Demo4DecoratorParams = boolean | {required: boolean};

const Demo4Decorator = DecoratorBuilder.create<boolean, Demo4DecoratorParams>(
    p => typeof p === 'boolean' ? p : p.required).class().build();

@Demo4Decorator(true)
export class Demo4 {
}
@Demo4Decorator({required: true})
export class Demo41 {
}

let option = ReflectUtil.getDecoratorOption(Demo4Decorator, Demo4);
console.log('Demo4 option:', option); // true
let option2 = ReflectUtil.getDecoratorOption(Demo4Decorator, Demo41);
console.log('Demo41 option:', option2); // true
