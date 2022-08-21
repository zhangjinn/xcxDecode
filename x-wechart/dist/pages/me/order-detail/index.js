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
var order_detail_1 = require('./../../../store/actions/order-detail.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var request_1 = require('./../../../utils/request.js');
var index_1 = require('./../../../utils/index.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var orderdetail = /** @class */ (function (_super) {
    __extends(orderdetail, _super);
    function orderdetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '订单详情',
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
                'van-checkbox': '../../../components/vant/checkbox/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
                "van-dialog": "/components/vant/dialog/index",
            },
        };
        _this.data = {
            stretchFlag: false,
            visible: false,
            orderpopup: false,
            id: '',
            viewmore: false,
            baseUrl: request_1.baseUrl,
            commentForm: {},
            commentVisible: false,
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            calendarVisible: false,
            currentOrderId: '',
            commentDetailVisible: false,
            commentDetail: {},
            psType: '',
            statusObj: { 'CUSTORDER': false, 'REVIEWCOMPLETED': false, 'WAITDELIVER': false, 'PARTCHECKED': false, 'CUSTSIGIN': false, 'CANCEL': false },
            isImg: false,
            ImgArr: [],
            isCheckedAll: false,
            checkedIds: [],
            dynamicMessage: {
                evaluateTip: '',
            },
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 组合购步进器加减赋值
            onCombinationPurchaseNumChange: function (e) {
                var _this = this;
                var _a = e.currentTarget.dataset, seriesindex = _a.seriesindex, itemindex = _a.itemindex;
                this.orderdetail.orderLines[seriesindex].child[itemindex].qty = Number(e.detail);
                this.orderdetail.orderLines.forEach(function (item, index) {
                    var totleBuyNum = 0; // 每组取消的购买总数
                    item.child.forEach(function (itm) {
                        if (itm.isChecked) {
                            totleBuyNum += itm.qty;
                        }
                    });
                    _this.orderdetail.orderLines[index].totleBuyNum = totleBuyNum;
                });
                this.orderdetail.isPurchaseStandard = index_1.checkCombinationPurchase(this.orderdetail.orderLines);
            },
            // 组合购单个产品选择
            onCheckOrder: function (idx1, idx2, val) {
                var _this = this;
                if (this.orderdetail.orderLines[idx1].child[idx2].canCancel == 'N') {
                    return;
                }
                this.orderdetail.orderLines[idx1].child[idx2].isChecked = !val;
                this.orderdetail.orderLines[idx1].child[idx2].qty = this.orderdetail.orderLines[idx1].child[idx2].maxQty;
                var checkedIds = [];
                var len = 0;
                this.orderdetail.orderLines.forEach(function (item, index) {
                    var totleBuyNum = 0; // 每组取消的购买总数
                    item.child.forEach(function (itm) {
                        len += 1;
                        if (itm.isChecked) {
                            checkedIds.push(itm.id);
                            totleBuyNum += itm.qty;
                        }
                    });
                    _this.orderdetail.orderLines[index].totleBuyNum = totleBuyNum;
                });
                this.checkedIds = checkedIds;
                this.isCheckedAll = false;
                if (checkedIds.length == len) {
                    this.isCheckedAll = true;
                }
                this.orderdetail.isPurchaseStandard = index_1.checkCombinationPurchase(this.orderdetail.orderLines);
            },
            // 组合购选择全部产品
            onCheckOrderAll: function (val) {
                var _this = this;
                this.isCheckedAll = !val;
                var checkedIds = [];
                this.orderdetail.orderLines.forEach(function (item, index) {
                    item.child.forEach(function (itm) {
                        if (itm.canCancel == 'Y') {
                            itm.isChecked = !val;
                            if (!itm.isChecked) {
                                itm.qty = itm.maxQty;
                            }
                            checkedIds.push(itm.id);
                        }
                    });
                });
                this.checkedIds = checkedIds;
                this.orderdetail.orderLines.forEach(function (item, index) {
                    var totleBuyNum = 0; // 每组取消的购买总数
                    item.child.forEach(function (itm) {
                        if (itm.isChecked) {
                            totleBuyNum += itm.qty;
                        }
                    });
                    _this.orderdetail.orderLines[index].totleBuyNum = totleBuyNum;
                });
                this.orderdetail.isPurchaseStandard = index_1.checkCombinationPurchase(this.orderdetail.orderLines);
            },
            // 组合购取消
            handleCancel: function () {
                var ids = [];
                var idsCancelNum = []; //选中的需要取消产品的取消数量
                this.orderdetail.orderLines.forEach(function (item, index) {
                    item.child.forEach(function (itm) {
                        if (itm.isChecked) {
                            ids.push(itm.id);
                            idsCancelNum.push(itm.qty);
                        }
                    });
                });
                var idsStr = ids.toString();
                var idsCancelNum = idsCancelNum.toString();
                //跳转到取消页面
                wx.navigateTo({
                    url: "/pages/me/order-cancel/index?ids=" + idsStr + "&idsCancelNum=" + idsCancelNum + "&orderId=" + this.currentOrderId + "&ly=1&type=90605"
                });
            },
            // 组合购点击取消，选择产品比例不满足条件时提示
            handleCancelNoClick: function () {
                wx.showModal({
                    title: '确认取消此订单？',
                    content: '组合购的商品购买比例按照下单中产品分组的总数量计算，请选择符合要求的商品进行取消订单',
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) { //这里是点击了确定以后
                            console.log('用户点击确定');
                        }
                    }
                });
            },
            // 回单影像
            receiptEffect: function (item) {
                var _this = this;
                var id = item.sapOrderCode;
                dmsrequest_1.dmsRequest({
                    data: {
                        'cisCode': wepy_1.default.$instance.globalData.cisCode,
                        'documentNum': id
                    },
                    method: 'toOmsView'
                }).then(function (res) {
                    if (res.data) {
                        _this.isImg = true;
                        _this.ImgArr = res.data;
                    }
                    else {
                        toast_1.default.fail('暂无回单影像');
                    }
                });
            },
            sapCancle: function (item) {
                dialog_1.default.confirm({
                    title: '提示',
                    message: "\u6B64\u7533\u8BF7\u5BA1\u6838\u901A\u8FC7\u540E\u5C06\u4F1A\u5F7B\u5E95\u53D6\u6D88\u8BA2\u5355\uFF0C\u662F\u5426\u786E\u8BA4\u53D1\u8D77\u53D6\u6D88\u7533\u8BF7?"
                }).then(function () {
                    var data = {
                        sapOrderCode: item.sapOrderCode
                    };
                    request_1.request({ api: 'order/cancelSapOrderFlowStart.nd', method: 'POST', data: data }).then(function (res) {
                        if (res.code == 0) {
                            toast_1.default.success({
                                message: '提交成功',
                                duration: 2000
                            });
                        }
                        else {
                            toast_1.default.fail(res.msg);
                        }
                    });
                });
            },
            onClose: function () {
                this.isImg = false;
            },
            stretchFlag: function () {
                _this.stretchFlag = !_this.stretchFlag;
            },
            viewmore: function () {
                _this.viewmore = !_this.viewmore;
            },
            // 动态选择
            chose: function (id) {
                _this.orderdetail.erpList.forEach(function (res) {
                    if (res.sapOrderCode == id) {
                        res.active = true;
                        _this.orderdetail.nowgoods = res;
                    }
                    else {
                        res.active = false;
                    }
                });
            },
            // 商品取消
            beSure: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var id, data, res, error_1;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                id = this.id;
                                data = { id: id };
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
                                            _this.methods.getOrderDetail({ id: _this.currentOrderId });
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
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            },
            start: function (e) {
                _this.id = e;
                //跳转到取消页面
                wx.navigateTo({
                    url: "/pages/me/order-cancel/index?id=" + e + "&orderId=" + _this.currentOrderId + "&ly=1"
                });
            },
            cancel: function () {
                _this.orderpopup = !_this.orderpopup;
            },
            orderfiltering: function () {
                _this.visible = !_this.visible;
            },
            onToggleComment: function (erpOrder) {
                var id = erpOrder.id, orderId = erpOrder.orderId, orgId = erpOrder.orgId;
                var form = { erpId: id, orderId: orderId, orgId: orgId, id: '' };
                this.commentForm = form;
                this.commentVisible = !this.commentVisible;
            },
            onChangeCommentLevel: function (e) {
                var _a;
                var name = e.target.dataset.name;
                this.commentForm = __assign({}, this.commentForm, (_a = {}, _a[name] = e.detail, _a));
            },
            onCommentContentChange: function (event) {
                this.commentForm = __assign({}, this.commentForm, { evaluationContent: event.detail });
            },
            onToggleCommentDetail: function (item) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, orderId, orgId, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                id = item.id, orderId = item.orderId, orgId = item.orgId;
                                if (!id) return [3 /*break*/, 2];
                                return [4 /*yield*/, request_1.request({ api: '/orderEvaluation/init.nd', method: 'POST', data: { erpId: id, orderId: orderId, orgId: orgId } })];
                            case 1:
                                result = _a.sent();
                                if (result.erpId) {
                                    this.commentDetailVisible = !this.commentDetailVisible;
                                    this.commentDetail = result.productEvaluate;
                                    this.$apply();
                                    return [2 /*return*/];
                                }
                                toast_1.default.fail('获取评价信息报错');
                                _a.label = 2;
                            case 2:
                                this.commentDetailVisible = !this.commentDetailVisible;
                                this.$apply();
                                return [2 /*return*/];
                        }
                    });
                });
            },
            onSubmitComment: function () {
                return __awaiter(this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request_1.request({ api: '/orderEvaluation/saveEvaluate.nd', method: 'POST', data: this.commentForm, })];
                            case 1:
                                result = _a.sent();
                                if (result === 'success') {
                                    toast_1.default.success('评价成功');
                                    this.commentVisible = !this.commentVisible;
                                    this.$apply();
                                    this.methods.getOrderDetail({ id: this.currentOrderId });
                                    return [2 /*return*/];
                                }
                                toast_1.default.fail(result);
                                return [2 /*return*/];
                        }
                    });
                });
            },
            openCalendar: function () {
                var _a = this.orderdetail, minDate = _a.minDate, maxDate = _a.maxDate;
                this.$wxpage.calendar.enableArea([minDate, maxDate]);
                this.calendarVisible = !this.calendarVisible;
            },
            closeCalendar: function () {
                this.calendarVisible = !this.calendarVisible;
            },
            chooseDay: function (evt) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, year, month, day, day, result;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = evt.detail, year = _a.year, month = _a.month, day = _a.day;
                                day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                                return [4 /*yield*/, request_1.request({ api: '/order/updateDate.nd', method: 'POST', data: { id: this.currentOrderId, startDate: day } })];
                            case 1:
                                result = _b.sent();
                                if (result === 'Y') {
                                    toast_1.default.success('修改成功');
                                }
                                else {
                                    toast_1.default.fail(result);
                                }
                                this.calendarVisible = !this.calendarVisible;
                                this.$apply();
                                this.methods.getOrderDetail({ _loading: true, id: this.currentOrderId });
                                return [2 /*return*/];
                        }
                    });
                });
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    orderdetail.prototype.onShow = function () {
        this.isCheckedAll = false;
        var evaluateTip = index_1.getAlertInfo('14246556242'); // 评价区域提示信息
        this.dynamicMessage.evaluateTip = evaluateTip;
        this.$apply();
    };
    orderdetail.prototype.onLoad = function (e) {
        var _this = this;
        var that = this;
        //商家下单->评审通过->待发货->发货中->客户签收
        this.statusObj = { 'CUSTORDER': false, 'REVIEWCOMPLETED': false, 'WAITDELIVER': false, 'PARTCHECKED': false, 'CUSTSIGIN': false, 'CANCEL': false };
        var id = e.id;
        this.currentOrderId = id;
        this.methods.getOrderDetail({ _loading: true, id: this.currentOrderId }).then(function () {
            _this.methods.queryCisOrderStatusInfoMobile({ orderCode: that.orderdetail.orderHeader.orderCode }).then(function (res) {
                if (res.payload.orderStatuInfo && res.payload.orderStatuInfo.length > 0) {
                    for (var _i = 0, _a = res.payload.orderStatuInfo; _i < _a.length; _i++) {
                        var item = _a[_i];
                        for (var statusItem in that.statusObj) {
                            if (statusItem == item.id) {
                                if (statusItem == 'REVIEWCOMPLETED') {
                                    that.psType = item.type;
                                    that.$apply();
                                }
                                that.statusObj[statusItem] = true;
                                that.$apply();
                            }
                        }
                    }
                }
            });
        });
    };
    orderdetail = __decorate([
        wepy_redux_1.connect({
            orderdetail: function (_a) {
                var orderdetail = _a.orderdetail;
                return orderdetail.orderdetail;
            },
        }, {
            getOrderDetail: order_detail_1.getOrderDetail,
            queryCisOrderStatusInfoMobile: order_detail_1.queryCisOrderStatusInfoMobile
        })
    ], orderdetail);
    return orderdetail;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(orderdetail , 'pages/me/order-detail/index'));

