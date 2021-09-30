import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";
const Demo4Decorator = DecoratorBuilder.create(
    p => p === true || p.required === true).class().build();

@Demo4Decorator(true)
export class Demo4 {
}
@Demo4Decorator({required: true})
export class Demo41 {
}

let option = ReflectUtil.getDecoratorOption(Demo4Decorator, Demo4);
console.log('Demo4 option:', option);
let option2 = ReflectUtil.getDecoratorOption(Demo4Decorator, Demo41);
console.log('Demo41 option:', option2);
