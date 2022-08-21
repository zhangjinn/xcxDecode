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
var request_1 = require('./../../../utils/request.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var inventory_1 = require('./../../../store/types/inventory.js');
var inventory_2 = require('./../../../store/actions/inventory.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var index_2 = require('./../../components/header-tab/index.js');
var InventoryQueries = /** @class */ (function (_super) {
    __extends(InventoryQueries, _super);
    function InventoryQueries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '当前库存',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-search': '../../../components/vant/search/index',
                'van-tab': '../../../components/vant/tab/index',
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'van-radio': '../../../components/vant/radio/index',
                'van-radio-group': '../../../components/vant/radio-group/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                'van-loading': '../../../components/vant/loading/index',
                'van-stepper': '../../../components/vant/stepper/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-button': '../../../components/vant/button/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "库存" }, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_1.default,
            headerTab: index_2.default,
        };
        _this.data = {
            inputvalue: '',
            Warehouserel: '',
            warehouseName: '仓库',
            warehouseTitle: '仓库类型',
            itemgroup: '物料组',
            isCheckAll: false,
            WarehouseListvisible: false,
            //warehouseName: '全部',
            warehouseStatusName: '全部',
            invStatusTypeName: '全部',
            invTypeName: '库存类型',
            visible: false,
            warehouseVisible: false,
            warehouseStatusVisible: false,
            invStatusTypeVisible: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            timeFrameVisible: false,
            calendarShow: false,
            currentDateName: '',
            lockName: '',
            filterForm: {
                model: '',
                materialGroupCode: '',
                materialGroupName: '',
                colour: '',
                warehouseId: '',
                invStatusId: '',
                invStatusType: '',
                isLock: '',
                dealerMaterialGroupFlag: '',
                gicWarehouseType: '',
                invType: '',
                pageSize: 10,
                pageNo: 1,
            },
            baseUrl: request_1.baseUrl,
            invTypeList: [
                {
                    "key": "", "value": "请选择"
                },
                {
                    "key": "110", "value": "在库"
                },
                {
                    "key": "119", "value": "销售在途"
                },
                {
                    "key": "120", "value": "转储在途"
                }
            ],
            headerTabList: [
                { name: '仓库', type: 'warehouseName', selectValue: '' },
                { name: '物料组', type: 'itemgroup', selectValue: '' },
                { name: '库存类型', type: 'invTypeName', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 供应商选择
            touchOrderSFilter: function (tabItem) {
                // console.log(name)
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                _this.OrderSFilterVisible = !_this.OrderSFilterVisible;
                _this.CurrentOrderSFilterName = name;
            },
            selectRelationship: function (value) {
                if (_this.filterForm.dealerMaterialGroupFlag == value) {
                    _this.filterForm = __assign({}, _this.filterForm, { dealerMaterialGroupFlag: '' });
                }
                else {
                    _this.filterForm = __assign({}, _this.filterForm, { dealerMaterialGroupFlag: value });
                }
            },
            // 盘点锁定
            selectLock: function (value) {
                if (_this.filterForm.isLock === (value == 'lock')) {
                    _this.filterForm = __assign({}, _this.filterForm, { isLock: '' });
                }
                else {
                    _this.filterForm = __assign({}, _this.filterForm, { isLock: value == 'lock' });
                }
            },
            selectWarehouseStatus: function (value, key) {
                _this.filterForm = __assign({}, _this.filterForm, { invStatusId: key });
                _this.warehouseStatusName = value;
                _this.warehouseStatusVisible = false;
            },
            onSelectWarehouseList: function (value, key) {
                _this.filterForm = __assign({}, _this.filterForm, { warehouseId: key });
                _this.warehouseName = value;
                _this.warehouseVisible = false;
            },
            onSelectInvStatusList: function (value, key) {
                console.log(key);
                _this.filterForm = __assign({}, _this.filterForm, { invStatusType: key });
                _this.invStatusTypeName = value;
                _this.invStatusTypeVisible = false;
            },
            // poupo close
            closePolicy: function () {
                _this.WarehouseListvisible = false;
            },
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 仓库类型
            onSelectWarehouseType: function (gicWarehouseType) {
                if (gicWarehouseType == '005') {
                    this.warehouseTitle = '自有仓';
                }
                else if (gicWarehouseType == '003') {
                    this.warehouseTitle = '共享仓';
                }
                else {
                    this.warehouseTitle = '全部';
                }
                wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
                this.filterForm = __assign({}, this.filterForm, { gicWarehouseType: gicWarehouseType, pageNo: 1 });
                // getStore().dispatch({ type: RESET_ORDER_LIST, payload: [] })
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            //仓库选择
            onSelectWarehouseName: function (warehouseId, warehouseName) {
                this.warehouseName = warehouseName;
                wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
                this.filterForm = __assign({}, this.filterForm, { warehouseId: warehouseId, pageNo: 1 });
                this.headerTabList[0].selectValue = warehouseId;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            // 物料组下拉列表
            onSelectStatus: function (code, maters) {
                wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
                this.itemgroup = maters;
                this.ItemgroupList.forEach(function (res) {
                    if (res.value == maters) {
                        res.isSelect = true;
                    }
                    else {
                        res.isSelect = false;
                    }
                });
                if (maters == "全部") {
                    maters = '';
                }
                //this.filterForm = { ...this.filterForm, materialGroupName: maters, pageNo: 1 }
                this.filterForm = __assign({}, this.filterForm, { materialGroupCode: code, pageNo: 1 });
                this.headerTabList[1].selectValue = code;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            // 库存类型
            onSelectInvType: function (code, maters) {
                wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
                this.invTypeName = maters;
                this.invTypeList.forEach(function (res) {
                    if (res.value == maters) {
                        res.isSelect = true;
                    }
                    else {
                        res.isSelect = false;
                    }
                });
                if (maters == "全部") {
                    maters = '';
                }
                //this.filterForm = { ...this.filterForm, materialGroupName: maters, pageNo: 1 }
                this.filterForm = __assign({}, this.filterForm, { invType: code, pageNo: 1 });
                this.headerTabList[2].selectValue = code;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onProductModelChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { model: e.detail });
            },
            onProductColorChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { colour: e.detail });
            },
            onToggleTimeFrame: function (value) {
                if (value == 'warehouse') {
                    this.warehouseVisible = !this.warehouseVisible;
                }
                else if (value == 'warehouseStatus') {
                    this.warehouseStatusVisible = !this.warehouseStatusVisible;
                }
                else {
                    this.invStatusTypeVisible = !this.invStatusTypeVisible;
                }
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            onSubmitFilterForm: function () {
                wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
                this.filterForm = __assign({}, this.filterForm, { pageNo: 1 });
                this.myGetOrderList();
                this.visible = !this.visible;
            },
            // 重置侧边栏
            onSubmitFilterFormReset: function () {
                this.filterForm.model = '',
                    this.filterForm.colour = '';
                this.filterForm.warehouseId = '';
                this.filterForm.invStatusId = '';
                this.filterForm.isLock = '';
                this.filterForm.dealerMaterialGroupFlag = '';
                this.filterForm.pageNo = 1,
                    this.warehouseName = '全部';
                this.warehouseStatusName = '全部';
                this.invStatusTypeName = '全部';
                this.filterForm.invStatusType = '';
                this.setData({
                    inputvalue: ''
                });
            },
            onGetOrderListNext: function () {
                if (this.totalPage > this.filterForm.pageNo) {
                    this.filterForm = __assign({}, this.filterForm, { pageNo: this.filterForm.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
            onMore: function (uniqueFlag) {
                this.inventoryList.forEach(function (inv) {
                    if (uniqueFlag == inv.uniqueFlag) {
                        inv.moreSign = !inv.moreSign;
                    }
                });
            }
        };
        return _this;
    }
    InventoryQueries.prototype.myGetOrderList = function () {
        var _a = this.filterForm, model = _a.model, colour = _a.colour, warehouseId = _a.warehouseId, invStatusId = _a.invStatusId, invStatusType = _a.invStatusType, isLock = _a.isLock, dealerMaterialGroupFlag = _a.dealerMaterialGroupFlag, materialGroupCode = _a.materialGroupCode, materialGroupName = _a.materialGroupName, gicWarehouseType = _a.gicWarehouseType, pageNo = _a.pageNo, invType = _a.invType;
        this.methods.getMaterialInventoryPage({
            _loading: true,
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            terms: {
                model: model,
                colour: colour,
                warehouseId: warehouseId,
                invStatusId: invStatusId,
                isLock: isLock,
                dealerMaterialGroupFlag: dealerMaterialGroupFlag,
                materialGroupCode: materialGroupCode,
                materialGroupName: materialGroupName,
                gicWarehouseType: gicWarehouseType,
                invStatusType: invStatusType,
                invType: invType,
                bigQtyMin: '' //最小可用库存数量,传空取所有的
            },
            page: { pageNo: pageNo, pageSize: 10 }
        });
    };
    /*onShow() {
      getStore().dispatch({ type: RESET_INVENTORY_QUERIES_LIST, payload: [] })
      this.myGetOrderList()
    }*/
    InventoryQueries.prototype.onLoad = function () {
        var _this = this;
        wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
        this.myGetOrderList();
        this.methods.getBaseData({
            cisCode: wepy_1.default.$instance.globalData.cisCode, "type": 'cglrrkck', 'orgId': '', userAccount: wepy_1.default.$instance.globalData.account
        }).then(function (res) {
            if (res && res.payload && res.payload.data && res.payload.data.length > 0) {
                ramda_1.forEachObjIndexed(function (value, key) {
                    _this.Warehouserel = key;
                }, res.payload.data[0]);
            }
            else {
                _this.Warehouserel = '';
            }
        });
        this.methods.getBaseData({ cisCode: wepy_1.default.$instance.globalData.cisCode, "type": 'kczt', userAccount: wepy_1.default.$instance.globalData.account });
        this.methods.getBaseData({ cisCode: wepy_1.default.$instance.globalData.cisCode, "type": 'wlz', userAccount: wepy_1.default.$instance.globalData.account });
        this.methods.getInvStatusType().then(function (res) {
            console.log(res);
        });
    };
    InventoryQueries = __decorate([
        wepy_redux_1.connect({
            inventoryList: function (_a) {
                var inventory = _a.inventory;
                var inventoryList = inventory.inventoryList;
                if (inventoryList && inventoryList.length && inventoryList.length > 500) {
                    inventoryList = inventoryList.slice(0, 500);
                }
                return inventoryList;
            },
            baseData: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.baseData;
            },
            ItemgroupList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.ItemgroupList;
            },
            WarehouseStatusList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.WarehouseStatusList;
            },
            totalPage: function (_a) {
                var inventory = _a.inventory;
                return inventory.totalPage;
            },
            invStatusType: function (_a) {
                var inventory = _a.inventory;
                return inventory.invStatus;
            }
        }, {
            getBaseData: purchaseshop_1.getBaseData,
            getMaterialInventoryPage: inventory_2.getMaterialInventoryPage,
            getInvStatusType: inventory_2.getInvStatusType
        })
    ], InventoryQueries);
    return InventoryQueries;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(InventoryQueries , 'pages/goods/inventory-queries/index'));

