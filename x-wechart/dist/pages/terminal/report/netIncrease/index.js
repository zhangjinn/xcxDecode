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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
/* import utilsWxs from '../../../../wxs/utils.wxs'; */
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var purchasereport_1 = require('./../../../../store/actions/purchasereport.js');
var search_1 = require('./../../../../store/actions/search.js');
var index_1 = require('./../../../../utils/index.js');
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            usingComponents: {
                'van-icon': '../../../../components/vant/icon/index',
                'van-popup': '../../../../../components/vant/popup/index',
                "van-datetime-picker": "../../../../../components/vant/datetime-picker/index",
                "van-datetime-picker-end": "../../../../../components/vant/datetime-picker/index"
            },
        };
        _this.components = {};
        _this.data = {
            previousDayDate: '',
            purchaseVisable: false,
            CurrentFilterName: '',
            minStartDate: new Date(2000, 10, 1).getTime(),
            maxStartDate: new Date(2100, 10, 1).getTime(),
            // minEndDate: new Date(2000, 10, 1).getTime(),
            // maxEndDate: new Date().getTime(),
            currentStartDate: new Date().getTime(),
            // currentEndDate: new Date().getTime(),
            filterForm: {
                startDate: (new Date()).Format('yyyy-MM'),
                // endDate: (new Date()).Format('yyyy-MM'),
                cisCode: '',
                runTypeCode: '1',
                // matklCode: [''], // 品类/物料组（多选）
                matklCode: '',
            },
            runTypeList: [
                { id: '1', code: '1', name: '分销商跑动' },
                { id: '2', code: '2', name: '下沉门店跑动明细' },
            ],
            dataArr: [],
            tableData: {
                column: [],
                content: [] // 内容
            },
            reportType: '',
            isMaterialSelect: false,
            isRunTypeSelect: false,
        };
        /**
         * 生命周期函数--监听页面加载
         */
        _this.methods = {
            // 选择供应商
            touchFilter: function (name) {
                if (!_this.purchaseVisable) {
                    if (name === 'startDate') {
                        var curr = _this.filterForm.startDate.replace('-', '/') + '/01';
                        // let max = this.filterForm.endDate.replace('-', '/') + '/01';
                        // this.maxStartDate = new Date(max).getTime()
                        _this.currentStartDate = new Date(curr).getTime();
                    }
                    // if(name === 'endDate'){
                    //   let curr = this.filterForm.endDate.replace('-', '/') + '/01';
                    //   let min = this.filterForm.startDate.replace('-', '/') + '/01';
                    //   this.minEndDate = new Date(min).getTime()
                    //   this.currentEndDate = new Date(curr).getTime()
                    // }
                    _this.purchaseVisable = true;
                    _this.CurrentFilterName = name;
                    _this.$apply();
                    return;
                }
                if (!name) {
                    _this.purchaseVisable = false;
                    _this.CurrentFilterName = '';
                    return;
                }
                if (_this.CurrentFilterName === name) {
                    _this.purchaseVisable = false;
                    _this.CurrentFilterName = '';
                    return;
                }
                if (['startDate', 'endDate', 'material', 'runType'].indexOf(name) > -1) {
                    _this.CurrentFilterName = name;
                    return;
                }
                _this.purchaseVisable = false;
                _this.CurrentFilterName = '';
            },
            // 选择物料组
            onMaterial: function (e) {
                var id = e;
                // 多选方法--暂时隐藏
                // let oIndex = this.filterForm.matklCode.indexOf(id)
                // if (oIndex > -1) {
                //   if(!id){
                //     this.filterForm.matklCode = ['']
                //   }else{
                //     this.filterForm.matklCode.splice(oIndex, 1)
                //     if(this.filterForm.matklCode.length == 0){
                //       this.filterForm.matklCode = ['']
                //     }
                //   }
                // } else {
                //   if(!id){
                //     this.filterForm.matklCode = ['']
                //   }else{
                //     this.filterForm.matklCode.push(id)
                //     this.filterForm.matklCode.forEach((item,index)=>{
                //       if(item == ''){
                //         this.filterForm.matklCode.splice(index,1)
                //       }
                //     })
                //   }
                // }
                this.filterForm.matklCode = id;
                this.purchaseVisable = false;
                this.getData();
                this.$apply();
            },
            // 选择跑动类型
            onRunType: function (e) {
                var id = e;
                this.filterForm.runTypeCode = id;
                this.purchaseVisable = false;
                this.getData();
                this.$apply();
            },
            // 选择开始时间
            onInput: function (e) {
                this.currentStartDate = e.detail;
            },
            onConfirm: function (e) {
                this.purchaseVisable = false;
                var date = new Date(parseInt(e.detail));
                var Y1 = date.getFullYear();
                var M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                var date1 = Y1 + '-' + M1;
                this.filterForm[this.CurrentFilterName] = date1;
                this.getData();
            },
            // 选择结束时间
            onInputEnd: function (e) {
                this.currentEndDate = e.detail;
            },
            onCancel: function () {
                this.purchaseVisable = false;
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 全渠道口径出货
    default_1.prototype.getFullChannel = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            queryTime: startDate.replace(/-/g, ''),
        };
        this.methods.getFullChannel(param).then(function (res) {
            var data = res.payload.data;
            if (data) {
                _this.tableData.content = data;
            }
            _this.$apply();
        });
    };
    // 单击增量业务（前置渠道）
    default_1.prototype.getFrontChannel = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            queryTime: startDate.replace(/-/g, ''),
        };
        this.methods.getFrontChannel(param).then(function (res) {
            var data = res.payload.data;
            if (data && data.frontChannel) {
                _this.tableData.content = [data.frontChannel];
            }
            _this.$apply();
        });
    };
    // 专供机占比
    default_1.prototype.getDedicatedMachine = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            queryTime: startDate.replace(/-/g, ''),
        };
        this.methods.getDedicatedMachine(param).then(function (res) {
            var data = res.payload.data;
            if (data) {
                _this.tableData.content = data;
            }
            _this.$apply();
        });
    };
    // 高中端占比
    default_1.prototype.getMidHigh = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            queryTime: startDate.replace(/-/g, ''),
        };
        this.methods.getMidHigh(param).then(function (res) {
            var data = res.payload.data;
            if (data) {
                _this.tableData.content = data;
            }
            _this.$apply();
        });
    };
    // 销售结构
    default_1.prototype.getSalesStructure = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate, endDate = _a.endDate, matklCode = _a.matklCode;
        var param = {
            cisCode: cisCode,
            queryTimeStart: startDate,
            queryTimeEnd: endDate,
            categoryCode: matklCode,
        };
        this.methods.getSalesStructure(param).then(function (res) {
            var data = res.payload.data;
            _this.tableData.content = data;
            _this.$apply();
        });
    };
    // 分销网络单店产出
    default_1.prototype.getDistributeNetworkOutput = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            queryTime: startDate.replace(/-/g, ''),
        };
        this.methods.getDistributeNetworkOutput(param).then(function (res) {
            var data = res.payload.data;
            if (data && data.distributeNetworkDevelopMaintain && data.distributeNetworkDevelopMaintain.singleOutput) {
                _this.tableData.content = [data.distributeNetworkDevelopMaintain.singleOutput];
            }
            _this.$apply();
        });
    };
    // 分销网络动销率详情
    default_1.prototype.getDistributeNetworkRun = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            queryTime: startDate.replace(/-/g, ''),
        };
        this.methods.getDistributeNetworkRun(param).then(function (res) {
            var data = res.payload.data;
            if (data && data.distributeNetworkDevelopMaintain && data.distributeNetworkDevelopMaintain.dynamicSales) {
                _this.tableData.content = [data.distributeNetworkDevelopMaintain.dynamicSales];
            }
            _this.$apply();
        });
    };
    // 分销网络净增
    default_1.prototype.getDistributeNetworkIncrease = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            queryTime: startDate.replace(/-/g, ''),
        };
        this.methods.getDistributeNetworkIncrease(param).then(function (res) {
            var data = res.payload.data;
            if (data && data.distributeNetworkDevelopMaintain && data.distributeNetworkDevelopMaintain.distributeNetwork) {
                _this.tableData.content = [data.distributeNetworkDevelopMaintain.distributeNetwork];
            }
            _this.$apply();
        });
    };
    // 跑动率
    default_1.prototype.getRunRateDetail = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            dataDate: startDate,
        };
        this.methods.getRunRateDetail(param).then(function (res) {
            var list = res.payload.list;
            if (list) {
                _this.tableData.content = list;
            }
            _this.$apply();
        });
    };
    // 覆盖率
    default_1.prototype.getMarketCoverageDetail = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            dataDate: startDate,
        };
        this.methods.getMarketCoverageDetail(param).then(function (res) {
            var list = res.payload.list;
            if (list) {
                _this.tableData.content = list;
            }
            _this.$apply();
        });
    };
    // 回款提货额
    default_1.prototype.getCollectionDeliveryDetail = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            dataDate: startDate,
        };
        this.methods.getCollectionDeliveryDetail(param).then(function (res) {
            var list = res.payload.list;
            if (list) {
                _this.tableData.content = list;
            }
            _this.$apply();
        });
    };
    // 毛利率
    default_1.prototype.getGrossMarginDetail = function () {
        var _this = this;
        var _a = this.filterForm, cisCode = _a.cisCode, startDate = _a.startDate;
        var param = {
            cisCode: cisCode,
            dataDate: startDate,
        };
        this.methods.getGrossMarginDetail(param).then(function (res) {
            var list = res.payload.list;
            if (list) {
                _this.tableData.content = list;
            }
            _this.$apply();
        });
    };
    default_1.prototype.getData = function () {
        // 分销网络净增
        if (this.reportType == 'netIncrease') {
            this.getDistributeNetworkIncrease();
        }
        // 分销网络动销率
        if (this.reportType == 'onlineSalesRate') {
            this.getDistributeNetworkRun();
        }
        // 分销网络单店产出
        if (this.reportType == 'onlineStoreOutput') {
            this.getDistributeNetworkOutput();
        }
        // 销售结构
        if (this.reportType == 'salesStructure') {
            this.getSalesStructure();
        }
        // 高中端占比表
        if (this.reportType == 'middleHighProportion') {
            this.getMidHigh();
        }
        // 专供机占比
        if (this.reportType == 'machinesProportion') {
            this.getDedicatedMachine();
        }
        // 增量业务(前置渠道)
        if (this.reportType == 'incrementalBusiness') {
            this.getFrontChannel();
        }
        // 全渠道口径出货
        if (this.reportType == 'omniChannelCaliber') {
            this.getFullChannel();
        }
        // 回款提货额
        if (this.reportType == 'cashBackPickUp') {
            this.getCollectionDeliveryDetail();
        }
        // 跑动率
        if (this.reportType == 'runningRate') {
            this.getRunRateDetail();
        }
        // 毛利率
        if (this.reportType == 'grossProfitMargin') {
            this.getGrossMarginDetail();
        }
        // 覆盖率
        if (this.reportType == 'coverage') {
            this.getMarketCoverageDetail();
        }
    };
    default_1.prototype.tableInit = function () {
        this.filterForm.cisCode = wepy_1.default.$instance.globalData.cisCode;
        // 分销网络净增
        if (this.reportType == 'netIncrease') {
            wx.setNavigationBarTitle({ title: '分销网络净增' });
            this.tableData.column = [
                { prop: 'annualTarget', label: '年累目标' },
                { prop: 'monthAccomplish', label: '当月完成' },
                { prop: 'annualAccomplish', label: '年累完成' },
            ];
        }
        // 分销网络动销率
        if (this.reportType == 'onlineSalesRate') {
            wx.setNavigationBarTitle({ title: '分销网络动销率' });
            this.tableData.column = [
                { prop: 'monthRate', label: '当月动销率' },
                { prop: 'monthNum', label: '当月动销数量' },
                { prop: 'monthRateTarget', label: '当月动销率目标' },
                { prop: 'compareLastYear', label: '同比改善率' }
            ];
        }
        // 分销网络单店产出
        if (this.reportType == 'onlineStoreOutput') {
            wx.setNavigationBarTitle({ title: '分销网络单店产出' });
            this.tableData.column = [
                { prop: 'singleOutput', label: '当月完成(万元)' },
                { prop: 'singleOutputTarget', label: '当月目标(万元)' },
                { prop: 'monthSingleOutputCompletion', label: '完成率' },
                { prop: 'compareLastYear', label: '同比增幅' }
            ];
        }
        // 销售结构
        // if(this.reportType == 'salesStructure'){
        //   wx.setNavigationBarTitle({ title: '销售结构' })
        //   this.isMaterialSelect = true
        //   this.tableData.column =[
        //     {prop:'time', label:'时间'},
        //     {prop:'categoryName', label:'品类'},
        //     {prop:'midHighPlan', label:'高中端目标'},
        //     {prop:'midHighComplete', label:'当月完成'}]
        // }
        // 高中端占比表
        if (this.reportType == 'middleHighProportion') {
            wx.setNavigationBarTitle({ title: '高中端占比' });
            this.tableData.column = [
                { prop: 'categoryName', label: '品类' },
                { prop: 'target', label: '占比目标' },
                { prop: 'accomplish', label: '当月完成' },
                { prop: 'completion', label: '完成率' },
                { prop: 'chain', label: '环比' },
                { prop: 'year', label: '同比' },
            ];
        }
        // 专供机占比
        if (this.reportType == 'machinesProportion') {
            wx.setNavigationBarTitle({ title: '专供机占比' });
            this.tableData.column = [
                { prop: 'categoryName', label: '品类' },
                { prop: 'target', label: '占比目标' },
                { prop: 'accomplish', label: '当月占比' },
                { prop: 'completion', label: '完成率' },
                { prop: 'chain', label: '环比' },
                { prop: 'year', label: '同比' },
            ];
        }
        // 增量业务(前置渠道)
        if (this.reportType == 'incrementalBusiness') {
            wx.setNavigationBarTitle({ title: '增量业务(前置渠道)' });
            this.tableData.column = [
                { prop: 'proportionTarget', label: '占比目标' },
                { prop: 'currentMonthProportion', label: '当月占比' },
                { prop: 'completion', label: '完成率' },
                { prop: 'compareLastMonth', label: '环比' },
                { prop: 'compareLastYear', label: '同比' },
            ];
        }
        // 全渠道口径出货
        if (this.reportType == 'omniChannelCaliber') {
            wx.setNavigationBarTitle({ title: '全渠道口径出货' });
            this.tableData.column = [
                { prop: 'categoryName', label: '品类' },
                { prop: 'target', label: '当月完成(万元)' },
                { prop: 'accomplish', label: '当月目标(万元)' },
                { prop: 'completion', label: '完成率' },
            ];
        }
        // 回款提货额
        if (this.reportType == 'cashBackPickUp') {
            wx.setNavigationBarTitle({ title: '回款提货额' });
            this.tableData.column = [
                { prop: 'mgName', label: '品类' },
                { prop: 'collectionTarget', label: '当月任务(万元)' },
                { prop: 'collectionCurrent', label: '当月完成(万元)' },
                { prop: 'collectionCompletionRate', label: '完成率' },
                { prop: 'collectionYearOverYear', label: '同比' },
                { prop: 'collectionMonthOverRate', label: '环比' },
            ];
        }
        // 跑动率
        if (this.reportType == 'runningRate') {
            wx.setNavigationBarTitle({ title: '跑动率' });
            this.tableData.column = [
                { prop: 'type', label: '类型' },
                { prop: 'ypdmds', label: '已跑动门店数' },
                { prop: 'pdl', label: '跑动率' },
            ];
        }
        // 毛利率
        if (this.reportType == 'grossProfitMargin') {
            wx.setNavigationBarTitle({ title: '毛利率' });
            // this.isMaterialSelect = true
            this.tableData.column = [
                { prop: 'mgName', label: '品类' },
                { prop: 'grossMargin', label: '毛利点位' },
                { prop: 'basicOperationPoint', label: '基本运营点位' },
                { prop: 'grossTotalAmount', label: '金额(万元)' },
                { prop: 'hb', label: '环比' },
                { prop: 'tb', label: '同比' }
            ];
        }
        // 覆盖率
        if (this.reportType == 'coverage') {
            wx.setNavigationBarTitle({ title: '覆盖率' });
            this.tableData.column = [
                { prop: 'yfgxzzs', label: '已覆盖乡镇总数' },
                { prop: 'yingfgxzzs', label: '应覆盖乡镇总数' },
                { prop: 'fgl', label: '当月市场覆盖率' },
                { prop: 'fglhb', label: '当月环比' }
            ];
        }
        if (this.isMaterialSelect) { // 如果有品类选项，需要调品类列表接口
            this.methods.grtFilterItemGroup();
        }
        this.getData();
        this.$apply();
    };
    default_1.prototype.onShow = function () {
        this.previousDayDate = index_1.previousDay();
        this.tableInit();
    };
    default_1.prototype.onLoad = function (e) {
        var type = e.type;
        this.reportType = type;
    };
    default_1 = __decorate([
        wepy_redux_1.connect({
            matklList: function (_a) {
                var search = _a.search;
                return search.dmsmatklList2;
            }
        }, {
            grtFilterItemGroup: search_1.grtFilterItemGroup,
            getGrossMarginDetail: purchasereport_1.getGrossMarginDetail,
            getCollectionDeliveryDetail: purchasereport_1.getCollectionDeliveryDetail,
            getMarketCoverageDetail: purchasereport_1.getMarketCoverageDetail,
            getRunRateDetail: purchasereport_1.getRunRateDetail,
            getDistributeNetworkIncrease: purchasereport_1.getDistributeNetworkIncrease,
            getDistributeNetworkRun: purchasereport_1.getDistributeNetworkRun,
            getDistributeNetworkOutput: purchasereport_1.getDistributeNetworkOutput,
            getSalesStructure: purchasereport_1.getSalesStructure,
            getDedicatedMachine: purchasereport_1.getDedicatedMachine,
            getMidHigh: purchasereport_1.getMidHigh,
            getFullChannel: purchasereport_1.getFullChannel,
            getFrontChannel: purchasereport_1.getFrontChannel,
        })
    ], default_1);
    return default_1;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(default_1 , 'pages/terminal/report/netIncrease/index'));

