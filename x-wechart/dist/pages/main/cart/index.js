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
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var cart_1 = require('./../../../store/actions/cart.js');
var order_1 = require('./../../../store/actions/order.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var common_1 = require('./../../../mixins/common.js');
var index_1 = require('./../../../utils/index.js');
var index_2 = require('./../../../components/empty-data-type/index.js');
var cart_2 = require('./../../../store/types/cart.js');
var distributorsorder_1 = require('./../../../store/types/distributorsorder.js');
var getDiscount = function (fixedDiscount) {
    var discountStr = (100 - parseFloat(fixedDiscount)) / 100;
    var discount = parseFloat(discountStr);
    return discount;
};
// 获取常用的 store
var stores = wepy_redux_1.getStore();
var ShopCart = /** @class */ (function (_super) {
    __extends(ShopCart, _super);
    function ShopCart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '购物车',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-loading': '../../../components/vant/loading/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-stepper': '../../../components/vant/stepper/index',
                'van-swipe-cell': '../../../components/vant/swipe-cell/index',
                'img': '../../../components/img/index',
                'no-permission': '../../../components/no-permission/index',
            },
            enablePullDownRefresh: true,
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "购物车" }, "emptyDataAuth": { "description": "权限" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_2.default,
            emptyDataAuth: index_2.default,
        };
        _this.data = {
            isCheckAll: false,
            servicesVisible: false,
            policyVisible: false,
            policyArr: [],
            selectees: [],
            totalPrice: 0.0,
            totalVolume: 0.000,
            login: true,
            whichPopupShow: '',
            MerchantAbbreviation: [],
            MerchantAbbreviationChild: [],
            MerchantAbbreviationkey: [],
            MerchantAbbreviationChildFirstName: '',
            MerchantAbbreviationChildFirstKey: '',
            gowhere: '',
            dmsTotalPrice: 0.00,
            defaultNumber: 1,
            editStatus: true,
            isNoticePopupShow: false,
            expressFee: wepy_1.default.$instance.globalData.expressFee,
            shoppingCartPermissions: false,
            freeShippingTip: '',
            newGroupList: [],
            newGroupPolicies: {},
            groupIndex: 0,
        };
        _this.canSelect = [];
        _this.watch = {
            newGroupList: function () {
                if (this.gowhere == 'C') {
                    this.countTotalPrice();
                }
                else {
                    this.countDmsTotalPrice();
                }
            },
            selectees: function () {
                this.isCheckAll = this.selectees.length === this.canSelect.length;
            },
        };
        _this.mixins = [common_1.default];
        _this.policyItem = null;
        _this.methods = {
            //提示框
            noticePopupOpen: function () {
                _this.isNoticePopupShow = true;
            },
            noticePopupClose: function () {
                _this.isNoticePopupShow = false;
            },
            // 供应商和物料组
            toggleServicesVisible: function (key) {
                this.whichPopupShow = key;
                this.servicesVisible = !this.servicesVisible;
                this.$apply();
            },
            // 增加勾选删除
            allEdit: function () {
                _this.servicesVisible = false;
                _this.editStatus = !_this.editStatus;
                // 清空已选择的数据
                _this.selectees = [];
                _this.dmsTotalPrice = 0;
            },
            chooseItemgroup: function (code, name) {
                _this.MerchantAbbreviationChildFirstName = name;
                _this.MerchantAbbreviationChildFirstKey = code;
                _this.servicesVisible = false;
                _this.$apply();
                _this.getShopList(code);
            },
            // 选择供应商和物料组
            chooseServices: function (id) {
                var that = this;
                if (!id) {
                    this.MerchantAbbreviation = [];
                    this.MerchantAbbreviationkey = [];
                }
                else {
                    ramda_1.forEach(function (item) {
                        if (item.key == id) {
                            var index = that.MerchantAbbreviationkey.findIndex(function (it) { return it == id; });
                            if (index > -1) {
                                that.MerchantAbbreviationkey.splice(index, 1);
                                that.MerchantAbbreviation.splice(index, 1);
                            }
                            else {
                                that.MerchantAbbreviationkey.push(item.key);
                                that.MerchantAbbreviation.push(item.value);
                            }
                        }
                    }, this.orgList);
                }
                this.$apply();
            },
            // 顶部筛选点击确定获取数据
            filterSure: function () {
                this.servicesVisible = false;
                this.getShopList();
                this.$apply();
            },
            // 政策选择
            openPolicy: function (item, groupIndex) {
                var productId = item.productId, policy = item.policy, quantity = item.quantity;
                // const policyArr = this.policies[productId] || [];
                var policyArr = this.newGroupPolicies[productId] || [];
                // 如果数量超过政策最大数量，增加字段disabled=true
                policyArr.forEach(function (p) {
                    p.disabled = quantity > p.canQuantity;
                });
                this.updatePolicy(policyArr, policy && policy.id);
                this.policyVisible = true;
                this.policyItem = item;
                this.groupIndex = groupIndex;
            },
            closePolicy: function () {
                this.policyVisible = false;
            },
            // 选择政策
            choosePolicy: function (item) {
                var _this = this;
                this.policyVisible = false;
                var id = item.id;
                var _a = this.policyItem, productCode = _a.productCode, orgId = _a.orgId, orgCode = _a.orgCode;
                if (!item.checked) {
                    toast_1.default.loading('加载中');
                    this.methods.changePolicy({
                        versionId: id,
                        productId: productCode,
                        orgCode: orgCode,
                        orgId: orgId,
                    }, item).then(function (res) {
                        toast_1.default.clear();
                        var payload = res.payload;
                        // 如果选中政策，向对应列表中添加policy字段并更新页面，对应价格随之改变
                        if (payload.pricingGroupName) {
                            var productId = payload.productId, fixedDiscount = payload.fixedDiscount, policy = payload.policy, pricingGroupName = payload.pricingGroupName, makeUpType = payload.makeUpType;
                            var list = _this.newGroupList[_this.groupIndex].cartDTOs;
                            var index = ramda_1.findIndex(ramda_1.propEq('productCode', "" + productId), list);
                            if (index >= 0) {
                                var item_1 = list[index];
                                var price = policy.price;
                                var discount = getDiscount(fixedDiscount);
                                policy.makeUpType = makeUpType;
                                item_1.policy = __assign({}, policy, { fixedDiscount: fixedDiscount,
                                    pricingGroupName: pricingGroupName, policyDiscount: discount, policyPrice: (price * discount).toFixed(2), policyTotalPrice: ((price * item_1.quantity) * discount).toFixed(2) });
                                _this.newGroupList[_this.groupIndex].cartDTOs = ramda_1.update(index, item_1, list);
                            }
                        }
                        _this.updatePolicy(_this.policyArr, id);
                        _this.$apply();
                    }).catch(function () {
                        toast_1.default.clear();
                    });
                }
                else {
                    // 取消选择
                    stores.dispatch({ type: 'RESET_CART_ITEM_POLICY', payload: { productCode: productCode } });
                }
            },
            // 取消/选择商品
            toggleCart: function (cartId, isSell, groupIndex) {
                if (_this.editStatus && !isSell) {
                    return;
                }
                var list = _this.newGroupList[groupIndex]; // 当前产品组对象
                if (!_this.editStatus) {
                    list.canSelect = list.cartDTOs;
                }
                else if (isSell) {
                    list.canSelect = ramda_1.filter(function (_a) {
                        var isSell = _a.isSell;
                        return isSell;
                    }, list.cartDTOs) || [];
                }
                if (ramda_1.includes(cartId, list.selectees)) {
                    var index = ramda_1.indexOf(cartId, list.selectees);
                    list.selectees = ramda_1.remove(index, 1, list.selectees);
                }
                else {
                    list.selectees.push(cartId);
                }
                list.isCheckAll = list.selectees.length === list.canSelect.length;
                _this.methods.groupCheckChangeCheckAll();
                _this.$apply();
            },
            // 当前组全选/全取消产品
            currGroupCheckAll: function (groupIndex) {
                var list = this.newGroupList[groupIndex]; // 当前产品组对象
                if (!this.editStatus) {
                    list.canSelect = list.cartDTOs;
                }
                else {
                    if (this.gowhere == 'C') {
                        list.canSelect = ramda_1.filter(function (_a) {
                            var isSell = _a.isSell;
                            return isSell;
                        }, list.cartDTOs) || [];
                    }
                    else {
                        list.canSelect = ramda_1.filter(function (_a) {
                            var dmsIsSell = _a.dmsIsSell;
                            return dmsIsSell;
                        }, list.cartDTOs) || [];
                    }
                }
                if (list.canSelect.length > 0) {
                    if (list.selectees.length === list.canSelect.length) {
                        list.selectees = [];
                    }
                    else {
                        list.selectees = ramda_1.map(function (_a) {
                            var id = _a.id;
                            return id;
                        }, list.canSelect);
                    }
                }
                list.isCheckAll = list.selectees.length === list.canSelect.length;
                this.methods.groupCheckChangeCheckAll();
                this.$apply();
            },
            // 选中产品和当前组全选的时候 ，判断所有产品是否全选
            groupCheckChangeCheckAll: function () {
                var list = [];
                var selectees = [];
                _this.newGroupList.forEach(function (groupList) {
                    groupList.cartDTOs.forEach(function (item) {
                        list.push(item);
                    });
                    groupList.selectees.forEach(function (sel) {
                        selectees.push(sel);
                    });
                });
                if (!_this.editStatus) {
                    _this.canSelect = list;
                }
                else {
                    if (_this.gowhere == 'C') {
                        _this.canSelect = ramda_1.filter(function (_a) {
                            var isSell = _a.isSell;
                            return isSell;
                        }, list) || [];
                    }
                    else {
                        _this.canSelect = ramda_1.filter(function (_a) {
                            var dmsIsSell = _a.dmsIsSell;
                            return dmsIsSell;
                        }, list) || [];
                    }
                }
                _this.selectees = selectees;
                _this.isCheckAll = _this.selectees.length === _this.canSelect.length;
            },
            // 分销商下单选中
            // editStatus 为false 表示可以在编辑状态下被选中 可进行删除操作
            // 为true 表示进行的是下单操作
            dmstoggleCart: function (cartId, dmsIsSell, groupIndex) {
                if (this.editStatus && !dmsIsSell) {
                    return;
                }
                var list = this.newGroupList[groupIndex]; // 当前产品组对象
                if (!this.editStatus) {
                    list.canSelect = list.cartDTOs;
                }
                else if (dmsIsSell) {
                    list.canSelect = ramda_1.filter(function (_a) {
                        var dmsIsSell = _a.dmsIsSell;
                        return dmsIsSell;
                    }, list.cartDTOs) || [];
                }
                if (ramda_1.includes(cartId, list.selectees)) {
                    var index = ramda_1.indexOf(cartId, list.selectees);
                    list.selectees = ramda_1.remove(index, 1, list.selectees);
                }
                else {
                    list.selectees.push(cartId);
                }
                list.isCheckAll = list.selectees.length === list.canSelect.length;
                this.methods.groupCheckChangeCheckAll();
                this.$apply();
            },
            onCountPlus: function (cartId, productId, groupIndex, itemIndex) {
                var list = this.unfoldGroupList();
                var cartItem = ramda_1.filter(function (_a) {
                    var id = _a.id;
                    return id === cartId;
                }, list);
                this.methods.onCountBlur(cartId, productId, groupIndex, itemIndex, {
                    detail: {
                        value: "" + (cartItem[0].quantity + 1)
                    }
                }, this);
            },
            onCountMinus: function (cartId, productId, groupIndex, itemIndex) {
                var list = this.unfoldGroupList();
                var cartItem = ramda_1.filter(function (_a) {
                    var id = _a.id;
                    return id === cartId;
                }, list);
                this.methods.onCountBlur(cartId, productId, groupIndex, itemIndex, {
                    detail: {
                        value: "" + (cartItem[0].quantity - 1)
                    }
                }, this);
            },
            // 数量改变
            onCountBlur: function (cartId, productId, groupIndex, itemIndex, evt, context) {
                if (!context) {
                    context = this;
                }
                var quantity = parseInt(evt.detail.value, 10);
                var listObj = context.newGroupList[groupIndex];
                // 查看是否选择政策
                // 如果选了政策，大于政策数量，重置数量
                var policyArr = listObj.cartDTOs[itemIndex].policy;
                if (policyArr) {
                    if (quantity > policyArr.canQuantity) {
                        toast_1.default.fail("\u6700\u5927\u6570\u91CF\u4E0D\u80FD\u8D85\u8FC7" + policyArr.canQuantity);
                        stores.dispatch({
                            type: cart_2.RESET_CART_ITEM_QUANTITY,
                            payload: cartId
                        });
                        return;
                    }
                }
                toast_1.default.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });
                context.methods.updateItemQuantity({ cartId: cartId, quantity: quantity }, function () {
                    toast_1.default.clear();
                    if (!ramda_1.includes(cartId, listObj.selectees)) {
                        listObj.selectees.push(cartId);
                    }
                    if (context.gowhere == 'C') {
                        listObj.canSelect = ramda_1.filter(function (_a) {
                            var isSell = _a.isSell;
                            return isSell;
                        }, listObj.cartDTOs) || [];
                    }
                    else {
                        listObj.canSelect = ramda_1.filter(function (_a) {
                            var dmsIsSell = _a.dmsIsSell;
                            return dmsIsSell;
                        }, listObj.cartDTOs) || [];
                    }
                    listObj.cartDTOs[itemIndex].quantity = quantity;
                    listObj.isCheckAll = listObj.selectees.length === listObj.canSelect.length;
                    context.methods.groupCheckChangeCheckAll();
                    context.$apply();
                });
            },
            // 删除单个商品 removeCartItem
            itemRemove: function (cartId) {
                var _this = this;
                dialog_1.default.confirm({
                    title: '确认删除?',
                    message: '删除后不可恢复',
                }).then(function () {
                    toast_1.default.loading('删除中...');
                    _this.methods.removeCartItem({ cartId: cartId }, function (res) {
                        var data = res.data;
                        if (data && data === 'Y') {
                            toast_1.default.success('删除成功');
                            var index = ramda_1.indexOf(cartId, _this.selectees);
                            if (index >= 0) {
                                _this.selectees = ramda_1.remove(index, 1, _this.selectees); // 所有选择产品中移除
                            }
                            _this.getCartSupplyAndItemGroupData();
                            _this.$apply();
                        }
                        else {
                            toast_1.default.fail('删除失败');
                        }
                    });
                });
            },
            // 全部删除
            allDelete: function () {
                var _this = this;
                if (this.selectees.length < 1) {
                    return;
                }
                dialog_1.default.confirm({
                    title: '确认删除?',
                    message: '删除后不可恢复',
                }).then(function () {
                    toast_1.default.loading('删除中...');
                    _this.methods.removeCartItem({ cartIds: _this.selectees.toString() }, function (res) {
                        var data = res.data;
                        if (data && data === 'Y') {
                            toast_1.default.success('删除成功');
                            _this.selectees = []; // 所选产品全部删除
                            _this.getCartSupplyAndItemGroupData();
                            _this.$apply();
                        }
                        else {
                            toast_1.default.fail('删除失败');
                        }
                    });
                });
            },
            // 全选
            checkAll: function () {
                var _this = this;
                var list = [];
                this.newGroupList.forEach(function (groupList) {
                    groupList.cartDTOs.forEach(function (item) {
                        list.push(item);
                    });
                });
                if (!this.editStatus) {
                    this.canSelect = list;
                }
                else {
                    if (this.gowhere == 'C') {
                        this.canSelect = ramda_1.filter(function (_a) {
                            var isSell = _a.isSell;
                            return isSell;
                        }, list) || [];
                    }
                    else {
                        this.canSelect = ramda_1.filter(function (_a) {
                            var dmsIsSell = _a.dmsIsSell;
                            return dmsIsSell;
                        }, list) || [];
                    }
                }
                if (this.canSelect.length > 0) {
                    if (this.selectees.length === this.canSelect.length) {
                        this.selectees = [];
                    }
                    else {
                        this.selectees = ramda_1.map(function (_a) {
                            var id = _a.id;
                            return id;
                        }, this.canSelect);
                    }
                }
                this.isCheckAll = this.selectees.length === this.canSelect.length;
                // 判断产品列表里的选项是否选中
                var that = this;
                this.newGroupList.forEach(function (list) {
                    if (!that.editStatus) {
                        list.canSelect = list.cartDTOs;
                    }
                    else {
                        if (_this.gowhere == 'C') {
                            list.canSelect = ramda_1.filter(function (_a) {
                                var isSell = _a.isSell;
                                return isSell;
                            }, list.cartDTOs) || [];
                        }
                        else {
                            list.canSelect = ramda_1.filter(function (_a) {
                                var dmsIsSell = _a.dmsIsSell;
                                return dmsIsSell;
                            }, list.cartDTOs) || [];
                        }
                    }
                    if (that.isCheckAll) {
                        list.selectees = ramda_1.map(function (_a) {
                            var id = _a.id;
                            return id;
                        }, list.canSelect);
                    }
                    else {
                        list.selectees = [];
                    }
                    list.isCheckAll = list.selectees.length === list.canSelect.length;
                });
            },
            itemStar: function (productId, orgId) {
                return __awaiter(this, void 0, void 0, function () {
                    var api, res, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                api = 'oftenProduct/addOftenProduct.nd';
                                return [4 /*yield*/, request_1.request({ api: api, method: 'POST', data: { orgId: orgId, id: productId } })];
                            case 1:
                                res = _a.sent();
                                if (res && res === 'Y') {
                                    toast_1.default.success({
                                        message: '收藏成功',
                                        duration: 1000,
                                    });
                                }
                                else {
                                    toast_1.default.fail('商品已存在');
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                toast_1.default.fail('收藏失败');
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
            // 下单
            submitOrder: function (type) {
                var _this = this;
                //下单确认页 -> 是否显示入库仓库 Y不显示 N显示
                var shareFlag = this.canSelect[0].shareFlag;
                var list = this.unfoldGroupList();
                if (this.selectees.length > 0) {
                    // --------下单类型判断开始------
                    var isCanSubmit_1 = true;
                    var msg_1 = '';
                    var selecteesConventionalName_1 = [];
                    var selecteesEmergencyName_1 = [];
                    var orgAndmaterialGroup_1 = []; // 跨供应商-物料组数据；如果数据大于一条，说明选中产品跨供应商-物料组不能下单
                    var supplierId_1 = []; // 代理id
                    var supplierName_1 = []; // 代理供应商名称
                    ramda_1.forEach(function (id) {
                        var item = ramda_1.find(ramda_1.propEq('id', id), list);
                        if (item && item.id) {
                            var index = orgAndmaterialGroup_1.findIndex(function (it) { return it == (item.orgId + '-' + item.materialGroupId); });
                            if (index <= -1) {
                                orgAndmaterialGroup_1.push(item.orgId + '-' + item.materialGroupId);
                                if (supplierId_1.findIndex(function (it) { return it == (item.agentCode); }) <= -1) {
                                    supplierId_1.push(item.agentCode);
                                    supplierName_1.push(item.agentName);
                                    // supplierName.push(item.agentName+'-'+item.orgName)
                                }
                            }
                            var purchaseType = item.purchaseType;
                            //1应急订单 2常规订单
                            if (type == 1 && !(purchaseType == type || purchaseType == 3)) {
                                isCanSubmit_1 = false;
                                selecteesConventionalName_1.push(item.name);
                                msg_1 = "\u9009\u62E9\u7684\u3010" + selecteesConventionalName_1.toString() + "\u3011\u4EA7\u54C1\u4E0D\u652F\u6301\u5E94\u6025\u91C7\u8D2D\uFF01";
                            }
                            if (type == 2 && !(purchaseType == type || purchaseType == 3)) {
                                isCanSubmit_1 = false;
                                selecteesEmergencyName_1.push(item.name);
                                msg_1 = "\u9009\u62E9\u7684\u3010" + selecteesEmergencyName_1.toString() + "\u3011\u4EA7\u54C1\u4E0D\u652F\u6301\u5E38\u89C4\u4E0B\u5355\uFF01";
                            }
                        }
                    }, this.selectees);
                    var isAcrossMaterialGroup = false;
                    if (orgAndmaterialGroup_1.length > 1) {
                        if (this.gowhere == 'C') {
                            isCanSubmit_1 = false;
                            msg_1 = "\u76EE\u524D\u4E0D\u652F\u6301\u8DE8\u4F9B\u5E94\u5546-\u7269\u6599\u7EC4\u4E0B\u5355\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\uFF01";
                        }
                        else { // 渠道下单支持同供应商跨物料组下单，不支持跨供应商下单
                            isAcrossMaterialGroup = true;
                            if (supplierId_1.length > 1) {
                                isCanSubmit_1 = false;
                                msg_1 = "\u76EE\u524D\u4E0D\u652F\u6301\u8DE8\u4F9B\u5E94\u5546\u4E0B\u5355\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\uFF01";
                            }
                        }
                    }
                    if (!isCanSubmit_1) {
                        toast_1.default.fail(msg_1);
                        return;
                    }
                    // -------下单类型判断结束-----------
                    if (this.gowhere == 'C') { // 海信下单
                        var carts_1 = [];
                        var versions_1 = [];
                        var versionStr = '';
                        ramda_1.forEach(function (id) {
                            var item = ramda_1.find(ramda_1.propEq('id', id), list);
                            if (item && item.id) {
                                var policy = item.policy;
                                carts_1.push(id);
                                if (policy && policy.id) {
                                    versions_1.push(policy.id);
                                }
                                else {
                                    versions_1.push('');
                                }
                            }
                        }, this.selectees);
                        if (versions_1.length === 0) {
                            var versionItem = ramda_1.repeat(',', carts_1.length - 1);
                            versionStr = ramda_1.join('', versionItem);
                        }
                        else {
                            versionStr = ramda_1.join(',', versions_1);
                        }
                        toast_1.default.loading({
                            forbidClick: true,
                            message: '结算中...',
                        });
                        this.methods.takeCommonOrder({
                            orgAndGroup: orgAndmaterialGroup_1[0],
                            carts: ramda_1.join(',', carts_1),
                            versions: versionStr,
                            purchaseType: type
                        }, function (res) {
                            var data = res.data;
                            if (data && data.cartOrder) {
                                toast_1.default.clear();
                                wx.navigateTo({
                                    url: "/pages/goods/order/index?type=common&totalVolume=" + _this.totalVolume + '&shareFlag=' + shareFlag,
                                });
                            }
                            else {
                                toast_1.default.fail(data.msg || '结算失败');
                            }
                        });
                    }
                    else { // 渠道下单
                        toast_1.default.loading({
                            forbidClick: true,
                            message: '结算中...',
                        });
                        var dmsGoods_1 = [];
                        ramda_1.forEach(function (id) {
                            var item = ramda_1.find(ramda_1.propEq('id', id), list);
                            var dmsitem = {
                                productCode: item.productId,
                                productName: item.fullName,
                                errImg: item.errImg,
                                img: item.img,
                                model: item.name,
                                colour: item.color,
                                invStatusId: '',
                                priceId: '',
                                price: item.standardPrice,
                                orderedQty: item.quantity || 1,
                                cartId: id,
                                loadVolume: item.loadVolume,
                                orgIg: item.orgId,
                                orgCode: item.orgId,
                            };
                            dmsGoods_1.push(dmsitem);
                        }, this.selectees);
                        var orgCodeAndmatklId = orgAndmaterialGroup_1[0].trim().split("-");
                        // 模拟数据
                        var item = {
                            orgCode: orgCodeAndmatklId[0] || '',
                            matklId: orgCodeAndmatklId[1] || '',
                            supplierId: supplierId_1[0] || '',
                            supplierIdName: supplierName_1[0] || '',
                            purchaseOrderItem: dmsGoods_1,
                            totalVolume: this.totalVolume,
                        };
                        wepy_redux_1.getStore().dispatch({ type: distributorsorder_1.GET_CART_GOODS_LIST_INFO, payload: item });
                        toast_1.default.clear();
                        wx.navigateTo({
                            url: "../../goods/distributors-order/index" + '?shareFlag=' + shareFlag + '&isAcrossMaterialGroup=' + isAcrossMaterialGroup
                        });
                    }
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 平铺重组的数据列表
    ShopCart.prototype.unfoldGroupList = function () {
        var list = [];
        this.newGroupList.forEach(function (groupList) {
            groupList.cartDTOs.forEach(function (item) {
                list.push(item);
            });
        });
        return list;
    };
    // 计算商品价格
    ShopCart.prototype.countTotalPrice = function () {
        var list = this.unfoldGroupList();
        var totalPrice = 0.00;
        var totalVolume = 0.00;
        ramda_1.forEach(function (id) {
            var item = ramda_1.find(ramda_1.propEq('id', id), list);
            if (item && item.id) {
                var quantity = item.quantity, discount = item.discount, price = item.price, policy = item.policy, loadVolume = item.loadVolume;
                var itemPrice = 0;
                var itemLoadVolume = 0;
                if (policy && policy.id) {
                    var policyDiscount = policy.policyDiscount;
                    itemPrice = ((policy.price * quantity) * policyDiscount).toFixed(2);
                }
                else {
                    itemPrice = ((price * quantity) * discount).toFixed(2);
                }
                itemLoadVolume = loadVolume ? (loadVolume * quantity).toFixed(3) : '0.000';
                totalPrice = ramda_1.add(totalPrice, itemPrice);
                totalVolume = ramda_1.add(totalVolume, itemLoadVolume);
            }
        }, this.selectees);
        if (isNaN(totalPrice)) {
            totalPrice = 0.00;
        }
        if (isNaN(totalVolume)) {
            totalVolume = 0.000;
        }
        this.totalPrice = totalPrice.toFixed(2);
        this.totalVolume = totalVolume.toFixed(3);
        this.$apply();
    };
    // 计算分销商商品价格
    ShopCart.prototype.countDmsTotalPrice = function () {
        var _this = this;
        var list = this.unfoldGroupList();
        var totalPrice = 0.00;
        var totalVolume = 0.000;
        //只计算已选择的价格
        ramda_1.forEach(function (item) {
            if (ramda_1.includes(item.id, _this.selectees)) {
                item.itemtotalprice = ((item.standardPrice) * (item.quantity || 1).toFixed(2));
                if (item.itemtotalprice) {
                    totalPrice = ramda_1.add(totalPrice, item.itemtotalprice);
                }
                var itemLoadVolume = item.loadVolume ? (item.loadVolume * item.quantity).toFixed(3) : '0.000';
                totalVolume = ramda_1.add(totalVolume, itemLoadVolume);
            }
        }, list);
        this.dmsTotalPrice = totalPrice.toFixed(2);
        this.totalVolume = totalVolume.toFixed(3);
        this.$apply();
    };
    // 更新 policy 列表
    ShopCart.prototype.updatePolicy = function (list, id) {
        this.policyArr = ramda_1.map(function (item) { return (__assign({}, item, { checked: item.id === id })); }, list);
    };
    // 获取购物车列表
    ShopCart.prototype.getShopList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, item, _b, _c, item;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.newGroupList = [];
                        this.newGroupPolicies = {};
                        toast_1.default.loading({
                            forbidClick: true,
                            message: '加载中',
                        });
                        if (!(this.MerchantAbbreviationkey.length <= 0)) return [3 /*break*/, 5];
                        _i = 0, _a = this.orgList;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        item = _a[_i];
                        return [4 /*yield*/, this.queryCartDataList(item.key)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        _b = 0, _c = this.MerchantAbbreviationkey;
                        _d.label = 6;
                    case 6:
                        if (!(_b < _c.length)) return [3 /*break*/, 9];
                        item = _c[_b];
                        return [4 /*yield*/, this.queryCartDataList(item)];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8:
                        _b++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ShopCart.prototype.queryCartDataList = function (orgAndGroup) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, getCartDmsPrice, getCartDmsStocks, getCartList, getPrices, getStocks, data, result, products, codes, orgCodes, orgIds, agentCisCodes, res, key, oIndex, res, key, oIndex, groupObj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.methods, getCartDmsPrice = _a.getCartDmsPrice, getCartDmsStocks = _a.getCartDmsStocks, getCartList = _a.getCartList, getPrices = _a.getPrices, getStocks = _a.getStocks;
                        data = orgAndGroup ? { orgAndGroup: orgAndGroup } : null;
                        return [4 /*yield*/, getCartList({ data: data })];
                    case 1:
                        result = _b.sent();
                        if (!(result && result.payload && result.payload.cartDTOs)) return [3 /*break*/, 8];
                        products = ramda_1.map(function (_a) {
                            var orgId = _a.orgId, orgCode = _a.orgCode, productId = _a.productId, agentCisCode = _a.agentCisCode;
                            return ({ orgId: orgId, orgCode: orgCode, productId: productId, agentCisCode: agentCisCode });
                        }, result.payload.cartDTOs);
                        codes = ramda_1.map(function (_a) {
                            var productId = _a.productId;
                            return productId;
                        }, products);
                        orgCodes = ramda_1.map(function (_a) {
                            var orgCode = _a.orgCode;
                            return orgCode;
                        }, products);
                        orgIds = ramda_1.map(function (_a) {
                            var orgId = _a.orgId;
                            return orgId;
                        }, products);
                        agentCisCodes = ramda_1.map(function (_a) {
                            var agentCisCode = _a.agentCisCode;
                            return agentCisCode;
                        }, products);
                        if (!(this.gowhere == 'C')) return [3 /*break*/, 4];
                        return [4 /*yield*/, getPrices({
                                code: ramda_1.join(',', codes),
                                orgId: ramda_1.join(',', orgIds),
                                orgCode: ramda_1.join(',', orgCodes),
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, getStocks({
                                code: ramda_1.join(',', codes),
                                orgId: ramda_1.join(',', orgIds),
                                queryType: 'purchase',
                            })];
                    case 3:
                        res = _b.sent();
                        for (key in this.list) {
                            if (res.payload[key] && res.payload[key].productCode) {
                                oIndex = this.list.map(function (item) { return item.productId; }).indexOf(Number(res.payload[key].productCode));
                                this.list[oIndex].inventory = res.payload[key].inventory;
                                this.list[oIndex].ownInv = res.payload[key].ownInv;
                                this.list[oIndex].sharedInv = res.payload[key].sharedInv;
                                this.list[oIndex].isFenXiao = result.payload.cartDTOs[key].isFenXiao;
                            }
                        }
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, getCartDmsPrice({
                            orgId: ramda_1.join(',', orgIds),
                            productId: ramda_1.join(',', codes),
                        })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, getCartDmsStocks({
                                orgId: orgIds[0],
                                productCodes: codes,
                                supplierCode: agentCisCodes[0],
                            })];
                    case 6:
                        res = _b.sent();
                        for (key in this.list) {
                            if (res.payload.data[key] && res.payload.data[key].productCode) {
                                oIndex = this.list.map(function (item) { return item.productId; }).indexOf(Number(res.payload.data[key].productCode));
                                this.list[oIndex].invQty = res.payload.data[key].invQty;
                                this.list[oIndex].gicInvQty = res.payload.data[key].gicInvQty;
                                this.list[oIndex].isFenXiao = result.payload.cartDTOs[key].isFenXiao;
                            }
                        }
                        _b.label = 7;
                    case 7:
                        this.selectees = [];
                        this.$apply();
                        _b.label = 8;
                    case 8:
                        if (this.list && this.list.length) {
                            this.newGroupPolicies = __assign({}, this.newGroupPolicies, this.policies); // 重组的政策列表
                            groupObj = {
                                agentId: this.list[0].agentId,
                                agentName: this.list[0].agentName || '',
                                orgId: this.list[0].orgId,
                                orgName: this.list[0].orgName,
                                materialGroupId: this.list[0].materialGroupId,
                                materialGroupName: this.list[0].materialGroupName,
                                isCheckAll: false,
                                canSelect: [],
                                selectees: [],
                                cartDTOs: this.list // 当前组数据列表
                            };
                            this.newGroupList.push(groupObj);
                            this.$apply();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取三期供应商和物料组
    ShopCart.prototype.getCartSupplyAndItemGroupData = function () {
        var _this = this;
        this.newGroupList = [];
        this.MerchantAbbreviationkey = [];
        this.MerchantAbbreviation = [];
        this.methods.getCartSupplyAndItemGroup({ queryType: 'list' }).then(function (res) {
            if (res && res.payload && res.payload.list && res.payload.list.length > 0) {
                _this.gowhere = res.payload.list[0].type || '';
                // 默认取第一个供应商-物料组
                _this.MerchantAbbreviationkey.push(_this.orgList[0].key);
                _this.MerchantAbbreviation.push(_this.orgList[0].value);
                //this.gowhere == 'P' 分销商-渠道采购；；；this.gowhere == 'C' 代理商-海信采购
                if (_this.gowhere == 'P') {
                    _this.dmsTotalPrice = 0.00;
                }
                _this.getShopList();
            }
            _this.$apply();
        });
    };
    ShopCart.prototype.getPermissionList = function () {
        if (wx.getStorageSync('b2b_permission_list')) {
            var shoppingCartPermissions = JSON.parse(wx.getStorageSync('b2b_permission_list')).shoppingCartPermissions;
            this.shoppingCartPermissions = shoppingCartPermissions;
        }
        this.$apply();
    };
    ShopCart.prototype.onPullDownRefresh = function () {
        this.getShopList();
    };
    ShopCart.prototype.onShow = function () {
        // 自定义底部导航栏-如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态
        if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
            this.$wxpage.getTabBar().setData({
                selected: 3
            });
        }
        var isTab = wepy_1.default.$instance.globalData.isTab;
        if (!this.isLogin()) {
            this.login = false;
        }
        else {
            this.freeShippingTip = index_1.getAlertInfo('14187495683'); // 免运费提示信息
            this.getPermissionList();
            this.login = true;
            this.editStatus = true;
            if (isTab) {
                this.getCartSupplyAndItemGroupData();
                wepy_1.default.$instance.globalData.isTab = false;
            }
        }
    };
    ShopCart = __decorate([
        wepy_redux_1.connect({
            user: function (_a) {
                var user = _a.user;
                return user.info;
            },
            list: function (_a) {
                var cart = _a.cart;
                return cart.list;
            },
            orgAndGroupId: function (_a) {
                var cart = _a.cart;
                return cart.orgAndGroupId;
            },
            orgAndGroups: function (_a) {
                var cart = _a.cart;
                return cart.orgAndGroups;
            },
            orgName: function (_a) {
                var cart = _a.cart;
                return cart.orgName;
            },
            orgList: function (_a) {
                var cart = _a.cart;
                return cart.orgList;
            },
            policies: function (_a) {
                var cart = _a.cart;
                return cart.policies;
            },
        }, {
            getStocks: cart_1.getStocks,
            getCartDmsStocks: cart_1.getCartDmsStocks,
            getPrices: cart_1.getPrices,
            getCartList: cart_1.getCartList,
            changePolicy: cart_1.changePolicy,
            getCartDmsPrice: cart_1.getCartDmsPrice,
            removeCartItem: cart_1.removeCartItem,
            takeCommonOrder: order_1.takeCommonOrder,
            updateItemQuantity: cart_1.updateItemQuantity,
            getCartSupplyAndItemGroup: cart_1.getCartSupplyAndItemGroup
        })
    ], ShopCart);
    return ShopCart;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(ShopCart , 'pages/main/cart/index'));

