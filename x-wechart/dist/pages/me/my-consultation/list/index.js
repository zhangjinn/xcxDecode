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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var consultation_1 = require('./../../../../store/actions/consultation.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/header-tab/index.js');
var ProblemList = /** @class */ (function (_super) {
    __extends(ProblemList, _super);
    function ProblemList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '我的问题',
            usingComponents: {
                'van-popup': '../../../../components/vant/popup/index',
                'van-icon': '../../../../components/vant/icon/index',
                "van-toast": "../../../../components/vant/toast/index",
            },
        };
        _this.$repeat = {};
        _this.$props = { "headerTab": { "xmlns:v-bind": "", "v-bind:showRightBtn.once": "showRightBtn", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "onToggleFilterItem" } };
        _this.components = {
            headerTab: index_1.default,
        };
        _this.data = {
            TimeFilterVisible: false,
            StatusFilterVisible: false,
            timeList: [
                { label: '全部时间', value: '' },
                { label: '最近一个周', value: '7' },
                { label: '最近一个月', value: '1' },
                { label: '最近三个月', value: '3' },
                { label: '最近六个月', value: '6' },
            ],
            statusList: [
                { label: '全部状态', value: '' },
                { label: '未回答', value: 'N' },
                { label: '已回答', value: 'Y' },
                { label: '已关闭', value: 'close' },
            ],
            pageNo: 1,
            title: '',
            beginDate: '',
            answerFlag: '',
            timelabel: '全部时间',
            flaglabel: '全部状态',
            showRightBtn: false,
            headerTabList: [
                { name: '时间', type: 'time', selectValue: '' },
                { name: '状态', type: 'status', selectValue: '' },
            ],
        };
        _this.methods = {
            onToggleFilterItem: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                this.toggleFilterItem(name);
            },
            onSelectTime: function (value, name) {
                this.beginDate = value;
                this.timelabel = name;
                this.headerTabList[0].selectValue = value;
                this.toggleFilterItem();
                this.pageNo = 1;
                this.getConsultList();
            },
            onSelectStatus: function (value, name) {
                this.answerFlag = value;
                this.flaglabel = name;
                this.headerTabList[1].selectValue = value;
                this.toggleFilterItem();
                this.pageNo = 1;
                this.getConsultList();
            },
            gotodetail: function (e) {
                wx.navigateTo({
                    url: "/pages/me/my-consultation/detail/index?id=" + e
                });
            },
            loadNextPage: function () {
                if (this.pageNo >= this.consultlist.pageSize) {
                    //
                }
                else {
                    this.pageNo++;
                    this.getConsultList();
                }
            },
            onTitleChange: function (e) {
                var detail = e.detail;
                this.title = detail.value;
            },
            onSearch: function () {
                this.pageNo = 1;
                this.getConsultList();
            }
        };
        return _this;
    }
    ProblemList.prototype.toggleFilterItem = function (name) {
        if (name === 'time') {
            if (!this.TimeFilterVisible && this.StatusFilterVisible) {
                this.StatusFilterVisible = !this.StatusFilterVisible;
            }
            this.TimeFilterVisible = !this.TimeFilterVisible;
            return;
        }
        if (name === 'status') {
            if (!this.StatusFilterVisible && this.TimeFilterVisible) {
                this.TimeFilterVisible = !this.TimeFilterVisible;
            }
            this.StatusFilterVisible = !this.StatusFilterVisible;
            return;
        }
        this.StatusFilterVisible = false;
        this.TimeFilterVisible = false;
    };
    ProblemList.prototype.getConsultList = function () {
        toast_1.default.loading({
            message: '正在加载',
            duration: 0
        });
        this.methods.getConsultList(this.pageNo, this.title, this.beginDate, this.answerFlag).then(function () {
            toast_1.default.clear();
        });
    };
    ProblemList.prototype.onShow = function () {
        this.pageNo = 1;
        this.getConsultList();
    };
    ProblemList = __decorate([
        wepy_redux_1.connect({
            consultlist: function (_a) {
                var consultation = _a.consultation;
                return consultation.consultlist;
            }
        }, {
            getConsultList: consultation_1.getConsultList
        })
    ], ProblemList);
    return ProblemList;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(ProblemList , 'pages/me/my-consultation/list/index'));

