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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var service_comment_1 = require('./../../../store/actions/service-comment.js');
var index_1 = require('./../../../utils/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
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
                'van-slider': '../../../components/vant/slider/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
            },
        };
        _this.data = {
            visible: false,
            scrollTop: 0,
            account: wepy_1.default.$instance.globalData.account,
            filterForm: {
                q1: 0,
                q2: 0,
                q3: 0,
                q4: 0,
                q5: 0,
                q6: 0,
            },
            currentStep: [0, 5, 10, 15, 20],
            currentStep2: [0, 5, 10],
            questionIndex: ['一', '二', '三', '四', '五', '六'],
            isEdit: true,
            serviceInfo: {},
            questionList: [],
            scoreList: []
        };
        // 页面内交互写在methods里
        _this.methods = {
            onDrag: function (index, event) {
                _this.currentValue = event.detail;
                _this.filterForm['q' + (index + 1)] = event.detail / (100 / _this.scoreList[index].maxScore);
            },
            textChange: function (_a) {
                var detail = _a.detail;
                _this.filterForm.q7 = detail.value;
            },
            submitInfo: function () {
                wx.showLoading({
                    title: '提交中',
                });
                var time = index_1.formatDate(Date.parse(new Date()));
                _this.filterForm.submittime = time;
                var data = { jsonParam: JSON.stringify(_this.filterForm) };
                service_comment_1.getExamSubmit(data, function (res) {
                    wx.hideLoading();
                    if (res.data == 'success') {
                        wx.showToast({
                            title: '提交成功',
                            icon: 'none',
                            duration: 2000,
                        });
                        _this.isEdit = true;
                        setTimeout(function () {
                            wx.navigateBack();
                        }, 3000);
                    }
                    else {
                        wx.showToast({
                            title: '提交失败',
                            icon: 'none',
                            duration: 2000,
                        });
                    }
                });
            }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Filter.prototype.getParenthesesStr = function (text) {
        var abb = text.match(/\((.+)\)/g);
        // 运行结果如下:
        return RegExp.$1;
    };
    ;
    Filter.prototype.onShow = function () { };
    ;
    Filter.prototype.onLoad = function (options) {
        var _this = this;
        var info = options.info, list = options.list;
        var serviceInfo = JSON.parse(info);
        var questionList = JSON.parse(list);
        this.serviceInfo = serviceInfo;
        this.questionList = questionList;
        wx.setNavigationBarTitle({
            title: serviceInfo.serverName
        });
        var resquest = questionList.map(function (item, index) {
            var indexInt = index + 1;
            if (item.titleType == 'score') {
                return {
                    name: item.titleName,
                    maxScore: _this.getParenthesesStr(item.titleName),
                    score: serviceInfo.sourceData ? serviceInfo.sourceData['q' + indexInt] * (100 / _this.getParenthesesStr(item.titleName)) : 0,
                    step: 100 / _this.getParenthesesStr(item.titleName)
                };
            }
        });
        questionList.forEach(function (item, index) {
            var indexInt = index + 1;
            if (item.titleType == 'score') {
                _this.filterForm['q' + (index + 1)] = serviceInfo.sourceData ? serviceInfo.sourceData['q' + indexInt] : 0;
            }
        });
        this.filterForm = __assign({}, this.filterForm, { activity: questionList[0].qid, sojumpparm: serviceInfo.enterpriseCis, q7: serviceInfo.sourceData ? serviceInfo.sourceData.q7 : '' });
        this.scoreList = resquest;
        this.isEdit = serviceInfo.scoreArray ? true : false;
    };
    Filter = __decorate([
        wepy_redux_1.connect()
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/service-comment-detail/index'));

