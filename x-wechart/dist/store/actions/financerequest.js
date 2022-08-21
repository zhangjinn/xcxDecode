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
exports.financeRequest = function (_a) {
    var data = _a.data, method = _a.method, callback = _a.callback;
    var ssoLoginToken = wepy_1.default.$instance.globalData.ssoLoginToken; //正式环境
    var unionId = wepy_1.default.$instance.globalData.unionid; //正式环境
    var customerCode = wepy_1.default.$instance.globalData.customerCode; //正式环境
    // const ssoLoginToken = "dxxcclcllncx2233cccckklll"
    // const unionId='abc'
    // const customerCode= '2011461'
    return request_1.request({ api: "" + method, method: 'POST', data: __assign({ ssoLoginToken: ssoLoginToken,
            unionId: unionId,
            customerCode: customerCode }, data), header: {
            'content-type': 'application/json'
        }, callback: callback }, "finance");
};
