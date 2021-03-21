## EcmaScript262 Core knowledge 01

### Conformance

> 规范第二章

A conforming implementation of ECMAScript must provide and support all the types, values, objects, properties, functions, and program syntax and semantics described in this specification；

符合 ECMAScript 规范的实现必须提供并支持本规范中描述的所有类型、值、对象、属性、函数以及程序语法和语义


A conforming implementation of ECMAScript must interpret source text input in conformance with the latest version of the Unicode Standard and ISO/IEC 10646

符合 ECMAScript 规范的实现必须按照 Unicode 标准和 ISO/IEC 10646 的最新版本解释源文本输入


A conforming implementation of ECMAScript that provides an application programming interface (API) that supports programs that need to adapt to the linguistic and cultural conventions used by different human languages and countries must implement the interface defined by the most recent edition of `ECMA-402` that is compatible with this specification

<font color="#cddcdf">符合 ECMAScript 规范的实现，提供了一个应用程序编程接口(API) ，支持需要适应不同人类语言和国家使用的语言和文化约定的程序，必须实现最新版本的 `ECMA-402` 所定义的与本规范相兼容的接口</font>

### Overview

> 规范第三章 EcmaScript Overview

ECMAScript is object-based: basic language and host facilities are provided by objects, and an ECMAScript program is a cluster of communicating objects. In ECMAScript, an object is a collection of zero or more properties each with attributes that determine how each property can be used—for example, when the `Writable` attribute for a property is set to false, any attempt by executed ECMAScript code to assign a different value to the property fails.

符合 ECMAScript 是基于对象的: 基本语言和 host facilities `<主机设施>` 都是由对象提供的，一个 ecmascript 程序是一个通信对象的集群；在 ecmascript 中，对象是由 zero or more（0 个或多个）属性组成的集合，每个属性都是具有如何去使用他的属性；举例：当 `Writable` 属性设置成了 `false`, 任何试图执行 ECMAScript code 去改成不同的值都会失败；


Properties are containers that hold other objects, primitive values, or functions.
属性是容纳 `其他对像`、`原始值`、`functions`的容器；


A primitive value is a `member` of one of the following `built-in types`: Undefined, Null, Boolean, Number, BigInt, String, and Symbol;

an object is a member of the built-in type Object; and a function is a `callable` object. A function that is associated with an object via a property is called a method;


一个原始值是以下内置类型之一的成员,

-   Undefined,
-   Null,
-   Boolean,
-   Number,
-   BigInt,
-   String,
-   Symbol


对象是内置类型 Object 的成员，一个函数是一个 `可召回的`（可调用） 对象, 通过一个属性与对象关联的函数叫做方法


ECMAScript defines a collection of built-in objects that round out the definition of ECMAScript entities. These built-in objects include the global object; objects that are fundamental to the runtime semantics of the language including Object, Function, Boolean, Symbol, and various Error objects; objects that represent and manipulate numeric values including Math, Number, and Date; the text processing objects String and RegExp; objects that are indexed collections of values including Array and nine different kinds of Typed Arrays whose elements all have a specific numeric data representation; keyed collections including Map and Set objects; objects supporting structured data including the JSON object, ArrayBuffer, SharedArrayBuffer, and DataView; objects supporting control abstractions including generator functions and Promise objects; and reflection objects including Proxy and Reflect


ECMAScript 定义了一组内置对象，这些对象完善了 ECMAScript 实体的定义。

内置对象包括
-   全局对象;
-   对语言语义有重要意义的对象，包括 Object、 Function、 Boolean、 Symbol 和各种 Error 对象; 表示和操作数值(包括 Math、 Number 和 Date)的对象;
-   文本处理对象 String 和 RegExp; 包括 Array 和 9 种不同类型的类型数组(其元素都具有特定的数值数据表示)的索引值集合对象;
-   包括 Map 和 rayset 对象的键控集合; 支持结构化数据(包括 JSON 对象、 ArrayBuffer、 sharedarbuffer 和 DataView)的对象;
-   支持控制抽象(包括 generator 函数和 Promise 对象)的对象;
-   以及包括 Proxy 和 Reflect 对象在内的反射对象


ECMAScript also defines a set of built-in operators. ECMAScript operators include various unary operations, multiplicative operators, additive operators, bitwise shift operators, relational operators, equality operators, binary bitwise operators, binary logical operators, assignment operators, and the comma operator.

ECMAScript 也定义了一组内置操作符。运算符包括各种一元运算符、乘法运算符、加法运算符、位移运算符、关系运算符、相等运算符、二元位运算符、二元逻辑运算符、赋值运算符和逗号运算符


Large ECMAScript programs are supported by `modules` which allow a program to be divided into multiple sequences of statements and declarations. Each module explicitly identifies declarations it uses that need to be provided by other modules and which of its declarations are available for use by other modules

大型 ECMAScript 程序通过模块支持，这些模块允许程序被划分为多个语句和声明序列。每个模块都明确指出它使用的声明需要由其他模块提供，以及哪些声明可供其他模块使用；

