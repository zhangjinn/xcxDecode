"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var request_1 = require('./../../utils/request.js');
var consultTodo_1 = require('./../types/consultTodo.js');
exports.getConsultTodoCounts = redux_actions_1.createAction(consultTodo_1.GET_CONSULT_TODO_COUNTS, function () { return request_1.request({ api: 'priceMessage/taskNum.nd?typeValue=14173612879' }); });
exports.getSHopFixTodoCounts = redux_actions_1.createAction(consultTodo_1.GET_SHOP_FIX_TODO_COUNTS, function () { return request_1.request({ api: 'priceMessage/taskNum.nd?typeValue=14173612881' }); });
// 获取自定义传参待办列表
exports.getConsultTodoAllItems = redux_actions_1.createAction(consultTodo_1.GET_ASSESSMENT_NOTICE_ITEMS, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'priceMessage/delegateList.nd', method: 'POST', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, res, data)];
        }
    });
}); });
// 获取待办列表
exports.getConsultTodoItems = redux_actions_1.createAction(consultTodo_1.GET_CONSULT_TODO_ITEMS, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'priceMessage/delegateList.nd?typeValue=14173612879', method: 'POST', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, res, data)];
        }
    });
}); });
// 获取待办列表
exports.getSHopFixTodoItems = redux_actions_1.createAction(consultTodo_1.GET_SHOP_FIX_TODO_ITEMS, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'priceMessage/delegateList.nd?typeValue=14173612881', method: 'POST', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, res, data)];
        }
    });
}); });
// 终包采购计划提报
exports.getReportCounts = redux_actions_1.createAction(consultTodo_1.GET_REPORT_COUNTS, function () { return request_1.request({ api: 'priceMessage/taskNum.nd?typeValue=14182972401' }); });
exports.getReportItems = redux_actions_1.createAction(consultTodo_1.GET_REPORT_ITEMS, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'priceMessage/delegateList.nd?typeValue=14182972401', method: 'POST', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, res, data)];
        }
    });
}); });
// 终包收货提报
exports.getReceiptCounts = redux_actions_1.createAction(consultTodo_1.GET_RECEIPT_COUNTS, function () { return request_1.request({ api: 'priceMessage/taskNum.nd?typeValue=14182972402' }); });
exports.getReceiptItems = redux_actions_1.createAction(consultTodo_1.GET_RECEIPT_ITEMS, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'priceMessage/delegateList.nd?typeValue=14182972402', method: 'POST', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, res, data)];
        }
    });
}); });
// 考核通知单
// export const getAssessmentNoticeCounts = createAction(GET_ASSESSMENT_NOTICE_COUNTS, () => request({ api: 'priceMessage/taskNum.nd?typeValue=14182987654'}));
// export const getAssessmentNoticeItems = createAction(GET_ASSESSMENT_NOTICE_ITEMS, async (data: any, callback: any) => {
//   const res: any = await request({ api: 'priceMessage/delegateList.nd?typeValue=14182987654', method: 'POST', data, callback })
//   return { ...res, ...data };
// });
// 新增门店
exports.getNewStoreCounts = redux_actions_1.createAction(consultTodo_1.GET_NEW_STORE_COUNTS, function () { return request_1.request({ api: 'priceMessage/taskNum.nd?typeValue=14187583090' }); });
exports.getNewStoreItems = redux_actions_1.createAction(consultTodo_1.GET_NEW_STORE_ITEMS, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'priceMessage/delegateList.nd?typeValue=14187583090', method: 'POST', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, res, data)];
        }
    });
}); });
