"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 零售录入、意向录入来源
* */
var component_1 = require('./../../vant/common/component.js');
/*options->[{id:'1', name:'来源111'}],*/
component_1.VantComponent({
    props: {
        options: {
            type: Array,
            default: function () {
                return [];
            }
        },
        activeItem: {
            type: Object,
            default: function () {
                return {
                    id: '',
                    name: ''
                };
            }
        }
    },
    data: {
        sourcePopShow: false,
        sourcePopFormData: {
            name: '',
        },
        popActiveItem: {
            id: '',
            name: ''
        }
    },
    methods: {
        // 表单输入框修改并赋值
        onFieldNameChange: function (event) {
            var detail = event.detail;
            var key = event.currentTarget.dataset.key;
            this.data.sourcePopFormData[key] = detail;
        },
        // 选择用户来源
        onSourceChange: function (event) {
            var _a = event.currentTarget.dataset, option = _a.option, index = _a.index;
            if (option.id == this.data.activeItem.id) {
                option = {
                    id: '',
                    name: ''
                };
            }
            var param = {
                option: option,
                index: index,
            };
            this.$emit('onSourceChange', param);
        },
        // 选择弹框用户来源
        onPopSourceChange: function (event) {
            var _a = event.currentTarget.dataset, option = _a.option, index = _a.index;
            if (option.id == this.data.popActiveItem.id) {
                option = {
                    id: '',
                    name: ''
                };
            }
            this.setData({
                popActiveItem: option,
            });
        },
        // 显示选择来源弹框
        showSourcePop: function () {
            var popActiveItem = JSON.parse(JSON.stringify(this.data.activeItem));
            var sourcePopFormData = {
                name: '',
            };
            this.setData({
                popActiveItem: popActiveItem,
                sourcePopFormData: sourcePopFormData,
                sourcePopShow: true
            });
        },
        // 隐藏选择来源弹框
        hideSourcePop: function () {
            this.setData({
                sourcePopShow: false
            });
        },
        // 保存新增来源
        saveSourcePop: function () {
            var param = this.data.sourcePopFormData;
            param.popActiveItem = this.data.popActiveItem;
            this.$emit('saveSourcePop', param);
            this.hideSourcePop();
        },
    }
});
