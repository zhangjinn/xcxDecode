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
            navigationBarTitleText: '终端巡查',
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
                'van-popup': '../../../components/vant/popup/index'
            }
        };
        _this.data = {
            showSing: false,
            context: null,
            optionsTemp: null,
            list: [],
            checkResult: 'F',
            hasDraw: false,
        };
        _this.methods = {
            changeType: function (index, indexChild) {
                _this.list[index]['listStandar'][indexChild]['checkResult'] = _this.list[index]['listStandar'][indexChild]['checkResult'] == 'F' ? "T" : "F";
                _this.checkResult = "T";
                _this.list.forEach(function (it) {
                    it.listStandar.forEach(function (item) {
                        if (item.checkResult == 'F') {
                            _this.checkResult = "F";
                        }
                    });
                });
                _this.$apply();
            },
            onClose: function (e) {
                if (e.target.dataset.type == 'close') {
                    _this.showSing = false;
                }
            },
            getData: function () {
                var data = {
                    'storeType': _this.optionsTemp.isSpecialShop != 0 ? '1' : '2'
                };
                _this.methods.findShowList(data).then(function (res) {
                    var list = res.payload.returnData || [];
                    list.forEach(function (it) {
                        it.listStandar.forEach(function (item) {
                            item.checkResult = 'F';
                        });
                    });
                    _this.list = list;
                    _this.$apply();
                });
            },
            nextStep: function () {
                _this.showSing = true;
                setTimeout(function () {
                    var context = wx.createCanvasContext('firstCanvas');
                    context.setFillStyle('#fff');
                    context.fillRect(0, 0, 500, 150);
                    _this.data.context = context;
                    context.draw();
                }, 1000);
            },
            bindtouchstart: function (e) {
                this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
            },
            /**
             * 记录移动点，刷新绘制
             * @param {*} e
             */
            bindtouchmove: function (e) {
                this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
                this.data.context.stroke();
                this.data.context.draw(true);
                this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
                this.hasDraw = true;
            },
            clear: function () {
                this.data.context.draw();
                this.data.context.setFillStyle('#fff');
                this.data.context.fillRect(0, 0, 500, 150);
                this.hasDraw = false;
            },
            submit: function () {
                var listDetail = [];
                _this.list.forEach(function (it) {
                    it.listStandar.forEach(function (item) {
                        listDetail.push({
                            "checkResult": item.checkResult,
                            "standardId": item.id
                        });
                    });
                });
                var data = {
                    "handwrittenId": _this.handwrittenId,
                    "dealerCode": wepy_1.default.$instance.globalData.cisCode,
                    "listDetail": listDetail,
                    "storeName": _this.optionsTemp.storeName,
                    "checkResult": _this.checkResult,
                    "storeCode": _this.optionsTemp.shopCisCode
                };
                wx.showLoading();
                _this.methods.saveStoreCheckResult(data).then(function (res) {
                    if (res.payload.returnCode == 100) {
                        wx.showToast({
                            title: '提交成功！',
                            icon: 'none'
                        });
                        var id = res.payload.returnData.id;
                        wx.hideLoading();
                        if (_this.checkResult == "F") {
                            wx.navigateTo({ url: '/pages/terminal/problemTrans/index?id=' + id });
                        }
                        else {
                            var pages = getCurrentPages();
                            // var currPage = pages[pages.length - 1];   //当前页面
                            var prevPage = pages[pages.length - 2];
                            prevPage.data.optionsTemp.isCheck = true;
                            wx.navigateBack({
                                delta: 1,
                            });
                        }
                    }
                    else {
                    }
                });
            },
            exportImg: function () {
                if (!this.hasDraw) {
                    wx.showToast({
                        title: '请先签字！',
                        icon: 'none'
                    });
                    return;
                }
                var that = this;
                that.data.context.draw(true, wx.canvasToTempFilePath({
                    fileType: 'jpg',
                    canvasId: 'firstCanvas',
                    success: function (res) {
                        var tempFilePath = res.tempFilePath;
                        wx.getFileSystemManager().readFile({
                            filePath: tempFilePath,
                            encoding: 'base64',
                            success: function (res) {
                                var base64 = 'data:image/png;base64,' + res.data;
                                var data = {
                                    fileModuleName: 'publicPictures',
                                    file: base64
                                };
                                that.methods.upload2Img(data).then(function (res) {
                                    that.handwrittenId = res.payload.returnData.id;
                                    that.methods.submit();
                                });
                            },
                            fail: function (err) {
                                // console.log('获取图片失败')
                            }
                        });
                    },
                    fail: function () {
                        wx.showToast({
                            title: '导出失败',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                }));
            }
        };
        return _this;
    }
    WebViewPage.prototype.onLoad = function (options) {
        this.optionsTemp = JSON.parse(JSON.stringify(options));
        this.methods.getData();
    };
    WebViewPage = __decorate([
        wepy_redux_1.connect({}, {
            findShowList: record_1.findShowList,
            saveStoreCheckResult: record_1.saveStoreCheckResult,
            upload2Img: record_1.upload2Img
        })
    ], WebViewPage);
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/terminal/point/index'));

