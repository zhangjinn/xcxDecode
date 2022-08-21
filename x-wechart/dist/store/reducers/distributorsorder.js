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
var distributorsorder_1 = require('./../types/distributorsorder.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[distributorsorder_1.GET_CART_GOODS_LIST_INFO] = function (state, action) {
        var payload = action.payload;
        if (payload && payload.purchaseOrderItem.length > 0) {
            var goodsAccount_1 = 0;
            var goodsNumber_1 = 0;
            var productCodes_1 = [];
            var discountTypeName = '';
            var isPurchaseStandard = true; // 组合购购买产品数量是否符合标准（默认不符合标准）
            ramda_1.forEach(function (item) {
                if (item.discountTypeName == '组合购') {
                    goodsNumber_1 = ramda_1.add(goodsNumber_1, item.buyQty); // 组合购购买产品总数
                    goodsAccount_1 = ramda_1.add(goodsAccount_1, item.price * item.buyQty); // 组合购》认购》定金总和
                }
                else {
                    goodsAccount_1 += ramda_1.multiply(item.price, item.orderedQty);
                    goodsNumber_1 += parseInt(item.orderedQty);
                }
                productCodes_1.push(item.productCode);
                var dms = {
                    key: '',
                    value: '请选择库存状态'
                };
                item.selectDms = dms;
            }, payload.purchaseOrderItem);
            payload.number = goodsAccount_1.toFixed(2);
            payload.account = goodsNumber_1;
            payload.productCodes = productCodes_1;
            payload.productCodes._time = new Date();
            discountTypeName = payload.purchaseOrderItem[0].discountTypeName;
            if (payload.purchaseOrderItem[0].discountTypeName == '组合购') {
                var combinationPurchaseList_1 = [];
                //
                //组合购将数组里'productGroup'属性相同的对象合并成一个数组
                combinationPurchaseList_1 = index_1.combineObjIntoAnArray(payload.purchaseOrderItem);
                combinationPurchaseList_1.forEach(function (item, index) {
                    var totleBuyNum = 0;
                    item.child.forEach(function (val, i) {
                        totleBuyNum += val.quantity;
                        val.buyNum = val.quantity;
                    });
                    combinationPurchaseList_1[index].isFold = true;
                    combinationPurchaseList_1[index].totleBuyNum = totleBuyNum;
                });
                payload.purchaseOrderItem = combinationPurchaseList_1;
                isPurchaseStandard = index_1.checkCombinationPurchase(payload.purchaseOrderItem);
            }
            payload.discountTypeName = discountTypeName;
            payload.isPurchaseStandard = isPurchaseStandard;
        }
        return __assign({}, state, { cartGoodInfo: payload });
    },
    // dms 库存状态
    _a[distributorsorder_1.GET_DMS_STOCK_ID] = function (state, action) {
        var payload = action.payload;
        var invInfo = payload.invInfo;
        var cartGoodInfo = state.cartGoodInfo;
        ramda_1.forEach(function (item) {
            ramda_1.forEach(function (res) {
                if (res.productCode == item.productCode) {
                    var DmsinvStatus_1 = [];
                    ramda_1.forEach(function (stick) {
                        var item = {
                            key: stick.invStatusId,
                            value: stick.invStatus
                        };
                        DmsinvStatus_1.push(item);
                    }, item.invStatus);
                    res.invStatus = DmsinvStatus_1;
                }
            }, cartGoodInfo.purchaseOrderItem);
        }, invInfo);
        return __assign({}, state);
    },
    _a[distributorsorder_1.GET_DMS_SHOP_ADDRESS] = function (state, action) {
        var list = action.payload.list;
        var addressList = [];
        //渠道采购-收货地址增加-取消选择项
        var nullWare = {
            value: "请选择",
            key: 0
        };
        addressList.push(nullWare);
        if (list && list.length > 0) {
            ramda_1.forEach(function (item) {
                var add = {
                    value: item.address,
                    key: item.id,
                    regionStatus: item.regionStatus,
                };
                addressList.push(add);
            }, list);
        }
        return __assign({}, state, { shippingAddress: addressList });
    },
    _a[distributorsorder_1.GET_DMS_PEOPLE_PHONE] = function (state, action) {
        var payload = action.payload;
        var phone = payload.phone;
        var p = phone.replace('\u202d', '').replace('\u202c', '');
        var item = __assign({}, payload, { _data: new Date().getTime(), phone: p });
        return __assign({}, state, { connect: item });
    },
    _a[distributorsorder_1.SET_DISTRIBUTORS_ORDER] = function (state, action) {
        return __assign({}, state);
    },
    _a[distributorsorder_1.SET_CIS_DISTRIBUTORS_ORDER] = function (state, action) {
        return __assign({}, state);
    },
    _a[distributorsorder_1.GET_SYS_CONFIG] = function (state, action) {
        return __assign({}, state);
    },
    _a), {
    cartGoodInfo: [],
    shippingAddress: [],
    connect: {}
});
