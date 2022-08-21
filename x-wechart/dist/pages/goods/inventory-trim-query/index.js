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
var inventoryTrim_1 = require('./../../../store/actions/inventoryTrim.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '库存调整明细',
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
            timeFrameVisible: false,
            visible: false,
            // messagepopup:false,//提示
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            calendarShow: false,
            agentPopup: false,
            currentDateName: '',
            // cancelSucMes:'',
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
                    productId: '',
                    productName: '',
                    // invStatusTypeId:'',
                    status: '',
                    timeFrame: '' //日期选择，
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                },
            },
            filterFormExtra: {
                invStatus: '',
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
            timeList: [
                { label: '全部日期', value: '' },
                { label: '最近一周', value: '7' },
                { label: '最近一个月', value: '1' },
                { label: '最近三个月', value: '3' },
                { label: '最近六个月', value: '6' },
            ],
            timeFrameCenter: '',
            postTrimParams: {
                terms: {
                    documentNum: '',
                    documentDateFrom: '',
                    documentDateTo: '',
                    warehouseId: '',
                    transactionType: '',
                    status: ''
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    sortName: '',
                    sortOrder: ''
                },
                isImg: false,
                ImgArr: []
            },
            headerTabList: [
                { name: '仓库', type: 'inventory', selectValue: '' },
                { name: '单据状态', type: 'billStatus', selectValue: '' },
                { name: '单据类型', type: 'billType', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 回单影像
            receiptEffect: function (item) {
                var _this = this;
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
                if (['billType', 'billStatus', 'inventory'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            //单据编号 点击事件
            onOrderNumChange: function (e) {
                this.postTrimParams.terms.documentNum = e.detail;
            },
            //全部日期点击
            onToggleTimeFrame: function () {
                this.timeFrameCenter = this.filterForm.terms.timeFrame;
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            // 全部日期选择确定
            onToggleTimeFrameTrue: function () {
                this.filterForm.terms.timeFrame = this.timeFrameCenter;
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            // 日期选择item
            onSelectTimeFrame: function (timeFrame) {
                this.timeFrameCenter = timeFrame;
                this.methods.timeForMat(timeFrame);
            },
            timeForMat: function (count) {
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
                var hour = now.getHours() < 10 ? ('0' + now.getHours()) : now.getHours();
                var minute = now.getMinutes() < 10 ? ('0' + now.getMinutes()) : now.getMinutes();
                var second = now.getSeconds() < 10 ? ('0' + now.getSeconds()) : now.getSeconds();
                // let nowDate = year+'-'+month+'-'+date+" "+hour+":"+minute+":"+second
                var nowDate = year + '-' + month + '-' + date;
                _this.postTrimParams.terms.documentDateTo = nowDate;
                var before = new Date();
                before.setTime(before.getTime() - (24 * 60 * 60 * 1000 * (count - 1)));
                var Y2 = before.getFullYear();
                var M2 = ((before.getMonth() + 1) < 10 ? '0' + (before.getMonth() + 1) : (before.getMonth() + 1));
                var D2 = (before.getDate() < 10 ? '0' + before.getDate() : before.getDate());
                // this.postTrimParams.terms.documentDateFrom = Y2+'-'+M2+'-'+D2+" "+hour+":"+minute+":"+second
                _this.postTrimParams.terms.documentDateFrom = Y2 + '-' + M2 + '-' + D2;
            },
            // 筛选条件显示/隐藏
            orderfiltering: function () {
                _this.visible = !_this.visible; //筛选
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 单据类型筛选 点击事件
            onSelectOrderTypeCode: function (transactionType) {
                this.postTrimParams.terms = __assign({}, this.postTrimParams.terms, { transactionType: transactionType });
                this.postTrimParams.page = __assign({}, this.postTrimParams.page, { pageNo: 1 });
                this.headerTabList[2].selectValue = transactionType;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 单据状态筛选 点击事件
            onSelectStatus: function (status) {
                this.postTrimParams.terms = __assign({}, this.postTrimParams.terms, { status: status });
                this.postTrimParams.page = __assign({}, this.postTrimParams.page, { pageNo: 1 });
                this.headerTabList[1].selectValue = status;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 库存点击事件
            onSelectChangeStore: function (warehouseId) {
                this.postTrimParams.terms = __assign({}, this.postTrimParams.terms, { warehouseId: warehouseId });
                this.postTrimParams.page = __assign({}, this.postTrimParams.page, { pageNo: 1 });
                this.headerTabList[0].selectValue = warehouseId;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            //重置按钮
            onResetFilterForm: function () {
                this.postTrimParams.terms = __assign({}, this.postTrimParams.terms, { documentNum: '', documentDateFrom: '', documentDateTo: '' });
                this.filterForm.terms.timeFrame = '';
            },
            //筛选条件提交
            onSubmitFilterForm: function () {
                // let {documentNum,documentDateFrom,documentDateTo} = this.postTrimParams.terms
                // if(documentNum||(documentDateFrom&&documentDateTo)){
                this.postTrimParams.page = __assign({}, this.postTrimParams.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
                this.methods.scrollToTop();
                // }else{
                //   Toast('请填写筛选条件');
                // }
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
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.postTrimParams.terms, documentDateFrom = _a.documentDateFrom, documentDateTo = _a.documentDateTo;
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
                this.postTrimParams.terms = __assign({}, this.postTrimParams.terms, (_a = {}, _a[name] = '', _a));
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                // let name = this.currentDateName
                // if(name=='documentDateFrom'){
                //   this.postTrimParams.terms.documentDateFrom = day
                // }else if(name=='documentDateTo'){
                //   this.postTrimParams.terms.documentDateTo = day
                // }
                this.postTrimParams.terms = __assign({}, this.postTrimParams.terms, (_a = {}, _a[this.currentDateName] = day, _a));
                if (this.currentDateName == 'documentDateFrom' || this.currentDateName == 'documentDateTo') {
                    this.filterForm.terms = __assign({}, this.filterForm.terms, { timeFrame: '' });
                }
                this.calendarShow = false;
            },
            // 上拉刷新数据加载下一页
            onGetOrderListNext: function () {
                var _a = this.inventoryTrimList.page, totalPage = _a.totalPage, totalCount = _a.totalCount;
                if (totalPage > this.postTrimParams.page.pageNo) {
                    this.postTrimParams.page = __assign({}, this.postTrimParams.page, { pageNo: this.postTrimParams.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            }
        };
        return _this;
    }
    Filter.prototype.myGetOrderList = function () {
        this.postTrimParams.cisCode = wepy_1.default.$instance.globalData.cisCode;
        // this.methods.getAllotOrderList({ _loading: true, ...this.filterForm });
        this.methods.getInventoryList(this.postTrimParams);
    };
    Filter.prototype.onShow = function () {
        this.myGetOrderList();
        this.methods.getInvStatusList();
        this.methods.getInvStatusType(); //补差类型
        this.methods.getStockTransBaseInfo(); //调拨接口基础信息获取
        this.methods.getBaseInfo();
        this.methods.getStoreHouse({ orgId: '' });
    };
    Filter.prototype.onLoad = function () {
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            inventoryTrimList: function (_a) {
                var inventoryTrim = _a.inventoryTrim;
                return inventoryTrim.inventoryTrimList;
            },
            staStatus: function (_a) {
                var inventoryTrim = _a.inventoryTrim;
                return inventoryTrim.staStatus;
            },
            transactionType: function (_a) {
                var inventoryTrim = _a.inventoryTrim;
                return inventoryTrim.transactionType;
            },
            storeHouse: function (_a) {
                var inventoryTrim = _a.inventoryTrim;
                return inventoryTrim.storeHouse;
            },
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
            }
        }, {
            getInvStatusList: dmsoutwarehouse_1.getInvStatusList,
            getInvStatusType: dmsorder_1.getInvStatusType,
            getStockTransBaseInfo: dmsorder_1.getStockTransBaseInfo,
            getInventoryList: inventoryTrim_1.getInventoryList,
            getBaseInfo: inventoryTrim_1.getBaseInfo,
            getStoreHouse: inventoryTrim_1.getStoreHouse
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/inventory-trim-query/index'));

