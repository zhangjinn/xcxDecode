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
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var inventory_1 = require('./../../../store/actions/inventory.js');
var inventory_2 = require('./../../../store/types/inventory.js');
var OrderCommon = /** @class */ (function (_super) {
    __extends(OrderCommon, _super);
    function OrderCommon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '分销商库存查询',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-button': '../../../components/vant/button/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-search': '../../../components/vant/search/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                'van-checkbox': '../../../components/vant/checkbox/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-submit-bar': '../../../components/vant/submit-bar/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "产品" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            inputValue: '',
            onShow: false,
            filterForm: {
                model: '',
                colour: '',
                dealerName: '',
                pageNo: 1
            },
            dealerNameOptionShow: false,
            currentDealerNameId: '',
            dealerNameOptionList: [],
            dealerNameOptionListInit: []
        };
        _this.methods = {
            // 产品型号
            onGoodsModel: function (e) {
                _this.filterForm = __assign({}, _this.filterForm, { model: e.detail });
            },
            // 产品颜色
            onGoodsColor: function (e) {
                _this.filterForm = __assign({}, _this.filterForm, { colour: e.detail });
            },
            // 产品名称
            onShopName: function (e) {
                var searchVal = e.detail;
                _this.filterForm.dealerName = searchVal;
                var newListData = []; //  用于存放搜索出来数据的新数组
                _this.dealerNameOptionListInit.filter(function (item) {
                    if (item.name.toLowerCase().indexOf(searchVal) !== -1) {
                        newListData.push(item);
                    }
                });
                _this.dealerNameOptionList = newListData;
            },
            // 商家模糊搜索
            selectOptionItem: function (item) {
                this.currentDealerNameId = item.id;
                this.filterForm.dealerName = item.name;
                this.dealerNameOptionShow = false;
                this.$apply();
            },
            onShopFocus: function (e) {
                var searchVal = e.detail.value;
                var newListData = []; // 用于存放搜索出来数据的新数组
                this.dealerNameOptionListInit.filter(function (item) {
                    if (item.name.toLowerCase().indexOf(searchVal) !== -1) {
                        newListData.push(item);
                    }
                });
                this.dealerNameOptionList = newListData;
                this.dealerNameOptionShow = true;
                this.$apply();
            },
            onShopBlur: function () {
                this.dealerNameOptionShow = false;
                this.$apply();
            },
            // 查询
            onQueryInventory: function () {
                _this.filterForm = __assign({}, _this.filterForm, { pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: inventory_2.RESET_DISTRIBUTOR_INVENTORY_INQUIRY, payload: [] });
                _this.onShow = true;
                _this.myGetDistributorList();
            },
            onGetDistributorNext: function () {
                if (_this.distributorTotalPage > _this.filterForm.pageNo) {
                    _this.filterForm = __assign({}, _this.filterForm, { pageNo: _this.filterForm.pageNo + 1 });
                    _this.myGetDistributorList();
                }
            },
        };
        return _this;
    }
    OrderCommon.prototype.myGetDistributorList = function () {
        this.methods.getDistributorInventoryInquiry({
            _loading: true,
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            terms: {
                model: this.filterForm.model,
                colour: this.filterForm.colour,
                dealerName: this.filterForm.dealerName,
            },
            page: { pageNo: this.filterForm.pageNo, pageSize: 10 }
        });
    };
    OrderCommon.prototype.onShow = function () {
        var _this = this;
        this.methods.getDistributorType({
            field: "customerCode",
            formCode: "dmsInventoryHisenseCondition",
        }).then(function (res) {
            var data = res.payload.data;
            _this.dealerNameOptionListInit = [];
            _this.dealerNameOptionListInit = data.map(function (item) {
                return {
                    id: item.code,
                    name: item.name
                };
            });
        });
    };
    OrderCommon.prototype.onUnload = function () {
        wepy_redux_1.getStore().dispatch({ type: inventory_2.RESET_DISTRIBUTOR_INVENTORY_INQUIRY, payload: [] });
    };
    OrderCommon = __decorate([
        wepy_redux_1.connect({
            distributorInventoryList: function (_a) {
                var inventory = _a.inventory;
                return inventory.distributorInventoryList;
            },
            distributorTotalPage: function (_a) {
                var inventory = _a.inventory;
                return inventory.distributorTotalPage;
            },
        }, {
            getDistributorInventoryInquiry: inventory_1.getDistributorInventoryInquiry,
            getDistributorType: inventory_1.getDistributorType
        })
    ], OrderCommon);
    return OrderCommon;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderCommon , 'pages/goods/distributor-inventory-inquiry/index'));

