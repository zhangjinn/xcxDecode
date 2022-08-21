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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
var toast_1 = require('./../vant/toast/toast.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var wepy_redux_1 = require('./../../npm/wepy-redux/lib/index.js');
var distributorsorder_1 = require('./../../store/types/distributorsorder.js');
var request_1 = require('./../../utils/request.js');
var index_1 = require('./../../utils/index.js');
var SnappedFilter = /** @class */ (function (_super) {
    __extends(SnappedFilter, _super);
    function SnappedFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            currentPage: String,
            item: Object,
        };
        _this.methods = {
            //转单页面去付款
            goPay: function (item) {
                if (item.discountTypeId == '90603') { //套购
                    // const prdIds = join(',', map(({ id }: any) => id, item.slaveList));
                    var buyNums = ramda_1.join(',', ramda_1.map(function (_a) {
                        var buyNum = _a.buyNum;
                        return buyNum;
                    }, item.slaveList));
                    var prdIds = ramda_1.join(',', ramda_1.map(function (_a) {
                        var actPro = _a.actPro;
                        return actPro.id;
                    }, item.slaveList));
                    wx.navigateTo({
                        url: "/pages/goods/market-activity-order/index?prdIds=" + prdIds + "&buyNums=" + buyNums + "&itemId=" + item.id + "&orderCodeAgain=" + item.orderCode + "&orgId=" + item.actPro.fwOrgId + "&payAgain=true&isRePay=true"
                    });
                }
                else if (item.discountTypeId == '90605') { // 组合购
                    var prdIds1_1 = [];
                    var buyNums1_1 = [];
                    item.slaveList.forEach(function (item) {
                        item.child.forEach(function (val) {
                            prdIds1_1.push(val.actPro.id);
                            buyNums1_1.push(val.buyNum);
                        });
                    });
                    var prdIds2 = prdIds1_1.join(',');
                    var buyNums2 = buyNums1_1.join(',');
                    wx.navigateTo({
                        url: "/pages/goods/market-activity-order/index?prdIds=" + prdIds2 + "&buyNums=" + buyNums2 + "&itemId=" + item.id + "&orderCodeAgain=" + item.orderCode + "&orgId=" + item.actPro.fwOrgId + "&payAgain=true&isRePay=true"
                    });
                }
                else {
                    wx.navigateTo({
                        url: "/pages/goods/market-activity-order/index?prdIds=" + item.actPro.id + "&buyNums=" + item.buyNum + "&itemId=" + item.id + "&orderCodeAgain=" + item.orderCode + "&orgId=" + item.actPro.fwOrgId + "&payAgain=true&isRePay=true"
                    });
                }
            },
            goOrder: function (item) {
                var transferExpireDateDesc = new Date(item.actPro.transferExpireDateDesc.replace(/-/g, "/"));
                var date = transferExpireDateDesc.getTime();
                var now = new Date().getTime();
                var buyNum = item.buyNum - (item.transNum || 0);
                if (date <= now) {
                    item.disabledSubmit = true;
                }
                else {
                    item.disabledSubmit = false;
                }
                // debugger
                if (item.disabledSubmit) {
                    toast_1.default('已过期，不能转单！');
                    return;
                }
                if (item.transFlag == 1) {
                    toast_1.default('该订单已转单！');
                    return;
                }
                if (item.transFlag == 2) {
                    toast_1.default('该订单正在转单中！');
                    return;
                }
                if (item.transFlag == 3) {
                    toast_1.default('未支付订单不能转单！');
                    return;
                }
                if (item.transFlag == 4) {
                    toast_1.default('等待支付结果的订单不能转单！');
                    return;
                }
                //0:未转单 11:部分转单
                if (item.transFlag !== 0 && item.transFlag !== 11) {
                    toast_1.default('只有未转单和部分转单的订单可以转单');
                    return;
                }
                if (item.discountTypeId == '90601' || item.discountTypeId == '90602') {
                    if (buyNum < 1) {
                        toast_1.default('已转单！');
                        return;
                    }
                }
                toast_1.default.loading({
                    forbidClick: true,
                    message: '结算中...',
                });
                var userActId = '';
                var userActivityCode = item.orderCode;
                if (item.slaveList && item.slaveList.length > 0) {
                    var idArr_1 = [];
                    var codeArr_1 = [];
                    if (item.discountTypeId == '90605') { // 组合购
                        item.slaveList.forEach(function (item) {
                            item.child.forEach(function (val) {
                                idArr_1.push(val.id);
                                codeArr_1.push(item.orderCode);
                            });
                        });
                    }
                    else if (item.discountTypeId == '90603') { // 套购
                        for (var _i = 0, _a = item.slaveList; _i < _a.length; _i++) {
                            var e = _a[_i];
                            idArr_1.push(e.id);
                        }
                    }
                    userActId = idArr_1.join(',');
                }
                else {
                    //非套购
                    userActId = item.id;
                }
                request_1.request({ api: "marketActivity/actToOrderInit.nd?userActId=" + userActId, method: 'POST' }).then(function (res) {
                    if (res.isFenXiao == 'Y') {
                        var item_1 = _this.item.actPro;
                        var dmsGoods = res.activityList.map(function (pro) {
                            return {
                                productCode: pro.productInfoId,
                                productName: pro.productName,
                                src: pro.img ? index_1.MarketFormatImg({ img: pro.img }) : pro.img,
                                errImg: pro.defaultImg ? index_1.MarketFormatImg({ defaultImg: pro.defaultImg }) : pro.defaultImg,
                                model: pro.productInfoZzprdmodel,
                                colour: pro.color,
                                invStatusId: '',
                                priceId: '',
                                price: pro.billPrice,
                                orderedQty: buyNum || 1,
                                cartId: '',
                                loadVolume: pro.volume,
                                orgIg: pro.fwOrgId,
                                fwOrgName: pro.fwOrgName,
                                retainer: pro.deposit != null ? pro.deposit : '',
                                discountTypeId: pro.discountTypeId || '',
                                discountTypeName: pro.discountTypeName || '',
                                custTag: pro.custTag || '',
                                packageCode: pro.packageCode || '',
                                rebateMoney: pro.rebateMoney || '',
                                packageNum: pro.packageNum || '',
                                buyNum: buyNum,
                                defaultNum: pro.packageNum ? buyNum / pro.packageNum : '',
                                activityCode: pro.activityCode,
                                productGroupRemark: pro.productGroupRemark,
                                productGroup: pro.productGroup,
                                productInfoZzprdmodel: pro.productInfoZzprdmodel,
                                quantity: pro.buyQty,
                                maxQty: pro.buyQty,
                                buyQty: pro.buyQty,
                                totalNum: pro.totalNum,
                                priceGroupName: pro.priceGroupName,
                                orderCode: pro.orderCode,
                            };
                        });
                        var agentName = res.agentName.split('-');
                        // 模拟数据
                        var item2 = {
                            packageMainNum: res.mainOrderCode || '',
                            orgCode: dmsGoods[0].orgIg,
                            supplierId: agentName[0],
                            matklId: res.matklId,
                            supplierIdName: agentName[1],
                            purchaseOrderItem: dmsGoods,
                            totalVolume: dmsGoods[0].volume,
                        };
                        wepy_redux_1.getStore().dispatch({ type: distributorsorder_1.GET_CART_GOODS_LIST_INFO, payload: item2 });
                        toast_1.default.clear();
                        wx.navigateTo({
                            url: "/pages/goods/distributors-order/index" + '?shareFlag=' + 'Y' + '&activityName=' + item_1.activityName + '&activityNum=' + item_1.activityId + '&userActId=' + userActId + '&userActivityCode=' + userActivityCode
                        });
                    }
                    else {
                        wx.navigateTo({
                            url: "/pages/goods/activity-order/index?userActId=" + userActId
                        });
                    }
                });
            }
        };
        return _this;
    }
    return SnappedFilter;
}(wepy_1.default.component));
exports.default = SnappedFilter;
