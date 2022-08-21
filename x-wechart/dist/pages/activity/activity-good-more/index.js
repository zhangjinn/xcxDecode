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
        // timestatus: String, // 1 未开始 2 进行中 3 已结束
        item: Object,
        containerItem: Object,
        mark: String,
    },
    data: {},
    methods: {
        // 切换默认显示型号
        changePopModel: function (e) {
            var _a = this.data, containerItem = _a.containerItem, mark = _a.mark, item = _a.item;
            item.child = item.child.map(function (child, idx) {
                child.isActive = false;
                if (idx == e.currentTarget.dataset.index) {
                    child.isActive = true;
                }
                return child;
            });
            var currItem = __assign({}, item, e.currentTarget.dataset.child);
            var detail = {
                containerItem: containerItem,
                item: currItem,
                mark: mark
            };
            this.$emit('changePopModel', detail);
        }
    },
});
