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
var order_detail_1 = require('./../../../store/actions/order-detail.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var request_1 = require('./../../../utils/request.js');
var order_detail_2 = require('./../../../store/types/order-detail.js');
var orderCancel = /** @class */ (function (_super) {
    __extends(orderCancel, _super);
    function orderCancel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '订单取消',
            usingComponents: {
                'van-rate': '../../../components/vant/rate/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-picker': '../../../components/vant/picker/index',
                'van-search': '../../../components/vant/search/index',
                'van-tab': '../../../components/vant/tab/index',
                'van-row': '../../../components/vant/row/index',
                'van-col': '../../../components/vant/col/index',
                'van-tabs': '../../../components/vant/tabs/index',
                'van-radio': '../../../components/vant/radio/index',
                'van-radio-group': '../../../components/vant/radio-group/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-field': '../../../components/vant/field/index',
                'van-loading': '../../../components/vant/loading/index',
                'van-stepper': '../../../components/vant/stepper/index',
                'van-cell-group': '../../../components/vant/cell-group/index',
                'van-button': '../../../components/vant/button/index',
                'van-steps': '../../../components/vant/steps/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
                'van-dialog': '../../../../components/vant/dialog/index',
            },
        };
        _this.data = {
            orderpopup: false,
            baseUrl: request_1.baseUrl,
            id: '',
            ids: '',
            idsCancelNum: '',
            type: '',
            ly: '',
            orderCode: '',
            currentOrderId: '',
            popList: [],
            popTitle: '',
            display: false,
            popVisible: false,
            popFiledName: '',
            compareInfo: {},
            reasonVisible: false,
            cancel: {
                cancelReasonList: {
                    code: '',
                    name: '请选择'
                }
            },
            form: {
                reason: ''
            }
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 应该获取那个值给popList   应该对比那个字段为选中信息
            openChoose: function (propName, questionType, name) {
                var list = _this[propName].list;
                if (!list) {
                    list = _this.cancelReasonList[propName];
                }
                if (list.length === 0) {
                    return;
                }
                _this.popList = list;
                _this.compareInfo = _this.data.cancel[questionType];
                _this.popFiledName = questionType;
                _this.popTitle = name;
                _this.popVisible = true;
            },
            onClose: function () {
                _this.popVisible = false;
            },
            onChoose: function (_a) {
                var currentTarget = _a.currentTarget;
                var dataset = currentTarget.dataset;
                var index = dataset.index;
                var _b = _this.data, popFiledName = _b.popFiledName, popList = _b.popList;
                _this.data.cancel[popFiledName] = popList[index];
                _this.popVisible = false;
                //其他原因
                if (popList[index].code === '14963960682') {
                    _this.reasonVisible = true;
                }
                else {
                    _this.reasonVisible = false;
                }
            },
            onDescChange: function (_a) {
                var detail = _a.detail;
                this.form.reason = detail.value;
            },
            // 商品取消
            beSure: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var ly, reason, data, res, error_1, id;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                ly = this.ly;
                                reason = this.cancel.cancelReasonList.name;
                                //其他原因
                                if (this.cancel.cancelReasonList.code === '14963960682') {
                                    reason = this.form.reason;
                                }
                                if (!(ly === '1')) return [3 /*break*/, 5];
                                data = {};
                                data = {
                                    id: this.id,
                                    cancelReason: reason
                                };
                                if (this.orderdetail.orderHeader.productGroupFlag == 'Y') {
                                    data = {
                                        ids: this.ids,
                                        nums: this.idsCancelNum,
                                        cancelReason: reason
                                    };
                                }
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, request_1.request({ api: 'order/cancelLine.nd', method: 'POST', data: data })];
                            case 2:
                                res = _a.sent();
                                if (res) {
                                    toast_1.default.success({
                                        message: '取消成功',
                                        duration: 2000,
                                        onClose: function () {
                                            _this.orderpopup = !_this.orderpopup;
                                            _this.$apply();
                                            wx.navigateTo({
                                                url: "/pages/me/order/index"
                                            });
                                        },
                                    });
                                }
                                else {
                                    this.$apply();
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _a.sent();
                                toast_1.default.fail('取消失败失败');
                                return [3 /*break*/, 4];
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                //整单取消
                                toast_1.default.loading({
                                    message: '取消中...',
                                    forbidClick: true,
                                    duration: 0,
                                    zIndex: 9999999
                                });
                                id = this.orderCode;
                                request_1.request({ api: "order/cancelOrder.nd?orderCode=" + id + "&cancelReason=" + reason, callback: function (res) {
                                        toast_1.default.clear();
                                        if (res && res.data && res.data.code == '0') {
                                            toast_1.default.success('取消订单成功');
                                            wx.navigateTo({
                                                url: "/pages/me/order/index"
                                            });
                                        }
                                        else {
                                            toast_1.default.fail('取消订单失败');
                                        }
                                    } });
                                _a.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                });
            },
            start: function () {
                //其他原因
                if (_this.cancel.cancelReasonList.code === '14963960682') {
                    if (!_this.form.reason) {
                        toast_1.default.fail('请输入取消原因');
                        return;
                    }
                }
                if (_this.cancel.cancelReasonList.name === '请选择') {
                    toast_1.default.fail('请选择取消原因');
                    return;
                }
                //在评审通过、已安排生产、待排发货计划下，‘待发货’,‘发货中’ 取消时给出原有的提醒违约的提示
                /*let orderStatusCode = this.orderdetail.orderHeader.orderStatusCode;
                if(this.orderdetail.orderHeader.orderTypeCode == 'routine' && (orderStatusCode == 'ALREADYPLANPRODUCT' || orderStatusCode == 'ARRANGEDPRODUCT' || orderStatusCode == 'UNCHKED' || orderStatusCode== 'WAITDELIVER' || orderStatusCode== 'PARTCHECKED' )){
                  Dialog.confirm({
                    message: "取消‘评审通过’,‘已安排生产’,‘待排发货计划’,‘待发货’,‘发货中’状态的常规订单，会判定为商家违约，请确认是否取消？",
                  }).then(() => {
                    this.orderpopup = !this.orderpopup
                  }).catch(() => {
                    // on cancel
                  });
                }else{
                  this.orderpopup = !this.orderpopup
                }*/
                _this.orderpopup = !_this.orderpopup;
            },
            cancel: function () {
                _this.orderpopup = !_this.orderpopup;
            },
        };
        return _this;
    }
    orderCancel.prototype.onLoad = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var id, orderId, orderCode, ly, ids, type, idsCancelNum, idsArr_1, idsCancelNumArr_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wepy_redux_1.getStore().dispatch({ type: order_detail_2.RESET_ORDER_DETAIL, payload: [] });
                        id = e.id, orderId = e.orderId, orderCode = e.orderCode, ly = e.ly, ids = e.ids, type = e.type, idsCancelNum = e.idsCancelNum;
                        this.id = id;
                        this.ids = ids;
                        this.idsCancelNum = idsCancelNum;
                        this.type = type;
                        this.ly = ly;
                        this.orderCode = orderCode;
                        this.currentOrderId = orderId;
                        return [4 /*yield*/, this.methods.getOrderDetail({ _loading: true, id: this.currentOrderId })];
                    case 1:
                        _a.sent();
                        if (this.orderdetail.orderHeader.productGroupFlag == 'Y' && this.ids && this.idsCancelNum) {
                            idsArr_1 = this.ids.split(',');
                            idsCancelNumArr_1 = this.idsCancelNum.split(',');
                            this.orderdetail.orderLines.forEach(function (item, index) {
                                var child = [];
                                item.child.forEach(function (itm) {
                                    var oIndex = idsArr_1.indexOf(itm.id.toString());
                                    if (oIndex > -1) {
                                        itm.qty = idsCancelNumArr_1[oIndex];
                                        child.push(itm);
                                    }
                                });
                                _this.orderdetail.orderLines[index].child = child;
                            });
                        }
                        this.methods.getCancelReasonList();
                        return [2 /*return*/];
                }
            });
        });
    };
    orderCancel = __decorate([
        wepy_redux_1.connect({
            orderdetail: function (_a) {
                var orderdetail = _a.orderdetail;
                return orderdetail.orderdetail;
            },
            cancelReasonList: function (_a) {
                var orderdetail = _a.orderdetail;
                return orderdetail.cancelReasonList;
            },
        }, {
            getOrderDetail: order_detail_1.getOrderDetail,
            getCancelReasonList: order_detail_1.getCancelReasonList
        })
    ], orderCancel);
    return orderCancel;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(orderCancel , 'pages/me/order-cancel/index'));

