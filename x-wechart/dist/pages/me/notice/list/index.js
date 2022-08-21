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
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_1 = require('./../../../../components/empty-data-type/index.js');
var NoticeList = /** @class */ (function (_super) {
    __extends(NoticeList, _super);
    function NoticeList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '公告',
            usingComponents: {
                "van-toast": "/components/vant/toast/index",
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "xmlns:wx": "", "description": "公告" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            pageNo: 1,
            plate: ''
        };
        _this.methods = {
            loadNextPage: function () {
                if (this.pageNo >= this.list.pageSize) {
                    //
                }
                else {
                    toast_1.default.loading({
                        message: '正在加载',
                        duration: 0
                    });
                    this.pageNo++;
                    this.methods.getNoticeList(this.pageNo, this.plate).then(function () {
                        toast_1.default.clear();
                    });
                }
            },
            goDetails: function (id) {
                wx.navigateTo({
                    url: '/pages/me/notice/detail/index?id=' + id
                });
            }
        };
        return _this;
    }
    NoticeList.prototype.onShow = function () {
        var _this = this;
        toast_1.default.loading({
            message: '正在加载',
            duration: 0
        });
        this.methods.getNoticeList(1, this.plate).then(function (res) {
            toast_1.default.clear();
            _this.pageNo = res.payload.currentPage;
        });
    };
    NoticeList.prototype.onLoad = function (e) {
        var plate = e.plate;
        this.plate = plate;
        wx.setNavigationBarTitle({
            title: this.plate
        });
    };
    NoticeList = __decorate([
        wepy_redux_1.connect({
            list: function (_a) {
                var notice = _a.notice;
                return notice.list;
            },
        }, {
            getNoticeList: notice_1.getNoticeList
        })
    ], NoticeList);
    return NoticeList;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(NoticeList , 'pages/me/notice/list/index'));

