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
            navigationBarTitleText: '责任人搜索',
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
            showSing: false,
            name: '',
            selName: '',
            selCode: '',
            notFoundCheck: '',
            selProblemIndex: '',
            storeCode: ''
        };
        _this.methods = {
            onDescriptionChange: function (event) {
                this.name = event.detail;
            },
            selPeople: function (item) {
                _this.selName = item.userName;
                _this.selCode = item.account;
                _this.name = item.userName;
            },
            onChange: function (event) {
                _this.notFoundCheck = event.detail;
            },
            searchPeople: function () {
                _this.methods.getStoryPersons({ cust: _this.name }); //todo businessFlag:1
            },
            submit: function () {
                var name = _this.selName;
                var selCode = _this.selCode;
                if (!name && _this.notFoundCheck) {
                    name = _this.name;
                    selCode = '';
                }
                if (name) {
                    var pages = getCurrentPages();
                    var prevPage = pages[pages.length - 2];
                    if (_this.selProblemIndex > -1) {
                        var stibBean = prevPage.data.stibBean;
                        stibBean[_this.selProblemIndex].responsible = name;
                        prevPage.setData({
                            stibBean: stibBean
                        });
                    }
                    else {
                        var duty = prevPage.data.duty;
                        duty.dutyUserCode = selCode;
                        duty.dutyUserName = name;
                        prevPage.setData({
                            duty: duty
                        });
                    }
                    wx.navigateBack({
                        delta: 1
                    });
                }
                else {
                    wx.showToast({
                        title: '请选择或输入责任人！',
                        icon: 'none'
                    });
                }
            }
        };
        return _this;
    }
    WebViewPage.prototype.onLoad = function (options) {
        this.storeCode = options.storeCode;
        this.methods.getStoryPersons(); //businessFlag:1,传1时为业务员
        this.selProblemIndex = options.selProblemIndex;
    };
    WebViewPage = __decorate([
        wepy_redux_1.connect({
            storyPersons: function (_a) {
                var record = _a.record;
                return record.storyPersons;
            }
        }, {
            getStoryPersons: record_1.getStoryPersons
        })
    ], WebViewPage);
    return WebViewPage;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(WebViewPage , 'pages/terminal/people/index'));

