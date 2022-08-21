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
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var index_2 = require('./../../../utils/index.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var wxCharts = require('./../../../utils/wxcharts.js');
var salesreport_1 = require('./../../../store/actions/salesreport.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var app = getApp();
var SalesReport = /** @class */ (function (_super) {
    __extends(SalesReport, _super);
    function SalesReport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '销售报表',
            usingComponents: {
                'ec-canvas': '/components/ec-canvas/ec-canvas',
                'van-datetime-picker': '../../../components/vant/datetime-picker/index',
                'van-popup': '../../../components/vant/popup/index',
                'calendar': '../../../components/calendar/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "chart1": { "xmlns:v-bind": "", "v-bind:option.sync": "option1", "canvasId": "bbb", "height": "240px" }, "chart2": { "v-bind:option.sync": "option2", "canvasId": "ccc", "height": "240px" }, "chart3": { "v-bind:option.sync": "option3", "canvasId": "zxzx", "height": "338px" } };
        _this.$events = {};
        _this.components = {
            chart: index_1.default,
            chart1: index_1.default,
            chart2: index_1.default,
            chart3: index_1.default
        };
        _this.data = {
            previousDayDate: '',
            dynamicMessage: {
                totalSales: '',
                channelSales: '',
                retailSales: '',
                chainRatio: '',
                yearOnYearGrowthRate: '',
                totalSalesQuantity: '',
                channelSalesQuantity: '',
                retailSalesQuantity: '',
                sales: '',
                salesQuantity: '',
            },
            show: false,
            showTwo: false,
            index: 1,
            indexTop: 2,
            option: null,
            option1: null,
            option2: null,
            option3: null,
            supplier: false,
            supplierItem: {
                value: '全部',
                key: ''
            },
            materialItem: {
                value: '全部',
                key: ''
            },
            material: false,
            terms: {
                documentType: '',
                startDate: '2019-09-01',
                endDate: '2019-12-01'
            },
            maxDate: new Date().getTime(),
            currentDate: new Date().getTime(),
            minDate: new Date(2000, 10, 1).getTime(),
            reallyDate: (new Date()).Format('yyyy-MM'),
            Stats: {
                orgCode: '',
                materialGroupCode: '',
                date: ''
            },
            timePicker: false,
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            calendarShow: false,
            reportFlag: false,
            totalSales: false,
            channelSales: false,
            retailSales: false,
            onePopup: false,
            twoPopup: false,
            threePopup: false,
            fourPopup: false,
        };
        _this.calendarConfig = {
            theme: 'elegant',
            onlyShowCurrentMonth: false,
        };
        _this.openCalendarType = '';
        _this.watch = {
            firstFigure: function (e) {
                // console.log('我是第一幅图')
                _this.option1 = {
                    color: ["#5B8FF9", "#5AD8A6", "#EB7E65"],
                    legend: {
                        data: ['销售总额', '渠道销售额', '零售额'],
                        top: 6,
                        left: 12,
                        icon: 'square',
                        // backgroundColor: 'red',
                        z: 100,
                        itemGap: 35,
                        itemWidth: 8,
                        itemHeight: 8
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 0,
                            end: 100
                        }
                    ],
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
                                padding: [0, 0, 9, 18],
                                backgroundColor: '#6a7985'
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
                        data: e.date,
                    },
                    yAxis: {
                        // show:false,
                        // data: ['0', '100', '200', '300', '400', '500'],
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            color: 'rgba(140, 140, 140, 1)'
                        },
                        axisTick: {
                            show: false
                        },
                        // x: 'center',
                        // type: 'category',
                        splitLine: {
                            lineStyle: {
                                type: 'solid',
                                color: 'rgba(65, 97, 128, 0.15)'
                            }
                        },
                    },
                    series: [{
                            name: '销售总额',
                            type: 'line',
                            // smooth: true,
                            // 是否为曲线
                            areaStyle: {},
                            data: e.totalAmount
                        }, {
                            name: '渠道销售额',
                            type: 'line',
                            // smooth: true,
                            areaStyle: {},
                            data: e.normalAmount
                        }, {
                            name: '零售额',
                            type: 'line',
                            // smooth: true,
                            // 是否为曲线
                            areaStyle: {},
                            data: e.retailAmount
                        }]
                };
            },
            secondFigure: function (e) {
                // console.log('我是第二幅图')
                _this.option2 = {
                    color: ["#5B8FF9", "#5AD8A6", "#EB7E65"],
                    legend: {
                        data: ['销售总量', '渠道销售量', '零售量'],
                        top: 6,
                        left: 12,
                        icon: 'square',
                        // backgroundColor: 'red',
                        z: 100,
                        itemGap: 35,
                        itemWidth: 8,
                        itemHeight: 8
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 0,
                            end: 100
                        }
                    ],
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
                        data: e.date,
                    },
                    yAxis: {
                        // show:false,
                        // data: ['0', '100', '200', '300', '400', '500'],
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            color: 'rgba(140, 140, 140, 1)'
                        },
                        axisTick: {
                            show: false
                        },
                        // x: 'center',
                        // type: 'category',
                        splitLine: {
                            lineStyle: {
                                type: 'solid',
                                color: 'rgba(65, 97, 128, 0.15)'
                            }
                        },
                    },
                    series: [{
                            name: '销售总量',
                            type: 'line',
                            // smooth: true,
                            // 是否为曲线
                            areaStyle: {},
                            data: e.totalQty
                        }, {
                            name: '渠道销售量',
                            areaStyle: {},
                            type: 'line',
                            // smooth: true,
                            data: e.normalQty
                        }, {
                            name: '零售量',
                            areaStyle: {},
                            type: 'line',
                            // smooth: true,
                            data: e.retailQty
                        }]
                };
            },
            supplierItem: function (e) {
                _this.methods.getMaterialGroupReport({
                    supplierCode: e.key,
                    orgId: e.key
                }).then(function (res) {
                    var materialGroup = res.payload.materialGroup;
                    var itemGroup = [];
                    ramda_1.forEachObjIndexed(function (value, key) {
                        var item = {
                            value: value,
                            key: key
                        };
                        itemGroup.push(item);
                    }, materialGroup);
                    _this.materialItem = {
                        value: '全部物料组',
                        key: '',
                    };
                    _this.$apply();
                    _this.getMySalesReport();
                });
            },
            TopMd: function (e) {
                // console.log('我是top图')
                _this.show = false,
                    _this.showTwo = false,
                    _this.indexTop = 2;
                var colors = ['#EB7E65', '#73A0FA'];
                _this.option3 = {
                    color: colors,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        right: '13%',
                        left: 50,
                    },
                    toolbox: {
                        feature: {
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    legend: {
                        data: ['销售金额', '销售量'],
                        left: 20
                    },
                    yAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            // data: e.ranging
                            data: ['第五名', '第四名', '第三名', '第二名', '第一名']
                        }
                    ],
                    xAxis: [
                        {
                            type: 'value',
                            name: '销售金额',
                            // min: 0,
                            // max: 250,
                            position: 'right',
                            axisLine: {
                                lineStyle: {
                                    color: colors[0]
                                }
                            },
                            axisLabel: {
                                formatter: '{value}w'
                            }
                        },
                        {
                            type: 'value',
                            name: '销售量',
                            // min: 0,
                            // max: 250,
                            position: 'right',
                            offset: -265,
                            axisLine: {
                                lineStyle: {
                                    color: colors[1]
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '销售金额',
                            type: 'bar',
                            data: e.amount
                        },
                        {
                            name: '销售量',
                            type: 'bar',
                            xAxisIndex: 1,
                            data: e.qty
                        },
                    ]
                };
            }
        };
        _this.methods = {
            fourPopup: function () {
                _this.fourPopup = !_this.fourPopup;
            },
            threePopup: function () {
                _this.threePopup = !_this.threePopup;
            },
            twoPopup: function () {
                _this.twoPopup = !_this.twoPopup;
            },
            onePopup: function () {
                _this.onePopup = !_this.onePopup;
            },
            whichPopup: function (number) {
                if (number == '1') {
                    _this.totalSales = !_this.totalSales,
                        _this.channelSales = false,
                        _this.retailSales = false;
                }
                else if (number == '2') {
                    _this.totalSales = false,
                        _this.channelSales = !_this.channelSales,
                        _this.retailSales = false;
                }
                else if (number == '3') {
                    _this.totalSales = false,
                        _this.channelSales = false,
                        _this.retailSales = !_this.retailSales;
                }
                else {
                    _this.totalSales = false,
                        _this.channelSales = false,
                        _this.retailSales = false;
                }
            },
            selectTopBars: function (number) {
                _this.indexTop = number;
                var qty = number == 1 ? _this.TopFxs.qty : _this.TopMd.qty;
                var amount = number == 1 ? _this.TopFxs.amount : _this.TopMd.amount;
                var colors = ['#EB7E65', '#73A0FA'];
                _this.option3 = {
                    color: colors,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        right: '13%',
                        left: 50,
                    },
                    toolbox: {
                        feature: {
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    legend: {
                        data: ['销售金额', '销售量'],
                        left: 20
                    },
                    yAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            // data: e.ranging
                            data: ['第五名', '第四名', '第三名', '第二名', '第一名']
                        }
                    ],
                    xAxis: [
                        {
                            type: 'value',
                            name: '销售金额',
                            // min: 0,
                            // max: 250,
                            position: 'right',
                            axisLine: {
                                lineStyle: {
                                    color: colors[0]
                                }
                            },
                            axisLabel: {
                                formatter: '{value}w'
                            }
                        },
                        {
                            type: 'value',
                            name: '销售量',
                            // min: 0,
                            // max: 250,
                            position: 'right',
                            offset: -265,
                            axisLine: {
                                lineStyle: {
                                    color: colors[1]
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '销售金额',
                            type: 'bar',
                            data: amount
                        },
                        {
                            name: '销售量',
                            type: 'bar',
                            xAxisIndex: 1,
                            data: qty
                        },
                    ]
                };
                _this.$apply();
            },
            onCancel: function () {
                _this.timePicker = false;
                _this.reportFlag = false;
            },
            onConfirm: function (e) {
                this.timePicker = false;
                this.reportFlag = false;
                var date = new Date(parseInt(e.detail));
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                var date1 = Y + M;
                this.reallyDate = date1;
                this.$apply();
                this.getMySalesReport();
            },
            closeMaterial: function () {
                _this.material = false;
                _this.reportFlag = false;
            },
            chooseMaterial: function (key) {
                var item = {};
                ramda_1.forEach(function (res) {
                    if (res.key == key) {
                        item.value = res.value;
                        item.key = res.key;
                    }
                }, _this.itemGroup);
                _this.materialItem = __assign({}, item);
                _this.material = false;
                _this.reportFlag = false;
                _this.$apply();
                // TODO: 缺一个触发方法 统一的
                _this.getMySalesReport();
            },
            chooseSupper: function (key) {
                var item = {};
                ramda_1.forEach(function (res) {
                    if (res.key == key) {
                        item.value = res.value;
                        item.key = res.key;
                    }
                }, _this.SuppliersList);
                _this.supplierItem = __assign({}, item);
                _this.supplier = false;
                _this.reportFlag = false;
                _this.$apply();
            },
            closeSupplier: function () {
                _this.supplier = false;
                _this.reportFlag = false;
            },
            touchFilter: function (name) {
                if (name == 'supplier') {
                    _this.supplier = true;
                    _this.reportFlag = true;
                }
                else if (name == 'material') {
                    _this.material = true;
                    _this.reportFlag = true;
                }
                else {
                    _this.timePicker = true;
                    _this.reportFlag = true;
                }
                _this.$apply();
            },
            choseTime: function () {
                _this.calendarShow = !_this.calendarShow;
                _this.reportFlag = false;
            },
            onshow: function () {
                _this.show = !_this.show;
            },
            showTwo: function () {
                _this.showTwo = !_this.showTwo;
            },
            selectTabs: function (number) {
                _this.index = number;
                var documentType = '';
                if (number == 2) {
                    documentType = 'normal';
                }
                else if (number == 3) {
                    documentType = 'retail';
                }
                var now = new Date();
                var month = now.getMonth() + 1;
                var day = now.getDate();
                var account = wepy_1.default.$instance.globalData.account;
                _this.terms = __assign({}, _this.terms, { documentType: documentType, startDate: now.getFullYear() + "-01-01", endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
                _this.$apply();
                // 触发饼状图渲染
                _this.methods.getSalesCategoryScaleReport({
                    userAccount: account,
                    terms: _this.terms
                }).then(function () {
                    _this.methods.onTapChange();
                });
            },
            onTapChange: function () {
                var popup = __assign({ animation: true, canvasId: 'ringCanvas', type: 'ring', extra: {
                        ringWidth: 25,
                        pie: {
                            offsetAngle: -45
                        }
                    }, subtitle: {
                        name: '各品类占比',
                        color: '#AAAAAA',
                        fontSize: 12
                    }, disablePieStroke: true, width: 166, height: 166, dataLabel: false, legend: false, background: '#f5f5f5', padding: 0 }, _this.inventoryReport, { title: [] });
                _this.ringChart = new wxCharts(popup);
                _this.ringChart.addEventListener('renderComplete', function () {
                    // console.log('renderComplete');
                });
                setTimeout(function () {
                    _this.ringChart.stopAnimation();
                }, 500);
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.terms, startDate = _a.startDate, endDate = _a.endDate;
                var name = e.target.dataset.name;
                this.openCalendarType = name;
                if (name === 'startDate') {
                    var c = this.$wxpage.calendar;
                    c.enableArea([minDate, endDate ? endDate : maxDate]);
                    if (startDate) {
                        var dates = ramda_1.split('-', startDate);
                        c.jump(dates[0], parseInt(dates[1], 10), parseInt(dates[2], 10));
                    }
                }
                if (name === 'endDate') {
                    var c = this.$wxpage.calendar;
                    c.enableArea([startDate ? startDate : minDate, maxDate]);
                    if (endDate) {
                        var dates = ramda_1.split('-', endDate);
                        c.jump(dates[0], parseInt(dates[1], 10), parseInt(dates[2], 10));
                    }
                }
                this.calendarShow = true;
                this.reportFlag = true;
            },
            closeCalendar: function () {
                this.reportFlag = false;
                this.calendarShow = false;
            },
            clearCalendar: function (name) {
                var _a;
                this.terms = __assign({}, this.terms, (_a = {}, _a[name] = '', _a));
            },
            chooseDay: function (evt) {
                var _this = this;
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_2.fillZero("" + month) + "-" + index_2.fillZero("" + day);
                this.terms = __assign({}, this.terms, (_a = {}, _a[this.openCalendarType] = day, _a));
                this.calendarShow = false;
                this.reportFlag = false;
                var account = wepy_1.default.$instance.globalData.account;
                this.methods.getSalesCategoryScaleReport({
                    userAccount: account,
                    terms: this.terms
                }).then(function () {
                    _this.methods.onTapChange();
                });
            },
        };
        return _this;
    }
    SalesReport.prototype.getMySalesReport = function () {
        var account = wepy_1.default.$instance.globalData.account;
        this.methods.getSalesStatsReport({
            userAccount: account,
            terms: {
                orgCode: this.supplierItem.key,
                materialGroupCode: this.materialItem.key,
                date: this.reallyDate
            }
        });
        this.methods.getSalesCurrMonthReport({
            userAccount: account,
            terms: {
                orgCode: this.supplierItem.key,
                materialGroupCode: this.materialItem.key,
                date: this.reallyDate
            }
        });
        this.methods.getSalesRankDistributorReport({
            userAccount: account,
            terms: {
                orgCode: this.supplierItem.key,
                materialGroupCode: this.materialItem.key,
                date: this.reallyDate
            }
        });
        this.methods.getSalesRankStoreReport({
            userAccount: account,
            terms: {
                orgCode: this.supplierItem.key,
                materialGroupCode: this.materialItem.key,
                date: this.reallyDate
            }
        });
    };
    // 动态获取提示信息
    SalesReport.prototype.getAlert = function () {
        var totalSales = index_2.getAlertInfo('14909546236');
        var channelSales = index_2.getAlertInfo('14909546450');
        var retailSales = index_2.getAlertInfo('14909546453');
        var chainRatio = index_2.getAlertInfo('14909548185');
        var yearOnYearGrowthRate = index_2.getAlertInfo('14909548188');
        var totalSalesQuantity = index_2.getAlertInfo('14909548572');
        var channelSalesQuantity = index_2.getAlertInfo('14909548576');
        var retailSalesQuantity = index_2.getAlertInfo('14909548590');
        var sales = index_2.getAlertInfo('14909548602');
        var salesQuantity = index_2.getAlertInfo('14909549716');
        this.dynamicMessage = __assign({}, this.dynamicMessage, { totalSales: totalSales,
            channelSales: channelSales,
            retailSales: retailSales,
            chainRatio: chainRatio,
            yearOnYearGrowthRate: yearOnYearGrowthRate,
            totalSalesQuantity: totalSalesQuantity,
            channelSalesQuantity: channelSalesQuantity,
            retailSalesQuantity: retailSalesQuantity,
            sales: sales,
            salesQuantity: salesQuantity });
    };
    SalesReport.prototype.onShow = function () {
        var _this = this;
        this.methods.getBaseDataReport({
            type: 'gys'
        }).then(function (res) {
            var data = res.payload.data;
            var SuppliersList = [];
            ramda_1.forEachObjIndexed(function (value, key) {
                ramda_1.forEachObjIndexed(function (value, key) {
                    var item = {
                        value: value,
                        key: key,
                    };
                    SuppliersList.push(item);
                }, value);
            }, data);
            _this.supplierItem = {
                value: '全部供应商',
                key: '',
            };
            _this.$apply();
        });
        var account = wepy_1.default.$instance.globalData.account;
        this.methods.getSalesCategoryScaleReport({
            userAccount: account,
            terms: this.terms
        }).then(function () {
            _this.methods.onTapChange();
        });
    };
    SalesReport.prototype.onLoad = function () {
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        this.terms = __assign({}, this.terms, { startDate: now.getFullYear() + "-01-01", endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
        this.previousDayDate = index_2.previousDay(); // 时效日期说明
        this.getAlert();
    };
    SalesReport = __decorate([
        wepy_redux_1.connect({
            user: function (_a) {
                var user = _a.user;
                return user;
            },
            inventoryReport: function (_a) {
                var salesreport = _a.salesreport;
                return salesreport.inventoryReport;
            },
            SuppliersList: function (_a) {
                var salesreport = _a.salesreport;
                return salesreport.SuppliersList;
            },
            salesReport: function (_a) {
                var salesreport = _a.salesreport;
                return salesreport.salesReport;
            },
            itemGroup: function (_a) {
                var salesreport = _a.salesreport;
                return salesreport.itemGroup;
            },
            firstFigure: function (_a) {
                var salesreport = _a.salesreport;
                return salesreport.firstFigure;
            },
            secondFigure: function (_a) {
                var salesreport = _a.salesreport;
                return salesreport.secondFigure;
            },
            rankDistributor: function (_a) {
                var salesreport = _a.salesreport;
                return salesreport.rankDistributor;
            },
            rankStore: function (_a) {
                var salesreport = _a.salesreport;
                return salesreport.rankStore;
            },
            TopMd: function (_a) {
                var salesreport = _a.salesreport;
                return salesreport.TopMd;
            },
            TopFxs: function (_a) {
                var salesreport = _a.salesreport;
                return salesreport.TopFxs;
            },
        }, {
            getSalesCategoryScaleReport: salesreport_1.getSalesCategoryScaleReport,
            getSalesStatsReport: salesreport_1.getSalesStatsReport,
            getBaseDataReport: salesreport_1.getBaseDataReport,
            getMaterialGroupReport: salesreport_1.getMaterialGroupReport,
            getSalesCurrMonthReport: salesreport_1.getSalesCurrMonthReport,
            getSalesRankDistributorReport: salesreport_1.getSalesRankDistributorReport,
            getSalesRankStoreReport: salesreport_1.getSalesRankStoreReport
        })
    ], SalesReport);
    return SalesReport;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(SalesReport , 'pages/chart/sales-report/index'));

