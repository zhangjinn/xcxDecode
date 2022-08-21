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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var index_1 = require('./../../../components/header-filter/index.js');
var index_2 = require('./../../../../components/empty-data-type/index.js');
var index_3 = require('./../../../components/header-tab/index.js');
var index_4 = require('./../../../components/side-filter/index.js');
var dmsorder_1 = require('./../../../../store/actions/dmsorder.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var requestJSON_1 = require('./../../../../utils/requestJSON.js');
var toast_2 = require('./../../../../components/vant/toast/toast.js');
var inventory_1 = require('./../../../../store/actions/inventory.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '样机管理',
            usingComponents: {
                'van-toast': '../../../../components/vant/toast/index',
                'van-loading': '../../../../components/vant/loading/index',
                'van-search': '../../../../components/vant/search/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-icon': '../../../../components/vant/icon/index',
                'calendar': '../../../../components/calendar/index',
                'van-field': '../../../../components/vant/field/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "filter": { "v-bind:tabList.sync": "tabList", "v-bind:tabActive.sync": "tabActive", "v-bind:showSearch.sync": "showSearch" }, "emptyDataType": {}, "headerTab": { "v-bind:tabList.sync": "headerTabList" }, "sideFilter": { "xmlns:v-bind": "", "v-bind:sideFilterForm.sync": "sideFilterForm", "xmlns:v-on": "" } };
        _this.$events = { "filter": { "v-on:tabChange": "tabChange" }, "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" }, "sideFilter": { "v-on:handleConfirm": "handleConfirm", "v-on:onSideSearch": "onSideSearch", "v-on:onFormDataChange": "handleFormDataChange" } };
        _this.components = {
            filter: index_1.default,
            emptyDataType: index_2.default,
            headerTab: index_3.default,
            sideFilter: index_4.default
        };
        _this.data = {
            activityList: [],
            showSearch: false,
            scrollTop: -1,
            tabList: [
                {
                    name: '上样'
                },
                {
                    name: '撤样'
                },
                {
                    name: '我的样机'
                }
            ],
            tabActive: '0',
            filterForm: {
                storeCode: '',
                storeName: '',
                matklCode: '',
                orderStatus: 'YWC' // 通知单状态
            },
            page: {
                pageNum: 1,
                pageSize: 10,
                totalPage: 0,
            },
            sideFilterForm: [
                {
                    key: 'matklCode',
                    label: '物料组',
                    value: '',
                    name: '',
                    placeholder: '请选择物料组',
                    type: 'select',
                    multiple: false,
                    options: []
                },
                {
                    key: 'modeName',
                    label: '型号',
                    placeholder: '请输入型号',
                    value: '',
                    type: 'field'
                },
                {
                    key: 'storeName',
                    label: '门店',
                    value: '',
                    name: '',
                    placeholder: '请选择门店',
                    type: 'select',
                    multiple: false,
                    options: []
                },
                {
                    key: 'orderStatus',
                    label: '状态',
                    value: 'YWC',
                    name: '已上样',
                    placeholder: '请选择流程状态',
                    type: 'select',
                    multiple: false,
                    options: [
                        {
                            id: 'YWC',
                            value: '已上样'
                        },
                        {
                            id: 'SHZ',
                            value: '上样中'
                        },
                        {
                            id: 'YBH',
                            value: '已驳回'
                        },
                        {
                            id: 'TJSB',
                            value: '上样失败'
                        }
                    ]
                },
                {
                    key: 'isEnjoyPolicy',
                    label: '是否享受补贴',
                    value: '',
                    name: '',
                    placeholder: '请选择是否享受补贴',
                    type: 'select',
                    multiple: false,
                    options: [
                        {
                            id: 'T',
                            value: '是'
                        },
                        {
                            id: 'F',
                            value: '否'
                        }
                    ]
                }
            ],
            visible: false,
            OrderSFilterVisible: false,
            headerTabList: [
                { name: '门店', type: 'shop', selectValue: '' },
                { name: '物料组', type: 'material', selectValue: '' },
                { name: '状态', type: 'status', selectValue: 'YWC' }
            ],
            // 活动状态筛选列表
            statusOptions: [
                {
                    id: 'YWC',
                    value: '已上样'
                },
                {
                    id: 'SHZ',
                    value: '上样中'
                },
                {
                    id: 'YBH',
                    value: '已驳回'
                },
                {
                    id: 'TJSB',
                    value: '上样失败'
                }
            ],
            shopOptions: [],
            materialOptions: [],
            CurrentOrderSFilterName: ''
        };
        // ;面内交互写在methods里
        _this.methods = {
            // 获取门店你
            getShopList: function () {
                var data = {
                    orgId: '',
                    matklId: '',
                    searchStr: ''
                };
                requestJSON_1.request({
                    api: 'comm/querySalesShopInfoList.nd',
                    method: 'POST',
                    data: data,
                    callback: function (res) {
                        var list = res.data.list;
                        if (res.data.code == 0) {
                            _this.shopOptions = [];
                            list.forEach(function (value) {
                                _this.shopOptions.push({
                                    name: value.name,
                                    code: value.code
                                });
                            });
                            _this.$apply();
                        }
                        else {
                            _this.shopOptions = [];
                        }
                    }
                });
                // this.methods.getShopInfoPrototype(data).then(res=>{
                //   this.shopOptions2 = res.payload.list
                //   this.$apply()
                // })
            },
            // 列表分页
            onGetOrderListNext: function () {
                if (this.page.totalPage > (this.page.pageNum * this.page.pageSize)) {
                    this.page = __assign({}, this.page, { pageNum: this.page.pageNum + 1 });
                    this.methods.myGetOrderList();
                }
            },
            // 查询列表
            myGetOrderList: function () {
                var data = __assign({ customerMdmCode: wepy_1.default.$instance.globalData.customerCode }, _this.filterForm, { pageNum: _this.page.pageNum, pageSize: _this.page.pageSize, serviceCode: 'listMyWork' });
                toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
                requestJSON_1.request({
                    api: "cts/ctsApi.nd?",
                    data: data,
                    method: 'POST',
                    callback: function (res) {
                        toast_1.default.clear();
                        var data = res.data;
                        if (data.code == 200 && data.data && data.data.length > 0) {
                            _this.page = __assign({}, _this.page, { totalPage: data.totalSize });
                            var activityList = data.data || [];
                            if (data.pageNum > 1) {
                                _this.activityList = _this.activityList.concat(activityList);
                            }
                            else {
                                _this.activityList = activityList;
                            }
                            // 循环列表
                            _this.activityList.forEach(function (item) {
                                if (item.storeOrderStatus == 'YWC') {
                                    item.storeOrderStatusName = '已上样';
                                }
                                if (item.storeOrderStatus == 'YWC' && item.isYjDown == 'T') {
                                    item.storeOrderStatusName = '撤样中';
                                }
                                if (item.storeOrderStatus == 'SHZ') {
                                    item.storeOrderStatusName = '上样中';
                                }
                                if (item.storeOrderStatus == 'YBH') {
                                    item.storeOrderStatusName = '已驳回';
                                }
                                if (item.storeOrderStatus == 'TJSB') {
                                    item.storeOrderStatusName = '上样失败';
                                }
                                // 循环查库存 给样机库存赋值
                                var param = {
                                    _loading: true,
                                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                                    terms: {
                                        isFuzzy: false,
                                        zzprdmodel: item.modeName,
                                        model: item.modeName,
                                        colour: '',
                                        warehouseId: '',
                                        invStatusId: '',
                                        isLock: '',
                                        qualitylv: '样机(已审核)',
                                        dealerMaterialGroupFlag: '',
                                        materialGroupCode: item.baseMatklCode,
                                        materialGroupName: '',
                                        gicWarehouseType: '',
                                        invStatusType: '',
                                        invType: '',
                                        bigQtyMin: 0,
                                        orgId: '',
                                        gicInvStatus: '110' //库存状态只查正品
                                    },
                                    page: {
                                        pageNo: 1,
                                        pageSize: 100
                                    }
                                };
                                _this.methods.getfindTaojiInventoryTotal(param).then(function (res) {
                                    var data = res.payload.data;
                                    item.totalActQty = data && data.totalActQty ? data.totalActQty : '0';
                                    _this.$apply();
                                });
                                //  循环查门店是否是专卖店
                                _this.methods.getShopInfoPrototype({ orgId: '', matklId: '', searchStr: item.storeName }).then(function (res2) {
                                    if (res2.payload.code == 0) {
                                        item.isExclusiveShop = (res2.payload && res2.payload.list) ? res2.payload.list[0].isExclusiveShop : '';
                                    }
                                    else {
                                        item.isExclusiveShop = '';
                                    }
                                });
                            });
                        }
                        else if (data.code == -200) {
                            _this.activityList = [];
                            toast_2.default.fail(data.msg);
                        }
                        else {
                            _this.activityList = [];
                        }
                        _this.$apply();
                    }
                });
            },
            // 侧边筛选列表可搜索，并重新赋值
            onSideSearch: function (searchObj) {
            },
            // 选择筛选时触发事件
            handleFormDataChange: function (e) {
                var _this = this;
                var currIndex = e.currIndex, sideFilterForm = e.sideFilterForm;
                this.sideFilterForm = sideFilterForm;
                // 循环遍历 给顶部筛选条件也赋值 和侧边保持一致
                this.sideFilterForm.forEach(function (item) {
                    if (item.key == 'storeName') {
                        _this.filterForm.storeCode = item.value;
                        _this.filterForm.storeName = item.name;
                        _this.headerTabList[0].selectValue = item.name;
                    }
                    if (item.key == 'matklCode') {
                        _this.filterForm.matklCode = item.value;
                        _this.headerTabList[1].selectValue = item.value;
                    }
                    if (item.key == 'orderStatus') {
                        _this.filterForm.orderStatus = item.value;
                        _this.headerTabList[2].selectValue = item.value;
                    }
                });
                this.$apply();
            },
            // 侧边筛选确定
            handleConfirm: function (e) {
                var _this = this;
                var filterForm = e.sideFilterForm;
                if (filterForm) {
                    filterForm.forEach(function (item) {
                        // 侧边栏筛选确定 除了门店要赋值的是name 其余的都是id
                        if (item.key == 'storeName') {
                            _this.filterForm[item.key] = item.name;
                            _this.headerTabList[0].selectValue = item.name;
                            if (item.name == '全部') {
                                _this.filterForm[item.key] = '';
                                _this.headerTabList[0].selectValue = '';
                            }
                        }
                        else {
                            _this.filterForm[item.key] = item.value;
                        }
                        if (item.key == 'matklCode') {
                            _this.filterForm.matklCode = item.value;
                            _this.headerTabList[1].selectValue = item.value;
                        }
                        if (item.key == 'orderStatus') {
                            _this.filterForm.orderStatus = item.value;
                            _this.headerTabList[2].selectValue = item.value;
                        }
                    });
                }
                this.page.pageNum = 1;
                this.methods.myGetOrderList();
                this.visible = !this.visible;
            },
            // 回到顶部
            scrollToTop: function () {
                _this.scrollTop = 0;
            },
            // tab切换
            tabChange: function (param) {
                this.tabActive = param.tabActive;
                if (this.tabActive !== 2) {
                    // let url = `/pages/goods/prototypeManagement/list/index`
                    var url = "/pages/goods/prototypeManagement/loadingWithdrawal/index?tabActive=" + this.tabActive;
                    wx.redirectTo({
                        url: url
                    });
                }
            },
            // 切换顶部快捷筛选
            touchOrderSFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (!_this.OrderSFilterVisible) {
                    _this.OrderSFilterVisible = true;
                    _this.CurrentOrderSFilterName = name;
                    _this.$apply();
                    return;
                }
                if (!name) {
                    _this.OrderSFilterVisible = false;
                    _this.CurrentOrderSFilterName = '';
                    return;
                }
                if (_this.CurrentOrderSFilterName === name) {
                    _this.OrderSFilterVisible = false;
                    _this.CurrentOrderSFilterName = '';
                    return;
                }
                if (['shop', 'status'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 顶部门店快捷筛选
            onSelectType: function (storeCode, storeName) {
                this.filterForm = __assign({}, this.filterForm, { storeCode: storeCode });
                this.filterForm = __assign({}, this.filterForm, { storeName: storeName });
                this.headerTabList[0].selectValue = storeCode;
                // 联动侧边栏的筛选
                this.sideFilterForm.forEach(function (item) {
                    if (item.key == 'storeName') {
                        item.value = storeCode;
                        item.name = storeName;
                    }
                });
                this.page.pageNum = 1;
                this.methods.touchOrderSFilter();
                this.methods.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 顶部物料组筛选
            onSelectMaterial: function (matklCode, matklName) {
                this.filterForm = __assign({}, this.filterForm, { matklCode: matklCode });
                this.headerTabList[1].selectValue = matklCode;
                // 给侧边栏物料组筛选赋值
                this.sideFilterForm.forEach(function (item) {
                    if (item.key == 'matklCode') {
                        item.value = matklCode;
                        item.name = matklName;
                    }
                });
                this.page.pageNum = 1;
                this.methods.touchOrderSFilter();
                this.methods.scrollToTop();
                this.methods.myGetOrderList();
            },
            // 顶部状态快捷筛选
            onSelectStatus: function (orderStatus, orderStatusName) {
                this.filterForm = __assign({}, this.filterForm, { orderStatus: orderStatus });
                this.headerTabList[2].selectValue = orderStatus;
                this.sideFilterForm.forEach(function (item) {
                    // orderStatus
                    if (item.key == 'orderStatus') {
                        item.value = orderStatus;
                        item.name = orderStatusName;
                    }
                });
                this.page.pageNum = 1;
                this.methods.touchOrderSFilter();
                this.methods.scrollToTop();
                this.methods.myGetOrderList();
            },
            // 点击普通筛选按钮-显示或隐藏左侧筛选框
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.sideFilterForm.forEach(function (item) {
                    if (item.key == 'storeName') {
                        _this.shopOptions.forEach(function (value) {
                            item.options.push({
                                value: value.name,
                                id: value.code
                            });
                        });
                    }
                    if (item.key == 'matklCode') {
                        _this.materialOptions.forEach(function (value) {
                            item.options.push({
                                value: value.name,
                                id: value.code
                            });
                        });
                        _this.$apply();
                    }
                });
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 滚动列表
            onScroll: function (event) {
                if (_this.scrollTop === 0) {
                    _this.scrollTop = event.detail.scrollTop;
                }
            }
        };
        return _this;
    }
    Filter.prototype.onLoad = function (e) {
        if (e) {
            this.tabActive = e.tabActive;
        }
        //查询列表
        this.methods.myGetOrderList();
        this.methods.getSMterialInfoPrototype('');
        this.methods.getShopList();
    };
    ;
    Filter.prototype.onShow = function () {
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            materialOptions: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.materialGroupList;
            },
        }, {
            getShopInfoPrototype: dmsorder_1.getShopInfoPrototype,
            getSMterialInfoPrototype: dmsorder_1.getSMterialInfoPrototype,
            getfindTaojiInventoryTotal: inventory_1.getfindTaojiInventoryTotal
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/prototypeManagement/list/index'));

