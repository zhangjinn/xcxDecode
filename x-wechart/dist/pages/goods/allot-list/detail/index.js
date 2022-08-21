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
var request_1 = require('./../../../../utils/request.js');
var dmsrequest_1 = require('./../../../../store/actions/dmsrequest.js');
var index_1 = require('./../../../../utils/index.js');
var salesorderdetail_1 = require('./../../../../store/actions/salesorderdetail.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var orderdetail = /** @class */ (function (_super) {
    __extends(orderdetail, _super);
    function orderdetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '调拨订单详情',
            usingComponents: {
                'van-button': '../../../../components/vant/button/index',
                'van-steps': '../../../../components/vant/steps/index',
                'van-popup': '../../../../components/vant/popup/index',
                'img': '../../../../components/img/index'
            }
        };
        _this.data = {
            stretchFlag: true,
            baseUrl: request_1.baseUrl,
            documentNum: '',
            orderdetail: {},
            showCanselExamle: false,
            ExamineId: '' // 取消审核单号id
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 取消审核弹窗
            cancelExamine: function () {
                _this.showCanselExamle = false;
            },
            // 打开审核弹框
            ordercanselExamine: function () {
                _this.ExamineId = _this.orderdetail.stvId;
                _this.showCanselExamle = true;
                _this.$apply();
            },
            // TODO:取消审核接口对接
            canselExamine: function () {
                _this.showCanselExamle = false;
                var id = _this.ExamineId;
                var account = wepy_1.default.$instance.globalData.account;
                _this.methods.canselOms({
                    _loading: true,
                    userAccount: account,
                    stvId: id
                }).then(function (res) {
                    if (res && res.payload && res.payload.code == '0') {
                        toast_1.default.success('取消物流成功');
                        _this.methods.getAllotOrderDetail({ _loading: true, documentNum: _this.documentNum });
                    }
                });
            },
            stretchFlag: function () {
                _this.stretchFlag = !_this.stretchFlag;
            },
            getAllotOrderDetail: function (data) {
                dmsrequest_1.dmsRequest({
                    data: data,
                    method: 'getGicStockTransDetail'
                }).then(function (res) {
                    _this.orderdetail = res.data;
                    _this.orderdetail.omsOrderStatus = _this.orderdetail.omsOrderStatus.filter(function (it) { return it.orderStatusName || it.remark; });
                    _this.orderdetail.omsOrderStatus.forEach(function (item) {
                        if (item.orderStatusName) {
                            item.text = "[" + item.orderStatusName + "] " + item.remark;
                        }
                        else {
                            item.text = item.remark;
                        }
                        // item.desc = item.reserveTime
                    });
                    _this.orderdetail.staItems.forEach(function (item) {
                        if (item.bdemandQty) {
                            item.bdemandQty = Number(item.bdemandQty);
                        }
                        var _a = index_1.formatDmsImg({ model: item.model, material: item.materialGroupCode }), img = _a.img, err = _a.err;
                        item.img = img;
                        item.err = err;
                    });
                    _this.$apply();
                });
            }
        };
        return _this;
    }
    orderdetail.prototype.onLoad = function (e) {
        var documentNum = e.documentNum;
        this.documentNum = documentNum;
        this.methods.getAllotOrderDetail({ _loading: true, documentNum: this.documentNum });
    };
    orderdetail = __decorate([
        wepy_redux_1.connect({}, {
            canselOms: salesorderdetail_1.canselOms
        })
    ], orderdetail);
    return orderdetail;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(orderdetail , 'pages/goods/allot-list/detail/index'));

