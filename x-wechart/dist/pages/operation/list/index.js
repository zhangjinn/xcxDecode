"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var index_1 = require('./../../../utils/index.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var order_1 = require('./../../../store/actions/order.js');
var index_2 = require('./../../components/side-filter/index.js');
var index_3 = require('./../../../components/empty-data-type/index.js');
var index_4 = require('./../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '用户运营',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-loading': '../../../components/vant/loading/index',
                'calendar': '../../../components/calendar/index',
                'van-field': '../../../components/vant/field/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "sideFilter": { "xmlns:v-bind": "", "v-bind:drawerTopHeight.once": "drawerTopHeight", "v-bind:sideFilterForm.sync": "sideFilterForm", "xmlns:v-on": "" }, "emptyDataType": {}, "headerTab": { "class": "header-tab-box", "v-bind:tabList.sync": "headerTabList", "v-bind:showRightBtnLine.sync": "showRightBtnLine" } };
        _this.$events = { "sideFilter": { "v-on:handleConfirm": "handleConfirm" }, "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            sideFilter: index_2.default,
            emptyDataType: index_3.default,
            headerTab: index_4.default,
        };
        _this.data = {
            drawerTopHeight: '96',
            visible: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    username: '',
                    phoneNum: '',
                    community: '',
                    userTag: '',
                    store: '',
                    follower: '',
                    category: '',
                    interval: '',
                    userType: '',
                    startDate: '',
                    endDate: '',
                    dateInterval: '',
                    sort: 't.sort' // 综合排序 -- 默认跟踪优先级
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    totalPage: 0,
                },
            },
            activityList: [],
            typeOptions: [],
            sortOptions: [
                { id: 't.sort', value: '跟踪优先级' },
                { id: 't.id desc', value: '录入时间倒序' },
            ],
            dateOptions: [
                { id: '', value: '全部时间' },
                { id: 'lastWeek', value: '最近一周' },
                { id: 'lastMonth', value: '最近一个月' },
                { id: 'lastThreeMonths', value: '最近三个月' },
                { id: 'lastHalfYear', value: '最近半年' },
            ],
            sideFilterForm: [
                {
                    key: 'username',
                    label: '用户姓名',
                    value: '',
                    placeholder: '请输入用户姓名',
                    type: 'field'
                },
                {
                    key: 'phoneNum',
                    label: '用户手机号',
                    value: '',
                    placeholder: '请输入用户手机号',
                    type: 'field'
                },
                {
                    key: 'community',
                    label: '所在小区',
                    value: '',
                    placeholder: '请输入所在小区',
                    type: 'field'
                },
                {
                    key: 'userTag',
                    label: '用户标签',
                    value: '',
                    name: '',
                    placeholder: '请选择用户标签',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'store',
                    label: '所属门店',
                    value: '',
                    name: '',
                    placeholder: '请选择所属门店',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'follower',
                    label: '跟进人',
                    value: '',
                    placeholder: '请输入跟进人',
                    type: 'field'
                },
                {
                    key: 'category',
                    label: '购买/意向品类',
                    value: '',
                    name: '',
                    placeholder: '请选择购买/意向品类',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'interval',
                    label: '购买力区间',
                    value: '',
                    name: '',
                    placeholder: '请选择购买力区间',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'userType',
                    label: '用户类型',
                    value: '',
                    name: '',
                    placeholder: '请选择用户类型',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'activityTime',
                    label: '录入时间',
                    startDate: '',
                    endDate: '',
                    placeholderStart: '请选择开始时间',
                    placeholderEnd: '请选择结束时间',
                    type: 'date',
                },
                {
                    key: 'dateInterval',
                    label: '快速筛选日期区间',
                    value: '',
                    name: '',
                    type: 'quickDate',
                },
            ],
            showRightBtnLine: false,
            headerTabList: [
                { name: '跟踪优先级', type: 'status', selectValue: '' },
                { name: '用户类型', type: 'type', selectValue: '' },
            ],
            imgObj: {
                'opeBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719489_9dc7d354266c43418f0a4e6b2dcb65e7.png',
                'girl': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_7a0b141e99a7428f926d6ab72dd9a6be.png',
                'boy': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_cb1353c22eea4c82b55614da60c6e5cf.png',
                'v1': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_5d96d88d4e7546c5bfcb264619138a6f.png',
                'v2': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719546_480a61ece00549dbabd496ba420774c4.png',
                'v3': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_03c839f9027748129c5bb8e6d4b00fd1.png',
                'v4': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_c56053fcc0cd4b7aa8eb2c887cbdd916.png',
                'v5': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719550_673d9f0af4b54c0db7198cc3e64da0b0.png',
                'texting': 'http://3s-static.hisense.com/wechat/1/14722429883/1657096257276_309df05e81b8495995b501ffbc38d6cd.png',
                'callUp': 'http://3s-static.hisense.com/wechat/1/14722429883/1657096257246_ab632670c45342f193f6f67eee4f823a.png',
            },
            userStatistics: {
                conversionNum: 0,
                potentialUserNum: 0,
                transactionUserNum: 0,
                userNum: 0 // 用户数量
            }
        };
        _this.watch = {
            filterForm: function (newVal, oldVal) {
                if (newVal.terms.dateInterval !== oldVal.terms.dateInterval) {
                    this.getShopPotentialCustNumInfo();
                }
            }
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转到详情
            viewDetail: function (e) {
                var item = e.currentTarget.dataset.item;
                var url = "/pages/operation/detail/index?id=" + item.id;
                wx.navigateTo({
                    url: url
                });
            },
            // 新增意向用户
            goAddIntendedUsers: function () {
                wx.navigateTo({
                    url: "/pages/operation/intended-users-order/index"
                });
            },
            openDatePop: function () {
                this.OrderSFilterVisible = true;
                this.CurrentOrderSFilterName = 'date';
            },
            // 切换顶部快捷筛选
            touchOrderSFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (!_this.OrderSFilterVisible) {
                    _this.OrderSFilterVisible = true;
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                if (!name) {
                    _this.OrderSFilterVisible = false;
                    _this.CurrentOrderSFilterName = '';
                    return;
                }
                if (_this.CurrentOrderSFilterName === name) {
                    _this.OrderSFilterVisible = false;
                    _this.CurrentOrderSFilterName = '';
                    return;
                }
                if (['type', 'status'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 顶部状态快捷筛选
            onSelectStatus: function (e) {
                var _a = e.currentTarget.dataset, name = _a.name, id = _a.id, value = _a.value;
                this.filterForm.terms[name] = id;
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                if (name === 'sort') {
                    this.headerTabList[0].name = value;
                }
                if (name === 'userType') { // 用户类型-》同侧边筛选条件联动
                    this.headerTabList[1].name = value || '用户类型';
                    this.sideFilterForm = this.sideFilterForm.map(function (item) {
                        if (item.key === 'userType') {
                            item.value = id;
                            item.name = value;
                        }
                        return item;
                    });
                }
                if (name === 'dateInterval') { // 快速筛选时间-》同侧边筛选条件联动
                    this.sideFilterForm = this.sideFilterForm.map(function (item) {
                        if (item.key === 'dateInterval') {
                            item.value = id;
                            item.name = value;
                        }
                        return item;
                    });
                }
                this.myGetOrderList();
                this.methods.touchOrderSFilter();
                this.methods.scrollToTop();
                this.$apply();
            },
            // 点击普通筛选按钮-显示或隐藏左侧筛选框
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 回到顶部
            scrollToTop: function () {
                _this.scrollTop = 0;
            },
            // 滚动列表
            onScroll: function (event) {
                if (_this.scrollTop === 0) {
                    _this.scrollTop = event.detail.scrollTop;
                }
            },
            // 列表分页
            onGetOrderListNext: function () {
                var totalPage = this.filterForm.page.totalPage;
                if (totalPage > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
            // 侧边筛选确定
            handleConfirm: function (e) {
                var _this = this;
                var filterForm = e.sideFilterForm;
                if (filterForm) {
                    filterForm.forEach(function (item) {
                        if (item.key === 'activityTime') {
                            _this.filterForm.terms.startDate = item.startDate;
                            _this.filterForm.terms.endDate = item.endDate;
                        }
                        else {
                            _this.filterForm.terms[item.key] = item.value;
                            if (item.key === 'userTag') {
                                _this.filterForm.terms[item.key] = item.name;
                            }
                            if (item.key === 'userType') {
                                _this.headerTabList[1].name = item.value ? item.name : '用户类型';
                            }
                        }
                    });
                }
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
            },
            // 打电话
            call: function (event) {
                var item = event.currentTarget.dataset.item;
                if (item && item.phone) {
                    wx.makePhoneCall({
                        phoneNumber: item.phone
                    });
                }
            }
        };
        return _this;
    }
    // 获取筛选列表并给对应值赋值
    Filter.prototype.optionsConversion = function (list, key) {
        var _this = this;
        if (list) {
            list = list.map(function (item) {
                return __assign({}, item, { id: item.code, value: item.name });
            });
            this.sideFilterForm = this.sideFilterForm.map(function (item) {
                if (item.key === key) {
                    item.options = list;
                    if (key === 'userType') {
                        _this.typeOptions = list;
                    }
                }
                return item;
            });
        }
        this.$apply();
    };
    // 获取筛选列表
    Filter.prototype.filterInfo = function () {
        var _this = this;
        var customer = JSON.parse(wx.getStorageSync('b2b_token')).customer;
        // 获取标签列表
        this.methods.findLabelList({
            custInfoId: customer && customer.id // 	商家id
        }).then(function (res) {
            var data = res.payload.data;
            data = data.map(function (item) {
                return __assign({}, item, { code: item.id, name: item.label });
            });
            _this.optionsConversion(data, 'userTag');
            _this.$apply();
        });
        // 获取所属门店
        this.methods.getShopInfoPrototype().then(function (res) {
            var list = res.payload.list;
            _this.optionsConversion(list, 'store');
            _this.$apply();
        });
        // 获取意向品类选择列表
        this.methods.getPotentialSpart().then(function (res) {
            var list = res.payload.list;
            _this.optionsConversion(list, 'category');
            _this.$apply();
        });
        // 获取购买预算选择列表
        this.methods.commDict({
            pid: '14927471376'
        }).then(function (res) {
            var list = res.payload.list;
            _this.optionsConversion(list, 'interval');
            _this.$apply();
        });
        // 获取用户类型
        this.methods.commDict({
            pid: '14927471377'
        }).then(function (res) {
            var list = res.payload.list;
            _this.optionsConversion(list, 'userType');
            _this.$apply();
        });
    };
    // 顶部商家潜在客户数量
    Filter.prototype.getShopPotentialCustNumInfo = function () {
        var _this = this;
        var terms = this.filterForm.terms;
        var date = '';
        if (terms.dateInterval) {
            var interval = index_1.quickDateInterval(terms.dateInterval);
            var startDate = interval.start;
            var endDate = interval.end;
            date = startDate + '_' + endDate;
        }
        this.methods.getShopPotentialCustNum({
            inCreatedDate: date,
        }).then(function (res) {
            var _a = res.payload, list = _a.list, code = _a.code;
            if (code == 0) {
                _this.userStatistics = list[0];
            }
            _this.$apply();
        });
    };
    Filter.prototype.myGetOrderList = function () {
        var _this = this;
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var date = '';
        if (terms.dateInterval) {
            var interval = index_1.quickDateInterval(terms.dateInterval);
            var startDate = interval.start;
            var endDate = interval.end;
            date = startDate + '_' + endDate;
        }
        else {
            if (terms.startDate && terms.endDate) {
                date = terms.startDate + '_' + terms.endDate;
            }
            else if (terms.startDate && !terms.endDate) {
                date = terms.startDate + '_';
            }
            else if (!terms.startDate && terms.endDate) {
                date = '_' + terms.endDate;
            }
        }
        var data = {
            orderBy: terms.sort,
            userName: terms.username,
            phone: terms.phoneNum,
            community: terms.community,
            label: terms.userTag,
            shopInfoId: terms.store,
            followPeople: terms.follower,
            spartId: terms.category,
            buyPowerId: terms.interval,
            userTypeId: terms.userType,
            inCreatedDate: date,
            pageNo: page.pageNo,
            pageSize: page.pageSize,
        };
        this.methods.getShopPotentialUser(__assign({ _loading: true }, data)).then(function (res) {
            var _a = res.payload, code = _a.code, list = _a.list, totalPages = _a.totalPages, currentPage = _a.currentPage;
            if (code == 0) {
                _this.filterForm.page.totalPage = totalPages;
                var activityList = list || [];
                activityList = activityList.map(function (item) {
                    if (item.phone) {
                        var reg = /(\d{3})\d{4}(\d{4})/;
                        item.phoneZH = item.phone.replace(reg, "$1****$2");
                    }
                    return item;
                });
                if (currentPage > 1) {
                    _this.activityList = _this.activityList.concat(activityList);
                }
                else {
                    _this.activityList = activityList;
                }
            }
            _this.$apply();
        });
    };
    Filter.prototype.onShow = function () {
        this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
        this.myGetOrderList();
    };
    Filter.prototype.onLoad = function () {
        this.getShopPotentialCustNumInfo();
        this.filterInfo();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            getShopPotentialCustNum: order_1.getShopPotentialCustNum,
            getShopPotentialUser: order_1.getShopPotentialUser,
            findLabelList: order_1.findLabelList,
            getShopInfoPrototype: dmsorder_1.getShopInfoPrototype,
            commDict: order_1.commDict,
            getPotentialSpart: order_1.getPotentialSpart,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/operation/list/index'));

