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
var store_1 = require('./../../../store/actions/store.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var store_2 = require('./../../../store/types/store.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '我新增的门店',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-field': '../../../components/vant/field/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-loading': '../../../components/vant/loading/index',
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
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            calendarShow: false,
            currentDateName: '',
            scrollTop: -1,
            popupTitle: '',
            agentPopup: false,
            whetherToSinkList: [{
                    id: '1',
                    name: '下沉门店'
                }, {
                    id: '0',
                    name: '自有门店'
                }],
            filterForm: {
                terms: {
                    status: '',
                    storeName: '',
                    storeAbbreviation: '',
                    whetherToSinkId: '',
                    whetherToSinkName: '',
                    startDate: '',
                    endDate: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                },
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
            saleFilterList: [
                { id: '流程中', value: '审批中' },
                { id: '发布', value: '已添加' },
                { id: '作废', value: '已撤销' },
            ],
            headerTabList: [
                { name: '提报状态', type: 'orderStatus', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转到详情
            viewDetail: function (id) {
                var url = '';
                if (id) { // 有id跳转到详情页面
                    url = "/pages/terminal/addStore/index?id=" + id;
                }
                else { // 无id跳转到新增页面，不用传值
                    url = "/pages/terminal/addStore/index";
                }
                wx.navigateTo({
                    url: url
                });
            },
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
                if (['orderStatus'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 选择快捷筛选内容列表
            onSelectStatus: function (status) {
                wepy_redux_1.getStore().dispatch({ type: store_2.RESET_MY_ADD_SHOP_LIST, payload: [] });
                this.filterForm.terms = __assign({}, this.filterForm.terms, { status: status });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[0].selectValue = status;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 点击普通筛选按钮-显示或隐藏左侧筛选框
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 筛选确定
            onSubmitFilterForm: function () {
                wepy_redux_1.getStore().dispatch({ type: store_2.RESET_MY_ADD_SHOP_LIST, payload: [] });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
                this.methods.scrollToTop();
            },
            // 筛选重置
            onResetFilterForm: function () {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { storeName: '', storeAbbreviation: '', whetherToSinkId: '', whetherToSinkName: '', startDate: '', endDate: '' });
            },
            // 打开日历
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm.terms, startDate = _a.startDate, endDate = _a.endDate;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = startDate;
                    end = endDate;
                }
                if (type === 'sapDate') {
                    begin = startDate;
                    end = endDate;
                }
                if (name.indexOf('startDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('ndDate') > -1) {
                    this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                }
                this.calendarShow = true;
            },
            // 关闭日历
            closeCalendar: function () {
                this.calendarShow = false;
            },
            // 清空已选日期
            clearCalendar: function (name) {
                var _a;
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[name] = '', _a));
            },
            // 选择日期
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
            // 改变输入框
            onFieldChange: function (e) {
                var _a;
                var oName = e.currentTarget.dataset.key;
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[oName] = e.detail, _a));
            },
            // 右侧筛选弹框，弹框中各筛选列表显示切换
            selectAgentPopup: function (e) {
                if (e == 'whetherToSink') {
                    _this.popupTitle = '是否下沉';
                }
                _this.agentPopup = !_this.agentPopup;
            },
            selectStatus: function (value, id) {
                if (_this.popupTitle == '是否下沉') {
                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { whetherToSinkId: id, whetherToSinkName: value });
                }
                _this.methods.selectAgentPopup();
            },
            // 回到顶部
            scrollToTop: function () {
                _this.scrollTop = 0;
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Filter.prototype.myGetOrderList = function () {
        var terms = this.filterForm.terms;
        var data = {
            custCisCode: wepy_1.default.$instance.globalData.cisCode,
            shopFullName: terms.storeName,
            shopSearchTerm: terms.storeAbbreviation,
            isSinkChannel: terms.whetherToSinkId,
            createdDateStart: terms.startDate,
            createdDateEnd: terms.endDate,
            checkStatus: terms.status
        };
        this.methods.getMyAddShopList(__assign({ _loading: true }, data));
    };
    Filter.prototype.onShow = function () {
        wepy_redux_1.getStore().dispatch({ type: store_2.RESET_MY_ADD_SHOP_LIST, payload: [] });
        this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
        this.myGetOrderList();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            myAddShopList: function (_a) {
                var store = _a.store;
                return store.myAddShopList;
            },
        }, {
            getMyAddShopList: store_1.getMyAddShopList,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/terminal/myNewStore/index'));

