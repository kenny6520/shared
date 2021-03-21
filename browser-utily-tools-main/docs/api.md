### query

用于网络请求场景中 query 参数相互转换

```js
import { convertQueryStringToObject, convertObjectToQueryString } from "browser-utily-tools";

const obj = { age: 10, name: "liling" };
convertObjectToQueryString(obj); // age=10&name=liling

const url = "http://www.google.com?age=10&name=liling";
convertQueryStringToObject(url); // { age: 10, name: "liling" }
```

### types

内置类型判断支持

```js
import { types } from "browser-utily-tools";

// 类型检测 types.is + {typeName};
types.isArray([]);
types.isFunction(function func() {});
types.isObject({});
types.isNumber(10);
// other....

// 类型判断 hasType(value);
types.hasType([]); // Array
types.hasType(null); // Null
types.hasType(/\[|]/g); // RegExp
```

### adapter

提供一个适配对象数组的方法`adapterDataListFormatSync`和对单个对象适配对方法`adapterDataFormatSync`

`适配对象数组`

```js
import { adapterDataListFormatSync } from "browser-utily-tools";

const source = [
    { number: 20, value: "liling" },
    { number: 22, value: "zhaoxing" },
];
const rules = { number: "age", value: "name" };

adapterDataListFormatSync(source, rules);
// [
//     { age: 20, name: "liling" },
//     { age: 22, name: "zhaoxing" },
// ];
```

`适配对象`

```js
import { adapterDataFormatSync } from "browser-utily-tools";

const obj = { number: 10, value: "liling" };
const rules = { number: "age", value: "name" };

adapterDataFormatSync(obj, rules);
// { age: 10, name: "liling" };
```

### debounce

增强版本防抖方法, 支持立即执行、参数透传、取消执行

```js
import { debounce } from "browser-utily-tools";

// 第三个参数代表是否立即执行
const handlerFunc = debounce(
    function eventHandler(event) {
        console.log(event); // 参数透传
    },
    2000,
    false
);
node.onmousemove = handlerFunc;

// 取消
handlerFunc.cancel();
```

### throttle

增强版本截流函数，前两个参数用法同 debounce，第三个参数为对象

-   leading：false 表示禁用第一次执行
-   trailing: false 表示禁用停止触发的回调

> leading 和 trailing 不能同时设置

```js
import { throttle } from "browser-utily-tools";

const handlerFunc = throttle(function eventHandler(event) {
    console.log(event)
}, 2000, { leading：false });

node.onmousemove = handlerFunc;

// 取消
handlerFunc.cancel()
```
