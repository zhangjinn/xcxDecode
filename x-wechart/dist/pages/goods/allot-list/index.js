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
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var dmsoutwarehouse_1 = require('./../../../store/actions/dmsoutwarehouse.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '调拨查询',
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
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
        };
        _this.data = {
            visible: false,
            messagepopup: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            calendarShow: false,
            agentPopup: false,
            currentDateName: '',
            cancelSucMes: '',
            popupTitle: '',
            scrollTop: -1,
            filterForm: {
                cisCode: '',
                terms: {
                    documentNum: '',
                    documentDateFrom: '',
                    documentDateTo: '',
                    gicOutWarehouse: '',
                    gicInWarehouse: '',
                    // invStatusId: '',
                    // productModel:'',
                    // productColor:'',
                    // invStatusTypeId:'',
                    status: ''
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                },
            },
            filterFormExtra: {
                invStatus: '',
                invStatusTypeName: '',
                stockStatusName: ''
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
            isImg: false,
            ImgArr: [],
            popAllocationRatioVisible: false,
            ImgArr: [],
            headerTabList: [
                { name: '移出仓库', type: 'orderStatus', selectValue: '' },
                { name: '移入仓库', type: 'orderType', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 回单影像
            receiptEffect: function (item) {
                var _this = this;
                console.log('item', item);
                var id = item.documentNum;
                dmsrequest_1.dmsRequest({
                    data: {
                        'cisCode': wepy_1.default.$instance.globalData.cisCode,
                        'documentNum': id
                    },
                    method: 'toOmsView'
                }).then(function (res) {
                    if (res.data) {
                        _this.isImg = true;
                        _this.ImgArr = res.data;
                    }
                    else {
                        toast_1.default.fail('暂无回单影像');
                    }
                });
            },
            onClose: function () {
                this.isImg = false;
            },
            viewDetail: function (e) {
                if (e) {
                    wx.navigateTo({
                        url: "/pages/goods/allot-list/detail/index?documentNum=" + e.documentNum
                    });
                }
            },
            //移入移出筛选条件
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
                if (['orderType', 'orderStatus'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 产品型号 点击事件
            onZzprdmodelChange: function (e) {
                this.filterForm = __assign({}, this.filterForm.terms, { productModel: e.detail });
            },
            //产品颜色 点击事件
            onOrderColorChange: function (e) {
                this.filterForm = __assign({}, this.filterForm.terms, { productColor: e.detail });
            },
            onOrderNumChange: function (e) {
                this.filterForm.terms.documentNum = e.detail;
            },
            // 筛选条件显示/隐藏
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 移入仓库 点击事件
            onSelectOrderTypeCode: function (gicInWarehouse) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { gicInWarehouse: gicInWarehouse });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[1].selectValue = gicInWarehouse;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 移出仓库 点击事件
            onSelectStatus: function (gicOutWarehouse) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { gicOutWarehouse: gicOutWarehouse });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[0].selectValue = gicOutWarehouse;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 库存状态点击事件
            selectChangeInvStatus: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.id == key) {
                        _this.filterFormExtra.invStatus = item.value;
                        _this.filterForm.terms.invStatusId = item.id;
                    }
                }, _this.invStatusList);
                _this.agentPopup = false;
                _this.$apply();
            },
            //补差类型 点击事件
            selectInvStatusType: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.id == key) {
                        _this.filterFormExtra.invStatusTypeName = item.name;
                        _this.filterForm.terms.invStatusTypeId = key;
                    }
                }, _this.invStatusTypeList);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectStockStatus: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.id == key) {
                        _this.filterFormExtra.stockStatusName = item.name;
                        _this.filterForm.terms.status = key;
                        _this.filterFormExtra.stockStatusName = item.name;
                        _this.filterForm.terms.status = key;
                    }
                }, _this.stockStatus);
                _this.agentPopup = false;
                _this.$apply();
            },
            //调拨查询 侧边筛选下拉选
            selectagentPopup: function (e) {
                if (e == 'kczt') {
                    _this.popupTitle = '库存状态';
                }
                else if (e == 'bclx') {
                    _this.popupTitle = '补差类型';
                }
                else if (e == 'dbzt') {
                    _this.popupTitle = '调拨状态';
                }
                _this.agentPopup = !_this.agentPopup;
            },
            //筛选条件提交
            onSubmitFilterForm: function () {
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
                this.methods.scrollToTop();
            },
            // 回到顶部
            scrollToTop: function () {
                _this.scrollTop = 0;
            },
            //订单详情滚动
            onScroll: function (event) {
                if (_this.scrollTop === 0) {
                    _this.scrollTop = event.detail.scrollTop;
                }
            },
            //重置按钮
            onResetFilterForm: function () {
                this.filterForm.terms = {
                    documentNum: '',
                    documentDateFrom: '',
                    documentDateTo: '',
                    gicOutWarehouse: '',
                    gicInWarehouse: '',
                    status: ''
                };
                this.filterFormExtra.stockStatusName = '';
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm.terms, documentDateFrom = _a.documentDateFrom, documentDateTo = _a.documentDateTo;
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
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[name] = '', _a));
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
            onGetOrderListNext: function () {
                var _a = this.orderList.page, totalPage = _a.totalPage, totalCount = _a.totalCount;
                if (totalPage > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
            // 调拨比例弹框显示
            handleCheckAllocationRatio: function () {
                this.popAllocationRatioVisible = true;
            },
            // 调拨比例弹框隐藏
            onCloseAllocationRatio: function () {
                this.popAllocationRatioVisible = false;
            }
        };
        return _this;
    }
    Filter.prototype.myGetOrderList = function () {
        this.filterForm.cisCode = wepy_1.default.$instance.globalData.cisCode;
        this.methods.getAllotOrderList(__assign({ _loading: true }, this.filterForm));
    };
    Filter.prototype.onShow = function () {
        this.myGetOrderList();
        this.methods.getInvStatusList();
        this.methods.getInvStatusType();
        this.methods.getStockTransBaseInfo();
        this.methods.getAllocationRatio();
    };
    Filter.prototype.onLoad = function () {
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            orderList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.orderList;
            },
            warehousesInList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.warehousesIn;
            },
            warehousesOutList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.warehousesOut;
            },
            stockStatus: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.stockStatus;
            },
            invStatusList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.invStatusList;
            },
            invStatusTypeList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.invStatusType;
            },
            allocationRatioList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.allocationRatioList;
            },
        }, {
            getInvStatusList: dmsoutwarehouse_1.getInvStatusList,
            getInvStatusType: dmsorder_1.getInvStatusType,
            getAllotOrderList: dmsorder_1.getAllotOrderList,
            getStockTransBaseInfo: dmsorder_1.getStockTransBaseInfo,
            getAllocationRatio: dmsorder_1.getAllocationRatio
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/allot-list/index'));

