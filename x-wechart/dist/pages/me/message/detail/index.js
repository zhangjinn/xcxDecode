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
var notice_2 = require('./../../../../store/types/notice.js');
var request_1 = require('./../../../../utils/request.js');
var index_1 = require('./../../../../components/empty-data-type/index.js');
var filter = /** @class */ (function (_super) {
    __extends(filter, _super);
    function filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            usingComponents: {
                'van-rate': '../../../../components/vant/rate/index',
                'van-icon': '../../../../components/vant/icon/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-picker': '../../../../components/vant/picker/index',
                'van-search': '../../../../components/vant/search/index',
                'van-tab': '../../../../components/vant/tab/index',
                'van-row': '../../../../components/vant/row/index',
                'van-col': '../../../../components/vant/col/index',
                'van-tabs': '../../../../components/vant/tabs/index',
                'van-radio': '../../../../components/vant/radio/index',
                'van-radio-group': '../../../../components/vant/radio-group/index',
                'van-cell': '../../../../components/vant/cell/index',
                'van-field': '../../../../components/vant/field/index',
                'van-loading': '../../../../components/vant/loading/index',
                'van-stepper': '../../../../components/vant/stepper/index',
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'img': '../../../../components/img/index',
                'item': '../../../../components/list-item/index',
                'container': '../../../../components/container/index',
                'no-permission': '../../../../components/no-permission/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "xmlns:wx": "", "description": "消息" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            filterForm: {
                pageNo: 1,
                fwOrgId: '',
                type: '',
                status: '',
                beginDate: '',
                endDate: '',
            },
            isCanJump: false,
        };
        _this.methods = {
            viewDetail: function (e, type, itemId, orgCode) {
                if (e && type && type == '14170774247') { // 订单状态变更
                    wx.navigateTo({
                        url: "/pages/me/order-detail/index?id=" + e
                    });
                }
                if (e && type && type == '14171002147') { // 渠道订单消息
                    wx.navigateTo({
                        url: "/pages/dms/channel-purchase-order/detail/index?id=" + e
                    });
                }
                if (e && type && type == '14924754140') { // 销售订单消息
                    wx.navigateTo({
                        url: "/pages/dms/sales-distributors-detail/index?id=" + e + "&orgId=" + orgCode
                    });
                }
                if (e && type && type == '14171893218') { // 咨询信息回复
                    wx.navigateTo({
                        url: "/pages/me/my-consultation/detail/index?id=" + e
                    });
                }
                if (e && type && type == '14171893222') { // 资金认领通知
                    wx.navigateTo({
                        url: "/pages/finance/fund-claim/handle/index?id=" + e + "&salenum=" + orgCode
                    });
                }
                if (e && type && type == '14171893226') { // 库龄超期预警
                    wx.navigateTo({
                        url: "/pages/goods/inventory-age/index?id=" + e + "&isWarning=YC"
                    });
                }
                if (e && type && type == '14171893229') { // 政策合同
                    wx.navigateTo({
                        url: "/pages/me/policyContract/index/index"
                    });
                }
                if (e && type && type == '20220408001') { // 分销商拒收通知
                    // TODO：暂不确定跳转
                }
                if (e && type && type == '14187583094') { // 促销资源兑现
                    wx.navigateTo({
                        url: "/pages/me/promotional-message-detail/index?id=" + e
                    });
                }
            },
            loadNextPage: function () {
                var pageNo = this.filterForm.pageNo;
                if (pageNo < this.totalPages) {
                    var pageNos = pageNo + 1;
                    this.filterForm = __assign({}, this.filterForm, { pageNo: pageNos });
                    this.$apply();
                    this.myGetMessageList();
                }
            }
        };
        return _this;
    }
    filter.prototype.myGetMessageList = function () {
        var _a = this.filterForm, pageNo = _a.pageNo, fwOrgId = _a.fwOrgId, type = _a.type, status = _a.status, beginDate = _a.beginDate, endDate = _a.endDate;
        this.methods.getMessageList({
            pageNo: pageNo,
            fwOrgId: fwOrgId,
            type: type,
            status: status,
            beginDate: beginDate,
            endDate: endDate
        });
    };
    // 判断该通知是否可跳转
    filter.prototype.checkCanJump = function (type) {
        switch (type) {
            case '14171893229': // 政策合同
            case '14170774247': // 订单状态变更
            case '14171002147': // 渠道订单消息
            case '14924754140': // 销售订单消息
            case '14171893218': // 咨询信息回复
            case '14171893222': // 资金认领通知
            case '14171893226': // 库龄超期预警
            case '20220408001': // 分销商拒收通知
            case '14187583094': // 促销资源兑现
                return true;
            default:
                return false;
        }
    };
    filter.prototype.onShow = function () {
        wepy_redux_1.getStore().dispatch({ type: notice_2.RESET_MESSAGE_LIST, payload: [] });
        this.filterForm = __assign({}, this.filterForm, { pageNo: 1 });
        this.$apply();
        this.myGetMessageList();
    };
    filter.prototype.onLoad = function (e) {
        wepy_redux_1.getStore().dispatch({ type: notice_2.RESET_MESSAGE_LIST, payload: [] });
        var type = e.type, typeName = e.typeName;
        var types = '';
        if (type) {
            types = type;
        }
        this.filterForm = __assign({}, this.filterForm, { type: types, pageNo: 1 });
        this.isCanJump = this.checkCanJump(types);
        if (typeName) {
            wx.setNavigationBarTitle({
                title: typeName
            });
        }
        var data = {
            priceMessageId: '',
            type: types,
        };
        this.$apply();
        // 某个type下的全部已读
        request_1.request({ api: 'priceMessage/read.nd', method: 'POST', data: data });
    };
    filter = __decorate([
        wepy_redux_1.connect({
            list: function (_a) {
                var notice = _a.notice;
                return notice.list;
            },
            messageList: function (_a) {
                var notice = _a.notice;
                return notice.messageList;
            },
            totalPages: function (_a) {
                var notice = _a.notice;
                return notice.totalPages;
            }
        }, {
            getNoticeList: notice_1.getNoticeList,
            getMessageList: notice_1.getMessageList
        })
    ], filter);
    return filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(filter , 'pages/me/message/detail/index'));

