# 装饰器构建 + 反射工具

**用于创建装饰器或装饰器工厂（带参数的装饰器）, 合并现有的装饰器 ，并可以像java反射一样得到typescript中class信息（属性、方法、方法参数<限typescript>、以及它们的装饰器和类型<限typescript>）**

**DecoratorBuilder build出来的是装饰器的工厂 无参时的使用方法 @Test() 或 @Test**

## 安装
```
npm i ts-decorator-reflect -s
```

## 使用方法

### 基本使用方法

```typescript
import {DecoratorBuilder, ReflectUtil} from "ts-decorator-reflect";

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
// console.log(ReflectUtil.getClassDefinition(TestClass));
```
### 合并多个已有装饰器
```typescript
import {DecoratorBuilder, ReflectUtil} from "ts-decorator-reflect";
const Test: ClassDecorator = (target) => {
    // do something
}
const Test2: ClassDecorator = (target) => {
    // do something
}
const Test3: MethodDecorator = (target) => {
    // do something
}

const TestWrapper = DecoratorBuilder.create().class(Test).class(Test2).method(Test3).build();

@TestWrapper()
class TestClass {
    @TestWrapper()
    test() {}
}

console.log(ReflectUtil.getClassDefinition(TestClass));
// export type ClassDefinition<T extends Function> = {
//     name: string;
//     type: T;
//     annotations: AnnotationDefinition[];
//     properties: PropertyDefinition[];
//     methods: MethodDefinition[];
//     parameters: ParameterDefinition[];
// }
```


### 环境

#### typescript

[ts-decorator-reflect-test](https://github.com/liangshen001/decorator-reflect/tree/master/demo/ts-decorator-reflect/README.md)

* node v12
* reflect-metadata
* decorator-reflect
* typescript

#### javascript babel
[js-decorator-reflect-test](https://github.com/liangshen001/decorator-reflect/tree/master/demo/js-decorator-reflect/README.md)

* node v12
* reflect-metadata
* decorator-reflect
* babel7
* babel-plugin-parameter-decorator


**注意：有一些情况不会被反射出来**

* 属性没有装饰器（比如下面的TestDecorator类的属性 pro1 ）
* 方法 和 方法参数都没有装饰器（比如下面的TestDecorator类的方法 method4 ）

