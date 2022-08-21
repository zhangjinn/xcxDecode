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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var request_1 = require('./../../../utils/request.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var index_2 = require('./../../components/header-tab/index.js');
var InventoryOverTime = /** @class */ (function (_super) {
    __extends(InventoryOverTime, _super);
    function InventoryOverTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '共享申请明细',
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
        _this.$props = { "emptyDataType": {}, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_1.default,
            headerTab: index_2.default,
        };
        _this.data = {
            shareFlag: '流程状态',
            visible: false,
            warehouseVisible: false,
            qualityGradeVisible: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            currentDateName: '',
            dateSelVisable: false,
            currentDate: new Date().getTime(),
            dateType: 'endTime',
            filterForm: {
                productName: '',
                shareFlag: '',
                pageSize: 15,
                pageNo: 1,
                dateEnd: '',
                dateStart: '',
                checkDateEnd: '',
                checkDateStart: '',
            },
            startTimeStr: '',
            endTimeStr: '',
            startTimeStr1: '',
            endTimeStr1: '',
            shareFlagList: [
                {
                    'key': '0', 'value': '运行'
                },
                {
                    'key': '1', 'value': '结束'
                }
            ],
            scrollTop: 0,
            totalPage: 0,
            list: [],
            headerTabList: [
                { name: '流程状态', type: 'shareFlag', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            onGetOrderListNext: function () {
                if (_this.totalPage > _this.filterForm.pageNo) {
                    _this.filterForm = __assign({}, _this.filterForm, { pageNo: _this.filterForm.pageNo + 1 });
                    _this.methods.getList('next');
                }
            },
            gotoDetail: function (item) {
                wx.navigateTo({
                    url: '/pages/goods/inventory-share-record/detail/index?applyNo=' + item.applyNo,
                    success: function (res) {
                        // 通过eventChannel向被打开页面传送数据
                        res.eventChannel.emit('inventory_share_record_page', { data: JSON.parse(JSON.stringify(item)) });
                    }
                });
            },
            getList: function (type) {
                if (type != 'next') {
                    _this.filterForm.pageNo = 1;
                }
                var form = {
                    status: _this.filterForm.shareFlag,
                    pageSize: _this.filterForm.pageSize,
                    pageNo: _this.filterForm.pageNo,
                    theme: _this.filterForm.productName,
                    checkDateStart: _this.filterForm.checkDateStart,
                    checkDateEnd: _this.filterForm.checkDateEnd,
                    dateStart: _this.filterForm.dateStart,
                    dateEnd: _this.filterForm.dateEnd,
                };
                request_1.request({
                    api: "exceedStockList/applyFlowLog.htm", method: 'POST', data: form
                }).then(function (res) {
                    _this.totalPage = res.totalPages;
                    res.list.forEach(function (it) {
                        it.createdDateShow = new Date(it.createdDate).Format('yyyy/MM/dd');
                    });
                    var data = res.list;
                    if (_this.list && _this.list.length > 0 && data.length > 0 && type == 'next') {
                        _this.list = [].concat(_this.list, data);
                    }
                    else {
                        _this.list = data;
                        _this.scrollTop = _this.scrollTop ? 0 : 1;
                    }
                    _this.$apply();
                });
            },
            openDateSel: function (dateType) {
                if (dateType === 'startTime' && _this.filterForm.dateStart) {
                    _this.currentDate = new Date(_this.filterForm.dateStart).getTime();
                }
                else if (dateType === 'endTime' && _this.filterForm.dateEnd) {
                    _this.currentDate = new Date(_this.filterForm.dateEnd).getTime();
                }
                else if (dateType === 'startTime1' && _this.filterForm.checkDateStart) {
                    _this.currentDate = new Date(_this.filterForm.checkDateStart).getTime();
                }
                else if (dateType === 'endTime1' && _this.filterForm.checkDateEnd) {
                    _this.currentDate = new Date(_this.filterForm.checkDateEnd).getTime();
                }
                _this.dateType = dateType;
                _this.dateSelVisable = true;
            },
            clearTime: function () {
                _this.filterForm.dateStart = '';
                _this.startTimeStr = '';
                _this.filterForm.dateEnd = '';
                _this.endTimeStr = '';
            },
            clearTime1: function () {
                _this.filterForm.checkDateStart = '';
                _this.startTimeStr1 = '';
                _this.filterForm.checkDateEnd = '';
                _this.endTimeStr1 = '';
            },
            onConfirm: function (e) {
                _this.dateSelVisable = false;
                var date = new Date(parseInt(e.detail));
                var Y = date.getFullYear();
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                var date1 = Y + '年' + M + '月' + D + '日';
                var date2 = Y + '-' + M + '-' + D;
                if (_this.dateType === 'startTime') {
                    _this.filterForm.dateStart = date2;
                    _this.startTimeStr = date1;
                }
                else if (_this.dateType === 'endTime') {
                    _this.filterForm.dateEnd = date2;
                    _this.endTimeStr = date1;
                }
                else if (_this.dateType === 'startTime1') {
                    _this.filterForm.checkDateStart = date2;
                    _this.startTimeStr1 = date1;
                }
                else if (_this.dateType === 'endTime1') {
                    _this.filterForm.checkDateEnd = date2;
                    _this.endTimeStr1 = date1;
                }
            },
            onCancel: function () {
                _this.dateSelVisable = false;
            },
            // 供应商选择
            touchOrderSFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                _this.OrderSFilterVisible = !_this.OrderSFilterVisible;
                _this.CurrentOrderSFilterName = name;
            },
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 流程状态
            onshareFlagType: function (code, name) {
                this.shareFlag = name;
                this.filterForm = __assign({}, this.filterForm, { shareFlag: code, pageNo: 1 });
                this.headerTabList[0].selectValue = code;
                this.methods.touchOrderSFilter();
                this.methods.getList();
            },
            onSubmitFilterForm: function () {
                this.filterForm = __assign({}, this.filterForm, { pageNo: 1 });
                this.methods.getList();
                this.visible = !this.visible;
            },
            // 重置侧边栏
            onSubmitFilterFormReset: function () {
                this.filterForm.productName = '';
                this.filterForm.dateStart = '';
                this.filterForm.dateEnd = '';
                this.filterForm.checkDateStart = '';
                this.filterForm.checkDateEnd = '';
                this.filterForm.shareFlag = '';
                this.shareFlag = '流程状态';
                this.endTimeStr = '';
                this.endTimeStr1 = '';
                this.startTimeStr = '';
                this.startTimeStr1 = '';
                this.filterForm.pageNo = 1;
            },
            setproductName: function (e) {
                _this.filterForm.productName = e.detail;
            }
        };
        return _this;
    }
    InventoryOverTime.prototype.onLoad = function () {
        this.methods.getList();
    };
    return InventoryOverTime;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(InventoryOverTime , 'pages/goods/inventory-share-record/index'));

