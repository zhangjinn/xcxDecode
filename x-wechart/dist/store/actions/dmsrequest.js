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
var request_1 = require('./../../utils/request.js');
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
exports.dmsRequest = function (_a) {
    var data = _a.data, method = _a.method, callback = _a.callback;
    var cisCode = wepy_1.default.$instance.globalData.cisCode;
    var account = wepy_1.default.$instance.globalData.account;
    return request_1.request({ api: "wechatEntrance/entrance.do?account=" + account + "&method=" + method, method: 'POST', data: __assign({ cisCode: cisCode }, data), header: {
            'content-type': 'application/json'
        }, callback: callback });
};
