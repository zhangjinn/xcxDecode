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
var request_1 = require('./../../../../utils/request.js');
var validators_1 = require('./../../../../utils/validators.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var common_1 = require('./../../../../mixins/common.js');
var EditPassword = /** @class */ (function (_super) {
    __extends(EditPassword, _super);
    function EditPassword() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '管理管辖门店',
            usingComponents: {
                'van-button': '../../../../components/vant/button/index',
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'van-field': '../../../../components/vant/field/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-picker': '../../../../components/vant/picker/index',
                'van-icon': '../../../../components/vant/icon/index',
            },
        };
        _this.mixins = [common_1.default];
        _this.data = {
            editLoginSystem: 0,
            errorMessage: {
                name: '',
                phone: '',
                email: '',
                businessFlagName: '',
                businessFlagId: ''
            },
            loginSystemVisible: false,
            baseMatklVisible: false,
            saleListVisible: false,
            otherInfo: [],
            otherInfoIndex: 0,
            saleIndex: -1,
            saleList: [
                {
                    id: 1,
                    name: '是'
                },
                {
                    id: 0,
                    name: '否'
                },
            ],
            shopList: [],
            hasShopList: [],
            searchVal: ""
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 前端查询门店列表
            onChangeSearchVal: function (event) {
                var _this = this;
                this.searchVal = ramda_1.trim(event.detail.value);
                this.setData({
                    searchVal: event.detail.value
                });
                //根据搜索内容控制展示内容
                var otherInfoNew = ramda_1.clone(this.otherInfo);
                otherInfoNew[this.otherInfoIndex].shopList.map(function (item) {
                    if (item.name.includes(_this.searchVal)) {
                        item.isNotView = false;
                    }
                    else {
                        item.isNotView = true;
                    }
                    return __assign({}, item);
                });
                this.otherInfo = otherInfoNew;
                this.$apply();
            },
            //开启关闭弹窗
            onToggleBaseMaktlPopup: function (e) {
                this.otherInfoIndex = 0;
                this.searchVal = "";
                //全部显示
                var otherInfoNew = ramda_1.clone(this.otherInfo);
                otherInfoNew[this.otherInfoIndex].shopList.map(function (item) {
                    item.isNotView = false;
                    return __assign({}, item);
                });
                this.otherInfo = otherInfoNew;
                this.$apply();
                this.toggleBaseMaktlPopup();
            }
            //选择
            ,
            //选择
            onSelectBaseMatkl: function (baseMatkl) {
                var otherInfoNew = ramda_1.clone(this.otherInfo);
                var baseMatklListNew = otherInfoNew[this.otherInfoIndex].shopList.map(function (item) {
                    if (item.code === baseMatkl.code) {
                        item.selected = !item.selected;
                    }
                    return __assign({}, item);
                });
                this.otherInfo = otherInfoNew;
            },
            onSubmitForm: function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var form, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                form = e.detail.value;
                                if (!this.checkForm(form)) return [3 /*break*/, 2];
                                form.custAccountId = this.editAccount.id;
                                form.ids = this.otherInfo[0].shopList.filter(function (base) { return base.selected; }).map(function (base) { return base.code; });
                                return [4 /*yield*/, request_1.request({ api: '/custShop/saveCustShop.nd', method: 'POST', data: form })];
                            case 1:
                                result = _a.sent();
                                console.log('result', result);
                                if (result.code === "0") {
                                    toast_1.default.success('修改门店信息成功');
                                    setTimeout(function () {
                                        wx.navigateBack();
                                    }, 2000);
                                }
                                else {
                                    toast_1.default.fail(result);
                                }
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            },
            onClearError: function (column) {
                var _a;
                this.errorMessage = __assign({}, this.errorMessage, (_a = {}, _a[column] = '', _a));
            },
            onToggleLoginSystemPopup: function (e) {
                var index = e.target.dataset.index;
                this.otherInfoIndex = index;
                this.toggleLoginSystemPopup();
            },
            onSelectLoginSystem: function (loginSystem) {
                var _this = this;
                // const { picker, value, index } = event.detail;
                var otherInfo = ramda_1.clone(this.otherInfo);
                var isExisted = otherInfo.some(function (item, index) {
                    if (index !== _this.otherInfoIndex && item.id === loginSystem.id) {
                        return true;
                    }
                    return false;
                });
                if (isExisted) {
                    toast_1.default.fail('该登录系统已选过，请重新选择！');
                }
                otherInfo[this.otherInfoIndex].loginSystem = loginSystem;
                this.otherInfo = otherInfo;
                this.toggleLoginSystemPopup();
            },
            onConfirmBaseMatklPopup: function () {
                var otherInfoNew = ramda_1.clone(this.otherInfo);
                var selectBaseMatklList = otherInfoNew[this.otherInfoIndex].shopList.filter(function (item) { return item.selected; });
                otherInfoNew[this.otherInfoIndex].shopIds = selectBaseMatklList.map(function (item) { return item.code; });
                otherInfoNew[this.otherInfoIndex].shopName = selectBaseMatklList.map(function (item) { return item.name; });
                this.otherInfo = otherInfoNew;
                this.toggleBaseMaktlPopup();
            },
            onAddOtherInfo: function () {
                var otherInfoNew = ramda_1.clone(this.otherInfo);
                otherInfoNew.push({ loginSystem: {}, baseMatklList: this.baseMatklList, baseMatklIdList: [], baseMatklNameList: [] });
                this.otherInfo = otherInfoNew;
            },
            onRemoveOtherInfo: function () {
                // const otherInfoNew = clone(this.otherInfo)
                // otherInfoNew.splice(index, 1)
                // this.otherInfo = otherInfoNew
                console.log('shanchu');
                var otherInfoNew = ramda_1.clone(this.otherInfo);
                otherInfoNew[this.otherInfoIndex].shopList.forEach(function (item) {
                    item.selected = false;
                });
                otherInfoNew[this.otherInfoIndex].shopIds = [];
                otherInfoNew[this.otherInfoIndex].shopName = [];
                this.otherInfo = otherInfoNew;
            },
            onToggleSaleListPopup: function () {
                this.saleListVisible = !this.saleListVisible;
            },
            toggleSalelPopup: function () {
                this.saleListVisible = !this.saleListVisible;
            },
            onSelecteSale: function (e) {
                // console.log(e)
                // const { index } = e.target.dataset
                // this.saleIndex = index
                this.editAccount.businessFlagName = e.name;
                this.editAccount.businessFlagId = e.id;
                this.saleIndex = e.id;
                this.saleListVisible = false;
            },
        };
        return _this;
    }
    EditPassword.prototype.toggleLoginSystemPopup = function () {
        this.loginSystemVisible = !this.loginSystemVisible;
    };
    EditPassword.prototype.toggleBaseMaktlPopup = function () {
        this.baseMatklVisible = !this.baseMatklVisible;
    };
    EditPassword.prototype.checkForm = function (form) {
        var status = true;
        var name = form.name, phone = form.phone, email = form.email;
        if (!name) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { name: '请填写姓名' });
        }
        if (!phone) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { phone: '请填写手机' });
        }
        if (phone && !validators_1.checkPhone(phone)) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { phone: '请填写正确的手机' });
        }
        if (!email) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { email: '请填写邮箱' });
        }
        if (email && !validators_1.checkEmail(email)) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { email: '请填写正确的邮箱' });
        }
        this.$apply();
        return status;
    };
    EditPassword.prototype.onShow = function () {
        // console.log('this.editAccount.id',this.editAccount.id);
        // 获取当前账号的有的门店数据
        var _this = this;
        var editAccount = this.editAccount;
        var data = {
            custAccountId: this.editAccount.id
        };
        request_1.request({ api: '/custShop/getShopListByCustId.nd', method: 'POST', data: data }).then(function (res) {
            console.log('res', res);
            _this.hasShopList = res.idData;
            // console.log('this.hasShopList',this.hasShopList);
            if (editAccount.type === 'user') {
                var _a = editAccount.loginSystemList, loginSystemList = _a === void 0 ? [] : _a, _b = editAccount.loginSystemMatklsMapJson, loginSystemMatklsMapJson_1 = _b === void 0 ? {} : _b;
                var loginSystemListOri_1 = ramda_1.clone(_this.loginSystemList);
                var baseMatklListOri_1 = ramda_1.clone(_this.baseMatklList);
                var shopListori_1 = ramda_1.clone(_this.shopList);
                var otherInfo = !loginSystemList ? [] : loginSystemList.map(function (item) {
                    var loginSystem = loginSystemListOri_1.filter(function (i) { return i.id === Number(item); })[0];
                    var baseMatklIdList = loginSystemMatklsMapJson_1[item] || [];
                    var baseMatklNameList = [];
                    var baseMatklList = baseMatklListOri_1.map(function (base) {
                        var selected = baseMatklIdList.includes(base.id);
                        if (selected) {
                            baseMatklNameList.push(base.matklName);
                        }
                        return __assign({}, base, { selected: selected });
                    });
                    var shopIds = [];
                    var selectedRow = _this.hasShopList;
                    // console.log('this.hasShopList',this.hasShopList);
                    for (var _i = 0, selectedRow_1 = selectedRow; _i < selectedRow_1.length; _i++) {
                        var items = selectedRow_1[_i];
                        shopIds.push(String(items));
                    }
                    // console.log('shopIds',shopIds);
                    var shopName = [];
                    var shopList_ = shopListori_1.map(function (shopbase) {
                        var shopBaseCode = shopbase.code + '';
                        var selected = shopIds.includes(shopBaseCode);
                        if (selected) {
                            shopName.push(shopbase.name);
                        }
                        return __assign({}, shopbase, { selected: selected });
                    });
                    //按中文首字母排序
                    var shopList = shopList_.sort(function compareFunction(param1, param2) {
                        // return param1.fullName.localeCompare(param2.fullName, 'zh-Hans-CN', {sensitivity: 'accent'});
                        return param1.name.localeCompare(param2.name, 'zh');
                    });
                    return { loginSystem: loginSystem, baseMatklIdList: baseMatklIdList, baseMatklList: baseMatklList, baseMatklNameList: baseMatklNameList, shopList: shopList, shopIds: shopIds, shopName: shopName };
                });
                _this.otherInfo = otherInfo;
                _this.$apply();
            }
            if (_this.editAccount.businessFlagName == '是') {
                _this.editAccount.businessFlagId = 1;
            }
            if (_this.editAccount.businessFlagName == '否') {
                _this.editAccount.businessFlagId = 0;
            }
            _this.saleIndex = _this.editAccount.businessFlagId;
        });
        // console.log('this.editAccount',this.editAccount);
        // console.log('this.editAccount.businessFlagName',this.editAccount.businessFlagName);
        // console.log(' this.editAccount', this.editAccount);
        // console.log(' this.otherInfo', this.otherInfo);
    };
    EditPassword = __decorate([
        wepy_redux_1.connect({
            editAccount: function (_a) {
                var account = _a.account;
                return account.editAccount;
            },
            loginSystemList: function (_a) {
                var account = _a.account;
                return account.loginSystemList;
                return account.loginSystemList.map(function (item) {
                    return { value: item.id, text: item.propertyName };
                });
            },
            baseMatklList: function (_a) {
                var account = _a.account;
                return account.baseMatklList;
                return account.baseMatklList.map(function (item) {
                    return { value: item.id, text: item.matklName };
                });
            },
            shopList: function (_a) {
                var account = _a.account;
                return account.custShopList;
                return account.custShopList.map(function (item) {
                    return { value: item.code, text: item.name };
                });
            },
            mixinCurrentUser: function (_a) {
                var user = _a.user;
                return user.info || {};
            },
        }, {})
    ], EditPassword);
    return EditPassword;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(EditPassword , 'pages/me/shopList/edit-account/index'));

