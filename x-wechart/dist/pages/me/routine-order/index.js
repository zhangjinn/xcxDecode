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
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var order_2 = require('./../../../store/actions/order.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var order_3 = require('./../../../store/types/order.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '海信常规订单',
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
            Suppliersextend: false,
            Itemgroupextend: false,
            orderStatusextend: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            timeFrameVisible: false,
            calendarShow: false,
            agentPopup: false,
            popupTitle: '',
            agentPopupName: '全部',
            deliveryPopupName: '全部',
            purchasePopupName: '全部',
            currentDateName: '',
            cancelOrderPopup: false,
            cancelOrderId: '',
            continuePayPopup: false,
            continuePayId: '',
            scrollTop: 0,
            filterForm: {
                _loading: true,
                agentCheckStart: '',
                agentCheckEnd: '',
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
                // sapBeginDate: '', 不用了
                // sapEndDate: '',
                agentId: '',
                trans: '',
                directBuy: '',
                purchaseTypeId: '',
                orderStatus: ''
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
            purchaseType: [
                {
                    key: 1,
                    value: '应急采购'
                },
                {
                    key: 2,
                    value: '常规采购'
                }
            ],
            headerTabList: [
                { name: '订单状态', type: 'orderStatus', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            goMe: function () {
                wx.switchTab({
                    url: '/pages/main/me/index'
                });
            },
            continueToPay: function (id) {
                _this.continuePayId = id;
                _this.continuePayPopup = true;
                _this.$apply();
            },
            continuePay: function () {
                toast_1.default.loading({
                    message: '支付中...',
                    forbidClick: true,
                    duration: 0,
                    zIndex: 9999999
                });
                var id = _this.continuePayId;
                _this.continuePayPopup = false;
                _this.continuePayId = '';
                var openId = wepy_1.default.$instance.globalData.openid;
                if (!openId) {
                    wx.login({
                        success: function (wxRes) {
                            if (wxRes.code) {
                                request_1.request({
                                    api: "queryCodeInfo.nd?code=" + wxRes.code,
                                    callback: function (res) {
                                        var openid = res.data.openid;
                                        if (openid) {
                                            openId = openid;
                                        }
                                        else {
                                            toast_1.default.fail('获取code失败');
                                        }
                                    },
                                });
                            }
                        },
                        fail: function () {
                            toast_1.default.fail('获取code失败');
                        },
                    });
                }
                var item = {
                    openId: openId,
                    orderCode: id
                };
                request_1.request({
                    api: "order/payOrder.nd",
                    method: 'POST',
                    data: item,
                    callback: function (res) {
                        toast_1.default.clear();
                        var data = res.data;
                        if (data && data.payInfo) {
                            var _a = data.payInfo, timeStamp = _a.timeStamp, nonceStr = _a.nonceStr, paySign = _a.paySign, signType = _a.signType;
                            wx.requestPayment({
                                timeStamp: timeStamp.toString(),
                                nonceStr: nonceStr,
                                package: data.payInfo.package,
                                signType: signType,
                                paySign: paySign,
                                success: function () {
                                    toast_1.default.success('订单支付成功');
                                    setTimeout(function () {
                                        _this.filterForm = __assign({}, _this.filterForm, { pageNo: 1 });
                                        wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                                        _this.scrollTop = 0;
                                        _this.OrderSFilterVisible = false;
                                        _this.CurrentOrderSFilterName = '';
                                        _this.myGetOrderList();
                                    }, 2000);
                                },
                                fail: function () {
                                    toast_1.default.fail('订单支付失败');
                                }
                            });
                        }
                        else {
                            toast_1.default.fail('订单支付失败');
                        }
                    }
                });
            },
            onScroll: function (event) {
                if (event.detail.scrollTop >= 350) {
                    if (_this.scrollTop === 0) {
                        _this.scrollTop = event.detail.scrollTop;
                    }
                }
            },
            cancelOrderPopup: function (id, code) {
                /*this.cancelOrderId = id
                this.cancelOrderPopup = true
                this.$apply()*/
                //跳转到取消页面
                wx.navigateTo({
                    url: "/pages/me/order-cancel/index?orderId=" + id + "&orderCode=" + code + "&ly=0"
                });
            },
            cancel: function () {
                _this.cancelOrderPopup = false;
                _this.continuePayPopup = false;
                _this.cancelOrderId = '';
                _this.continuePayId = '';
            },
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
                request_1.request({ api: "order/cancelOrder.nd?orderCode=" + id, callback: function (res) {
                        toast_1.default.clear();
                        if (res && res.data && res.data.code == '0') {
                            toast_1.default.success('取消订单成功');
                            setTimeout(function () {
                                _this.filterForm = __assign({}, _this.filterForm, { pageNo: 1 });
                                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                                _this.scrollTop = 0;
                                _this.OrderSFilterVisible = false;
                                _this.CurrentOrderSFilterName = '';
                                _this.myGetOrderList();
                            }, 2000);
                        }
                        else {
                            toast_1.default.fail('取消订单失败');
                        }
                    } });
            },
            onCheckDirectOrders: function () {
                if (_this.filterForm.directBuy == '') {
                    _this.filterForm.directBuy = 1;
                }
                else {
                    _this.filterForm.directBuy = '';
                }
                _this.$apply();
            },
            selectAgent: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.key == key) {
                        _this.agentPopupName = item.value;
                        _this.filterForm = __assign({}, _this.filterForm, { agentId: item.key });
                    }
                }, _this.filter.itemAgent);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectDelivery: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.code == key) {
                        _this.deliveryPopupName = item.name;
                        _this.filterForm = __assign({}, _this.filterForm, { trans: item.code });
                    }
                }, _this.deliveryMethod);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectPurchaseType: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.key == key) {
                        _this.purchasePopupName = item.value;
                        _this.filterForm = __assign({}, _this.filterForm, { purchaseTypeId: item.key });
                    }
                }, _this.purchaseType);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectagentPopup: function (e) {
                if (e == 'salesOrganization') {
                    _this.popupTitle = '销售组织';
                }
                _this.agentPopup = !_this.agentPopup;
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
                        url: "/pages/me/order-detail/index?id=" + e
                    });
                }
            },
            Suppliers: function () {
                _this.Suppliersextend = !_this.Suppliersextend;
            },
            Itemgroup: function () {
                _this.Itemgroupextend = !_this.Itemgroupextend;
            },
            OrderStatusGroup: function () {
                _this.orderStatusextend = !_this.orderStatusextend;
            },
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            onSelectOrderTypeCode: function (orderTypeCode) {
                this.filterForm = __assign({}, this.filterForm, { orderTypeCode: orderTypeCode, pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectStatus: function (orderStatus) {
                this.filterForm = __assign({}, this.filterForm, { orderStatus: orderStatus, pageNo: 1 });
                this.headerTabList[0].selectValue = orderStatus;
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectSOStatus: function (sapOrderStatus) {
                this.filterForm = __assign({}, this.filterForm, { sapOrderStatus: sapOrderStatus, pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
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
                this.filterForm = __assign({}, this.filterForm, { orgId: key });
                this.filterFormExtra = __assign({}, this.filterFormExtra, { orgName: value });
                this.agentPopup = false;
            },
            onSelectmatkl: function (matkl) {
                var key = matkl.key, value = matkl.value;
                if (this.filterForm.matkl === key) {
                    this.filterForm = __assign({}, this.filterForm, { matkl: '' });
                    this.filterFormExtra = __assign({}, this.filterFormExtra, { matklName: '' });
                    return;
                }
                this.filterForm = __assign({}, this.filterForm, { matkl: key });
                this.filterFormExtra = __assign({}, this.filterFormExtra, { matklName: value });
            },
            onSelectOrderStatus: function (status) {
                if (this.filterForm.orderStatus === status) {
                    this.filterForm = __assign({}, this.filterForm, { orderStatus: '' });
                    return;
                }
                this.filterForm = __assign({}, this.filterForm, { orderStatus: status });
            },
            onZzprdmodelChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { zzprdmodel: e.detail });
            },
            onOrderCodeChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { orderCode: e.detail });
            },
            onWeekChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { weekName: e.detail });
            },
            onToggleTimeFrame: function () {
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            onSelectTimeFrame: function (timeFrame) {
                this.filterForm = __assign({}, this.filterForm, { timeFrame: timeFrame });
            },
            onSubmitFilterForm: function () {
                this.filterForm = __assign({}, this.filterForm, { pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.myGetOrderList();
                this.methods.orderfiltering();
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, beginDate = _a.beginDate, endDate = _a.endDate, sapBeginDate = _a.sapBeginDate, sapEndDate = _a.sapEndDate, agentCheckStart = _a.agentCheckStart, agentCheckEnd = _a.agentCheckEnd;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = beginDate;
                    end = endDate;
                }
                if (type === 'agent') {
                    begin = agentCheckStart;
                    end = agentCheckEnd;
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
                if (name.indexOf('agent') > -1) {
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
            takeAgainOrder: function (id) {
                toast_1.default.loading({
                    message: '下单中....',
                    duration: 0,
                });
                this.methods.againCommonOrder({ id: id }, function (res) {
                    var data = res.data;
                    if (data && data.cartOrder) {
                        toast_1.default.clear();
                        wx.navigateTo({
                            url: '/pages/goods/order/index?type=again',
                        });
                    }
                    else {
                        toast_1.default.fail(data.msg || '结算失败');
                    }
                });
            },
            //代理商取消订单
            canceleOrder: function (id) {
                toast_1.default.loading({
                    message: '取消中....',
                    duration: 0,
                });
                this.methods.agentCanceleOrder({ id: id }, function (res) {
                    var data = res.data;
                    if (data && data.code === '0') {
                        toast_1.default.clear();
                        wx.navigateTo({
                            url: '/pages/goods/order/index?type=again',
                        });
                    }
                    else {
                        toast_1.default.fail(data.msg || '取消失败');
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
        this.methods.getRoutineOrderList(this.filterForm);
    };
    Filter.prototype.onShow = function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        var lastDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
        var lastYear = lastDate.getFullYear();
        var lastMonth = lastDate.getMonth() + 1;
        var lastDay = lastDate.getDate();
        lastMonth = lastMonth < 10 ? '0' + lastMonth : lastMonth;
        lastDay = lastDay < 10 ? '0' + lastDay : lastDay;
        this.methods.getOrderDeliveryMethod({ type: '' });
        // const now = new Date()
        // const month = now.getMonth() + 1
        // const day = now.getDate()
        this.filterForm = __assign({}, this.filterForm, { 
            // beginDate: `${now.getFullYear()}-01-01`,
            orderDateStart: lastYear + '-' + lastMonth + '-' + lastDay, orderDateEnd: year + '-' + month + '-' + day //`${now.getFullYear()}-${ month > 9 ? month : `0${month}`}-${day > 9 ? day: `0${day}`}`
         });
        this.myGetOrderList();
        this.methods.getOrderFilter({ type: 1 });
        console.log(this.orderList);
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            orderList: function (_a) {
                var order = _a.order;
                return order.orderList;
            },
            deliveryMethod: function (_a) {
                var order = _a.order;
                return order.deliveryMethod;
            },
            mixinCurrentUser: function (_a) {
                var user = _a.user;
                return user.info || {};
            },
            filter: function (_a) {
                var order = _a.order;
                return order.filter;
            },
        }, {
            getOrderFilter: order_1.getOrderFilter,
            againCommonOrder: order_2.againCommonOrder,
            getOrderDeliveryMethod: order_1.getOrderDeliveryMethod,
            agentCanceleOrder: order_2.agentCanceleOrder,
            getRoutineOrderList: order_1.getRoutineOrderList
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/routine-order/index'));

