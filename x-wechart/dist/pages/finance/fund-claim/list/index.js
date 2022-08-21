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
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../../../npm/wepy/lib/wepy.js');
var fund_claim_1 = require('./../../../../store/actions/fund-claim.js');
var index_1 = require('./../../../../utils/index.js'); //日期月份补0
var request_1 = require('./../../../../utils/request.js');
var toast_1 = require('./../../../../components/vant/toast/toast.js');
var index_2 = require('./../../../../components/empty-data-type/index.js');
var index_3 = require('./../../../components/header-tab/index.js');
// @connect({
//   orderList({ order }) {
//     return order.orderList
//   }
// })
var Fundren = /** @class */ (function (_super) {
    __extends(Fundren, _super);
    function Fundren() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.config = {
            navigationBarTitleText: '资金认领',
            usingComponents: {
                'van-rate': '../../../../components/vant/rate/index',
                'van-icon': '../../../../components/vant/icon/index',
                'van-toast': '../../../../components/vant/toast/index',
                'van-popup': '../../../../components/vant/popup/index',
                'van-picker': '../../../../components/vant/picker/index',
                'van-search': '../../../../components/vant/search/index',
                'van-tab': '../../../../components/vant/tab/index',
                'van-row': '../../../../components/vant/row/index',
                'van-col': '../../../../components/vant/col/index',
                'van-tabs': '../../../../components/vant/tabs/index',
                'van-radio': '../../../../components/vant/radio/index',
                'van-radio-group': '../../../../components/vant/radio-group/index',
                'van-cell': '../../../../components/vant/cell/index',
                'van-field': '../../../../components/vant/field/index',
                'van-loading': '../../../../components/vant/loading/index',
                'van-stepper': '../../../../components/vant/stepper/index',
                'van-cell-group': '../../../../components/vant/cell-group/index',
                'van-button': '../../../../components/vant/button/index',
                'van-checkbox': '../../../../components/vant/checkbox/index',
                'van-checkbox-group': '../../../../components/vant/checkbox-group/index',
                'calendar': '../../../../components/calendar/index',
                'img': '../../../../components/img/index',
            },
        };
        _this_1.$repeat = {};
        _this_1.$props = { "emptyDataType": {}, "headerTab": { "xmlns:v-bind": "", "v-bind:showRightBtn.once": "showRightBtn", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this_1.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter" } };
        _this_1.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
        };
        _this_1.data = {
            lineBottom: false,
            view_show: false,
            hundSaleOrg: "",
            scrollTop: 0,
            fundClaimListQuery: {
                method: "queryNoticeBills",
                params: {
                    pageno: 1,
                    pagesize: 5,
                    claimstatus: "",
                    tradetimeS: "",
                    tradetimeE: "",
                    hifi_flowstatus: ''
                }
            },
            totalPages: 0,
            fundClaimList: [],
            // checked: true,
            orderMove: false,
            checkBtn: false,
            visible: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            timeFrameVisible: false,
            calendarShow: false,
            distributorsPopup: false,
            distributorsPopupName: '全部',
            currentDateName: '',
            popupName: '',
            // deliveryPopupName: '全部',
            filterForm: {
                zzprdmodel: '',
                orderCode: '',
                fundName: '',
                billtype: '',
                billnumber: '',
                billperson: '',
                billpersonname: '',
                acceptorname: '',
                sapOrderStatus: '',
                status: '',
                orderTypeCode: '',
                timeFrame: '',
                beginDate: '',
                endDate: ''
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
            showRightBtn: false,
            headerTabList: [
                { name: '交易类型', type: 'orderType', selectValue: '' },
                { name: '交易日期', type: 'orderStatus', selectValue: '' },
                { name: '认领状态', type: 'auditStatus', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this_1.methods = {
            goPage: function (url) {
                this.navigator({ link: { url: url } });
            },
            onChange: function (event) {
                _this_1.checked = event.detail;
                _this_1.$apply();
            },
            selectPopup: function (name) {
                if (name == 'suppliers') {
                    _this_1.popupName = '供应商';
                }
                else if (name == 'distributors') {
                    _this_1.popupName = '分销商';
                }
                else if (name == 'delivery') {
                    _this_1.popupName = '配送方式';
                }
                _this_1.distributorsPopup = !_this_1.distributorsPopup;
            },
            // 弹出/隐藏筛选列表
            touchOrderSFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (!_this_1.OrderSFilterVisible) {
                    _this_1.OrderSFilterVisible = true;
                    _this_1.CurrentOrderSFilterName = name;
                    return;
                }
                if (!name) {
                    _this_1.OrderSFilterVisible = false;
                    _this_1.CurrentOrderSFilterName = '';
                    return;
                }
                if (_this_1.CurrentOrderSFilterName === name) {
                    _this_1.OrderSFilterVisible = false;
                    _this_1.CurrentOrderSFilterName = '';
                    return;
                }
                if (['orderType', 'orderStatus', 'auditStatus'].indexOf(name) > -1) {
                    _this_1.CurrentOrderSFilterName = name;
                    return;
                }
                _this_1.OrderSFilterVisible = false;
                _this_1.CurrentOrderSFilterName = '';
            },
            // 详情跳转
            viewDetail: function (e, bill) {
                if (e) {
                    wx.navigateTo({
                        url: "/pages/finance/fund-claim/detail/index?id=" + e + "&bill=" + bill
                    });
                }
            },
            //认领跳转
            viewhandle: function (e, c, d) {
                if (e) {
                    wx.navigateTo({
                        url: "/pages/finance/fund-claim/handle/index?id=" + e + "&salenum=" + c + "&name=" + d
                    });
                }
            },
            orderfiltering: function () {
                _this_1.visible = !_this_1.visible;
                _this_1.OrderSFilterVisible = false;
                _this_1.CurrentOrderSFilterName = '';
            },
            onSelectOrderTypeCode: function (orderTypeCode) {
                _this_1.fundClaimListQuery.params.hifi_flowstatus = orderTypeCode;
                _this_1.fundClaimListQuery.params.pageno = 1;
                _this_1.filterForm = __assign({}, _this_1.filterForm, { orderTypeCode: orderTypeCode });
                _this_1.headerTabList[0].selectValue = orderTypeCode;
                _this_1.methods.touchOrderSFilter();
                // this.fundClaimListQuery = {...this.fundClaimListQuery,claimstatus:sapOrderStatus,pageno:1}
                _this_1.$apply();
                _this_1.methods.getFunClaimList(1);
            },
            onSelectStatus: function (status) {
                _this_1.filterForm = __assign({}, _this_1.filterForm, { status: status });
                _this_1.headerTabList[1].selectValue = status;
                _this_1.methods.touchOrderSFilter();
                if (status == 'UNPAYED') {
                    _this_1.methods.timeForMat(7);
                    _this_1.filterForm.timeFrame = '7';
                }
                else if (status == 'WAITPAYRESULT') {
                    _this_1.methods.timeForMat(30);
                    _this_1.filterForm.timeFrame = '1';
                }
                else if (status == 'AGENTUNCHKED') {
                    _this_1.methods.timeForMat(90);
                    _this_1.filterForm.timeFrame = '3';
                }
                else if (status == 'UNCHKED') {
                    _this_1.methods.timeForMat(180);
                    _this_1.filterForm.timeFrame = '6';
                }
                else {
                    _this_1.fundClaimListQuery.params.tradetimeS = '';
                    _this_1.fundClaimListQuery.params.tradetimeE = '';
                    _this_1.filterForm.timeFrame = '';
                }
                _this_1.methods.getFunClaimList(1);
            },
            //选择认领状态
            onSelectSOStatus: function (sapOrderStatus) {
                _this_1.fundClaimListQuery.params.claimstatus = sapOrderStatus;
                _this_1.fundClaimListQuery.params.pageno = 1;
                _this_1.filterForm = __assign({}, _this_1.filterForm, { sapOrderStatus: sapOrderStatus });
                _this_1.headerTabList[2].selectValue = sapOrderStatus;
                _this_1.methods.touchOrderSFilter();
                // this.fundClaimListQuery = {...this.fundClaimListQuery,claimstatus:sapOrderStatus,pageno:1}
                _this_1.$apply();
                _this_1.methods.getFunClaimList(1);
            },
            onZzprdmodelChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { zzprdmodel: e.detail });
            },
            onOrderCodeChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { orderCode: e.detail });
            },
            onOrderNameChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { fundName: e.detail });
            },
            onBillTypeChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { billtype: e.detail });
            },
            onBillNumberChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { billnumber: e.detail });
            },
            onBillPersonChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { billperson: e.detail });
            },
            onBillPersonNameChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { billpersonname: e.detail });
            },
            onAcceptorNameChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { acceptorname: e.detail });
            },
            getRandomNumber: function (start, end) {
                return Math.floor(Math.random() * (end - start) + start);
            },
            getFunClaimList: function (type) {
                var _this = _this_1;
                var array1;
                var toast = toast_1.default.loading({
                    forbidClick: true,
                    message: '加载中',
                });
                if (type == 3) {
                    var params = JSON.parse(JSON.stringify(_this_1.fundClaimListQuery.params));
                    params.pagesize = params.pageno * 5;
                    params.pageno = 1;
                    var scrollTopLast_1 = _this.scrollTop;
                    fund_claim_1.getFundClaimCounts(params, function (res) {
                        if (res.data.success) {
                            _this.totalPages = res.data.data.pagecount;
                            array1 = res.data.data.datas;
                            for (var index in array1) {
                                array1[index].billtype = _this.methods.getRandomNumber(0, 2);
                            }
                            _this.fundClaimList = array1;
                            toast_1.default.clear();
                            _this.view_show = true;
                            _this.lineBottom = false;
                            _this.$apply();
                            _this.scrollTop = scrollTopLast_1;
                        }
                        else {
                            console.log("error");
                        }
                    });
                }
                else {
                    fund_claim_1.getFundClaimCounts(_this_1.fundClaimListQuery, function (res) {
                        if (res.data.success) {
                            _this.totalPages = res.data.data.pagecount;
                            array1 = res.data.data.datas;
                            for (var index in array1) {
                                array1[index].billtype = _this.methods.getRandomNumber(0, 2);
                            }
                            if (type == "1") {
                                _this.fundClaimList = array1;
                            }
                            else {
                                _this.fundClaimList = _this.fundClaimList.concat(array1);
                            }
                            toast_1.default.clear();
                            _this.view_show = true;
                            _this.lineBottom = false;
                            _this.$apply();
                        }
                        else {
                            console.log("error");
                        }
                    });
                }
            },
            timeForMat: function (count) {
                var now = new Date();
                var year = now.getFullYear();
                var month = (now.getMonth() + 1) < 10 ? ('0' + (now.getMonth() + 1)) : now.getMonth() + 1;
                var date = now.getDate() < 10 ? ('0' + now.getDate()) : now.getDate();
                var hour = now.getHours() < 10 ? ('0' + now.getHours()) : now.getHours();
                var minute = now.getMinutes() < 10 ? ('0' + now.getMinutes()) : now.getMinutes();
                var second = now.getSeconds() < 10 ? ('0' + now.getSeconds()) : now.getSeconds();
                var nowDate = year + '-' + month + '-' + date + " " + hour + ":" + minute + ":" + second;
                _this_1.fundClaimListQuery.params.tradetimeE = nowDate;
                var before = new Date();
                before.setTime(before.getTime() - (24 * 60 * 60 * 1000 * (count - 1)));
                var Y2 = before.getFullYear();
                var M2 = ((before.getMonth() + 1) < 10 ? '0' + (before.getMonth() + 1) : (before.getMonth() + 1));
                var D2 = (before.getDate() < 10 ? '0' + before.getDate() : before.getDate());
                _this_1.fundClaimListQuery.params.tradetimeS = Y2 + '-' + M2 + '-' + D2 + " " + hour + ":" + minute + ":" + second;
            },
            // trueClaim(){//确定
            // },
            // cancleClaim(){//取消
            //   this.orderMove = false;
            // },
            // mergeClaim(){//合并认领
            //   this.orderMove = true;
            // },
            onToggleTimeFrame: function () {
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            onSelectTimeFrame: function (timeFrame) {
                this.filterForm = __assign({}, this.filterForm, { timeFrame: timeFrame });
                if (timeFrame == '7') {
                    this.methods.timeForMat(7);
                }
                else if (timeFrame == '1') {
                    this.methods.timeForMat(30);
                }
                else if (timeFrame == '3') {
                    this.methods.timeForMat(90);
                }
                else if (timeFrame == '6') {
                    this.methods.timeForMat(180);
                }
                else {
                    this.fundClaimListQuery.params.tradetimeS = '';
                    this.fundClaimListQuery.params.tradetimeE = '';
                }
            },
            onClearFilterForm: function () {
                this.filterForm.zzprdmodel = '';
                this.filterForm.orderCode = '';
                this.filterForm.fundName = '';
                this.filterForm.billtype = '';
                this.filterForm.billnumber = '';
                this.filterForm.billperson = '';
                this.filterForm.billpersonname = '';
                this.filterForm.acceptorname = '';
                this.filterForm.beginDate = '';
                this.filterForm.endDate = '';
                this.filterForm.timeFrame = '';
                this.fundClaimListQuery.params.tradetimeS = '';
                this.fundClaimListQuery.params.tradetimeE = '';
            },
            onSubmitFilterForm: function () {
                if (this.filterForm.beginDate && this.filterForm.endDate) {
                    this.fundClaimListQuery.params.tradetimeS = this.filterForm.beginDate + " 00:00:00";
                    this.fundClaimListQuery.params.tradetimeE = this.filterForm.endDate + " 00:00:00";
                }
                else {
                    this.fundClaimListQuery.params.tradetimeS = "";
                    this.fundClaimListQuery.params.tradetimeE = "";
                }
                this.methods.getFunClaimList(1);
                this.methods.orderfiltering();
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, beginDate = _a.beginDate, endDate = _a.endDate, sapBeginDate = _a.sapBeginDate, sapEndDate = _a.sapEndDate;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = beginDate;
                    end = endDate;
                }
                if (name.indexOf('eginDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('ndDate') > -1) {
                    this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                }
                this.calendarShow = true;
            },
            closeCalendar: function () {
                this.calendarShow = false;
            },
            clearCalendar: function (name) {
                var _a;
                this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[name] = '', _a));
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
            },
            onGetOrderListNext: function () {
                // const { totalPages } = this.orderList
                if (this.totalPages > this.fundClaimListQuery.params.pageno) {
                    this.fundClaimListQuery.params = __assign({}, this.fundClaimListQuery.params, { pageno: this.fundClaimListQuery.params.pageno + 1 });
                    this.methods.getFunClaimList(2);
                }
                else {
                    this.lineBottom = true;
                }
            },
            endScroll: function (e) {
                this.scrollTop = e.detail.scrollTop;
            }
        };
        return _this_1;
    }
    Fundren.prototype.onShow = function () {
        if (this.data.fundClaimList.length == 0) {
            this.methods.getFunClaimList(1);
        }
        else {
            this.methods.getFunClaimList(3);
        }
    };
    return Fundren;
}(wepy_1.default.page));

Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Fundren , 'pages/finance/fund-claim/list/index'));

