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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var distributorsorder_1 = require('./../../../store/types/distributorsorder.js');
var request_1 = require('./../../../utils/request.js');
var index_1 = require('./../../../utils/index.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var _a = wx.getMenuButtonBoundingClientRect(), top = _a.top, height = _a.height;
var OrderResult = /** @class */ (function (_super) {
    __extends(OrderResult, _super);
    function OrderResult() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationStyle: 'custom',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
            },
        };
        _this.data = {
            type: 'success',
            orderNum: '',
            orderNums: [],
            errorMsg: '',
            sys: { top: top, height: height },
            orderType: '',
            goWhere: '',
            activity: '',
            sales: '',
            transferOrderId: '',
        };
        _this.methods = {
            goBack: function (delta) {
                if (delta === void 0) { delta = 1; }
                wx.navigateBack({
                    delta: delta,
                });
            },
            // 认购成功直接去转单
            goToTransfer: function () {
                if (!this.transferOrderId) {
                    return;
                }
                toast_1.default.loading({
                    forbidClick: true,
                    message: '结算中...',
                });
                var userActId = this.transferOrderId;
                request_1.request({ api: "marketActivity/actToOrderInit.nd?userActId=" + userActId, method: 'POST' }).then(function (res) {
                    var uActId = [];
                    var uActIdStr = '';
                    res.activityList.forEach(function (item) {
                        uActId.push(item.id);
                    });
                    uActIdStr = uActId.toString();
                    if (res.isFenXiao == 'Y') {
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
                                orderedQty: pro.buyQty || 1,
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
                                buyNum: pro.buyQty,
                                defaultNum: pro.packageNum ? pro.buyQty / pro.packageNum : '',
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
                                activityName: pro.activityName,
                                activityId: pro.activityId,
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
                        wx.redirectTo({
                            url: "/pages/goods/distributors-order/index" + '?shareFlag=' + 'Y' + '&activityName=' + dmsGoods[0].activityName + '&activityNum=' + dmsGoods[0].activityId + '&userActId=' + uActIdStr + '&userActivityCode=' + dmsGoods[0].orderCode
                        });
                    }
                    else {
                        wx.redirectTo({
                            url: "/pages/goods/activity-order/index?userActId=" + uActIdStr
                        });
                    }
                });
            }
        };
        return _this;
    }
    OrderResult.prototype.onLoad = function (_a) {
        var type = _a.type, orderNum = _a.orderNum, errorMsg = _a.errorMsg, orderType = _a.orderType, goWhere = _a.goWhere, activity = _a.activity, sales = _a.sales, transferOrderId = _a.transferOrderId;
        if (type) {
            this.type = type;
        }
        if (activity) {
            this.activity = activity;
        }
        if (orderNum) {
            this.orderNum = orderNum;
            this.orderNums = orderNum.split(',');
        }
        if (errorMsg) {
            this.errorMsg = errorMsg;
        }
        if (goWhere) {
            this.goWhere = goWhere;
        }
        if (orderType) {
            this.orderType = orderType;
        }
        if (sales) {
            this.sales = sales;
        }
        if (transferOrderId) {
            this.transferOrderId = transferOrderId;
        }
    };
    return OrderResult;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderResult , 'pages/goods/order-result/index'));

