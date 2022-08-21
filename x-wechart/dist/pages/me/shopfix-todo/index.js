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
var consultTodo_1 = require('./../../../store/actions/consultTodo.js');
var record_1 = require('./../../../store/actions/record.js');
var common_1 = require('./../../../mixins/common.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_1 = require('./../../../components/empty-data-type/index.js');
var consultTodo = /** @class */ (function (_super) {
    __extends(consultTodo, _super);
    function consultTodo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '整改待办',
            usingComponents: {
                'van-button': '../../../components/vant/button/index',
                'van-tab': '../../../components/vant/tab-item/index',
                'van-tabs': '../../../components/vant/tabs-item/index',
                'van-search': '../../../components/vant/search/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
            },
            enablePullDownRefresh: true,
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.mixins = [common_1.default];
        _this.params = {
            pageSize: 10,
            pageNo: 1,
            status: 0,
        };
        _this.isView = false;
        _this.data = {
            active: 'first',
            key: '',
            // 加载数据中
            loading: false,
            // 是否全部加载完毕
            complete: false,
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 过滤数据
            search: function (params) {
                toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
                _this.methods.getSHopFixTodoItems(params, function (res) {
                    // 接口返回 关闭对应状态
                    _this.loading = false;
                    wx.stopPullDownRefresh();
                    toast_1.default.clear();
                    if (res && res.data && res.data.priceDelegateMessageList) {
                        var _a = res.data, priceDelegateMessageList = _a.priceDelegateMessageList, totalPages = _a.totalPages;
                        _this.complete = priceDelegateMessageList.length === 0;
                        _this.totalPages = totalPages;
                    }
                });
            },
            onPullBottom: function () {
                var pageNo = this.params.pageNo;
                var index = pageNo + 1;
                if (!this.loading && !this.complete && pageNo < this.totalPages) {
                    this.loading = true;
                    this.params.pageNo = index;
                    this.methods.search(__assign({}, this.params, { pull: true }));
                }
            },
            view: function (id, type) {
                _this.isView = true;
                if (id) {
                    wx.navigateTo({
                        url: "/pages/terminal/punchdetails/index"
                    });
                }
            },
            handle: function (item, type) {
                _this.isView = false;
                if (item.taskStatus == '待业务员整改') {
                    wx.navigateTo({ url: '/pages/terminal/fixNotify/index?resultId=' + item.sourceId + '&read=1' });
                }
                else {
                    wx.navigateTo({ url: '/pages/terminal/fixNotify/index?resultId=' + item.sourceId });
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    consultTodo.prototype.onPullDownRefresh = function () {
        this.params = __assign({}, this.params, { pageNo: 1 });
        if (this.params.searchTerm) {
            delete this.params.searchTerm;
        }
        this.methods.search(__assign({}, this.params));
    };
    consultTodo.prototype.onShow = function () {
        this.methods.getSHopFixTodoCounts();
        this.params = { pageSize: 10, pageNo: 1, status: this.params.status };
        this.methods.search(__assign({}, this.params));
    };
    consultTodo.prototype.onLoad = function (param) {
        var status = param.status;
        if (status) {
            this.params.status = status;
        }
    };
    consultTodo.prototype.onUnload = function () {
        var route = getCurrentPages();
        if (route.length > 3) {
            wx.navigateBack({ delta: 2 });
        }
    };
    consultTodo = __decorate([
        wepy_redux_1.connect({
            count: function (_a) {
                var consultTodo = _a.consultTodo;
                return consultTodo.fixCount;
            },
            items: function (_a) {
                var consultTodo = _a.consultTodo;
                return consultTodo.fixItems;
            },
        }, {
            getSHopFixTodoCounts: consultTodo_1.getSHopFixTodoCounts,
            getSHopFixTodoItems: consultTodo_1.getSHopFixTodoItems,
            updateDelegate: record_1.updateDelegate
        })
    ], consultTodo);
    return consultTodo;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(consultTodo , 'pages/me/shopfix-todo/index'));

