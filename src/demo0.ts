import {DecoratorBuilder} from "../lib/annotation-builder/decorator-builder";
import {ReflectUtil} from "../lib/util/reflect-util";

/**
 * 创建装饰器工厂 TestAnnotation
 */
const TestAnnotation = DecoratorBuilder.create<string>()
    .class((target, option, paramTypes) => {
        console.log('**********class');
        console.log(target); // [Function: TestClass]
        console.log(option); // test class
        console.log(paramTypes); // [ [Function: Number], [Function: String] ]
    }).parameter((target, propertyKey, parameterIndex, option, type) => {
        console.log('**********parameter');
        console.log(target); // [Function: TestClass]
        console.log(propertyKey); // undefined
        console.log(parameterIndex); // 1
        console.log(option); // test parameter
        console.log(type); // [Function: String]
    }).property(((target, propertyKey, option, isStatic, type) => {
        console.log('**********property');
        console.log(target); // [Function: TestClass]
        console.log(propertyKey); // prop
        console.log(option); // test property
        console.log(isStatic); // true
        console.log(type); // [Function: Boolean]
    })).method(((target, propertyKey, descriptor,
                 option, isStatic, paramTypes, returnType) => {
        console.log('**********method');
        console.log(target); // TestClass {}
        console.log(propertyKey); // prop
        console.log(option); // test property
        console.log(isStatic); // false
        console.log(paramTypes); // [ [Function: String] ]
        console.log(returnType); // [Function: Boolean]
    })).build();

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
// 获取反射信息
console.log(ReflectUtil.getClassDefinition(TestClass));