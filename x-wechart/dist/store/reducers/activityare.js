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
var activityare_1 = require('./../types/activityare.js');
var index_1 = require('./../../utils/index.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
exports.default = redux_actions_1.handleActions((_a = {},
    // 获取活动状态
    _a[activityare_1.GET_ACTIVITY_STATUS] = function (state, action) {
        var ActivityList = state.ActivityList;
        var payload = action.payload;
        ActivityList.forEach(function (element) {
            element.productDtoList.forEach(function (res) {
                if (payload && payload.list && payload.list.length > 0) {
                    payload.list.forEach(function (item) {
                        item.progress = (ramda_1.divide(parseInt(item.purchaseQty), parseInt(item.qty)) * 100).toFixed(2);
                        if (item.progress < 10 && item.progress > 0) {
                            item.unprogress = 10;
                        }
                        else if (item.progress > 10 || item.progress == 10) {
                            item.unprogress = item.progress;
                        }
                        else {
                            item.unprogress = 0.00;
                        }
                        var nowMaxnumber = 0;
                        var remainingQuantity = parseInt(item.qty) - parseInt(item.purchaseQty);
                        var merchantLimitPurchaseStake = parseInt(item.purchaseLimitQty) - parseInt(item.custPurchaseQty);
                        if (remainingQuantity < merchantLimitPurchaseStake) {
                            nowMaxnumber = remainingQuantity;
                        }
                        else {
                            nowMaxnumber = merchantLimitPurchaseStake;
                        }
                        item.nowMaxnumber = nowMaxnumber;
                        if (item.id == res.id) {
                            res.activityStatus = item;
                        }
                    });
                }
            });
            // 套购、组合购产品组根据'packageCode'字段分组
            var groups = {};
            if (element.discountTypeId == '90603' || element.discountTypeId == '90604' || element.discountTypeId == '90605') {
                element.productDtoList.forEach(function (res) {
                    var value = res['packageCode'];
                    groups[value] = groups[value] || [];
                    groups[value].push(res);
                });
            }
            element.setPurchaseNumber = Object.keys(groups);
            if (element.discountTypeId == '90605') {
                element.setPurchaseNumber.forEach(function (item) {
                    //组合购将数组里'productGroup'属性相同的对象合并成一个数组
                    groups[item] = index_1.combineObjIntoAnArray(groups[item]);
                });
            }
            element.setPurchaseList = groups;
        });
        return __assign({}, state, { ActivityList: ActivityList.slice() });
    },
    _a[activityare_1.RESET_ACTIVITY_IMG] = function (state, action) {
        var ActivityList = state.ActivityList;
        var payload = action.payload;
        ActivityList.forEach(function (element) {
            element.productDtoList.forEach(function (res) {
                if (payload) {
                    var flag = payload.flag, src = payload.src;
                    if (res.id == flag) {
                        res.img = src;
                    }
                }
            });
        });
        return __assign({}, state, { ActivityList: ActivityList.slice() });
    },
    _a[activityare_1.RESET_ACTIVITY_LIST] = function (state, action) {
        return __assign({}, state, { listId: [], ActivityList: [] });
    },
    _a[activityare_1.GET_ACTIVITY_LIST] = function (state, action) {
        var payload = action.payload;
        var ActivityList = state.ActivityList;
        var timestamp = Date.parse(new Date());
        var list = payload.list, totalPages = payload.totalPages;
        var listId = [];
        list.forEach(function (element) {
            var isShow = false;
            var time;
            var timestatus = 1; // 1 未开始 2 进行中 3 已结束
            if (element.productDtoList.length > 3) {
                isShow = true;
            }
            element.isShow = isShow;
            element.number = element.productDtoList.length;
            element.productDtoList.forEach(function (res) {
                if (res.img) {
                    res.img = index_1.MarketFormatImg({ img: res.img });
                }
                if (res.defaultImg) {
                    res.errImg = index_1.MarketFormatImg({ defaultImg: res.defaultImg });
                }
                listId.push(res.id);
            });
            // 套购、组合购产品组根据'packageCode'字段分组
            var groups = {};
            if (element.discountTypeId == '90603' || element.discountTypeId == '90604' || element.discountTypeId == '90605') {
                element.productDtoList.forEach(function (res) {
                    var value = res['packageCode'];
                    groups[value] = groups[value] || [];
                    groups[value].push(res);
                });
            }
            element.setPurchaseNumber = Object.keys(groups);
            if (element.discountTypeId == '90605') {
                element.setPurchaseNumber.forEach(function (item) {
                    //组合购将数组里'productGroup'属性相同的对象合并成一个数组
                    groups[item] = index_1.combineObjIntoAnArray(groups[item]);
                });
            }
            element.setPurchaseList = groups;
            // 时间判断逻辑
            time = timestamp - element.startDate;
            if (time > 0) {
                time = element.endDate - timestamp;
                timestatus = 2;
                if (time < 0) {
                    var startDate = index_1.formatDate(element.startDate, "Y.M.D");
                    var endDate = index_1.formatDate(element.endDate, "Y.M.D");
                    time = startDate + '-' + endDate;
                    timestatus = 3;
                }
            }
            else if (time < 0) {
                time = element.startDate - timestamp;
            }
            var timeData = {
                days: '',
                hours: '',
                minutes: '',
                seconds: ''
            };
            element.time = time;
            element.timestatus = timestatus;
            element.timeData = timeData;
        });
        var NewList;
        if (ActivityList && ActivityList.length > 0) {
            NewList = ramda_1.concat(ActivityList, list);
        }
        else {
            NewList = list;
        }
        return __assign({}, state, { ActivityList: NewList, listId: listId.join(','), totalPages: totalPages });
    },
    _a[activityare_1.PAGING_ACTIVITY_RESULT] = function (state, action) {
        var payload = action.payload;
        var totalRows = payload.totalRows, list = payload.list, currentPage = payload.currentPage;
        (list || []).forEach(function (item) {
            item.actPro.img = index_1.MarketFormatImg({ img: item.actPro.img, defaultImg: item.actPro.defaultImg });
            item.actPro.defaultImg = index_1.MarketFormatImg({ img: '', defaultImg: item.actPro.defaultImg });
            if (item.slaveList) {
                (item.slaveList).forEach(function (ListItem) {
                    ListItem.actPro.img = index_1.MarketFormatImg({ img: ListItem.actPro.img, defaultImg: ListItem.actPro.defaultImg });
                    ListItem.actPro.defaultImg = index_1.MarketFormatImg({ img: '', defaultImg: ListItem.actPro.defaultImg });
                });
            }
        });
        list.forEach(function (it, idx) {
            var date = new Date(it.transferExpireDateDesc).getTime();
            var now = new Date().getTime();
            // 已转单和部分转单状态下不显示已过期标志
            if (date <= now && (it.transFlag != '1' && it.transFlag != '11')) {
                it.disabledSubmit = true;
            }
            else {
                it.disabledSubmit = false;
            }
            // 是否过期标志
            it.isExpired = false;
            if (date <= now) {
                it.isExpired = true;
            }
            if (it.discountTypeName == '组合购') {
                it.slaveList = index_1.combineObjIntoAnArrayTwo(it.slaveList);
                var _a = index_1.combinationPurchaseNumberSets(it.slaveList), setsNumber = _a.setsNumber, orderNumber = _a.orderNumber;
                it.setsNumber = setsNumber; // 组合购认购套数
                it.orderNumber = orderNumber; // 组合购下单套数
            }
        });
        if (currentPage === 1) {
            return __assign({}, state, { pagingActivityResult: {
                    total: totalRows,
                    list: list || []
                } });
        }
        else {
            var pagingActivityResult = state.pagingActivityResult;
            var result = pagingActivityResult.list.concat(list || []);
            return __assign({}, state, { pagingActivityResult: {
                    total: totalRows,
                    list: result,
                } });
        }
    },
    // 重置营销活动列表
    _a[activityare_1.RESET_MARKETING_ACTIVITY_LIST] = function (state, action) {
        return __assign({}, state, { marketingActivityList: [] });
    },
    // 获取营销活动列表
    _a[activityare_1.GET_MARKETING_ACTIVITY_LIST] = function (state, action) {
        var payload = action.payload;
        var marketingActivityList = state.marketingActivityList;
        var _a = payload.data, content = _a.content, totalPage = _a.totalPage;
        var list = content;
        list.forEach(function (element, index) {
            element.productDtoList.forEach(function (res) {
                if (res.img) {
                    res.img = index_1.MarketFormatImg({ img: res.img });
                }
                if (res.defaultImg) {
                    res.errImg = index_1.MarketFormatImg({ defaultImg: res.defaultImg });
                }
            });
            // 套购、组合购产品组根据'packageCode'字段分组
            var groups = {};
            if (element.discountTypeId == '90603' || element.discountTypeId == '90604' || element.discountTypeId == '90605') {
                element.productDtoList.forEach(function (res) {
                    var value = res['packageCode'];
                    groups[value] = groups[value] || [];
                    groups[value].push(res);
                });
            }
            element.setPurchaseNumber = Object.keys(groups);
            if (element.discountTypeId == '90605') {
                element.setPurchaseNumber.forEach(function (item) {
                    //组合购将数组里'productGroup'属性相同的对象合并成一个数组
                    groups[item] = index_1.combineObjIntoAnArray(groups[item]);
                });
            }
            element.setPurchaseList = groups;
        });
        var NewList;
        if (marketingActivityList && marketingActivityList.length > 0) {
            NewList = ramda_1.concat(marketingActivityList, list);
        }
        else {
            NewList = list;
        }
        return __assign({}, state, { marketingActivityList: NewList, marketingActivityTotalPages: totalPage });
    },
    // 获取营销活动筛选条件列表
    _a[activityare_1.GET_MARKETING_ACTIVITY_FILTER] = function (state, action) {
        var payload = action.payload;
        var orderfilter = {
            methods: [],
        };
        var all = {
            value: '全部',
            key: '',
            stock: false
        };
        orderfilter.methods.push(all);
        payload.forEach(function (item) {
            orderfilter.methods.push({
                value: item.name,
                key: item.code,
                stock: false
            });
        });
        return __assign({}, state, { loading: false, marketingActivityFilter: orderfilter });
    },
    // 获取营销活动详情
    _a[activityare_1.GET_MARKETING_ACTIVITY_DETAIL] = function (state, action) {
        var payload = action.payload;
        var marketingActivityDistributorList = [];
        if (payload.custDtoList && payload.custDtoList.length) {
            marketingActivityDistributorList = payload.custDtoList;
        }
        return __assign({}, state, { marketingActivityDetail: payload, marketingActivityDistributorList: marketingActivityDistributorList });
    },
    // 获取当前代理商下的所有分销商（已废弃  用详情了的分销商字段）
    _a[activityare_1.GET_MARKETING_ACTIVITY_DISTRIBUTOR] = function (state, action) {
        var payload = action.payload;
        return __assign({}, state, { marketingActivityDistributorList: payload });
    },
    _a), {
    ActivityList: [],
    totalPages: '',
    listId: [],
    pagingActivityResult: {
        total: 0,
        list: []
    },
    marketingActivityList: [],
    marketingActivityFilter: [],
    marketingActivityTotalPages: '',
    marketingActivityDetail: {},
    marketingActivityDistributorList: []
});
