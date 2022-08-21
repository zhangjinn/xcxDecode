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
var purchasedetail_1 = require('./../../../store/actions/purchasedetail.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var request_1 = require('./../../../utils/request.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var returnentry_1 = require('./../../../store/actions/returnentry.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var index_1 = require('./../../../utils/index.js');
var orderdetail = /** @class */ (function (_super) {
    __extends(orderdetail, _super);
    function orderdetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '渠道退货出库',
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
            },
        };
        _this.data = {
            WarehouseStatus: false,
            itemindex: '',
            index: '',
            tabsIndex: '',
            WarehouseListVisible: false,
            morencangku: '',
            morencangkuid: '',
            morencangkuzhuangtai: '',
            morencangkuzhuangtaiid: '',
            visible: false,
            orderpopup: false,
            id: '',
            viewmore: false,
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
            ywyListVisible: false,
            ywyName: '',
            ywyId: '',
            note: '',
            date: index_1.formatDate(Date.parse(new Date()), 'Y-M-D'),
            selectBatchVisible: false,
            productCode: '',
            invStatusId: '',
            formData: {}
        };
        // 页面内交互写在methods里
        _this.methods = {
            choosePc: function (value, key) { return __awaiter(_this, void 0, void 0, function () {
                var bavailqtyPromise, bavailqty, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.selectBatchVisible = false;
                            if (this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchId !== key) {
                                this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchIdName = value;
                                this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchId = key;
                            }
                            else {
                                this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchIdName = '';
                                this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchId = '';
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, dmsrequest_1.dmsRequest({
                                    data: {
                                        productCode: this.productCode,
                                        warehouseId: this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.warehouseId,
                                        invStatusId: this.invStatusId,
                                        invBatchId: key
                                    },
                                    method: 'getInvQty'
                                })];
                        case 2:
                            bavailqtyPromise = _a.sent();
                            bavailqty = bavailqtyPromise.bavailqty;
                            this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.bavailqty = bavailqty;
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.bavailqty = 0;
                            return [3 /*break*/, 4];
                        case 4:
                            this.$apply();
                            return [2 /*return*/];
                    }
                });
            }); },
            selectBatch: function (itemindex, tabsIndex, index, productCode, invStatusId) {
                _this.itemindex = itemindex;
                _this.tabsIndex = tabsIndex;
                _this.index = index;
                _this.productCode = productCode;
                _this.invStatusId = invStatusId;
                _this.selectBatchVisible = !_this.selectBatchVisible;
            },
            onNoteChange: function (e) {
                var detail = e.detail;
                _this.note = detail;
            },
            chooseYwy: function (name, id) {
                if (id !== _this.ywyId) {
                    _this.ywyId = id;
                    _this.ywyName = name;
                }
                else {
                    _this.ywyId = '';
                    _this.ywyName = '';
                }
                _this.ywyListVisible = false;
                _this.$apply();
            },
            onShippedBqtyChg: function (evt) {
                var detail = evt.detail, _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex, index = _a.index;
                if (typeof detail === 'undefined') {
                    return;
                }
                if (/^(0|[1-9][0-9]*)$/.test(detail)) {
                    this.channelReturnInfo.items[itemIndex].outTabs[outIndex].selectInfo[index].info.realBuy = detail;
                }
                else {
                    if (detail !== '') {
                        toast_1.default.fail({
                            message: '请输入正确的数字',
                            duration: 1000,
                        });
                    }
                    else {
                        this.channelReturnInfo.items[itemIndex].outTabs[outIndex].selectInfo[index].info.realBuy = detail;
                    }
                }
            },
            besureHouse: function (itemindex, tabsIndex, index, productCode, invStatusId) {
                _this.itemindex = itemindex;
                _this.tabsIndex = tabsIndex;
                _this.index = index;
                _this.productCode = productCode;
                _this.invStatusId = invStatusId;
                _this.WarehouseListVisible = !_this.WarehouseListVisible;
            },
            closePolicy: function () {
                _this.WarehouseListVisible = false;
                _this.WarehouseStatus = false;
                _this.ywyListVisible = false;
                _this.selectBatchVisible = false;
            },
            openYwyList: function () {
                _this.ywyListVisible = true;
            },
            chooseWarehouse: function (key, value) { return __awaiter(_this, void 0, void 0, function () {
                var invBatchPromise, invBatch, invBatchList_1, error_2, bavailqtyPromise, bavailqty, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.WarehouseListVisible = false;
                            this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].morencangku = value;
                            this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.warehouseId = key;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, dmsrequest_1.dmsRequest({
                                    data: {
                                        productCode: this.productCode,
                                        warehouseId: key,
                                    },
                                    method: 'getInvBatch'
                                })];
                        case 2:
                            invBatchPromise = _a.sent();
                            invBatch = invBatchPromise.invBatch;
                            invBatchList_1 = [];
                            if (invBatch) {
                                ramda_1.forEachObjIndexed(function (value, key) {
                                    var item = {
                                        value: value,
                                        key: key
                                    };
                                    invBatchList_1.push(item);
                                }, invBatch);
                            }
                            this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].invBatchList = invBatchList_1;
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].invBatchList = [];
                            return [3 /*break*/, 4];
                        case 4:
                            // 批次重置
                            this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchIdName = '';
                            this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchId = '';
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, dmsrequest_1.dmsRequest({
                                    data: {
                                        productCode: this.productCode,
                                        warehouseId: key,
                                        invStatusId: this.invStatusId,
                                        invBatchId: ''
                                    },
                                    method: 'getInvQty'
                                })];
                        case 6:
                            bavailqtyPromise = _a.sent();
                            bavailqty = bavailqtyPromise.bavailqty;
                            this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.bavailqty = bavailqty;
                            return [3 /*break*/, 8];
                        case 7:
                            error_3 = _a.sent();
                            this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.bavailqty = 0;
                            return [3 /*break*/, 8];
                        case 8:
                            this.$apply();
                            return [2 /*return*/];
                    }
                });
            }); },
            submitOrder: function () {
                // 订单信息
                var purchaseOrderItem = [];
                // 判断填入数量是否超过可用库存
                var channelOrderItem = [];
                // 判断是否全部传完
                var purchaseOrderNumberItem = [];
                // 判断是否全为零
                var allNull = [];
                for (var index in _this.channelReturnInfo.items) {
                    var res = _this.channelReturnInfo.items[index];
                    var _loop_1 = function (newIndex) {
                        var newRes = _this.channelReturnInfo.items[index].outTabs[newIndex];
                        var itemWillCount = newRes.canOutQty;
                        var itemInputCount = 0;
                        if (newRes.selectInfo.length > 0) {
                            for (var itemindex in newRes.selectInfo) {
                                var item = newRes.selectInfo[itemindex].info;
                                if (item.realBuy === '') {
                                    toast_1.default.fail({
                                        message: '退货出库数量不能为空',
                                        duration: 1000,
                                    });
                                    return { value: void 0 };
                                }
                                if (item.bavailqty === 0) {
                                    toast_1.default.fail({
                                        message: '可用库存不能为零',
                                        duration: 1000,
                                    });
                                    return { value: void 0 };
                                }
                                var all_1 = {
                                    number: item.realBuy
                                };
                                allNull.push(all_1);
                                var finInfo = {
                                    productCode: item.productCode,
                                    warehouseId: item.warehouseId,
                                    invStatusId: item.invStatusId,
                                    borderedQty: item.realBuy,
                                    bprice: item.price
                                };
                                var newFinInfo = __assign({ unionId: item.productCode + '_' + item.warehouseId + '_' + item.invStatusId }, item);
                                channelOrderItem.push(newFinInfo);
                                purchaseOrderItem.push(finInfo);
                            }
                            newRes.selectInfo.forEach(function (item) {
                                itemInputCount = parseInt(item.info.realBuy) + itemInputCount;
                            });
                        }
                        if (itemWillCount < itemInputCount) {
                            toast_1.default.fail({
                                message: '退货出库数总量已超出总数量，请重新输入',
                                duration: 1000,
                            });
                            return { value: void 0 };
                        }
                        else if (itemWillCount == itemInputCount) {
                            var item = {
                                itemNumber: true
                            };
                            purchaseOrderNumberItem.push(item);
                        }
                        else if (itemWillCount > itemInputCount) {
                            var item = {
                                itemNumber: false
                            };
                            purchaseOrderNumberItem.push(item);
                        }
                    };
                    for (var newIndex in res.outTabs) {
                        var state_1 = _loop_1(newIndex);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                }
                var finalItemNumber = true;
                purchaseOrderNumberItem.forEach(function (res) {
                    if (res.itemNumber == false) {
                        finalItemNumber = false;
                    }
                    return;
                });
                if (ramda_1.all(ramda_1.propEq('number', 0), allNull)) {
                    toast_1.default.fail({
                        message: '退货出库数量不能全为零',
                        duration: 1000,
                    });
                    return;
                }
                var statusNames = channelOrderItem.map(function (item) { return item.unionId; }).filter(function (item, index, arr) {
                    return arr.indexOf(item, 0) === index;
                });
                var fit = true;
                statusNames.forEach(function (name) {
                    var is = channelOrderItem.filter(function (item) { return item.unionId === name; });
                    var amount = is.reduce(function (total, i) { return parseInt(total) + parseInt(i.realBuy); }, 0);
                    if (amount > parseInt(is[0].bavailqty) || amount > parseInt(is[0].canOutQty)) {
                        fit = false && fit;
                    }
                });
                if (!fit) {
                    toast_1.default.fail({
                        message: '请填写正确的出库数量',
                        duration: 1000,
                    });
                    return;
                }
                _this.methods.returnAddAndOut({
                    _loading: true, cisCode: wepy_1.default.$instance.globalData.cisCode, userAccount: wepy_1.default.$instance.globalData.account,
                    data: {
                        id: _this.channelReturnInfo.id,
                        documentNum: _this.channelReturnInfo.documentNum,
                        returnNum: _this.channelReturnInfo.returnNum,
                        isLastBatch: finalItemNumber,
                        userId: _this.ywyId,
                        message: _this.note,
                        orderItems: purchaseOrderItem
                    }
                }).then(function (res) {
                    if (res && res.payload && res.payload.data && res.payload.data.code && res.payload.data.code == "1") {
                        // TODO: 错误情况
                    }
                    else if (res && res.payload && res.payload.code && res.payload.code == "0") {
                        toast_1.default.success({
                            message: '出库成功',
                            duration: 1000,
                        });
                        setTimeout(function () {
                            // TODO:
                            var _a = _this.formData, itemId = _a.itemId, documentNum = _a.documentNum, returnNum = _a.returnNum, supplierName = _a.supplierName, returnBy = _a.returnBy;
                            _this.getAllBaseData(itemId, documentNum, returnNum, supplierName, returnBy);
                        }, 1000);
                    }
                });
            },
            addItem: function (key, itemindex, tabsIndex) { return __awaiter(_this, void 0, void 0, function () {
                var productCode, model, colour, price, morencangku, warehouseId, invBatchId, realBuy, canOutQty, invStatusId, invStatusName, newInvBatch, batch, invBatch, error_4, invBatchList, newBavailqty, availableStock, bavailqty, error_5, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            productCode = '';
                            model = '';
                            colour = '';
                            price = '';
                            morencangku = this.morencangku;
                            warehouseId = this.morencangkuid;
                            invBatchId = '';
                            realBuy = this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].canOutQty;
                            canOutQty = this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].canOutQty;
                            invStatusId = this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].invStatusId;
                            invStatusName = this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].invStatusName;
                            this.channelReturnInfo.items.forEach(function (element) {
                                if (element.productCode == key) {
                                    productCode = element.productCode;
                                    model = element.model;
                                    colour = element.colour;
                                    price = element.price;
                                }
                            });
                            newInvBatch = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, dmsrequest_1.dmsRequest({
                                    data: {
                                        productCode: productCode,
                                        warehouseId: warehouseId,
                                        _ignoreToast: true
                                    },
                                    method: 'getInvBatch'
                                })];
                        case 2:
                            batch = _a.sent();
                            invBatch = batch.invBatch;
                            newInvBatch = invBatch;
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            console.log(error_4);
                            return [3 /*break*/, 4];
                        case 4:
                            invBatchList = [];
                            ramda_1.forEachObjIndexed(function (value, key) {
                                var item = {
                                    value: value,
                                    key: key
                                };
                                invBatchList.push(item);
                            }, newInvBatch);
                            newBavailqty = 0;
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, dmsrequest_1.dmsRequest({
                                    data: {
                                        productCode: productCode,
                                        warehouseId: warehouseId,
                                        invStatusId: invStatusId,
                                        invBatchId: invBatchId,
                                        _ignoreToast: true
                                    },
                                    method: 'getInvQty'
                                })];
                        case 6:
                            availableStock = _a.sent();
                            bavailqty = availableStock.bavailqty;
                            newBavailqty = bavailqty;
                            return [3 /*break*/, 8];
                        case 7:
                            error_5 = _a.sent();
                            console.log(error_5);
                            return [3 /*break*/, 8];
                        case 8:
                            item = {
                                info: {
                                    productCode: productCode,
                                    model: model,
                                    colour: colour,
                                    price: price,
                                    warehouseId: warehouseId,
                                    invBatchId: invBatchId,
                                    bavailqty: newBavailqty,
                                    realBuy: realBuy,
                                    canOutQty: canOutQty,
                                    invStatusId: invStatusId,
                                    invStatusName: invStatusName
                                },
                                morencangku: morencangku,
                                invBatchList: invBatchList
                            };
                            this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].selectInfo.push(item);
                            this.$apply();
                            return [2 /*return*/];
                    }
                });
            }); },
            // 删除item
            delItem: function (itemindex, tabsIndex, index) {
                _this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].selectInfo.splice(index, 1);
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    orderdetail.prototype.getAllBaseData = function (itemId, documentNum, returnNum, supplierName, returnBy) {
        var _this = this;
        this.methods.getBaseData({
            type: 'ywy'
        }).then(function (res) {
            if (res && res.payload && res.payload.data && res.payload.data.length > 0) {
                var data = res.payload.data;
                ramda_1.forEachObjIndexed(function (value, key) {
                    _this.ywyName = value;
                    _this.ywyId = key;
                }, data[0]);
            }
        });
        this.methods.getBaseData({
            cisCode: wepy_1.default.$instance.globalData.cisCode, "type": 'cglrrkck', 'orgId': '', userAccount: wepy_1.default.$instance.globalData.account
        }).then(function (res) {
            ramda_1.forEachObjIndexed(function (value, key) {
                _this.morencangku = value;
                _this.morencangkuid = key;
            }, res.payload.data[0]);
        }),
            this.methods.getNewReturnOrderChannelInfo({ _loading: true, id: itemId, documentNum: documentNum, returnNum: returnNum, supplierName: supplierName, returnBy: returnBy }).then(function (res) {
                if (res && res.payload && res.payload.data && res.payload.data.items && res.payload.data.items.length > 0) {
                    res.payload.data.items.forEach(function (resItem) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            resItem.baseData = this.baseData;
                            if (resItem && resItem.outTabs && resItem.outTabs.length > 0) {
                                resItem.outTabs.forEach(function (outTabsItem) { return __awaiter(_this, void 0, void 0, function () {
                                    var invBatchList, batch, invBatch, error_6, finBavailqty, availableStock, bavailqty, error_7, productCode, model, colour, price, morencangku, warehouseId, item;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                invBatchList = [];
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 3, , 4]);
                                                return [4 /*yield*/, dmsrequest_1.dmsRequest({
                                                        data: {
                                                            productCode: resItem.productCode,
                                                            warehouseId: this.morencangkuid,
                                                            _ignoreToast: true
                                                        },
                                                        method: 'getInvBatch'
                                                    })];
                                            case 2:
                                                batch = _a.sent();
                                                invBatch = batch.invBatch;
                                                if (invBatch) {
                                                    ramda_1.forEachObjIndexed(function (value, key) {
                                                        var item = {
                                                            value: value,
                                                            key: key
                                                        };
                                                        invBatchList.push(item);
                                                    }, invBatch);
                                                }
                                                return [3 /*break*/, 4];
                                            case 3:
                                                error_6 = _a.sent();
                                                console.log(error_6);
                                                return [3 /*break*/, 4];
                                            case 4:
                                                finBavailqty = 0;
                                                _a.label = 5;
                                            case 5:
                                                _a.trys.push([5, 7, , 8]);
                                                return [4 /*yield*/, dmsrequest_1.dmsRequest({
                                                        data: {
                                                            productCode: resItem.productCode,
                                                            warehouseId: this.morencangkuid,
                                                            invStatusId: outTabsItem.invStatusId,
                                                            invBatchId: '',
                                                            _ignoreToast: true
                                                        },
                                                        method: 'getInvQty'
                                                    })];
                                            case 6:
                                                availableStock = _a.sent();
                                                bavailqty = availableStock.bavailqty;
                                                finBavailqty = bavailqty;
                                                return [3 /*break*/, 8];
                                            case 7:
                                                error_7 = _a.sent();
                                                console.log(error_7);
                                                return [3 /*break*/, 8];
                                            case 8:
                                                productCode = resItem.productCode;
                                                model = resItem.model;
                                                colour = resItem.colour;
                                                price = resItem.price;
                                                morencangku = this.morencangku;
                                                warehouseId = this.morencangkuid;
                                                item = {
                                                    info: __assign({ productCode: productCode,
                                                        model: model,
                                                        colour: colour,
                                                        price: price, warehouseId: warehouseId, invBatchId: '', invBatchIdName: '', bavailqty: finBavailqty, realBuy: outTabsItem.canOutQty }, outTabsItem),
                                                    morencangku: morencangku,
                                                    invBatchList: invBatchList,
                                                };
                                                outTabsItem.selectInfo = []; // 存储信息 不改变原来信息
                                                outTabsItem.selectInfo.push(item);
                                                this.$apply();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
            });
    };
    orderdetail.prototype.onLoad = function (e) {
        var itemId = e.itemId, documentNum = e.documentNum, returnNum = e.returnNum, supplierName = e.supplierName, returnBy = e.returnBy;
        this.formData = __assign({}, e);
        this.getAllBaseData(itemId, documentNum, returnNum, supplierName, returnBy);
    };
    orderdetail.prototype.onUnload = function () {
        this.formData = {};
        this.channelReturnInfo = {};
    };
    orderdetail = __decorate([
        wepy_redux_1.connect({
            user: function (_a) {
                var user = _a.user;
                return user;
            },
            channelReturnInfo: function (_a) {
                var returnentry = _a.returnentry;
                return returnentry.channelReturnInfo;
            },
            baseData: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.baseData;
            },
            ywyList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.ywyList;
            },
        }, {
            getBaseData: purchaseshop_1.getBaseData,
            returnAddAndOut: returnentry_1.returnAddAndOut,
            getPurchaseDetail: purchasedetail_1.getPurchaseDetail,
            getPurchaseOrderIn: purchasedetail_1.getPurchaseOrderIn,
            getNewReturnOrderChannelInfo: returnentry_1.getNewReturnOrderChannelInfo
        })
    ], orderdetail);
    return orderdetail;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(orderdetail , 'pages/dms/channel-order-return/index'));

