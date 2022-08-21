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
component_1.VantComponent({
    props: {
        timestatus: String,
        item: Object,
        userActId: String,
        custId: String // 是否是从活动列表代理商下发活动下的单（有值 是，没值 不是）
    },
    data: {
        orderedQty: 0
    },
    watch: {
        'item': function (newValue, oldValue) {
            // this.$emit('onShippedBqtyChg', {
            //   account: detail,
            //   totalVolume:new Number(this.properties.item.loadVolume*detail).toFixed(3),
            //   number: this.properties.item.price*detail
            // })
        }
    },
    mounted: function () {
        var detail = this.properties.item.orderedQty;
        this.set({ orderedQty: detail });
        if (this.properties.userActId && !this.properties.custId) {
            this.$emit('onShippedBqtyChg', {
                account: detail,
                totalVolume: new Number(this.properties.item.loadVolume * detail).toFixed(3),
                number: this.properties.item.price * detail
            });
        }
    },
    methods: {
        selectStockStats: function () {
            this.$emit('selectStockStats', {
                id: this.data.item.productCode
            });
        },
        onShippedBqtyChg: function (evt) {
            var detail = evt.detail;
            this.set({ orderedQty: detail });
            // this.properties.item.orderedQty = detail
            this.$emit('onShippedBqtyChg', {
                account: detail,
                totalVolume: new Number(this.properties.item.loadVolume * detail).toFixed(3),
                number: this.properties.item.price * detail
            });
        },
        onerror: function () {
            if (this.data.errSrc) {
                this.setData(__assign({}, this.data, { src: this.data.errSrc, errSrc: '' }));
            }
            // 替换以后的src
            this.$emit('lose', {
                src: this.data.src,
                flag: this.data.flag
            });
        },
        imgLose: function (_a) {
            var detail = _a.detail;
            this.$emit('imgLose', detail);
        }
    }
});
