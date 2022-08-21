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
var store_1 = require('./../types/store.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var wlz = ['海信平板', '激光电视', 'Vidda电视', '海信空调', '科龙空调', '海信冰箱', '容声冰箱', '海信冷柜', '容声冷柜', '海信洗衣机', '容声洗衣机'];
exports.default = redux_actions_1.handleActions((_a = {},
    _a[store_1.GET_STORE_LIST] = function (state, action) {
        var storeList = action.payload.storeList;
        return __assign({}, state, { storeList: { storeList: storeList } });
    },
    _a[store_1.GET_COM_REGION] = function (state, action) {
        var getComRegion = action.payload.getComRegion;
        return __assign({}, state, { getComRegion: { getComRegion: getComRegion } });
    },
    _a[store_1.FIND_RESULT_LIST] = function (state, action) {
        var returnData = action.payload.returnData;
        if (returnData.list && Array.isArray(returnData.list)) {
            returnData.list.forEach(function (it) {
                it.checkTime = (new Date(it.checkTime)).Format('yyyy-MM-dd hh:mm:ss');
            });
        }
        return __assign({}, state, { resultList: returnData });
    },
    _a[store_1.FIND_DETAIL_BY_ID] = function (state, action) {
        var returnData = action.payload.returnData || {};
        return __assign({}, state, { checkIndetail: returnData });
    },
    // 订单筛选列表
    _a[store_1.GET_ORDER_FILTER] = function (state, action) {
        var payload = action.payload;
        var orderfilter = {
            itemgroup: [],
            suppliers: [],
            itemAgent: [],
            itemFxmap: [],
        };
        var all = {
            value: '全部',
            key: '',
            stock: false
        };
        orderfilter.itemAgent.push(all);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key,
                stock: false
            };
            orderfilter.itemAgent.push(item);
        }, payload.agentMap);
        orderfilter.itemFxmap.push(all);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key,
                stock: false
            };
            orderfilter.itemFxmap.push(item);
        }, payload.fxMap);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key,
                stock: false
            };
            orderfilter.suppliers.push(item);
        }, payload.fwOrgsGroupMap);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key
            };
            // 只过滤变量中有的物料组
            if (wlz.indexOf(item.value) > -1) {
                orderfilter.itemgroup.push(item);
            }
        }, payload.productGroupMap);
        return __assign({}, state, { loading: false, filter: orderfilter });
    },
    //  重置我新增的门店
    _a[store_1.RESET_MY_ADD_SHOP_LIST] = function (state, action) {
        return __assign({}, state, { myAddShopList: [] });
    },
    // 我新增的门店列表
    _a[store_1.GET_MY_ADD_SHOP_LIST] = function (state, action) {
        var payload = action.payload;
        var orderListNew = payload;
        orderListNew = payload.data;
        if (orderListNew && orderListNew.length) {
            orderListNew = orderListNew.map(function (item) {
                item.address = item.provinceName + item.cityName + item.countyName + item.shAddress;
                return item;
            });
        }
        return __assign({}, state, { loading: false, myAddShopList: orderListNew });
    },
    _a), {
    storeList: {},
    getComRegion: {},
    resultList: {},
    filter: {},
    checkIndetail: {},
    myAddShopList: [],
});
