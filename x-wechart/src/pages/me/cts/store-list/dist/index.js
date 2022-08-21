"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var wepy_1 = require("wepy");
var wepy_redux_1 = require("wepy-redux");
var store_1 = require("@/store/actions/store");
var order_1 = require("@/store/actions/order");
var toast_1 = require("@/components/vant/toast/toast");
var index_1 = require("@/utils/index");
var request_1 = require("@/utils/request");
var utils_wxs_1 = require("../../../wxs/utils.wxs");
var order_2 = require("@/store/actions/order");
var ramda_1 = require("ramda");
var order_3 = require("@/store/types/order");
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '我的订单',
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
                'img': '../../../components/img/index'
            }
        };
        _this.wxs = {
            utils: utils_wxs_1["default"]
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
                purchaseTypeId: ''
            },
            filterFormExtra: {
                orgName: '',
                matklName: ''
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false
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
            // 新增
            storeFilterForm: {
                cisCode: "7146896",
                longitude: "121.506656",
                latitude: "31.245087",
                matkls: [],
                label: "",
                marketModel: "",
                shopLevel: "",
                sortType: "1",
                page: 1,
                pageSize: 10,
                queryParamList: [
                    {
                        field: "isBrandGarden",
                        value: "0"
                    },
                    {
                        field: "custShopInfo.province.id",
                        value: 23957
                    },
                    {
                        field: "custShopInfo.city.id",
                        value: 23505
                    },
                    {
                        field: "custShopInfo.county.id",
                        value: 23403
                    }
                ]
            },
            storeList: [],
            isGetLocation: false,
            isUserScopeLoction: 'true',
            regionList: [],
            isSelectProvince: true,
            isSelectCity: false,
            cityList: [],
            provinceName: '',
            cityName: '',
            provinceList: [],
            isRegionSwitch: true,
            distanceList: [5, 10, 20, 50, 100, 500],
            comuseLabel: ['TOP客户', '国美', '苏宁', '五星', '普通商家', 'V300',],
            saleModeList: [
                { name: "直营", key: "17452" },
                { name: "分销", key: "17453" },
                { name: "代理", key: "17451" }
            ],
            storeType: [
                { name: "专卖店", key: "isSpecialShop" },
                { name: "品牌园", key: "isBrandGarden" },
                { name: "普通店", key: "pt" },
                { name: "下沉渠道", key: "isSinkChannel" },
                { name: "智慧生活馆", key: "isSmartShop" }
            ],
            storeLevel: [
                { name: "S-体验店", key: "14170992126" },
                { name: "A-旗舰店", key: "14170992127" },
                { name: "B-标准店", key: "14170992128" },
                { name: "C-基础店", key: "14170992129" }
            ]
        };
        // 页面内交互写在methods里
        _this.methods = {
            //门店列表导航功能
            toStoreMap: function () {
                var location = {
                    latitude: 22.2666,
                    longitude: 113.54342,
                    name: '广东省珠海市香洲区'
                };
                wx.openLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    name: location.name,
                    address: location.name,
                    scale: 18
                });
            },
            //门店列表拨打电话
            toStoreMakeCall: function () {
                wx.makePhoneCall({
                    phoneNumber: '1008611'
                });
            },
            //门店巡店
            toStoreIn: function () { },
            //门店详情
            toStoreDetail: function () { },
            //门店地图
            navigateTo: function (pageUrl) {
                wx.navigateTo({
                    url: pageUrl
                });
            },
            continueToPay: function (id) {
                _this.continuePayId = id;
                _this.continuePayPopup = true;
                _this.$apply();
            },
            continuePay: function () {
                toast_1["default"].loading({
                    message: '支付中...',
                    forbidClick: true,
                    duration: 0,
                    zIndex: 9999999
                });
                var id = _this.continuePayId;
                _this.continuePayPopup = false;
                _this.continuePayId = '';
                var openId = wepy_1["default"].$instance.globalData.openid;
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
                                            toast_1["default"].fail('获取code失败');
                                        }
                                    }
                                });
                            }
                        },
                        fail: function () {
                            toast_1["default"].fail('获取code失败');
                        }
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
                        toast_1["default"].clear();
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
                                    toast_1["default"].success('订单支付成功');
                                    setTimeout(function () {
                                        _this.filterForm = __assign(__assign({}, _this.filterForm), { pageNo: 1 });
                                        wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                                        _this.scrollTop = 0;
                                        _this.OrderSFilterVisible = false;
                                        _this.CurrentOrderSFilterName = '';
                                        _this.myGetOrderList();
                                    }, 2000);
                                },
                                fail: function () {
                                    toast_1["default"].fail('订单支付失败');
                                }
                            });
                        }
                        else {
                            toast_1["default"].fail('订单支付失败');
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
                toast_1["default"].loading({
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
                        toast_1["default"].clear();
                        if (res && res.data && res.data.code == '0') {
                            toast_1["default"].success('取消订单成功');
                            setTimeout(function () {
                                _this.filterForm = __assign(__assign({}, _this.filterForm), { pageNo: 1 });
                                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                                _this.scrollTop = 0;
                                _this.OrderSFilterVisible = false;
                                _this.CurrentOrderSFilterName = '';
                                _this.myGetOrderList();
                            }, 2000);
                        }
                        else {
                            toast_1["default"].fail('取消订单失败');
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
                        _this.filterForm = __assign(__assign({}, _this.filterForm), { agentId: item.key });
                    }
                }, _this.filter.itemAgent);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectDelivery: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.code == key) {
                        _this.deliveryPopupName = item.name;
                        _this.filterForm = __assign(__assign({}, _this.filterForm), { trans: item.code });
                    }
                }, _this.deliveryMethod);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectPurchaseType: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.key == key) {
                        _this.purchasePopupName = item.value;
                        _this.filterForm = __assign(__assign({}, _this.filterForm), { purchaseTypeId: item.key });
                    }
                }, _this.purchaseType);
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
                _this.agentPopup = !_this.agentPopup;
            },
            touchOrderSFilter: function (name) {
                console.log(name);
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
                if (['orderType', 'orderStatus', 'auditStatus', 'getLocation'].indexOf(name) > -1) {
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
            //选择区
            onSelectOrderTypeCode: function (data) {
                var orderTypeCode = data.currentTarget.dataset.id;
                this.storeFilterForm = __assign(__assign({}, this.storeFilterForm), { page: 1 });
                this.storeFilterForm.queryParamList[3].value = orderTypeCode;
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            //智能筛选
            onSelectStatus: function (sortType) {
                this.storeFilterForm = __assign(__assign({}, this.storeFilterForm), { sortType: sortType, page: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectSOStatus: function (sapOrderStatus) {
                this.filterForm = __assign(__assign({}, this.filterForm), { sapOrderStatus: sapOrderStatus, pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectOrg: function (org) {
                var key = org.key, value = org.value;
                if (this.filterForm.orgId === key) {
                    this.filterForm = __assign(__assign({}, this.filterForm), { orgId: '' });
                    this.filterFormExtra = __assign(__assign({}, this.filterFormExtra), { orgName: '' });
                    return;
                }
                this.filterForm = __assign(__assign({}, this.filterForm), { orgId: key });
                this.filterFormExtra = __assign(__assign({}, this.filterFormExtra), { orgName: value });
                this.agentPopup = false;
            },
            // 选择物料组
            onSelectmatkl: function (matkl) {
                var key = matkl.key, value = matkl.value;
                if (this.filterForm.matklId === key) {
                    this.filterForm = __assign(__assign({}, this.filterForm), { matklId: '' });
                    this.filterFormExtra = __assign(__assign({}, this.filterFormExtra), { matklName: '' });
                    return;
                }
                this.filterForm = __assign(__assign({}, this.filterForm), { matklId: key });
                this.filterFormExtra = __assign(__assign({}, this.filterFormExtra), { matklName: value });
            },
            // 选择常用标签
            onSelectComuseLabel: function (label) {
                if (this.storeFilterForm.label === label) {
                    this.storeFilterForm = __assign(__assign({}, this.storeFilterForm), { label: '' });
                    return;
                }
                this.storeFilterForm = __assign(__assign({}, this.storeFilterForm), { label: label });
            },
            //选择营销模式
            onSelectSaleMode: function (saleModal) {
                var name = saleModal.name, key = saleModal.key;
                if (this.storeFilterForm.marketModel === key) {
                    this.storeFilterForm = __assign(__assign({}, this.storeFilterForm), { marketModel: '' });
                    return;
                }
                this.storeFilterForm = __assign(__assign({}, this.storeFilterForm), { marketModel: key });
            },
            //选择门店类型
            onSelectStoreType: function (storeType) {
                var name = storeType.name, key = storeType.key;
                if (this.storeFilterForm.queryParamList[0].field === key && this.storeFilterForm.queryParamList[0].value === '1') {
                    this.storeFilterForm.queryParamList[0].value === '0';
                    return;
                }
                this.storeFilterForm.queryParamList[0].value = '1';
                this.storeFilterForm.queryParamList[0].field = key;
            },
            //选择门店级别
            onSelectShopLevel: function (storeLevel) {
                var name = storeLevel.name, key = storeLevel.key;
                if (this.storeFilterForm.shopLevel === key) {
                    this.storeFilterForm = __assign(__assign({}, this.storeFilterForm), { shopLevel: '' });
                    return;
                }
                this.storeFilterForm = __assign(__assign({}, this.storeFilterForm), { shopLevel: key });
            },
            onZzprdmodelChange: function (e) {
                this.filterForm = __assign(__assign({}, this.filterForm), { zzprdmodel: e.detail });
            },
            onOrderCodeChange: function (e) {
                this.filterForm = __assign(__assign({}, this.filterForm), { orderCode: e.detail });
            },
            onToggleTimeFrame: function () {
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            onSelectTimeFrame: function (timeFrame) {
                this.filterForm = __assign(__assign({}, this.filterForm), { timeFrame: timeFrame });
            },
            onSubmitFilterForm: function () {
                this.filterForm = __assign(__assign({}, this.filterForm), { pageNo: 1 });
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
                this.filterForm = __assign(__assign({}, this.filterForm), (_a = {}, _a[name] = '', _a));
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.filterForm = __assign(__assign({}, this.filterForm), (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
            onGetOrderListNext: function () {
                var totalPages = this.storeList.totalPages;
                if (totalPages > this.storeFilterForm.page) {
                    this.filterForm = __assign(__assign({}, this.storeFilterForm), { page: this.storeFilterForm.page + 1 });
                    this.myGetStoreList();
                }
            },
            takeAgainOrder: function (id) {
                toast_1["default"].loading({
                    message: '下单中....',
                    duration: 0
                });
                this.methods.againCommonOrder({ id: id }, function (res) {
                    var data = res.data;
                    if (data && data.cartOrder) {
                        toast_1["default"].clear();
                        wx.navigateTo({
                            url: '/pages/goods/order/index?type=again'
                        });
                    }
                    else {
                        toast_1["default"].fail(data.msg || '结算失败');
                    }
                });
            },
            //代理商取消订单
            canceleOrder: function (id) {
                toast_1["default"].loading({
                    message: '取消中....',
                    duration: 0
                });
                this.methods.agentCanceleOrder({ id: id }, function (res) {
                    var data = res.data;
                    if (data && data.code === '0') {
                        toast_1["default"].clear();
                        wx.navigateTo({
                            url: '/pages/goods/order/index?type=again'
                        });
                    }
                    else {
                        toast_1["default"].fail(data.msg || '取消失败');
                    }
                });
            },
            //获取门店列表
            getStoreListMethods: function (data) {
                store_1.getStoreList(data, function (res) {
                    _this.storeList = res.data.data;
                    _this.$apply();
                });
            },
            //获取用户是否授权地址
            getUserScopeLocation: function () { return __awaiter(_this, void 0, void 0, function () {
                var isScope;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.methods.getUserIsScopeLocation()];
                        case 1:
                            isScope = _a.sent();
                            this.isUserScopeLoction = isScope.storage;
                            this.isGetLocation = isScope.isScope;
                            if (isScope.isScope)
                                this.methods.getLocationFromWx();
                            this.$apply();
                            return [2 /*return*/];
                    }
                });
            }); },
            //授权后的回调
            isScopeLocation: function (e) {
                wx.setStorageSync('scopeUserLocation', JSON.stringify(e.detail.authSetting['scope.userLocation']));
                _this.methods.getUserScopeLocation();
            },
            //获取用户授权状态
            getUserIsScopeLocation: function () {
                return new Promise(function (resolve, reject) {
                    wx.getSetting({
                        success: function (res) {
                            //授权用户信息
                            if (res.authSetting['scope.userLocation']) {
                                // 已经授权，可以直接调用 地址权限
                                wx.setStorageSync('scopeUserLocation', 'true');
                                var data = {
                                    isScope: true,
                                    storage: 'true'
                                };
                                resolve(data);
                            }
                            else {
                                var data = {
                                    isScope: false,
                                    storage: wx.getStorageSync('scopeUserLocation') || 'true'
                                };
                                resolve(data);
                            }
                        }
                    });
                });
            },
            // 调用微信获取位置
            getLocationFromWx: function () {
                wx.getLocation({
                    type: 'wgs84',
                    success: function (res) {
                        console.log(res);
                        var latitude = res.latitude;
                        var longitude = res.longitude;
                        var speed = res.speed;
                        var accuracy = res.accuracy;
                    }, fail: function (err) {
                        console.log(err);
                        // errMsg: "getLocation:fail auth deny"
                        if (err.errMsg == "getLocation:fail auth deny") {
                            wx.setStorageSync('scopeUserLocation', 'false');
                            _this.methods.getUserScopeLocation();
                        }
                    }
                });
            },
            //获取地区接口 获取省
            getComRegion: function () { return __awaiter(_this, void 0, void 0, function () {
                var data;
                var _this = this;
                return __generator(this, function (_a) {
                    data = {
                        regionType: '1',
                        id: ''
                    };
                    store_1.getComRegion(data, function (res) {
                        console.log(res);
                        _this.provinceList = res.data.regionList;
                        _this.$apply();
                        data = __assign(__assign({}, data), { provinceName: _this.provinceList[0].provinceName, id: _this.provinceList[0].id, type: 1 });
                        _this.methods.onSelectProvince(data);
                    });
                    return [2 /*return*/];
                });
            }); },
            // 地区/距离切换
            regionDisSwitch: function (e) {
                _this.isRegionSwitch = e == '1' ? true : false;
            },
            // 选择距离
            onSelectStoreDistanceCode: function (e) {
                var distance = e.currentTarget.dataset.id;
                _this.storeFilterForm = __assign(__assign({}, _this.storeFilterForm), { distance: distance, page: 1 });
                _this.scrollTop = 0;
                _this.methods.touchOrderSFilter();
            },
            //选择省市  begin
            //选择省
            onSelectProvince: function (e) {
                var id = e.id, provinceName = e.provinceName, type = e.type;
                _this.provinceName = provinceName;
                var data = {
                    regionType: '2',
                    id: id
                };
                _this.storeFilterForm.queryParamList[1].value = id;
                store_1.getComRegion(data, function (res) {
                    console.log(res);
                    _this.isSelectProvince = type ? true : false;
                    _this.cityList = res.data.regionList;
                    _this.storeFilterForm.queryParamList[2].value = res.data.regionList[0].id;
                    _this.$apply();
                    data = __assign(__assign({}, data), { id: _this.storeFilterForm.queryParamList[2].value, cityName: res.data.regionList[0].cityName, type: type });
                    _this.methods.onSelectCity(data);
                });
            },
            //选择市
            onSelectCity: function (e) {
                var id = e.id, cityName = e.cityName, type = e.type;
                var data = {
                    regionType: '3',
                    id: id
                };
                _this.cityName = cityName;
                _this.storeFilterForm.queryParamList[2].value = id;
                store_1.getComRegion(data, function (res) {
                    _this.isSelectProvince = type ? true : false;
                    _this.regionList = res.data.regionList;
                    _this.$apply();
                });
            },
            onSelectSwitch: function (type) {
                if (type == 'province') {
                    this.isSelectProvince = true;
                }
                else {
                    this.isSelectProvince = false;
                }
            }
        };
        return _this;
    }
    Filter.prototype.myGetOrderList = function () {
        this.methods.getOrderList(this.filterForm);
    };
    Filter.prototype.myGetStoreList = function () {
        this.methods.getStoreListMethods(this.storeFilterForm);
    };
    Filter.prototype.onShow = function () {
        this.methods.getOrderDeliveryMethod({ type: '' });
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        this.filterForm = __assign(__assign({}, this.filterForm), { 
            // beginDate: `${now.getFullYear()}-01-01`,
            beginDate: index_1.getLastMonthYesterday(), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
        this.myGetOrderList();
        this.methods.getOrderFilter({ type: 1 });
    };
    Filter.prototype.onLoad = function () {
        var data = {
            cisCode: "7146896",
            longitude: "121.506656",
            latitude: "31.245087",
            distance: "",
            matkls: [],
            label: "",
            marketModel: "",
            shopLevel: "",
            sortType: "1",
            page: 1,
            pageSize: 10,
            queryPage: {
                queryParamList: [{
                        field: "isBrandGarden",
                        value: "0"
                    },
                    {
                        field: "custShopInfo.province.id",
                        value: 23957
                    },
                    {
                        field: "custShopInfo.city.id",
                        value: 23505
                    },
                    {
                        field: "custShopInfo.county.id",
                        value: 23403
                    }]
            }
        };
        this.methods.getStoreListMethods(data);
        this.methods.getUserScopeLocation();
        this.methods.getComRegion();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            // orderList({ order }) {
            //   return order.orderList
            // },
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
            }
        }, {
            getOrderList: order_1.getOrderList,
            getOrderFilter: order_1.getOrderFilter,
            againCommonOrder: order_2.againCommonOrder,
            getOrderDeliveryMethod: order_1.getOrderDeliveryMethod,
            agentCanceleOrder: order_2.agentCanceleOrder
        })
    ], Filter);
    return Filter;
}(wepy_1["default"].page));
exports["default"] = Filter;
