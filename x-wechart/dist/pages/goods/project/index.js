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
var index_1 = require('./../../../components/pay-confirm/index.js');
var index_2 = require('./../../../components/order/index.js');
var OrderProject = /** @class */ (function (_super) {
    __extends(OrderProject, _super);
    function OrderProject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '工程单确认',
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
                'van-submit-bar': '../../../components/vant/submit-bar/index',
                'calendar': '../../../components/calendar/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "order": { "xmlns:v-bind": "", "v-bind:pageType.sync": "pageType" } };
        _this.$events = {};
        _this.components = {
            order: index_2.default,
            payconfrim: index_1.default,
        };
        _this.projectId = '';
        _this.attrActionType = '';
        _this.data = {
            rebateCheckBox: true,
            extend: true,
            totalVolume: '0.00',
            pageType: 'engineeringArea'
        };
        _this.methods = {
            toggleExtend: function () {
                this.extend = !this.extend;
            },
            onBateChange: function () {
                this.rebateCheckBox = !this.rebateCheckBox;
            },
            chooseItems: function () {
                if (this.order.items.length > 0) {
                    wx.navigateTo({ url: '/pages/goods/project-items/index' });
                }
                else {
                    toast_1.default('当前工程单下暂无商品');
                }
            },
            confirmSaveOrder: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, totalPrice, canUseMoney, totalRebate, rebate, balance, isValidate, totalPrice_1;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this.order, totalPrice = _a.totalPrice, canUseMoney = _a.canUseMoney, totalRebate = _a.totalRebate, rebate = _a.rebate;
                                if (this.rebateCheckBox) {
                                    balance = totalRebate || rebate;
                                    if (totalPrice > canUseMoney + balance) {
                                        toast_1.default('账户余额不足');
                                        return [2 /*return*/];
                                    }
                                }
                                else {
                                    if (totalPrice > canUseMoney) {
                                        toast_1.default('账户余额不足');
                                        return [2 /*return*/];
                                    }
                                }
                                return [4 /*yield*/, this.$invoke('order', 'checkParams')];
                            case 1:
                                isValidate = _b.sent();
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
    OrderProject.prototype.saveOrder = function () {
        var _a = this.order, profitParam = _a.profitParam, sapRebateAccountParam = _a.sapRebateAccountParam, projectApplyCodeParam = _a.projectApplyCodeParam, itemsSelected = _a.itemsSelected, items = _a.items;
        var _b = this.$invoke('order', 'getParams'), trans = _b.trans, billTo = _b.billTo, address1 = _b.address1, contact = _b.contact, mobile = _b.mobile, orderCode = _b.orderCode, maxEndDate = _b.maxEndDate, endDate = _b.endDate, address3 = _b.address3, address4 = _b.address4, address7 = _b.address7, district = _b.district, isAllowAdvancdeliver = _b.isAllowAdvancdeliver, salesShopInfoId = _b.salesShopInfoId, shopLists = _b.shopLists, serviceTypeCodes = _b.serviceTypeCodes, officeId = _b.officeId, salesTypeItem = _b.salesTypeItem;
        // data.orderRebate = this.rebateCheckBox ? 'Y' : 'N';
        toast_1.default.loading({
            forbidClick: true,
            message: '订单处理中',
            duration: 0,
        });
        // count:[{"id":"14170055645","count":"1"},{"id":"14170055646","count":"1"},{}]  //订单明细id和数
        // orderRebate:Y //是否使用返利
        // profit:0//返利比例
        // sapRebateAccount:0.0 // sapRebateAccount
        // id:14170055642
        // transValue:502001 //配送方式默认值
        // projectApplyCode:PR201908270000 //带出的
        // billToId:22565079 //开票户头
        // shipToId:23090839 //请选择收货地址
        // deliveryTypeId:502001 //配送方式
        // countyId:370202000000 //区县
        // address:
        // contact:张春义
        // contactPhone:13561830626
        // purchaseCode:1213
        // maxEndDate:2019-09-28
        // endDate:2019-09-28
        // 选择的商品
        var count = ramda_1.map(function (_a) {
            var product_id = _a.product_id, count = _a.count;
            return ({ id: product_id, count: count });
        }, items);
        if (itemsSelected.length === 0) {
            toast_1.default('请至少选择一个商品');
            return;
        }
        // 工程单参数
        var params = {
            id: this.projectId,
            count: JSON.stringify(count),
            profit: profitParam,
            sapRebateAccount: sapRebateAccountParam,
            projectApplyCode: projectApplyCodeParam,
            transValue: trans,
            billToId: billTo,
            shipToId: address1,
            deliveryTypeId: trans,
            contact: contact,
            contactPhone: mobile,
            purchaseCode: orderCode,
            maxEndDate: maxEndDate,
            endDate: endDate,
            orderRebate: this.rebateCheckBox ? 'Y' : 'N',
            salesShopInfoId: salesShopInfoId,
            serviceTypeCodes: serviceTypeCodes,
            officeId: officeId,
        };
        if (district) {
            params.countyId = district;
            params.address = address3;
        }
        if (trans == 502005) {
            params.fxShipToAddress = address4; // 分销商地址
            params.fxShipToId = address7;
        }
        if (isAllowAdvancdeliver) {
            params.isAllowAdvancdeliver = isAllowAdvancdeliver;
        }
        if (shopLists) {
            params.ifDistributionSales = shopLists.ifDistributorShop; // 是否分销销售(工程订单直配到用户时选择的下拉地址是否是分销商门店 "1":是，"0":否)
            params.fxShipToId = shopLists.customerInfoId;
        }
        // 直配到用户，销售类型传参
        if (trans === 502004) {
            params.projectSalesTypeId = salesTypeItem.id;
        }
        request_1.request({
            api: 'engineering/saveEngineerOrder.nd',
            method: 'POST',
            data: params,
            callback: function (res) {
                toast_1.default.clear();
                if (res.data && res.data.b2bOrderCode) {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?type=success&orderNum=" + res.data.b2bOrderCode,
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
    OrderProject.prototype.onLoad = function (_a) {
        var id = _a.id;
        this.projectId = id;
        toast_1.default.loading({
            forbidClick: true,
            message: '加载中',
            duration: 0,
        });
        this.methods.takeProjectOrder({ id: id }, function () {
            toast_1.default.clear();
        }).then(function (res) {
            console.log(res);
            //产品数量是否>0
            var productCodeArr = [];
            var orgIdArr = [];
            if (res.payload.epProjectInfo.epInfoDetail && res.payload.epProjectInfo.epInfoDetail.length > 0) {
                for (var key in res.payload.epProjectInfo.epInfoDetail) {
                    productCodeArr.push(res.payload.epProjectInfo.epInfoDetail[key].product_id);
                    orgIdArr.push(res.payload.orgId);
                }
            }
            else {
                return;
            }
            //请求库存
            var data = {
                orgId: orgIdArr.join(','),
                code: productCodeArr.join(','),
                queryType: 'purchase' //库存查询类型 海信采购
            };
            // this.methods.getStocks(data).then(res => {
            //   console.log(res)
            //   let totalVolume = 0;
            //   if(res && res.length > 0){
            //     for(const key in res) {
            //       totalVolume += res[key].loadVolume
            //     }
            //   }
            //   this.totalVolume = totalVolume
            //   this.$apply()
            // })
        });
    };
    OrderProject = __decorate([
        wepy_redux_1.connect({
            order: function (_a) {
                var order = _a.order;
                return order.projectOrder;
            },
            orderTotalVolume: function (_a) {
                var order = _a.order;
                return order.loadVolume;
            },
        }, {
            takeProjectOrder: order_1.takeProjectOrder,
            getStocks: order_1.getStocks
        })
    ], OrderProject);
    return OrderProject;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderProject , 'pages/goods/project/index'));

