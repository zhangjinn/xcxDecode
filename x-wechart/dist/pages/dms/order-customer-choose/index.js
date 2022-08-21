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
var dmsorder_1 = require('./../../../store/types/dmsorder.js');
var dmsorder_2 = require('./../../../store/actions/dmsorder.js');
var throttle_debounce_1 = require('./../../../npm/throttle-debounce/dist/index.cjs.js');
var OrderCustomerChoose = /** @class */ (function (_super) {
    __extends(OrderCustomerChoose, _super);
    function OrderCustomerChoose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '查找客户',
            usingComponents: {
                "van-search": "/components/vant/search/index",
                "van-toast": "/components/vant/toast/index"
            },
        };
        _this.data = {
            filterStr: '',
            from: '',
            pageNo: 1
        };
        _this.methods = {
            loadNextPage: function () {
                if (_this.customers.over) {
                    return;
                }
                var _a = _this.data, from = _a.from, pageNo = _a.pageNo;
                _this.pageNo = ++pageNo;
                if (from == 'return-stock') {
                    _this.methods.getReturnCustomer({ filterStr: (_this.data.filterStr || '').trim(), pageNo: _this.pageNo });
                }
                else {
                    _this.methods.getCustomer({ filterStr: (_this.data.filterStr || '').trim(), pageNo: _this.pageNo });
                }
            },
            onChange: throttle_debounce_1.debounce(500, function (_a) {
                var detail = _a.detail;
                _this.filterStr = detail;
                _this.$apply();
            }),
            onSearch: function (_a) {
                var detail = _a.detail;
                _this.pageNo = 1;
                if (_this.data.from == 'return-stock') {
                    _this.methods.getReturnCustomer({ filterStr: (_this.data.filterStr || '').trim() });
                }
                else {
                    _this.methods.getCustomer({ filterStr: (detail || '').trim() });
                }
            },
            chooseItem: function (index) {
                var chooseItem = _this.customers.customers[index];
                wepy_redux_1.getStore().dispatch({
                    type: dmsorder_1.DMS_ORDER_CHOOSE_CUSTOMER_INFO,
                    payload: chooseItem
                });
                if (!_this.data.from) {
                    _this.methods.getNormalSalesOrderCustomerInfo({ customerCode: chooseItem.customerCode });
                }
                wx.navigateBack({
                    delta: 1
                });
            }
        };
        return _this;
    }
    OrderCustomerChoose.prototype.onLoad = function (_a) {
        var _b = _a.from, from = _b === void 0 ? '' : _b;
        this.from = from;
        this.$apply();
        if (from == 'return-stock') {
            this.methods.getReturnCustomer({ filterStr: (this.data.filterStr || '').trim() });
        }
        else {
            this.methods.getCustomer({ filterStr: (this.data.filterStr || '').trim() });
        }
    };
    OrderCustomerChoose = __decorate([
        wepy_redux_1.connect({
            customers: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.customers;
            }
        }, {
            getCustomer: dmsorder_2.getCustomer,
            getReturnCustomer: dmsorder_2.getReturnCustomer,
            getNormalSalesOrderCustomerInfo: dmsorder_2.getNormalSalesOrderCustomerInfo
        })
    ], OrderCustomerChoose);
    return OrderCustomerChoose;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(OrderCustomerChoose , 'pages/dms/order-customer-choose/index'));

