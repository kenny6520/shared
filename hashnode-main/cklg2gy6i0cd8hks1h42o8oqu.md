## 理解KOA洋葱模型

**推荐阅读，什么是中间件？**

- 知乎[中间件是什么？如何解释比较通俗易懂？](https://www.zhihu.com/question/19730582) 
- Red Hat [中间件技术简介](https://www.redhat.com/zh/topics/middleware/what-is-middleware)

**在JavaScript中实现可以扩展的中间件**

项目中中间件的设计需要考虑到后期的扩展，马上展示的就是koa中使用洋葱模型的实现方式; 我将一些重要的部分抽离出来最后形成离这样的核心代码。

```js
export function compose(middlewares){
    return function last(next) {
        function dispatch(i){
            let processingFunc = middlewares[i];
            if(i === middlewares.length) {
                processingFunc = next;
            }
            return processingFunc(dispatch.bind(null, i + 1))
        }
        return dispatch(0)
    }
}
``` 
compose函数接收一个数组，数组中的每一项都是一个中间件（本质是一个函数），大概如下。函数接收一个调用下一个函数执行的参数next..

```js
function middleware1(next){
    console.log("do something before middleware 01")
    next()
    console.log("do something after middleware 01")
}
``` 

最后完整的代码为

```js
export function compose(middlewares){
    return function last(next) {
        function dispatch(i){
            let processingFunc = middlewares[i];
            if(i === middlewares.length) {
                processingFunc = next;
            }
            return processingFunc(dispatch.bind(null, i + 1))
        }
        return dispatch(0)
    }
}

function middleware1(next){
    console.log("do something before middleware 01")
    next()
    console.log("do something after middleware 01")
}

function middleware2 (next){
    console.log("do something before middleware 02")
    next()
    console.log("do something after middleware 02")
}

const middlewares = [middleware1, middleware2];
const fn = compose(middlewares); // ?
fn(last)

function last(){
    console.log("last")
}
``` 


