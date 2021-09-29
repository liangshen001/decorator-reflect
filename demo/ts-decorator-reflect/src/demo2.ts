import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";

const Test: ClassDecorator = (target) => {
    // do something
}
const Test2: ClassDecorator = (target) => {
    // do something
}

const TestWrapper = DecoratorBuilder.create().class(Test).class(Test2).build();

@Test
@Test2
class DemoClass {
}

@TestWrapper()
class Demo2Class {
}
console.log(ReflectUtil.getClassDefinition(Demo2Class));

