import {DecoratorFactory} from "../bean/decorator-factory";
import {MakeDecoratorUtil} from "./make-decorator-util";
import {Class} from "../type/class";

export class ReflectUtil {

    public static getClass(target: Function): Class | undefined {
        return MakeDecoratorUtil.classesMap.get(target);
    }
}