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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var fund_claim_1 = require('./../../../../store/actions/fund-claim.js');
var request_1 = require('./../../../../utils/request.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var Fundrendetail = /** @class */ (function (_super) {
    __extends(Fundrendetail, _super);
    function Fundrendetail() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.config = {
            navigationBarTitleText: '认领明细',
            usingComponents: {
                'van-rate': '../../../../components/vant/rate/index',
                'van-icon': '../../../../components/vant/icon/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-tab': '../../../../components/vant/tab/index',
                'van-field': '../../../../components/vant/field/index',
                'van-loading': '../../../../components/vant/loading/index',
                'van-stepper': '../../../../components/vant/stepper/index',
                'van-button': '../../../../components/vant/button/index',
                'img': '../../../../components/img/index',
            },
        };
        _this_1.data = {
            billType: '',
            view_show: false,
            postData: {
                method: "getNoticeBill",
                params: {
                    id: ""
                }
            },
            detailList: {},
            detailId: '',
            visible: false,
            popupName: '',
            deliveryPopupName: '全部',
            filterForm: {
                pageNo: 1,
            },
            baseUrl: request_1.baseUrl,
        };
        // 页面内交互写在methods里
        _this_1.methods = {
            goPage: function (url) {
                this.navigator({ link: { url: url } });
            },
            selectagentPopup: function () {
                _this_1.distributorsPopup = false;
            },
            viewhandle: function () {
                var _this = _this_1;
                wx.navigateTo({
                    url: "/pages/finance/fund-claim/handle/index?id=" + _this.postData.params.id + "&salenum=" + _this.detailList.saleorg.number
                });
            },
            getDetailMethod: function () {
                var _this = _this_1;
                var toast = toast_1.default.loading({
                    forbidClick: true,
                    message: '加载中',
                });
                fund_claim_1.getFundClaimDetail(_this_1.postData, function (res) {
                    if (res.data.success) {
                        _this.detailList = res.data.data;
                        _this.view_show = true;
                        _this.$apply();
                        toast_1.default.clear();
                    }
                });
            }
            // onGetOrderListNext() {
            //   const { totalPages } = this.orderList
            //   if(totalPages > this.filterForm.pageNo) {
            //     this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1}
            //     this.myGetOrderList()
            //   }
            // },
        };
        return _this_1;
    }
    Fundrendetail.prototype.onShow = function () {
        this.methods.getDetailMethod();
    };
    Fundrendetail.prototype.onLoad = function (e) {
        this.postData.params.id = e.id;
        this.billType = e.bill;
        this.$apply();
    };
    return Fundrendetail;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Fundrendetail , 'pages/finance/fund-claim/detail/index'));

