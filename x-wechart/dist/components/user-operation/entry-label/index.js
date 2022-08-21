"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 零售录入、意向录入标签
* */
var component_1 = require('./../../vant/common/component.js');
var toast_1 = require('./../../vant/toast/toast.js');
/*props->[{id:'1', name:'新居', active: false}],*/
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
        tagPopShow: false,
        tagPopFormData: {
            tagName: '',
            tagDesc: '',
        },
        tagPopOptions: [],
    },
    methods: {
        // 表单输入框修改并赋值
        onFieldNameChange: function (event) {
            var detail = event.detail;
            var key = event.currentTarget.dataset.key;
            this.data.tagPopFormData[key] = detail;
        },
        // 选择用户标签
        onTagChange: function (event) {
            var _a = event.currentTarget.dataset, option = _a.option, index = _a.index;
            var param = {
                option: option,
                index: index,
            };
            if (!option.active) {
                var allActiveTags = this.data.options.filter(function (item) { return item.active; });
                if (allActiveTags.length >= 8) {
                    toast_1.default.fail('用户选择标签不可超过8个');
                    return false;
                }
            }
            this.$emit('onTagChange', param);
        },
        // 选择弹框里用户标签
        onPopTagChange: function (event) {
            var _a = event.currentTarget.dataset, option = _a.option, index = _a.index;
            var tagPopOptions = this.data.tagPopOptions;
            if (!option.active) {
                var allActiveTags = tagPopOptions.filter(function (item) { return item.active; });
                if (allActiveTags.length >= 8) {
                    toast_1.default.fail('用户选择标签不可超过8个');
                    return false;
                }
            }
            tagPopOptions[index].active = !tagPopOptions[index].active;
            this.setData({
                tagPopOptions: tagPopOptions,
            });
        },
        // 显示选择标签弹框
        showTagPop: function () {
            var tagPopOptions = JSON.parse(JSON.stringify(this.data.options));
            var tagPopFormData = {
                tagName: '',
                tagDesc: '',
            };
            this.setData({
                tagPopOptions: tagPopOptions,
                tagPopFormData: tagPopFormData,
                tagPopShow: true
            });
        },
        // 隐藏选择标签弹框
        hideTagPop: function () {
            this.setData({
                tagPopShow: false
            });
        },
        // 保存新增标签
        saveTagPop: function () {
            var param = this.data.tagPopFormData;
            var allActiveTags = this.data.tagPopOptions.filter(function (item) { return item.active; });
            if (param.tagName !== '') {
                if (allActiveTags.length >= 8) {
                    toast_1.default.fail('用户选择标签不可超过8个');
                    return false;
                }
            }
            param.popOptions = this.data.tagPopOptions;
            this.$emit('saveTagPop', param);
            this.hideTagPop();
        },
    },
});
