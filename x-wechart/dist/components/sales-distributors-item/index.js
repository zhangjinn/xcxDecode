"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../vant/common/component.js');
var ramda_1 = require('./../../npm/ramda/src/index.js');
var toast_1 = require('./../vant/toast/toast.js');
var dmsrequest_1 = require('./../../store/actions/dmsrequest.js');
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
component_1.VantComponent({
    props: {
        item: Object // 具体商品信息
    },
    data: {
        showPopup: '',
        id: '',
        beDismissed: false,
        reviewConsent: false,
    },
    methods: {
        tranfor: function (list) {
            return ramda_1.map(function (_a) {
                var itemId = _a.itemId, acknowledgedAmount = _a.acknowledgedAmount, backnowledgedPrice = _a.backnowledgedPrice, backnowledgedQty = _a.backnowledgedQty, invStatusId = _a.invStatus.selected.invStatusId;
                return {
                    itemId: itemId,
                    acknowledgedAmount: acknowledgedAmount,
                    backnowledgedPrice: backnowledgedPrice,
                    backnowledgedQty: backnowledgedQty,
                    invStatusId: invStatusId
                };
            }, list || []);
        },
        tryNumber: function (e) {
            var backnowledgedPrice = e.backnowledgedPrice;
            var isNumber = /^[0-9]\d*\,\d*|[0-9]\d*$/;
            return isNumber.test(backnowledgedPrice);
        },
        // 子组件修改信息
        goodInfo: function (e) {
            var detail = e.detail;
            var salesOrderItem = this.data.item.salesOrderItem;
            var itemId = detail.itemId, acknowledgedAmount = detail.acknowledgedAmount, backnowledgedPrice = detail.backnowledgedPrice, backnowledgedQty = detail.backnowledgedQty, selected = detail.selected;
            var newItem = ramda_1.findIndex(ramda_1.propEq('itemId', itemId), salesOrderItem);
            if (newItem !== -1) {
                salesOrderItem[newItem] = __assign({}, salesOrderItem[newItem], { itemId: itemId,
                    acknowledgedAmount: acknowledgedAmount,
                    backnowledgedPrice: backnowledgedPrice,
                    backnowledgedQty: backnowledgedQty, invStatus: __assign({}, salesOrderItem[newItem].invStatus, { selected: selected }) });
            }
        },
        // 审核同意popup同意
        beConsent: function () {
            var _this = this;
            this.setData({
                reviewConsent: false
            });
            var _a = this.data.item, salesOrderItem = _a.salesOrderItem, id = _a.id;
            var account = wepy_1.default.$instance.globalData.account;
            var item = this.tranfor(salesOrderItem);
            if (ramda_1.all(ramda_1.propEq('backnowledgedQty', 0), item)) {
                toast_1.default.fail('商品数量不能全为零');
            }
            else if (ramda_1.findIndex(ramda_1.propEq('backnowledgedPrice', '0'), item) !== -1) {
                toast_1.default.fail('商品价格不能为零');
            }
            else if (ramda_1.findIndex(ramda_1.propEq('backnowledgedPrice', ''), item) !== -1) {
                toast_1.default.fail('商品价格不能为空');
            }
            else if (!ramda_1.all(this.tryNumber, item)) {
                toast_1.default.fail('请输入正确的商品价格');
            }
            else {
                dmsrequest_1.dmsRequest({
                    data: {
                        _loading: true,
                        userAccount: account,
                        salesOrderId: id,
                        changes: item
                    },
                    method: 'examPurchaseOrder'
                }).then(function (res) {
                    if (res && res.code == '0') {
                        toast_1.default.success('审核同意成功');
                    }
                    _this.$emit('distributorsOperation', '');
                });
            }
        },
        // 审核同意popup取消
        cancelConsent: function () {
            this.setData({
                reviewConsent: false
            });
        },
        // 审核同意弹框
        orderConsent: function () {
            this.setData({
                reviewConsent: true
            });
        },
        // 审核驳回
        orderDismissed: function () {
            this.setData({
                beDismissed: true
            });
        },
        // 审核驳回弹框取消
        cancelDismissed: function () {
            this.setData({
                beDismissed: false
            });
        },
        // 审核驳回弹框同意
        beDismissed: function () {
            var _this = this;
            this.setData({
                beDismissed: false
            });
            var id = this.data.item.id;
            var account = wepy_1.default.$instance.globalData.account;
            dmsrequest_1.dmsRequest({
                data: {
                    _loading: true,
                    userAccount: account,
                    salesOrderId: id,
                },
                method: 'rejectPurchaseOrder'
            }).then(function (res) {
                if (res && res.code == '0') {
                    toast_1.default.success('审核驳回成功');
                    _this.$emit('distributorsOperation', '');
                }
            });
        },
        // 查看详情
        viewDetail: function () {
            var _a = this.data.item, id = _a.id, orgId = _a.orgId;
            wx.navigateTo({
                url: "/pages/dms/sales-distributors-detail/index?id=" + id + "&orgId=" + orgId
            });
        }
    }
});
