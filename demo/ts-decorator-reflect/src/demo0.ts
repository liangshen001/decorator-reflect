import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";

/**
 * 创建装饰器工厂 TestAnnotation
 */
const TestAnnotation = DecoratorBuilder.create<string>()
    .method(((target, propertyKey, descriptor, option, definition) => {
        console.log('**********method');
        console.log(target); // TestClass { method: [Function] }
        console.log(propertyKey); // method
        console.log(option); // test method
        console.log(definition);
        /**
MethodDefinition {
  decorators: [ DecoratorDefinition { type: [Function], option: 'test method' } ],
  name: 'method',
  parameters: [ ParameterDefinition { decorators: [], type: [Function: String] } ],
  returnType: [Function: Boolean],
  isStatic: false
}
         */
    })).property(((target, propertyKey, option, definition) => {
        console.log('**********property');
        console.log(target); // [Function: TestClass]
        console.log(propertyKey); // prop
        console.log(option); // test property
        console.log(definition);
        /**
PropertyDefinition {
  decorators: [ DecoratorDefinition { type: [Function], option: 'test property' } ],
  type: [Function: Boolean],
  name: 'prop',
  isStatic: true
}
         */
    })).parameter((target, propertyKey, parameterIndex, option, definition) => {
        console.log('**********parameter');
        console.log(target); // [Function: TestClass]
        console.log(propertyKey); // undefined
        console.log(parameterIndex); // 1
        console.log(definition);
        /**
ParameterDefinition {
  decorators: [
    DecoratorDefinition { type: [Function], option: 'test parameter' }
  ],
  type: [Function: String]
}
         */
    }).class((target, option, definition) => {
        console.log('**********class');
        console.log(target); // [Function: TestClass]
        console.log(option); // test class
        console.log(2222);
        console.log(definition); // ClassDefinition
    }).build();

const Test = DecoratorBuilder.create().class().build();

@Test()
@TestAnnotation('test class')
class TestClass {

    @TestAnnotation('test property')
    static prop?: boolean;

    constructor(a: number, @TestAnnotation('test parameter') b: string) {
    }
    @TestAnnotation('test method')
    method(a: string): boolean {
        return true;
    }
}
// 获取反射信息 ClassDefinition
// console.log(ReflectUtil.getDefinition(TestClass).parameters);
