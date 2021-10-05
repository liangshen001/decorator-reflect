import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";

/**
 * 创建装饰器工厂 TestAnnotation
 */
const TestAnnotation = DecoratorBuilder.create('')
    .parameter((target, propertyKey, parameterIndex, option, definition) => {
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
  type: undefined
}
         */
    }).property(((target, propertyKey, option, definition) => {
        console.log('**********property');
        console.log(target); // [Function: TestClass]
        console.log(propertyKey); // prop
        console.log(option); // test property
        console.log(definition);
        /**
PropertyDefinition {
  decorators: [ DecoratorDefinition { type: [Function], option: 'test property' } ],
  type: undefined,
  name: 'prop',
  isStatic: true
}
         */
    })).method(((target, propertyKey, descriptor, option, definition) => {
        console.log('**********method');
        console.log(target); // TestClass {}
        console.log(propertyKey); // prop
        console.log(option); // test property
        console.log(definition);
        /**
MethodDefinition {
  decorators: [ DecoratorDefinition { type: [Function], option: 'test method' } ],
  name: 'method',
  parameters: [],
  returnType: undefined,
  isStatic: false
}
         */
    })).class((target, option, definition) => {
        console.log('**********class');
        console.log(target); // [Function: TestClass]
        console.log(option); // test class
        console.log(definition); // ClassDefinition
    }).build();

const Test = DecoratorBuilder.create().class().build();

@Test()
@TestAnnotation('test class')
class TestClass {

    @TestAnnotation('test property')
    static prop;

    constructor(a, @TestAnnotation('test parameter') b) {
    }
    @TestAnnotation('test method')
    method(a) {
        return true;
    }
}
// 获取反射信息
console.log(ReflectUtil.getDefinition(TestClass));
