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
var consultation_1 = require('./../../../../store/actions/consultation.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var validators_1 = require('./../../../../utils/validators.js');
var ProblemList = /** @class */ (function (_super) {
    __extends(ProblemList, _super);
    function ProblemList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '我的问题',
            usingComponents: {
                'van-rate': '../../../../components/vant/rate/index',
                'van-field': '../../../../components/vant/field/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-toast': '../../../../components/vant/toast/index',
            },
        };
        _this.data = {
            addquestion: '',
            popVisible: false,
            form: {
                score: 5,
                feel: '',
                id: '',
            },
            issub: false,
            closedisable: true
        };
        _this.methods = {
            onChangeRate: function (e) {
                var detail = e.detail;
                switch (detail) {
                    case 5:
                        this.consultdetail.ratetext = '非常好';
                        break;
                    case 4:
                        this.consultdetail.ratetext = '好';
                        break;
                    case 3:
                        this.consultdetail.ratetext = '一般';
                        break;
                    case 2:
                        this.consultdetail.ratetext = '差';
                        break;
                    case 1:
                        this.consultdetail.ratetext = '非常差';
                        break;
                }
                this.form.score = detail;
            },
            addQuestion: function () {
                _this.popVisible = true;
            },
            onClose: function () {
                _this.popVisible = false;
            },
            onFeelChange: function (e) {
                var detail = e.detail;
                if (detail) {
                    _this.closedisable = false;
                }
                else {
                    _this.closedisable = true;
                }
                _this.form.feel = detail;
            },
            onAddQuestionChange: function (e) {
                var detail = e.detail;
                _this.addquestion = detail;
            },
            onQuestionClose: function () {
                if (!_this.form.feel) {
                    toast_1.default.fail('请填写您的感想~');
                    return;
                }
                toast_1.default.loading({
                    message: '提交中....',
                    duration: 0,
                });
                _this.methods.closeConsult(_this.form).then(function (res) {
                    if (res.payload == "success") {
                        toast_1.default.success('提交成功');
                        setTimeout(function () {
                            _this.methods.getConsultDetail(_this.form.id);
                        }, 2000);
                    }
                    else {
                        toast_1.default.fail(res.payload || '提交失败');
                    }
                });
            },
            onSubmit: function () {
                if (!_this.addquestion) {
                    toast_1.default.fail('请填写您的追问~');
                    return;
                }
                toast_1.default.loading({
                    message: '提交中....',
                    duration: 0,
                });
                if (!_this.issub) {
                    _this.issub = true; //避免重复提交
                    _this.methods.goAsk({ questionId: _this.form.id, content: _this.addquestion }).then(function (res) {
                        _this.issub = false;
                        if (res.payload == "success") {
                            toast_1.default.success('提交成功');
                            _this.popVisible = false;
                            _this.addquestion = '';
                            setTimeout(function () {
                                _this.methods.getConsultDetail(_this.form.id);
                            }, 2000);
                        }
                        else {
                            toast_1.default.fail(res.payload || '提交失败');
                        }
                    });
                }
            },
            downloadImg: function (e) {
                var flag = validators_1.isAssetTypeAnImage(e);
                if (flag) {
                    var imgs = new Array();
                    imgs.push(e);
                    wx.previewImage({
                        current: e,
                        urls: imgs,
                        fail: function () {
                            wx.showToast({ title: '预览图片失败', icon: 'none' });
                        }
                    });
                }
                else {
                    wx.downloadFile({
                        url: e,
                        success: function (res) {
                            wx.saveImageToPhotosAlbum({
                                filePath: res.tempFilePath,
                                success: function (res) {
                                    wx.showToast({
                                        title: '保存成功',
                                        icon: 'success',
                                        duration: 2000
                                    });
                                },
                                fail: function (err) {
                                    if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                                        wx.openSetting({
                                            success: function (settingdata) {
                                                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。');
                                                }
                                                else {
                                                    console.log('获取权限失败，给出不给权限就无法正常使用的提示');
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            },
        };
        return _this;
    }
    ProblemList.prototype.onLoad = function (e) {
        var id = e.id;
        this.form.id = id;
        toast_1.default.loading({
            message: '正在加载',
            duration: 0
        });
        this.methods.getConsultDetail(id).then(function () {
            toast_1.default.clear();
        });
    };
    ProblemList = __decorate([
        wepy_redux_1.connect({
            consultdetail: function (_a) {
                var consultation = _a.consultation;
                return consultation.consultdetail;
            }
        }, {
            getConsultDetail: consultation_1.getConsultDetail,
            closeConsult: consultation_1.closeConsult,
            goAsk: consultation_1.goAsk
        })
    ], ProblemList);
    return ProblemList;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(ProblemList , 'pages/me/my-consultation/detail/index'));

