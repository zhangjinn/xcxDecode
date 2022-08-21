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
var notice_1 = require('./../../../store/actions/notice.js');
var index_1 = require('./../../../components/empty-data-type/index.js');
var filter = /** @class */ (function (_super) {
    __extends(filter, _super);
    function filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '代理商活动核销详情',
            usingComponents: {
                'van-toast': '../../../components/vant/toast/index',
                'van-loading': '../../../components/vant/loading/index',
                'no-permission': '../../../components/no-permission/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "数据" } };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_1.default,
        };
        _this.data = {
            messageList: [],
            sourceId: ''
        };
        _this.methods = {};
        return _this;
    }
    filter.prototype.getMessageList = function () {
        var _this = this;
        var param = {
            sourceId: this.sourceId
        };
        this.methods.getAgentActivityApplyNotice(param).then(function (res) {
            _this.messageList = res.payload.list;
            _this.$apply();
        });
    };
    filter.prototype.onShow = function () {
        this.getMessageList();
    };
    filter.prototype.onLoad = function (e) {
        var id = e.id;
        this.sourceId = id;
    };
    filter = __decorate([
        wepy_redux_1.connect({}, {
            getAgentActivityApplyNotice: notice_1.getAgentActivityApplyNotice
        })
    ], filter);
    return filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(filter , 'pages/me/promotional-message-detail/index'));

