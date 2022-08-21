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
var purchaseshop_1 = require('./../types/purchaseshop.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var dmsorder_1 = require('./../types/dmsorder.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    // 分销商下单专用重置
    _a[purchaseshop_1.RESET_DISTRIBUTOR_ORDERS_FILTER] = function (state, action) {
        return __assign({}, state, { shippingAddress: [], settlementUnits: [], baseData: [] });
    },
    // 替换错误图片
    _a[purchaseshop_1.RESET_PURCHASE_IMG] = function (state, action) {
        var payload = action.payload;
        var purchaseList = state.purchaseList;
        var flag = payload.flag, src = payload.src;
        ramda_1.forEach(function (item) {
            ramda_1.forEach(function (res) {
                // console.log(res)
                if (res.img == flag) {
                    res.img = src;
                }
            }, item.purchaseOrderItem);
        }, purchaseList);
        return __assign({}, state, { purchaseList: purchaseList.slice() });
    },
    // 根据商家获取供应商
    _a[purchaseshop_1.GET_MERCHANT_SUPPLIERS] = function (state, action) {
        var payload = action.payload;
        var supplier = payload.supplier;
        ramda_1.forEach(function (item) {
            item.isSelect = false;
        }, supplier);
        var all = {
            fullName: '全部',
            orgName: '全部',
            supplierName: '全部',
            supplierCode: '',
            orgId: '',
        };
        supplier.unshift(all);
        return __assign({}, state, { purchaseSupplier: supplier });
    },
    // 重置采购物料组
    _a[purchaseshop_1.RESET_VENDOR_ITEM_GROUP] = function (state, action) {
        return __assign({}, state, { purchaseMaterialGroup: [] });
    },
    // 根据供应商获取物料组
    _a[purchaseshop_1.GET_VENDOR_ITEM_GROUP] = function (state, action) {
        var payload = action.payload;
        var materialGroup = payload.materialGroup;
        var purchaseMaterialGroup = [];
        var all = {
            key: '',
            value: '全部',
            isSelect: false
        };
        purchaseMaterialGroup.push(all);
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                key: key,
                value: value,
                isSelect: false
            };
            purchaseMaterialGroup.push(item);
        }, materialGroup);
        return __assign({}, state, { purchaseMaterialGroup: purchaseMaterialGroup });
    },
    _a[purchaseshop_1.GET_PURCHASE_LIST_IN] = function (state, action) {
        var payload = action.payload;
        var data = payload.data;
        return __assign({}, state);
    },
    _a[purchaseshop_1.RESET_PURCHASE_LIST] = function (state, action) {
        return __assign({}, state, { purchaseList: [] });
    },
    // 采购筛选列表
    _a[purchaseshop_1.GET_PURCHASE_LIST] = function (state, action) {
        var payload = action.payload;
        var data = payload.data, page = payload.page;
        var totalPage = page.totalPage;
        var purchaseList = state.purchaseList;
        data.forEach(function (element) {
            element.isSelect = false;
            ramda_1.forEach(function (item) {
                var _a = index_1.formatDmsImg({ model: item.model, material: item.materialGroupCode }), img = _a.img, err = _a.err;
                item.img = img;
                item.errImg = err;
            }, element.purchaseOrderItem);
        });
        var newList;
        if (purchaseList.length > 0 && data.length > 0) {
            newList = ramda_1.concat(purchaseList, data);
        }
        else {
            newList = data;
        }
        return __assign({}, state, { loading: false, purchaseList: newList, totalPage: totalPage });
    },
    // 获取基础藏库
    _a[purchaseshop_1.GET_BASE_DATA] = function (state, action) {
        var payload = action.payload;
        var type = payload.type;
        switch (type) {
            case 'cglrywy':
                var PurchaseEntrySalesman_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                            isSelect: false,
                        };
                        PurchaseEntrySalesman_1.push(item);
                    }, value);
                }, data);
                if (PurchaseEntrySalesman_1.length > 0) {
                    PurchaseEntrySalesman_1[0].isSelect = true;
                }
                return __assign({}, state, { PurchaseEntrySalesman: PurchaseEntrySalesman_1 });
            case 'cglrrkck':
                var WarehouseList_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                            isSelect: false,
                        };
                        WarehouseList_1.push(item);
                    }, value);
                }, data);
                // 入库仓库 添加取消选择项 -> 传空
                var nullWare = {
                    isSelect: false,
                    value: "请选择",
                    key: ""
                };
                WarehouseList_1.unshift(nullWare);
                if (WarehouseList_1.length > 0) {
                    WarehouseList_1[0].isSelect = true;
                }
                return __assign({}, state, { baseData: WarehouseList_1 });
            case 'cgrkrkck':
                var WarehouseList2_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                            isSelect: false,
                        };
                        WarehouseList2_1.push(item);
                    }, value);
                }, data);
                // 入库仓库 添加取消选择项 -> 传空
                var nullWare = {
                    isSelect: false,
                    value: "请选择",
                    key: ""
                };
                WarehouseList2_1.unshift(nullWare);
                if (WarehouseList2_1.length > 0) {
                    WarehouseList2_1[0].isSelect = true;
                }
                return __assign({}, state, { baseData: WarehouseList2_1 });
            case 'cglrshdz': // 收货地址
                var shippingAddress_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                        };
                        shippingAddress_1.push(item);
                    }, value);
                }, data);
                return __assign({}, state, { shippingAddress: shippingAddress_1 });
            case 'cglrjsdw': // 结算单位
                var settlementUnits_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                        };
                        settlementUnits_1.push(item);
                    }, value);
                }, data);
                return __assign({}, state, { settlementUnits: settlementUnits_1 });
            case 'wlz':
                var ItemgroupList_1 = [];
                var data = payload.data;
                var all = {
                    value: '全部',
                    key: '',
                    isSelect: false,
                };
                ItemgroupList_1.push(all);
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                            isSelect: false,
                        };
                        ItemgroupList_1.push(item);
                    }, value);
                }, data);
                return __assign({}, state, { ItemgroupList: ItemgroupList_1 });
            case 'kczt':
                var WarehouseStatusList_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                            isSelect: false,
                        };
                        WarehouseStatusList_1.push(item);
                    }, value);
                }, data);
                return __assign({}, state, { WarehouseStatusList: WarehouseStatusList_1 });
            case 'ssmd':
                var StoresList_1 = [];
                var data = payload.data;
                var all = {
                    value: '全部',
                    key: '',
                    isSelect: false,
                };
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                            isSelect: false,
                        };
                        StoresList_1.push(item);
                    }, value);
                }, data);
                return __assign({}, state, { StoresList: StoresList_1 });
            case 'gys':
                var SuppliersList_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key,
                            isSelect: false,
                        };
                        SuppliersList_1.push(item);
                    }, value);
                }, data);
                if (SuppliersList_1.length > 0) {
                    SuppliersList_1[0].isSelect = true;
                }
                var Supplier = SuppliersList_1[0].value;
                return __assign({}, state, { SuppliersList: SuppliersList_1,
                    Supplier: Supplier });
            case 'kpf': // 开票方
                var kpfList_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            name: value,
                            id: key,
                        };
                        kpfList_1.push(item);
                    }, value);
                }, data);
                return __assign({}, state, { kpfList: kpfList_1 });
            case 'ywy': // 业务员
                var ywyList_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            name: value,
                            id: key,
                        };
                        ywyList_1.push(item);
                    }, value);
                }, data);
                return __assign({}, state, { ywyList: ywyList_1 });
            case 'fhck':
                var fhckList_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            name: value,
                            id: key,
                        };
                        fhckList_1.push(item);
                    }, value);
                }, data);
                return __assign({}, state, { fhckList: fhckList_1 });
            default:
                return __assign({}, state);
        }
    },
    _a[dmsorder_1.DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR] = function (state, action) {
        return __assign({}, state, { kpfList: [], ywyList: [], fhckList: [] });
    },
    _a), {
    purchaseList: {},
    baseData: {},
    totalPage: {},
    SuppliersList: {},
    ItemgroupList: {},
    WarehouseStatusList: {},
    Supplier: '',
    kpfList: [],
    ywyList: [],
    fhckList: [],
    purchaseSupplier: [],
    purchaseMaterialGroup: [],
    settlementUnits: [],
    shippingAddress: [],
    PurchaseEntrySalesman: []
});
