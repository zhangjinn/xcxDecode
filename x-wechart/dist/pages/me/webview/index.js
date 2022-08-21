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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var index_1 = require('./../../../utils/index.js');
var common_1 = require('./../../../mixins/common.js');
var WebViewPage = /** @class */ (function (_super) {
    __extends(WebViewPage, _super);
    function WebViewPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '',
            usingComponents: {
                'no-permission': '/components/no-permission/index',
            },
        };
        _this.data = {
            url: '',
            postName: '',
            login: false,
            questionId: '',
        };
        _this.mixins = [common_1.default];
        return _this;
    }
    // 调研问卷扫二维码进来参数获取
    WebViewPage.prototype.getQueryParams = function (queryString) {
        // 微信扫码得到的内容进行了一次编码，所以官方要求需要进行decodeURIComponent一次
        if (!queryString) {
            return;
        }
        queryString = decodeURIComponent(queryString);
        var params = {};
        if (queryString) {
            // 参数为最后一个斜杠后的参数
            var queryArray = queryString.split('/');
            if (queryArray.length > 1) {
                var query = queryArray[queryArray.length - 1];
                Object.assign(params, { questionId: decodeURI(query) });
            }
        }
        return params;
    };
    // 修改调研问卷URL
    WebViewPage.prototype.changeUrl = function () {
        var questionId = this.questionId;
        var account = wepy_1.default.$instance.globalData.account;
        var url = wepy_1.default.$appConfig.baseUrl + "/questionnaire/answer?questionId=" + questionId + "&account=" + account + "&source=XCX";
        // 将路径里的第一个/和第二个/之间的内容替换成#
        url = index_1.modifyUrl(url);
        return url;
    };
    // 动态修改顶部标题
    WebViewPage.prototype.dynamicStateTitle = function () {
        if (this.questionId) {
            this.postName = '调研问卷答题列表';
        }
        else {
            this.postName = '电子签约';
        }
        wx.setNavigationBarTitle({
            title: this.postName
        });
    };
    WebViewPage.prototype.onLoad = function (options) {
        var query = options.q; // 获取到二维码原始链接内容
        var params = this.getQueryParams(query);
        var questionId = params && params.questionId;
        this.questionId = questionId;
        if (!this.isLogin()) { // 未登录
            this.login = false;
            var surveyInfo = {
                questionId: this.questionId
            };
            index_1.setStorage('survey_info', JSON.stringify(surveyInfo));
        }
        else { // 已登录
            this.login = true;
            var surveyInfo = wx.getStorageSync('survey_info');
            if (surveyInfo) { // 登录之后再次跳转到该页面, 获取本地存储调研问卷信息，访问调研问卷
                var result = JSON.parse(surveyInfo);
                if (result && result.questionId) {
                    this.questionId = result.questionId;
                    this.url = this.changeUrl();
                    index_1.removeStorage('survey_info');
                }
            }
            else { // 登录之后直接跳转到该页面
                if (query && this.questionId) { // 扫码进来的（调研问卷）
                    this.url = this.changeUrl();
                }
                else { // 列表跳转进来的（调研问卷、电子签约）
                    if (options.url) {
                        var params_1 = this.getQueryParams(options.url);
                        this.questionId = params_1 && params_1.questionId;
                        this.url = decodeURIComponent(options.url);
                    }
                }
            }
        }
        // 跳转页面后标题会自动带上，无需赋值
        // this.dynamicStateTitle();
        this.$apply();
        console.log(this.url);
    };
    WebViewPage.prototype.getMsg = function (data) {
        console.error(data);
    };
    WebViewPage.prototype.onShareAppMessage = function () { };
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/me/webview/index'));

