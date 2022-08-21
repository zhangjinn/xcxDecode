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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var ramda_1 = require('./../../../../npm/ramda/src/index.js');
var request_1 = require('./../../../../utils/request.js');
var validators_1 = require('./../../../../utils/validators.js');
var index_1 = require('./../../../../store/types/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var request_2 = require('./../../../../utils/request.js');
var stores = wepy_redux_1.getStore();
var ReturnBase = /** @class */ (function (_super) {
    __extends(ReturnBase, _super);
    function ReturnBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '残次品退换',
            usingComponents: {
                'van-button': '../../../../components/vant/button/index',
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'van-field': '../../../../components/vant/field/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-picker': '../../../../components/vant/picker/index',
                'van-search': '../../../../components/vant/search/index',
            },
        };
        _this.data = {
            userInfo: {},
            edtVisible: false,
            edtList: [],
            orgVisible: false,
            orgList: [],
            orgListOri: [],
            maktlVisible: false,
            maktlList: [],
            reAddressVisible: false,
            reAddressList: [],
            form: {
                fileFlag: '',
                file1: '',
                returnAddressId: '',
                returnAdr: '',
                rebackCode: '',
                reback: '',
                proposerName: '',
                proposerTel: '',
                organizationCode: '',
                type: 'handle',
            },
            formExtra: {
                customerName: '',
                orgName: '',
                maktlCode: '',
                maktlName: '',
            },
            errorMessage: {
                orgName: '',
                maktlName: '',
                proposerName: '',
                proposerTel: '',
                returnAdr: '',
                reback: '',
            },
            needPicture: false,
        };
        // 页面内交互写在methods里
        _this.methods = {
            onSubmitForm: function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var form;
                    return __generator(this, function (_a) {
                        form = __assign({}, this.form, this.formExtra, e.detail.value);
                        if (this.checkForm(form)) {
                            stores.dispatch({ type: index_1.SET_RETURN_BASE_INFO, payload: { baseInfo: __assign({}, this.form, this.formExtra, form) } });
                            wx.navigateTo({ url: '/pages/me/return/add-product/index' });
                        }
                        return [2 /*return*/];
                    });
                });
            },
            onClearError: function (column) {
                this.clearError(column);
            },
            onToggleEdt: function () {
                this.clearError('reback');
                this.toggleEdt();
            },
            onSelectEdt: function (e) {
                var _a = e.detail.value, text = _a.text, value = _a.value;
                this.form = __assign({}, this.form, { rebackCode: value, reback: text });
                this.toggleEdt();
            },
            onToggleOrg: function () {
                this.clearError('orgName');
                this.toggleOrg();
            },
            onSelectOrg: function (e) {
                var _a = e.detail.value, text = _a.text, value = _a.value;
                var edtListNew;
                if (value.startsWith('4')) { // 通信的配送方式多一个
                    edtListNew = ramda_1.clone(this.edtListOri);
                }
                else {
                    edtListNew = this.edtListOri.filter(function (item) { return item.text.indexOf('通信') === -1; });
                }
                var formNew = { organizationCode: value, };
                var rebackCodeOri = this.form.rebackCode;
                if (!edtListNew.some(function (item) { return item.value === rebackCodeOri; })) {
                    formNew = __assign({}, formNew, { reback: edtListNew[0].text, rebackCode: edtListNew[0].value });
                }
                this.form = __assign({}, this.form, formNew);
                this.formExtra = __assign({}, this.formExtra, { orgName: text });
                // 冰箱需要上传照片
                this.needPicture = value.startsWith('67') ? true : false;
                this.edtList = edtListNew;
                this.toggleOrg();
                this.getMaktlByOrgCode();
            },
            onToggleMaktl: function () {
                this.clearError('maktlName');
                this.toggleMaktl();
            },
            onSelectMaktl: function (e) {
                var _a = e.detail.value, text = _a.text, value = _a.value;
                this.formExtra = __assign({}, this.formExtra, { maktlCode: value, maktlName: text });
                this.toggleMaktl();
                this.getReAddressByOrgCode();
            },
            onToggleReAddress: function () {
                this.clearError('returnAdr');
                this.toggleReAddress();
            },
            onSelectReAddress: function (reAddress) {
                var text = reAddress.text, value = reAddress.value;
                this.form = __assign({}, this.form, { returnAddressId: value, returnAdr: text });
                this.toggleReAddress();
            },
            onReAddressSearch: function (event) {
                var value = event.detail;
                var reAddressListNew = this.reAddressList.slice();
                reAddressListNew.forEach(function (item) {
                    item.filtered = true;
                    if (value && item.text.indexOf(value) === -1) {
                        item.filtered = false;
                    }
                });
                this.reAddressList = reAddressListNew;
            },
            onAddPicture: function () {
                var _this = this;
                var _a = this.$parent.globalData, sessionId = _a.sessionId, modifySession = _a.modifySession;
                var Cookie;
                if (sessionId || modifySession) {
                    Cookie = "JSESSIONID=" + (sessionId || modifySession);
                }
                wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success: function (res) {
                        // tempFilePath可以作为img标签的src属性显示图片
                        var tempFilePaths = res.tempFilePaths[0];
                        var that = _this;
                        wx.uploadFile({
                            url: request_2.baseUrl + "/comm/uploadFile.nd",
                            filePath: tempFilePaths,
                            header: { Cookie: Cookie },
                            name: 'file1',
                            formData: {
                                fileFlag: that.form.fileFlag,
                                file1: tempFilePaths,
                            },
                            success: function (res) {
                                var statusCode = res.statusCode, data = res.data;
                                var dataJson = JSON.parse(data);
                                if (statusCode === 200 && dataJson.flag) {
                                    toast_1.default.success((that.form.file1 ? '重新' : '') + "\u4E0A\u4F20\u56FE\u7247\u6210\u529F");
                                    that.form = __assign({}, that.form, { file1: dataJson.fileNameString });
                                    that.$apply();
                                }
                            }
                        });
                    }
                });
            }
        };
        return _this;
    }
    ReturnBase.prototype.toggleEdt = function () {
        this.edtVisible = !this.edtVisible;
    };
    ReturnBase.prototype.toggleOrg = function () {
        this.orgVisible = !this.orgVisible;
    };
    ReturnBase.prototype.toggleMaktl = function () {
        this.maktlVisible = !this.maktlVisible;
    };
    ReturnBase.prototype.toggleReAddress = function () {
        this.reAddressVisible = !this.reAddressVisible;
    };
    ReturnBase.prototype.clearError = function (column) {
        var _a;
        this.errorMessage = __assign({}, this.errorMessage, (_a = {}, _a[column] = '', _a));
    };
    ReturnBase.prototype.checkForm = function (form) {
        var status = true;
        var orgName = form.orgName, maktlName = form.maktlName, proposerName = form.proposerName, proposerTel = form.proposerTel, returnAdr = form.returnAdr, reback = form.reback;
        if (!orgName) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { orgName: '请选择供应商' });
        }
        if (!maktlName) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { maktlName: '请选择物料组' });
        }
        if (!proposerName) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { proposerName: '请输入联系人' });
        }
        if (!proposerTel) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { proposerTel: '请输入联系电话' });
        }
        if (!returnAdr) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { returnAdr: '请选择商家地址' });
        }
        if (!reback) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { reback: '请选择拉货方式' });
        }
        if (!validators_1.checkPhone(proposerTel)) {
            status = false;
            this.errorMessage = __assign({}, this.errorMessage, { proposerTel: '请输入正确的联系电话' });
        }
        this.$apply();
        return status;
    };
    ReturnBase.prototype.getMaktlByOrgCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, maktlList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request_1.request({ api: '/defectiveProduct/setMaterialCode.nd', data: { orgCode: this.form.organizationCode } })];
                    case 1:
                        result = _a.sent();
                        maktlList = !result ? [] : Object.keys(result).map(function (key) {
                            return { value: key, text: result[key] };
                        });
                        this.maktlList = maktlList;
                        if (maktlList.length) {
                            this.formExtra = __assign({}, this.formExtra, { maktlName: maktlList[0].text, maktlCode: maktlList[0].value });
                            this.getReAddressByOrgCode();
                        }
                        else {
                            this.reAddressList = [];
                        }
                        this.clearError('maktlName');
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReturnBase.prototype.getReAddressByOrgCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request_1.request({ api: '/defectiveProduct/getReturnAdd.nd', data: { orgCode: this.form.organizationCode, productModel: this.formExtra.maktlCode } })];
                    case 1:
                        result = _a.sent();
                        this.reAddressList = !result ? [] : Object.keys(result).map(function (key) {
                            return { value: key, text: result[key], filtered: true };
                        });
                        this.form = __assign({}, this.form, { returnAdr: this.reAddressList.length ? this.reAddressList[0].text : '', returnAddressId: this.reAddressList.length ? this.reAddressList[0].value : '' });
                        this.clearError('returnAdr');
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReturnBase.prototype.getBaseInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, defectiveProductModel, edtList, orgList, uuid, edtListOri, currentEdt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request_1.request({ api: 'defectiveProduct/submissionInit.nd' })];
                    case 1:
                        result = _a.sent();
                        defectiveProductModel = result.defectiveProductModel, edtList = result.edtList, orgList = result.orgList, uuid = result.uuid;
                        this.formExtra = __assign({}, this.formExtra, { customerName: defectiveProductModel.customerName });
                        edtListOri = edtList.map(function (edt) {
                            return { text: edt.propertyName, value: edt.propertyValue };
                        });
                        this.edtListOri = edtListOri;
                        this.edtList = edtListOri;
                        this.orgList = orgList.map(function (org) {
                            return { text: org.organizationName, value: org.organizationCode };
                        });
                        currentEdt = edtListOri[0];
                        this.form = __assign({}, this.form, { fileFlag: uuid, proposerName: defectiveProductModel.proposerName, proposerTel: defectiveProductModel.proposerTel, reback: currentEdt.text, rebackCode: currentEdt.value });
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReturnBase.prototype.onLoad = function () {
        this.getBaseInfo();
    };
    return ReturnBase;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(ReturnBase , 'pages/me/return/base/index'));

