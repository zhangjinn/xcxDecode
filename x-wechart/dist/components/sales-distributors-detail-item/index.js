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
        item: Object,
        productItem: Object,
        itemIndex: String,
    },
    data: {
        itemId: '',
        backnowledgedPrice: '',
        backnowledgedQty: '',
        acknowledgedAmount: '',
        chooseInvShow: false,
    },
    watch: {
        'item': function (item) {
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
                selected: this.data.item.invStatus.selected
            };
            this.$emit('goodInfo', detail);
        },
        // 修改价格
        onChangeFieldPrice: function (e) {
            if (isNaN(+e.detail)) {
                var v = e.detail;
                if (e.detail.startsWith('.')) {
                    v = '0' + e.detail;
                }
                e.detail = v.replace(/(\d+\.\d{0,2})(.*)/, "$1");
            }
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
        onTapStock: function () {
            this.setData({ chooseInvShow: !this.data.chooseInvShow });
        },
        onClose: function () {
            this.setData({ chooseInvShow: false });
        },
        // 选择库存状态
        chooseInv: function (_a) {
            var key = _a.target.dataset.key;
            this.setData({
                item: __assign({}, this.data.item, { invStatus: __assign({}, this.data.item.invStatus, { selected: this.data.item.invStatus.options.filter(function (o) { return o.invStatusId === key; })[0] }) }),
                chooseInvShow: false
            });
            this.trigger();
        },
        quickGratification: function (_a) {
            var type = _a.target.dataset.type;
            this.$emit('quickGratification', {
                type: type,
                itemIndex: this.data.itemIndex
            });
        }
    },
});
