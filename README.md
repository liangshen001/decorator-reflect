# ts装饰器反射增强库

### 可以像java反射一样得到typescript中class信息（属性、方法、方法参数、以及它们的装饰器和类型）


**注意：有一些情况不会被反射出来**

* 没有装饰器的 属性不会被反射出来（比如下面的A类的属性 pro1 ）
* 没有装饰器的 方法 或 方法参数，方法不会被反射出来（比如下面的A类的方法 method3 ）
* 没有任何装饰器的类 ReflectUtil.getClass方法会返回undefined（比如下面的B类）

```typescript
import {DecoratorFactoryBuilder} from "ts-decorator-reflect";
import {ReflectUtil} from "ts-decorator-reflect";

const Test = DecoratorFactoryBuilder.create<string>().class<string>().method<string>()
    .parameter<string>().property<string>().build();

@Test('abc')
export class A {

    @Test('aaa')
    private pro: string = '';

    constructor(@Test('bbb') a: string) {}

    @Test('ccc')
    method1(@Test('ddd') a: number): string {
        return '';
    }
    @Test('ccc')
    method2(): void {
    }
    method3(@Test('ddd') a: string): number {
        return 0;
    }
    
    /*************以上属性和方法会被反射，以下属性和方法不会被反射************/
    public pro1: string = '';
    method4(a: A): string {
        return '';
    }
}

export class B {
    private pro: string = '';
    method() {}
}

const bClass = ReflectUtil.getClass(B);

console.log(bClass); // 没有任何装饰器 返回undefined

const aClass = ReflectUtil.getClass(A);

console.log(aClass);

// { decorators:
//     [ { decoratorFactory: { [Function: factory] metadataKey: Symbol() },
//     metadata: 'abc' } ],
//     methods:
//         [ { name: 'method1',
//             decorators:
//                 [ { decoratorFactory: { [Function: factory] metadataKey: Symbol() },
//             metadata: 'ccc' } ],
//     returnType: [Function: String],
//     parameters:
//         [ { decorators:
//                 [ { decoratorFactory: { [Function: factory] metadataKey: Symbol() },
//             metadata: 'ddd' } ],
//     type: [Function: Number] } ],
//     isStatic: false },
//     { name: 'method2',
//         decorators:
//         [ { decoratorFactory: { [Function: factory] metadataKey: Symbol() },
//         metadata: 'ccc' } ],
//         returnType: undefined,
//             parameters: [],
//         isStatic: false },
//     { name: 'method3',
//         decorators: [],
//         returnType: [Function: Number],
//         parameters:
//             [ { decorators:
//                     [ { decoratorFactory: { [Function: factory] metadataKey: Symbol() },
//                 metadata: 'ddd' } ],
//         type: [Function: String] } ],
//         isStatic: false } ],
//     properties:
//         [ { type: [Function: String],
//     decorators:
//         [ { decoratorFactory: { [Function: factory] metadataKey: Symbol() },
//     metadata: 'aaa' } ],
//     name: 'pro',
//         isStatic: false } ],
//     name: 'A',
//         type: [Function: A],
//     parameters:
//         [ { decorators:
//                 [ { decoratorFactory: { [Function: factory] metadataKey: Symbol() },
//             metadata: 'bbb' } ],
//     type: [Function: String] } ] }
```
