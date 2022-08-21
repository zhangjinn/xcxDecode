'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wxData = require('./wxData.js');

var _wxData2 = _interopRequireDefault(_wxData);

var _render = require('./render.js');

var _render2 = _interopRequireDefault(_render);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _convertSolarLunar = require('./convertSolarLunar.js');

var _convertSolarLunar2 = _interopRequireDefault(_convertSolarLunar);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getDate = new _utils.GetDate();
var logger = new _utils.Logger();

var WeekMode = function (_WxData) {
  _inherits(WeekMode, _WxData);

  function WeekMode(component) {
    _classCallCheck(this, WeekMode);

    var _this = _possibleConstructorReturn(this, (WeekMode.__proto__ || Object.getPrototypeOf(WeekMode)).call(this, component));

    _this.Component = component;
    _this.getCalendarConfig = (0, _config2.default)(_this.Component).getCalendarConfig;
    return _this;
  }
  /**
   * 周、月视图切换
   * @param {string} view  视图 [week, month]
   * @param {object} day  {year: 2017, month: 11, day: 1}
   */


  _createClass(WeekMode, [{
    key: 'switchWeek',
    value: function switchWeek(view, day) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var config = (0, _config2.default)(_this2.Component).getCalendarConfig();
        if (config.multi) return logger.warn('多选模式不能切换周月视图');

        var _getData = _this2.getData('calendar'),
            _getData$selectedDay = _getData.selectedDay,
            selectedDay = _getData$selectedDay === undefined ? [] : _getData$selectedDay,
            curYear = _getData.curYear,
            curMonth = _getData.curMonth;

        if (!selectedDay.length) _this2.__tipsWhenCanNotSwtich();
        var currentDay = selectedDay[0];
        if (view === 'week') {
          if (_this2.Component.weekMode) return;
          var selectedDate = day || currentDay;
          var year = selectedDate.year,
              month = selectedDate.month;

          if (curYear !== year || curMonth !== month) return _this2.__tipsWhenCanNotSwtich();
          _this2.Component.weekMode = true;
          _this2.setData({
            'calendar.weekMode': true
          });
          _this2.selectedDayWeekAllDays(selectedDate).then(resolve).catch(reject);
        } else {
          _this2.Component.weekMode = false;
          _this2.setData({
            'calendar.weekMode': false
          });
          (0, _render2.default)(_this2.Component).renderCalendar(curYear, curMonth, day).then(resolve).catch(reject);
        }
      });
    }
    /**
     * 更新当前年月
     */

  }, {
    key: 'updateCurrYearAndMonth',
    value: function updateCurrYearAndMonth(type) {
      var _getData2 = this.getData('calendar'),
          days = _getData2.days,
          curYear = _getData2.curYear,
          curMonth = _getData2.curMonth;

      var firstMonth = days[0].month;
      var lastMonth = days[days.length - 1].month;

      var lastDayOfThisMonth = getDate.thisMonthDays(curYear, curMonth);
      var lastDayOfThisWeek = days[days.length - 1];
      var firstDayOfThisWeek = days[0];
      if ((lastDayOfThisWeek.day + 7 > lastDayOfThisMonth || curMonth === firstMonth && firstMonth !== lastMonth) && type === 'next') {
        curMonth = curMonth + 1;
        if (curMonth > 12) {
          curYear = curYear + 1;
          curMonth = 1;
        }
      } else if ((+firstDayOfThisWeek.day <= 7 || curMonth === lastMonth && firstMonth !== lastMonth) && type === 'prev') {
        curMonth = curMonth - 1;
        if (curMonth <= 0) {
          curYear = curYear - 1;
          curMonth = 12;
        }
      }
      return {
        Uyear: curYear,
        Umonth: curMonth
      };
    }
    /**
     * 计算周视图下当前这一周和当月的最后一天
     */

  }, {
    key: 'calculateLastDay',
    value: function calculateLastDay() {
      var _getData3 = this.getData('calendar'),
          days = _getData3.days,
          curYear = _getData3.curYear,
          curMonth = _getData3.curMonth;

      var lastDayInThisWeek = days[days.length - 1].day;
      var lastDayInThisMonth = getDate.thisMonthDays(curYear, curMonth);
      return { lastDayInThisWeek: lastDayInThisWeek, lastDayInThisMonth: lastDayInThisMonth };
    }
    /**
     * 计算周视图下当前这一周第一天
     */

  }, {
    key: 'calculateFirstDay',
    value: function calculateFirstDay() {
      var _getData4 = this.getData('calendar'),
          days = _getData4.days;

      var firstDayInThisWeek = days[0].day;
      return { firstDayInThisWeek: firstDayInThisWeek };
    }
    /**
     * 当月第一周所有日期范围
     * @param {number} year
     * @param {number} month
     * @param {boolean} firstDayOfWeekIsMon 每周是否配置为以周一开始
     */

  }, {
    key: 'firstWeekInMonth',
    value: function firstWeekInMonth(year, month, firstDayOfWeekIsMon) {
      var firstDay = getDate.dayOfWeek(year, month, 1);
      if (+firstDay === 0) firstDay = 7;
      var firstWeekDays = [0, 7 - firstDay];
      var days = this.getData('calendar.days') || [];
      var daysCut = days.slice(0, firstDayOfWeekIsMon ? firstWeekDays[1] + 1 : firstWeekDays[1]);
      return daysCut;
    }
    /**
     * 当月最后一周所有日期范围
     * @param {number} year
     * @param {number} month
     * @param {boolean} firstDayOfWeekIsMon 每周是否配置为以周一开始
     */

  }, {
    key: 'lastWeekInMonth',
    value: function lastWeekInMonth(year, month, firstDayOfWeekIsMon) {
      var lastDay = getDate.thisMonthDays(year, month);
      var lastDayWeek = getDate.dayOfWeek(year, month, lastDay);
      var lastWeekDays = [lastDay - lastDayWeek, lastDay];
      var days = this.getData('calendar.days') || [];
      var daysCut = days.slice(firstDayOfWeekIsMon ? lastWeekDays[0] : lastWeekDays[0] - 1, lastWeekDays[1]);
      return daysCut;
    }
    /**
     * 渲染日期之前初始化已选日期
     * @param {array} days 当前日期数组
     */

  }, {
    key: 'initSelectedDay',
    value: function initSelectedDay(days) {
      var daysCopy = [].concat(_toConsumableArray(days));

      var _getData5 = this.getData('calendar'),
          _getData5$selectedDay = _getData5.selectedDay,
          selectedDay = _getData5$selectedDay === undefined ? [] : _getData5$selectedDay,
          _getData5$todoLabels = _getData5.todoLabels,
          todoLabels = _getData5$todoLabels === undefined ? [] : _getData5$todoLabels,
          showLabelAlways = _getData5.showLabelAlways;

      var selectedDayStr = selectedDay.map(function (item) {
        return +item.year + '-' + +item.month + '-' + +item.day;
      });
      var todoLabelsCol = todoLabels.map(function (d) {
        return +d.year + '-' + +d.month + '-' + +d.day;
      });
      var config = this.getCalendarConfig();
      daysCopy.forEach(function (item) {
        if (selectedDayStr.includes(+item.year + '-' + +item.month + '-' + +item.day)) {
          item.choosed = true;
        } else {
          item.choosed = false;
        }
        var idx = todoLabelsCol.indexOf(+item.year + '-' + +item.month + '-' + +item.day);
        if (idx !== -1) {
          if (showLabelAlways) {
            item.showTodoLabel = true;
          } else {
            item.showTodoLabel = !item.choosed;
          }
          var todoLabel = todoLabels[idx];
          if (item.showTodoLabel && todoLabel && todoLabel.todoText) item.todoText = todoLabel.todoText;
        }
        if (config.showLunar) {
          item.lunar = _convertSolarLunar2.default.solar2lunar(+item.year, +item.month, +item.day);
        }
      });
      return daysCopy;
    }
    /**
     * 周视图下设置可选日期范围
     * @param {object} days 当前展示的日期
     */

  }, {
    key: 'setEnableAreaOnWeekMode',
    value: function setEnableAreaOnWeekMode(days) {
      var _this3 = this;

      var _getData6 = this.getData('calendar'),
          todayTimestamp = _getData6.todayTimestamp,
          _getData6$enableAreaT = _getData6.enableAreaTimestamp,
          enableAreaTimestamp = _getData6$enableAreaT === undefined ? [] : _getData6$enableAreaT,
          _getData6$enableDaysT = _getData6.enableDaysTimestamp,
          enableDaysTimestamp = _getData6$enableDaysT === undefined ? [] : _getData6$enableDaysT;

      days.forEach(function (item) {
        var timestamp = getDate.newDate(item.year, item.month, item.day).getTime();

        var setDisable = false;
        if (enableAreaTimestamp.length) {
          if ((+enableAreaTimestamp[0] > +timestamp || +timestamp > +enableAreaTimestamp[1]) && !enableDaysTimestamp.includes(+timestamp)) {
            setDisable = true;
          }
        } else if (enableDaysTimestamp.length && !enableDaysTimestamp.includes(+timestamp)) {
          setDisable = true;
        }
        if (setDisable) {
          item.disable = true;
          item.choosed = false;
        }

        var _ref = (0, _config2.default)(_this3.Component).getCalendarConfig() || {},
            disablePastDay = _ref.disablePastDay;

        if (disablePastDay && timestamp - todayTimestamp < 0 && !item.disable) {
          item.disable = true;
        }
      });
    }
    /**
     * 计算下一周的日期
     */

  }, {
    key: 'calculateNextWeekDays',
    value: function calculateNextWeekDays() {
      var _calculateLastDay = this.calculateLastDay(),
          lastDayInThisWeek = _calculateLastDay.lastDayInThisWeek,
          lastDayInThisMonth = _calculateLastDay.lastDayInThisMonth;

      var _getData7 = this.getData('calendar'),
          curYear = _getData7.curYear,
          curMonth = _getData7.curMonth;

      var days = [];
      if (lastDayInThisMonth - lastDayInThisWeek >= 7) {
        var _updateCurrYearAndMon = this.updateCurrYearAndMonth('next'),
            Uyear = _updateCurrYearAndMon.Uyear,
            Umonth = _updateCurrYearAndMon.Umonth;

        curYear = Uyear;
        curMonth = Umonth;
        for (var i = lastDayInThisWeek + 1; i <= lastDayInThisWeek + 7; i++) {
          days.push({
            year: curYear,
            month: curMonth,
            day: i,
            week: getDate.dayOfWeek(curYear, curMonth, i)
          });
        }
      } else {
        for (var _i = lastDayInThisWeek + 1; _i <= lastDayInThisMonth; _i++) {
          days.push({
            year: curYear,
            month: curMonth,
            day: _i,
            week: getDate.dayOfWeek(curYear, curMonth, _i)
          });
        }

        var _updateCurrYearAndMon2 = this.updateCurrYearAndMonth('next'),
            _Uyear = _updateCurrYearAndMon2.Uyear,
            _Umonth = _updateCurrYearAndMon2.Umonth;

        curYear = _Uyear;
        curMonth = _Umonth;
        for (var _i2 = 1; _i2 <= 7 - (lastDayInThisMonth - lastDayInThisWeek); _i2++) {
          days.push({
            year: curYear,
            month: curMonth,
            day: _i2,
            week: getDate.dayOfWeek(curYear, curMonth, _i2)
          });
        }
      }
      days = this.initSelectedDay(days);
      this.setEnableAreaOnWeekMode(days);
      this.setData({
        'calendar.curYear': curYear,
        'calendar.curMonth': curMonth,
        'calendar.days': days
      });
    }
    /**
     * 计算上一周的日期
     */

  }, {
    key: 'calculatePrevWeekDays',
    value: function calculatePrevWeekDays() {
      var _calculateFirstDay = this.calculateFirstDay(),
          firstDayInThisWeek = _calculateFirstDay.firstDayInThisWeek;

      var _getData8 = this.getData('calendar'),
          curYear = _getData8.curYear,
          curMonth = _getData8.curMonth;

      var days = [];

      if (firstDayInThisWeek - 7 > 0) {
        var _updateCurrYearAndMon3 = this.updateCurrYearAndMonth('prev'),
            Uyear = _updateCurrYearAndMon3.Uyear,
            Umonth = _updateCurrYearAndMon3.Umonth;

        curYear = Uyear;
        curMonth = Umonth;
        for (var i = firstDayInThisWeek - 7; i < firstDayInThisWeek; i++) {
          days.push({
            year: curYear,
            month: curMonth,
            day: i,
            week: getDate.dayOfWeek(curYear, curMonth, i)
          });
        }
      } else {
        var temp = [];
        for (var _i3 = 1; _i3 < firstDayInThisWeek; _i3++) {
          temp.push({
            year: curYear,
            month: curMonth,
            day: _i3,
            week: getDate.dayOfWeek(curYear, curMonth, _i3)
          });
        }

        var _updateCurrYearAndMon4 = this.updateCurrYearAndMonth('prev'),
            _Uyear2 = _updateCurrYearAndMon4.Uyear,
            _Umonth2 = _updateCurrYearAndMon4.Umonth;

        curYear = _Uyear2;
        curMonth = _Umonth2;
        var prevMonthDays = getDate.thisMonthDays(curYear, curMonth);
        for (var _i4 = prevMonthDays - Math.abs(firstDayInThisWeek - 7); _i4 <= prevMonthDays; _i4++) {
          days.push({
            year: curYear,
            month: curMonth,
            day: _i4,
            week: getDate.dayOfWeek(curYear, curMonth, _i4)
          });
        }
        days = days.concat(temp);
      }
      days = this.initSelectedDay(days);
      this.setEnableAreaOnWeekMode(days);
      this.setData({
        'calendar.curYear': curYear,
        'calendar.curMonth': curMonth,
        'calendar.days': days
      });
    }
    /**
     * 计算当前选中日期所在周，并重新渲染日历
     * @param {object} currentDay 当前选择日期
     */

  }, {
    key: 'selectedDayWeekAllDays',
    value: function selectedDayWeekAllDays(currentDay) {
      var _this4 = this;

      return new Promise(function (resolve) {
        var _getData9 = _this4.getData('calendar'),
            days = _getData9.days,
            curYear = _getData9.curYear,
            curMonth = _getData9.curMonth;

        var year = currentDay.year,
            month = currentDay.month,
            day = currentDay.day;

        var config = _this4.getCalendarConfig();
        var firstDayOfWeekIsMon = config.firstDayOfWeek === 'Mon';
        var lastWeekDays = _this4.lastWeekInMonth(year, month, firstDayOfWeekIsMon);
        var firstWeekDays = _this4.firstWeekInMonth(year, month, firstDayOfWeekIsMon);
        // 判断选中日期的月份是否与当前月份一致
        if (curYear !== year || curMonth !== month) day = 1;
        if (curYear !== year) year = curYear;
        if (curMonth !== month) month = curMonth;
        if (firstWeekDays.find(function (item) {
          return item.day === day;
        })) {
          // 当前选择的日期为该月第一周
          var temp = [];
          var lastDayInThisMonth = getDate.thisMonthDays(year, month - 1);

          var _updateCurrYearAndMon5 = _this4.updateCurrYearAndMonth('prev'),
              Uyear = _updateCurrYearAndMon5.Uyear,
              Umonth = _updateCurrYearAndMon5.Umonth;

          curYear = Uyear;
          curMonth = Umonth;
          for (var i = lastDayInThisMonth - (7 - firstWeekDays.length) + 1; i <= lastDayInThisMonth; i++) {
            temp.push({
              year: curYear,
              month: curMonth,
              day: i,
              week: getDate.dayOfWeek(curYear, curMonth, i)
            });
          }
          days = temp.concat(firstWeekDays);
        } else if (lastWeekDays.find(function (item) {
          return item.day === day;
        })) {
          // 当前选择的日期为该月最后一周
          var _temp = [];
          if (lastWeekDays && lastWeekDays.length < 7) {
            var _updateCurrYearAndMon6 = _this4.updateCurrYearAndMonth('next'),
                _Uyear3 = _updateCurrYearAndMon6.Uyear,
                _Umonth3 = _updateCurrYearAndMon6.Umonth;

            curYear = _Uyear3;
            curMonth = _Umonth3;
            for (var _i5 = 1, len = 7 - lastWeekDays.length; _i5 <= len; _i5++) {
              _temp.push({
                year: curYear,
                month: curMonth,
                day: _i5,
                week: getDate.dayOfWeek(curYear, curMonth, _i5)
              });
            }
          }
          days = lastWeekDays.concat(_temp);
        } else {
          var week = getDate.dayOfWeek(year, month, day);
          var range = [day - week, day + (6 - week)];
          if (firstDayOfWeekIsMon) {
            range = [day + 1 - week, day + (7 - week)];
          }
          days = days.slice(range[0] - 1, range[1]);
        }
        days = _this4.initSelectedDay(days);
        _this4.setData({
          'calendar.days': days,
          'calendar.empytGrids': [],
          'calendar.lastEmptyGrids': []
        }, resolve);
      });
    }
  }, {
    key: '__tipsWhenCanNotSwtich',
    value: function __tipsWhenCanNotSwtich() {
      logger.info('当前月份未选中日期下切换为周视图，不能明确该展示哪一周的日期，故此情况不允许切换');
    }
  }]);

  return WeekMode;
}(_wxData2.default);

