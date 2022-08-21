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
var record_1 = require('./../../../store/actions/record.js');
var WebViewPage = /** @class */ (function (_super) {
    __extends(WebViewPage, _super);
    function WebViewPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '问题转办',
            navigationBarBackgroundColor: '#00aaa7',
            navigationBarTextStyle: 'white',
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-field': '../../../components/vant/field/index',
                'van-button': '../../../components/vant/button/index',
                'van-action-sheet': '../../../components/vant/action-sheet/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-uploader': '../../../components/vant/uploader/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-cell': '../../../components/vant/cell/index',
                'van-checkbox': '../../../components/vant/checkbox/index'
            }
        };
        _this.data = {
            imgObj: {
                'pointPass': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518758_3eacfdc1c5064a02b97d30ee91ceb680.png',
                'pointUnpass': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529826_e5716a140bad48a095da690b9b3709fd.png',
            },
            optionsTemp: {},
            showSing: false,
            name: '',
            detail: {},
            problemTypeListVisible: false,
            proType: '',
            proContent: '',
            problemTypeList: [
                { value: '人员', text: '人员' },
                { value: '货源', text: '货源' },
                { value: '产品', text: '产品' },
                { value: '资源', text: '资源' },
                { value: '渠道', text: '渠道' },
                { value: '促销推广', text: '促销推广' },
                { value: '其他', text: '其他' }
            ],
            duty: {
                dutyUserCode: '',
                dutyUserName: ''
            }
        };
        _this.methods = {
            //跳转责任人
            gotoPeople: function (index) {
                wx.navigateTo({ url: '/pages/terminal/people/index?storeCode=' + _this.detail.storeCode + '&selProblemIndex=-1' });
            },
            // 打开弹框
            openTypeList: function () {
                _this.problemTypeListVisible = true;
            },
            // 关闭弹框
            onCloseTypeList: function (dateType) {
                _this.problemTypeListVisible = false;
            },
            onDescriptionChange: function (event) {
                this.proContent = event.detail;
            },
            //选择问题类型（确认）
            onSelProblemType: function (item) {
                _this.proType = item.value;
                _this.methods.onCloseTypeList();
            },
            back: function () {
                wx.navigateBack({
                    delta: 2
                });
            },
            submit: function () {
                if (!_this.proType) {
                    wx.showToast({
                        title: '请选择问题分类！',
                        icon: 'none'
                    });
                    return;
                }
                if (!_this.duty.dutyUserName) {
                    wx.showToast({
                        title: '请选择责任人！',
                        icon: 'none'
                    });
                    return;
                }
                var data = {
                    'resultId': _this.optionsTemp.id,
                    'proType': _this.proType,
                    'proContent': _this.proContent,
                    'dutyUserCode': _this.duty.dutyUserCode || 'none',
                    'dutyUserName': _this.duty.dutyUserName
                };
                wx.showLoading();
                _this.methods.saveStoreProComplaint(data).then(function (res) {
                    if (res.payload.returnCode == 100) {
                        var data_1 = {
                            ctsId: _this.optionsTemp.id,
                            account: _this.duty.dutyUserCode || 'none',
                            shopId: _this.detail.storeCode,
                        };
                        // 发送通知
                        _this.methods.custSophDeletage(data_1).then(function (res) {
                            wx.showToast({
                                title: '提交成功！',
                                icon: 'none'
                            });
                            var pages = getCurrentPages();
                            // var currPage = pages[pages.length - 1];   //当前页面
                            var prevPage = pages[pages.length - 3];
                            prevPage.data.optionsTemp.isCheck = true;
                            setTimeout(function () {
                                wx.navigateBack({
                                    delta: 2
                                });
                            }, 1000);
                            wx.hideLoading();
                        });
                    }
                    else {
                        wx.showToast({
                            title: res.payload.returnMsg,
                            icon: 'none'
                        });
                    }
                }).finally(function () {
                    wx.hideLoading();
                });
            }
        };
        return _this;
    }
    WebViewPage.prototype.onLoad = function (options) {
        var _this = this;
        this.methods.getStoryPersons(); //businessFlag:1,传1时为业务员
        this.optionsTemp = JSON.parse(JSON.stringify(options));
        this.methods.findNoPassList({ id: options.id }).then(function (res) {
            _this.detail = res.payload.returnData;
            _this.detail.listStandard = _this.detail.listStandard || [];
            _this.$apply();
        });
    };
    WebViewPage = __decorate([
        wepy_redux_1.connect({
            adminAccount: function (_a) {
                var record = _a.record;
                return record.adminAccount;
            }
        }, {
            findNoPassList: record_1.findNoPassList,
            saveStoreProComplaint: record_1.saveStoreProComplaint,
            custSophDeletage: record_1.custSophDeletage,
            getStoryPersons: record_1.getStoryPersons
        })
    ], WebViewPage);
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/terminal/problemTrans/index'));

