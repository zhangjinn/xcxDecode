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
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/dms-address/index.js');
var index_2 = require('./../../components/select-address-details/index.js');
var index_3 = require('./../../../components/user-operation/purchase-intention/index.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var order_1 = require('./../../../store/actions/order.js');
var channel_retail_order_1 = require('./../../../mixins/channel-retail-order.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var index_4 = require('./../../../utils/index.js');
var index_5 = require('./../../../components/popup-toast/index.js');
var IntendedUsersOrder = /** @class */ (function (_super) {
    __extends(IntendedUsersOrder, _super);
    function IntendedUsersOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '意向用户录入',
            usingComponents: {
                "van-popup": "/components/vant/popup/index",
                "van-toast": "/components/vant/toast/index",
                "van-icon": "/components/vant/icon/index",
                "van-submit-bar": "/components/vant/submit-bar/index",
                "van-field": "/components/vant/field/index",
                "van-dialog": "/components/vant/dialog/index",
                "stores": "/components/stores-return/index",
                'calendar': '/components/calendar/index',
                "tile-radio": "/components/tile-radio/index",
                "entry-label": "/components/user-operation/entry-label/index",
                "entry-source": "/components/user-operation/entry-source/index",
            },
        };
        _this.mixins = [channel_retail_order_1.default];
        _this.data = {
            baseFormData: {
                store: {
                    id: '',
                    name: ''
                },
                customerName: '',
                customerPhone: '',
                gender: {
                    id: '1',
                    name: '男'
                },
                addWeChat: {
                    id: '0',
                    name: '未加'
                },
                source: {
                    id: '',
                    name: ''
                },
                tag: {
                    id: [],
                    name: []
                },
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
                remark: '',
            },
            popList: [],
            popIndex: '-1',
            popTitle: '',
            popVisible: false,
            popFiledKey: '',
            compareInfo: {},
            imgObj: {
                'deliveryInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864758756_fd141c1df28d416c87a8f81b9231a354.png',
                'productInformation': 'http://3s-static.hisense.com/wechat/1/14722429883/1655864759346_77a464c855c841938c5dfa1149dc2f30.png',
            },
            genderOption: [
                { id: '1', name: '男士' },
                { id: '2', name: '女士' },
            ],
            addWeChatOption: [
                { id: '0', name: '未加' },
                { id: '1', name: '已加' },
            ],
            tagOption: [],
            sourceOption: [],
            stores: [],
            custInfoId: '',
            defaultAddressName: '' // 默认详细地址
        };
        _this.$repeat = {};
        _this.$props = { "address": { "title": "所在地区" }, "addressDetail": { "xmlns:v-bind": "", "v-bind:chooseRegionId.sync": "chooseRegionId", "v-bind:isRequired.sync": "addressDetailRequired", "v-bind:defaultAddressName.sync": "defaultAddressName" } };
        _this.$events = {};
        _this.components = {
            address: index_1.default,
            addressDetail: index_2.default,
            popup: index_5.default,
            purchaseIntention: index_3.default,
        };
        _this.computed = {
            // 计算属性的 用于地址详情是否显示必填符号
            addressDetailRequired: function () {
                return false;
            },
            // 计算属性的 用于地址详情区编码
            chooseRegionId: function () {
                return this.baseFormData.chooseRegionInfo.id;
            }
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
            // 应该获取那个值给popList   应该对比那个字段为选中信息
            openChoose: function (event) {
                var _a = event.currentTarget.dataset, title = _a.title, index = _a.index, key = _a.key, options = _a.options;
                var list = _this[options];
                if (!list || list.length === 0) {
                    return;
                }
                _this.popList = list;
                _this.popIndex = index;
                _this.popFiledKey = key;
                _this.popTitle = title;
                _this.compareInfo = _this.baseFormData[_this.popFiledKey];
                _this.popVisible = true;
            },
            onClose: function () {
                _this.popVisible = false;
            },
            onChoose: function (_a) {
                var currentTarget = _a.currentTarget;
                var index = currentTarget.dataset.index;
                var _b = _this.data, popFiledKey = _b.popFiledKey, popList = _b.popList;
                _this.baseFormData[popFiledKey] = popList[index];
                _this.popVisible = false;
                if (popFiledKey === 'store') {
                    _this.baseFormData.chooseProvinceInfo = {
                        id: popList[index].provinceCode || '',
                        name: popList[index].provinceName || ''
                    };
                    _this.baseFormData.chooseCityInfo = {
                        id: popList[index].cityCode || '',
                        name: popList[index].cityName || ''
                    };
                    _this.baseFormData.chooseRegionInfo = {
                        id: popList[index].districtCode || '',
                        name: popList[index].districtName || ''
                    };
                    _this.baseFormData.chooseTownInfo = {
                        id: popList[index].townCode || '',
                        name: popList[index].townName || ''
                    };
                    _this.baseFormData.addressTip = _this.baseFormData.chooseProvinceInfo.name + _this.baseFormData.chooseCityInfo.name + _this.baseFormData.chooseRegionInfo.name + _this.baseFormData.chooseTownInfo.name;
                    _this.baseFormData.receiverDetail = popList[index].address;
                    _this.defaultAddressName = popList[index].address; // 用来传参子组件默认地址
                }
                _this.$apply();
            },
            // 基本信息表单输入框改变
            onBaseFieldChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail, currentTarget = _a.currentTarget;
                var key = currentTarget.dataset.key;
                _this.baseFormData[key] = detail.trim();
                _this.$apply();
            }),
            // 自定义单选改变
            onRadioChange: function (event) {
                var detail = event.detail;
                var key = event.currentTarget.dataset.key;
                this.baseFormData[key] = detail;
                this.$apply();
            },
            // 选择用户来源
            onSourceChange: function (param) {
                var _a = param.detail, option = _a.option, index = _a.index;
                this.baseFormData.source = option;
                this.$apply();
            },
            // 保存用户来源
            saveSourcePop: function (param) {
                var _this = this;
                var _a = param.detail, name = _a.name, popActiveItem = _a.popActiveItem;
                if (name === '') {
                    this.baseFormData.source = popActiveItem;
                    return;
                }
                this.methods.saveSourceInfo({
                    custInfoId: this.custInfoId,
                    type: 2,
                    source: name,
                    remark: '',
                }).then(function (res) {
                    var _a = res.payload, code = _a.code, data = _a.data, msg = _a.msg;
                    if (code == 0) {
                        var currSource = {
                            id: data,
                            name: name,
                        };
                        _this.sourceOption.push(currSource);
                        _this.baseFormData.source = currSource;
                    }
                    else {
                        toast_1.default.fail(msg);
                    }
                    _this.$apply();
                });
            },
            // 选择用户标签
            onTagChange: function (param) {
                var _a = param.detail, option = _a.option, index = _a.index;
                this.tagOption[index].active = !this.tagOption[index].active;
                var ids = [];
                var names = [];
                this.tagOption.forEach(function (item) {
                    if (item.active) {
                        ids.push(item.id);
                        names.push(item.name);
                    }
                });
                this.baseFormData.tag.id = ids;
                this.baseFormData.tag.name = names;
                this.$apply();
            },
            // 保存新增标签
            saveTagPop: function (param) {
                var _this = this;
                var _a = param.detail, tagName = _a.tagName, tagDesc = _a.tagDesc, popOptions = _a.popOptions;
                this.tagOption = popOptions;
                this.baseFormData.tag.id = [];
                this.baseFormData.tag.name = [];
                this.tagOption.forEach(function (item) {
                    if (item.active) {
                        _this.baseFormData.tag.id.push(item.id);
                        _this.baseFormData.tag.name.push(item.name);
                    }
                });
                if (tagName === '') {
                    return;
                }
                this.methods.saveLabelInfo({
                    custInfoId: this.custInfoId,
                    type: 2,
                    label: tagName,
                    remark: tagDesc,
                }).then(function (res) {
                    var _a = res.payload, code = _a.code, data = _a.data, msg = _a.msg;
                    if (code == 0) {
                        _this.tagOption.push({
                            id: data,
                            name: tagName,
                            active: true,
                        });
                        _this.baseFormData.tag.id.push(data);
                        _this.baseFormData.tag.name.push(tagName);
                    }
                    else {
                        toast_1.default.fail(msg);
                    }
                    _this.$apply();
                });
            },
            // 提交
            submit: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, store, customerName, customerPhone, gender, addWeChat, source, tag, chooseProvinceInfo, chooseCityInfo, chooseRegionInfo, chooseTownInfo, receiverDetail, remark, that, purchaseIntention, productList, param;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.data.baseFormData, store = _a.store, customerName = _a.customerName, customerPhone = _a.customerPhone, gender = _a.gender, addWeChat = _a.addWeChat, source = _a.source, tag = _a.tag, chooseProvinceInfo = _a.chooseProvinceInfo, chooseCityInfo = _a.chooseCityInfo, chooseRegionInfo = _a.chooseRegionInfo, chooseTownInfo = _a.chooseTownInfo, receiverDetail = _a.receiverDetail, remark = _a.remark;
                            that = this;
                            purchaseIntention = this.$invoke('purchaseIntention', 'getParams');
                            return [4 /*yield*/, that.methods.checkParam()];
                        case 1:
                            if (_b.sent()) {
                                productList = [];
                                if (purchaseIntention.length) {
                                    productList = purchaseIntention.map(function (item) {
                                        return {
                                            spartId: item.intendedCategory.id,
                                            product: item.intendedProduct,
                                            budget: item.purchaseBudget.id,
                                            planBuyTime: item.expectedDeliveryDate,
                                        };
                                    });
                                }
                                param = {
                                    shopInfoId: store.id,
                                    custInfoId: this.custInfoId,
                                    userName: customerName,
                                    phone: customerPhone,
                                    wechat: addWeChat.id,
                                    gender: gender.id,
                                    provinceCode: chooseProvinceInfo.id,
                                    cityCode: chooseCityInfo.id,
                                    districtCode: chooseRegionInfo.id,
                                    townCode: chooseTownInfo.id,
                                    address: receiverDetail,
                                    headImg: '',
                                    sourceId: source.id,
                                    remark: remark,
                                    labelList: tag.id,
                                    userType: '',
                                    productList: productList,
                                    data_source: 'xcx',
                                };
                                this.methods.saveShopPotentialUser(param).then(function (res) {
                                    var _a = res.payload, type = _a.type, text = _a.text, msg = _a.msg;
                                    if (type === 'success') {
                                        toast_1.default.success(text);
                                        wx.navigateBack({
                                            delta: 1,
                                        });
                                    }
                                    else {
                                        toast_1.default.fail(msg);
                                    }
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            checkParam: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, store, customerName, customerPhone, chooseProvinceInfo;
                return __generator(this, function (_b) {
                    _a = this.data.baseFormData, store = _a.store, customerName = _a.customerName, customerPhone = _a.customerPhone, chooseProvinceInfo = _a.chooseProvinceInfo;
                    if (!store.id) {
                        toast_1.default.fail('请选择门店');
                        return [2 /*return*/, false];
                    }
                    if (customerName === '') {
                        toast_1.default.fail('请填写用户姓名');
                        return [2 /*return*/, false];
                    }
                    if (customerPhone === '') {
                        toast_1.default.fail('请填写手机号');
                        return [2 /*return*/, false];
                    }
                    if (!index_4.checkTel(customerPhone)) {
                        toast_1.default.fail('请填写正确手机号');
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                });
            }); },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 获取所属门店列表
    IntendedUsersOrder.prototype.getShopInfoPrototypeInfo = function () {
        var _this = this;
        this.methods.getShopInfoPrototype({
            exclusiveShop: 1 // 1只查专卖店
        }).then(function (res) {
            var list = res.payload.list;
            _this.stores = list.map(function (item) {
                return __assign({}, item, { id: item.code, name: item.name });
            });
            _this.$apply();
        });
    };
    // 获取标签列表、用户来源列表
    IntendedUsersOrder.prototype.findLabelListInfo = function () {
        var _this = this;
        var param = {
            custInfoId: this.custInfoId // 	商家id
        };
        this.methods.findLabelList(param).then(function (res) {
            if (res && res.payload && res.payload.data) {
                _this.tagOption = res.payload.data.map(function (item) {
                    return __assign({}, item, { id: item.id, name: item.label, active: false });
                });
            }
            _this.$apply();
        });
        this.methods.findSourceList(param).then(function (res) {
            if (res && res.payload && res.payload.data) {
                _this.sourceOption = res.payload.data.map(function (item) {
                    return __assign({}, item, { id: item.id, name: item.source });
                });
            }
            _this.$apply();
        });
    };
    IntendedUsersOrder.prototype.onLoad = function () {
        var customer = JSON.parse(wx.getStorageSync('b2b_token')).customer;
        this.custInfoId = customer && customer.id;
        this.getShopInfoPrototypeInfo();
        this.findLabelListInfo();
    };
    IntendedUsersOrder = __decorate([
        wepy_redux_1.connect({}, {
            getWarehouseList: dmsorder_1.getWarehouseList,
            getShopInfoPrototype: dmsorder_1.getShopInfoPrototype,
            saveShopPotentialUser: order_1.saveShopPotentialUser,
            findLabelList: order_1.findLabelList,
            saveLabelInfo: order_1.saveLabelInfo,
            findSourceList: order_1.findSourceList,
            saveSourceInfo: order_1.saveSourceInfo,
            commDict: order_1.commDict,
        })
    ], IntendedUsersOrder);
    return IntendedUsersOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(IntendedUsersOrder , 'pages/operation/intended-users-order/index'));

