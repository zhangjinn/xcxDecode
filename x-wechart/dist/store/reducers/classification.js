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
var classification_1 = require('./../types/classification.js');
var index_1 = require('./../../utils/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var tranfor = function (list) {
    return ramda_1.map(function (_a) {
        var agentCisCode = _a.agentCisCode, agentName = _a.agentName, id = _a.id, orgId = _a.orgId, orgCode = _a.orgCode, productCode = _a.productCode, productLabel = _a.productLabel, orgName = _a.orgName, materialGroup = _a.materialGroup, picture = _a.picture, b2bName = _a.b2bName, importInfo = _a.importInfo, often = _a.often, isFenXiao = _a.isFenXiao, purchaseType = _a.purchaseType, agentShareFlag = _a.agentShareFlag, retailPriceL = _a.retailPriceL;
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
            // autoLoadingPrice: true,
            // autoLoadingInventory: true,
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
    // TODO:
    // 三期物料组和供应商
    _a[classification_1.GET_THREE_PHASE_MATERIAL_GROUP_AND_SUPPLIERS] = function (state, action) {
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
                classificationstatus: false,
                specialstatus: false,
                searchstatus: false,
                specialpopup: [],
                classificationOnsee: true,
                filter: true
            };
            dmsmatklList.push(items);
        }, payload.matklList);
        return __assign({}, state, { dmsmatklList: dmsmatklList,
            dmsOrgList: dmsOrgList });
    },
    // 重置list
    _a[classification_1.RESET_CLASSIFICATION_LIST] = function (state, action) {
        return __assign({}, state, { classification: [] });
    },
    _a[classification_1.RESET_ENGINEER_LIST] = function (state, action) {
        return __assign({}, state, { categories: [] });
    },
    _a[classification_1.RESET_PREFERENTIAL_LIST] = function (state, action) {
        return __assign({}, state, { preferential: [] });
    },
    _a[classification_1.RESET_BUYOUT_LIST] = function (state, action) {
        return __assign({}, state, { buyout: [] });
    },
    // 特惠单筛选返回
    _a[classification_1.GET_SPECIAL_FILTERS] = function (state, action) {
        var payload = action.payload;
        var specialfilters = {
            fwOrgsGroupMap: [],
            orgMatkl: [],
            productGroupMap: [],
            firstorg: '',
            classificationpopup: [],
            searchpopu: []
        };
        var all = {
            value: '全部',
            key: '',
            active: false
        };
        specialfilters.orgMatkl.push(all);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key,
                classificationstatus: false,
                specialstatus: false,
                searchstatus: false,
                specialpopup: [],
                classificationOnsee: true,
                filter: true
            };
            specialfilters.fwOrgsGroupMap.push(item);
        }, payload.fwOrgsGroupMap);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key,
                active: false
            };
            specialfilters.orgMatkl.push(item);
        }, payload.orgMatkl);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key,
                specialstatus: false
            };
            specialfilters.productGroupMap.push(item);
        }, payload.productGroupMap);
        // 供应商默认选中第一个
        specialfilters.orgMatkl[0].active = true;
        specialfilters.firstorg = specialfilters.orgMatkl[0].value;
        return __assign({}, state, { loading: false, specialfilters: specialfilters });
    },
    // 工程单列表
    _a[classification_1.GET_ENGINEER_LIST] = function (state, action) {
        var categories = state.categories;
        var payload = action.payload;
        var currentPage = payload.currentPage, totalPages = payload.totalPages;
        var newList = payload.engineeringOrders;
        if (currentPage !== 1 && currentPage) {
            if (categories) {
                newList = ramda_1.concat(categories, newList);
            }
        }
        console.log('工程单列表', newList);
        return __assign({}, state, { loading: false, categories: newList, totalPages: totalPages });
    },
    // 特惠列表
    _a[classification_1.GET_PREFERENTIAL_LIST] = function (state, action) {
        var payload = action.payload;
        var preferential = state.preferential;
        var currentPage = payload.currentPage, totalPages = payload.totalPages;
        if (payload.preperList && payload.preperList.length > 0) {
            payload.preperList.forEach(function (res) {
                res.select = false;
                res.iscount = 0;
                res.price = 0;
                res.relSelect = false;
                res.relcount = ramda_1.subtract(res.count, res.buyCount);
            });
        }
        var newList = payload.preperList;
        if (currentPage !== 1) {
            if (preferential && preferential.length > 0) {
                newList = ramda_1.concat(preferential, newList);
            }
        }
        console.log('特惠列表', newList);
        return __assign({}, state, { loading: false, preferential: newList, totalPages: totalPages });
    },
    // 套购列表
    _a[classification_1.GET_BUYOUT_LIST] = function (state, action) {
        var payload = action.payload;
        var buyout = state.buyout;
        var currentPage = payload.currentPage, totalPages = payload.totalPages;
        if (payload.list) {
            payload.list.map(function (res) {
                if (res.status = '已下发') {
                    res.statusnumber = 1;
                    res.status = '进行中';
                }
                else if (res.status = '未开始') {
                    res.statusnumber = 0;
                }
                else if (res.status = '已结束') {
                    res.statusnumber = 2;
                }
                // 格式化时间
                res.startDate = res.startDate.split(' ')[0];
                res.endDate = res.endDate.split(' ')[0];
            });
        }
        var newList = payload.list;
        if (currentPage !== '1') {
            if (buyout && buyout.length > 0) {
                newList = ramda_1.concat(buyout, newList);
            }
        }
        console.log('工程单列表', newList);
        return __assign({}, state, { loading: false, buyout: newList, totalPages: totalPages });
    },
    // 分类列表
    _a[classification_1.GET_CLASSIFICATION_LIST] = function (state, action) {
        var payload = action.payload;
        var currentPage = payload.currentPage, totalPages = payload.totalPages, pageNo = payload.pageNo;
        var classification = state.classification;
        // if (currentPage > totalRows || (currentPage == 0 && totalRows == 0) ) return
        var orgIds = payload.orgIds;
        var result = tranfor(payload.list);
        var loadingInfo = index_1.filterGetPriceOrStock(result);
        loadingInfo._time = new Date();
        if (result && result.length > 0) {
            if (pageNo > 1) {
                result = ramda_1.concat(classification, result);
            }
            else {
                if (pageNo == 1) {
                    result = result;
                }
            }
        }
        else {
            if (classification.length > 0) {
                if (pageNo > 1) {
                    result = classification;
                }
                else if (pageNo == 0) {
                    // TODO:还是缺少一种逻辑 没货了怎么办 都是currentPage = 0
                    result = [];
                }
                else {
                    result = [];
                }
            }
            else {
                result = [];
            }
        }
        return __assign({}, state, { orgIds: orgIds, loading: false, classification: result, loadingInfo: loadingInfo,
            totalPages: totalPages,
            currentPage: currentPage });
    },
    // 筛选条件列表
    _a[classification_1.GET_GOODS_FILTERS] = function (state, action) {
        var payload = action.payload;
        var filters = [];
        ramda_1.forEachObjIndexed(function (namevalue, namekey) {
            ramda_1.forEachObjIndexed(function (value, key) {
                if (namekey == key) {
                    var categoryid = namevalue;
                    value.map(function (res) {
                        res.active = false;
                    });
                    var item = {
                        key: key,
                        value: value,
                        extend: false,
                        categoryid: categoryid,
                        filter: {}
                    };
                    filters.push(item);
                }
            }, payload.map);
        }, payload.nameMap);
        return __assign({}, state, { loading: false, filters: filters });
    },
    // TODO: 返回dms商品价格和库存
    _a[classification_1.GET_DMS_GOODS_PRICE] = function (state, action) {
        var classification = state.classification;
        var payload = action.payload;
        ramda_1.forEach(function (item) {
            ramda_1.forEach(function (res) {
                if (res.productCode == item.productId) {
                    res.loadingPrice = false;
                    res.price = item.standardPrice;
                }
            }, classification);
        }, payload.list);
        return __assign({}, state, { classification: classification.slice() });
    },
    _a[classification_1.GET_CLASSIFICATION_PRICE] = function (state, action) {
        var classification = state.classification;
        var payload = action.payload;
        index_1.resetInfo(classification, payload, function (item, price) {
            item.loadingPrice = false;
            item.price = price.price;
        });
        return __assign({}, state, { classification: classification.slice() });
    },
    // 海信库存
    _a[classification_1.GET_CLASSIFICATION_STOCK] = function (state, action) {
        var classification = state.classification;
        var payload = action.payload;
        index_1.resetInfo(classification, payload, function (item, stock) {
            item.loadingInventory = false;
            item.inventory = stock.inventory;
            item.ownInv = stock.ownInv;
            item.sharedInv = stock.sharedInv;
        });
        return __assign({}, state, { classification: classification.slice() });
    },
    //DMS 库存
    _a[classification_1.GET_DMS_GOODS_INVENTORY] = function (state, action) {
        var classification = state.classification;
        var payload = action.payload;
        classification.filter(function (item) {
            if (item.productCode === payload.data[0].productCode) {
                item.invQty = payload.data[0].invQty;
                item.gicInvQty = payload.data[0].gicInvQty;
            }
        });
        return __assign({}, state, { classification: classification.slice() });
    },
    _a[classification_1.RESET_PRODUCT_IMG] = function (state, action) {
        var classification = state.classification;
        var payload = action.payload;
        var products = ramda_1.filter(function (_a) {
            var productCode = _a.productCode;
            return payload.flag === productCode;
        }, classification);
        if (products.length > 0) {
            products[0].img = payload.src;
        }
        return __assign({}, state);
    },
    _a[classification_1.GET_PRODUCT] = function (state, action) {
        var payload = action.payload;
        formatPicture(payload.hotProductDTOs);
        formatPicture(payload.hotProductDTOs1);
        formatPicture(payload.hotProductDTOs2);
        formatPicture(payload.hotProductDTOs3);
        formatPicture(payload.hotProductDTOs4);
        formatPicture(payload.hotProductDTOs5);
        formatPicture(payload.hotProductDTOs6);
        formatPicture(payload.hotProductDTOs7);
        return __assign({}, state, { products: payload });
    },
    _a[classification_1.TOGGLE_CLASSIFICATION_COLLECTION] = function (state, action) {
        var classification = state.classification;
        var payload = action.payload;
        classification.filter(function (item) {
            if (item.id === payload.id) {
                item.collection = !item.collection;
            }
        });
        return __assign({}, state);
    },
    _a), {
    categories: [],
    preferential: [],
    buyout: [],
    classification: [],
    loadingInfo: {},
    filters: [],
    specialfilters: [],
    dmsmatklList: [],
    dmsOrgList: [],
    products: {
        hotProductDTOs: [],
        hotProductDTOs1: [],
        hotProductDTOs2: [],
        hotProductDTOs3: [],
        hotProductDTOs4: [],
        hotProductDTOs5: [],
        hotProductDTOs6: [],
        hotProductDTOs7: []
    }
});
function formatPicture(pros) {
    pros.forEach(function (it) {
        it.img = index_1.formatImg(it.picture ? {
            format: '180-180',
            name: it.picture,
            materialId: it.materialGroup,
            itemId: it.productId
        } : {
            name: it.materialGroup + ".jpg"
        });
        it.errImg = index_1.formatImg({
            name: it.materialGroup + ".jpg"
        });
    });
}
