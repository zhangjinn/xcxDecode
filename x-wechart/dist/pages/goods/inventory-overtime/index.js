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
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var request_1 = require('./../../../utils/request.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var inventory_1 = require('./../../../store/types/inventory.js');
var request_2 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../utils/index.js');
var toast_2 = require('./../../../components/vant/toast/toast.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var InventoryOverTime = /** @class */ (function (_super) {
    __extends(InventoryOverTime, _super);
    function InventoryOverTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '可共享库存',
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
                'van-checkbox': '../../../components/vant/checkbox/index',
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
                'van-datetime-picker': '../../../components/vant/datetime-picker/index'
            }
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "库存" }, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
        };
        _this.data = {
            guideImg: wepy_1.default.$appConfig.baseUrl + "/assets/weixin/index/check-guide-img.png",
            inventoryList: [],
            orgList: [],
            matklList: [],
            qualityGradeList: [],
            stockList: [],
            inputvalue: '',
            inputvalue2: '',
            inputvalue3: '',
            Warehouserel: '',
            warehouseName: '仓库',
            orgName: '组织',
            warehouseTitle: '仓库类型',
            itemgroup: '物料组',
            isCheckAll: false,
            WarehouseListvisible: false,
            qualityGradeName: '选择',
            invStatusTypeName: '全部',
            visible: false,
            warehouseVisible: false,
            qualityGradeVisible: false,
            invStatusTypeVisible: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            calendarShow: false,
            currentDateName: '',
            lockName: '',
            dateSelVisable: false,
            // maxDate: new Date().getTime(),
            currentDate: new Date().getTime(),
            // minDate: new Date(2000, 10, 1).getTime(),
            dateType: 'endTime',
            filterForm: {
                productName: '',
                matkl: '',
                matnr: '',
                stockId: '',
                storageAge: '',
                storageAgeName: '库龄',
                pageSize: 1000,
                pageNo: 1,
                exceedDaysStart: '',
                exceedDaysEnd: '',
                storageAgeDaysStart: '',
                storageAgeDaysEnd: '',
                orgId: '',
                timeFrame: '',
                documentDateFrom: '',
                documentDateTo: '',
                whetherToWarn: '',
                whetherToWarnName: '',
                sharedLogo: '',
                sharedLogoName: '',
                qualityGrade: '',
                qualityGradeName: '',
                inventoryStatus: '',
                inventoryStatusName: '',
            },
            showCheck: false,
            showCheckedOnly: false,
            showGuide: false,
            startTimeStr: '',
            endTimeStr: '',
            baseUrl: request_1.baseUrl,
            storageAgeList: [
                { 'key': '0-30', 'value': '<30' },
                { 'key': '30-60', 'value': '30~60' },
                { 'key': '60-90', 'value': '60~90' },
                { 'key': '90-', 'value': '>90' }
            ],
            shareFlagList: [
                { 'key': '1', 'value': '是' },
                { 'key': '0', 'value': '否' }
            ],
            whetherToWarnList: [
                { 'key': 'Y', 'value': '是' },
                { 'key': 'N', 'value': '否' }
            ],
            inventoryStatusList: [
                { 'key': '110', 'value': '在库' },
            ],
            orgIds: [],
            stockIds: [],
            matklIds: [],
            qualityGradeIds: [],
            qualityGradeNames: [],
            productNameList: [],
            matnrNameList: [],
            productIds: [],
            productName: '',
            matnrName: '',
            productNameShowed: false,
            matnrNameShowed: false,
            matnrIds: [],
            timeFrameVisible: false,
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            timeList: [
                { label: '全部日期', value: '' },
                { label: '最近一周', value: '7' },
                { label: '最近一个月', value: '1' },
                { label: '最近三个月', value: '3' },
                { label: '最近六个月', value: '6' },
            ],
            timeFrameCenter: '',
            agentPopup: false,
            popupTitle: '',
            headerTabList: [
                { name: '组织', type: 'orgName', selectValue: '' },
                { name: '仓库', type: 'warehouseName', selectValue: '' },
                { name: '物料组', type: 'itemgroup', selectValue: '' },
                { name: '库龄', type: 'storageAge', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 切换顶部快捷筛选
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
                if (['orgName', 'warehouseName', 'itemgroup', 'storageAge'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            selectWarehouseStatus: function (value, qualityGradeId) {
                if (!qualityGradeId) {
                    _this.qualityGradeIds = [];
                    _this.qualityGradeNames = [];
                }
                else {
                    var index = _this.qualityGradeIds.findIndex(function (it) { return it == qualityGradeId; });
                    if (index > -1) {
                        _this.qualityGradeIds.splice(index, 1);
                        _this.qualityGradeNames.splice(index, 1);
                    }
                    else {
                        _this.qualityGradeIds.push(qualityGradeId);
                        _this.qualityGradeNames.push(value);
                    }
                }
                _this.filterForm = __assign({}, _this.filterForm, { qualityGrade: _this.qualityGradeIds.join(',') });
                _this.filterForm = __assign({}, _this.filterForm, { qualityGradeName: _this.qualityGradeNames.join(',') });
            },
            onSelectWarehouseList: function (value, key) {
                _this.filterForm = __assign({}, _this.filterForm, { stockId: key });
                _this.warehouseName = value;
                _this.warehouseVisible = false;
            },
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            //仓库选择
            onSelectWarehouseName: function (stockId, warehouseName) {
                if (!stockId) {
                    this.stockIds = [];
                }
                else {
                    var index = this.stockIds.findIndex(function (it) { return it == stockId; });
                    if (index > -1) {
                        this.stockIds.splice(index, 1);
                    }
                    else {
                        this.stockIds.push(stockId);
                    }
                }
                this.filterForm = __assign({}, this.filterForm, { stockId: this.stockIds.join(','), pageNo: 1 });
                this.headerTabList[1].selectValue = this.stockIds.join(',');
                this.methods.getOverTimeList();
            },
            //组织选择
            onSelectOrg: function (orgId, orgName) {
                if (!orgId) {
                    this.orgIds = [];
                }
                else {
                    var index = this.orgIds.findIndex(function (it) { return it == orgId; });
                    if (index > -1) {
                        this.orgIds.splice(index, 1);
                    }
                    else {
                        this.orgIds.push(orgId);
                    }
                }
                this.filterForm = __assign({}, this.filterForm, { orgId: this.orgIds.join(','), pageNo: 1 });
                this.headerTabList[0].selectValue = this.orgIds.join(',');
                this.methods.getStockList();
                this.methods.getMatklList();
                this.methods.getOverTimeList();
            },
            // 物料组下拉列表
            onSelectStatus: function (matklId, name) {
                if (!matklId) {
                    this.matklIds = [];
                }
                else {
                    var index = this.matklIds.findIndex(function (it) { return it == matklId; });
                    if (index > -1) {
                        this.matklIds.splice(index, 1);
                    }
                    else {
                        this.matklIds.push(matklId);
                    }
                }
                this.filterForm = __assign({}, this.filterForm, { matkl: this.matklIds.join(','), pageNo: 1 });
                this.headerTabList[2].selectValue = this.matklIds.join(',');
                this.methods.getOverTimeList();
            },
            // 库龄
            onStorageAgeType: function (code, name) {
                this.filterForm = __assign({}, this.filterForm, { storageAgeDaysStart: '', storageAgeDaysEnd: '' });
                if (code) {
                    var oStart = code.split("-")[0];
                    var oEnd = code.split("-")[1];
                    this.filterForm = __assign({}, this.filterForm, { storageAgeDaysStart: oStart, storageAgeDaysEnd: oEnd });
                }
                this.filterForm = __assign({}, this.filterForm, { storageAge: code, storageAgeName: name, pageNo: 1 });
                this.headerTabList[3].selectValue = code;
                this.methods.touchOrderSFilter();
                this.methods.getOverTimeList();
            },
            onProductModelChange: function (productId, name) {
                if (!productId) {
                    this.productIds = [];
                }
                else {
                    var index = this.productIds.findIndex(function (it) { return it == productId; });
                    if (index > -1) {
                        this.productIds.splice(index, 1);
                    }
                    else {
                        this.productIds.push(productId);
                    }
                }
                this.filterForm = __assign({}, this.filterForm, { productName: this.productIds.join(','), pageNo: 1 });
            },
            onmatnrChange: function (matnrId, name) {
                if (!matnrId) {
                    this.matnrIds = [];
                }
                else {
                    var index = this.matnrIds.findIndex(function (it) { return it == matnrId; });
                    if (index > -1) {
                        this.matnrIds.splice(index, 1);
                    }
                    else {
                        this.matnrIds.push(matnrId);
                    }
                }
                this.filterForm = __assign({}, this.filterForm, { matnr: this.matnrIds.join(','), pageNo: 1 });
                // this.matnrNameShowed = false
            },
            closeMatnr: function () {
                this.matnrNameShowed = false;
            },
            closeProd: function () {
                this.productNameShowed = false;
            },
            // 共享超期天数改变
            onDateStartChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { exceedDaysStart: e.detail });
            },
            onDateEndChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { exceedDaysEnd: e.detail });
            },
            // 库龄天数改变
            onStorageAgeDateStartChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { storageAgeDaysStart: e.detail });
            },
            onStorageAgeDateEndChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { storageAgeDaysEnd: e.detail });
            },
            // 侧边筛选条件确认提交查询列表
            onSubmitFilterForm: function () {
                // 去掉字符串前面的所有0,并且转换成数字比较大小
                if (this.filterForm.storageAgeDaysStart) {
                    this.filterForm.storageAgeDaysStart = this.filterForm.storageAgeDaysStart.replace(/\b(0+)/gi, "");
                }
                if (this.filterForm.storageAgeDaysEnd) {
                    this.filterForm.storageAgeDaysEnd = this.filterForm.storageAgeDaysEnd.replace(/\b(0+)/gi, "");
                }
                if (this.filterForm.exceedDaysStart) {
                    this.filterForm.exceedDaysStart = this.filterForm.exceedDaysStart.replace(/\b(0+)/gi, "");
                }
                if (this.filterForm.exceedDaysEnd) {
                    this.filterForm.exceedDaysEnd = this.filterForm.exceedDaysEnd.replace(/\b(0+)/gi, "");
                }
                if (this.filterForm.storageAgeDaysStart && this.filterForm.storageAgeDaysEnd) {
                    if (Number(this.filterForm.storageAgeDaysStart) > Number(this.filterForm.storageAgeDaysEnd)) {
                        toast_1.default('库龄起始天数需小于等于终止天数！');
                        return;
                    }
                }
                if (this.filterForm.exceedDaysStart && this.filterForm.exceedDaysEnd) {
                    if (Number(this.filterForm.exceedDaysStart) > Number(this.filterForm.exceedDaysEnd)) {
                        toast_1.default('共享超期起始天数需小于等于终止天数！');
                        return;
                    }
                }
                wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
                this.filterForm = __assign({}, this.filterForm, { pageNo: 1 });
                this.methods.getOverTimeList();
                this.visible = !this.visible;
                this.matnrNameShowed = false;
                this.productNameShowed = false;
            },
            // 重置侧边栏
            onSubmitFilterFormReset: function () {
                this.filterForm.productName = '';
                this.filterForm.matnr = '';
                this.filterForm.qualityGrade = '';
                this.filterForm.documentDateFrom = '';
                this.filterForm.documentDateTo = '';
                this.filterForm.exceedDaysStart = '';
                this.filterForm.exceedDaysEnd = '';
                this.filterForm.storageAgeDaysStart = '';
                this.filterForm.storageAgeDaysEnd = '';
                this.filterForm.whetherToWarn = '';
                this.filterForm.whetherToWarnName = '';
                this.filterForm.sharedLogo = '';
                this.filterForm.sharedLogoName = '';
                this.filterForm.qualityGrade = '';
                this.filterForm.qualityGradeName = '';
                this.filterForm.inventoryStatus = '';
                this.filterForm.inventoryStatusName = '';
                this.productName = '';
                this.matnrName = '';
                this.endTimeStr = '';
                this.matnrIds = [];
                this.productIds = [];
                this.startTimeStr = '';
                this.filterForm.pageNo = 1;
                // this.warehouseName = '全部'
                this.qualityGradeName = '全部';
                this.invStatusTypeName = '全部';
                this.filterForm.invStatusType = '';
                this.stockIds = [];
                this.orgIds = [];
                this.matklIds = [];
                this.qualityGradeIds = [];
                this.qualityGradeNames = [];
                this.filterForm.orgId = '';
                this.filterForm.stockId = '';
                this.filterForm.matkl = '';
                this.filterForm.storageAge = '';
                this.filterForm.storageAgeName = '';
                this.setData({
                    inputvalue: ''
                });
            },
            getOrgList: function () {
                request_2.request({ api: "comm/queryOrg.nd?type=3" }).then(function (res) {
                    _this.orgList = res.orgList;
                    _this.$apply();
                });
            },
            getStockList: function () {
                request_2.request({
                    api: "exceedStockList/getStockByOrgId.nd", method: 'POST', data: {
                        orgId: _this.filterForm.orgId
                    }
                }).then(function (res) {
                    if (res.code == 400) {
                        _this.stockList = [];
                        _this.$apply();
                    }
                    else {
                        var tempArr = [];
                        for (var key in res) {
                            tempArr.push({
                                key: key,
                                value: res[key]
                            });
                        }
                        _this.stockList = tempArr;
                        _this.$apply();
                    }
                });
            },
            productNameFocus: function () {
                _this.productNameShowed = true;
                _this.matnrNameShowed = false;
            },
            matnrNameFocus: function () {
                _this.matnrNameShowed = true;
                _this.productNameShowed = false;
            },
            getproductNameList: function (e) {
                _this.productName = e.detail;
                _this.productNameList = [];
                _this.productIds = [];
                _this.filterForm.productName = '';
                if (!_this.productName) {
                    return;
                }
                request_2.request({
                    api: "exceedStockList/likeProductName.nd?productName=" + _this.productName, method: 'GET', data: {
                    // orgId:this.filterForm.orgId
                    }
                }).then(function (res) {
                    if (res.code == 400) {
                        _this.productNameList = [];
                        _this.$apply();
                    }
                    else {
                        if (res.length > 0) {
                            _this.productNameShowed = true;
                        }
                        _this.productNameList = res;
                        _this.$apply();
                    }
                });
            },
            getmatnrNameList: function (e) {
                _this.matnrName = e.detail;
                _this.matnrNameList = [];
                _this.matnrIds = [];
                _this.filterForm.matnr = '';
                if (!_this.matnrName) {
                    return;
                }
                request_2.request({
                    api: "exceedStockList/matnr.nd?matnrName=" + _this.matnrName, method: 'GET', data: {
                    // orgId:this.filterForm.orgId
                    }
                }).then(function (res) {
                    if (res.code == 400) {
                        _this.matnrNameList = [];
                        _this.$apply();
                    }
                    else {
                        if (res.length > 0) {
                            _this.matnrNameShowed = true;
                        }
                        _this.matnrNameList = res;
                        _this.$apply();
                    }
                });
            },
            getMatklList: function () {
                request_2.request({
                    api: "exceedStockList/getMatklByOrgId.nd", method: 'POST', data: {
                        orgId: _this.filterForm.orgId
                    }
                }).then(function (res) {
                    if (res.code == 400) {
                        _this.matklList = [];
                        _this.$apply();
                    }
                    else {
                        var tempArr = [];
                        for (var key in res) {
                            tempArr.push({
                                key: key,
                                value: res[key]
                            });
                        }
                        _this.matklList = tempArr;
                        _this.$apply();
                    }
                });
            },
            getBatchList: function () {
                request_2.request({ api: "exceedStockList/getBatch.nd" }).then(function (res) {
                    if (res.code == 400) {
                        _this.qualityGradeList = [];
                        _this.$apply();
                    }
                    else {
                        var tempArr = [];
                        for (var key in res) {
                            tempArr.push({
                                key: key,
                                value: res[key] + '-' + key
                            });
                        }
                        _this.qualityGradeList = tempArr;
                        _this.$apply();
                    }
                });
            },
            onGetOrderListNext: function () {
                if (this.totalPage > this.filterForm.pageNo) {
                    this.filterForm = __assign({}, this.filterForm, { pageNo: this.filterForm.pageNo + 1 });
                    this.methods.getOverTimeList();
                }
            },
            onMore: function (uniqueFlag) {
                this.inventoryList.forEach(function (inv) {
                    if (uniqueFlag == inv.uniqueFlag) {
                        inv.moreSign = !inv.moreSign;
                    }
                });
            },
            //申请共享按钮时间，开启选择
            goApply: function () {
                wx.setNavigationBarTitle({
                    title: '库存共享申请'
                });
                _this.showCheck = true;
                if (!wx.getStorageSync('hadShowGuide')) {
                    _this.showGuide = true;
                    wx.setStorage({
                        key: "hadShowGuide",
                        data: "true"
                    });
                }
            },
            //申请共享下一步
            nextStep: function () {
                var self = _this;
                var checkedInventoryList = _this.inventoryList.filter(function (it) { return it.checked; });
                if (checkedInventoryList.length < 1) {
                    toast_1.default('请先选择需要共享的品类！');
                    return;
                }
                wx.navigateTo({
                    url: '/pages/goods/inventory-overtime/apply/index',
                    success: function (res) {
                        // 通过eventChannel向被打开页面传送数据
                        res.eventChannel.emit('acceptDataFromOpenerPage', {
                            data: JSON.parse(JSON.stringify(checkedInventoryList)),
                            orgName: self.orgName,
                            stockName: self.warehouseName
                        });
                    }
                });
            },
            //改变勾选
            changeCheck: function (type, index) {
                // if(type&&this.inventoryList[index].avbshareqty<1){
                //   Toast('本品类可共享数量为0！')
                //   return
                // }
                _this.inventoryList[index].checked = type;
                var checkedInventoryList = _this.inventoryList.filter(function (it) { return it.checked; });
                if (checkedInventoryList.length < 1) {
                    _this.showCheckedOnly = false;
                }
                _this.$apply();
            },
            //关闭引导框
            clickGuideOvery: function (type, index) {
                _this.showGuide = false;
            },
            // 勾选只显示已选
            onCheckedOnlyChange: function (event) {
                this.showCheckedOnly = event.detail;
            },
            //获取orderList
            getOverTimeList: function () {
                var _a = _this.filterForm, pageNo = _a.pageNo, pageSize = _a.pageSize, productName = _a.productName, exceedDaysStart = _a.exceedDaysStart, exceedDaysEnd = _a.exceedDaysEnd, orgId = _a.orgId, matnr = _a.matnr, stockId = _a.stockId, qualityGrade = _a.qualityGrade, matkl = _a.matkl, storageAgeDaysStart = _a.storageAgeDaysStart, storageAgeDaysEnd = _a.storageAgeDaysEnd, inventoryStatus = _a.inventoryStatus, whetherToWarn = _a.whetherToWarn, sharedLogo = _a.sharedLogo, documentDateFrom = _a.documentDateFrom, documentDateTo = _a.documentDateTo;
                var invage = '';
                var dateGroup = '';
                var exceedDays = '';
                if (storageAgeDaysStart || storageAgeDaysEnd) {
                    invage = storageAgeDaysStart + "_" + storageAgeDaysEnd;
                }
                if (documentDateFrom || documentDateTo) {
                    dateGroup = documentDateFrom + "_" + documentDateTo;
                }
                if (exceedDaysStart || exceedDaysEnd) {
                    exceedDays = exceedDaysStart + "_" + exceedDaysEnd;
                }
                toast_2.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
                request_2.request({
                    api: "exceedStockList/exceedStockList.htm", method: 'POST', data: {
                        orgId: orgId,
                        stockId: stockId,
                        shareFlag: sharedLogo //共享标识
                        ,
                        matkl: matkl,
                        productName: productName,
                        matnr: matnr,
                        qualityGrade: qualityGrade,
                        // dateStart,
                        // dateEnd,
                        exceedDaysStart: exceedDaysStart,
                        exceedDaysEnd: exceedDaysEnd,
                        pageNo: pageNo,
                        pageSize: pageSize,
                        isWarning: whetherToWarn,
                        invage: invage,
                        invstatus: inventoryStatus,
                        dateGroup: dateGroup,
                        exceedDays: exceedDays,
                    }
                }).then(function (res) {
                    toast_2.default.clear();
                    if (res.list) {
                        res.list.forEach(function (it) {
                            if (it.ininvdate) {
                                it.ininvdate = new Date(it.ininvdate).Format('yyyy/MM/dd');
                            }
                        });
                    }
                    _this.inventoryList = res.list;
                    _this.$apply();
                });
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, documentDateFrom = _a.documentDateFrom, documentDateTo = _a.documentDateTo;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = documentDateFrom;
                    end = documentDateTo;
                }
                if (type === 'sapDate') {
                    begin = documentDateFrom;
                    end = documentDateTo;
                }
                if (name.indexOf('documentDateFrom') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('documentDateTo') > -1) {
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
                if (this.currentDateName == 'documentDateFrom' || this.currentDateName == 'documentDateTo') {
                    this.filterForm = __assign({}, this.filterForm, { timeFrame: '' });
                }
                this.calendarShow = false;
            },
            //全部日期点击
            onToggleTimeFrame: function () {
                this.timeFrameCenter = this.filterForm.timeFrame;
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            // 全部日期选择确定
            onToggleTimeFrameTrue: function () {
                this.filterForm.timeFrame = this.timeFrameCenter;
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            // 日期选择item
            onSelectTimeFrame: function (timeFrame) {
                this.timeFrameCenter = timeFrame;
                this.methods.timeForMat(timeFrame);
            },
            timeForMat: function (count) {
                if (!count) {
                    _this.filterForm.documentDateTo = '';
                    _this.filterForm.documentDateFrom = '';
                    return;
                }
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
                var nowDate = year + '-' + month + '-' + date;
                _this.filterForm.documentDateTo = nowDate;
                var before = new Date();
                before.setTime(before.getTime() - (24 * 60 * 60 * 1000 * (count - 1)));
                var Y2 = before.getFullYear();
                var M2 = ((before.getMonth() + 1) < 10 ? '0' + (before.getMonth() + 1) : (before.getMonth() + 1));
                var D2 = (before.getDate() < 10 ? '0' + before.getDate() : before.getDate());
                _this.filterForm.documentDateFrom = Y2 + '-' + M2 + '-' + D2;
            },
            // 右侧筛选弹框，弹框中各筛选列表显示切换
            selectagentPopup: function (e) {
                if (e == 'whetherToWarn') {
                    _this.popupTitle = '是否预警';
                }
                else if (e == 'sharedLogo') {
                    _this.popupTitle = '共享标识';
                }
                else if (e == 'qualityGrade') {
                    _this.popupTitle = '质量等级';
                }
                else if (e == 'inventoryStatus') {
                    _this.popupTitle = '库存状态';
                }
                _this.agentPopup = !_this.agentPopup;
            },
            // 是否预警筛选条件列表选择
            selectWhetherToWarn: function (value, key) {
                _this.filterForm = __assign({}, _this.filterForm, { whetherToWarn: key });
                _this.filterForm = __assign({}, _this.filterForm, { whetherToWarnName: value });
                _this.agentPopup = false;
                _this.$apply();
            },
            // 共享标识筛选条件列表选择
            selectSharedLogo: function (value, key) {
                _this.filterForm = __assign({}, _this.filterForm, { sharedLogo: key });
                _this.filterForm = __assign({}, _this.filterForm, { sharedLogoName: value });
                _this.agentPopup = false;
                _this.$apply();
            },
            // 库存状态筛选条件列表选择
            selectInventoryStatus: function (value, key) {
                _this.filterForm = __assign({}, _this.filterForm, { inventoryStatus: key });
                _this.filterForm = __assign({}, _this.filterForm, { inventoryStatusName: value });
                _this.agentPopup = false;
                _this.$apply();
            },
        };
        return _this;
    }
    InventoryOverTime.prototype.onLoad = function () {
        this.methods.getBaseData({
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            'type': 'kczt',
            userAccount: wepy_1.default.$instance.globalData.account
        });
        this.methods.getOrgList();
        this.methods.getOverTimeList();
        this.methods.getBatchList();
    };
    InventoryOverTime = __decorate([
        wepy_redux_1.connect({
            ItemgroupList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.ItemgroupList;
            },
        }, {
            getBaseData: purchaseshop_1.getBaseData
        })
    ], InventoryOverTime);
    return InventoryOverTime;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(InventoryOverTime , 'pages/goods/inventory-overtime/index'));

