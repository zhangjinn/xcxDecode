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
var fund_claim_1 = require('./../../../store/actions/fund-claim.js');
/* import utilsWxs from '../../../wxs/utils.wxs' */
var toast_1 = require('./../../../components/vant/toast/toast.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '资金流水',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-loading': '../../../components/vant/loading/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                "van-datetime-picker": "../../../components/vant/datetime-picker/index",
                'calendar': '../../../components/calendar/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            imgObj: {
                'capitalFlowBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552565_1e5b20e22972438db36ec5843b113356.png',
            },
            visible: false,
            scrollTop: -1,
            filterForm: {
                terms: {
                    accountId: '',
                    accountName: '',
                    queryDate: (new Date()).Format('yyyy.MM'),
                    status: 'ALL',
                    salesOrgId: '',
                    salesOrgName: '',
                    partnershipId: '1',
                    partnershipName: '是',
                    creditRangeId: '',
                    creditRangeName: '',
                    certificate: '',
                    businessTypeId: '',
                    businessTypeName: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    totalPages: 0,
                    totalRows: 0,
                },
            },
            CurrentFilterName: '',
            accountVisable: false,
            accountOption: [],
            purchaseVisable: false,
            minDate: new Date(2000, 10, 1).getTime(),
            maxDate: new Date().getTime(),
            currentDate: new Date().getTime(),
            popupTitle: '',
            agentPopup: false,
            salesOrgList: [],
            creditRangeList: [],
            businessTypeList: [],
            orderList: [],
            balanceInfo: {},
            partnershipList: [{
                    id: '1',
                    name: '是'
                }, {
                    id: '2',
                    name: '否'
                }]
        };
        /*  wxs =  */ /* {
           utils: utilsWxs
         } */
        // 页面内交互写在methods里
        _this.methods = {
            // 选择快捷筛选内容列表
            onSelectStatus: function (status) {
                if (!status) {
                    return;
                }
                this.filterForm.terms = __assign({}, this.filterForm.terms, { status: status });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 点击普通筛选按钮-显示或隐藏左侧筛选框
            orderfiltering: function () {
                _this.visible = !_this.visible;
            },
            // 筛选确定
            onSubmitFilterForm: function () {
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
                this.methods.scrollToTop();
            },
            // 筛选重置
            onResetFilterForm: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.filterForm.terms = __assign({}, this.filterForm.terms, { salesOrgId: '', salesOrgName: '', partnershipId: '1', partnershipName: '是', creditRangeId: '', creditRangeName: '', certificate: '', businessTypeId: '', businessTypeName: '' });
                                if (this.salesOrgList && this.salesOrgList.length) {
                                    this.filterForm.terms = __assign({}, this.filterForm.terms, { salesOrgId: this.salesOrgList[0].id, salesOrgName: this.salesOrgList[0].name });
                                }
                                return [4 /*yield*/, this.getCreditRangeDate()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            touchFilter: function (name) {
                if (!_this.purchaseVisable) {
                    _this.purchaseVisable = true;
                    _this.CurrentFilterName = name;
                    return;
                }
                if (!name) {
                    _this.purchaseVisable = false;
                    _this.CurrentFilterName = '';
                    return;
                }
                if (_this.CurrentFilterName === name) {
                    _this.purchaseVisable = false;
                    _this.CurrentFilterName = '';
                    return;
                }
                _this.purchaseVisable = false;
                _this.CurrentFilterName = '';
            },
            // 选择账号
            onAccountchange: function (item) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.filterForm.terms = __assign({}, this.filterForm.terms, { accountId: item.id, accountName: item.name });
                                this.methods.touchFilter();
                                return [4 /*yield*/, this.getCreditRangeDate()];
                            case 1:
                                _a.sent();
                                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                                this.myGetOrderList();
                                this.methods.scrollToTop();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            // 选择时间
            onInput: function (e) {
                this.currentDate = e.detail;
            },
            // 确定选择日期
            onConfirm: function (e) {
                this.purchaseVisable = false;
                var date = new Date(parseInt(e.detail));
                var Y = date.getFullYear();
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                this.filterForm.terms = __assign({}, this.filterForm.terms, { queryDate: Y + '.' + M });
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 侧边弹框输入框赋值
            onFilterFormChange: function (evt) {
                var _a;
                var detail = evt.detail, name = evt.currentTarget.dataset.name;
                this.filterForm.terms = __assign({}, this.filterForm.terms, (_a = {}, _a[name] = detail, _a));
            },
            // 右侧筛选弹框，弹框中各筛选列表显示切换
            selectAgentPopup: function (e) {
                if (e == 'salesOrg') {
                    _this.popupTitle = '销售组织';
                }
                else if (e == 'partnership') {
                    _this.popupTitle = '仅查合作关系';
                }
                else if (e == 'creditRange') {
                    _this.popupTitle = '信贷范围';
                }
                else if (e == 'businessType') {
                    _this.popupTitle = '业务类型';
                }
                _this.agentPopup = !_this.agentPopup;
            },
            selectStatus: function (value, id) {
                if (_this.popupTitle == '销售组织') {
                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { salesOrgId: id, salesOrgName: value });
                    _this.getCreditRangeDate();
                }
                else if (_this.popupTitle == '仅查合作关系') {
                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { partnershipId: id, partnershipName: value });
                    // this.getCreditRangeDate()
                }
                else if (_this.popupTitle == '信贷范围') {
                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { creditRangeId: id, creditRangeName: value });
                }
                else if (_this.popupTitle == '业务类型') {
                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { businessTypeId: id, businessTypeName: value });
                }
                _this.methods.selectAgentPopup();
            },
            // 回到顶部
            scrollToTop: function () {
                _this.scrollTop = 0;
            },
            // 滚动列表
            onScroll: function (event) {
                if (_this.scrollTop === 0) {
                    _this.scrollTop = event.detail.scrollTop;
                }
            },
            // 列表分页
            onGetOrderListNext: function () {
                var page = this.filterForm.page;
                if (page.totalPages > page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
        };
        return _this;
    }
    Filter.prototype.myGetOrderList = function () {
        var _this = this;
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var yearMonth = '';
        if (terms.queryDate) {
            yearMonth = terms.queryDate.split('.')[0] + terms.queryDate.split('.')[1];
        }
        var data = {
            mdmCode: terms.accountId,
            djFlag: terms.partnershipId,
            orgCode: terms.salesOrgId,
            creditRange: terms.creditRangeId,
            yearMonth: yearMonth,
            voucher: terms.certificate,
            businessType: terms.businessTypeId,
            inOutType: terms.status == 'ALL' ? '' : terms.status,
            pageSize: page.pageSize,
            pageNo: page.pageNo,
        };
        toast_1.default.loading({
            forbidClick: true,
            message: '加载中...',
        });
        this.methods.getCapitalFlowList(data).then(function (res) {
            toast_1.default.clear();
            if (res && res.payload && res.payload) {
                if (res.payload.balanceInfo) {
                    _this.balanceInfo = res.payload.balanceInfo;
                }
                if (res.payload.list) {
                    if (res.payload.currentPage > 1) {
                        _this.orderList = _this.orderList.concat(res.payload.list);
                    }
                    else {
                        _this.orderList = res.payload.list;
                    }
                }
                _this.filterForm.page = __assign({}, _this.filterForm.page, { totalPages: res.payload.totalPages, totalRows: res.payload.totalRows });
            }
            _this.$apply();
        });
    };
    Filter.prototype.getFilterList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.methods.getCapitalFlowQueryConditions().then(function (res) {
                            if (res && res.payload && res.payload.data) {
                                var oData = res.payload.data;
                                _this.accountOption = oData.custDict.map(function (item) {
                                    return {
                                        id: item.code,
                                        name: item.name,
                                    };
                                });
                                if (_this.accountOption && _this.accountOption.length) {
                                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { accountId: _this.accountOption[0].id, accountName: _this.accountOption[0].name });
                                }
                                _this.salesOrgList = oData.orgDict.map(function (item) {
                                    return {
                                        id: item.code,
                                        name: item.name,
                                    };
                                });
                                if (_this.salesOrgList && _this.salesOrgList.length) {
                                    _this.filterForm.terms = __assign({}, _this.filterForm.terms, { salesOrgId: _this.salesOrgList[0].id, salesOrgName: _this.salesOrgList[0].name });
                                }
                                _this.businessTypeList = oData.businessTypeDict.map(function (item) {
                                    return {
                                        id: item.code,
                                        name: item.name,
                                    };
                                });
                                _this.$apply();
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getCreditRangeDate()];
                    case 2:
                        _a.sent();
                        this.myGetOrderList();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取信贷范围选择列表
    Filter.prototype.getCreditRangeDate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var terms, param;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.filterForm.terms = __assign({}, this.filterForm.terms, { creditRangeId: '', creditRangeName: '' });
                        terms = this.filterForm.terms;
                        param = {
                            mdmCode: terms.accountId,
                            orgCode: terms.salesOrgId,
                        };
                        return [4 /*yield*/, this.methods.getCreditRange(param).then(function (res) {
                                if (res && res.payload && res.payload.list) {
                                    var oData = res.payload.list;
                                    _this.creditRangeList = oData.map(function (item) {
                                        return {
                                            id: item.code,
                                            name: item.name,
                                        };
                                    });
                                    if (_this.creditRangeList && _this.creditRangeList.length) {
                                        _this.filterForm.terms = __assign({}, _this.filterForm.terms, { creditRangeId: _this.creditRangeList[0].id, creditRangeName: _this.creditRangeList[0].name });
                                    }
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
    Filter.prototype.onShow = function () {
        this.getFilterList();
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            getCapitalFlowQueryConditions: fund_claim_1.getCapitalFlowQueryConditions,
            getCreditRange: fund_claim_1.getCreditRange,
            getCapitalFlowList: fund_claim_1.getCapitalFlowList,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/finance/capital-flow/index'));

