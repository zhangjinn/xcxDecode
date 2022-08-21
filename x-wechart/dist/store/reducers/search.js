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
var search_1 = require('./../types/search.js');
var index_1 = require('./../../utils/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var tranfor = function (list) {
    return ramda_1.map(function (_a) {
        var id = _a.id, agentCisCode = _a.agentCisCode, agentName = _a.agentName, orgId = _a.orgId, orgCode = _a.orgCode, productCode = _a.productCode, productLabel = _a.productLabel, isFenXiao = _a.isFenXiao, orgName = _a.orgName, materialGroup = _a.materialGroup, picture = _a.picture, b2bName = _a.b2bName, importInfo = _a.importInfo, often = _a.often, purchaseType = _a.purchaseType, agentShareFlag = _a.agentShareFlag, retailPriceL = _a.retailPriceL;
        return {
            id: id,
            agentName: agentName || '',
            agentCisCode: agentCisCode || '',
            orgId: orgId,
            orgCode: orgCode,
            orgName: orgName,
            b2bName: b2bName,
            importInfo: importInfo,
            collection: often === 'Y',
            loadingPrice: true,
            loadingInventory: true,
            productCode: productCode,
            productLabel: productLabel,
            isFenXiao: isFenXiao,
            purchaseType: purchaseType,
            agentShareFlag: agentShareFlag,
            retailPriceL: retailPriceL,
            img: index_1.formatImg(picture ? {
                format: '180-180',
                name: picture,
                materialId: materialGroup,
                itemId: productCode
            } : {
                name: materialGroup + ".jpg"
            }),
            errImg: index_1.formatImg({
                name: materialGroup + ".jpg"
            })
        };
    }, list || []);
};
exports.default = redux_actions_1.handleActions((_a = {},
    // TODO: 返回dms商品价格和库存
    _a[search_1.GET_FILTER_DMS_GOODS_PRICE] = function (state, action) {
        var search = state.search;
        var payload = action.payload;
        ramda_1.forEach(function (item) {
            ramda_1.forEach(function (res) {
                if (res.productCode == item.productId && res.orgId == item.orgId) {
                    res.loadingPrice = false;
                    res.price = item.standardPrice;
                }
            }, search);
        }, payload.list);
        return __assign({}, state, { search: search.slice() });
    },
    // 物料组和供应商
    _a[search_1.GET_FILTER_ITEM_GROUP] = function (state, action) {
        var payload = action.payload;
        var dmsOrgList = [];
        ramda_1.forEach(function (item) {
            var items = {
                value: item.name,
                key: item.code,
                classificationstatus: false,
                specialstatus: false,
                searchstatus: false,
                specialpopup: [],
                classificationOnsee: true,
                filter: true
            };
            dmsOrgList.push(items);
        }, payload.orgList);
        var dmsmatklList = [];
        ramda_1.forEach(function (item) {
            var items = {
                value: item.name,
                key: item.code,
                name: item.name,
                code: item.code,
                classificationstatus: false,
                specialstatus: false,
                searchstatus: false,
                specialpopup: [],
                classificationOnsee: true,
                filter: true
            };
            dmsmatklList.push(items);
        }, payload.matklList);
        var dmsmatklList2 = [{
                code: '',
                name: '全部',
                desc: null
            }];
        ramda_1.forEach(function (item) {
            dmsmatklList2.push({
                name: item.name,
                code: item.code
            });
        }, payload.matklList);
        return __assign({}, state, { dmsmatklList: dmsmatklList,
            dmsOrgList: dmsOrgList,
            dmsmatklList2: dmsmatklList2 });
    },
    // 供应商
    _a[search_1.GET_FX_DICT_CIS_CODE] = function (state, action) {
        var payload = action.payload;
        var list = payload.list;
        var item = {
            code: '',
            name: '全部供应商',
            desc: null
        };
        list.unshift(item);
        return __assign({}, state, { supplierList: list });
    },
    // 搜索列表
    _a[search_1.GET_SEARCH_GOODS] = function (state, action) {
        // debugger
        var search = state.search;
        var payload = action.payload;
        var currentPage = payload.currentPage, totalPages = payload.totalPages, pageNum = payload.pageNum;
        var result = tranfor(payload.list);
        var loadingInfo = index_1.filterGetPriceOrStock(result);
        loadingInfo._time = new Date();
        var orgIds = payload.orgIds;
        if (pageNum > 1) {
            result = ramda_1.concat(search, result);
        }
        return __assign({}, state, { orgIds: orgIds, loading: false, search: result, loadingInfo: loadingInfo,
            totalPages: totalPages,
            currentPage: currentPage });
    },
    _a[search_1.GET_SEARCH_PRICE] = function (state, action) {
        var search = state.search;
        var payload = action.payload;
        index_1.resetInfo(search, payload, function (item, price) {
            item.loadingPrice = false;
            item.price = price.price;
        });
        return __assign({}, state, { search: search.slice() });
    },
    // [GET_SEARCH_STOCK](state: any, action: { payload: any; }) {
    //   const { search } = state
    //   const { payload } = action
    //   resetInfo(search, payload, (item, stock) => {
    //     item.loadingInventory = false
    //     item.inventory = stock.inventory
    //   })
    //   return {
    //     ...state,
    //     search: [...search]
    //   }
    // },
    //cis 库存
    // [GET_SEARCH_STOCK](state: any, action: { payload: any; }) {
    //   const { search } = state
    //   const { payload } = action
    //   resetInfo(search, payload, (item, stock) => {
    //     item.loadingInventory = false
    //     item.inventory = stock.inventory;
    //     item.ownInv = stock.ownInv
    //     item.sharedInv = stock.sharedInv
    //   })
    //   return {
    //     ...state,
    //     search: [...search]
    //   }
    // },
    _a[search_1.GET_SEARCH_STOCK] = function (state, action) {
        var search = state.search;
        var payload = action.payload;
        var i = 0;
        search.filter(function (item) {
            if (payload.data) {
                if (item.productCode === payload.data[0].productCode) {
                    item.inventory = payload.data[0].inventory;
                    item.ownInv = payload.data[0].ownInv;
                    item.sharedInv = payload.data[0].sharedInv;
                }
            }
            else {
                if (item.productCode === payload[0].productCode) {
                    item.inventory = payload[0].inventory;
                    item.ownInv = payload[0].ownInv;
                    item.sharedInv = payload[0].sharedInv;
                }
            }
            console.log(item.inventory);
            console.log(i += 1);
        });
        return __assign({}, state, { search: search.slice() });
    },
    //DMS 库存
    _a[search_1.GET_DMS_GOODS_INVENTORY] = function (state, action) {
        var search = state.search;
        var payload = action.payload;
        search.filter(function (item) {
            if (item.productCode === payload.data[0].productCode) {
                item.invQty = payload.data[0].invQty;
                item.gicInvQty = payload.data[0].gicInvQty;
            }
        });
        return __assign({}, state, { search: search.slice() });
    },
    _a[search_1.RESET_SEARCH_IMG] = function (state, action) {
        var search = state.search;
        var payload = action.payload;
        var products = ramda_1.filter(function (_a) {
            var productCode = _a.productCode;
            return payload.flag === productCode;
        }, search);
        if (products.length > 0) {
            products[0].img = payload.src;
        }
        return __assign({}, state);
    },
    _a[search_1.RESET_SEARCH_LIST] = function (state, action) {
        return __assign({}, state, { search: [] });
    },
    _a[search_1.TOGGLE_SEARCH_COLLECTION] = function (state, action) {
        var search = state.search;
        var payload = action.payload;
        search.filter(function (item) {
            if (item.id === payload.id) {
                item.collection = !item.collection;
            }
        });
        return __assign({}, state);
    },
    _a), {
    search: [],
    totalPages: '',
    loadingInfo: {},
    dmsmatklList: [],
    dmsOrgList: [],
    supplierList: [],
    dmsmatklList2: []
});
