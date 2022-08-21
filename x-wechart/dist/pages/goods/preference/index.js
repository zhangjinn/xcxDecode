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
var order_1 = require('./../../../store/actions/order.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/order/index.js');
var index_2 = require('./../../../components/pay-confirm/index.js');
var Preference = /** @class */ (function (_super) {
    __extends(Preference, _super);
    function Preference() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '特惠单确认',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-button': '../../../components/vant/button/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-search': '../../../components/vant/search/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                'van-checkbox': '../../../components/vant/checkbox/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'calendar': '../../../components/calendar/index',
                'van-submit-bar': '../../../components/vant/submit-bar/index',
            },
        };
        _this.components = {
            order: index_1.default,
            payconfrim: index_2.default,
        };
        _this.orderId = '';
        _this.ids = '';
        _this.attrActionType = '';
        _this.data = {
            rebateCheckBox: true,
            extend: true,
            totalVolume: '0.00'
        };
        _this.methods = {
            toggleExtend: function () {
                this.extend = !this.extend;
            },
            onBateChange: function (event) {
                this.rebateCheckBox = event.detail;
            },
            chooseItems: function () {
                if (this.order.items.length > 0) {
                    wx.navigateTo({ url: '/pages/goods/preference-items/index' });
                }
                else {
                    toast_1.default('当前特惠单下暂无商品');
                }
            },
            confirmSaveOrder: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var isValidate, _a, totalPrice, canUseMoney, totalPrice_1;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, this.$invoke('order', 'checkParams')];
                            case 1:
                                isValidate = _b.sent();
                                _a = this.order, totalPrice = _a.totalPrice, canUseMoney = _a.canUseMoney;
                                if (totalPrice > canUseMoney) {
                                    toast_1.default('账户余额不足');
                                    return [2 /*return*/];
                                }
                                if (isValidate) {
                                    totalPrice_1 = this.order.totalPrice;
                                    this.$invoke('payconfrim', 'show', totalPrice_1, function () {
                                        _this.saveOrder();
                                    });
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Preference.prototype.saveOrder = function () {
        var _a = this.order, basic = _a.basic, itemsSelected = _a.itemsSelected, items = _a.items;
        var _b = this.$invoke('order', 'getParams'), trans = _b.trans, billTo = _b.billTo, address1 = _b.address1, contact = _b.contact, mobile = _b.mobile, orderCode = _b.orderCode, maxEndDate = _b.maxEndDate, endDate = _b.endDate, address3 = _b.address3, address4 = _b.address4, address7 = _b.address7, district = _b.district, toAddress = _b.toAddress, isAllowAdvancdeliver = _b.isAllowAdvancdeliver, salesShopInfoId = _b.salesShopInfoId, serviceTypeCodes = _b.serviceTypeCodes, officeId = _b.officeId;
        toast_1.default.loading({
            forbidClick: true,
            message: '订单处理中',
            duration: 0,
        });
        // 选择的商品
        var plList = ramda_1.map(function (_a) {
            var id = _a.id, num = _a.num;
            return ({ id: id, count: num });
        }, items);
        if (itemsSelected.length === 0) {
            toast_1.default('请至少选择一个商品');
            return;
        }
        // 工程单参数
        var params = {
            id: basic.id,
            plList: plList,
            trans: trans,
            billToId: billTo,
            address1: address1,
            contacts: contact,
            contactMobile: mobile,
            purchaseCode: orderCode,
            maxEndDate: maxEndDate,
            endDate: endDate,
            salesShopInfoId: salesShopInfoId,
            serviceTypeCodes: serviceTypeCodes
        };
        // 直送地址
        if (district) {
            params.provice = toAddress.proviceId;
            params.city = toAddress.cityId;
            params.district = toAddress.areaId;
            params.address3 = address3;
        }
        // 直配到分销商
        if (address4) {
            params.address4 = address4;
            params.address7 = address7;
        }
        // 如果是商品维度
        if (this.ids) {
            params.orgMatkl = basic.orgMatkl;
        }
        if (isAllowAdvancdeliver) {
            params.isAllowAdvancdeliver = isAllowAdvancdeliver;
        }
        if (officeId) { // 海信办事处
            params.officeId = officeId;
        }
        request_1.request({
            api: this.orderId ? 'preferential/savePreferential.nd' : 'preferential/saveProduct.nd',
            method: 'POST',
            header: {
                'content-type': 'application/json',
            },
            data: params,
            callback: function (res) {
                toast_1.default.clear();
                if (res.data && res.data.orderCode) {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?type=success&orderNum=" + res.data.orderCode,
                    });
                }
                else {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?type=fail&errorMsg=" + (res.data.msg || res.data.error || '系统错误'),
                    });
                }
            },
        });
    };
    Preference.prototype.onLoad = function (_a) {
        var _this = this;
        var mainId = _a.mainId, arr = _a.arr;
        this.orderId = mainId;
        this.ids = arr;
        // mainId=14170158568 ids=14170158583,14170158584,14170158585
        toast_1.default.loading({
            forbidClick: true,
            message: '加载中',
            duration: 0,
        });
        if (mainId) {
            this.methods.takePreference({ mainId: mainId }, function () {
                toast_1.default.clear();
            }).then(function (res) {
                if (res && res.payload && res.payload.code === 400) {
                    toast_1.default.fail({
                        message: res.payload.msg || '请联系分公司维护海信账户主数据后，获取下单权限！',
                        duration: 3000,
                        onClose: function () {
                            wx.navigateBack();
                        }
                    });
                    return;
                }
                var productCodeArr = [];
                var orgIdArr = [];
                //产品数量是否>0
                if (_this.order.itemsSelected && _this.order.itemsSelected.length > 0) {
                    for (var key in _this.order.itemsSelected) {
                        var num = _this.order.itemsSelected[key].num;
                        for (var i = 0; i < num; i++) {
                            productCodeArr.push(_this.order.itemsSelected[key].productId);
                            orgIdArr.push(res.payload.detail.fwOrgId);
                        }
                    }
                }
                else {
                    return;
                }
                //请求库存
                // let data = {
                //   orgId: orgIdArr.join(','),//组织id
                //   code: [...productCodeArr].join(','),//产品编码
                //   queryType: 'purchase'//库存查询类型 海信采购
                // }
                // this.methods.getStocks(data).then(res => {
                //   let totalVolume = 0;
                //   if(res && res.length > 0){
                //     for(const key in res) {
                //       totalVolume += res[key].loadVolume
                //     }
                //   }
                //   this.totalVolume = Math.round(totalVolume * 100) / 100;
                //   this.$apply()
                // })
            });
        }
        else if (arr) {
            var itemsArr = ramda_1.split(':', arr);
            var id = ramda_1.head(itemsArr);
            var counts = ramda_1.last(itemsArr);
            this.methods.takePreference({ ids: id, counts: counts }, function () {
                toast_1.default.clear();
            }).then(function (res) {
                console.log(_this.order.itemsSelected);
                if (res && res.payload && res.payload.code === 400) {
                    toast_1.default.fail({
                        message: res.payload.msg || '请联系分公司维护海信账户主数据后，获取下单权限！',
                        duration: 3000,
                        onClose: function () {
                            wx.navigateBack();
                        }
                    });
                    return;
                }
                var productCodeArr = [];
                var orgIdArr = [];
                //产品数量是否>0
                if (_this.order.itemsSelected && _this.order.itemsSelected.length > 0) {
                    for (var key in _this.order.itemsSelected) {
                        var num = _this.order.itemsSelected[key].num;
                        for (var i = 0; i < num; i++) {
                            productCodeArr.push(_this.order.itemsSelected[key].productId);
                            orgIdArr.push(res.payload.detail.fwOrgId);
                        }
                    }
                }
                else {
                    return;
                }
                //请求库存
                // let data = {
                //   orgId: orgIdArr.join(','),//组织id
                //   code: productCodeArr.join(','),//产品编码
                //   queryType: 'purchase'//库存查询类型 海信采购
                // }
                // this.methods.getStocks(data).then(res => {
                //   console.log(res)
                //   let totalVolume = 0;
                //   if(res && res.length > 0){
                //     for(const key in res) {
                //       totalVolume += res[key].loadVolume
                //     }
                //   }
                //   this.totalVolume = Math.round(totalVolume * 100) / 100
                //   this.$apply()
                // })
            });
        }
    };
    Preference = __decorate([
        wepy_redux_1.connect({
            order: function (_a) {
                var order = _a.order;
                return order.preferenceOrder;
            },
        }, {
            takePreference: order_1.takePreference,
        })
    ], Preference);
    return Preference;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Preference , 'pages/goods/preference/index'));

