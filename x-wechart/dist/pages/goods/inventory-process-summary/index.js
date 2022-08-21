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
var order_1 = require('./../../../store/actions/order.js');
var dmsoutwarehouse_1 = require('./../../../store/actions/dmsoutwarehouse.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var order_2 = require('./../../../store/actions/order.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var order_3 = require('./../../../store/types/order.js');
var inventory_1 = require('./../../../store/actions/inventory.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '收发汇总',
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
                'img': '../../../components/img/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {}, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "onTabChange", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
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
            filterStr: '',
            currentDateName: '',
            cancelOrderPopup: false,
            continuePayPopup: false,
            scrollTop: 0,
            filterForm: {
                model: '',
                warehouseId: '',
                startDate: '',
                endDate: '',
                materialGroupId: '',
                inventoryTypeId: [],
                qualityLevelId: '',
                orgId: '',
                pageNo: 1
            },
            filterFormExtra: {
                materialGroupName: '',
                warehouseName: '',
                inventoryTypeName: [],
                inventoryStatusName: '',
                qualityLevelName: '',
                viewAccountName: '',
                orgName: '',
                timeFrame: ''
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
            warehouseList: [],
            materialGroupOptions: [],
            inventoryTypeOptions: [],
            qualityLevelOptions: [],
            orgOptions: [],
            headerTabList: [
                { name: '仓库', type: 'warehouseName', selectValue: '' },
                { name: '日期', type: 'date', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            goMe: function () {
                wx.switchTab({
                    url: '/pages/main/me/index'
                });
            },
            onScroll: function (event) {
                if (event.detail.scrollTop >= 350) {
                    if (_this.scrollTop === 0) {
                        _this.scrollTop = event.detail.scrollTop;
                    }
                }
            },
            // 请输入产品型号
            onOrderCodeChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { model: e.detail });
            },
            // 修改仓库
            selectChangewarehouse: function (key) {
                _this.filterFormExtra.warehouseName = '';
                _this.filterForm.warehouseId = '';
                ramda_1.forEach(function (item) {
                    if (item.id == key) {
                        _this.filterFormExtra.warehouseName = item.value;
                        _this.filterForm.warehouseId = key;
                    }
                }, _this.warehouseList);
                _this.agentPopup = false;
                _this.$apply();
            },
            // 筛选条件列表选择之后赋值
            selectChangeFilterStatus: function (e) {
                var _a = e.currentTarget.dataset, key = _a.key, name = _a.name, item = _a.item, type = _a.type;
                if (type && type === 'multiple') {
                    var oIndex = _this.filterForm[key].indexOf(item.code);
                    if (oIndex > -1) {
                        _this.filterForm[key].splice(oIndex, 1);
                        _this.filterFormExtra[name].splice(oIndex, 1);
                    }
                    else {
                        _this.filterForm[key].push(item.code);
                        _this.filterFormExtra[name].push(item.name);
                    }
                }
                else {
                    _this.filterForm[key] = item.code;
                    _this.filterFormExtra[name] = item.name;
                    _this.agentPopup = false;
                }
                _this.$apply();
            },
            //库存流水 侧边筛选下拉选
            selectagentPopup: function (e) {
                if (e == 'ckmc') {
                    _this.popupTitle = '仓库';
                }
                else if (e == 'wlz') {
                    _this.popupTitle = '物料组';
                }
                else if (e == 'kclx') {
                    _this.popupTitle = '货主';
                }
                else if (e == 'zldj') {
                    _this.popupTitle = '质量等级';
                }
                else if (e == 'xszz') {
                    _this.popupTitle = '销售组织';
                }
                _this.agentPopup = !_this.agentPopup;
            },
            onTabChange: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (name == 'date') {
                    _this.methods.openCalendarDj();
                }
                else {
                    _this.methods.touchOrderSFilter(name);
                }
            },
            //库存流水 主要三种筛选条件点击
            touchOrderSFilter: function (name) {
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
                if (['orderType', 'transtype', 'auditStatus'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 单据时间变更事件
            onToggleTimeFrame: function () {
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            // 筛选重置
            onResetFilterForm: function () {
                var now = new Date();
                var month = now.getMonth() + 1;
                var day = now.getDate();
                this.filterForm = __assign({}, this.filterForm, { model: '', warehouseId: '', startDate: index_1.getLastMonthYesterday(), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day), materialGroupId: '', inventoryTypeId: [], qualityLevelId: '', orgId: '', pageNo: 1 });
                this.filterFormExtra = __assign({}, this.filterFormExtra, { materialGroupName: '', warehouseName: '', inventoryTypeName: [], inventoryStatusName: '', qualityLevelName: '', viewAccountName: '', orgName: '', timeFrame: '' });
                this.$apply();
            },
            //库存流水 左侧筛选 单据日期
            openCalendarDj: function () {
                // const minDate = '1970-01-01'
                var maxDate = '9999-12-31';
                var startDate = _this.filterForm.startDate;
                _this.currentDateName = 'djDate';
                _this.$wxpage.calendar.enableArea([startDate, maxDate]);
                _this.calendarShow = true;
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
            //仓库选择
            onSelectWarehouseName: function (warehouseId, warehouseName) {
                this.warehouseName = warehouseName;
                this.filterForm = __assign({}, this.filterForm, { warehouseId: warehouseId, pageNo: 1 });
                this.filterFormExtra = __assign({}, this.filterFormExtra, { warehouseName: warehouseName });
                this.headerTabList[0].selectValue = warehouseId;
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectTimeFrame: function (timeFrame) {
                var type = timeFrame;
                var now = new Date();
                var month = now.getMonth() + 1;
                now.setMonth(month);
                var day = now.getDate();
                if ('1' == type) { //最近一个月
                    this.filterForm = __assign({}, this.filterForm, { startDate: index_1.addMonth(now, -1), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
                }
                if ('3' == type) { //最近3个月
                    this.filterForm = __assign({}, this.filterForm, { startDate: index_1.addMonth(now, -3), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
                }
                if ('6' == type) { //最近6个月
                    this.filterForm = __assign({}, this.filterForm, { startDate: index_1.addMonth(now, -6), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
                }
                if ('7' == type) { //最近一个周
                    this.filterForm = __assign({}, this.filterForm, { startDate: index_1.addDate(now, -7), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
                }
                this.filterFormExtra.timeFrame = type;
            },
            onSubmitFilterForm: function () {
                this.filterForm = __assign({}, this.filterForm, { pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.myGetOrderList();
                this.methods.orderfiltering();
            },
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, startDate = _a.startDate, endDate = _a.endDate, sapBeginDate = _a.sapBeginDate, sapEndDate = _a.sapEndDate;
                // const { name, type } = e.target.dataset
                var _b = e.currentTarget.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = startDate;
                    end = endDate;
                }
                if (type === 'sapDate') {
                    begin = sapBeginDate;
                    end = sapEndDate;
                }
                if (name.indexOf('startDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('eginDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('ndDate') > -1) {
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
                this.calendarShow = false;
                if (this.currentDateName == 'djDate') {
                    this.filterForm = __assign({}, this.filterForm, { endDate: day, pageNo: 1 });
                    this.myGetOrderList();
                }
                else {
                    this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[this.currentDateName] = day, _a));
                    if (this.currentDateName == 'startDate' || this.currentDateName == 'endDate') {
                        this.filterFormExtra = __assign({}, this.filterFormExtra, { timeFrame: '' });
                    }
                }
                this.$apply();
            },
            onGetOrderListNext: function () {
                var totalPage = this.logPage.totalPage;
                if (totalPage > this.filterForm.pageNo) {
                    this.filterForm = __assign({}, this.filterForm, { pageNo: this.filterForm.pageNo + 1 });
                    this.myGetOrderList();
                }
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Filter.prototype.myGetOrderList = function () {
        var _a = this.filterForm, warehouseId = _a.warehouseId, model = _a.model, startDate = _a.startDate, endDate = _a.endDate, inventoryTypeId = _a.inventoryTypeId, qualityLevelId = _a.qualityLevelId, orgId = _a.orgId, materialGroupId = _a.materialGroupId;
        var terms = {
            startbizTime: startDate,
            endbizTime: endDate,
            gicWarehouse: warehouseId,
            allDealerCode: inventoryTypeId.toString(),
            materialModel: model,
            orgCode: orgId,
            materialGroup: materialGroupId,
            invStatusId: qualityLevelId,
        };
        this.methods.getGicInventoryLogSummary(wepy_1.default.$instance.globalData.cisCode, terms, this.filterForm.pageNo);
    };
    // 获取销售组织选项列表
    Filter.prototype.getOrgData = function () {
        var _this = this;
        this.orgOptions = [{ code: '', name: '全部' }];
        request_1.request({ api: "comm/queryOrg.nd" }).then(function (res) {
            if (res.orgList) {
                _this.orgOptions = _this.orgOptions.concat(res.orgList);
            }
            _this.$apply();
        });
    };
    // 获取物料组选项列表
    Filter.prototype.getMaterialGroupData = function () {
        var _this = this;
        this.materialGroupOptions = [{ code: '', name: '全部' }];
        request_1.request({
            api: 'comm/queryMatklCode.nd',
            callback: function (res) {
                if (res.data && res.data.list) {
                    _this.materialGroupOptions = _this.materialGroupOptions.concat(res.data.list);
                }
            },
        });
    };
    Filter.prototype.getFilterList = function () {
        var _this = this;
        var cisCode = wepy_1.default.$instance.globalData.cisCode;
        this.getMaterialGroupData();
        this.getOrgData();
        // 获取仓库选项列表
        this.methods.getDistributorType({
            cisCode: cisCode,
            field: "gicWarehouse",
            formCode: "dmsGicInventoryLogSummaryCondition",
        }).then(function (res) {
            var data = res.payload.data;
            if (data && data.length) {
                _this.warehouseList = data.map(function (item) {
                    return {
                        id: item.code,
                        value: item.name,
                    };
                });
            }
        });
        // 获取货主选项列表
        this.methods.getDistributorType({
            cisCode: cisCode,
            field: "allDealerCode",
            formCode: "dmsGicInventoryLogSummaryCondition",
        }).then(function (res) {
            var data = res.payload.data;
            if (data && data.length) {
                _this.inventoryTypeOptions = _this.inventoryTypeOptions.concat(data);
            }
        });
        // 获取质量等级选项列表
        this.qualityLevelOptions = [{ code: '', name: '全部' }];
        this.methods.getDistributorType({
            cisCode: cisCode,
            field: "invStatusId",
            formCode: "dmsGicInventoryLogSummaryCondition",
        }).then(function (res) {
            var data = res.payload.data;
            if (data && data.length) {
                _this.qualityLevelOptions = _this.qualityLevelOptions.concat(data);
            }
        });
    };
    Filter.prototype.onLoad = function () {
        this.getFilterList();
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        this.filterForm = __assign({}, this.filterForm, { startDate: index_1.getLastMonthYesterday(), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day), pageNo: 1 });
        this.myGetOrderList();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            logList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.inventoryLogList;
            },
            logPage: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.logPage;
            },
        }, {
            getOrderList: order_1.getOrderList,
            againCommonOrder: order_2.againCommonOrder,
            agentCanceleOrder: order_2.agentCanceleOrder,
            getGicInventoryLogSummary: dmsoutwarehouse_1.getGicInventoryLogSummary,
            getNormalSalesOrderCustomerInfo: dmsorder_1.getNormalSalesOrderCustomerInfo,
            getDistributorType: inventory_1.getDistributorType,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/inventory-process-summary/index'));

