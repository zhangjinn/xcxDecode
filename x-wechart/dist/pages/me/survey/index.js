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
var service_comment_1 = require('./../../../store/actions/service-comment.js');
var index_1 = require('./../../../utils/index.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '调研问卷',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-loading': '../../../components/vant/loading/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                'calendar': '../../../components/calendar/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {}, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "onSelectStatus", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
        };
        _this.data = {
            visible: false,
            calendarShow: false,
            currentDateName: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    status: '0',
                    startDate: '',
                    endDate: '',
                    title: '',
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
            headerTabList: [
                { name: '待答问卷', type: '0', selectValue: '' },
                { name: '已答问卷', type: '1', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转到调研作答
            viewDetail: function (item) {
                var terms = _this.filterForm.terms;
                if (item) {
                    var url = '';
                    if (terms.status == '0') { // 提交答题
                        var questionId = item.id;
                        var account = wepy_1.default.$instance.globalData.account;
                        url = wepy_1.default.$appConfig.baseUrl + "/questionnaire/answer?questionId=" + questionId + "&account=" + account + "&source=XCX&xcxFromCode=1";
                        console.log(url);
                    }
                    else { // 查看答题
                        var relationId = item.relationId;
                        url = wepy_1.default.$appConfig.baseUrl + "/questionnaire/checkAnswer?questionId=" + relationId;
                    }
                    url = index_1.modifyUrl(url);
                    var urlStr = encodeURIComponent(url);
                    var jumpUrl = "/pages/me/webview/index?url=" + urlStr + "&postName=\u8C03\u7814\u95EE\u5377\u7B54\u9898\u5217\u8868";
                    wx.navigateTo({
                        url: jumpUrl
                    });
                }
            },
            // 选择快捷筛选内容列表
            onSelectStatus: function (tabItem) {
                var status = '';
                if (tabItem) {
                    status = tabItem.type;
                }
                if (!status) {
                    return;
                }
                this.filterForm.terms = __assign({}, this.filterForm.terms, { status: status });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList.forEach(function (item) {
                    item.selectValue = '';
                    if (item.type == status) {
                        item.selectValue = status;
                    }
                });
                this.myGetOrderList();
                // this.methods.scrollToTop()
            },
            // 点击普通筛选按钮-显示或隐藏左侧筛选框
            orderfiltering: function () {
                _this.visible = !_this.visible;
            },
            // 筛选确定
            onSubmitFilterForm: function () {
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
                // this.methods.scrollToTop()
            },
            // 筛选重置
            onResetFilterForm: function () {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { title: '', startDate: '', endDate: '' });
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
            // 改变问卷标题
            onTitleChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { title: e.detail });
            },
        };
        return _this;
    }
    Filter.prototype.myGetOrderList = function () {
        var terms = this.filterForm.terms;
        var data = {
            title: terms.title,
            startDate: terms.startDate ? terms.startDate.replace(/\-/g, '') : '',
            endDate: terms.endDate ? terms.endDate.replace(/\-/g, '') : '',
        };
        if (terms.status == '0') {
            this.methods.getToBeAnsweredQuestion(__assign({ _loading: true }, data));
        }
        else {
            this.methods.getAnsweredQuestionList(__assign({ _loading: true }, data));
        }
    };
    Filter.prototype.onShow = function () {
        this.myGetOrderList();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            orderList: function (_a) {
                var serviceComment = _a.serviceComment;
                return serviceComment.orderList;
            },
        }, {
            getToBeAnsweredQuestion: service_comment_1.getToBeAnsweredQuestion,
            getAnsweredQuestionList: service_comment_1.getAnsweredQuestionList,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/survey/index'));

