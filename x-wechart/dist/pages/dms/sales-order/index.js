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
var salesorder_1 = require('./../../../store/actions/salesorder.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
var salesorder_2 = require('./../../../store/types/salesorder.js');
var dmsoutwarehouse_1 = require('./../../../store/actions/dmsoutwarehouse.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '销售订单查询',
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
        _this.$props = { "emptyDataType": { "description": "订单" }, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
        };
        _this.data = {
            visible: false,
            orderpopup: false,
            messagepopup: false,
            deletepopup: false,
            Statusextend: false,
            OrderTypeextend: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            timeFrameVisible: false,
            calendarShow: false,
            beDismissed: false,
            reviewConsent: false,
            reviewConsentId: '',
            beDismissedId: '',
            currentDateName: '',
            cancelSucMes: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    salefitlerId: '',
                    documentNum: '',
                    purchaseNum: '',
                    customerName: '',
                    startDate: '',
                    endDate: '',
                    status: '',
                    sellerCode: '',
                    documentType: '',
                    returnStatus: '',
                    customerCode: '',
                    warehouseCode: '',
                    warehouseName: '',
                    sellerName: '',
                    isSpeclalShop: '',
                    isCrossCategory: '' //是否跨品类
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
            showCanselExamle: false,
            ExamineId: '',
            isSpeclalShopFilter: [
                { key: 'T', value: '是' },
                { key: 'F', value: '否' }
            ],
            headerTabList: [
                { name: '订单状态', type: 'orderStatus', selectValue: '' },
                { name: '订单类型', type: 'orderType', selectValue: '' },
                { name: '是否是专卖店', type: 'isSpeclalShop', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            crossCategory: function (e) {
                var type = e.target.dataset.type;
                if (type == this.filterForm.terms.isCrossCategory) {
                    this.filterForm.terms.isCrossCategory = '';
                }
                else {
                    this.filterForm.terms.isCrossCategory = type;
                }
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
                if (['orderType', 'isSpeclalShop', 'orderStatus', 'auditStatus'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            viewDetail: function (e, status, type) {
                if (e) {
                    var url = "/pages/dms/sales-order-detail/index?id=" + e;
                    if (status == '草稿') {
                        if (type == 'normal') {
                            url = "/pages/dms/channel-order-detail/index?id=" + e;
                        }
                        else if (type == 'retail') {
                            url = "/pages/dms/retail-order-detail/index?id=" + e;
                        }
                    }
                    wx.navigateTo({
                        url: url
                    });
                }
            },
            Status: function () {
                _this.Statusextend = !_this.Statusextend;
            },
            OrderTypeCode: function () {
                _this.OrderTypeextend = !_this.OrderTypeextend;
            },
            // showSucMessage () {
            //   this.messagepopup = !this.messagepopup
            // },
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            onSelectOrderTypeCode: function (documentType) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { documentType: documentType });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[1].selectValue = documentType;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            onSelectSpeclalShopCode: function (isSpeclalShop) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { isSpeclalShop: isSpeclalShop });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[2].selectValue = isSpeclalShop;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            onSelectStatus: function (status) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { status: status });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[0].selectValue = status;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            onSelectFStatus: function (status) {
                this.filterForm.terms.status = status;
            },
            onSelectOrderType: function (type) {
                this.filterForm.terms.documentType = type;
            },
            ondocumentNumChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { documentNum: e.detail });
            },
            oncustomerNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { customerName: e.detail });
            },
            onActivityNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { activityName: e.detail });
            },
            onActivityCodeChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { userActivityCode: e.detail });
            },
            onsellerNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { sellerName: e.detail });
            },
            onwarehouseNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { warehouseName: e.detail });
            },
            onToggleTimeFrame: function () {
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            onSelectTimeFrame: function (timeFrame) {
                this.filterForm = __assign({}, this.filterForm, { timeFrame: timeFrame });
            },
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
            onResetFilterForm: function () {
                this.filterForm.status = '';
                this.filterForm.terms = __assign({}, this.filterForm.terms, { documentNum: '', customerName: '', sellerName: '', warehouseName: '', startDate: '', endDate: '', isCrossCategory: '' });
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
            start: function (e) {
                _this.id = e;
                _this.orderpopup = !_this.orderpopup;
            },
            cancel: function () {
                _this.orderpopup = !_this.orderpopup;
            },
            cancelDismissed: function () {
                // 驳回popup
                _this.beDismissed = false;
            },
            // 取消审核弹窗
            cancelExamine: function () {
                _this.showCanselExamle = false;
            },
            // 打开审核弹框
            ordercanselExamine: function (id) {
                _this.ExamineId = id;
                _this.showCanselExamle = true;
                _this.$apply();
            },
            // TODO:取消审核接口对接
            canselExamine: function () {
                _this.showCanselExamle = false;
                var id = _this.ExamineId;
                var account = wepy_1.default.$instance.globalData.account;
                _this.methods.canselOrder({
                    _loading: true,
                    userAccount: account,
                    salesOrderId: id
                }).then(function (res) {
                    if (res && res.payload && res.payload.code == '0') {
                        toast_1.default.success('取消审核成功');
                        setTimeout(function () {
                            wepy_redux_1.getStore().dispatch({ type: salesorder_2.RESET_SALES_ORDER_INQUIRY_LIST, payload: [] });
                            _this.filterForm.page = __assign({}, _this.filterForm.page, { pageNo: 1 });
                            _this.$apply();
                            _this.myGetOrderList();
                        }, 2000);
                    }
                });
            },
            // 订单驳回弹框
            orderDismissed: function (id) {
                _this.beDismissedId = id;
                _this.beDismissed = true;
                _this.$apply();
            },
            // TODO:订单驳回
            beDismissed: function () {
                _this.beDismissed = false;
                var id = _this.beDismissedId;
                var account = wepy_1.default.$instance.globalData.account;
                _this.methods.salesOrderRejected({
                    _loading: true,
                    userAccount: account,
                    salesOrderId: id
                }).then(function (res) {
                    if (res && res.payload && res.payload.code == '0') {
                        toast_1.default.success('审核驳回成功');
                    }
                    setTimeout(function () {
                        wepy_redux_1.getStore().dispatch({ type: salesorder_2.RESET_SALES_ORDER_INQUIRY_LIST, payload: [] });
                        _this.filterForm.page = __assign({}, _this.filterForm.page, { pageNo: 1 });
                        _this.$apply();
                        _this.myGetOrderList();
                    }, 2000);
                });
            },
            orderConsent: function (id) {
                _this.reviewConsent = true;
                _this.reviewConsentId = id;
                _this.$apply();
            },
            // TODO:审核同意
            beConsent: function () {
                _this.reviewConsent = false;
                var id = _this.reviewConsentId;
                var account = wepy_1.default.$instance.globalData.account;
                _this.methods.salesOrderApproval({
                    _loading: true,
                    userAccount: account,
                    salesOrderId: id
                }).then(function (res) {
                    if (res && res.payload && res.payload.code == '0') {
                        toast_1.default.success('审核同意成功');
                    }
                    setTimeout(function () {
                        wepy_redux_1.getStore().dispatch({ type: salesorder_2.RESET_SALES_ORDER_INQUIRY_LIST, payload: [] });
                        _this.filterForm.page = __assign({}, _this.filterForm.page, { pageNo: 1 });
                        _this.$apply();
                        _this.myGetOrderList();
                    }, 2000);
                });
            },
            cancelConsent: function () {
                _this.reviewConsent = false;
            },
            deletestart: function (e) {
                _this.id = e;
                _this.deletepopup = !_this.deletepopup;
            },
            deletecancel: function () {
                _this.deletepopup = !_this.deletepopup;
            },
            cancleSuc: function () {
                _this.messagepopup = false;
            },
            cancleOrder: function () {
                var _this = this;
                var id = this.id;
                toast_1.default.loading({
                    message: '取消中....',
                    duration: 0,
                });
                this.methods.cancleSalesOrder({
                    salesOrderId: id
                }).then(function (res) {
                    if (res.payload.code == "0") {
                        toast_1.default.clear();
                        setTimeout(function () {
                            wepy_redux_1.getStore().dispatch({ type: salesorder_2.RESET_SALES_ORDER_INQUIRY_LIST, payload: [] });
                            _this.orderpopup = !_this.orderpopup;
                            _this.$apply();
                            _this.filterForm.page = __assign({}, _this.filterForm.page, { pageNo: 1 });
                            _this.myGetOrderList();
                            //增加消息成功返回
                            var list = res.payload.data;
                            var sucm = '以下商品取消成功：';
                            for (var i = 0; i < list.length; ++i) {
                                sucm = sucm + list[i].model + "   ";
                                sucm = sucm + list[i].borderedQty + "台   ";
                            }
                            _this.cancelSucMes = sucm;
                            _this.messagepopup = true;
                        }, 2000);
                    }
                    else {
                        toast_1.default.fail(res.payload.msg || '取消失败');
                    }
                });
            },
            deleteOrder: function () {
                var _this = this;
                var id = this.id;
                toast_1.default.loading({
                    message: '删除中....',
                    duration: 0,
                });
                this.methods.deleteSalesOrder({
                    salesOrderId: id
                }).then(function (res) {
                    if (res.payload.code == "0") {
                        toast_1.default.success('删除成功');
                        setTimeout(function () {
                            wepy_redux_1.getStore().dispatch({ type: salesorder_2.RESET_SALES_ORDER_INQUIRY_LIST, payload: [] });
                            _this.deletepopup = !_this.deletepopup;
                            _this.$apply();
                            _this.filterForm.page = __assign({}, _this.filterForm.page, { pageNo: 1 });
                            _this.myGetOrderList();
                        }, 2000);
                    }
                    else {
                        toast_1.default.fail(res.payload.msg || '取消失败');
                    }
                });
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Filter.prototype.myGetOrderList = function () {
        this.methods.getSalesOrderList(__assign({ _loading: true }, this.filterForm));
    };
    Filter.prototype.onShow = function () {
        this.myGetOrderList();
        this.methods.getsaleFilterList();
        // this.methods.getSalesOrderFilter();
    };
    Filter.prototype.onLoad = function () {
        this.methods.getSalesOrderFilter({
            "type": 'djlx',
        });
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            orderList: function (_a) {
                var salesorder = _a.salesorder;
                console.log("orderLsit===>", salesorder.orderList);
                return salesorder.orderList;
            },
            filter: function (_a) {
                var salesorder = _a.salesorder;
                return salesorder.documentTypeList;
            },
            saleFilterList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.saleFilterList;
            },
        }, {
            getSalesOrderList: salesorder_1.getSalesOrderList,
            getSalesOrderFilter: salesorder_1.getSalesOrderFilter,
            cancleSalesOrder: salesorder_1.cancleSalesOrder,
            deleteSalesOrder: salesorder_1.deleteSalesOrder,
            salesOrderApproval: salesorder_1.salesOrderApproval,
            salesOrderRejected: salesorder_1.salesOrderRejected,
            getsaleFilterList: dmsoutwarehouse_1.getsaleFilterList,
            canselOrder: salesorder_1.canselOrder
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/dms/sales-order/index'));

