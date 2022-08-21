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
var request_1 = require('./../../../../utils/request.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_1 = require('./../../../../components/empty-data-type/index.js');
var Returned = /** @class */ (function (_super) {
    __extends(Returned, _super);
    function Returned() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '退换货查询',
            usingComponents: {
                'van-button': '../../../../components/vant/button/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-field': '../../../../components/vant/field/index',
                "van-toast": "/components/vant/toast/index",
                'van-picker': '../../../../components/vant/picker/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "退货" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            statusLabel: '未选择',
            statusVisible: false,
            filterVisible: false,
            totalPages: 1,
            filterForm: {
                pageNo: 1,
                dealState: '',
                serialCode: '',
                productName: '',
            },
            statusList: [
                { value: '', text: '未选择' },
                { value: 0, text: '待处理' },
                { value: 1, text: '已处理' },
            ],
            returnedList: [],
        };
        // 页面内交互写在methods里
        _this.methods = {
            onToggleStatus: function () {
                this.toggleStatus();
            },
            onChangeStatus: function (event) {
                var _a = event.detail, picker = _a.picker, value = _a.value, index = _a.index;
                this.statusLabel = value.text;
                this.filterForm = __assign({}, this.filterForm, { pageNo: 1, dealState: value.value });
                this.toggleStatus();
                this.getReturnedList();
            },
            onToggleFilter: function () {
                this.toggleFilter();
            },
            onGetReturnedListNext: function (event) {
                if (this.totalPages > this.filterForm.pageNo) {
                    this.filterForm = __assign({}, this.filterForm, { pageNo: this.filterForm.pageNo + 1 });
                    this.getReturnedList('concat');
                }
            },
            onSubmitFilterForm: function (event) {
                this.filterForm = __assign({}, this.filterForm, event.detail.value, { pageNo: 1 });
                this.toggleFilter();
                this.getReturnedList();
            }
        };
        return _this;
    }
    Returned.prototype.toggleStatus = function () {
        this.statusVisible = !this.statusVisible;
    };
    Returned.prototype.toggleFilter = function () {
        this.filterVisible = !this.filterVisible;
    };
    Returned.prototype.getReturnedList = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var result, totalPages, dpList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toast_1.default.loading({
                            message: '正在加载',
                            duration: 0
                        });
                        return [4 /*yield*/, request_1.request({ api: '/defectiveProduct/defectiveStateInit.nd', data: this.filterForm })];
                    case 1:
                        result = _a.sent();
                        totalPages = result.totalPages, dpList = result.dpList;
                        this.totalPages = totalPages;
                        if (type) {
                            this.returnedList = this.returnedList.concat(dpList);
                        }
                        else {
                            this.returnedList = dpList;
                        }
                        toast_1.default.clear();
                        this.$apply();
                        return [2 /*return*/];
                }
            });
        });
    };
    Returned.prototype.onLoad = function () {
        this.getReturnedList();
    };
    return Returned;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Returned , 'pages/me/returned/list/index'));

