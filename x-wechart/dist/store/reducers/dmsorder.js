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
var dmsorder_1 = require('./../types/dmsorder.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var index_1 = require('./../../utils/index.js');
// 将上次选择的地址选择第一个并转化为对象
var mapLastAddressToObj = function (param) {
    var keys = Object.keys(param);
    if (keys.length > 0) {
        return {
            id: keys[0],
            name: param[keys[0]]
        };
    }
    else {
        return {
            id: '',
            name: ''
        };
    }
};
exports.default = redux_actions_1.handleActions((_a = {},
    _a[dmsorder_1.DMS_CIS_CODE_INFO] = function (state, action) {
        var chooseItemInfo = state.chooseItemInfo;
        var payload = action.payload;
        return __assign({}, state, { chooseItemInfo: __assign({}, chooseItemInfo, payload) });
    },
    _a[dmsorder_1.DMS_ORDER_CHOOSE_ITEM] = function (state, action) {
        var chooseItemInfo = state.chooseItemInfo;
        var payload = action.payload;
        chooseItemInfo.chooseItemId = payload;
        return state;
    },
    _a[dmsorder_1.DMS_ORDER_CHOOSE_ITEM_INFO] = function (state, action) {
        var chooseItemInfo = state.chooseItemInfo;
        chooseItemInfo.itemInfo[chooseItemInfo.chooseItemId] = action.payload;
        return __assign({}, state, { chooseItemInfo: __assign({}, chooseItemInfo) });
    },
    _a[dmsorder_1.DMS_GET_PRODUCT_LIST_LIKE_CODE] = function (state, action) {
        var payload = action.payload;
        // const { likePaging } = state
        return __assign({}, state, { likePaging: payload.products || [] });
    },
    _a[dmsorder_1.RETURN_ORDER_CHOOSE_CUSTOMER_INFO] = function (state, action) {
        var payload = action.payload;
        var data = payload.data, page = payload.page;
        var over = data.length < 20;
        if (page.pageNo === 1) {
            return __assign({}, state, { customers: {
                    customers: data || [],
                    over: over,
                } });
        }
        else {
            var customers = state.customers;
            return __assign({}, state, { customers: {
                    customers: customers.customers.concat(data || []),
                    over: over
                } });
        }
    },
    _a[dmsorder_1.QUERY_APP_FIBOOKDMS] = function (state, action) {
        var payload = action.payload;
        var fibookList = [];
        fibookList = payload.data.map(function (item) {
            for (var key in item) {
                return {
                    name: item[key],
                    id: key
                };
            }
        });
        return __assign({}, state, { fibookList: fibookList });
    },
    _a[dmsorder_1.DMS_ORDER_GET_CUSTOMER] = function (state, action) {
        var payload = action.payload;
        var data = payload.data, page = payload.page;
        var over = data.length < 20;
        if (page.pageNo === 1) {
            return __assign({}, state, { customers: {
                    customers: data || [],
                    over: over,
                } });
        }
        else {
            var customers = state.customers;
            return __assign({}, state, { customers: {
                    customers: customers.customers.concat(data || []),
                    over: over
                } });
        }
    },
    _a[dmsorder_1.DMS_ORDER_CHOOSE_CUSTOMER_INFO] = function (state, action) {
        return __assign({}, state, { chooseCustomerInfo: action.payload });
    },
    _a[dmsorder_1.DMS_ORDER_ITEM_INV_STATUS] = function (state, action) {
        var payload = action.payload;
        var productCode = payload.productCode, invStatus = payload.invStatus;
        // 转换成对象
        var invStatuss = invStatus.map(function (inv) {
            for (var key in inv) {
                var value = inv[key];
                return {
                    key: key,
                    value: value
                };
            }
        });
        var chooseItemInfo = state.chooseItemInfo;
        var itemInfo = chooseItemInfo.itemInfo;
        for (var key in itemInfo) {
            var value = itemInfo[key];
            if (value.productCode === productCode) {
                value.invStatus = invStatuss;
            }
        }
        return __assign({}, state, { chooseItemInfo: __assign({}, chooseItemInfo) });
    },
    _a[dmsorder_1.DMS_ORDER_NORMAL_SALES_ORDER_CUSTOMER_INFO] = function (state, action) {
        var payload = action.payload;
        var customerInfo = payload.customerInfo;
        var customerInfos = state.customerInfos;
        customerInfos.cisCode = customerInfo.cisCode;
        for (var field in customerInfo) {
            if (field === 'cisCode') {
                continue;
            }
            var list = customerInfo[field];
            customerInfos[field] = list.map(function (item) {
                for (var key in item) {
                    return {
                        id: key,
                        name: item[key]
                    };
                }
            });
            if (field === 'inWarehouseList') {
                // 入库仓库 添加取消选择项 -> 传空
                var nullWare = {
                    id: "",
                    name: "请选择"
                };
                customerInfos.inWarehouseList.unshift(nullWare);
            }
        }
        return __assign({}, state, { customerInfos: __assign({}, customerInfos) });
    },
    _a[dmsorder_1.DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR] = function (state) {
        return __assign({}, state, { chooseItemInfo: {
                chooseItemId: '',
                orgId: '',
                cisCode: '',
                shopCisCode: '',
                itemInfo: {}
            }, chooseCustomerInfo: {
                address: '',
                customerCode: '',
                customerName: '',
                legalPerson: ''
            }, customerInfos: {
                cisCode: '',
                customerAddressAllList: [],
                customerAllList: [],
                inWarehouseList: [],
                orgList: [] // 供应商(销售组织)列表
            }, retailOrderBaseInfo: {
                billFrom: [],
                seller: [],
                store: [],
                warehouse: [],
                address: {
                    province: {
                        id: '',
                        name: ''
                    },
                    city: {
                        id: '',
                        name: ''
                    },
                    country: {
                        id: '',
                        name: ''
                    },
                    town: {
                        id: '',
                        name: ''
                    }
                }
            } });
    },
    _a[dmsorder_1.DMS_ORDER_PRODUCT_LIKE_INFO_CLEAR] = function (state) {
        return __assign({}, state, { likePaging: [] });
    },
    _a[dmsorder_1.DMS_ORDER_RETAIL_ORDER_BASE_DATA] = function (state, action) {
        var payload = action.payload;
        var baseInfo = payload.baseInfo;
        var retailOrderBaseInfo = {
            billFrom: [],
            seller: [],
            store: [],
            storeInfo: [],
            warehouse: [],
        };
        ramda_1.forEachObjIndexed(function (value, field) {
            if (field !== 'address' && field !== 'storeInfo') {
                ramda_1.forEachObjIndexed(function (value, key) {
                    var item = {
                        name: value,
                        id: key,
                    };
                    retailOrderBaseInfo[field].push(item);
                }, value);
            }
            if (field === 'storeInfo') {
                ramda_1.forEachObjIndexed(function (value, key) {
                    var item = __assign({}, value, { id: key });
                    retailOrderBaseInfo[field].push(item);
                }, value);
            }
        }, baseInfo);
        retailOrderBaseInfo.store = retailOrderBaseInfo.storeInfo;
        // 处理地址信息
        var address = baseInfo.address;
        var province = address.province, city = address.city, country = address.country, town = address.town;
        retailOrderBaseInfo.address = {
            province: mapLastAddressToObj(province),
            city: mapLastAddressToObj(city),
            country: mapLastAddressToObj(country),
            town: mapLastAddressToObj(town)
        };
        return __assign({}, state, { retailOrderBaseInfo: __assign({}, retailOrderBaseInfo) });
    },
    _a[dmsorder_1.GET_ZONE_B_2_C_SERVICE_LIST] = function (state, action) {
        var payload = action.payload;
        var serviceList = payload.data || [];
        return __assign({}, state, { serviceList: serviceList });
    },
    _a[dmsorder_1.DMS_RETAIL_ORDER_RESER_CHOOSE] = function (state, action) {
        var retailOrderBaseInfo = state.retailOrderBaseInfo;
        return __assign({}, state, { retailOrderBaseInfo: retailOrderBaseInfo });
    },
    _a[dmsorder_1.DMS_CHANNEL_ORDER_ADD_ITEMS] = function (state, action) {
        return __assign({}, state, { chooseItemInfo: {
                chooseItemId: '',
                itemInfo: action.payload,
            } });
    },
    _a[dmsorder_1.DMS_CIS_FX_PRICE] = function (state, action) {
        var chooseItemInfo = state.chooseItemInfo;
        var _a = action.payload, list = _a.list, refreshPrice = _a.refreshPrice;
        var tempInfo = {};
        for (var index in list) {
            var item = list[index];
            tempInfo["_" + item.productId] = item;
        }
        var result = __assign({}, chooseItemInfo);
        for (var key in result.itemInfo) {
            var info = result.itemInfo[key];
            var resultInfo = tempInfo["_" + info.productCode];
            if (resultInfo) {
                var orgId = chooseItemInfo.orgId;
                var price = (orgId && orgId !== '' ? resultInfo.standardPrice === -1 ? '' : resultInfo.standardPrice : resultInfo.retailPrice === -1 ? '' : resultInfo.retailPrice) || '';
                result.itemInfo[key] = __assign({}, info, { price: price, refreshPrice: refreshPrice, lock: resultInfo.lockFlag && (resultInfo.lockFlag === '1' || resultInfo.lockFlag === '2'), time: new Date().getTime() });
            }
        }
        return __assign({}, state, { chooseItemInfo: result });
    },
    _a[dmsorder_1.DMS_CIS_LS_PRICE] = function (state, action) {
        var chooseItemInfo = state.chooseItemInfo;
        var _a = action.payload, list = _a.list, refreshPrice = _a.refreshPrice;
        var tempInfo = {};
        for (var index in list) {
            var item = list[index];
            tempInfo["_" + item.productId] = item;
        }
        var result = __assign({}, chooseItemInfo);
        for (var key in result.itemInfo) {
            var info = result.itemInfo[key];
            var resultInfo = tempInfo["_" + info.productCode];
            if (resultInfo) {
                var orgId = chooseItemInfo.orgId;
                var price = (orgId && orgId !== '' ? resultInfo.standardPrice === -1 ? '' : resultInfo.standardPrice : resultInfo.retailPrice === -1 ? '' : resultInfo.retailPrice) || '';
                result.itemInfo[key] = __assign({}, info, { price: price, refreshPrice: refreshPrice, lock: resultInfo.lockFlag && (resultInfo.lockFlag === '1' || resultInfo.lockFlag === '2'), time: new Date().getTime() });
            }
        }
        return __assign({}, state, { chooseItemInfo: result });
    },
    _a[dmsorder_1.CIS_DELIVERY_METHOD] = function (state, action) {
        var cisDeliveryMode = [];
        var list = action.payload.list;
        cisDeliveryMode = list.map(function (item) {
            return {
                id: item.code,
                name: item.name
            };
        });
        return __assign({}, state, { cisDeliveryMode: cisDeliveryMode });
    },
    _a[dmsorder_1.DMS_DELIVERY_METHOD] = function (state, action) {
        var deliveryMode = [];
        var list = action.payload.data;
        deliveryMode = list.map(function (item) {
            for (var key in item) {
                return {
                    id: key,
                    name: item[key]
                };
            }
        });
        return __assign({}, state, { deliveryMode: deliveryMode });
    },
    _a[dmsorder_1.DMS_INV_STATUS_TYPE] = function (state, action) {
        var invStatusType = [];
        var list = action.payload.data;
        invStatusType = list.map(function (item) {
            for (var key in item) {
                return {
                    id: key,
                    name: item[key]
                };
            }
        });
        var nullWare = {
            id: "",
            name: "请选择"
        };
        invStatusType.unshift(nullWare);
        return __assign({}, state, { invStatusType: invStatusType });
    },
    _a[dmsorder_1.DMS_STOCK_WARAHOUSE_LIST] = function (state, action) {
        var warehousesOut = [];
        var warehousesIn = [];
        var addressList = [];
        var stockStatus = [];
        var outlist = action.payload.data.warehousesOut;
        var inlist = action.payload.data.warehousesIn;
        var addreList = action.payload.data.addressList;
        var stockTransStatus = action.payload.data.stockTransStatus;
        var flag = 0;
        for (var key in stockTransStatus) {
            var info = {
                id: key,
                name: stockTransStatus[key]
            };
            stockStatus[flag] = info;
            flag++;
        }
        warehousesOut = outlist.map(function (item) {
            for (var key in item) {
                return {
                    id: item.cId,
                    name: item.name
                };
            }
        });
        warehousesIn = inlist.map(function (item) {
            for (var key in item) {
                return {
                    id: item.cId,
                    name: item.name
                };
            }
        });
        addressList = addreList.map(function (item) {
            for (var key in item) {
                return {
                    id: item.id,
                    name: item.address,
                    mobile: item.mobile,
                    linkman: item.linkman,
                    areaStatus: item.areaStatus,
                };
            }
        });
        return __assign({}, state, { warehousesIn: warehousesIn,
            warehousesOut: warehousesOut,
            addressList: addressList,
            stockStatus: stockStatus });
    },
    _a[dmsorder_1.DMS_ALLOT_SUBMIT] = function (state, action) {
        var subResult = action.payload.data;
        return __assign({}, state, { subResult: subResult });
    },
    _a[dmsorder_1.SUBMIT_STORE_LIST] = function (state, action) {
        var subStoreList = action.payload.data;
        return __assign({}, state, { subStoreList: subStoreList });
    },
    _a[dmsorder_1.DMS_ALLOT_ORDER_LIST] = function (state, action) {
        var payload = action.payload;
        var orderList = state.orderList;
        var orderListNew = payload;
        if (payload.page && payload.page.pageNo > 1 && orderList && orderList.data && orderList.data.length > 0) {
            orderListNew = __assign({}, payload, { data: orderList.data.concat(payload.data) });
        }
        else {
            orderListNew = __assign({}, payload, { data: payload.data });
        }
        ramda_1.forEach(function (items) {
            ramda_1.forEach(function (item) {
                if (item.bdemandQty) {
                    item.bdemandQty = Number(item.bdemandQty);
                }
                var _a = index_1.formatDmsImg({ model: item.model, material: item.materialGroupCode }), img = _a.img, err = _a.err;
                item.img = img;
                item.err = err;
            }, items.staItems || []);
        }, orderListNew.data || []);
        return __assign({}, state, { loading: false, orderList: orderListNew });
    },
    _a[dmsorder_1.DMS_ALLOCATION_RATIO] = function (state, action) {
        var payload = action.payload;
        var allocationRatioList = payload.data || [];
        var newList = [
            {
                title: '当前月累(考核指标)',
                content: []
            },
            {
                title: '近30天累计(计算规则)',
                content: []
            }
        ];
        if (allocationRatioList && allocationRatioList.length > 0) {
            allocationRatioList.forEach(function (item) {
                newList[0].content.push({
                    orgName: item.orgName,
                    salesCount: item.monthlyStatsSalesCount,
                    transCount: item.monthlyStatsTransCount,
                    total: item.monthlyStatsTotal,
                    transRate: item.monthlyStatsTransRate,
                    availableMaxTransRate: item.availableMaxTransRate,
                });
                newList[1].content.push({
                    orgName: item.orgName,
                    salesCount: item.statsSalesCount,
                    transCount: item.statsTransCount,
                    total: item.statsTotal,
                    transRate: item.statsTransRate,
                    availableMaxTransRate: item.availableMaxTransRate,
                });
            });
        }
        allocationRatioList = newList;
        console.log('allocationRatioList', allocationRatioList);
        return __assign({}, state, { allocationRatioList: allocationRatioList });
    },
    // 获取样机门店数据
    _a[dmsorder_1.DMS_ORDER_PROTOTYPE_SHOP_DATA] = function (state, action) {
        var payload = action.payload;
        var customerInfo = {};
        customerInfo.custmerCode = payload.custmerCode ? payload.custmerCode : '';
        customerInfo.custmerMdmCode = payload.custmerCode ? payload.custmerMdmCode : '';
        customerInfo.custmerName = payload.custmerCode ? payload.custmerName : '';
        // 商家信息
        var protoTypeInfor = {
            storeInfo: [],
        };
        protoTypeInfor.storeInfo = payload.list;
        return __assign({}, state, { protoTypeInfor: __assign({}, protoTypeInfor, { customerInfo: customerInfo }) });
    },
    //   获取样机管理中物料组数据
    _a[dmsorder_1.DMS_ORDER_PROTOTYPE_METARIL_DATA] = function (state, action) {
        var materialGroupList = [];
        materialGroupList = action.payload.list;
        return __assign({}, state, { materialGroupList: materialGroupList });
    },
    _a), {
    chooseItemInfo: {
        chooseItemId: '',
        cisCode: '',
        orgId: '',
        shopCisCode: '',
        itemInfo: {
        // '_0': {
        //   colour: '标准',
        //   productCode: '3451028',
        //   model: 'LED50K300U',
        //   productName: 'Z.彩电.LED50K300U.T.B0.中国C.',
        //   invStatus: [
        //     {
        //       key: 15393578,
        //       value: '正品'
        //     },
        //     {
        //       key: 15393580,
        //       value: '样机'
        //     },
        //     {
        //       key: 26414909442,
        //       value: '正品低补'
        //     },
        //     {
        //       key: 26414909490,
        //       value: '正品不补'
        //     },
        //     {
        //       key: 26414909556,
        //       value: '样机低补'
        //     },
        //     {
        //       key: 26414909609,
        //       value: '样机不补'
        //     }
        //   ]
        // }
        },
    },
    chooseCustomerInfo: {
        address: '',
        customerCode: '',
        customerName: '',
        legalPerson: ''
    },
    likePaging: [],
    customers: {
        customers: [],
        over: false
    },
    amount: '0.00',
    customerInfos: {
        cisCode: '',
        customerAddressAllList: [],
        customerAllList: [],
        inWarehouseList: [],
        orgList: [] // 供应商(销售组织)列表
    },
    retailOrderBaseInfo: {
        billFrom: [],
        seller: [],
        store: [],
        warehouse: [],
        address: {
            province: {
                id: '',
                name: ''
            },
            city: {
                id: '',
                name: ''
            },
            country: {
                id: '',
                name: ''
            },
            town: {
                id: '',
                name: ''
            }
        }
    },
    deliveryMode: [],
    cisDeliveryMode: [],
    fibookList: [],
    orderList: [],
    warehousesIn: [],
    warehousesOut: [],
    subResult: {},
    addressList: [],
    stockStatus: [],
    subStoreList: [],
    serviceList: [],
    allocationRatioList: [],
    serviceList: [],
    protoTypeInfor: {}
});
// "productCode":"4234",                  //产品编码
//        "productName":"电视",                  //产品名称
//    "model":"KAJOFEI",                     //型号
//        "colour":"标准",                          //颜色
