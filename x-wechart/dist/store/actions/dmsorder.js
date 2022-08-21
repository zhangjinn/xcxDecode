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
var dmsrequest_1 = require('./dmsrequest.js');
var request_1 = require('./../../utils/request.js');
var toast_1 = require('./../../components/vant/toast/toast.js');
var dmsorder_1 = require('./../types/dmsorder.js');
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
// 模糊查询商品
exports.getProductListLikeCode = redux_actions_1.createAction(dmsorder_1.DMS_GET_PRODUCT_LIST_LIKE_CODE, function (_a) {
    var productCode = _a.productCode, pageNo = _a.pageNo;
    // TODO::  删除7097638,,测试数据
    return dmsrequest_1.dmsRequest({
        data: {
            productCode: productCode,
            warehouseId: '',
            page: {
                pageSize: 20,
                pageNo: pageNo || 1
            }
        },
        method: 'findProductListLikeCode'
    });
});
// 获取销售组织
exports.queryAppFiBook = redux_actions_1.createAction(dmsorder_1.QUERY_APP_FIBOOKDMS, function (basedata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                method: 'getDealerList'
            })];
    });
}); });
// 查询退货客户信息
exports.getReturnCustomer = redux_actions_1.createAction(dmsorder_1.RETURN_ORDER_CHOOSE_CUSTOMER_INFO, function (_a) {
    var filterStr = _a.filterStr, pageNo = _a.pageNo;
    return dmsrequest_1.dmsRequest({
        data: {
            _loading: true,
            page: {
                pageSize: 20,
                pageNo: pageNo || 1
            },
            filterStr: filterStr
        }, method: 'findReturnCustomer'
    });
});
// 查询客户信息
exports.getCustomer = redux_actions_1.createAction(dmsorder_1.DMS_ORDER_GET_CUSTOMER, function (_a) {
    var filterStr = _a.filterStr, pageNo = _a.pageNo;
    return dmsrequest_1.dmsRequest({
        data: {
            _loading: true,
            page: {
                pageSize: 20,
                pageNo: pageNo || 1
            },
            filterStr: filterStr
        }, method: 'findNormalSalesOrderCustomer'
    });
});
// 获取库存状态
exports.getItemInvStatus = redux_actions_1.createAction(dmsorder_1.DMS_ORDER_ITEM_INV_STATUS, function (_a) {
    var productCode = _a.productCode;
    return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, dmsrequest_1.dmsRequest({
                        data: {
                            productCode: productCode,
                            _loading: true
                        }, method: 'getInvStatus'
                    })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, __assign({}, result, { productCode: productCode })];
            }
        });
    });
});
// 渠道订单客户信息接口
exports.getNormalSalesOrderCustomerInfo = redux_actions_1.createAction(dmsorder_1.DMS_ORDER_NORMAL_SALES_ORDER_CUSTOMER_INFO, function (_a) {
    var customerCode = _a.customerCode;
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            customerCode: customerCode,
            _loading: true
        },
        method: 'normalSalesOrderCustomerInfo'
    });
});
// 提交订单
exports.submitChannelOrder = redux_actions_1.createAction(dmsorder_1.DMS_ORDER_SUBMIT_CHANNEL_ORDER, function (param) {
    return dmsrequest_1.dmsRequest({
        data: __assign({ userAccount: wepy_1.default.$instance.globalData.account, _loading: true }, param),
        method: 'createNormalSalesOrder'
    });
});
// 提交渠道订单(新)
exports.submitChannelOrderNew = redux_actions_1.createAction(dmsorder_1.DMS_ORDER_SUBMIT_CHANNEL_ORDER, function (param) {
    return dmsrequest_1.dmsRequest({
        data: __assign({ userAccount: wepy_1.default.$instance.globalData.account, _loading: true }, param),
        method: 'createBatchNormalSalesOrder'
    });
});
// 提交零售订单
exports.submitRetailOrder = redux_actions_1.createAction(dmsorder_1.DMS_ORDER_SUBMIT_RETAIL_ORDER, function (param) {
    return dmsrequest_1.dmsRequest({
        data: __assign({ userAccount: wepy_1.default.$instance.globalData.account, _loading: true }, param),
        method: 'createRetailSalesOrder'
    });
});
// 提交零售订单(新版)
exports.submitRetailOrderNew = redux_actions_1.createAction(dmsorder_1.DMS_ORDER_SUBMIT_RETAIL_ORDER, function (param) {
    return dmsrequest_1.dmsRequest({
        data: __assign({ userAccount: wepy_1.default.$instance.globalData.account, _loading: true }, param),
        method: 'createBatchRetailOrder' //createBatchRetailOrder
    });
});
// 获取零售订单基础信息
exports.getRetailOrderInfo = redux_actions_1.createAction(dmsorder_1.DMS_ORDER_RETAIL_ORDER_BASE_DATA, function (orgId) {
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            orgId: orgId || '',
            _loading: true
        },
        method: 'getRetailOrderBaseInfo'
    });
});
// 根据组织获取仓库
exports.getWarehouseList = redux_actions_1.createAction(dmsorder_1.GET_WAREHOUSE_LIST, function (orgId) {
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            orgId: orgId || ''
        },
        method: 'getWarehouseList'
    });
});
// 获取服务列表
exports.getZoneB2cServiceList = redux_actions_1.createAction(dmsorder_1.GET_ZONE_B_2_C_SERVICE_LIST, function (data) {
    return dmsrequest_1.dmsRequest({
        data: __assign({ userAccount: wepy_1.default.$instance.globalData.account }, data),
        method: 'getZoneB2cServiceList'
    });
});
exports.getCisPrice = redux_actions_1.createAction(dmsorder_1.DMS_CIS_FX_PRICE, function (c) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({
                    data: {
                        shopCisCode: c.shopCisCode || '',
                        cisCode: c.cisCode || '',
                        orgId: c.orgId || '',
                        productId: c.productId,
                        refreshPrice: c.refreshPrice || false,
                        type: c.type || ''
                    },
                    api: 'product/fxPrice.nd'
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result, { refreshPrice: c.refreshPrice })];
        }
    });
}); });
exports.getLsPrice = redux_actions_1.createAction(dmsorder_1.DMS_CIS_LS_PRICE, function (c) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({
                    data: {
                        shopCisCode: c.shopCisCode || '',
                        cisCode: c.cisCode || '',
                        orgId: c.orgId || '',
                        productId: c.productId,
                        refreshPrice: c.refreshPrice || false,
                        type: c.type || ''
                    },
                    api: 'product/retailPrice.nd'
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result, { refreshPrice: c.refreshPrice })];
        }
    });
}); });
// 获取cis配送方式
exports.getCisDeliveryMethod = redux_actions_1.createAction(dmsorder_1.CIS_DELIVERY_METHOD, function (data) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({
                    data: data,
                    api: 'comm/retailDeliveryType.nd'
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result)];
        }
    });
}); });
// 获取配送方式
exports.getDeliveryMethod = redux_actions_1.createAction(dmsorder_1.DMS_DELIVERY_METHOD, function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dmsrequest_1.dmsRequest({
                    data: {
                        _loading: true
                    }, method: 'getDeliveryMode'
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result)];
        }
    });
}); });
// 获取补差类型
exports.getInvStatusType = redux_actions_1.createAction(dmsorder_1.DMS_INV_STATUS_TYPE, function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dmsrequest_1.dmsRequest({
                    data: {
                        _loading: true
                    }, method: 'getInvStatusType'
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result)];
        }
    });
}); });
// 调拨接口基础信息获取
exports.getStockTransBaseInfo = redux_actions_1.createAction(dmsorder_1.DMS_STOCK_WARAHOUSE_LIST, function (data) { return __awaiter(_this, void 0, void 0, function () {
    var par, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                par = { loading: true };
                if (data) {
                    par = __assign({ _loading: true }, data);
                }
                wx.showLoading({
                    title: '加载中',
                    mask: true
                });
                return [4 /*yield*/, dmsrequest_1.dmsRequest({
                        data: __assign({ _loading: true }, par), method: 'getGicStockTransBaseInfo'
                    })];
            case 1:
                result = _a.sent();
                wx.hideLoading();
                return [2 /*return*/, __assign({}, result)];
        }
    });
}); });
// 获取调拨订单列表
exports.getAllotOrderList = redux_actions_1.createAction(dmsorder_1.DMS_ALLOT_ORDER_LIST, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'gicStockTransDetailList'
            })];
    });
}); });
// 调拨订单列表保存
exports.submitAllotList = redux_actions_1.createAction(dmsorder_1.DMS_ALLOT_SUBMIT, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'gicStockTransSave'
            })];
    });
}); });
// 库存调整列表保存
exports.submitStoreList = redux_actions_1.createAction(dmsorder_1.SUBMIT_STORE_LIST, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'saveOtherStockTrans'
            })];
    });
}); });
// 获取调拨比例
exports.getAllocationRatio = redux_actions_1.createAction(dmsorder_1.DMS_ALLOCATION_RATIO, function () { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dmsrequest_1.dmsRequest({
                    data: {
                        _loading: true
                    }, method: 'getDealerStockTransStatsInfo'
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result)];
        }
    });
}); });
// 获取旧机品类
exports.getOldMachCategoryList = redux_actions_1.createAction(dmsorder_1.DMS_OLD_MACH_CATEGORY_LIST, function () {
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            type: 'xsddjjpl',
        },
        method: 'findBaseData',
    });
});
// 获取旧机处理途径
exports.getOldMachTreatWayList = redux_actions_1.createAction(dmsorder_1.DMS_OLD_MACH_TREA_WAY_LIST, function () {
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            type: 'xsddjjcltj',
        },
        method: 'findBaseData',
    });
});
// 获取系统参数
exports.getSystemParameters = redux_actions_1.createAction(dmsorder_1.GET_SYSTEM_PARAMETERS, function (data) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({
                    data: data,
                    api: 'comm/sysconfig.nd'
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result)];
        }
    });
}); });
// 查询是否开启共享仓
exports.getIsOpenSharedWarehouse = redux_actions_1.createAction(dmsorder_1.GET_IS_OPEN_SHARED_WAREHOUSE, function (data) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({
                    data: data,
                    api: 'customer/queryShareFlag.nd'
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, __assign({}, result)];
        }
    });
}); });
// 样机查询门店接口
exports.getShopInfoPrototype = redux_actions_1.createAction(dmsorder_1.DMS_ORDER_PROTOTYPE_SHOP_DATA, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'comm/querySalesShopInfoList.nd', method: 'POST', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, res, data)];
        }
    });
}); });
// 样机查询物料组
exports.getSMterialInfoPrototype = redux_actions_1.createAction(dmsorder_1.DMS_ORDER_PROTOTYPE_METARIL_DATA, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'comm/queryShopMatkl.nd', method: 'POST', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, res, data)];
        }
    });
}); });
// 保存意向用户
exports.saveShopPotentialUser = redux_actions_1.createAction(dmsorder_1.SAVE_SHOP_POTENTIAL_USER, function (data, callback) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request_1.request({ api: 'shopPotentialUser/saveShopPotentialUser.nd', method: 'POST', type: 'application/json', data: data, callback: callback })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, __assign({}, res, data)];
        }
    });
}); });
