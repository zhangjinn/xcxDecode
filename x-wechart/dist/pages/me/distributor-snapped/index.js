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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var index_1 = require('./../../../components/my-snapped-filter/index.js');
var index_2 = require('./../../../components/my-snapped-item/index.js');
var index_3 = require('./../../../components/empty-data-type/index.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var activityare_1 = require('./../../../store/actions/activityare.js');
var DistributorSnapped = /** @class */ (function (_super) {
    __extends(DistributorSnapped, _super);
    function DistributorSnapped() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '分销的认购',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-icon": "/components/vant/icon/index",
                "img": "/components/img/index",
                "van-overlay": "/components/vant/overlay/index",
                'calendar': '/components/calendar/index',
                'van-field': '/components/vant/field/index',
                'van-toast': '/components/vant/toast/index'
            },
        };
        // filterParam: PagingActivityResultParams = {
        _this.filterParam = {
            type: 'FX',
            // status: '',
            startDate: '',
            endDate: '',
            activityName: '',
            productModel: '',
            matkl: '',
            orgId: '',
            custName: '',
            pageNo: 1,
            pageSize: 20
        };
        _this.data = {
            currentPage: 'distributor',
            visibelTop: false,
            scrollPosition: 0,
        };
        _this.$repeat = { "pagingActivityResult": { "com": "item", "props": "item" } };
        _this.$props = { "item": { "xmlns:v-bind": { "value": "", "for": "pagingActivityResult.list", "item": "item", "index": "index", "key": "{{ item.id }}" }, "v-bind:currentPage.once": { "value": "currentPage", "for": "pagingActivityResult.list", "item": "item", "index": "index", "key": "{{ item.id }}" }, "v-bind:item.once": { "value": "item", "type": "item", "for": "pagingActivityResult.list", "item": "item", "index": "index", "key": "{{ item.id }}" } }, "filter": { "v-bind:currentPage.once": "currentPage", "xmlns:v-on": "" }, "emptyDataType": { "description": "抢购" } };
        _this.$events = { "filter": { "v-on:submitFilter": "submitFilter" } };
        _this.components = {
            filter: index_1.default,
            item: index_2.default,
            emptyDataType: index_3.default,
        };
        // test: 'xxx';
        _this.methods = {
            loadNextPage: function () {
                var filterParam = _this.filterParam;
                if (_this.pagingActivityResult.total <= filterParam.pageNo * filterParam.pageSize) {
                    return;
                }
                _this.filterParam.pageNo++;
                var pagingActivityResult = _this.methods.pagingActivityResult;
                pagingActivityResult(__assign({}, _this.filterParam, { type: 'FX' }));
            },
            // 提交搜索
            submitFilter: function (param) {
                _this.filterParam = __assign({}, param, { pageNo: 1, pageSize: 20 });
                var pagingActivityResult = _this.methods.pagingActivityResult;
                pagingActivityResult(__assign({}, _this.filterParam, { type: 'FX' }));
            },
            openFilter: function () {
                _this.$invoke('filter', 'openDrawer');
            },
            closeFilter: function () {
                _this.data.$filter$filterVisible = false;
            },
            onScroll: function (event) {
                if (event.detail.scrollTop >= 350) {
                    _this.visibelTop = true;
                    if (_this.scrollPosition === 0) {
                        _this.scrollPosition = event.detail.scrollTop;
                    }
                }
                else {
                    _this.visibelTop = false;
                }
            },
            scrollToTop: function () {
                _this.scrollPosition = 0;
                _this.visibelTop = false;
            }
        };
        return _this;
    }
    DistributorSnapped.prototype.onLoad = function () {
        var pagingActivityResult = this.methods.pagingActivityResult;
        pagingActivityResult(__assign({}, this.filterParam, { type: 'FX' }));
    };
    DistributorSnapped.prototype.onUnload = function () {
        this.filterParam = {
            type: 'FX',
            // status: '',
            startDate: '',
            endDate: '',
            activityName: '',
            productModel: '',
            matkl: '',
            orgId: '',
            custName: '',
            pageNo: 1,
            pageSize: 20
        };
    };
    DistributorSnapped = __decorate([
        wepy_redux_1.connect({
            loading: function (_a) {
                var loading = _a.loading;
                return loading.loading;
            },
            pagingActivityResult: function (_a) {
                var activityare = _a.activityare;
                return activityare.pagingActivityResult;
            }
        }, {
            pagingActivityResult: activityare_1.pagingActivityResult
        })
    ], DistributorSnapped);
    return DistributorSnapped;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(DistributorSnapped , 'pages/me/distributor-snapped/index'));

