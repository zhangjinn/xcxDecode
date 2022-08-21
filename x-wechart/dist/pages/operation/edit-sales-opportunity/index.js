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
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/dms-address/index.js');
var index_2 = require('./../../components/select-address-details/index.js');
var index_3 = require('./../../../components/user-operation/purchase-intention/index.js');
var order_1 = require('./../../../store/actions/order.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var IntendedUsersOrder = /** @class */ (function (_super) {
    __extends(IntendedUsersOrder, _super);
    function IntendedUsersOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-toast": "/components/vant/toast/index",
                "van-icon": "/components/vant/icon/index",
                "van-field": "/components/vant/field/index",
                "van-dialog": "/components/vant/dialog/index",
                'calendar': '/components/calendar/index',
            },
        };
        _this.data = {
            baseFormData: {
                addressTip: '',
                chooseProvinceInfo: {
                    id: '',
                    name: ''
                },
                chooseCityInfo: {
                    id: '',
                    name: ''
                },
                chooseRegionInfo: {
                    id: '',
                    name: ''
                },
                chooseTownInfo: {
                    id: '',
                    name: ''
                },
                receiverDetail: '',
            },
            purchaseIntentionInfo: [],
            imgObj: {
                'deliveryInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864758756_fd141c1df28d416c87a8f81b9231a354.png',
                'productInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864759346_77a464c855c841938c5dfa1149dc2f30.png',
            },
            defaultAddressName: '',
            pageType: 'salesOpportunity',
            detailId: '',
            currId: '',
        };
        _this.$repeat = {};
        _this.$props = { "address": { "title": "用户所在地区" }, "addressDetail": { "class": "address-detail-row", "xmlns:v-bind": "", "v-bind:chooseRegionId.sync": "chooseRegionId", "v-bind:isRequired.sync": "addressDetailRequired", "v-bind:defaultAddressName.sync": "defaultAddressName" }, "purchaseIntention": { "v-bind:list.sync": "purchaseIntentionInfo", "v-bind:pageType.sync": "pageType" } };
        _this.$events = {};
        _this.components = {
            address: index_1.default,
            addressDetail: index_2.default,
            purchaseIntention: index_3.default,
        };
        _this.computed = {
            // 计算属性的 用于地址详情是否显示必填符号
            addressDetailRequired: function () {
                return true;
            },
            // 计算属性的 用于地址详情区编码
            chooseRegionId: function () {
                return this.baseFormData.chooseRegionInfo.id;
            }
        };
        _this.watch = {
            'address': function (newValue) {
                var tip = '请选择';
                if (newValue.province.id) {
                    this.baseFormData.chooseProvinceInfo = newValue.province;
                    tip = this.baseFormData.chooseProvinceInfo.name;
                }
                if (newValue.city.id) {
                    this.baseFormData.chooseCityInfo = newValue.city;
                    tip += this.baseFormData.chooseCityInfo.name;
                }
                if (newValue.country.id) {
                    this.baseFormData.chooseRegionInfo = newValue.country;
                    tip += this.baseFormData.chooseRegionInfo.name;
                }
                if (newValue.town.id) {
                    this.baseFormData.chooseTownInfo = newValue.town;
                    tip += this.baseFormData.chooseTownInfo.name;
                }
                this.baseFormData.addressTip = tip;
                this.$apply();
            },
        };
        _this.events = {
            'chooseAddressDetail': function (payload) {
                _this.baseFormData.receiverDetail = payload.addressName;
            }
        };
        _this.methods = {
            openTopAddress: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo;
                    var _this = this;
                    return __generator(this, function (_b) {
                        _a = this.data.baseFormData, chooseProvinceInfo = _a.chooseProvinceInfo, chooseCityInfo = _a.chooseCityInfo, chooseRegionInfo = _a.chooseRegionInfo, chooseTownInfo = _a.chooseTownInfo;
                        this.$invoke('address', 'openAddressPopup', {
                            province: chooseProvinceInfo.id,
                            city: chooseCityInfo.id,
                            area: chooseRegionInfo.id,
                            town: chooseTownInfo.id
                        }, function (item, address) {
                            if (!address.townId) {
                                return;
                            }
                            _this.baseFormData.addressTip = item.name;
                            _this.baseFormData.chooseProvinceInfo = {
                                id: address.provinceId,
                            };
                            _this.baseFormData.chooseCityInfo = {
                                id: address.cityId,
                            };
                            _this.baseFormData.chooseRegionInfo = {
                                id: address.areaId,
                            };
                            _this.baseFormData.chooseTownInfo = {
                                id: address.townId,
                            };
                            _this.$apply();
                        });
                        return [2 /*return*/];
                    });
                });
            },
            // 基本信息表单输入框改变
            onBaseFieldChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail, currentTarget = _a.currentTarget;
                var key = currentTarget.dataset.key;
                _this.baseFormData[key] = detail.trim();
                _this.$apply();
            }),
            // 提交
            submit: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, receiverDetail, chooseTownInfo, that, purchaseIntention, checkParams, productList, param;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.data.baseFormData, receiverDetail = _a.receiverDetail, chooseTownInfo = _a.chooseTownInfo;
                            that = this;
                            purchaseIntention = this.$invoke('purchaseIntention', 'getParams');
                            return [4 /*yield*/, that.methods.checkParam()];
                        case 1:
                            if (_b.sent()) {
                                checkParams = this.$invoke('purchaseIntention', 'checkParams');
                                if (checkParams) {
                                    toast_1.default.fail(checkParams);
                                    return [2 /*return*/, false];
                                }
                                productList = [];
                                if (purchaseIntention.length) {
                                    productList = purchaseIntention.map(function (item) {
                                        return {
                                            spartId: item.intendedCategory.id,
                                            product: item.intendedProduct,
                                            budget: item.purchaseBudget.id,
                                            planBuyTimeStr: item.expectedDeliveryDate,
                                        };
                                    });
                                }
                                param = {
                                    townCode: chooseTownInfo.id,
                                    address: receiverDetail,
                                    userId: this.detailId,
                                    detailList: productList,
                                };
                                if (!this.currId) { // 新增
                                    this.methods.saveShopPotentialProduct(param).then(function (res) {
                                        var _a = res.payload, code = _a.code, msg = _a.msg;
                                        if (code == '0') {
                                            toast_1.default.success({
                                                forbidClick: true,
                                                duration: 1000,
                                                message: '新增成功',
                                                onClose: function () {
                                                    wx.navigateBack({
                                                        delta: 1,
                                                    });
                                                },
                                            });
                                        }
                                        else {
                                            toast_1.default.fail(msg);
                                        }
                                    });
                                }
                                else { // 修改
                                    param.id = this.currId;
                                    this.methods.updateShopPotentialProduct(param).then(function (res) {
                                        var _a = res.payload, code = _a.code, msg = _a.msg;
                                        if (code == '0') {
                                            toast_1.default.success({
                                                forbidClick: true,
                                                duration: 1000,
                                                message: '修改成功',
                                                onClose: function () {
                                                    wx.navigateBack({
                                                        delta: 1,
                                                    });
                                                },
                                            });
                                        }
                                        else {
                                            toast_1.default.fail(msg);
                                        }
                                    });
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            checkParam: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, chooseProvinceInfo, receiverDetail;
                return __generator(this, function (_b) {
                    _a = this.data.baseFormData, chooseProvinceInfo = _a.chooseProvinceInfo, receiverDetail = _a.receiverDetail;
                    if (!chooseProvinceInfo.id) {
                        toast_1.default.fail('请选择所在地区');
                        return [2 /*return*/, false];
                    }
                    if (receiverDetail === '') {
                        toast_1.default.fail('请填写详细地址');
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                });
            }); },
        };
        return _this;
    }
    // 获取用户详情
    IntendedUsersOrder.prototype.getShopPotentialUserDetailData = function () {
        var _this = this;
        // 新增销售机会，房屋家电地址默认用户地址，如果没有用户地址择只取商家的所在地区（省市区），不取商家的详细地址
        this.methods.getShopPotentialUserDetail({
            userId: this.detailId
        }).then(function (res) {
            var data = res.payload.data;
            if (data) {
                var provinceCode = data.provinceCode;
                var provinceName = data.provinceName;
                var cityCode = data.cityCode;
                var cityName = data.cityName;
                var districtCode = data.districtCode;
                var districtName = data.districtName;
                var townCode = data.townCode;
                var townName = data.townName;
                var receiverDetail = data.address;
                if (!provinceCode) {
                    var res_1 = wx.getStorageSync('b2b_token');
                    var customer = JSON.parse(res_1).customer;
                    provinceCode = customer.currentTradeCode;
                    provinceName = customer.currentTradeName;
                    cityCode = customer.currentCityCode;
                    cityName = customer.currentCityName;
                    districtCode = customer.currentAreaCode;
                    districtName = customer.currentAreaName;
                    townCode = customer.townCode;
                    townName = customer.townName;
                    receiverDetail = '';
                }
                _this.baseFormData = {
                    chooseProvinceInfo: {
                        id: provinceCode || '',
                        name: provinceName || ''
                    },
                    chooseCityInfo: {
                        id: cityCode || '',
                        name: cityName || ''
                    },
                    chooseRegionInfo: {
                        id: districtCode || '',
                        name: districtName || ''
                    },
                    chooseTownInfo: {
                        id: townCode || '',
                        name: townName || ''
                    },
                    receiverDetail: receiverDetail,
                };
                _this.baseFormData.addressTip = _this.baseFormData.chooseProvinceInfo.name + _this.baseFormData.chooseCityInfo.name + _this.baseFormData.chooseRegionInfo.name + _this.baseFormData.chooseTownInfo.name; // 所在地区
                _this.defaultAddressName = receiverDetail;
            }
            _this.$apply();
        });
    };
    // 销售机会明细
    IntendedUsersOrder.prototype.getShopPotentialProductInfo = function () {
        var _this = this;
        this.methods.getShopPotentialProduct({
            userId: this.detailId,
            id: this.currId
        }).then(function (res) {
            var list = res.payload.list;
            _this.details = list[0];
            _this.baseFormData = {
                chooseProvinceInfo: {
                    id: _this.details.provinceCode,
                    name: _this.details.provinceName || ''
                },
                chooseCityInfo: {
                    id: _this.details.cityCode,
                    name: _this.details.cityName || ''
                },
                chooseRegionInfo: {
                    id: _this.details.districtCode,
                    name: _this.details.districtName || ''
                },
                chooseTownInfo: {
                    id: _this.details.townCode,
                    name: _this.details.townName || ''
                },
                receiverDetail: _this.details.address,
            };
            _this.baseFormData.addressTip = _this.baseFormData.chooseProvinceInfo.name + _this.baseFormData.chooseCityInfo.name + _this.baseFormData.chooseRegionInfo.name + _this.baseFormData.chooseTownInfo.name; // 所在地区
            _this.defaultAddressName = _this.details.address;
            _this.purchaseIntentionInfo = _this.details.detailList || [];
            _this.$apply();
        });
    };
    IntendedUsersOrder.prototype.onLoad = function (_a) {
        var id = _a.id, itemId = _a.itemId;
        this.detailId = id;
        this.currId = itemId;
        var title = '';
        if (this.currId) { // 有值为编辑，无值为新增
            title = '编辑销售机会';
            this.getShopPotentialProductInfo();
        }
        else {
            title = '新增销售机会';
            this.getShopPotentialUserDetailData();
        }
        wx.setNavigationBarTitle({
            title: title
        });
    };
    IntendedUsersOrder = __decorate([
        wepy_redux_1.connect({
            address: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.retailOrderBaseInfo.address;
            },
        }, {
            getShopPotentialProduct: order_1.getShopPotentialProduct,
            saveShopPotentialProduct: order_1.saveShopPotentialProduct,
            updateShopPotentialProduct: order_1.updateShopPotentialProduct,
            getShopPotentialUserDetail: order_1.getShopPotentialUserDetail,
        })
    ], IntendedUsersOrder);
    return IntendedUsersOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(IntendedUsersOrder , 'pages/operation/edit-sales-opportunity/index'));

