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
var store_1 = require('./../../../../store/actions/store.js');
var index_1 = require('./../../../components/side-filter/index.js');
var index_2 = require('./../../../components/header-filter/index.js');
var index_3 = require('./../../../../components/empty-data-type/index.js');
var index_4 = require('./../../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '展台需求提报',
            usingComponents: {
                'van-icon': '../../../../components/vant/icon/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-loading': '../../../../components/vant/loading/index',
                'calendar': '../../../../components/calendar/index',
                'van-field': '../../../../components/vant/field/index',
                "van-datetime-picker": "../../../../components/vant/datetime-picker/index",
                'van-search': '../../../../components/vant/search/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "sideFilter": { "xmlns:v-bind": "", "v-bind:sideFilterForm.sync": "sideFilterForm", "xmlns:v-on": "" }, "emptyDataType": {}, "headerTab": { "v-bind:tabList.sync": "headerTabList" } };
        _this.$events = { "sideFilter": { "v-on:handleConfirm": "handleConfirm", "v-on:onSideSearch": "onSideSearch", "v-on:onFormDataChange": "handleFormDataChange" }, "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            sideFilter: index_1.default,
            headerFilter: index_2.default,
            emptyDataType: index_3.default,
            headerTab: index_4.default,
        };
        _this.data = {
            visible: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    activityTime: '',
                    projectOrg: '',
                    store: '',
                    materialGroup: [],
                    status: '',
                    planProject: '',
                    account: '',
                    singleNumber: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    totalPage: 0,
                },
            },
            activityList: [],
            statusOptions: [],
            sideFilterForm: [
                {
                    key: 'activityTime',
                    label: '提报日期',
                    value: '',
                    placeholder: '请选择时间',
                    type: 'yearMonth'
                },
                {
                    key: 'projectOrg',
                    label: '立项组织',
                    value: '',
                    name: '',
                    placeholder: '请选择立项组织',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'store',
                    label: '门店',
                    value: '',
                    name: '',
                    placeholder: '请选择门店',
                    type: 'select',
                    multiple: false,
                    isSearch: true,
                    isNotAll: true,
                    options: [],
                },
                {
                    key: 'materialGroup',
                    label: '物料组',
                    value: [],
                    name: [],
                    placeholder: '请选择物料组',
                    type: 'select',
                    multiple: true,
                    options: [],
                },
                {
                    key: 'status',
                    label: '流程状态',
                    value: '',
                    name: '',
                    placeholder: '请选择流程状态',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'planProject',
                    label: '计划项目名称',
                    value: '',
                    name: '',
                    placeholder: '请选择计划项目名称',
                    type: 'select',
                    multiple: false,
                    options: [],
                },
                {
                    key: 'account',
                    label: '提报人账号',
                    value: '',
                    placeholder: '请输入提报人账号',
                    type: 'field'
                },
                {
                    key: 'singleNumber',
                    label: '需求提报单号',
                    value: '',
                    placeholder: '请输入需求提报单号',
                    type: 'field'
                },
            ],
            headerTabList: [
                { name: '流程状态', type: 'status', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转到详情
            viewDetail: function (e) {
                var _a = e.currentTarget.dataset, type = _a.type, id = _a.id, source = _a.source;
                var url = "/pages/terminal/booth-report/add/index?id=" + id + "&type=" + type + "&dataSource=" + source;
                wx.navigateTo({
                    url: url
                });
            },
            // 切换顶部快捷筛选
            touchOrderSFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (!_this.OrderSFilterVisible) {
                    _this.OrderSFilterVisible = true;
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                if (!name) {
                    _this.OrderSFilterVisible = false;
                    _this.CurrentOrderSFilterName = '';
                    return;
                }
                if (_this.CurrentOrderSFilterName === name) {
                    _this.OrderSFilterVisible = false;
                    _this.CurrentOrderSFilterName = '';
                    return;
                }
                if (['type', 'status'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 顶部状态快捷筛选
            onSelectStatus: function (e) {
                var _a = e.currentTarget.dataset, name = _a.name, id = _a.id;
                this.filterForm.terms[name] = id;
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.headerTabList[0].selectValue = id;
                this.myGetOrderList();
                this.methods.touchOrderSFilter();
                this.methods.scrollToTop();
            },
            // 点击普通筛选按钮-显示或隐藏左侧筛选框
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
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
                var totalPage = this.filterForm.page.totalPage;
                if (totalPage > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
            // 侧边筛选列表可搜索，并重新赋值
            onSideSearch: function (searchObj) {
                var key = searchObj.key, searchValue = searchObj.searchValue;
                if (key && key == 'store') {
                    this.getCustomerShopData(searchValue);
                }
            },
            // 选择筛选时触发事件
            handleFormDataChange: function (e) {
                var currIndex = e.currIndex, sideFilterForm = e.sideFilterForm;
                this.sideFilterForm = sideFilterForm;
                if (currIndex !== '' && this.sideFilterForm[currIndex] && this.sideFilterForm[currIndex].key == 'store') {
                    this.getMaterialGroupsData(this.sideFilterForm[currIndex].value);
                    this.sideFilterForm = this.sideFilterForm.map(function (item) {
                        if (item.key === 'materialGroup') {
                            item.value = [];
                            item.name = [];
                        }
                        return item;
                    });
                }
                this.$apply();
            },
            // 侧边筛选确定
            handleConfirm: function (e) {
                var _this = this;
                var filterForm = e.sideFilterForm;
                if (filterForm) {
                    filterForm.forEach(function (item) {
                        _this.filterForm.terms[item.key] = item.value;
                    });
                }
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.myGetOrderList();
                this.methods.orderfiltering();
            },
        };
        return _this;
    }
    // 获取筛选列表并给对应值赋值
    Filter.prototype.optionsConversion = function (list, key) {
        if (list) {
            list = list.map(function (item) {
                return __assign({}, item, { id: item.code, value: item.name });
            });
            this.sideFilterForm = this.sideFilterForm.map(function (item) {
                if (item.key === key) {
                    item.options = list;
                }
                return item;
            });
        }
        this.$apply();
    };
    // 获取计划项目名称下拉框列表
    Filter.prototype.getPlanProjectNameComboBoxData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.methods.getPlanProjectNameComboBox().then(function (res) {
                            var data = res.payload.data;
                            if (data) {
                                data = data.map(function (item) {
                                    return __assign({}, item, { id: item.code, value: item.name });
                                });
                                _this.sideFilterForm = _this.sideFilterForm.map(function (item) {
                                    if (item.key === 'planProject') {
                                        item.options = data;
                                        if (item.options && item.options.length > 0) {
                                            item.value = item.options[0].id;
                                            item.name = item.options[0].value;
                                            _this.filterForm.terms['planProject'] = item.options[0].id;
                                        }
                                    }
                                    return item;
                                });
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取流程状态下拉查询列表
    Filter.prototype.getProcessStateData = function () {
        var _this = this;
        this.methods.getProcessState().then(function (res) {
            var data = res.payload.data;
            if (data) {
                data = data.map(function (item) {
                    return {
                        id: item,
                        value: item
                    };
                });
                _this.sideFilterForm = _this.sideFilterForm.map(function (item) {
                    if (item.key === 'status') {
                        item.options = data;
                        _this.statusOptions = data;
                    }
                    return item;
                });
            }
            _this.$apply();
        });
    };
    // 获取立项组织列表
    Filter.prototype.getQueryOrgData = function () {
        var _this = this;
        var param = {
            type: '' // 1:分销，2:直营和代理，3或者不填:全部
        };
        this.methods.getQueryOrg(param).then(function (res) {
            var orgList = res.payload.orgList;
            _this.optionsConversion(orgList, 'projectOrg');
            _this.$apply();
        });
    };
    // 根据门店id查询物料组
    Filter.prototype.getMaterialGroupsData = function (customerShopId) {
        var _this = this;
        if (!customerShopId) {
            return;
        }
        var param = {
            customerShopId: customerShopId
        };
        this.methods.getMaterialGroups(param).then(function (res) {
            var data = res.payload.data;
            if (data && data[0] && data[0].params) {
                _this.optionsConversion(data[0].params, 'materialGroup');
            }
            _this.$apply();
        });
    };
    // 获取门店列表
    Filter.prototype.getCustomerShopData = function (searchKeyWords) {
        var _this = this;
        var words = searchKeyWords || '';
        var param = {
            isSpecialShop: '212400',
            searchKeyWords: words,
        };
        this.methods.getCustomerShop(param).then(function (res) {
            var data = res.payload.data;
            _this.optionsConversion(data, 'store');
            _this.$apply();
        });
    };
    Filter.prototype.myGetOrderList = function () {
        var _this = this;
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var data = {
            submitDate: terms.activityTime,
            orgId: terms.projectOrg,
            customerShopId: terms.store,
            materialGroupIdList: terms.materialGroup,
            checkStatusName: terms.status,
            planProjectNameCode: terms.planProject,
            submitter: terms.account,
            demandCode: terms.singleNumber,
            pageNo: page.pageNo,
            pageSize: page.pageSize,
        };
        this.methods.getBoothReportList(__assign({ _loading: true }, data)).then(function (res) {
            var data = res.payload.data;
            _this.filterForm.page = __assign({}, _this.filterForm.page, { totalPage: data.totalPage });
            var activityList = data.content || [];
            if (data.page > 1) {
                _this.activityList = _this.activityList.concat(activityList);
            }
            else {
                _this.activityList = activityList;
            }
            _this.$apply();
        });
    };
    Filter.prototype.onShow = function () {
        this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
        this.myGetOrderList();
    };
    Filter.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPlanProjectNameComboBoxData()];
                    case 1:
                        _a.sent();
                        this.getQueryOrgData();
                        this.getProcessStateData();
                        return [2 /*return*/];
                }
            });
        });
    };
    Filter = __decorate([
        wepy_redux_1.connect({}, {
            getBoothReportList: store_1.getBoothReportList,
            getCustomerShop: store_1.getCustomerShop,
            getQueryOrg: store_1.getQueryOrg,
            getMaterialGroups: store_1.getMaterialGroups,
            getProcessState: store_1.getProcessState,
            getPlanProjectNameComboBox: store_1.getPlanProjectNameComboBox,
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/terminal/booth-report/list/index'));

