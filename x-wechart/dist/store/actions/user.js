"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var user_1 = require('./../types/user.js');
// 获取用户信息
exports.getUserInfo = redux_actions_1.createAction(user_1.GET_USER_INFO, function () { return request_1.request({ api: 'api/user/captcha-resp-string' }); });
// 用户登录
exports.userLogin = redux_actions_1.createAction(user_1.USER_LOGIN_ACTION, function (data, callback) { return request_1.request({ api: 'login.nd', method: 'POST', data: data, callback: callback }); });
// unionId 登录
exports.unionIdLogin = redux_actions_1.createAction(user_1.USER_LOGIN_ACTION, function (data, callback) { return request_1.request({ api: 'ping.nd', method: 'POST', data: data, callback: callback }); });
// 用户登录
exports.bindAccount = redux_actions_1.createAction(user_1.USER_BIND_ACTION, function (data, callback) { return request_1.request({ api: 'bindAccount.nd', method: 'POST', data: data, callback: callback }); });
// 用户权限
exports.userPermissions = redux_actions_1.createAction(user_1.USER_PERMISSIONS, function (data, callback) { return request_1.request({ api: 'menu/list.nd?loginPlant=XCX&pageNo=1&pageSize=500&t=' + new Date().getTime(), method: 'GET', data: data, callback: callback }); });
// 提示信息接口
exports.getAlert = redux_actions_1.createAction(user_1.USER_ALERT, function (data, callback) { return request_1.request({ api: 'msg/getFrontMsg.nd?t=' + new Date().getTime(), method: 'GET', data: data, callback: callback }); });
// 客户访问菜单记录-新增
exports.addMenuRecord = redux_actions_1.createAction(user_1.ADD_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'custMenuVisit/addOrUpdate.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 客户访问菜单记录-查询
exports.getMenuRecord = redux_actions_1.createAction(user_1.GET_MENU_RECORD, function (data, callback) { return request_1.request({ api: 'custMenuVisit/page.nd?clientPlatform=mip', method: 'GET', data: data, callback: callback }); });
// 注销账户-注销协议提示
exports.getCommPage = redux_actions_1.createAction(user_1.GET_COMM_PAGE, function (data, callback) { return request_1.request({ api: 'fast/report/commPage.nd?loginPlant=XCX', method: 'GET', data: data, callback: callback }); });
// 注销账户-注销账号发送短信
exports.sendMsg = redux_actions_1.createAction(user_1.SEND_MSG, function (data, callback) { return request_1.request({ api: 'account/sendMsg.nd', method: 'POST', data: data, callback: callback }); });
// 注销账户-注销账号校验短信
exports.checkMsg = redux_actions_1.createAction(user_1.SEND_MSG, function (data, callback) { return request_1.request({ api: 'account/checkMsg.nd', method: 'POST', data: data, callback: callback }); });
// 注销账户-注销账号原因
exports.getCancellationReason = redux_actions_1.createAction(user_1.GET_CANCELLATION_REASON, function (data, callback) { return request_1.request({ api: 'comm/dict.nd?pid=90700', method: 'GET', data: data, callback: callback }); });
// 注销账户-注销账号申请
exports.applyCancelAccount = redux_actions_1.createAction(user_1.APPLY_CANCEL_ACCOUNT, function (data, callback) { return request_1.request({ api: 'account/applyCancelAccount.nd', method: 'POST', data: data, callback: callback }); });
// 注销账户-注销账户提交-待办
exports.cancelAccount = redux_actions_1.createAction(user_1.CANCEL_ACCOUNT, function (data, callback) { return request_1.request({ api: 'account/cancelAccount.nd', method: 'POST', data: data, callback: callback }); });
