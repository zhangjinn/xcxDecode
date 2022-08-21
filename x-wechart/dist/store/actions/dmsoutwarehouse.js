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
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
var dmsrequest_1 = require('./dmsrequest.js');
var dmsoutwarehouse_1 = require('./../types/dmsoutwarehouse.js');
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
//取消订单
exports.cancleOutWarehouseSalesOrder = redux_actions_1.createAction(dmsoutwarehouse_1.CANCLE_OUT_WAREHOUSE_SALES_ORDER, function (_a) {
    var salesOrderId = _a.salesOrderId;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, dmsrequest_1.dmsRequest({
                    data: {
                        userAccount: wepy_1.default.$instance.globalData.account,
                        salesOrderId: salesOrderId,
                    },
                    method: 'cancelSalesOrder'
                })];
        });
    });
});
// 取消审核
exports.cancelReview = redux_actions_1.createAction(dmsoutwarehouse_1.CANCEL_REVIEW, function (data) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: data,
                method: 'deleteReserverBySoId'
            })];
    });
}); });
exports.getOutWarehouseOrderList = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_OUT_WAREHOUSE_ORDER_LIST, function (filterForm, pageNo) {
    return dmsrequest_1.dmsRequest({
        data: {
            _loading: true,
            terms: filterForm,
            page: {
                pageNo: pageNo,
                pageSize: 20,
            },
        },
        method: 'findSalesOrderOutList',
    });
});
exports.getOutWarehouseList = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_OUT_WAREHOUSE_LIST, function (orgId, warehouseType) {
    if (orgId === void 0) { orgId = ''; }
    if (warehouseType === void 0) { warehouseType = ''; }
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            type: 'ckck',
            orgId: orgId,
            warehouseType: warehouseType,
        },
        method: 'findBaseData',
    });
});
exports.getInvStatusList = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_OUT_WAREHOUSE_INV_STATUS_LIST, function () {
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            type: 'kczt',
        },
        method: 'findBaseData',
    });
});
// 获取供应商 add by yangchangwei 2020-09-14
exports.getSupperlierList = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_GET_SUPPERLIER_LIST, function () {
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            type: 'gys',
        },
        method: 'findBaseData',
    });
});
exports.isScanDealer = function () {
    return dmsrequest_1.dmsRequest({
        method: 'isScanDealer',
    });
};
exports.submitBatchOut = function (form) {
    return dmsrequest_1.dmsRequest({
        data: __assign({}, form, { userAccount: wepy_1.default.$instance.globalData.account, _loading: true }),
        method: 'salesOrderBatchOut',
    });
};
exports.getOutWarehouseOrderDetail = function (salesOrderId) {
    return dmsrequest_1.dmsRequest({
        data: {
            salesOrderId: salesOrderId,
            _loading: true
        },
        method: 'findSalesOrderOutDetail',
    });
};
exports.getInvStatus = function (productCode) {
    return dmsrequest_1.dmsRequest({
        data: {
            productCode: productCode,
        },
        method: 'getInvStatus',
    });
};
exports.getInvBatch = function (_a) {
    var productCode = _a.productCode, warehouseId = _a.warehouseId;
    return dmsrequest_1.dmsRequest({
        data: {
            productCode: productCode,
            warehouseId: warehouseId,
            _ignoreToast: true
        },
        method: 'getInvBatch',
    });
};
// export const getInvQty = ({ productCode, warehouseId,invBatchId,invStatusId }) => {
//   return dmsRequest({
//     data: {
//       productCode,
//       warehouseId,
//       invBatchId,
//       invStatusId,
//
//        _ignoreToast: true
//     },
//     method: 'getInvQty',
//   })
// }
exports.getInvQty = function (_a) {
    var productCode = _a.productCode, warehouseId = _a.warehouseId, invBatchId = _a.invBatchId, invStatusId = _a.invStatusId, invStatusType = _a.invStatusType;
    return dmsrequest_1.dmsRequest({
        data: {
            productCode: productCode,
            warehouseId: warehouseId,
            invBatchId: invBatchId,
            invStatusId: invStatusId,
            invStatusType: invStatusType,
            _ignoreToast: true
        },
        method: 'getInvQty',
    });
};
// export const salesOrderOut = (data) => {
//   return dmsRequest({
//     data: {
//       userAccount: wepy.$instance.globalData.account,
//       data,
//       _loading:true,
//       _ignoreToast: true
//     },
//     method: 'salesOrderOut',
//   })
// }
exports.salesOrderOut = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_BE_SURE_OUT, function (from) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, dmsrequest_1.dmsRequest({
                data: from,
                method: 'salesOrderOut'
            })];
    });
}); });
exports.salesOrderNeedScan = function (_a) {
    var orderIds = _a.orderIds;
    return dmsrequest_1.dmsRequest({
        data: {
            orderIds: orderIds
        },
        method: 'salesOrderNeedScan',
    });
};
exports.getModelByBarCode = function (_a) {
    var barCode = _a.barCode;
    return dmsrequest_1.dmsRequest({
        data: {
            barCode: barCode,
        },
        method: 'getModelByBarCode',
    });
};
exports.getSalesReturnPurchaseInfo = function (_a) {
    var salesOrderId = _a.salesOrderId;
    return dmsrequest_1.dmsRequest({
        data: {
            salesOrderId: salesOrderId,
        },
        method: 'getSalesReturnPurchaseInfo',
    });
};
// 获取出库台账 add by yangchangwei 2020-09-14
exports.findAllInventoryLog = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_FIND_ALL_INVENTORY_LOG, function (cisCode, filterForm, pageNo) {
    return dmsrequest_1.dmsRequest({
        data: {
            _loading: true,
            cisCode: cisCode,
            terms: filterForm,
            page: {
                pageNo: pageNo,
                pageSize: 20,
            },
        },
        method: 'findAllInventoryLog',
    });
});
// 获取库存流水（新）
exports.findAllInventoryLogNew = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_FIND_ALL_INVENTORY_LOG, function (cisCode, filterForm, pageNo) {
    return dmsrequest_1.dmsRequest({
        data: {
            _loading: true,
            cisCode: cisCode,
            terms: filterForm,
            page: {
                pageNo: pageNo,
                pageSize: 20,
            },
        },
        method: 'findGicAllInventoryLog',
    });
});
// 获取收发明细汇总
exports.getGicInventoryLogSummary = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_FIND_ALL_INVENTORY_LOG, function (cisCode, filterForm, pageNo) {
    return dmsrequest_1.dmsRequest({
        data: {
            _loading: true,
            cisCode: cisCode,
            terms: filterForm,
            page: {
                pageNo: pageNo,
                pageSize: 20,
            },
        },
        method: 'findGicInventoryLogSummary',
    });
});
exports.getTransactionType = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_GET_TRANSACTION_TYPE, function () {
    return dmsrequest_1.dmsRequest({
        method: 'getTransactionType',
    });
});
exports.getsaleFilterList = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_SALE_FILTER_LIST, function () {
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            type: 'xsddddzt',
        },
        method: 'findBaseData',
    });
});
exports.salesOrderBatchOut = redux_actions_1.createAction(dmsoutwarehouse_1.DMS_SALE_ORDER_BATCH_OUT, function (ids) {
    return dmsrequest_1.dmsRequest({
        data: {
            userAccount: wepy_1.default.$instance.globalData.account,
            salesOrderIds: ids,
        },
        method: 'salesOrderBatchOut',
    });
});
