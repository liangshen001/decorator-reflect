
import {DecoratorFactoryBuilder} from "../lib/decorator-factory-builder/decorator-factory-builder";
import {ReflectUtil} from "../lib/util/reflect-util";

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