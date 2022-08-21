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
var index_1 = require('./../../../components/echarts/index.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var purchasereport_1 = require('./../../../store/actions/purchasereport.js');
var index_2 = require('./../../../utils/index.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_3 = require('./../../components/header-tab/index.js');
var StockChart = /** @class */ (function (_super) {
    __extends(StockChart, _super);
    function StockChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '库存报表',
            usingComponents: {
                'ec-canvas': '/components/ec-canvas/ec-canvas',
                'van-popup': '../../../components/vant/popup/index',
                'calendar': '../../../components/calendar/index',
                'van-toast': '../../../components/vant/toast/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "chart": { "v-bind:option.sync": "option", "canvasId": "stock1", "height": "360px" }, "headerTab": { "xmlns:v-bind": "", "v-bind:showRightBtn.once": "showRightBtn", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchStockFilter" } };
        _this.components = {
            chart: index_1.default,
            headerTab: index_3.default,
        };
        /**
         * 页面的初始数据
         */
        _this.data = {
            previousDayDate: '',
            dynamicMessage: {
                inventory: '',
                inventoryQuantity: '',
            },
            option: {},
            // supplierVisible: false,
            warehouseVisible: false,
            warehouseTitle: '仓库选择',
            materialVisible: false,
            timeVisible: false,
            // chooseSupplier: {}, //已选择的供应商
            material: '',
            materialKey: '',
            // supplierList: [],
            gicWarehouseType: '',
            warehouseList: [
                {
                    id: '',
                    value: '全部',
                    selected: false,
                },
                {
                    id: '005',
                    value: '自有仓',
                    selected: false,
                },
                {
                    id: '003',
                    value: '共享仓',
                    selected: false,
                }
            ],
            materialList: [],
            currentMonthList: [],
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            calendarShow: false,
            currentTime: '',
            currentStr: '',
            reportFlag: false,
            onePopup: false,
            twoPopup: false,
            showRightBtn: false,
            headerTabList: [
                { name: '仓库', type: 'warehouseType', selectValue: '' },
                { name: '物料组', type: 'material', selectValue: '' },
                { name: '日期', type: 'time', selectValue: 'time' },
            ],
            legendData: [
                { iconColor: '#73A0FA', text: '入库数量' },
                { iconColor: '#7585A2', text: '出库数量' },
                { iconColor: '#EB7E65', text: '库存净数量' },
            ]
        };
        _this.methods = {
            // 点击筛选条件
            twoPopup: function () {
                _this.twoPopup = !_this.twoPopup;
            },
            onePopup: function () {
                _this.onePopup = !_this.onePopup;
            },
            touchStockFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                _this.reportFlag = true;
                switch (name) {
                    case 'warehouseType':
                        _this.warehouseVisible = !_this.warehouseVisible;
                        _this.materialVisible = false;
                        break;
                    case 'material':
                        _this.warehouseVisible = false;
                        ['materialVisible', 'timeVisible'].forEach(function (v) {
                            if (v.includes(name)) {
                                _this[v] = !_this[v];
                                return;
                            }
                            _this[v] = false;
                        });
                        break;
                    case 'time':
                        _this.materialVisible = false;
                        _this.warehouseVisible = false;
                        _this.calendarShow = true;
                        break;
                    default:
                }
            },
            initFilter: function () { return __awaiter(_this, void 0, void 0, function () {
                var day;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // 初始化物料组
                        return [4 /*yield*/, this.methods.getBaseData({
                                cisCode: wepy_1.default.$instance.globalData.cisCode, "type": 'wlz', userAccount: wepy_1.default.$instance.globalData.account
                            }).then(function (res) {
                                if (res && res.payload && res.payload.data && res.payload.data.length > 0) {
                                    _this.materialList = res.payload.data.map(function (value) {
                                        var key = ramda_1.head(Object.keys(value));
                                        return {
                                            key: key,
                                            value: value[key],
                                        };
                                    });
                                }
                            })];
                        case 1:
                            // 初始化物料组
                            _a.sent();
                            this.methods.selectMaterial(0, '0');
                            day = new Date();
                            this.currentTime = day.Format('yyyy-MM-dd');
                            this.methods.transform(this.currentTime);
                            this.$apply();
                            return [2 /*return*/];
                    }
                });
            }); },
            selectMaterial: function (idx, init) {
                _this.reportFlag = false;
                _this.materialList.forEach(function (value, index) {
                    value.selected = idx === index;
                    if (value.selected) {
                        _this.material = value.value;
                        _this.materialKey = value.key;
                    }
                });
                _this.headerTabList[1].selectValue = _this.material;
                if ('1' === init) {
                    _this.methods.getStock();
                }
                _this.methods.onClose();
            },
            selectWarehouse: function (id) {
                _this.reportFlag = false;
                if (id == '003') {
                    _this.warehouseTitle = '共享仓';
                }
                else if (id == '005') {
                    _this.warehouseTitle = '自有仓';
                }
                else {
                    _this.warehouseTitle = '全部';
                }
                _this.gicWarehouseType = id;
                _this.headerTabList[0].selectValue = id;
                _this.methods.getStock();
                _this.methods.onClose();
            },
            onClose: function () {
                _this.reportFlag = false;
                _this.materialVisible = false;
                _this.warehouseVisible = false;
                _this.calendarShow = false;
            },
            chooseDay: function (evt) {
                this.reportFlag = false;
                var _a = evt.detail, year = _a.year, month = _a.month, day = _a.day;
                var day = year + "-" + index_2.fillZero("" + month) + "-" + index_2.fillZero("" + day);
                this.calendarShow = false;
                this.currentTime = day;
                this.methods.transform(this.currentTime);
                this.methods.getStock();
            },
            transform: function (time) {
                _this.currentStr = time.substr(0, 4) + "\u5E74" + time.substr(5, 2) + "\u6708" + time.substr(8, 2) + "\u65E5";
                _this.headerTabList[2].name = _this.currentStr;
            },
            getDayStock: function () {
                dmsrequest_1.dmsRequest({
                    data: {
                        userAccount: wepy_1.default.$instance.globalData.account,
                        terms: {
                            gicWarehouseType: _this.gicWarehouseType,
                            materialGroupCode: _this.materialKey,
                            date: _this.currentTime,
                        },
                    },
                    method: 'invChangeEverydayReport'
                }).then(function (res) {
                    if (res && res.code == '0') {
                        var tData_1 = [];
                        var inData_1 = [];
                        var outData_1 = [];
                        var netData_1 = [];
                        res.report.forEach(function (v) {
                            tData_1.unshift(v.date);
                            inData_1.unshift(v.in);
                            outData_1.unshift(v.out);
                            netData_1.unshift(v.net);
                        });
                        _this.methods.fillOption(tData_1, inData_1, outData_1, netData_1);
                        _this.$apply();
                    }
                    else {
                        toast_1.default.fail(res.msg || '请求失败');
                    }
                });
            },
            getMonthStock: function () {
                dmsrequest_1.dmsRequest({
                    data: {
                        userAccount: wepy_1.default.$instance.globalData.account,
                        terms: {
                            gicWarehouseType: _this.gicWarehouseType,
                            materialGroupCode: _this.materialKey,
                            date: _this.currentTime,
                        },
                    },
                    method: 'invCurrMonthReport'
                }).then(function (res) {
                    if (res && res.code == '0') {
                        _this.currentMonthList = res.report;
                        _this.currentMonthList = _this.currentMonthList.map(function (item) {
                            item.day = '-';
                            return item;
                        });
                        _this.methods.getInventoryDetailData();
                        toast_1.default.clear();
                        _this.$apply();
                    }
                    else {
                        toast_1.default.fail(res.msg || '请求失败');
                    }
                });
            },
            // 获取库存周转天数
            getInventoryDetailData: function () {
                _this.methods.getInventoryDetail({
                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                    materialGroupCode: _this.materialKey,
                    queryTime: _this.currentTime,
                }).then(function (res) {
                    var _a = res.payload, data = _a.data, code = _a.code, msg = _a.msg;
                    if (code == 0) {
                        _this.currentMonthList = _this.currentMonthList.map(function (item) {
                            var arr = data.chart.filter(function (itm) {
                                var currItm = itm.date.replace(/-/g, '');
                                return currItm == item.date;
                            });
                            if (arr && arr.length) {
                                item.day = arr[0].turnover;
                            }
                            return item;
                        });
                        _this.$apply();
                    }
                    else {
                        toast_1.default.fail(msg || '请求失败');
                    }
                });
            },
            fillOption: function (tData, inData, outData, netData) {
                _this.option = {
                    // title: {
                    //   show: true,
                    //   text: '库存(单位:台)',
                    //   textStyle: {
                    //     fontSize: 15,
                    //     color: '#262626'
                    //   },
                    //   left: 12
                    // },
                    disableTouch: true,
                    legend: {
                        itemWidth: 6,
                        itemHeight: 6,
                        left: 12,
                        top: 6,
                        icon: 'rect',
                        data: ['库存净数量', '入库数量', '出库数量', '周转天数'],
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '10%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            axisTick: { show: false },
                            data: tData
                        }
                    ],
                    series: [
                        {
                            name: '库存净数量',
                            type: 'bar',
                            itemStyle: {
                                color: '#EB7E65'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: netData
                        },
                        {
                            name: '入库数量',
                            type: 'bar',
                            stack: '库存净数量',
                            itemStyle: {
                                color: '#73A0FA'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: inData
                        },
                        {
                            name: '出库数量',
                            type: 'bar',
                            stack: '库存净数量',
                            itemStyle: {
                                color: '#7585A2'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left'
                                }
                            },
                            data: outData
                        },
                    ]
                };
            },
            getStock: function () {
                toast_1.default.loading({
                    duration: 0,
                });
                _this.methods.getMonthStock();
                _this.methods.getDayStock();
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 动态获取提示信息
    StockChart.prototype.getAlert = function () {
        var inventory = index_2.getAlertInfo('14909545633'); // 库存提示信息
        var inventoryQuantity = index_2.getAlertInfo('14909546200'); // 库存提示信息
        this.dynamicMessage.inventory = inventory;
        this.dynamicMessage.inventoryQuantity = inventoryQuantity;
    };
    StockChart.prototype.onShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.methods.initFilter()];
                    case 1:
                        _a.sent();
                        this.methods.getStock();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    StockChart.prototype.onLoad = function () {
        this.previousDayDate = index_2.previousDay();
        this.getAlert();
    };
    ;
    StockChart = __decorate([
        wepy_redux_1.connect({}, {
            getBaseData: purchaseshop_1.getBaseData,
            getInventoryDetail: purchasereport_1.getInventoryDetail,
        })
    ], StockChart);
    return StockChart;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(StockChart , 'pages/chart/stock/index'));

