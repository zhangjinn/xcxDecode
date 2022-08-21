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
var order_1 = require('./../../../store/actions/order.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
var purchaseshop_1 = require('./../../../store/actions/purchaseshop.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var purchaseshop_2 = require('./../../../store/types/purchaseshop.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var PurchaseShop = /** @class */ (function (_super) {
    __extends(PurchaseShop, _super);
    function PurchaseShop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '直采入库',
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
        _this.$props = { "emptyDataType": { "description": "订单" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_2.default,
        };
        _this.data = {
            errorPopup: false,
            errorText: '',
            inputvalue: '',
            Warehouserel: '',
            Supplier: '供应商',
            itemgroup: '物料组',
            isCheckAll: false,
            WarehouseListvisible: false,
            deliveryMethod: '全部',
            visible: false,
            Suppliersextend: false,
            Itemgroupextend: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            timeFrameVisible: false,
            calendarShow: false,
            currentDateName: '',
            filterForm: {
                supplierCode: '',
                maters: '',
                pageNo: 1,
                // 采购业务员
                PurchasingSalesman: '',
                // 采购单号
                purchaseorderNo: '',
                beginDate: '',
                endDate: '',
                // 配送方式
                deliveryMethodtype: '',
                // 起止时间
                sapBeginDate: '',
                sapEndDate: '',
            },
            filterFormExtra: {
                orgName: '',
                matklName: '',
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
        };
        // 页面内交互写在methods里
        _this.methods = {
            imgLose: function (_a) {
                var detail = _a.detail;
                wepy_redux_1.getStore().dispatch({ type: purchaseshop_2.RESET_PURCHASE_IMG, payload: detail });
            }
            // 选择仓库
            ,
            // 选择仓库
            chooseWarehouse: function (key) {
                _this.baseData.forEach(function (res) {
                    if (res.key == key) {
                        res.isSelect = true;
                    }
                    else {
                        res.isSelect = false;
                    }
                });
                _this.Warehouserel = key;
            },
            // 全选 神他妈的逻辑  下次用些的数组
            checkAll: function () {
                _this.isCheckAll = !_this.isCheckAll;
                var type = 1;
                _this.purchaseList.forEach(function (element) {
                    if (element.isSelect !== true) {
                        type = 2;
                        return;
                    }
                });
                if (type == 1) {
                    _this.purchaseList.forEach(function (res) {
                        res.isSelect = false;
                    });
                }
                else {
                    if (_this.isCheckAll) {
                        _this.purchaseList.forEach(function (res) {
                            res.isSelect = true;
                        });
                    }
                    else {
                        _this.purchaseList.forEach(function (res) {
                            res.isSelect = false;
                        });
                    }
                }
            },
            // 订单选中
            selectPuchaseItem: function (id) {
                _this.purchaseList.forEach(function (element) {
                    if (element.id == id) {
                        element.isSelect = !element.isSelect;
                    }
                });
            },
            errorBeSure: function () {
                wepy_redux_1.getStore().dispatch({ type: purchaseshop_2.RESET_PURCHASE_LIST, payload: [] });
                _this.myGetOrderList();
                _this.errorPopup = false;
                _this.errorText = '';
                _this.isCheckAll = false;
                _this.filterForm.pageNo = 1;
                _this.$apply();
            },
            OnseleWarehouse: function () {
                var purchaseOrderIds = [];
                _this.purchaseList.forEach(function (res) {
                    if (res.isSelect == true) {
                        purchaseOrderIds.push(res.id);
                    }
                });
                if (purchaseOrderIds.length > 0) {
                    _this.WarehouseListvisible = !_this.WarehouseListvisible;
                }
                else {
                    toast_1.default.fail({
                        message: '请选择商品',
                        duration: 1000,
                    });
                }
            },
            // 批量入库
            submitOrder: function () {
                _this.WarehouseListvisible = !_this.WarehouseListvisible;
                var purchaseOrderIds = [];
                _this.purchaseList.forEach(function (res) {
                    if (res.isSelect == true) {
                        purchaseOrderIds.push(res.id);
                    }
                });
                if (purchaseOrderIds.length > 0) {
                    _this.methods.getPurchaseListIn({
                        _loading: true, _ignoreToast: true, warehouseId: _this.Warehouserel, purchaseOrderIds: purchaseOrderIds
                    }).then(function (res) {
                        if (res && res.payload && res.payload.data && res.payload.data.code && res.payload.data.code == "1") {
                            _this.errorPopup = true;
                            _this.errorText = res.payload.data.msg;
                            _this.$apply();
                        }
                        else if (res && res.payload && res.payload.code && res.payload.code == "0") {
                            toast_1.default.success({
                                message: '商品入库成功',
                                duration: 1000,
                            });
                            setTimeout(function () {
                                wepy_redux_1.getStore().dispatch({ type: purchaseshop_2.RESET_PURCHASE_LIST, payload: [] });
                                _this.myGetOrderList();
                                _this.isCheckAll = false;
                                _this.filterForm.pageNo = 1;
                            }, 1000);
                        }
                    });
                }
                else {
                    toast_1.default.fail({
                        message: '请选择商品',
                        duration: 1000,
                    });
                }
            },
            // poupo close
            closePolicy: function () {
                _this.WarehouseListvisible = false;
            },
            // 供应商选择
            touchOrderSFilter: function (name) {
                if (!_this.OrderSFilterVisible) {
                    _this.OrderSFilterVisible = true;
                    _this.CurrentOrderSFilterName = name;
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
                if (['orderType', 'orderStatus', 'auditStatus'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 查看详情
            viewDetail: function (e) {
                if (e) {
                    wx.navigateTo({
                        url: "/pages/dms/purchase-detail/index?purchaseOrderId=" + e
                    });
                }
            },
            // 筛选
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 供应商下拉列表
            onSelectOrderTypeCode: function (supplierCode, orgId, fullName) {
                wepy_redux_1.getStore().dispatch({ type: purchaseshop_2.RESET_PURCHASE_LIST, payload: [] });
                wepy_redux_1.getStore().dispatch({ type: purchaseshop_2.RESET_VENDOR_ITEM_GROUP, payload: [] });
                if (fullName) {
                    this.Supplier = fullName;
                }
                this.itemgroup = '物料组';
                this.filterForm = __assign({}, this.filterForm, { maters: '' });
                this.methods.getVendorItemGroupList({
                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                    supplierCode: supplierCode,
                    orgId: orgId
                });
                this.SuppliersList.forEach(function (res) {
                    if (res.supplierCode == supplierCode && res.orgId == orgId) {
                        res.isSelect = true;
                    }
                    else {
                        res.isSelect = false;
                    }
                });
                this.filterForm = __assign({}, this.filterForm, { supplierCode: supplierCode, pageNo: 1 });
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectStatus: function (maters) {
                wepy_redux_1.getStore().dispatch({ type: purchaseshop_2.RESET_PURCHASE_LIST, payload: [] });
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
                this.filterForm = __assign({}, this.filterForm, { maters: maters, pageNo: 1 });
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            // onSelectmatkl(matkl) {
            //   const { key, value } = matkl
            //   if (this.filterForm.matklId === key) {
            //     this.filterForm = { ...this.filterForm, matklId: '' }
            //     this.filterFormExtra = { ...this.filterFormExtra, matklName: '' }
            //     return
            //   }
            //   this.filterForm = { ...this.filterForm, matklId: key }
            //   this.filterFormExtra = { ...this.filterFormExtra, matklName: value }
            // },
            onZzprdmodelChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { purchaseorderNo: e.detail });
            },
            onOrderCodeChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { PurchasingSalesman: e.detail });
            },
            onToggleTimeFrame: function () {
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            onSelectTimeFrame: function (deliveryMethodtype) {
                this.filterForm = __assign({}, this.filterForm, { deliveryMethodtype: deliveryMethodtype });
                if (deliveryMethodtype == '') {
                    this.deliveryMethod = '全部';
                }
                else if (deliveryMethodtype == '06') {
                    this.deliveryMethod = '直配（分销商）';
                }
                else if (deliveryMethodtype == '04') {
                    this.deliveryMethod = '直配（个人）';
                }
                else if (deliveryMethodtype == '01') {
                    this.deliveryMethod = '自提';
                }
                else if (deliveryMethodtype == '02') {
                    this.deliveryMethod = '配送';
                }
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            onSubmitFilterForm: function () {
                wepy_redux_1.getStore().dispatch({ type: purchaseshop_2.RESET_PURCHASE_LIST, payload: [] });
                this.filterForm = __assign({}, this.filterForm, { pageNo: 1 });
                // TODO:
                this.myGetOrderList();
                this.visible = !this.visible;
            },
            // 重置侧边栏
            onSubmitFilterFormReset: function () {
                this.filterForm.deliveryMethodtype = '',
                    this.filterForm.purchaseorderNo = '';
                this.filterForm.sapBeginDate = '';
                this.filterForm.sapEndDate = '';
                this.filterForm.PurchasingSalesman = '';
                this.filterForm.pageNo = 1,
                    this.deliveryMethod = '全部';
                this.setData({
                    inputvalue: ''
                });
            }
            // 选择日期
            ,
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, sapBeginDate = _a.sapBeginDate, sapEndDate = _a.sapEndDate;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'sapDate') {
                    begin = sapBeginDate;
                    end = sapEndDate;
                }
                if (name.indexOf('eginDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('ndDate') > -1) {
                    this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                }
                this.calendarShow = true;
            },
            closeCalendar: function () {
                this.calendarShow = false;
            },
            clearCalendar: function (name) {
                var _a;
                this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[name] = '', _a));
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
            onGetOrderListNext: function () {
                if (this.totalPage > this.filterForm.pageNo) {
                    this.filterForm = __assign({}, this.filterForm, { pageNo: this.filterForm.pageNo + 1 });
                    this.myGetOrderList();
                }
                this.isCheckAll = false;
                this.purchaseList.forEach(function (res) {
                    res.isSelect = false;
                });
            },
        };
        return _this;
    }
    PurchaseShop.prototype.myGetOrderList = function () {
        if (wepy_1.default.$instance.globalData.cisCode) {
            this.methods.getPurchaseList({
                _loading: true, cisCode: wepy_1.default.$instance.globalData.cisCode,
                terms: {
                    documentNum: this.filterForm.purchaseorderNo,
                    supplierCode: this.filterForm.supplierCode,
                    maters: this.filterForm.maters,
                    startDocumentDate: this.filterForm.sapBeginDate,
                    endDocumentDate: this.filterForm.sapEndDate,
                    deliveryTypeCode: this.filterForm.deliveryMethodtype,
                    userName: this.filterForm.PurchasingSalesman
                },
                page: { pageNo: this.filterForm.pageNo, pageSize: 10 }
            });
        }
    };
    PurchaseShop.prototype.onShow = function () {
        wepy_redux_1.getStore().dispatch({ type: purchaseshop_2.RESET_PURCHASE_LIST, payload: [] });
        this.myGetOrderList();
    };
    PurchaseShop.prototype.onLoad = function () {
        var _this = this;
        this.methods.getMerchantSuppliersList({
            cisCode: wepy_1.default.$instance.globalData.cisCode
        }),
            this.methods.getBaseData({
                cisCode: wepy_1.default.$instance.globalData.cisCode, "type": 'cglrrkck', userAccount: wepy_1.default.$instance.globalData.account
            }).then(function (res) {
                ramda_1.forEachObjIndexed(function (value, key) {
                    _this.Warehouserel = key;
                }, res.payload.data[0]);
            });
        // this.methods.getBaseData({
        //   _loading: true, cisCode: wepy.$instance.globalData.cisCode, "type": 'wlz', userAccount: wepy.$instance.globalData.account,
        // }
        // )
        // // gys
        // this.methods.getBaseData({
        //   _loading: true, cisCode: wepy.$instance.globalData.cisCode, "type": 'gys', userAccount: wepy.$instance.globalData.account,
        // }
        // ).then((res: { payload: { data: any[]; }; }) => {
        //   forEachObjIndexed((value, key) => {
        //     this.Supplier = value
        //     this.filterForm.supplierCode = key
        //   }, res.payload.data[0])
        //   this.myGetOrderList()
        // })
    };
    PurchaseShop = __decorate([
        wepy_redux_1.connect({
            purchaseList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.purchaseList;
            },
            baseData: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.baseData;
            },
            SuppliersList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.purchaseSupplier;
            },
            ItemgroupList: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.purchaseMaterialGroup;
            },
            totalPage: function (_a) {
                var purchaseshop = _a.purchaseshop;
                return purchaseshop.totalPage;
            },
            filter: function (_a) {
                var order = _a.order;
                return order.filter;
            },
        }, {
            getOrderFilter: order_1.getOrderFilter,
            getPurchaseList: purchaseshop_1.getPurchaseList,
            getBaseData: purchaseshop_1.getBaseData,
            getPurchaseListIn: purchaseshop_1.getPurchaseListIn,
            getMerchantSuppliersList: purchaseshop_1.getMerchantSuppliersList,
            getVendorItemGroupList: purchaseshop_1.getVendorItemGroupList
        })
    ], PurchaseShop);
    return PurchaseShop;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(PurchaseShop , 'pages/dms/order-direct-into/index'));

