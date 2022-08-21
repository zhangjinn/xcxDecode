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
var index_1 = require('./../../../../components/echarts/index.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var request_1 = require('./../../../../utils/request.js');
// import { request } from '@/utils/requestJSON';
var index_2 = require('./../../../../utils/index.js');
var store_detail_1 = require('./../../../../store/actions/store-detail.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var Defaultaccount = /** @class */ (function (_super) {
    __extends(Defaultaccount, _super);
    function Defaultaccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '店铺详情',
            usingComponents: {
                'van-row': '/components/vant/row/index',
                'van-col': '/components/vant/col/index',
                'van-switch': '/components/vant/switch/index',
                'van-popup': '/components/vant/popup/index',
                'van-toast': '/components/vant/toast/index',
                'van-tabs': '/components/vant/tabs/index',
                'van-tab': '/components/vant/tab/index',
                'ec-canvas': '/components/ec-canvas/ec-canvas',
                'calendar': '/components/calendar/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "chart": { "xmlns:v-bind": "", "v-bind:option.sync": "option1", "canvasId": "myChart", "height": "300px" } };
        _this.$events = {};
        _this.components = {
            chart: index_1.default,
        };
        _this.data = {
            accountList: [],
            imgSrc: "data:image/png;base64,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",
            option1: {},
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            calendarShow: false,
            filterForm: {
                _loading: true,
                terms: {
                    documentNum: '',
                    supplierCode: '',
                    startDocumentDate: '',
                    endDocumentDate: '',
                    status: '',
                    materialCode: '',
                    materialCodeSale: [],
                    materialCodeRank: '',
                    materialCodeSaleName: '全部',
                    materialCodeRankName: '全部',
                    cisCode: '',
                    shopInfoId: '',
                    shopName: '',
                    level: '',
                    shopType: ''
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                },
            },
            storeType: [
                { name: "专卖店", key: "isSpecialShop" },
                { name: "品牌园", key: "isBrandGarden" },
                { name: "普通店", key: "pt" },
                { name: "下沉渠道", key: "isSinkChannel" },
                { name: "智慧生活馆", key: "isSmartShop" }
            ],
            rankTab: 'week',
            saleTab: '0',
            storeRecordList: [],
            queryAllMatkl: [],
            queryStoreAllInfo: [],
            vanTabsActive: 0,
            custModelShopInfoRank: [],
            queryAllStoreSalesXtw: [],
            getStoreInspectionRecordListForStore: [],
            getStoreDetailByMat: [],
            chooseMatklName: '',
            isOpenSaleMatkl: false,
            isOpenRankMatkl: false,
            chartData: [],
            getCompetitorList: [],
            isUserMakeCall: false,
            getStoryPersonsList: [],
            storeFilterFormMatkls: [],
        };
        // 页面内交互写在methods里
        _this.methods = {
            initData: function () {
                _this.rankTab = 'week';
                _this.methods.saleTab();
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
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                console.log(evt);
                var day = year + "-" + index_2.fillZero("" + month) + "-" + index_2.fillZero("" + day);
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
                this.methods.queryAllStoreSalesXtw();
            },
            // 打开电话弹框
            openMakeCall: function () {
                var _this = this;
                var shopCisCode = this.filterForm.terms.cisCode;
                var data = { storeCode: shopCisCode, serviceCode: 'getStoryPersons' };
                store_detail_1.getStoryPersons(data, function (res) {
                    _this.getStoryPersonsList = res.data.returnData;
                    _this.isUserMakeCall = true;
                    _this.$apply();
                });
            },
            // 关闭电话弹框
            closeMakeCall: function () {
                this.isUserMakeCall = false;
            },
            //打电话
            makeCall: function (data) {
                var tel = data.currentTarget.dataset.number;
                wx.makePhoneCall({
                    phoneNumber: tel,
                });
            },
            //门店列表拨打电话
            toStoreMakeCall: function (data) {
                var tel = data.tel;
                wx.makePhoneCall({
                    phoneNumber: tel,
                });
            },
            //门店销售数据切换物料组
            toChooseMatkl: function (data) {
                var materialCode = data.materialCode, materialName = data.materialName;
                if (materialCode == _this.filterForm.terms.materialCode) {
                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { materialCode: '-666', materialCodeSaleName: '暂无' });
                }
                else {
                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { materialCode: materialCode, materialCodeSaleName: materialName });
                }
                // const matklGroupValue = this.queryAllMatkl[index].materialCode
                // const matklGroupName = this.queryAllMatkl[index].materialName
                // let storeFilterFormMatkls = this.filterForm.terms.materialCodeSale;
                // let materialCodeSaleName = this.filterForm.terms.materialCodeSaleName;
                // if (this.queryAllMatkl[index].active) {
                //   storeFilterFormMatkls.forEach((item,index) => {
                //     if(item == matklGroupValue) {
                //       storeFilterFormMatkls.splice(index,1)
                //       materialCodeSaleName.splice(index,1)
                //     }
                //   })
                //   this.queryAllMatkl[index]['active'] = false;
                // } else {
                //   this.queryAllMatkl[index]['active'] = true;
                //   storeFilterFormMatkls.push(matklGroupValue)
                //   materialCodeSaleName.push(matklGroupName)
                // }
                // this.filterForm.terms = {...this.filterForm.terms,materialCodeSale:storeFilterFormMatkls,materialCodeSaleName:
                //   materialCodeSaleName}
                // this.methods.queryAllStoreSalesXtw(this.filterForm.terms.cisCode,storeFilterFormMatkls);
            },
            //查询门店销售数据
            toChooseMatklTrue: function () {
                if (_this.filterForm.terms.materialCode == '-666') {
                    _this.queryAllStoreSalesXtw = [];
                    _this.isOpenSaleMatkl = false;
                }
                else {
                    _this.methods.queryAllStoreSalesXtw(_this.filterForm.terms.materialCode);
                }
            },
            openSaleMatkl: function () {
                _this.isOpenSaleMatkl = true;
            },
            closeSaleMatkl: function () {
                _this.isOpenSaleMatkl = false;
            },
            //门店竞争力排名切换物料组
            toChooseRankMatkl: function (data) {
                var materialCode = data.materialCode, materialName = data.materialName;
                if (materialCode == _this.filterForm.terms.materialCodeRank) {
                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { materialCodeRank: '-666', materialCodeRankName: '暂无' });
                }
                else {
                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { materialCodeRank: materialCode, materialCodeRankName: materialName });
                }
            },
            //查询门店竞争数据
            toChooseRankMatklTrue: function () {
                if (_this.filterForm.terms.materialCodeRank == '-666') {
                    _this.custModelShopInfoRank = [];
                    _this.isOpenRankMatkl = false;
                }
                else {
                    _this.methods.custModelShopInfoRank(_this.filterForm.terms.materialCodeRank);
                }
            },
            openRankMatkl: function () {
                _this.isOpenRankMatkl = true;
            },
            closeRankMatkl: function () {
                _this.isOpenRankMatkl = false;
            },
            saleTab: function (e) {
                if (e === void 0) { e = '0'; }
                _this.saleTab = e;
                var date = index_2.getDateArea(e);
                _this.filterForm.terms = __assign({}, _this.filterForm.terms, { startDocumentDate: date[0], endDocumentDate: date[1] });
                _this.methods.queryAllStoreSalesXtw();
            },
            rankTab: function (e) {
                _this.rankTab = e;
                if (_this.filterForm.terms.materialCodeRank == '-666')
                    return;
                _this.methods.custModelShopInfoRank();
            },
            onChangeToDefault: function (event) {
                return __awaiter(this, void 0, void 0, function () {
                    var account, unionid, result, accountListNew;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                account = event.target.dataset.account;
                                unionid = this.$parent.globalData.unionid;
                                return [4 /*yield*/, request_1.request({ api: '/changeUnionidAccount.nd', method: 'POST', data: { unionid: unionid, account: account } })];
                            case 1:
                                result = _a.sent();
                                if (result.code !== 0) {
                                    toast_1.default.fail(result.msg);
                                    return [2 /*return*/];
                                }
                                accountListNew = ramda_1.clone(this.accountList);
                                accountListNew.forEach(function (item) {
                                    item.uDefault = '1';
                                    if (item.account === account) {
                                        item.uDefault = '0';
                                    }
                                });
                                this.accountList = accountListNew;
                                toast_1.default.success('切换默认账号成功');
                                this.$apply();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            //雷达图 begin
            radarOption: function () {
                _this.option1 = {
                    tooltip: {},
                    legend: {
                        data: ['本地', '区域内通渠道平均'],
                        bottom: 10,
                    },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '规模', max: 1 },
                            { name: '高端', max: 1 },
                            { name: '费率', max: 1 },
                            { name: '坪效', max: 1 },
                        ],
                        radius: 80,
                        center: ['52%', '45%'],
                        splitArea: {
                            areaStyle: {
                                color: ['#A7E2E0', '#B2E5E4', '#C0EAE8', '#D9F3F2', '#E5F5F6'],
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, .5)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0)'
                            }
                        }
                    },
                    series: [{
                            name: '预算 vs 开销（Budget vs spending）',
                            type: 'radar',
                            // areaStyle: {normal: {}},
                            data: _this.chartData
                        }]
                };
                // return option
            },
            //获取门店销售明细
            getQueryAllStoreSaleDetailxtw: function (cisCode) {
                var data = {
                    storeCode: cisCode,
                    serviceCode: 'queryAllStoreSalesDetailXtw'
                };
                store_detail_1.queryAllStoreSaleDetailxtw(data, function (res) {
                    _this.queryAllStoreSaleDetailxtw = res.data;
                    _this.$apply();
                });
            },
            // 获取门店所有的信息
            queryStoreAllInfo: function (cisCode) {
                var data = {
                    storeCode: cisCode,
                    materialGroupCode: _this.filterForm.terms.materialCode,
                    serviceCode: 'queryStoreAllInfo'
                };
                // console.log('data',data);
                store_detail_1.queryStoreAllInfo(data, function (res) {
                    console.log(res.data.returnData);
                    _this.queryStoreAllInfo = res.data.returnData;
                    _this.$apply();
                });
            },
            // 获取门店全部物料组
            queryAllMatkl: function (cisCode) {
                var data = {
                    storeCode: cisCode,
                    serviceCode: 'queryAllMatkl'
                };
                store_detail_1.queryAllMatkl(data, function (res) {
                    var allMatkl = {
                        materialName: '全部',
                        materialCode: '',
                        active: true
                    };
                    // console.log('res.data',res.data);
                    _this.queryAllMatkl = res.data.returnData;
                    _this.queryAllMatkl.unshift(allMatkl);
                    _this.$apply();
                });
            },
            // 获取门店销售数据
            queryAllStoreSalesXtw: function (cisCode, materialGroupCode) {
                if (cisCode === void 0) { cisCode = _this.filterForm.terms.cisCode; }
                if (materialGroupCode === void 0) { materialGroupCode = _this.filterForm.terms.materialCode; }
                var data = {
                    storeCode: cisCode,
                    materialGroupCode: materialGroupCode,
                    startDate: _this.filterForm.terms.startDocumentDate.split('-').join(""),
                    endDate: _this.filterForm.terms.startDocumentDate.split('-').join(""),
                    serviceCode: 'queryAllStoreSalesXtw'
                };
                store_detail_1.queryAllStoreSalesXtw(data, function (res) {
                    _this.queryAllStoreSalesXtw = res.data.returnData;
                    _this.isOpenSaleMatkl = false;
                    _this.$apply();
                });
            },
            // 竞争力排名
            custModelShopInfoRank: function (cisCode, matklCode) {
                if (cisCode === void 0) { cisCode = _this.filterForm.terms.cisCode; }
                if (matklCode === void 0) { matklCode = _this.filterForm.terms.materialCode; }
                var data = {
                    storeCode: cisCode,
                    shopInfoId: _this.filterForm.terms.shopInfoId,
                    matklCode: matklCode,
                    type: _this.rankTab,
                    serviceCode: 'custModelShopInfoRank'
                };
                store_detail_1.custModelShopInfoRank(data, function (res) {
                    _this.custModelShopInfoRank = res.data.returnData.returnDataList;
                    _this.isOpenRankMatkl = false;
                    _this.$apply();
                });
            },
            // 根据门店和物料组获取门店信息
            getStoreDetailByMat: function (cisCode) {
                var data = {
                    storeCode: cisCode,
                    materialGroupCode: _this.filterForm.terms.materialCode,
                    serviceCode: 'getStoreDetailByMat'
                };
                store_detail_1.getStoreDetailByMat(data, function (res) {
                    _this.getStoreDetailByMat = res.data.returnData;
                    _this.$apply();
                });
            },
            // 门店人员信息
            getStoryPersons: function (cisCode) {
                var data = {
                    storeCode: cisCode,
                    serviceCode: 'getStoryPersons'
                };
                store_detail_1.getStoryPersons(data, function (res) {
                    _this.getStoryPersons = res.data;
                    _this.$apply();
                });
            },
            // 门店档案列表
            storeRecordList: function (cisCode) {
                var data = {
                    storeCode: cisCode,
                    serviceCode: 'storeRecordList'
                };
                store_detail_1.storeRecordList(data, function (res) {
                    console.log(res.data);
                    _this.storeRecordList = res.data.returnData.storeFile;
                    _this.$apply();
                });
            },
            // 门店详情获取物料组
            getMaterialGroupToXtw: function (cisCode) {
                var data = {
                    storeCode: cisCode,
                    serviceCode: 'getMaterialGroupToXtw'
                };
                store_detail_1.getMaterialGroupToXtw(data, function (res) {
                    // this.queryStoreAllInfo = res.data;
                    _this.$apply();
                });
            },
            // 门店综合评价趋势图
            storeEvaluationChart: function (cisCode) {
                var data = {
                    storeCode: cisCode,
                    materialCode: _this.filterForm.terms.materialCode,
                    serviceCode: 'storeEvaluationChart'
                };
                store_detail_1.storeEvaluationChart(data, function (res) {
                    var _a = res.data.returnData, storeScale = _a.storeScale, storeHighRatio = _a.storeHighRatio, storeCostRatio = _a.storeCostRatio, storeSqmRatio = _a.storeSqmRatio;
                    var _b = res.data.returnData, avageScale = _b.avageScale, avageHighRatio = _b.avageHighRatio, avageCostRatio = _b.avageCostRatio, avageSqmRatio = _b.avageSqmRatio;
                    var chartData = [
                        {
                            value: [storeScale, storeHighRatio, storeCostRatio, storeSqmRatio],
                            name: '费率'
                        },
                        {
                            value: [avageScale, avageHighRatio, avageCostRatio, avageSqmRatio],
                            name: '区域内通渠道平均'
                        }
                    ];
                    _this.chartData = chartData;
                    //获取门店综合评价
                    _this.methods.radarOption();
                    _this.$apply();
                });
            },
            //门店巡店记录
            getStoreInspectionRecordListForStore: function (cisCode) {
                var data = {
                    storeCode: cisCode,
                    type: 'all',
                    pageSize: 5,
                    pageNo: 1,
                    startTime: '',
                    endTime: "",
                    serviceCode: 'querySignStoreRecord'
                };
                store_detail_1.getStoreInspectionRecordListForStore(data, function (res) {
                    // debugger
                    // console.log('res', res.data.data.returnData)
                    _this.getStoreInspectionRecordListForStore = res.data.returnData;
                    _this.$apply();
                });
            },
            //获得竞品排名
            getCompetitorList: function (cisCode) {
                var data = {
                    storeCode: cisCode,
                    matklCode: _this.filterForm.terms.materialCode,
                    serviceCode: 'getCompetitorList'
                };
                store_detail_1.getCompetitorList(data, function (res) {
                    _this.getCompetitorList = res.data.returnData;
                    _this.$apply();
                });
            },
            //点击tabs
            bindTabsClick: function (e) {
                var index = e.detail.index;
                var cisCode = this.filterForm.terms.cisCode;
                // this.filterForm.terms.materialCodeSale = [],this.filterForm.terms.materialCodeSaleName = [];
                this.filterForm.terms.materialCode = this.queryAllMatkl[index].materialCode;
                this.filterForm.terms.materialCodeSale.push(this.queryAllMatkl[index].materialCode);
                this.filterForm.terms.materialCodeRank = this.queryAllMatkl[index].materialCode;
                // this.filterForm.terms.materialCodeSaleName.push(this.queryAllMatkl[index].materialName);
                this.filterForm.terms.materialCodeSaleName = this.queryAllMatkl[index].materialName;
                this.filterForm.terms.materialCodeRankName = this.queryAllMatkl[index].materialName;
                var queryAllMatkl = this.queryAllMatkl;
                var queryAllMatklRes = queryAllMatkl.map(function (item, mapIndex) {
                    return { materialName: item.materialName, materialCode: item.materialCode, active: index == mapIndex ? true : false };
                });
                this.queryAllMatkl = queryAllMatklRes;
                this.vanTabsActive = index;
                this.methods.initData();
                if (index > 0) {
                    //根据门店和物料组获取门店信息
                    this.methods.getStoreDetailByMat(cisCode);
                    //门店综合评价趋势图
                    this.methods.storeEvaluationChart(cisCode);
                    //竞争力排名
                    this.methods.custModelShopInfoRank(cisCode);
                }
                else {
                    //获取门店销售明细
                    this.methods.getQueryAllStoreSaleDetailxtw(cisCode);
                    //获取门店all信息
                    this.methods.queryStoreAllInfo(cisCode);
                    //门店人员信息
                    this.methods.getStoryPersons(cisCode);
                    //门店档案列表
                    this.methods.storeRecordList(cisCode);
                    //门店详情获取物料组
                    this.methods.getMaterialGroupToXtw(cisCode);
                    //门店巡店记录
                    this.methods.getStoreInspectionRecordListForStore(cisCode);
                }
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Defaultaccount.prototype.onLoad = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var cisCode, shopId, shopName, level, isSpecialShop, isBrandGarden, isSinkChannel, isSmartShop;
            return __generator(this, function (_a) {
                cisCode = options.cisCode, shopId = options.shopId, shopName = options.shopName, level = options.level, isSpecialShop = options.isSpecialShop, isBrandGarden = options.isBrandGarden, isSinkChannel = options.isSinkChannel, isSmartShop = options.isSmartShop;
                console.log(options);
                this.filterForm.terms = __assign({}, this.filterForm.terms, { isSpecialShop: isSpecialShop, isBrandGarden: isBrandGarden, isSinkChannel: isSinkChannel, isSmartShop: isSmartShop });
                this.filterForm.terms.cisCode = cisCode;
                this.filterForm.terms.shopInfoId = shopId;
                this.filterForm.terms.shopName = shopName;
                this.filterForm.terms.level = level;
                //获取门店销售明细
                this.methods.getQueryAllStoreSaleDetailxtw(cisCode);
                //获取门店all信息
                this.methods.queryStoreAllInfo(cisCode);
                //获取门店全部物料组
                this.methods.queryAllMatkl(cisCode);
                //门店人员信息
                this.methods.getStoryPersons(cisCode);
                //获取门店销售数据
                this.methods.queryAllStoreSalesXtw(cisCode);
                //门店档案列表
                this.methods.storeRecordList(cisCode);
                //门店详情获取物料组
                this.methods.getMaterialGroupToXtw(cisCode);
                //门店巡店记录
                this.methods.getStoreInspectionRecordListForStore(cisCode);
                this.methods.initData();
                this.$apply();
                return [2 /*return*/];
            });
        });
    };
    return Defaultaccount;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Defaultaccount , 'pages/me/cts/store-detail/index'));

