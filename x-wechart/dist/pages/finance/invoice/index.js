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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var financefund_1 = require('./../../../store/actions/financefund.js');
var financefund_2 = require('./../../../store/types/financefund.js');
var filter = /** @class */ (function (_super) {
    __extends(filter, _super);
    function filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '发票',
            usingComponents: {},
        };
        _this.data = {
            pagetype: '',
            filter: {
                sheetId: '',
                voucherNo: '',
                page: {
                    pageSize: 1,
                    pageNo: 10
                },
            },
            pageInfo: {
                sheetNo: '',
                prfcName: '',
                periodEndDate: '',
                currencyName: ''
            },
            height: wx.getSystemInfoSync().windowHeight - 138,
        };
        _this.methods = {
            loadNextPage: function () {
                if (this.filter.page.pageSize >= this.list.totalPage) {
                    //
                }
                else {
                    this.filter.page = __assign({}, this.filter.page, { pageSize: this.filter.page.pageSize + 1 });
                    this.choosePage();
                }
            }
        };
        return _this;
    }
    filter.prototype.choosePage = function () {
        switch (this.pagetype) {
            case 1:
                this.methods.doAppRsFtInvoiceListJson(__assign({}, this.filter));
                break;
            case 2:
                this.methods.doAppRsFtIncomeListJson(__assign({}, this.filter));
                break;
            case 3:
                this.methods.doAppRsFtShipNoInvoiceListJson(__assign({}, this.filter));
                break;
            case 4:
                this.methods.doAppRsFtReturnNoRefundListJson(__assign({}, this.filter));
                break;
        }
    };
    filter.prototype.onLoad = function (e) {
        var res = wx.getStorageSync('InvoiceData');
        var _a = JSON.parse(res), sheetNo = _a.sheetNo, sheetId = _a.sheetId, prfcName = _a.prfcName, periodEndDate = _a.periodEndDate, currencyName = _a.currencyName;
        var type = e.type, voucherNo = e.voucherNo;
        this.pagetype = Number(type);
        this.filter = __assign({}, this.filter, { sheetId: sheetId, voucherNo: voucherNo });
        this.pageInfo = __assign({}, this.pageInfo, { sheetNo: sheetNo, prfcName: prfcName, periodEndDate: periodEndDate, currencyName: currencyName });
        var title;
        switch (this.pagetype) {
            case 1:
                title = '发票明细';
                break;
            case 2:
                title = '回款明细';
                break;
            case 3:
                title = '海信方已发货未开票';
                break;
            case 4:
                title = '客户方已退货未退税';
                break;
        }
        wx.setNavigationBarTitle({
            title: title
        });
        this.choosePage();
    };
    filter.prototype.onUnload = function () {
        wepy_redux_1.getStore().dispatch({
            type: financefund_2.RESET_RS_FT_LIST,
            payload: []
        });
    };
    filter = __decorate([
        wepy_redux_1.connect({
            list: function (_a) {
                var financefund = _a.financefund;
                return financefund.list;
            }
        }, {
            doAppRsFtInvoiceListJson: financefund_1.doAppRsFtInvoiceListJson,
            doAppRsFtShipNoInvoiceListJson: financefund_1.doAppRsFtShipNoInvoiceListJson,
            doAppRsFtIncomeListJson: financefund_1.doAppRsFtIncomeListJson,
            doAppRsFtReturnNoRefundListJson: financefund_1.doAppRsFtReturnNoRefundListJson
        })
    ], filter);
    return filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(filter , 'pages/finance/invoice/index'));

