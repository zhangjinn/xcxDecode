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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var design_1 = require('./../../../store/actions/design.js');
var MAPS = {
    '4': 'engineeringZone',
    '5': 'specialZone',
    '6': 'buyoutZone',
};
var Design = /** @class */ (function (_super) {
    __extends(Design, _super);
    function Design() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '海信信天翁',
            navigationBarBackgroundColor: '#ffffff',
            usingComponents: {
                'x-img': '../../../designs/x-img/index',
                'x-thermal-zone': '../../../designs/x-thermal-zone/index',
                'x-swiper': '../../../designs/x-swiper/index',
                'x-goods-card': '../../../designs/x-goods-card/index',
                'x-goods-slider': '../../../designs/x-goods-slider/index',
                'x-title': '../../../designs/x-title/index',
                'x-text': '../../../designs/x-text/index',
                'x-tabs': '../../../designs/x-tabs/index',
                'x-navigation-bar': '../../../designs/x-navigation-bar/index',
                'van-toast': '../../../components/vant/toast/index',
            },
            enablePullDownRefresh: true,
        };
        _this.designId = '';
        _this.id = '';
        _this.data = {
            tabIndex: 0,
            visibelTop: false,
        };
        _this.methods = {
            handleCallback: function (_a) {
                var detail = _a.detail;
                var pageType = detail.pageType;
                // 1-商品，2-政策公告，3-营销活动，4-工程单，5-特惠单，6-套购
                _this.$parent.globalData.zone = MAPS[pageType];
                wx.switchTab({
                    url: '/pages/main/take/index'
                });
            },
            getDesignDataById: function (_a) {
                var detail = _a.detail;
                _this.designId = detail;
                _this.methods.getDesignById(detail);
            },
            // 回到顶部
            scrollToTop: function () {
                wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                });
                _this.visibelTop = false;
            },
            // 监听页面滚动事件
            onPageScroll: throttle_debounce_1.debounce(200, function (_a) {
                var scrollTop = _a.scrollTop;
                if (scrollTop >= 350) {
                    _this.visibelTop = true;
                }
                else {
                    _this.visibelTop = false;
                }
                _this.$apply();
            }),
        };
        return _this;
    }
    Design.prototype.onPullDownRefresh = function () {
        toast_1.default.loading('加载中');
        if (this.id) {
            this.methods.getDesignById(this.id, function (res) {
                toast_1.default.clear();
                wx.stopPullDownRefresh();
                if (res && res.data && res.data.name) {
                    wx.setNavigationBarTitle({
                        title: res.data.name || '海信信天翁',
                    });
                }
            });
        }
    };
    Design.prototype.onLoad = function (_a) {
        var id = _a.id;
        toast_1.default.loading('加载中');
        if (id) {
            this.id = id;
            this.methods.getDesignById(id, function (res) {
                toast_1.default.clear();
                if (res && res.data && res.data.name) {
                    wx.setNavigationBarTitle({
                        title: res.data.name || '海信信天翁',
                    });
                }
            });
        }
    };
    Design = __decorate([
        wepy_redux_1.connect({
            design: function (_a) {
                var design = _a.design;
                return design.other;
            },
        }, {
            getDesignById: design_1.getDesignById,
        })
    ], Design);
    return Design;
}(wepy_1.default.page));
exports.default = Design;
