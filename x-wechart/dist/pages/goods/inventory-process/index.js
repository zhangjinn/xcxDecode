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
var order_1 = require('./../../../store/actions/order.js');
var dmsoutwarehouse_1 = require('./../../../store/actions/dmsoutwarehouse.js');
var index_1 = require('./../../../utils/index.js');
var request_1 = require('./../../../utils/request.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_2 = require('./../../../components/empty-data-type/index.js');
var index_3 = require('./../../components/header-tab/index.js');
var order_2 = require('./../../../store/actions/order.js');
var dmsorder_1 = require('./../../../store/actions/dmsorder.js');
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var order_3 = require('./../../../store/types/order.js');
/*const defaultFilterForm = {
  _loading: true,
  logLsit :[],
  agentCheckStart: '',
  agentCheckEnd: '',
  pageNo: 1,
  orderTypeCode: '',
  status: '',
  sapOrderStatus: '',
  zzprdmodel: '',
  orgId: '',
  matklId: '',
  beginDate: '',
  endDate: '',
  timeFrame: '',
  // sapBeginDate: '', 不用了
  // sapEndDate: '',
  agentId: '',
  trans: '',
  directBuy: '',
  purchaseTypeId: '',




  //库存流水
  orderCode: '',//产品型号
  orderColor: '',//产品颜色
  orderId: '',//单据编号
  ckmcId: '',
  kcztId: '',
  bclxId: '',
  swlxId: '',
  gysId: '',
  xszzId: '',
  czryId: '',
  sjlyId: '',
  ckmcPopName: '全部',
  kcztPopName: '全部',
  bclxPopName: '全部',
  swlxPopName: '全部',
  gysPopName: '全部',
  xszzPopName: '全部',
  czryPopName: '全部',
  sjlyPopName: '全部',
  ckmc: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  kczt: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  bclx: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  swlx: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  gys: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  xszz: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  czry: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ],
  sjly: [
    {
      key: 0,
      value: '全部'
    },
    {
      key: 1,
      value: '项目一'
    },
    {
      key: 2,
      value: '项目二'
    }
  ]
}*/
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '库存流水',
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
            },
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {}, "headerTab": { "xmlns:v-bind": "", "v-bind:tabList.sync": "headerTabList", "xmlns:v-on": "" } };
        _this.$events = { "headerTab": { "v-on:onTabChange": "onTabChange", "v-on:onSideFilter": "orderfiltering" } };
        _this.components = {
            emptyDataType: index_2.default,
            headerTab: index_3.default,
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
            filterStr: '',
            agentPopupName: '全部',
            deliveryPopupName: '全部',
            purchasePopupName: '全部',
            currentDateName: '',
            cancelOrderPopup: false,
            cancelOrderId: '',
            continuePayPopup: false,
            continuePayId: '',
            scrollTop: 0,
            filterForm: {
                productCode: '',
                productName: '',
                model: '',
                colour: '',
                warehouseId: '',
                invStatusId: '',
                invStatusType: '',
                supplierName: '',
                orgName: '',
                stvNum: '',
                transactionType: '',
                operator: '',
                dataSource: '',
                startDate: '',
                endDate: '',
                sapBeginDate: '',
                sapEndDate: '',
                gicWarehouseType: '',
                pageNo: 1
            },
            filterFormExtra: {
                orgName: '',
                matklName: '',
                invStatus: '',
                warehouse: '',
                invStatusTypeName: '',
                supperlierName: '',
                transactionTypeName: '',
                timeFrame: ''
            },
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            baseUrl: request_1.baseUrl,
            headerTabList: [
                { name: '仓库', type: 'warehouseName', selectValue: '' },
                { name: '事务类型', type: 'transtype', selectValue: '' },
                { name: '单据日期', type: 'date', selectValue: '' },
            ],
        };
        // 页面内交互写在methods里
        _this.methods = {
            goMe: function () {
                wx.switchTab({
                    url: '/pages/main/me/index'
                });
            },
            onScroll: function (event) {
                if (event.detail.scrollTop >= 350) {
                    if (_this.scrollTop === 0) {
                        _this.scrollTop = event.detail.scrollTop;
                    }
                }
            },
            onCheckDirectOrders: function () {
                if (_this.filterForm.directBuy == '') {
                    _this.filterForm.directBuy = 1;
                }
                else {
                    _this.filterForm.directBuy = '';
                }
                _this.$apply();
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
                    if (item.code == key) {
                        _this.deliveryPopupName = item.name;
                        _this.filterForm = __assign({}, _this.filterForm, { trans: item.code });
                    }
                }, _this.deliveryMethod);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectPurchaseType: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.key == key) {
                        _this.purchasePopupName = item.value;
                        _this.filterForm = __assign({}, _this.filterForm, { purchaseTypeId: item.key });
                    }
                }, _this.purchaseType);
                _this.agentPopup = false;
                _this.$apply();
            },
            //***************************库存流水 侧边筛选 start***************************//
            //库存流水 侧边筛选 产品型号文本
            onOrderCodeChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { model: e.detail });
            },
            //库存流水 侧边筛选 产品颜色文本
            onOrderColorChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { colour: e.detail });
            },
            //库存流水 侧边筛选 单据编号文本
            onOrderIdChange: function (e) {
                this.filterForm = __assign({}, this.filterForm, { stvNum: e.detail });
            },
            // 库存流水 下拉选中 仓库名称为例
            selectChangewarehouse: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.id == key) {
                        _this.filterFormExtra.warehouse = item.value;
                        _this.filterForm.warehouseId = key;
                    }
                }, _this.warehouseList);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectInvStatusType: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.id == key) {
                        _this.filterFormExtra.invStatusTypeName = item.name;
                        _this.filterForm.invStatusType = key;
                    }
                }, _this.invStatusTypeList);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectSupperlier: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.id == key) {
                        _this.filterFormExtra.supperlierName = item.value;
                        _this.filterForm.supplierName = item.value;
                    }
                }, _this.supperlierList);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectChangeInvStatus: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.id == key) {
                        _this.filterFormExtra.invStatus = item.value;
                        _this.filterForm.invStatusId = item.id;
                    }
                }, _this.invStatusList);
                _this.agentPopup = false;
                _this.$apply();
            },
            selectTransaction: function (key) {
                ramda_1.forEach(function (item) {
                    if (item.id == key) {
                        _this.filterFormExtra.transactionTypeName = item.value;
                        _this.filterForm.transactionType = item.id;
                    }
                }, _this.transactionType);
                _this.agentPopup = false;
                _this.$apply();
            },
            //库存流水 侧边筛选下拉选
            selectagentPopup: function (e) {
                if (e == 'ckmc') {
                    _this.popupTitle = '仓库名称';
                }
                else if (e == 'kczt') {
                    _this.popupTitle = '质量等级';
                }
                else if (e == 'bclx') {
                    _this.popupTitle = '补差类型';
                }
                else if (e == 'swlx') {
                    _this.popupTitle = '事务类型';
                }
                else if (e == 'gys') {
                    _this.popupTitle = '供应商';
                }
                else if (e == 'xszz') {
                    _this.popupTitle = '销售组织';
                }
                else if (e == 'czry') {
                    _this.popupTitle = '操作人员';
                }
                else if (e == 'sjly') {
                    _this.popupTitle = '数据来源';
                }
                _this.agentPopup = !_this.agentPopup;
            },
            onTabChange: function (tabItem) {
                var name = '';
                if (tabItem) {
                    name = tabItem.type;
                }
                if (name == 'date') {
                    _this.methods.openCalendarDj();
                }
                else {
                    _this.methods.touchOrderSFilter(name);
                }
            },
            //库存流水 主要三种筛选条件点击
            touchOrderSFilter: function (name) {
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
                if (['orderType', 'transtype', 'auditStatus'].indexOf(name) > -1) {
                    _this.CurrentOrderSFilterName = name;
                    return;
                }
                _this.OrderSFilterVisible = false;
                _this.CurrentOrderSFilterName = '';
            },
            // 单据时间变更事件
            onToggleTimeFrame: function () {
                this.timeFrameVisible = !this.timeFrameVisible;
            },
            // 筛选重置
            onResetFilterForm: function () {
            },
            //库存流水 左侧筛选 单据日期
            openCalendarDj: function () {
                // const minDate = '1970-01-01'
                var maxDate = '9999-12-31';
                var startDate = _this.filterForm.startDate;
                _this.currentDateName = 'djDate';
                _this.$wxpage.calendar.enableArea([startDate, maxDate]);
                _this.calendarShow = true;
            },
            //单据展开
            isItemShowFun: function (item) {
                // debugger
                for (var key in this.logList.data) {
                    if (item.id == this.logList.data[key].id) {
                        this.logList.data[key].isShowActive = !this.logList.data[key].isShowActive;
                    }
                    console.log(this.logList);
                    this.$apply();
                }
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
            onSelectOrderTypeCode: function (gicWarehouseType) {
                this.filterForm = __assign({}, this.filterForm, { gicWarehouseType: gicWarehouseType, pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectStatus: function (status) {
                this.filterForm = __assign({}, this.filterForm, { status: status, pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectTransa: function (transactionType, transtypeName) {
                console.log("事务相关：id,value", transactionType, transtypeName);
                this.filterForm = __assign({}, this.filterForm, { transactionType: transactionType, pageNo: 1 });
                this.filterFormExtra.transactionTypeName = transtypeName;
                this.headerTabList[1].selectValue = transactionType;
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            //仓库选择
            onSelectWarehouseName: function (warehouseId, warehouseName) {
                this.warehouseName = warehouseName;
                this.filterForm = __assign({}, this.filterForm, { warehouseId: warehouseId, pageNo: 1 });
                this.headerTabList[0].selectValue = warehouseId;
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
            },
            onSelectSOStatus: function (sapOrderStatus) {
                this.filterForm = __assign({}, this.filterForm, { sapOrderStatus: sapOrderStatus, pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.methods.touchOrderSFilter();
                this.myGetOrderList();
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
            onSelectTimeFrame: function (timeFrame) {
                var type = timeFrame;
                var now = new Date();
                var month = now.getMonth() + 1;
                now.setMonth(month);
                var day = now.getDate();
                console.log("now,month,day:", now, month, day);
                if ('1' == type) { //最近一个月
                    this.filterForm = __assign({}, this.filterForm, { startDate: index_1.addMonth(now, -1), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
                    console.log("startDate,enddate:", this.filterForm.startDate, this.filterForm.endDate);
                }
                if ('3' == type) { //最近3个月
                    this.filterForm = __assign({}, this.filterForm, { startDate: index_1.addMonth(now, -3), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
                }
                if ('6' == type) { //最近6个月
                    this.filterForm = __assign({}, this.filterForm, { startDate: index_1.addMonth(now, -6), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
                }
                if ('7' == type) { //最近一个周
                    this.filterForm = __assign({}, this.filterForm, { startDate: index_1.addDate(now, -7), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
                }
                this.filterFormExtra.timeFrame = type;
            },
            onSubmitFilterForm: function () {
                this.filterForm = __assign({}, this.filterForm, { pageNo: 1 });
                wepy_redux_1.getStore().dispatch({ type: order_3.RESET_ORDER_LIST, payload: [] });
                this.scrollTop = 0;
                this.myGetOrderList();
                this.methods.orderfiltering();
            },
            // 选择日期
            // openCalendar(e) {
            //   debugger
            //   console.log(e)
            //   const minDate = '1970-01-01'
            //   const maxDate = '9999-12-31'
            //   const { startDate, endDate, sapBeginDate, sapEndDate, agentCheckStart, agentCheckEnd } = this.filterForm;
            //   const { name, type } = e.target.dataset
            //   this.currentDateName = name
            //   let begin, end;
            //   if(type === 'date') {
            //     begin = startDate
            //     end = endDate
            //   }
            //   if(type === 'agent') {
            //     begin = agentCheckStart
            //     end = agentCheckEnd
            //   }
            //   if(type === 'sapDate') {
            //     begin = sapBeginDate
            //     end = sapEndDate
            //   }
            //   if(name.indexOf('beginDate') > -1) {
            //     this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
            //   }
            //   if(name.indexOf('endDate') > -1) {
            //     this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
            //   }
            //   if(name.indexOf('agent') > -1) {
            //     this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
            //   }
            //   this.calendarShow = true;
            // },
            openCalendar: function (e) {
                // debugger
                console.log(e);
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.filterForm, startDate = _a.startDate, endDate = _a.endDate, sapBeginDate = _a.sapBeginDate, sapEndDate = _a.sapEndDate;
                // const { name, type } = e.target.dataset
                var _b = e.currentTarget.dataset, name = _b.name, type = _b.type;
                this.currentDateName = name;
                var begin, end;
                if (type === 'date') {
                    begin = startDate;
                    end = endDate;
                }
                if (type === 'sapDate') {
                    begin = sapBeginDate;
                    end = sapEndDate;
                }
                if (name.indexOf('startDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
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
                // this.filterForm.startDate = day
                // this.filterForm.endDate = day
                this.filterForm = __assign({}, this.filterForm, (_a = {}, _a[this.currentDateName] = day, _a));
                if (this.currentDateName == 'startDate' || this.currentDateName == 'endDate') {
                    this.filterFormExtra = __assign({}, this.filterFormExtra, { timeFrame: '' });
                }
                this.calendarShow = false;
                this.myGetOrderList();
                this.$apply();
            },
            onGetOrderListNext: function () {
                var totalPage = this.logPage.totalPage;
                console.log("----->获取下一页，", totalPage, this.filterForm.pageNo);
                if (totalPage > this.filterForm.pageNo) {
                    this.filterForm = __assign({}, this.filterForm, { pageNo: this.filterForm.pageNo + 1 });
                    this.myGetOrderList();
                }
            }
            // takeAgainOrder(id: string) {
            //   Toast.loading({
            //     message: '下单中....',
            //     duration: 0,
            //   });
            //   this.methods.againCommonOrder({ id } , (res: any) => {
            //     const { data } = res;
            //     if (data && data.cartOrder) {
            //       Toast.clear();
            //       wx.navigateTo({
            //         url: '/pages/goods/order/index?type=again',
            //       });
            //     } else {
            //       Toast.fail(data.msg || '结算失败');
            //     }
            //   });
            // },
            // //代理商取消订单
            // canceleOrder(id: string) {
            //   Toast.loading({
            //     message: '取消中....',
            //     duration: 0,
            //   });
            //   this.methods.agentCanceleOrder({ id } , (res: any) => {
            //     const { data } = res;
            //     if (data && data.code === '0') {
            //       Toast.clear();
            //       wx.navigateTo({
            //         url: '/pages/goods/order/index?type=again',
            //       });
            //     } else {
            //       Toast.fail(data.msg || '取消失败');
            //     }
            //   });
            //
            // }
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    Filter.prototype.myGetOrderList = function () {
        // let cisCode: wepy.$instance.globalData.cisCode;
        this.methods.findAllInventoryLog(wepy_1.default.$instance.globalData.cisCode, this.filterForm, this.filterForm.pageNo);
    };
    Filter.prototype.onLoad = function () {
        this.methods.getInvStatusList();
        this.methods.getOutWarehouseList();
        this.methods.getInvStatusType();
        this.methods.getSupperlierList();
        this.methods.getTransactionType();
        // this.methods.getCustomer({ filterStr: (this.data.filterStr || '').trim() })
        this.methods.getOrderDeliveryMethod({ type: '' });
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        this.filterForm = __assign({}, this.filterForm, { 
            // beginDate: `${now.getFullYear()}-01-01`,
            startDate: index_1.getLastMonthYesterday(), endDate: now.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) });
        this.myGetOrderList();
        this.methods.getOrderFilter({ type: 1 });
    };
    Filter = __decorate([
        wepy_redux_1.connect({
            logList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.inventoryLogList;
            },
            logPage: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.logPage;
            },
            deliveryMethod: function (_a) {
                var order = _a.order;
                return order.deliveryMethod;
            },
            mixinCurrentUser: function (_a) {
                var user = _a.user;
                return user.info || {};
            },
            filter: function (_a) {
                var order = _a.order;
                return order.filter;
            },
            invStatusList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.invStatusList;
            },
            warehouseList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.warehouseList;
            },
            invStatusTypeList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.invStatusType;
            },
            orgList: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.customerInfos.orgList;
            },
            supperlierList: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.supperlierList;
            },
            transactionType: function (_a) {
                var dmsoutwarehouse = _a.dmsoutwarehouse;
                return dmsoutwarehouse.transactionType;
            }
        }, {
            getOrderList: order_1.getOrderList,
            getOrderFilter: order_1.getOrderFilter,
            againCommonOrder: order_2.againCommonOrder,
            getOrderDeliveryMethod: order_1.getOrderDeliveryMethod,
            agentCanceleOrder: order_2.agentCanceleOrder,
            findAllInventoryLog: dmsoutwarehouse_1.findAllInventoryLog,
            getInvStatusList: dmsoutwarehouse_1.getInvStatusList,
            getOutWarehouseList: dmsoutwarehouse_1.getOutWarehouseList,
            getInvStatusType: dmsorder_1.getInvStatusType,
            getNormalSalesOrderCustomerInfo: dmsorder_1.getNormalSalesOrderCustomerInfo,
            getSupperlierList: dmsoutwarehouse_1.getSupperlierList,
            getTransactionType: dmsoutwarehouse_1.getTransactionType
        })
    ], Filter);
    return Filter;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Filter , 'pages/goods/inventory-process/index'));

