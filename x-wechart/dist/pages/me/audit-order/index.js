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
var ramda_1 = require('./../../../npm/ramda/src/index.js');
var audit_order_1 = require('./../../../store/actions/audit-order.js');
var order_1 = require('./../../../store/actions/order.js');
var request_1 = require('./../../../utils/request.js');
var common_1 = require('./../../../mixins/common.js');
var toast_1 = require('./../../../components/vant/toast/toast.js');
var dialog_1 = require('./../../../components/vant/dialog/dialog.js');
var index_1 = require('./../../../utils/index.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
var index_2 = require('./../../../components/empty-data-type/index.js');
var AuditOrder = /** @class */ (function (_super) {
    __extends(AuditOrder, _super);
    function AuditOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            navigationBarTitleText: '直采订单审核',
            usingComponents: {
                'van-button': '../../../components/vant/button/index',
                'van-field': '../../../components/vant/field/index',
                'van-icon': '../../../components/vant/icon/index',
                'van-checkbox': '../../../components/vant/checkbox/index',
                'van-toast': '../../../components/vant/toast/index',
                'van-dialog': '../../../components/vant/dialog/index',
                'van-popup': '../../../components/vant/popup/index',
                'van-img': '../../../components/img/index',
                'calendar': '../../../components/calendar/index',
            },
            enablePullDownRefresh: true,
        };
        _this.$repeat = {};
        _this.$props = { "emptyDataType": {} };
        _this.$events = {};
        _this.components = {
            emptyDataType: index_2.default,
        };
        _this.mixins = [common_1.default];
        _this.params = {
            pageSize: 10,
            pageNo: 1,
            status: 'AGENTUNCHKED',
            type: 2,
            directBuy: 1,
        };
        _this.isView = false;
        _this.remark = '';
        _this.typeName = 'agentCheckStart';
        _this.data = {
            filterType: '',
            visible: false,
            viewVisible: false,
            chooses: [],
            totalPages: 0,
            rejectShow: false,
            // 加载数据中
            loading: false,
            // 是否全部加载完毕
            complete: false,
            // 过滤条件
            filterForm: {},
            matklList: [],
            matk: {},
            orgList: [],
            org: {},
            fxDict: [],
            fx: {},
            tranList: [],
            tran: {},
            agentCheckStart: '',
            agentCheckEnd: '',
            calendarShow: false,
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            timeFrameVisible: false,
            timeFrame: '',
            zzprdmodel: '',
            orderCode: '',
        };
        // 页面内交互写在methods里
        _this.methods = {
            closeFilter: function () {
                _this.visible = false;
            },
            onModelChange: function (_a) {
                var detail = _a.detail;
                _this.zzprdmodel = detail;
            },
            onOrderChange: function (_a) {
                var detail = _a.detail;
                _this.orderCode = detail;
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var name = e.target.dataset.name;
                var begin = _this.agentCheckStart;
                var end = _this.agentCheckEnd;
                _this.typeName = name;
                if (name.indexOf('agentCheckStart') > -1) {
                    _this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('agentCheckEnd') > -1) {
                    _this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                }
                _this.calendarShow = true;
            },
            clearCalendar: function (name) {
                this[name] = '';
            },
            closeCalendar: function () {
                this.calendarShow = false;
            },
            chooseDay: function (evt) {
                var _a = evt.detail, year = _a.year, month = _a.month, day = _a.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this[this.typeName] = day;
                this.calendarShow = false;
                this.timeFrame = '';
            },
            onSelectTimeFrame: function (timeFrame) {
                this.timeFrame = timeFrame;
                this.viewVisible = false;
                this.agentCheckStart = '';
                this.agentCheckEnd = '';
            },
            onToggleTimeFrame: function () {
                this.viewVisible = !this.viewVisible;
            },
            cancelFilter: function () {
                _this.viewVisible = false;
            },
            chooseFilter: function (type) {
                _this.viewVisible = true;
                if (type === 'queryMatkl') {
                    _this.getQueryMatkl();
                }
                else if (type === 'queryOrg') {
                    _this.getQueryOrg();
                }
                else if (type === 'queryFxDict') {
                    _this.getFxDict();
                }
                else if (type === 'getTransList') {
                    _this.getTransList();
                }
                else if (type === 'timeFrame') {
                    _this.filterType = '单据日期';
                }
            },
            chooseMatk: function (item) {
                _this.viewVisible = false;
                _this.matk = item;
            },
            chooseOrg: function (item) {
                _this.viewVisible = false;
                _this.org = item;
            },
            chooseFx: function (item) {
                _this.viewVisible = false;
                _this.fx = item;
            },
            chooseTran: function (item) {
                _this.viewVisible = false;
                _this.tran = item;
            },
            onRemarkChange: function (_a) {
                var detail = _a.detail;
                _this.remark = ramda_1.trim(detail.value);
            },
            rejectAll: function () {
                if (_this.chooses.length === 0) {
                    toast_1.default('请至少选择一个订单');
                    return;
                }
                _this.rejectShow = true;
            },
            closeRejectDialog: function () {
                _this.rejectShow = false;
            },
            confirmReject: function () {
                _this.rejectShow = false;
                if (!_this.remark) {
                    toast_1.default('请输入驳回原因');
                    return;
                }
                toast_1.default.loading({ forbidClick: true, message: '处理中...', duration: 0 });
                request_1.request({
                    api: 'order/disAgreeOrders.nd',
                    method: 'POST',
                    data: {
                        ids: ramda_1.join(',', _this.chooses),
                        remark: _this.remark,
                    },
                    callback: function (res) {
                        var _a = res.data, msg = _a.msg, code = _a.code;
                        toast_1.default.clear();
                        if (code === 0) {
                            _this.methods.search(_this.params);
                        }
                        else {
                            toast_1.default.fail(msg || '批量审核失败');
                        }
                    },
                });
            },
            acceptAll: function () {
                if (_this.chooses.length === 0) {
                    toast_1.default('请至少选择一个订单');
                    return;
                }
                dialog_1.default.confirm({
                    title: '确认批量审核通过？',
                    message: '不可撤销此操作',
                }).then(function () {
                    toast_1.default.loading({ forbidClick: true, message: '处理中...', duration: 0 });
                    request_1.request({
                        api: 'order/agreeOrders.nd',
                        method: 'POST',
                        data: {
                            ids: ramda_1.join(',', _this.chooses),
                            remark: '',
                        },
                        callback: function (res) {
                            var _a = res.data, msg = _a.msg, code = _a.code;
                            toast_1.default.clear();
                            if (code === 0) {
                                _this.methods.search(_this.params);
                            }
                            else {
                                toast_1.default.fail(msg || '批量审核失败');
                            }
                        },
                    });
                }).catch(function () {
                    // on cancel
                });
            },
            checkAll: function () {
                if (_this.chooses.length === _this.items.length) {
                    _this.chooses = [];
                }
                else {
                    _this.chooses = ramda_1.map(function (_a) {
                        var id = _a.id;
                        return id;
                    }, _this.items);
                }
            },
            chooseItem: function (id) {
                var index = ramda_1.indexOf(id, _this.chooses);
                if (index >= 0) {
                    _this.chooses = ramda_1.remove(index, 1, _this.chooses);
                }
                else {
                    _this.chooses = ramda_1.append(id, _this.chooses);
                }
            },
            onSearch: function (event) {
                var key = ramda_1.trim(event.detail || '');
                if (key) {
                    _this.params.searchTerm = key;
                }
                else {
                    delete _this.params.searchTerm;
                }
                _this.methods.search(_this.params);
            },
            // 过滤数据
            search: function (params) {
                toast_1.default.loading({ forbidClick: true, message: '加载中...', duration: 0 });
                _this.methods.getOrderList(params, function (res) {
                    // 接口返回 关闭对应状态
                    wx.stopPullDownRefresh();
                    toast_1.default.clear();
                    if (res && res.data && res.data.priceDelegateMessageList) {
                        var _a = res.data, orderHeaderList = _a.orderHeaderList, totalPages = _a.totalPages;
                        _this.complete = orderHeaderList.length === 0;
                        _this.totalPages = totalPages;
                    }
                });
            },
            toggleFilter: function () {
                _this.visible = !_this.visible;
            },
            onResetFilterForm: function () {
                var params = {
                    pageSize: 10,
                    pageNo: 1,
                    status: 'AGENTUNCHKED',
                    type: 2,
                    directBuy: 1,
                };
                _this.matk = {};
                _this.org = {};
                _this.fx = {};
                _this.tran = {};
                _this.agentCheckStart = '';
                _this.agentCheckEnd = '';
                _this.timeFrame = '';
                _this.zzprdmodel = '';
                _this.orderCode = '';
                _this.params = params;
                _this.visible = false;
                _this.methods.search(params);
            },
            onSubmitFilterForm: function () {
                var params = {
                    pageSize: 10,
                    pageNo: 1,
                    status: 'AGENTUNCHKED',
                    type: 2,
                    directBuy: 1,
                };
                if (!!_this.zzprdmodel) {
                    params['zzprdmodel'] = _this.zzprdmodel;
                }
                if (!!_this.orderCode) {
                    params['orderCode'] = _this.orderCode;
                }
                if (!!_this.matk.code) {
                    params['matklId'] = _this.matk.code;
                }
                if (!!_this.timeFrame) {
                    params['timeFrame'] = _this.timeFrame;
                }
                if (!!_this.agentCheckStart) {
                    params['beginDate'] = _this.agentCheckStart;
                }
                if (!!_this.agentCheckEnd) {
                    params['endDate'] = _this.agentCheckEnd;
                }
                // customerCode
                if (!!_this.fx.code) {
                    params['customerCode'] = _this.fx.code;
                }
                if (!!_this.org.code) {
                    params['fullName'] = _this.org.code;
                }
                if (!!_this.tran.code) {
                    params['trans'] = _this.tran.code;
                }
                _this.params = params;
                _this.visible = false;
                _this.methods.search(params);
            },
            onPullBottom: function () {
                var pageNo = this.params.pageNo;
                var index = pageNo + 1;
                if (!this.loading && !this.complete && pageNo < this.totalPages) {
                    this.loading = true;
                    this.params.pageNo = index;
                    this.methods.search(__assign({}, this.params, { pull: true }));
                }
            },
        };
        return _this;
    }
    /*  wxs =  */ /* {
       utils: utilsWxs,
     } */ ;
    AuditOrder.prototype.getQueryMatkl = function () {
        var _this = this;
        this.filterType = '物料组';
        if (this.matklList && this.matklList.length === 0) {
            request_1.request({
                api: 'comm/queryMatkl.nd',
                method: 'GET',
                callback: function (res) {
                    var matklList = res.data.matklList;
                    if (matklList && matklList.length > 0) {
                        _this.matklList = matklList;
                        _this.$apply();
                    }
                },
            });
        }
    };
    AuditOrder.prototype.getQueryOrg = function () {
        var _this = this;
        this.filterType = '供应商';
        if (this.orgList && this.orgList.length === 0) {
            request_1.request({
                api: 'comm/queryOrg.nd?type=2',
                method: 'GET',
                callback: function (res) {
                    var orgList = res.data.orgList;
                    if (orgList && orgList.length > 0) {
                        _this.orgList = orgList;
                        _this.$apply();
                    }
                },
            });
        }
    };
    AuditOrder.prototype.getFxDict = function () {
        var _this = this;
        this.filterType = '分销商';
        if (this.fxDict && this.fxDict.length === 0) {
            request_1.request({
                api: 'comm/fxDict.nd',
                method: 'GET',
                callback: function (res) {
                    var list = res.data.list;
                    if (list && list.length > 0) {
                        _this.fxDict = list;
                        _this.$apply();
                    }
                },
            });
        }
    };
    // 获取配送方式
    AuditOrder.prototype.getTransList = function () {
        var _this = this;
        this.filterType = '配送方式';
        if (this.tranList && this.tranList.length === 0) {
            request_1.request({
                api: 'comm/dict.nd?pid=50200&type=2',
                method: 'GET',
                callback: function (res) {
                    var list = res.data.list;
                    if (list && list.length > 0) {
                        _this.tranList = list;
                        _this.$apply();
                    }
                },
            });
        }
    };
    AuditOrder.prototype.onPullDownRefresh = function () {
        this.params = __assign({}, this.params, { pageNo: 1 });
        if (this.params.searchTerm) {
            delete this.params.searchTerm;
        }
        this.methods.search(__assign({}, this.params));
    };
    AuditOrder.prototype.onShow = function () {
        this.params = { pageSize: 10, pageNo: 1, type: 2, directBuy: 1, status: 'AGENTUNCHKED' };
        this.methods.search(this.params);
    };
    AuditOrder.prototype.onLoad = function () {
        this.getTransList();
        this.methods.getOrderFilter({ type: 1 });
    };
    AuditOrder = __decorate([
        wepy_redux_1.connect({
            items: function (_a) {
                var auditorder = _a.auditorder;
                return auditorder.items;
            },
            filter: function (_a) {
                var order = _a.order;
                return order.filter;
            },
        }, {
            getOrderList: audit_order_1.getOrderList,
            getOrderFilter: order_1.getOrderFilter,
        })
    ], AuditOrder);
    return AuditOrder;
}(wepy_1.default.page));

Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(AuditOrder , 'pages/me/audit-order/index'));

