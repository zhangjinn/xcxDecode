"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var wepy_1 = require("wepy");
var ramda_1 = require("ramda");
var request_1 = require("@/utils/request");
var toast_1 = require("@/components/vant/toast/toast");
var Defaultaccount = /** @class */ (function (_super) {
    __extends(Defaultaccount, _super);
    function Defaultaccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '地图',
            usingComponents: {
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-switch': '../../../components/vant/switch/index',
                'van-toast': '../../../components/vant/toast/index'
            }
        };
        _this.data = {
            accountList: [],
            longitude: 108.07332649827005,
            latitude: 34.28626496061992,
            markers: [
                //八教垃圾桶位置
                {
                    id: 0,
                    iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
                    latitude: 34.28594472914285,
                    longitude: 108.07340294122699,
                    width: 20,
                    height: 20 //图片显示高度
                },
                //三教垃圾桶位置
                {
                    id: 1,
                    iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
                    latitude: 34.28345098172088,
                    longitude: 108.07423643767835,
                    width: 20,
                    height: 20
                },
                //北秀垃圾桶位置
                {
                    id: 2,
                    iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
                    latitude: 34.28520896777005,
                    longitude: 108.0694815516472,
                    width: 20,
                    height: 20
                },
                //信工楼垃圾桶位置
                {
                    id: 3,
                    iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
                    latitude: 34.2842427171466,
                    longitude: 108.0724158883095,
                    width: 20,
                    height: 20
                },
                //10号寝室楼的位置
                {
                    id: 4,
                    iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
                    latitude: 34.286067170734036,
                    longitude: 108.0664473026991,
                    width: 20,
                    height: 20
                },
                //14号寝室楼的位置 
                {
                    id: 5,
                    iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
                    latitude: 34.287375788724745,
                    longitude: 108.06752823293209,
                    width: 20,
                    height: 20
                },
                //理学院垃圾桶位置
                {
                    id: 6,
                    iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
                    latitude: 34.28801845563627,
                    longitude: 108.07408086955549,
                    width: 20,
                    height: 20
                },
                //食品院垃圾桶位置
                {
                    id: 7,
                    iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
                    latitude: 34.288367488192435,
                    longitude: 108.07558692991735,
                    width: 20,
                    height: 20
                },
                //动科楼垃圾桶位置
                {
                    id: 8,
                    iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
                    latitude: 34.28487044889044,
                    longitude: 108.07326279580593,
                    width: 20,
                    height: 20
                }
            ]
        };
        // 页面内交互写在methods里
        _this.methods = {
            markertap: function (e) {
                console.log(e);
            },
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
                                    toast_1["default"].fail(result.msg);
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
                                toast_1["default"].success('切换默认账号成功');
                                this.$apply();
                                return [2 /*return*/];
                        }
                    });
                });
            }
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
                            return __assign(__assign({}, item), { text: item.name, value: item.account });
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
                return [2 /*return*/];
            });
        });
    };
    return Defaultaccount;
}(wepy_1["default"].page));
exports["default"] = Defaultaccount;
