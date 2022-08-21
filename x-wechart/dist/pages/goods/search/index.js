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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '搜索',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-search': '../../../components/vant/search/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "权限" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.SEARCH_HISTORY = 'searchHistory';
        _this.data = {
            key: '',
            searchHistory: [],
            value: '',
            searchPermissions: false
        };
        // 页面内交互写在methods里
        _this.methods = {
            clickHistory: function (e) {
                if (e.currentTarget.dataset.url) {
                    wx.navigateTo({
                        url: e.currentTarget.dataset.url
                    });
                }
            },
            onChange: function (event) {
                // 缺防抖
                var searchKey = ramda_1.trim(event.detail);
                _this.key = searchKey;
            },
            onSearch: function () {
                var key = _this.key || _this.preWord;
                _this.methods.saveSearchHistory({
                    url: "/pages/goods/filter/index?q=" + key,
                    value: _this.data.key,
                });
                wx.redirectTo({
                    url: "/pages/goods/filter/index?q=" + key
                });
            },
            // 将搜索保存进storage
            saveSearchHistory: function (item) {
                if (item.value == '') {
                    return;
                }
                if (_this.searchHistory.findIndex(function (res) { return res.value == item.value; }) !== -1) {
                    _this.searchHistory.splice(_this.searchHistory.findIndex(function (res) { return res.value == item.value; }), 1);
                }
                _this.searchHistory.unshift(item);
                if (_this.searchHistory.length > 10) {
                    _this.searchHistory = _this.searchHistory.splice(0, 10);
                }
                wx.setStorage({
                    key: _this.SEARCH_HISTORY,
                    data: _this.searchHistory
                });
            },
            // 清楚搜索记录
            clearHistory: function () {
                var context = _this;
                wx.removeStorage({
                    key: _this.SEARCH_HISTORY,
                    success: function () {
                        context.searchHistory = [];
                        context.$apply();
                    }
                });
            },
        };
        return _this;
    }
    Filter.prototype.search = function () {
        // 搜索总接口
    };
    Filter.prototype.getPermissionList = function () {
        if (wx.getStorageSync('b2b_permission_list')) {
            var searchPermissions = JSON.parse(wx.getStorageSync('b2b_permission_list')).searchPermissions;
            this.searchPermissions = searchPermissions;
        }
        this.$apply();
    };
    Filter.prototype.onShow = function () {
        this.getPermissionList();
    };
    Filter.prototype.onLoad = function () {
        // 加载最近搜索
        var context = this;
        wx.getStorage({
            key: this.SEARCH_HISTORY,
            success: function (res) {
                context.searchHistory = res.data || [];
                context.$apply();
            }
        });
    };
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/search/index'));

