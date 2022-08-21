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
            navigationBarTitleText: '分销商出库',
            usingComponents: {
                'van-icon': '/components/vant/icon/index',
                'van-toast': '/components/vant/toast/index',
                'van-loading': '/components/vant/loading/index',
                'van-popup': '/components/vant/popup/index',
                'van-field': '/components/vant/field/index',
                'van-stepper': '/components/vant/stepper/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "popupCustomize": { "xmlns:v-bind": "", "v-bind:options.sync": "salesmanOptions", "v-bind:selectedOption.sync": "popSelectedOption", "v-bind:title.sync": "popTitle", "xmlns:v-on": "" } };
        _this.$events = { "popupCustomize": { "v-on:onSelect": "onSelect" } };
        _this.components = {
            popupCustomize: index_1.default,
        };
        _this.data = {
            formData: {
                salesman: {
                    id: '',
                    name: ''
                },
                remark: '',
            },
            salesmanOptions: [],
            popTitle: '',
            popSelectedOption: {},
            formKey: '',
            orderdetail: {},
            itemIndex: 0,
            outIndex: 0,
            orderId: '',
            pageType: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            returnBack: function () {
                wx.navigateBack({
                    delta: 1 //返回上一级页面
                });
            },
            // 添加、修改产品信息
            jumpClick: function (evt) {
                var _a = evt.currentTarget.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex, type = _a.type;
                if (type === 'add') { // 添加
                    var outItem = this.orderdetail.returnOrderItemList[itemIndex].outItems;
                    if (outItem && outItem.length >= 1) {
                        toast_1.default.fail('请先删除已选库存再进行添加');
                        return;
                    }
                }
                var zzprdmodel = this.orderdetail.returnOrderItemList[itemIndex].model;
                var invStatusId = this.orderdetail.returnOrderItemList[itemIndex].invStatusId; // 质量等级
                var invStatusType = this.orderdetail.returnOrderItemList[itemIndex].invStatusType || '-1'; // 补差类型
                var warehouseId = this.orderdetail.returnOrderItemList[itemIndex].gicOutWarehouse; // 仓库编码
                var orgId = this.orderdetail.orgCode;
                var isOpenSharedWarehouse = 70; // 只能原仓
                wx.navigateTo({
                    url: '/pages/dms/order-item-choose/index?&ly=' + 'distributorReturns' + '&itemIndex=' + itemIndex + '&outIndex=' + outIndex + '&orgId=' + orgId + '&zzprdmodel=' + zzprdmodel + '&invStatusId=' + invStatusId + '&invStatusType=' + invStatusType + '&warehouseId=' + warehouseId + '&isOpenSharedWarehouse=' + isOpenSharedWarehouse + '&isFuzzy=false'
                });
            },
            // 删除产品信息
            onRemoveOutItem: function (evt) {
                var _a = evt.currentTarget.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                var newOrderDetail = ramda_1.clone(this.orderdetail);
                var length = newOrderDetail.returnOrderItemList[itemIndex].outItems.length;
                if (length > 0) {
                    newOrderDetail.returnOrderItemList[itemIndex].outItems.splice(outIndex, 1);
                    this.orderdetail = newOrderDetail;
                }
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
                newOrderDetail.returnOrderItemList[itemIndex].outItems[outIndex].bactualQty = detail;
                this.orderdetail = newOrderDetail;
            },
            onPopShow: function (e) {
                var _a = e.currentTarget.dataset, title = _a.title, key = _a.key;
                this.popTitle = title;
                this.formKey = key;
                this.popSelectedOption = this.formData[this.formKey];
                this.$invoke('popupCustomize', 'onShow');
            },
            // 弹框组件选择列表项
            onSelect: function (param) {
                this.formData[this.formKey] = param;
                this.popSelectedOption = this.formData[this.formKey];
                this.$apply();
            },
            // 退货发起提交并出库
            onInitSubmit: function () {
                var remark = this.formData.remark;
                var returnOrderItemList = this.orderdetail.returnOrderItemList;
                var orderItem = [];
                var mag = []; // 提交前校验入库数量是否满足
                var warehousingQty = 0; // 添加所有产品的总数量
                var productNum = 0; // 添加的总产品行数
                ramda_1.forEach(function (item) {
                    if (item.outItems && item.outItems.length > 0) { //item.outItems只允许有一条数据
                        ramda_1.forEach(function (out) {
                            var data = {
                                model: out.model,
                                productCode: out.productCode,
                                borderedQty: out.bactualQty,
                                bprice: item.bprice,
                                amount: item.amount,
                                invStatusId: item.invStatusId,
                                invStatusName: item.invStatusName,
                                warehouseId: out.warehouseId,
                            };
                            productNum += 1;
                            warehousingQty += Number(out.bactualQty);
                            if (out.bactualQty > 0) {
                                orderItem.push(data);
                            }
                        }, item.outItems);
                    }
                }, returnOrderItemList);
                if (productNum <= 0) {
                    mag.push("\u8BF7\u5148\u6DFB\u52A0\u51FA\u5E93\u4FE1\u606F\uFF01");
                }
                if (warehousingQty <= 0) {
                    mag.push("\u51FA\u5E93\u6570\u91CF\u9700\u5927\u4E8E0\uFF01");
                }
                if (mag.length > 0) {
                    toast_1.default.fail(mag[0]);
                    return false;
                }
                var param = {
                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                    purchaseOrderId: this.orderId,
                    returnOrder: {
                        outWarehouse: '',
                        message: remark,
                        returnItemList: orderItem
                    }
                };
                this.methods.createReturnOrderByPurchaseOrder(param).then(function (res) {
                    var code = res.payload.code;
                    if (code == '0') {
                        toast_1.default.success({
                            forbidClick: true,
                            duration: 1000,
                            message: '提交出库成功',
                            onClose: function () {
                                wx.navigateBack({
                                    delta: 1,
                                });
                            },
                        });
                    }
                });
            },
            // 退货出库提交并出库
            onOutSubmit: function () {
                var returnOrderItemList = this.orderdetail.returnOrderItemList;
                var orderItem = [];
                var mag = []; // 提交前校验入库数量是否满足
                var warehousingQty = 0;
                var productNum = 0; // 添加的总产品行数
                ramda_1.forEach(function (item) {
                    if (item.outItems && item.outItems.length > 0) { //item.outItems只允许有一条数据
                        ramda_1.forEach(function (out) {
                            var data = {
                                model: out.model,
                                productCode: out.productCode,
                                materialCode: out.materialCode,
                                invStatusId: out.invStatusId,
                                invStatusType: out.invStatusType,
                                warehouseId: out.warehouseId,
                                outboundQty: out.bactualQty,
                            };
                            productNum += 1;
                            warehousingQty += Number(out.bactualQty);
                            if (out.bactualQty > 0) {
                                orderItem.push(data);
                            }
                        }, item.outItems);
                    }
                }, returnOrderItemList);
                if (productNum <= 0) {
                    mag.push("\u8BF7\u5148\u6DFB\u52A0\u51FA\u5E93\u4FE1\u606F\uFF01");
                }
                if (warehousingQty <= 0) {
                    mag.push("\u51FA\u5E93\u6570\u91CF\u9700\u5927\u4E8E0\uFF01");
                }
                if (mag.length > 0) {
                    toast_1.default.fail(mag[0]);
                    return false;
                }
                var param = {
                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                    returnOrderId: this.orderId,
                    returnItemList: orderItem
                };
                this.methods.createDistributorReturnOrderOutbound(param).then(function (res) {
                    var code = res.payload.code;
                    if (code == '0') {
                        toast_1.default.success({
                            forbidClick: true,
                            duration: 1000,
                            message: '提交出库成功',
                            onClose: function () {
                                wx.navigateBack({
                                    delta: 1,
                                });
                            },
                        });
                    }
                });
            }
        };
        return _this;
    }
    // 添加或修改产品赋值
    Filter.prototype.productAssignment = function (chooseItem, itemIndex, outIndex) {
        var outItems = this.orderdetail.returnOrderItemList[itemIndex].outItems;
        var outBoundItem = {
            bactualQty: chooseItem.bactualQty,
            warehouseId: chooseItem.gicWarehouse,
            warehouseName: chooseItem.gicWarehouseName,
            invStatusType: chooseItem.invStatusType,
            invStatusTypeName: chooseItem.invStatusTypeName,
            materialCode: chooseItem.materialCode,
            invStatus: chooseItem.invStatusName,
            invStatusId: chooseItem.invStatusId,
            bavailQty: chooseItem.bigQty,
            inInvDate: chooseItem.inInvDate,
            productCode: chooseItem.productCode,
            orgCode: chooseItem.orgCode,
            colour: chooseItem.colour,
            model: chooseItem.model,
        };
        if (!Array.isArray(outItems)) {
            outItems = [];
        }
        if (outIndex && outIndex !== 'undefined') { // 如果outIndex有值为编辑直接替换数据；否则为新增
            outItems[outIndex] = outBoundItem;
        }
        else {
            outItems.push(outBoundItem);
        }
        this.orderdetail.returnOrderItemList[itemIndex].outItems = outItems;
        this.$apply();
    };
    // 获取退货发起详情 || 退货出库详情
    Filter.prototype.getMyOrderDetail = function () {
        var _this = this;
        var param = {
            cisCode: wepy_1.default.$instance.globalData.cisCode,
        };
        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
        if (this.pageType === 'initiate') { // 退货发起
            param.purchaseOrderId = this.orderId;
            this.methods.getPurchaseOrderReturnDetail(param).then(function (res) {
                toast_1.default.clear();
                var data = res.payload.data;
                _this.orderdetail = data;
                _this.formData.remark = _this.orderdetail.message || '';
                if (_this.orderdetail.returnOrderItemList && _this.orderdetail.returnOrderItemList.length > 0) {
                    _this.orderdetail.returnOrderItemList = _this.orderdetail.returnOrderItemList.map(function (item) {
                        item.maxReturnNum = item.inboundQty - item.breturnQty;
                        return item;
                    });
                }
                _this.$apply();
            });
        }
        else if (this.pageType === 'outStock') { // 退货出库
            param.returnOrderId = this.orderId;
            this.methods.getDistributorReturnOrderDetail(param).then(function (res) {
                toast_1.default.clear();
                var data = res.payload.data;
                _this.orderdetail = data;
                _this.formData.remark = _this.orderdetail.message || '';
                _this.orderdetail.returnOrderItemList = _this.orderdetail.itemList;
                if (_this.orderdetail.returnOrderItemList && _this.orderdetail.returnOrderItemList.length > 0) {
                    _this.orderdetail.returnOrderItemList = _this.orderdetail.returnOrderItemList.map(function (item) {
                        item.maxReturnNum = item.borderedQty - item.shippedBqty;
                        return item;
                    });
                }
                _this.$apply();
            });
        }
    };
    Filter.prototype.onShow = function () {
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        if (currPage.data.chooseItem) {
            var itemIndex = currPage.data.itemIndexR;
            var outIndex = currPage.data.outIndexR;
            if (this.orderdetail.returnOrderItemList[itemIndex].productCode !== currPage.data.chooseItem.productCode) {
                setTimeout(function () {
                    toast_1.default.fail('不是同一产品，请重新选择');
                }, 500);
            }
            else {
                currPage.data.chooseItem.bactualQty = 0; // 退货数量默认0
                this.productAssignment(currPage.data.chooseItem, itemIndex, outIndex);
                currPage.data.chooseItem = null;
                this.$apply();
            }
        }
    };
    Filter.prototype.onLoad = function (e) {
        var id = e.id, type = e.type;
        this.orderId = id;
        this.pageType = type;
        this.getMyOrderDetail();
        this.$apply();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            getPurchaseOrderReturnDetail: returnbefore_1.getPurchaseOrderReturnDetail,
            createReturnOrderByPurchaseOrder: returnbefore_1.createReturnOrderByPurchaseOrder,
            getDistributorReturnOrderDetail: returnbefore_1.getDistributorReturnOrderDetail,
            createDistributorReturnOrderOutbound: returnbefore_1.createDistributorReturnOrderOutbound,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/dms/distributor-returns/edit/index'));

