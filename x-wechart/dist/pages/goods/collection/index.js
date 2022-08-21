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
var index_1 = require('./../../../utils/index.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var collection_1 = require('./../../../store/actions/collection.js');
var collection_2 = require('./../../../store/types/collection.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '收藏夹',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-search': '../../../components/vant/search/index',
                'van-tab': '../../../components/vant/tab/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'item': '../../../components/list-item/index',
                'container': '../../../components/container/index'
            },
        };
        _this.watch = {
            loadingInfo: function () {
                if (this.loadingInfo.inventory) {
                    this.methods.getCollectionStock(this.loadingInfo.inventory);
                }
                if (this.loadingInfo.price) {
                    this.methods.getCollectionPrice(this.loadingInfo.price);
                }
                if (this.loadingInfo.loadingDms) {
                    this.methods.getCollectionDmsGoodsPrice({ orgId: this.loadingInfo.loadingDms.orgId, productId: this.loadingInfo.loadingDms.productId });
                }
            }
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "收藏" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_2.default,
        };
        _this.data = {
            // 回到顶部
            visibelTop: false,
            scrollTop: 0,
            collectionShow: false,
            catalogId: '',
            groupId: '',
            from: '',
            type: ''
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 页面滚动
            // TODO: 缺一个防抖
            onScroll: function (event) {
                if (event.detail.scrollTop >= 350) {
                    _this.visibelTop = true;
                    if (_this.scrollTop === 0) {
                        _this.scrollTop = event.detail.scrollTop;
                    }
                }
                else {
                    _this.visibelTop = false;
                }
            },
            // 回到顶部
            scrollToTop: function () {
                _this.visibelTop = false;
                _this.scrollTop = 0;
            },
            imgLose: function (_a) {
                var detail = _a.detail;
                wepy_redux_1.getStore().dispatch({ type: collection_2.RESET_COLLECTION_IMG, payload: detail });
            },
        };
        return _this;
    }
    Filter.prototype.onShow = function () {
        if (this.from !== 'cart') {
            this.methods.getCollectionByGroupAndCategory({ catalogId: this.catalogId, groupId: this.groupId, type: this.type });
        }
        else {
            this.methods.getCollectionFromCart({ catalogId: this.catalogId, groupId: this.groupId });
        }
    };
    /**
     *
     * @param from other|cart
     */
    Filter.prototype.onLoad = function (_a) {
        var catalogId = _a.catalogId, groupId = _a.groupId, _b = _a.from, from = _b === void 0 ? 'other' : _b, type = _a.type;
        index_1.getSystemInfo();
        wepy_redux_1.getStore().dispatch({ type: collection_2.RESET_COLLECTION_LOAD, payload: [] });
        this.type = type || '';
        this.catalogId = catalogId || '';
        this.groupId = groupId || '';
        this.from = from;
        if (!type && from !== 'cart') {
            var zyPartInfo = wepy_1.default.$instance.globalData.zyPartInfo;
            var fxPartInfo = wepy_1.default.$instance.globalData.fxPartInfo;
            if ((zyPartInfo.length > 0 && fxPartInfo.length > 0) || (zyPartInfo.length == 0 && fxPartInfo.length == 0)) {
                this.type = '';
            }
            else if (zyPartInfo.length == 0 && fxPartInfo.length > 0) {
                this.type = 1;
            }
            else if (zyPartInfo.length > 0 && fxPartInfo.length == 0) {
                this.type = 2;
            }
        }
        this.$apply();
    };
    Filter.prototype.onUnload = function () {
        wepy_redux_1.getStore().dispatch({ type: collection_2.RESET_COLLECTION_EMPTY, payload: [] });
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            loading: function (_a) {
                var loading = _a.loading;
                return loading.loading;
            },
            loadingInfo: function (_a) {
                var collection = _a.collection;
                return collection.loadingInfo;
            },
            list: function (_a) {
                var collection = _a.collection;
                return collection.list;
            },
        }, {
            getCollectionByGroupAndCategory: collection_1.getCollectionByGroupAndCategory,
            getCollectionFromCart: collection_1.getCollectionFromCart,
            getCollectionPrice: collection_1.getCollectionPrice,
            getCollectionStock: collection_1.getCollectionStock,
            getCollectionDmsGoodsPrice: collection_1.getCollectionDmsGoodsPrice
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/collection/index'));

