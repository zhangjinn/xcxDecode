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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var index_1 = require('./../../../../utils/index.js');
var request_1 = require('./../../../../utils/request.js');
var validators_1 = require('./../../../../utils/validators.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var user_1 = require('./../../../../store/actions/user.js');
var baseUrl = wepy_1.default.$appConfig.baseUrl;
var MobileLogin = /** @class */ (function (_super) {
    __extends(MobileLogin, _super);
    function MobileLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '绑定账号',
            usingComponents: {
                'van-icon': '../../../../components/vant/icon/index',
                'van-button': '../../../../components/vant/button/index',
                'van-collapse': '../../../../components/vant/collapse/index',
                'van-collapse-item': '../../../../components/vant/collapse-item/index',
                'van-cell': '../../../../components/vant/cell/index',
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'van-dialog': '../../../../components/vant/dialog/index',
                'van-field': '../../../../components/vant/field/index',
                'van-toast': '../../../../components/vant/toast/index',
            },
        };
        _this.times = 0;
        _this.data = {
            confirmTel: '',
            confirmTelCode: '',
            mobile: '',
            password: '',
            code: '',
            account: {},
            accounts: [],
            toggleAccount: [],
            codeSrc: baseUrl + "/checkImg.nd",
            isNeedImgCode: false,
            secondLogin: false,
            timer: 60,
        };
        _this.methods = {
            onConfirmTelChange: function (event) {
                this.confirmTelCode = ramda_1.trim(event.detail);
            },
            clearConfirmTel: function () {
                this.confirmTelCode = '';
            },
            onPhoneChange: function (event) {
                this.mobile = ramda_1.trim(event.detail);
            },
            clearMobile: function () {
                this.mobile = '';
            },
            onPasswordChange: function (event) {
                this.password = ramda_1.trim(event.detail);
            },
            clearPassword: function () {
                this.password = '';
            },
            onCodeChange: function (event) {
                this.code = ramda_1.trim(event.detail);
            },
            clearCode: function () {
                this.code = '';
            },
            getCodeImg: function () {
                this.codeSrc = baseUrl + "/checkImg.nd?_=" + Date.now();
            },
            getSmsCode: function () {
                var _this = this;
                var mobile = this.mobile;
                var account = this.account.account;
                if (account) {
                    if (this.timer === 60) {
                        if (mobile && validators_1.checkPhone(mobile)) {
                            toast_1.default.loading({ forbidClick: true, message: '验证码发送中...', duration: 0 });
                            request_1.request({
                                api: 'getMsmByPhone.nd',
                                method: 'POST',
                                data: { account: account, phone: mobile, msgType: 2 },
                                callback: function (res) {
                                    var status = res.data.status;
                                    if (status === 'true') {
                                        toast_1.default.success('短信发送成功');
                                        _this.startTimer();
                                    }
                                    else {
                                        toast_1.default.fail('短信发送失败');
                                    }
                                },
                            });
                        }
                        else {
                            toast_1.default('请输入正确的手机号');
                        }
                    }
                }
                else {
                    toast_1.default('请选择账号');
                }
            },
            forgetPassword: function () {
                wx.navigateTo({
                    url: '/pages/auth/forget/index',
                });
            },
            // mobile 值改变时触发
            onMobileBlur: function (event) {
                var _this = this;
                var value = event.detail.value;
                var mobile = ramda_1.trim(value);
                if (mobile && validators_1.checkPhone(mobile)) {
                    request_1.request({
                        api: 'queryAccountByPhone.nd',
                        data: { phone: mobile },
                        callback: function (res) {
                            var _a = res.data, status = _a.status, list = _a.list;
                            if (status === 'true' && list.length > 0) {
                                _this.accounts = list;
                                _this.account = ramda_1.head(list);
                            }
                            else {
                                _this.accounts = [];
                                _this.account = {};
                            }
                            _this.$apply();
                        },
                    });
                }
                else {
                    toast_1.default('请输入正确的手机号码');
                    this.accounts = [];
                    this.account = {};
                }
            },
            // 选择账号 /checkImg.nd
            chooseAccount: function (item) {
                this.account = item;
            },
            onChange: function (event) {
                this.toggleAccount = event.detail;
            },
            confirmTel: function () {
                if (this.confirmTelCode) {
                    var account = this.account.account;
                    var unionid = this.$parent.globalData.unionid;
                    var params = {
                        userName: account || this.mobile,
                        password: this.password,
                        unionid: unionid,
                        msgType: 1,
                        msgCode: this.confirmTelCode,
                    };
                    this.userLogin(params);
                    this.secondLogin = false;
                }
                else {
                    toast_1.default('短信验证码不能为空');
                }
            },
            confirmTelCancel: function () {
                this.secondLogin = false;
            },
            // 绑定
            submit: function () {
                var account = this.account.account;
                var unionid = this.$parent.globalData.unionid;
                var params = {
                    userName: account,
                    msgCode: this.code,
                    msgType: 2,
                    unionid: unionid,
                    onlyBund: true,
                };
                if (this.isNeedImgCode) {
                    params.imgCode = this.code;
                }
                this.userLogin(params);
            },
        };
        return _this;
    }
    MobileLogin.prototype.userLogin = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, msg, code, account;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        toast_1.default.loading({ forbidClick: true, message: '绑定中...', duration: 0 });
                        return [4 /*yield*/, this.methods.bindAccount(params, function (res) {
                                var header = res.header;
                                var cookie = header['Set-Cookie'] || header['set-cookie'];
                                var token = index_1.getCookie('JSESSIONID', cookie);
                                _this.$parent.globalData.modifySession = token;
                                toast_1.default.clear();
                            })];
                    case 1:
                        result = _b.sent();
                        _a = result.payload, msg = _a.msg, code = _a.code, account = _a.account;
                        switch (code) {
                            case 0:
                                toast_1.default.success({
                                    forbidClick: true,
                                    duration: 2000,
                                    message: '绑定成功',
                                    onClose: function () {
                                        wx.navigateBack({
                                            delta: 2,
                                        });
                                    },
                                });
                                break;
                            case 1001:
                                wx.navigateTo({ url: '/pages/auth/protocol/index' });
                                break;
                            case 1002:
                                this.secondLogin = true;
                                this.confirmTel = index_1.formatMobile(account.mobile);
                                this.$apply();
                                break;
                            case 1004:
                                toast_1.default.fail({
                                    forbidClick: true,
                                    duration: 2000,
                                    message: msg || '绑定失败',
                                });
                                this.isNeedImgCode = true;
                                this.methods.getCodeImg();
                                this.$apply();
                                break;
                            default:
                                toast_1.default.fail({
                                    forbidClick: true,
                                    duration: 2000,
                                    message: msg || '绑定失败',
                                });
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MobileLogin.prototype.startTimer = function () {
        var _this = this;
        this.timerEl = setInterval(function () {
            _this.timer = ramda_1.subtract(_this.timer, 1);
            if (_this.timer === 0) {
                _this.timer = 60;
                clearInterval(_this.timerEl);
            }
            _this.$apply();
        }, 1000);
    };
    MobileLogin.prototype.onUnload = function () {
        if (this.timerEl) {
            clearInterval(this.timerEl);
        }
    };
    MobileLogin = __decorate([
        wepy_redux_1.connect({}, {
            bindAccount: user_1.bindAccount,
        })
    ], MobileLogin);
    return MobileLogin;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(MobileLogin , 'pages/me/bind-account/mobile/index'));

