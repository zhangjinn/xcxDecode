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
var requestJSON_1 = require('./../../../utils/requestJSON.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var index_2 = require('./../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '培训记录',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-field': '../../../components/vant/field/index',
                'van-loading': '../../../components/vant/loading/index',
            },
        };
        _this.data = {
            visible: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            scrollTop: -1,
            filterForm: {
                terms: {
                    date: '',
                    startTime: '',
                    endTime: '',
                    name: '',
                    isSelf: '',
                },
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    totalPages: 1,
                    totalCount: 0
                },
            },
            filterFormExtra: {
                isSelfName: '',
            },
            popupTitle: '',
            agentPopup: false,
            dateOption: [],
            currentYear: '',
            currentMonth: '',
            lookSelfOption: [
                {
                    key: '1',
                    value: '是'
                },
                {
                    key: '0',
                    value: '否'
                }
            ],
            trainingRecordList: [],
            headerTabList: [
                { name: '本月', type: 'orderDate', selectValue: '本月' },
            ],
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {}, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_1.default,
            headerTab: index_2.default,
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转到详情
            viewDetail: function (id) {
                if (id) {
                    var url = "/pages/terminal/trainingDetails/index?id=" + id;
                    wx.navigateTo({
                        url: url
                    });
                }
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
                if (['orderDate'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 选择快捷筛选内容列表
            onSelectDate: function (date) {
                var param = this.currentYear + "-" + date;
                var dateRange = this.getDateTime(param);
                var newDate = {
                    date: date,
                    startTime: dateRange.startTime,
                    endTime: dateRange.endTime,
                };
                this.filterForm.terms = __assign({}, this.filterForm.terms, newDate);
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                if (this.currentMonth == this.filterForm.terms.date) {
                    this.headerTabList[0].name = '本月';
                }
                else {
                    this.headerTabList[0].name = this.currentYear + "\u5E74" + this.filterForm.terms.date + "\u6708";
                }
                this.trainingRecordList = [];
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
                this.methods.scrollToTop();
            },
            // 点击普通筛选按钮-显示或隐藏左侧筛选框
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 筛选确定
            onSubmitFilterForm: function () {
                this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: 1 });
                this.trainingRecordList = [];
                this.myGetOrderList();
                this.methods.orderfiltering();
                this.methods.scrollToTop();
            },
            // 筛选重置
            onResetFilterForm: function () {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { name: '', isSelf: '' });
                this.filterFormExtra = {
                    isSelfName: '',
                };
            },
            // 改变活动名称
            onNameChange: function (e) {
                this.filterForm.terms = __assign({}, this.filterForm.terms, { name: e.detail });
            },
            // 改变仅看自己
            onSelectMethodChange: function (org) {
                var key = org.key, value = org.value;
                if (this.filterForm.terms.isSelf === key) {
                    this.filterForm.terms = __assign({}, this.filterForm.terms, { isSelf: '' });
                    this.filterFormExtra = __assign({}, this.filterFormExtra, { isSelfName: '' });
                    return;
                }
                this.filterForm.terms = __assign({}, this.filterForm.terms, { isSelf: key });
                this.filterFormExtra = __assign({}, this.filterFormExtra, { isSelfName: value });
                this.agentPopup = false;
            },
            // 修改筛选条件列表弹框标题，并显示对应列表内容
            selectagentPopup: function (e) {
                // if (e == 'source') {
                //   this.popupTitle = '活动来源'
                // } else
                if (e == 'isSelf') {
                    _this.popupTitle = '仅看自己';
                }
                _this.agentPopup = !_this.agentPopup;
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
                if (this.filterForm.page.totalPages > this.filterForm.page.pageNo) {
                    this.filterForm.page = __assign({}, this.filterForm.page, { pageNo: this.filterForm.page.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
        };
        return _this;
    }
    //js根据年-月获取开始和结束时间
    Filter.prototype.getDateTime = function (date) {
        var timeArr = date.split('-');
        var year = parseInt(timeArr[0]);
        var month = parseInt(timeArr[1]);
        var startTime = new Date(year, month - 1);
        var endTime = new Date(new Date(year, month).valueOf() - 60 * 60 * 1000 * 24);
        function datasFormat(d) {
            var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            return datetime;
        }
        var formatStartTime = datasFormat(startTime);
        var formatEndTime = datasFormat(endTime);
        return {
            startTime: formatStartTime,
            endTime: formatEndTime
        };
    };
    // 获取培训记录
    Filter.prototype.myGetOrderList = function () {
        var _this = this;
        var _a = this.filterForm, terms = _a.terms, page = _a.page;
        var data = {
            pageNo: page.pageNo,
            pageSize: page.pageSize,
            startTime: terms.startTime,
            endTime: terms.endTime,
            title: terms.name,
            isSelf: terms.isSelf,
            serviceCode: 'getTrainingRecordAppXtw'
        };
        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
        requestJSON_1.request({
            api: "cts/ctsApi.nd?",
            data: data,
            method: 'POST',
            callback: function (res) {
                toast_1.default.clear();
                var data = res.data;
                if (data.returnData && data.returnData.list) {
                    _this.filterForm.page.totalPages = data.returnData.totalPages;
                    _this.filterForm.page.totalCount = data.returnData.totalCount;
                    if (_this.filterForm.page.pageNo > 1) {
                        _this.trainingRecordList = ramda_1.concat(_this.trainingRecordList, data.returnData.list);
                    }
                    else {
                        _this.trainingRecordList = data.returnData.list;
                    }
                }
                _this.$apply();
            }
        });
    };
    // 获取日期
    Filter.prototype.getDate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, i, j, month, param, dateRange, newDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        this.currentYear = now.getFullYear();
                        //初始化月
                        for (i = 1; i <= 12; i++) {
                            j = i < 10 ? '0' + i : i;
                            this.dateOption.push({
                                month: j,
                                monthName: this.currentYear + "\u5E74" + j + "\u6708"
                            });
                        }
                        month = now.getMonth() + 1;
                        month = month < 10 ? '0' + month : month;
                        param = this.currentYear + "-" + month;
                        return [4 /*yield*/, this.getDateTime(param)];
                    case 1:
                        dateRange = _a.sent();
                        newDate = {
                            date: month,
                            startTime: dateRange.startTime,
                            endTime: dateRange.endTime,
                        };
                        this.filterForm.terms = __assign({}, this.filterForm.terms, newDate);
                        this.currentMonth = month;
                        this.trainingRecordList = [];
                        this.myGetOrderList();
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    Filter.prototype.onShow = function () {
        this.getDate();
    };
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/terminal/trainingRecord/index'));

