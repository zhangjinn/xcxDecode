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
var index_1 = require('./../../../components/pay-confirm/index.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_2 = require('./../../../utils/index.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var distributorsorder_1 = require('./../../../store/actions/distributorsorder.js');
var purchaseshop_2 = require('./../../../store/types/purchaseshop.js');
var cart_1 = require('./../../../store/actions/cart.js');
var distributorsorder_2 = require('./../../../store/types/distributorsorder.js');
var request_1 = require('./../../../utils/request.js');
/* import utilsWxs from '../../../wxs/utils.wxs' */
var index_3 = require('./../../components/select-contact/index.js');
var index_4 = require('./../../components/select-phone/index.js');
var DistributorOrder = /** @class */ (function (_super) {
    __extends(DistributorOrder, _super);
    function DistributorOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '下单确认',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-search': '../../../components/vant/search/index',
                'van-tab': '../../../components/vant/tab/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'van-field': '../../../components/vant/field/index',
                'van-count-down': '../../../components/vant/count-down/index',
                'img': '../../../components/img/index',
                'van-button': '../../../components/vant/button/index',
                'distributors-order-items': '../../../components/distributors-order-items/index',
                'calendar': '../../../components/calendar/index',
                // 'activity-good-info': '../../activity/activity-good-info/index',
                'van-loading': '../../../components/vant/loading/index',
                'item': '../../../components/list-item/index',
                'activity-count-down': '../../../components/activity-count-down/index',
                'van-stepper': '../../../components/vant/stepper/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "selectContact": { "xmlns:v-bind": "", "v-bind:prop.sync": "filterForm" }, "selectPhone": { "v-bind:prop.sync": "filterForm" } };
        _this.$events = {};
        _this.components = {
            payconfrim: index_1.default,
            selectContact: index_3.default,
            selectPhone: index_4.default
        };
        _this.watch = {
            connect: function () {
                if (this.connect && this.connect.phone && this.connect.contact) {
                    this.filterForm = __assign({}, this.filterForm, { contact: this.connect.contact, contactInfo: this.connect.phone });
                    this.$apply();
                }
            },
            // 默认收货地址
            shippingAddress: function () {
                if (this.shippingAddress && this.shippingAddress.length > 0) {
                    this.filterForm = __assign({}, this.filterForm, { shippingAddress: this.shippingAddress[0] });
                    this.$apply();
                    this.methods.getPeoplePhone({
                        sendToId: this.shippingAddress[0].key,
                        _loading: true
                    });
                }
            },
            // 默认结算单位
            settlementUnits: function () {
                if (this.settlementUnits && this.settlementUnits.length > 0) {
                    this.filterForm = __assign({}, this.filterForm, { settlementUnits: this.settlementUnits[0] });
                    this.$apply();
                }
            },
            // 配送方式
            // deliveryTypeList() {
            //   if (this.deliveryTypeList && this.deliveryTypeList.length > 0) {
            //     this.filterForm = { ...this.filterForm, deliveryTypeList: this.deliveryTypeList[0] }
            //     this.$apply()
            //   }
            // }
            // 默认仓库
            inWarehouseList: function () {
                if (this.inWarehouseList && this.inWarehouseList.length > 0) {
                    this.filterForm = __assign({}, this.filterForm, { inWarehouseList: this.inWarehouseList[0] });
                    this.$apply();
                }
            },
        };
        // 声明
        _this.data = {
            listShow: true,
            shareFlag: '',
            activityNum: '',
            activityName: '',
            userActivityCode: '',
            userActId: '',
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            calendarShow: false,
            dmsGoodsId: '',
            filterForm: {
                inWarehouseList: {
                    key: '',
                    value: '请选择'
                },
                deliveryTypeList: {
                    key: '',
                    value: '请选择'
                },
                settlementUnits: {
                    key: '',
                    value: '请选择'
                },
                shippingAddress: {
                    key: '',
                    value: '请选择'
                },
                dmsStockPopup: [],
                documentdata: index_2.formatDate(Date.parse(new Date()), 'Y-M-D'),
                expectDocumentdata: '请选择',
                number: '',
                account: '',
                message: '',
                contact: '',
                contactInfo: ''
            },
            popList: [],
            popTitle: '',
            popVisible: false,
            dmspopVisible: false,
            popFiledName: '',
            compareInfo: {},
            isNoticePopupShow: false,
            expressFee: wepy_1.default.$instance.globalData.expressFee,
            custId: '',
            isAcrossMaterialGroup: false,
        };
        /*  wxs =  */ /* {
           utils: utilsWxs
         } */
        _this.events = {
            'chooseContact': function (payload) {
                _this.filterForm = __assign({}, _this.filterForm, { contact: payload.contact.contact });
                _this.filterForm = __assign({}, _this.filterForm, { contactInfo: payload.contact.phone });
                _this.$apply();
            },
            'choosePhone': function (payload) {
                _this.filterForm = __assign({}, _this.filterForm, { contact: payload.contact.contact });
                _this.filterForm = __assign({}, _this.filterForm, { contactInfo: payload.contact.phone });
                _this.$apply();
            }
        };
        // 页面内交互写在methods里
        _this.methods = {
            //提示框
            noticePopupOpen: function () {
                _this.isNoticePopupShow = true;
            },
            noticePopupClose: function () {
                _this.isNoticePopupShow = false;
            },
            selectStockStats: function (evt) {
                _this.dmsGoodsId = evt.detail.id;
                var dmsselect = [];
                ramda_1.forEach(function (item) {
                    if (item.productCode == evt.detail.id) {
                        _this.dmsStockPopup = item.invStatus;
                        dmsselect = item.selectDms;
                    }
                }, _this.cartGoodInfo.purchaseOrderItem);
                _this.methods.dmsopenChoose('dmsStockPopup', 'dmsStockPopup', '库存状态', dmsselect);
            },
            onShippedBqtyChg: function (evt) {
                _this.cartGoodInfo.number = evt.detail.number;
                _this.cartGoodInfo.totalVolume = evt.detail.totalVolume;
                _this.cartGoodInfo.account = evt.detail.account;
            },
            //促销方式-》套购-》数量变化
            onStepTg: function (evt) {
                var detail = evt.detail;
                var totalMoney = 0;
                var totalNum = 0;
                var totalVolume = 0;
                for (var key in this.cartGoodInfo.purchaseOrderItem) {
                    var price = this.cartGoodInfo.purchaseOrderItem[key].price * this.cartGoodInfo.purchaseOrderItem[key].packageNum;
                    //总金额
                    totalMoney += price * detail;
                    //总数量
                    totalNum += detail * this.cartGoodInfo.purchaseOrderItem[key].packageNum;
                    //总体积
                    totalVolume += detail * this.cartGoodInfo.purchaseOrderItem[key].loadVolume;
                }
                this.cartGoodInfo.purchaseOrderItem[0].defaultNum = detail; //套数
                this.cartGoodInfo.account = totalNum; //总件数
                this.cartGoodInfo.number = totalMoney; //总金额
                this.cartGoodInfo.totalVolume = totalVolume; //总体积
                this.$apply();
            },
            dmsopenChoose: function (propName, fieldName, titleName, dmsselect) {
                var list = _this[propName];
                if (!list) {
                    list = _this.customerInfos[propName];
                }
                if (list.length === 0) {
                    return;
                }
                _this.popList = list;
                _this.compareInfo = dmsselect;
                _this.popFiledName = fieldName;
                _this.popTitle = titleName;
                _this.dmspopVisible = true;
            },
            dmsonChoose: function (_a) {
                var currentTarget = _a.currentTarget;
                var dataset = currentTarget.dataset;
                var index = dataset.index;
                var popList = _this.data.popList;
                ramda_1.forEach(function (item) {
                    if (item.productCode == _this.dmsGoodsId) {
                        item.selectDms = popList[index];
                    }
                }, _this.cartGoodInfo.purchaseOrderItem);
                _this.dmspopVisible = false;
            },
            // 应该获取那个值给popList   应该对比那个字段为选中信息
            openChoose: function (propName, fieldName, titleName) {
                var list = _this[propName];
                if (!list) {
                    list = _this.customerInfos[propName];
                }
                if (list.length === 0) {
                    return;
                }
                _this.popList = list;
                _this.compareInfo = _this.data.filterForm[fieldName];
                _this.popFiledName = fieldName;
                _this.popTitle = titleName;
                _this.popVisible = true;
            },
            onChoose: function (_a) {
                var currentTarget = _a.currentTarget;
                var dataset = currentTarget.dataset;
                var index = dataset.index;
                var _b = _this.data, popFiledName = _b.popFiledName, popList = _b.popList;
                if ('shippingAddress' == popFiledName) {
                    if (popList[index] && popList[index].regionStatus === 'D') { // 判断行政区域地址库是否失效 A有效，D失效。失效的话禁止选择
                        toast_1.default.fail('由于行政区划调整，请您及时更新您的收获地址信息');
                        return false;
                    }
                }
                _this.data.filterForm[popFiledName] = popList[index];
                _this.popVisible = false;
                if (popFiledName == 'shippingAddress') {
                    if (_this.data.filterForm.shippingAddress.key && _this.data.filterForm.shippingAddress.key != 0) {
                        _this.methods.getPeoplePhone({
                            sendToId: _this.data.filterForm.shippingAddress.key,
                            _loading: true
                        });
                    }
                    else {
                        _this.data.filterForm.contact = '';
                        _this.data.filterForm.contactInfo = '';
                    }
                }
            },
            // 构造数组
            mapPurchaseOrderItem: function (list) {
                //套购
                var isTg = false;
                if (_this.cartGoodInfo.purchaseOrderItem[0].discountTypeId == '90603') {
                    isTg = true;
                }
                var setsNumberNew = '';
                var listNew = [];
                if (_this.cartGoodInfo.purchaseOrderItem[0].discountTypeId == '90605') {
                    listNew = index_2.combineObjIntoAnArray(list);
                    var setsNumber = index_2.combinationPurchaseNumberSets(listNew).setsNumber;
                    setsNumberNew = setsNumber; // 组合购认购套数
                }
                var list = ramda_1.map(function (_a) {
                    var id = _a.id, productCode = _a.productCode, productName = _a.productName, model = _a.model, colour = _a.colour, orderedQty = _a.orderedQty, price = _a.price, priceId = _a.priceId, selectDms = _a.selectDms, cartId = _a.cartId, loadVolume = _a.loadVolume, invStatusType = _a.invStatusType, retainer = _a.retainer, packageNum = _a.packageNum, rebateMoney = _a.rebateMoney, productGroupRemark = _a.productGroupRemark, productGroup = _a.productGroup, discountTypeName = _a.discountTypeName, quantity = _a.quantity, orgCode = _a.orgCode;
                    var packageNumNew = list[0].defaultNum || "";
                    // 套购除外-如果是我的抢单进入orderedQtyNew取值this.cartGoodInfo.account 从活动列表进入取值orderedQty
                    var orderedQtyNew = isTg ? packageNum * list[0].defaultNum : (_this.userActId && !_this.custId) ? _this.cartGoodInfo.account : orderedQty;
                    if (discountTypeName == '组合购') {
                        packageNumNew = setsNumberNew;
                        orderedQtyNew = quantity;
                    }
                    var amountNew = ramda_1.multiply(orderedQtyNew, price);
                    return {
                        id: id,
                        productCode: productCode,
                        productName: productName,
                        model: model,
                        colour: colour,
                        invStatusId: selectDms.key,
                        orderedQty: orderedQtyNew,
                        price: price,
                        priceId: priceId,
                        amount: amountNew,
                        cartId: cartId,
                        retainer: retainer,
                        invStatusType: '',
                        loadVolume: loadVolume,
                        packageNum: packageNumNew,
                        packageRateNum: packageNum || "",
                        rebateMoney: rebateMoney || "",
                        productGroupRemark: productGroupRemark,
                        productGroup: productGroup,
                        orgCode: orgCode,
                    };
                }, list || []);
                // 过滤购买数量为0的产品
                var listNew = [];
                list.forEach(function (item) {
                    if (item.orderedQty > 0) {
                        listNew.push(item);
                    }
                });
                return listNew;
            },
            // 检查参数
            checkParam: function () {
                var _a = _this.data.filterForm, inWarehouseList = _a.inWarehouseList, settlementUnits = _a.settlementUnits, shippingAddress = _a.shippingAddress, contact = _a.contact, contactInfo = _a.contactInfo, deliveryTypeList = _a.deliveryTypeList;
                var purchaseOrderItem = _this.cartGoodInfo.purchaseOrderItem;
                // if (inWarehouseList.key == '' && this.shareFlag != 'Y') {
                //   Toast.fail('请选择入库仓库')
                //   return false
                // }
                //TODO：//结算单位去掉已经和后端确认
                // if (settlementUnits.key == '') {
                //   Toast.fail('请选择结算单位')
                //   return false
                // }
                /*if (contact == '') {
                  Toast.fail('请输入联系人')
                  return false
                }
                if (!checkPhone(trim(contactInfo))) {
                  Toast('请输入正确的联系方式');
                  return false;
                }
                if (!shippingAddress.key || shippingAddress.key == '') {
                  Toast.fail('请选择收货地址')
                  return false
                }*/
                if (!shippingAddress.key || shippingAddress.key == '') {
                    toast_1.default.fail('请选择收货地址');
                    return false;
                }
                if (purchaseOrderItem.length == 0) {
                    toast_1.default.fail('商品数量不能为空');
                    return false;
                }
                if (deliveryTypeList.key == '' && deliveryTypeList) {
                    toast_1.default.fail('请选择配送方式');
                    return false;
                }
                var dms = true;
                // forEach((item) => {
                //   if (item.selectDms.key == '' || item.selectDms.value == '请选择库存状态') {
                //     dms = false
                //     return
                //   }
                // }, purchaseOrderItem)
                if (!dms) {
                    toast_1.default.fail('请选择库存状态');
                    return false;
                }
                return true;
            },
            // 拉起输入密码
            confirmSaveOrder: function () {
                var _this = this;
                if (this.cartGoodInfo.purchaseOrderItem.length == 0 || (this.cartGoodInfo.purchaseOrderItem[0].discountTypeId == '90603' && this.cartGoodInfo.purchaseOrderItem[0].defaultNum == 0)) {
                    return;
                }
                if (this.cartGoodInfo.discountTypeName == '组合购' && !this.cartGoodInfo.isPurchaseStandard) {
                    toast_1.default('不符合组合购比例，请重新选择');
                    return;
                }
                if (this.methods.checkParam()) {
                    var number = this.cartGoodInfo.number;
                    this.$invoke('payconfrim', 'show', number, function () {
                        _this.methods.submitOrder();
                    });
                }
            },
            // 提交订单
            submitOrder: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, inWarehouseList, deliveryTypeList, settlementUnits, shippingAddress, documentdata, expectDocumentdata, message, contact, contactInfo, _b, orgCode, supplierId, purchaseOrderItem, account, number, totalVolume, packageMainNum, discountTypeName, purchaseOrderItemInit_1, item, currQuery;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.data.filterForm, inWarehouseList = _a.inWarehouseList, deliveryTypeList = _a.deliveryTypeList, settlementUnits = _a.settlementUnits, shippingAddress = _a.shippingAddress, documentdata = _a.documentdata, expectDocumentdata = _a.expectDocumentdata, message = _a.message, contact = _a.contact, contactInfo = _a.contactInfo;
                            _b = this.cartGoodInfo, orgCode = _b.orgCode, supplierId = _b.supplierId, purchaseOrderItem = _b.purchaseOrderItem, account = _b.account, number = _b.number, totalVolume = _b.totalVolume, packageMainNum = _b.packageMainNum, discountTypeName = _b.discountTypeName;
                            // 组合购恢复成转换之前的数据格式
                            if (discountTypeName == '组合购') {
                                purchaseOrderItemInit_1 = [];
                                purchaseOrderItem.forEach(function (item) {
                                    item.child.forEach(function (val) {
                                        purchaseOrderItemInit_1.push(val);
                                    });
                                });
                                purchaseOrderItem = purchaseOrderItemInit_1;
                            }
                            item = {
                                _loading: true,
                                _ignoreToast: true,
                                cisCode: wepy_1.default.$instance.globalData.cisCode,
                                purchaseOrder: {
                                    documentDate: documentdata,
                                    edt: expectDocumentdata == '请选择' ? documentdata : expectDocumentdata,
                                    orgCode: orgCode,
                                    provinceId: '',
                                    cityId: '',
                                    countryId: '',
                                    townId: '',
                                    contact: contact,
                                    contactInfo: contactInfo,
                                    supplierCode: supplierId,
                                    cisAddressId: shippingAddress.key,
                                    address: shippingAddress.value == '请选择' ? '' : shippingAddress.value,
                                    // billtoId: settlementUnits.key,
                                    userId: this.PurchaseEntrySalesman[0].key || '',
                                    warehouseId: inWarehouseList.key,
                                    totalAmount: number,
                                    totalOrderedQty: account,
                                    message: message,
                                    deliveryMode: deliveryTypeList.key,
                                    //套购所需
                                    discountType: purchaseOrderItem[0].discountTypeId || "",
                                    discountTypeName: purchaseOrderItem[0].discountTypeName || "",
                                    packageCode: purchaseOrderItem[0].packageCode || "",
                                    packageMainNum: packageMainNum,
                                    custTag: purchaseOrderItem[0].custTag || "",
                                    purchaseOrderItem: this.methods.mapPurchaseOrderItem(purchaseOrderItem)
                                }
                            };
                            if (!this.custId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.submitSaveMany(item)];
                        case 1:
                            _c.sent();
                            _c.label = 2;
                        case 2:
                            if (this.activityNum) {
                                item.purchaseOrder.activityNum = purchaseOrderItem[0].activityCode;
                                item.purchaseOrder.activityName = this.activityName;
                                item.purchaseOrder.userActivityCode = this.userActivityCode;
                            }
                            // 分销商向代理商采购接口submitPurchaseOrder迁移到CIS的接口地址 /dmsPurchaseOrder/submit.nd
                            try {
                                // 根据系统参数判断是否迁移接口
                                this.methods.getSysConfig({ key: 'QD_ORDER_SEND_CIS' }).then(function (res) {
                                    var sys = res.payload.data;
                                    if (sys == 'Y') {
                                        _this.methods.setCisDisrtibutorsOrder(item);
                                    }
                                });
                            }
                            catch (e) { }
                            currQuery = null;
                            if (this.isAcrossMaterialGroup) { // 购物车下单 -> 同供应商跨物料组下单
                                currQuery = this.methods.setDisrtibutorsOrderNew(item);
                            }
                            else {
                                currQuery = this.methods.setDisrtibutorsOrder(item);
                            }
                            currQuery.then(function (res) {
                                if (res && res.payload && res.payload.data && res.payload.data.code == '1') {
                                    if (_this.custId) { // 只有代理商活动列表进入下单页调用回滚失败接口
                                        _this.submitTransFlag('fail', item, res);
                                    }
                                    else {
                                        wx.redirectTo({
                                            url: "/pages/goods/order-result/index?type=fail&errorMsg=" + (res.payload.data.msg || res.payload.data.error || '系统错误'),
                                        });
                                    }
                                }
                                else if (res && res.payload && res.payload && res.payload.code == '0') {
                                    ramda_1.map(function (_a) {
                                        var cartId = _a.cartId;
                                        _this.methods.removeCartItem({ cartId: cartId });
                                    }, item.purchaseOrder.purchangeTransFlagchaseOrderItem || []);
                                    if (_this.userActId) { // 代理商活动列表、我的抢单进入下单页调用回滚成功接口
                                        _this.submitTransFlag('success', item, res);
                                    }
                                    else {
                                        wx.redirectTo({
                                            url: "/pages/goods/order-result/index?type=success&goWhere=Y&orderNum=" + res.payload.msg,
                                        });
                                    }
                                }
                                else {
                                    if (_this.custId) { // 只有代理商活动列表进入下单页调用回滚失败接口
                                        _this.submitTransFlag('fail', item, res);
                                    }
                                    else {
                                        wx.redirectTo({
                                            url: "/pages/goods/order-result/index?type=success&goWhere=Y&orderNum=" + res.payload.msg,
                                        });
                                    }
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            }); },
            // 备注
            onDistributorsMessage: function (e) {
                _this.filterForm = __assign({}, _this.filterForm, { message: e.detail });
            },
            onDistributorscontact: function (e) {
                _this.filterForm = __assign({}, _this.filterForm, { contact: e.detail });
            },
            onDistributorscontactInfo: function (e) {
                _this.filterForm = __assign({}, _this.filterForm, { contactInfo: e.detail });
            },
            onClose: function () {
                _this.popVisible = false;
                _this.dmspopVisible = false;
            },
            // 列表收起或下拉
            onListShow: function (value) {
                _this.listShow = value == 'up';
            },
            // 日期弹层
            openChooseDayPopup: function () {
                _this.calendarShow = !_this.calendarShow;
            },
            // 选择日期
            closeCalendar: function () {
                this.calendarShow = false;
            },
            chooseDay: function (evt) {
                var _a = evt.detail, year = _a.year, month = _a.month, day = _a.day;
                var day = year + "-" + index_2.fillZero("" + month) + "-" + index_2.fillZero("" + day);
                this.filterForm = __assign({}, this.filterForm, { expectDocumentdata: day });
                this.calendarShow = false;
            },
            // 组合购步进器加减赋值
            onCombinationPurchaseNumChange: function (e) {
                var _a = e.currentTarget.dataset, seriesindex = _a.seriesindex, itemindex = _a.itemindex;
                this.cartGoodInfo.purchaseOrderItem[seriesindex].child[itemindex].quantity = Number(e.detail);
                this.cartGoodInfo.purchaseOrderItem[seriesindex].child[itemindex].buyNum = Number(e.detail);
                var totalMoney = 0; // 所有组定金总和
                var totalNum = 0; // 所有组购买总数之和
                var totleBuyNum = 0; // 每组购买总数
                this.cartGoodInfo.purchaseOrderItem[seriesindex].child.forEach(function (item) {
                    totleBuyNum += item.quantity;
                });
                this.cartGoodInfo.purchaseOrderItem[seriesindex].totleBuyNum = totleBuyNum;
                this.cartGoodInfo.purchaseOrderItem.forEach(function (item) {
                    totalNum += item.totleBuyNum;
                    item.child.forEach(function (i) {
                        totalMoney += i.price * i.quantity;
                    });
                });
                this.cartGoodInfo.account = totalNum;
                this.cartGoodInfo.number = totalMoney;
                this.cartGoodInfo.isPurchaseStandard = index_2.checkCombinationPurchase(this.cartGoodInfo.purchaseOrderItem);
            },
            // 组合购型号展开收起
            productFold: function (seriesindex) {
                this.cartGoodInfo.purchaseOrderItem[seriesindex].isFold = !this.cartGoodInfo.purchaseOrderItem[seriesindex].isFold;
            },
            // 组合购切换型号
            changeModel: function (e) {
                var _a = e.currentTarget.dataset, seriesindex = _a.seriesindex, itemindex = _a.itemindex;
                this.cartGoodInfo.purchaseOrderItem[seriesindex].child.map(function (item) {
                    item.isActive = false;
                    return item;
                });
                this.cartGoodInfo.purchaseOrderItem[seriesindex].child[itemindex].isActive = true;
                this.cartGoodInfo.purchaseOrderItem[seriesindex] = __assign({}, this.cartGoodInfo.purchaseOrderItem[seriesindex], this.cartGoodInfo.purchaseOrderItem[seriesindex].child[itemindex]);
            },
        };
        return _this;
    }
    // dms提交前发送产品数据并拿到数量回滚接口所需要的接口参数
    DistributorOrder.prototype.submitSaveMany = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var data, prdIds, buyNums, sMany;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {};
                        prdIds = [] // 组合购购买数量，多个逗号隔开
                        ;
                        buyNums = [] // 产品id，逗号隔开和qtys一一对应，取字dms的productCode
                        ;
                        item.purchaseOrder.purchaseOrderItem.forEach(function (order) {
                            if (order.orderedQty != 0) {
                                buyNums.push(order.orderedQty);
                                prdIds.push(order.id);
                            }
                        });
                        data = {
                            prdIds: prdIds.toString(),
                            buyNums: buyNums.toString(),
                            orgId: this.cartGoodInfo.orgCode
                        };
                        return [4 /*yield*/, request_1.request({
                                api: "marketActivity/saveMany.nd",
                                method: 'POST',
                                data: data
                            })];
                    case 1:
                        sMany = _a.sent();
                        if (sMany && sMany.activityList) {
                            this.userActivityCode = sMany.activityList[0].orderCode;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // dms 下单成功、失败、数量回滚
    DistributorOrder.prototype.submitTransFlag = function (type, item, res) {
        // 用于购买数量回滚参数
        var data = {};
        var qtys = []; // 组合购购买数量，多个逗号隔开
        var productIds = []; // 产品id，逗号隔开和qtys一一对应，取字dms的productCode
        item.purchaseOrder.purchaseOrderItem.forEach(function (order) {
            if (order.orderedQty != 0) {
                qtys.push(order.orderedQty);
                productIds.push(order.productCode);
            }
        });
        if (type == 'success') {
            data = {
                dmsOrderCode: res.payload.msg,
                userActivityCodes: item.purchaseOrder.userActivityCode,
                qtys: qtys.toString(),
                productIds: productIds.toString(),
            };
        }
        else {
            data = {
                dmsOrderCode: res.payload.msg,
                userActivityCodes: item.purchaseOrder.userActivityCode,
                transFlag: 'ZF'
            };
        }
        request_1.request({
            api: "marketActivity/changeTransFlag.nd",
            method: "POST",
            data: data,
            callback: function (res1) {
                if (res.payload.code == '0') {
                    wx.redirectTo({
                        url: "/pages/goods/order-result/index?type=success&goWhere=Y&orderNum=" + res.payload.msg,
                    });
                }
                else {
                    wx.redirectTo({
                        url: "/pages/goods/order-result/index?type=fail&errorMsg=" + (res.payload.data.msg || res.payload.data.error || '系统错误'),
                    });
                }
            }
        });
    };
    DistributorOrder.prototype.onShow = function () {
        var _this = this;
        var orgCode = this.cartGoodInfo.orgCode;
        // 重置默认选择
        wepy_redux_1.getStore().dispatch({ type: purchaseshop_2.RESET_DISTRIBUTOR_ORDERS_FILTER, payload: [] });
        // ...TODO:
        var cisCode = wepy_1.default.$instance.globalData.cisCode;
        this.methods.getDmsShopAddress({
            cisCode: cisCode,
            orgId: this.cartGoodInfo.orgCode,
            matklId: this.cartGoodInfo.matklId,
        });
        this.methods.getCartDmsStock({
            productCodes: this.cartGoodInfo.productCodes
        });
        this.methods.getBaseData({
            type: 'cglrrkck',
            orgId: orgCode
        });
        this.methods.getBaseData({
            type: 'cglrjsdw' // 结算单位
        });
        this.methods.getBaseData({
            type: 'cglrshdz' // 收货地址
        });
        this.methods.getBaseData({
            type: 'ywy' // 业务员
        });
        this.methods.getBaseData({
            type: 'cglrywy' // 采购录入业务员
        });
        this.methods.getDeliveryMethod().then(function (res) {
            if (_this.deliveryTypeList && _this.deliveryTypeList.length > 0) {
                _this.filterForm = __assign({}, _this.filterForm, { deliveryTypeList: _this.deliveryTypeList[0] });
                _this.$apply();
            }
        });
    };
    DistributorOrder.prototype.onLoad = function (_a) {
        var _this = this;
        var shareFlag = _a.shareFlag, activityNum = _a.activityNum, activityName = _a.activityName, userActId = _a.userActId, userActivityCode = _a.userActivityCode, custId = _a.custId, isAcrossMaterialGroup = _a.isAcrossMaterialGroup;
        //获取标记 -> 入库仓库是否显示
        this.shareFlag = shareFlag;
        this.activityNum = activityNum;
        this.activityName = activityName;
        this.userActivityCode = userActivityCode;
        this.userActId = userActId; // 活动列表、我的抢单跳转此页都有传值
        this.custId = custId; // 活动列表跳转此页传值
        if (isAcrossMaterialGroup && isAcrossMaterialGroup !== 'undefined') { // 购物车下单是否同供应商跨物料组
            this.isAcrossMaterialGroup = JSON.parse(isAcrossMaterialGroup);
        }
        // 套购
        if (this.cartGoodInfo.purchaseOrderItem[0].discountTypeId == '90603') {
            setTimeout(function () {
                var detail_ = _this.cartGoodInfo.purchaseOrderItem[0].defaultNum || 0;
                var totalMoney = 0;
                var totalNum = 0;
                var totalVolume = 0;
                for (var key in _this.cartGoodInfo.purchaseOrderItem) {
                    var price = _this.cartGoodInfo.purchaseOrderItem[key].price * _this.cartGoodInfo.purchaseOrderItem[key].packageNum;
                    //总金额
                    totalMoney += price * detail_;
                    //总数量
                    totalNum += detail_ * _this.cartGoodInfo.purchaseOrderItem[key].packageNum;
                    //总体积
                    totalVolume += detail_ * _this.cartGoodInfo.purchaseOrderItem[key].loadVolume;
                }
                _this.cartGoodInfo.account = totalNum; //总件数
                _this.cartGoodInfo.number = totalMoney; //总金额
                _this.cartGoodInfo.totalVolume = totalVolume.toFixed(3); //总体积
            }, 1000);
        }
        if (userActId) {
            wx.setNavigationBarTitle({
                title: '去下单'
            });
        }
    };
    DistributorOrder.prototype.onUnload = function () {
        wepy_redux_1.getStore().dispatch({ type: distributorsorder_2.GET_DMS_SHOP_ADDRESS, payload: { list: [] } });
    };
    DistributorOrder = __decorate([
        wepy_redux_1.connect({
            cartGoodInfo: function (_a) {
                var distributorsorder = _a.distributorsorder;
                return distributorsorder.cartGoodInfo;
            },
            listId: function (_a) {
                var activityare = _a.activityare;
                return activityare.listId;
            },
            shippingAddress: function (_a) {
                var distributorsorder = _a.distributorsorder;
                return distributorsorder.shippingAddress;
            },
            connect: function (_a) {
                var distributorsorder = _a.distributorsorder;
                return distributorsorder.connect;
            },
            settlementUnits: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.settlementUnits;
            },
            inWarehouseList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.baseData;
            },
            deliveryTypeList: function (_a) {
                var dmsorder = _a.dmsorder;
                var list = dmsorder.deliveryMode;
                list = list.map(function (item) {
                    for (var key in item) {
                        return {
                            key: item.id,
                            value: item.name
                        };
                    }
                });
                return list;
            },
            user: function (_a) {
                var user = _a.user;
                return user;
            },
            PurchaseEntrySalesman: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.PurchaseEntrySalesman;
            },
            ywyList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.ywyList;
            },
        }, {
            getBaseData: purchaseshop_1.getBaseData,
            getCartDmsStock: distributorsorder_1.getCartDmsStock,
            setDisrtibutorsOrder: distributorsorder_1.setDisrtibutorsOrder,
            setDisrtibutorsOrderNew: distributorsorder_1.setDisrtibutorsOrderNew,
            setCisDisrtibutorsOrder: distributorsorder_1.setCisDisrtibutorsOrder,
            getSysConfig: distributorsorder_1.getSysConfig,
            removeCartItem: cart_1.removeCartItem,
            getDmsShopAddress: distributorsorder_1.getDmsShopAddress,
            getDeliveryMethod: dmsorder_1.getDeliveryMethod,
            getPeoplePhone: distributorsorder_1.getPeoplePhone
        })
    ], DistributorOrder);
    return DistributorOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(DistributorOrder , 'pages/goods/distributors-order/index'));

