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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var notice_1 = require('./../../../../store/actions/notice.js');
var _a = wepy_1.default.$appConfig, baseUrl = _a.baseUrl, imgUrl = _a.imgUrl;
var NoticeDetail = /** @class */ (function (_super) {
    __extends(NoticeDetail, _super);
    function NoticeDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '公告详情',
            usingComponents: {
                'parser': '../../../../lib/parser/index',
            }
        };
        _this.data = {
            id: 0
        };
        _this.methods = {
            // 判断是否有下载文件路径
            accessSync: function () {
                var rootPath = wx.env.USER_DATA_PATH;
                var cachePath = rootPath + "/cache";
                return new Promise(function (resolve, reject) {
                    var fm = wx.getFileSystemManager();
                    try {
                        fm.accessSync(cachePath);
                        resolve();
                    }
                    catch (err) {
                        resolve(err);
                    }
                });
            },
            // 下载文件
            upload: function (item) {
                var rootPath = wx.env.USER_DATA_PATH;
                var cachePath = rootPath + "/cache";
                // 同步函数流程
                _this.methods.accessSync().then(function (err) {
                    if (err) {
                        return new Promise(function (resolve, reject) {
                            var fm = wx.getFileSystemManager();
                            try {
                                fm.mkdirSync(cachePath, true);
                                resolve();
                            }
                            catch (err) {
                                resolve(err);
                            }
                        });
                    }
                }).then(function (err) {
                    if (!err) {
                        var fileUrl = imgUrl + '/notice/' + item.filePath[0];
                        wx.showLoading({
                            title: '加载中...',
                        });
                        wx.downloadFile({
                            url: fileUrl,
                            // filePath: cachePath,
                            success: function (res) {
                                var tempFilePath = res.tempFilePath;
                                var savedFilePath = res.savedFilePath;
                                wx.hideLoading();
                                wx.showToast({
                                    title: '下载成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                                wx.saveFile({
                                    tempFilePath: tempFilePath,
                                    success: function (res) {
                                        var savedFilePath = res.savedFilePath;
                                        // 打开文件
                                        wx.showLoading({
                                            title: '加载中...',
                                        });
                                        wx.openDocument({
                                            filePath: savedFilePath,
                                            success: function (res) {
                                                wx.hideLoading();
                                                console.log('打开文档成功');
                                            },
                                        });
                                    },
                                    fail: function (err) {
                                        console.log('保存失败：', err);
                                    }
                                });
                            },
                            fail: function (err) {
                                wx.showToast({
                                    title: '下载失败',
                                    icon: 'none',
                                    duration: 2000
                                });
                            }
                        });
                    }
                });
            }
        };
        return _this;
    }
    NoticeDetail.prototype.onLoad = function (_a) {
        var id = _a.id;
        this.id = id;
        this.methods.getNoticeDetail(id);
    };
    NoticeDetail = __decorate([
        wepy_redux_1.connect({
            billboardMessage: function (_a) {
                var notice = _a.notice;
                return notice.detail.billboardMessage;
            }
        }, {
            getNoticeDetail: notice_1.getNoticeDetail
        })
    ], NoticeDetail);
    return NoticeDetail;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(NoticeDetail , 'pages/me/notice/detail/index'));

