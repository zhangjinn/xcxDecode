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
var financerequest_1 = require('./financerequest.js');
var financepolicy_1 = require('./../types/financepolicy.js');
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
// 本期已开票兑现明细
exports.queryAppRsRbCashedByRowId = redux_actions_1.createAction(financepolicy_1.FINANCE_POST_RSRB_CASHED_BY_ROWID, function (basedata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, financerequest_1.financeRequest({
                data: __assign({}, basedata),
                method: 'rsRbAppSheet/queryAppRsRbCashedByRowId'
            })];
    });
}); });
// 本期新确认账单
exports.queryAppCurConfirmedByRowId = redux_actions_1.createAction(financepolicy_1.FINANCE_POST_CUR_CONFIRMED_BY_ROWID, function (basedata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, financerequest_1.financeRequest({
                data: __assign({}, basedata),
                method: 'rsRbAppSheet/queryAppCurConfirmedByRowId'
            })];
    });
}); });
// 政策对账账单
exports.queryAppRsRbDetailByRowId = redux_actions_1.createAction(financepolicy_1.FINANCE_POST_RSRB_DETAIL_BY_ROWID, function (basedata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, financerequest_1.financeRequest({
                data: __assign({}, basedata),
                method: 'rsRbAppSheet/queryAppRsRbDetailByRowId'
            })];
    });
}); });
// 政策电子账单列表以及筛选
exports.queryAppRsRbSheetList = redux_actions_1.createAction(financepolicy_1.FINANCE_GET_RSRB_SHEET_LIST, function (basedata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, financerequest_1.financeRequest({
                data: __assign({}, basedata),
                method: 'rsRbAppSheet/queryAppRsRbSheetList'
            })];
    });
}); });
// 获取产品品类
exports.queryAppProfit = redux_actions_1.createAction(financepolicy_1.QUERY_APP_PROFIT, function (basedata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, financerequest_1.financeRequest({
                data: __assign({}, basedata),
                method: 'rsRbAppSheet/queryAppProfit'
            })];
    });
}); });
// 获取销售组织
exports.queryAppFiBook = redux_actions_1.createAction(financepolicy_1.QUERY_APP_FIBOOK, function (basedata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, financerequest_1.financeRequest({
                data: __assign({}, basedata),
                method: 'rsRbAppSheet/queryAppFiBookCode'
            })];
    });
}); });
// 政策签章客户接口
exports.queryAppRsOcRbSheetByRowId = redux_actions_1.createAction(financepolicy_1.RS_OC_RB_SHEET_BY_ROWID, function (basedata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, financerequest_1.financeRequest({
                data: __assign({}, basedata),
                method: 'rsRbAppSheet/queryAppRsOcRbSheetByRowId'
            })];
    });
}); });
// 签章查看接口
exports.getAppSignatureViewSsq = redux_actions_1.createAction(financepolicy_1.GET_APP_SIGNATURE_VIEW_SSQ, function (data) {
    return financerequest_1.financeRequest({
        data: __assign({}, data, { method: 'getAppSignatureViewSsq' }),
        method: 'rsRbAppSheet/getAppSignatureViewSsq'
    });
});
// 政策对账单app签章
exports.doAppRsRbCreateAndSign = redux_actions_1.createAction(financepolicy_1.DO_APP_RE_RB_CREATE_AND_SIGN, function (data) {
    return financerequest_1.financeRequest({
        data: __assign({}, data, { method: 'doAppRsRbCreateAndSign' }),
        method: 'rsRbAppSheet/doAppRsRbCreateAndSign'
    });
});
