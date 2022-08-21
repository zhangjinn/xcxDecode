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
            navigationBarTitleText: '整改通知',
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
            camera: ['camera'],
            imgList: [],
            showSing: false,
            name: '',
            detail: {},
            optionsTemp: {},
            planConent: '',
            imgObj: {
                'pointPass': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518758_3eacfdc1c5064a02b97d30ee91ceb680.png',
                'pointUnpass': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529826_e5716a140bad48a095da690b9b3709fd.png',
            }
        };
        _this.methods = {
            onDescriptionChange: function (event) {
                this.planConent = event.detail;
            },
            back: function () {
                wx.navigateBack({
                    delta: 1
                });
            },
            submit: function () {
                if (_this.imgList.length < 1) {
                    wx.showToast({
                        title: '请上传整改方案图片！',
                        icon: 'none'
                    });
                    return;
                }
                if (!_this.planConent) {
                    wx.showToast({
                        title: '请录入整改方案！',
                        icon: 'none'
                    });
                    return;
                }
                var data = {
                    'resultId': _this.optionsTemp.resultId,
                    'planConent': _this.planConent,
                    'imgList': _this.imgList
                };
                wx.showLoading();
                _this.methods.saveStoreProPlan(data).then(function (res) {
                    if (res.payload.returnCode == 100) {
                        var data_1 = {
                            ctsId: _this.optionsTemp.resultId
                        };
                        _this.methods.updateDelegate(data_1).then(function (res) {
                            wx.showToast({
                                title: '提交成功！',
                                icon: 'none'
                            });
                            setTimeout(function () {
                                wx.navigateBack({
                                    delta: 1
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
            },
            //删除图片
            deleteImg: function (event) {
                var imgList;
                imgList = this.doorImgs.splice(event.detail.index, 1);
                this.setData({ imgList: imgList });
            },
            //上传图片
            afterRead: function (event) {
                this.selImg(event.detail.file.path, event.currentTarget.dataset.state);
            }
        };
        return _this;
    }
    //选择照片
    WebViewPage.prototype.selImg = function (path, state) {
        var that = this;
        var FSM = wx.getFileSystemManager();
        var obj = {};
        FSM.readFile({
            filePath: path,
            encoding: 'base64',
            success: function (res) {
                var data = {
                    'serviceCode': 'uploadXtw',
                    'fileModuleName': 'publicPictures',
                    'file': 'image/jpeg;base64,' + res.data
                };
                that.methods.upload2Img(data).then(function (res2) {
                    obj.imgName = res2.payload.returnData.id;
                    obj.urlId = res2.payload.returnData.id;
                    obj.url = res2.payload.returnData.fileMapperPath;
                    var imgList = that.imgList;
                    imgList.push(obj);
                    that.imgList = imgList;
                    that.setData({ imgList: imgList });
                });
            }
        });
    };
    WebViewPage.prototype.onLoad = function (options) {
        var _this = this;
        this.optionsTemp = JSON.parse(JSON.stringify(options));
        this.$apply();
        this.methods.findNoPassList({ id: options.resultId }).then(function (res) {
            _this.detail = res.payload.returnData;
            _this.detail.listStandard = _this.detail.listStandard || [];
            _this.$apply();
        });
    };
    WebViewPage = __decorate([
        wepy_redux_1.connect({}, {
            saveStoreProPlan: record_1.saveStoreProPlan, findNoPassList: record_1.findNoPassList, updateDelegate: record_1.updateDelegate, upload2Img: record_1.upload2Img
        })
    ], WebViewPage);
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/terminal/fixNotify/index'));

