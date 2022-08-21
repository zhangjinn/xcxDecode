"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var consultation_1 = require('./../types/consultation.js');
// 获取我的咨询列表
exports.getConsultList = redux_actions_1.createAction(consultation_1.GET_CONSULT_LIST, function (pageNo, title, beginDate, answerFlag) { return request_1.request({ api: "question/mineList.nd?page=" + pageNo + "&title=" + title + "&beginDate=" + beginDate + "&answerFlag=" + answerFlag }); });
// 获取我的咨询详情
exports.getConsultDetail = redux_actions_1.createAction(consultation_1.GET_CONSULT_DETAIL, function (id) { return request_1.request({ api: "question/mineDetail.nd?id=" + id }); });
// 关闭咨询
exports.closeConsult = redux_actions_1.createAction(consultation_1.CLOSE_CONSULT, function (data, callback) { return request_1.request({ api: 'question/closeQuestion.nd', method: 'POST', data: data, callback: callback }); });
// 我要咨询初始化接口
exports.getcommitQuestion = redux_actions_1.createAction(consultation_1.GET_COMMIT_QUESTION, function (level) { return request_1.request({ api: "question/commitQuestion.nd?level=" + level }); });
// 根据组织ID获取物料组
exports.getMaterialCode = redux_actions_1.createAction(consultation_1.GET_MATERIAL_CODE, function (orgId) { return request_1.request({ api: "question/setMaterialCode.nd?orgId=" + orgId }); });
//提交我要咨询的信息
exports.postMineQuestion = redux_actions_1.createAction(consultation_1.POST_MINE_QUESTION, function (data, callback) { return request_1.request({ api: "question/saveMineQuestion.nd", method: 'POST', data: data, callback: callback }); });
// 追问
exports.goAsk = redux_actions_1.createAction(consultation_1.GO_ASK, function (data, callback) { return request_1.request({ api: '/question/goAsk.nd', method: 'POST', data: data, callback: callback }); });
// 上传照片
exports.uploadImg = redux_actions_1.createAction(consultation_1.UPLOAD_IMG, function (data, callback) { return request_1.request({ api: "comm/uploadFileNew.nd", method: 'POST', data: data, callback: callback }); });
