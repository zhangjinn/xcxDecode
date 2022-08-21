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
var toast_1 = require('./../vant/toast/toast.js');
component_1.VantComponent({
    props: {
        goods: Object,
        item: Object
    },
    data: {
        itemId: '',
        backnowledgedPrice: '',
        backnowledgedQty: '',
        acknowledgedAmount: '',
        chooseInvShow: false,
    },
    watch: {
        'goods': function (item) {
            this.setData({
                itemId: item.itemId,
                backnowledgedPrice: item.backnowledgedPrice,
                backnowledgedQty: item.backnowledgedQty,
                acknowledgedAmount: item.acknowledgedAmount
            });
        }
    },
    methods: {
        // 公共方法 向父组件发送商品的最新状态
        trigger: function () {
            // TODO: 存放下单的必要信息 emit到父组件里面
            var _a = this.data, itemId = _a.itemId, backnowledgedQty = _a.backnowledgedQty, acknowledgedAmount = _a.acknowledgedAmount, backnowledgedPrice = _a.backnowledgedPrice;
            var detail = {
                itemId: itemId,
                backnowledgedPrice: backnowledgedPrice,
                backnowledgedQty: backnowledgedQty,
                acknowledgedAmount: acknowledgedAmount,
                selected: this.data.goods.invStatus.selected
            };
            this.$emit('goodInfo', detail);
        },
        // 修改价格
        onChangeFieldPrice: function (e) {
            var backnowledgedQty = this.data.backnowledgedQty;
            var amount = (backnowledgedQty * e.detail).toFixed(2);
            this.setData({
                backnowledgedPrice: e.detail,
                acknowledgedAmount: amount
            });
            this.trigger();
        },
        // 修改数量
        onChangeFieldNumber: function (e) {
            var detail = e.detail;
            var isNumber = /^[0-9]*$/;
            if (isNumber.test(detail)) {
                var backnowledgedPrice = this.data.backnowledgedPrice;
                var amount = (e.detail * backnowledgedPrice).toFixed(2);
                this.setData({
                    backnowledgedQty: e.detail,
                    acknowledgedAmount: amount
                });
                this.trigger();
            }
            else {
                toast_1.default('请输入正确的商品数量');
            }
        },
        // 查看详情
        viewDetail: function () {
            var _a = this.data.item, id = _a.id, orgId = _a.orgId;
            wx.navigateTo({
                url: "/pages/dms/sales-distributors-detail/index?id=" + id + "&orgId=" + orgId
            });
        },
        // 库存选择
        onTapStock: function () {
            this.setData({ chooseInvShow: !this.data.chooseInvShow });
        },
        // 点击关闭
        onClose: function () {
            this.setData({ chooseInvShow: false });
        }
        // 选择库存状态
        ,
        // 选择库存状态
        chooseInv: function (_a) {
            var key = _a.target.dataset.key;
            this.setData({
                goods: __assign({}, this.data.goods, { invStatus: __assign({}, this.data.goods.invStatus, { selected: this.data.goods.invStatus.options.filter(function (o) { return o.invStatusId === key; })[0] }) }),
                chooseInvShow: false
            });
            this.trigger();
        }
    },
});
