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
var index_1 = require('./../../../components/empty-data-type/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '培训打卡',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-loading': '../../../components/vant/loading/index',
                'van-circle': '../../../components/vant/circle/index',
                'img': '../../../components/img/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            purchaseVisable: false,
            currentYear: '',
            currentMonth: '',
            currentDate: '',
            dateOption: [],
            selectDate: '',
            trainingList: [],
            statisticsData: {},
            customerInfo: {
                customerName: '',
                customerCode: '',
            },
            canvasImg: '',
            imgObj: {
                'trainingClockBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529880_e2edd1b4e90a42b993a2ec88c5825f1b.png',
                'trainingClockLogo': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552864_7a568383337a4c8586df776a3fe48fcc.png',
            },
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 跳转到新增打卡
            viewDetail: function (item) {
                if (_this.currentDate < _this.currentMonth) {
                    toast_1.default('该培训任务已过期');
                    return;
                }
                if (_this.currentDate > _this.currentMonth) {
                    toast_1.default('该培训任务未开始');
                    return;
                }
                if (item && item.id && item.title) {
                    var url = "/pages/terminal/addrecord/index?trainingId=" + item.id + "&trainingTitle=" + item.title + "&trainingType=true";
                    wx.navigateTo({
                        url: url
                    });
                }
            },
            // 跳转至培训记录
            handleToTrainingRecord: function () {
                var url = "/pages/terminal/trainingRecord/index";
                wx.navigateTo({
                    url: url
                });
            },
            // 时间弹框显示
            handleDateTime: function () {
                this.selectDate = this.currentDate;
                this.purchaseVisable = true;
            },
            // 修改时间
            oMonthchange: function (month) {
                this.selectDate = month;
            },
            handleCancleDatePop: function () {
                this.purchaseVisable = false;
            },
            handleConfirmDatePop: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.currentDate = this.selectDate;
                                this.purchaseVisable = false;
                                return [4 /*yield*/, this.getStatistics()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.myGetDataList()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            // 进度条子组件传值
            getCanvasImg: function (imgUrl) {
                this.canvasImg = imgUrl.detail;
            }
        };
        return _this;
    }
    // 获取培训统计数据
    Filter.prototype.getStatistics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
                        return [4 /*yield*/, requestJSON_1.request({
                                api: "cts/ctsApi.nd?",
                                data: {
                                    month: this.currentYear + "-" + this.currentDate,
                                    serviceCode: 'getTrainOverviewMonth'
                                },
                                method: 'POST',
                                callback: function (res) {
                                    var data = res.data;
                                    _this.statisticsData = data.returnData;
                                    _this.$apply();
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取培训列表
    Filter.prototype.myGetDataList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, requestJSON_1.request({
                            api: "cts/ctsApi.nd?",
                            data: {
                                months: this.currentYear + "-" + this.currentDate,
                                serviceCode: 'getTrainingTaskListV1'
                            },
                            method: 'POST',
                            callback: function (res) {
                                toast_1.default.clear();
                                var data = res.data;
                                _this.trainingList = data.returnData;
                                _this.$apply();
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取日期
    Filter.prototype.getDate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, i, j, month, _a, customerName, customerCode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        now = new Date();
                        this.currentYear = now.getFullYear();
                        //初始化月
                        for (i = 1; i <= 12; i++) {
                            j = i < 10 ? '0' + i : i;
                            this.dateOption.push({
                                month: j
                            });
                        }
                        month = now.getMonth() + 1;
                        month = month < 10 ? '0' + month : month;
                        this.currentDate = month;
                        this.currentMonth = month;
                        _a = JSON.parse(wx.getStorageSync('b2b_token')).customer, customerName = _a.customerName, customerCode = _a.customerCode;
                        this.customerInfo.customerName = customerName;
                        this.customerInfo.customerCode = customerCode;
                        return [4 /*yield*/, this.getStatistics()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.myGetDataList()];
                    case 2:
                        _b.sent();
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

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/terminal/trainingClock/index'));

