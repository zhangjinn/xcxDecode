'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _todo = require('./todo.js');

var _todo2 = _interopRequireDefault(_todo);

var _wxData = require('./wxData.js');

var _wxData2 = _interopRequireDefault(_wxData);

var _convertSolarLunar = require('./convertSolarLunar.js');

var _convertSolarLunar2 = _interopRequireDefault(_convertSolarLunar);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getDate = new _utils.GetDate();

var Calendar = function (_WxData) {
  _inherits(Calendar, _WxData);

  function Calendar(component) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, component));

    _this.Component = component;
    return _this;
  }

  _createClass(Calendar, [{
    key: 'getCalendarConfig',
    value: function getCalendarConfig() {
      return this.Component.config;
    }
    /**
     * 渲染日历
     * @param {number} curYear
     * @param {number} curMonth
     * @param {number} curDate
     */

  }, {
    key: 'renderCalendar',
    value: function renderCalendar(curYear, curMonth, curDate) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.calculateEmptyGrids(curYear, curMonth);
        _this2.calculateDays(curYear, curMonth, curDate);

        var _ref = _this2.getData('calendar') || {},
            todoLabels = _ref.todoLabels;

        if (todoLabels && todoLabels instanceof Array && todoLabels.find(function (item) {
          return +item.month === +curMonth;
        })) {
          (0, _todo2.default)(_this2.Component).setTodoLabels();
        }

        if (!_this2.Component.firstRender) {
          resolve();
        }
      });
    }
    /**
     * 计算当前月份前后两月应占的格子
     * @param {number} year 年份
     * @param {number} month 月份
     */

  }, {
    key: 'calculateEmptyGrids',
    value: function calculateEmptyGrids(year, month) {
      this.calculatePrevMonthGrids(year, month);
      this.calculateNextMonthGrids(year, month);
    }
    /**
     * 计算上月应占的格子
     * @param {number} year 年份
     * @param {number} month 月份
     */

  }, {
    key: 'calculatePrevMonthGrids',
    value: function calculatePrevMonthGrids(year, month) {
      var empytGrids = [];
      var prevMonthDays = getDate.thisMonthDays(year, month - 1);
      var firstDayOfWeek = getDate.firstDayOfWeek(year, month);
      var config = this.getCalendarConfig() || {};
      if (config.firstDayOfWeek === 'Mon') {
        if (firstDayOfWeek === 0) {
          firstDayOfWeek = 6;
        } else {
          firstDayOfWeek -= 1;
        }
      }
      if (firstDayOfWeek > 0) {
        var len = prevMonthDays - firstDayOfWeek;
        var onlyShowCurrentMonth = config.onlyShowCurrentMonth;

        var _getCalendarConfig = this.getCalendarConfig(),
            showLunar = _getCalendarConfig.showLunar;

        for (var i = prevMonthDays; i > len; i--) {
          if (onlyShowCurrentMonth) {
            empytGrids.push('');
          } else {
            empytGrids.push({
              day: i,
              lunar: showLunar ? _convertSolarLunar2.default.solar2lunar(year, month - 1, i) : null
            });
          }
        }
        this.setData({
          'calendar.empytGrids': empytGrids.reverse()
        });
      } else {
        this.setData({
          'calendar.empytGrids': null
        });
      }
    }
    /**
     * 计算下一月日期是否需要多展示的日期
     * 某些月份日期为5排，某些月份6排，统一为6排
     * @param {number} year
     * @param {number} month
     * @param {object} config
     */

  }, {
    key: 'calculateExtraEmptyDate',
    value: function calculateExtraEmptyDate(year, month, config) {
      var extDate = 0;
      if (+month === 2) {
        extDate += 7;
        var firstDayofMonth = getDate.dayOfWeek(year, month, 1);
        if (config.firstDayOfWeek === 'Mon') {
          if (+firstDayofMonth === 1) extDate += 7;
        } else {
          if (+firstDayofMonth === 0) extDate += 7;
        }
      } else {
        var _firstDayofMonth = getDate.dayOfWeek(year, month, 1);
        if (config.firstDayOfWeek === 'Mon') {
          if (_firstDayofMonth !== 0 && _firstDayofMonth < 6) {
            extDate += 7;
          }
        } else {
          if (_firstDayofMonth < 6) {
            extDate += 7;
          }
        }
      }
      return extDate;
    }
    /**
     * 计算下月应占的格子
     * @param {number} year 年份
     * @param {number} month  月份
     */

  }, {
    key: 'calculateNextMonthGrids',
    value: function calculateNextMonthGrids(year, month) {
      var lastEmptyGrids = [];
      var thisMonthDays = getDate.thisMonthDays(year, month);
      var lastDayWeek = getDate.dayOfWeek(year, month, thisMonthDays);
      var config = this.getCalendarConfig() || {};
      if (config.firstDayOfWeek === 'Mon') {
        if (lastDayWeek === 0) {
          lastDayWeek = 6;
        } else {
          lastDayWeek -= 1;
        }
      }
      var len = 7 - (lastDayWeek + 1);
      var onlyShowCurrentMonth = config.onlyShowCurrentMonth,
          showLunar = config.showLunar;

      if (!onlyShowCurrentMonth) {
        len = len + this.calculateExtraEmptyDate(year, month, config);
      }
      for (var i = 1; i <= len; i++) {
        if (onlyShowCurrentMonth) {
          lastEmptyGrids.push('');
        } else {
          lastEmptyGrids.push({
            day: i,
            lunar: showLunar ? _convertSolarLunar2.default.solar2lunar(year, month + 1, i) : null
          });
        }
      }
      this.setData({
        'calendar.lastEmptyGrids': lastEmptyGrids
      });
    }
    /**
     * 日历初始化将默认值写入 selectDay
     * @param {number} year
     * @param {number} month
     * @param {number} curDate
     */

  }, {
    key: 'setSelectedDay',
    value: function setSelectedDay(year, month, curDate) {
      var selectedDay = [];
      var config = this.getCalendarConfig();
      if (config.noDefault) {
        selectedDay = [];
        config.noDefault = false;
      } else {
        var data = this.getData('calendar') || {};

        var _getCalendarConfig2 = this.getCalendarConfig(),
            showLunar = _getCalendarConfig2.showLunar;

        selectedDay = curDate ? [{
          year: year,
          month: month,
          day: curDate,
          choosed: true,
          week: getDate.dayOfWeek(year, month, curDate),
          lunar: showLunar ? _convertSolarLunar2.default.solar2lunar(year, month, curDate) : null
        }] : data.selectedDay;
      }
      return selectedDay;
    }
    /**
     *
     * @param {number} year
     * @param {number} month
     */

  }, {
    key: 'buildDate',
    value: function buildDate(year, month) {
      var thisMonthDays = getDate.thisMonthDays(year, month);
      var dates = [];
      for (var i = 1; i <= thisMonthDays; i++) {
        dates.push({
          year: year,
          month: month,
          day: i,
          choosed: false,
          week: getDate.dayOfWeek(year, month, i)
        });
      }
      return dates;
    }
    /**
     * 设置日历面板数据
     * @param {number} year 年份
     * @param {number} month  月份
     */

  }, {
    key: 'calculateDays',
    value: function calculateDays(year, month, curDate) {
      var _this3 = this;

      var days = [];

      var _getData = this.getData('calendar'),
          todayTimestamp = _getData.todayTimestamp,
          _getData$disableDays = _getData.disableDays,
          disableDays = _getData$disableDays === undefined ? [] : _getData$disableDays;

      days = this.buildDate(year, month);
      var selectedDay = this.setSelectedDay(year, month, curDate);
      var selectedDayCol = selectedDay.map(function (d) {
        return +d.year + '-' + +d.month + '-' + +d.day;
      });
      var disableDaysCol = disableDays.map(function (d) {
        return +d.year + '-' + +d.month + '-' + +d.day;
      });
      days.forEach(function (item) {
        var cur = +item.year + '-' + +item.month + '-' + +item.day;
        if (selectedDayCol.includes(cur)) item.choosed = true;
        if (disableDaysCol.includes(cur)) item.disable = true;
        var timestamp = getDate.newDate(item.year, item.month, item.day).getTime();

        var _getCalendarConfig3 = _this3.getCalendarConfig(),
            showLunar = _getCalendarConfig3.showLunar,
            disablePastDay = _getCalendarConfig3.disablePastDay,
            disableLaterDay = _getCalendarConfig3.disableLaterDay;

        if (showLunar) {
          item.lunar = _convertSolarLunar2.default.solar2lunar(+item.year, +item.month, +item.day);
        }
        var disabelByConfig = false;
        if (disablePastDay) {
          disabelByConfig = disablePastDay && timestamp - todayTimestamp < 0 && !item.disable;
        } else if (disableLaterDay) {
          disabelByConfig = disableLaterDay && timestamp - todayTimestamp > 0 && !item.disable;
        }
        var isDisable = disabelByConfig || _this3.__isDisable(timestamp);
        if (isDisable) {
          item.disable = true;
          item.choosed = false;
        }
      });
      this.setData({
        'calendar.days': days,
        'calendar.selectedDay': selectedDay || []
      });
    }
  }, {
    key: '__isDisable',
    value: function __isDisable(timestamp) {
      var _getData2 = this.getData('calendar'),
          _getData2$enableArea = _getData2.enableArea,
          enableArea = _getData2$enableArea === undefined ? [] : _getData2$enableArea,
          _getData2$enableDays = _getData2.enableDays,
          enableDays = _getData2$enableDays === undefined ? [] : _getData2$enableDays,
          _getData2$enableAreaT = _getData2.enableAreaTimestamp,
          enableAreaTimestamp = _getData2$enableAreaT === undefined ? [] : _getData2$enableAreaT;

      var setDisable = false;
      var expectEnableDaysTimestamp = (0, _utils.converEnableDaysToTimestamp)(enableDays);
      if (enableArea.length) {
        expectEnableDaysTimestamp = (0, _utils.delRepeatedEnableDay)(enableDays, enableArea);
      }
      if (enableAreaTimestamp.length) {
        if ((+enableAreaTimestamp[0] > +timestamp || +timestamp > +enableAreaTimestamp[1]) && !expectEnableDaysTimestamp.includes(+timestamp)) {
          setDisable = true;
        }
      } else if (expectEnableDaysTimestamp.length && !expectEnableDaysTimestamp.includes(+timestamp)) {
        setDisable = true;
      }
      return setDisable;
    }
  }]);

  return Calendar;
}(_wxData2.default);

