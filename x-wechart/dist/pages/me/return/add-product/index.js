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
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var dialog_1 = require('./../../../../components/vant/dialog/dialog.js');
var index_1 = require('./../../../../utils/index.js');
var productInit = {
    productModel: '',
    materialName: '',
    productName: '',
    productColor: '',
    organizationCode: '',
    organizationName: '',
    checkDate: '',
    machineNum: '',
    crmCode: '',
    remarks: '',
};
var keyMap = {
    productModel: 'maktlCode',
    materialName: 'maktlName',
    organizationName: 'orgName',
    organizationCode: 'organizationCode',
};
var ReturnAddProduct = /** @class */ (function (_super) {
    __extends(ReturnAddProduct, _super);
    function ReturnAddProduct() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '添加产品',
            usingComponents: {
                'van-notice-bar': '../../../../components/vant/notice-bar/index',
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'van-field': '../../../../components/vant/field/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-dialog': '../../../../components/vant/dialog/index',
                'van-button': '../../../../components/vant/button/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-datetime-picker': '../../../../components/vant/datetime-picker/index',
                'van-search': '../../../../components/vant/search/index',
                'van-row': '../../../../components/vant/row/index',
                'van-col': '../../../../components/vant/col/index',
                'calendar': '../../../../components/calendar/index',
            },
        };
        _this.data = {
            calendarShow: false,
            productIndex: 0,
            errorMessage: {
                rowpassword: '',
                password: '',
                npassword: '',
            },
            productList: [
                __assign({}, productInit),
            ],
            productNameVisible: false,
            productNameList: [],
            submitMessage: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            onSubmitForm: function (e) {
                this.submitForm();
            },
            onClearError: function (column) {
                var _a;
                this.errorMessage = __assign({}, this.errorMessage, (_a = {}, _a[column] = '', _a));
            },
            onInputChange: function (e) {
                var _a = e.target.dataset, productIndex = _a.productIndex, columnName = _a.columnName;
                this.productIndex = productIndex;
                var productListNew = this.productList.slice();
                productListNew[productIndex][columnName] = e.detail;
                this.productList = productListNew;
            },
            onRemoveProductLine: function (productIndex) {
                var productListNew = this.productList.slice();
                productListNew.splice(productIndex, 1);
                if (productListNew.length === 0) {
                    productListNew.push(__assign({}, productInit));
                }
                this.productList = productListNew;
            },
            onAddProductLine: function () {
                var productListNew = this.productList.slice();
                productListNew.push(__assign({}, productInit));
                this.productList = productListNew;
            },
            onToggleProductName: function (e) {
                var productIndex = e.target.dataset.productIndex;
                if (productIndex !== this.productIndex) {
                    this.productIndex = productIndex;
                    this.productNameList = [];
                }
                this.toggleProductName();
            },
            onProductModelSearch: function (event) {
                return __awaiter(this, void 0, void 0, function () {
                    var term, productNameList;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                term = event.detail;
                                return [4 /*yield*/, request_1.request({ api: '/product/getDefevtivePro.nd', data: { term: term } })];
                            case 1:
                                productNameList = _a.sent();
                                this.productNameList = productNameList;
                                this.$apply();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            onSelectProductName: function (productName) {
                var productListNew = this.productList.slice();
                productListNew[this.productIndex].productName = productName;
                this.productList = productListNew;
                this.toggleProductName();
            }
            // 选择日期
            ,
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var productIndex = e.target.dataset.productIndex;
                this.productIndex = productIndex;
                this.$wxpage.calendar.enableArea([minDate, maxDate]);
                if (this.productList[this.productIndex].checkDate) {
                    var dates = ramda_1.split('-', this.productList[this.productIndex].checkDate);
                    this.$wxpage.calendar.jump(dates[0], parseInt(dates[1], 10), parseInt(dates[2], 10));
                }
                this.calendarShow = true;
            },
            closeCalendar: function () {
                this.calendarShow = false;
            },
            chooseDay: function (evt) {
                var _a = evt.detail, year = _a.year, month = _a.month, day = _a.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                var productListNew = ramda_1.clone(this.productList);
                productListNew[this.productIndex].checkDate = day;
                this.productList = productListNew;
                this.calendarShow = false;
            },
        };
        return _this;
    }
    ReturnAddProduct.prototype.submitForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fileFlag, returnAddressId, returnAdr, rebackCode, reback, proposerName, proposerTel, organizationCode, type, isConfirm, form, fromString;
            var _this = this;
            return __generator(this, function (_b) {
                if (!this.checkForm(this.productList)) {
                    return [2 /*return*/];
                }
                _a = this.baseInfo, fileFlag = _a.fileFlag, returnAddressId = _a.returnAddressId, returnAdr = _a.returnAdr, rebackCode = _a.rebackCode, reback = _a.reback, proposerName = _a.proposerName, proposerTel = _a.proposerTel, organizationCode = _a.organizationCode, type = _a.type, isConfirm = _a.isConfirm;
                form = { fileFlag: fileFlag, returnAddressId: returnAddressId, returnAdr: returnAdr, rebackCode: rebackCode, reback: reback, proposerName: proposerName, proposerTel: proposerTel, organizationCode: organizationCode, type: type, file1: '' };
                if (isConfirm) {
                    form.isConfirm = isConfirm;
                }
                fromString = [];
                this.productList.forEach(function (product) {
                    Object.keys(product).forEach(function (key) {
                        fromString.push({ name: key, value: ['productModel', 'materialName', 'organizationCode', 'organizationName'].includes(key) ? _this.baseInfo[keyMap[key]] : product[key] });
                    });
                });
                form.fromString = JSON.stringify(fromString);
                this.reSubmitForm(form);
                return [2 /*return*/];
            });
        });
    };
    ReturnAddProduct.prototype.reSubmitForm = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request_1.request({ api: '/defectiveProduct/submissionInfo.nd', method: 'POST', data: form })];
                    case 1:
                        result = _a.sent();
                        if (result.flag) {
                            if (!result.message) {
                                toast_1.default.success({
                                    message: '提交退货信息成功',
                                    onClose: function () {
                                        wx.navigateBack({ delta: 2 });
                                    }
                                });
                                return [2 /*return*/];
                            }
                            dialog_1.default.confirm({
                                message: result.message,
                            }).then(function () {
                                // on confirm
                                _this.reSubmitForm(__assign({}, form, { isConfirm: true }));
                            }).catch(function () {
                                // on cancel
                            });
                        }
                        if (!result.flag) {
                            toast_1.default.fail(result.message);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReturnAddProduct.prototype.toggleDatePopup = function () {
        this.identifyDateVisible = !this.identifyDateVisible;
    };
    ReturnAddProduct.prototype.toggleProductName = function () {
        this.productNameVisible = !this.productNameVisible;
    };
    ReturnAddProduct.prototype.checkForm = function (productList) {
        var status = true;
        for (var i = 0; i < productList.length; i++) {
            var index = i + 1;
            var _a = productList[i], productModel = _a.productModel, materialName = _a.materialName, productName = _a.productName, productColor = _a.productColor, organizationCode = _a.organizationCode, organizationName = _a.organizationName, checkDate = _a.checkDate, machineNum = _a.machineNum, crmCode = _a.crmCode, remarks = _a.remarks;
            if (!productName) {
                status = false;
                toast_1.default.fail("\u8BF7\u586B\u5199\u7B2C" + index + "\u4E2A\u4EA7\u54C1\u7684\u4EA7\u54C1\u578B\u53F7");
                break;
            }
            if (!machineNum) {
                status = false;
                toast_1.default.fail("\u8BF7\u586B\u5199\u7B2C" + index + "\u4E2A\u4EA7\u54C1\u7684\u673A\u53F7");
                break;
            }
            if (machineNum.length !== 23) {
                status = false;
                toast_1.default.fail("\u7B2C" + index + "\u4E2A\u4EA7\u54C1\u7684\u673A\u53F7\u6709\u8BEF\uFF0C\u5FC5\u987B\u662F23\u4F4D");
                break;
            }
        }
        return status;
    };
    ReturnAddProduct.prototype.onLoad = function () {
    };
    ReturnAddProduct = __decorate([
        wepy_redux_1.connect({
            baseInfo: function (_a) {
                var applyreturn = _a.applyreturn;
                return applyreturn.baseInfo;
            },
        }, {})
    ], ReturnAddProduct);
    return ReturnAddProduct;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(ReturnAddProduct , 'pages/me/return/add-product/index'));

