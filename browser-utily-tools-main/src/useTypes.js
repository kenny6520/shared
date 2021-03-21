/**
 * @LI: 增强类型方法
 */
class EnhanceType {
    constructor() {
        this.builtInExtendType = {
            isNaN: (value) => Number.isNaN(value),
            hasType: (value) =>
                Object.prototype.toString.call(value).replace(/\[|]/g, "").split(" ")[1],
            isEqual: (value1, value2) => Object.is(value1, value2),
        };
    }

    extend(extendOptions) {
        if (!Object.prototype.toString.call(extendOptions) === "[object Object]") {
            throw new Error("Only supports expansion with object types");
        }
        this.builtInExtendType = { ...this.builtInExtendType, ...extendOptions };
    }

    getAllEnhanceType() {
        return this.builtInExtendType;
    }
}
const enhanceType = new EnhanceType();

/**
 * @Li: 基本的判断方法
 */
function getSupportedType() {
    const primitiveSupportedBaseType = ["Null", "Undefined", "Number", "String", "Boolean"];
    const primitiveSupportedObjectAndSubType = [
        "Object",
        "Function",
        "Array",
        "Date",
        "JSON",
        "RegExp",
    ];

    return {
        baseType: primitiveSupportedBaseType,
        objectAndSubType: primitiveSupportedObjectAndSubType,
        allType: [...primitiveSupportedBaseType, ...primitiveSupportedObjectAndSubType],
    };
}

function typeEventHandlers(allType, eventHandler, extendTypes) {
    let builtInHandlers = {};
    allType.forEach((typename) => {
        builtInHandlers[`is${typename}`] = eventHandler(typename);
    });
    return builtInHandlers;
}

function generateEventHandler(typename) {
    return (value) => Object.prototype.toString.call(value) === `[object ${typename}]`;
}

function merge(object1, object2) {
    return { ...object1, ...object2 };
}

/**
 * @Li:需要导出的
 */
const base = typeEventHandlers(getSupportedType().allType, generateEventHandler);
const enhance = enhanceType.getAllEnhanceType();
const types = merge(base, enhance);

export { types, getSupportedType, generateEventHandler, enhanceType };
