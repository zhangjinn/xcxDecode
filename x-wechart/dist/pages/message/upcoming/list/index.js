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
var notice_1 = require('./../../../../store/actions/notice.js');
var index_1 = require('./../../../components/header-filter/index.js');
var index_2 = require('./../../components/notice-list-item/index.js');
var index_3 = require('./../../../../components/empty-data-type/index.js');
var index_4 = require('./../../../../utils/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '待办',
            usingComponents: {
                'van-toast': '../../../../components/vant/toast/index',
                'van-loading': '../../../../components/vant/loading/index',
                'van-search': '../../../../components/vant/search/index',
            },
        };
        _this.$repeat = { "msgList": { "com": "noticeListItem", "props": "item.sync" } };
        _this.$props = { "noticeListItem": { "v-bind:item.sync": { "value": "item", "type": "item", "for": "msgList", "item": "item", "index": "index", "key": "key" } }, "filter": { "xmlns:v-bind": "", "v-bind:tabList.sync": "tabList", "v-bind:tabActive.sync": "tabActive", "xmlns:v-on": "" }, "emptyDataType": { "description": "待办" } };
        _this.$events = { "noticeListItem": { "v-on:onSwitch": "onSwitch" }, "filter": { "v-on:tabChange": "tabChange", "v-on:searchChange": "searchChange" } };
        _this.components = {
            filter: index_1.default,
            noticeListItem: index_2.default,
            emptyDataType: index_3.default,
        };
        _this.data = {
            scrollTop: -1,
            tabList: [
                {
                    name: '待处理',
                    count: 0
                },
                {
                    name: '已处理',
                    count: 0
                },
            ],
            tabActive: '0',
            searchKey: '',
            filterForm: {
                terms: {
                    status: '0',
                    noticeText: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 100,
                    totalPage: 0,
                }
            },
            msgList: []
        };
        // 页面内交互写在methods里
        _this.methods = {
            // tab切换
            tabChange: function (param) {
                this.tabActive = param.tabActive;
                this.filterForm.terms = __assign({}, this.filterForm.terms, { status: this.tabActive });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.getMsgList();
                this.$apply();
            },
            // 输入框搜索
            searchChange: function (param) {
                this.searchKey = param.searchKey;
                this.filterForm.terms = __assign({}, this.filterForm.terms, { noticeText: this.searchKey });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.getMsgList();
                this.$apply();
            },
            // 跳转到待办处理列表页
            onSwitch: function (item) {
                var currId = item.backlogType;
                var typeName = item.typeName;
                var url = _this.getTodoUrl(currId);
                if (currId && url) {
                    url = url + "?status=" + _this.tabActive + "&typeValue=" + currId + "&typeName=" + typeName;
                    wx.navigateTo({
                        url: url
                    });
                }
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
                var totalPage = this.filterForm.page.totalPage;
                if (totalPage > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.getMsgList();
                }
            },
        };
        return _this;
    }
    Filter.prototype.getTodoUrl = function (id) {
        if (id) {
            id = id.toString();
        }
        switch (id) { // 需和首页待办跳转同步
            case "14170681475": // 1财务待办
                return '/pages/me/financial-todo/index';
            case "14170681476": // 2合同待办
                return '/pages/me/todo/index';
            case "14173612880": // 3巡店待办
                return '/pages/me/shop-todo/index';
            case "14173612881": // 4整改通知
                return '/pages/me/shopfix-todo/index';
            case "14173612879": // 5意见征询待办
                return '/pages/me/consult-todo/index';
            default:
                return '/pages/me/assessment-notice-todo/index';
        }
    };
    Filter.prototype.getMsgList = function () {
        var _this = this;
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var data = {
            status: terms.status,
            searchKeyWords: terms.noticeText,
            pageNo: page.pageNo,
            pageSize: page.pageSize,
            orderBy: 'desc',
            _loading: true
        };
        this.methods.getUpcomingList(data).then(function (res) {
            if (res && res.payload) {
                _this.filterForm.page = __assign({}, _this.filterForm.page, { totalPage: res.payload.totalPage });
                if (res.payload.content && res.payload.content.length) {
                    res.payload.content = res.payload.content.map(function (item) {
                        return __assign({}, item, { createDateStr: item.backlogDto.createDateStr ? index_4.formatDate(item.backlogDto.createDateStr, "Y-M-D") : '', content: item.backlogDto.content, amount: terms.status == '0' ? item.backlogAmount : 0 });
                    });
                }
                if (_this.filterForm.page.pageNo > 1) {
                    _this.msgList = _this.msgList.concat(res.payload.content);
                }
                else {
                    _this.msgList = res.payload.content;
                }
            }
            // 获取全部未读消息数量
            var allUnreadMsg = 0;
            if (_this.msgList && _this.msgList.length > 0) {
                _this.msgList.forEach(function (item) {
                    allUnreadMsg += item.amount;
                });
            }
            _this.tabList[terms.status].count = allUnreadMsg;
            _this.$apply();
        });
    };
    Filter.prototype.onShow = function () {
        this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
        this.getMsgList();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            getUpcomingList: notice_1.getUpcomingList,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/message/upcoming/list/index'));

