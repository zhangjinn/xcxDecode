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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var index_1 = require('./../../../../utils/index.js');
var request_1 = require('./../../../../utils/request.js');
/* import utilsWxs from '../../../../wxs/utils.wxs'; */
var index_2 = require('./../../../../utils/index.js');
var index_3 = require('./../../../../components/empty-data-type/index.js');
var index_4 = require('./../../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '政策合同',
            usingComponents: {
                'van-icon': '/components/vant/icon/index',
                'van-toast': '/components/vant/toast/index',
                'van-popup': '/components/vant/popup/index',
                'van-picker': '/components/vant/picker/index',
                'van-search': '/components/vant/search/index',
                'van-tab': '/components/vant/tab/index',
                'van-row': '/components/vant/row/index',
                'van-col': '/components/vant/col/index',
                'van-tabs': '/components/vant/tabs/index',
                'van-radio': '/components/vant/radio/index',
                'van-radio-group': '/components/vant/radio-group/index',
                'van-cell': '/components/vant/cell/index',
                'van-field': '/components/vant/field/index',
                'van-loading': '/components/vant/loading/index',
                'van-stepper': '/components/vant/stepper/index',
                'van-cell-group': '/components/vant/cell-group/index',
                'van-button': '/components/vant/button/index',
                'calendar': '/components/calendar/index',
                'img': '/components/img/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "合同" }, "headerTab": { "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_3.default,
            headerTab: index_4.default
        };
        _this.data = {
            orderList: [],
            visible: false,
            orderpopup: false,
            deletepopup: false,
            timeFrameVisible: false,
            calendarShow: false,
            currentDateName: '',
            scrollTop: -1,
            filterForm: {
                pageNo: 1,
                pageSize: 10,
                contractName: '',
                contractNo: '',
                contractType: '',
                merchantName: '',
                createdDateS: '',
                createdDateE: '',
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
        };
        // 页面内交互写在methods里
        _this.methods = {
            viewDetail: function (e) {
                var url = e.currentTarget.dataset.url;
                if (url) {
                    url = index_2.modifyUrl(url);
                    var urlStr = encodeURIComponent(url);
                    wx.navigateTo({ url: "/pages/me/webview/index?url=" + urlStr });
                }
            },
            orderfiltering: function () {
                _this.visible = !_this.visible;
            },
            // 合同类型
            contractTypeChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { contractType: e.detail });
            },
            // 合同编码
            contractNoChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { contractNo: e.detail });
            },
            // 合同名称
            ontractNameChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { contractName: e.detail });
            },
            // 代理商
            merchantNameChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { merchantName: e.detail });
            },
            onSubmitFilterForm: function () {
                this.filterForm.pageNo = 1;
                this.myGetOrderList();
                this.visible = !this.visible;
                this.methods.scrollToTop();
            },
            // 回到顶部
            scrollToTop: function () {
                _this.scrollTop = 0;
            },
            onScroll: function (event) {
                if (_this.scrollTop === 0) {
                    _this.scrollTop = event.detail.scrollTop;
                }
            },
            onResetFilterForm: function () {
                this.filterForm = __assign({}, this.filterForm, { contractName: '', contractNo: '', contractType: '', merchantName: '', createdDateS: '', createdDateE: '' });
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, createdDateS = _a.createdDateS, createdDateE = _a.createdDateE;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = createdDateS;
                    end = createdDateE;
                }
                if (type === 'sapDate') {
                    begin = createdDateS;
                    end = createdDateE;
                }
                if (name.indexOf('createdDateS') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('createdDateE') > -1) {
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
                this.calendarShow = false;
            },
            onGetOrderListNext: function () {
                var totalPages = this.orderList.totalPages;
                if (totalPages > this.filterForm.pageNo) {
                    this.filterForm = __assign({}, this.filterForm, { pageNo: this.filterForm.pageNo + 1 });
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
        var _this = this;
        request_1.request({
            api: "fast/cust/custPolicyInfoList/page.nd",
            method: "GET",
            data: __assign({}, this.filterForm),
            callback: function (res) {
                if (_this.orderList.list && _this.filterForm.pageNo != 1) {
                    _this.orderList.list = _this.orderList.list.concat(res.data.list);
                }
                else {
                    _this.orderList = res.data;
                }
                _this.$apply();
            }
        });
    };
    Filter.prototype.onLoad = function () {
        this.myGetOrderList();
    };
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/policyContract/index/index'));

