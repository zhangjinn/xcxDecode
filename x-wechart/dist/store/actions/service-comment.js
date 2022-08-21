"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var service_comment_1 = require('./../types/service-comment.js');
var request_1 = require('./../../utils/request.js');
// 调查结果列表
exports.getExamInfo = redux_actions_1.createAction(service_comment_1.GET_EXAMINFO, function (data, callback) { return request_1.request({ api: 'serviceEstimate/list.nd', method: 'GET', data: data, callback: callback }); });
// 提交调查结果
exports.getExamSubmit = redux_actions_1.createAction(service_comment_1.SUBMIT_EXAMINFO, function (data, callback) { return request_1.request({ api: 'serviceEstimate/submit.nd', method: 'POST', data: data, type: 'json', callback: callback }); });
// 商家查询待答问卷列表new
exports.getToBeAnsweredQuestion = redux_actions_1.createAction(service_comment_1.GET_TOBE_ANSWERED_QUESTION, function (data, callback) { return request_1.request({ api: 'baseSurveyQuestion/getToBeAnsweredQuestion.nd', method: 'POST', data: data, callback: callback }); });
// 查询当前商家已答问卷列表new
exports.getAnsweredQuestionList = redux_actions_1.createAction(service_comment_1.GET_ANSWERED_QUESTION_LIST, function (data, callback) { return request_1.request({ api: 'baseSurveyQuestion/getAnsweredQuestionList.nd', method: 'POST', data: data, callback: callback }); });
