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
var _a;
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var notice_1 = require('./../types/notice.js');
var index_1 = require('./../../utils/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
// class Notice {
//   id: number;
//   title: string
//   billBoardName?: string
//   publishDate: number
//   publishAt: string // publishDate 格式化
//   newMessage: boolean
//   organizationName: string
// }
// {"hideLi":true,"billboardMessage":{"id":14170126121,"lock_version":null,"creator":null,"modifyUser":null,"createDate":null,"lastUpdateDate":null,"isDeleted":false,"sendUserId":null,"sendUserName":null,"status":null,"fileName":[],"filePath":[],"billBoardId":null,"billBoardName":null,"classifyId":null,"classifyName":null,"title":"测试测试","content":"
// fsdfsfsfsdsfdfdsdfs
// ","publishDate":1568104970611,"regionCode":null,"regionName":null,"provinceCode":null,"provinceName":null,"isIndex":null,"ifTop":null,"orgType":null,"organizationId":null,"organizationCode":null,"organizationName":"海信集团","levelCode":null,"channelCode":null,"channelName":null,"startDate":null,"endDate":null,"newMessage":null},"lastBillboardMessage":{"id":14170126120,"lock_version":null,"creator":null,"modifyUser":null,"createDate":null,"lastUpdateDate":null,"isDeleted":false,"sendUserId":null,"sendUserName":null,"status":null,"fileName":null,"filePath":null,"billBoardId":null,"billBoardName":null,"classifyId":null,"classifyName":null,"title":"测试测试","content":null,"publishDate":null,"regionCode":null,"regionName":null,"provinceCode":null,"provinceName":null,"isIndex":null,"ifTop":null,"orgType":null,"organizationId":null,"organizationCode":null,"organizationName":null,"levelCode":null,"channelCode":null,"channelName":null,"startDate":null,"endDate":null,"newMessage":null},"nextBillboardMessage":{"id":14170126140,"lock_version":null,"creator":null,"modifyUser":null,"createDate":null,"lastUpdateDate":null,"isDeleted":false,"sendUserId":null,"sendUserName":null,"status":null,"fileName":null,"filePath":null,"billBoardId":null,"billBoardName":null,"classifyId":null,"classifyName":null,"title":"测试名字很长测试名字很长测测试名字很长","content":null,"publishDate":null,"regionCode":null,"regionName":null,"provinceCode":null,"provinceName":null,"isIndex":null,"ifTop":null,"orgType":null,"organizationId":null,"organizationCode":null,"organizationName":null,"levelCode":null,"channelCode":null,"channelName":null,"startDate":null,"endDate":null,"newMessage":null},"status":"nologin"}
exports.default = redux_actions_1.handleActions((_a = {},
    /**
     * 列表数据: messageList: [{
     *  "title": "xxx"   展示名称
     *  "billBoardName": "xxx" 板块
     *  "publishDate": 1568103238131 发布时间
     *  "id": 14170125965
     *  "newMessage": true 新消息
     *  "organizationName": 组织名称
     * }]
     *
     * 只需要这6个字段。
     * @param state
     * @param action
     */
    _a[notice_1.RESET_MESSAGE_LIST] = function (state, action) {
        var messageList = [];
        state = __assign({}, state, { messageList: messageList });
        return __assign({}, state, { messageList: [], totalPages: '0' });
    },
    // TODO:五期新加的东西
    _a[notice_1.GET_NEW_INFO_ITEMS] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { Issue: payload });
    },
    _a[notice_1.GET_MESSAGE_LIST] = function (state, action) {
        var payload = action.payload;
        var priceMessageList = payload.priceMessageList, totalPages = payload.totalPages;
        var messageList = state.messageList;
        if (priceMessageList && priceMessageList.length > 0) {
            ramda_1.forEach(function (item) {
                item.createdDate = item.createdDate.substring(0, 16);
                // 这里没用写好的时间方法是安卓和ios对时间格式要求不一样
                // item.createdDate = formatDate(item.createdDate, 'Y-M-D h:m')
            }, priceMessageList);
        }
        var newList = priceMessageList;
        if (messageList && messageList.length > 0) {
            newList = ramda_1.concat(messageList, newList);
        }
        return __assign({}, state, { messageList: newList, totalPages: totalPages });
    },
    _a[notice_1.GET_NOTICE_LIST] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        payload.list.forEach(function (it) {
            it.publishAt = index_1.formatDate("" + it.publishDate, 'Y-M-D');
        });
        var result = {
            noticeImageUrl: payload.noticeImageUrl,
            pageSize: payload.totalPages,
            datasCount: payload.datasCount,
            notices: []
        };
        // 第一页，初始化数据
        if (1 === +payload.currentPage) {
            result.notices = payload.list;
        }
        else {
            result.notices = list.notices.concat(payload.list);
        }
        return __assign({}, state, { list: result });
    },
    _a[notice_1.GET_MENU_NOTICE_LIST] = function (state, action) {
        var payload = action.payload;
        var list = (payload.list || []).filter(function (it) { return it.isPop == '1'; });
        return __assign({}, state, { menuNoticeList: list });
    },
    _a[notice_1.SET_MENU_NOTICE_LIST] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { menuNoticeList: payload || [] });
    },
    _a[notice_1.GET_NOTICE_DETAIL] = function (state, action) {
        var payload = action.payload;
        payload.billboardMessage.publishAt = index_1.formatDate("" + payload.billboardMessage.publishDate, 'Y-M-D');
        return __assign({}, state, { detail: payload });
    },
    _a[notice_1.GET_PROBLEM_LIST] = function (state, action) {
        var payload = action.payload;
        var problemlist = state.problemlist;
        payload.list.forEach(function (it) {
            it.startAt = index_1.formatDate("" + it.startTime, 'Y-M-D');
        });
        var result = {
            pageSize: payload.totalPages,
            problems: []
        };
        // 第一页，初始化数据
        if (1 === +payload.page) {
            result.problems = payload.list;
        }
        else {
            result.problems = problemlist.problems.concat(payload.list);
        }
        return __assign({}, state, { problemlist: result });
    },
    _a[notice_1.GET_PROBLEM_DETAIL] = function (state, action) {
        var payload = action.payload;
        payload.commonFAQModel.startAt = index_1.formatDate("" + payload.commonFAQModel.startTime, 'Y-M-D');
        if (!payload.commonFAQModel.answer) {
            payload.commonFAQModel.answer = '暂无回答';
        }
        return __assign({}, state, { problemdetail: payload.commonFAQModel });
    },
    _a[notice_1.GET_PLATES] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { plates: payload.plates });
    },
    _a), {
    list: {
        notices: [],
        pageSize: 0
    },
    detail: {},
    problemlist: {
        problems: [],
        pageSize: 0
    },
    problemdetail: {},
    messageList: [],
    totalPages: '',
    Issue: {},
    plates: {},
    menuNoticeList: []
});
