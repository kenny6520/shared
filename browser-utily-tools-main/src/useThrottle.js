/**
 *
 * @param {Fn} eventHandler 处理函数（fn）
 * @param {Number} delay 延迟时间 (ms)
 * @param {Object} options 参数配置Object {leading, trailing}
 * ```js
 *  leading：false 表示禁用第一次执行
 *  trailing: false 表示禁用停止触发的回调
 * ```
 */
function throttle(eventHandler, delay, options) {
    let timeout,
        context,
        args,
        result,
        previous = 0;

    if (!options) options = {};

    const later = function () {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        eventHandler.apply(context, args);
        if (!timeout) context = args = null;
    };

    const throttled = function () {
        const now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        const remaining = delay - (now - previous);
        context = this;

        args = arguments;
        if (remaining <= 0 || remaining > delay) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            previous = now;
            eventHandler.apply(context, args);

            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    };

    return throttled;
}

export { throttle };
