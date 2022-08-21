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
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../npm/wepy-redux/lib/index.js');
var dmsorder_1 = require('./../../store/types/dmsorder.js');
var OrderDetail = /** @class */ (function (_super) {
    __extends(OrderDetail, _super);
    function OrderDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = ['out', 'outInv', 'orgId', 'requiredParameters', 'ly', 'isDisabled']; // 1、传参有isDisabled并且为true，产品明细列表不可修改，false可修改 2、out:发货仓库对象 3、orgId：销售组织对象
        _this.watch = {
            'out': function (newValue, oldValue) {
                return newValue;
            },
            'orgId': function (newValue, oldValue) {
                return newValue;
            },
            'requiredParameters': function (newValue, oldValue) {
                return newValue;
            }
        };
        _this.data = {
            details: [],
            from: ''
        };
        _this.methods = {
            chooseItem: function (_a) {
                var detail = _a.detail;
                var id = detail.id;
                wepy_redux_1.getStore().dispatch({
                    type: dmsorder_1.DMS_ORDER_CHOOSE_ITEM,
                    payload: id
                });
                var orgId = this.orgId && this.orgId.id;
                var warehouseId = this.out && this.out.id;
                var requiredParameters = null;
                var details = JSON.stringify(this.details);
                if (this.ly == 'retailNew') { // 零售录入新版传参
                    if (this.requiredParameters) {
                        requiredParameters = JSON.stringify(this.requiredParameters);
                    }
                }
                wx.navigateTo({
                    url: '/pages/dms/order-item-choose/index?orgId=' + orgId + '&warehouseId=' + warehouseId + '&ly=' + this.ly + '&requiredParameters=' + requiredParameters + '&details=' + details
                });
            },
            addItem: function () {
                var additionOrderDetailItem = _this.additionOrderDetailItem;
                var details = _this.data.details;
                var key = "_" + (new Date()).valueOf();
                additionOrderDetailItem.itemInfo[key] = {
                    model: '',
                    color: '',
                    orgId: _this.orgId ? _this.orgId.id : '',
                    productCode: '',
                    productName: '',
                    invStatus: [],
                    invStateTypes: [],
                    inWarehouseList: [],
                    serviceList: [],
                };
                _this.details = details.concat([key]);
                _this.$apply();
            },
            delItem: function (_a) {
                var detail = _a.detail;
                var additionOrderDetailItem = this.additionOrderDetailItem;
                var id = detail.id, amount = detail.amount, volume = detail.volume;
                var details = this.data.details;
                var remaining = details.filter(function (itemId) { return itemId !== id; });
                delete additionOrderDetailItem.itemInfo[id];
                this.details = remaining;
                this.methods.amountChange({
                    detail: {
                        amount: -amount,
                    }
                });
                this.methods.volumeChange({
                    detail: {
                        volume: -volume,
                    }
                });
            },
            checkParam: function () {
                var errMsg = '';
                var items = this.$wxpage.selectAllComponents("#item");
                var submitLines = 0;
                for (var index in items) {
                    var item = items[index];
                    var result = item.checkParam();
                    if (result.empty) {
                        // 空没问题
                    }
                    else if (!result.finish) {
                        // 不完整, 提示报错
                        errMsg = result.errMsg;
                        break;
                    }
                    else if (result.errMsg) {
                        errMsg = result.errMsg;
                        break;
                    }
                    else {
                        submitLines++;
                    }
                }
                return {
                    submitLines: submitLines,
                    errMsg: errMsg
                };
            },
            getParam: function () {
                var items = this.$wxpage.selectAllComponents("#item");
                var params = [];
                for (var index in items) {
                    var item = items[index];
                    var param = item.getParam();
                    if (param.finish) {
                        params.push(param);
                    }
                }
                return params;
            },
            // 已经选择的产品列表
            selectedProductList: function () {
                var items = this.$wxpage.selectAllComponents("#item");
                var params = [];
                for (var index in items) {
                    var item = items[index];
                    var param = item.getParam();
                    if (param && param.itemInfo && param.itemInfo.model) {
                        params.push(param);
                    }
                }
                return params;
            },
            amountChange: function (_a) {
                var detail = _a.detail;
                var amount = detail.amount;
                _this.$emit('amount-change', {
                    amount: amount,
                });
            },
            volumeChange: function (_a) {
                var detail = _a.detail;
                var volume = detail.volume;
                _this.$emit('volume-change', {
                    volume: volume,
                });
            },
            // 零售录入新版服务方式改变存值
            serviceChange: function (_a) {
                var detail = _a.detail;
                var zoneB2cService = detail.zoneB2cService, zoneB2cServiceName = detail.zoneB2cServiceName, index = detail.index;
                var additionOrderDetailItem = _this.additionOrderDetailItem;
                var key = _this.details[index];
                additionOrderDetailItem.itemInfo[key].zoneB2cService = zoneB2cService;
                additionOrderDetailItem.itemInfo[key].zoneB2cServiceName = zoneB2cServiceName;
            },
            // 零售录入新版销售数量改变存值
            quantityChange: function (_a) {
                var detail = _a.detail;
                var quantity = detail.quantity, index = detail.index;
                var additionOrderDetailItem = _this.additionOrderDetailItem;
                var key = _this.details[index];
                additionOrderDetailItem.itemInfo[key].quantity = quantity;
            },
        };
        _this.events = {
            'return-stock': function () {
                this.from = 'return-stock';
            },
            'retail': function () {
                this.from = 'retail';
            },
            'relaunch': function () {
                var additionOrderDetailItem = this.additionOrderDetailItem;
                var key = "_" + (new Date()).valueOf();
                additionOrderDetailItem.itemInfo[key] = {
                    model: '',
                    color: '',
                    productCode: '',
                    productName: '',
                    invStatus: [],
                    serviceList: [],
                };
                this.details = [].concat([key]);
                this.$apply();
            },
            'details': function (value) {
                var details = value.split(',');
                this.details = details;
                this.$apply();
            }
        };
        return _this;
    }
    OrderDetail.prototype.onShow = function () {
    };
    OrderDetail.prototype.onLoad = function () {
        if (this.details.length === 0) {
            this.methods.addItem();
        }
    };
    OrderDetail = __decorate([
        wepy_redux_1.connect({
            additionOrderDetailItem: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseItemInfo;
            }
        }, {})
    ], OrderDetail);
    return OrderDetail;
}(wepy_1.default.component));
exports.default = OrderDetail;
