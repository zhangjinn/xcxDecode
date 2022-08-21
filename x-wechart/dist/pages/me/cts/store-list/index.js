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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var store_1 = require('./../../../../store/actions/store.js');
var store_detail_1 = require('./../../../../store/actions/store-detail.js');
var order_1 = require('./../../../../store/actions/order.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_1 = require('./../../../../utils/index.js');
var request_1 = require('./../../../../utils/request.js');
/* import utilsWxs from '../../../../wxs/utils.wxs'; */
var index_2 = require('./../../../../components/empty-data-type/index.js');
var index_3 = require('./../../../components/header-tab/index.js');
var order_2 = require('./../../../../store/actions/order.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var order_3 = require('./../../../../store/types/order.js');
var toast_2 = require('./../../../../components/vant/toast/toast.js');
var amapFile = require('./../../../../utils/amap-wx.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '我的门店',
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
                "van-checkbox": "/components/vant/checkbox/index",
            },
        };
        _this.data = {
            visible: false,
            imgSrc: "data:image/png;base64,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",
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
            isSinkChannel: 1,
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
            // 新增
            storeFilterForm: {
                cisCode: wepy_1.default.$instance.globalData.cisCode,
                longitude: "",
                latitude: "",
                matkls: [],
                matkl: '',
                shopFullName: '',
                label: "",
                marketModel: "",
                shopLevel: "",
                distance: '',
                sortType: "",
                isSinkChannel: "1",
                isBrandGarden: "",
                isSpecialShop: "",
                isSmartShop: "",
                provinceId: "",
                cityId: "",
                countyId: "",
                townId: "",
                page: 1,
                pageSize: 10,
                queryParamList: [],
            },
            // storeFilterForm:{"cisCode":"7111367","longitude":120.38299,"latitude":36.06623,"matkls":[],"shopFullName":"","label":"","marketModel":"","shopLevel":"","sortType":"","page":1,"pageSize":10,"queryParamList":[{"field":"custShopInfo.province.id","value":21244},{"field":"custShopInfo.city.id","value":19545}],"loginType":"CS"},
            // 请求参数中省市区;  对应传参移动到了storeFilterForm中
            queryParamListLocation: [
                {
                    field: "custShopInfo.province.id",
                    value: ''
                },
                {
                    field: "custShopInfo.city.id",
                    value: ''
                },
            ],
            // 请求参数中门店类型
            queryParamListStoreType: [{ value: '1', field: 'isSinkChannel' }],
            storeLocaForm: {},
            isUserMakeCall: false,
            storeList: [],
            totalPages: 0,
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
                //   {name: "下沉渠道", key: "isSinkChannel"},
                { name: "智慧生活馆", key: "isSmartShop" }
            ],
            storeLevel: [
                { name: "S-体验店", key: "14170992126" },
                { name: "A-旗舰店", key: "14170992127" },
                { name: "B-标准店", key: "14170992128" },
                { name: "C-基础店", key: "14170992129" }
            ],
            getStoryPersons: [],
            MapKey: 'eea2c7fc3b01842c3d125cd1587e6aa6',
            checked: false,
            isMe: 0,
            hasShopList: null,
            adminAccount: {},
            custAccountList: [],
            loginSystemList: [],
            baseMatklList: [],
            accountNames: [],
            headerTabList: [
                { name: '行政区/距离', type: 'orderType', selectValue: '' },
                { name: '智能排序', type: 'orderStatus', selectValue: '' },
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
            onChange: function (event) {
                this.checked = event.detail;
                if (this.checked == true) {
                    this.isMe = 1;
                }
                else {
                    this.isMe = 0;
                }
            },
            //门店列表导航功能
            toStoreMap: function (data) {
                var latitude = data.latitude, longitude = data.longitude, shAddress = data.shAddress, fullName = data.fullName;
                wx.openLocation({
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                    name: fullName,
                    address: shAddress,
                    scale: 18,
                });
            },
            //门店列表拨打电话
            toStoreMakeCall: function (data) {
                var tel = data.tel;
                wx.makePhoneCall({
                    phoneNumber: tel,
                });
            },
            //门店巡店
            toStoreIn: function (data) {
                wx.navigateTo({
                    url: '/pages/terminal/addrecord/index?data=' + JSON.stringify(data),
                });
            },
            //门店详情
            toStoreDetail: function () { },
            //门店地图
            navigateTo: function (pageUrl) {
                // wx.navigateTo({
                //   url:pageUrl,
                // })
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
            sinkChange: function (isSink) {
                _this.isSinkChannel = isSink;
                if (isSink == 1) {
                    _this.queryParamListStoreType[0].value = '1';
                    _this.queryParamListStoreType[0].field = 'isSinkChannel';
                    _this.storeFilterForm = __assign({}, _this.storeFilterForm, { isSinkChannel: '1' });
                }
                else {
                    _this.queryParamListStoreType[0].value = '0';
                    _this.queryParamListStoreType[0].field = '';
                    _this.storeFilterForm = __assign({}, _this.storeFilterForm, { isSinkChannel: '0' });
                }
                _this.storeFilterForm = __assign({}, _this.storeFilterForm, { page: 1 });
                _this.scrollTop = 0;
                _this.storeList = [];
                _this.myGetStoreList();
                _this.$apply();
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
                var orderTypeCode = data.currentTarget.dataset.id.id;
                this.storeFilterForm = __assign({}, this.storeFilterForm, { page: 1 });
                var areaData = {
                    field: 'custShopInfo.county.id',
                    value: orderTypeCode
                };
                if (this.queryParamListLocation.length > 2) {
                    this.queryParamListLocation[2] = areaData;
                }
                else {
                    this.queryParamListLocation.push(areaData);
                }
                this.storeFilterForm = __assign({}, this.storeFilterForm, { countyId: orderTypeCode });
                this.headerTabList[0].selectValue = orderTypeCode;
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.storeList = [];
                this.myGetStoreList();
            },
            //智能筛选
            onSelectStatus: function (sortType) {
                this.storeFilterForm = __assign({}, this.storeFilterForm, { sortType: sortType, page: 1 });
                this.headerTabList[1].selectValue = sortType;
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.storeList = [];
                this.myGetStoreList();
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
            // 选择物料组
            onSelectmatkl: function (index) {
                var matklGroupValue = this.filter.itemgroup[index].key;
                var storeFilterFormMatkls = this.storeFilterForm.matkls;
                // if (this.filter.itemgroup[index].active) {
                //   storeFilterFormMatkls.forEach((item,index) => {
                //     if(item == matklGroupValue) {
                //       storeFilterFormMatkls.splice(index,1)
                //     }
                //   })
                //   this.filter.itemgroup[index]['active'] = false;
                // } else {
                //   this.filter.itemgroup[index]['active'] = true;
                //   storeFilterFormMatkls.push(matklGroupValue)
                // }
                this.filter.itemgroup = this.filter.itemgroup.map(function (item, idx) {
                    item['active'] = false;
                    return item;
                });
                if (matklGroupValue != this.storeFilterForm.matkls.toString()) {
                    this.filter.itemgroup[index]['active'] = true;
                    storeFilterFormMatkls = [matklGroupValue];
                }
                else {
                    storeFilterFormMatkls = [];
                }
                this.storeFilterForm = __assign({}, this.storeFilterForm, { matkls: storeFilterFormMatkls, matkl: storeFilterFormMatkls.toString() });
                this.$apply();
            },
            // 选择常用标签
            onSelectComuseLabel: function (label) {
                if (this.storeFilterForm.label === label) {
                    this.storeFilterForm = __assign({}, this.storeFilterForm, { label: '' });
                    return;
                }
                this.storeFilterForm = __assign({}, this.storeFilterForm, { label: label });
            },
            //选择营销模式
            onSelectSaleMode: function (saleModal) {
                var name = saleModal.name, key = saleModal.key;
                if (this.storeFilterForm.marketModel === key) {
                    this.storeFilterForm = __assign({}, this.storeFilterForm, { marketModel: '' });
                    return;
                }
                this.storeFilterForm = __assign({}, this.storeFilterForm, { marketModel: key });
            },
            //选择门店类型
            onSelectStoreType: function (storeType) {
                var name = storeType.name, key = storeType.key;
                var data = {
                    value: '0',
                    field: key,
                };
                var queryParamListLength = this.queryParamListStoreType.length;
                var queryParamListLengthChoose = queryParamListLength - 1;
                if (queryParamListLength <= 0 || queryParamListLength == 4) {
                    this.queryParamListStoreType.push(data);
                }
                if (this.queryParamListStoreType[0].field === 'pt' && this.queryParamListStoreType[0].value === '0') {
                    this.queryParamListStoreType = [];
                    this.queryParamListStoreType = [
                        {
                            field: 'isBrandGarden',
                            value: '0'
                        },
                        {
                            field: 'isSmartShop',
                            value: '0'
                        },
                        {
                            field: 'isSinkChannel',
                            value: '0'
                        },
                        {
                            field: 'isSpecialShop',
                            value: '0'
                        },
                    ];
                    this.storeFilterForm = __assign({}, this.storeFilterForm, { isSinkChannel: '0', isBrandGarden: '0', isSpecialShop: '0', isSmartShop: '0' });
                    return;
                }
                else if (queryParamListLengthChoose != '-1' && (this.queryParamListStoreType[queryParamListLengthChoose].field === key && this.queryParamListStoreType[queryParamListLengthChoose].value === '1') || queryParamListLength == 4) {
                    this.queryParamListStoreType = [];
                    return;
                }
                this.queryParamListStoreType[0].value = '1';
                this.queryParamListStoreType[0].field = key;
                this.storeFilterForm[key] = '1';
                this.$apply();
            },
            //输入框搜索
            bindconfirm: function (e) {
                var value = e.detail.value;
                _this.storeFilterForm = __assign({}, _this.storeFilterForm, { shopFullName: value, page: 1 });
                _this.storeList = [];
                _this.myGetStoreList();
            },
            //选择门店级别
            onSelectShopLevel: function (storeLevel) {
                var name = storeLevel.name, key = storeLevel.key;
                if (this.storeFilterForm.shopLevel === key) {
                    this.storeFilterForm = __assign({}, this.storeFilterForm, { shopLevel: '' });
                    return;
                }
                this.storeFilterForm = __assign({}, this.storeFilterForm, { shopLevel: key });
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
                this.storeFilterForm = __assign({}, this.storeFilterForm, { page: 1 });
                this.scrollTop = 0;
                this.storeList = [];
                this.myGetStoreList();
                this.methods.orderfiltering();
                // this.methods.getAccountList()
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
                if (this.totalPages > this.storeFilterForm.page) {
                    this.storeFilterForm = __assign({}, this.storeFilterForm, { page: this.storeFilterForm.page + 1 });
                    this.myGetStoreList();
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
            },
            //获取门店列表
            getStoreListMethods: function () { return __awaiter(_this, void 0, void 0, function () {
                var that, hasShopList, data_1, myShopInfo, e_1, data, storeList;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            that = this;
                            toast_2.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
                            if (!!Array.isArray(this.hasShopList)) return [3 /*break*/, 5];
                            hasShopList = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            data_1 = JSON.parse(JSON.stringify(this.storeFilterForm));
                            data_1.isMine = '1';
                            return [4 /*yield*/, this.methods.getStoreList(data_1)
                                // const adminInfo = await this.methods.getCustomerAccount({})
                                // const myShopInfo = await this.methods.getShopListByCustId({custAccountId:adminInfo.payload.adminAccount.id})
                            ];
                        case 2:
                            myShopInfo = _a.sent();
                            // const adminInfo = await this.methods.getCustomerAccount({})
                            // const myShopInfo = await this.methods.getShopListByCustId({custAccountId:adminInfo.payload.adminAccount.id})
                            if (myShopInfo.payload && myShopInfo.payload.data) {
                                hasShopList = myShopInfo.payload.data.content || [];
                                hasShopList.forEach(function (it) {
                                    it.isme = true;
                                });
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            console.log(e_1);
                            return [3 /*break*/, 4];
                        case 4:
                            this.hasShopList = hasShopList;
                            _a.label = 5;
                        case 5:
                            this.storeFilterForm.queryParamList = this.queryParamListLocation.concat(this.queryParamListStoreType);
                            data = this.storeFilterForm;
                            storeList = this.storeList;
                            this.methods.getStoreList(data, function (res) {
                                toast_2.default.clear();
                                if (res.data.data && res.data.data.content) {
                                    res.data.data.content.forEach(function (element) {
                                        storeList.push(element);
                                    });
                                }
                                _this.totalPages = 0;
                                if (_this.isMe == 1) {
                                    var showList = [];
                                    for (var i = 0; i < _this.storeList.length; i++) {
                                        for (var j = 0; j < _this.hasShopList.length; j++) {
                                            if (_this.storeList[i].shopId == _this.hasShopList[j].shopId) {
                                                showList.push(_this.storeList[i]);
                                                _this.storeList[i].isme = true;
                                            }
                                        }
                                    }
                                    if (res.data.data && res.data.data.totalPage) {
                                        _this.totalPages = res.data.data.totalPage;
                                    }
                                    _this.storeList = showList;
                                }
                                else {
                                    for (var i = 0; i < _this.storeList.length; i++) {
                                        for (var j = 0; j < _this.hasShopList.length; j++) {
                                            if (_this.storeList[i].shopId == _this.hasShopList[j].shopId) {
                                                _this.storeList[i].isme = true;
                                            }
                                        }
                                    }
                                    if (res.data.data && res.data.data.totalPage) {
                                        _this.totalPages = res.data.data.totalPage;
                                    }
                                    _this.storeList = storeList;
                                }
                                //筛选下沉或自有
                                _this.storeList = _this.storeList.filter(function (m) { return that.isSinkChannel == '1' ? m.isSinkChannel == '1' : m.isSinkChannel == '0'; });
                                _this.storeList.sort(function (a, b) {
                                    return a.distance - b.distance;
                                });
                                _this.$apply();
                            });
                            return [2 /*return*/];
                    }
                });
            }); },
            // 筛选重置
            onResetFilterForm: function () {
                _this.storeFilterForm = __assign({}, _this.storeFilterForm, { matkls: [], shopFullName: '', label: "", marketModel: "", shopLevel: "", distance: '', sortType: "", page: 1 });
                _this.checked = false;
                _this.isMe = 0;
                _this.queryParamListStoreType = [];
                _this.storeList = [];
                var newItemgroup = ramda_1.clone(_this.filter.itemgroup);
                newItemgroup.forEach(function (element, index) {
                    newItemgroup[index]['active'] = false;
                });
                _this.filter.itemgroup = newItemgroup;
                _this.myGetStoreList();
                _this.methods.orderfiltering();
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
                            this.isGetLocation = !isScope.isScope;
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
                                    storage: 'true',
                                };
                                resolve(data);
                            }
                            else {
                                var data = {
                                    isScope: false,
                                    storage: wx.getStorageSync('scopeUserLocation') || 'true',
                                };
                                resolve(data);
                            }
                        },
                    });
                });
            },
            // 调用微信获取位置
            getLocationFromWx: function () {
                _this.isGetLocation = false;
                _this.$apply();
                var myAmapFun = new amapFile.AMapWX({ key: _this.MapKey });
                myAmapFun.getRegeo({
                    success: function (data) {
                        var _a = data[0], latitude = _a.latitude, longitude = _a.longitude;
                        var addressComponent = data[0].regeocodeData.addressComponent;
                        var province = addressComponent.province, city = addressComponent.city;
                        _this.storeFilterForm = __assign({}, _this.storeFilterForm, { latitude: latitude, longitude: longitude });
                        _this.storeLocaForm = __assign({}, _this.storeLocaForm, { province: province, city: city });
                        _this.methods.getComRegion();
                    },
                    fail: function (info) {
                        //失败回调
                        console.log('高德获取位置失败', info);
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
                        _this.provinceList = res.data.regionList;
                        var index = 0;
                        res.data.regionList.forEach(function (item, i) {
                            if (item.provinceName == _this.storeLocaForm.province) {
                                index = i;
                            }
                        });
                        _this.$apply();
                        data = __assign({}, data, { provinceName: _this.provinceList[index].provinceName, id: _this.provinceList[index].id, type: 1 });
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
                _this.storeFilterForm = __assign({}, _this.storeFilterForm, { distance: distance, page: 1 });
                _this.scrollTop = 0;
                _this.methods.touchOrderSFilter();
                _this.storeList = [];
                _this.myGetStoreList();
            },
            //选择省市  begin
            //选择省
            onSelectProvince: function (e) {
                var id = e.id, provinceName = e.provinceName, type = e.type;
                _this.provinceName = provinceName;
                var data = {
                    regionType: '2',
                    id: id,
                };
                _this.queryParamListLocation[0].value = id;
                _this.storeFilterForm = __assign({}, _this.storeFilterForm, { provinceId: id, cityId: '', countyId: '' });
                store_1.getComRegion(data, function (res) {
                    _this.isSelectProvince = type ? true : false;
                    _this.cityList = res.data.regionList;
                    var index = 0;
                    if (type) {
                        res.data.regionList.forEach(function (item, i) {
                            if (item.cityName == _this.storeLocaForm.city) {
                                index = i;
                            }
                        });
                    }
                    _this.queryParamListLocation[1].value = res.data.regionList[index].id;
                    _this.storeFilterForm = __assign({}, _this.storeFilterForm, { cityId: res.data.regionList[index].id, countyId: '' });
                    _this.$apply();
                    data = __assign({}, data, { id: _this.queryParamListLocation[1].value, cityName: res.data.regionList[index].cityName, type: type });
                    _this.methods.onSelectCity(data, '0');
                });
            },
            //选择市   isClick = 1 在页面中点击省，点击完毕弹框关闭
            onSelectCity: function (e, isClick) {
                var id = e.id, cityName = e.cityName, type = e.type;
                var data = {
                    regionType: '3',
                    id: id,
                };
                _this.cityName = cityName;
                _this.storeLocaForm.city = cityName;
                _this.queryParamListLocation[1].value = id;
                _this.storeFilterForm = __assign({}, _this.storeFilterForm, { cityId: id, countyId: '' });
                store_1.getComRegion(data, function (res) {
                    _this.isSelectProvince = type ? true : false;
                    _this.regionList = res.data.regionList;
                    _this.$apply();
                });
                _this.myGetStoreList();
                if (isClick == '1') {
                    _this.OrderSFilterVisible = false;
                }
            },
            onSelectSwitch: function (type) {
                if (type == 'province') {
                    this.isSelectProvince = true;
                }
                else {
                    this.isSelectProvince = false;
                }
            },
            // 打开电话弹框
            openMakeCall: function (item) {
                var _this = this;
                var shopCisCode = item.shopCisCode;
                var data = { storeCode: shopCisCode, serviceCode: 'getStoryPersons' };
                store_detail_1.getStoryPersons(data, function (res) {
                    _this.getStoryPersons = res.data.returnData;
                    _this.isUserMakeCall = true;
                    _this.$apply();
                });
            },
            // 关闭电话弹框
            closeMakeCall: function () {
                this.isUserMakeCall = false;
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Filter.prototype.myGetOrderList = function () {
        // this.methods.getOrderList(this.filterForm);
    };
    Filter.prototype.myGetStoreList = function () {
        this.methods.getStoreListMethods();
    };
    Filter.prototype.onShow = function () {
        this.storeFilterForm = __assign({}, this.storeFilterForm, { cisCode: wepy_1.default.$instance.globalData.cisCode });
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        this.filterForm = __assign({}, this.filterForm, { 
            // beginDate: `${now.getFullYear()}-01-01`,
            beginDate: index_1.getLastMonthYesterday(), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
        this.$apply();
    };
    Filter.prototype.onLoad = function () {
        this.methods.getUserScopeLocation();
        // 查询物料组等筛选条件列表
        this.methods.getOrderFilter();
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
                var store = _a.store;
                return store.filter;
            },
        }, {
            getOrderList: order_1.getOrderList,
            getOrderFilter: store_1.getOrderFilter,
            getStoreList: store_1.getStoreList,
            againCommonOrder: order_2.againCommonOrder,
            getOrderDeliveryMethod: order_1.getOrderDeliveryMethod,
            agentCanceleOrder: order_2.agentCanceleOrder,
            getCustomerAccount: store_1.getCustomerAccount,
            getShopListByCustId: store_1.getShopListByCustId
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/cts/store-list/index'));

