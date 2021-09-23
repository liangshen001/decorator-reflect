import {AnnotationBuilder} from "../lib/annotation-builder/annotation-builder";
import {ReflectUtil} from "../lib/util/reflect-util";

const Test: ClassDecorator = (target) => {
    // do something
}
const Test2: ClassDecorator = (target) => {
    // do something
}

const TestWrapper = AnnotationBuilder.create().class(Test).class(Test2).build();

@Test
@Test2
class DemoClass {
}

@TestWrapper()
class Demo2Class {
}
console.log(ReflectUtil.getClassDefinition(Demo2Class));


