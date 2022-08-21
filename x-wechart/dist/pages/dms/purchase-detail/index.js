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
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var purchasedetail_1 = require('./../../../store/actions/purchasedetail.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var request_1 = require('./../../../utils/request.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var orderdetail = /** @class */ (function (_super) {
    __extends(orderdetail, _super);
    function orderdetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '入库单详情',
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
            WarehouseListvisible: false,
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
            deliveryTypeCode: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            onShippedBqtyChg: function (evt) {
                var detail = evt.detail, _a = evt.target.dataset, itemIndex = _a.itemIndex, index = _a.index;
                if (typeof detail === 'undefined') {
                    return;
                }
                if (/^(0|[1-9][0-9]*)$/.test(detail)) {
                    this.orderdetail.purchaseOrderItem[itemIndex].selectInfo[index].info.shippedBqty = detail;
                }
                else {
                    if (detail !== '') {
                        toast_1.default.fail({
                            message: '请输入正确的数字',
                            duration: 1000,
                        });
                    }
                    else {
                        this.orderdetail.purchaseOrderItem[itemIndex].selectInfo[index].info.shippedBqty = detail;
                    }
                }
            },
            besureHouse: function (itemindex, index) {
                _this.itemindex = itemindex;
                _this.index = index;
                _this.WarehouseListvisible = !_this.WarehouseListvisible;
            },
            closePolicy: function () {
                _this.WarehouseListvisible = false;
                _this.WarehouseStatus = false;
            },
            chooseWarehouse: function (key, value) {
                _this.orderdetail.purchaseOrderItem[_this.itemindex].baseData.forEach(function (res) {
                    if (res.key == key) {
                        res.isSelect = true;
                    }
                    else {
                        res.isSelect = false;
                    }
                });
                _this.WarehouseListvisible = false;
                _this.orderdetail.purchaseOrderItem[_this.itemindex].selectInfo[_this.index].morencangku = value;
                _this.orderdetail.purchaseOrderItem[_this.itemindex].selectInfo[_this.index].info.warehouseId = key;
            },
            // besureHouseStatus: (itemindex: any, index: any) => {
            //   this.itemindex = itemindex
            //   this.index = index
            //   this.WarehouseStatus = !this.WarehouseStatus
            // },
            // 查询库存状态
            // WarehouseStatuse: (key: any, value: any) => {
            //   this.orderdetail.purchaseOrderItem[this.itemindex].selectInfo[this.index].morencangkuzhuangtai = value
            //   this.orderdetail.purchaseOrderItem[this.itemindex].selectInfo[this.index].info.invStatusId = key
            //   this.orderdetail.purchaseOrderItem[this.itemindex].InvStatusList.forEach((res: { key: any; isSelect: boolean; }) => {
            //     if (res.key == key) {
            //       res.isSelect = true
            //     } else {
            //       res.isSelect = false
            //     }
            //   })
            //   this.WarehouseStatus = false
            // },
            submitOrder: function () {
                // 订单信息
                var purchaseOrderItem = [];
                // 判断是否全部传完
                var purchaseOrderNumberItem = [];
                // 判断是否全为零  自己额以前写的逻辑自己傻逼
                var allNull = [];
                var _loop_1 = function (index) {
                    var res = _this.orderdetail.purchaseOrderItem[index];
                    // let itemwillcount = res.outQty - (res.orderedQty - res.waitStockBQty)
                    var itemwillcount = res.waitStockBQty;
                    var iteminputcount = 0;
                    if (res.selectInfo.length > 0) {
                        for (var itemindex in res.selectInfo) {
                            var item = res.selectInfo[itemindex].info;
                            if (item.shippedBqty === '') {
                                toast_1.default.fail({
                                    message: '入库数量不能为空',
                                    duration: 1000,
                                });
                                return { value: void 0 };
                            }
                            var all_1 = {
                                number: item.shippedBqty
                            };
                            allNull.push(all_1);
                            // if (item.shippedBqty == 0 || item.shippedBqty == '') {
                            //   Toast.fail({
                            //     message: '入库数量不能为零或空',
                            //     duration: 1000,
                            //   });
                            //   return
                            // }
                            purchaseOrderItem.push(item);
                        }
                        res.selectInfo.forEach(function (item) {
                            iteminputcount = parseInt(item.info.shippedBqty) + iteminputcount;
                        });
                    }
                    if (itemwillcount < iteminputcount) {
                        toast_1.default.fail({
                            message: '入库数总量已超出采购数量，请重新输入',
                            duration: 1000,
                        });
                        return { value: void 0 };
                    }
                    else if (itemwillcount == iteminputcount) {
                        var item = {
                            itemNumber: true
                        };
                        purchaseOrderNumberItem.push(item);
                    }
                    else if (itemwillcount > iteminputcount) {
                        var item = {
                            itemNumber: false
                        };
                        purchaseOrderNumberItem.push(item);
                    }
                };
                for (var index in _this.orderdetail.purchaseOrderItem) {
                    var state_1 = _loop_1(index);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
                var finalitemNumber = true;
                purchaseOrderNumberItem.forEach(function (res) {
                    if (res.itemNumber == false) {
                        finalitemNumber = false;
                    }
                    return;
                });
                if (ramda_1.all(ramda_1.propEq('number', 0), allNull)) {
                    toast_1.default.fail({
                        message: '入库数量不能全为零',
                        duration: 1000,
                    });
                    return;
                }
                _this.methods.getPurchaseOrderIn({
                    _loading: true, cisCode: wepy_1.default.$instance.globalData.cisCode, userAccount: wepy_1.default.$instance.globalData.account, data: {
                        isFinished: finalitemNumber,
                        purchaseOrderId: _this.orderdetail.id,
                        purchaseOrderItem: purchaseOrderItem
                    }
                }).then(function (res) {
                    if (res && res.payload && res.payload.data && res.payload.data.code && res.payload.data.code == "1") {
                        // TODO: 错误情况
                    }
                    else if (res && res.payload && res.payload.code && res.payload.code == "0") {
                        toast_1.default.success({
                            message: '入库成功',
                            duration: 1000,
                        });
                        setTimeout(function () {
                            _this.getAllBaseData(_this.orderdetail.id);
                        }, 1000);
                    }
                });
            },
            onChange: function (itemindex, index, e) {
                // TODO:
                if (/^(0|[1-9][0-9]*)$/.test(e.detail)) {
                    _this.orderdetail.purchaseOrderItem[itemindex].selectInfo[index].info.shippedBqty = e.detail;
                }
                else {
                    if (e.detail !== '') {
                        toast_1.default.fail({
                            message: '请输入正确的数字',
                            duration: 1000,
                        });
                    }
                    else {
                        _this.orderdetail.purchaseOrderItem[itemindex].selectInfo[index].info.shippedBqty = e.detail;
                    }
                }
            },
            addItem: function (key, index) {
                var productCode = '';
                var model = '';
                var colour = '';
                var price = '';
                var shippedBqty;
                var orderedQty = '';
                var outQty;
                var morencangku = _this.morencangku;
                var warehouseId = _this.morencangkuid;
                // let morencangkuzhuangtai = this.morencangkuzhuangtai
                // let morencangkuzhuangtaiid = this.morencangkuzhuangtaiid
                var invStatusId;
                _this.orderdetail.purchaseOrderItem.forEach(function (element) {
                    if (element.productCode == key) {
                        productCode = element.productCode;
                        model = element.model;
                        colour = element.colour;
                        price = element.price;
                        orderedQty = element.orderedQty;
                        outQty = element.outQty;
                        shippedBqty = element.outQty > 0 ? element.outQty - (Number(element.orderedQty) - element.waitStockBQty) : 0;
                        invStatusId = element.invStatusId;
                    }
                });
                var item = {
                    info: {
                        productCode: productCode,
                        model: model,
                        colour: colour,
                        price: price,
                        shippedBqty: shippedBqty,
                        waitshippedBqty: shippedBqty,
                        invStatusId: invStatusId,
                        warehouseId: warehouseId,
                        // TODO:
                        orderedQty: orderedQty,
                        outQty: outQty,
                        priceGroupName: ''
                    },
                    morencangku: morencangku
                };
                _this.orderdetail.purchaseOrderItem[index].selectInfo.push(item);
            },
            // 删除item
            delItem: function (itemindex, index) {
                _this.orderdetail.purchaseOrderItem[itemindex].selectInfo.splice(index, 1);
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    orderdetail.prototype.getAllBaseData = function (purchaseOrderId) {
        var _this = this;
        this.methods.getBaseData({
            _loading: true, cisCode: wepy_1.default.$instance.globalData.cisCode, "type": 'cgrkrkck', userAccount: wepy_1.default.$instance.globalData.account
        }).then(function (res) {
            ramda_1.forEachObjIndexed(function (value, key) {
                _this.morencangku = value;
                _this.morencangkuid = key;
            }, res.payload.data[0]);
        }),
            this.methods.getPurchaseDetail({ _loading: true, purchaseOrderId: purchaseOrderId }).then(function (res) {
                if (res && res.payload && res.payload.data &&
                    res.payload.data.purchaseOrderItem && res.payload.data.purchaseOrderItem.length > 0) {
                    res.payload.data.purchaseOrderItem.forEach(function (resItem) { return __awaiter(_this, void 0, void 0, function () {
                        var relproductCode, Status, productCode, model, colour, price, shippedBqty, orderedQty, outQty, morencangku, warehouseId, item;
                        return __generator(this, function (_a) {
                            relproductCode = resItem.productCode;
                            Status = {
                                cisCode: wepy_1.default.$instance.globalData.cisCode,
                                productCode: relproductCode
                            };
                            // 改成不能修改库存状态 2019-12-30
                            // const InvStatus = await dmsRequest({
                            //   data: Status,
                            //   method: 'getInvStatus'
                            // })
                            // let InvStatusList = []
                            // forEachObjIndexed((value, key) => {
                            //   forEachObjIndexed((value, key) => {
                            //     const item = {
                            //       key,
                            //       value,
                            //       isSelect: false
                            //     }
                            //     InvStatusList.push(item)
                            //   }, value)
                            // }, InvStatus.invStatus)
                            // if (InvStatusList && InvStatusList.length > 0) {
                            //   InvStatusList[0].isSelect = true
                            //   this.morencangkuzhuangtai = InvStatusList[0].value
                            //   this.morencangkuzhuangtaiid = InvStatusList[0].key
                            // }
                            resItem.baseData = this.baseData;
                            productCode = resItem.productCode;
                            model = resItem.model;
                            colour = resItem.colour;
                            price = resItem.price;
                            shippedBqty = resItem.outQty > 0 ? resItem.outQty - (resItem.orderedQty - resItem.waitStockBQty) : 0;
                            orderedQty = resItem.orderedQty;
                            outQty = resItem.outQty;
                            morencangku = this.morencangku;
                            warehouseId = this.morencangkuid;
                            item = {
                                info: {
                                    productCode: productCode,
                                    model: model,
                                    colour: colour,
                                    price: price,
                                    shippedBqty: shippedBqty,
                                    waitshippedBqty: shippedBqty,
                                    invStatusId: resItem.invStatusId,
                                    warehouseId: warehouseId,
                                    // TODO:
                                    orderedQty: orderedQty,
                                    outQty: outQty,
                                    priceGroupName: ''
                                },
                                morencangku: morencangku
                            };
                            resItem.selectInfo.push(item);
                            this.$apply();
                            return [2 /*return*/];
                        });
                    }); });
                }
            });
    };
    orderdetail.prototype.onShow = function () {
    };
    orderdetail.prototype.onLoad = function (e) {
        var purchaseOrderId = e.purchaseOrderId, deliveryTypeCode = e.deliveryTypeCode;
        //配送方式
        this.deliveryTypeCode = deliveryTypeCode;
        this.getAllBaseData(purchaseOrderId);
    };
    orderdetail = __decorate([
        wepy_redux_1.connect({
            user: function (_a) {
                var user = _a.user;
                return user;
            },
            orderdetail: function (_a) {
                var purchasedetail = _a.purchasedetail;
                return purchasedetail.orderdetail;
            },
            baseData: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.baseData;
            },
        }, {
            getBaseData: purchaseshop_1.getBaseData,
            getPurchaseDetail: purchasedetail_1.getPurchaseDetail,
            getPurchaseOrderIn: purchasedetail_1.getPurchaseOrderIn
        })
    ], orderdetail);
    return orderdetail;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(orderdetail , 'pages/dms/purchase-detail/index'));

