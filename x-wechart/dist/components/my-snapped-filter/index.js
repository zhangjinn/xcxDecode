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
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
var user_org_matkl_1 = require('./../../mixins/user-org-matkl.js');
var channel_retail_order_1 = require('./../../mixins/channel-retail-order.js');
var index_1 = require('./../../utils/index.js');
var wepy_redux_1 = require('./../../npm/wepy-redux/lib/index.js');
var dmsorder_1 = require('./../../store/types/dmsorder.js');
var system_1 = require('./../../mixins/system.js');
var SnappedFilter = /** @class */ (function (_super) {
    __extends(SnappedFilter, _super);
    function SnappedFilter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.props = {
            currentPage: String,
        };
        _this.data = {
            filterVisible: false,
            chooseOrg: {
                id: '',
                name: '全部'
            },
            chooseMatkl: {
                id: '',
                name: '全部'
            },
            chooseType: '',
            chooseVisible: false,
            compareInfo: {
                id: '',
                name: ''
            },
            chooseTitle: '',
            chooseList: [],
            calendarShow: false,
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            form: {
                status: '',
                startDate: '',
                endDate: '',
                activityName: '',
                productModel: '',
            }
        };
        // 打开日历类型| 开始时间.结束时间
        _this.openCalendarType = '';
        _this.mixins = [user_org_matkl_1.default, channel_retail_order_1.default, system_1.default];
        _this.methods = {
            closeChoose: function () {
                _this.chooseVisible = false;
            },
            openChoose: function (type) {
                _this.chooseType = type;
                switch (type) {
                    case 'org':
                        var _a = _this.data, organizationList = _a.organizationList, chooseOrg = _a.chooseOrg;
                        _this.chooseList = organizationList;
                        // 只有全部，没有供应商
                        if (organizationList.length <= 1) {
                            return;
                        }
                        _this.compareInfo = chooseOrg;
                        _this.chooseTitle = '供应商';
                        break;
                    case 'matkl':
                        var _b = _this.data, chooseOrg = _b.chooseOrg, orgMatkl_1 = _b.orgMatkl;
                        // 没有产品组列表，不显示
                        if (!orgMatkl_1["_" + chooseOrg.id]) {
                            return;
                        }
                        _this.chooseTitle = '物料组';
                        _this.chooseList = orgMatkl_1["_" + chooseOrg.id];
                        _this.compareInfo = _this.data.chooseMatkl;
                        break;
                    default:
                }
                _this.chooseVisible = true;
            },
            onSelect: function (item) {
                var chooseType = _this.data.chooseType;
                switch (chooseType) {
                    case 'org':
                        _this.chooseOrg = item;
                        _this.chooseMatkl = {
                            id: '',
                            name: '全部'
                        };
                        break;
                    case 'matkl':
                        _this.chooseMatkl = item;
                        break;
                    default:
                }
                _this.chooseVisible = false;
            },
            closeDrawer: function () {
                _this.filterVisible = false;
                if (_this.data.chooseVisible) {
                    _this.chooseVisible = false;
                }
            },
            openDrawer: function () {
                _this.filterVisible = true;
            },
            // 选择日期
            openCalendar: function (e) {
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _a = this.form, startDate = _a.startDate, endDate = _a.endDate;
                var name = e.target.dataset.name;
                this.openCalendarType = name;
                if (name === 'startDate') {
                    this.$wxpage.calendar.enableArea([minDate, endDate ? endDate : maxDate]);
                }
                if (name === 'endDate') {
                    this.$wxpage.calendar.enableArea([startDate ? startDate : minDate, maxDate]);
                }
                this.calendarShow = true;
            },
            closeCalendar: function () {
                this.calendarShow = false;
            },
            clearCalendar: function (name) {
                var _a;
                this.form = __assign({}, this.form, (_a = {}, _a[name] = '', _a));
            },
            chooseDay: function (evt) {
                var _a;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.form = __assign({}, this.form, (_a = {}, _a[this.openCalendarType] = day, _a));
                this.calendarShow = false;
            },
            onZzprdmodelChange: function (e) {
                _this.form = __assign({}, _this.form, { activityName: e.detail });
            },
            onModelChange: function (e) {
                _this.form = __assign({}, _this.form, { productModel: e.detail });
            },
            onCustomerNameChange: function (e) {
                _this.form = __assign({}, _this.form, { custName: e.detail });
            },
            chooseStatus: function (status) {
                if (_this.form.status === status) {
                    status = '';
                }
                _this.form = __assign({}, _this.form, { status: status });
            },
            resetSearch: function () {
                _this.chooseMatkl = {
                    id: '',
                    name: '全部'
                };
                _this.chooseOrg = {
                    id: '',
                    name: '全部'
                };
                _this.form = {
                    status: '',
                    startDate: '',
                    endDate: '',
                    activityName: '',
                    productModel: '',
                    custName: ''
                };
                var store = wepy_redux_1.getStore();
                store.dispatch({
                    type: dmsorder_1.DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
                });
            },
            confirmSearch: function () {
                var chooseCustomerInfo = _this.chooseCustomerInfo;
                var _a = _this.data, chooseMatkl = _a.chooseMatkl, chooseOrg = _a.chooseOrg, form = _a.form;
                var filterForm = __assign({}, form);
                if (filterForm.status === '') {
                    delete filterForm['status'];
                }
                _this.$emit('submitFilter', __assign({}, filterForm, { custName: chooseCustomerInfo.customerCode, orgId: chooseOrg.id, matkl: chooseMatkl.id }));
                _this.filterVisible = false;
            }
        };
        return _this;
    }
    SnappedFilter = __decorate([
        wepy_redux_1.connect({
            chooseCustomerInfo: function (_a) {
                var dmsorder = _a.dmsorder;
                return dmsorder.chooseCustomerInfo;
            },
        }, {})
    ], SnappedFilter);
    return SnappedFilter;
}(wepy_1.default.component));
exports.default = SnappedFilter;
