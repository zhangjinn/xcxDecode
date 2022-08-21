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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var salesorderdetail_1 = require('./../../../store/actions/salesorderdetail.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var request_1 = require('./../../../utils/request.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var dmsoutwarehouse_1 = require('./../../../store/actions/dmsoutwarehouse.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var classification_1 = require('./../../../store/actions/classification.js');
var dmsorder_2 = require('./../../../store/types/dmsorder.js');
var orderdetail = /** @class */ (function (_super) {
    __extends(orderdetail, _super);
    function orderdetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '订单审核',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-search': '../../../components/vant/search/index',
                'van-tab': '../../../components/vant/tab/index',
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'van-radio': '../../../components/vant/radio/index',
                "van-submit-bar": "/components/vant/submit-bar/index",
                'van-radio-group': '../../../components/vant/radio-group/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                'van-loading': '../../../components/vant/loading/index',
                'van-stepper': '../../../components/vant/stepper/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-button': '../../../components/vant/button/index',
                'van-steps': '../../../components/vant/steps/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
                'sales-distributors-detail-item': '../../../components/sales-distributors-detail-item/index'
            },
        };
        _this.watch = {
            loadingInfo: function () {
                var _a = this.loadingInfo, code = _a.code, orgCode = _a.orgCode, orgId = _a.orgId;
                this.methods.getSalesCisStock({
                    code: code,
                    orgCode: orgCode,
                    orgId: orgId
                });
            },
            'testData': function (value) {
            },
            additionOrderDetailItem: function () {
            },
            'chooseItemInfo': function (newValue, oldValue) {
                if (!newValue) {
                    return;
                }
                var inventoryName = this.data.inventoryName;
                if (newValue.invStatusId && '请选择' === inventoryName && newValue.invStatus.length > 0) {
                    var r = newValue.invStatus.filter(function (item) { return newValue.invStatusId === item.key; });
                    if (r.length > 0) {
                        this.setData({
                            inventoryName: r[0].value
                        });
                        // info.inventoryName = r[0].name
                    }
                }
                if ((newValue || {}).productCode !== (oldValue || {}).productCode) {
                    var info = {
                        inventory: '',
                        inventoryName: '请选择',
                        quantity: '1',
                        price: '',
                        lock: (newValue || {}).lock || false,
                        time: (newValue || {}).time
                    };
                    var newAmount = '0.00';
                    var newVolume = '0.00';
                    if (newValue.price) {
                        info.price = newValue.price;
                    }
                    if (newValue.invStatusId) {
                        info.inventory = newValue.invStatusId;
                    }
                    if (newValue.quantity) {
                        info.quantity = newValue.quantity;
                    }
                    this.setData(info);
                    if (newValue.amount) {
                        newAmount = newValue.amount;
                    }
                    var amount = this.data.amount;
                    if (amount !== newAmount) {
                        this.setData({
                            amount: newAmount,
                        });
                        this.$emit('amountChange', {
                            amount: (+newAmount) - (+amount)
                        });
                    }
                    var volumeTotal = this.data.volumeTotal;
                    if (volumeTotal !== newVolume) {
                        this.setData({
                            volumeTotal: newVolume,
                        });
                        this.$emit('volumeChange', {
                            volumeTotal: (+newVolume) - (+volumeTotal)
                        });
                    }
                }
                else if ((newValue || {}).price !== this.data.price && newValue.refreshPrice && newValue.time !== this.data.time) {
                    var _a = this.data, amount = _a.amount, quantity = _a.quantity;
                    var newPrice = (newValue || {}).price;
                    var newAmount = (newPrice || 0) * (quantity || 0);
                    this.setData({
                        lock: (newValue || {}).lock || false,
                        price: newPrice,
                        amount: newAmount,
                        time: (newValue || {}).time
                    });
                    if (amount !== newAmount) {
                        this.$emit('amountChange', {
                            amount: (+newAmount) - (+amount)
                        });
                    }
                }
                else if ((newValue || {}).lock !== this.data.lock) {
                    this.setData({
                        lock: (newValue || {}).lock || false,
                        time: (newValue || {}).time
                    });
                }
                else if ((newValue || {}).time !== this.data.time) {
                    this.setData({
                        time: newValue.time
                    });
                }
                this.calcVolume();
            }
        };
        _this.data = {
            reviewConsent: false,
            beDismissed: false,
            visible: false,
            orderpopup: false,
            warehouseVisible: false,
            invStatusVisible: false,
            invStatusTypeVisible: false,
            id: '',
            canBuy: '',
            showMore: false,
            baseUrl: request_1.baseUrl,
            commentForm: {},
            commentVisible: false,
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            calendarVisible: false,
            currentOrderId: '',
            commentDetailVisible: false,
            commentDetail: {},
            orderdetail: {},
            itemIndex: 0,
            outIndex: 0,
            beConsentMsg: '确认是否同意',
            ItemBox: [],
            orgId: '',
            showBUcha: null,
            isOpenSharedWarehouse: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 根据销售组织判断是否显示不差类型
            getBucha: function (orgId) {
                var app = _this;
                dmsrequest_1.dmsRequest({
                    data: {
                        'cisCode': wepy_1.default.$instance.globalData.cisCode,
                        'orgCode': orgId
                    },
                    method: 'isEnableOrNot'
                }).then(function (res) {
                    _this.showBUcha = res.data;
                    app.$apply();
                });
            },
            // 审核同意弹框
            orderConsent: function () {
                var that = this;
                var salesOrderItem = that.orderdetail.data.salesOrderItem;
                that.beConsentMsg = '确认是否同意';
                //校验数据合法性
                if (salesOrderItem) {
                    var errMsg = '';
                    var totalQty = 0;
                    for (var i = 0; i < salesOrderItem.length; i++) {
                        var item = salesOrderItem[i];
                        if (item.outItems && item.outItems.length > 0) {
                            // 明细下单数量
                            var backnowledgedQty = item.backnowledgedQty * 1;
                            // 明细出库合计
                            var totalBactualQty = 0;
                            var errmsg = '';
                            for (var j = 0; j < item.outItems.length; j++) {
                                var out = item.outItems[j];
                                //出库数量
                                var bactualQty = out.bactualQty * 1;
                                //可用数量
                                var bavailQty = out.bavailQty * 1;
                                //出库求和
                                totalBactualQty += bactualQty;
                                if (bactualQty > bavailQty) {
                                    toast_1.default.fail('出库数量不能大于可用数量');
                                    return;
                                }
                                if (!out.warehouseName) {
                                    toast_1.default.fail('仓库不能为空');
                                    return;
                                }
                                if (!out.invStatus) {
                                    toast_1.default.fail('库存状态不能为空');
                                    return;
                                }
                                /*if(!out.invStatusTypeName){
                                  Toast.fail('补差类型不能为空');
                                  return;
                                }*/
                            }
                            ;
                            totalQty += totalBactualQty;
                            if (totalBactualQty > backnowledgedQty) {
                                toast_1.default.fail('明细中出库数量不可超过下单数量');
                                return;
                            }
                            if (totalBactualQty < backnowledgedQty) {
                                //需要弹出确认页面
                                //this.beConsentMsg = '出库数量小于分销商下单数量,未满足的部分将作废,是否确认审核通过';
                                errMsg += item.model + '、';
                            }
                        }
                    }
                    if (totalQty == 0) {
                        toast_1.default.fail('合计出库数要大于0');
                        return;
                    }
                    if (errMsg) {
                        errMsg = errMsg.substring(errMsg - 1);
                        that.beConsentMsg = '您当前选择的' + errMsg + '出库数量小于分销商下单数量,未满足的部分将作废,是否确认审核通过';
                    }
                }
                that.reviewConsent = true;
                that.$apply();
            },
            // 审核驳回弹框取消
            cancelConsent: function () {
                this.reviewConsent = false;
                this.$apply();
            },
            // 审核驳回弹框
            orderDismissed: function () {
                this.beDismissed = true;
                this.$apply();
            },
            tryNumber: function (e) {
                var backnowledgedPrice = e.backnowledgedPrice;
                var isNumber = /^[0-9]\d*\,\d*|[0-9]\d*$/;
                return isNumber.test(backnowledgedPrice);
            },
            //TODO 接口不通，导致无法赋值，暂时屏蔽
            onToggleWarehouse: function (evt) {
                var _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                this.itemIndex = itemIndex;
                this.outIndex = outIndex;
                var picker = this.$wxpage.selectComponent('#out-warehouse-detail-warehouse-picker');
                // const { warehouseName } = this.orderdetail.data.outBoundItem[itemIndex].outItems[outIndex]
                // picker.setColumnValue(0, warehouseName)
                this.toggleWarehouse();
            },
            onCloseWarehouse: function () {
                this.toggleWarehouse();
            },
            onWarehouseCancel: function () {
                this.toggleWarehouse();
            },
            onWarehouseConfirm: function (evt) {
                var _this = this;
                var _a = this, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                var _b = evt.detail.value, id = _b.id, value = _b.value;
                var newOrderDetail = ramda_1.clone(this.orderdetail);
                var _c = newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex], productCode = _c.productCode, warehouseId = _c.warehouseId, invStatusId = _c.invStatusId, invStatusType = _c.invStatusType;
                if (warehouseId !== id) {
                    //根据仓库获取剩余库存
                    var invBatchId = '';
                    if (warehouseId) {
                        dmsoutwarehouse_1.getInvQty({ productCode: productCode, warehouseId: id, invBatchId: invBatchId, invStatusId: invStatusId, invStatusType: invStatusType }).then(function (invQtyResult) {
                            if (invQtyResult.code === '0') {
                                newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = invQtyResult.bavailqty;
                            }
                            _this.$apply();
                        });
                    }
                    newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].warehouseId = id;
                    newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].warehouseName = value;
                    this.orderdetail = newOrderDetail;
                    this.$apply();
                }
                this.toggleWarehouse();
                this.$apply();
            },
            onToggleInvStatusType: function (evt) {
                var _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                this.itemIndex = itemIndex;
                this.outIndex = outIndex;
                var picker = this.$wxpage.selectComponent('#out-warehouse-detail-status-type-picker');
                var invStatusTypeName = this.orderdetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusTypeName;
                picker.setColumnValue(0, invStatusTypeName);
                this.toggleInvStatusType();
            },
            onToggleInvStatus: function (evt) {
                var _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                this.itemIndex = itemIndex;
                this.outIndex = outIndex;
                var picker = this.$wxpage.selectComponent('#out-warehouse-detail-status-picker');
                var invStatus = this.orderdetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatus;
                picker.setColumnValue(0, invStatus);
                this.toggleInvStatus();
            },
            onCloseInvStatus: function () {
                this.toggleInvStatus();
            },
            onInvStatusCancel: function () {
                this.toggleInvStatus();
            },
            onCloseInvStatusType: function () {
                this.toggleInvStatusType();
            },
            onInvStatusTypeCancel: function () {
                this.toggleInvStatusType();
            },
            // 库存状态选择
            onInvStatusConfirm: function (evt) {
                var _this = this;
                var _a = this, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                var _b = evt.detail.value, id = _b.id, value = _b.value;
                // this.outItem.invStatusId = id
                // this.outItem.invStatus = value
                var newOrderDetail = ramda_1.clone(this.orderdetail);
                if (newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusId !== id) {
                    newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusId = id;
                    newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatus = value;
                    var _c = newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex], productCode = _c.productCode, warehouseId = _c.warehouseId, invStatusId = _c.invStatusId, invBatchId = _c.invBatchId, invStatusType = _c.invStatusType;
                    dmsoutwarehouse_1.getInvQty({ productCode: productCode, warehouseId: warehouseId, invBatchId: invBatchId, invStatusId: invStatusId, invStatusType: invStatusType }).then(function (invQtyResult) {
                        if (invQtyResult.code === '0') {
                            newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = invQtyResult.bavailqty;
                        }
                        _this.orderdetail = newOrderDetail;
                        _this.$apply();
                    }).catch(function (e) {
                        newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = 0;
                        _this.orderdetail = newOrderDetail;
                        _this.$apply();
                    });
                }
                this.toggleInvStatus();
            },
            // 补差类型
            onInvStatusTypeConfirm: function (evt) {
                var _this = this;
                var _a = this, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                var _b = evt.detail.value, id = _b.id, name = _b.name;
                // this.outItem.invStatusType = id
                // this.outItem.invStatusTypeName = name
                var newOrderDetail = ramda_1.clone(this.orderdetail);
                if (newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusType !== id) {
                    newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusType = id;
                    newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].invStatusTypeName = name;
                    var _c = newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex], productCode = _c.productCode, warehouseId = _c.warehouseId, invStatusId = _c.invStatusId, invBatchId = _c.invBatchId, invStatusType = _c.invStatusType;
                    dmsoutwarehouse_1.getInvQty({ productCode: productCode, warehouseId: warehouseId, invBatchId: invBatchId, invStatusId: invStatusId, invStatusType: invStatusType }).then(function (invQtyResult) {
                        if (invQtyResult.code === '0') {
                            newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = invQtyResult.bavailqty;
                        }
                        _this.orderdetail = newOrderDetail;
                        _this.$apply();
                    }).catch(function (e) {
                        newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = 0;
                        _this.orderdetail = newOrderDetail;
                        _this.$apply();
                    });
                }
                this.toggleInvStatusType();
            },
            //确认同意
            beConsent: function () {
                var _this = this;
                this.reviewConsent = false;
                this.$apply();
                var _a = this.orderdetail.data, salesOrderItem = _a.salesOrderItem, id = _a.id;
                var account = wepy_1.default.$instance.globalData.account;
                var orderItem = [];
                if (salesOrderItem) {
                    ramda_1.forEach(function (item) {
                        //出库信息校验
                        if (item.outItems && item.outItems.length > 0) {
                            ramda_1.forEach(function (out) {
                                var data = {
                                    productCode: out.productCode,
                                    backnowledgedQty: out.bactualQty,
                                    gicOutWarehouse: out.warehouseId,
                                    invStatus: out.invStatusId,
                                    invStatusType: out.invStatusType ? out.invStatusType : '',
                                    materialCode: out.materialCode //物料编码
                                };
                                orderItem.push(data);
                            }, item.outItems);
                        }
                    }, salesOrderItem);
                }
                dmsrequest_1.dmsRequest({
                    data: {
                        _loading: true,
                        userAccount: account,
                        salesOrderId: id,
                        // changes: item
                        orderItem: orderItem
                    },
                    method: 'examPurchaseOrder'
                }).then(function (res) {
                    if (res && res.code == '0') {
                        toast_1.default.success('审核同意成功');
                        // 审核通过暂不需要回滚
                        // this.submitTransFlag();
                        wx.navigateBack({
                            delta: 1,
                        });
                        setTimeout(function () {
                            _this.getMyOrderDetail(_this.currentOrderId);
                        }, 2000);
                    }
                });
            },
            // 删除
            onRemoveOutItem: function (evt) {
                var _a = evt.currentTarget.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                var newOrderDetail = ramda_1.clone(this.orderdetail);
                var length = newOrderDetail.data.salesOrderItem[itemIndex].outItems.length;
                if (length > 0) {
                    newOrderDetail.data.salesOrderItem[itemIndex].outItems.splice(outIndex, 1);
                    this.orderdetail = newOrderDetail;
                }
            },
            // 取消驳回
            cancelDismissed: function () {
                this.beDismissed = false;
                this.$apply();
            },
            // 确认驳回
            beDismissed: function () {
                var _this = this;
                var _a = this.orderdetail.data, id = _a.id, salesOrderItem = _a.salesOrderItem;
                var account = wepy_1.default.$instance.globalData.account;
                this.beDismissed = false;
                this.$apply();
                var outQty = 0;
                if (salesOrderItem) {
                    ramda_1.forEach(function (item) {
                        if (item.outItems && item.outItems.length > 0) {
                            ramda_1.forEach(function (out) {
                                outQty += out.bactualQty * 1;
                            }, item.outItems);
                        }
                    }, salesOrderItem);
                }
                if (outQty != 0) {
                    toast_1.default.fail('出库数量不能大于0！');
                    return;
                }
                dmsrequest_1.dmsRequest({
                    data: {
                        _loading: true,
                        userAccount: account,
                        salesOrderId: id,
                    },
                    method: 'rejectPurchaseOrder'
                }).then(function (res) {
                    if (res && res.code == '0') {
                        toast_1.default.success('审核驳回成功');
                        _this.submitTransFlag('turnDown');
                    }
                });
            },
            tranfor: function (list) {
                return ramda_1.map(function (_a) {
                    var itemId = _a.itemId, acknowledgedAmount = _a.acknowledgedAmount, backnowledgedPrice = _a.backnowledgedPrice, backnowledgedQty = _a.backnowledgedQty, invStatus = _a.invStatus;
                    return {
                        itemId: itemId,
                        acknowledgedAmount: acknowledgedAmount,
                        backnowledgedPrice: backnowledgedPrice,
                        backnowledgedQty: backnowledgedQty,
                        invStatusId: invStatus.selected.invStatusId
                    };
                }, list || []);
            },
            goodInfo: function (e) {
                var detail = e.detail;
                var salesOrderItem = this.orderdetail.data.salesOrderItem;
                var itemId = detail.itemId, acknowledgedAmount = detail.acknowledgedAmount, backnowledgedPrice = detail.backnowledgedPrice, backnowledgedQty = detail.backnowledgedQty;
                var newItem = ramda_1.findIndex(ramda_1.propEq('itemId', itemId), salesOrderItem);
                if (newItem !== -1) {
                    salesOrderItem[newItem] = __assign({}, salesOrderItem[newItem], { itemId: itemId,
                        acknowledgedAmount: acknowledgedAmount,
                        backnowledgedPrice: backnowledgedPrice,
                        backnowledgedQty: backnowledgedQty, invStatus: {
                            options: salesOrderItem[newItem].invStatus.options,
                            selected: detail.selected
                        } });
                }
            },
            // 快速满足
            quickGratification: function (e) {
                var _this = this;
                var detail = e.detail;
                var itemIndex = detail.itemIndex;
                var gicWarehouseType = '';
                if (detail.type == 'own') {
                    gicWarehouseType = '70'; // 自有仓70
                }
                else {
                    gicWarehouseType = '20'; // 共享仓20
                }
                var currItem = this.orderdetail.data.salesOrderItem[itemIndex];
                var param = {
                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                    terms: {
                        isFuzzy: false,
                        zzprdmodel: currItem.zzprdmodel,
                        code: currItem.productCode,
                        orgCode: this.orgId,
                        model: currItem.zzprdmodel,
                        invType: '110',
                        gicInvStatus: '110',
                        gicWarehouseType: gicWarehouseType,
                        borderedQty: currItem.backnowledgedQty,
                        customerCode: this.orderdetail.data.customerCode
                    }
                };
                this.methods.orderInventoryFast(param).then(function (res) {
                    if (res.payload.code && res.payload.code == 0) {
                        if (res.payload.data) {
                            res.payload.data.materialCode = res.payload.data.material;
                            res.payload.data.bactualQty = currItem.backnowledgedQty; // 出库数量默认订单数量
                            _this.productAssignment(res.payload.data, itemIndex, '');
                        }
                        else {
                            toast_1.default.fail('暂无符合条件的库存');
                        }
                    }
                });
            },
            showMore: function () {
                _this.showMore = true;
            },
            hiddenMore: function () {
                _this.showMore = false;
            },
            jumpClick: function (evt) {
                var _a = evt.currentTarget.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                var productCode = this.orderdetail.data.salesOrderItem[itemIndex].model;
                var zzprdmodel = this.orderdetail.data.salesOrderItem[itemIndex].zzprdmodel;
                var id = itemIndex.id;
                wepy_redux_1.getStore().dispatch({
                    type: dmsorder_2.DMS_ORDER_CHOOSE_ITEM,
                    payload: id
                });
                wx.navigateTo({
                    url: '/pages/dms/order-item-choose/index?id=' + productCode + '&type=' + 'ReviewOrder' + '&ly=' + 'ReviewOrder' + '&itemIndex=' + itemIndex + '&outIndex=' + outIndex + '&orgId=' + this.orgId + '&zzprdmodel=' + zzprdmodel + '&isFuzzy=false' + '&isOpenSharedWarehouse=' + this.isOpenSharedWarehouse
                });
            },
            // 添加
            onAddOutItem: function (evt) {
                var itemIndex = evt.target.dataset.itemIndex;
                var outItems = this.orderdetail.data.salesOrderItem[itemIndex].outItems;
                if (outItems && outItems.length > 0) {
                    var newOrderDetail = ramda_1.clone(this.orderdetail);
                    var length_1 = newOrderDetail.data.salesOrderItem[itemIndex].outItems.length;
                    var outBoundItem = ramda_1.clone(newOrderDetail.data.salesOrderItem[itemIndex].outItems[length_1 - 1]);
                    this.orderdetail.data.salesOrderItem[itemIndex].outItems.push(outBoundItem);
                }
                else {
                    var outBoundItem = {
                        bactualQty: 0,
                        warehouseName: '',
                        invStatusName: '',
                        invStatusTypeName: '',
                        bavailQty: 0,
                        invBatchId: '',
                        productCode: this.orderdetail.data.salesOrderItem[itemIndex].productCode,
                    };
                    outItems = [];
                    outItems.push(outBoundItem);
                    this.orderdetail.data.salesOrderItem[itemIndex].outItems = outItems;
                }
                this.$apply();
            },
            //校验数据
            //result -1:失败  0需要提示 1成功
            validate: function (salesOrderItem) {
                if (salesOrderItem) {
                    ramda_1.forEach(function (item) {
                        if (item.outItems && item.outItems.length > 0) {
                            // 明细下单数量
                            var backnowledgedQty = item.backnowledgedQty * 1;
                            // 明细出库合计
                            var totalBactualQty_1 = 0;
                            ramda_1.forEach(function (out) {
                                //出库数量
                                var bactualQty = out.bactualQty * 1;
                                //可用数量
                                var bavailQty = out.bavailQty * 1;
                                //出库求和
                                totalBactualQty_1 += bactualQty;
                                if (bactualQty > bavailQty) {
                                    toast_1.default.fail('出库数量不能大于可用数量');
                                    return -1;
                                }
                            }, item.outItems);
                            if (totalBactualQty_1 > backnowledgedQty) {
                                toast_1.default.fail('明细中出库数量不可超过下单数量');
                                return -1;
                            }
                            if (totalBactualQty_1 < backnowledgedQty) {
                                //需要弹出确认页面
                                //todo
                                return 0;
                            }
                        }
                    }, salesOrderItem);
                }
                return 1;
            },
            onShippedBqtyChg: function (evt) {
                var detail = evt.detail, _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                // bug:  触发两次
                if (typeof detail === 'undefined') {
                    return;
                }
                var newOrderDetail = ramda_1.clone(this.orderdetail);
                newOrderDetail.data.salesOrderItem[itemIndex].outItems[outIndex].bactualQty = detail;
                this.orderdetail = newOrderDetail;
            },
            //获取可用库存
            getBavailqty: function () {
                try {
                    var _a = this.data, itemInfo = _a.itemInfo, warehouseId = _a.warehouseId, invState = _a.invState, inventory = _a.inventory;
                    if (itemInfo.productCode && warehouseId && invState && inventory) {
                        var bavailqtyPromise = dmsrequest_1.dmsRequest({
                            data: {
                                productCode: itemInfo.productCode,
                                warehouseId: warehouseId,
                                invStatusType: invState,
                                invStatusId: inventory,
                                invBatchId: '',
                            },
                            method: 'getInvQty'
                        });
                        var bavailqty = bavailqtyPromise.bavailqty;
                        this.bavailqty = bavailqty;
                    }
                }
                catch (error) {
                }
            }
        };
        return _this;
    }
    // 驳回、通过之后数据回滚
    orderdetail.prototype.submitTransFlag = function (type) {
        var _this = this;
        var _a = this.orderdetail.data, id = _a.id, salesOrderItem = _a.salesOrderItem;
        if (this.orderdetail.data.activityName) {
            var data = {};
            var qtys_1 = [];
            var productIds_1 = [];
            if (type == 'turnDown') {
                this.orderdetail.data.salesOrderItem.forEach(function (item) {
                    qtys_1.push(-item.backnowledgedQty);
                    productIds_1.push(item.productCode);
                });
            }
            else {
                this.orderdetail.data.salesOrderItem.forEach(function (item) {
                    // 出库数量
                    var shipmentsNum = 0;
                    item.outItems.forEach(function (oItem) {
                        shipmentsNum += oItem.bactualQty;
                    });
                    // 回滚数量 = 总数量-出库数量
                    var turnNum = item.backnowledgedQty - shipmentsNum;
                    if (turnNum > 0) {
                        // 回滚数量传负值
                        qtys_1.push(-turnNum);
                        productIds_1.push(item.productCode);
                    }
                });
            }
            data = {
                userActivityCode: this.orderdetail.data.userActivityCode,
                dmsOrderCode: this.orderdetail.data.purchaseNum,
                qtys: qtys_1.toString(),
                productIds: productIds_1.toString(),
            };
            request_1.request({
                api: "marketActivity/changeTransFlag.nd",
                method: "POST",
                data: data,
                callback: function (res1) {
                    wx.navigateBack({
                        delta: 1,
                    });
                    setTimeout(function () {
                        _this.getMyOrderDetail(_this.currentOrderId);
                    }, 2000);
                }
            });
        }
        else {
            wx.navigateBack({
                delta: 1,
            });
            setTimeout(function () {
                _this.getMyOrderDetail(_this.currentOrderId);
            }, 2000);
        }
    };
    orderdetail.prototype.getMyOrderDetail = function (id) {
        var _this = this;
        toast_1.default.loading({
            message: '正在加载',
            duration: 3000
        });
        this.methods.getSalesOrderDetail({ salesOrderId: id }).then(function (res) {
            _this.orderdetail = res.payload;
            if (res && res.payload && res.payload.data && res.payload.code == 0) {
                var _a = res.payload.data, orgId_1 = _a.orgId, orgCode_1 = _a.orgCode;
                request_1.request({
                    api: 'cart/canDirectBuy.nd',
                    method: 'POST',
                    data: { orgId: orgId_1 },
                    callback: function (res) {
                        toast_1.default.clear();
                        var _a = res.data, code = _a.code, canBuy = _a.canBuy;
                        if (code == 0) {
                            _this.canBuy = canBuy;
                        }
                        else {
                            _this.canBuy = 'N';
                        }
                        _this.$apply();
                    },
                });
                // 加载库存
                var salesOrderItem = res.payload.data.salesOrderItem;
                ramda_1.forEach(function (item) {
                    var data = { code: item.productCode, orgId: orgId_1, orgCode: orgCode_1 };
                    // 查询海信库存和共享库存
                    request_1.request({ api: 'product/getStocks.nd', method: 'POST', data: data }).then(function (res) {
                        if (ramda_1.is(Array, res) && ramda_1.length(res) > 0) {
                            item.inventory = res[0].inventory;
                            item.sharedInv = res[0].sharedInv;
                            _this.$apply();
                        }
                    });
                    //查询自有仓库存和共享仓库存
                    _this.methods.getDmsGoodsInventory({ supplierCode: '', productCodes: [item.productCode] }).then(function (res) {
                        var invlist = res.payload.data;
                        item.invQty = invlist[0].invQty;
                        item.gicInvQty = invlist[0].gicInvQty;
                        _this.$apply();
                    });
                }, salesOrderItem);
                if (salesOrderItem[0] && salesOrderItem[0].materialGroupCode) {
                    _this.getOutWarehouseListData(salesOrderItem[0].materialGroupCode);
                }
            }
            toast_1.default.clear();
        });
    };
    orderdetail.prototype.toggleWarehouse = function () {
        this.warehouseVisible = !this.warehouseVisible;
    };
    orderdetail.prototype.toggleInvStatus = function () {
        this.invStatusVisible = !this.invStatusVisible;
    };
    orderdetail.prototype.toggleInvStatusType = function () {
        this.invStatusTypeVisible = !this.invStatusTypeVisible;
    };
    // 添加或修改产品赋值
    orderdetail.prototype.productAssignment = function (chooseItem, itemIndex, outIndex) {
        var outItems = this.orderdetail.data.salesOrderItem[itemIndex].outItems;
        var outBoundItem = {
            bactualQty: chooseItem.bactualQty <= chooseItem.bigQty ? chooseItem.bactualQty : chooseItem.bigQty,
            warehouseId: chooseItem.gicWarehouse,
            warehouseName: chooseItem.gicWarehouseName,
            invStatusType: chooseItem.invStatusType,
            invStatusTypeName: chooseItem.invStatusTypeName,
            materialCode: chooseItem.materialCode,
            invStatus: chooseItem.invStatusName,
            invStatusId: chooseItem.invStatusId,
            bavailQty: chooseItem.bigQty,
            inInvDate: chooseItem.inInvDate,
            invBatchId: '',
            productCode: chooseItem.productCode,
            orgCode: chooseItem.orgCode,
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
        this.orderdetail.data.salesOrderItem[itemIndex].outItems = outItems;
        this.$apply();
    };
    // 获取仓库列表
    orderdetail.prototype.getOutWarehouseListData = function (materialGroupCode) {
        return __awaiter(this, void 0, void 0, function () {
            var systemParametersObj, systemParameters, isOpenSharedWarehouseObj, isOpenSharedWarehouse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 1、先请求总开关量
                        // 2、如果总开关返回Y，查询光伟的接口（入参：组织、物料组，返回值：Y、N）校验物料组是否开启共享
                        // 如果开启共享，不允许从原仓发货，，， 仓库只显示统仓数据
                        // 如果未开启共享 仓库显示全部
                        this.isOpenSharedWarehouse = '';
                        return [4 /*yield*/, this.methods.getSystemParameters({ key: 'QD_ONLY_SHARE_STORE' })];
                    case 1:
                        systemParametersObj = _a.sent();
                        systemParameters = '';
                        if (systemParametersObj && systemParametersObj.payload && systemParametersObj.payload.data) {
                            systemParameters = systemParametersObj.payload.data;
                        }
                        if (!(systemParameters == 'Y')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.methods.getIsOpenSharedWarehouse({ orgId: this.orgId, matklId: materialGroupCode })];
                    case 2:
                        isOpenSharedWarehouseObj = _a.sent();
                        isOpenSharedWarehouse = '';
                        if (isOpenSharedWarehouseObj && isOpenSharedWarehouseObj.payload && isOpenSharedWarehouseObj.payload.data) {
                            isOpenSharedWarehouse = isOpenSharedWarehouseObj.payload.data;
                            if (isOpenSharedWarehouse == 'Y') {
                                this.methods.getOutWarehouseList(this.orgId, '20');
                                this.isOpenSharedWarehouse = '20';
                            }
                            else {
                                this.methods.getOutWarehouseList(this.orgId);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        this.methods.getOutWarehouseList(this.orgId);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderdetail.prototype.onLoad = function (e) {
        var id = e.id, orgId = e.orgId;
        this.orgId = orgId;
        this.currentOrderId = id;
        this.methods.getInvStatusList();
        this.methods.getInvStatusType();
        // this.methods.getBucha(orgId)
        var that = this;
        setTimeout(function () {
            that.getMyOrderDetail(id);
        }, 2000);
        this.$apply();
    };
    orderdetail.prototype.onUnload = function () {
        this.canBuy = '';
    };
    orderdetail.prototype.onShow = function () {
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        if (currPage.data.chooseItem) {
            var itemIndex = currPage.data.itemIndexR;
            var outIndex = currPage.data.outIndexR;
            if (this.orderdetail.data.salesOrderItem[itemIndex].productCode !== currPage.data.chooseItem.productCode) {
                setTimeout(function () {
                    toast_1.default.fail('不是同一产品，请重新选择');
                }, 500);
            }
            else {
                currPage.data.chooseItem.bactualQty = 0; // 出库数量默认0
                this.productAssignment(currPage.data.chooseItem, itemIndex, outIndex);
                currPage.data.chooseItem = null;
                this.$apply();
            }
        }
    };
    orderdetail = __decorate([
        wepy_redux_1.connect({
            /*orderdetail({ salesorderdetail }) {
              return salesorderdetail.orderdetail
            },*/
            loadingInfo: function (_a) {
                var salesorderdetail = _a.salesorderdetail;
                return salesorderdetail.loadingInfo;
            },
            warehouseList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.warehouseList;
            },
            invStatusList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.invStatusList;
            },
            invStatusTypeList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.invStatusType;
            },
            additionOrderDetailItem: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseItemInfo;
            }
        }, {
            getSalesOrderDetail: salesorderdetail_1.getSalesOrderDetail,
            getSalesCisStock: salesorderdetail_1.getSalesCisStock,
            getInvStatusType: dmsorder_1.getInvStatusType,
            getOutWarehouseList: dmsoutwarehouse_1.getOutWarehouseList,
            getInvStatusList: dmsoutwarehouse_1.getInvStatusList,
            getDmsGoodsInventory: classification_1.getDmsGoodsInventory,
            getIsOpenSharedWarehouse: dmsorder_1.getIsOpenSharedWarehouse,
            getSystemParameters: dmsorder_1.getSystemParameters,
            orderInventoryFast: salesorderdetail_1.orderInventoryFast,
        })
    ], orderdetail);
    return orderdetail;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(orderdetail , 'pages/dms/sales-distributors-detail/index'));

