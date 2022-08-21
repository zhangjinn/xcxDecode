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
var index_1 = require('./../../../utils/index.js');
var home_1 = require('./../../../store/actions/home.js');
var notice_1 = require('./../../../store/actions/notice.js');
var common_1 = require('./../../../mixins/common.js');
var index_2 = require('./../../../components/echarts/index.js');
var index_3 = require('./../../components/scrollBar/index.js');
var _a = wepy_1.default.$appConfig, baseUrl = _a.baseUrl, imgUrl = _a.imgUrl;
var customize_charts_1 = require('./../../../utils/customize-charts.js');
/* import utilsWxs from '../../../wxs/utils.wxs' */
var wxCharts = require('./../../../utils/wxcharts.js');
var home_2 = require('./../../../store/types/home.js');
var notice_2 = require('./../../../store/types/notice.js');
var user_1 = require('./../../../store/actions/user.js');
var purchasereport_1 = require('./../../../store/actions/purchasereport.js');
var distributorsorder_1 = require('./../../../store/actions/distributorsorder.js');
var consultTodo_1 = require('./../../../store/actions/consultTodo.js');
var request_1 = require('./../../../utils/request.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mixins = [common_1.default];
        _this.config = {
            navigationBarTitleText: 'Hisense信天翁',
            // navigationStyle: 'custom',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-search': '../../../components/vant/search/index',
                'van-tab': '../../../components/vant/tab-items/index',
                'van-tabs': '../../../components/vant/tabs-items/index',
                'van-circle': '../../../components/vant/circle/index',
                'van-transition': '../../../components/vant/transition/index',
                'ec-canvas': '/components/ec-canvas/ec-canvas',
                'van-progress': '../../../components/vant/progress/index',
            },
            enablePullDownRefresh: true
        };
        _this.$repeat = {};
        _this.$props = { "chartOverview": { "v-bind:option.sync": "optionOverview", "canvasId": "overview", "width": "150px", "height": "150px" }, "chartInventory": { "v-bind:option.sync": "optionInventory", "canvasId": "inventory", "width": "150px", "height": "150px" }, "chartSalesAmount": { "v-bind:option.sync": "optionSalesAmount", "canvasId": "salesAmount", "width": "100px", "height": "100px" }, "chartSalesQuantity": { "v-bind:option.sync": "optionSalesQuantity", "canvasId": "salesQuantity", "width": "100px", "height": "100px" }, "chartDistributionRun": { "v-bind:option.sync": "optionDistributionRun", "canvasId": "distributionRun", "width": "100px", "height": "100px" }, "chartSinkingStore": { "v-bind:option.sync": "optionSinkRunNum", "canvasId": "sinkingStore", "width": "100px", "height": "100px" }, "scrollBar": { "xmlns:v-bind": "", "v-bind:translateX.sync": "swiperCurrentPosition" }, "scrollBar1": { "v-bind:translateX.sync": "scrollCurrentPosition", "bgColorOut": "#EEEEEE", "bgColorInner": "#CCCCCC", "v-bind:isAnimationDelay.sync": "isAnimationDelay" } };
        _this.$events = {};
        _this.components = {
            chart: index_2.default,
            chart1: index_2.default,
            chart2: index_2.default,
            chart3: index_2.default,
            chartOverview: index_2.default,
            chartInventory: index_2.default,
            chartSalesAmount: index_2.default,
            chartSalesQuantity: index_2.default,
            chartDistributionRun: index_2.default,
            chartSinkingStore: index_2.default,
            scrollBar: index_3.default,
            scrollBar1: index_3.default,
        };
        _this.data = {
            swiperCurrentPosition: 0,
            scrollCurrentPosition: 0,
            isAnimationDelay: false,
            deviceInfo: {},
            option: {},
            active: 0,
            activeName: '',
            key: '',
            current: 0,
            coverageDataOption: null,
            searchHistory: [],
            gicWarehouseType: '',
            warehouseList: [
                {
                    id: '',
                    value: '全部'
                },
                {
                    id: '005',
                    value: '自有仓'
                },
                {
                    id: '003',
                    value: '共享仓'
                }
            ],
            loginStatus: false,
            ringChart: {},
            hiddenName: 'hidden',
            showPop: false,
            selNotice: {},
            incomeData: {},
            showCoverageDataOption: false,
            permission: {
                // reportArea: [], // 报表模块
                specialArea: [],
                pendingArea: [],
            },
            gradientColor: {
                '0%': '#8FE7E3',
                '100%': '#59CDC8',
            },
            canvasImg: '',
            sanLiuLingExperienceList: {},
            masterSwitch: 'Y',
            imgObj: {
                'activityAreaBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1641779156553_8851e3702a5649c3b1c3a29a882b4f0b.png',
                'engineeringZone': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529662_eb2b2000f837465488637af3eb3cd4cd.png',
                'specialZone': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529822_ff0fa19d00b24ecf92a3ba33c67faa31.png',
                'setPurchaseArea': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529819_9d314a33b8db4cc08a8289dbb345dcf0.png',
                'customizedArea': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529611_1051fbe5494345328cecb7a99f903940.png',
                'notLoggedInLogo': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518748_ffe9f08ba6f745b1af65fdb0601c39a7.png',
                'noticeHead': 'http://3s-static.hisense.com/wechat/1/14722429883/1649727222892_00461b7f6378430a9a37df76b4481a2e.png',
                'informationCenter': 'http://3s-static.hisense.com/wechat/1/14722429883/1641778790131_03ddfd3e88fe4597b78dbcdb302fe0f7.png',
                'tvArea': 'http://3s-static.hisense.com/wechat/1/14722429883/1641778790489_7c863ac58a59492f9e67e0e5869a86ea.png',
                'refrigeratorArea': 'http://3s-static.hisense.com/wechat/1/14722429883/1641778790301_cc3f56dc636a4b07b3f411b28d5a09e4.png',
                'airConditioningArea': 'http://3s-static.hisense.com/wechat/1/14722429883/1641778702322_c37b95744cf5486ab2affa25ef231cfa.png',
                'xx': 'http://3s-static.hisense.com/wechat/1/14722429883/1658395805561_653da7f0ace143daa4ee5652a0ac8c05.png',
                'rise': 'http://3s-static.hisense.com/wechat/1/14722429883/1658395805278_e0c539124c264060a5be770ca5994ca9.png',
                'decline': 'http://3s-static.hisense.com/wechat/1/14722429883/1658395805303_9d41fd066868439bb08b337d6569e501.png',
            },
            specialAreaList: [],
            recentlyUsedList: [],
            pendingList: [
                { name: '待审核', num: '0', switchUrl: '/pages/dms/sales-distributors/index', isShow: false },
                { name: '待出库', num: '0', switchUrl: '/pages/dms/out-warehouse/list/index', isShow: false },
                { name: '待入库', num: '0', switchUrl: '/pages/goods/purchase-shop/index', isShow: false },
                { name: '退货待出库', num: '0', switchUrl: '/pages/dms/distributor-returns/list/index', isShow: false },
                { name: '退货待入库', num: '0', switchUrl: '/pages/dms/agent-returns/list/index', isShow: false },
                { name: '问卷', num: '0', switchUrl: '/pages/me/survey/index', isShow: false },
                { name: '公告', num: '0', switchUrl: '/pages/message/announcement/list/index', isShow: true },
                { name: '待办', num: '0', switchUrl: '/pages/message/upcoming/list/index', isShow: true },
                { name: '通知', num: '0', switchUrl: '/pages/message/notice/list/index', isShow: true },
            ],
            noticeTreat: {
                GG: [],
                TASK: [],
                MSG: [],
            },
            noticeActive: 'GG',
            noticeTimer: null,
            cardSwiperHeight: 0,
            html: '',
            showAgreementMask: false,
            version: '',
            canvasInfo: {
                width: 170,
                height: 90,
                lineWidth: 12,
                lineColorBig: '#E1E1E1',
                lineColorSmall: '#1890FF',
            },
            statisticsList: {
                checkIn: '0',
                shouldCheckIn: '0',
                ratio: '0%',
            },
            runningRate: {
                distributor: '',
                sinkingStore: '',
                distributorNum: '0',
                sinkingStoreNum: '0',
            },
            showSalesSummaryTip: false,
            optionOverview: {},
            optionInventory: {},
            optionSalesAmount: {},
            optionSalesQuantity: {},
            optionDistributionRun: {},
            optionSinkRunNum: {},
            reportData: {
                overview: {
                    totalScore: "",
                    ranking: "",
                    customerNum: "",
                    summaryScoreList: [
                        {
                            name: "全渠道口径出货",
                            fullScore: "",
                            score: "",
                            value: "0",
                            icon: ''
                        },
                        {
                            name: "分销网络拓展与维护",
                            fullScore: "",
                            score: "",
                            value: "0",
                            icon: 'distribution-network-icon'
                        },
                        {
                            name: "增值业务(前置渠道)",
                            fullScore: "",
                            score: "",
                            value: "0",
                            icon: 'value-added-icon'
                        },
                        {
                            name: "销售结构",
                            fullScore: "",
                            score: "",
                            value: "0",
                            icon: 'sales-structure-icon'
                        },
                    ]
                },
            },
            pickupSummary: {
                collectionDelivery: {},
                midHigProportion: {},
                dedicatedMachine: {},
            },
            salesSummary: {
                salesAmount: {
                    total: '',
                    compareLastMonth: '',
                    compareLastYear: '',
                    arrowMonth: '',
                    arrowYear: '',
                    proportion: [
                        { value: '0', name: '零售' },
                        { value: '0', name: '分销' },
                    ]
                },
                salesQuantity: {
                    total: '',
                    compareLastMonth: '',
                    compareLastYear: '',
                    arrowMonth: '',
                    arrowYear: '',
                    proportion: [
                        { value: '0', name: '零售' },
                        { value: '0', name: '分销' },
                    ]
                },
                frontChannel: {}
            },
            grossMargin: {},
            inventorySummary: {
                turnoverDays: '',
                compareLastMonth: '',
                arrowMonth: '',
                total: '',
                details: [],
                chartData: [0, 0, 0] // 图表传值，按details的顺序
            },
            developMaintain: {
                distributeNetwork: {},
                dynamicSales: {},
                singleOutput: {},
                marketCoverage: {},
                monthRun: {},
            },
        };
        /*  wxs =  */ /* {
           utils: utilsWxs
         } */
        _this.watch = {
            noticeActive: function (newValue) {
                _this.methods.noticeActiveListChange();
            },
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 进入登录页面
            onLogin: function () {
                wx.navigateTo({ url: '/pages/auth/wechat/index' });
            },
            // 系统公告弹框内容跳转到系统公告详情页
            goNoticeDetails: function (id) {
                if (id) {
                    wx.navigateTo({
                        url: '/pages/me/notice/detail/index?id=' + id
                    });
                }
            },
            warehouseChangeFun: function (e) {
                var id = e.target.dataset.id;
                _this.gicWarehouseType = id;
                var month = _this.getLastDay();
                _this.methods.getHomePageInventoryReport({
                    month: month,
                    operatorCode: wepy_1.default.$instance.globalData.cisCode,
                }).then(function (res) {
                    _this.methods.stockChangeFun();
                    _this.$apply();
                });
                _this.$apply();
            },
            stockChangeFun: function () {
                _this.hiddenName = (_this.loginStatus && _this.user.info.loginSystem.indexOf('14168810879') != -1) ? '' : 'hidden';
                if (_this.inventoryReport.series && _this.inventoryReport.series.length == 0) {
                    _this.inventoryReport.series = [{ name: '全部', data: 0, color: '#00AAA6', stroke: false }];
                }
                var popup = __assign({ animation: true, canvasId: 'ringCanvas', type: 'ring', extra: {
                        ringWidth: 20,
                        pie: {
                            offsetAngle: -45
                        }
                    }, subtitle: {
                        name: '库存总数',
                        color: '#AAAAAA',
                        fontSize: 10
                    }, disablePieStroke: true, width: 150, height: 150, dataLabel: false, legend: false, background: '#f5f5f5', padding: 20 }, _this.inventoryReport);
                _this.ringChart = new wxCharts(popup);
                _this.ringChart.addEventListener('renderComplete', function () {
                });
                setTimeout(function () {
                    _this.ringChart.stopAnimation();
                }, 500);
            },
            // 信息中心获取待办跳转路径
            getTaskUrl: function (id) {
                if (id) {
                    id = id.toString();
                }
                switch (id) {
                    case "14170681475": // 1财务待办
                        return '/pages/me/financial-todo/index';
                    case "14170681476": // 2合同待办
                        return '/pages/me/todo/index';
                    case "14173612880": // 3巡店待办
                        return '/pages/me/shop-todo/index';
                    case "14173612881": // 4整改通知
                        return '/pages/me/shopfix-todo/index';
                    case "14173612879": // 5意见征询待办
                        return '/pages/me/consult-todo/index';
                    case "14182972401": // 6终包采购计划提报
                    case "14182972402": // 7终包收货提报
                    case "14182987654": // 8考核通知
                    case "14187583090": // 9新增门店待办
                    case "14182972398": // 10终端管理待办
                    case "14182051644": // 11退货待办
                    case "14182987653": // 12考核申诉
                    case "14187583089": // 13代理商活动待办
                        return '/pages/me/assessment-notice-todo/index';
                    default:
                        return '';
                }
            },
            goDetail: function (e) {
                var _a = e.currentTarget.dataset, detailtype = _a.detailtype, msgcode = _a.msgcode;
                var url = '';
                if (_this.noticeActive === 'GG') { // 公告
                    url = "/pages/me/notice/detail/index?id=" + msgcode; // 跳转至公告详情
                }
                else if (_this.noticeActive === 'TASK') { // 待办
                    var oUrl = _this.methods.getTaskUrl(detailtype);
                    if (detailtype && oUrl) {
                        url = oUrl + "?status=0&typeValue=" + detailtype; // 跳转至未处理待办列表
                    }
                }
                else if (_this.noticeActive === 'MSG') { // 通知
                    if (detailtype) {
                        url = "/pages/me/message/detail/index?type=" + detailtype; // 跳转至通知列表
                    }
                }
                if (url) {
                    wx.navigateTo({
                        url: url
                    });
                }
            },
            updateData: function () {
                _this.ringChart.updateData({
                    title: {
                        name: '80%'
                    },
                    subtitle: {
                        color: '#ff0000'
                    }
                });
                _this.$apply;
            },
            onFocus: function () {
                // 这里获取焦点的时候应该跳到搜索页面
                // 暂时条状还有点问题
                wx.redirectTo({
                    url: '/pages/goods/search/index'
                });
            },
            goNext: function (e) {
                wx.switchTab({
                    url: e.currentTarget.dataset.url
                });
            },
            gotoNoticeList: function () {
                _this.navigator({
                    link: {
                        url: '/pages/me/notice/list/index'
                    }
                });
            },
            gotoZone: function (zone, category, categoryName) {
                _this.$parent.globalData.zone = zone;
                _this.$parent.globalData.zoneIndex = category;
                _this.$parent.globalData.isTab = false;
                _this.$parent.globalData.isPermission = _this.permission.specialArea.includes(categoryName);
                wx.switchTab({
                    url: '../take/index'
                });
            },
            goPage: function (url) {
                this.navigator({ link: { url: url } });
            },
            // 固定导航菜单跳转对应页面
            goNavigationArea: function (item) {
                if (!item) {
                    return;
                }
                var sourceName = item.sourceName, url = item.url;
                if (!url) {
                    return;
                }
                var queryParams = this.getQueryVariable(url);
                var currUrl = this.getQueryUrl(url);
                // 判断菜单权限，权限是根据名称判断
                this.$parent.globalData.isPermission = this.permission.specialArea.includes(sourceName);
                if (currUrl == '/pages/main/take/index') {
                    if (sourceName == '产品采购') {
                        var productPurchaseAuthority = JSON.parse(wx.getStorageSync('b2b_permission_list')).productPurchaseAuthority;
                        this.$parent.globalData.isPermission = productPurchaseAuthority;
                        this.$parent.globalData.isTab = true;
                    }
                    else {
                        // 根据路径参数，跳转到产品采购列表页的时候显示对应专区页面
                        if (queryParams && queryParams.type) {
                            this.$parent.globalData.zone = queryParams.type;
                        }
                        if (queryParams && queryParams.zoneIndex) {
                            this.$parent.globalData.zoneIndex = queryParams.zoneIndex;
                        }
                        // 非底部tab切换进入产品采购列表页
                        this.$parent.globalData.isTab = false;
                    }
                    wx.switchTab({ url: currUrl });
                }
                else if (currUrl == '/pages/main/home/index' || currUrl == '/pages/main/cart/index' || currUrl == '/pages/main/me/index') {
                    wx.switchTab({ url: currUrl });
                }
                else {
                    this.navigator({ link: { url: currUrl } });
                }
            },
            // 跳转至活动专区
            goActivityArea: function (url, categoryName) {
                this.$parent.globalData.isPermission = this.permission.specialArea.includes(categoryName);
                this.navigator({ link: { url: url } });
            },
            goPageByEvent: function (e) {
                if (e.currentTarget.dataset.url) {
                    this.navigator({ link: { url: e.currentTarget.dataset.url } });
                }
            },
            // 跳转意向商家
            goMIC: function (url, auth) {
                this.navigator({ link: { url: url }, auth: false });
            },
            // 点击轮播图跳转对应页面
            goUrl: function (e) {
                var url = e.currentTarget.dataset.url;
                if (url) {
                    // 跳详情
                    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) { // 跳转至外部链接
                        var accountInfo = JSON.parse(wx.getStorageSync('b2b_token')).accountInfo;
                        var accountId = accountInfo.id;
                        var currUrl = '';
                        if (url.indexOf("?") != -1) { // 有参数
                            currUrl = url + "&accountId=" + accountId;
                        }
                        else { // 没参数
                            currUrl = url + "?accountId=" + accountId;
                        }
                        var urlStr = encodeURIComponent(currUrl);
                        wx.navigateTo({
                            url: "/pages/me/webview/index?url=" + urlStr
                        });
                    }
                    else {
                        wx.navigateTo({
                            url: url
                        });
                    }
                }
            },
            getMenuNotice: function () {
                var params = {
                    pageNo: 1,
                    pageSize: 20,
                    status: 0,
                };
                _this.methods.getMenuNoticeList(params).then(function (res) {
                    _this.data.noticeTreat.GG = [];
                    if (res.payload && res.payload.list && res.payload.list.length > 0) {
                        _this.data.noticeTreat.GG = res.payload.list.slice(0, 10).map(function (msg) {
                            msg.createdDate = index_1.formatDate(msg.createdDate || msg.createdate, "Y-M-D") || '';
                            return msg;
                        });
                    }
                    _this.methods.noticeActiveListChange();
                    _this.$apply();
                    // this.noticeList就是调用该接口取得值
                    if (_this.noticeList.length > 0) {
                        _this.methods.getNoticeDetail(_this.noticeList[0].id);
                    }
                });
            },
            getNoticeDetail: function (id) {
                _this.methods.messageRead({ id: id }).then(function (res) {
                    _this.selNotice = res.payload;
                    if (_this.selNotice.billboardMessage && _this.selNotice.billboardMessage.popupWindowContent) {
                        _this.selNotice.billboardMessage.popupWindowContent = _this.goodsContentConv(_this.selNotice.billboardMessage.popupWindowContent);
                        if (_this.selNotice.billboardMessage.popAttachList && _this.selNotice.billboardMessage.popAttachList.length > 0) {
                            _this.selNotice.billboardMessage.popAttachList.forEach(function (item) {
                                // 重新组合图片地址 动态获取
                                item.filePath = imgUrl + '/notice/' + item.filePath;
                            });
                        }
                    }
                    _this.showPop = true;
                    _this.hiddenName = 'hidden'; // 广告弹窗显示，canvas设置成隐藏
                    _this.noticeList.splice(0, 1);
                    wepy_redux_1.getStore().dispatch({ type: notice_2.SET_MENU_NOTICE_LIST, payload: _this.noticeList });
                    _this.$apply();
                });
            },
            //关闭通知
            clickGuideOvery: function () {
                if (_this.noticeList.length > 0) {
                    _this.methods.getNoticeDetail(_this.noticeList[0].id);
                }
                else {
                    _this.hiddenName = '';
                }
                _this.showPop = false;
                _this.$apply();
            },
            // 进度条子组件传值
            getCanvasImg: function (imgUrl) {
                this.canvasImg = imgUrl.detail;
                this.$apply();
            },
            // swiper轮播图计算滚动条移动距离
            swiperChange: function (e) {
                var swiperCurrent = e.detail.current;
                var oLeft = 0;
                if (this.home.topPictureList.length > 1) {
                    // 52:scrollbar可滑动的长度 = 外部滑动条长度-内部互动条的长度 （单位rpx）
                    oLeft = (52 / (this.home.topPictureList.length - 1)) * swiperCurrent; // 移动距离 = scrollbar可滑动的长度/(图片列表总数量-1)*当前列表下标
                }
                this.swiperCurrentPosition = oLeft;
                this.$apply();
            },
            //scroll-view专区计算滚动条移动距离
            getleft: function (e) {
                var scrollLeft = e.detail.scrollLeft;
                var windowWidth = wx.getSystemInfoSync().windowWidth;
                // 数字单位为rpx
                // 列表可滑动总长度 = 列表总长度 - 列表容器长度
                var totalSlidingLength = (142 * (this.specialAreaList.length - 1) + 100) - (index_1.getRpx(windowWidth) - 40);
                var oLeft = 0;
                if (totalSlidingLength > 0) {
                    oLeft = (52 / (totalSlidingLength)) * (index_1.getRpx(scrollLeft)); // 移动距离 = scrollbar可滑动的长度/列表可滑动总长度*列表当前滑动长度
                }
                if (oLeft > 52) {
                    oLeft = 52;
                }
                this.scrollCurrentPosition = oLeft;
                this.$apply();
            },
            // 最近使用菜单跳转对应页面
            goRecentlyUsedPage: function (subItem) {
                var url = subItem && subItem.customerAccountSourceUrl;
                if (!url) {
                    return;
                }
                this.navigator({ link: { url: url } });
            },
            // 消息中心切换tab事件
            changeNotice: function (type) {
                this.clearTimer();
                this.noticeActive = type;
                this.current = 0;
            },
            // 消息中心列表滚动事件
            noticeSwiperChange: function (e) {
                if (e.detail.current > 0) {
                    this.current = e.detail.current;
                }
                this.methods.noticeActiveListChange();
            },
            // 消息中心列表展示完成自动切换tab
            noticeActiveListChange: function () {
                var oActive = _this.noticeActive;
                var oList = _this.noticeTreat[_this.noticeActive];
                var that = _this;
                if ((_this.current == 0 && oList.length <= 3) || (_this.current >= oList.length - 3 && oList.length > 3)) {
                    var noticeTimer_1 = setTimeout(function () {
                        if (oActive == 'GG') {
                            that.noticeActive = 'TASK';
                        }
                        if (oActive == 'TASK') {
                            that.noticeActive = 'MSG';
                        }
                        if (oActive == 'MSG') {
                            that.noticeActive = 'GG';
                        }
                        that.current = 0;
                        that.$apply();
                        clearTimeout(noticeTimer_1);
                    }, 5000);
                    _this.noticeTimer = noticeTimer_1;
                }
            },
            navigateToMsg: function () {
                this.accoutPopupShow = false;
                var url = '';
                if (this.noticeActive === 'GG') {
                    url = '/pages/message/announcement/list/index';
                }
                else if (this.noticeActive === 'TASK') {
                    url = '/pages/message/upcoming/list/index';
                }
                else if (this.noticeActive === 'MSG') {
                    url = '/pages/message/notice/list/index';
                }
                if (url) {
                    wx.navigateTo({ url: url });
                }
            },
            // 跳转至待处理页
            toPending: function (item) {
                if (item.switchUrl) {
                    var url = item.switchUrl;
                    wx.navigateTo({ url: url });
                }
            },
            //隐私协议
            toPrivacy: function () {
                var url = wepy_1.default.$appConfig.baseUrl + "/privacy";
                url = index_1.modifyUrl(url);
                var urlStr = encodeURIComponent(url);
                wx.navigateTo({ url: "/pages/me/answerNoLogin/index?type=toPrivacy&url=" + urlStr });
            },
            // 同意用户协议
            agree: function () {
                this.showAgreementMask = false;
                wx.setStorageSync('isAgree', true);
                wx.setStorageSync('version', this.version);
                if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
                    this.$wxpage.getTabBar().setData({
                        isShowTabBar: true,
                    });
                }
            },
            // 销售汇总弹框提示是否显示
            onShowSalesSummaryTip: function () {
                this.showSalesSummaryTip = !this.showSalesSummaryTip;
            },
        };
        return _this;
    }
    // 获取用户协议
    Filter.prototype.getAgreement = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, isAgree;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request_1.request({ api: '/fast/report/privacyPolicy.nd', method: 'GET', data: { loginPlant: 'XCX' } })];
                    case 1:
                        res = _a.sent();
                        if (this.loginStatus)
                            return [2 /*return*/];
                        if (res.code == 0 && res.list && res.list[0]) {
                            this.html = res.list[0].pageContent;
                            this.version = res.list[0].pageKey;
                            isAgree = wx.getStorageSync('isAgree');
                            if (!isAgree) {
                                this.showAgreementMask = true;
                                if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
                                    this.$wxpage.getTabBar().setData({
                                        isShowTabBar: false,
                                    });
                                }
                            }
                            else {
                                if (wx.getStorageSync('version') != res.list[0].pageKey) {
                                    this.showAgreementMask = true;
                                    if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
                                        this.$wxpage.getTabBar().setData({
                                            isShowTabBar: false,
                                        });
                                    }
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 固定导航菜单获取url参数，格式为/take/index?filter=type=engineeringZone&name=工程专区
    Filter.prototype.getQueryUrl = function (url) {
        var newUrl = url;
        if (url.indexOf('?') > -1) {
            newUrl = url.split('?')[0];
        }
        return newUrl;
    };
    // 固定导航菜单获取url参数，格式为/take/index?filter=type=engineeringZone&name=工程专区
    Filter.prototype.getQueryVariable = function (url) {
        var params = {};
        if (url) {
            var queryArray = url.split('filter=');
            if (queryArray.length > 1) {
                var query = queryArray[1];
                var array = query.split('&');
                array.map(function (value) {
                    var _a;
                    var valueArray = value.split('=');
                    if (valueArray.length > 1) {
                        // 还需要对value进行解码（可能涉及到在value为中文字符）
                        Object.assign(params, (_a = {}, _a[valueArray[0]] = decodeURI(valueArray[1]), _a));
                    }
                });
            }
        }
        return params;
    };
    // rich-text富文本中有图片时需要自适应
    Filter.prototype.goodsContentConv = function (content) {
        // 去掉img标签里的style、width、height属性
        var newContent = content.replace(/<img[^>]*>/gi, function (match) {
            match = match.replace(/style=\"(.*)\"/gi, '').replace(/style=\'(.*)\'/gi, '');
            match = match.replace(/width=\"(.*)\"/gi, '').replace(/width=\'(.*)\'/gi, '');
            match = match.replace(/height=\"(.*)\"/gi, '').replace(/height=\'(.*)\'/gi, '');
            return match;
        });
        // 去掉<br/>标签
        // newContent = newContent.replace(/<br[^>]*\/>/gi, '').replace(/(\s+)?<br(\s+)?\/?>(\s+)?/gi,'');
        // img标签添加style属性：max-width:100%;height:auto
        newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:0;"');
        return newContent;
    };
    Filter.prototype.onPullDownRefresh = function () {
        this.methods.getUserHome(function () {
            wx.stopPullDownRefresh();
        });
    };
    Filter.prototype.getPermissionList = function () {
        if (wx.getStorageSync('b2b_permission_list')) {
            var _a = JSON.parse(wx.getStorageSync('b2b_permission_list')), specialArea = _a.specialArea, list = _a.list;
            this.permission.specialArea = specialArea;
            var listNew_1 = [];
            if (list && list.length > 0) {
                list.forEach(function (mObj) {
                    if (mObj.subMenuList && mObj.subMenuList.length > 0) {
                        mObj.subMenuList.forEach(function (sObj) {
                            if (sObj) {
                                listNew_1.push(sObj);
                            }
                        });
                    }
                });
            }
            this.permission.pendingArea = listNew_1;
        }
        this.$apply();
    };
    // js获取前一天日期
    Filter.prototype.getLastDay = function () {
        var day = -1; // day代表天数，-1代表前一天
        var dd = new Date();
        dd.setDate(dd.getDate() + day);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        var lastDay = y + '' + m + '' + d;
        return lastDay;
    };
    // 获取360体验列表
    Filter.prototype.getSanLiuLingExperienceData = function () {
        var _this = this;
        var date = new Date();
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var queryDate = Y + '-' + M;
        var param = {
            queryTime: queryDate,
            cisCode: wepy_1.default.$instance.globalData.cisCode,
        };
        this.methods.getSanLiuLingExperienceList(param).then(function (res) {
            if (res.payload && res.payload.data) {
                _this.sanLiuLingExperienceList = res.payload.data;
            }
            _this.$apply();
        });
    };
    // 首页导航图标查询
    Filter.prototype.getNavigationMenuRecordData = function () {
        var _this = this;
        this.methods.getNavigationMenuRecord().then(function (res) {
            if (res && res.payload && res.payload.list && res.payload.list.length > 0) {
                _this.specialAreaList = res.payload.list;
                _this.$apply();
            }
        });
    };
    // 客户访问菜单记录查询
    Filter.prototype.getMenuRecordData = function () {
        var _this = this;
        this.methods.getMenuRecord().then(function (res) {
            if (res && res.payload && res.payload.list && res.payload.list.length > 0) {
                // 最近使用前端开发，如果没有数据不显示，不超过4个，显示1行，超过4个显示2行，最多显示8个
                _this.recentlyUsedList = res.payload.list.slice(0, 8);
                _this.$apply();
            }
        });
    };
    // 待处理
    Filter.prototype.getUnTreatNumData = function () {
        var _this = this;
        this.methods.getUnTreatNum().then(function (res) {
            var data = res.payload;
            _this.pendingList.forEach(function (item) {
                if (item.name === '问卷') {
                    item.num = data.questionNum;
                    item.isShow = _this.pendingPermissions(item.switchUrl);
                }
                if (item.name === '公告') {
                    item.num = data.noticeNum;
                }
                if (item.name === '待办') {
                    item.num = data.taskNum;
                }
                if (item.name === '通知') {
                    item.num = data.msgNum;
                }
            });
            _this.$apply();
        });
        var module = 'cgrk,ddsh,xsck,return_wait_outbound,return_wait_inbound'; // 以逗号分隔，cgrk 采购入库; ddsh 订单审核; xsck 销售出库; return_wait_outbound 退货待出库; return_wait_inbound 退货待入库
        this.methods.getUnreadDmsNumber(module).then(function (res) {
            var data = res.payload.data;
            _this.pendingList.forEach(function (item) {
                if (item.name === '待审核') {
                    item.num = data.ddsh;
                    item.isShow = _this.pendingPermissions(item.switchUrl);
                }
                if (item.name === '待出库') {
                    item.num = data.xsck;
                    item.isShow = _this.pendingPermissions(item.switchUrl);
                }
                if (item.name === '待入库') {
                    item.num = data.cgrk;
                    item.isShow = _this.pendingPermissions(item.switchUrl);
                }
                if (item.name === '退货待出库') {
                    item.num = data.return_wait_outbound;
                    item.isShow = _this.pendingPermissions(item.switchUrl);
                }
                if (item.name === '退货待入库') {
                    item.num = data.return_wait_inbound;
                    item.isShow = _this.pendingPermissions(item.switchUrl);
                }
            });
            _this.$apply();
        });
    };
    // 判断待处理菜单是否有权限
    Filter.prototype.pendingPermissions = function (url) {
        var accountInfo = JSON.parse(wx.getStorageSync('b2b_token')).accountInfo;
        var type = accountInfo.type; // 是否是主张户，如果是主张户都显示不判断，如果是子账户有权限的才显示
        if (type && type == 'main') {
            return true;
        }
        else {
            var list = this.permission.pendingArea;
            if (list && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].url && (list[i].url == url)) {
                        return true;
                    }
                }
            }
            return false;
        }
    };
    // 获取消息中心待办轮播列表
    Filter.prototype.getTaskList = function () {
        var _this = this;
        var params = {
            pageNo: 1,
            pageSize: 20,
            status: 0,
        };
        this.methods.getConsultTodoAllItems(params).then(function (res) {
            _this.noticeTreat.TASK = [];
            if (res.payload && res.payload.priceDelegateMessageList && res.payload.priceDelegateMessageList.length > 0) {
                _this.noticeTreat.TASK = res.payload.priceDelegateMessageList.slice(0, 10).map(function (msg) {
                    msg.createdDate = index_1.formatDate(msg.createdDate || msg.createdate, "Y-M-D") || '';
                    return msg;
                });
            }
            _this.$apply();
        });
    };
    // 获取消息中心通知轮播列表
    Filter.prototype.getMsgData = function () {
        var _this = this;
        var params = {
            pageNo: 1,
            pageSize: 20,
            status: 0,
        };
        this.methods.getMessageList(params).then(function (res) {
            _this.noticeTreat.MSG = [];
            if (res.payload && res.payload.priceMessageList && res.payload.priceMessageList.length > 0) {
                _this.noticeTreat.MSG = res.payload.priceMessageList.slice(0, 10).map(function (msg) {
                    msg.createdDate = index_1.formatDate(msg.createdDate || msg.createdate, "Y-M-D") || '';
                    return msg;
                });
            }
            _this.$apply();
        });
    };
    Filter.prototype.clearTimer = function () {
        if (this.noticeTimer) {
            clearTimeout(this.noticeTimer);
        }
    };
    // 获取分销网络拓展与维护报表
    Filter.prototype.getDistributionRunData = function () {
        var _this = this;
        this.methods.getDistributeNetwork({
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            queryTime: index_1.getCurrentMonth(),
        }).then(function (res) {
            var data = res.payload.data;
            if (data && data.distributeNetworkDevelopMaintain) {
                _this.developMaintain.distributeNetwork = data.distributeNetworkDevelopMaintain.distributeNetwork || {};
                _this.developMaintain.distributeNetwork.networkIncreaseCompletion = parseFloat(_this.developMaintain.distributeNetwork.networkIncreaseCompletion);
                _this.developMaintain.dynamicSales = data.distributeNetworkDevelopMaintain.dynamicSales || {};
                _this.developMaintain.dynamicSales.monthRateCompletion = parseFloat(_this.developMaintain.dynamicSales.monthRateCompletion);
                _this.developMaintain.singleOutput = data.distributeNetworkDevelopMaintain.singleOutput || {};
                _this.developMaintain.singleOutput.monthSingleOutputCompletion = parseFloat(_this.developMaintain.singleOutput.monthSingleOutputCompletion);
                _this.developMaintain.marketCoverage = data.distributeNetworkDevelopMaintain.marketCoverage || {};
                _this.developMaintain.marketCoverage.rate = parseFloat(_this.developMaintain.marketCoverage.rate);
                _this.developMaintain.monthRun = data.distributeNetworkDevelopMaintain.monthRun || {};
                var disTotal = index_1.removeIllegalStr(_this.developMaintain.monthRun.distributeRunNum) || '--';
                var disSchedule = parseFloat(_this.developMaintain.monthRun.distributeRunRate) || 0;
                var sinkTotal = index_1.removeIllegalStr(_this.developMaintain.monthRun.sinkRunNum) || '--';
                var sinkSchedule = parseFloat(_this.developMaintain.monthRun.sinkRunRate) || 0;
                _this.optionDistributionRun = customize_charts_1.optionDistributionRunData({
                    total: disTotal,
                    color: [[disSchedule / 100, '#18D1BC'], [1, 'rgba(151,151,151,0.2200)']]
                });
                _this.optionSinkRunNum = customize_charts_1.optionDistributionRunData({
                    total: sinkTotal,
                    color: [[sinkSchedule / 100, '#18D1BC'], [1, 'rgba(151,151,151,0.2200)']]
                });
            }
        });
        this.optionDistributionRun = customize_charts_1.optionDistributionRunData({
            total: '--',
            color: [[0, '#18D1BC'], [1, 'rgba(151,151,151,0.2200)']]
        });
        this.optionSinkRunNum = customize_charts_1.optionDistributionRunData({
            total: '--',
            color: [[0, '#1890FF'], [1, 'rgba(151,151,151,0.2200)']]
        });
    };
    // 获取库存报表
    Filter.prototype.getInventoryData = function () {
        var _this = this;
        var month = this.getLastDay();
        this.methods.getHomePageInventoryReport({
            month: month,
            operatorCode: wepy_1.default.$instance.globalData.cisCode,
        }).then(function (res) {
            var report = res.payload.report;
            if (report) {
                _this.inventorySummary.total = report.total;
                if (report.details && report.details.length > 0) {
                    _this.inventorySummary.details = report.details.slice(0, 3);
                    _this.inventorySummary.details.forEach(function (item, index) {
                        _this.inventorySummary.chartData[index] = item.count;
                    });
                }
                _this.optionInventory = customize_charts_1.optionInventoryData(_this.inventorySummary.chartData.reverse(), _this.inventorySummary.total);
            }
            _this.$apply();
        });
        this.optionInventory = customize_charts_1.optionInventoryData(this.inventorySummary.chartData.reverse(), this.inventorySummary.total);
        this.methods.getInventoryTurnover({
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            queryTime: index_1.getCurrentMonth(),
        }).then(function (res) {
            var data = res.payload.data;
            if (data && data.inventoryTurnover) {
                _this.inventorySummary.turnoverDays = data.inventoryTurnover.turnoverDays; // 周转天数
                _this.inventorySummary.compareLastMonth = data.inventoryTurnover.compareLastMonth; // 同比（较上月）
                _this.inventorySummary.arrowMonth = data.inventoryTurnover.arrowMonth; // 同比正负 1：正， 0：负
            }
            _this.$apply();
        });
    };
    // 获取毛利报表
    Filter.prototype.getGrossProfitData = function () {
        var _this = this;
        this.methods.getGrossProfitMargin({
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            queryTime: index_1.getCurrentMonth(),
        }).then(function (res) {
            var data = res.payload.data;
            if (data && data.grossMargin) {
                _this.grossMargin = data.grossMargin;
                _this.grossMargin.grossMarginRate = parseFloat(_this.grossMargin.grossMarginRate);
                customize_charts_1.progress({
                    id: 'grossProfitCanvas',
                    val: _this.grossMargin.grossMarginRate || 0,
                    config: {
                        lineBarBg: '#FF8A8A'
                    }
                });
            }
        });
        customize_charts_1.progress({
            id: 'grossProfitCanvas',
            val: this.grossMargin.grossMarginRate || 0,
            config: {
                lineBarBg: '#FF8A8A'
            }
        });
    };
    // 获取销售汇总报表
    Filter.prototype.getSalesAmountData = function () {
        var _this = this;
        this.methods.getHomePageSalesReport({
            userAccount: wepy_1.default.$instance.globalData.account
        }).then(function (res) {
            var report = res.payload.report;
            if (report) {
                if (report.salesTotalAmount) {
                    var total = report.salesTotalAmount.count;
                    if (total) {
                        total = (total / 10000).toFixed(1);
                    }
                    _this.salesSummary.salesAmount.total = total;
                    if (report.salesTotalAmount.HB) {
                        var compareLastMonth = '';
                        if (report.salesTotalAmount.HB.indexOf("-") != -1) {
                            compareLastMonth = report.salesTotalAmount.HB.replace(/\-/g, '');
                            _this.salesSummary.salesAmount.arrowMonth = 0;
                        }
                        else {
                            compareLastMonth = report.salesTotalAmount.HB.replace(/\+/g, '');
                            _this.salesSummary.salesAmount.arrowMonth = 1;
                        }
                        _this.salesSummary.salesAmount.compareLastMonth = compareLastMonth;
                    }
                    if (report.salesTotalAmount.TB) {
                        var compareLastYear = '';
                        if (report.salesTotalAmount.TB.indexOf("-") != -1) {
                            compareLastYear = report.salesTotalAmount.TB.replace(/\-/g, '');
                            _this.salesSummary.salesAmount.arrowYear = 0;
                        }
                        else {
                            compareLastYear = report.salesTotalAmount.TB.replace(/\+/g, '');
                            _this.salesSummary.salesAmount.arrowYear = 1;
                        }
                        _this.salesSummary.salesAmount.compareLastYear = compareLastYear;
                    }
                }
                if (report.salesRetailAmount) {
                    var amount = report.salesRetailAmount.count;
                    if (amount) {
                        amount = (amount / 10000).toFixed(1);
                    }
                    _this.salesSummary.salesAmount.proportion[0].value = amount;
                }
                if (report.salesNormalAmount) {
                    var amount = report.salesNormalAmount.count;
                    if (amount) {
                        amount = (amount / 10000).toFixed(1);
                    }
                    _this.salesSummary.salesAmount.proportion[1].value = amount;
                }
                if (report.salesTotalQuantity) {
                    _this.salesSummary.salesQuantity.total = report.salesTotalQuantity.count;
                    if (report.salesTotalQuantity.HB) {
                        var compareLastMonth = '';
                        if (report.salesTotalQuantity.HB.indexOf("-") != -1) {
                            compareLastMonth = report.salesTotalQuantity.HB.replace(/\-/g, '');
                            _this.salesSummary.salesQuantity.arrowMonth = 0;
                        }
                        else {
                            compareLastMonth = report.salesTotalQuantity.HB.replace(/\+/g, '');
                            _this.salesSummary.salesQuantity.arrowMonth = 1;
                        }
                        _this.salesSummary.salesQuantity.compareLastMonth = compareLastMonth;
                    }
                    if (report.salesTotalQuantity.TB) {
                        var compareLastYear = '';
                        if (report.salesTotalQuantity.TB.indexOf("-") != -1) {
                            compareLastYear = report.salesTotalQuantity.TB.replace(/\-/g, '');
                            _this.salesSummary.salesQuantity.arrowYear = 0;
                        }
                        else {
                            compareLastYear = report.salesTotalQuantity.TB.replace(/\+/g, '');
                            _this.salesSummary.salesQuantity.arrowYear = 1;
                        }
                        _this.salesSummary.salesQuantity.compareLastYear = compareLastYear;
                    }
                }
                if (report.salesRetailQuantity) {
                    _this.salesSummary.salesQuantity.proportion[0].value = report.salesRetailQuantity.count;
                }
                if (report.salesNormalQuantity) {
                    _this.salesSummary.salesQuantity.proportion[1].value = report.salesNormalQuantity.count;
                }
            }
        });
        this.optionSalesAmount = customize_charts_1.optionSalesAmountData(this.salesSummary.salesAmount.proportion);
        this.optionSalesQuantity = customize_charts_1.optionSalesAmountData(this.salesSummary.salesQuantity.proportion);
        this.methods.getFrontChannel({
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            queryTime: index_1.getCurrentMonth(),
        }).then(function (res) {
            var data = res.payload.data;
            if (data && data.frontChannel) {
                _this.salesSummary.frontChannel = data.frontChannel;
                _this.salesSummary.frontChannel.completion = parseFloat(_this.salesSummary.frontChannel.completion);
            }
        });
    };
    // 获取提货汇总报表
    Filter.prototype.getPickupSummaryData = function () {
        var _this = this;
        this.methods.getPickUpGoods({
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            queryTime: index_1.getCurrentMonth(),
        }).then(function (res) {
            var data = res.payload.data;
            if (data) {
                if (data.collectionDelivery) {
                    _this.pickupSummary.collectionDelivery = data.collectionDelivery;
                    _this.pickupSummary.collectionDelivery.completion = parseFloat(_this.pickupSummary.collectionDelivery.completion);
                }
                if (data.midHigProportion) {
                    _this.pickupSummary.midHigProportion = data.midHigProportion;
                    _this.pickupSummary.midHigProportion.completion = parseFloat(_this.pickupSummary.midHigProportion.completion);
                }
                if (data.dedicatedMachine) {
                    _this.pickupSummary.dedicatedMachine = data.dedicatedMachine;
                    _this.pickupSummary.dedicatedMachine.completion = parseFloat(_this.pickupSummary.dedicatedMachine.completion);
                }
                customize_charts_1.progress({
                    id: 'myPickCanvas',
                    val: _this.pickupSummary.collectionDelivery.completion || 0,
                });
            }
        });
        customize_charts_1.progress({
            id: 'myPickCanvas',
            val: this.pickupSummary.collectionDelivery.completion || 0,
        });
    };
    // 获取综合评价报表
    Filter.prototype.getOverviewData = function () {
        var _this = this;
        this.methods.getComprehensive({
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            queryTime: index_1.getCurrentMonth(),
        }).then(function (res) {
            var data = res.payload.data;
            if (data && data.comprehensiveEvaluation) {
                var chartData = data.comprehensiveEvaluation;
                _this.reportData.overview.totalScore = chartData.totalScore;
                _this.reportData.overview.ranking = chartData.ranking;
                _this.reportData.overview.customerNum = chartData.customerNum;
                if (chartData.summaryScoreList && chartData.summaryScoreList.length > 0) {
                    chartData.summaryScoreList.forEach(function (item) {
                        if (item.name === '全渠道口径出货') {
                            _this.reportData.overview.summaryScoreList[0].fullScore = item.fullScore;
                            _this.reportData.overview.summaryScoreList[0].score = item.score;
                            _this.reportData.overview.summaryScoreList[0].value = item.score || 0;
                        }
                        if (item.name === '分销网络拓展与维护') {
                            _this.reportData.overview.summaryScoreList[1].fullScore = item.fullScore;
                            _this.reportData.overview.summaryScoreList[1].score = item.score;
                            _this.reportData.overview.summaryScoreList[1].value = item.score || 0;
                        }
                        if (item.name === '增值业务(前置渠道)') {
                            _this.reportData.overview.summaryScoreList[2].fullScore = item.fullScore;
                            _this.reportData.overview.summaryScoreList[2].score = item.score;
                            _this.reportData.overview.summaryScoreList[2].value = item.score || 0;
                        }
                        if (item.name === '销售结构') {
                            _this.reportData.overview.summaryScoreList[3].fullScore = item.fullScore;
                            _this.reportData.overview.summaryScoreList[3].score = item.score;
                            _this.reportData.overview.summaryScoreList[3].value = item.score || 0;
                        }
                    });
                }
                _this.optionOverview = customize_charts_1.optionOverviewData(_this.reportData.overview.summaryScoreList, _this.reportData.overview.totalScore || '--');
            }
        });
        this.optionOverview = customize_charts_1.optionOverviewData(this.reportData.overview.summaryScoreList, this.reportData.overview.totalScore || '--');
    };
    Filter.prototype.getSysConfigData = function () {
        var _this = this;
        try {
            // 根据系统参数判断是否迁移接口
            this.methods.getSysConfig({ key: 'QD_INDEX_REPORT' }).then(function (res) {
                var sys = res.payload.data;
                _this.masterSwitch = sys;
            });
        }
        catch (e) { }
    };
    Filter.prototype.onHide = function () {
        this.clearTimer();
    };
    Filter.prototype.onShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 自定义底部导航栏-如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态
                        if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
                            this.$wxpage.getTabBar().setData({
                                selected: 0
                            });
                        }
                        this.clearTimer();
                        this.setData({
                            showCoverageDataOption: false
                        });
                        // 获取登录状态
                        this.loginStatus = this.isLogin();
                        this.methods.getUserHome();
                        if (!this.loginStatus) return [3 /*break*/, 5];
                        // 获取直播时否加载部分接口总开关
                        return [4 /*yield*/, this.getSysConfigData()
                            // 获取权限列表并存储本地
                        ];
                    case 1:
                        // 获取直播时否加载部分接口总开关
                        _a.sent();
                        // 获取权限列表并存储本地
                        return [4 /*yield*/, this.methods.userPermissions()
                            // 从本地存储获取权限列表
                        ];
                    case 2:
                        // 获取权限列表并存储本地
                        _a.sent();
                        // 从本地存储获取权限列表
                        return [4 /*yield*/, this.getPermissionList()
                            // 获取信息提示列表
                        ];
                    case 3:
                        // 从本地存储获取权限列表
                        _a.sent();
                        // 获取信息提示列表
                        return [4 /*yield*/, this.methods.getAlert()
                            // 动态导航菜单
                        ];
                    case 4:
                        // 获取信息提示列表
                        _a.sent();
                        // 动态导航菜单
                        this.getNavigationMenuRecordData();
                        // this.masterSwitch=Y为开启状态加载以下接口
                        if (this.masterSwitch == 'Y') {
                            // 获取公告列表 -- 通过总开关控制加不加载
                            this.methods.getMenuNotice();
                            // 获取待办列表 -- 通过总开关控制加不加载
                            this.getTaskList();
                            // 获取通知列表 -- 通过总开关控制加不加载
                            this.getMsgData();
                            // 待处理 -- 通过总开关控制加不加载
                            this.getUnTreatNumData();
                            // 最近使用菜单 -- 通过总开关控制加不加载
                            this.getMenuRecordData();
                            // 所有报表（新） -- 通过总开关控制加不加载
                            this.getOverviewData();
                            this.getPickupSummaryData();
                            this.getGrossProfitData();
                            this.getSalesAmountData();
                            this.getInventoryData();
                            this.getDistributionRunData();
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        wepy_redux_1.getStore().dispatch({ type: home_2.RESET_NEW_USER_LIST_INFO, payload: [] });
                        _a.label = 6;
                    case 6:
                        this.hiddenName = 'hidden';
                        return [2 /*return*/];
                }
            });
        });
    };
    Filter.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var systemInfo;
            return __generator(this, function (_a) {
                systemInfo = wx.getSystemInfoSync();
                this.deviceInfo = {
                    system: systemInfo.system.replace(' ', '/'),
                    brower: 'miniprogram/' + systemInfo.SDKVersion
                };
                this.getAgreement();
                return [2 /*return*/];
            });
        });
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            home: function (_a) {
                var home = _a.home;
                return home.home;
            },
            user: function (_a) {
                var user = _a.user;
                return user;
            },
            purchaseReport: function (_a) {
                var home = _a.home;
                return home.purchaseReport;
            },
            newInfoList: function (_a) {
                var home = _a.home;
                return home.newInfoList;
            },
            salesReport: function (_a) {
                var home = _a.home;
                return home.salesReport;
            },
            channelReports: function (_a) {
                var home = _a.home;
                return home.channelReports;
            },
            inventoryReport: function (_a) {
                var home = _a.home;
                return home.inventoryReport;
            },
            noticeList: function (_a) {
                var notice = _a.notice;
                return notice.menuNoticeList;
            },
            operatePlanData: function (_a) {
                var home = _a.home;
                return home.operatePlanData;
            },
            turnoverRateData: function (_a) {
                var home = _a.home;
                return home.turnoverRateData;
            },
            coverageData: function (_a) {
                var home = _a.home;
                return home.coverageData;
            },
            salesStructureData: function (_a) {
                var home = _a.home;
                return home.salesStructureData;
            },
            profitData: function (_a) {
                var home = _a.home;
                return home.profitData;
            },
        }, {
            getUserHome: home_1.getUserHome,
            getUserUnreadNumbers: home_1.getUserUnreadNumbers,
            getHomePagePurchaseReport: home_1.getHomePagePurchaseReport,
            getHomePageSalesReport: home_1.getHomePageSalesReport,
            getHomePageInventoryReport: home_1.getHomePageInventoryReport,
            getInvChangeEverydayReport: home_1.getInvChangeEverydayReport,
            getNewHomeChannelReports: home_1.getNewHomeChannelReports,
            getMenuNoticeList: notice_1.getMenuNoticeList,
            messageRead: notice_1.messageRead,
            getOperatePlanReach: home_1.getOperatePlanReach,
            getRurnoverRate: home_1.getRurnoverRate,
            getMarketCoverage: home_1.getMarketCoverage,
            getProductSalesStructure: home_1.getProductSalesStructure,
            getGrossProfitRate: home_1.getGrossProfitRate,
            getO2oShopList: home_1.getO2oShopList,
            getSettleStatistic: home_1.getSettleStatistic,
            writeLog: home_1.writeLog,
            userPermissions: user_1.userPermissions,
            getSanLiuLingExperienceList: purchasereport_1.getSanLiuLingExperienceList,
            getAlert: user_1.getAlert,
            getSysConfig: distributorsorder_1.getSysConfig,
            getMenuRecord: user_1.getMenuRecord,
            getUnTreatNum: home_1.getUnTreatNum,
            getNavigationMenuRecord: home_1.getNavigationMenuRecord,
            getMessageList: notice_1.getMessageList,
            getConsultTodoAllItems: consultTodo_1.getConsultTodoAllItems,
            getUnreadDmsNumber: home_1.getUnreadDmsNumber,
            getCollectionDelivery: purchasereport_1.getCollectionDelivery,
            getRunRate: purchasereport_1.getRunRate,
            getComprehensive: home_1.getComprehensive,
            getPickUpGoods: home_1.getPickUpGoods,
            getFrontChannel: home_1.getFrontChannel,
            getGrossProfitMargin: home_1.getGrossProfitMargin,
            getDistributeNetwork: home_1.getDistributeNetwork,
            getInventoryTurnover: home_1.getInventoryTurnover,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/main/home/index'));

