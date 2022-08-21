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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var order_detail_1 = require('./../../../store/actions/order-detail.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '海信订单',
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
                'van-dialog': '../../../../components/vant/dialog/index',
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
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            timeFrameVisible: false,
            calendarShow: false,
            agentPopup: false,
            popupTitle: '',
            agentPopupName: '全部',
            deliveryPopupName: '全部',
            purchasePopupName: '全部',
            arrivalWeekPopupName: '全部',
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
                weekName: ''
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
            arrivalWeekOptions: [
                { key: '', value: '全部' },
                { key: 'N', value: 'N' },
                { key: 'N+1', value: 'N+1' },
                { key: 'N+2', value: 'N+2' },
                { key: 'N+3', value: 'N+3' },
                { key: 'N+4', value: 'N+4' },
                { key: 'N+5', value: 'N+5' },
                { key: 'N+6', value: 'N+6' },
                { key: 'N+7', value: 'N+7' },
                { key: 'N+8', value: 'N+8' },
                { key: 'N+9', value: 'N+9' },
                { key: 'N+10', value: 'N+10' },
                { key: 'N+11', value: 'N+11' },
                { key: 'N+12', value: 'N+12' },
                { key: 'N+13', value: 'N+13' },
            ],
            commentDetailVisible: false,
            commentVisible: false,
            commentDetail: {},
            commentForm: {},
            headerTabList: [
                { name: '订单类型', type: 'orderType', selectValue: '' },
                { name: '订单状态', type: 'orderStatus', selectValue: '' },
                { name: '审核单状态', type: 'auditStatus', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            continueToPay: function (id) {
                _this.continuePayId = id;
                _this.continuePayPopup = true;
                _this.$apply();
            },
            beforePay: function () {
                var _this = this;
                toast_1.default.loading({
                    message: '支付中...',
                    forbidClick: true,
                    duration: 0,
                    zIndex: 9999999
                });
                var id = this.continuePayId;
                this.continuePayPopup = false;
                // this.continuePayId = ''
                request_1.request({
                    api: "order/updateSalesOrderStatus.nd",
                    method: 'POST',
                    data: {
                        orderCode: id
                    },
                    callback: function (res) {
                        toast_1.default.clear();
                        var data = res.data;
                        if (data) {
                            console.error(data);
                            /**
                             * 待付款时，判断账户余额充足，可选择使用账户余额支付；若是支付定金，则不需要增加
                             * 接口返回code 判断
                             * 0 支付成功
                             * 220210002 余额不足，调用微信支付
                             * 220210001 订单不存在
                             * 220210003 订单明细不存在
                             * 220210004 订单不是未付款状态
                             */
                            if (data.code == 0) {
                                _this.filterForm = __assign({}, _this.filterForm, { pageNo: 1 });
                                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                                _this.scrollTop = 0;
                                _this.OrderSFilterVisible = false;
                                _this.CurrentOrderSFilterName = '';
                                _this.myGetOrderList();
                            }
                            else if (data.code == 220210002) {
                                _this.methods.continuePay();
                            }
                            else {
                                toast_1.default.fail(data.msg);
                            }
                        }
                        else {
                            toast_1.default.fail('订单支付失败');
                        }
                    }
                });
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
            cancelOrderPopup: function (id, code, orderType, states) {
                /*this.cancelOrderId = id
                this.cancelOrderPopup = true
                this.$apply()*/
                //常规订单 BHO2000038043
                if (orderType == '8311' && (states == 'ALREADYPLANPRODUCT' || states == 'ARRANGEDPRODUCT' || states == 'UNCHKED' || states == 'WAITDELIVER' || states == 'PARTCHECKED')) {
                    dialog_1.default.confirm({
                        message: "取消‘评审通过’,‘已安排生产’,‘待排发货计划’,‘待发货’,‘发货中’状态的常规订单，会判定为商家违约，请确认是否取消？",
                    }).then(function () {
                        //跳转到取消页面
                        wx.navigateTo({
                            url: "/pages/me/order-cancel/index?orderId=" + id + "&orderCode=" + code + "&ly=0"
                        });
                    }).catch(function () {
                        // on cancel
                    });
                }
                else {
                    dialog_1.default.confirm({
                        message: "请确认是否取消？",
                    }).then(function () {
                        _this.cancelOrderId = code;
                        _this.methods.cancleOrder();
                    });
                }
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
                request_1.request({
                    api: "order/cancelOrder.nd?orderCode=" + id, callback: function (res) {
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
                    }
                });
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
            selectArrivalWeekType: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.key == key) {
                        _this.arrivalWeekPopupName = item.value;
                        _this.filterForm = __assign({}, _this.filterForm, { weekName: item.key });
                    }
                }, _this.arrivalWeekOptions);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectagentPopup: function (e) {
                if (e == 'salesOrganization') {
                    _this.popupTitle = '销售组织';
                }
                else if (e == 'parentAgent') {
                    _this.popupTitle = '上级代理';
                }
                else if (e == 'deliveryMethod') {
                    _this.popupTitle = '配送方式';
                }
                else if (e == 'purchaseType') {
                    _this.popupTitle = '采购方式';
                }
                else if (e == 'requiredArrivalWeek') {
                    _this.popupTitle = '要求到货周';
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
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            onSelectOrderTypeCode: function (orderTypeCode) {
                this.filterForm = __assign({}, this.filterForm, { orderTypeCode: orderTypeCode, pageNo: 1 });
                this.headerTabList[0].selectValue = orderTypeCode;
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectStatus: function (status) {
                this.filterForm = __assign({}, this.filterForm, { status: status, pageNo: 1 });
                this.headerTabList[1].selectValue = status;
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectSOStatus: function (sapOrderStatus) {
                this.filterForm = __assign({}, this.filterForm, { sapOrderStatus: sapOrderStatus, pageNo: 1 });
                this.headerTabList[2].selectValue = sapOrderStatus;
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
                this.methods.timeForMat(timeFrame);
            },
            timeForMat: function (count) {
                if (count == 7) {
                    count = 7;
                }
                else if (count == 1) {
                    count = 30;
                }
                else if (count == 3) {
                    count = 90;
                }
                else if (count == 6) {
                    count = 180;
                }
                var now = new Date();
                var year = now.getFullYear();
                var month = (now.getMonth() + 1) < 10 ? ('0' + (now.getMonth() + 1)) : now.getMonth() + 1;
                var date = now.getDate() < 10 ? ('0' + now.getDate()) : now.getDate();
                var hour = now.getHours() < 10 ? ('0' + now.getHours()) : now.getHours();
                var minute = now.getMinutes() < 10 ? ('0' + now.getMinutes()) : now.getMinutes();
                var second = now.getSeconds() < 10 ? ('0' + now.getSeconds()) : now.getSeconds();
                // let nowDate = year+'-'+month+'-'+date+" "+hour+":"+minute+":"+second
                var nowDate = year + '-' + month + '-' + date;
                _this.filterForm.endDate = nowDate;
                var before = new Date();
                before.setTime(before.getTime() - (24 * 60 * 60 * 1000 * (count - 1)));
                var Y2 = before.getFullYear();
                var M2 = ((before.getMonth() + 1) < 10 ? '0' + (before.getMonth() + 1) : (before.getMonth() + 1));
                var D2 = (before.getDate() < 10 ? '0' + before.getDate() : before.getDate());
                // this.postTrimParams.terms.documentDateFrom = Y2+'-'+M2+'-'+D2+" "+hour+":"+minute+":"+second
                _this.filterForm.beginDate = Y2 + '-' + M2 + '-' + D2;
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
                // const { name, type } = e.target.dataset
                var _b = e.currentTarget.dataset, name = _b.name, type = _b.type;
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
                console.log(name);
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
                if (this.currentDateName == 'beginDate' || this.currentDateName == 'endDate') {
                    this.filterForm = __assign({}, this.filterForm, { timeFrame: '' });
                }
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
                var volumeAll = 0;
                var volume = 0;
                var qty = 0;
                this.orderList.orderHeaderList.forEach(function (item) {
                    if (item.id == id) {
                        item.items.forEach(function (items) {
                            volume = volume + items.loadVolume;
                            qty = items.qty;
                        });
                        volumeAll = (volume * qty).toFixed(3);
                    }
                });
                toast_1.default.loading({
                    message: '下单中....',
                    duration: 0,
                });
                this.methods.againCommonOrder({ id: id }, function (res) {
                    var data = res.data;
                    if (data && data.cartOrder) {
                        toast_1.default.clear();
                        wx.navigateTo({
                            url: "/pages/goods/order/index?type=again&totalVolume=" + volumeAll,
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
            },
            onToggleComment: function (order) {
                var _this = this;
                request_1.request({ api: "order/orderLine.nd", method: 'GET', data: { id: order.id, _loading: true }, }).then(function (res) {
                    if (res && res.erpList && res.erpList[0] && res.nowStatuses && (res.nowStatuses[res.erpList[0].id] === 'O8' || res.nowStatuses[res.erpList[0].id] === 'O11')) {
                        if (!res.erpList[0].havaOrderEvaluation) {
                            _this.commentForm = { erpId: res.erpList[0].id, orderId: order.id, orgId: order.orgId, id: '' };
                            _this.commentVisible = true;
                        }
                        else {
                            _this.methods.onToggleCommentDetail({ erpId: res.erpList[0].id, orderId: order.id, orgId: order.orgId });
                        }
                    }
                    else {
                        toast_1.default('当前订单不能评价！');
                    }
                    _this.$apply();
                });
            },
            closeComment: function () {
                _this.commentVisible = false;
            },
            closeCommentDetail: function () {
                _this.commentDetailVisible = false;
            },
            onChangeCommentLevel: function (e) {
                var _a;
                var name = e.target.dataset.name;
                this.commentForm = __assign({}, this.commentForm, (_a = {}, _a[name] = e.detail, _a));
            },
            onCommentContentChange: function (event) {
                this.commentForm = __assign({}, this.commentForm, { evaluationContent: event.detail });
            },
            onSubmitComment: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request_1.request({ api: '/orderEvaluation/saveEvaluate.nd', method: 'POST', data: __assign({}, this.commentForm, { _loading: true }), })];
                            case 1:
                                result = _a.sent();
                                if (result === 'success') {
                                    toast_1.default.success('评价成功');
                                    this.commentVisible = false;
                                    this.$apply();
                                    return [2 /*return*/];
                                }
                                toast_1.default.fail(result);
                                return [2 /*return*/];
                        }
                    });
                });
            },
            onToggleCommentDetail: function (item) { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!item.erpId) return [3 /*break*/, 2];
                            return [4 /*yield*/, request_1.request({ api: '/orderEvaluation/init.nd', method: 'POST', data: __assign({}, item, { _loading: true }) })];
                        case 1:
                            result = _a.sent();
                            if (result.erpId) {
                                this.commentDetailVisible = true;
                                this.commentDetail = result.productEvaluate;
                                this.$apply();
                                return [2 /*return*/];
                            }
                            toast_1.default.fail('获取评价信息报错');
                            this.$apply();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Filter.prototype.myGetOrderList = function () {
        this.methods.getOrderList(this.filterForm);
    };
    Filter.prototype.onShow = function () {
        this.methods.getOrderDeliveryMethod({ type: '' });
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        this.filterForm = __assign({}, this.filterForm, { 
            // beginDate: `${now.getFullYear()}-01-01`,
            beginDate: index_1.getLastMonthYesterday(), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
        this.myGetOrderList();
        this.methods.getOrderFilter({ type: 1 });
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
            getOrderList: order_1.getOrderList,
            getOrderFilter: order_1.getOrderFilter,
            againCommonOrder: order_2.againCommonOrder,
            getOrderDeliveryMethod: order_1.getOrderDeliveryMethod,
            agentCanceleOrder: order_2.agentCanceleOrder,
            getOrderDetail: order_detail_1.getOrderDetail
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/order/index'));

