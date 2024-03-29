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
var ramda_1 = require('./../../npm/ramda/src/index.js');
var design_1 = require('./../types/design.js');
var request_1 = require('./../../utils/request.js');
exports.getDesignById = redux_actions_1.createAction(design_1.GET_DESIGN_DATA_BY_ID, function (componentId, callback) { return request_1.request({ api: 'wechat/designComponent/data.nd', data: { componentId: componentId }, callback: callback }); });
exports.getActivityById = redux_actions_1.createAction(design_1.GET_ACTIVITY_BY_ID, function (componentId, callback) { return request_1.request({ api: 'wechat/designComponent/data.nd', data: { componentId: componentId }, callback: callback }); });
exports.getTabActivityById = redux_actions_1.createAction(design_1.GET_TAB_ACTIVITY_BY_ID, function (componentId, designIndex, callback) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'wechat/designComponent/data.nd', data: { componentId: componentId }, callback: callback }, 'cis')];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result, { designIndex: designIndex })];
        }
    });
}); });
exports.getActivityDesignData = redux_actions_1.createAction(design_1.GET_ACTIVITY_DESIGN_DATA, function () { return request_1.request({ api: 'wechat/designComponent/getCurrCustDesignComponent.nd' }); });
// 获取装修数据和配置文件
exports.getDesignAll = redux_actions_1.createAction(design_1.GET_DESIGN_ALL, function (callback) { return __awaiter(_this, void 0, void 0, function () {
    var designTemplate, id, config, res, designData, templateRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                designTemplate = '';
                id = '';
                config = [];
                return [4 /*yield*/, request_1.request({ api: 'wechat/designComponent/getCurrCustDesignComponent.nd' })];
            case 1:
                res = _a.sent();
                if (!(res && res.list && res.list.length > 0)) return [3 /*break*/, 3];
                config = res.list;
                designData = ramda_1.head(res.list);
                id = designData.id;
                return [4 /*yield*/, request_1.request({ api: 'wechat/designComponent/data.nd', data: { componentId: designData.id } })];
            case 2:
                templateRes = _a.sent();
                if (templateRes && templateRes.data) {
                    designTemplate = templateRes.data;
                }
                _a.label = 3;
            case 3:
                if (callback) {
                    callback();
                }
                return [2 /*return*/, { id: id, config: config, data: designTemplate }];
        }
    });
}); });
