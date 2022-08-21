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
var index_1 = require('./../../../components/echarts/index.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var purchasereport_1 = require('./../../../store/actions/purchasereport.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_2 = require('./../../../utils/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '渠道采购报表',
            usingComponents: {
                'ec-canvas': '/components/ec-canvas/ec-canvas',
                'van-icon': '../../../components/vant/icon/index',
                'van-popup': '../../../../components/vant/popup/index',
                "van-datetime-picker": "../../../../components/vant/datetime-picker/index"
            },
        };
        _this.$repeat = {};
        _this.$props = { "chart1": { "v-bind:option.sync": "option1", "canvasId": "bbb", "height": "240px" }, "chart2": { "v-bind:option.sync": "option2", "canvasId": "ccc", "height": "240px" }, "headerTab": { "xmlns:v-bind": "", "v-bind:showRightBtn.once": "showRightBtn", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchFilter" } };
        _this.components = {
            chart: index_1.default,
            chart1: index_1.default,
            chart2: index_1.default,
            headerTab: index_3.default,
        };
        _this.data = {
            previousDayDate: '',
            dynamicMessage: {
                pickUpAmount: '',
                pickUpQuantity: '',
                chainRatio: '',
            },
            option1: null,
            option2: null,
            ringChart: {},
            purchaseVisable: false,
            CurrentFilterName: '',
            maxDate: new Date().getTime(),
            currentDate: new Date().getTime(),
            minDate: new Date(2000, 10, 1).getTime(),
            materialItem: {
                name: '全部物料组',
                code: ''
            },
            selectDate: (new Date()).Format('yyyy年MM月'),
            filterForm: {
                queryDate: (new Date()).Format('yyyy-MM'),
                orgId: '',
                matkl: '',
            },
            reportFlag: false,
            deliveryAmount: false,
            whichPopup: false,
            deliverySchedule: false,
            deliveryScale: false,
            showRightBtn: false,
            headerTabList: [
                { name: '物料组', type: 'material', selectValue: '' },
                { name: (new Date()).Format('yyyy年MM月'), type: 'date', selectValue: (new Date()).Format('yyyy年MM月') },
            ],
        };
        _this.watch = {
            channelData: function (e) {
                _this.option1 = {
                    color: ["#5AD8A6"],
                    legend: {
                        data: ['提货额'],
                        top: 6,
                        left: 12,
                        icon: 'square',
                        itemGap: 35,
                        itemWidth: 8,
                        itemHeight: 8,
                        z: 100
                    },
                    grid: {
                        left: 56,
                        right: 12,
                        top: 60,
                    },
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        axisPointer: {
                            label: {
                                padding: [0, 0, 9, 18]
                            }
                        }
                    },
                    xAxis: {
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(65, 97, 128, 0.15)',
                            }
                        },
                        axisLabel: {
                            color: 'rgba(140, 140, 140, 1)'
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: e.DateStr,
                    },
                    yAxis: {
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            color: 'rgba(140, 140, 140, 1)'
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'solid',
                                color: 'rgba(65, 97, 128, 0.15)'
                            }
                        },
                    },
                    series: [{
                            name: '提货额',
                            type: 'line',
                            data: e.amount
                        }]
                };
                _this.option2 = {
                    color: ["#7585A2"],
                    legend: {
                        data: ['提货量'],
                        top: 6,
                        left: 12,
                        icon: 'square',
                        itemGap: 35,
                        itemWidth: 8,
                        itemHeight: 8,
                        z: 100
                    },
                    grid: {
                        // containLabel: true
                        left: 56,
                        right: 12,
                        top: 60,
                    },
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        axisPointer: {
                            label: {
                                padding: [0, 0, 9, 18]
                            }
                        }
                    },
                    xAxis: {
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(65, 97, 128, 0.15)',
                            }
                        },
                        axisLabel: {
                            color: 'rgba(140, 140, 140, 1)'
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: e.DateStr
                    },
                    yAxis: {
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            color: 'rgba(140, 140, 140, 1)'
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'solid',
                                color: 'rgba(65, 97, 128, 0.15)'
                            }
                        },
                    },
                    series: [{
                            name: '提货量',
                            type: 'line',
                            data: e.qty
                        }
                    ]
                };
                _this.$apply();
            },
        };
        _this.methods = {
            deliveryScale: function () {
                _this.deliveryScale = !_this.deliveryScale;
            },
            deliverySchedule: function () {
                _this.deliverySchedule = !_this.deliverySchedule;
            },
            openNotice: function (number) {
                if (number == '1') {
                    _this.deliveryAmount = !_this.deliveryAmount;
                    _this.whichPopup = false;
                }
                else if (number == '2') {
                    _this.whichPopup = !_this.whichPopup;
                    _this.deliveryAmount = false;
                }
            },
            // 选择供应商
            touchFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (!_this.purchaseVisable) {
                    _this.purchaseVisable = true;
                    _this.reportFlag = true;
                    _this.CurrentFilterName = name;
                    return;
                }
                if (!name) {
                    _this.purchaseVisable = false;
                    _this.reportFlag = false;
                    _this.CurrentFilterName = '';
                    return;
                }
                if (_this.CurrentFilterName === name) {
                    _this.purchaseVisable = false;
                    _this.reportFlag = false;
                    _this.CurrentFilterName = '';
                    return;
                }
                if (['supplier', 'material'].indexOf(name) > -1) {
                    _this.CurrentFilterName = name;
                    return;
                }
                _this.purchaseVisable = false;
                _this.reportFlag = false;
                _this.CurrentFilterName = '';
            },
            // 选择物料组
            onMaterial: function (e) {
                var _this = this;
                ramda_1.forEach(function (res) {
                    if (res.code == e) {
                        _this.materialItem = {
                            name: res.name,
                            code: res.code
                        };
                    }
                }, this.ItemgroupList);
                this.purchaseVisable = false;
                this.reportFlag = false;
                this.filterForm = __assign({}, this.filterForm, { matkl: this.materialItem.code });
                this.headerTabList[0].selectValue = this.materialItem.code;
                this.$apply();
                this.getMyChannelList();
            },
            // 选择时间
            onInput: function (e) {
                this.currentDate = e.detail;
            },
            onConfirm: function (e) {
                this.reportFlag = false;
                this.purchaseVisable = false;
                var date = new Date(parseInt(e.detail));
                var Y = date.getFullYear() + '年';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
                var date1 = Y + M;
                this.selectDate = date1;
                this.headerTabList[1].name = this.selectDate;
                var Y1 = date.getFullYear();
                var M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                var a = Y1.toString();
                var date2 = a + '-' + M1;
                this.filterForm.queryDate = date2;
                this.getMyChannelList();
            },
            onCancel: function () {
                this.reportFlag = false;
                this.purchaseVisable = false;
            },
        };
        return _this;
    }
    default_1.prototype.getMyChannelList = function () {
        var account = wepy_1.default.$instance.globalData.account;
        this.methods.getChannelReportList({
            userAccount: account,
            terms: {
                materialGroupCode: this.materialItem.code,
                date: this.filterForm.queryDate
            }
        });
    };
    // 动态获取提示信息
    default_1.prototype.getAlert = function () {
        var pickUpAmount = index_2.getAlertInfo('14922074279');
        var pickUpQuantity = index_2.getAlertInfo('14922074281');
        var chainRatio = index_2.getAlertInfo('14922076562');
        this.dynamicMessage = __assign({}, this.dynamicMessage, { pickUpAmount: pickUpAmount,
            pickUpQuantity: pickUpQuantity,
            chainRatio: chainRatio });
    };
    default_1.prototype.onShow = function () {
        this.methods.getChannelWlzList();
        this.getMyChannelList();
        var date = new Date();
        var Y1 = date.getFullYear();
        var M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var a = Y1.toString();
        var date2 = a + '-' + M1;
        this.filterForm.queryDate = date2;
        this.$apply();
    };
    default_1.prototype.onLoad = function () {
        this.previousDayDate = index_2.previousDay();
        this.getAlert();
    };
    default_1 = __decorate([
        wepy_redux_1.connect({
            currentMonth: function (_a) {
                var purchasereport = _a.purchasereport;
                return purchasereport.currentMonth;
            },
            channelData: function (_a) {
                var purchasereport = _a.purchasereport;
                return purchasereport.channelData;
            },
            matklList: function (_a) {
                var purchasereport = _a.purchasereport;
                return purchasereport.matklList;
            },
            ItemgroupList: function (_a) {
                var purchasereport = _a.purchasereport;
                return purchasereport.ItemgroupList;
            }
        }, {
            getChannelReportList: purchasereport_1.getChannelReportList,
            getChannelWlzList: purchasereport_1.getChannelWlzList
        })
    ], default_1);
    return default_1;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(default_1 , 'pages/chart/channel-report/index'));

