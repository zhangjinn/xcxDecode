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
var returnentry_1 = require('./../../../store/actions/returnentry.js');
var dmsoutwarehouse_1 = require('./../../../store/actions/dmsoutwarehouse.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var dmsoutwarehouse_2 = require('./../../../store/actions/dmsoutwarehouse.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var ReturnEntry = /** @class */ (function (_super) {
    __extends(ReturnEntry, _super);
    function ReturnEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '退货入库',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-toast": "/components/vant/toast/index",
                "van-field": "/components/vant/field/index",
                "van-dialog": "/components/vant/dialog/index",
                'van-picker': '/components/vant/picker/index',
                'order-return-entry-item': '/components/order-return-entry-item/index',
                "van-icon": "/components/vant/icon/index",
            },
        };
        _this.data = {
            beSure: false,
            itemId: '',
            purchaseId: '',
            remark: '',
            warehouseVisible: false,
            invBatchVisible: false,
            currentGood: {
                index: '',
                id: ''
            },
            currentInvBatchList: [],
            popVisible: false,
            ywyList: [],
            ywyId: '',
            ywyName: '',
            inType: '',
            inStatus: true,
            orderName: '',
        };
        _this.methods = {
            openChoose: function () {
                _this.popVisible = true;
            },
            closePolicy: function () {
                _this.popVisible = false;
            },
            chooseYwy: function (itemName, itemId) {
                _this.ywyName = itemName;
                _this.ywyId = itemId;
                _this.popVisible = false;
            },
            onChangeRemark: function (e) {
                var detail = e.detail;
                _this.remark = detail;
            },
            goBack: function () {
                wx.navigateBack({
                    delta: 1,
                });
            },
            beStorage: function () {
                var _this = this;
                this.beSure = !this.beSure;
                var salesOrderItem = this.returnInfo.salesOrderItem;
                var stocks = salesOrderItem.map(function (item) { return item.stock; }).flat(1).filter(function (item) { return item.returnQty > 0; });
                var orderItems = [];
                ramda_1.forEach(function (res) {
                    var item = {
                        itemId: res.itemId,
                        warehouseId: res.warehouseId,
                        invBatchId: res.batchId ? res.batchId : '',
                        borderedQty: res.returnQty,
                        bprice: res.bprice,
                        amount: res.amount,
                        invStatusId: res.invStatusId,
                    };
                    orderItems.push(item);
                }, stocks);
                var account = wepy_1.default.$instance.globalData.account;
                this.methods.getNewConfirmationInbound({
                    _loading: true,
                    userAccount: account,
                    data: {
                        salesOrderId: this.itemId,
                        purchaseOrderId: this.purchaseId ? this.purchaseId : '',
                        userId: this.ywyId,
                        message: this.remark,
                        orderItems: orderItems
                    }
                }).then(function (res) {
                    if (res && res.payload && res.payload.code == '0') {
                        toast_1.default.success(_this.inType + "\u6210\u529F");
                        setTimeout(function () {
                            wx.navigateBack({
                                delta: 1,
                            });
                        }, 2000);
                    }
                });
            },
            tryNumber: function (e) {
                var amount = e.amount;
                var isNumber = /^[0-9]\d*\,\d*|[0-9]\d*$/;
                return isNumber.test(amount);
            },
            OnseleWarehouse: function () {
                if (!this.inStatus) {
                    toast_1.default.fail('需等待分销商完成出库');
                    return;
                }
                var salesOrderItem = this.returnInfo.salesOrderItem;
                var items = salesOrderItem.map(function (item) { return item.stock; }).flat(1);
                var statusNames = items.map(function (item) { return item.invStatusName; }).filter(function (item, index, arr) {
                    return arr.indexOf(item, 0) === index;
                });
                var fit = true;
                statusNames.forEach(function (name) {
                    var is = items.filter(function (item) { return item.invStatusName === name; });
                    var amount = is.reduce(function (total, i) { return parseInt(total) + parseInt(i.returnQty); }, 0);
                    if (amount > parseInt(is[0].relreturnQty)) {
                        fit = false && fit;
                    }
                });
                console.log(fit);
                if (!fit) {
                    toast_1.default.fail('商品退货数量大于可退货数量');
                    return;
                }
                var orderItems = [];
                ramda_1.forEach(function (res) {
                    var item = {
                        itemId: res.itemId,
                        borderedQty: res.returnQty,
                        bprice: res.bprice,
                        amount: res.amount
                    };
                    orderItems.push(item);
                }, items);
                if (ramda_1.all(ramda_1.propEq('borderedQty', 0), orderItems)) {
                    toast_1.default.fail('商品数量不能全为零');
                }
                else {
                    this.beSure = !this.beSure;
                }
            },
            returnInfo: function (_a) {
                var detail = _a.detail;
                var salesOrderItem = this.returnInfo.salesOrderItem;
                var num = detail.num, index = detail.index, itemId = detail.itemId;
                var newItem = ramda_1.findIndex(ramda_1.propEq('itemId', itemId), salesOrderItem);
                var count = num > salesOrderItem[newItem].relreturnQty ? salesOrderItem[newItem].relreturnQty : num;
                if (newItem !== -1) {
                    salesOrderItem[newItem].stock.forEach(function (item, i) {
                        if (index === i) {
                            item.returnQty = count;
                            item.amount = count * item.bprice;
                        }
                    });
                }
            },
            choose: function (_a) {
                var detail = _a.detail;
                return __awaiter(this, void 0, void 0, function () {
                    var salesOrderItem, newItem, productCode, warehouseId_1, invBatchResult_1, invBatchList;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                this.currentGood = { index: detail.index, id: detail.itemId };
                                if (!(detail.type === 'warehouse')) return [3 /*break*/, 1];
                                this.warehouseVisible = true;
                                this.invBatchVisible = false;
                                return [3 /*break*/, 3];
                            case 1:
                                if (!(detail.type === 'batch')) return [3 /*break*/, 3];
                                console.log(detail);
                                salesOrderItem = this.returnInfo.salesOrderItem;
                                newItem = ramda_1.findIndex(ramda_1.propEq('itemId', this.currentGood.id), salesOrderItem);
                                productCode = this.currentGood.id;
                                if (newItem !== -1) {
                                    salesOrderItem[newItem].stock.forEach(function (item, i) {
                                        if (_this.currentGood.index === i) {
                                            warehouseId_1 = item.warehouseId;
                                        }
                                    });
                                }
                                return [4 /*yield*/, dmsoutwarehouse_2.getInvBatch({ productCode: '3451028', warehouseId: '7286958' })
                                    // const invBatchResult: any = await getInvBatch({ productCode, warehouseId })
                                ];
                            case 2:
                                invBatchResult_1 = _b.sent();
                                invBatchList = Object.keys(invBatchResult_1.invBatch).map(function (key) {
                                    return { id: key, value: invBatchResult_1.invBatch[key] };
                                });
                                invBatchList.splice(0, 0, { id: '', value: '请选择批次' });
                                this.currentInvBatchList = invBatchList;
                                this.warehouseVisible = false;
                                this.invBatchVisible = true;
                                this.$apply();
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
            handle: function (_a) {
                var detail = _a.detail;
                var type = detail.type, itemId = detail.itemId, index = detail.index;
                if (type === 'add') {
                    var salesOrderItem = this.returnInfo.salesOrderItem;
                    var newItem = ramda_1.findIndex(ramda_1.propEq('itemId', itemId), salesOrderItem);
                    var _b = salesOrderItem[newItem], invStatusName = _b.invStatusName, relreturnQty = _b.relreturnQty, returnQty = _b.returnQty, bprice = _b.bprice, stock = _b.stock;
                    if (newItem !== -1) {
                        stock.push({
                            itemId: itemId,
                            invStatusName: invStatusName,
                            relreturnQty: relreturnQty,
                            returnQty: returnQty,
                            bprice: bprice,
                            warehouse: this.warehouseList.length > 0 ? this.warehouseList[0].value : '',
                            warehouseId: this.warehouseList.length > 0 ? this.warehouseList[0].id : '',
                            batch: '请选择批次',
                            batchId: '',
                            amount: returnQty * bprice,
                        });
                    }
                }
                else if (type === 'del') {
                    var salesOrderItem = this.returnInfo.salesOrderItem;
                    var newItem = ramda_1.findIndex(ramda_1.propEq('itemId', itemId), salesOrderItem);
                    if (newItem !== -1 && salesOrderItem[newItem].stock.length >= 1) {
                        salesOrderItem[newItem].stock.splice(index, 1);
                    }
                    this.$apply();
                }
            },
            onWarehouseCancel: function () {
                this.warehouseVisible = false;
            },
            onCloseInvBatch: function () {
                this.invBatchVisible = false;
            },
            onInvBatchConfirm: function (evt) {
                var _this = this;
                // 设计批次
                var _a = evt.detail.value, id = _a.id, value = _a.value;
                console.log(id);
                console.log(value);
                var salesOrderItem = this.returnInfo.salesOrderItem;
                var newItem = ramda_1.findIndex(ramda_1.propEq('itemId', this.currentGood.id), salesOrderItem);
                if (newItem !== -1) {
                    salesOrderItem[newItem].stock.forEach(function (item, i) {
                        if (_this.currentGood.index === i) {
                            item.batchId = id;
                            item.batch = value;
                        }
                    });
                }
                this.invBatchVisible = false;
            },
            onWarehouseConfirm: function (evt) {
                var _this = this;
                var _a = evt.detail.value, id = _a.id, value = _a.value;
                this.warehouseVisible = false;
                var salesOrderItem = this.returnInfo.salesOrderItem;
                var newItem = ramda_1.findIndex(ramda_1.propEq('itemId', this.currentGood.id), salesOrderItem);
                if (newItem !== -1) {
                    salesOrderItem[newItem].stock.forEach(function (item, i) {
                        if (_this.currentGood.index === i) {
                            item.warehouseId = id;
                            item.warehouse = value;
                        }
                    });
                }
                this.$apply();
            },
        };
        return _this;
    }
    ReturnEntry.prototype.onLoad = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, purchaseId, salesOrderItem, _a, canIn, returnBy, documentType, documentNum;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        itemId = e.itemId, purchaseId = e.purchaseId;
                        this.itemId = itemId;
                        this.purchaseId = purchaseId;
                        return [4 /*yield*/, this.methods.getNewReturnOrderInfo({ _loading: true, salesOrderId: itemId, purchaseOrderId: purchaseId ? purchaseId : '' })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.methods.getOutWarehouseList()];
                    case 2:
                        _b.sent();
                        salesOrderItem = this.returnInfo.salesOrderItem;
                        salesOrderItem.forEach(function (item) {
                            item.stock.forEach(function (st) {
                                st.warehouse = _this.warehouseList.length > 0 ? _this.warehouseList[0].value : '';
                                st.warehouseId = _this.warehouseList.length > 0 ? _this.warehouseList[0].id : '';
                            });
                        });
                        this.methods.getBaseData({
                            type: 'ywy'
                        }).then(function (res) {
                            var data = res.payload.data;
                            _this.ywyList = data.map(function (item) {
                                return Object.keys(item).map(function (id) { return { id: id, name: item[id] }; });
                            }).flat(1);
                            if (_this.ywyList) {
                                var ywy = _this.ywyList[0];
                                _this.ywyId = ywy.id;
                                _this.ywyName = ywy.name;
                            }
                            _this.$apply();
                        });
                        _a = this.returnInfo, canIn = _a.canIn, returnBy = _a.returnBy, documentType = _a.documentType, documentNum = _a.documentNum;
                        this.orderName = documentNum.includes('S') ? '销售单号' : '退货单号';
                        if (documentType === 'retail') {
                            this.inType = '退货入库';
                        }
                        else if (documentType === 'normal' || documentType === 'return') {
                            if (returnBy === '') {
                                this.inType = '退货';
                            }
                            else if (returnBy === 'bySales' && !canIn) { // 代理发起
                                this.inType = '入库';
                                this.inStatus = false;
                            }
                            else if (returnBy === 'bySales' && canIn) {
                                this.inType = '入库';
                            }
                            else { //分销发起
                                this.inType = '入库';
                            }
                        }
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReturnEntry = __decorate([
        wepy_redux_1.connect({
            returnInfo: function (_a) {
                var returnentry = _a.returnentry;
                return returnentry.returnInfo;
            },
            warehouseList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.warehouseList;
            },
        }, {
            getNewReturnOrderInfo: returnentry_1.getNewReturnOrderInfo,
            getNewConfirmationInbound: returnentry_1.getNewConfirmationInbound,
            getOutWarehouseList: dmsoutwarehouse_1.getOutWarehouseList,
            getBaseData: purchaseshop_1.getBaseData,
        })
    ], ReturnEntry);
    return ReturnEntry;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ReturnEntry , 'pages/dms/order-return-entry/index'));

