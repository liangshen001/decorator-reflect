import {ReflectUtil, DecoratorBuilder} from "decorator-reflect";

const TestDecorator = DecoratorBuilder.create().class().method().parameter().property().build();

@TestDecorator('test class option')
export class Demo3 {

    @TestDecorator('pro1 property option')
    pro = '';

    constructor(@TestDecorator('constructor option') a) {}

    @TestDecorator('method1 option')
    method1(@TestDecorator('method1 param1 option') a) {
        return '';
    }
    @TestDecorator('method2 option')
    method2() {
    }
    method3(@TestDecorator('method3 param1 option') a) {
        return 0;
    }

    /*************没有装饰器的属性不会被反射，以上属性和方法会被反射，以下属性和方法不会被反射************/
    pro1 = '';
    method4(a) {
        return '';
    }
}

console.log(ReflectUtil.getMethodDefinition(Demo3, 'method1'));
// {
//     name: 'method1',
//     annotations: [ { type: [Function], option: 'method1 option' } ],
//     returnType: [Function: String],
//     parameters: [ { annotations: [Array], type: [Function: Number] } ],
//     isStatic: false
// }

console.log(ReflectUtil.getClassDefinition(Demo3));

// console.log(ReflectUtil.getMethodDefinition(Test, 'method1'));
// console.log(ReflectUtil.getDecoratorDefinitionForMethodParameter(Test, 'method1', 0, TestDecorator))

/**
 * 结果
{
  decorators: [ { type: [Function: decoratorFactory], option: 'test class option' } ],
  methods: [
    {
      name: 'method1',
      decorators: [ { type: [Function: decoratorFactory], option: 'method1 option' } ],
      returnType: [Function: String],
      parameters: [ { decorators: [ { type: [Function: decoratorFactory], option: 'method1 param1 option' } ], type: [Function: Number] } ],
      isStatic: false
    },
    {
      name: 'method2',
      decorators: [ { type: [Function: decoratorFactory], option: 'method2 option' } ],
      returnType: undefined,
      parameters: [],
      isStatic: false
    },
    {
      name: 'method3',
      decorators: [],
      returnType: [Function: Number],
      parameters: [ { decorators: [ { type: [Function: decoratorFactory], option: 'method3 param1 option' } ], type: [Function: Number] } ],
      isStatic: false
    }
  ],
  properties: [
    {
      type: [Function: String],
      decorators: [ { type: [Function: decoratorFactory], option: 'pro1 property option' } ],
      name: 'pro',
      isStatic: false
    }
  ],
  name: 'Test',
  type: [Function: Test],
  parameters: [ { decorators: [ { type: [Function: decoratorFactory], option: 'constructor option' } ], type: [Function: String] } ]
}
 */
