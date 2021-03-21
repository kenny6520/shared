/**
 * @LI: 生成基于随机数对uuid
 * @description 浏览器环境中没法直接获取mac地址等唯一参数, 基于随机数+时间戳的uuid可能会出现重复, 但机率特别小
 */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
    });
    return uuid;
}

export { generateUUID };
