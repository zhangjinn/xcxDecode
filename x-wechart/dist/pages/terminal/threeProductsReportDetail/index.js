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
var toast_1 = require('./../../../components/vant/toast/toast.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var request_1 = require('./../../../utils/request.js');
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '终包采购计划提报详情',
            usingComponents: {
                'van-icon': '/components/vant/icon/index',
                'van-popup': '/components/vant/popup/index',
                'van-field': '/components/vant/field/index',
                'van-toast': '/components/vant/toast/index',
                'van-picker': '/components/vant/picker/index',
                'van-stepper': '/components/vant/stepper/index',
                'van-dialog': '/components/vant/dialog/index',
                'van-checkbox': '/components/vant/checkbox/index',
                'van-button': '/components/vant/button/index',
            },
        };
        _this.data = {
            stepperValue: 1,
            pageType: 'view',
            pageId: '',
            orderDetail: {},
        };
        _this.methods = {
            onShippedBqtyChg: function (evt) {
                var detail = evt.detail, index = evt.currentTarget.dataset.index;
                // bug:  触发两次
                if (typeof detail === 'undefined') {
                    return;
                }
                this.orderDetail.detailList[index].submitQuantity = detail;
            },
            onChange: function (evt) {
                var detail = evt.detail, _a = evt.currentTarget.dataset, index = _a.index, type = _a.type;
                this.orderDetail.detailList[index][type] = detail;
                this.$apply();
            },
            sava: function (status) {
                var _this = this;
                var detailList = [];
                this.orderDetail.detailList.forEach(function (item) {
                    item.itemMeters = item.itemMeters || 0;
                    item.itemLength = item.itemLength || 0;
                    item.itemWidth = item.itemWidth || 0;
                    var remark = item.remark || '';
                    if (item.unit == '米(M)') {
                        remark = remark + " {\u7C73\u6570" + item.itemMeters + "*\u6570\u91CF" + item.submitQuantity + "}";
                    }
                    if (item.unit == '平方米(M2)') {
                        remark = remark + " {\u957F" + item.itemLength + "*\u5BBD" + item.itemWidth + "*\u6570\u91CF" + item.submitQuantity + "}";
                    }
                    detailList.push({
                        id: item.id,
                        quantity: item.submitQuantity,
                        remark: remark
                    });
                });
                var data = {
                    id: this.orderDetail.taskId,
                    status: status,
                    detailList: detailList
                };
                request_1.request({
                    api: "pms/pmsApi/pmsShopPlanShopSubmit.nd",
                    method: 'POST',
                    data: data,
                    type: 'application/json',
                    callback: function (res) {
                        var data = res.data;
                        if (data.success) {
                            toast_1.default.success({
                                message: (status == '1' ? '提交' : '暂存') + "\u6210\u529F",
                                onClose: function () {
                                    wx.navigateBack({
                                        delta: 1,
                                    });
                                }
                            });
                        }
                        else {
                            toast_1.default.fail(data.msg);
                        }
                        _this.$apply();
                    }
                });
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    // 获取订单详细信息
    List.prototype.onLoad = function (_a) {
        var id = _a.id, _b = _a.orgId, orgId = _b === void 0 ? '' : _b, type = _a.type;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_c) {
                this.pageType = type;
                toast_1.default.loading({
                    message: '正在加载',
                    duration: 2000
                });
                data = {
                    id: id,
                };
                request_1.request({
                    api: "pms/pmsApi/pmsShopPlanShopPageQuery.nd",
                    method: 'POST',
                    data: data,
                    type: 'application/json',
                    callback: function (res) {
                        toast_1.default.clear();
                        var data = res.data.data;
                        _this.orderDetail = data[0];
                        _this.orderDetail.detailList = _this.orderDetail.detailList.map(function (res) {
                            res.itemLength = '0';
                            res.itemWidth = '0';
                            res.itemMeters = '0';
                            var oRemark = [];
                            var oNewRemark = res.remark;
                            // 编辑状态并且备注有值执行
                            if (res.remark && _this.pageType == 'handle') {
                                if (res.remark.indexOf(" ") > -1) {
                                    oRemark = res.remark.split(' ');
                                    if (oRemark[1]) {
                                        // 字符串中提取数字
                                        var numArr = oRemark[1].match(/\d+/g);
                                        if (res.unit == '米(M)') {
                                            res.itemMeters = numArr[0];
                                        }
                                        if (res.unit == '平方米(M2)') {
                                            res.itemLength = numArr[0];
                                            res.itemWidth = numArr[1];
                                        }
                                    }
                                    oNewRemark = oRemark[0];
                                }
                            }
                            res.remark = oNewRemark;
                            return res;
                        });
                        _this.$apply();
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return List;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(List , 'pages/terminal/threeProductsReportDetail/index'));

