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
// 自定义图片样式，传入custom-class
// 图片返回错误以后，如果有默认的图片，则替换成默认图片，并emit一个事件，上层根据事件进行相应处理
// emit 时，会将flag和src传递上去
component_1.VantComponent({
    props: {
        flag: String,
        src: String,
        errSrc: String,
        lazyLoad: Boolean,
        mode: {
            type: String,
            default: 'scaleToFill'
        }
    },
    methods: {
        onerror: function () {
            if (this.data.errSrc) {
                this.setData(__assign({}, this.data, { src: this.data.errSrc, errSrc: '' }));
            }
            // 替换以后的src
            this.$emit('lose', {
                src: this.data.src,
                flag: this.data.flag || this.data.src
            });
        }
    }
});
