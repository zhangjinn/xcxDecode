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
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            usingComponents: {
                'van-search': '../../../../components/vant/search/index',
            },
        };
        _this.props = {
            tabList: {
                type: Array,
                default: function () {
                    return [
                        {
                            name: '未读',
                            count: 0
                        },
                        {
                            name: '已读',
                            count: 0
                        },
                    ];
                },
            },
            tabActive: {
                type: String || Number,
                default: 0,
            },
            showTab: {
                type: Boolean,
                default: true,
            },
            showSearch: {
                type: Boolean,
                default: true,
            },
            activeLineStyle: {
                type: Object,
                default: function () {
                    return {
                        width: '32rpx',
                        height: '8rpx'
                    };
                },
            }
        };
        _this.externalClasses = ['custom-class']; // 外部传入class类
        _this.data = {
            searchKey: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            changeTab: function (oIndex) {
                this.$emit('tabChange', {
                    tabActive: oIndex,
                });
                this.$apply();
            },
            onChange: function (e) {
                _this.searchKey = e.detail;
                _this.$emit('searchChange', {
                    searchKey: _this.searchKey,
                });
            },
            onCancel: function () {
                _this.searchKey = '';
                _this.$emit('searchChange', {
                    searchKey: _this.searchKey,
                });
            },
            onSearch: function () {
                _this.$emit('searchChange', {
                    searchKey: _this.searchKey,
                });
            },
        };
        return _this;
    }
    return default_1;
}(wepy_1.default.component));
exports.default = default_1;
