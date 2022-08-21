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
var consultation_1 = require('./../types/consultation.js');
var consultation_2 = require('./../types/consultation.js');
var index_1 = require('./../../utils/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var request_1 = require('./../../utils/request.js');
var validators_1 = require('./../../utils/validators.js');
exports.default = redux_actions_1.handleActions((_a = {},
    /**
     * 只需要这6个字段。
     * @param state
     * @param action
     */
    _a[consultation_1.GET_CONSULT_LIST] = function (state, action) {
        var payload = action.payload;
        var consultlist = state.consultlist;
        payload.list.forEach(function (it) {
            it.pubAt = index_1.formatDate("" + it.pubDate, 'Y-M-D');
        });
        var result = {
            pageSize: payload.totalPages,
            consults: []
        };
        // 第一页，初始化数据
        if (1 === +payload.page) {
            result.consults = payload.list;
        }
        else {
            result.consults = consultlist.consults.concat(payload.list);
        }
        return __assign({}, state, { consultlist: result });
    },
    _a[consultation_1.GET_CONSULT_DETAIL] = function (state, action) {
        var payload = action.payload;
        payload.pubAt = index_1.formatDate("" + payload.pubDate, 'Y-M-D');
        if (!payload.scope)
            payload.scope = 5;
        switch (payload.scope) {
            case 5:
                payload.ratetext = '非常好';
                break;
            case 4:
                payload.ratetext = '好';
                break;
            case 3:
                payload.ratetext = '一般';
                break;
            case 2:
                payload.ratetext = '差';
                break;
            case 1:
                payload.ratetext = '非常差';
                break;
        }
        if (payload.fileName) {
            var files = payload.fileName.split(",");
            var attachments = new Array();
            for (var i = 0; i < files.length; i++) {
                var flag = validators_1.isAssetTypeAnImage(files[i]);
                if (flag) {
                    attachments.push(request_1.baseUrl + '/question/downFile.nd?pathInfo=' + files[i]);
                }
            }
            payload.attachments = attachments;
        }
        return __assign({}, state, { consultdetail: payload });
    },
    _a[consultation_1.CLOSE_CONSULT] = function (state, action) {
        var payload = action.payload;
        var data = payload;
        return __assign({}, state, { res: data });
    },
    _a[consultation_2.GO_ASK] = function (state, action) {
        var payload = action.payload;
        var data = payload;
        return __assign({}, state, { res: data });
    },
    _a[consultation_1.GET_COMMIT_QUESTION] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { commitQuestion: payload });
    },
    _a[consultation_1.GET_MATERIAL_CODE] = function (state, action) {
        var payload = action.payload;
        var materialCodeList = [];
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                name: value,
                code: key,
            };
            materialCodeList.push(item);
        }, payload);
        return __assign({}, state, { materialCode: materialCodeList });
    },
    _a[consultation_1.POST_MINE_QUESTION] = function (state, action) {
        var payload = action.payload;
        var data = payload;
        return __assign({}, state, { res: data });
    },
    _a[consultation_2.RS_CONSULT_LIST] = function (state, action) {
        return __assign({}, state, { materialCode: {} });
    },
    _a), {
    consultlist: {
        problems: [],
        pageSize: 0
    },
    consultdetail: {},
    commitQuestion: {},
    materialCode: {}
});
