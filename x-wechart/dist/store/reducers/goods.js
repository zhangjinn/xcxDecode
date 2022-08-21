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
var ramda_1 = require('./../../npm/ramda/src/index.js');
var goods_1 = require('./../types/goods.js');
var index_1 = require('./../../utils/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[goods_1.GET_GOODS_PROMOTION] = function (state, action) {
        var payload = action.payload;
        // console.log('****');
        // console.log(payload);
        var promotion = {};
        if (payload.code === 0 && payload.status) {
            var _a = payload.detail, deposit = _a.deposit, activityCode = _a.activityCode, activityId = _a.activityId, activityName = _a.activityName, activityType = _a.activityType, matklId = _a.matklId, standardPrice = _a.standardPrice, billPrice = _a.billPrice, detailStatus = _a.status, purchaseMinLimitQty = _a.purchaseMinLimitQty, status = payload.status;
            /* pause: 是否暂停 Y暂停
            *  总数量: qty
            *  purchaseQty	活动总的已参与数量
            *  purchaseLimitQty	商家限制数量
            *  custPurchaseQty	当前账号参数数量
            */
            var custPurchaseQty = status.custPurchaseQty, endDate = status.endDate, pause = status.pause, purchaseLimitQty = status.purchaseLimitQty, purchaseQty = status.purchaseQty, qty = status.qty, startDate = status.startDate;
            // 购买进度
            var percent = ramda_1.multiply(ramda_1.divide(purchaseQty, qty), 100) || 0;
            // 当前剩余数量
            var nowCount = ramda_1.subtract(qty, purchaseQty);
            // 最多购买数量
            // debugger
            var canBuyCount = ramda_1.min(nowCount, purchaseLimitQty - custPurchaseQty);
            // 活动状态
            var now = index_1.formatDate();
            var currentStatus = index_1.getDateRange(startDate, now, endDate);
            // 倒计时
            var timer = 0;
            // 开抢时间
            var timerStr = '';
            switch (currentStatus) {
                case 'next':
                    timer = +new Date(startDate.replace(/-/g, '/')) - (+new Date());
                    timerStr = index_1.formatDate(startDate, 'M月D日h点m分');
                    break;
                case 'current':
                    timer = +new Date(endDate.replace(/-/g, '/')) - (+new Date());
                    break;
                default:
                    break;
            }
            if (pause === 'Y' && currentStatus !== 'prev') {
                currentStatus = 'pause';
            }
            // 判断是否已经
            // debugger
            promotion = {
                qty: qty,
                timer: timer,
                timerStr: timerStr,
                deposit: deposit,
                currentStatus: currentStatus,
                currentTime: index_1.formatDate(),
                standardPrice: standardPrice,
                billPrice: billPrice,
                activityId: activityId,
                activityCode: activityCode,
                activityName: activityName,
                activityType: activityType,
                matklId: matklId,
                percent: percent,
                nowCount: nowCount,
                canBuyCount: canBuyCount,
                custPurchaseQty: custPurchaseQty,
                purchaseLimitQty: purchaseLimitQty,
                startAt: index_1.formatDate(startDate, 'Y.M.D'),
                endAt: index_1.formatDate(endDate, 'Y.M.D'),
                detailStatus: detailStatus,
                canBuy: payload.canBuy,
                code: payload.code,
                purchaseMinLimitQty: purchaseMinLimitQty,
            };
        }
        return __assign({}, state, { promotion: promotion });
    },
    _a[goods_1.RESET_GOODS_INFO] = function (state) {
        return __assign({}, state, { price: {}, product: {}, attrs: [], infoList: {}, banners: [], policies: [], promotion: {} });
    },
    _a[goods_1.GET_GOODS_INFO] = function (state, action) {
        var payload = action.payload;
        var product = payload.product, filedMap = payload.filedMap, infoList = payload.infoList, pictures = payload.pictures, versionList = payload.versionList;
        var goods = {};
        var banners = [];
        var skus = [];
        var attrs = [];
        if (product && product.id) {
            var materialGroup_1 = product.materialGroup, picture = product.picture;
            // 轮播数据处理
            if (pictures && pictures.length > 0) {
                banners = ramda_1.map(function (_a) {
                    var pictureName = _a.pictureName;
                    return index_1.formatImg({
                        name: pictureName,
                        format: '650-650',
                        itemId: product.id,
                        materialId: materialGroup_1,
                    });
                }, pictures);
            }
            else {
                banners = [index_1.formatImg({ name: product.materialGroup + ".jpg" })];
            }
            // 商品属性上添加如果所有banner图片均不可用，设置成此默认的
            product.errImg = index_1.formatImg({ name: product.materialGroup + ".jpg" });
            // sku 主图处理
            product.attrImg = index_1.formatImg({
                name: picture,
                format: '180-180',
                itemId: product.id,
                materialId: materialGroup_1,
            });
            // 规格参数处理
            if (filedMap && !ramda_1.isEmpty(filedMap)) {
                ramda_1.forEachObjIndexed(function (value, key) {
                    var item = { label: key, child: [] };
                    item.child = ramda_1.map(function (item) {
                        var attrArr = ramda_1.split(' : ', item);
                        var attrKey = ramda_1.trim(ramda_1.head(attrArr));
                        var attrValue = ramda_1.trim(ramda_1.last(attrArr));
                        return { attrKey: attrKey, attrValue: attrValue };
                    }, value);
                    attrs.push(item);
                }, filedMap);
            }
            // sku 列表
            if (infoList && infoList.length > 0) {
                skus = ramda_1.map(function (_a) {
                    var id = _a.id, color = _a.color;
                    return ({
                        id: id,
                        color: color,
                    });
                }, infoList);
            }
            goods = __assign({}, state, { product: product,
                attrs: attrs, infoList: skus, banners: banners, policies: versionList || [] });
        }
        return goods;
    },
    _a[goods_1.GET_GOODS_PRICE] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { price: payload });
    },
    _a[goods_1.GET_GOODS_MODEL] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { goods: payload });
    },
    _a[goods_1.GET_MODEL_GOODS_INFO] = function (state, action) {
        var payload = action.payload;
        var product = payload.product, filedMap = payload.filedMap, infoList = payload.infoList, pictures = payload.pictures, versionList = payload.versionList, modelInfo = payload.modelInfo;
        var goods = {};
        var banners = [];
        var skus = [];
        var attrs = [];
        if (product && product.id) {
            var materialGroup_2 = product.materialGroup, picture = product.picture;
            // 轮播数据处理
            if (pictures && pictures.length > 0) {
                banners = ramda_1.map(function (_a) {
                    var pictureName = _a.pictureName;
                    return index_1.formatImg({
                        name: pictureName,
                        format: '650-650',
                        itemId: product.id,
                        materialId: materialGroup_2,
                    });
                }, pictures);
            }
            else {
                banners = [index_1.formatImg({ name: product.materialGroup + ".jpg" })];
            }
            // 商品属性上添加如果所有banner图片均不可用，设置成此默认的
            product.errImg = index_1.formatImg({ name: product.materialGroup + ".jpg" });
            // sku 主图处理
            product.attrImg = index_1.formatImg({
                name: picture,
                format: '180-180',
                itemId: product.id,
                materialId: materialGroup_2,
            });
            // 规格参数处理
            if (filedMap && !ramda_1.isEmpty(filedMap)) {
                ramda_1.forEachObjIndexed(function (value, key) {
                    var item = { label: key, child: [] };
                    item.child = ramda_1.map(function (item) {
                        var attrArr = ramda_1.split(' : ', item);
                        var attrKey = ramda_1.trim(ramda_1.head(attrArr));
                        var attrValue = ramda_1.trim(ramda_1.last(attrArr));
                        return { attrKey: attrKey, attrValue: attrValue };
                    }, value);
                    attrs.push(item);
                }, filedMap);
            }
            // sku 列表
            if (infoList && infoList.length > 0) {
                skus = ramda_1.map(function (_a) {
                    var id = _a.id, color = _a.color;
                    return ({
                        id: id,
                        color: color,
                    });
                }, infoList);
            }
            goods = __assign({}, state, { product: product,
                attrs: attrs, infoList: skus, banners: banners, policies: versionList || [], modelInfo: modelInfo });
        }
        return goods;
    },
    _a), {
    promotion: {},
    price: {},
    product: {},
    attrs: [],
    infoList: {},
    banners: [],
    policies: [],
    goods: []
});
