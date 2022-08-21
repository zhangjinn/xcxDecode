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
var collection_1 = require('./../types/collection.js');
var index_1 = require('./../../utils/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var tranfor = function (list) {
    return ramda_1.map(function (_a) {
        var id = _a.id, orgId = _a.orgId, agentCisCode = _a.agentCisCode, agentName = _a.agentName, orgCode = _a.orgCode, productCode = _a.productCode, productLabel = _a.productLabel, isFenXiao = _a.isFenXiao, orgName = _a.orgName, materialGroup = _a.materialGroup, picture = _a.picture, b2bName = _a.b2bName, importInfo = _a.importInfo, status = _a.status;
        return {
            id: id,
            orgId: orgId,
            orgCode: orgCode,
            agentName: agentName || '',
            agentCisCode: agentCisCode || '',
            orgName: orgName,
            isFenXiao: isFenXiao,
            b2bName: b2bName,
            importInfo: importInfo,
            collection: status === 'Y',
            loadingPrice: true,
            loadingInventory: true,
            productCode: productCode,
            productLabel: productLabel,
            img: index_1.formatImg(picture ? {
                format: '180-180',
                name: picture,
                materialId: materialGroup,
                itemId: productCode,
            } : {
                name: materialGroup + ".jpg",
            }),
            errImg: index_1.formatImg({
                name: materialGroup + ".jpg",
            })
        };
    }, list || []);
};
exports.default = redux_actions_1.handleActions((_a = {},
    _a[collection_1.RESET_COLLECTION_LOAD] = function (state, action) {
        return __assign({}, state, { loadingInfo: [] });
    },
    _a[collection_1.GET_COLLECTION_DMS_PRICE] = function (state, action) {
        var list = state.list;
        var payload = action.payload;
        ramda_1.forEach(function (res) {
            ramda_1.forEach(function (item) {
                if (res.productCode == item.productId) {
                    res.loadingPrice = false;
                    res.price = item.standardPrice;
                }
            }, payload.list || []);
        }, list || []);
        return __assign({}, state, { list: list.slice() });
    },
    _a[collection_1.GET_COLLECTION_BY_GROUP_CATEGORY] = function (state, action) {
        var payload = action.payload;
        var result = tranfor(payload.oftenProductList);
        var loadingInfo = index_1.filterGetPriceOrStock(result);
        return __assign({}, state, { list: result, loadingInfo: loadingInfo });
    },
    _a[collection_1.GET_COLLECTION_FROM_CART] = function (state, action) {
        var payload = action.payload;
        var result = tranfor(payload.oftenProductList);
        var loadingInfo = index_1.filterGetPriceOrStock(result);
        return __assign({}, state, { list: result, loadingInfo: loadingInfo });
    },
    _a[collection_1.RESET_COLLECTION_EMPTY] = function (state, action) {
        return __assign({}, state, { list: [] });
    },
    _a[collection_1.RESET_COLLECTION_IMG] = function (state, action) {
        var list = state.list;
        var payload = action.payload;
        var products = ramda_1.filter(function (_a) {
            var productCode = _a.productCode;
            return payload.flag === productCode;
        }, list);
        if (products.length > 0) {
            products[0].img = payload.src;
        }
        return __assign({}, state);
    },
    _a[collection_1.GET_COLLECTION_PRICE] = function (state, action) {
        var list = state.list;
        var payload = action.payload;
        index_1.resetInfo(list, payload, function (item, price) {
            item.loadingPrice = false;
            item.price = price.price;
        });
        return __assign({}, state, { list: list.slice() });
    },
    _a[collection_1.GET_COLLECTION_STOCK] = function (state, action) {
        var list = state.list;
        var payload = action.payload;
        index_1.resetInfo(list, payload, function (item, stock) {
            item.loadingInventory = false;
            item.inventory = stock.inventory;
        });
        return __assign({}, state, { list: list.slice() });
    },
    _a), {
    list: [],
    loadingInfo: {}
});
