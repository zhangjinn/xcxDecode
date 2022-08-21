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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var activityare_1 = require('./../../../../store/actions/activityare.js');
var index_1 = require('./../../../components/side-filter/index.js');
var index_2 = require('./../../../components/header-filter/index.js');
var index_3 = require('./../../../../components/empty-data-type/index.js');
var index_4 = require('./../../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '市场活动',
            usingComponents: {
                'van-icon': '../../../../components/vant/icon/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-loading': '../../../../components/vant/loading/index',
                'calendar': '../../../../components/calendar/index',
                'van-field': '../../../../components/vant/field/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "sideFilter": { "xmlns:v-bind": "", "v-bind:drawerTopHeight.once": "drawerTopHeight", "v-bind:sideFilterForm.sync": "sideFilterForm", "xmlns:v-on": "" }, "headerFilter": { "v-bind:activeLineStyle.once": "activeLineStyle", "v-bind:tabList.sync": "tabList", "v-bind:tabActive.sync": "tabActive", "v-bind:showSearch.sync": "showSearch" }, "emptyDataType": {}, "headerTab": { "v-bind:tabList.sync": "headerTabList" } };
        _this.$events = { "sideFilter": { "v-on:handleConfirm": "handleConfirm" }, "headerFilter": { "v-on:tabChange": "tabChange" }, "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            sideFilter: index_1.default,
            headerFilter: index_2.default,
            emptyDataType: index_3.default,
            headerTab: index_4.default,
        };
        _this.data = {
            showSearch: false,
            tabList: [
                { name: '代理商市场活动' },
                { name: '专卖店市场活动' },
            ],
            tabActive: '1',
            activeLineStyle: {
                width: '56rpx',
                height: '4rpx'
            },
            drawerTopHeight: '154',
            visible: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    company: '',
                    cisCode: '',
                    fullName: '',
                    specialShopCode: '',
                    specialShopLevel: '',
                    specialShopType: '',
                    firstModifier: '',
                    secondModifier: '',
                    activityTheme: '',
                    activityLabel: '',
                    startDate: '',
                    endDate: '',
                    status: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    totalPage: 0,
                },
            },
            activityList: [],
            statusOptions: [],
            sideFilterForm: [
                {
                    key: 'activityLabel',
                    label: '活动类别',
                    value: '',
                    name: '',
                    placeholder: '请选择活动类别',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'company',
                    label: '分公司',
                    value: '',
                    placeholder: '请输入分公司',
                    type: 'field'
                },
                {
                    key: 'cisCode',
                    label: '门店编码',
                    value: '',
                    placeholder: '请输入门店编码',
                    type: 'field'
                },
                {
                    key: 'fullName',
                    label: '门店名称',
                    value: '',
                    placeholder: '请输入门店名称',
                    type: 'field'
                },
                {
                    key: 'specialShopCode',
                    label: '专卖店编码',
                    value: '',
                    placeholder: '请输入专卖店编码',
                    type: 'field'
                },
                {
                    key: 'specialShopLevel',
                    label: '行政分类',
                    value: '',
                    name: '',
                    placeholder: '请选择行政分类',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'specialShopType',
                    label: '专卖店类别',
                    value: '',
                    name: '',
                    placeholder: '请选择专卖店类别',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'firstModifier',
                    label: '修改人1姓名',
                    value: '',
                    placeholder: '请输入修改人1姓名',
                    type: 'field'
                },
                {
                    key: 'secondModifier',
                    label: '修改人2姓名',
                    value: '',
                    placeholder: '请输入修改人2姓名',
                    type: 'field'
                },
                {
                    key: 'activityTheme',
                    label: '活动主题',
                    value: '',
                    placeholder: '请输入活动主题',
                    type: 'field'
                },
                {
                    key: 'activityTime',
                    label: '时间',
                    startDate: '',
                    endDate: '',
                    placeholderStart: '请选择开始时间',
                    placeholderEnd: '请选择结束时间',
                    type: 'date',
                },
            ],
            headerTabList: [
                { name: '状态', type: 'status', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转至代理商市场活动列表
            tabChange: function () {
                var url = "/pages/activity/agency-activity/list/index";
                wx.redirectTo({
                    url: url
                });
            },
            // 跳转到详情
            viewDetail: function (e) {
                var _a = e.currentTarget.dataset, type = _a.type, id = _a.id, source = _a.source;
                var url = "/pages/activity/specialty-activity/add/index?id=" + id + "&type=" + type + "&dataSource=" + source;
                wx.navigateTo({
                    url: url
                });
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
                var _a = e.currentTarget.dataset, name = _a.name, id = _a.id;
                this.filterForm.terms[name] = id;
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[0].selectValue = id;
                this.myGetOrderList();
                this.methods.touchOrderSFilter();
                this.methods.scrollToTop();
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
            // 筛选确定
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
                        }
                    });
                }
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
            }
        };
        return _this;
    }
    // 获取筛选列表接口
    Filter.prototype.getDictBytype = function (type) {
        var param = {
            categoryName: type
        };
        return this.methods.getSpecialShopDictBytype(param).then(function (res) {
            var categoryList = [];
            if (res.payload && res.payload.data) {
                categoryList = res.payload.data.map(function (item) {
                    return __assign({}, item, { id: item.code, value: item.name });
                });
            }
            return categoryList;
        });
    };
    // 获取筛选条件列表并赋值
    Filter.prototype.getAllDictBytype = function () {
        var _this = this;
        // 活动类别
        this.getDictBytype('specialActivityType').then(function (res) {
            _this.sideFilterForm = _this.sideFilterForm.map(function (item) {
                if (item.key === 'activityLabel') {
                    item.options = res;
                }
                return item;
            });
            _this.$apply();
        });
        // 行政分类
        this.getDictBytype('specialShopLevel').then(function (res) {
            _this.sideFilterForm = _this.sideFilterForm.map(function (item) {
                if (item.key === 'specialShopLevel') {
                    item.options = res;
                }
                return item;
            });
            _this.$apply();
        });
        // 专卖店类别
        this.getDictBytype('specialShopType').then(function (res) {
            _this.sideFilterForm = _this.sideFilterForm.map(function (item) {
                if (item.key === 'specialShopType') {
                    item.options = res;
                }
                return item;
            });
            _this.$apply();
        });
        // 活动状态
        this.getDictBytype('SPECIAL_ACTIVITY_STATUS').then(function (res) {
            _this.statusOptions = res;
            _this.$apply();
        });
    };
    Filter.prototype.myGetOrderList = function () {
        var _this = this;
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var statusName = '';
        if (terms.status && this.statusOptions.length) { // 根据id获取活动状态名称
            var filter = this.statusOptions.find(function (res) {
                return res.id == terms.status;
            });
            statusName = filter.name;
        }
        var data = {
            company: terms.company,
            cisCode: terms.cisCode,
            fullName: terms.fullName,
            specialShopCode: terms.specialShopCode,
            specialShopLevel: terms.specialShopLevel,
            specialShopType: terms.specialShopType,
            firstModifier: terms.firstModifier,
            secondModifier: terms.secondModifier,
            activityTheme: terms.activityTheme,
            activityLabel: terms.activityLabel,
            startTime: terms.startDate,
            endTime: terms.endDate,
            status: statusName,
            pageNo: page.pageNo,
            pageSize: page.pageSize,
        };
        this.methods.getSpecialShopActivityList(__assign({ _loading: true }, data)).then(function (res) {
            var data = res.payload.data;
            _this.filterForm.page = __assign({}, _this.filterForm.page, { totalPage: data.totalPage });
            var activityList = data.content || [];
            if (data.page > 1) {
                _this.activityList = _this.activityList.concat(activityList);
            }
            else {
                _this.activityList = activityList;
            }
            _this.$apply();
        });
    };
    Filter.prototype.onShow = function () {
        this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
        this.myGetOrderList();
    };
    Filter.prototype.onLoad = function () {
        this.getAllDictBytype();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            getSpecialShopActivityList: activityare_1.getSpecialShopActivityList,
            getSpecialShopDictBytype: activityare_1.getSpecialShopDictBytype,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/activity/specialty-activity/list/index'));

