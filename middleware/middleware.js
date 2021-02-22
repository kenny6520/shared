import { compose } from './core';

// function compose(middlewares){
//     return function (next) {
//         function dispatch(i){
//             let processingFunc = middlewares[i];
//             if(i === middlewares.length) {
//                 processingFunc = next;
//             }
//             return processingFunc(dispatch.bind(null, i + 1))
//         }
//         return dispatch(0)
//     }
// }

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