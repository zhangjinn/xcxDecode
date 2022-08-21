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
var returnbefore_1 = require('./../../../../store/actions/returnbefore.js');
var index_1 = require('./../../../components/popup-customize/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '销售退货录入',
            usingComponents: {
                'van-icon': '/components/vant/icon/index',
                'van-toast': '/components/vant/toast/index',
                'van-loading': '/components/vant/loading/index',
                'van-popup': '/components/vant/popup/index',
                'van-field': '/components/vant/field/index',
                'van-stepper': '/components/vant/stepper/index',
            },
        };
        _this.components = {
            popupCustomize: index_1.default,
        };
        _this.data = {
            formData: {
                remark: '',
            },
            orderdetail: {},
            itemIndex: 0,
            outIndex: 0,
            documentNum: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            returnBack: function () {
                wx.navigateBack({
                    delta: 1 //返回上一级页面
                });
            },
            onRemarkChange: function (e) {
                var key = e.currentTarget.dataset.key;
                var detail = e.detail;
                this.formData[key] = detail;
            },
            onShippedBqtyChg: function (evt) {
                var detail = evt.detail, _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                // bug:  触发两次
                if (typeof detail === 'undefined') {
                    return;
                }
                var newOrderDetail = ramda_1.clone(this.orderdetail);
                var bprice = newOrderDetail.itemList[itemIndex].outItems[outIndex].bprice;
                newOrderDetail.itemList[itemIndex].outItems[outIndex].bactualQty = detail;
                var subtotal = detail * bprice;
                newOrderDetail.itemList[itemIndex].outItems[outIndex].subtotal = subtotal.toFixed(2);
                this.orderdetail = newOrderDetail;
            },
            // 退货发起提交
            onInitSubmit: function () {
                var remark = this.formData.remark;
                var itemList = this.orderdetail.itemList;
                var orderItem = [];
                var totalAmount = 0;
                var mag = []; // 提交前校验入库数量是否满足
                var warehousingQty = 0;
                ramda_1.forEach(function (item) {
                    if (item.outItems && item.outItems.length > 0) { //item.outItems只允许有一条数据
                        ramda_1.forEach(function (out) {
                            var data = {
                                model: item.model,
                                productCode: item.productCode,
                                borderedQty: out.bactualQty,
                                bprice: out.bprice,
                                amount: out.subtotal // 退货金额
                            };
                            totalAmount += Number(out.subtotal);
                            warehousingQty += Number(out.bactualQty);
                            if (out.bactualQty > 0) { // 数量大于0才进行提交，等于0的忽略
                                orderItem.push(data);
                            }
                        }, item.outItems);
                    }
                }, itemList);
                if (warehousingQty <= 0) {
                    mag.push("\u9000\u8D27\u6570\u91CF\u9700\u5927\u4E8E0\uFF01");
                }
                if (mag.length > 0) {
                    toast_1.default.fail(mag[0]);
                    return false;
                }
                var param = {
                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                    returnOrder: {
                        documentNum: this.documentNum,
                        message: remark,
                        amount: totalAmount,
                        itemList: orderItem
                    }
                };
                this.methods.createChannelCreationReturn(param).then(function (res) {
                    var code = res.payload.code;
                    if (code == '0') {
                        toast_1.default.success({
                            forbidClick: true,
                            duration: 1000,
                            message: '提交成功',
                            onClose: function () {
                                wx.navigateBack({
                                    delta: 1,
                                });
                            },
                        });
                    }
                });
            },
        };
        return _this;
    }
    // 添加或修改产品赋值
    Filter.prototype.productAssignment = function (chooseItem, itemIndex, outIndex) {
        var outItems = this.orderdetail.itemList[itemIndex].outItems;
        var outBoundItem = {
            bactualQty: 0,
            bprice: chooseItem.bprice,
            subtotal: 0.00,
        };
        outBoundItem.subtotal = outBoundItem.subtotal.toFixed(2);
        if (!Array.isArray(outItems)) {
            outItems = [];
        }
        if (outIndex && outIndex !== 'undefined') { // 如果outIndex有值为编辑直接替换数据；否则为新增
            outItems[outIndex] = outBoundItem;
        }
        else {
            outItems.push(outBoundItem);
        }
        this.orderdetail.itemList[itemIndex].outItems = outItems;
        this.$apply();
    };
    // 获取退货发起详情
    Filter.prototype.getMyOrderDetail = function () {
        var _this = this;
        var param = {
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            documentNum: this.documentNum,
        };
        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
        this.methods.getReturnShowSalesOrder(param).then(function (res) {
            toast_1.default.clear();
            var data = res.payload.data;
            _this.orderdetail = data;
            _this.formData.remark = _this.orderdetail.message || '';
            if (_this.orderdetail.itemList && _this.orderdetail.itemList.length > 0) {
                _this.orderdetail.itemList.forEach(function (item, index) {
                    _this.productAssignment(item, index, 0);
                });
            }
            _this.$apply();
        });
    };
    Filter.prototype.onShow = function () {
    };
    Filter.prototype.onLoad = function (e) {
        var documentNum = e.documentNum;
        this.documentNum = documentNum;
        this.getMyOrderDetail();
        this.$apply();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            getReturnShowSalesOrder: returnbefore_1.getReturnShowSalesOrder,
            createChannelCreationReturn: returnbefore_1.createChannelCreationReturn,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/dms/agent-returns/initiate/index'));

