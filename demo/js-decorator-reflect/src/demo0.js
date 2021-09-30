import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";

/**
 * 创建装饰器工厂 TestAnnotation
 */
const TestAnnotation = DecoratorBuilder.create()
    .class((target, option) => {
        console.log('**********class');
        console.log(target); // [Function: TestClass]
        console.log(option); // test class
    }).parameter((target, propertyKey, parameterIndex, option) => {
        console.log('**********parameter');
        console.log(target); // [Function: TestClass]
        console.log(propertyKey); // undefined
        console.log(parameterIndex); // 1
        console.log(option); // test parameter
    }).property(((target, propertyKey, option, isStatic) => {
        console.log('**********property');
        console.log(target); // [Function: TestClass]
        console.log(propertyKey); // prop
        console.log(option); // test property
        console.log(isStatic); // true
    })).method(((target, propertyKey, descriptor,
                 option, isStatic) => {
        console.log('**********method');
        console.log(target); // TestClass {}
        console.log(propertyKey); // prop
        console.log(option); // test property
        console.log(isStatic); // false
    })).build();

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
