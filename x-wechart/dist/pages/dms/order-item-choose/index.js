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
var dmsorder_1 = require('./../../../store/types/dmsorder.js');
var dmsorder_2 = require('./../../../store/actions/dmsorder.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var return_stock_1 = require('./../../../store/types/return-stock.js');
var inventory_1 = require('./../../../store/types/inventory.js');
var inventory_2 = require('./../../../store/actions/inventory.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var toast_1 = require('./../../../components/vant/toast/toast.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
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
            outIndexR: '',
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
            }
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
            // 零售录入、零售录入新、分销录入、分销录入新、调拨录入适用判断函数
            checkProduct: function (info, type) {
                var invMap = {};
                var uniqueInvMap = {};
                var selectedSame = {};
                var products = _this.additionOrderDetailItem.itemInfo;
                ramda_1.forEachObjIndexed(function (value, key) {
                    var uniqueInvKey = value.orgCode + "_" + value.gicWarehouse + "_" + value.productCode;
                    var oKey = uniqueInvKey + "_" + value.invStatusId + "_" + value.invStatusType;
                    var oSame = oKey + "_" + value.share;
                    invMap[uniqueInvKey] = value;
                    invMap[oKey] = key;
                    uniqueInvMap[uniqueInvKey] = key;
                    selectedSame[oSame] = key;
                }, products);
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
            // 订单审核适用判断函数
            checkPrevProduct: function (info, type) {
                var pages = getCurrentPages();
                var prevpage = pages[pages.length - 2]; // 上一个页面
                var data = prevpage.data; // 获取上一页data里的数据
                if (prevpage) { // 存在上一页
                    var invMap_1 = {};
                    var products = {};
                    if (_this.ly === 'ReviewOrder') { // 订单审核
                        products = data.orderdetail.data.salesOrderItem[_this.itemIndexR];
                    }
                    if (_this.ly === 'distributorReturns') { // 分销商退货
                        products = data.orderdetail.returnOrderItemList[_this.itemIndexR];
                    }
                    if (products && products.outItems) {
                        products.outItems.map(function (value) {
                            var uniqueInvKey = value.orgCode + "_" + value.warehouseId + "_" + value.productCode;
                            var oKey = uniqueInvKey + "_" + value.invStatusId + "_" + value.invStatusType;
                            invMap_1[oKey] = value;
                        });
                    }
                    if (type == '1') { // 组织，仓库，产品编码，质量等级，补差类型相同
                        if (invMap_1[info]) {
                            return invMap_1[info];
                        }
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
                };
                if (_this.key !== '') {
                    _this.methods.getItemInvStatus({
                        productCode: chooseItem.productCode
                    }).then(function (res) {
                        var item = {
                            key: _this.key,
                            chooseItem: chooseItem,
                            stock: res.payload
                        };
                        wepy_redux_1.getStore().dispatch({
                            type: return_stock_1.ORDER_RETURN_STOCK,
                            payload: item
                        });
                    });
                }
                else {
                    if (_this.ly === 'retailNew' || _this.ly === 'channelNew') { // 零售录入（新）、分销录入（新）
                        var uniqueInvKey = chooseItem.orgCode + "_" + chooseItem.gicWarehouse + "_" + chooseItem.productCode;
                        var invStatusKey = chooseItem.invStatusId + "_" + chooseItem.invStatusType;
                        var currProKey = uniqueInvKey + "_" + invStatusKey;
                        // 组织，仓库，产品编码，质量等级，补差类型相同
                        var checkResult = _this.methods.checkProduct(currProKey, '1');
                        if (checkResult && _this.additionOrderDetailItem.itemInfo[checkResult]) {
                            _this.additionOrderDetailItem.itemInfo[checkResult].quantity = Number(_this.additionOrderDetailItem.itemInfo[checkResult].quantity) + 1;
                            var chooseItemId = _this.additionOrderDetailItem.chooseItemId;
                            wepy_redux_1.getStore().dispatch({
                                type: dmsorder_1.DMS_ORDER_CHOOSE_ITEM_INFO,
                                payload: __assign({}, _this.additionOrderDetailItem.itemInfo[chooseItemId])
                            });
                            wx.navigateBack({
                                delta: 1
                            });
                            return;
                        }
                        // 组织，仓库，产品编码相同，质量等级 或者 补差类型 不相同
                        var checkResult2 = _this.methods.checkProduct(uniqueInvKey, '2');
                        if (checkResult2) {
                            toast_1.default.fail('相同产品质量等级和补差类型必须保持一致，请重新选择！');
                            return;
                        }
                    }
                    // 零售录入（新）、分销录入（新）；表单中销售组织和发货仓库已删除;  分销录入（新）需要先选择客户信息，获取到orgId才走以下if判断中内容
                    if (_this.additionOrderDetailItem.orgId || _this.additionOrderDetailItem.shopCisCode) {
                        var key = _this.additionOrderDetailItem.chooseItemId;
                        // 本key选择其他商品时才更新价格之类的信息，同一个商品不用更新价格
                        if (_this.ly === 'channel' || _this.ly === 'channelNew') {
                            // 本key选择其他商品时才更新价格之类的信息，同一个商品不用更新价格
                            if (_this.additionOrderDetailItem.itemInfo[key].productCode !== chooseItem.productCode) {
                                _this.methods.getCisPrice({
                                    type: _this.additionOrderDetailItem.shopCisCode != '' ? '3' : '2',
                                    orgId: _this.additionOrderDetailItem.orgId,
                                    cisCode: _this.additionOrderDetailItem.cisCode,
                                    shopCisCode: _this.additionOrderDetailItem.shopCisCode,
                                    productId: chooseItem.productCode,
                                    refreshPrice: true,
                                }).then(function (res) {
                                    var itemInfo = _this.additionOrderDetailItem.itemInfo;
                                    var key = _this.additionOrderDetailItem.chooseItemId;
                                    if (res.payload.code === 0) {
                                        itemInfo[key].price = res.payload.list[0].retailPrice;
                                        wepy_redux_1.getStore().dispatch({
                                            type: dmsorder_1.DMS_ORDER_CHOOSE_ITEM_INFO,
                                            payload: __assign({}, chooseItem, { price: res.payload.list[0].retailPrice })
                                        });
                                    }
                                });
                            }
                        }
                        else {
                            if (_this.additionOrderDetailItem.itemInfo[key].productCode !== chooseItem.productCode) {
                                _this.methods.getLsPrice({
                                    type: _this.additionOrderDetailItem.shopCisCode != '' ? '3' : '2',
                                    orgId: _this.additionOrderDetailItem.orgId,
                                    cisCode: _this.additionOrderDetailItem.cisCode,
                                    shopCisCode: _this.additionOrderDetailItem.shopCisCode,
                                    productId: chooseItem.productCode,
                                    refreshPrice: true,
                                }).then(function (res) {
                                    var itemInfo = _this.additionOrderDetailItem.itemInfo;
                                    var key = _this.additionOrderDetailItem.chooseItemId;
                                    itemInfo[key].price = res.payload.price;
                                    wepy_redux_1.getStore().dispatch({
                                        type: dmsorder_1.DMS_ORDER_CHOOSE_ITEM_INFO,
                                        payload: __assign({}, chooseItem, { price: res.payload.price })
                                    });
                                });
                            }
                        }
                    }
                    _this.methods.getItemInvStatus({
                        productCode: chooseItem.productCode
                    });
                    //获取补差类型
                    _this.methods.getInvStatusType().then(function (res) {
                        var itemInfo = _this.additionOrderDetailItem.itemInfo;
                        var list = res.payload.data;
                        var key = _this.additionOrderDetailItem.chooseItemId;
                        itemInfo[key].invStateTypes = list.map(function (item) {
                            for (var key_1 in item) {
                                return {
                                    key: key_1,
                                    value: item[key_1]
                                };
                            }
                        });
                        //添加请选择
                        var nullWare = {
                            key: "",
                            value: "请选择"
                        };
                        itemInfo[key].invStateTypes.unshift(nullWare);
                        _this.$apply();
                    });
                    //零售录入新版本获取服务列表
                    if (_this.ly == 'retailNew') {
                        _this.methods.getServiceList(oneItem, chooseItem);
                    }
                    wepy_redux_1.getStore().dispatch({
                        type: dmsorder_1.DMS_ORDER_CHOOSE_ITEM_INFO,
                        payload: chooseItem
                    });
                }
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];
                var currentPage = pages[pages.length - 1]; //获取当前页面的对象
                var url = currentPage.route; //当前页面url
                prevPage.setData({
                    chooseItem: chooseItem,
                    'itemIndexR': _this.itemIndexR,
                    'outIndexR': _this.outIndexR,
                    'curragePageUrl': url
                });
                wx.navigateBack({
                    delta: 1
                });
            },
            // 获取服务列表
            getServiceList: function (oneItem, chooseItem) {
                var _a = _this.requiredParameters, chooseProvinceInfo = _a.chooseProvinceInfo, chooseCityInfo = _a.chooseCityInfo, chooseRegionInfo = _a.chooseRegionInfo, chooseTownInfo = _a.chooseTownInfo, deliveryMethod = _a.deliveryMethod;
                var itemInfo = _this.additionOrderDetailItem.itemInfo;
                var key = _this.additionOrderDetailItem.chooseItemId;
                // 根据发货仓库+配送方式，服务方式字段变化显示
                // 如果仓库为统仓，配送方式选择“配送、自提、配送（加急）“，服务方式字段显示，可选择
                // 如果仓库为统仓，配送方式为“直配到工地“，服务方式字段隐藏，取值空
                // 如果仓库为原仓，服务方式字段隐藏，取值空
                // 省市区必须要有值不然会报错
                if (oneItem.gicWarehouseType == '20' && deliveryMethod && deliveryMethod.id && deliveryMethod.id != '07' && chooseProvinceInfo.id && chooseCityInfo.id && chooseRegionInfo.id && chooseTownInfo.id) {
                    _this.methods.getZoneB2cServiceList({
                        orgCode: oneItem.orgCode,
                        warehouseCode: oneItem.gicWarehouse,
                        provinceCode: chooseProvinceInfo.id,
                        cityCode: chooseCityInfo.id,
                        countyCode: chooseRegionInfo.id,
                        townCode: chooseTownInfo.id,
                    }).then(function (res) {
                        var payload = res.payload;
                        if (payload.data && payload.code == 0 && payload.data.length > 0) {
                            var serviceList = payload.data;
                            var zoneB2cService_1 = [];
                            var zoneB2cServiceName_1 = [];
                            serviceList.forEach(function (it) {
                                if (it.isSupport === '1' && it.isDefault === '1') {
                                    zoneB2cService_1.push(it.serviceCode);
                                    zoneB2cServiceName_1.push(it.serviceName);
                                }
                            });
                            itemInfo[key].serviceList = serviceList;
                            itemInfo[key].zoneB2cService = zoneB2cService_1;
                            itemInfo[key].zoneB2cServiceName = zoneB2cServiceName_1;
                            wepy_redux_1.getStore().dispatch({
                                type: dmsorder_1.DMS_ORDER_CHOOSE_ITEM_INFO,
                                payload: __assign({}, chooseItem, { zoneB2cService: zoneB2cService_1, zoneB2cServiceName: zoneB2cServiceName_1, serviceList: serviceList // 服务方式列表
                                 })
                            });
                        }
                        _this.$apply();
                    });
                }
                _this.$apply();
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
                        // 产品列表是否显示选中标识
                        this.inventoryList = this.inventoryList.map(function (chooseItem) {
                            // 已选产品和产品列表比较 组织，仓库，产品编码，质量等级，补差类型相同 则为选中状态
                            var currProKey = chooseItem.orgCode + "_" + chooseItem.gicWarehouse + "_" + chooseItem.productCode + "_" + chooseItem.invStatusId + "_" + chooseItem.invStatusType;
                            var checkResult = false;
                            if (_this.ly == 'ReviewOrder' || _this.ly === 'distributorReturns') { // 订单审核||分销商退货
                                checkResult = _this.methods.checkPrevProduct(currProKey, '1');
                            }
                            else { // 分销录入、分销录入新、零售录入、零售录入新、调拨录入
                                checkResult = _this.methods.checkProduct(currProKey, '1');
                            }
                            chooseItem.isSelected = false;
                            if (checkResult) {
                                chooseItem.isSelected = true;
                            }
                            return chooseItem;
                        });
                        this.isRequest = false;
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderItemChoose.prototype.onLoad = function (e) {
        if (e.ly == 'ReviewOrder' || e.ly == 'distributorReturns') { // 订单审核详情添加出库信息进入, 分销商出库详情添加出库信息进入
            this.ly = e.ly;
            this.zzprdmodel = e.zzprdmodel;
            this.itemIndexR = e.itemIndex;
            this.outIndexR = e.outIndex;
            if (e.orgId && e.orgId !== 'undefined') {
                this.orgId = e.orgId;
            }
            if (e.isOpenSharedWarehouse && e.isOpenSharedWarehouse !== 'undefined') {
                this.isOpenSharedWarehouse = e.isOpenSharedWarehouse;
            }
            if (e.warehouseId && e.warehouseId !== 'undefined') { // 仓库编码
                this.warehouseId = e.warehouseId;
            }
            if (e.invStatusId && e.invStatusId !== 'undefined') { // 质量等级
                this.invStatusId = e.invStatusId;
            }
            if (e.invStatusType && e.invStatusType !== 'undefined') { // 补差类型
                this.invStatusType = e.invStatusType;
            }
            if (e.isFuzzy == false || e.isFuzzy == 'false') {
                this.isFuzzy = false;
            }
            this.invType = '110';
            this.page.pageNo = 1;
            this.myGetOrderList(this.zzprdmodel);
        }
        var key = e.key;
        if (key) {
            this.key = key;
        }
        else {
            this.key = '';
        }
        //销售组织；零售订单录入，需要根据组织+仓库查询库存
        if (e.orgId && e.orgId !== 'undefined') {
            this.orgId = e.orgId;
        }
        // 发货仓库；
        if (e.warehouseId && e.warehouseId !== 'undefined') {
            this.warehouseId = e.warehouseId;
        }
        if (e.ly) {
            this.ly = e.ly;
        }
        if (e.details) {
            this.details = JSON.parse(e.details); // 产品列表key数组, 暂时不用
        }
        if (this.ly == 'retailNew') {
            this.requiredParameters = JSON.parse(e.requiredParameters); // 零售录入新版主要用来获取省市区
        }
        //清除产品查询列表
        wepy_redux_1.getStore().dispatch({ type: inventory_1.RESET_INVENTORY_QUERIES_LIST, payload: [] });
    };
    OrderItemChoose.prototype.onUnload = function () {
        wepy_redux_1.getStore().dispatch({
            type: dmsorder_1.DMS_ORDER_PRODUCT_LIKE_INFO_CLEAR,
        });
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
            getProductListLikeCode: dmsorder_2.getProductListLikeCode,
            getItemInvStatus: dmsorder_2.getItemInvStatus,
            getCisPrice: dmsorder_2.getCisPrice,
            getLsPrice: dmsorder_2.getLsPrice,
            getInvStatusType: inventory_2.getInvStatusType,
            getInventoryQueriesListNew: inventory_2.getInventoryQueriesListNew,
            getZoneB2cServiceList: dmsorder_2.getZoneB2cServiceList,
        })
    ], OrderItemChoose);
    return OrderItemChoose;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderItemChoose , 'pages/dms/order-item-choose/index'));

