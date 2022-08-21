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
var wepy_1 = require('./../../../npm/wepy/lib/wepy.js');
var index_1 = require('./../../../utils/index.js');
/* import utilsWxs from '../../../wxs/utils.wxs'; */
/**
* sideFilterForm入参格式参考
 formData: [
 { // 输入框
    key: 'company', // 非必要，以下对象同理（方便赋值可以参考专卖店活动调用组件）
    label: '分公司',
    value: '',
    placeholder: '请输入分公司',
    type: 'field'
  },
 { // 下拉框单选
    label: '行政分类',
    value: '', // id
    name: '', // 名称
    placeholder: '请选择行政分类',
    type: 'select',
    multiple: false, // 是否多选 默认false
    isSearch: false, // 是否可搜索 默认false
    isNotAll: false, // 是否不显示搜全部 默认false，false为搜全部；true不可搜全部
    options: [{id:1,value:'状态1'},{id:2,value:'状态2'},{id:3,value:'状态3'}],
  },
 { // 下拉框多选
    label: '专卖店类别',
    value: [], // id
    name: [], // 名称
    placeholder: '请选择专卖店类别',
    type: 'select',
    multiple: true,
    options: [{id:1,value:'类别1'},{id:2,value:'类别2'},{id:3,value:'类别3'}],
  },
 { // 起始结束日期,年月日
    label: '时间',
    startDate: '', // 开始时间
    endDate: '', // 结束时间
    placeholderStart: '请选择开始时间',
    placeholderEnd: '请选择结束时间',
    type: 'date',
  },
 { // 年月日期
    key: 'timeStart',
    label: '时间',
    value: '',
    placeholder: '请选择时间',
    type: 'yearMonth'
  },
 { // 日期快速筛选
    key: 'dateInterval',
    label: '快速筛选日期区间',
    value: '',
    name: '',
    type: 'quickDate',
  },
 ],
* */
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            usingComponents: {
                'van-icon': '../../../components/vant/icon/index',
                'van-popup': '../../../components/vant/popup/index',
                'calendar': '../../../components/calendar/index',
                "van-datetime-picker": "../../../components/vant/datetime-picker/index",
                'van-field': '../../../components/vant/field/index',
                'van-search': '../../../components/vant/search/index',
            },
        };
        _this.props = {
            drawerTopHeight: {
                type: String,
                default: '96'
            },
            sideFilterForm: {
                type: Array,
                default: [],
            },
        };
        // 监听器
        _this.watch = {
            sideFilterForm: function (newVal, oldVal) {
                var formData = JSON.parse(JSON.stringify(newVal));
                if (this.currIndex !== '') {
                    if (formData[this.currIndex] && formData[this.currIndex].isSearch) { // 监听sideFilterForm值如果有isSearch属性，搜索关键字后需重新给列表赋值
                        this.selectOptions = JSON.parse(JSON.stringify(formData[this.currIndex].options));
                        if (!formData[this.currIndex].multiple && !formData[this.currIndex].isNotAll) { // 只有单选列表加全部
                            var defaultObj = { id: '', value: '全部' };
                            this.selectOptions.unshift(defaultObj);
                        }
                    }
                }
                this.$apply();
            }
        };
        _this.data = {
            calendarConfig: {
                theme: 'elegant',
                onlyShowCurrentMonth: false,
            },
            agentPopup: false,
            popupTitle: '',
            selectOptions: [],
            currIndex: '',
            calendarShow: false,
            currentDateName: '',
            formData: [],
            yearsVisable: false,
            maxDate: new Date(2100, 10, 1).getTime(),
            currentDate: new Date().getTime(),
            minDate: new Date(2000, 10, 1).getTime(),
            searchStr: '',
            quickFilterDateOption: [
                { id: '', value: '全部' },
                { id: 'lastWeek', value: '最近一周' },
                { id: 'lastMonth', value: '最近一个月' },
                { id: 'lastThreeMonths', value: '最近三个月' },
                { id: 'lastHalfYear', value: '最近半年' },
            ]
        };
        // 页面内交互写在methods里
        _this.methods = {
            // 关闭选择框
            closeAgentPopup: function () {
                this.agentPopup = false;
            },
            // 打开选择框
            selectagentPopup: function (e) {
                var _a = e.currentTarget.dataset, popuptitle = _a.popuptitle, index = _a.index;
                _this.searchStr = '';
                _this.currIndex = index;
                _this.selectOptions = JSON.parse(JSON.stringify(_this.formData[index].options));
                if (!_this.formData[index].multiple && !_this.formData[_this.currIndex].isNotAll) { // 只有单选列表加全部
                    var defaultObj = { id: '', value: '全部' };
                    _this.selectOptions.unshift(defaultObj);
                }
                _this.popupTitle = popuptitle;
                _this.agentPopup = !_this.agentPopup;
                _this.$apply();
            },
            // 筛选列表可搜索并重新赋值
            onSearch: function (e) {
                var key = e.currentTarget.dataset.key;
                var searchValue = e.detail;
                this.searchStr = searchValue;
                var obj = {
                    key: key,
                    searchValue: searchValue,
                };
                this.$emit('onSideSearch', obj);
            },
            // 单选、多选修改赋值
            selectChangeFilterStatus: function (e) {
                var item = e.currentTarget.dataset.item;
                var index = _this.currIndex;
                if (_this.formData[index].multiple) { // 多选
                    var oIndex = _this.formData[index].value.indexOf(item.id);
                    if (oIndex > -1) {
                        _this.formData[index].value.splice(oIndex, 1);
                        _this.formData[index].name.splice(oIndex, 1);
                    }
                    else {
                        _this.formData[index].value.push(item.id);
                        _this.formData[index].name.push(item.value);
                    }
                }
                else { // 单选
                    _this.formData[index].value = item.id;
                    _this.formData[index].name = item.value;
                    _this.agentPopup = false;
                }
                _this.onFormDataChange();
                _this.$apply();
            },
            // 输入框修改赋值
            onFieldChange: function (e) {
                var index = e.currentTarget.dataset.index;
                var value = e.detail;
                this.currIndex = index;
                this.formData[index].value = value;
                this.onFormDataChange();
                this.$apply();
            },
            // 日期快速筛选
            onChangeQuickDate: function (e) {
                var _a = e.currentTarget.dataset, index = _a.index, item = _a.item;
                this.formData[index].value = item.id;
                this.formData[index].name = item.value;
                this.formData[index].startDate = item.startDate;
                this.formData[index].endDate = item.endDate;
                this.onFormDataChange();
            },
            // 打开日历
            openCalendar: function (e) {
                var _a = e.currentTarget.dataset, index = _a.index, name = _a.name;
                this.currIndex = index;
                var minDate = '1970-01-01';
                var maxDate = '9999-12-31';
                var _b = this.formData[index], startDate = _b.startDate, endDate = _b.endDate;
                this.currentDateName = name;
                var begin, end;
                begin = startDate;
                end = endDate;
                if (name.indexOf('startDate') > -1) {
                    this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
                }
                if (name.indexOf('endDate') > -1) {
                    this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
                }
                this.calendarShow = true;
            },
            // 关闭日历
            closeCalendar: function () {
                this.calendarShow = false;
            },
            // 清空已选日期
            clearCalendar: function (e) {
                var _a;
                var _b = e.currentTarget.dataset, index = _b.index, name = _b.name;
                this.formData[index] = __assign({}, this.formData[index], (_a = {}, _a[name] = '', _a));
                this.onFormDataChange();
            },
            // 选择日期
            chooseDay: function (evt) {
                var _a;
                var index = this.currIndex;
                var _b = evt.detail, year = _b.year, month = _b.month, day = _b.day;
                var day = year + "-" + index_1.fillZero("" + month) + "-" + index_1.fillZero("" + day);
                this.formData[index] = __assign({}, this.formData[index], (_a = {}, _a[this.currentDateName] = day, _a));
                this.calendarShow = false;
                this.onFormDataChange();
            },
            // 打开年月日历
            selectYearMonthPopup: function (e) {
                var _a = e.currentTarget.dataset, index = _a.index, name = _a.name;
                this.currIndex = index;
                this.currentDateName = name;
                this.yearsVisable = true;
                this.$apply();
            },
            // 选择年月日历
            onInput: function (e) {
                this.currentDate = e.detail;
            },
            // 年月日历确定
            onConfirm: function (e) {
                var date = new Date(parseInt(e.detail));
                var Y = date.getFullYear();
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                this.formData[this.currIndex] = __assign({}, this.formData[this.currIndex], { value: Y + '-' + M });
                this.yearsVisable = false;
                this.onFormDataChange();
            },
            // 年月日历取消
            onCancel: function () {
                this.yearsVisable = false;
            },
            // 筛选确定
            onSubmitFilterForm: function () {
                this.$emit('handleConfirm', {
                    sideFilterForm: this.formData,
                });
            },
            // 筛选重置
            onResetFilterForm: function () {
                this.formData = this.formData.map(function (item) {
                    if (item.type === 'field') {
                        item.value = '';
                    }
                    if (item.type === 'select' && !item.multiple) {
                        item.value = '';
                        item.name = '';
                    }
                    if (item.type === 'select' && item.multiple) {
                        item.value = [];
                        item.name = [];
                    }
                    if (item.type === 'date') {
                        item.startDate = '';
                        item.endDate = '';
                    }
                    if (item.type === 'yearMonth') {
                        item.value = '';
                    }
                    if (item.type === 'quickDate') {
                        item.value = '';
                        item.name = '';
                    }
                    return item;
                });
                this.currIndex = '';
                this.onFormDataChange();
                this.$apply();
            },
        };
        return _this;
    }
    default_1.prototype.onFormDataChange = function () {
        var obj = {
            currIndex: this.currIndex,
            sideFilterForm: this.formData,
        };
        this.$emit('onFormDataChange', obj);
    };
    default_1.prototype.onLoad = function () {
        this.formData = this.sideFilterForm;
        this.$apply();
    };
    return default_1;
}(wepy_1.default.component));
exports.default = default_1;
