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
var salesorderdetail_1 = require('./../../../../store/actions/salesorderdetail.js');
var order_detail_1 = require('./../../../../store/actions/order-detail.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var request_1 = require('./../../../../utils/request.js');
/* import utilsWxs from '../../../../wxs/utils.wxs'; */
var dmsrequest_1 = require('./../../../../store/actions/dmsrequest.js');
var orderdetail = /** @class */ (function (_super) {
    __extends(orderdetail, _super);
    function orderdetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '订单详情',
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
                'van-steps': '/components/vant/steps/index',
                'calendar': '/components/calendar/index',
                'img': '/components/img/index',
            },
        };
        _this.data = {
            visible: false,
            id: '',
            baseUrl: request_1.baseUrl,
            currentOrderId: '',
            viewmore: false,
            isBillsShow: false,
            outActiveIdx: 0,
            isImg: false,
            ImgArr: [],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 回单影像
            receiptEffect: function (item) {
                var _this = this;
                var id = item.documentNum;
                dmsrequest_1.dmsRequest({
                    data: {
                        'cisCode': wepy_1.default.$instance.globalData.cisCode,
                        'documentNum': id
                    },
                    method: 'toOmsView'
                }).then(function (res) {
                    if (res.data) {
                        _this.isImg = true;
                        _this.ImgArr = res.data;
                    }
                    else {
                        toast_1.default.fail('暂无回单影像');
                    }
                });
            },
            onClose: function () {
                this.isImg = false;
            },
            viewmore: function () {
                _this.viewmore = !_this.viewmore;
            },
            // 动态选择
            chose: function (id) {
                _this.channelOrderdetail.erpList.forEach(function (res) {
                    if (res.sapOrderCode == id) {
                        res.active = true;
                        _this.channelOrderdetail.nowgoods = res;
                    }
                    else {
                        res.active = false;
                    }
                });
            },
            //出库信息 更多单号显示
            isBillsShowFun: function () {
                this.isBillsShow = !this.isBillsShow;
            },
            outActiveShowFun: function (idx) {
                for (var _i = 0, _a = this.orderdetail.data.outBoundItem; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.isActive = false;
                }
                this.orderdetail.data.outBoundItem[idx].isActive = true;
                //   this.outActiveIdx = idx;
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    orderdetail.prototype.onLoad = function (e) {
        var _this = this;
        var id = e.id;
        this.currentOrderId = id;
        this.methods.getPurchaseOrderDetail({ purchaseOrderId: this.currentOrderId }).then(function (res) {
            if (res.payload.data.BHOid) {
                _this.methods.getOrderDetail({ _loading: true, id: res.payload.data.BHOid });
            }
            else {
                //this.channelOrderdetail = {}
                _this.setData({ channelOrderdetail: null });
            }
        });
        this.methods.getPurchaseExamInfo({ orderId: this.currentOrderId });
    };
    orderdetail = __decorate([
        wepy_redux_1.connect({
            orderdetail: function (_a) {
                var salesorderdetail = _a.salesorderdetail;
                return salesorderdetail.purchaseorderdetail;
            },
            channelOrderdetail: function (_a) {
                var orderdetail = _a.orderdetail;
                return orderdetail.orderdetail;
            },
            purchaseExamInfo: function (_a) {
                var salesorderdetail = _a.salesorderdetail;
                return salesorderdetail.purchaseExamInfo;
            }
        }, {
            getPurchaseOrderDetail: salesorderdetail_1.getPurchaseOrderDetail,
            getOrderDetail: order_detail_1.getOrderDetail,
            getPurchaseExamInfo: salesorderdetail_1.getPurchaseExamInfo
        })
    ], orderdetail);
    return orderdetail;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(orderdetail , 'pages/dms/channel-purchase-order/detail/index'));

