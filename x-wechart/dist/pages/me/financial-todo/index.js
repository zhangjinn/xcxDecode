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
var financialtodo_1 = require('./../../../store/actions/financialtodo.js');
var request_1 = require('./../../../utils/request.js');
var common_1 = require('./../../../mixins/common.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_1 = require('./../../../components/empty-data-type/index.js');
var Todo = /** @class */ (function (_super) {
    __extends(Todo, _super);
    function Todo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '财务待办',
            usingComponents: {
                'van-button': '../../../components/vant/button/index',
                'van-tab': '../../../components/vant/tab-item/index',
                'van-tabs': '../../../components/vant/tabs-item/index',
                'van-search': '../../../components/vant/search/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
            },
            enablePullDownRefresh: true,
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.mixins = [common_1.default];
        _this.params = {
            pageSize: 10,
            pageNo: 1,
            status: 0,
        };
        _this.isView = false;
        _this.data = {
            IKnow: false,
            active: 'first',
            key: '',
            // 加载数据中
            loading: false,
            // 是否全部加载完毕
            complete: false,
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 过滤数据
            search: function (params) {
                toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
                _this.methods.getFinancialTodoItems(params, function (res) {
                    // 接口返回 关闭对应状态
                    _this.loading = false;
                    _this.isView = false;
                    wx.stopPullDownRefresh();
                    toast_1.default.clear();
                    if (res && res.data && res.data.priceDelegateMessageList) {
                        var _a = res.data, priceDelegateMessageList = _a.priceDelegateMessageList, totalPages = _a.totalPages;
                        _this.complete = priceDelegateMessageList.length === 0;
                        _this.totalPages = totalPages;
                    }
                });
            },
            allIKnow: function () {
                _this.IKnow = false;
                // this.methods.goto(this.secondTypeCode, 0, this.sourceId, this.status, this.doType)
            },
            goSignAction: function (secondTypeCode, id, sourceId, status, doType, view) {
                _this.secondTypeCode = secondTypeCode;
                _this.status = status;
                _this.sourceId = sourceId;
                _this.doType = doType;
                if (doType == '0' && view !== 'view') {
                    _this.IKnow = true;
                    return;
                }
                _this.methods.goto(secondTypeCode, id, sourceId, status, doType);
            },
            goto: function (secondTypeCode, id, sourceId, status, doType) {
                if (secondTypeCode == '20') {
                    // 资金电子账单
                    wx.navigateTo({
                        url: "/pages/finance/fund-electronic/signature/index?id=" + sourceId + "&statusFlag=" + status + "&from=todo&doType=" + doType
                    });
                }
                else if (secondTypeCode == '10') {
                    // 政策核对单
                    wx.navigateTo({
                        url: "/pages/finance/policy-check/signature/index?id=" + sourceId + "&statusFlag=" + status + "&from=todo&doType=" + doType
                    });
                }
                else if (secondTypeCode === '30') {
                    // 政策电子账单
                    wx.navigateTo({
                        url: "/pages/finance/policy-electronic/signature/index?id=" + sourceId + "&statusFlag=" + status + "&from=todo&doType=" + doType
                    });
                }
                else {
                    console.log('todo sign doType: ', secondTypeCode);
                }
            },
            // 待用
            signAction: function (id, type) { return __awaiter(_this, void 0, void 0, function () {
                var res, urlStr;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            toast_1.default.loading({ forbidClick: true, message: '处理中...', duration: 0 });
                            return [4 /*yield*/, request_1.request({ api: 'task/link.nd', data: { id: id, type: type, returnUrl: '/pages/me/todo/index' }, callback: function () {
                                        toast_1.default.clear();
                                    } })];
                        case 1:
                            res = _a.sent();
                            if (res.code === '0') {
                                urlStr = encodeURIComponent(res.url);
                                this.isView = type === 'docView';
                                wx.navigateTo({ url: "/pages/me/webview/index?url=" + urlStr });
                            }
                            else {
                                this.isView = false;
                                toast_1.default.fail(res.msg || '处理失败');
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
            // 待用
            downFile: function (id) {
                toast_1.default.loading({ forbidClick: true, message: '文件下载中...', duration: 0 });
                var _a = _this.$parent.globalData, sessionId = _a.sessionId, modifySession = _a.modifySession;
                wx.downloadFile({
                    url: wepy_1.default.$appConfig.baseUrl + "/task/downFile.nd?id=" + id + "&encodeByBase64=false",
                    header: {
                        Cookie: "JSESSIONID=" + (sessionId || modifySession) + ";",
                    },
                    complete: function () {
                        toast_1.default.clear();
                    },
                    success: function (res) {
                        if (res.statusCode == 200) {
                            wx.openDocument({
                                filePath: res.tempFilePath,
                                fileType: 'pdf',
                                success: function (res) {
                                    _this.isView = true;
                                    toast_1.default.success('文件下载成功');
                                },
                                fail: function (res) {
                                    _this.isisViewView = false;
                                    toast_1.default.fail('文件打开失败');
                                },
                            });
                        }
                        else {
                            toast_1.default.fail('文件下载失败, 请重试');
                        }
                    },
                });
            },
            onPullBottom: function () {
                var pageNo = this.params.pageNo;
                var index = pageNo + 1;
                if (!this.loading && !this.complete && pageNo < this.totalPages) {
                    this.loading = true;
                    this.params.pageNo = index;
                    this.methods.search(__assign({}, this.params, { pull: true }));
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Todo.prototype.onPullDownRefresh = function () {
        this.params = __assign({}, this.params, { pageNo: 1 });
        if (this.params.searchTerm) {
            delete this.params.searchTerm;
        }
        this.methods.search(__assign({}, this.params));
    };
    Todo.prototype.onShow = function () {
        this.methods.getFinancialTodoCounts();
        if (this.key) {
            this.params = { pageSize: 10, pageNo: 1, status: this.params.status, searchTerm: this.key };
        }
        else {
            this.params = { pageSize: 10, pageNo: 1, status: this.params.status };
        }
        this.methods.search(__assign({}, this.params));
    };
    Todo.prototype.onLoad = function (param) {
        var status = param.status;
        if (status) {
            this.params.status = status;
        }
    };
    Todo.prototype.onUnload = function () {
        var route = getCurrentPages();
        this.key = '';
        if (route.length > 3) {
            wx.navigateBack({ delta: 2 });
        }
    };
    Todo = __decorate([
        wepy_redux_1.connect({
            count: function (_a) {
                var financialtodo = _a.financialtodo;
                return financialtodo.count;
            },
            items: function (_a) {
                var financialtodo = _a.financialtodo;
                return financialtodo.items;
            },
        }, {
            getFinancialTodoCounts: financialtodo_1.getFinancialTodoCounts,
            getFinancialTodoItems: financialtodo_1.getFinancialTodoItems,
        })
    ], Todo);
    return Todo;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Todo , 'pages/me/financial-todo/index'));

