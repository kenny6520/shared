function convertQueryStringToObject(url) {
    return url
        .match(/([^?=&]+)(=([^&]*))/g)
        .reduce(
            (initial, curr) => (
                (initial[curr.slice(0, curr.indexOf("="))] = curr.slice(curr.indexOf("=") + 1)),
                initial
            ),
            {}
        );
}

function convertObjectToQueryString(options) {
    return Object.keys(options)
        .map((key) => `${key}=${encodeURIComponent(options[key])}`)
        .join("&");
}

export { convertQueryStringToObject, convertObjectToQueryString };