exports.default = function (component) {
  return new Calendar(component);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlci5qcyJdLCJuYW1lcyI6WyJnZXREYXRlIiwiR2V0RGF0ZSIsIkNhbGVuZGFyIiwiY29tcG9uZW50IiwiQ29tcG9uZW50IiwiY29uZmlnIiwiY3VyWWVhciIsImN1ck1vbnRoIiwiY3VyRGF0ZSIsIlByb21pc2UiLCJjYWxjdWxhdGVFbXB0eUdyaWRzIiwiY2FsY3VsYXRlRGF5cyIsImdldERhdGEiLCJ0b2RvTGFiZWxzIiwiQXJyYXkiLCJmaW5kIiwiaXRlbSIsIm1vbnRoIiwic2V0VG9kb0xhYmVscyIsImZpcnN0UmVuZGVyIiwicmVzb2x2ZSIsInllYXIiLCJjYWxjdWxhdGVQcmV2TW9udGhHcmlkcyIsImNhbGN1bGF0ZU5leHRNb250aEdyaWRzIiwiZW1weXRHcmlkcyIsInByZXZNb250aERheXMiLCJ0aGlzTW9udGhEYXlzIiwiZmlyc3REYXlPZldlZWsiLCJnZXRDYWxlbmRhckNvbmZpZyIsImxlbiIsIm9ubHlTaG93Q3VycmVudE1vbnRoIiwic2hvd0x1bmFyIiwiaSIsInB1c2giLCJkYXkiLCJsdW5hciIsImNvbnZlcnRTb2xhckx1bmFyIiwic29sYXIybHVuYXIiLCJzZXREYXRhIiwicmV2ZXJzZSIsImV4dERhdGUiLCJmaXJzdERheW9mTW9udGgiLCJkYXlPZldlZWsiLCJsYXN0RW1wdHlHcmlkcyIsImxhc3REYXlXZWVrIiwiY2FsY3VsYXRlRXh0cmFFbXB0eURhdGUiLCJzZWxlY3RlZERheSIsIm5vRGVmYXVsdCIsImRhdGEiLCJjaG9vc2VkIiwid2VlayIsImRhdGVzIiwiZGF5cyIsInRvZGF5VGltZXN0YW1wIiwiZGlzYWJsZURheXMiLCJidWlsZERhdGUiLCJzZXRTZWxlY3RlZERheSIsInNlbGVjdGVkRGF5Q29sIiwibWFwIiwiZCIsImRpc2FibGVEYXlzQ29sIiwiZm9yRWFjaCIsImN1ciIsImluY2x1ZGVzIiwiZGlzYWJsZSIsInRpbWVzdGFtcCIsIm5ld0RhdGUiLCJnZXRUaW1lIiwiZGlzYWJsZVBhc3REYXkiLCJkaXNhYmxlTGF0ZXJEYXkiLCJkaXNhYmVsQnlDb25maWciLCJpc0Rpc2FibGUiLCJfX2lzRGlzYWJsZSIsImVuYWJsZUFyZWEiLCJlbmFibGVEYXlzIiwiZW5hYmxlQXJlYVRpbWVzdGFtcCIsInNldERpc2FibGUiLCJleHBlY3RFbmFibGVEYXlzVGltZXN0YW1wIiwibGVuZ3RoIiwiV3hEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBTUEsSUFBTUEsVUFBVSxJQUFJQyxjQUFKLEVBQWhCOztJQUVNQyxROzs7QUFDSixvQkFBWUMsU0FBWixFQUF1QjtBQUFBOztBQUFBLG9IQUNmQSxTQURlOztBQUVyQixVQUFLQyxTQUFMLEdBQWlCRCxTQUFqQjtBQUZxQjtBQUd0Qjs7Ozt3Q0FDbUI7QUFDbEIsYUFBTyxLQUFLQyxTQUFMLENBQWVDLE1BQXRCO0FBQ0Q7QUFDRDs7Ozs7Ozs7O21DQU1lQyxPLEVBQVNDLFEsRUFBVUMsTyxFQUFTO0FBQUE7O0FBQ3pDLGFBQU8sSUFBSUMsT0FBSixDQUFZLG1CQUFXO0FBQzVCLGVBQUtDLG1CQUFMLENBQXlCSixPQUF6QixFQUFrQ0MsUUFBbEM7QUFDQSxlQUFLSSxhQUFMLENBQW1CTCxPQUFuQixFQUE0QkMsUUFBNUIsRUFBc0NDLE9BQXRDOztBQUY0QixtQkFHTCxPQUFLSSxPQUFMLENBQWEsVUFBYixLQUE0QixFQUh2QjtBQUFBLFlBR3BCQyxVQUhvQixRQUdwQkEsVUFIb0I7O0FBSTVCLFlBQ0VBLGNBQ0FBLHNCQUFzQkMsS0FEdEIsSUFFQUQsV0FBV0UsSUFBWCxDQUFnQjtBQUFBLGlCQUFRLENBQUNDLEtBQUtDLEtBQU4sS0FBZ0IsQ0FBQ1YsUUFBekI7QUFBQSxTQUFoQixDQUhGLEVBSUU7QUFDQSw4QkFBSyxPQUFLSCxTQUFWLEVBQXFCYyxhQUFyQjtBQUNEOztBQUVELFlBQUksQ0FBQyxPQUFLZCxTQUFMLENBQWVlLFdBQXBCLEVBQWlDO0FBQy9CQztBQUNEO0FBQ0YsT0FmTSxDQUFQO0FB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O0FBQUEsMkNBRW5CNkQsVUFGbUI7QUFBQSxVQUVuQkEsVUFGbUIsd0NBRU4sRUFGTTtBQUFBLDJDQUduQkMsVUFIbUI7QUFBQSxVQUduQkEsVUFIbUIsd0NBR04sRUFITTtBQUFBLDRDQUluQkMsbUJBSm1CO0FBQUEsVUFJbkJBLG1CQUptQix5Q0FJRyxFQUpIOztBQU1yQixVQUFJQyxhQUFhLEtBQWpCO0FBQ0EsVUFBSUMsNEJBQTRCLHdDQUE0QkgsVUFBNUIsQ0FBaEM7QUFDQSxVQUFJRCxXQUFXSyxNQUFmLEVBQXVCO0FBQ3JCRCxvQ0FBNEIsaUNBQXFCSCxVQUFyQixFQUFpQ0QsVUFBakMsQ0FBNUI7QUFDRDtBQUNELFVBQUlFLG9CQUFvQkcsTUFBeEIsRUFBZ0M7QUFDOUIsWUFDRSxDQUFDLENBQUNILG9CQUFvQixDQUFwQixDQUFELEdBQTBCLENBQUNWLFNBQTNCLElBQ0MsQ0FBQ0EsU0FBRCxHQUFhLENBQUNVLG9CQUFvQixDQUFwQixDQURoQixLQUVBLENBQUNFLDBCQUEwQmQsUUFBMUIsQ0FBbUMsQ0FBQ0UsU0FBcEMsQ0FISCxFQUlFO0FBQ0FXLHVCQUFhLElBQWI7QUFDRDtBQUNGLE9BUkQsTUFRTyxJQUNMQywwQkFBMEJDLE1BQTFCLElBQ0EsQ0FBQ0QsMEJBQTBCZCxRQUExQixDQUFtQyxDQUFDRSxTQUFwQyxDQUZJLEVBR0w7QUFDQVcscUJBQWEsSUFBYjtBQUNEO0FBQ0QsYUFBT0EsVUFBUDtBQUNEOzs7O0VBM1JvQkcsZ0I7O2tCQThSUjtBQUFBLFNBQWEsSUFBSTdFLFFBQUosQ0FBYUMsU0FBYixDQUFiO0FBQUEsQyIsImZpbGUiOiJyZW5kZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9kbyBmcm9tICcuL3RvZG8nO1xuaW1wb3J0IFd4RGF0YSBmcm9tICcuL3d4RGF0YSc7XG5pbXBvcnQgY29udmVydFNvbGFyTHVuYXIgZnJvbSAnLi9jb252ZXJ0U29sYXJMdW5hcic7XG5pbXBvcnQge1xuICBHZXREYXRlLFxuICBkZWxSZXBlYXRlZEVuYWJsZURheSxcbiAgY29udmVyRW5hYmxlRGF5c1RvVGltZXN0YW1wXG59IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBnZXREYXRlID0gbmV3IEdldERhdGUoKTtcblxuY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyBXeERhdGEge1xuICBjb25zdHJ1Y3Rvcihjb21wb25lbnQpIHtcbiAgICBzdXBlcihjb21wb25lbnQpO1xuICAgIHRoaXMuQ29tcG9uZW50ID0gY29tcG9uZW50O1xuICB9XG4gIGdldENhbGVuZGFyQ29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLkNvbXBvbmVudC5jb25maWc7XG4gIH1cbiAgLyoqXG4gICAqIOa4suafk+aXpeWOhlxuICAgKiBAcGFyYW0ge251bWJlcn0gY3VyWWVhclxuICAgKiBAcGFyYW0ge251bWJlcn0gY3VyTW9udGhcbiAgICogQHBhcmFtIHtudW1iZXJ9IGN1ckRhdGVcbiAgICovXG4gIHJlbmRlckNhbGVuZGFyKGN1clllYXIsIGN1ck1vbnRoLCBjdXJEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5jYWxjdWxhdGVFbXB0eUdyaWRzKGN1clllYXIsIGN1ck1vbnRoKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlRGF5cyhjdXJZZWFyLCBjdXJNb250aCwgY3VyRGF0ZSk7XG4gICAgICBjb25zdCB7IHRvZG9MYWJlbHMgfSA9IHRoaXMuZ2V0RGF0YSgnY2FsZW5kYXInKSB8fCB7fTtcbiAgICAgIGlmIChcbiAgICAgICAgdG9kb0xhYmVscyAmJlxuICAgICAgICB0b2RvTGFiZWxzIGluc3RhbmNlb2YgQXJyYXkgJiZcbiAgICAgICAgdG9kb0xhYmVscy5maW5kKGl0ZW0gPT4gK2l0ZW0ubW9udGggPT09ICtjdXJNb250aClcbiAgICAgICkge1xuICAgICAgICBUb2RvKHRoaXMuQ29tcG9uZW50KS5zZXRUb2RvTGFiZWxzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5Db21wb25lbnQuZmlyc3RSZW5kZXIpIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDorqHnrpflvZPliY3mnIjku73liY3lkI7kuKTmnIjlupTljaDnmoTmoLzlrZBcbiAgICogQHBhcmFtIHtudW1iZXJ9IHllYXIg5bm05Lu9XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCDmnIjku71cbiAgICovXG4gIGNhbGN1bGF0ZUVtcHR5R3JpZHMoeWVhciwgbW9udGgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZVByZXZNb250aEdyaWRzKHllYXIsIG1vbnRoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZU5leHRNb250aEdyaWRzKHllYXIsIG1vbnRoKTtcbiAgfVxuICAvKipcbiAgICog6K6h566X5LiK5pyI5bqU5Y2g55qE5qC85a2QXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyIOW5tOS7vVxuICAgKiBAcGFyYW0ge251bWJlcn0gbW9udGgg5pyI5Lu9XG4gICAqL1xuICBjYWxjdWxhdGVQcmV2TW9udGhHcmlkcyh5ZWFyLCBtb250aCkge1xuICAgIGxldCBlbXB5dEdyaWRzID0gW107XG4gICAgY29uc3QgcHJldk1vbnRoRGF5cyA9IGdldERhdGUudGhpc01vbnRoRGF5cyh5ZWFyLCBtb250aCAtIDEpO1xuICAgIGxldCBmaXJzdERheU9mV2VlayA9IGdldERhdGUuZmlyc3REYXlPZldlZWsoeWVhciwgbW9udGgpO1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0Q2FsZW5kYXJDb25maWcoKSB8fCB7fTtcbiAgICBpZiAoY29uZmlnLmZpcnN0RGF5T2ZXZWVrID09PSAnTW9uJykge1xuICAgICAgaWYgKGZpcnN0RGF5T2ZXZWVrID09PSAwKSB7XG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrID0gNjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrIC09IDE7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmaXJzdERheU9mV2VlayA+IDApIHtcbiAgICAgIGNvbnN0IGxlbiA9IHByZXZNb250aERheXMgLSBmaXJzdERheU9mV2VlaztcbiAgICAgIGNvbnN0IHsgb25seVNob3dDdXJyZW50TW9udGggfSA9IGNvbmZpZztcbiAgICAgIGNvbnN0IHsgc2hvd0x1bmFyIH0gPSB0aGlzLmdldENhbGVuZGFyQ29uZmlnKCk7XG4gICAgICBmb3IgKGxldCBpID0gcHJldk1vbnRoRGF5czsgaSA+IGxlbjsgaS0tKSB7XG4gICAgICAgIGlmIChvbmx5U2hvd0N1cnJlbnRNb250aCkge1xuICAgICAgICAgIGVtcHl0R3JpZHMucHVzaCgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW1weXRHcmlkcy5wdXNoKHtcbiAgICAgICAgICAgIGRheTogaSxcbiAgICAgICAgICAgIGx1bmFyOiBzaG93THVuYXJcbiAgICAgICAgICAgICAgPyBjb252ZXJ0U29sYXJMdW5hci5zb2xhcjJsdW5hcih5ZWFyLCBtb250aCAtIDEsIGkpXG4gICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAnY2FsZW5kYXIuZW1weXRHcmlkcyc6IGVtcHl0R3JpZHMucmV2ZXJzZSgpXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgJ2NhbGVuZGFyLmVtcHl0R3JpZHMnOiBudWxsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOiuoeeul+S4i+S4gOaciOaXpeacn+aYr+WQpumcgOimgeWkmuWxleekuueahOaXpeacn1xuICAgKiDmn5DkupvmnIjku73ml6XmnJ/kuLo15o6S77yM5p+Q5Lqb5pyI5Lu9NuaOku+8jOe7n+S4gOS4ujbmjpJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHllYXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1vbnRoXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWdcbiAgICovXG4gIGNhbGN1bGF0ZUV4dHJhRW1wdHlEYXRlKHllYXIsIG1vbnRoLCBjb25maWcpIHtcbiAgICBsZXQgZXh0RGF0ZSA9IDA7XG4gICAgaWYgKCttb250aCA9PT0gMikge1xuICAgICAgZXh0RGF0ZSArPSA3O1xuICAgICAgbGV0IGZpcnN0RGF5b2ZNb250aCA9IGdldERhdGUuZGF5T2ZXZWVrKHllYXIsIG1vbnRoLCAxKTtcbiAgICAgIGlmIChjb25maWcuZmlyc3REYXlPZldlZWsgPT09ICdNb24nKSB7XG4gICAgICAgIGlmICgrZmlyc3REYXlvZk1vbnRoID09PSAxKSBleHREYXRlICs9IDc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoK2ZpcnN0RGF5b2ZNb250aCA9PT0gMCkgZXh0RGF0ZSArPSA3O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZmlyc3REYXlvZk1vbnRoID0gZ2V0RGF0ZS5kYXlPZldlZWsoeWVhciwgbW9udGgsIDEpO1xuICAgICAgaWYgKGNvbmZpZy5maXJzdERheU9mV2VlayA9PT0gJ01vbicpIHtcbiAgICAgICAgaWYgKGZpcnN0RGF5b2ZNb250aCAhPT0gMCAmJiBmaXJzdERheW9mTW9udGggPCA2KSB7XG4gICAgICAgICAgZXh0RGF0ZSArPSA3O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZmlyc3REYXlvZk1vbnRoIDwgNikge1xuICAgICAgICAgIGV4dERhdGUgKz0gNztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXh0RGF0ZTtcbiAgfVxuICAvKipcbiAgICog6K6h566X5LiL5pyI5bqU5Y2g55qE5qC85a2QXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyIOW5tOS7vVxuICAgKiBAcGFyYW0ge251bWJlcn0gbW9udGggIOaciOS7vVxuICAgKi9cbiAgY2FsY3VsYXRlTmV4dE1vbnRoR3JpZHMoeWVhciwgbW9udGgpIHtcbiAgICBsZXQgbGFzdEVtcHR5R3JpZHMgPSBbXTtcbiAgICBjb25zdCB0aGlzTW9udGhEYXlzID0gZ2V0RGF0ZS50aGlzTW9udGhEYXlzKHllYXIsIG1vbnRoKTtcbiAgICBsZXQgbGFzdERheVdlZWsgPSBnZXREYXRlLmRheU9mV2Vlayh5ZWFyLCBtb250aCwgdGhpc01vbnRoRGF5cyk7XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRDYWxlbmRhckNvbmZpZygpIHx8IHt9O1xuICAgIGlmIChjb25maWcuZmlyc3REYXlPZldlZWsgPT09ICdNb24nKSB7XG4gICAgICBpZiAobGFzdERheVdlZWsgPT09IDApIHtcbiAgICAgICAgbGFzdERheVdlZWsgPSA2O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGFzdERheVdlZWsgLT0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IGxlbiA9IDcgLSAobGFzdERheVdlZWsgKyAxKTtcbiAgICBjb25zdCB7IG9ubHlTaG93Q3VycmVudE1vbnRoLCBzaG93THVuYXIgfSA9IGNvbmZpZztcbiAgICBpZiAoIW9ubHlTaG93Q3VycmVudE1vbnRoKSB7XG4gICAgICBsZW4gPSBsZW4gKyB0aGlzLmNhbGN1bGF0ZUV4dHJhRW1wdHlEYXRlKHllYXIsIG1vbnRoLCBjb25maWcpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsZW47IGkrKykge1xuICAgICAgaWYgKG9ubHlTaG93Q3VycmVudE1vbnRoKSB7XG4gICAgICAgIGxhc3RFbXB0eUdyaWRzLnB1c2goJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGFzdEVtcHR5R3JpZHMucHVzaCh7XG4gICAgICAgICAgZGF5OiBpLFxuICAgICAgICAgIGx1bmFyOiBzaG93THVuYXJcbiAgICAgICAgICAgID8gY29udmVydFNvbGFyTHVuYXIuc29sYXIybHVuYXIoeWVhciwgbW9udGggKyAxLCBpKVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgJ2NhbGVuZGFyLmxhc3RFbXB0eUdyaWRzJzogbGFzdEVtcHR5R3JpZHNcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog5pel5Y6G5Yid5aeL5YyW5bCG6buY6K6k5YC85YaZ5YWlIHNlbGVjdERheVxuICAgKiBAcGFyYW0ge251bWJlcn0geWVhclxuICAgKiBAcGFyYW0ge251bWJlcn0gbW9udGhcbiAgICogQHBhcmFtIHtudW1iZXJ9IGN1ckRhdGVcbiAgICovXG4gIHNldFNlbGVjdGVkRGF5KHllYXIsIG1vbnRoLCBjdXJEYXRlKSB7XG4gICAgbGV0IHNlbGVjdGVkRGF5ID0gW107XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRDYWxlbmRhckNvbmZpZygpO1xuICAgIGlmIChjb25maWcubm9EZWZhdWx0KSB7XG4gICAgICBzZWxlY3RlZERheSA9IFtdO1xuICAgICAgY29uZmlnLm5vRGVmYXVsdCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5nZXREYXRhKCdjYWxlbmRhcicpIHx8IHt9O1xuICAgICAgY29uc3QgeyBzaG93THVuYXIgfSA9IHRoaXMuZ2V0Q2FsZW5kYXJDb25maWcoKTtcbiAgICAgIHNlbGVjdGVkRGF5ID0gY3VyRGF0ZVxuICAgICAgICA/IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICAgIGRheTogY3VyRGF0ZSxcbiAgICAgICAgICAgICAgY2hvb3NlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgd2VlazogZ2V0RGF0ZS5kYXlPZldlZWsoeWVhciwgbW9udGgsIGN1ckRhdGUpLFxuICAgICAgICAgICAgICBsdW5hcjogc2hvd0x1bmFyXG4gICAgICAgICAgICAgICAgPyBjb252ZXJ0U29sYXJMdW5hci5zb2xhcjJsdW5hcih5ZWFyLCBtb250aCwgY3VyRGF0ZSlcbiAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIDogZGF0YS5zZWxlY3RlZERheTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGVkRGF5O1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0geWVhclxuICAgKiBAcGFyYW0ge251bWJlcn0gbW9udGhcbiAgICovXG4gIGJ1aWxkRGF0ZSh5ZWFyLCBtb250aCkge1xuICAgIGNvbnN0IHRoaXNNb250aERheXMgPSBnZXREYXRlLnRoaXNNb250aERheXMoeWVhciwgbW9udGgpO1xuICAgIGNvbnN0IGRhdGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpc01vbnRoRGF5czsgaSsrKSB7XG4gICAgICBkYXRlcy5wdXNoKHtcbiAgICAgICAgeWVhcixcbiAgICAgICAgbW9udGgsXG4gICAgICAgIGRheTogaSxcbiAgICAgICAgY2hvb3NlZDogZmFsc2UsXG4gICAgICAgIHdlZWs6IGdldERhdGUuZGF5T2ZXZWVrKHllYXIsIG1vbnRoLCBpKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRlcztcbiAgfVxuICAvKipcbiAgICog6K6+572u5pel5Y6G6Z2i5p2/5pWw5o2uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyIOW5tOS7vVxuICAgKiBAcGFyYW0ge251bWJlcn0gbW9udGggIOaciOS7vVxuICAgKi9cbiAgY2FsY3VsYXRlRGF5cyh5ZWFyLCBtb250aCwgY3VyRGF0ZSkge1xuICAgIGxldCBkYXlzID0gW107XG4gICAgY29uc3QgeyB0b2RheVRpbWVzdGFtcCwgZGlzYWJsZURheXMgPSBbXSB9ID0gdGhpcy5nZXREYXRhKCdjYWxlbmRhcicpO1xuICAgIGRheXMgPSB0aGlzLmJ1aWxkRGF0ZSh5ZWFyLCBtb250aCk7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXkgPSB0aGlzLnNldFNlbGVjdGVkRGF5KHllYXIsIG1vbnRoLCBjdXJEYXRlKTtcbiAgICBjb25zdCBzZWxlY3RlZERheUNvbCA9IHNlbGVjdGVkRGF5Lm1hcChcbiAgICAgIGQgPT4gYCR7K2QueWVhcn0tJHsrZC5tb250aH0tJHsrZC5kYXl9YFxuICAgICk7XG4gICAgY29uc3QgZGlzYWJsZURheXNDb2wgPSBkaXNhYmxlRGF5cy5tYXAoXG4gICAgICBkID0+IGAkeytkLnllYXJ9LSR7K2QubW9udGh9LSR7K2QuZGF5fWBcbiAgICApO1xuICAgIGRheXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGN1ciA9IGAkeytpdGVtLnllYXJ9LSR7K2l0ZW0ubW9udGh9LSR7K2l0ZW0uZGF5fWA7XG4gICAgICBpZiAoc2VsZWN0ZWREYXlDb2wuaW5jbHVkZXMoY3VyKSkgaXRlbS5jaG9vc2VkID0gdHJ1ZTtcbiAgICAgIGlmIChkaXNhYmxlRGF5c0NvbC5pbmNsdWRlcyhjdXIpKSBpdGVtLmRpc2FibGUgPSB0cnVlO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gZ2V0RGF0ZVxuICAgICAgICAubmV3RGF0ZShpdGVtLnllYXIsIGl0ZW0ubW9udGgsIGl0ZW0uZGF5KVxuICAgICAgICAuZ2V0VGltZSgpO1xuICAgICAgY29uc3Qge1xuICAgICAgICBzaG93THVuYXIsXG4gICAgICAgIGRpc2FibGVQYXN0RGF5LFxuICAgICAgICBkaXNhYmxlTGF0ZXJEYXlcbiAgICAgIH0gPSB0aGlzLmdldENhbGVuZGFyQ29uZmlnKCk7XG4gICAgICBpZiAoc2hvd0x1bmFyKSB7XG4gICAgICAgIGl0ZW0ubHVuYXIgPSBjb252ZXJ0U29sYXJMdW5hci5zb2xhcjJsdW5hcihcbiAgICAgICAgICAraXRlbS55ZWFyLFxuICAgICAgICAgICtpdGVtLm1vbnRoLFxuICAgICAgICAgICtpdGVtLmRheVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgbGV0IGRpc2FiZWxCeUNvbmZpZyA9IGZhbHNlO1xuICAgICAgaWYgKGRpc2FibGVQYXN0RGF5KSB7XG4gICAgICAgIGRpc2FiZWxCeUNvbmZpZyA9XG4gICAgICAgICAgZGlzYWJsZVBhc3REYXkgJiYgdGltZXN0YW1wIC0gdG9kYXlUaW1lc3RhbXAgPCAwICYmICFpdGVtLmRpc2FibGU7XG4gICAgICB9IGVsc2UgaWYgKGRpc2FibGVMYXRlckRheSkge1xuICAgICAgICBkaXNhYmVsQnlDb25maWcgPVxuICAgICAgICAgIGRpc2FibGVMYXRlckRheSAmJiB0aW1lc3RhbXAgLSB0b2RheVRpbWVzdGFtcCA+IDAgJiYgIWl0ZW0uZGlzYWJsZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzRGlzYWJsZSA9IGRpc2FiZWxCeUNvbmZpZyB8fCB0aGlzLl9faXNEaXNhYmxlKHRpbWVzdGFtcCk7XG4gICAgICBpZiAoaXNEaXNhYmxlKSB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZSA9IHRydWU7XG4gICAgICAgIGl0ZW0uY2hvb3NlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAnY2FsZW5kYXIuZGF5cyc6IGRheXMsXG4gICAgICAnY2FsZW5kYXIuc2VsZWN0ZWREYXknOiBzZWxlY3RlZERheSB8fCBbXVxuICAgIH0pO1xuICB9XG4gIF9faXNEaXNhYmxlKHRpbWVzdGFtcCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGVuYWJsZUFyZWEgPSBbXSxcbiAgICAgIGVuYWJsZURheXMgPSBbXSxcbiAgICAgIGVuYWJsZUFyZWFUaW1lc3RhbXAgPSBbXVxuICAgIH0gPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgbGV0IHNldERpc2FibGUgPSBmYWxzZTtcbiAgICBsZXQgZXhwZWN0RW5hYmxlRGF5c1RpbWVzdGFtcCA9IGNvbnZlckVuYWJsZURheXNUb1RpbWVzdGFtcChlbmFibGVEYXlzKTtcbiAgICBpZiAoZW5hYmxlQXJlYS5sZW5ndGgpIHtcbiAgICAgIGV4cGVjdEVuYWJsZURheXNUaW1lc3RhbXAgPSBkZWxSZXBlYXRlZEVuYWJsZURheShlbmFibGVEYXlzLCBlbmFibGVBcmVhKTtcbiAgICB9XG4gICAgaWYgKGVuYWJsZUFyZWFUaW1lc3RhbXAubGVuZ3RoKSB7XG4gICAgICBpZiAoXG4gICAgICAgICgrZW5hYmxlQXJlYVRpbWVzdGFtcFswXSA+ICt0aW1lc3RhbXAgfHxcbiAgICAgICAgICArdGltZXN0YW1wID4gK2VuYWJsZUFyZWFUaW1lc3RhbXBbMV0pICYmXG4gICAgICAgICFleHBlY3RFbmFibGVEYXlzVGltZXN0YW1wLmluY2x1ZGVzKCt0aW1lc3RhbXApXG4gICAgICApIHtcbiAgICAgICAgc2V0RGlzYWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGV4cGVjdEVuYWJsZURheXNUaW1lc3RhbXAubGVuZ3RoICYmXG4gICAgICAhZXhwZWN0RW5hYmxlRGF5c1RpbWVzdGFtcC5pbmNsdWRlcygrdGltZXN0YW1wKVxuICAgICkge1xuICAgICAgc2V0RGlzYWJsZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzZXREaXNhYmxlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudCA9PiBuZXcgQ2FsZW5kYXIoY29tcG9uZW50KTtcbiJdfQ==