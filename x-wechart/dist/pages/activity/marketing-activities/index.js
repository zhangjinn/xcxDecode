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
var activityare_1 = require('./../../../store/types/activityare.js');
var activityare_2 = require('./../../../store/actions/activityare.js');
var index_1 = require('./../../../utils/index.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var request_1 = require('./../../../utils/request.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '营销活动查询',
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
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            calendarShow: false,
            currentDateName: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    status: '',
                    code: '',
                    name: '',
                    // source: '',
                    method: '',
                    startDate: '',
                    endDate: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                },
            },
            filterFormExtra: {
                // sourceName: '',
                methodName: '',
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
            saleFilterList: [
                { id: '0', value: '草稿' },
                { id: '1', value: '已发布' },
                { id: '2', value: '已取消' },
            ],
            popupTitle: '',
            agentPopup: false,
            headerTabList: [
                { name: '活动状态', type: 'orderStatus', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转到详情
            viewDetail: function (id) {
                if (id) {
                    var url = "/pages/activity/marketing-activities-detail/index?id=" + id;
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
            // 选择快捷筛选内容列表
            onSelectStatus: function (status) {
                wepy_redux_1.getStore().dispatch({ type: activityare_1.RESET_MARKETING_ACTIVITY_LIST, payload: [] });
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
                wepy_redux_1.getStore().dispatch({ type: activityare_1.RESET_MARKETING_ACTIVITY_LIST, payload: [] });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
                this.methods.scrollToTop();
            },
            // 筛选重置
            onResetFilterForm: function () {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { code: '', name: '', 
                    // source: '',
                    method: '', startDate: '', endDate: '' });
                this.filterFormExtra = {
                    methodName: '',
                };
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
            // 改变活动编码
            onCodeChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { code: e.detail });
            },
            // 改变活动编码
            onNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { name: e.detail });
            },
            // 改变活动来源
            // onSelectSourceChange(org: any) {
            //   const { key, value } = org
            //   if (this.filterForm.terms.source === key) {
            //     this.filterForm.terms = { ...this.filterForm.terms, source: '' }
            //     this.filterFormExtra = { ...this.filterFormExtra, sourceName: '' }
            //     return
            //   }
            //   this.filterForm.terms = { ...this.filterForm.terms, source: key }
            //   this.filterFormExtra = { ...this.filterFormExtra, sourceName: value }
            //   this.agentPopup = false
            // },
            // 改变促销方式
            onSelectMethodChange: function (org) {
                var key = org.key, value = org.value;
                if (this.filterForm.terms.method === key) {
                    this.filterForm.terms = __assign({}, this.filterForm.terms, { method: '' });
                    this.filterFormExtra = __assign({}, this.filterFormExtra, { methodName: '' });
                    return;
                }
                this.filterForm.terms = __assign({}, this.filterForm.terms, { method: key });
                this.filterFormExtra = __assign({}, this.filterFormExtra, { methodName: value });
                this.agentPopup = false;
            },
            // 修改筛选条件列表弹框标题，并显示对应列表内容
            selectagentPopup: function (e) {
                if (e == 'source') {
                    _this.popupTitle = '活动来源';
                }
                else if (e == 'method') {
                    _this.popupTitle = '促销方式';
                }
                _this.agentPopup = !_this.agentPopup;
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
                if (this.marketingActivityTotalPages > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
        };
        return _this;
    }
    Filter.prototype.myGetOrderList = function () {
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var data = {
            status: terms.status,
            startDate: terms.startDate,
            endDate: terms.endDate,
            activityName: terms.name,
            activityCode: terms.code,
            discountTypeId: terms.method,
            pageNo: page.pageNo,
            pageSize: page.pageSize,
        };
        this.methods.getMarketingActivityList(__assign({ _loading: true }, data));
        this.$apply();
    };
    Filter.prototype.onShow = function () {
        wepy_redux_1.getStore().dispatch({ type: activityare_1.RESET_MARKETING_ACTIVITY_LIST, payload: [] });
        this.myGetOrderList();
        this.methods.getMarketingActivityFilter();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            marketingActivityFilter: function (_a) {
                var activityare = _a.activityare;
                return activityare.marketingActivityFilter;
            },
            marketingActivityList: function (_a) {
                var activityare = _a.activityare;
                return activityare.marketingActivityList;
            },
            marketingActivityTotalPages: function (_a) {
                var activityare = _a.activityare;
                return activityare.marketingActivityTotalPages;
            },
        }, {
            getMarketingActivityList: activityare_2.getMarketingActivityList,
            getMarketingActivityFilter: activityare_2.getMarketingActivityFilter,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/activity/marketing-activities/index'));

