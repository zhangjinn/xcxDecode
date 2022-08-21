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
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var Defaultaccount = /** @class */ (function (_super) {
    __extends(Defaultaccount, _super);
    function Defaultaccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '默认账号设置',
            usingComponents: {
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-switch': '../../../components/vant/switch/index',
                'van-toast': '../../../components/vant/toast/index',
            },
        };
        _this.data = {
            accountList: []
        };
        // 页面内交互写在methods里
        _this.methods = {
            onChangeToDefault: function (event) {
                return __awaiter(this, void 0, void 0, function () {
                    var account, unionid, result, accountListNew;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                account = event.target.dataset.account;
                                unionid = this.$parent.globalData.unionid;
                                return [4 /*yield*/, request_1.request({ api: '/changeUnionidAccount.nd', method: 'POST', data: { unionid: unionid, account: account } })];
                            case 1:
                                result = _a.sent();
                                if (result.code !== 0) {
                                    toast_1.default.fail(result.msg);
                                    return [2 /*return*/];
                                }
                                accountListNew = ramda_1.clone(this.accountList);
                                accountListNew.forEach(function (item) {
                                    item.uDefault = '1';
                                    if (item.account === account) {
                                        item.uDefault = '0';
                                    }
                                });
                                this.accountList = accountListNew;
                                toast_1.default.success('切换默认账号成功');
                                this.$apply();
                                return [2 /*return*/];
                        }
                    });
                });
            },
        };
        return _this;
    }
    Defaultaccount.prototype.getAccountList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, accountList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request_1.request({ api: 'queryAccountUnionid.nd' })];
                    case 1:
                        result = _a.sent();
                        accountList = result.list.map(function (item) {
                            return __assign({}, item, { text: item.name, value: item.account });
                        });
                        this.accountList = accountList;
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    Defaultaccount.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getAccountList();
                return [2 /*return*/];
            });
        });
    };
    return Defaultaccount;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Defaultaccount , 'pages/me/defaultaccount/index'));

