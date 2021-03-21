import { types } from "./useTypes.js";

/**
 * @LI: 适配单条数据
 * @param {Object<any, any>} child 需要修改的项目, 需要一个对象
 * @param {Object<oldKey,newKey>} rules 修改的规则, 需要一个对象 { oldKeyName: newKeyName }
 *
 * @demo
 * ```js
 *  const obj = { age: 10, name: "liling" };
 *  const result = adapterDataFormatSync(obj, {
 *      age: "currentAge",
 *      name: "currentName"
 * });
 * 输出结果： { currentAge: 10, currentName: "liling"}
 * ```
 */
export function adapterDataFormatSync(child, rules) {
    if (!types.isObject(rules)) {
        throw new Error(
            `rules need to pass in an object type as a parameter, now the rules type is ${types.hasType(
                rules
            )}`
        );
    }

    const cloneRules = cloneItem(rules),
        cloneChild = cloneItem(child);

    return Object.keys(cloneRules).reduce((prev, curr) => {
        if (curr in cloneChild) {
            cloneChild[cloneRules[curr]] = cloneChild[curr];
            return delete cloneChild[curr] && cloneChild;
        }
        return cloneChild;
    }, {});
}

function cloneItem(original) {
    return Object.assign({}, original);
}

/**
 * @LI: 适配一组数据
 * @param {Array<Object>} list 需要修改的数据集合
 * @param {Object<oldKey,newKey>} rules 修改的规则, 需要一个对象 { oldKeyName: newKeyName }
 */
export function adapterDataListFormatSync(list, rules) {
    return (
        types.isArray(list) &&
        list.map((child) => {
            return adapterDataFormatSync(child, rules);
        })
    );
}
