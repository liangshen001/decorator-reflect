# Typescript '注解' (装饰器工厂)

**用于创建装饰器工厂（带参数的装饰器、装饰器工厂、 这里叫这个工厂为'注解'）, 合并现有的装饰器 ，并可以像java反射一样得到typescript中class信息（属性、方法、方法参数、以及它们的装饰器工厂（注解）和类型）**

**AnnotationBuilder build出来的是装饰器的工厂 使用方法 @Test() 而不是@Test 所以Test是一个工厂这里称它为注解（ AnnotationBuilder 等阶 DecoratorFactoryBuilder）**

## 安装
```
npm i ts-decorator-reflect -s
```

## 使用方法

### 基本使用方法

```typescript
import {AnnotationBuilder, ReflectUtil} from "ts-decorator-reflect";

const TestAnnotation = AnnotationBuilder.create<string>()
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
import {AnnotationBuilder, ReflectUtil} from "ts-decorator-reflect";
const Test: ClassDecorator = (target) => {
    // do something
}
const Test2: ClassDecorator = (target) => {
    // do something
}
const Test3: MethodDecorator = (target) => {
    // do something
}

const TestWrapper = AnnotationBuilder.create().class(Test).class(Test2).method(Test3).build();

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
* node v12
* reflect-metadata
* typescript
* ts-node@8.3.0


**注意：有一些情况不会被反射出来**

* 属性没有装饰器（比如下面的TestDecorator类的属性 pro1 ）
* 方法 和 方法参数都没有装饰器（比如下面的TestDecorator类的方法 method4 ）



## 最小项目例子

```
mkdir ts-decorator-reflect-test
cd ts-decorator-reflect-test

npm init

tsc --init

npm i ts-decorator-reflect reflect-metadata typescript ts-node@8.3.0

vim test.ts
```

### test.ts
```typescript
import {DecoratorFactoryBuilder, ReflectUtil} from "ts-decorator-reflect";

const TestDecorator = DecoratorFactoryBuilder.create<string>().class().method().parameter().property().build();

@TestDecorator('test class option')
export class Test {

    @TestDecorator('pro1 property option')
    private pro: string = '';

    constructor(@TestDecorator('constructor option') a: string) {}

    @TestDecorator('method1 option')
    method1(@TestDecorator('method1 param1 option') a: number): string {
        return '';
    }
    @TestDecorator('method2 option')
    method2(): void {
    }
    method3(@TestDecorator('method3 param1 option') a: number): number {
        return 0;
    }

    /*************没有装饰器的属性不会被反射，以上属性和方法会被反射，以下属性和方法不会被反射************/
    public pro1: string = '';
    method4(a: number): string {
        return '';
    }
}
const classDefinition = ReflectUtil.getClassDefinition(Test);
console.log(classDefinition);
/**
 * 结果
 {
  decorators: [ { type: [Function: TestDecorator], option: 'test class option' } ],
  methods: [
    {
      name: 'method1',
      decorators: [ { type: [Function: TestDecorator], option: 'method1 option' } ],
      returnType: [Function: String],
      parameters: [ { decorators: [ { type: [Function: TestDecorator], option: 'method1 param1 option' } ], type: [Function: Number] } ],
      isStatic: false
    },
    {
      name: 'method2',
      decorators: [ { type: [Function: TestDecorator], option: 'method2 option' } ],
      returnType: undefined,
      parameters: [],
      isStatic: false
    },
    {
      name: 'method3',
      decorators: [],
      returnType: [Function: Number],
      parameters: [ { decorators: [ { type: [Function: TestDecorator], option: 'method3 param1 option' } ], type: [Function: Number] } ],
      isStatic: false
    }
  ],
  properties: [
    {
      type: [Function: String],
      decorators: [ { type: [Function: TestDecorator], option: 'pro1 property option' } ],
      name: 'pro',
      isStatic: false
    }
  ],
  name: 'Test',
  type: [Function: Test],
  parameters: [ { decorators: [ { type: [Function: TestDecorator], option: 'constructor option' } ], type: [Function: String] } ]
}
 */

```

### 由于使用到decorator特性 tsconfig.json需要开启下面俩个选项

```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```
### 运行测试

```
ts-node test.ts
```

### 输出类的反射信息
```
{
  decorators: [ { type: [Function: TestDecorator], option: 'test class option' } ],
  methods: [
    {
      name: 'method1',
      decorators: [ { type: [Function: TestDecorator], option: 'method1 option' } ],
      returnType: [Function: String],
      parameters: [ { decorators: [ { type: [Function: TestDecorator], option: 'method1 param1 option' } ], type: [Function: Number] } ],
      isStatic: false
    },
    {
      name: 'method2',
      decorators: [ { type: [Function: TestDecorator], option: 'method2 option' } ],
      returnType: undefined,
      parameters: [],
      isStatic: false
    },
    {
      name: 'method3',
      decorators: [],
      returnType: [Function: Number],
      parameters: [ { decorators: [ { type: [Function: TestDecorator], option: 'method3 param1 option' } ], type: [Function: Number] } ],
      isStatic: false
    }
  ],
  properties: [
    {
      type: [Function: String],
      decorators: [ { type: [Function: TestDecorator], option: 'pro1 property option' } ],
      name: 'pro',
      isStatic: false
    }
  ],
  name: 'Test',
  type: [Function: Test],
  parameters: [ { decorators: [ { type: [Function: TestDecorator], option: 'constructor option' } ], type: [Function: String] } ]
}
```
