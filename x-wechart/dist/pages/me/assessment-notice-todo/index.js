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
var common_1 = require('./../../../mixins/common.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var consultTodo_1 = require('./../../../store/actions/consultTodo.js');
var user_1 = require('./../../../store/actions/user.js');
var toast_2 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var consultTodo = /** @class */ (function (_super) {
    __extends(consultTodo, _super);
    function consultTodo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
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
        _this.mixins = [common_1.default];
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.isView = false;
        _this.data = {
            active: 'first',
            key: '',
            // 加载数据中
            loading: false,
            // 是否全部加载完毕
            complete: false,
            params: {
                pageSize: 10,
                pageNo: 1,
                status: 0,
                typeValue: '',
            },
            isCanJump: false,
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 过滤数据
            search: function (params) {
                toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
                _this.methods.getConsultTodoAllItems(params, function (res) {
                    // 接口返回 关闭对应状态
                    _this.loading = false;
                    wx.stopPullDownRefresh();
                    toast_1.default.clear();
                    if (res && res.data && res.data.priceDelegateMessageList) {
                        var _a = res.data, priceDelegateMessageList = _a.priceDelegateMessageList, totalPages = _a.totalPages;
                        _this.complete = priceDelegateMessageList.length === 0;
                        _this.totalPages = totalPages;
                    }
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
            view: function (item, type) {
                _this.isView = true;
                _this.checkUrl(item, type);
            },
            handle: function (item, type) {
                _this.isView = false;
                _this.checkUrl(item, type);
            },
            // 账户注销
            handleAccountCancellation: function (id, type) {
                var that = _this;
                var tip1 = '确定驳回？';
                var tip2 = '已驳回';
                if (type === 'agree') { // 通过
                    tip1 = '确定通过？';
                    tip2 = '已通过';
                }
                wx.showModal({
                    title: '提示',
                    content: tip1,
                    success: function (res) {
                        return __awaiter(this, void 0, void 0, function () {
                            var param;
                            return __generator(this, function (_a) {
                                if (res.confirm) {
                                    param = {
                                        taskId: id,
                                        type: type,
                                    };
                                    that.methods.cancelAccount(param).then(function (res) {
                                        var _a = res.payload, code = _a.code, msg = _a.msg;
                                        if (code == '0') {
                                            toast_2.default.success({
                                                forbidClick: true,
                                                duration: 1000,
                                                message: tip2,
                                                onClose: function () {
                                                    wx.navigateBack({
                                                        delta: 1,
                                                    });
                                                },
                                            });
                                        }
                                        else {
                                            toast_2.default.fail({
                                                forbidClick: true,
                                                message: msg,
                                            });
                                        }
                                    });
                                }
                                return [2 /*return*/];
                            });
                        });
                    },
                });
            },
        };
        return _this;
    }
    consultTodo.prototype.checkUrl = function (item, type) {
        var id = item.sourceId;
        var url = '';
        var typeValue = this.params.typeValue;
        if (typeValue === '14182987654') {
            debugger;
            // 待办：sourceUrl ：SINGLE 老的单挑的，SUM 新页面，合计的
            if (item.sourceUrl === 'SINGLE') {
                url = "/pages/finance/assessment-notice/detail/index?id=" + id; // 跳转至考核通知单详情
            }
            if (item.sourceUrl === 'SUM') {
                url = "/pages/finance/assessment-notice/detail-new/index?id=" + id; // 跳转至考核通知单详情(新)
            }
        }
        else if (typeValue === '14182972401') {
            url = "/pages/terminal/threeProductsReportDetail/index?id=" + id + "&type=" + type;
        }
        else if (typeValue === '14182972402') {
            url = "/pages/terminal/sanpinReceiptDetail/index?id=" + id + "&type=" + type;
        }
        else if (typeValue === '14187583090') {
            url = "/pages/terminal/addStore/index?id=" + id;
        }
        else if (typeValue === '14187583089') { //跳转至代理商活动列表页
            url = "/pages/activity/agency-activity/list/index";
        }
        else if (typeValue === '14187583091') { //跳转展台需求提报列表页
            url = "/pages/terminal/booth-report/list/index";
        }
        if (url) {
            wx.navigateTo({
                url: url
            });
        }
    };
    consultTodo.prototype.onPullDownRefresh = function () {
        this.params = __assign({}, this.params, { pageNo: 1 });
        if (this.params.searchTerm) {
            delete this.params.searchTerm;
        }
        this.methods.search(__assign({}, this.params));
    };
    // 判断该待办是否可跳转
    consultTodo.prototype.checkCanJump = function (type) {
        switch (type) {
            case '14182987654': // 考核通知单
            case '14182972401': // 终包采购计划提报
            case '14182972402': // 终包收货提报
            case '14187583090': // 新增门店待办
            case '14187583089': // 代理商市场活动待办
            case '14187583091': // 非专卖店展台需求提报待办
                return true;
            default:
                return false;
        }
    };
    consultTodo.prototype.onShow = function () {
        this.params = { pageSize: 10, pageNo: 1, status: this.params.status, typeValue: this.params.typeValue };
        this.methods.search(__assign({}, this.params));
    };
    consultTodo.prototype.onLoad = function (param) {
        var status = param.status, typeValue = param.typeValue, typeName = param.typeName;
        if (status) {
            this.params.status = status;
        }
        if (typeValue) {
            this.params.typeValue = typeValue;
            this.isCanJump = this.checkCanJump(typeValue);
        }
        if (typeName) {
            wx.setNavigationBarTitle({
                title: typeName,
            });
        }
        this.$apply();
    };
    consultTodo.prototype.onUnload = function () {
        var route = getCurrentPages();
        if (route.length > 3) {
            wx.navigateBack({ delta: 2 });
        }
    };
    consultTodo = __decorate([
        wepy_redux_1.connect({
            assessmentNoticeItems: function (_a) {
                var consultTodo = _a.consultTodo;
                return consultTodo.assessmentNoticeItems;
            },
        }, {
            getConsultTodoAllItems: consultTodo_1.getConsultTodoAllItems,
            cancelAccount: user_1.cancelAccount,
        })
    ], consultTodo);
    return consultTodo;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(consultTodo , 'pages/me/assessment-notice-todo/index'));

