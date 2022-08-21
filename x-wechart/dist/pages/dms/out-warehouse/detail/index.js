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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var common_1 = require('./../../../../mixins/common.js');
var dmsorder_1 = require('./../../../../store/actions/dmsorder.js');
var dmsoutwarehouse_1 = require('./../../../../store/actions/dmsoutwarehouse.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
/* import utilsWxs from '../../../../wxs/utils.wxs'; */
var dmsrequest_1 = require('./../../../../store/actions/dmsrequest.js');
//invStatusType
var stores = wepy_redux_1.getStore();
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '订单详情',
            usingComponents: {
                'van-icon': '/components/vant/icon/index',
                'van-popup': '/components/vant/popup/index',
                'van-field': '/components/vant/field/index',
                'van-toast': '/components/vant/toast/index',
                'van-picker': '/components/vant/picker/index',
                'van-stepper': '/components/vant/stepper/index',
                'van-dialog': '/components/vant/dialog/index',
                'van-checkbox': '/components/vant/checkbox/index',
                'van-button': '/components/vant/button/index',
            },
        };
        _this.mixins = [common_1.default];
        _this.data = {
            warehouseVisible: false,
            invBatchVisible: false,
            invStatusVisible: false,
            invStatusTypeVisible: false,
            itemIndex: 0,
            outIndex: 0,
            currentInvBatchList: [],
            orderDetail: {},
            barCode: '',
            isSubmitBarCode: false,
            invStatusTypeList: [],
            btnLoading: false,
            showBUcha: null,
            dataSource: '',
            isCanOutbound: true
        };
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
            onDmsGoodsItems: function (itemIndex, evt) {
                var isNumber = /^(([1-9]{1}\d*)(\.\d{0,2})?|(0{1}\.\d{0,2}))$/;
                var newOrderDetail = ramda_1.clone(_this.orderDetail);
                if (evt.detail !== '') {
                    if (isNumber.test(evt.detail)) {
                        newOrderDetail.salesOrderItem[itemIndex].bprice = parseFloat(evt.detail);
                        newOrderDetail.salesOrderItem[itemIndex].acknowledgedAmount = newOrderDetail.salesOrderItem[itemIndex].backnowledgedQty * (100 * parseFloat(evt.detail)) / 100;
                    }
                    else {
                        toast_1.default.fail({
                            message: '请输入正确的数字',
                            duration: 2000,
                        });
                    }
                }
                else {
                    newOrderDetail.salesOrderItem[itemIndex].bprice = 0;
                    newOrderDetail.salesOrderItem[itemIndex].acknowledgedAmount = 0;
                }
                _this.orderDetail = newOrderDetail;
            },
            onShippedBqtyChg: function (evt) {
                var detail = evt.detail, _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                // bug:  触发两次
                if (typeof detail === 'undefined') {
                    return;
                }
                var newOrderDetail = ramda_1.clone(this.orderDetail);
                newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].shippedBqty = detail;
                this.orderDetail = newOrderDetail;
            },
            onToggleWarehouse: function (evt) {
                //分销商发起的渠道采购订单，销售出库时，仓库和库存状态不可修改
                if (this.orderDetail.documentType === 'normal' && this.orderDetail.purchaseNum !== '') {
                    return;
                }
                var _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                this.itemIndex = itemIndex;
                this.outIndex = outIndex;
                var picker = this.$wxpage.selectComponent('#out-warehouse-detail-warehouse-picker');
                var warehouseName = this.orderDetail.salesOrderItem[itemIndex].outItems[outIndex].warehouseName;
                picker.setColumnValue(0, warehouseName);
                this.toggleWarehouse();
            },
            onCloseWarehouse: function () {
                this.toggleWarehouse();
            },
            onWarehouseCancel: function () {
                this.toggleWarehouse();
            },
            onWarehouseConfirm: function (evt) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, itemIndex, outIndex, _b, id, value, newOrderDetail, _c, productCode, warehouseId, invStatusId, invStatusType, _d, invBatchId, invBatchName, invBatchList, bavailQty;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _a = this, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                                _b = evt.detail.value, id = _b.id, value = _b.value;
                                newOrderDetail = ramda_1.clone(this.orderDetail);
                                _c = newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex], productCode = _c.productCode, warehouseId = _c.warehouseId, invStatusId = _c.invStatusId, invStatusType = _c.invStatusType;
                                if (!(warehouseId !== id)) return [3 /*break*/, 2];
                                newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].warehouseId = id;
                                newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].warehouseName = value;
                                return [4 /*yield*/, this.getInvBatchWithHandle({ productCode: productCode, warehouseId: id, invStatusId: invStatusId, invStatusType: invStatusType })];
                            case 1:
                                _d = _e.sent(), invBatchId = _d.invBatchId, invBatchName = _d.invBatchName, invBatchList = _d.invBatchList, bavailQty = _d.bavailQty;
                                newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchId = invBatchId;
                                newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchName = invBatchName;
                                newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchList = invBatchList;
                                newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = bavailQty;
                                this.orderDetail = newOrderDetail;
                                _e.label = 2;
                            case 2:
                                this.toggleWarehouse();
                                this.$apply();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            onToggleInvBatch: function (evt) {
                var _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                this.itemIndex = itemIndex;
                this.outIndex = outIndex;
                var newOrderDetail = ramda_1.clone(this.orderDetail);
                this.currentInvBatchList = newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchList;
                if (this.currentInvBatchList.length > 0) {
                    var picker = this.$wxpage.selectComponent('#out-warehouse-detail-batch-picker');
                    var invBatchName = this.orderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchName;
                    picker.setColumnValue(0, invBatchName);
                    this.toggleInvBatch();
                }
            },
            onCloseInvBatch: function () {
                this.toggleInvBatch();
            },
            onInvBatchCancel: function () {
                this.toggleInvBatch();
            },
            // 批次确认
            onInvBatchConfirm: function (evt) {
                var _this = this;
                var _a = this, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                var that = this;
                var _b = evt.detail.value, id = _b.id, value = _b.value;
                var newOrderDetail = ramda_1.clone(this.orderDetail);
                if (newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchId !== id) {
                    newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchId = id;
                    newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invBatchName = value;
                    var _c = newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex], productCode = _c.productCode, warehouseId = _c.warehouseId, invStatusId = _c.invStatusId, invBatchId = _c.invBatchId, invStatusType = _c.invStatusType;
                    dmsoutwarehouse_1.getInvQty({ productCode: productCode, warehouseId: warehouseId, invBatchId: invBatchId, invStatusId: invStatusId, invStatusType: invStatusType }).then(function (invQtyResult) {
                        if (invQtyResult.code === '0') {
                            var qty = 0;
                            if (invQtyResult.isShare === '0') {
                                qty = invQtyResult.bavailqty;
                            }
                            else if (that.dataSource === 'job') {
                                qty = invQtyResult.bavailqty;
                            }
                            else {
                                qty = invQtyResult.bigQtyLock;
                            }
                            newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = qty;
                        }
                        _this.orderDetail = newOrderDetail;
                        _this.$apply();
                    });
                }
                this.toggleInvBatch();
            },
            onToggleInvStatusType: function (evt) {
                var _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                this.itemIndex = itemIndex;
                this.outIndex = outIndex;
                var picker = this.$wxpage.selectComponent('#out-warehouse-detail-status-type-picker');
                var invStatusTypeName = this.orderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusTypeName;
                picker.setColumnValue(0, invStatusTypeName);
                this.toggleInvStatusType();
            },
            onToggleInvStatus: function (evt) {
                //分销商发起的渠道采购订单，销售出库时，仓库和库存状态不可修改
                if (this.orderDetail.documentType === 'normal' && this.orderDetail.purchaseNum !== '') {
                    return;
                }
                var _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                this.itemIndex = itemIndex;
                this.outIndex = outIndex;
                var picker = this.$wxpage.selectComponent('#out-warehouse-detail-status-picker');
                var invStatus = this.orderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatus;
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
                var that = this;
                var _b = evt.detail.value, id = _b.id, value = _b.value;
                var newOrderDetail = ramda_1.clone(this.orderDetail);
                if (newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusId !== id) {
                    newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusId = id;
                    newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatus = value;
                    var _c = newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex], productCode = _c.productCode, warehouseId = _c.warehouseId, invStatusId = _c.invStatusId, invBatchId = _c.invBatchId, invStatusType = _c.invStatusType;
                    dmsoutwarehouse_1.getInvQty({ productCode: productCode, warehouseId: warehouseId, invBatchId: invBatchId, invStatusId: invStatusId, invStatusType: invStatusType }).then(function (invQtyResult) {
                        if (invQtyResult.code === '0') {
                            var qty = 0;
                            if (invQtyResult.isShare === '0') {
                                qty = invQtyResult.bavailqty;
                            }
                            else if (that.dataSource === 'job') {
                                qty = invQtyResult.bavailqty;
                            }
                            else {
                                qty = invQtyResult.bigQtyLock;
                            }
                            newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = qty;
                        }
                        _this.orderDetail = newOrderDetail;
                        _this.$apply();
                    }).catch(function (e) {
                        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = 0;
                        _this.orderDetail = newOrderDetail;
                        _this.$apply();
                    });
                }
                this.toggleInvStatus();
            },
            // 补差类型
            onInvStatusTypeConfirm: function (evt) {
                var _this = this;
                var _a = this, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                var that = this;
                var _b = evt.detail.value, id = _b.id, name = _b.name;
                var newOrderDetail = ramda_1.clone(this.orderDetail);
                if (newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusType !== id) {
                    newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusType = id;
                    newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].invStatusTypeName = name;
                    var _c = newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex], productCode = _c.productCode, warehouseId = _c.warehouseId, invStatusId = _c.invStatusId, invBatchId = _c.invBatchId, invStatusType = _c.invStatusType;
                    dmsoutwarehouse_1.getInvQty({ productCode: productCode, warehouseId: warehouseId, invBatchId: invBatchId, invStatusId: invStatusId, invStatusType: invStatusType }).then(function (invQtyResult) {
                        if (invQtyResult.code === '0') {
                            var qty = 0;
                            if (invQtyResult.isShare === '0') {
                                qty = invQtyResult.bavailqty;
                            }
                            else if (that.dataSource === 'job') {
                                qty = invQtyResult.bavailqty;
                            }
                            else {
                                qty = invQtyResult.bigQtyLock;
                            }
                            newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = qty;
                        }
                        _this.orderDetail = newOrderDetail;
                        _this.$apply();
                    }).catch(function (e) {
                        newOrderDetail.salesOrderItem[itemIndex].outItems[outIndex].bavailQty = 0;
                        _this.orderDetail = newOrderDetail;
                        _this.$apply();
                    });
                }
                this.toggleInvStatusType();
            },
            // 添加
            onAddOutItem: function (evt) {
                var itemIndex = evt.target.dataset.itemIndex;
                var newOrderDetail = ramda_1.clone(this.orderDetail);
                var length = newOrderDetail.salesOrderItem[itemIndex].outItems.length;
                newOrderDetail.salesOrderItem[itemIndex].outItems.push(ramda_1.clone(newOrderDetail.salesOrderItem[itemIndex].outItems[length - 1]));
                this.handleBarCode(newOrderDetail, newOrderDetail.salesOrderItem[itemIndex].model, null, 'addOutItem');
                this.orderDetail = newOrderDetail;
            },
            // 删除
            onRemoveOutItem: function (evt) {
                var _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                var newOrderDetail = ramda_1.clone(this.orderDetail);
                var length = newOrderDetail.salesOrderItem[itemIndex].outItems.length;
                if (length > 1) {
                    newOrderDetail.salesOrderItem[itemIndex].outItems.splice(outIndex, 1);
                    this.handleBarCode(newOrderDetail, newOrderDetail.salesOrderItem[itemIndex].model, null, 'delOutItem');
                    this.orderDetail = newOrderDetail;
                }
            },
            // 已出库不允许出库
            onSubmitCancel: function () {
                toast_1.default.fail({
                    message: '该销售单已出库，请返回！',
                    duration: 2000,
                });
            },
            //判断是否是扫码订单
            onSubmitConfirmOutFrom: function () {
                var that = this;
                var salesOrderItem = this.orderDetail.salesOrderItem;
                var products = [];
                salesOrderItem.forEach(function (item) {
                    if (item.productLabel && item.productLabel.indexOf('15691143850') >= 0) {
                        products.push(item);
                    }
                });
                if (products.length > 0) {
                    wx.showModal({
                        title: '提示',
                        content: '1、当天截单时间内，同批量订单达到起运量（电视3台，白电或全品类2方），则免配送费！\r\n2、当天截单时间内，同批量订单若包含至少1件单价超万元产品或激光，则免配送费！\r\n3、若不满足以上条件，将按照统仓统配合同不足起运量收费标准向您收取物流费用！\r\n⭐以上政策仅限开通统仓统配区域商家！！！',
                        success: function (res) {
                            if (res.confirm) {
                                //防止重复点击
                                if (that.btnLoading) {
                                    return;
                                }
                                //防止多次触发
                                that.btnLoading = true;
                                //isScan=true 扫码订单
                                // const { isScan } = clone(this.orderDetail)
                                // let scanModel  = this.orderDetail.salesOrderItem
                                //   .map(orderItem => orderItem.outItems)
                                //   .flat(1)
                                //   .filter(outItem => outItem.maxShippedBqty > 0 && (!outItem.barCodes || outItem.barCodes.length === 0))
                                //   .map(outItem => outItem.model)
                                //
                                // scanModel = Array.from(new Set(scanModel))
                                // if(isScan && scanModel.length > 0){
                                //   //本订单需要扫码出库，您是否需要进行强制出库？
                                //   Dialog.confirm({
                                //     title: '出库提醒',
                                //     message: `型号: ${scanModel} 需要扫码出库，您是否需要进行强制出库？`,
                                //     confirmButtonText: '强制出库'
                                //   }).then(() => {
                                //
                                //     this.onSubmitOutForm();
                                //   }).catch(()=>{
                                //     //cancle
                                //   })
                                // }else{
                                //   this.onSubmitOutForm();
                                // }
                                that.onSubmitOutForm();
                            }
                        },
                    });
                }
                else {
                    //防止重复点击
                    if (that.btnLoading) {
                        return;
                    }
                    //防止多次触发
                    that.btnLoading = true;
                    that.onSubmitOutForm();
                }
            },
            // 扫码操作
            onScanCode: function () {
                var context = this;
                wx.scanCode({
                    // onlyFromCamera: true,
                    scanType: ['barCode'],
                    success: function (res) {
                        context.barCode = res.result;
                        context.isSubmitBarCode = true;
                        context.$apply();
                    },
                    fail: function (res) {
                        // console.log('失败')
                    },
                    complete: function (res) {
                        // context.isSubmitBarCode = true
                        // context.$apply()
                    }
                });
            },
            // 切换条形码选择
            onChangeBarCode: function (model, barCode, outIndex) {
                var newOrderDetail = ramda_1.clone(this.orderDetail);
                this.handleBarCode(newOrderDetail, model, barCode, 'update', outIndex);
                this.orderDetail = newOrderDetail;
            },
            // 删除条形码
            onDelBarCode: function (model, barCode, outIndex) {
                var newOrderDetail = ramda_1.clone(this.orderDetail);
                this.handleBarCode(newOrderDetail, model, barCode, 'delBarCode', outIndex);
                this.orderDetail = newOrderDetail;
            },
            // 确认二维码
            submitBarCode: function () {
                var _this = this;
                if (this.barCode && this.barCode.length != 23) {
                    toast_1.default.fail({
                        message: '请输入23位条形码',
                        duration: 2000,
                    });
                    return;
                }
                var newOrderDetail = ramda_1.clone(this.orderDetail);
                dmsoutwarehouse_1.getModelByBarCode({ barCode: this.barCode }).then(function (res) {
                    if (res.model === '') {
                        toast_1.default.fail({
                            message: '匹配条码库失败, 请重新扫描！',
                            duration: 2000,
                        });
                        return;
                    }
                    // 判断条形码是否匹配该订单
                    var models = newOrderDetail.salesOrderItem.map(function (orderItem) { return orderItem.model; });
                    if (!models.includes(res.model)) {
                        toast_1.default.fail({
                            message: '该条码未找到对应商品型号，请确认！',
                            duration: 2000,
                        });
                        return;
                    }
                    _this.handleBarCode(newOrderDetail, res.model, _this.barCode, 'add');
                    _this.orderDetail = newOrderDetail;
                    _this.isSubmitBarCode = false;
                    _this.$apply();
                }).catch(function () {
                });
            },
            closeScan: function () {
                this.isSubmitBarCode = false;
            },
            onBarCodeChange: function (target) {
                var detail = target.detail;
                this.barCode = detail;
            }
        };
        // 条形码操作
        _this.handleBarCode = function (newOrderDetail, model, barCode, operate, outIndex) {
            // 判断是否是扫码出库
            if (!newOrderDetail.isScan) {
                return;
            }
            newOrderDetail.salesOrderItem.forEach(function (item) {
                if (item.model === model) {
                    switch (operate) {
                        case 'add': {
                            item.outItems.forEach(function (outItem, index) {
                                var checked = index === 0;
                                var isChecked = index === 0;
                                var bar = { barCode: barCode, checked: checked, isChecked: isChecked };
                                if (!outItem.barCodes) {
                                    outItem.barCodes = new Array(bar);
                                }
                                else if (outItem.barCodes.findIndex(function (element) { return element.barCode === barCode; }) < 0) {
                                    outItem.barCodes.splice(0, 0, bar);
                                }
                            });
                            break;
                        }
                        case 'addOutItem': {
                            // 找到最后的元素把内容修改掉
                            var barCodes_1 = item.outItems
                                .filter(function (outItem, index) { return index !== item.outItems.length - 1; })
                                .map(function (outItem) { return outItem.barCodes; })
                                .flat(1)
                                .map(function (bar) {
                                if (bar && bar.checked) {
                                    return bar.barCode;
                                }
                            });
                            if (item.outItems[item.outItems.length - 1].barCodes) {
                                item.outItems[item.outItems.length - 1].barCodes.forEach(function (bar) {
                                    bar.checked = false;
                                    bar.isChecked = !barCodes_1.includes(bar.barCode);
                                });
                            }
                            break;
                        }
                        case 'delBarCode': {
                            item.outItems.forEach(function (outItem) {
                                outItem.barCodes = outItem.barCodes.filter(function (item) { return item.barCode != barCode; });
                            });
                            break;
                        }
                        case 'delOutItem': {
                            // 删选出来选中的barcode 更改其它剩余的状态
                            var barCodes_2 = item.outItems.map(function (outItem) { return outItem.barCodes; }).flat(1).map(function (bar) {
                                if (bar && bar.checked) {
                                    return bar.barCode;
                                }
                            });
                            // 删除对应的outItems
                            item.outItems.forEach(function (outItem) {
                                if (outItem.barCodes) {
                                    outItem.barCodes.forEach(function (bar) {
                                        if (!barCodes_2.includes(bar.barCode)) {
                                            bar.isChecked = true;
                                        }
                                    });
                                }
                            });
                            break;
                        }
                        case 'update': {
                            // 查找原状态
                            var _a = item.outItems[outIndex].barCodes.find(function (item) { return item.barCode === barCode; }), checked_1 = _a.checked, isChecked = _a.isChecked;
                            if (!isChecked) {
                                break;
                            }
                            item.outItems.forEach(function (outItem, index) {
                                if (index === outIndex) {
                                    outItem.barCodes.forEach(function (bar) {
                                        if (bar.barCode === barCode) {
                                            bar.checked = !checked_1;
                                        }
                                    });
                                }
                                else {
                                    outItem.barCodes.forEach(function (bar) {
                                        if (bar.barCode === barCode) {
                                            bar.isChecked = checked_1;
                                        }
                                    });
                                }
                            });
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    // 计算选中的条形码数量
                    item.outItems.forEach(function (outItem) {
                        if (outItem.barCodes) {
                            outItem.shippedBqty = outItem.barCodes.filter(function (bar) { return bar.checked; }).length;
                            if (outItem.shippedBqty === 0 && outItem.barCodes.length === 0) {
                                outItem.shippedBqty = item.backnowledgedQty - item.shippedBqty;
                            }
                        }
                    });
                }
            });
            return newOrderDetail;
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 确认出库
    List.prototype.onSubmitOutForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, salesOrderItem, dataSource, status, message, isFinished, isNumber, outSalesOrdeItem, item;
            var _this = this;
            return __generator(this, function (_b) {
                _a = ramda_1.clone(this.orderDetail), id = _a.id, salesOrderItem = _a.salesOrderItem, dataSource = _a.dataSource;
                status = false;
                message = '出库数总量已超出销售数量，请重新选择';
                isFinished = true;
                isNumber = /^(([1-9]{1}\d*)(\.\d{0,2})?|(0{1}\.\d{0,2}))$/;
                // 增加审核时出库数量的校验 add by yangchangwei 2020-9-11
                //TODO checkShippedBqty 预定义 需要审核时存储出库数量并传递过来
                salesOrderItem.forEach(function (item) {
                    var backnowledgedQty = item.backnowledgedQty, shippedBqty = item.shippedBqty, outItems = item.outItems, bprice = item.bprice, checkShippedBqty = item.checkShippedBqty;
                    if (!isNumber.test(bprice)) {
                        status = true;
                        message = '单价不正确，请重新填写';
                    }
                    var barCodes = outItems
                        .filter(function (outItem) { return outItem.barCodes && outItem.barCodes.length > 0; })
                        .map(function (outItem) { return outItem.barCodes; }).flat(1);
                    if (barCodes.length > 0) {
                        // 条形码选中数量
                        var selectNum = barCodes.filter(function (bar) { return bar.checked; })
                            .map(function (bar) { return bar.barCode; }).reduce(function (sum, barCode) { return sum + 1; }, 0);
                        // 条形码总数
                        var barNum = Array.from(new Set(barCodes.map(function (bar) { return bar.barCode; }))).length;
                        if (selectNum != barNum) {
                            status = true;
                            message = '存在未选中的条形码，请确认';
                        }
                    }
                    var sum = outItems.reduce(function (sum, outItem) {
                        if (!/^[0-9]\d*$/.test(outItem.shippedBqty) && dataSource !== 'job') {
                            status = true;
                            message = '出库数量不能小于0，请重新填写';
                        }
                        if ((outItem.shippedBqty > outItem.bavailQty) && dataSource !== 'job') {
                            status = true;
                            message = '可用库存不能小于出库数量';
                        }
                        if (outItem.bavailQty == 0) {
                            status = true;
                            message = '可用库存为0，不允许出库';
                        }
                        var outShippedBqty = outItem.shippedBqty ? Number(outItem.shippedBqty) : 0;
                        return sum += outShippedBqty;
                    }, 0);
                    // 出库数量<=订单审核时填写的仓库的出库数量-已出库数量
                    if (!status && (sum > checkShippedBqty - shippedBqty) && dataSource !== 'job') {
                        message = '出库数量不能大于已审核的剩余出库数量';
                        status = true;
                    }
                    if (!status && sum > (backnowledgedQty - shippedBqty) && dataSource !== 'job') {
                        status = true;
                    }
                    if (!status && sum < backnowledgedQty - shippedBqty) {
                        isFinished = false;
                    }
                });
                if (status) {
                    toast_1.default.fail(message);
                    //出库按钮控制
                    this.btnLoading = false;
                    return [2 /*return*/];
                }
                outSalesOrdeItem = [];
                salesOrderItem.forEach(function (item) {
                    item.outItems.forEach(function (outItem) {
                        outItem.invStatusTypeName = outItem.invStatusTypeName === '请选择' ? '' : outItem.invStatusTypeName;
                        if (outItem.shippedBqty) {
                            delete (outItem.invBatchList);
                            // delete(outItem.invStatus)
                            delete (outItem.invBatchName);
                            delete (outItem.warehouseName);
                            outItem.bprice = item.bprice;
                            outItem.acknowledgedAmount = item.bprice * outItem.shippedBqty;
                            // 更改接口 添加两个字段  itemId isChange
                            if (item.bprice !== item.oprice) {
                                outItem.isChange = true;
                            }
                            else {
                                outItem.isChange = false;
                            }
                            outItem.itemId = item.itemId;
                            // 将invStatusId赋值给invStatus
                            outItem.invStatus = outItem.invStatusId;
                            // 条形码存在 放在iceBoxNum字段并删除barCodes
                            if (outItem.barCodes) {
                                outItem.iceBoxNum = outItem.barCodes.filter(function (bar) { return bar.checked; }).map(function (bar) { return bar.barCode; }).join(',');
                                delete (outItem.barCodes);
                            }
                            outSalesOrdeItem.push(outItem);
                        }
                    });
                });
                item = {
                    userAccount: wepy_1.default.$instance.globalData.account,
                    data: {
                        isFinished: isFinished,
                        salesOrderId: id,
                        salesOrderItem: outSalesOrdeItem,
                    },
                    _loading: true,
                    _ignoreToast: true
                };
                this.methods.salesOrderOut(item).then(function (res) {
                    if (res && res.payload && res.payload && res.payload.code === "0") {
                        _this.isCanOutbound = false;
                        toast_1.default.success({
                            message: '出库成功',
                            duration: 2000,
                            onClose: function () {
                                _this.onLoad({ "id": id });
                            },
                        });
                    }
                    else if (res && res.payload && res.payload.data && res.payload.data.code === "1") {
                        toast_1.default.fail({
                            message: res.payload.data.msg,
                            duration: 3000,
                        });
                        _this.btnLoading = false;
                    }
                }).catch(function () {
                    _this.btnLoading = false;
                });
                return [2 /*return*/];
            });
        });
    };
    List.prototype.toggleWarehouse = function () {
        this.warehouseVisible = !this.warehouseVisible;
    };
    List.prototype.toggleInvBatch = function () {
        this.invBatchVisible = !this.invBatchVisible;
    };
    List.prototype.toggleInvStatus = function () {
        this.invStatusVisible = !this.invStatusVisible;
    };
    List.prototype.toggleInvStatusType = function () {
        this.invStatusTypeVisible = !this.invStatusTypeVisible;
    };
    // 获取批次  并且不再批次获取的时候请求可用库存
    List.prototype.getInvBatchWithHandle = function (_a) {
        var productCode = _a.productCode, warehouseId = _a.warehouseId, invStatusId = _a.invStatusId, invStatusType = _a.invStatusType;
        return __awaiter(this, void 0, void 0, function () {
            var that, invBatchResult, invBatchList, invBatchId, invBatchName, bavailQty, item, invQtyResult, qty, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        that = this;
                        return [4 /*yield*/, dmsoutwarehouse_1.getInvBatch({ productCode: productCode, warehouseId: warehouseId })];
                    case 1:
                        invBatchResult = _b.sent();
                        invBatchList = [];
                        invBatchId = '';
                        if (!(invBatchResult.code === '0')) return [3 /*break*/, 5];
                        invBatchList = Object.keys(invBatchResult.invBatch).map(function (key) {
                            return { id: key, value: invBatchResult.invBatch[key] };
                        });
                        if (invBatchList && invBatchList.length > 0) {
                            item = {
                                id: '',
                                value: '请选择批次'
                            };
                            invBatchList.unshift(item);
                        }
                        if (!invStatusId) return [3 /*break*/, 5];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, dmsoutwarehouse_1.getInvQty({ productCode: productCode, warehouseId: warehouseId, invStatusId: invStatusId, invBatchId: '', invStatusType: invStatusType })];
                    case 3:
                        invQtyResult = _b.sent();
                        if (invQtyResult.code === '0') {
                            qty = 0;
                            if (invQtyResult.isShare === '0') {
                                qty = invQtyResult.bavailqty;
                            }
                            else if (that.dataSource === 'job') {
                                qty = invQtyResult.bavailqty;
                            }
                            else {
                                qty = invQtyResult.bigQtyLock;
                            }
                            //bavailQty=invQtyResult.bavailqty
                            bavailQty = qty;
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        bavailQty = 0;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, { invBatchId: invBatchId, invBatchName: invBatchName, invBatchList: invBatchList, bavailQty: bavailQty }];
                }
            });
        });
    };
    // 获取订单详细信息
    List.prototype.onLoad = function (_a) {
        var id = _a.id, _b = _a.orgId, orgId = _b === void 0 ? '' : _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, code, data, newDetail_1, _loop_1, this_1, i;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        toast_1.default.loading({
                            message: '正在加载',
                            duration: 2000
                        });
                        this.methods.getOutWarehouseList(orgId);
                        this.methods.getInvStatusList();
                        this.methods.getInvStatusType();
                        return [4 /*yield*/, dmsoutwarehouse_1.getOutWarehouseOrderDetail(id)];
                    case 1:
                        _c = _d.sent(), code = _c.code, data = _c.data;
                        if (!(code === '0')) return [3 /*break*/, 6];
                        newDetail_1 = ramda_1.clone(data);
                        this.dataSource = newDetail_1.dataSource; // documentType='retail' And dataSource='job' 是销量转换单信小蜜转换过来的；dataSource!='job'是普通单
                        _loop_1 = function (i) {
                            var warehouseFilter, warehouseSelected, id_1, value, _a, productCode, backnowledgedQty, shippedBqty, invStatusId, invStatusType, materialGroupCode, _b, invBatchId, invBatchName, invBatchList, bavailQty, invStatusObj, invStatusvalue, invStatusId, invStatusTypeObj, invStatusTypevalue, outItems;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        warehouseFilter = this_1.warehouseList.filter(function (item) { return item.value === newDetail_1.salesOrderItem[i].warehouseName; });
                                        warehouseSelected = warehouseFilter.length > 0 ? warehouseFilter[0] : this_1.warehouseList[0];
                                        id_1 = warehouseSelected.id, value = warehouseSelected.value;
                                        _a = newDetail_1.salesOrderItem[i], productCode = _a.productCode, backnowledgedQty = _a.backnowledgedQty, shippedBqty = _a.shippedBqty, invStatusId = _a.invStatusId, invStatusType = _a.invStatusType, materialGroupCode = _a.materialGroupCode;
                                        return [4 /*yield*/, this_1.getInvBatchWithHandle({ productCode: productCode, warehouseId: id_1, invStatusId: invStatusId, invStatusType: invStatusType })];
                                    case 1:
                                        _b = _c.sent(), invBatchId = _b.invBatchId, invBatchName = _b.invBatchName, invBatchList = _b.invBatchList, bavailQty = _b.bavailQty;
                                        invStatusObj = this_1.invStatusList.filter(function (item) { return item.id === invStatusId; });
                                        invStatusvalue = void 0;
                                        invStatusId = void 0;
                                        if (invStatusObj.length > 0) {
                                            invStatusvalue = invStatusObj[0].value;
                                            invStatusId = invStatusObj[0].id;
                                        }
                                        invStatusTypeObj = this_1.invStatusTypeList.filter(function (item) { return item.id === invStatusType; });
                                        invStatusTypevalue = void 0;
                                        if (invStatusTypeObj.length > 0) {
                                            invStatusTypevalue = invStatusTypeObj[0].name;
                                        }
                                        outItems = [__assign({}, newDetail_1.salesOrderItem[i], { shippedBqty: backnowledgedQty - shippedBqty, invStatus: invStatusvalue, invStatusId: invStatusId, invStatusTypeName: invStatusTypevalue, warehouseId: id_1, warehouseName: value, invBatchId: invBatchId,
                                                invBatchName: invBatchName,
                                                materialGroupCode: materialGroupCode,
                                                invBatchList: invBatchList,
                                                bavailQty: bavailQty, maxShippedBqty: backnowledgedQty - shippedBqty })];
                                        newDetail_1.salesOrderItem[i].outItems = outItems;
                                        // 增加原始价格记录  搞不明白啥都让前端判断 奇葩
                                        newDetail_1.salesOrderItem[i].oprice = newDetail_1.salesOrderItem[i].bprice;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(i < newDetail_1.salesOrderItem.length)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(i)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.orderDetail = newDetail_1;
                        toast_1.default.clear();
                        this.$apply();
                        _d.label = 6;
                    case 6:
                        toast_1.default.clear();
                        return [2 /*return*/];
                }
            });
        });
    };
    List = __decorate([
        wepy_redux_1.connect({
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
            }
        }, {
            getOutWarehouseOrderList: dmsoutwarehouse_1.getOutWarehouseOrderList,
            getOutWarehouseList: dmsoutwarehouse_1.getOutWarehouseList,
            getInvStatusList: dmsoutwarehouse_1.getInvStatusList,
            salesOrderOut: dmsoutwarehouse_1.salesOrderOut,
            getInvStatusType: dmsorder_1.getInvStatusType
            // getOutWarehouseOrderDetail,
        })
    ], List);
    return List;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(List , 'pages/dms/out-warehouse/detail/index'));

