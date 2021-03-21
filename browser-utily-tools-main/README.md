# browser-utily-tools

Utility tools in the browser environment

## API

[API 参考](./docs/api.md)

## usage

```bash
npm install browser-utily-tools --save
```

**DEMO-01**
适配一个集合对数据

```js
import { adapterDataListFormatSync } from "browser-utily-tools";

const source = [
    { number: 10, value: "黎明" },
    { number: 23, value: "liling" },
];
const rules = { number: "age", value: "name" };

const result = adapterDataListFormatSync(source, rules);
// [{ age: 10, name: "黎明" }, { age: 23, name: "liling" }];
```

**DEMO-02**
适配一组数据

```js
import { adapterDataFormatSync } from "browser-utily-tools";

const obj = { a: "a", b: "b" };
const rules = { a: "c" };

adapterDataFormatSync(obj);
// { c: "a" , b: "b" }
```

**DEMO-03**
List 转为 Tree

```js
import { listToTree } from "browser-utily-tools";

const entries = [
    {
        id: "12",
        parentId: "0",
        text: "Man",
        level: "1",
        children: null,
    },
    {
        id: "6",
        parentId: "12",
        text: "Boy",
        level: "2",
        children: null,
    },
    {
        id: "7",
        parentId: "12",
        text: "Other",
        level: "2",
        children: null,
    },
    {
        id: "9",
        parentId: "0",
        text: "Woman",
        level: "1",
        children: null,
    },
    {
        id: "11",
        parentId: "9",
        text: "Girl",
        level: "2",
        children: null,
    },
];

listToTree(entries);
```

**DEMO-04**
一些基本类型方法

```js
import { types } from "browser-utily-tools";

types.isArray([]); // true
types.isNAN(NAN); // true
types.isEqual({ a: 10 }, { a: 10 }); // false
types.isNull(null); // true
types.isRegExp(/\[|]/g); // true
// ...

types.hasType(null); // Null
types.hasType({}); // Object
// ....
```
