import {DecoratorFactoryBuilder} from "../lib/decorator-factory-builder/decorator-factory-builder";

const Demo1ClassDecorator = DecoratorFactoryBuilder.create<string>().class((target, option, paramTypes) => {
    console.log('target:', target)
    console.log('option:', option)
    console.log('paramTypes:', paramTypes)
}).build();

@Demo1ClassDecorator('demo1')
class Demo1Class {

    constructor(param1: string, param2: number) {
    }
}

