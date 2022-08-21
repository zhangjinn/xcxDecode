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
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../../npm/wepy-redux/lib/index.js');
var financefund_1 = require('./../../../../store/actions/financefund.js');
var wxbarcode = require('./../../../../npm/wxbarcode/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var financepolicy_1 = require('./../../../../store/actions/financepolicy.js');
var ProblemList = /** @class */ (function (_super) {
    __extends(ProblemList, _super);
    function ProblemList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '资金电子签章',
            usingComponents: {
                'van-toast': '/components/vant/toast/index',
            },
        };
        _this.data = {
            rows: {
                sheetId: '',
                _loading: true
            },
            up: true,
            up1: true,
            contents: '展开详情',
            contents1: '展开详情',
            statusFlag: '',
            from: '',
            doType: ''
        };
        _this.methods = {
            onshowClick: function () {
                this.up = !this.up;
                if (this.up) {
                    this.contents = "展开详情";
                }
                else {
                    this.contents = "收起详情";
                }
            },
            onshowClick1: function () {
                this.up1 = !this.up1;
                if (this.up1) {
                    this.contents1 = "展开详情";
                }
                else {
                    this.contents1 = "收起详情";
                }
            },
            signature: function () {
                if (_this.doType === '0') {
                    return;
                }
                toast_1.default.loading({ forbidClick: true, message: '处理中...', duration: 0 });
                _this.methods.doAppRsFtCreateAndSign({
                    "typeCode": "10",
                    "docType": "RsFt",
                    "rowId": _this.fundDetail.rowId,
                    "ssqReturnUrl": _this.from
                }).then(function (res) {
                    if (res.payload.success === 'true' || res.payload.code === '0') {
                        toast_1.default.clear();
                        var urlStr = encodeURIComponent(res.payload.url);
                        wx.navigateTo({ url: "/pages/me/webview/index?url=" + urlStr });
                    }
                    else {
                        toast_1.default.fail(res.payload.msg || '处理失败');
                    }
                });
            },
            view: function () {
                if (_this.doType === '0') {
                    return;
                }
                _this.methods.getAppSignatureViewSsq({
                    docType: 'RsFt',
                    rowId: _this.fundDetail.rowId,
                    typeCode: 10,
                    caFid: _this.fundDetail.caFid,
                }).then(function (res) {
                    if (res.payload.code === '0') {
                        var urlStr = encodeURIComponent(res.payload.url);
                        wx.navigateTo({ url: "/pages/me/webview/index?url=" + urlStr });
                    }
                    else {
                        // 报错
                        toast_1.default.fail(res.payload.msg || '处理失败');
                    }
                });
            }
        };
        return _this;
    }
    ProblemList.prototype.getfundcustom = function () {
        this.methods.queryAppRsOcFtSheetByRowId(__assign({}, this.rows));
    };
    ProblemList.prototype.onLoad = function (e) {
        var id = e.id, statusFlag = e.statusFlag, from = e.from, doType = e.doType;
        this.rows.sheetId = id;
        this.statusFlag = statusFlag;
        this.doType = doType;
        this.from = from === 'todo' ? '/pages/me/financial-todo/index' : "/pages/finance/fund-electronic/list/index";
        this.getfundcustom();
        this.methods.queryAppRsFtSheetByRowId(__assign({}, this.rows)).then(function (res) {
            wxbarcode.barcode('barcode', res.payload.rsFtSheet.sheetNo, 250, 80);
        });
    };
    ProblemList = __decorate([
        wepy_redux_1.connect({
            fundDetail: function (_a) {
                var financefund = _a.financefund;
                return financefund.fundDetail;
            },
            fundCustom: function (_a) {
                var financefund = _a.financefund;
                return financefund.fundCustom;
            }
        }, {
            queryAppRsFtSheetByRowId: financefund_1.queryAppRsFtSheetByRowId,
            queryAppRsOcFtSheetByRowId: financefund_1.queryAppRsOcFtSheetByRowId,
            doAppRsFtCreateAndSign: financefund_1.doAppRsFtCreateAndSign,
            getAppSignatureViewSsq: financepolicy_1.getAppSignatureViewSsq
        })
    ], ProblemList);
    return ProblemList;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(ProblemList , 'pages/finance/fund-electronic/signature/index'));

