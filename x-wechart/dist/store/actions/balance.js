"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var balance_1 = require('./../types/balance.js');
// 我的余额 初始化数据
exports.getBalanceInitData = redux_actions_1.createAction(balance_1.GET_BALANCE_INIT_DATA, function (_a) {
    var orgId = _a.orgId;
    return request_1.request({ api: "balance/balanceInit.nd?orgId=" + orgId });
});
// 查询余额
exports.getBalance = redux_actions_1.createAction(balance_1.GET_BALANCE_INFO, function (_a) {
    var customerCode = _a.customerCode, orgCode = _a.orgCode, matklCode = _a.matklCode;
    return request_1.request({ api: "balance/getMoney.nd?customerCode=" + customerCode + "&orgCode=" + orgCode + "&matklCode=" + matklCode });
});
// 查询预占用额度明细
exports.getWaitBalanceInfoList = redux_actions_1.createAction(balance_1.GET_WAIT_BALANCE_INFO_LIST, function (_a) {
    var orgCode = _a.orgCode, matklCode = _a.matklCode;
    return request_1.request({ api: "balance/queryWaitBalanceInfoList.nd?orgCode=" + orgCode + "&matklCode=" + matklCode });
});
// 考核通知单列表
exports.getAssessmentNoticeList = redux_actions_1.createAction(balance_1.GET_ASSESSMENT_NOTICE_LIST, function (data, callback) { return request_1.request({ api: "fast/cust/custAssessNotice/page.nd", method: 'POST', data: data, callback: callback }); });
// 查询考核通知单筛选条件列表
exports.getAssessmentNoticeFilterList = redux_actions_1.createAction(balance_1.GET_ASSESSMENT_NOTICE_FILTER_LIST, function (data, callback) { return request_1.request({ api: "comm/systemConfigFormItem.nd?formCode=custAssessNotice", method: 'POST', data: data, callback: callback }); });
// 查询考核通知单商家申诉申请
exports.assessmentNoticeAppealApplication = redux_actions_1.createAction(balance_1.ASSESSMENT_NOTICE_APPEAL_APPLICATION, function (data, callback) { return request_1.request({ api: "custAssessNotice/appealSum.nd", method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 商家确认考核通知单
exports.assessmentNoticeConfirm = redux_actions_1.createAction(balance_1.ASSESSMENT_NOTICE_CONFIRM, function (id, callback) { return request_1.request({ api: "custAssessNotice/confirm/" + id + ".nd", method: 'GET', callback: callback }); });
// 考核通知单申诉上传照片
exports.uploadImg = redux_actions_1.createAction(balance_1.UPLOAD_IMG, function (data, callback) { return request_1.request({ api: "comm/uploadFileNew.nd", method: 'POST', data: data, callback: callback }); });
