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
            login: true,
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
    ;
    WebViewPage.prototype.onLoad = function (options) {
        var query = options.q; // 获取到二维码原始链接内容
        var params = this.getQueryParams(query);
        var questionId = params && params.questionId;
        this.questionId = questionId;
        wx.setNavigationBarTitle({
            title: '问卷预览'
        });
        this.url = wepy_1.default.$appConfig.baseUrl + "/questionnaireEditorPreview?questionId=" + this.questionId + "&source=XCX";
        this.url = index_1.modifyUrl(this.url);
        this.$apply();
        console.log(this.url);
    };
    WebViewPage.prototype.getMsg = function (data) {
        console.error(data);
    };
    WebViewPage.prototype.onShareAppMessage = function () { };
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/me/questionnaireEditorPreview/index'));

