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
var salesorder_1 = require('./../../../../store/actions/salesorder.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_1 = require('./../../../../utils/index.js');
var request_1 = require('./../../../../utils/request.js');
var salesorder_2 = require('./../../../../store/types/salesorder.js');
/* import utilsWxs from '../../../../wxs/utils.wxs'; */
var index_2 = require('./../../../../components/empty-data-type/index.js');
var index_3 = require('./../../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '渠道订单',
            usingComponents: {
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
                _loading: true,
                terms: {
                    documentNum: '',
                    supplierCode: '',
                    startDocumentDate: '',
                    endDocumentDate: '',
                    status: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    sortName: 'id',
                    sortOrder: 'desc'
                },
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
            cancelOrderPopup: false,
            cancelOrderId: '',
            cancelOrderItem: {},
            isImg: false,
            headerTabList: [
                { name: '单据状态', type: 'orderStatus', selectValue: '' },
                { name: '供应商', type: 'orderType', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            receiptEffect: function (item) {
                console.log('id', item);
                this.isImg = true;
            },
            onClose: function () {
                this.isImg = false;
            },
            viewmore: function () {
                _this.viewmore = !_this.viewmore;
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
            viewDetail: function (e, status, type) {
                if (e) {
                    var url = "/pages/dms/channel-purchase-order/detail/index?id=" + e;
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
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            onSelectSupplierCode: function (supplierCode) {
                wepy_redux_1.getStore().dispatch({ type: salesorder_2.RESET_PURCHASE_ORDER_LIST, payload: [] });
                this.filterForm.terms = __assign({}, this.filterForm.terms, { supplierCode: supplierCode });
                this.headerTabList[1].selectValue = supplierCode;
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            onSelectStatus: function (status) {
                wepy_redux_1.getStore().dispatch({ type: salesorder_2.RESET_PURCHASE_ORDER_LIST, payload: [] });
                this.filterForm.terms = __assign({}, this.filterForm.terms, { status: status });
                this.headerTabList[0].selectValue = status;
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            ondocumentNumChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { documentNum: e.detail });
            },
            onActivityNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { activityName: e.detail });
            },
            onActivityCodeChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { userActivityCode: e.detail });
            },
            onSubmitFilterForm: function () {
                wepy_redux_1.getStore().dispatch({ type: salesorder_2.RESET_PURCHASE_ORDER_LIST, payload: [] });
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
                this.filterForm.terms = __assign({}, this.filterForm.terms, { documentNum: '', startDocumentDate: '', endDocumentDate: '' });
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm.terms, startDocumentDate = _a.startDocumentDate, endDocumentDate = _a.endDocumentDate;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = startDocumentDate;
                    end = endDocumentDate;
                }
                if (type === 'sapDate') {
                    begin = startDocumentDate;
                    end = endDocumentDate;
                }
                if (name.indexOf('startDocumentDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('endDocumentDate') > -1) {
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
            cancelOrderPopup: function (item) {
                _this.cancelOrderItem = item;
                _this.cancelOrderId = item.id;
                _this.cancelOrderPopup = true;
                _this.$apply();
            },
            cancel: function () {
                _this.cancelOrderPopup = false;
                _this.cancelOrderId = '';
            },
            //分销商取消订单
            cancleOrder: function () {
                toast_1.default.loading({
                    message: '取消中...',
                    forbidClick: true,
                    duration: 0,
                    zIndex: 9999999
                });
                var id = _this.cancelOrderId;
                _this.cancelOrderPopup = false;
                _this.cancelOrderId = '';
                //取消订单
                _this.methods.agentCancleSalesOrder({
                    purchaseOrderId: id
                }).then(function (res) {
                    if (res.payload.code == "0") {
                        toast_1.default.success('取消成功');
                        var data = {};
                        var qtys_1 = [];
                        var productIds_1 = [];
                        _this.cancelOrderItem.purchaseOrderItem.forEach(function (item) {
                            qtys_1.push(-item.orderedQty);
                            productIds_1.push(item.productCode);
                        });
                        data = {
                            userActivityCode: _this.cancelOrderItem.userActivityCode,
                            dmsOrderCode: _this.cancelOrderItem.documentNum,
                            qtys: qtys_1.toString(),
                            productIds: productIds_1.toString(),
                        };
                        request_1.request({
                            api: "marketActivity/changeTransFlag.nd",
                            method: "POST",
                            data: data,
                            callback: function (res1) {
                                setTimeout(function () {
                                    wepy_redux_1.getStore().dispatch({ type: salesorder_2.RESET_PURCHASE_ORDER_LIST, payload: [] });
                                    _this.orderpopup = !_this.orderpopup;
                                    _this.$apply();
                                    _this.filterForm.page = __assign({}, _this.filterForm.page, { pageNo: 1 });
                                    _this.myGetOrderList();
                                }, 2000);
                            }
                        });
                    }
                    else {
                        toast_1.default.fail(res.payload.msg || '取消失败');
                    }
                });
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Filter.prototype.myGetOrderList = function () {
        this.methods.getPurchaseOrderList(this.filterForm);
    };
    Filter.prototype.onShow = function () {
        wepy_redux_1.getStore().dispatch({ type: salesorder_2.RESET_PURCHASE_ORDER_LIST, payload: [] });
        this.myGetOrderList();
    };
    Filter.prototype.onLoad = function () {
        this.methods.getSalesOrderFilter({
            type: 'gys',
        });
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            orderList: function (_a) {
                var salesorder = _a.salesorder;
                return salesorder.purchaseorderList;
            },
            filter: function (_a) {
                var salesorder = _a.salesorder;
                return salesorder.SuppliersList;
            }
        }, {
            getPurchaseOrderList: salesorder_1.getPurchaseOrderList,
            getSalesOrderFilter: salesorder_1.getSalesOrderFilter,
            cancleSalesOrder: salesorder_1.cancleSalesOrder,
            agentCancleSalesOrder: salesorder_1.agentCancleSalesOrder
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/dms/channel-purchase-order/index/index'));

