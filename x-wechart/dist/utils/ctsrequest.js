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
var request_1 = require('./request.js');
var wepy_1 = require('./../npm/wepy/lib/wepy.js');
exports.ctsRequest = function (_a) {
    var data = _a.data, method = _a.method, callback = _a.callback, type = _a.type;
    var jesssionid = 'JSESSIONID=' + wepy_1.default.$instance.globalData.sessionId;
    return request_1.request({ api: "cts/ctsApi.nd", method: "post", data: __assign({ serviceCode: method }, data), header: {
            'content-type': 'application/json',
            Cookie: jesssionid
        }, callback: callback });
};
