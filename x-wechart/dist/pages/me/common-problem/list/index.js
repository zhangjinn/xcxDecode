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
var ProblemList = /** @class */ (function (_super) {
    __extends(ProblemList, _super);
    function ProblemList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '常见问题',
            usingComponents: {
                'van-popup': '../../../../components/vant/popup/index',
                "van-toast": "../../../../components/vant/toast/index",
                'van-icon': '../../../../components/vant/icon/index',
            },
        };
        _this.data = {
            TimeFilterVisible: false,
            timeList: [
                { label: '全部时间', value: '' },
                { label: '最近一个周', value: '7' },
                { label: '最近一个月', value: '1' },
                { label: '最近三个月', value: '3' },
                { label: '最近六个月', value: '6' },
            ],
            pageNo: 1,
            time: '',
            title: '',
            timelabel: '全部时间'
        };
        _this.methods = {
            touchTimeFilter: function () {
                if (!_this.TimeFilterVisible) {
                    _this.TimeFilterVisible = true;
                    return;
                }
                _this.TimeFilterVisible = false;
            },
            onSelectTime: function (Time, Label) {
                this.time = Time;
                this.timelabel = Label;
                this.methods.touchTimeFilter();
                this.pageNo = 1;
                this.getProblem();
            },
            gotodetail: function (e) {
                wx.navigateTo({
                    url: "/pages/me/common-problem/detail/index?id=" + e
                });
            },
            loadNextPage: function () {
                if (this.pageNo >= this.problemlist.pageSize) {
                    //
                }
                else {
                    this.pageNo++;
                    this.getProblem();
                }
            },
            onTitleChange: function (e) {
                var detail = e.detail;
                this.title = detail.value;
            },
            onSearch: function () {
                this.pageNo = 1;
                this.getProblem();
            }
        };
        return _this;
    }
    ProblemList.prototype.getProblem = function () {
        toast_1.default.loading({
            message: '正在加载',
            duration: 0
        });
        this.methods.getProblemList(this.pageNo, this.time, this.title).then(function () {
            toast_1.default.clear();
        });
    };
    ProblemList.prototype.onShow = function () {
        this.getProblem();
    };
    ProblemList = __decorate([
        wepy_redux_1.connect({
            problemlist: function (_a) {
                var notice = _a.notice;
                return notice.problemlist;
            }
        }, {
            getProblemList: notice_1.getProblemList
        })
    ], ProblemList);
    return ProblemList;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(ProblemList , 'pages/me/common-problem/list/index'));

