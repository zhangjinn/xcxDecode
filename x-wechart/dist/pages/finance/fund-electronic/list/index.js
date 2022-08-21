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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var index_1 = require('./../../../../utils/index.js');
var financefund_1 = require('./../../../../store/actions/financefund.js');
var financepolicy_1 = require('./../../../../store/actions/financepolicy.js');
var financefund_2 = require('./../../../../store/types/financefund.js');
var index_2 = require('./../../../../components/empty-data-type/index.js');
var index_3 = require('./../../../components/header-tab/index.js');
var defaultFilterForm = {
    rows: {
        sheetNo: '',
        statusFlag: '',
        periodStartDate: '',
        periodEndDate: '',
        queryType: '',
        fiBookCode: '',
        prfcCode: '',
    },
    tabType: '1',
    page: {
        pageNo: 10,
        pageSize: 1,
    },
};
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '资金电子账单',
            usingComponents: {
                'van-popup': '../../../../components/vant/popup/index',
                'van-icon': '../../../../../components/vant/icon/index',
                'van-field': '../../../../components/vant/field/index',
                'calendar': '../../../../components/calendar/index',
                'van-button': '../../../../components/vant/button/index',
                'van-picker': '../../../../components/vant/picker/index',
                'img': '../../../../components/img/index',
                'van-toast': '../../../../components/vant/toast/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "资金电子账单" }, "headerTab": { "xmlns:v-bind": "", "v-bind:showArrowIcon.once": "showArrowIcon", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchStatusFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
        };
        _this.data = {
            visible: false,
            IKnow: false,
            // 对账时间 对应rows 中 queryType
            timeList: [
                { label: '全部日期', value: '' },
                { label: '最近一个月', value: '1' },
                { label: '最近三个月', value: '2' },
                { label: '最近一年', value: '3' },
            ],
            // tab 状态 对应tabType
            staList: [
                { label: '待确认', value: '1' },
                { label: '已确认', value: '2' },
                { label: '对账完成', value: '3' },
                { label: '全部', value: '4' },
            ],
            // 状态 对应rows 中statusFlag
            recList: [
                { label: '请选择', value: '' },
                { label: '待确认', value: '2' },
                { label: '已确认', value: '3' },
                { label: '对账完成', value: 'A' },
                { label: '人工确认中', value: '4' },
            ],
            pageNo: 1,
            calendarShow: false,
            filterForm: {
                rows: {
                    sheetNo: '',
                    statusFlag: '',
                    periodStartDate: '',
                    periodEndDate: '',
                    queryType: '',
                    fiBookCode: '',
                    prfcCode: '',
                },
                tabType: '1',
                page: {
                    pageNo: 10,
                    pageSize: 1,
                },
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            currentDateName: '',
            timeFrameVisible: false,
            fibookVisible: false,
            prfcVisible: false,
            staVisible: false,
            shortName: '',
            prfcName: '',
            showArrowIcon: false,
            headerTabList: [
                { name: '待确认', type: '1', selectValue: '' },
                { name: '已确认', type: '2', selectValue: '' },
                { name: '对账完成', type: '3', selectValue: '' },
                { name: '全部', type: '4', selectValue: '' },
            ],
        };
        _this.methods = {
            allIKnow: function () {
                _this.IKnow = false;
            },
            orderfiltering: function () {
                _this.visible = !_this.visible;
            },
            gotodetail: function (sheetId) {
                wx.navigateTo({
                    url: "/pages/finance/fund-electronic/detail/index?sheetId=" + sheetId
                });
            },
            viewSignature: function (e, statusFlag, ssqBind) {
                if (ssqBind == 0) {
                    this.IKnow = true;
                }
                else {
                    wx.navigateTo({
                        url: "/pages/finance/fund-electronic/signature/index?id=" + e + "&statusFlag=" + statusFlag
                    });
                }
            },
            loadNextPage: function () {
                if (this.filterForm.page.pageSize >= this.fundList.totalPage) {
                    //
                }
                else {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageSize: this.filterForm.page.pageSize + 1 });
                    this.postfundlist();
                }
            },
            touchStatusFilter: function (tabItem) {
                var statusFlag = '';
                if (tabItem) {
                    statusFlag = tabItem.type;
                }
                wepy_redux_1.getStore().dispatch({ type: financefund_2.RS_FT_SHEET_LIST, payload: [] });
                _this.filterForm.tabType = statusFlag;
                // this.filterForm.queryType = statusFlag
                _this.filterForm.page = __assign({}, _this.filterForm.page, { pageSize: 1 });
                _this.postfundlist();
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm.rows, periodStartDate = _a.periodStartDate, periodEndDate = _a.periodEndDate;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                begin = periodStartDate;
                end = periodEndDate;
                if (name.indexOf('StartDate') > -1) {
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
                this.filterForm.rows = __assign({}, this.filterForm.rows, (_a = {}, _a[name] = '', _a));
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.filterForm.rows = __assign({}, this.filterForm.rows, (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
            onToggleTimeFrame: function () {
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            onSelectTimeFrame: function (queryType) {
                this.filterForm.rows = __assign({}, this.filterForm.rows, { queryType: queryType });
            },
            onToggleSta: function () {
                this.staVisible = !this.staVisible;
            },
            // 状态
            onStaOrg: function (statusFlag) {
                this.filterForm.rows = __assign({}, this.filterForm.rows, { statusFlag: statusFlag });
            },
            onToggleOrg: function () {
                this.fibookVisible = !this.fibookVisible;
            },
            onSelectOrg: function (fiBookCode, shortName) {
                this.filterForm.rows = __assign({}, this.filterForm.rows, { fiBookCode: fiBookCode });
                this.fibookVisible = !this.fibookVisible;
                this.shortName = shortName;
            },
            onToggleType: function () {
                this.prfcVisible = !this.prfcVisible;
            },
            onSelectType: function (prfcCode, prfcName) {
                this.filterForm.rows = __assign({}, this.filterForm.rows, { prfcCode: prfcCode });
                this.prfcVisible = !this.prfcVisible;
                this.prfcName = prfcName;
            },
            onResetFilterForm: function () {
                this.filterForm = __assign({}, defaultFilterForm, { tabType: this.filterForm.tabType });
                this.shortName = '';
                this.prfcName = '';
            },
            onSubmitFilterForm: function () {
                wepy_redux_1.getStore().dispatch({ type: financefund_2.RS_FT_SHEET_LIST, payload: [] });
                this.visible = !this.visible;
                this.filterForm.page = __assign({}, this.filterForm.page, { pageSize: 1 });
                this.postfundlist();
            },
            onsheetNoChange: function (e) {
                this.filterForm.rows = __assign({}, this.filterForm.rows, { sheetNo: e.detail });
            }
        };
        return _this;
    }
    List.prototype.postfundlist = function () {
        this.methods.queryAppRsFtSheetList(__assign({ _loading: true }, this.filterForm));
    };
    List.prototype.onLoad = function () {
        this.methods.queryAppProfit();
        this.methods.queryAppFiBook();
        this.filterForm.page = __assign({}, this.filterForm.page, { pageSize: 1 });
        this.postfundlist();
    };
    List.prototype.onUnload = function () {
        wepy_redux_1.getStore().dispatch({ type: financefund_2.RS_FT_SHEET_LIST, payload: [] });
        this.filterForm.page = __assign({}, this.filterForm.page, { pageSize: 1 });
    };
    List = __decorate([
        wepy_redux_1.connect({
            fundList: function (_a) {
                var financefund = _a.financefund;
                return financefund.fundList;
            },
            profitList: function (_a) {
                var financepolicy = _a.financepolicy;
                return financepolicy.profitList;
            },
            fibookList: function (_a) {
                var financepolicy = _a.financepolicy;
                return financepolicy.fibookList;
            }
        }, {
            queryAppRsFtSheetList: financefund_1.queryAppRsFtSheetList,
            queryAppProfit: financepolicy_1.queryAppProfit,
            queryAppFiBook: financepolicy_1.queryAppFiBook
        })
    ], List);
    return List;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(List , 'pages/finance/fund-electronic/list/index'));

