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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var inventory_1 = require('./../../../store/types/inventory.js');
var inventory_2 = require('./../../../store/actions/inventory.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var OrderItemChoose = /** @class */ (function (_super) {
    __extends(OrderItemChoose, _super);
    function OrderItemChoose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '产品信息',
            usingComponents: {
                "van-search": "/components/vant/search/index",
                "van-toast": "/components/vant/toast/index",
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "产品" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            productCode: '',
            zzprdmodel: '',
            key: '',
            orgId: '',
            itemIndexR: '',
            itemProIndexR: '',
            warehouseId: '',
            ly: '',
            isRequest: false,
            isOpenSharedWarehouse: '',
            isFuzzy: true,
            requiredParameters: {},
            details: [],
            invType: '',
            invStatusId: '',
            invStatusType: '',
            page: {
                pageNo: 1,
                pageSize: 10
            },
            selectedProductList: [],
        };
        _this.methods = {
            onChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.zzprdmodel = detail;
                _this.$apply();
                if ((detail || '').trim().length >= 3) {
                    _this.methods.onSearch({ detail: detail }, _this);
                }
            }),
            onSearch: function (_a) {
                var detail = _a.detail;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (this.isRequest) {
                                    return [2 /*return*/];
                                }
                                this.zzprdmodel = detail;
                                return [4 /*yield*/, wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] })];
                            case 1:
                                _b.sent();
                                this.page.pageNo = 1;
                                return [4 /*yield*/, this.myGetOrderList(detail)];
                            case 2:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            // 1、组织，仓库，产品编码，质量等级，补差类型都相同 销售数量加1，不新增；
            // 2、组织，仓库，产品编码相同，质量等级 或者 补差类型 不相同提示‘相同产品质量等级和补差类型必须保持一致，请重新选择！’；
            // 3、其他情况正常添加
            // 4、组织，仓库，产品编码，质量等级，补差类型都相同 产品列表显示已选标识
            // 零售录入新版、分销录入新版 新增产品时判断1、2、3、4；零售录入、分销录入、订单审核、调拨录入判断4
            checkProduct: function (info, type) {
                var invMap = {};
                var uniqueInvMap = {};
                var selectedSame = {};
                var products = _this.selectedProductList;
                products.map(function (value, index) {
                    var uniqueInvKey = value.orgCode + "_" + value.gicWarehouse + "_" + value.productCode;
                    var oKey = uniqueInvKey + "_" + value.invStatusId + "_" + value.invStatusType;
                    var oSame = oKey + "_" + value.share;
                    var returnObj = {
                        index: index,
                        value: value
                    };
                    invMap[uniqueInvKey] = returnObj;
                    invMap[oKey] = returnObj;
                    uniqueInvMap[uniqueInvKey] = returnObj;
                    selectedSame[oSame] = returnObj;
                });
                if (type == '1') { // 组织，仓库，产品编码，质量等级，补差类型相同
                    if (invMap[info]) {
                        return invMap[info];
                    }
                }
                if (type == '2') { // 组织，仓库，产品编码相同
                    if (uniqueInvMap[info]) {
                        return uniqueInvMap[info];
                    }
                }
                if (type == '3') { // 组织，仓库，产品编码，质量等级，补差类型，共享标识字段相同
                    if (selectedSame[info]) {
                        return selectedSame[info];
                    }
                }
                return false;
            },
            chooseItem: function (index) {
                var oneItem = _this.inventoryList[index];
                var chooseItem = {
                    bigQty: oneItem.bigQty,
                    colour: oneItem.colour,
                    materialGroupId: '',
                    materialGroupCode: oneItem.materialGroupCode,
                    materialGroupName: oneItem.materialGroupName,
                    model: oneItem.model,
                    productCode: oneItem.productCode,
                    productName: oneItem.productName,
                    productLabel: oneItem.productLabel,
                    uom: oneItem.uom,
                    volume: oneItem.volume,
                    invTypeName: oneItem.invTypeName,
                    warehouseName: oneItem.warehouseName,
                    warehouseId: oneItem.warehouseId,
                    gicWarehouseType: oneItem.gicWarehouseType,
                    invStatusId: oneItem.invStatusId,
                    invStatusName: oneItem.invStatusName,
                    invStatusType: oneItem.invStatusType,
                    invStatusTypeName: oneItem.invStatusTypeName,
                    gicWarehouseName: oneItem.gicWarehouseName,
                    gicWarehouse: oneItem.gicWarehouse,
                    price: oneItem.price,
                    materialCode: oneItem.materialCode,
                    orgCode: oneItem.orgCode,
                    orgName: oneItem.orgName,
                    quantity: '1',
                    inInvDate: oneItem.inInvDate,
                    share: oneItem.share,
                    sellingPrice: '',
                };
                var uniqueInvKey = chooseItem.orgCode + "_" + chooseItem.gicWarehouse + "_" + chooseItem.productCode;
                var invStatusKey = chooseItem.invStatusId + "_" + chooseItem.invStatusType;
                var currProKey = uniqueInvKey + "_" + invStatusKey;
                if (_this.selectedProductList && _this.selectedProductList.length > 0) {
                    // 组织，仓库，产品编码，质量等级，补差类型相同
                    var checkResult = _this.methods.checkProduct(currProKey, '1');
                    if (checkResult) { // 将前一页已选列表的对应产品数量加1，然后直接返回
                        var index_2 = checkResult.index;
                        _this.selectedProductList[index_2].quantity = Number(_this.selectedProductList[index_2].quantity) + 1;
                        var chooseItem_1 = _this.selectedProductList[index_2];
                        _this.itemProIndexR = index_2;
                        _this.methods.backToPrevious(chooseItem_1);
                        return;
                    }
                    // 组织，仓库，产品编码相同，质量等级 或者 补差类型 不相同
                    var checkResult2 = _this.methods.checkProduct(uniqueInvKey, '2');
                    if (checkResult2) {
                        toast_1.default.fail('相同产品质量等级和补差类型必须保持一致，请重新选择！');
                        return;
                    }
                }
                _this.methods.backToPrevious(chooseItem);
            },
            // 返回上一页并赋值
            backToPrevious: function (chooseItem) {
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];
                var currentPage = pages[pages.length - 1]; //获取当前页面的对象
                var url = currentPage.route; //当前页面url
                prevPage.setData({
                    chooseItem: chooseItem,
                    'itemIndexR': _this.itemIndexR,
                    'itemProIndexR': _this.itemProIndexR,
                    'curragePageUrl': url
                });
                wx.navigateBack({
                    delta: 1
                });
            },
            onGetOrderListNext: function () {
                if (this.totalPage > this.page.pageNo) {
                    this.page = __assign({}, this.page, { pageNo: this.page.pageNo + 1 });
                    this.myGetOrderList(this.zzprdmodel);
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    OrderItemChoose.prototype.myGetOrderList = function (model, orgId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isRequest = true;
                        return [4 /*yield*/, this.methods.getInventoryQueriesListNew({
                                _loading: true,
                                cisCode: wepy_1.default.$instance.globalData.cisCode,
                                terms: {
                                    isFuzzy: this.isFuzzy,
                                    zzprdmodel: model,
                                    model: model,
                                    colour: '',
                                    warehouseId: this.warehouseId,
                                    invStatusId: this.invStatusId,
                                    isLock: '',
                                    dealerMaterialGroupFlag: '',
                                    materialGroupCode: '',
                                    materialGroupName: '',
                                    gicWarehouseType: this.isOpenSharedWarehouse,
                                    invStatusType: this.invStatusType,
                                    invType: this.invType,
                                    bigQtyMin: 0,
                                    orgId: this.orgId,
                                    gicInvStatus: '110' //库存状态只查正品
                                },
                                page: this.page
                            })];
                    case 1:
                        _a.sent();
                        if (this.selectedProductList && this.selectedProductList.length > 0) {
                            // 产品列表是否显示选中标识
                            this.inventoryList = this.inventoryList.map(function (chooseItem) {
                                // 已选产品和产品列表比较 组织，仓库，产品编码，质量等级，补差类型相同 则为选中状态
                                var currProKey = chooseItem.orgCode + "_" + chooseItem.gicWarehouse + "_" + chooseItem.productCode + "_" + chooseItem.invStatusId + "_" + chooseItem.invStatusType;
                                var checkResult = _this.methods.checkProduct(currProKey, '1');
                                chooseItem.isSelected = false;
                                if (checkResult) {
                                    chooseItem.isSelected = true;
                                }
                                return chooseItem;
                            });
                        }
                        this.isRequest = false;
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderItemChoose.prototype.onShow = function () {
        var pages = getCurrentPages();
        var prevpage = pages[pages.length - 2]; // 上一个页面
        var data = prevpage.data; // 获取上一页data里的数据
        if (data) {
            this.selectedProductList = data.productList;
        }
    };
    OrderItemChoose.prototype.onLoad = function (e) {
        if (e.ly) {
            this.ly = e.ly;
        }
        this.itemProIndexR = e.itemProIndexR;
        if (this.ly == 'retailNew') {
            this.requiredParameters = JSON.parse(e.requiredParameters); // 零售录入新版主要用来获取省市区
        }
        //清除产品查询列表
        wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
    };
    OrderItemChoose = __decorate([
        wepy_redux_1.connect({
            likePaging: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.likePaging;
            },
            additionOrderDetailItem: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseItemInfo;
            },
            inventoryList: function (_a) {
                var inventory = _a.inventory;
                return inventory.inventoryList;
            },
            totalPage: function (_a) {
                var inventory = _a.inventory;
                return inventory.totalPage;
            }
        }, {
            getProductListLikeCode: dmsorder_1.getProductListLikeCode,
            getCisPrice: dmsorder_1.getCisPrice,
            getLsPrice: dmsorder_1.getLsPrice,
            getInvStatusType: inventory_2.getInvStatusType,
            getInventoryQueriesListNew: inventory_2.getInventoryQueriesListNew,
            getZoneB2cServiceList: dmsorder_1.getZoneB2cServiceList,
        })
    ], OrderItemChoose);
    return OrderItemChoose;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderItemChoose , 'pages/dms/order-item-choose-new/index'));

