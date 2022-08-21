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
var _a = wepy_1.default.$appConfig, baseUrl = _a.baseUrl, imgUrl = _a.imgUrl;
var wepy_redux_1 = require('./../../../npm/wepy-redux/lib/index.js');
var order_1 = require('./../../../store/actions/order.js');
var returngoods_1 = require('./../../../store/actions/returngoods.js');
var index_1 = require('./../../../utils/index.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var order_2 = require('./../../../store/types/order.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var index_2 = require('./../../../utils/index.js');
var index_3 = require('./../../../components/empty-data-type/index.js');
var index_4 = require('./../../components/header-tab/index.js');
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '共享退货明细',
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
                'calendar': '../../../components/calendar/index',
                'img': '../../../components/img/index',
                'van-dialog': '../../../../components/vant/dialog/index',
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": { "description": "明细" }, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "touchOrderSFilter", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_3.default,
            headerTab: index_4.default,
        };
        _this.data = {
            visible: false,
            Suppliersextend: false,
            Itemgroupextend: false,
            OrderSFilterVisible: false,
            CurrentOrderSFilterName: '',
            timeFrameVisible: false,
            calendarShow: false,
            agentPopup: false,
            popupTitle: '',
            agentPopupName: '全部',
            statusName: '全部',
            purchasePopupName: '全部',
            currentDateName: '',
            cancelOrderPopup: false,
            cancelOrderId: '',
            continuePayPopup: false,
            continuePayId: '',
            scrollTop: 0,
            filterForm: {
                _loading: true,
                agentCheckStart: '',
                agentCheckEnd: '',
                pageNo: 1,
                orderTypeCode: '',
                status: '',
                sapOrderStatus: '',
                returnOrderCode: '',
                zzprdmodel: '',
                orgId: '',
                matklId: '',
                startOrderDate: '',
                endOrderDate: '',
                timeFrame: '',
                agentId: '',
                trans: '',
                directBuy: '',
                purchaseTypeId: '',
                returnWarehouse: '',
            },
            returnGoodLength: null,
            filterFormExtra: {
                orgName: '',
                matklName: '',
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: baseUrl,
            viewShowed: false,
            companyList: [],
            returnGoodsList: [],
            StatusList: [],
            headerTabList: [
                { name: '销售组织', type: 'orderType', selectValue: '' },
                { name: '状态', type: 'auditStatus', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            name: function (e) {
                // console.log('点击选中',e)
                this.filterForm.returnWarehouse = e.currentTarget.dataset.index;
                this.viewShowed = false;
            },
            onClearFilterForm: function () {
                this.filterForm.returnOrderCode = '';
                this.filterForm.zzprdmodel = '';
                this.filterForm.startOrderDate = '';
                this.filterForm.endOrderDate = '';
                this.filterForm.orgId = '';
                this.filterFormExtra.orgName = '';
                this.agentPopupName = '';
                this.filterForm.agentId = '';
                this.statusName = '';
                this.filterForm.status = '';
                this.filterForm.returnWarehouse = '';
            },
            onScroll: function (event) {
                if (event.detail.scrollTop >= 350) {
                    if (_this.scrollTop === 0) {
                        _this.scrollTop = event.detail.scrollTop;
                    }
                }
            },
            cancelOrderPopup: function (id, code, orderType, states) {
                /*this.cancelOrderId = id
                this.cancelOrderPopup = true
                this.$apply()*/
                //常规订单 BHO2000038043
                if (orderType == '8311' && (states == 'ALREADYPLANPRODUCT' || states == 'ARRANGEDPRODUCT' || states == 'UNCHKED' || states == 'WAITDELIVER' || states == 'PARTCHECKED')) {
                    dialog_1.default.confirm({
                        message: "取消‘评审通过’,‘已安排生产’,‘待排发货计划’,‘待发货’,‘发货中’状态的常规订单，会判定为商家违约，请确认是否取消？",
                    }).then(function () {
                        //跳转到取消页面
                        wx.navigateTo({
                            url: "/pages/me/order-cancel/index?orderId=" + id + "&orderCode=" + code + "&ly=0"
                        });
                    }).catch(function () {
                        // on cancel
                    });
                }
            },
            selectAgent: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.key == key) {
                        _this.agentPopupName = item.value;
                        _this.filterForm = __assign({}, _this.filterForm, { agentId: item.key });
                    }
                }, _this.filter.itemAgent);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectDelivery: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.id == key) {
                        _this.statusName = item.name;
                        _this.filterForm = __assign({}, _this.filterForm, { status: item.id });
                    }
                }, _this.StatusList);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectagentPopup: function (e) {
                if (e == 'salesOrganization') {
                    _this.popupTitle = '销售组织';
                }
                else if (e == 'Warehouse') {
                    _this.popupTitle = '统仓仓库';
                }
                else if (e == 'state') {
                    _this.popupTitle = '状态';
                }
                _this.agentPopup = !_this.agentPopup;
            },
            touchOrderSFilter: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (!_this.OrderSFilterVisible) {
                    _this.OrderSFilterVisible = true;
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                if (!name) {
                    _this.OrderSFilterVisible = false;
                    _this.CurrentOrderSFilterName = '';
                    return;
                }
                if (_this.CurrentOrderSFilterName === name) {
                    _this.OrderSFilterVisible = false;
                    _this.CurrentOrderSFilterName = '';
                    return;
                }
                if (['orderType', 'orderStatus', 'auditStatus'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            viewDetail: function (e) {
                if (e) {
                    wx.navigateTo({
                        url: "/pages/me/order-detail/index?id=" + e
                    });
                }
            },
            Suppliers: function () {
                _this.Suppliersextend = !_this.Suppliersextend;
            },
            Itemgroup: function () {
                _this.Itemgroupextend = !_this.Itemgroupextend;
            },
            orderfiltering: function () {
                _this.visible = !_this.visible;
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            onSelectOrderTypeCode: function (orgId) {
                this.filterForm = __assign({}, this.filterForm, { orgId: orgId, pageNo: 1 });
                this.headerTabList[0].selectValue = orgId;
                wepy_redux_1.getStore().dispatch({ type: order_2.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetfiterOrder();
            },
            onSelectStatus: function (status) {
                this.filterForm = __assign({}, this.filterForm, { status: status, pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_2.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetfiterOrder();
            },
            onSelectSOStatus: function (status) {
                this.filterForm = __assign({}, this.filterForm, { status: status, pageNo: 1 });
                this.headerTabList[1].selectValue = status;
                wepy_redux_1.getStore().dispatch({ type: order_2.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetfiterOrder();
            },
            onSelectOrg: function (org) {
                var key = org.key, value = org.value;
                if (this.filterForm.orgId === key) {
                    this.filterForm = __assign({}, this.filterForm, { orgId: '' });
                    this.filterFormExtra = __assign({}, this.filterFormExtra, { orgName: '' });
                    return;
                }
                this.filterForm = __assign({}, this.filterForm, { orgId: key });
                this.filterFormExtra = __assign({}, this.filterFormExtra, { orgName: value });
                this.agentPopup = false;
            },
            onSelectmatkl: function (matkl) {
                var key = matkl.key, value = matkl.value;
                if (this.filterForm.matklId === key) {
                    this.filterForm = __assign({}, this.filterForm, { matklId: '' });
                    this.filterFormExtra = __assign({}, this.filterFormExtra, { matklName: '' });
                    return;
                }
                this.filterForm = __assign({}, this.filterForm, { matklId: key });
                this.filterFormExtra = __assign({}, this.filterFormExtra, { matklName: value });
            },
            onZzprdmodelChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { zzprdmodel: e.detail });
            },
            onOrderCodeChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { returnOrderCode: e.detail });
            },
            onOrderWarehouse: function (e) {
                var _this = this;
                // this.filterForm = { ...this.filterForm, Warehouse: e.detail }
                // 调接口  如果接口列表不为空的话  this.viewShowed = true e.detail是模糊查询参数
                // console.log('e.detail',e.detail)
                var that = this;
                var data = { term: e.detail };
                if (e.detail) {
                    returngoods_1.getFiterWarehouse(data, function (res) {
                        var _a;
                        // console.log(res)
                        if (res.data.length > 0) {
                            var arrList = [];
                            for (var i in res.data) {
                                var j = {};
                                j.name = res.data[i];
                                arrList.push(j);
                            }
                            // console.log(arrList)
                            (_a = that.companyList).push.apply(_a, arrList);
                            // debugger
                            that.viewShowed = true;
                            that.$apply();
                        }
                        else {
                            _this.filterForm.returnWarehouse = e.detail;
                            _this.companyList = [];
                            that.viewShowed = false;
                            that.$apply();
                        }
                        // if (res.data.result && res.data.result.items && res.data.result.items.length > 0) {
                        //   this.companyList = []
                        //   that.companyList.push(...res.data.result.items)
                        //   that.viewShowed = true
                        //   that.$apply()
                        // } else {
                        //   this.companyList = []
                        //   that.viewShowed = false
                        //   that.$apply()
                        // }
                    });
                }
                else {
                    that.viewShowed = false;
                    this.filterForm.returnWarehouse = '';
                }
            },
            onToggleTimeFrame: function () {
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            onSelectTimeFrame: function (timeFrame) {
                this.filterForm = __assign({}, this.filterForm, { timeFrame: timeFrame });
            },
            onSubmitFilterForm: function () {
                this.filterForm = __assign({}, this.filterForm, { pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_2.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.myGetfiterOrder();
                this.methods.orderfiltering();
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, startOrderDate = _a.startOrderDate, endOrderDate = _a.endOrderDate, sapBeginDate = _a.sapBeginDate, sapEndDate = _a.sapEndDate, agentCheckStart = _a.agentCheckStart, agentCheckEnd = _a.agentCheckEnd;
                var _b = e.target.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = startOrderDate;
                    end = endOrderDate;
                }
                if (type === 'agent') {
                    begin = agentCheckStart;
                    end = agentCheckEnd;
                }
                if (type === 'sapDate') {
                    begin = sapBeginDate;
                    end = sapEndDate;
                }
                if (name.indexOf('beginDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('endDate') > -1) {
                    this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                }
                if (name.indexOf('agent') > -1) {
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
                // debugger
                var totalPages = this.returnGoodLength;
                if (totalPages > this.filterForm.pageNo) {
                    // debugger
                    this.filterForm = __assign({}, this.filterForm, { pageNo: this.filterForm.pageNo + 1 });
                    this.myGetOrderList();
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    //  状态筛选条件
    Filter.prototype.getFiterStatus = function () {
        var _this = this;
        this.methods.getFiterStatusList().then(function (res) {
            // debugger
            // console.log('res,',res.payload)
            var newArr = [];
            for (var key in res.payload) {
                newArr.push({
                    id: key,
                    name: res.payload[key]
                });
            }
            // console.log(newArr);
            _this.StatusList = newArr;
        });
    };
    Filter.prototype.myGetOrderList = function () {
        var _this = this;
        this.methods.getReturnGoods(this.filterForm).then(function (res) {
            _this.returnGoodLength = res.payload.totalPages;
            // console.log('获取数据',res);
            // this.returnGoodsList =  res.payload.list
            _this.returnGoodsList = _this.returnGoodsList.concat(res.payload.list);
            _this.returnGoodsList.forEach(function (item) {
                // console.log('cosnloe',item)
                // debugger
                item.itemInfoList.forEach(function (goods) {
                    if (goods.image) {
                        // debugger
                        var imgs = goods.image.split('/');
                        goods.image = index_2.formatImg({
                            format: imgs[2],
                            name: imgs[3],
                            materialId: imgs[0],
                            itemId: imgs[1]
                        });
                    }
                    // console.log('goods.image',goods.image);
                    if (goods.defaultImage) {
                        var imgs = goods.defaultImage.split('/');
                        goods.defaultImage = index_2.formatImg({
                            name: imgs[imgs.length - 1]
                        });
                    }
                });
            });
            _this.$apply();
        });
    };
    Filter.prototype.myGetfiterOrder = function () {
        var _this = this;
        this.methods.getReturnGoods(this.filterForm).then(function (res) {
            _this.returnGoodLength = res.payload.totalPages;
            // console.log('获取数据',res);
            // this.returnGoodsList =  res.payload.list
            _this.returnGoodsList = res.payload.list;
            _this.returnGoodsList.forEach(function (item) {
                // console.log('cosnloe',item)
                // debugger
                item.itemInfoList.forEach(function (goods) {
                    if (goods.image) {
                        // debugger
                        var imgs = goods.image.split('/');
                        goods.image = index_2.formatImg({
                            format: imgs[2],
                            name: imgs[3],
                            materialId: imgs[0],
                            itemId: imgs[1]
                        });
                    }
                    // console.log('goods.image',goods.image);
                    if (goods.defaultImage) {
                        var imgs = goods.defaultImage.split('/');
                        goods.defaultImage = index_2.formatImg({
                            name: imgs[imgs.length - 1]
                        });
                    }
                });
            });
            _this.$apply();
        });
    };
    Filter.prototype.onShow = function () {
        // const now = new Date()
        // const month = now.getMonth() + 1
        // const day = now.getDate()
        // this.filterForm = {
        //   ...this.filterForm,
        //   // beginDate: `${now.getFullYear()}-01-01`,
        //   startOrderDate: getLastMonthYesterday(),
        //   endOrderDate: `${now.getFullYear()}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`
        // }
        this.myGetOrderList();
        // 销售组织筛选条件
        this.methods.getOrderFilter({ type: 1 });
        //  状态筛选条件
        this.getFiterStatus();
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            filter: function (_a) {
                var order = _a.order;
                return order.filter;
            },
        }, {
            getReturnGoods: returngoods_1.getReturnGoods,
            getOrderFilter: order_1.getOrderFilter,
            getFiterWarehouse: returngoods_1.getFiterWarehouse,
            getFiterStatusList: returngoods_1.getFiterStatusList
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/warehouse-returnGoods/index'));

