export function compose(middlewares){
    return function (next) {
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
