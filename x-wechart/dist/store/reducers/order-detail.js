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
/*
 * @Description:
 * @Version: 2.0
 * @Autor: sqk
 * @Date: 2020-08-14 08:54:20
 * @LastEditors: sqk
 * @LastEditTime: 2020-08-14 16:39:53
 */
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var order_detail_1 = require('./../types/order-detail.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    // 重置订单详情
    _a[order_detail_1.RESET_ORDER_DETAIL] = function (state, action) {
        return __assign({}, state, { orderdetail: [] });
    },
    // 订单详情
    _a[order_detail_1.GET_ORDER_DETAIL] = function (state, action) {
        var payload = action.payload;
        var isPurchaseStandard = true; // 组合购购买产品数量是否符合标准（默认不符合标准）
        if (payload && payload.erpList && payload.erpList.length) {
            payload.erpList.forEach(function (erpOrder) {
                var logisticsStatus = payload.logisticsStatus[erpOrder.id];
                if (logisticsStatus && logisticsStatus.length) {
                    erpOrder.logisticsStatus = logisticsStatus.map(function (log) {
                        return {
                            text: '[' + log.statusName + ']' + ' ' + (log.remark ? log.remark : ''),
                            desc: log.statusDate,
                        };
                    });
                }
            });
        }
        if (payload.erpList[0]) {
            payload.erpList[0].active = true;
        }
        payload.nowgoods = payload.erpList[0];
        payload.nowLogisticsStatus = payload.nowgoods && payload.nowgoods.length ? payload.logisticsStatus[payload.nowgoods.id] : null;
        payload.orderLines.forEach(function (item) {
            if (item.img) {
                var imgs = item.img.split('/');
                item.img = index_1.formatImg({
                    format: imgs[2],
                    name: imgs[3],
                    materialId: imgs[0],
                    itemId: imgs[1]
                });
            }
            if (item.defaultImg) {
                var imgs = item.defaultImg.split('/');
                item.errImg = index_1.formatImg({
                    name: imgs[imgs.length - 1]
                });
            }
            if (payload.orderHeader.productGroupFlag == 'Y') { // 组合购-组合购标识，Y组合购，N不是
                item.isChecked = false;
                item.textQty = item.qty; // 原始产品数量
                item.qty = item.qty - item.cancelQty; // 可取消产品数量
                item.maxQty = item.qty; // 本次最大可取消产品数量
            }
        });
        if (payload.orderLines.length) {
            if (payload.orderHeader.productGroupFlag == 'Y') {
                var combinationPurchaseList_1 = [];
                //组合购将数组里'productGroup'属性相同的对象合并成一个数组
                combinationPurchaseList_1 = index_1.combineObjIntoAnArray(payload.orderLines);
                combinationPurchaseList_1.forEach(function (item, index) {
                    var totleBuyNum = 0;
                    item.child.forEach(function (val, i) {
                        totleBuyNum += val.qty;
                    });
                    combinationPurchaseList_1[index].totleBuyNum = totleBuyNum;
                });
                payload.orderLines = combinationPurchaseList_1;
                payload.isPurchaseStandard = false;
            }
        }
        return __assign({}, state, { loading: false, orderdetail: payload });
    },
    // 取消原因
    _a[order_detail_1.GET_CANCEL_LIST] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { cancelReasonList: payload });
    },
    // 获取订单流程状态
    _a[order_detail_1.GET_QUERY_CIS_ORDER_STATUS_INFO_MOBILE] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { cisOrderStatusInfoMobile: payload });
    },
    _a), {
    orderdetail: {},
    cancelReasonList: [],
    cisOrderStatusInfoMobile: {},
});
