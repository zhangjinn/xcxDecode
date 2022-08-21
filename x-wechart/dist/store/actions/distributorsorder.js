"use strict";
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
var distributorsorder_1 = require('./../types/distributorsorder.js');
var dmsrequest_1 = require('./dmsrequest.js');
var request_1 = require('./../../utils/request.js');
// 分销商订单
exports.setDisrtibutorsOrder = redux_actions_1.createAction(distributorsorder_1.SET_DISTRIBUTORS_ORDER, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'submitPurchaseOrder'
            })];
    });
}); });
// 分销商订单同供应商跨物料组
exports.setDisrtibutorsOrderNew = redux_actions_1.createAction(distributorsorder_1.SET_DISTRIBUTORS_ORDER, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'submitBatchPurchaseOrder'
            })];
    });
}); });
// cis分销商下单
exports.setCisDisrtibutorsOrder = redux_actions_1.createAction(distributorsorder_1.SET_CIS_DISTRIBUTORS_ORDER, function (data) { return request_1.request({ api: "dmsPurchaseOrder/submit.nd", method: 'POST', data: data, type: 'application/json' }); });
// 获取系统参数
exports.getSysConfig = redux_actions_1.createAction(distributorsorder_1.GET_SYS_CONFIG, function (data) { return request_1.request({ api: "comm/sysconfig.nd", method: 'GET', data: data, type: 'application/json' }); });
// 获取手机和电话
exports.getPeoplePhone = redux_actions_1.createAction(distributorsorder_1.GET_DMS_PEOPLE_PHONE, function (data, callback) { return request_1.request({ api: 'address/changeCustomerAddress.nd', method: 'POST', data: data, callback: callback }); });
// dms商品库存
exports.getCartDmsStock = redux_actions_1.createAction(distributorsorder_1.GET_DMS_STOCK_ID, function (dmsPriceAndStock) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: dmsPriceAndStock,
                method: 'getInvStatusBatch'
            })];
    });
}); });
exports.getDmsShopAddress = redux_actions_1.createAction(distributorsorder_1.GET_DMS_SHOP_ADDRESS, function (data) { return request_1.request({ api: "address/changeDistributionAddressByCode.nd", method: 'POST', data: data }); });
