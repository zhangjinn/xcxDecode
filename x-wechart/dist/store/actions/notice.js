"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var notice_1 = require('./../types/notice.js');
exports.getNewInfoItems = redux_actions_1.createAction(notice_1.GET_NEW_INFO_ITEMS, function (callback) { return request_1.request({ api: "msg/msgNum.nd", method: 'GET', callback: callback }); });
// 获取公告列表
exports.getNoticeList = redux_actions_1.createAction(notice_1.GET_NOTICE_LIST, function (pageNo, plate) { return request_1.request({ api: "billboard/loginMessagenoticeListforplate.htm?pageNo=" + pageNo + "&plate=" + plate }); });
// 获取公告列表new
exports.getNoticeListNew = redux_actions_1.createAction(notice_1.GET_NOTICE_LIST, function (data, callback) { return request_1.request({ api: "billboard/loginMessagenoticeListforplate.htm", method: 'GET', data: data, callback: callback }); });
// 获取待办列表new
exports.getUpcomingList = redux_actions_1.createAction(notice_1.GET_UPCOMING_LIST, function (data, callback) { return request_1.request({ api: "priceMessage/backlog/pageNew.nd", method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 获取通知列表new
exports.getNoticeNewList = redux_actions_1.createAction(notice_1.GET_NOTICE_NEW_LIST, function (data, callback) { return request_1.request({ api: "priceMessage/notice/page.nd", method: 'POST', type: 'application/json', data: data, callback: callback }); });
// 获取未读公告列表
exports.getMenuNoticeList = redux_actions_1.createAction(notice_1.GET_MENU_NOTICE_LIST, function (data, callback) { return request_1.request({ api: "menu/notice.nd", method: 'GET', data: data, callback: callback }); });
// 获取公告详情
exports.getNoticeDetail = redux_actions_1.createAction(notice_1.GET_NOTICE_DETAIL, function (id) { return request_1.request({ api: "billboard/messageDetail.nd?noticeCode=" + id + "&&id=" + id }); });
// 获取常见问题列表
exports.getProblemList = redux_actions_1.createAction(notice_1.GET_PROBLEM_LIST, function (pageNo, beginDate, title) { return request_1.request({ api: "/question/commonList.nd?page=" + pageNo + "&beginDate=" + beginDate + "&title=" + title }); });
// 获取常见问题详情
exports.getProblemDetail = redux_actions_1.createAction(notice_1.GET_PROBLEM_DETAIL, function (id) { return request_1.request({ api: "question/commonDetail.nd?id=" + id }); });
// 通知消息接口
exports.getMessageList = redux_actions_1.createAction(notice_1.GET_MESSAGE_LIST, function (data) { return request_1.request({ api: "priceMessage/list.nd", method: 'POST', data: data }); });
// 消息已读
exports.messageRead = redux_actions_1.createAction(notice_1.MESSAGE_READ, function (data) { return request_1.request({ api: "billboard/loginMessageDetail.htm", method: 'get', data: data }); });
// 获取板块
exports.getPlates = redux_actions_1.createAction(notice_1.GET_PLATES, function () { return request_1.request({ api: "billboard/loginMessagenoticeList.htm" }); });
// 促销资源兑现列表
exports.getAgentActivityApplyNotice = redux_actions_1.createAction(notice_1.GET_AGENT_ACTIVITY_APPLY_NOTICE, function (data) { return request_1.request({ api: "fast/userReport/agentActivityApplyNotice.nd", method: 'get', data: data }); });
