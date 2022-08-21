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
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var order_1 = require('./../../../store/actions/order.js');
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            chooseRegionId: {
                type: String || Number,
                default: '',
            },
            isRequired: {
                type: Boolean,
                default: false
            },
            defaultAddressName: {
                type: String,
                default: '',
            }
        };
        // 缓存触发
        _this.callback = function () { };
        _this.config = {
            usingComponents: {
                'van-field': '/components/vant/field/index',
            },
        };
        _this.watch = {
            defaultAddressName: function (newVal) {
                if (newVal) {
                    this.formData.addressName = newVal;
                    this.$apply();
                }
            }
        };
        _this.data = {
            popShow: false,
            blur: false,
            scrolling: false,
            addressOptions: [],
            formData: {
                addressId: '',
                addressName: ''
            },
        };
        _this.methods = {
            onAddressChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.formData = __assign({}, _this.formData, { addressName: detail ? detail.trim() : '' });
                _this.popShow = true;
                _this.getAddressList();
                _this.toEmit();
                _this.$apply();
            }),
            onAddressSelect: function (item) {
                this.formData = __assign({}, this.formData, { addressId: item.id, addressName: item.name });
                this.popShow = false;
                this.toEmit();
                this.$apply();
            },
            onFocus: function () {
                if (this.formData.addressName) {
                    this.getAddressList();
                }
            },
            popHide: function () {
                this.popShow = false;
            },
        };
        return _this;
    }
    Header.prototype.toEmit = function () {
        var addressName = this.formData.addressName;
        var param = {
            addressName: addressName
        };
        this.$emit('chooseAddressDetail', param);
        this.$apply();
    };
    // 获取详细地址列表
    Header.prototype.getAddressList = function () {
        var _this = this;
        var addressName = this.formData.addressName;
        if (!addressName) {
            this.addressOptions = [];
            return;
        }
        var param = {
            searchstr: addressName,
        };
        if (this.chooseRegionId) {
            param.region = this.chooseRegionId;
        }
        this.methods.getAMapV5Placeext(param).then(function (res) {
            if (res && res.payload && res.payload.data && res.payload.data.pois) {
                _this.addressOptions = res.payload.data.pois.map(function (item) {
                    return {
                        id: item.id,
                        name: item.name
                    };
                });
                _this.$apply();
            }
        });
    };
    // 校验详细地址,,父组件提交时调用
    Header.prototype.checkAddressDetail = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var addressName, param;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.callback = callback;
                        addressName = this.formData.addressName;
                        if (!addressName) {
                            this.callback(true);
                            return [2 /*return*/];
                        }
                        param = {
                            searchstr: addressName,
                        };
                        return [4 /*yield*/, this.methods.getAMapV5Placeext(param).then(function (res) {
                                //1、如果返回有列表，遍历列表有相同的区id则通过
                                //2、如果返回有列表，遍历列表没有相同的区id则不通过
                                //3、如果返回值为空，则通过
                                if (res && res.payload && res.payload.data && res.payload.data.pois) {
                                    if (res.payload.data.pois.length > 0) {
                                        var mapList_1 = [];
                                        res.payload.data.pois.forEach(function (item) {
                                            if (item.adcode == _this.chooseRegionId) {
                                                mapList_1.push(item);
                                            }
                                        });
                                        if (mapList_1.length > 0) {
                                            _this.callback(true);
                                            return;
                                        }
                                        _this.callback(false);
                                        return;
                                    }
                                    _this.callback(true);
                                    return;
                                }
                                _this.$apply();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Header = __decorate([
        wepy_redux_1.connect({}, {
            getAMapV5Placeext: order_1.getAMapV5Placeext
        })
    ], Header);
    return Header;
}(wepy_1.default.component));
exports.default = Header;
