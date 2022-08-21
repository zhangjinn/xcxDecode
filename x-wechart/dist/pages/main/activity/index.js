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
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var common_1 = require('./../../../mixins/common.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var design_1 = require('./../../../store/actions/design.js');
var request_1 = require('./../../../utils/request.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var MAPS = {
    '4': 'engineeringZone',
    '5': 'specialZone',
    '6': 'buyoutZone',
};
var Activity = /** @class */ (function (_super) {
    __extends(Activity, _super);
    function Activity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '活动',
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
                'no-permission': '../../../components/no-permission/index',
            },
            enablePullDownRefresh: true,
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "活动" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.designId = '';
        _this.data = {
            tabIndex: 0,
            visibelTop: false,
        };
        _this.mixins = [common_1.default];
        _this.watch = {
            configs: function (newValue) {
                if (newValue && newValue.length > 0) {
                    var getActivityById_1 = _this.methods.getActivityById;
                    toast_1.default.loading('加载中');
                    var designData = ramda_1.head(newValue);
                    getActivityById_1(designData.id, function () {
                        toast_1.default.clear();
                    });
                }
            },
        };
        _this.methods = {
            onShareAppMessage: function () {
                var designConfig = _this.configs;
                var tabIndex = _this.tabIndex;
                var imageUrl = "http://3s-static.hisense.com/wechat/1/14722429883/1635993518803_3a9eae942ac64682b0fa7abc50817c0c.jpg";
                if (designConfig && designConfig[tabIndex] && designConfig[tabIndex].shareImgUrl) {
                    imageUrl = designConfig[tabIndex].shareImgUrl;
                }
                return {
                    imageUrl: imageUrl,
                    query: ''
                };
            },
            onItemTap: function (_a) {
                var currentTarget = _a.currentTarget;
                var _b = currentTarget.dataset, id = _b.id, index = _b.index;
                _this.tabIndex = index;
                _this.designId = id;
                _this.methods.getActivityById(id);
            },
            handleCallback: function (_a) {
                var detail = _a.detail;
                // TODO: 456 应该设置单独参数
                var pageType = detail.pageType, value = detail.value, page = detail.page, query = detail.query;
                // 1-商品，2-政策公告，3-营销活动，4-工程单，5-特惠单，6-套购 8-直播
                _this.$parent.globalData.zone = MAPS[pageType];
                // projectApplyCode 工程 reportCode 特惠 packageCode 套购
                if (pageType == 4) {
                    _this.$parent.globalData.projectApplyCode = value;
                }
                if (pageType == 5) {
                    _this.$parent.globalData.reportCode = value;
                }
                if (pageType == 6) {
                    _this.$parent.globalData.packageCode = value;
                }
                if (pageType == 8) {
                    var param = {
                        method: 'live',
                        platform: 'XCX'
                    };
                    request_1.request({
                        api: 'footerNavigationConfig/findByPlatform.nd',
                        method: 'GET',
                        data: param,
                    });
                    wx.navigateTo({
                        url: page + '?' + query + '&custom_params={"ly":1}'
                    });
                    return;
                }
                wx.switchTab({
                    url: '/pages/main/take/index'
                });
            },
            getDesignDataById: function (_a) {
                var detail = _a.detail;
                _this.designId = detail;
                _this.methods.getActivityById(detail);
            },
            tabCallback: function (_a) {
                var detail = _a.detail;
                _this.methods.getTabActivityById(detail.id, detail.designIndex);
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
    Activity.prototype.onPullDownRefresh = function () {
        if (this.isLogin()) {
            var _a = this.methods, getDesignAll_1 = _a.getDesignAll, getActivityById_2 = _a.getActivityById, getActivityDesignData_1 = _a.getActivityDesignData;
            var configList = this.configs || [];
            toast_1.default.loading('加载中');
            // 刷新获取全部配置
            getActivityDesignData_1();
            this.tabIndex = 0;
            if (configList.length > 0) {
                var designData = ramda_1.head(configList);
                getActivityById_2(designData.id, function () {
                    wx.stopPullDownRefresh();
                    toast_1.default.clear();
                });
            }
            else {
                getDesignAll_1(function () {
                    wx.stopPullDownRefresh();
                    toast_1.default.clear();
                });
            }
        }
        // const { getActivityDesignData, getActivityById } = this.methods;
        // if (this.designId) {
        //   getActivityById(this.designId, () => {
        //     wx.stopPullDownRefresh();
        //   });
        // } else {
        //   getActivityDesignData().then(() => {
        //     wx.stopPullDownRefresh();
        //   });
        // }
    };
    Activity.prototype.onUnload = function () {
        this.tabIndex = 0;
        this.designId = '';
    };
    Activity.prototype.onShow = function () {
        // 自定义底部导航栏-如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态
        if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
            this.$wxpage.getTabBar().setData({
                selected: 2
            });
        }
    };
    Activity.prototype.onLoad = function () {
        if (this.isLogin()) {
            var _a = this.methods, getDesignAll_2 = _a.getDesignAll, getActivityById_3 = _a.getActivityById;
            var configList = this.configs || [];
            toast_1.default.loading('加载中');
            if (configList.length > 0) {
                var designData = ramda_1.head(configList);
                getActivityById_3(designData.id, function () {
                    toast_1.default.clear();
                });
            }
            else {
                getDesignAll_2(function () {
                    toast_1.default.clear();
                });
            }
        }
    };
    Activity = __decorate([
        wepy_redux_1.connect({
            configs: function (_a) {
                var design = _a.design;
                return design.config;
            },
            tabs: function (_a) {
                var design = _a.design;
                return design.tabs;
            },
            design: function (_a) {
                var design = _a.design;
                return design.activity;
            },
        }, {
            getActivityDesignData: design_1.getActivityDesignData,
            getActivityById: design_1.getActivityById,
            getDesignAll: design_1.getDesignAll,
            getTabActivityById: design_1.getTabActivityById
        })
    ], Activity);
    return Activity;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Activity , 'pages/main/activity/index'));

