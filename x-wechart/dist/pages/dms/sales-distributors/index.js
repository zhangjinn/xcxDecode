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
var request_1 = require('./../../../utils/request.js');
var salesdistributors_1 = require('./../../../store/actions/salesdistributors.js');
var salesdistributors_2 = require('./../../../store/types/salesdistributors.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var distributorsFilter = /** @class */ (function (_super) {
    __extends(distributorsFilter, _super);
    function distributorsFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '渠道订单审核',
            usingComponents: {
                'van-rate': '/components/vant/rate/index',
                'van-icon': '/components/vant/icon/index',
                'van-toast': '/components/vant/toast/index',
                'van-popup': '/components/vant/popup/index',
                'van-picker': '/components/vant/picker/index',
                'van-search': '/components/vant/search/index',
                'van-tab': '/components/vant/tab/index',
                'van-row': '/components/vant/row/index',
                'van-col': '/components/vant/col/index',
                'van-tabs': '/components/vant/tabs/index',
                'van-radio': '/components/vant/radio/index',
                'van-radio-group': '/components/vant/radio-group/index',
                'van-cell': '/components/vant/cell/index',
                'van-field': '/components/vant/field/index',
                'van-loading': '/components/vant/loading/index',
                'van-stepper': '/components/vant/stepper/index',
                'van-cell-group': '/components/vant/cell-group/index',
                'van-button': '/components/vant/button/index',
                'calendar': '/components/calendar/index',
                'img': '/components/img/index',
                'sales-distributors-item': '/components/sales-distributors-item/index'
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "订单" }, "headerTab": { "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
        };
        _this.data = {
            visible: false,
            orderpopup: false,
            deletepopup: false,
            Statusextend: false,
            OrderTypeextend: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            timeFrameVisible: false,
            calendarShow: false,
            currentDateName: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    documentNum: '',
                    purchaseNum: '',
                    customerName: '',
                    startDate: '',
                    endDate: '',
                    sellerName: '',
                    packageCode: ''
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
            freeShippingTip: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            onTgdocumentNumChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { packageCode: e.detail });
            },
            onTgzhudanhaoChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { packageMainNum: e.detail });
            },
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            ondocumentNumChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { documentNum: e.detail });
            },
            oncustomerNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { customerName: e.detail });
            },
            onsellerNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { sellerName: e.detail });
            },
            // 筛选确定
            onSubmitFilterForm: function () {
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
                this.methods.scrollToTop();
            },
            // 回到顶部
            scrollToTop: function () {
                _this.scrollTop = 0;
            },
            onScroll: function (event) {
                if (_this.scrollTop === 0) {
                    _this.scrollTop = event.detail.scrollTop;
                }
            },
            // 筛选重置
            onResetFilterForm: function () {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { documentNum: '', customerName: '', sellerName: '', startDate: '', endDate: '' });
            },
            // 选择日期
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
            closeCalendar: function () {
                this.calendarShow = false;
            },
            clearCalendar: function (name) {
                var _a;
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[name] = '', _a));
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
            onGetOrderListNext: function () {
                var _a = this.orderList.page, totalPage = _a.totalPage, totalCount = _a.totalCount;
                if (totalPage > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
            // 接受子组件的操作
            distributorsOperation: function () {
                setTimeout(function () {
                    wepy_redux_1.getStore().dispatch({ type: salesdistributors_2.RESET_SALES_ORDER_REVIEW_LIST, payload: [] });
                    _this.filterForm.page = __assign({}, _this.filterForm.page, { pageNo: 1 });
                    _this.$apply();
                    _this.myGetOrderList();
                }, 2000);
            },
        };
        return _this;
    }
    distributorsFilter.prototype.myGetOrderList = function () {
        this.methods.getSalesOrderReviewList(__assign({ _loading: true }, this.filterForm));
    };
    distributorsFilter.prototype.onShow = function () {
        this.freeShippingTip = index_1.getAlertInfo('14187495683'); // 免运费提示信息
        this.myGetOrderList();
    };
    distributorsFilter.prototype.onLoad = function () {
    };
    distributorsFilter = __decorate([
        wepy_redux_1.connect({
            orderList: function (_a) {
                var salesdistributors = _a.salesdistributors;
                return salesdistributors.orderList;
            },
        }, {
            getSalesOrderReviewList: salesdistributors_1.getSalesOrderReviewList
        })
    ], distributorsFilter);
    return distributorsFilter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(distributorsFilter , 'pages/dms/sales-distributors/index'));

