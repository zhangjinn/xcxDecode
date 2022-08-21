"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require('./../common/utils.js');
var defaultOptions = {
    type: 'text',
    mask: false,
    message: '',
    show: true,
    zIndex: 1000,
    duration: 3000,
    position: 'middle',
    forbidClick: false,
    loadingType: 'circular',
    selector: '#van-toast',
    recursive: ['#container', '#van-toast']
};
var queue = [];
var currentOptions = __assign({}, defaultOptions);
function parseOptions(message) {
    return utils_1.isObj(message) ? message : { message: message };
}
function getContext() {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
}
function Toast(toastOptions) {
    var options = __assign({}, currentOptions, parseOptions(toastOptions));
    var context = options.context || getContext();
    var toast = context.selectComponent(options.selector);
    if (!toast) {
        var rcontext = context;
        for (var i = 0; i < options.recursive.length; i++) {
            var selector = options.recursive[i];
            rcontext = rcontext.selectComponent(selector);
            if (!rcontext) {
                break;
            }
            if (i === options.recursive.length - 1) {
                toast = rcontext; // 找到了最里面的节点
            }
        }
    }
    if (!toast) {
        console.warn('未找到 van-toast 节点，请确认 selector 及 context 是否正确');
        return;
    }
    delete options.context;
    delete options.selector;
    toast.clear = function () {
        toast.set({ show: false });
        if (options.onClose) {
            options.onClose();
        }
    };
    queue.push(toast);
    toast.set(options);
    clearTimeout(toast.timer);
    if (options.duration > 0) {
        toast.timer = setTimeout(function () {
            toast.clear();
            queue = queue.filter(function (item) { return item !== toast; });
        }, options.duration);
    }
    return toast;
}
var createMethod = function (type) { return function (options) {
    return Toast(__assign({ type: type }, parseOptions(options)));
}; };
Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');
Toast.clear = function () {
    queue.forEach(function (toast) {
        toast.clear();
    });
    queue = [];
};
Toast.setDefaultOptions = function (options) {
    Object.assign(currentOptions, options);
};
Toast.resetDefaultOptions = function () {
    currentOptions = __assign({}, defaultOptions);
};
exports.default = Toast;
