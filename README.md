# Decorator build + reflection tool

**Use to create decorators or decorator factories (decorators with parameters), merge existing decorators, and get typescript class information (properties, methods, method parameters < limited typescript>, and their decorators and types < limited typescript>) just like Java reflection does.**

**The DecoratorBuilder build shows how to use @Test() or @Test when the factory of the decorator has no arguments**

## Environment

* node v12

### Typescript Demo

[decorator-reflect-test](https://github.com/liangshen001/decorator-reflect/tree/master/demo/decorator-reflect/README.md)

* reflect-metadata@0.1.13
* typescript@4.4.3

### Javascript Demo
[js-decorator-reflect-test](https://github.com/liangshen001/decorator-reflect/tree/master/demo/js-decorator-reflect/README.md)

* reflect-metadata@0.1.13
* babel v7+
* babel-plugin-parameter-decorator@0.1.13

## Installation
```
npm i decorator-reflect -s
```

## API

```typescript
import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";
```

## Usage

### Basic Usage

```typescript
import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";

const Log = DecoratorBuilder.create()
    .method((target, propertyKey, descriptor, option) => ({
        ...descriptor,
        value: function(...args: object[]) {
            console.time();
            try {
                console.log('call method:', propertyKey, ', paramaters:', args);
                const returnValue = descriptor.value.apply(this, args)
                console.log('call method:', propertyKey, ', return:', returnValue);
                return returnValue;
            } finally {
                console.timeEnd();
            }
        }
    })).build();

class Demo1Class {
    constructor() {
    }
    @Log
    public method() {
        return 'test';
    }
}

new Demo1Class().method()
```

```typescript
import {DecoratorBuilder, ReflectUtil} from "decorator-reflect";

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
// Get reflection information
// console.log(ReflectUtil.getClassDefinition(TestClass));
```
### Merge multiple existing decorators
```typescript
import {DecoratorBuilder, ReflectUtil} from "decorator-reflect";
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

[中文](https://github.com/liangshen001/decorator-reflect/README-CN.md)

