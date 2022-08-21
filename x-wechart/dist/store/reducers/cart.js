"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var redux_actions_1 = require('./../../npm/redux-actions/lib/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var cart_1 = require('./../types/cart.js');
var index_1 = require('./../../utils/index.js');
var getDiscount = function (fixedDiscount) {
    var discountStr = (100 - parseFloat(fixedDiscount)) / 100;
    var discount = parseFloat(discountStr);
    return discount;
};
exports.default = redux_actions_1.handleActions((_a = {},
    _a[cart_1.GET_DMS_PRIDE_AND_ID] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var items = [];
        if (list && list.length > 0) {
            items = ramda_1.map(function (_a) {
                var productId = _a.productId, quantity = _a.quantity, rest = __rest(_a, ["productId", "quantity"]);
                var item = ramda_1.find(ramda_1.propEq('productId', productId), payload.list) || {};
                if (item.standardPrice == -1) {
                    item.dmsIsSell = false;
                }
                else {
                    item.dmsIsSell = true;
                }
                return __assign({}, rest, item, { productId: productId, quantity: quantity });
            }, list);
        }
        return __assign({}, state, { list: items });
    },
    _a[cart_1.GET_CART_SUPPLY_AND_ITEM_GROUP] = function (state, action) {
        var payload = action.payload;
        var orgList = [];
        ramda_1.forEach(function (item) {
            var Item = {
                key: item.code,
                value: item.name,
                type: item.type,
                child: item.child,
            };
            orgList.push(Item);
        }, payload.list);
        return __assign({}, state, { orgList: orgList });
    },
    _a[cart_1.RESET_CART_ITEM_QUANTITY] = function (state, action) {
        var list = state.list;
        return __assign({}, state, { list: __assign({}, list) });
    },
    _a[cart_1.GET_CART_COUNT] = function (state, action) {
        var payload = action.payload;
        var num = 0;
        if (ramda_1.is(Number, payload) && payload > 0) {
            num = payload;
        }
        return __assign({}, state, { num: num });
    },
    _a[cart_1.REMOVE_CART_ITEM] = function (state, action) {
        var _a = action.payload, res = _a.res, cartId = _a.cartId, cartIds = _a.cartIds;
        var list = state.list;
        var items = list;
        if (res === 'Y') {
            if (cartId) {
                var index = ramda_1.findIndex(ramda_1.propEq('id', cartId), list);
                if (index >= 0) {
                    items = ramda_1.remove(index, 1, list);
                }
            }
            else {
                var ids_1 = cartIds.split(',');
                items = list.filter(function (value) {
                    var re = true;
                    ids_1.forEach(function (res) {
                        if (+res === value.id) {
                            re = false;
                            return;
                        }
                    });
                    return re;
                });
            }
        }
        return __assign({}, state, { list: items });
    },
    _a[cart_1.UPDATE_CART_ITEM_COUNT] = function (state, action) {
        var _a = action.payload, res = _a.res, cartId = _a.cartId, quantity = _a.quantity;
        var list = state.list;
        var quantityList = list;
        if (res === 'Y') {
            var index = ramda_1.findIndex(ramda_1.propEq('id', cartId), list);
            if (index >= 0) {
                var item = list[index];
                item.quantity = quantity;
                quantityList = ramda_1.update(index, item, list);
            }
        }
        return __assign({}, state, { list: quantityList });
    },
    _a[cart_1.RESET_CART_ITEM_POLICY] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var index = ramda_1.findIndex(ramda_1.propEq('productCode', "" + payload.productCode), list);
        var policyList = list;
        if (index >= 0) {
            var item = list[index];
            delete item.policy;
            policyList = ramda_1.update(index, item, list);
        }
        return __assign({}, state, { list: policyList });
    },
    _a[cart_1.GET_CART_POLICY_ITEM] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var policyList = list;
        if (payload.pricingGroupName) {
            var productId = payload.productId, fixedDiscount = payload.fixedDiscount, policy = payload.policy, pricingGroupName = payload.pricingGroupName, makeUpType = payload.makeUpType;
            var index = ramda_1.findIndex(ramda_1.propEq('productCode', "" + productId), list);
            if (index >= 0) {
                var item = list[index];
                var price = policy.price;
                var discount = getDiscount(fixedDiscount);
                policy.makeUpType = makeUpType;
                item.policy = __assign({}, policy, { fixedDiscount: fixedDiscount,
                    pricingGroupName: pricingGroupName, policyDiscount: discount, policyPrice: (price * discount).toFixed(2), policyTotalPrice: ((price * item.quantity) * discount).toFixed(2) });
                policyList = ramda_1.update(index, item, list);
            }
        }
        return __assign({}, state, { list: policyList });
    },
    _a[cart_1.GET_CART_STOCK_LIST] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var items = ramda_1.map(function (_a) {
            var productId = _a.productId, rest = __rest(_a, ["productId"]);
            var item = ramda_1.find(ramda_1.propEq('productCode', "" + productId), payload) || {};
            return __assign({}, rest, item, { productId: productId });
        }, list);
        return __assign({}, state, { list: items });
    },
    //获取 DMS库存
    _a[cart_1.GET_CART_DMS_STOCK_LIST] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var items = ramda_1.map(function (_a) {
            var productId = _a.productId, rest = __rest(_a, ["productId"]);
            var item = ramda_1.find(ramda_1.propEq('productCode', "" + productId), payload) || {};
            return __assign({}, rest, item, { productId: productId });
        }, list);
        return __assign({}, state, { list: items });
    },
    // [GET_CART_PRICE_LIST](state, action) {
    //   const { payload }: any = action;
    //   const { list } = state;
    //   const items = map(({ productId, quantity, ...rest }: any) => {
    //     const item = find(propEq('productCode', `${productId}`), payload) || {};
    //     if (item && item.productCode) {
    //       const { fixedDiscount, price, standardPrice }: any = item;
    //       const discount = getDiscount(fixedDiscount);
    //       item.discount = discount; // 计算出来的折扣
    //       item.discountPrice = (price * discount).toFixed(2); // 计算完的单价
    //       item.totalPrice = ((price * quantity) * discount).toFixed(2); // 当前商品的总价
    //       // 处理购买逻辑: isSell 为 Y 而且standardPrice必须大于 0 才能购买
    //       item.isSell = rest.isSell && standardPrice >= 0;
    //     }
    //     return { quantity, ...rest, ...item, productId };
    //   }, list);
    //   return {
    //     ...state,
    //     list: items,
    //   };
    // },
    _a[cart_1.GET_CART_PRICE_LIST] = function (state, action) {
        var payload = action.payload;
        var list = state.list;
        var items = ramda_1.map(function (_a) {
            var productId = _a.productId, quantity = _a.quantity, rest = __rest(_a, ["productId", "quantity"]);
            var item = ramda_1.find(ramda_1.propEq('productCode', "" + productId), payload) || {};
            if (item && item.productCode) {
                var fixedDiscount = item.fixedDiscount, price = item.price, standardPrice = item.standardPrice, loadVolume = item.loadVolume;
                var discount = getDiscount(fixedDiscount);
                item.discount = discount; // 计算出来的折扣
                item.discountPrice = (price * discount).toFixed(2); // 计算完的单价
                item.totalPrice = ((price * quantity) * discount).toFixed(2); // 当前商品的总价
                // item.loadVolume = loadVolume ? loadVolume.toFixed(2) : '0.00'; // 计算完的体积
                // item.discountLoadVolume = loadVolume ? loadVolume.toFixed(2) : '0.00'; // 计算完的体积
                // item.totalVolume = item.discountLoadVolume ? (item.discountLoadVolume * quantity).toFixed(2) : '0.00'; // 当前商品的体积
                // 处理购买逻辑: isSell 为 Y 而且standardPrice必须大于 0 才能购买
                item.isSell = rest.isSell && standardPrice >= 0;
            }
            return __assign({ quantity: quantity }, rest, item, { productId: productId });
        }, list);
        return __assign({}, state, { list: items });
    },
    _a[cart_1.GET_CART_LIST] = function (state, action) {
        var payload = action.payload;
        var list = [];
        var orgName = '请选择';
        var orgAndGroupId = '';
        var orgAndGroups = [];
        var policies = {};
        if (!ramda_1.isEmpty(payload) && payload.cartDTOs) {
            var orgAndGroupMap = payload.orgAndGroupMap, cartDTOs = payload.cartDTOs, orgAndGroup = payload.orgAndGroup, policyMap = payload.policyMap;
            // 商品列表
            list = ramda_1.map(function (_a) {
                var id = _a.id, productName = _a.productName, agentCisCode = _a.agentCisCode, agentCode = _a.agentCode, agentName = _a.agentName, productId = _a.productId, productLabel = _a.productLabel, fullName = _a.fullName, isSell = _a.isSell, quantity = _a.quantity, color = _a.color, orgId = _a.orgId, orgName = _a.orgName, orgCode = _a.orgCode, materialGroup = _a.materialGroup, materialGroupId = _a.materialGroupId, materialGroupName = _a.materialGroupName, picture = _a.picture, purchaseType = _a.purchaseType, loadVolume = _a.loadVolume, shareFlag = _a.shareFlag, agentShareFlag = _a.agentShareFlag;
                return ({
                    id: id,
                    productId: productId,
                    productLabel: productLabel,
                    name: productName,
                    quantity: quantity,
                    fullName: fullName,
                    color: color,
                    orgId: orgId,
                    orgName: orgName,
                    orgCode: orgCode,
                    agentCisCode: agentCisCode,
                    agentCode: agentCode,
                    agentName: agentName,
                    purchaseType: purchaseType,
                    shareFlag: shareFlag,
                    agentShareFlag: agentShareFlag,
                    materialGroupId: materialGroupId,
                    materialGroupName: materialGroupName,
                    isSell: isSell === 'Y',
                    img: index_1.formatImg(picture ? {
                        format: '180-180',
                        name: picture,
                        materialId: materialGroup,
                        itemId: productId,
                    } : {
                        name: materialGroup + ".jpg",
                    }),
                    errImg: index_1.formatImg({
                        name: materialGroup + ".jpg",
                    }),
                    loadVolume: loadVolume ? loadVolume.toFixed(3) : '0.000'
                });
            }, cartDTOs);
            // 供应商列表
            if (!ramda_1.isEmpty(orgAndGroupMap)) {
                orgName = orgAndGroupMap[orgAndGroup] || '请选择';
                orgAndGroupId = orgAndGroup;
                ramda_1.forEachObjIndexed(function (value, key) {
                    orgAndGroups.push({ key: key, value: value });
                }, orgAndGroupMap);
            }
            // 政策列表
            ramda_1.forEachObjIndexed(function (value, key) {
                // 如果当前选的这个
                policies[key] = ramda_1.map(function (_a) {
                    var id = _a.id, versionCode = _a.versionCode, policyName = _a.policyName, standardPrice = _a.standardPrice, price = _a.price, discount = _a.discount, reduce = _a.reduce, total = _a.total, remain = _a.remain, canQuantity = _a.canQuantity;
                    return ({
                        id: id, versionCode: versionCode, policyName: policyName, standardPrice: standardPrice, price: price, discount: discount, reduce: reduce, total: total, remain: remain, canQuantity: canQuantity,
                    });
                }, value);
            }, policyMap);
        }
        return __assign({}, state, { list: list,
            orgName: orgName,
            orgAndGroups: orgAndGroups,
            orgAndGroupId: orgAndGroupId,
            policies: policies });
    },
    _a), {
    num: 0,
    list: [],
    totalPrice: 0,
    orgAndGroupId: '',
    orgAndGroups: [],
    policies: {},
    orgName: '请选择',
    orgList: [],
});
