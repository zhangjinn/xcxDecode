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
var order_1 = require('./../../../store/actions/order.js');
var order_2 = require('./../../../store/actions/order.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '分销直采',
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
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {}, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
        };
        _this.data = {
            visible: false,
            Suppliersextend: false,
            Itemgroupextend: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            timeFrameVisible: false,
            calendarShow: false,
            distributorsPopup: false,
            distributorsPopupName: '全部',
            currentDateName: '',
            popupName: '',
            deliveryPopupName: '全部',
            filterForm: {
                _loading: true,
                pageNo: 1,
                orderTypeCode: '',
                status: '',
                sapOrderStatus: '',
                orderCode: '',
                zzprdmodel: '',
                orgId: '',
                matklId: '',
                beginDate: '',
                endDate: '',
                timeFrame: '',
                sapBeginDate: '',
                sapEndDate: '',
                fxId: '',
                trans: '',
                type: 2
            },
            filterFormExtra: {
                orgName: '',
                matklName: '',
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
            headerTabList: [
                { name: '订单类型', type: 'orderType', selectValue: '' },
                { name: '订单状态', type: 'orderStatus', selectValue: '' },
                { name: '审核单状态', type: 'auditStatus', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            selectDelivery: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.code == key) {
                        _this.deliveryPopupName = item.name;
                        _this.filterForm = __assign({}, _this.filterForm, { trans: item.code });
                    }
                }, _this.deliveryMethod);
                _this.distributorsPopup = false;
                _this.$apply();
            },
            selectagentPopup: function () {
                _this.distributorsPopup = false;
            },
            onSelectDistributors: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.key == key) {
                        _this.distributorsPopupName = item.value;
                        _this.filterForm = __assign({}, _this.filterForm, { fxId: item.key });
                    }
                }, _this.filter.itemFxmap);
                _this.distributorsPopup = false;
                _this.$apply();
            },
            selectPopup: function (name) {
                if (name == 'suppliers') {
                    _this.popupName = '供应商';
                }
                else if (name == 'distributors') {
                    _this.popupName = '分销商';
                }
                else if (name == 'delivery') {
                    _this.popupName = '配送方式';
                }
                _this.distributorsPopup = !_this.distributorsPopup;
            },
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
                if (['orderType', 'orderStatus', 'auditStatus'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            viewDetail: function (e) {
                if (e) {
                    wx.navigateTo({
                        url: "/pages/me/distribution-order-detail/index?id=" + e
                    });
                }
            },
            Suppliers: function () {
                _this.Suppliersextend = !_this.Suppliersextend;
            },
            Itemgroup: function () {
                _this.Itemgroupextend = !_this.Itemgroupextend;
            },
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            onSelectOrderTypeCode: function (orderTypeCode) {
                this.filterForm = __assign({}, this.filterForm, { orderTypeCode: orderTypeCode, pageNo: 1 });
                this.headerTabList[0].selectValue = orderTypeCode;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectStatus: function (status) {
                this.filterForm = __assign({}, this.filterForm, { status: status, pageNo: 1 });
                this.headerTabList[1].selectValue = status;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectSOStatus: function (sapOrderStatus) {
                this.filterForm = __assign({}, this.filterForm, { sapOrderStatus: sapOrderStatus, pageNo: 1 });
                this.headerTabList[2].selectValue = sapOrderStatus;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectOrg: function (org) {
                var key = org.key, value = org.value;
                if (this.filterForm.orgId === key) {
                    this.filterForm = __assign({}, this.filterForm, { orgId: '' });
                    this.filterFormExtra = __assign({}, this.filterFormExtra, { orgName: '' });
                    return;
                }
                this.distributorsPopup = false;
                this.filterForm = __assign({}, this.filterForm, { orgId: key });
                this.filterFormExtra = __assign({}, this.filterFormExtra, { orgName: value });
            },
            onSelectmatkl: function (matkl) {
                var key = matkl.key, value = matkl.value;
                if (this.filterForm.matklId === key) {
                    this.filterForm = __assign({}, this.filterForm, { matklId: '' });
                    this.filterFormExtra = __assign({}, this.filterFormExtra, { matklName: '' });
                    return;
                }
                this.filterForm = __assign({}, this.filterForm, { matklId: key });
                this.filterFormExtra = __assign({}, this.filterFormExtra, { matklName: value });
            },
            onZzprdmodelChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { zzprdmodel: e.detail });
            },
            onOrderCodeChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { orderCode: e.detail });
            },
            onToggleTimeFrame: function () {
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            onSelectTimeFrame: function (timeFrame) {
                this.filterForm = __assign({}, this.filterForm, { timeFrame: timeFrame });
            },
            onSubmitFilterForm: function () {
                this.filterForm = __assign({}, this.filterForm, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, beginDate = _a.beginDate, endDate = _a.endDate, sapBeginDate = _a.sapBeginDate, sapEndDate = _a.sapEndDate;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = beginDate;
                    end = endDate;
                }
                if (type === 'sapDate') {
                    begin = sapBeginDate;
                    end = sapEndDate;
                }
                if (name.indexOf('eginDate') > -1) {
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
                this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[name] = '', _a));
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
            onGetOrderListNext: function () {
                var totalPages = this.orderList.totalPages;
                if (totalPages > this.filterForm.pageNo) {
                    this.filterForm = __assign({}, this.filterForm, { pageNo: this.filterForm.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
        };
        return _this;
    }
    Filter.prototype.myGetOrderList = function () {
        this.methods.getOrderList(this.filterForm);
    };
    Filter.prototype.onShow = function () {
        this.myGetOrderList();
        this.methods.getOrderDeliveryMethod({ type: 2 });
        this.methods.getOrderFilter({ type: 2 });
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            orderList: function (_a) {
                var order = _a.order;
                return order.orderList;
            },
            filter: function (_a) {
                var order = _a.order;
                return order.filter;
            },
            deliveryMethod: function (_a) {
                var order = _a.order;
                return order.deliveryMethod;
            },
        }, {
            getOrderList: order_1.getOrderList,
            getOrderFilter: order_1.getOrderFilter,
            againCommonOrder: order_2.againCommonOrder,
            getOrderDeliveryMethod: order_2.getOrderDeliveryMethod
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/distribution-order/index'));

