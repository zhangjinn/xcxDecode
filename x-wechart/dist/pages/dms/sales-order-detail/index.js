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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var salesorderdetail_1 = require('./../../../store/actions/salesorderdetail.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var dmsrequest_1 = require('./../../../store/actions/dmsrequest.js');
var toast_2 = require('./../../../components/vant/toast/toast.js');
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
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
            },
        };
        _this.data = {
            visible: false,
            orderpopup: false,
            id: '',
            showMore: false,
            isBillsShow: false,
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
            outActiveIdx: 0,
            active: 0,
            isImg: false,
            ImgArr: [],
            showCanselExamle: false,
            ExamineId: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            downFile: function (e) {
                var path = e.currentTarget.dataset.path;
                toast_2.default.loading({ forbidClick: true, message: '文件下载中...', duration: 0 });
                var _a = _this.$parent.globalData, sessionId = _a.sessionId, modifySession = _a.modifySession;
                wx.downloadFile({
                    url: path,
                    header: {
                        Cookie: "JSESSIONID=" + (sessionId || modifySession) + ";",
                    },
                    complete: function () {
                        toast_2.default.clear();
                    },
                    success: function (res) {
                        if (res.statusCode == 200) {
                            var imageFilePath = res.tempFilePath;
                            wx.saveImageToPhotosAlbum({
                                filePath: imageFilePath,
                                success: function () {
                                    toast_2.default.success('保存成功');
                                },
                                fail: function (err) {
                                    if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                                        // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                                        wx.showModal({
                                            title: '提示',
                                            content: '需要您授权保存相册',
                                            showCancel: false,
                                            success: function (modalSuccess) {
                                                wx.openSetting({
                                                    success: function (settingdata) {
                                                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                                            toast_2.default.success('获取权限成功,再次点击图片即可保存');
                                                        }
                                                        else {
                                                            toast_2.default.success('获取权限失败，将无法保存到相册哦~');
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        toast_2.default.fail('保存失败');
                                    }
                                }
                            });
                        }
                        else {
                            toast_2.default.fail('文件下载失败, 请重试');
                        }
                    },
                });
            },
            // 取消物流弹窗
            cancelExamine: function () {
                _this.showCanselExamle = false;
            },
            // 打开取消物流弹框
            ordercanselExamine: function (item) {
                // console.log('item',item,item.data.outBoundItem[0].stvId);
                _this.ExamineId = item.data.outBoundItem[0].stvId;
                _this.showCanselExamle = true;
                _this.$apply();
            },
            // TODO:取消审核接口对接
            canselExamine: function () {
                _this.showCanselExamle = false;
                var id = _this.ExamineId;
                var account = wepy_1.default.$instance.globalData.account;
                _this.methods.canselOms({
                    _loading: true,
                    userAccount: account,
                    stvId: id
                }).then(function (res) {
                    if (res && res.payload && res.payload.code == '0') {
                        toast_1.default.success('取消物流成功');
                        _this.methods.getSalesOrderDetail({ salesOrderId: _this.currentOrderId });
                    }
                });
            },
            // 回单影像
            receiptEffect: function (item) {
                var _this = this;
                var id = item.documentNum;
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
            onClose: function () {
                this.isImg = false;
            },
            showMore: function () {
                _this.showMore = true;
            },
            hiddenMore: function () {
                _this.showMore = false;
            },
            isBillsShowFun: function () {
                this.isBillsShow = !this.isBillsShow;
            },
            // 动态选择
            outActiveShowFun: function (idx) {
                console.log(idx);
                this.outActiveIdx = idx;
                console.log(this.outActiveIdx);
            },
            foramtLogix: function (logic) {
                // debugger
                return logic.map(function (it) {
                    // {orderStatusName: "单据在途", vehicleNo: "", carrierName: "江苏苏宁物流有限公司", reserveTime: "2020-10-28 18:00:00",…}
                    // carrierCode: "D731-02"
                    // carrierName: "江苏苏宁物流有限公司"
                    // dispatchCode: "M20102800013"
                    // driverName: "李晓瞒"
                    // driverPhone: "17318989712"
                    // orderCode: "DC20113832010280001"
                    // orderStatus: "ORDER_ONROAD"
                    // orderStatusName: "单据在途"
                    // reserveTime: "2020-10-28 18:00:00"
                    // reservetimeRemarks: ""
                    // vehicleNo: ""
                    return {
                        text: "[" + it.orderStatusName + "] " + it.carrierName,
                        desc: it.reserveTime
                    };
                });
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    orderdetail.prototype.onLoad = function (e) {
        var id = e.id;
        this.currentOrderId = id;
        this.methods.getSalesOrderDetail({ salesOrderId: this.currentOrderId });
    };
    orderdetail = __decorate([
        wepy_redux_1.connect({
            orderdetail: function (_a) {
                var salesorderdetail = _a.salesorderdetail;
                return salesorderdetail.orderdetail;
            },
        }, {
            getSalesOrderDetail: salesorderdetail_1.getSalesOrderDetail,
            canselOms: salesorderdetail_1.canselOms
        })
    ], orderdetail);
    return orderdetail;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(orderdetail , 'pages/dms/sales-order-detail/index'));

