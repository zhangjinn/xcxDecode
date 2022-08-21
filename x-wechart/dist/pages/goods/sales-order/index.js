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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var order_1 = require('./../../../store/actions/order.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/pay-confirm/index.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_2 = require('./../../../utils/index.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var OrderCommon = /** @class */ (function (_super) {
    __extends(OrderCommon, _super);
    function OrderCommon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '确认订单',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-button': '../../../components/vant/button/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-search': '../../../components/vant/search/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                'van-checkbox': '../../../components/vant/checkbox/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-submit-bar': '../../../components/vant/submit-bar/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
            },
        };
        _this.type = 'common';
        _this.components = {
            payconfrim: index_1.default,
        };
        _this.attrActionType = '';
        _this.data = {
            billShow: false,
            policyVisible: false,
            currentPolicyProductId: '',
            policyArr: [],
            versions: [],
            day: '',
            calendarShow: false,
            showPolicyMore: false,
            rebateCheckBox: true,
            contactInfo: '',
            address: '',
            contact: '',
            cisAddressId: '',
            customerName: '',
            products: '',
            productNumbers: '',
            orgCode: '',
            customerPurchase: '',
            matklCode: '',
            userActId: '',
            payName: '提交订单',
            payStatus: true,
            payMethods: 'confirmSaveOrder',
            calendarConfig: { theme: 'elegant', onlyShowCurrentMonth: false },
            activityNum: '',
            userActivityCode: ''
        };
        _this.findItem = function (items, productId) {
            return items.find(function (item) { return "" + item.productId === "" + productId; });
        };
        _this.findPolicy = function (policies, id) {
            return policies.find(function (item) { return "" + item.id === "" + id; });
        };
        _this.methods = {
            openChoosePolicy: function (productId) {
                _this.currentPolicyProductId = productId;
                var chooseItem = _this.findItem(_this.order.items, productId);
                var policyArr = _this.common.policies[productId];
                policyArr.forEach(function (policy) { return policy.disabled = chooseItem.quantity > policy.canQuantity; });
                _this.policyArr = policyArr;
                _this.policyVisible = true;
            },
            closePolicy: function () {
                _this.policyVisible = false;
                _this.policyArr = [];
                _this.currentPolicyProductId = '';
            },
            choosePolicy: function (_a) {
                var id = _a.id;
                var item = _this.findItem(_this.order.items, _this.currentPolicyProductId);
                // 想选中的
                var choosePolicy = _this.findPolicy(_this.policyArr, id);
                // 以前选中的
                var preChoosePolicy = item.policy || { price: item.price };
                var index = _this.products.split(',').findIndex(function (it) { return it === "" + _this.currentPolicyProductId || it === _this.currentPolicyProductId; });
                if (choosePolicy.checked) {
                    delete item.policy;
                    _this.versions[index] = '';
                    choosePolicy.checked = false;
                    _this.methods.updateTotalMoney(choosePolicy.price * item.quantity, item.price * item.quantity);
                }
                else {
                    item.policy = choosePolicy;
                    preChoosePolicy.checked = false;
                    choosePolicy.checked = true;
                    _this.versions[index] = id;
                    _this.methods.updateTotalMoney(preChoosePolicy.price * item.quantity, choosePolicy.price * item.quantity);
                }
                _this.policyVisible = false;
            },
            updateTotalMoney: function (oldPrice, newPrice) {
                _this.order.totalMoney = _this.order.totalMoney - oldPrice + newPrice;
            },
            // 选择日期
            openCalendar: function () {
                var _a = this.common, deadMaxDate = _a.deadMaxDate, deadMinDate = _a.deadMinDate;
                if (deadMaxDate && deadMinDate) {
                    var now = index_2.formatDate('', 'Y-M-D');
                    var minDate = index_2.getDateDiff(now, deadMinDate) ? now : deadMinDate;
                    this.$wxpage.calendar.enableArea([minDate, deadMaxDate]);
                    if (!this.day) {
                        var dates = ramda_1.split('-', deadMaxDate);
                        this.$wxpage.calendar.jump(dates[0], parseInt(dates[1], 10), parseInt(dates[2], 10));
                    }
                }
                this.calendarShow = true;
            },
            closeCalendar: function () {
                this.calendarShow = false;
            },
            chooseDay: function (evt) {
                var _a = evt.detail, year = _a.year, month = _a.month, day = _a.day;
                this.day = year + "-" + index_2.fillZero("" + month) + "-" + index_2.fillZero("" + day);
                this.calendarShow = false;
            },
            // 开票户头
            openBill: function () {
                this.billShow = true;
            },
            closeBill: function () {
                this.billShow = false;
            },
            chooseBill: function (item) {
                if (item.id !== this.common.bill.id) {
                    this.common.bill = item;
                }
                this.billShow = false;
            },
            togglePolicy: function () {
                this.showPolicyMore = !this.showPolicyMore;
            },
            onBateChange: function () {
                this.rebateCheckBox = !this.rebateCheckBox;
            },
            onPayChange: function () {
                this.payStatus = !this.payStatus;
                this.payName = this.payStatus ? '提交订单' : '支付';
                this.payMethods = this.payStatus ? 'confirmSaveOrder' : 'confirmWxPay';
                this.$apply();
            },
            confirmSaveOrder: function () {
                var _this = this;
                var _a = this.order, totalMoney = _a.totalMoney, canUseMoney = _a.canUseMoney, rebate = _a.rebate, items = _a.items;
                var Item = [];
                ramda_1.forEach(function (item) {
                    if (item.price == null || item.price < 0) {
                        Item.push(item.productName);
                    }
                }, items);
                if (Item && Item.length > 0) {
                    var name = Item.join(',');
                    toast_1.default(name + "\u672A\u7EF4\u62A4\u4EF7\u683C");
                    return;
                }
                if (this.rebateCheckBox) { //选中
                    if (totalMoney > canUseMoney + rebate) {
                        toast_1.default('账户余额不足');
                        return;
                    }
                }
                else {
                    if (totalMoney > canUseMoney) {
                        toast_1.default('账户余额不足');
                        return;
                    }
                }
                if (this.day == '' && this.common.deadMaxDate == '') {
                    toast_1.default.fail('请选择有效日期');
                    return;
                }
                // const isValidate = this.$invoke('order', 'checkParams');
                if (true) {
                    var totalMoney_1 = this.order.totalMoney;
                    this.$invoke('payconfrim', 'show', totalMoney_1, function () {
                        _this.saveOrder();
                    });
                }
            },
            confirmWxPay: function () {
                var items = this.order.items;
                var Item = [];
                ramda_1.forEach(function (item) {
                    if (item.price == null || item.price < 0) {
                        Item.push(item.productName);
                    }
                }, items);
                if (Item && Item.length > 0) {
                    var name = Item.join(',');
                    toast_1.default(name + "\u672A\u7EF4\u62A4\u4EF7\u683C");
                    return;
                }
                if (this.day == '' && this.common.deadMaxDate == '') {
                    toast_1.default.fail('请选择有效日期');
                    return;
                }
                this.wxPay();
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 微信支付
    OrderCommon.prototype.wxPay = function () {
        var openId = wepy_1.default.$instance.globalData.openid;
        if (!openId) {
            wx.login({
                success: function (wxRes) {
                    if (wxRes.code) {
                        request_1.request({
                            api: "queryCodeInfo.nd?code=" + wxRes.code,
                            callback: function (res) {
                                var openid = res.data.openid;
                                if (openid) {
                                    openId = openid;
                                }
                                else {
                                    toast_1.default.fail('获取code失败');
                                }
                            },
                        });
                    }
                },
                fail: function () {
                    toast_1.default.fail('获取code失败');
                },
            });
        }
        var item = {
            orderType: 'ZG',
            address1: this.common.receiver.id,
            orderRebate: this.rebateCheckBox ? 'Y' : 'N',
            openId: openId,
            payType: 'WX',
            billTo: this.common.bill.id,
            products: this.products,
            productNumbers: this.productNumbers,
            versions: this.versions.join(','),
            address4: this.cisAddressId,
            contact: this.contact,
            mobile: this.contactInfo,
            endDate: this.day == '' ? this.common.deadMaxDate : this.day,
            maxEndDate: this.common.deadMaxDate,
            orgAndGroup: this.common.orgAndGroup,
            orderCode: this.customerPurchase,
            trans: 502005,
        };
        toast_1.default.loading({
            forbidClick: true,
            message: '订单处理中',
            duration: 0,
        });
        var api = 'cart/saveAnotherOrder.nd';
        request_1.request({
            api: api,
            method: 'POST',
            data: item,
            callback: function (res) {
                toast_1.default.clear();
                var data = res.data;
                var payInfo = data.payInfo;
                if (payInfo) {
                    var _a = data.payInfo, timeStamp = _a.timeStamp, nonceStr = _a.nonceStr, paySign = _a.paySign, signType = _a.signType;
                    wx.requestPayment({
                        timeStamp: timeStamp.toString(),
                        nonceStr: nonceStr,
                        package: data.payInfo.package,
                        signType: signType,
                        paySign: paySign,
                        success: function () {
                            wx.navigateTo({
                                url: "/pages/goods/order-result/index?type=success&orderNum=" + data.b2bOrderCode + "&sales=salesOrder",
                            });
                        },
                        fail: function () {
                            var errMsg = '订单支付失败';
                            wx.navigateTo({
                                url: "/pages/goods/order-result/index?&sales=salesOrder&type=fail&errorMsg=" + (errMsg || res.data.error || '系统错误'),
                            });
                        }
                    });
                }
                else {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?&sales=salesOrder&type=fail&errorMsg=" + (data.msg || data.error || '系统错误'),
                    });
                }
            },
        });
    };
    // 余额付款
    OrderCommon.prototype.saveOrder = function () {
        // TODO:
        var openId = wepy_1.default.$instance.globalData.openid;
        if (!openId) {
            wx.login({
                success: function (wxRes) {
                    if (wxRes.code) {
                        request_1.request({
                            api: "queryCodeInfo.nd?code=" + wxRes.code,
                            callback: function (res) {
                                var openid = res.data.openid;
                                if (openid) {
                                    openId = openid;
                                }
                                else {
                                    toast_1.default.fail('获取code失败');
                                }
                            },
                        });
                    }
                },
                fail: function () {
                    toast_1.default.fail('获取code失败');
                },
            });
        }
        var item = {
            orderType: 'ZG',
            address1: this.common.receiver.id,
            orderRebate: this.rebateCheckBox ? 'Y' : 'N',
            openId: openId,
            payType: '',
            billTo: this.common.bill.id,
            products: this.products,
            productNumbers: this.productNumbers,
            versions: this.versions.join(','),
            address4: this.cisAddressId,
            contact: this.contact,
            mobile: this.contactInfo,
            endDate: this.day == '' ? this.common.deadMaxDate : this.day,
            maxEndDate: this.common.deadMaxDate,
            orgAndGroup: this.common.orgAndGroup,
            orderCode: this.customerPurchase,
            trans: 502005,
            activityNum: this.activityNum,
            userActivityCode: this.userActivityCode
        };
        toast_1.default.loading({
            forbidClick: true,
            message: '订单处理中',
            duration: 0,
        });
        var api = 'cart/saveAnotherOrder.nd';
        request_1.request({
            api: api,
            method: 'POST',
            data: item,
            callback: function (res) {
                toast_1.default.clear();
                if (res.data && res.data.b2bOrderCode) {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?type=success&orderNum=" + res.data.b2bOrderCode + "&sales=salesOrder",
                    });
                }
                else {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?&sales=salesOrder&type=fail&errorMsg=" + (res.data.msg || res.data.error || '系统错误'),
                    });
                }
            },
        });
    };
    OrderCommon.prototype.onLoad = function (_a) {
        var products = _a.products, productNumbers = _a.productNumbers, orgCode = _a.orgCode, matklCode = _a.matklCode, contactInfo = _a.contactInfo, address = _a.address, contact = _a.contact, cisAddressId = _a.cisAddressId, customerName = _a.customerName, customerCode = _a.customerCode, customerPurchase = _a.customerPurchase, activityNum = _a.activityNum, userActivityCode = _a.userActivityCode;
        if (products && productNumbers && orgCode && matklCode) {
            this.products = products;
            this.productNumbers = productNumbers;
            this.orgId = orgCode;
            this.matklCode = matklCode;
            this.versions = new Array(this.products.split(',').length);
            // ....
            this.customerPurchase = customerPurchase;
            this.contactInfo = contactInfo;
            this.address = address;
            this.contact = contact;
            this.cisAddressId = cisAddressId;
            this.customerName = customerName;
            this.activityNum = activityNum;
            this.userActivityCode = userActivityCode;
            this.$apply();
            this.methods.getSalesOrderInfo({
                products: products,
                productNumbers: productNumbers,
                orgId: orgCode,
                fxCisCode: customerCode,
                cisAddressId: cisAddressId,
                matklCode: matklCode,
                _loading: true
            }).then(function (res) {
                if (res && res.payload && res.payload.code === 1) {
                    toast_1.default.fail({
                        message: res.payload.msg || '当前订单失效',
                        duration: 3000,
                        onClose: function () {
                            wx.navigateBack();
                        }
                    });
                }
            });
        }
    };
    OrderCommon = __decorate([
        wepy_redux_1.connect({
            order: function (_a) {
                var order = _a.order;
                return order.commonOrder;
            },
            common: function (_a) {
                var order = _a.order;
                return order.common;
            },
        }, {
            getSalesOrderInfo: order_1.getSalesOrderInfo
        })
    ], OrderCommon);
    return OrderCommon;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderCommon , 'pages/goods/sales-order/index'));

