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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var store_detail_1 = require('./../types/store-detail.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[store_detail_1.QUERY_ALLSTORE_SALESDETAILXTW] = function (state, action) {
        var queryAllStoreSaleDetailxtw = action.payload.queryAllStoreSaleDetailxtw;
        return __assign({}, state, { queryAllStoreSaleDetailxtw: { queryAllStoreSaleDetailxtw: queryAllStoreSaleDetailxtw } });
    },
    _a), (_b = {},
    _b[store_detail_1.QUERY_STORE_ALLINFO] = function (state, action) {
        var queryStoreAllInfo = action.payload.queryStoreAllInfo;
        return __assign({}, state, { queryStoreAllInfo: { queryStoreAllInfo: queryStoreAllInfo } });
    },
    _b), (_c = {},
    _c[store_detail_1.QUERY_ALLMATKL] = function (state, action) {
        var queryAllMatkl = action.payload.queryAllMatkl;
        return __assign({}, state, { queryAllMatkl: { queryAllMatkl: queryAllMatkl } });
    },
    _c), (_d = {},
    _d[store_detail_1.QUERY_ALLSTORE_SALESXTW] = function (state, action) {
        var queryAllStoreSalesXtw = action.payload.queryAllStoreSalesXtw;
        return __assign({}, state, { queryAllStoreSalesXtw: { queryAllStoreSalesXtw: queryAllStoreSalesXtw } });
    },
    _d), (_e = {},
    _e[store_detail_1.CUSTMODEL_SHOPINFO_RANK] = function (state, action) {
        var custModelShopInfoRank = action.payload.custModelShopInfoRank;
        return __assign({}, state, { custModelShopInfoRank: { custModelShopInfoRank: custModelShopInfoRank } });
    },
    _e), (_f = {},
    _f[store_detail_1.GET_STOREDETAIL_BYMAT] = function (state, action) {
        var getStoreDetailByMat = action.payload.getStoreDetailByMat;
        return __assign({}, state, { getStoreDetailByMat: { getStoreDetailByMat: getStoreDetailByMat } });
    },
    _f), (_g = {},
    _g[store_detail_1.GET_STORE_PERSON] = function (state, action) {
        var getStoryPersons = action.payload.getStoryPersons;
        return __assign({}, state, { getStoryPersons: { getStoryPersons: getStoryPersons } });
    },
    _g), (_h = {},
    _h[store_detail_1.GET_STORE_RECORDLIST] = function (state, action) {
        var storeRecordList = action.payload.storeRecordList;
        return __assign({}, state, { storeRecordList: { storeRecordList: storeRecordList } });
    },
    _h), (_j = {},
    _j[store_detail_1.CUSTMODEL_SHOPINFO_RANK] = function (state, action) {
        var getMaterialGroupToXtw = action.payload.getMaterialGroupToXtw;
        return __assign({}, state, { getMaterialGroupToXtw: { getMaterialGroupToXtw: getMaterialGroupToXtw } });
    },
    _j), (_k = {},
    _k[store_detail_1.STORE_EVALUATION_CHART] = function (state, action) {
        var storeEvaluationChart = action.payload.storeEvaluationChart;
        return __assign({}, state, { storeEvaluationChart: { storeEvaluationChart: storeEvaluationChart } });
    },
    _k), {
    queryAllStoreSaleDetailxtw: {},
    queryStoreAllInfo: {},
    queryAllMatkl: {},
    queryAllStoreSalesXtw: {},
    custModelShopInfoRank: {},
    getStoreDetailByMat: {},
    getStoryPersons: {},
    storeRecordList: {},
    getMaterialGroupToXtw: {},
    storeEvaluationChart: {},
});
