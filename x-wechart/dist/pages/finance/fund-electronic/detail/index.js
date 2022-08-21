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
var ProblemList = /** @class */ (function (_super) {
    __extends(ProblemList, _super);
    function ProblemList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '资金电子账单明细',
            usingComponents: {
                'van-icon': '../../../../components/vant/icon/index',
                'van-tab': '../../../../components/vant/tab/index',
                'van-tabs': '../../../../components/vant/tabs/index',
                'van-popup': '../../../../components/vant/popup/index',
            },
        };
        _this.data = {
            IKnow: false,
            rows: {
                sheetId: '',
                _loading: true
            },
            tcfilter: {
                sheetId: '',
                businessType: '',
                page: {
                    pageNo: 10,
                    pageSize: 1,
                },
            }
        };
        _this.methods = {
            allIKnow: function () {
                _this.IKnow = false;
            },
            viewSignature: function (e, ssqBind) {
                if (ssqBind == 0) {
                    this.IKnow = true;
                }
                else {
                    wx.navigateTo({
                        url: "/pages/finance/fund-electronic/signature/index?id=" + e
                    });
                }
            },
            viewInvoice: function (type, voucherNo) {
                wx.navigateTo({
                    url: "/pages/finance/invoice/index?type=" + type + "&voucherNo=" + voucherNo
                });
            },
            loadNextPage: function () {
                if (this.tcfilter.page.pageSize >= this.threecolumn.totalPage) {
                    //
                }
                else {
                    this.tcfilter.page = __assign({}, this.tcfilter.page, { pageSize: this.tcfilter.page.pageSize + 1 });
                    this.methods.doAppRsFtThreecolumnListJson(__assign({}, this.tcfilter));
                }
            },
            onChooseType: function (e) {
                var detail = e.detail;
                switch (detail.index) {
                    case 0:
                        this.tcfilter.businessType = '';
                        break;
                    case 1:
                        this.tcfilter.businessType = '10';
                        break;
                    case 2:
                        this.tcfilter.businessType = '20';
                        break;
                    case 3:
                        this.tcfilter.businessType = '30';
                        break;
                }
                this.tcfilter.page = __assign({}, this.tcfilter.page, { pageSize: 1 });
                this.methods.doAppRsFtThreecolumnListJson(__assign({}, this.tcfilter));
            }
        };
        return _this;
    }
    ProblemList.prototype.onLoad = function (e) {
        var sheetId = e.sheetId;
        this.rows = __assign({}, this.rows, { sheetId: sheetId });
        this.tcfilter = __assign({}, this.tcfilter, { sheetId: sheetId });
        this.methods.queryAppRsFtSheetByRowId(__assign({}, this.rows)).then(function (res) {
            wxbarcode.barcode('barcode', res.payload.rsFtSheet.sheetNo, 250, 80);
            var sheetId = res.payload.rsFtSheet.rowId;
            var sheetNo = res.payload.rsFtSheet.sheetNo;
            var prfcName = res.payload.rsFtSheet.prfcName;
            var periodEndDate = res.payload.rsFtSheet.periodEndDate;
            var currencyName = res.payload.rsFtSheet.currencyName;
            wx.setStorageSync('InvoiceData', JSON.stringify({ sheetId: sheetId, sheetNo: sheetNo, prfcName: prfcName, periodEndDate: periodEndDate, currencyName: currencyName }));
        });
        this.tcfilter.page = __assign({}, this.tcfilter.page, { pageSize: 1 });
        this.methods.doAppRsFtThreecolumnListJson(__assign({}, this.tcfilter));
    };
    ProblemList = __decorate([
        wepy_redux_1.connect({
            fundDetail: function (_a) {
                var financefund = _a.financefund;
                return financefund.fundDetail;
            },
            threecolumn: function (_a) {
                var financefund = _a.financefund;
                return financefund.threecolumn;
            }
        }, {
            queryAppRsFtSheetByRowId: financefund_1.queryAppRsFtSheetByRowId,
            doAppRsFtThreecolumnListJson: financefund_1.doAppRsFtThreecolumnListJson
        })
    ], ProblemList);
    return ProblemList;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(ProblemList , 'pages/finance/fund-electronic/detail/index'));

