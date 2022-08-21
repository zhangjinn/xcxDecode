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
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var request_1 = require('./../../../utils/request.js');
var inventory_1 = require('./../../../store/actions/inventory.js');
var inventory_2 = require('./../../../store/types/inventory.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '未结预留',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-field': '../../../components/vant/field/index',
                'van-loading': '../../../components/vant/loading/index',
                'calendar': '../../../components/calendar/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {}, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
        };
        _this.data = {
            visible: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            calendarShow: false,
            currentDateName: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    startDate: '',
                    endDate: '',
                    orgCode: '',
                    subAccountCode: '',
                    warehouseCode: '',
                    documentNumber: '',
                    materialGroupName: '',
                    model: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                },
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
            orgList: [],
            subAccountList: [],
            warehouseList: [],
            headerTabList: [
                { name: '销售组织', type: 'orderOrg', selectValue: '' },
                { name: '子账号', type: 'orderSubAccount', selectValue: '' },
                { name: '仓库', type: 'orderWarehouse', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
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
                if (['orderOrg', 'orderSubAccount', 'orderWarehouse'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 选择快捷筛选内容列表
            onSelectOrg: function (data, type) {
                wepy_redux_1.getStore().dispatch({ type: inventory_2.RESET_OPEN_RESERVATION, payload: [] });
                var newData = {};
                if (type == 'orderOrg') {
                    newData.orgCode = data;
                    this.headerTabList[0].selectValue = data;
                }
                else if (type == 'orderSubAccount') {
                    newData.subAccountCode = data;
                    this.headerTabList[1].selectValue = data;
                }
                else if (type == 'orderWarehouse') {
                    newData.warehouseCode = data;
                    this.headerTabList[2].selectValue = data;
                }
                this.filterForm.terms = __assign({}, this.filterForm.terms, newData);
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 点击普通筛选按钮-显示或隐藏左侧筛选框
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 筛选确定
            onSubmitFilterForm: function () {
                wepy_redux_1.getStore().dispatch({ type: inventory_2.RESET_OPEN_RESERVATION, payload: [] });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
                this.methods.scrollToTop();
            },
            // 筛选重置
            onResetFilterForm: function () {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { documentNumber: '', materialGroupName: '', model: '', startDate: '', endDate: '' });
            },
            // 打开日历
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm.terms, startDate = _a.startDate, endDate = _a.endDate;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = startDate;
                    end = endDate;
                }
                if (type === 'sapDate') {
                    begin = startDate;
                    end = endDate;
                }
                if (name.indexOf('startDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('ndDate') > -1) {
                    this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                }
                this.calendarShow = true;
            },
            // 关闭日历
            closeCalendar: function () {
                this.calendarShow = false;
            },
            // 清空已选日期
            clearCalendar: function (name) {
                var _a;
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[name] = '', _a));
            },
            // 选择日期
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
            // 改变单据编号
            onDocumentNumberChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { documentNumber: e.detail });
            },
            // 改变物料组名称
            onMaterialGroupNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { materialGroupName: e.detail });
            },
            // 改变型号
            onModelChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { model: e.detail });
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
                var totalPage = this.openReservationTotalPage;
                if (totalPage > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
        };
        return _this;
    }
    Filter.prototype.myGetOrderList = function () {
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var param = {
            page: {
                pageNo: page.pageNo,
                pageSize: page.pageSize,
            },
            terms: {
                startDocumentDate: terms.startDate,
                endDocumentDate: terms.endDate,
                documentNum: terms.documentNumber,
                gicWarehouse: terms.warehouseCode,
                materialGroupName: terms.materialGroupName,
                model: terms.model,
                orgCode: terms.orgCode,
                childDealerCode: terms.subAccountCode,
            }
        };
        this.methods.getOpenReservationList(__assign({ _loading: true }, param));
    };
    Filter.prototype.getFilterCondition = function () {
        var _this = this;
        // 获取子账号
        this.methods.getDistributorType({
            field: "childDealerCode",
            formCode: "notReleaseReserveCondition",
        }).then(function (res) {
            var data = res.payload.data;
            _this.subAccountList = [];
            _this.subAccountList = data.map(function (item) {
                return {
                    id: item.code,
                    name: item.name
                };
            });
        });
        // 获取仓库
        this.methods.getDistributorType({
            field: "gicWarehouse",
            formCode: "notReleaseReserveCondition",
        }).then(function (res) {
            var data = res.payload.data;
            _this.warehouseList = [];
            _this.warehouseList = data.map(function (item) {
                return {
                    id: item.code,
                    name: item.name
                };
            });
        });
        // 获取组织
        request_1.request({
            api: 'comm/queryOrg.nd',
            method: 'GET',
            callback: function (res) {
                var orgList = res.data.orgList;
                if (orgList && orgList.length > 0) {
                    _this.orgList = orgList.map(function (item) {
                        return {
                            id: item.code,
                            name: item.name
                        };
                    });
                    _this.$apply();
                }
            },
        });
    };
    Filter.prototype.onShow = function () {
        this.getFilterCondition();
        wepy_redux_1.getStore().dispatch({ type: inventory_2.RESET_OPEN_RESERVATION, payload: [] });
        this.myGetOrderList();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            openReservationList: function (_a) {
                var inventory = _a.inventory;
                return inventory.openReservationList;
            },
            openReservationTotalPage: function (_a) {
                var inventory = _a.inventory;
                return inventory.openReservationTotalPage;
            },
        }, {
            getOpenReservationList: inventory_1.getOpenReservationList,
            getDistributorType: inventory_1.getDistributorType,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/open-reservation/index'));