exports.default = function (component) {
  return new WeekMode(component);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlZWsuanMiXSwibmFtZXMiOlsiZ2V0RGF0ZSIsIkdldERhdGUiLCJsb2dnZXIiLCJMb2dnZXIiLCJXZWVrTW9kZSIsImNvbXBvbmVudCIsIkNvbXBvbmVudCIsImdldENhbGVuZGFyQ29uZmlnIiwidmlldyIsImRheSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29uZmlnIiwibXVsdGkiLCJ3YXJuIiwiZ2V0RGF0YSIsInNlbGVjdGVkRGF5IiwiY3VyWWVhciIsImN1ck1vbnRoIiwibGVuZ3RoIiwiX190aXBzV2hlbkNhbk5vdFN3dGljaCIsImN1cnJlbnREYXkiLCJ3ZWVrTW9kZSIsInNlbGVjdGVkRGF0ZSIsInllYXIiLCJtb250aCIsInNldERhdGEiLCJzZWxlY3RlZERheVdlZWtBbGxEYXlzIiwidGhlbiIsImNhdGNoIiwicmVuZGVyQ2FsZW5kYXIiLCJ0eXBlIiwiZGF5cyIsImZpcnN0TW9udGgiLCJsYXN0TW9udGgiLCJsYXN0RGF5T2ZUaGlzTW9udGgiLCJ0aGlzTW9udGhEYXlzIiwibGFzdERheU9mVGhpc1dlZWsiLCJmaXJzdERheU9mVGhpc1dlZWsiLCJVeWVhciIsIlVtb250aCIsImxhc3REYXlJblRoaXNXZWVrIiwibGFzdERheUluVGhpc01vbnRoIiwiZmlyc3REYXlJblRoaXNXZWVrIiwiZmlyc3REYXlPZldlZWtJc01vbiIsImZpcnN0RGF5IiwiZGF5T2ZXZWVrIiwiZmlyc3RXZWVrRGF5cyIsImRheXNDdXQiLCJzbGljZSIsImxhc3REYXkiLCJsYXN0RGF5V2VlayIsImxhc3RXZWVrRGF5cyIsImRheXNDb3B5IiwidG9kb0xhYmVscyIsInNob3dMYWJlbEFsd2F5cyIsInNlbGVjdGVkRGF5U3RyIiwibWFwIiwiaXRlbSIsInRvZG9MYWJlbHNDb2wiLCJkIiwiZm9yRWFjaCIsImluY2x1ZGVzIiwiY2hvb3NlZCIsImlkeCIsImluZGV4T2YiLCJzaG93VG9kb0xhYmVsIiwidG9kb0xhYmVsIiwidG9kb1RleHQiLCJzaG93THVuYXIiLCJsdW5hciIsImNvbnZlcnRTb2xhckx1bmFyIiwic29sYXIybHVuYXIiLCJ0b2RheVRpbWVzdGFtcCIsImVuYWJsZUFyZWFUaW1lc3RhbXAiLCJlbmFibGVEYXlzVGltZXN0YW1wIiwidGltZXN0YW1wIiwibmV3RGF0ZSIsImdldFRpbWUiLCJzZXREaXNhYmxlIiwiZGlzYWJsZSIsImRpc2FibGVQYXN0RGF5IiwiY2FsY3VsYXRlTGFzdERheSIsInVwZGF0ZUN1cnJZZWFyQW5kTW9udGgiLCJpIiwicHVzaCIsIndlZWsiLCJpbml0U2VsZWN0ZWREYXkiLCJzZXRFbmFibGVBcmVhT25XZWVrTW9kZSIsImNhbGN1bGF0ZUZpcnN0RGF5IiwidGVtcCIsInByZXZNb250aERheXMiLCJNYXRoIiwiYWJzIiwiY29uY2F0IiwiZmlyc3REYXlPZldlZWsiLCJsYXN0V2Vla0luTW9udGgiLCJmaXJzdFdlZWtJbk1vbnRoIiwiZmluZCIsImxlbiIsInJhbmdlIiwiaW5mbyIsIld4RGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVLElBQUlDLGNBQUosRUFBaEI7QUFDQSxJQUFNQyxTQUFTLElBQUlDLGFBQUosRUFBZjs7SUFFTUMsUTs7O0FBQ0osb0JBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFBQSxvSEFDZkEsU0FEZTs7QUFFckIsVUFBS0MsU0FBTCxHQUFpQkQsU0FBakI7QUFDQSxVQUFLRSxpQkFBTCxHQUF5QixzQkFBZSxNQUFLRCxTQUFwQixFQUErQkMsaUJBQXhEO0FBSHFCO0FBSXRCO0FBQ0Q7Ozs7Ozs7OzsrQkFLV0MsSSxFQUFNQyxHLEVBQUs7QUFBQTs7QUFDcEIsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLFlBQU1DLFNBQVMsc0JBQWUsT0FBS1AsU0FBcEIsRUFBK0JDLGlCQUEvQixFQUFmO0FBQ0EsWUFBSU0sT0FBT0Ms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bUQsTUFBTSxDQUFOLElBQVcsQ0FBdEIsRUFBeUJBLE1BQU0sQ0FBTixDQUF6QixDQUFQO0FBQ0Q7QUFDRHBFLGVBQU8sT0FBS3VELGVBQUwsQ0FBcUJ2RCxJQUFyQixDQUFQO0FBQ0EsZUFBS04sT0FBTCxDQUNFO0FBQ0UsMkJBQWlCTSxJQURuQjtBQUVFLGlDQUF1QixFQUZ6QjtBQUdFLHFDQUEyQjtBQUg3QixTQURGLEVBTUV0QixPQU5GO0FBUUQsT0FyRU0sQ0FBUDtBQXNFRDs7OzZDQUN3QjtBQUN2QlQsYUFBT29HLElBQVAsQ0FDRSwwQ0FERjtBQUdEOzs7O0VBbFpvQkMsZ0I7O2tCQXFaUjtBQUFBLFNBQWEsSUFBSW5HLFFBQUosQ0FBYUMsU0FBYixDQUFiO0FBQUEsQyIsImZpbGUiOiJ3ZWVrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFd4RGF0YSBmcm9tICcuL3d4RGF0YSc7XG5pbXBvcnQgUmVuZGVyIGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCBDYWxlbmRhckNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgY29udmVydFNvbGFyTHVuYXIgZnJvbSAnLi9jb252ZXJ0U29sYXJMdW5hcic7XG5pbXBvcnQgeyBHZXREYXRlLCBMb2dnZXIgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgZ2V0RGF0ZSA9IG5ldyBHZXREYXRlKCk7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbmNsYXNzIFdlZWtNb2RlIGV4dGVuZHMgV3hEYXRhIHtcbiAgY29uc3RydWN0b3IoY29tcG9uZW50KSB7XG4gICAgc3VwZXIoY29tcG9uZW50KTtcbiAgICB0aGlzLkNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICB0aGlzLmdldENhbGVuZGFyQ29uZmlnID0gQ2FsZW5kYXJDb25maWcodGhpcy5Db21wb25lbnQpLmdldENhbGVuZGFyQ29uZmlnO1xuICB9XG4gIC8qKlxuICAgKiDlkajjgIHmnIjop4blm77liIfmjaJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZpZXcgIOinhuWbviBbd2VlaywgbW9udGhdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXkgIHt5ZWFyOiAyMDE3LCBtb250aDogMTEsIGRheTogMX1cbiAgICovXG4gIHN3aXRjaFdlZWsodmlldywgZGF5KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IENhbGVuZGFyQ29uZmlnKHRoaXMuQ29tcG9uZW50KS5nZXRDYWxlbmRhckNvbmZpZygpO1xuICAgICAgaWYgKGNvbmZpZy5tdWx0aSkgcmV0dXJuIGxvZ2dlci53YXJuKCflpJrpgInmqKHlvI/kuI3og73liIfmjaLlkajmnIjop4blm74nKTtcbiAgICAgIGNvbnN0IHsgc2VsZWN0ZWREYXkgPSBbXSwgY3VyWWVhciwgY3VyTW9udGggfSA9IHRoaXMuZ2V0RGF0YSgnY2FsZW5kYXInKTtcbiAgICAgIGlmICghc2VsZWN0ZWREYXkubGVuZ3RoKSB0aGlzLl9fdGlwc1doZW5DYW5Ob3RTd3RpY2goKTtcbiAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBzZWxlY3RlZERheVswXTtcbiAgICAgIGlmICh2aWV3ID09PSAnd2VlaycpIHtcbiAgICAgICAgaWYgKHRoaXMuQ29tcG9uZW50LndlZWtNb2RlKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IGRheSB8fCBjdXJyZW50RGF5O1xuICAgICAgICBjb25zdCB7IHllYXIsIG1vbnRoIH0gPSBzZWxlY3RlZERhdGU7XG4gICAgICAgIGlmIChjdXJZZWFyICE9PSB5ZWFyIHx8IGN1ck1vbnRoICE9PSBtb250aClcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3RpcHNXaGVuQ2FuTm90U3d0aWNoKCk7XG4gICAgICAgIHRoaXMuQ29tcG9uZW50LndlZWtNb2RlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAnY2FsZW5kYXIud2Vla01vZGUnOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF5V2Vla0FsbERheXMoc2VsZWN0ZWREYXRlKVxuICAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLkNvbXBvbmVudC53ZWVrTW9kZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICdjYWxlbmRhci53ZWVrTW9kZSc6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBSZW5kZXIodGhpcy5Db21wb25lbnQpXG4gICAgICAgICAgLnJlbmRlckNhbGVuZGFyKGN1clllYXIsIGN1ck1vbnRoLCBkYXkpXG4gICAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5pu05paw5b2T5YmN5bm05pyIXG4gICAqL1xuICB1cGRhdGVDdXJyWWVhckFuZE1vbnRoKHR5cGUpIHtcbiAgICBsZXQgeyBkYXlzLCBjdXJZZWFyLCBjdXJNb250aCB9ID0gdGhpcy5nZXREYXRhKCdjYWxlbmRhcicpO1xuICAgIGNvbnN0IHsgbW9udGg6IGZpcnN0TW9udGggfSA9IGRheXNbMF07XG4gICAgY29uc3QgeyBtb250aDogbGFzdE1vbnRoIH0gPSBkYXlzW2RheXMubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbGFzdERheU9mVGhpc01vbnRoID0gZ2V0RGF0ZS50aGlzTW9udGhEYXlzKGN1clllYXIsIGN1ck1vbnRoKTtcbiAgICBjb25zdCBsYXN0RGF5T2ZUaGlzV2VlayA9IGRheXNbZGF5cy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBmaXJzdERheU9mVGhpc1dlZWsgPSBkYXlzWzBdO1xuICAgIGlmIChcbiAgICAgIChsYXN0RGF5T2ZUaGlzV2Vlay5kYXkgKyA3ID4gbGFzdERheU9mVGhpc01vbnRoIHx8XG4gICAgICAgIChjdXJNb250aCA9PT0gZmlyc3RNb250aCAmJiBmaXJzdE1vbnRoICE9PSBsYXN0TW9udGgpKSAmJlxuICAgICAgdHlwZSA9PT0gJ25leHQnXG4gICAgKSB7XG4gICAgICBjdXJNb250aCA9IGN1ck1vbnRoICsgMTtcbiAgICAgIGlmIChjdXJNb250aCA+IDEyKSB7XG4gICAgICAgIGN1clllYXIgPSBjdXJZZWFyICsgMTtcbiAgICAgICAgY3VyTW9udGggPSAxO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICAoK2ZpcnN0RGF5T2ZUaGlzV2Vlay5kYXkgPD0gNyB8fFxuICAgICAgICAoY3VyTW9udGggPT09IGxhc3RNb250aCAmJiBmaXJzdE1vbnRoICE9PSBsYXN0TW9udGgpKSAmJlxuICAgICAgdHlwZSA9PT0gJ3ByZXYnXG4gICAgKSB7XG4gICAgICBjdXJNb250aCA9IGN1ck1vbnRoIC0gMTtcbiAgICAgIGlmIChjdXJNb250aCA8PSAwKSB7XG4gICAgICAgIGN1clllYXIgPSBjdXJZZWFyIC0gMTtcbiAgICAgICAgY3VyTW9udGggPSAxMjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIFV5ZWFyOiBjdXJZZWFyLFxuICAgICAgVW1vbnRoOiBjdXJNb250aFxuICAgIH07XG4gIH1cbiAgLyoqXG4gICAqIOiuoeeul+WRqOinhuWbvuS4i+W9k+WJjei/meS4gOWRqOWSjOW9k+aciOeahOacgOWQjuS4gOWkqVxuICAgKi9cbiAgY2FsY3VsYXRlTGFzdERheSgpIHtcbiAgICBjb25zdCB7IGRheXMsIGN1clllYXIsIGN1ck1vbnRoIH0gPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgY29uc3QgbGFzdERheUluVGhpc1dlZWsgPSBkYXlzW2RheXMubGVuZ3RoIC0gMV0uZGF5O1xuICAgIGNvbnN0IGxhc3REYXlJblRoaXNNb250aCA9IGdldERhdGUudGhpc01vbnRoRGF5cyhjdXJZZWFyLCBjdXJNb250aCk7XG4gICAgcmV0dXJuIHsgbGFzdERheUluVGhpc1dlZWssIGxhc3REYXlJblRoaXNNb250aCB9O1xuICB9XG4gIC8qKlxuICAgKiDorqHnrpflkajop4blm77kuIvlvZPliY3ov5nkuIDlkajnrKzkuIDlpKlcbiAgICovXG4gIGNhbGN1bGF0ZUZpcnN0RGF5KCkge1xuICAgIGNvbnN0IHsgZGF5cyB9ID0gdGhpcy5nZXREYXRhKCdjYWxlbmRhcicpO1xuICAgIGNvbnN0IGZpcnN0RGF5SW5UaGlzV2VlayA9IGRheXNbMF0uZGF5O1xuICAgIHJldHVybiB7IGZpcnN0RGF5SW5UaGlzV2VlayB9O1xuICB9XG4gIC8qKlxuICAgKiDlvZPmnIjnrKzkuIDlkajmiYDmnInml6XmnJ/ojIPlm7RcbiAgICogQHBhcmFtIHtudW1iZXJ9IHllYXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1vbnRoXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZmlyc3REYXlPZldlZWtJc01vbiDmr4/lkajmmK/lkKbphY3nva7kuLrku6XlkajkuIDlvIDlp4tcbiAgICovXG4gIGZpcnN0V2Vla0luTW9udGgoeWVhciwgbW9udGgsIGZpcnN0RGF5T2ZXZWVrSXNNb24pIHtcbiAgICBsZXQgZmlyc3REYXkgPSBnZXREYXRlLmRheU9mV2Vlayh5ZWFyLCBtb250aCwgMSk7XG4gICAgaWYgKCtmaXJzdERheSA9PT0gMCkgZmlyc3REYXkgPSA3O1xuICAgIGNvbnN0IGZpcnN0V2Vla0RheXMgPSBbMCwgNyAtIGZpcnN0RGF5XTtcbiAgICBjb25zdCBkYXlzID0gdGhpcy5nZXREYXRhKCdjYWxlbmRhci5kYXlzJykgfHwgW107XG4gICAgY29uc3QgZGF5c0N1dCA9IGRheXMuc2xpY2UoXG4gICAgICAwLFxuICAgICAgZmlyc3REYXlPZldlZWtJc01vbiA/IGZpcnN0V2Vla0RheXNbMV0gKyAxIDogZmlyc3RXZWVrRGF5c1sxXVxuICAgICk7XG4gICAgcmV0dXJuIGRheXNDdXQ7XG4gIH1cbiAgLyoqXG4gICAqIOW9k+aciOacgOWQjuS4gOWRqOaJgOacieaXpeacn+iMg+WbtFxuICAgKiBAcGFyYW0ge251bWJlcn0geWVhclxuICAgKiBAcGFyYW0ge251bWJlcn0gbW9udGhcbiAgICogQHBhcmFtIHtib29sZWFufSBmaXJzdERheU9mV2Vla0lzTW9uIOavj+WRqOaYr+WQpumFjee9ruS4uuS7peWRqOS4gOW8gOWni1xuICAgKi9cbiAgbGFzdFdlZWtJbk1vbnRoKHllYXIsIG1vbnRoLCBmaXJzdERheU9mV2Vla0lzTW9uKSB7XG4gICAgY29uc3QgbGFzdERheSA9IGdldERhdGUudGhpc01vbnRoRGF5cyh5ZWFyLCBtb250aCk7XG4gICAgY29uc3QgbGFzdERheVdlZWsgPSBnZXREYXRlLmRheU9mV2Vlayh5ZWFyLCBtb250aCwgbGFzdERheSk7XG4gICAgY29uc3QgbGFzdFdlZWtEYXlzID0gW2xhc3REYXkgLSBsYXN0RGF5V2VlaywgbGFzdERheV07XG4gICAgY29uc3QgZGF5cyA9IHRoaXMuZ2V0RGF0YSgnY2FsZW5kYXIuZGF5cycpIHx8IFtdO1xuICAgIGNvbnN0IGRheXNDdXQgPSBkYXlzLnNsaWNlKFxuICAgICAgZmlyc3REYXlPZldlZWtJc01vbiA/IGxhc3RXZWVrRGF5c1swXSA6IGxhc3RXZWVrRGF5c1swXSAtIDEsXG4gICAgICBsYXN0V2Vla0RheXNbMV1cbiAgICApO1xuICAgIHJldHVybiBkYXlzQ3V0O1xuICB9XG4gIC8qKlxuICAgKiDmuLLmn5Pml6XmnJ/kuYvliY3liJ3lp4vljJblt7LpgInml6XmnJ9cbiAgICogQHBhcmFtIHthcnJheX0gZGF5cyDlvZPliY3ml6XmnJ/mlbDnu4RcbiAgICovXG4gIGluaXRTZWxlY3RlZERheShkYXlzKSB7XG4gICAgY29uc3QgZGF5c0NvcHkgPSBbLi4uZGF5c107XG4gICAgY29uc3QgeyBzZWxlY3RlZERheSA9IFtdLCB0b2RvTGFiZWxzID0gW10sIHNob3dMYWJlbEFsd2F5cyB9ID0gdGhpcy5nZXREYXRhKFxuICAgICAgJ2NhbGVuZGFyJ1xuICAgICk7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXlTdHIgPSBzZWxlY3RlZERheS5tYXAoXG4gICAgICBpdGVtID0+IGAkeytpdGVtLnllYXJ9LSR7K2l0ZW0ubW9udGh9LSR7K2l0ZW0uZGF5fWBcbiAgICApO1xuICAgIGNvbnN0IHRvZG9MYWJlbHNDb2wgPSB0b2RvTGFiZWxzLm1hcChcbiAgICAgIGQgPT4gYCR7K2QueWVhcn0tJHsrZC5tb250aH0tJHsrZC5kYXl9YFxuICAgICk7XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRDYWxlbmRhckNvbmZpZygpO1xuICAgIGRheXNDb3B5LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHNlbGVjdGVkRGF5U3RyLmluY2x1ZGVzKGAkeytpdGVtLnllYXJ9LSR7K2l0ZW0ubW9udGh9LSR7K2l0ZW0uZGF5fWApXG4gICAgICApIHtcbiAgICAgICAgaXRlbS5jaG9vc2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uY2hvb3NlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgaWR4ID0gdG9kb0xhYmVsc0NvbC5pbmRleE9mKFxuICAgICAgICBgJHsraXRlbS55ZWFyfS0keytpdGVtLm1vbnRofS0keytpdGVtLmRheX1gXG4gICAgICApO1xuICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgaWYgKHNob3dMYWJlbEFsd2F5cykge1xuICAgICAgICAgIGl0ZW0uc2hvd1RvZG9MYWJlbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5zaG93VG9kb0xhYmVsID0gIWl0ZW0uY2hvb3NlZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0b2RvTGFiZWwgPSB0b2RvTGFiZWxzW2lkeF07XG4gICAgICAgIGlmIChpdGVtLnNob3dUb2RvTGFiZWwgJiYgdG9kb0xhYmVsICYmIHRvZG9MYWJlbC50b2RvVGV4dClcbiAgICAgICAgICBpdGVtLnRvZG9UZXh0ID0gdG9kb0xhYmVsLnRvZG9UZXh0O1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5zaG93THVuYXIpIHtcbiAgICAgICAgaXRlbS5sdW5hciA9IGNvbnZlcnRTb2xhckx1bmFyLnNvbGFyMmx1bmFyKFxuICAgICAgICAgICtpdGVtLnllYXIsXG4gICAgICAgICAgK2l0ZW0ubW9udGgsXG4gICAgICAgICAgK2l0ZW0uZGF5XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRheXNDb3B5O1xuICB9XG4gIC8qKlxuICAgKiDlkajop4blm77kuIvorr7nva7lj6/pgInml6XmnJ/ojIPlm7RcbiAgICogQHBhcmFtIHtvYmplY3R9IGRheXMg5b2T5YmN5bGV56S655qE5pel5pyfXG4gICAqL1xuICBzZXRFbmFibGVBcmVhT25XZWVrTW9kZShkYXlzKSB7XG4gICAgbGV0IHtcbiAgICAgIHRvZGF5VGltZXN0YW1wLFxuICAgICAgZW5hYmxlQXJlYVRpbWVzdGFtcCA9IFtdLFxuICAgICAgZW5hYmxlRGF5c1RpbWVzdGFtcCA9IFtdXG4gICAgfSA9IHRoaXMuZ2V0RGF0YSgnY2FsZW5kYXInKTtcbiAgICBkYXlzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBnZXREYXRlXG4gICAgICAgIC5uZXdEYXRlKGl0ZW0ueWVhciwgaXRlbS5tb250aCwgaXRlbS5kYXkpXG4gICAgICAgIC5nZXRUaW1lKCk7XG5cbiAgICAgIGxldCBzZXREaXNhYmxlID0gZmFsc2U7XG4gICAgICBpZiAoZW5hYmxlQXJlYVRpbWVzdGFtcC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICgrZW5hYmxlQXJlYVRpbWVzdGFtcFswXSA+ICt0aW1lc3RhbXAgfHxcbiAgICAgICAgICAgICt0aW1lc3RhbXAgPiArZW5hYmxlQXJlYVRpbWVzdGFtcFsxXSkgJiZcbiAgICAgICAgICAhZW5hYmxlRGF5c1RpbWVzdGFtcC5pbmNsdWRlcygrdGltZXN0YW1wKVxuICAgICAgICApIHtcbiAgICAgICAgICBzZXREaXNhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZW5hYmxlRGF5c1RpbWVzdGFtcC5sZW5ndGggJiZcbiAgICAgICAgIWVuYWJsZURheXNUaW1lc3RhbXAuaW5jbHVkZXMoK3RpbWVzdGFtcClcbiAgICAgICkge1xuICAgICAgICBzZXREaXNhYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzZXREaXNhYmxlKSB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZSA9IHRydWU7XG4gICAgICAgIGl0ZW0uY2hvb3NlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBkaXNhYmxlUGFzdERheSB9ID1cbiAgICAgICAgQ2FsZW5kYXJDb25maWcodGhpcy5Db21wb25lbnQpLmdldENhbGVuZGFyQ29uZmlnKCkgfHwge307XG4gICAgICBpZiAoZGlzYWJsZVBhc3REYXkgJiYgdGltZXN0YW1wIC0gdG9kYXlUaW1lc3RhbXAgPCAwICYmICFpdGVtLmRpc2FibGUpIHtcbiAgICAgICAgaXRlbS5kaXNhYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog6K6h566X5LiL5LiA5ZGo55qE5pel5pyfXG4gICAqL1xuICBjYWxjdWxhdGVOZXh0V2Vla0RheXMoKSB7XG4gICAgbGV0IHsgbGFzdERheUluVGhpc1dlZWssIGxhc3REYXlJblRoaXNNb250aCB9ID0gdGhpcy5jYWxjdWxhdGVMYXN0RGF5KCk7XG4gICAgbGV0IHsgY3VyWWVhciwgY3VyTW9udGggfSA9IHRoaXMuZ2V0RGF0YSgnY2FsZW5kYXInKTtcbiAgICBsZXQgZGF5cyA9IFtdO1xuICAgIGlmIChsYXN0RGF5SW5UaGlzTW9udGggLSBsYXN0RGF5SW5UaGlzV2VlayA+PSA3KSB7XG4gICAgICBjb25zdCB7IFV5ZWFyLCBVbW9udGggfSA9IHRoaXMudXBkYXRlQ3VyclllYXJBbmRNb250aCgnbmV4dCcpO1xuICAgICAgY3VyWWVhciA9IFV5ZWFyO1xuICAgICAgY3VyTW9udGggPSBVbW9udGg7XG4gICAgICBmb3IgKGxldCBpID0gbGFzdERheUluVGhpc1dlZWsgKyAxOyBpIDw9IGxhc3REYXlJblRoaXNXZWVrICsgNzsgaSsrKSB7XG4gICAgICAgIGRheXMucHVzaCh7XG4gICAgICAgICAgeWVhcjogY3VyWWVhcixcbiAgICAgICAgICBtb250aDogY3VyTW9udGgsXG4gICAgICAgICAgZGF5OiBpLFxuICAgICAgICAgIHdlZWs6IGdldERhdGUuZGF5T2ZXZWVrKGN1clllYXIsIGN1ck1vbnRoLCBpKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IGxhc3REYXlJblRoaXNXZWVrICsgMTsgaSA8PSBsYXN0RGF5SW5UaGlzTW9udGg7IGkrKykge1xuICAgICAgICBkYXlzLnB1c2goe1xuICAgICAgICAgIHllYXI6IGN1clllYXIsXG4gICAgICAgICAgbW9udGg6IGN1ck1vbnRoLFxuICAgICAgICAgIGRheTogaSxcbiAgICAgICAgICB3ZWVrOiBnZXREYXRlLmRheU9mV2VlayhjdXJZZWFyLCBjdXJNb250aCwgaSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCB7IFV5ZWFyLCBVbW9udGggfSA9IHRoaXMudXBkYXRlQ3VyclllYXJBbmRNb250aCgnbmV4dCcpO1xuICAgICAgY3VyWWVhciA9IFV5ZWFyO1xuICAgICAgY3VyTW9udGggPSBVbW9udGg7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA3IC0gKGxhc3REYXlJblRoaXNNb250aCAtIGxhc3REYXlJblRoaXNXZWVrKTsgaSsrKSB7XG4gICAgICAgIGRheXMucHVzaCh7XG4gICAgICAgICAgeWVhcjogY3VyWWVhcixcbiAgICAgICAgICBtb250aDogY3VyTW9udGgsXG4gICAgICAgICAgZGF5OiBpLFxuICAgICAgICAgIHdlZWs6IGdldERhdGUuZGF5T2ZXZWVrKGN1clllYXIsIGN1ck1vbnRoLCBpKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGF5cyA9IHRoaXMuaW5pdFNlbGVjdGVkRGF5KGRheXMpO1xuICAgIHRoaXMuc2V0RW5hYmxlQXJlYU9uV2Vla01vZGUoZGF5cyk7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICdjYWxlbmRhci5jdXJZZWFyJzogY3VyWWVhcixcbiAgICAgICdjYWxlbmRhci5jdXJNb250aCc6IGN1ck1vbnRoLFxuICAgICAgJ2NhbGVuZGFyLmRheXMnOiBkYXlzXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOiuoeeul+S4iuS4gOWRqOeahOaXpeacn1xuICAgKi9cbiAgY2FsY3VsYXRlUHJldldlZWtEYXlzKCkge1xuICAgIGxldCB7IGZpcnN0RGF5SW5UaGlzV2VlayB9ID0gdGhpcy5jYWxjdWxhdGVGaXJzdERheSgpO1xuICAgIGxldCB7IGN1clllYXIsIGN1ck1vbnRoIH0gPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgbGV0IGRheXMgPSBbXTtcblxuICAgIGlmIChmaXJzdERheUluVGhpc1dlZWsgLSA3ID4gMCkge1xuICAgICAgY29uc3QgeyBVeWVhciwgVW1vbnRoIH0gPSB0aGlzLnVwZGF0ZUN1cnJZZWFyQW5kTW9udGgoJ3ByZXYnKTtcbiAgICAgIGN1clllYXIgPSBVeWVhcjtcbiAgICAgIGN1ck1vbnRoID0gVW1vbnRoO1xuICAgICAgZm9yIChsZXQgaSA9IGZpcnN0RGF5SW5UaGlzV2VlayAtIDc7IGkgPCBmaXJzdERheUluVGhpc1dlZWs7IGkrKykge1xuICAgICAgICBkYXlzLnB1c2goe1xuICAgICAgICAgIHllYXI6IGN1clllYXIsXG4gICAgICAgICAgbW9udGg6IGN1ck1vbnRoLFxuICAgICAgICAgIGRheTogaSxcbiAgICAgICAgICB3ZWVrOiBnZXREYXRlLmRheU9mV2VlayhjdXJZZWFyLCBjdXJNb250aCwgaSlcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0ZW1wID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGZpcnN0RGF5SW5UaGlzV2VlazsgaSsrKSB7XG4gICAgICAgIHRlbXAucHVzaCh7XG4gICAgICAgICAgeWVhcjogY3VyWWVhcixcbiAgICAgICAgICBtb250aDogY3VyTW9udGgsXG4gICAgICAgICAgZGF5OiBpLFxuICAgICAgICAgIHdlZWs6IGdldERhdGUuZGF5T2ZXZWVrKGN1clllYXIsIGN1ck1vbnRoLCBpKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgVXllYXIsIFVtb250aCB9ID0gdGhpcy51cGRhdGVDdXJyWWVhckFuZE1vbnRoKCdwcmV2Jyk7XG4gICAgICBjdXJZZWFyID0gVXllYXI7XG4gICAgICBjdXJNb250aCA9IFVtb250aDtcbiAgICAgIGNvbnN0IHByZXZNb250aERheXMgPSBnZXREYXRlLnRoaXNNb250aERheXMoY3VyWWVhciwgY3VyTW9udGgpO1xuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSBwcmV2TW9udGhEYXlzIC0gTWF0aC5hYnMoZmlyc3REYXlJblRoaXNXZWVrIC0gNyk7XG4gICAgICAgIGkgPD0gcHJldk1vbnRoRGF5cztcbiAgICAgICAgaSsrXG4gICAgICApIHtcbiAgICAgICAgZGF5cy5wdXNoKHtcbiAgICAgICAgICB5ZWFyOiBjdXJZZWFyLFxuICAgICAgICAgIG1vbnRoOiBjdXJNb250aCxcbiAgICAgICAgICBkYXk6IGksXG4gICAgICAgICAgd2VlazogZ2V0RGF0ZS5kYXlPZldlZWsoY3VyWWVhciwgY3VyTW9udGgsIGkpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZGF5cyA9IGRheXMuY29uY2F0KHRlbXApO1xuICAgIH1cbiAgICBkYXlzID0gdGhpcy5pbml0U2VsZWN0ZWREYXkoZGF5cyk7XG4gICAgdGhpcy5zZXRFbmFibGVBcmVhT25XZWVrTW9kZShkYXlzKTtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgJ2NhbGVuZGFyLmN1clllYXInOiBjdXJZZWFyLFxuICAgICAgJ2NhbGVuZGFyLmN1ck1vbnRoJzogY3VyTW9udGgsXG4gICAgICAnY2FsZW5kYXIuZGF5cyc6IGRheXNcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog6K6h566X5b2T5YmN6YCJ5Lit5pel5pyf5omA5Zyo5ZGo77yM5bm26YeN5paw5riy5p+T5pel5Y6GXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjdXJyZW50RGF5IOW9k+WJjemAieaLqeaXpeacn1xuICAgKi9cbiAgc2VsZWN0ZWREYXlXZWVrQWxsRGF5cyhjdXJyZW50RGF5KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0IHsgZGF5cywgY3VyWWVhciwgY3VyTW9udGggfSA9IHRoaXMuZ2V0RGF0YSgnY2FsZW5kYXInKTtcbiAgICAgIGxldCB7IHllYXIsIG1vbnRoLCBkYXkgfSA9IGN1cnJlbnREYXk7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldENhbGVuZGFyQ29uZmlnKCk7XG4gICAgICBjb25zdCBmaXJzdERheU9mV2Vla0lzTW9uID0gY29uZmlnLmZpcnN0RGF5T2ZXZWVrID09PSAnTW9uJztcbiAgICAgIGxldCBsYXN0V2Vla0RheXMgPSB0aGlzLmxhc3RXZWVrSW5Nb250aCh5ZWFyLCBtb250aCwgZmlyc3REYXlPZldlZWtJc01vbik7XG4gICAgICBjb25zdCBmaXJzdFdlZWtEYXlzID0gdGhpcy5maXJzdFdlZWtJbk1vbnRoKFxuICAgICAgICB5ZWFyLFxuICAgICAgICBtb250aCxcbiAgICAgICAgZmlyc3REYXlPZldlZWtJc01vblxuICAgICAgKTtcbiAgICAgIC8vIOWIpOaWremAieS4reaXpeacn+eahOaciOS7veaYr+WQpuS4juW9k+WJjeaciOS7veS4gOiHtFxuICAgICAgaWYgKGN1clllYXIgIT09IHllYXIgfHwgY3VyTW9udGggIT09IG1vbnRoKSBkYXkgPSAxO1xuICAgICAgaWYgKGN1clllYXIgIT09IHllYXIpIHllYXIgPSBjdXJZZWFyO1xuICAgICAgaWYgKGN1ck1vbnRoICE9PSBtb250aCkgbW9udGggPSBjdXJNb250aDtcbiAgICAgIGlmIChmaXJzdFdlZWtEYXlzLmZpbmQoaXRlbSA9PiBpdGVtLmRheSA9PT0gZGF5KSkge1xuICAgICAgICAvLyDlvZPliY3pgInmi6nnmoTml6XmnJ/kuLror6XmnIjnrKzkuIDlkahcbiAgICAgICAgbGV0IHRlbXAgPSBbXTtcbiAgICAgICAgY29uc3QgbGFzdERheUluVGhpc01vbnRoID0gZ2V0RGF0ZS50aGlzTW9udGhEYXlzKHllYXIsIG1vbnRoIC0gMSk7XG4gICAgICAgIGNvbnN0IHsgVXllYXIsIFVtb250aCB9ID0gdGhpcy51cGRhdGVDdXJyWWVhckFuZE1vbnRoKCdwcmV2Jyk7XG4gICAgICAgIGN1clllYXIgPSBVeWVhcjtcbiAgICAgICAgY3VyTW9udGggPSBVbW9udGg7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBsYXN0RGF5SW5UaGlzTW9udGggLSAoNyAtIGZpcnN0V2Vla0RheXMubGVuZ3RoKSArIDE7XG4gICAgICAgICAgaSA8PSBsYXN0RGF5SW5UaGlzTW9udGg7XG4gICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIHRlbXAucHVzaCh7XG4gICAgICAgICAgICB5ZWFyOiBjdXJZZWFyLFxuICAgICAgICAgICAgbW9udGg6IGN1ck1vbnRoLFxuICAgICAgICAgICAgZGF5OiBpLFxuICAgICAgICAgICAgd2VlazogZ2V0RGF0ZS5kYXlPZldlZWsoY3VyWWVhciwgY3VyTW9udGgsIGkpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZGF5cyA9IHRlbXAuY29uY2F0KGZpcnN0V2Vla0RheXMpO1xuICAgICAgfSBlbHNlIGlmIChsYXN0V2Vla0RheXMuZmluZChpdGVtID0+IGl0ZW0uZGF5ID09PSBkYXkpKSB7XG4gICAgICAgIC8vIOW9k+WJjemAieaLqeeahOaXpeacn+S4uuivpeaciOacgOWQjuS4gOWRqFxuICAgICAgICBjb25zdCB0ZW1wID0gW107XG4gICAgICAgIGlmIChsYXN0V2Vla0RheXMgJiYgbGFzdFdlZWtEYXlzLmxlbmd0aCA8IDcpIHtcbiAgICAgICAgICBjb25zdCB7IFV5ZWFyLCBVbW9udGggfSA9IHRoaXMudXBkYXRlQ3VyclllYXJBbmRNb250aCgnbmV4dCcpO1xuICAgICAgICAgIGN1clllYXIgPSBVeWVhcjtcbiAgICAgICAgICBjdXJNb250aCA9IFVtb250aDtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMSwgbGVuID0gNyAtIGxhc3RXZWVrRGF5cy5sZW5ndGg7IGkgPD0gbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRlbXAucHVzaCh7XG4gICAgICAgICAgICAgIHllYXI6IGN1clllYXIsXG4gICAgICAgICAgICAgIG1vbnRoOiBjdXJNb250aCxcbiAgICAgICAgICAgICAgZGF5OiBpLFxuICAgICAgICAgICAgICB3ZWVrOiBnZXREYXRlLmRheU9mV2VlayhjdXJZZWFyLCBjdXJNb250aCwgaSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkYXlzID0gbGFzdFdlZWtEYXlzLmNvbmNhdCh0ZW1wKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHdlZWsgPSBnZXREYXRlLmRheU9mV2Vlayh5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgICAgbGV0IHJhbmdlID0gW2RheSAtIHdlZWssIGRheSArICg2IC0gd2VlayldO1xuICAgICAgICBpZiAoZmlyc3REYXlPZldlZWtJc01vbikge1xuICAgICAgICAgIHJhbmdlID0gW2RheSArIDEgLSB3ZWVrLCBkYXkgKyAoNyAtIHdlZWspXTtcbiAgICAgICAgfVxuICAgICAgICBkYXlzID0gZGF5cy5zbGljZShyYW5nZVswXSAtIDEsIHJhbmdlWzFdKTtcbiAgICAgIH1cbiAgICAgIGRheXMgPSB0aGlzLmluaXRTZWxlY3RlZERheShkYXlzKTtcbiAgICAgIHRoaXMuc2V0RGF0YShcbiAgICAgICAge1xuICAgICAgICAgICdjYWxlbmRhci5kYXlzJzogZGF5cyxcbiAgICAgICAgICAnY2FsZW5kYXIuZW1weXRHcmlkcyc6IFtdLFxuICAgICAgICAgICdjYWxlbmRhci5sYXN0RW1wdHlHcmlkcyc6IFtdXG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdmVcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbiAgX190aXBzV2hlbkNhbk5vdFN3dGljaCgpIHtcbiAgICBsb2dnZXIuaW5mbyhcbiAgICAgICflvZPliY3mnIjku73mnKrpgInkuK3ml6XmnJ/kuIvliIfmjaLkuLrlkajop4blm77vvIzkuI3og73mmI7noa7or6XlsZXnpLrlk6rkuIDlkajnmoTml6XmnJ/vvIzmlYXmraTmg4XlhrXkuI3lhYHorrjliIfmjaInXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQgPT4gbmV3IFdlZWtNb2RlKGNvbXBvbmVudCk7XG4iXX0=