"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var ctsrequest_1 = require('./../../utils/ctsrequest.js');
var request_1 = require('./../../utils/request.js');
var record_1 = require('./../types/record.js');
// 获取门店签到
exports.getCheckInRecordByUserCode = redux_actions_1.createAction(record_1.GET_CHECKIN_RECORD_BY_USERCODE, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'getCheckInRecordByUserCode', data: data, callback: callback }); });
//新增打卡
exports.addCheckInRecord = redux_actions_1.createAction(record_1.ADD_CHECK_IN_RECORD, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'addCheckInRecord', data: data, callback: callback }); });
// 门店人员列表
exports.getStoryPersons = redux_actions_1.createAction(record_1.GET_STORY_PERSONS, function (data, callback) { return request_1.request({ api: 'customer/customerAccount.nd', method: 'get', data: data, callback: callback }); });
//获取店铺列表
exports.getShopListByCust = redux_actions_1.createAction(record_1.GET_SHOP_LIST_BY_CUST, function (data, callback) { return request_1.request({ api: '/custShop/getShopListByCust.nd', method: 'post', type: 'json', data: data, callback: callback }); });
// 获取门店检查标准
exports.findShowList = redux_actions_1.createAction(record_1.FIND_SHOW_LIST, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'findShowList', data: data, callback: callback }); });
//上传点检项目
exports.saveStoreCheckResult = redux_actions_1.createAction(record_1.SAVE_STORE_CHECK_RESULT, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'saveStoreCheckResult', data: data, callback: callback }); });
//获取省市区信息
exports.getRegin = redux_actions_1.createAction(record_1.GET_REGIN, function (data, callback) { return request_1.request({ api: 'customer/getRegin.nd', method: 'get', data: data, callback: callback }); });
// 上传图片
exports.upload2Img = redux_actions_1.createAction(record_1.UPLOAD_2, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'uploadXtw', data: data, callback: callback }); });
// 查询未通过选项
exports.findNoPassList = redux_actions_1.createAction(record_1.FIND_NO_PASS_LIST, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'findNoPassList', data: data, callback: callback }); });
// 创建问题转办
exports.saveStoreProComplaint = redux_actions_1.createAction(record_1.SAVE_STORE_PRO_COMPLAINT, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'saveStoreProComplaint', data: data, callback: callback }); });
// 创建问题解决方案
exports.saveStoreProPlan = redux_actions_1.createAction(record_1.SAVE_STORE_PRO_PLAN, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'saveStoreProPlan', data: data, callback: callback }); });
// 打卡接口
exports.addInspectionRecord2 = redux_actions_1.createAction(record_1.ADD_INSPECTION_RECORD_2, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'addInspectionRecord2', data: data, callback: callback }); });
//发送代办通知
exports.custSophDeletage = redux_actions_1.createAction(record_1.CUST_SOPH_DELETAGE, function (data, callback) { return request_1.request({ api: 'custShop/addDelegate.nd', method: 'post', data: data, callback: callback }); });
//更新代办
exports.updateDelegate = redux_actions_1.createAction(record_1.UPDATE_DELEGATE, function (data, callback) { return request_1.request({ api: '/custShop/updateDelegate.nd', method: 'post', data: data, callback: callback }); });
//获取当前用户的点店铺
exports.getShopListByCustId = redux_actions_1.createAction(record_1.GET_SHOP_LIST_BY_CUST_ID, function (data, callback) { return request_1.request({ api: 'custShop/getShopListByCustId.nd', method: 'post', data: data, callback: callback }); });
//纠错接口
exports.fixAddress = redux_actions_1.createAction(record_1.FIX_ADDRESS, function (data, callback) { return ctsrequest_1.ctsRequest({ method: 'applyStoreRecovery', data: data, callback: callback }); });
// cis-新增门店上传照片
exports.uploadImg = redux_actions_1.createAction(record_1.UPLOAD_IMG, function (data, callback) { return request_1.request({ api: "comm/uploadFileNew.nd", method: 'POST', data: data, callback: callback }); });
// 新增门店
exports.addStore = redux_actions_1.createAction(record_1.ADD_STORE, function (data, callback) { return request_1.request({ api: 'custShop/addShop.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 修改门店
exports.editStore = redux_actions_1.createAction(record_1.EDIT_STORE, function (data, callback) { return request_1.request({ api: 'custShop/editShop.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 根据传入的流程ID查询操作日志（查询新增门店审批意见）
exports.getApprovalComments = redux_actions_1.createAction(record_1.GET_APPROVAL_COMMENTS, function (data, callback) { return request_1.request({ api: 'flow/queryOptMsgsByProcessInstID.nd', method: 'POST', type: 'application/json', data: data, callback: callback }); });
