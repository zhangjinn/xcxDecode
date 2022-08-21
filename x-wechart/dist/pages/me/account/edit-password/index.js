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
var request_1 = require('./../../../../utils/request.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var UpdatePassword = /** @class */ (function (_super) {
    __extends(UpdatePassword, _super);
    function UpdatePassword() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '修改密码',
            usingComponents: {
                'van-button': '../../../../components/vant/button/index',
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'van-field': '../../../../components/vant/field/index',
                'van-toast': '../../../../components/vant/toast/index',
            },
        };
        _this.data = {
            rowpasswordVisible: false,
            passwordVisible: false,
            npasswordVisible: false,
            errorMessage: {
                rowpassword: '',
                password: '',
                npassword: '',
            }
        };
        // 页面内交互写在methods里
        _this.methods = {
            togglePwd: function (e) {
                var name = e.target.dataset.name;
                var nameVisible = name + 'Visible';
                this[nameVisible] = !this[nameVisible];
            },
            onSubmitForm: function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var form, isPassword, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                form = e.detail.value;
                                if (!this.checkForm(form)) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, request_1.request({ api: '/customer/isPassword.nd', method: 'POST', data: { rowpassword: form.rowpassword } })];
                            case 1:
                                isPassword = _a.sent();
                                if (!isPassword) {
                                    this.errorMessage = __assign({}, this.errorMessage, { rowpassword: '原密码不正确' });
                                    this.$apply();
                                    return [2 /*return*/];
                                }
                                form.custAccountId = this.editAccount.id;
                                form.zt = 2;
                                return [4 /*yield*/, request_1.request({ api: '/customer/editEnterpriseUser.nd', method: 'POST', data: form })];
                            case 2:
                                result = _a.sent();
                                if (result === 'success_pwd') {
                                    toast_1.default.success('修改密码成功');
                                    setTimeout(function () {
                                        wx.navigateBack();
                                    }, 2000);
                                }
                                else {
                                    toast_1.default.fail(result);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
            onClearError: function (column) {
                var _a;
                this.errorMessage = __assign({}, this.errorMessage, (_a = {}, _a[column] = '', _a));
            }
        };
        return _this;
    }
    UpdatePassword.prototype.checkForm = function (form) {
        var status = true;
        var rowpassword = form.rowpassword, password = form.password, npassword = form.npassword;
        if (!rowpassword) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { rowpassword: '请输入原密码' });
        }
        if (!password) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { password: '请输入新密码' });
        }
        if (!npassword) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { npassword: '请确认新密码' });
        }
        if (password && npassword && password !== npassword) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { npassword: '两次密码不一致' });
        }
        if (!/^.{8,15}$/.test(password)) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { password: '新密码至少8位,不能超过15位' });
        }
        if (!/^.*[0-9]+.*$/.test(password)) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { password: '新密码至少包含一个数字' });
        }
        if (!/^.*[A-Za-z]+.*$/.test(password)) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { password: '新密码至少包含一个字母' });
        }
        if (/^.*[<>')+\/&]+.*$/.test(password)) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { password: '新密码不能包含以下特殊字符<>\')+/&' });
        }
        if (!/^.*[^<>')+\/&A-Za-z0-9]+.*$/.test(password)) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { password: '新密码必须包含一个特殊字符' });
        }
        this.$apply();
        return status;
    };
    UpdatePassword = __decorate([
        wepy_redux_1.connect({
            editAccount: function (_a) {
                var account = _a.account;
                return account.editAccount;
            },
            mixinCurrentUser: function (_a) {
                var user = _a.user;
                return user.info || {};
            },
        }, {})
    ], UpdatePassword);
    return UpdatePassword;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(UpdatePassword , 'pages/me/account/edit-password/index'));

