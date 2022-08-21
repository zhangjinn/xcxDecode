"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../../../components/vant/common/component.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var request_1 = require('./../../../utils/request.js');
var index_1 = require('./../../../utils/index.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var distributorsorder_1 = require('./../../../store/types/distributorsorder.js');
component_1.VantComponent({
    props: {
        timestatus: String,
        containerItem: Object,
    },
    data: {
        show: true,
        allGoodsInfo: [],
    },
    methods: {
        // 抢购去下单  跳转下单页
        submitOrder: function (e) {
            var allGoodsInfo = this.data.allGoodsInfo;
            var discountTypeName = this.data.containerItem.discountTypeName;
            var custId = this.data.containerItem.custId;
            if (discountTypeName == '套购' || discountTypeName == '跨品类套购' || discountTypeName == '组合购') {
                var _a = this.data.containerItem, productDtoList = _a.productDtoList, orgDict = _a.orgDict, fwOrgId = _a.fwOrgId;
                if (e.currentTarget.dataset && e.currentTarget.dataset.setpurchase) {
                    productDtoList = e.currentTarget.dataset.setpurchase;
                }
                if (discountTypeName == '组合购') {
                    var combinationPurchaseList_1 = [];
                    if (e.currentTarget.dataset && e.currentTarget.dataset.setpurchase) {
                        e.currentTarget.dataset.setpurchase.forEach(function (item) {
                            item.child.forEach(function (val) {
                                combinationPurchaseList_1.push(val);
                            });
                        });
                    }
                    productDtoList = combinationPurchaseList_1;
                }
                var prdIds_1 = ramda_1.join(',', ramda_1.map(function (_a) {
                    var id = _a.id;
                    return id;
                }, productDtoList));
                var buyNums = ramda_1.join(',', ramda_1.map(function (_a) {
                    var packageNum = _a.packageNum;
                    return packageNum;
                }, productDtoList));
                if (discountTypeName == '组合购') {
                    buyNums = ramda_1.join(',', ramda_1.map(function () { return 0; }, productDtoList));
                }
                // custId有值为代理商活动，需要跳转到下单页
                if (custId) {
                    toast_1.default.loading({
                        forbidClick: true,
                        message: '加载中...'
                    });
                    request_1.request({
                        api: "marketActivity/settlement.nd?prdIds=" + prdIds_1 + "&buyNums=" + buyNums + "&orgId=" + fwOrgId,
                        method: 'POST',
                        type: 'application/x-www-form-urlencoded'
                    }).then(function (res) {
                        var buyNum = 0;
                        var dmsGoods = res.activityList.map(function (pro) {
                            return {
                                id: pro.id,
                                activityName: pro.activityName,
                                activityId: pro.activityId,
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
                                retainer: pro.deposit || '',
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
                            // packageMainNum:res.mainOrderCode || '',//套购主单号
                            orgCode: res.orgId,
                            supplierId: agentName[0],
                            matklId: res.matklId,
                            supplierIdName: agentName[1],
                            purchaseOrderItem: dmsGoods,
                            totalVolume: dmsGoods[0].volume,
                        };
                        wepy_redux_1.getStore().dispatch({ type: distributorsorder_1.GET_CART_GOODS_LIST_INFO, payload: item2 });
                        wx.navigateTo({
                            url: "/pages/goods/distributors-order/index?shareFlag=Y&activityName=" + dmsGoods[0].activityName + "&activityNum=" + dmsGoods[0].activityId + "&userActId=" + prdIds_1 + "&custId=" + custId
                        });
                        toast_1.default.clear();
                    });
                }
                else {
                    wx.navigateTo({
                        url: "/pages/goods/activity-order/index?prdIds=" + prdIds_1 + "&buyNums=" + buyNums + "&orgDict=" + JSON.stringify(orgDict)
                    });
                }
                return;
            }
            if (allGoodsInfo.length == 0 || ramda_1.findIndex(ramda_1.propEq('itemSelect', true), allGoodsInfo) == -1) {
                toast_1.default.fail('请选择商品');
            }
            else {
                // TODO: 下单页我需要的所有数据
                var relArr_1 = [];
                ramda_1.forEach(function (item) {
                    if (item.itemSelect) {
                        relArr_1.push(item);
                    }
                }, allGoodsInfo);
                var prdIds_2 = ramda_1.join(',', ramda_1.map(function (_a) {
                    var id = _a.id;
                    return id;
                }, relArr_1));
                var buyNums = ramda_1.join(',', ramda_1.map(function (_a) {
                    var number = _a.number;
                    return number;
                }, relArr_1));
                var _b = this.data.containerItem, orgDict = _b.orgDict, fwOrgId = _b.fwOrgId;
                // custId有值为代理商活动，需要跳转到下单页
                if (custId) {
                    toast_1.default.loading({
                        forbidClick: true,
                        message: '加载中...'
                    });
                    request_1.request({
                        api: "marketActivity/settlement.nd?prdIds=" + prdIds_2 + "&buyNums=" + buyNums + "&orgId=" + fwOrgId,
                        method: 'POST',
                        type: 'application/x-www-form-urlencoded'
                    }).then(function (res) {
                        var dmsGoods = res.activityList.map(function (pro) {
                            return {
                                id: pro.id,
                                activityName: pro.activityName,
                                activityId: pro.activityId,
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
                                retainer: pro.deposit,
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
                            };
                        });
                        var agentName = res.agentName.split('-');
                        // 模拟数据
                        var item2 = {
                            // packageMainNum:res.mainOrderCode || '',//套购主单号
                            orgCode: res.orgId,
                            supplierId: agentName[0],
                            matklId: res.matklId,
                            supplierIdName: agentName[1],
                            purchaseOrderItem: dmsGoods,
                            totalVolume: dmsGoods[0].volume,
                        };
                        wepy_redux_1.getStore().dispatch({ type: distributorsorder_1.GET_CART_GOODS_LIST_INFO, payload: item2 });
                        wx.navigateTo({
                            url: "/pages/goods/distributors-order/index?shareFlag=Y&activityName=" + dmsGoods[0].activityName + "&activityNum=" + dmsGoods[0].activityId + "&userActId=" + prdIds_2 + "&custId=" + custId
                        });
                        toast_1.default.clear();
                    });
                }
                else {
                    wx.navigateTo({
                        url: "/pages/goods/activity-order/index?prdIds=" + prdIds_2 + "&buyNums=" + buyNums + "&orgDict=" + JSON.stringify(orgDict)
                    });
                }
            }
        },
        // 认购去下单  跳转下单页
        submitMarketOrder: function (e) {
            var _a = this.data.containerItem, productDtoList = _a.productDtoList, orgDict = _a.orgDict, discountTypeName = _a.discountTypeName;
            if (discountTypeName == '套购' || discountTypeName == '跨品类套购') {
                if (e.currentTarget.dataset && e.currentTarget.dataset.setpurchase) {
                    productDtoList = e.currentTarget.dataset.setpurchase;
                }
            }
            if (discountTypeName == '组合购') {
                var combinationPurchaseList_2 = [];
                if (e.currentTarget.dataset && e.currentTarget.dataset.setpurchase) {
                    e.currentTarget.dataset.setpurchase.forEach(function (item) {
                        item.child.forEach(function (val) {
                            combinationPurchaseList_2.push(val);
                        });
                    });
                }
                productDtoList = combinationPurchaseList_2;
            }
            if (productDtoList.length == 0) {
                toast_1.default.fail('当前活动没有商品可以购买！');
            }
            else {
                var prdIds = ramda_1.join(',', ramda_1.map(function (_a) {
                    var id = _a.id;
                    return id;
                }, productDtoList));
                var buyNums = ramda_1.join(',', ramda_1.map(function (_a) {
                    var packageNum = _a.packageNum;
                    return packageNum;
                }, productDtoList));
                if (discountTypeName == '组合购') {
                    buyNums = ramda_1.join(',', ramda_1.map(function () { return 0; }, productDtoList));
                }
                wx.navigateTo({
                    url: "/pages/goods/market-activity-order/index?prdIds=" + prdIds + "&buyNums=" + buyNums + "&orgDict=" + JSON.stringify(orgDict)
                });
            }
        },
        // 接受子组件emit上来的商品信息
        goodInfo: function (e) {
            var allGoodsInfo = this.data.allGoodsInfo;
            var allGoodsInfoArr = ramda_1.map(function (item) { return item; }, allGoodsInfo);
            var newItem = ramda_1.findIndex(ramda_1.propEq('id', e.detail.id), allGoodsInfoArr);
            if (newItem == -1) {
                allGoodsInfoArr.push(e.detail);
            }
            else {
                allGoodsInfoArr[newItem] = e.detail;
            }
            this.setData({
                allGoodsInfo: allGoodsInfoArr
            });
        },
        closeItUp: function () {
            this.setData({
                show: !this.data.show
            });
        },
        goNext: function (e) {
            wx.navigateTo({
                url: e.currentTarget.dataset.url
            });
        },
        imgLose: function (_a) {
            var detail = _a.detail;
            this.$emit('imgLose', detail);
        },
        changeModel: function (_a) {
            var detail = _a.detail;
            this.$emit('changeModel', detail);
        },
        // 打开组合购更多型号弹框
        showMoreModel: function (_a) {
            var detail = _a.detail;
            this.$emit('showMoreModel', detail);
        }
    }
});
