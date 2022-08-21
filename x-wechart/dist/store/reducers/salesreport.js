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
var index_1 = require('./../../utils/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var salesreport_1 = require('./../types/salesreport.js');
exports.default = redux_actions_1.handleActions((_a = {},
    _a[salesreport_1.GET_SALES_RANK_DISTRIBUTOR_REPORT] = function (state, action) {
        var payload = action.payload;
        var report = payload.report;
        var itemReport = ramda_1.clone(report);
        if (itemReport.length < 10) {
            for (var i = itemReport.length; i < 5; i++) {
                var item = {
                    dealerName: '',
                    rank: '',
                    salesAmount: '',
                    salesQty: ''
                };
                itemReport.push(item);
            }
        }
        itemReport = ramda_1.reverse(itemReport);
        var ranging = (ramda_1.mapObjIndexed(function (_value, key, _obj) { return "\u7B2C" + (parseInt(key) + 1) + "\u540D"; }, itemReport));
        var amount = ramda_1.map(function (res) { return ramda_1.divide(res.salesAmount, 10000).toFixed(2); }, itemReport);
        var qty = ramda_1.map(function (res) { return res.salesQty; }, itemReport);
        var TopFxs = {
            ranging: ranging,
            amount: amount,
            qty: qty,
            _data: new Date().getTime()
        };
        return __assign({}, state, { rankDistributor: report, TopFxs: TopFxs });
    },
    _a[salesreport_1.GET_SALES_RANK_STORE_REPORT] = function (state, action) {
        var payload = action.payload;
        var report = payload.report;
        var itemReport = ramda_1.clone(report);
        if (itemReport.length < 10) {
            for (var i = itemReport.length; i < 5; i++) {
                var item = {
                    storeName: '',
                    rank: '',
                    salesAmount: '',
                    salesQty: ''
                };
                itemReport.push(item);
            }
        }
        itemReport = ramda_1.reverse(itemReport);
        var ranging = (ramda_1.mapObjIndexed(function (_value, key, _obj) { return ("\u7B2C" + (parseInt(key) + 1) + "\u540D").toString(); }, itemReport));
        var amount = ramda_1.map(function (res) { return ramda_1.divide(res.salesAmount, 10000).toFixed(2); }, itemReport);
        var qty = ramda_1.map(function (res) { return res.salesQty; }, itemReport);
        var TopMd = {
            ranging: ranging,
            amount: amount,
            qty: qty,
            _data: new Date().getTime()
        };
        return __assign({}, state, { rankStore: report, TopMd: TopMd });
    },
    _a[salesreport_1.GET_SALES_CURR_MONTH_REPORT] = function (state, action) {
        var payload = action.payload;
        var report = payload.report;
        var date = ramda_1.reverse(ramda_1.map(function (res) { return index_1.formatDate(res.date, 'M.D'); }, report));
        var totalAmount = ramda_1.reverse(ramda_1.map(function (res) { return ramda_1.divide(res.totalAmount, 10000).toFixed(2); }, report));
        var normalAmount = ramda_1.reverse(ramda_1.map(function (res) { return ramda_1.divide(res.normalAmount, 10000).toFixed(2); }, report));
        var retailAmount = ramda_1.reverse(ramda_1.map(function (res) { return ramda_1.divide(res.retailAmount, 10000).toFixed(2); }, report));
        var totalQty = ramda_1.reverse(ramda_1.map(function (res) { return res.totalQty; }, report));
        var normalQty = ramda_1.reverse(ramda_1.map(function (res) { return res.normalQty; }, report));
        var retailQty = ramda_1.reverse(ramda_1.map(function (res) { return res.retailQty; }, report));
        var firstFigure = {
            date: date,
            totalAmount: totalAmount,
            normalAmount: normalAmount,
            retailAmount: retailAmount,
            _data: new Date().getTime()
        };
        var secondFigure = {
            date: date,
            totalQty: totalQty,
            normalQty: normalQty,
            retailQty: retailQty,
            _data: new Date().getTime()
        };
        return __assign({}, state, { firstFigure: firstFigure,
            secondFigure: secondFigure });
    },
    _a[salesreport_1.GET_BASE_DATA_REPORT] = function (state, action) {
        var payload = action.payload;
        var type = payload.type;
        switch (type) {
            case 'wlz':
                var ItemgroupList_1 = [];
                var data = payload.data;
                var all = {
                    value: '全部',
                    key: '',
                    isSelect: false,
                };
                ItemgroupList_1.push(all);
                ramda_1.forEachObjIndexed(function (value) {
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
            case 'gys':
                var SuppliersList_1 = [];
                var data = payload.data;
                ramda_1.forEachObjIndexed(function (value) {
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
                var all = {
                    value: '全部供应商',
                    key: ''
                };
                SuppliersList_1.unshift(all);
                return __assign({}, state, { SuppliersList: SuppliersList_1 });
            default:
                return __assign({}, state);
        }
    },
    _a[salesreport_1.GET_MATERIAL_GROUP_REPORT] = function (state, action) {
        var payload = action.payload;
        var materialGroup = payload.materialGroup;
        var itemGroup = [];
        ramda_1.forEachObjIndexed(function (value, key) {
            var item = {
                value: value,
                key: key
            };
            itemGroup.push(item);
        }, materialGroup);
        var all = {
            value: '全部物料组',
            key: ''
        };
        itemGroup.unshift(all);
        return __assign({}, state, { itemGroup: itemGroup });
    },
    _a[salesreport_1.GET_SALES_STATS_REPORT] = function (state, action) {
        var payload = action.payload;
        var report = payload.report;
        return __assign({}, state, { salesReport: report });
    },
    _a[salesreport_1.GET_SALES_CATEGORY_REPORT] = function (state, action) {
        var payload = action.payload;
        var report = payload.report;
        var series = [];
        ramda_1.forEach(function (res) {
            var item = {
                name: res.categoryName,
                data: res.amount.toString().indexOf('-') !== -1 ? '0' : res.amount,
                color: res.color,
                scale: res.scale,
                stroke: false,
            };
            series.push(item);
        }, report);
        var inventoryReport = {
            series: series
        };
        return __assign({}, state, { inventoryReport: inventoryReport });
    },
    _a), {
    inventoryReport: [],
    SuppliersList: {},
    ItemgroupList: {},
    itemGroup: {},
    salesReport: {},
    firstFigure: [],
    secondFigure: [],
    rankDistributor: {},
    rankStore: {},
    TopFxs: {},
    TopMd: {}
});
