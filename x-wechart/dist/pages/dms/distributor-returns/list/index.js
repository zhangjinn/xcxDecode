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
var index_1 = require('./../../../../components/empty-data-type/index.js');
var returnbefore_1 = require('./../../../../store/actions/returnbefore.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '分销商退货',
            usingComponents: {
                'van-toast': '../../../../components/vant/toast/index',
                'van-loading': '../../../../components/vant/loading/index',
                'van-search': '../../../../components/vant/search/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default
        };
        _this.data = {
            scrollTop: -1,
            searchKey: '',
            filterForm: {
                terms: {
                    filterStr: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    totalPage: 0,
                }
            },
            msgList: []
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转至分销商出库页面
            returnInitiation: function (e) {
                var _a = e.currentTarget.dataset, item = _a.item, type = _a.type;
                var id = '';
                if (type === 'initiate') { // 退货发起
                    id = item.purchaseOrderId;
                }
                else if (type === 'outStock') { // 退货出库
                    id = item.returnId;
                }
                if (id) {
                    wx.navigateTo({
                        url: "/pages/dms/distributor-returns/edit/index?id=" + id + "&type=" + type
                    });
                }
            },
            viewDetails: function (e) {
                var item = e.currentTarget.dataset.item;
                var id = item.purchaseOrderId;
                if (id) {
                    wx.navigateTo({
                        url: "/pages/dms/channel-purchase-order/detail/index?id=" + id // 渠道订单详情
                    });
                }
            },
            // 输入框搜索
            onChange: function (e) {
                _this.searchKey = e.detail;
                _this.filterForm.terms = __assign({}, _this.filterForm.terms, { filterStr: _this.searchKey });
                _this.filterForm.page = __assign({}, _this.filterForm.page, { pageNo: 1 });
                _this.getMsgList();
                _this.$apply();
            },
            onClick: function () {
                _this.filterForm.page = __assign({}, _this.filterForm.page, { pageNo: 1 });
                _this.getMsgList();
                _this.$apply();
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
    Filter.prototype.getMsgList = function () {
        var _this = this;
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        this.methods.getReturnChannelOrderInfo({
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            _loading: true,
            filterStr: terms.filterStr,
            page: {
                pageNo: page.pageNo,
                pageSize: page.pageSize
            }
        }).then(function (res) {
            var _a = res.payload, data = _a.data, page = _a.page;
            _this.filterForm.page = __assign({}, _this.filterForm.page, { totalPage: page.totalPage });
            if (_this.filterForm.page.pageNo > 1) {
                _this.msgList = _this.msgList.concat(data);
            }
            else {
                _this.msgList = data;
            }
            _this.$apply();
        });
    };
    Filter.prototype.onShow = function () {
        this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
        this.getMsgList();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            getReturnChannelOrderInfo: returnbefore_1.getReturnChannelOrderInfo
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/dms/distributor-returns/list/index'));

