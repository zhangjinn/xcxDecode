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
var consultTodoDetail_1 = require('./../../../store/actions/consultTodoDetail.js');
var request_1 = require('./../../../utils/request.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var consultTodoDetail = /** @class */ (function (_super) {
    __extends(consultTodoDetail, _super);
    function consultTodoDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '待办详情',
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
                'van-steps': '../../../components/vant/steps/index',
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
            },
        };
        _this.data = {
            id: '',
            baseUrl: request_1.baseUrl,
            currentOrderId: '',
            type: 'view',
            orderdetail: {}
        };
        // 页面内交互写在methods里
        _this.methods = {
            auditSubmit: function (e) {
                var status = e;
                this.methods.submit({ id: this.currentOrderId, status: status }).then(function (res) {
                    var result = res.payload;
                    if (result.code == '200') {
                        toast_1.default.success('提交成功');
                        wx.navigateTo({ url: '/pages/me/consult-todo/index' });
                    }
                    else {
                        toast_1.default.success('提交失败：' + result.msg);
                    }
                });
            }
        };
        return _this;
    }
    consultTodoDetail.prototype.onLoad = function (e) {
        var _this = this;
        var id = e.id;
        this.type = e.type;
        this.currentOrderId = id;
        var that = this;
        this.methods.getSalesOrderConsult({ id: this.currentOrderId }).then(function (res) {
            that.orderdetail = res.payload;
            _this.$apply();
        });
        console.log(this.orderdetail);
    };
    consultTodoDetail = __decorate([
        wepy_redux_1.connect({}, {
            getSalesOrderConsult: consultTodoDetail_1.getSalesOrderConsult,
            submit: consultTodoDetail_1.submit
        })
    ], consultTodoDetail);
    return consultTodoDetail;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(consultTodoDetail , 'pages/me/consult-todo-detail/index'));

