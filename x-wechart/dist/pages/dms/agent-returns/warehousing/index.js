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
var returnbefore_1 = require('./../../../../store/actions/returnbefore.js');
var inventoryTrim_1 = require('./../../../../store/actions/inventoryTrim.js');
var index_1 = require('./../../../components/popup-customize/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '销售退货入库',
            usingComponents: {
                'van-icon': '/components/vant/icon/index',
                'van-toast': '/components/vant/toast/index',
                'van-loading': '/components/vant/loading/index',
                'van-popup': '/components/vant/popup/index',
                'van-field': '/components/vant/field/index',
                'van-stepper': '/components/vant/stepper/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "popupCustomize": { "xmlns:v-bind": "", "v-bind:options.sync": "warehouseOptions", "v-bind:selectedOption.sync": "popSelectedOption", "v-bind:title.sync": "popTitle", "xmlns:v-on": "" } };
        _this.$events = { "popupCustomize": { "v-on:onSelect": "onSelect" } };
        _this.components = {
            popupCustomize: index_1.default,
        };
        _this.data = {
            formData: {
                remark: '',
            },
            warehouseOptions: [],
            popTitle: '',
            popSelectedOption: {},
            formKey: '',
            orderdetail: {},
            itemIndex: 0,
            outIndex: 0,
            returnOrderId: '',
            documentNum: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            returnBack: function () {
                wx.navigateBack({
                    delta: 1 //返回上一级页面
                });
            },
            onRemarkChange: function (e) {
                var key = e.currentTarget.dataset.key;
                var detail = e.detail;
                this.formData[key] = detail;
            },
            // 正品退货数量 || 残次退货数量赋值，并计算小记金额
            onShippedBqtyChg: function (evt) {
                var detail = evt.detail, _a = evt.target.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex, key = _a.key;
                // bug:  触发两次
                if (typeof detail === 'undefined') {
                    return;
                }
                var newOrderDetail = ramda_1.clone(this.orderdetail);
                newOrderDetail.itemList[itemIndex].outItems[outIndex][key] = detail;
                var bprice = newOrderDetail.itemList[itemIndex].outItems[outIndex].bprice;
                // 退货数量 = 正品退货数量 + 残次退货数量
                var bactualQty = newOrderDetail.itemList[itemIndex].outItems[outIndex].bactualQty;
                var defectiveQty = newOrderDetail.itemList[itemIndex].outItems[outIndex].defectiveQty;
                var bQty = bactualQty + defectiveQty;
                var subtotal = bQty * bprice;
                newOrderDetail.itemList[itemIndex].outItems[outIndex].subtotal = subtotal.toFixed(2);
                this.orderdetail = newOrderDetail;
            },
            onPopShow: function (e) {
                var _a = e.currentTarget.dataset, title = _a.title, key = _a.key, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                this.popTitle = title;
                this.formKey = key;
                this.itemIndex = itemIndex;
                this.outIndex = outIndex;
                this.popSelectedOption = this.orderdetail.itemList[itemIndex].outItems[outIndex].warehouse;
                this.$invoke('popupCustomize', 'onShow');
                this.$apply();
            },
            // 弹框组件选择列表项
            onSelect: function (param) {
                this.orderdetail.itemList[this.itemIndex].outItems[this.outIndex].warehouse = param;
                this.popSelectedOption = param;
                this.$invoke('popupCustomize', 'onClose');
                this.$apply();
            },
            // 添加产品信息
            jumpClick: function (e) {
                var itemIndex = e.currentTarget.dataset.itemIndex;
                var chooseItem = this.orderdetail.itemList[itemIndex];
                this.productAssignment(chooseItem, itemIndex);
            },
            // 删除产品信息
            onRemoveOutItem: function (evt) {
                var _a = evt.currentTarget.dataset, itemIndex = _a.itemIndex, outIndex = _a.outIndex;
                var newOrderDetail = ramda_1.clone(this.orderdetail);
                var length = newOrderDetail.itemList[itemIndex].outItems.length;
                if (length > 0) {
                    newOrderDetail.itemList[itemIndex].outItems.splice(outIndex, 1);
                    this.orderdetail = newOrderDetail;
                }
            },
            // 退货入库提交
            onInitSubmit: function () {
                var itemList = this.orderdetail.itemList;
                var orderItem = [];
                var totalAmount = 0;
                var mag = []; // 提交前校验入库数量是否满足
                var warehousingQty = 0; // 添加所有产品的总数量
                ramda_1.forEach(function (item) {
                    var warehousingItemQty = 0; // 当前产品的数量
                    if (item.outItems && item.outItems.length > 0) { //item.outItems只允许有多条数据
                        ramda_1.forEach(function (out) {
                            var data = {
                                model: item.model,
                                productCode: item.productCode,
                                materialCode: item.materialCode,
                                invStatusId: item.invStatusId,
                                ordinaryQty: out.bactualQty,
                                imperfectQty: out.defectiveQty,
                                warehouseId: out.warehouse.id,
                                bprice: out.bprice // 价格
                            };
                            totalAmount += Number(out.subtotal);
                            var allQty = (Number(out.bactualQty) + Number(out.defectiveQty));
                            warehousingQty += allQty;
                            warehousingItemQty += allQty;
                            if (allQty > 0) { // 入库数量大于0才提交
                                orderItem.push(data);
                            }
                        }, item.outItems);
                    }
                    if (warehousingItemQty > item.maxQty) {
                        mag.push("\u4EA7\u54C1\u3010" + item.model + "\u3011\u5165\u5E93\u6570\u91CF\u9700\u5C0F\u4E8E\u7B49\u4E8E(\u9000\u8D27\u6570\u91CF-\u5DF2\u5165\u5E93\u6570\u91CF)\uFF01");
                    }
                }, itemList);
                if (warehousingQty <= 0) {
                    mag.push("\u5165\u5E93\u6570\u91CF\u9700\u5927\u4E8E0\uFF01");
                }
                if (mag.length > 0) {
                    toast_1.default.fail(mag[0]);
                    return false;
                }
                var param = {
                    cisCode: wepy_1.default.$instance.globalData.cisCode,
                    returnOrderId: this.returnOrderId,
                    returnItemList: orderItem,
                };
                this.methods.createAgentReturnOrderInbound(param).then(function (res) {
                    var code = res.payload.code;
                    if (code == '0') {
                        toast_1.default.success({
                            forbidClick: true,
                            duration: 1000,
                            message: '入库成功',
                            onClose: function () {
                                wx.navigateBack({
                                    delta: 1,
                                });
                            },
                        });
                    }
                });
            },
            // 驳回
            onTurnDown: function () {
                var that = this;
                wx.showModal({
                    title: '提示',
                    content: '确定驳回',
                    success: function (res) {
                        return __awaiter(this, void 0, void 0, function () {
                            var param;
                            return __generator(this, function (_a) {
                                if (res.confirm) {
                                    param = {
                                        cisCode: wepy_1.default.$instance.globalData.cisCode,
                                        documentNum: that.orderdetail.documentNum,
                                        message: '',
                                    };
                                    that.methods.cancelReturn(param).then(function (res1) {
                                        var code = res1.payload.code;
                                        if (code == '0') {
                                            toast_1.default.success({
                                                forbidClick: true,
                                                duration: 1000,
                                                message: '驳回成功',
                                                onClose: function () {
                                                    wx.navigateBack({
                                                        delta: 1,
                                                    });
                                                },
                                            });
                                        }
                                    });
                                }
                                return [2 /*return*/];
                            });
                        });
                    },
                });
            }
        };
        return _this;
    }
    // 获取仓库
    Filter.prototype.getStoreHouseData = function () {
        var _this = this;
        var param = {
            orgId: this.orderdetail.orgId
        };
        this.methods.getStoreHouse(param).then(function (res) {
            var data = res.payload.data;
            if (data && data.length) {
                _this.warehouseOptions = data.map(function (item) {
                    return __assign({}, item, { id: item.cId, name: item.name });
                });
            }
            if (_this.orderdetail.itemList && _this.orderdetail.itemList.length > 0) {
                _this.orderdetail.itemList.forEach(function (item, index) {
                    // 最大入库数量 = 退货数量 - 已入库数量
                    _this.orderdetail.itemList[index].maxQty = item.borderedQty - item.shippedBqty;
                    _this.productAssignment(item, index, 0);
                });
            }
            _this.$apply();
        });
    };
    // 添加或修改产品赋值
    Filter.prototype.productAssignment = function (chooseItem, itemIndex, outIndex) {
        var outItems = this.orderdetail.itemList[itemIndex].outItems;
        var warehouse = this.warehouseOptions[0];
        var outBoundItem = {
            warehouse: {
                id: warehouse && warehouse.id,
                name: warehouse && warehouse.name
            },
            bactualQty: 0,
            defectiveQty: 0,
            bprice: chooseItem.bprice,
            subtotal: 0.00,
        };
        outBoundItem.subtotal = outBoundItem.subtotal.toFixed(2);
        if (!Array.isArray(outItems)) {
            outItems = [];
        }
        if (outIndex && outIndex !== 'undefined') { // 如果outIndex有值为编辑直接替换数据；否则为新增
            outItems[outIndex] = outBoundItem;
        }
        else {
            outItems.push(outBoundItem);
        }
        this.orderdetail.itemList[itemIndex].outItems = outItems;
        this.$apply();
    };
    // 获取退货发起详情
    Filter.prototype.getMyOrderDetail = function () {
        var _this = this;
        var param = {
            cisCode: wepy_1.default.$instance.globalData.cisCode,
            returnOrderId: this.returnOrderId,
        };
        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
        this.methods.getAgentReturnOrderDetail(param).then(function (res) {
            toast_1.default.clear();
            var data = res.payload.data;
            _this.orderdetail = data;
            _this.formData.remark = _this.orderdetail.message || '';
            _this.getStoreHouseData();
            _this.$apply();
        });
    };
    Filter.prototype.onShow = function () {
    };
    Filter.prototype.onLoad = function (e) {
        var returnOrderId = e.returnOrderId, documentNum = e.documentNum;
        this.returnOrderId = returnOrderId;
        this.documentNum = documentNum;
        this.getMyOrderDetail();
        this.$apply();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            getAgentReturnOrderDetail: returnbefore_1.getAgentReturnOrderDetail,
            createAgentReturnOrderInbound: returnbefore_1.createAgentReturnOrderInbound,
            cancelReturn: returnbefore_1.cancelReturn,
            getStoreHouse: inventoryTrim_1.getStoreHouse,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/dms/agent-returns/warehousing/index'));

