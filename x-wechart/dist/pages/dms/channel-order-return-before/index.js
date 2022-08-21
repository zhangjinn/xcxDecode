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
var channel_retail_order_1 = require('./../../../mixins/channel-retail-order.js');
var returnbefore_1 = require('./../../../store/actions/returnbefore.js');
var returnbefore_2 = require('./../../../store/types/returnbefore.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var ReturnStock = /** @class */ (function (_super) {
    __extends(ReturnStock, _super);
    function ReturnStock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '渠道退货出库',
            usingComponents: {
                "van-popup": "../../../components/vant/popup/index",
                "van-toast": "../../../components/vant/toast/index",
                "item": "../../../components/dms-order-addition-detail-item/index",
                "van-icon": "../../../components/vant/icon/index",
                "van-submit-bar": "../../../components/vant/submit-bar/index",
                "van-transition": "../../../components/vant/transition/index",
                "van-field": "../../../components/vant/field/index",
                "van-dialog": "../../../components/vant/dialog/index",
                "van-search": "../../../components/vant/search-items/index",
                'stores': '../../../components/stores-return/index',
                'calendar': '../../../components/calendar/index',
                'distributor-material-group': '../../../components/distributor-material-group/'
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.mixins = [channel_retail_order_1.default];
        _this.data = {
            filter: {
                pageNo: 1,
                pageSize: 10,
                filterStr: ''
            },
            itemId: '',
            documentNum: '',
            returnNum: '',
            supplierName: '',
            returnBy: ''
        };
        _this.methods = {
            goNext: function () {
                if (_this.itemId !== '') {
                    wx.navigateTo({
                        url: "/pages/dms/channel-order-return/index?itemId=" + _this.itemId + "&returnNum=" + _this.returnNum + "&documentNum=" + _this.documentNum + "&supplierName=" + _this.supplierName + "&returnBy=" + _this.returnBy,
                    });
                }
                else {
                    toast_1.default.fail('请选择退货信息!');
                }
            },
            selectItem: function (id, documentNum, returnNum, supplierName, returnBy) {
                _this.itemId = id;
                _this.documentNum = documentNum;
                _this.returnNum = returnNum;
                _this.supplierName = supplierName;
                _this.returnBy = returnBy;
                _this.$apply();
            },
            onClick: function () {
                wepy_redux_1.getStore().dispatch({ type: returnbefore_2.RESET_RETURN_CHANNEL_ORDER_INFO, payload: [] });
                _this.itemId = '';
                _this.filter = __assign({}, _this.filter, { pageNo: 1 });
                _this.$apply();
                _this.getMyList();
            },
            onChange: function (e) {
                _this.filter = __assign({}, _this.filter, { filterStr: e.detail });
                _this.$apply();
            },
            loadNextPage: function () {
                if (_this.filter.pageNo >= _this.totalPage_channel) {
                    //
                }
                else {
                    _this.filter = __assign({}, _this.filter, { pageNo: _this.filter.pageNo + 1 });
                    _this.getMyList();
                }
            },
        };
        return _this;
    }
    ReturnStock.prototype.getMyList = function () {
        var _a = this.filter, pageNo = _a.pageNo, pageSize = _a.pageSize, filterStr = _a.filterStr;
        this.methods.getReturnChannelOrderInfo({
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            _loading: true,
            filterStr: filterStr,
            page: {
                pageNo: pageNo,
                pageSize: pageSize
            }
        });
    };
    ReturnStock.prototype.onShow = function () {
        wepy_redux_1.getStore().dispatch({ type: returnbefore_2.RESET_RETURN_CHANNEL_ORDER_INFO, payload: [] });
        this.filter = __assign({}, this.filter, { pageNo: 1 });
        this.itemId = '';
        this.$apply();
        this.getMyList();
    };
    ReturnStock.prototype.onLoad = function () {
    };
    ReturnStock = __decorate([
        wepy_redux_1.connect({
            list_channel: function (_a) {
                var returnbefore = _a.returnbefore;
                return returnbefore.list_channel;
            },
            totalPage_channel: function (_a) {
                var returnbefore = _a.returnbefore;
                return returnbefore.totalPage_channel;
            }
        }, {
            getReturnChannelOrderInfo: returnbefore_1.getReturnChannelOrderInfo,
        })
    ], ReturnStock);
    return ReturnStock;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ReturnStock , 'pages/dms/channel-order-return-before/index'));

