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
var wepy_1 = require('./../npm/wepy/lib/wepy.js');
var toast_1 = require('./../components/vant/toast/toast.js');
var wepy_redux_1 = require('./../npm/wepy-redux/lib/index.js');
var loading_1 = require('./../store/types/loading.js');
var index_1 = require('./index.js');
/**
 * 测试环境: http://b2b-front-cis.devapps.hisense.com
 * 正式环境: http://b2b-front-cis.devapps.hisense.com
 */
// export const baseUrl = 'http://b2b-front-cis.devapps.hisense.com';
exports.baseUrl = 'https://xtw.hisense.com/front';
exports.baseUrl1 = 'http://xinshang.hisense.com:82';
var STATUS_CODE = {
    'user.not.match': '用户信息未找到',
    'Required String parameter \'mobile\' is not present': '手机号码格式不正确',
};
// 验证超时名单
var BLACK_LIST = {
    'product/list.nd': true
};
var IGNORE_MSG = {
    '会员不存在': true,
    '请登录！': true,
    '未绑定用户': true
};
exports.request = function (_a, sys) {
    var api = _a.api, _b = _a.method, method = _b === void 0 ? 'GET' : _b, data = _a.data, _c = _a.type, type = _c === void 0 ? 'form' : _c, _d = _a.header, header = _d === void 0 ? {} : _d, callback = _a.callback;
    if (sys === void 0) { sys = "normal"; }
    return new Promise(function (resolve, reject) {
        var ignoreToastError = (data || {})['_ignoreToast'];
        var usePopupError = (data || {})['_popup'];
        var item = index_1.getUrl(api, sys);
        var dmsRequest = item.dmsRequest;
        var url = item.url;
        // 增强体验：加载中
        wx.showNavigationBarLoading();
        if (api.indexOf('_loading') > 0 || (data || {})['_loading']) {
            wepy_redux_1.getStore().dispatch({ type: loading_1.LOADING_MSG, payload: true });
            toast_1.default.loading({
                message: '正在加载',
                duration: 15000,
            });
        }
        wepy_1.default.request({
            url: url,
            method: method,
            data: data,
            timeout: BLACK_LIST[api] ? 6000 : 0,
            header: __assign({ 'content-type': type == 'form' ? 'application/x-www-form-urlencoded;charset=utf-8' : 'application/json' }, header),
            success: function (res) {
                var data = res.data;
                var successStatus = res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 204;
                var successMsg = (data.code || '0') === '0';
                if ((!dmsRequest && successStatus) || (dmsRequest && successStatus && successMsg)) {
                    // 如果状态码为200，但是data.startWith <!DOCTYPE  则跳转至登录页面
                    resolve(data);
                }
                else {
                    if (!IGNORE_MSG[data.message || data.msg || '--'] && !ignoreToastError) {
                        toast_1.default.fail({
                            forbidClick: true,
                            duration: 2000,
                            message: STATUS_CODE[data.message] || data.message || data.msg || '系统错误,请稍后重试',
                        });
                    }
                    else if (usePopupError) {
                        // 使用popup组件进行提示
                        wepy_redux_1.getStore().dispatch({ type: loading_1.SHOW_POPUP_TOAST, payload: {
                                info: data.msg,
                                show: true
                            } });
                    }
                    reject(res);
                }
            },
            fail: function (err) {
                if (err && err.errMsg == 'request:fail timeout') {
                    wx.showToast({
                        title: '请求超时',
                        duration: 2000,
                        icon: 'none',
                        mask: false,
                    });
                }
                reject(err);
            },
            complete: function (res) {
                if (res.statusCode == 500) {
                    index_1.logInfo(res);
                }
                // 隐藏加载提示
                wx.hideNavigationBarLoading();
                if (api.indexOf('_loading') > 0 || (data || {})['_loading']) {
                    // 隐藏Loading
                    toast_1.default.clear();
                    wepy_redux_1.getStore().dispatch({ type: loading_1.LOADING_MSG, payload: false });
                }
                // 获取响应 cookies
                var item = index_1.getUrl(api, sys);
                if (item.url.indexOf('xtw.hisense.com') > -1 || item.url.indexOf('b2b-front-cis.devapps.hisense.com') > -1) {
                    var cookies = res.header ? res.header['Set-Cookie'] || res.header['set-cookie'] : '';
                    if (cookies) {
                        var token = index_1.getCookie('JSESSIONID', cookies);
                        var globalData = wepy_1.default.$instance.globalData;
                        if (token && globalData.sessionId) {
                            globalData.modifySession = token;
                            globalData.sessionId = token;
                            var item_1 = __assign({ sessionid: token }, globalData);
                            index_1.setStorage('b2b_token', JSON.stringify(item_1));
                        }
                    }
                }
                // tslint:disable-next-line: no-unused-expression
                callback && callback(res);
            },
        });
    });
};
