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
var service_comment_1 = require('./../../../store/actions/service-comment.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '问卷调研',
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
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            visible: false,
            scrollTop: 0,
            filterForm: {},
            commentList: [],
        };
        // 页面内交互写在methods里
        _this.methods = {
            onScroll: function (event) {
                if (event.detail.scrollTop >= 350) {
                    if (_this.scrollTop === 0) {
                        _this.scrollTop = event.detail.scrollTop;
                    }
                }
            },
            getComment: function () {
                service_comment_1.getExamInfo(_this.filterForm, function (res) {
                    _this.visible = true;
                    if (res && res.data.data.length > 0) {
                        _this.commentList = res.data.data[0].details;
                        _this.commentDesc = res.data.data[0].desc;
                        // 设置顶部标题栏
                        res.data.data[0].desc.forEach(function (element) {
                            if (element.titleNo == 'title') {
                                wx.setNavigationBarTitle({
                                    title: element.titleName,
                                });
                            }
                        });
                    }
                    _this.$apply();
                });
            },
            openBill: function (index) {
                var commentDesc = ramda_1.clone(_this.commentDesc);
                var comment = ramda_1.clone(_this.commentList[index]);
                var sourceData = ramda_1.clone(comment.sourceData);
                var sourceDataChange = JSON.parse(sourceData);
                comment['sourceData'] = sourceDataChange;
                wx.navigateTo({
                    url: '/pages/me/service-comment-detail/index?info=' + JSON.stringify(comment) + "&list=" + JSON.stringify(commentDesc)
                });
            }
        };
        return _this;
    }
    Filter.prototype.onShow = function () {
        console.log(wepy_1.default.$instance.globalData);
        this.filterForm.account = wepy_1.default.$instance.globalData.account;
        this.commentList = [];
        this.methods.getComment();
    };
    Filter = __decorate([
        wepy_redux_1.connect()
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/me/service-comment/index'));

