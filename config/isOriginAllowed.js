const whiteList = [/\.duia\.com/];

function isString(s) {
    return typeof s === "string" || s instanceof String;
}

function isOriginAllowed(origin, allowedOrigin = whiteList) {
    if (Array.isArray(allowedOrigin)) {
        for (var i = 0; i < allowedOrigin.length; ++i) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
                return true;
            }
        }
        return false;
    } else if (isString(allowedOrigin)) {
        return origin === allowedOrigin;
    } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
    } else {
        return !!allowedOrigin;
    }
}

module.exports = isOriginAllowed;
