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
var sanpinReceipt_1 = require('./../../../store/actions/sanpinReceipt.js');
var request_1 = require('./../../../utils/request.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_1 = require('./../../../components/empty-data-type/index.js');
var index_2 = require('./../../components/header-tab/index.js');
var sanpinReceipt_2 = require('./../../../store/types/sanpinReceipt.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '终包收货',
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
        _this.$props = { "emptyDataType": {}, "headerTab": { "xmlns:v-bind": "", "v-bind:showRightBtn.once": "showRightBtn", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_1.default,
            headerTab: index_2.default,
        };
        _this.data = {
            visible: false,
            filterVisible: false,
            currentFilterName: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    status: '',
                    supplier: '',
                    receiverName: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                },
            },
            baseUrl: request_1.baseUrl,
            statusFilterList: [
                { id: '1', value: '已收货' },
                { id: '0', value: '未收货' }
            ],
            supplierFilterList: [
                { id: '1', value: '供应商1' },
                { id: '2', value: '供应商2' }
            ],
            showRightBtn: false,
            headerTabList: [
                { name: '收货状态', type: 'status', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转到详情
            viewDetail: function (id, type) {
                if (id) {
                    var url = "/pages/terminal/sanpinReceiptDetail/index?id=" + id + "&type=" + type;
                    wx.navigateTo({
                        url: url
                    });
                }
            },
            // 切换顶部快捷筛选
            touchOrderSFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (!_this.filterVisible) {
                    _this.filterVisible = true;
                    _this.currentFilterName = name;
                    return;
                }
                if (!name) {
                    _this.filterVisible = false;
                    _this.currentFilterName = '';
                    return;
                }
                if (_this.currentFilterName === name) {
                    _this.filterVisible = false;
                    _this.currentFilterName = '';
                    return;
                }
                if (['status', 'supplier'].indexOf(name) > -1) {
                    _this.currentFilterName = name;
                    return;
                }
                _this.filterVisible = false;
                _this.currentFilterName = '';
            },
            // 选择快捷筛选收货状态内容列表
            onSelectStatus: function (status) {
                wepy_redux_1.getStore().dispatch({ type: sanpinReceipt_2.RESET_SALES_ORDER_LIST, payload: [] });
                this.filterForm.terms = __assign({}, this.filterForm.terms, { status: status });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[0].selectValue = status;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 选择快捷筛选供应商内容列表
            onSelectSupplier: function (supplier) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { supplier: supplier });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 点击普通筛选按钮-显示或隐藏左侧筛选框
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.filterVisible = false;
                _this.currentFilterName = '';
            },
            // 筛选确定
            onSubmitFilterForm: function () {
                wepy_redux_1.getStore().dispatch({ type: sanpinReceipt_2.RESET_SALES_ORDER_LIST, payload: [] });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
                this.methods.scrollToTop();
            },
            // 筛选重置
            onResetFilterForm: function () {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { receiverName: '' });
            },
            // 改变收货人
            onReceiverNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { receiverName: e.detail });
            },
            // 回到顶部
            scrollToTop: function () {
                _this.scrollTop = 0;
            },
            // 滚动列表
            onScroll: function (event) {
                if (_this.scrollTop === 0) {
                    _this.scrollTop = event.detail.scrollTop;
                }
            },
            // 列表分页
            onGetOrderListNext: function () {
                var count = this.orderList.count;
                var totalPage = Math.ceil(count / this.filterForm.page.pageSize);
                if (totalPage > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Filter.prototype.myGetOrderList = function () {
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var data = {
            status: terms.status,
            // supplierName:terms.supplier,
            // shop:terms.receiverName,
            page: page.pageNo,
            rows: page.pageSize,
        };
        this.methods.getSalesOrderList(__assign({ _loading: true }, data));
    };
    Filter.prototype.onShow = function () {
        wepy_redux_1.getStore().dispatch({ type: sanpinReceipt_2.RESET_SALES_ORDER_LIST, payload: [] });
        this.myGetOrderList();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            orderList: function (_a) {
                var sanpinReceipt = _a.sanpinReceipt;
                return sanpinReceipt.orderList;
            },
        }, {
            getSalesOrderList: sanpinReceipt_1.getSalesOrderList,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/terminal/sanpinReceipt/index'));

