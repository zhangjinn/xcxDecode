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
var purchasereport_1 = require('./../types/purchasereport.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    // 基础库
    _a[purchasereport_1.GET_CHANNEL_WLZ_LIST] = function (state, action) {
        var payload = action.payload;
        var ItemgroupList = [];
        var data = payload.data;
        var all = {
            name: '全部物料组',
            code: '',
        };
        ItemgroupList.push(all);
        ramda_1.forEachObjIndexed(function (value, key) {
            ramda_1.forEachObjIndexed(function (value, key) {
                var item = {
                    name: value,
                    code: key,
                };
                ItemgroupList.push(item);
            }, value);
        }, data);
        return __assign({}, state, { ItemgroupList: ItemgroupList });
    },
    // 渠道采购报表
    _a[purchasereport_1.GET_CHANNEL_REPORT_LIST] = function (state, action) {
        var payload = action.payload;
        var _a = payload.report, currentMonth = _a.currentMonth, previousMonth = _a.previousMonth;
        var newPreviousMonth = ramda_1.reverse(previousMonth);
        var DateStr = newPreviousMonth.map(function (item) { return item.date.slice(2, 4) + '/' + item.date.slice(5, 7); });
        var amount = ramda_1.map(function (res) { return ramda_1.divide(res.amount, 10000).toFixed(2); }, newPreviousMonth);
        var qty = ramda_1.map(function (res) { return res.qty; }, newPreviousMonth);
        var channelData = {
            DateStr: DateStr,
            amount: amount,
            qty: qty,
            _data: new Date().getTime()
        };
        return __assign({}, state, { currentMonth: currentMonth,
            channelData: channelData });
    },
    _a[purchasereport_1.GET_REPORT_SUPPLY_LIST] = function (state, action) {
        var payload = action.payload;
        var orgList = payload.orgList;
        var item = {
            code: '',
            name: '全部供应商',
            desc: null
        };
        orgList.unshift(item);
        return __assign({}, state, { supplierList: orgList });
    },
    _a[purchasereport_1.GET_REPORT_MATERIAL_LIST] = function (state, action) {
        var payload = action.payload;
        var matklList = payload.matklList;
        var item = {
            code: '',
            name: '全部物料组',
            desc: null
        };
        matklList.unshift(item);
        return __assign({}, state, { matklList: matklList });
    },
    // 采购报表
    _a[purchasereport_1.GET_REPORT_CUST_SALES] = function (state, action) {
        var payload = action.payload;
        var nowData = payload.nowData, lastData = payload.lastData, tb = payload.tb, orderRate = payload.orderRate;
        var List = payload.list;
        var arr = List.slice();
        var dates = arr.map(function (obj) { return obj.dateStr; });
        var DateStr = dates.map(function (item) { return item.slice(2, 4) + '/' + item.slice(4, 6); });
        var amount = ramda_1.map(function (res) { return ramda_1.divide(res.realPrice, 10000).toFixed(4); }, List);
        var num = ramda_1.map(function (res) { return res.realNum; }, List);
        var reportSale = {
            List: List,
            nowData: nowData,
            amount: amount,
            num: num,
            lastData: lastData,
            DateStr: DateStr,
            tb: tb,
            orderRate: orderRate,
            _data: new Date().getTime()
        };
        return __assign({}, state, { reportSale: reportSale });
    },
    // 360体验报表列表
    _a[purchasereport_1.GET_SAN_LIU_LING_EXPERIENCE_LIST] = function (state, action) {
        var payload = action.payload;
        var list = payload.data || {};
        var newList = __assign({}, list, { netIncrease: {}, onlineSalesRate: {}, onlineStoreOutput: {}, salesStructure: {}, machinesProportion: {}, incrementalBusiness: {} });
        if (list.evaluationOfIndividualFunctions) {
            list.evaluationOfIndividualFunctions.forEach(function (item) {
                item.weightNum = parseFloat(item.weight);
                var functionName = item.functionName.replace(/\s*/g, "");
                if (functionName === '分销网络净增') {
                    newList.netIncrease = item;
                }
                if (functionName === '分销网络动销率') {
                    newList.onlineSalesRate = item;
                }
                if (functionName === '分销网络单店产出') {
                    newList.onlineStoreOutput = item;
                }
                if (functionName === '销售结构') {
                    newList.salesStructure = item;
                }
                if (functionName === '专供机占比') {
                    newList.machinesProportion = item;
                }
                if (functionName === '增量业务(前置渠道)') {
                    newList.incrementalBusiness = item;
                }
            });
        }
        return __assign({}, state, { sanLiuLingExperienceList: newList });
    },
    _a), {
    reportSale: {},
    supplierList: {},
    matklList: {},
    ItemgroupList: {},
    currentMonth: {},
    channelData: {},
    sanLiuLingExperienceList: {}
});
