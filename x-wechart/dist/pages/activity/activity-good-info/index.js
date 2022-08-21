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
var component_1 = require('./../../../components/vant/common/component.js');
component_1.VantComponent({
    props: {
        timestatus: String,
        item: Object,
        containerItem: Object,
        mark: String,
    },
    data: {
        itemSelect: false,
        goodNumber: 1,
    },
    methods: {
        // 公共方法 向父组件发送商品的最新状态
        trigger: function () {
            // TODO: 存放下单的必要信息 emit到父组件里面
            var _a = this.data, item = _a.item, itemSelect = _a.itemSelect, goodNumber = _a.goodNumber;
            var detail = {
                id: item.id,
                itemSelect: itemSelect,
                number: goodNumber
            };
            this.$emit('goodInfo', detail);
        },
        onChange: function (e) {
            this.setData({
                goodNumber: e.detail,
                itemSelect: true
            });
            this.trigger();
        },
        goodSelect: function () {
            this.setData({
                itemSelect: !this.data.itemSelect
            });
            this.trigger();
        },
        goNext: function (e) {
            var orgDict = this.data.containerItem.orgDict;
            wx.navigateTo({
                url: e.currentTarget.dataset.url + '&orgDict=' + JSON.stringify(orgDict)
            });
        },
        imgLose: function (_a) {
            var detail = _a.detail;
            this.$emit('imgLose', detail);
        },
        // 切换默认显示型号
        changeModel: function (e) {
            var _a = this.data, containerItem = _a.containerItem, mark = _a.mark;
            var detail = {
                activeId: containerItem.id,
                product: e.currentTarget.dataset.item,
                mark: mark,
                modelIndex: e.currentTarget.dataset.index // 当前型号下标
            };
            this.$emit('changeModel', detail);
        },
        // 展示更多型号弹框并传参
        showMoreModel: function (e) {
            var _a = this.data, containerItem = _a.containerItem, item = _a.item, mark = _a.mark;
            item.child = item.child.map(function (child, idx) {
                child.isActive = false;
                if (idx == 0) {
                    child.isActive = true;
                }
                return child;
            });
            var currItem = __assign({}, item, item.child[0]);
            var detail = {
                containerItem: containerItem,
                item: currItem,
                mark: mark,
            };
            this.$emit('showMoreModel', detail);
        }
    }
});
