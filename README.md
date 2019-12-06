# ts装饰器反射增强库

### 用于创建装饰器，可以像java反射一样得到typescript中class信息（属性、方法、方法参数、以及它们的装饰器和类型）


**注意：有一些情况不会被反射出来**

* 属性没有装饰器（比如下面的A类的属性 pro1 ）
* 没有装饰器的 方法 或 方法参数，方法不会被反射出来（比如下面的A类的方法 method3 ）

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

console.log(ReflectUtil.getClassDefinition(Test));
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

### 当然typescript中的装饰器 是区别于 java中的注解的，装饰器可以在使用的时候就会去触发一段代码，使用DecoratorFactoryBuilder创建装饰器时允许您执行一段代码

````typescript
import {DecoratorFactoryBuilder} from "ts-decorator-reflect";
import {ReflectUtil} from "ts-decorator-reflect";



````
