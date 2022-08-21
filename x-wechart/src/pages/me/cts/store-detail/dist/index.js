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
var index_1 = require("../../../../components/echarts/index");
var ramda_1 = require("ramda");
var request_1 = require("@/utils/request");
var toast_1 = require("@/components/vant/toast/toast");
var Defaultaccount = /** @class */ (function (_super) {
    __extends(Defaultaccount, _super);
    function Defaultaccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '店铺详情',
            usingComponents: {
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-switch': '../../../components/vant/switch/index',
                'van-popup': '/components/vant/popup/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'van-tab': '../../../components/vant/tab/index',
                'ec-canvas': '/components/ec-canvas/ec-canvas',
                'calendar': '/components/calendar/index'
            }
        };
        _this.components = {
            chart: index_1["default"]
        };
        _this.data = {
            accountList: [],
            imgSrc: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3192883024,2003527178&fm=26&gp=0.jpg",
            option1: null,
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false
            },
            calendarShow: false,
            filterForm: {
                _loading: true,
                terms: {
                    documentNum: '',
                    supplierCode: '',
                    startDocumentDate: '',
                    endDocumentDate: '',
                    status: ''
                },
                page: {
                    pageNo: 1,
                    pageSize: 10
                }
            },
            rankTab: '0',
            saleTab: '0'
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm.terms, startDocumentDate = _a.startDocumentDate, endDocumentDate = _a.endDocumentDate;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = startDocumentDate;
                    end = endDocumentDate;
                }
                if (type === 'sapDate') {
                    begin = startDocumentDate;
                    end = endDocumentDate;
                }
                if (name.indexOf('startDocumentDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('endDocumentDate') > -1) {
                    this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                }
                this.calendarShow = true;
            },
            closeCalendar: function () {
                this.calendarShow = false;
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + fillZero("" + month) + "-" + fillZero("" + day);
                this.filterForm.terms = __assign(__assign({}, this.filterForm.terms), (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
            saleTab: function (e) {
                _this.saleTab = e;
            },
            rankTab: function (e) {
                console.log(e);
                _this.rankTab = e;
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
            },
            radarOption: function () {
                _this.option1 = {
                    tooltip: {},
                    legend: {
                        data: ['费率', '区域内通渠道平均'],
                        bottom: 10
                    },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '规模', max: 6500 },
                            { name: '高端占比', max: 16000 },
                            { name: '费率', max: 30000 },
                            { name: '同期占比', max: 38000 },
                        ],
                        radius: 80,
                        center: ['52%', '45%'],
                        splitArea: {
                            areaStyle: {
                                color: ['#A7E2E0', '#B2E5E4', '#C0EAE8', '#D9F3F2', '#E5F5F6']
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, .5)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0)'
                            }
                        }
                    },
                    series: [{
                            name: '预算 vs 开销（Budget vs spending）',
                            type: 'radar',
                            // areaStyle: {normal: {}},
                            data: [
                                {
                                    value: [4300, 10000, 28000, 35000],
                                    name: '费率'
                                },
                                {
                                    value: [5000, 14000, 28000, 3100],
                                    name: '区域内通渠道平均'
                                }
                            ]
                        }]
                };
                _this.$apply();
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
                // this.getAccountList()
                this.methods.radarOption();
                return [2 /*return*/];
            });
        });
    };
    return Defaultaccount;
}(wepy_1["default"].page));
exports["default"] = Defaultaccount;
