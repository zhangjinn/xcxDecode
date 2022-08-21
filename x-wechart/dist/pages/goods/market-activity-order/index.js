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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var order_1 = require('./../../../store/actions/order.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_market_1 = require('./../../components/order/index-market.js');
var index_1 = require('./../../../components/pay-confirm/index.js');
var index_2 = require('./../../../components/pay-capacity-confirm/index.js');
/* import utilsWxs from '../../../wxs/utils.wxs' */
var index_3 = require('./../../../utils/index.js');
var OrderCommon = /** @class */ (function (_super) {
    __extends(OrderCommon, _super);
    function OrderCommon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '确认认购',
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
                'van-stepper': '../../../components/vant/stepper/index',
                'img': '../../../components/img/index'
            }
        };
        _this.type = 'common';
        _this.components = {
            order: index_market_1.default,
            payconfrim: index_1.default,
            payCapacityConfirm: index_2.default
        };
        _this.attrActionType = '';
        _this.data = {
            showPolicyMore: false,
            rebateCheckBox: true,
            prdIds: '',
            buyNums: '',
            userActId: '',
            payName: '提交订单',
            payStatus: true,
            payMethods: 'confirmWxPay',
            surePopShow: false,
            agreeStatus: false,
            isFenXiao: '',
            payAgain: false,
            itemId: '',
            orderCodeAgain: '',
            packageNum: 1,
            orgDict: {},
            orgList: [],
            orgSelShow: false,
            orgId: '',
            orgName: '',
            // discountTypeName:'',
            isRePay: false,
            order: [],
            imgObj: {
                'nopay': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552736_a9dab37524ab4797a22f7834dfdfe498.png',
            },
        };
        /*  wxs =  */ /* {
           utils: utilsWxs
         } */
        _this.methods = {
            closeOrgSel: function () {
                _this.orgSelShow = false;
            },
            chooseOrg: function (code) {
                _this.orgId = code;
                _this.orgName = _this.orgList.find(function (item) { return item.code === code; }).name;
                _this.isFenXiao = _this.orgList.find(function (item) { return item.code === code; }).desc;
                _this.orgSelShow = false;
            },
            openOrg: function () {
                _this.orgSelShow = true;
            },
            onPackageNumChange: function (evt) {
                var detail = evt.detail;
                _this.packageNum = detail;
                var totalMoney = 0;
                var totalNum = 0;
                for (var key in _this.order.items) {
                    var deposit = _this.order.items[key].deposit;
                    var quantity = _this.order.items[key].quantity;
                    totalMoney += deposit * detail * quantity;
                    totalNum += detail * quantity;
                }
                // totalDeposit
                // totalNum
                _this.order.totalDeposit = totalMoney;
                _this.order.totalNum = totalNum;
                _this.$apply();
            },
            openSurePop: function () {
                _this.surePopShow = true;
            },
            closeSurePop: function () {
                _this.surePopShow = false;
            },
            togglePolicy: function () {
                this.showPolicyMore = !this.showPolicyMore;
            },
            onBateChange: function () {
                this.rebateCheckBox = !this.rebateCheckBox;
            },
            onChange: function (event) {
                _this.agreeStatus = event.detail;
                _this.$apply();
            },
            disAgree: function () {
                _this.agreeStatus = false;
                _this.methods.closeSurePop();
                _this.$apply();
            },
            agree: function () {
                _this.agreeStatus = true;
                _this.methods.closeSurePop();
                _this.methods.confirmWxPay();
                _this.$apply();
            },
            onPayChange: function () {
                this.payStatus = !this.payStatus;
                this.payName = this.payStatus ? '提交订单' : '支付';
                this.payMethods = this.payStatus ? 'confirmSaveOrder' : 'confirmWxPay';
                this.$apply();
            },
            confirmSaveOrder: function () {
                var _this = this;
                if (!this.isRePay && !this.orgName) {
                    return;
                }
                if (this.order.discountTypeName == '组合购' && !this.order.isPurchaseStandard) {
                    toast_1.default('不符合组合购比例，请重新选择');
                    return;
                }
                var _a = this.order, totalMoney = _a.totalMoney, canUseMoney = _a.canUseMoney, rebate = _a.rebate;
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
                var data = this.$invoke('order', 'getParams');
                // 校验收货地址是否存在
                if (!data.address1) {
                    toast_1.default.fail('收货地址不能为空');
                    return;
                }
                if (data.maxEndDate == undefined || data.endDate == undefined) {
                    toast_1.default.fail('请选择有效日期');
                    return;
                }
                var isValidate = this.$invoke('order', 'checkParams');
                if (isValidate) {
                    var totalMoney_1 = this.order.totalMoney;
                    this.$invoke('payconfrim', 'show', totalMoney_1, function () {
                        _this.saveOrder();
                    });
                }
            },
            confirmWxPay: function () {
                if (!_this.isRePay && !_this.orgName) {
                    return;
                }
                if (_this.order.discountTypeName == '组合购' && !_this.order.isPurchaseStandard) {
                    toast_1.default('不符合组合购比例，请重新选择');
                    return;
                }
                var data = _this.$invoke('order', 'getParams');
                if (!_this.agreeStatus && _this.order.totalDeposit > 0 && _this.isFenXiao == "Y") {
                    toast_1.default.fail('请先同意《转款到此代理商》协议!');
                    _this.methods.openSurePop();
                    return;
                }
                // const discountTypeName = this.order.items[0].discountTypeName
                // if(!this.orgId&&this.orgList.length>0){
                //   this.orgSelShow = true
                //   return
                // }
                // 判断分销商是否具有三证合一的执照 先不做
                // const {marketModels} = this.mixinCurrentUser
                // if (marketModels && marketModels.includes('17451')) {
                //   let capacity = true;
                //   // 判断是否有三证合一的资格
                //   if (capacity) {
                //     this.$invoke('payCapacityConfirm', 'show', (str: string) => {
                //       if (str === 'save') {
                //         //调用保存订单的接口
                //       }
                //     })
                //   }
                // }
                _this.wxPay();
            },
            // 组合购步进器加减赋值
            onCombinationPurchaseNumChange: function (e) {
                var _a = e.currentTarget.dataset, seriesindex = _a.seriesindex, itemindex = _a.itemindex;
                this.order.items[seriesindex].child[itemindex].quantity = Number(e.detail);
                var totalMoney = 0; // 所有组定金总和
                var totalNum = 0; // 所有组购买总数之和
                var totleBuyNum = 0; // 每组购买总数
                this.order.items[seriesindex].child.forEach(function (item) {
                    totleBuyNum += item.quantity;
                });
                this.order.items[seriesindex].totleBuyNum = totleBuyNum;
                this.order.items.forEach(function (item) {
                    totalNum += item.totleBuyNum;
                    item.child.forEach(function (i) {
                        totalMoney += i.deposit * i.quantity;
                    });
                });
                this.order.totalDeposit = totalMoney;
                this.order.totalNum = totalNum;
                this.order.isPurchaseStandard = index_3.checkCombinationPurchase(this.order.items);
            },
            // 组合购型号展开收起
            productFold: function (seriesindex) {
                this.order.items[seriesindex].isFold = !this.order.items[seriesindex].isFold;
            },
            // 组合购切换型号
            changeModel: function (e) {
                var _a = e.currentTarget.dataset, seriesindex = _a.seriesindex, itemindex = _a.itemindex;
                this.order.items[seriesindex].child.map(function (item) {
                    item.isActive = false;
                    return item;
                });
                this.order.items[seriesindex].child[itemindex].isActive = true;
                this.order.items[seriesindex] = __assign({}, this.order.items[seriesindex], this.order.items[seriesindex].child[itemindex]);
            },
        };
        return _this;
    }
    // 微信支付
    OrderCommon.prototype.wxPay = function () {
        var _this = this;
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
                            }
                        });
                    }
                },
                fail: function () {
                    toast_1.default.fail('获取code失败');
                }
            });
        }
        toast_1.default.loading({ forbidClick: true, mask: true, message: '抢购中...', duration: 0 });
        var transferOrderId = ''; // 用于移动端认购成功页面按钮调整（增加去转单按钮）
        //付款地址
        var api = '';
        //入参
        var data = {};
        //二次付款
        if (this.payAgain) {
            api = 'marketActivity/payInfo.nd';
            data = {
                id: this.itemId,
                openId: openId
            };
        }
        else {
            //首次付款
            api = 'marketActivity/save.nd';
            data = {
                buyNum: this.buyNums,
                prdId: this.prdIds,
                orgId: this.orgId,
                openId: openId
            };
        }
        var buyNums = this.buyNums.split(',').map(function (it) { return it * _this.packageNum; }).join(',');
        var prdIds = this.prdIds;
        if (this.order.discountTypeName == '组合购') {
            var oPrdIds_1 = [];
            var oBuyNums_1 = [];
            this.order.items.forEach(function (item) {
                item.child.forEach(function (i) {
                    if (i.quantity > 0) {
                        oPrdIds_1.push(i.id);
                        oBuyNums_1.push(i.quantity);
                    }
                });
            });
            prdIds = oPrdIds_1.toString();
            buyNums = oBuyNums_1.toString();
        }
        if (this.order.discountTypeName == '套购' || this.order.discountTypeName == '组合购') {
            if (this.isRePay) {
                api = 'marketActivity/payInfo.nd';
                data = {
                    id: this.itemId,
                    openId: openId
                };
            }
            else {
                api = 'marketActivity/saveMany.nd';
                data = {
                    buyNums: buyNums,
                    prdIds: prdIds,
                    openId: openId,
                    orgId: this.orgId
                };
            }
        }
        request_1.request({ api: api, data: data, method: 'POST', callback: function (res) {
                toast_1.default.clear();
                if (res.data.code == '0') {
                    var data_1 = res.data;
                    if (res.data.data && res.data.data.payInfo && res.data.data.payInfo[0]) {
                        data_1 = res.data.data.payInfo[0];
                    }
                    if (api == 'marketActivity/save.nd') {
                        transferOrderId = res.data.id;
                        if (res.data.data && res.data.data.id) {
                            transferOrderId = res.data.data.id;
                        }
                    }
                    else if (api == 'marketActivity/saveMany.nd') {
                        transferOrderId = res.data.packageMainInfoId;
                        if (res.data.data && res.data.data.packageMainInfoId) {
                            transferOrderId = res.data.data.packageMainInfoId;
                        }
                    }
                    if (data_1 && data_1.payInfo) {
                        var _a = data_1.payInfo, timeStamp = _a.timeStamp, nonceStr = _a.nonceStr, paySign = _a.paySign, signType = _a.signType;
                        wx.requestPayment({
                            timeStamp: timeStamp.toString(),
                            nonceStr: nonceStr,
                            package: data_1.payInfo.package,
                            signType: signType,
                            paySign: paySign,
                            success: function () {
                                var orderCode = _this.payAgain ? _this.orderCodeAgain : data_1.orderCode;
                                if (res.data.data && res.data.data.orderCode) {
                                    orderCode = res.data.data.orderCode;
                                }
                                wx.navigateTo({
                                    url: "/pages/goods/order-result/index?type=success&orderNum=" + orderCode + "&activity=market&orderType=2&transferOrderId=" + transferOrderId
                                });
                            },
                            fail: function () {
                                var errMsg = '订单支付失败';
                                wx.navigateTo({
                                    url: "/pages/goods/order-result/index?&activity=order&type=fail&errorMsg=" + (errMsg || res.data.error || '系统错误')
                                });
                            }
                        });
                        _this.attrPopup = false;
                        _this.$apply();
                    }
                    else {
                        var orderCode = _this.payAgain ? _this.orderCodeAgain : res.data.orderCode;
                        if (res.data.data && res.data.data.orderCode) {
                            orderCode = res.data.data.orderCode;
                        }
                        wx.navigateTo({
                            url: "/pages/goods/order-result/index?type=success&orderNum=" + orderCode + "&activity=market&orderType=2&transferOrderId=" + transferOrderId
                        });
                    }
                }
                else {
                    toast_1.default.fail(res.data.msg);
                }
            }
        }).catch(function (err) {
            wx.showToast({
                title: '请求超时，请稍后重试！',
                duration: 3000,
                icon: 'none',
                mask: false,
            });
        });
    };
    // 余额付款
    OrderCommon.prototype.saveOrder = function () {
        var data = this.$invoke('order', 'getParams');
        var item = {};
        data.orderRebate = this.rebateCheckBox ? 'Y' : 'N';
        toast_1.default.loading({
            forbidClick: true,
            message: '订单处理中',
            duration: 0
        });
        var api = 'marketActivity/saveOrder.nd';
        if (this.userActId != '') {
            api = 'marketActivity/actToOrder.nd';
            item = __assign({}, data, { userActId: this.userActId, actCode: this.order.actCode });
        }
        else {
            item = __assign({}, data, { prdIds: this.prdIds, buyNums: this.buyNums, actCode: this.order.actCode });
        }
        request_1.request({
            api: api,
            method: 'POST',
            data: item,
            callback: function (res) {
                toast_1.default.clear();
                if (res.data && res.data.b2bOrderCode) {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?type=success&orderNum=" + res.data.b2bOrderCode + "&activity=order"
                    });
                }
                else {
                    wx.navigateTo({
                        url: "/pages/goods/order-result/index?&activity=order&type=fail&errorMsg=" + (res.data.msg || res.data.error || '系统错误')
                    });
                }
            }
        });
    };
    OrderCommon.prototype.onLoad = function (_a) {
        var _this = this;
        var prdIds = _a.prdIds, buyNums = _a.buyNums, userActId = _a.userActId, itemId = _a.itemId, orderCodeAgain = _a.orderCodeAgain, payAgain = _a.payAgain, isRePay = _a.isRePay, orgDict = _a.orgDict, orgId = _a.orgId;
        if (orgDict) {
            try {
                this.orgDict = JSON.parse(orgDict);
                this.orgList = [];
                for (var it in this.orgDict) {
                    this.orgList = this.orgDict[it];
                }
            }
            catch (_b) {
                this.orgDict = {};
            }
        }
        this.isRePay = isRePay;
        this.orgId = orgId;
        if (prdIds && buyNums) {
            this.prdIds = prdIds;
            this.buyNums = buyNums;
            //抢单跳转支付
            //二次支付
            if (payAgain) {
                this.payAgain = payAgain;
                this.itemId = itemId;
                this.orderCodeAgain = orderCodeAgain;
            }
            this.$apply();
            this.methods.takeActivityOrderRengou({
                prdIds: prdIds,
                buyNums: buyNums,
                orgId: this.orgId || '',
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
                else {
                    if (_this.isRePay && _this.orgId) {
                        _this.orgName = res.payload.agentName;
                        _this.isFenXiao = res.payload.isFenXiao;
                    }
                    else {
                        if (_this.orgList && _this.orgList.length > 0) {
                            _this.orgId = _this.orgList[0].code;
                            _this.orgName = _this.orgList[0].name;
                            _this.isFenXiao = _this.orgList[0].desc;
                        }
                    }
                    _this.$apply();
                }
            });
        }
        else if (userActId) {
            this.userActId = userActId;
            this.$apply();
            this.methods.takeActivitySnapped({
                userActId: userActId,
                orgId: this.orgId || '',
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
                else {
                    if (_this.isRePay && _this.orgId) {
                        _this.orgName = res.payload.agentName;
                        _this.isFenXiao = res.payload.isFenXiao;
                    }
                    else {
                        if (_this.orgList && _this.orgList.length > 0) {
                            _this.orgId = _this.orgList[0].code;
                            _this.orgName = _this.orgList[0].name;
                            _this.isFenXiao = _this.orgList[0].desc;
                        }
                    }
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
            mixinCurrentUser: function (_a) {
                var user = _a.user;
                return user.info || {};
            }
        }, {
            takeActivityOrder: order_1.takeActivityOrder,
            takeActivitySnapped: order_1.takeActivitySnapped,
            takeActivityOrderRengou: order_1.takeActivityOrderRengou
        })
    ], OrderCommon);
    return OrderCommon;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderCommon , 'pages/goods/market-activity-order/index'));

