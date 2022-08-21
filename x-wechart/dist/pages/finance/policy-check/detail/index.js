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
var financecheck_1 = require('./../../../../store/actions/financecheck.js');
var wxbarcode = require('./../../../../npm/wxbarcode/index.js');
var ProblemList = /** @class */ (function (_super) {
    __extends(ProblemList, _super);
    function ProblemList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '政策核对单明细',
            usingComponents: {
                'van-rate': '../../../../components/vant/rate/index',
                'van-field': '../../../../components/vant/field/index',
                'van-popup': '../../../../components/vant/popup/index',
            },
        };
        _this.data = {
            IKnow: false,
            filterForm: {
                rowId: '',
            },
        };
        _this.methods = {
            allIKnow: function () {
                _this.IKnow = false;
            },
            onClick: function (e, ssqBind) {
                if (ssqBind == 0) {
                    this.IKnow = true;
                }
                else {
                    wx.navigateTo({
                        url: "/pages/finance/policy-check/signature/index?id=" + e
                    });
                }
            }
        };
        return _this;
    }
    ProblemList.prototype.onLoad = function (e) {
        var id = e.id;
        this.filterForm.rowId = id;
        this.methods.queryAppCfRbDetailByRowId(__assign({ _loading: false }, this.filterForm)).then(function (res) {
            wxbarcode.barcode('barcode', res.payload.rows.docNo, 250, 80);
        });
    };
    ProblemList = __decorate([
        wepy_redux_1.connect({
            checkDetail: function (_a) {
                var financecheck = _a.financecheck;
                return financecheck.checkDetail;
            }
        }, {
            queryAppCfRbDetailByRowId: financecheck_1.queryAppCfRbDetailByRowId
        })
    ], ProblemList);
    return ProblemList;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(ProblemList , 'pages/finance/policy-check/detail/index'));

