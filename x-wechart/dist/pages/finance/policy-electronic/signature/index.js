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
var financepolicy_1 = require('./../../../../store/actions/financepolicy.js');
var wxbarcode = require('./../../../../npm/wxbarcode/index.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var Signature = /** @class */ (function (_super) {
    __extends(Signature, _super);
    function Signature() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '政策电子签章',
            usingComponents: {
                'van-toast': '../../../../components/vant/toast/index',
            },
        };
        _this.data = {
            rsRbSheet: {
                rowId: ''
            },
            rows: {
                rowId: '',
                cashedClassify: ''
            },
            statusFlag: '',
            showMore: false,
            from: '',
            doType: ''
        };
        _this.methods = {
            signature: function () {
                if (_this.doType === '0') {
                    return;
                }
                toast_1.default.loading({ forbidClick: true, message: '处理中...', duration: 0 });
                _this.methods.doAppRsRbCreateAndSign({
                    "typeCode": "10",
                    "docType": "RsRb",
                    "rowId": _this.rows.rowId,
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
                    docType: 'RsR',
                    rowId: _this.policyDetail.rsRbSheet.rowId,
                    typeCode: 10,
                    caFid: _this.policyDetail.rsRbSheet.caFid,
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
    Signature.prototype.getCurtom = function () {
        this.methods.queryAppRsOcRbSheetByRowId(__assign({ _loading: false }, this.rsRbSheet));
    };
    Signature.prototype.onLoad = function (e) {
        var id = e.id, statusFlag = e.statusFlag, from = e.from, doType = e.doType;
        this.statusFlag = statusFlag;
        this.rsRbSheet.rowId = id;
        this.rows.rowId = id;
        this.doType = doType;
        this.from = from === 'todo' ? '/pages/me/financial-todo/index' : '/pages/finance/policy-electronic/list/index';
        this.getCurtom();
        this.methods.queryAppRsRbDetailByRowId(__assign({ _loading: false }, this.rsRbSheet)).then(function (res) {
            wxbarcode.barcode('barcode', res.payload.rsRbSheet.rsRbSheet.sheetNo, 250, 80);
        });
    };
    Signature = __decorate([
        wepy_redux_1.connect({
            policyDetail: function (_a) {
                var financepolicy = _a.financepolicy;
                return financepolicy.policyDetail;
            },
            policyCurtom: function (_a) {
                var financepolicy = _a.financepolicy;
                return financepolicy.policyCurtom;
            }
        }, {
            queryAppRsRbDetailByRowId: financepolicy_1.queryAppRsRbDetailByRowId,
            queryAppRsOcRbSheetByRowId: financepolicy_1.queryAppRsOcRbSheetByRowId,
            getAppSignatureViewSsq: financepolicy_1.getAppSignatureViewSsq,
            doAppRsRbCreateAndSign: financepolicy_1.doAppRsRbCreateAndSign
        })
    ], Signature);
    return Signature;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Signature , 'pages/finance/policy-electronic/signature/index'));

