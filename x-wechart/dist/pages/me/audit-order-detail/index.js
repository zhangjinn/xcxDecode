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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var audit_order_1 = require('./../../../store/actions/audit-order.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var AuditOrderDetail = /** @class */ (function (_super) {
    __extends(AuditOrderDetail, _super);
    function AuditOrderDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '订单详情',
            usingComponents: {
                'van-button': '../../../components/vant/button/index',
                'van-field': '../../../components/vant/field/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-checkbox': '../../../components/vant/checkbox/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-img': '../../../components/img/index',
            }
        };
        _this.orderId = '';
        _this.remark = '';
        _this.data = {
            rejectShow: false,
        };
        // 页面内交互写在methods里
        _this.methods = {
            onRemarkChange: function (_a) {
                var detail = _a.detail;
                _this.remark = ramda_1.trim(detail.value);
            },
            reject: function () {
                _this.rejectShow = true;
            },
            closeRejectDialog: function () {
                _this.rejectShow = false;
            },
            confirmReject: function () {
                _this.rejectShow = false;
                if (!_this.remark) {
                    toast_1.default('请输入驳回原因');
                    return;
                }
                toast_1.default.loading({ forbidClick: true, message: '处理中...', duration: 0 });
                request_1.request({
                    api: 'order/disAgreeOrders.nd',
                    method: 'POST',
                    data: {
                        ids: _this.orderId,
                        remark: _this.remark,
                    },
                    callback: function (res) {
                        var _a = res.data, msg = _a.msg, code = _a.code;
                        toast_1.default.clear();
                        if (code === 0) {
                            wx.navigateBack();
                        }
                        else {
                            toast_1.default.fail(msg || '审核失败');
                        }
                    },
                });
            },
            accept: function () {
                dialog_1.default.confirm({
                    title: '确认审核通过？',
                    message: '不可撤销此操作',
                }).then(function () {
                    toast_1.default.loading({ forbidClick: true, message: '处理中...', duration: 0 });
                    request_1.request({
                        api: 'order/agreeOrders.nd',
                        method: 'POST',
                        data: {
                            ids: _this.orderId,
                            remark: '同意',
                        },
                        callback: function (res) {
                            var _a = res.data, msg = _a.msg, code = _a.code;
                            toast_1.default.clear();
                            if (code === 0) {
                                wx.navigateBack();
                            }
                            else {
                                toast_1.default.fail(msg || '审核失败');
                            }
                        },
                    });
                }).catch(function () {
                    // on cancel
                });
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    AuditOrderDetail.prototype.onLoad = function (_a) {
        var id = _a.id;
        this.orderId = id;
        toast_1.default.loading({ forbidClick: true, message: '处理中...', duration: 0 });
        this.methods.getOrderDetail({ id: id }).then(function () {
            toast_1.default.clear();
        });
    };
    AuditOrderDetail = __decorate([
        wepy_redux_1.connect({
            order: function (_a) {
                var auditorder = _a.auditorder;
                return auditorder.order;
            },
        }, {
            getOrderDetail: audit_order_1.getOrderDetail,
        })
    ], AuditOrderDetail);
    return AuditOrderDetail;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(AuditOrderDetail , 'pages/me/audit-order-detail/index'));

