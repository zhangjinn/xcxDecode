"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../common/component.js');
component_1.VantComponent({
    field: true,
    classes: ['field-class', 'input-class', 'cancel-class'],
    props: {
        label: String,
        focus: Boolean,
        error: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        inputAlign: String,
        showAction: Boolean,
        useActionSlot: Boolean,
        placeholder: String,
        placeholderStyle: String,
        background: {
            type: String,
            value: '#ffffff'
        },
        maxlength: {
            type: Number,
            value: -1
        },
        shape: {
            type: String,
            value: 'square'
        },
        clearable: {
            type: Boolean,
            value: true
        },
        // 去除左侧搜索图标
        leftSearchIconSow: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        onChange: function (event) {
            this.set({ value: event.detail });
            this.$emit('change', event.detail);
        },
        onCancel: function () {
            var _this = this;
            /**
             * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
             * // https://github.com/youzan/vant-weapp/issues/1768
             */
            setTimeout(function () {
                _this.set({ value: '' });
                _this.$emit('cancel');
                _this.$emit('change', '');
            }, 200);
        },
        onSearch: function () {
            this.$emit('search', this.data.value);
        },
        onFocus: function () {
            this.$emit('focus');
        },
        onBlur: function () {
            this.$emit('blur');
        },
        onClear: function () {
            this.$emit('clear');
        },
    }
});
