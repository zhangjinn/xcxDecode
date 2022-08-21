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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var purchasereport_1 = require('./../../../store/actions/purchasereport.js');
var index_1 = require('./../../../utils/index.js');
var customize_charts_1 = require('./../../../utils/customize-charts.js');
var index_2 = require('./../../../components/echarts/index.js');
var home_1 = require('./../../../store/actions/home.js');
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '综合评价',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-popup': '../../../components/vant/popup/index',
                "van-datetime-picker": "../../../components/vant/datetime-picker/index",
                'van-circle': '../../../components/vant/circle/index',
                'ec-canvas': '../../../components/ec-canvas/ec-canvas'
            },
        };
        _this.$repeat = {};
        _this.$props = { "chartOverview": { "xmlns:v-bind": "", "v-bind:option.sync": "optionOverview", "canvasId": "overview111", "width": "150px", "height": "150px" } };
        _this.$events = {};
        _this.components = {
            chartOverview: index_2.default,
        };
        _this.data = {
            previousDayDate: '',
            imgObj: {
                'coreFunctionEvaluationBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518577_8fbf3867171e439994af0e34876119db.png',
            },
            purchaseVisable: false,
            CurrentFilterName: '',
            maxDate: new Date().getTime(),
            currentDate: new Date().getTime(),
            minDate: new Date(2000, 10, 1).getTime(),
            selectDate: (new Date()).Format('yyyy.MM'),
            filterForm: {
                queryDate: (new Date()).Format('yyyy-MM'),
            },
            gradientColor: {
                '0%': '#8FE7E3',
                '100%': '#59CDC8',
            },
            canvasImg: '',
            isUnfold: false,
            isUnfoldMp: false,
            salesStructure: {},
            netIncrease: {},
            onlineSalesRate: {},
            onlineStoreOutput: {},
            machinesProportion: {},
            incrementalBusiness: {},
            gaozhongduanZB: {},
            optionOverview: {},
            reportData: {
                overview: {
                    totalScore: "0",
                    ranking: "0",
                    customerNum: "0",
                    summaryScoreList: [
                        {
                            name: "全渠道口径出货",
                            fullScore: "0",
                            score: "0",
                            value: "0",
                            icon: ''
                        },
                        {
                            name: "分销网络拓展与维护",
                            fullScore: "0",
                            score: "0",
                            value: "0",
                            icon: 'distribution-network-icon'
                        },
                        {
                            name: "增值业务(前置渠道)",
                            fullScore: "0",
                            score: "0",
                            value: "0",
                            icon: 'value-added-icon'
                        },
                        {
                            name: "销售结构",
                            fullScore: "0",
                            score: "0",
                            value: "0",
                            icon: 'sales-structure-icon'
                        },
                    ]
                },
            },
            showCharts: false
        };
        _this.methods = {
            goToUrl: function (type) {
                var url = '/pages/terminal/report/netIncrease/index?type=' + type;
                if (url) {
                    wx.navigateTo({
                        url: url
                    });
                }
            },
            expandCollapse: function () {
                this.isUnfold = !this.isUnfold;
            },
            expandCollapseMp: function () {
                this.isUnfoldMp = !this.isUnfoldMp;
            },
            touchFilter: function (name) {
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
            // 选择时间
            onInput: function (e) {
                this.currentDate = e.detail;
                this.showCharts = true;
            },
            onConfirm: function (e) {
                this.purchaseVisable = false;
                var date = new Date(parseInt(e.detail));
                var Y = date.getFullYear();
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                this.selectDate = Y + '.' + M;
                this.filterForm.queryDate = Y + '-' + M;
                this.getOverviewData();
                this.getSanLiuLingExperienceData();
                this.showCharts = false;
                this.$apply();
            },
            onCancel: function () {
                this.purchaseVisable = false;
            },
            getValues: function () {
            },
            // 进度条子组件传值
            getCanvasImg: function (imgUrl) {
                this.canvasImg = imgUrl.detail;
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 获取综合评价报表
    default_1.prototype.getOverviewData = function () {
        var _this = this;
        var param = {
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            queryTime: this.filterForm.queryDate,
        };
        this.methods.getComprehensive(param).then(function (res) {
            var data = res.payload.data;
            if (data && data.comprehensiveEvaluation) {
                var chartData = data.comprehensiveEvaluation;
                _this.reportData.overview.totalScore = chartData.totalScore || 0;
                _this.reportData.overview.ranking = chartData.ranking || 0;
                _this.reportData.overview.customerNum = chartData.customerNum || 0;
                if (chartData.summaryScoreList && chartData.summaryScoreList.length > 0) {
                    chartData.summaryScoreList.forEach(function (item) {
                        if (item.name === '全渠道口径出货') {
                            _this.reportData.overview.summaryScoreList[0].fullScore = item.fullScore || 0;
                            _this.reportData.overview.summaryScoreList[0].score = item.score || 0;
                            _this.reportData.overview.summaryScoreList[0].value = item.score || 0;
                        }
                        if (item.name === '分销网络拓展与维护') {
                            _this.reportData.overview.summaryScoreList[1].fullScore = item.fullScore || 0;
                            _this.reportData.overview.summaryScoreList[1].score = item.score || 0;
                            _this.reportData.overview.summaryScoreList[1].value = item.score || 0;
                        }
                        if (item.name === '增值业务(前置渠道)') {
                            _this.reportData.overview.summaryScoreList[2].fullScore = item.fullScore || 0;
                            _this.reportData.overview.summaryScoreList[2].score = item.score || 0;
                            _this.reportData.overview.summaryScoreList[2].value = item.score || 0;
                        }
                        if (item.name === '销售结构') {
                            _this.reportData.overview.summaryScoreList[3].fullScore = item.fullScore || 0;
                            _this.reportData.overview.summaryScoreList[3].score = item.score || 0;
                            _this.reportData.overview.summaryScoreList[3].value = item.score || 0;
                        }
                    });
                }
                _this.optionOverview = customize_charts_1.optionOverviewData(_this.reportData.overview.summaryScoreList, _this.reportData.overview.totalScore);
                _this.$apply();
            }
            else {
                _this.optionOverview = customize_charts_1.optionOverviewData(_this.reportData.overview.summaryScoreList, _this.reportData.overview.totalScore);
                _this.$apply();
            }
        });
        this.$apply();
    };
    default_1.prototype.getSanLiuLingExperienceData = function () {
        var _this = this;
        var param = {
            queryTime: this.filterForm.queryDate,
            cisCode: wepy_1.default.$instance.globalData.cisCode,
        };
        this.methods.getSanLiuLingExperienceList(param).then(function (res) {
            var data = res.payload.data;
            if (data.individualEvaluations && data.individualEvaluations.length > 0) {
                data.individualEvaluations.forEach(function (item) {
                    item.weightNum = parseFloat(item.weight);
                    var functionName = item.functionName.replace(/\s*/g, "");
                    if (functionName === '全渠道口径出货') {
                        _this.salesStructure = item;
                        _this.salesStructure.pm = item && item.rankingShow ? item.rankingShow.split('/')[0].trim() : '';
                        _this.salesStructure.zf = item && item.rankingShow ? item.rankingShow.split('/')[1] : '';
                    }
                    if (functionName === '分销网络净增') {
                        _this.netIncrease = item;
                    }
                    if (functionName === '分销网络动销率') {
                        _this.onlineSalesRate = item;
                    }
                    if (functionName === '分销网络单店产出') {
                        _this.onlineStoreOutput = item;
                    }
                    if (functionName === '专供机占比') {
                        _this.machinesProportion = item;
                    }
                    if (functionName === '增量业务(前置渠道)') {
                        _this.incrementalBusiness = item;
                    }
                    if (functionName === '高中端占比') {
                        _this.gaozhongduanZB = item;
                    }
                });
            }
            else {
                _this.salesStructure = {};
                _this.netIncrease = {};
                _this.onlineSalesRate = {};
                _this.onlineStoreOutput = {};
                _this.machinesProportion = {};
                _this.incrementalBusiness = {};
                _this.gaozhongduanZB = {};
            }
            _this.$apply();
        });
    };
    default_1.prototype.onShow = function () {
        var date = new Date();
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        this.selectDate = Y + '.' + M;
        this.filterForm.queryDate = Y + '-' + M;
        this.previousDayDate = index_1.previousDay();
        this.getOverviewData();
        this.getSanLiuLingExperienceData();
        this.$apply();
    };
    default_1 = __decorate([
        wepy_redux_1.connect({
            experienceList: function (_a) {
                var purchasereport = _a.purchasereport;
                return purchasereport.sanLiuLingExperienceList;
            },
        }, {
            getSanLiuLingExperienceList: purchasereport_1.getSanLiuLingExperienceList,
            getComprehensive: home_1.getComprehensive
        })
    ], default_1);
    return default_1;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(default_1 , 'pages/chart/experience-report/index'));

