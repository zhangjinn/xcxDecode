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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var common_1 = require('./../../../../mixins/common.js');
var index_1 = require('./../../../../utils/index.js');
var dmsoutwarehouse_1 = require('./../../../../store/actions/dmsoutwarehouse.js');
var dmsoutwarehouse_2 = require('./../../../../store/types/dmsoutwarehouse.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var dialog_1 = require('./../../../../components/vant/dialog/dialog.js');
var index_2 = require('./../product-card-info/index.js');
var index_3 = require('./../../../../components/empty-data-type/index.js');
var index_4 = require('./../../../components/header-tab/index.js');
var defaultFilterForm = {
    documentNum: '',
    customerCode: '',
    customerName: '',
    warehouseCode: '',
    warehouseName: '',
    startDate: '',
    endDate: '',
    sellerName: '',
    status: '',
    documentType: '',
};
var stores = wepy_redux_1.getStore();
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '销售出库',
            usingComponents: {
                'van-icon': '/components/vant/icon/index',
                'van-popup': '/components/vant/popup/index',
                'van-checkbox': '/components/vant/checkbox/index',
                'van-field': '/components/vant/field/index',
                'van-stepper': '/components/vant/stepper/index',
                'van-toast': '/components/vant/toast/index',
                'van-picker': '/components/vant/picker/index',
                'calendar': '/components/calendar/index',
                'img': '/components/img/index',
                'van-dialog': '/components/vant/dialog/index',
            },
        };
        _this.mixins = [common_1.default];
        _this.data = {
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            calendarShow: false,
            statusVisible: false,
            documentTypeVisible: false,
            filterFormVisible: false,
            outFormVisible: false,
            dismissedPopup: false,
            currentDateName: '',
            dismissedPopupShow: [],
            statusList: [
                { label: '全部', value: '' },
                { label: '已提交', value: 'submitted' },
                { label: '部分出库', value: 'part_shipped' },
                { label: '待发货', value: 'examined' }
                // { label: '已接受', value: 'accepted' },  // 暂时不做
            ],
            documentTypeList: [
                { label: '全部', value: '' },
                { label: '渠道订单', value: 'normal' },
                { label: '零售订单', value: 'retail' },
                { label: '分销商采购订单', value: 'purchase' },
            ],
            filterForm: defaultFilterForm,
            freeShippingTip: '',
            headerTabList: [
                { name: '单据状态', type: 'status', selectValue: '' },
                { name: '订单类型', type: 'documentType', selectValue: '' },
            ],
        };
        _this.$repeat = { "orderList": { "com": "productCardInfo", "props": "" }, "modelList": { "com": "productCardInfo", "props": "orderItem.sync" }, "order": { "com": "productCardInfo", "props": "orderItem.sync" } };
        _this.$props = { "productCardInfo": { "v-bind:orderItem.sync": { "value": "orderItem", "type": "item", "for": "order.salesOrderItem", "item": "orderItem", "index": "itemIndex", "key": "out_warehouse_order_{{order.id}}_{{orderItem.itemId}}" } }, "emptyDataType": { "description": "订单" }, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "onToggleFilterItem", "v-on:onSideFilter": "onToggleFilterForm" } };
        _this.components = {
            productCardInfo: index_2.default,
            emptyDataType: index_3.default,
            headerTab: index_4.default,
        };
        _this.methods = {
            // 确定驳回
            dismissedBeSure: function () {
            },
            // 取消驳回
            dismissedBeNotSure: function () {
                _this.dismissedPopup = false;
            },
            beSureDismissed: function (id) {
                var resArray = [];
                ramda_1.forEach(function (item) {
                    if (item.id == id) {
                        ramda_1.forEach(function (res) {
                            if (res.outChecked) {
                                resArray.push(res);
                            }
                        }, item.salesOrderItem);
                        if (resArray.length == item.salesOrderItem.length || resArray.length == 0) {
                            _this.dismissedPopupShow = item.salesOrderItem;
                        }
                        else {
                            _this.dismissedPopupShow = resArray;
                        }
                    }
                }, _this.orderList);
                _this.dismissedPopup = true;
                _this.$apply();
            },
            // 取消审核
            onCancelOrder: function (salesOrderId) {
                dialog_1.default.confirm({
                    title: '取消提醒',
                    message: "\u60A8\u786E\u5B9A\u53D6\u6D88\u5BA1\u6838?",
                    confirmButtonText: '确定'
                }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                    var result, code;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.methods.cancelReview({ salesOrderId: salesOrderId })
                                // let result = await this.methods.cancleOutWarehouseSalesOrder({salesOrderId})
                            ];
                            case 1:
                                result = _a.sent();
                                code = result.payload.code;
                                if (code === '0') {
                                    toast_1.default.success('取消审核成功');
                                    setTimeout(function () {
                                        _this.methods.getOutWarehouseOrderList(_this.filterForm, 1);
                                    }, 2000);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }).catch(function () {
                    //cancle
                });
            },
            onDmsGoodsItems: function (orderIndex, itemIndex, evt) {
                var isNumber = /^(([1-9]{1}\d*)(\.\d{0,2})?|(0{1}\.\d{0,2}))$/;
                var newOrderList = ramda_1.clone(_this.orderList);
                if (evt.detail !== '') {
                    if (isNumber.test(evt.detail)) {
                        newOrderList[orderIndex].salesOrderItem[itemIndex].bprice = parseFloat(evt.detail);
                    }
                    else {
                        toast_1.default.fail({
                            message: '请输入正确的数字',
                            duration: 2000,
                        });
                    }
                }
                else {
                    newOrderList[orderIndex].salesOrderItem[itemIndex].bprice = 0;
                }
                _this.dispatch({ orderList: newOrderList });
            },
            onToggleFilterItem: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                this.toggleFilterItem(name);
            },
            onSelectFilterItem: function (name, value) {
                var _this = this;
                var _a;
                this.toggleFilterItem(name);
                var filterForm = __assign({}, this.filterForm, (_a = {}, _a[name] = value, _a));
                this.headerTabList.forEach(function (res, index) {
                    if (res.type == name) {
                        _this.headerTabList[index].selectValue = value;
                    }
                });
                this.filterForm = filterForm;
                this.methods.getOutWarehouseOrderList(filterForm, 1);
            },
            onToggleFilterForm: function () {
                this.toggleFilterForm();
            },
            onFilterFormChange: function (evt) {
                var _a;
                var detail = evt.detail, name = evt.target.dataset.name;
                this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[name] = detail, _a));
            },
            onResetFilterForm: function () {
                var _a = this.filterForm, status = _a.status, documentType = _a.documentType;
                this.filterForm = __assign({}, defaultFilterForm, { status: status,
                    documentType: documentType });
            },
            onSubmitFilterForm: function () {
                this.methods.getOutWarehouseOrderList(this.filterForm, 1);
                this.toggleFilterForm();
            },
            onGetListNext: function () {
                var _a = this.page, currPage = _a.currPage, totalPage = _a.totalPage;
                if (currPage < totalPage) {
                    this.methods.getOutWarehouseOrderList(this.filterForm, currPage + 1);
                }
            },
            onCheckOrder: function (orderIndex) {
                var newOrderList = ramda_1.clone(this.orderList);
                var outChecked = newOrderList[orderIndex].outChecked;
                newOrderList[orderIndex].outChecked = !outChecked;
                newOrderList[orderIndex].halfChecked = !outChecked;
                newOrderList[orderIndex].salesOrderItem.forEach(function (item) {
                    item.outChecked = !outChecked;
                });
                var allOrderChecked = newOrderList.some(function (order) { return !order.outChecked; });
                this.dispatch({ orderList: newOrderList, allChecked: !allOrderChecked ? true : false });
            },
            onCheckAll: function () {
                var checked = this.allChecked;
                var newOrderList = ramda_1.clone(this.orderList);
                newOrderList.forEach(function (order) {
                    if (!order.isScan) {
                        order.outChecked = !checked;
                        order.halfChecked = !checked;
                        order.salesOrderItem.forEach(function (item) {
                            item.outChecked = !checked;
                            item.halfChecked = !checked;
                        });
                    }
                });
                this.dispatch({ orderList: newOrderList, allChecked: !checked });
            },
            // 快速出库
            onBatchSubmitItemOut: function (salesOrderId) {
                if (salesOrderId) {
                    var ids = [salesOrderId];
                    this.methods.postOrderOut(ids);
                }
            },
            // 批量出库
            onBatchSubmitOut: function () {
                var that = this;
                var orderList = that.orderList;
                var checked = [], ids = [];
                orderList.forEach(function (order) {
                    if (order.outChecked) {
                        checked.push('1');
                        ids.push(order.id);
                    }
                });
                if (checked.length == 0) {
                    toast_1.default.fail('未选择订单');
                    return;
                }
                this.methods.postOrderOut(ids);
            },
            postOrderOut: function (ids) {
                var that = _this;
                dialog_1.default.confirm({
                    title: '出库提醒',
                    message: "\u60A8\u786E\u5B9A\u51FA\u5E93?",
                    confirmButtonText: '确定'
                }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        // 调用批量出库接口
                        that.methods.salesOrderBatchOut(ids).then(function (res) {
                            res = res.payload;
                            var data = res.data;
                            if (res.code == '0') {
                                toast_1.default.success('出库成功');
                                setTimeout(function () {
                                    _this.methods.getOutWarehouseOrderList(_this.filterForm, 1);
                                }, 1000);
                            }
                            else {
                                wx.showToast({
                                    title: data.message || data.msg || '系统错误,请稍后重试',
                                    duration: 5000,
                                    icon: 'none',
                                    mask: true // 是否显示透明蒙层，防止触摸穿透，默认：false
                                });
                                //重新加载数据
                                setTimeout(function () { that.methods.getOutWarehouseOrderList(that.filterForm, that.page.currPage || 1); }, 5000);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); }).catch(function () {
                    //cancle
                });
            },
            onOutFormCancel: function () {
                this.toggleOutForm();
            },
            // 提交订单
            onOutFormConfirm: function (evt) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, id, value, outOrders, changes, orderIds, outForm, isScanDealerResult, result;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = evt.detail.value, id = _a.id, value = _a.value;
                                outOrders = this.orderList.filter(function (order) { return order.halfChecked && !order.disableCheck; });
                                changes = {};
                                orderIds = [];
                                outOrders.forEach(function (_a) {
                                    var id = _a.id, salesOrderItem = _a.salesOrderItem;
                                    orderIds.push(id);
                                    changes[id] = salesOrderItem.filter(function (item) { return !item.disableCheck; }).map(function (_a) {
                                        var itemId = _a.itemId, bprice = _a.bprice, outQty = _a.outQty, outChecked = _a.outChecked;
                                        var shippedBqty = outChecked ? outQty : 0;
                                        // 出库不能修改价格  去掉bprice
                                        // return { itemId, shippedBqty, bprice }
                                        return { itemId: itemId, shippedBqty: shippedBqty };
                                    });
                                });
                                outForm = {
                                    warehouseId: id,
                                    orderIds: orderIds,
                                    changes: changes,
                                };
                                return [4 /*yield*/, dmsoutwarehouse_1.salesOrderNeedScan({ orderIds: orderIds })];
                            case 1:
                                isScanDealerResult = _b.sent();
                                if (!(isScanDealerResult.code === '0')) return [3 /*break*/, 4];
                                if (!isScanDealerResult.isNeed) return [3 /*break*/, 2];
                                toast_1.default.fail('存在需要扫码出库的订单，不可批量出库！');
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, dmsoutwarehouse_1.submitBatchOut(outForm)];
                            case 3:
                                result = _b.sent();
                                if (result.code === '0') {
                                    this.toggleOutForm();
                                    toast_1.default.success('出库成功');
                                    setTimeout(function () {
                                        _this.methods.getOutWarehouseOrderList(_this.filterForm, 1);
                                    }, 1000);
                                }
                                _b.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, startDate = _a.startDate, endDate = _a.endDate;
                var name = e.target.dataset.name;
                this.currentDateName = name;
                if (name === 'startDate') {
                    this.$wxpage.calendar.enableArea([minDate, endDate ? endDate : maxDate]);
                }
                if (name === 'endDate') {
                    this.$wxpage.calendar.enableArea([startDate ? startDate : minDate, maxDate]);
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
        };
        return _this;
    }
    List.prototype.toggleFilterItem = function (name) {
        if (name === 'status') {
            if (!this.statusVisible && this.documentTypeVisible) {
                this.documentTypeVisible = !this.documentTypeVisible;
            }
            this.statusVisible = !this.statusVisible;
            return;
        }
        if (name === 'documentType') {
            if (!this.documentTypeVisible && this.statusVisible) {
                this.statusVisible = !this.statusVisible;
            }
            this.documentTypeVisible = !this.documentTypeVisible;
            return;
        }
        this.statusVisible = false;
        this.documentTypeVisible = false;
    };
    List.prototype.toggleFilterForm = function () {
        this.filterFormVisible = !this.filterFormVisible;
        this.statusVisible = false;
        this.documentTypeVisible = false;
    };
    List.prototype.toggleOutForm = function () {
        this.outFormVisible = !this.outFormVisible;
    };
    List.prototype.dispatch = function (state) {
        stores.dispatch({ type: dmsoutwarehouse_2.DMS_OUT_WAREHOUSE_CHG, payload: state });
    };
    List.prototype.onLoad = function () {
    };
    List.prototype.onUnload = function () {
        this.dispatch({ allChecked: false });
        this.methods.reset();
    };
    List.prototype.onShow = function () {
        this.freeShippingTip = index_1.getAlertInfo('14187495683'); // 免运费提示信息
        this.methods.getOutWarehouseOrderList(this.filterForm, this.page.currPage || 1);
    };
    List = __decorate([
        wepy_redux_1.connect({
            orderList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.orderList;
            },
            page: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.page;
            },
            allChecked: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.allChecked;
            },
            warehouseList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.warehouseList;
            },
        }, {
            salesOrderBatchOut: dmsoutwarehouse_1.salesOrderBatchOut,
            getOutWarehouseOrderList: dmsoutwarehouse_1.getOutWarehouseOrderList,
            getOutWarehouseList: dmsoutwarehouse_1.getOutWarehouseList,
            cancleOutWarehouseSalesOrder: dmsoutwarehouse_1.cancleOutWarehouseSalesOrder,
            cancelReview: dmsoutwarehouse_1.cancelReview,
            reset: dmsoutwarehouse_2.DMS_CLEAR_OUT_WAREHOUSE
        })
    ], List);
    return List;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(List , 'pages/dms/out-warehouse/list/index'));

