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
var ProblemList = /** @class */ (function (_super) {
    __extends(ProblemList, _super);
    function ProblemList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '政策电子账单明细',
            usingComponents: {
                'van-icon': '../../../../components/vant/icon/index',
                'van-tab': '../../../../components/vant/tab/index',
                'van-tabs': '../../../../components/vant/tabs/index',
                'van-popup': '../../../../components/vant/popup/index',
            },
        };
        _this.data = {
            IKnow: false,
            rsRbSheet: {
                rowId: 10879334
            },
            rows: {
                rowId: 10879334,
                cashedClassify: ''
            },
            showMore: false,
        };
        _this.methods = {
            showMore: function () {
                _this.showMore = true;
            },
            hiddenMore: function () {
                _this.showMore = false;
            },
            allIKnow: function () {
                _this.IKnow = false;
            },
            viewSignature: function (e, ssqBind) {
                if (ssqBind == 0) {
                    this.IKnow = true;
                }
                else {
                    wx.navigateTo({
                        url: "/pages/finance/policy-electronic/signature/index?id=" + e
                    });
                }
            },
            onClick: function (e) {
                var detail = e.detail;
                if (detail.index == 1) {
                    this.rows.cashedClassify = '01';
                    this.getcashed();
                }
                else if (detail.index == 2) {
                    this.rows.cashedClassify = '02';
                    this.getcashed();
                }
                else {
                    this.curConfirmeds();
                }
            }
        };
        return _this;
    }
    ProblemList.prototype.onLoad = function (e) {
        var id = e.id;
        this.rsRbSheet.rowId = id;
        this.rows.rowId = id;
        this.curConfirmeds();
        this.methods.queryAppRsRbDetailByRowId(__assign({}, this.rsRbSheet)).then(function (res) {
            wxbarcode.barcode('barcode', res.payload.rsRbSheet.rsRbSheet.sheetNo, 250, 80);
        });
    };
    ProblemList.prototype.curConfirmeds = function () {
        this.methods.queryAppCurConfirmedByRowId(__assign({}, this.rows));
    };
    ProblemList.prototype.getcashed = function () {
        this.methods.queryAppRsRbCashedByRowId(__assign({}, this.rows));
    };
    ProblemList = __decorate([
        wepy_redux_1.connect({
            policyDetail: function (_a) {
                var financepolicy = _a.financepolicy;
                return financepolicy.policyDetail;
            },
            curConfirmed: function (_a) {
                var financepolicy = _a.financepolicy;
                return financepolicy.curConfirmed;
            },
            cashed: function (_a) {
                var financepolicy = _a.financepolicy;
                return financepolicy.cashed;
            }
        }, {
            queryAppRsRbCashedByRowId: financepolicy_1.queryAppRsRbCashedByRowId,
            queryAppCurConfirmedByRowId: financepolicy_1.queryAppCurConfirmedByRowId,
            queryAppRsRbDetailByRowId: financepolicy_1.queryAppRsRbDetailByRowId
        })
    ], ProblemList);
    return ProblemList;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(ProblemList , 'pages/finance/policy-electronic/detail/index'));

