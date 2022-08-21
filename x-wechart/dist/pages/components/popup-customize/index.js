"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var PopupCustomize = /** @class */ (function (_super) {
    __extends(PopupCustomize, _super);
    function PopupCustomize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-search': '../../../components/vant/search/index',
            },
        };
        _this.props = {
            options: {
                type: Array,
                default: function () {
                    return [];
                },
            },
            selectedOption: {
                type: Object,
                default: {},
            },
            title: {
                type: String,
                default: '',
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            isSearch: {
                type: Boolean,
                default: false,
            }
        };
        _this.data = {
            show: false,
        };
        _this.methods = {
            onClose: function () {
                this.show = false;
            },
            onShow: function (callback) {
                this.show = true;
                if (callback) {
                    this.callback = callback;
                }
            },
            chooseOption: function (e) {
                var item = e.currentTarget.dataset.item;
                if (this.selectedOption && this.selectedOption.id && item.id == this.selectedOption.id) {
                    this.show = false;
                    return;
                }
                this.$emit('onSelect', item);
            },
            onChange: function (e) {
                var searchValue = e.detail;
                this.$emit('onSearch', searchValue);
            }
        };
        return _this;
    }
    return PopupCustomize;
}(wepy_1.default.component));
exports.default = PopupCustomize;
