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
var threeProductsReport_1 = require('./../../../store/actions/threeProductsReport.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var threeProductsReport_2 = require('./../../../store/types/threeProductsReport.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '终包采购计划',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-search': '../../../components/vant/search/index',
                'van-tab': '../../../components/vant/tab/index',
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'van-radio': '../../../components/vant/radio/index',
                'van-radio-group': '../../../components/vant/radio-group/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                'van-loading': '../../../components/vant/loading/index',
                'van-stepper': '../../../components/vant/stepper/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-button': '../../../components/vant/button/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
            },
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
                    status: '',
                    sellerName: '',
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
            saleFilterList: [
                { id: '1', value: '已提报' },
                { id: '0', value: '未提报' }
            ],
            headerTabList: [
                { name: '提报状态', type: 'orderStatus', selectValue: '' },
            ],
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {}, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转到详情
            viewDetail: function (id, type) {
                if (id) {
                    var url = "/pages/terminal/threeProductsReportDetail/index?id=" + id + "&type=" + type;
                    wx.navigateTo({
                        url: url
                    });
                }
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
                if (['orderType', 'orderStatus'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 选择快捷筛选内容列表
            onSelectStatus: function (status) {
                wepy_redux_1.getStore().dispatch({ type: threeProductsReport_2.RESET_SALES_ORDER_LIST_NEW, payload: [] });
                this.filterForm.terms = __assign({}, this.filterForm.terms, { status: status });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[0].selectValue = status;
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
                wepy_redux_1.getStore().dispatch({ type: threeProductsReport_2.RESET_SALES_ORDER_LIST_NEW, payload: [] });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
                this.methods.scrollToTop();
            },
            // 筛选重置
            onResetFilterForm: function () {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { sellerName: '', startDate: '', endDate: '' });
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
            // 改变提货人
            onsellerNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { sellerName: e.detail });
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
                var count = this.orderList.count;
                var totalPage = Math.ceil(count / this.filterForm.page.pageSize);
                if (totalPage > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Filter.prototype.myGetOrderList = function () {
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var data = {
            status: terms.status,
            submitDateBegin: terms.startDate,
            endDateEnd: terms.endDate,
            page: page.pageNo,
            rows: page.pageSize,
        };
        this.methods.getSalesOrderListNew(__assign({ _loading: true }, data));
    };
    Filter.prototype.onShow = function () {
        wepy_redux_1.getStore().dispatch({ type: threeProductsReport_2.RESET_SALES_ORDER_LIST_NEW, payload: [] });
        this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
        this.myGetOrderList();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            orderList: function (_a) {
                var threeProductsReport = _a.threeProductsReport;
                return threeProductsReport.orderList;
            },
        }, {
            getSalesOrderListNew: threeProductsReport_1.getSalesOrderListNew,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/terminal/threeProductsReport/index'));

