import {DecoratorFactoryBuilder} from "../lib/decorator-factory-builder/decorator-factory-builder";

type Demo1MethodDecoratorOption = {
    method: 'POST' | 'GET'
}
const Demo1MethodDecorator = DecoratorFactoryBuilder.create<Demo1MethodDecoratorOption>()
    .method((target, propertyKey, descriptor,
             option, paramTypes, returnType) => {
        console.log('target:', target)
        console.log('option:', option)
        console.log('paramTypes:', paramTypes)
        console.log('returnType:', returnType)
    }).build();


class Demo2Class {
    @Demo1MethodDecorator({
        method: 'POST'
    })
    method(param1: number): string {
        return '';
    }
}

