'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wxData = require('./wxData.js');

var _wxData2 = _interopRequireDefault(_wxData);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = new _utils.Logger();
var getDate = new _utils.GetDate();

var Day = function (_WxData) {
  _inherits(Day, _WxData);

  function Day(component) {
    _classCallCheck(this, Day);

    var _this = _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, component));

    _this.Component = component;
    return _this;
  }
  /**
   * 指定可选日期范围
   * @param {array} area 日期访问数组
   */


  _createClass(Day, [{
    key: 'enableArea',
    value: function enableArea() {
      var area = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (area.length === 2) {
        var _convertEnableAreaToT = (0, _utils.convertEnableAreaToTimestamp)(area),
            start = _convertEnableAreaToT.start,
            end = _convertEnableAreaToT.end,
            startTimestamp = _convertEnableAreaToT.startTimestamp,
            endTimestamp = _convertEnableAreaToT.endTimestamp;

        if (!start || !end) return;
        var startMonthDays = getDate.thisMonthDays(start[0], start[1]);
        var endMonthDays = getDate.thisMonthDays(end[0], end[1]);
        var isRight = this.__judgeParam({
          start: start,
          end: end,
          startMonthDays: startMonthDays,
          endMonthDays: endMonthDays,
          startTimestamp: startTimestamp,
          endTimestamp: endTimestamp
        });
        if (isRight) {
          var _getData = this.getData('calendar'),
              _getData$days = _getData.days,
              days = _getData$days === undefined ? [] : _getData$days,
              _getData$selectedDay = _getData.selectedDay,
              selectedDay = _getData$selectedDay === undefined ? [] : _getData$selectedDay;

          var dataAfterHandle = this.__handleEnableArea({
            area: area,
            days: days,
            startTimestamp: startTimestamp,
            endTimestamp: endTimestamp
          }, selectedDay);
          this.setData({
            'calendar.enableArea': area,
            'calendar.days': dataAfterHandle.dates,
            'calendar.selectedDay': dataAfterHandle.selectedDay,
            'calendar.enableAreaTimestamp': [startTimestamp, endTimestamp]
          });
        }
      } else {
        logger.warn('enableArea()参数需为时间范围数组，形如：["2018-8-4" , "2018-8-24"]');
      }
    }
    /**
     * 指定特定日期可选
     * @param {array} days 指定日期数组
     */

  }, {
    key: 'enableDays',
    value: function enableDays() {
      var dates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var _getData2 = this.getData('calendar'),
          _getData2$enableArea = _getData2.enableArea,
          enableArea = _getData2$enableArea === undefined ? [] : _getData2$enableArea;

      var expectEnableDaysTimestamp = [];
      if (enableArea.length) {
        expectEnableDaysTimestamp = (0, _utils.delRepeatedEnableDay)(dates, enableArea);
      } else {
        expectEnableDaysTimestamp = (0, _utils.converEnableDaysToTimestamp)(dates);
      }

      var _getData3 = this.getData('calendar'),
          _getData3$days = _getData3.days,
          days = _getData3$days === undefined ? [] : _getData3$days,
          _getData3$selectedDay = _getData3.selectedDay,
          selectedDay = _getData3$selectedDay === undefined ? [] : _getData3$selectedDay;

      var dataAfterHandle = this.__handleEnableDays({
        days: days,
        expectEnableDaysTimestamp: expectEnableDaysTimestamp
      }, selectedDay);
      this.setData({
        'calendar.days': dataAfterHandle.dates,
        'calendar.selectedDay': dataAfterHandle.selectedDay,
        'calendar.enableDays': dates,
        'calendar.enableDaysTimestamp': expectEnableDaysTimestamp
      });
    }
    /**
     * 设置多个日期选中
     * @param {array} selected 需选中日期
     */

  }, {
    key: 'setSelectedDays',
    value: function setSelectedDays(selected) {
      var config = (0, _config2.default)(this.Component).getCalendarConfig();
      if (!config.multi) {
        return logger.warn('单选模式下不能设置多日期选中，请配置 multi');
      }

      var _getData4 = this.getData('calendar'),
          days = _getData4.days;

      var newSelectedDay = [];
      if (!selected) {
        days.map(function (item) {
          item.choosed = true;
          item.showTodoLabel = false;
        });
        newSelectedDay = days;
      } else if (selected && selected.length) {
        var _handleSelectedDays = this.__handleSelectedDays(days, newSelectedDay, selected),
            dates = _handleSelectedDays.dates,
            selectedDates = _handleSelectedDays.selectedDates;

        days = dates;
        newSelectedDay = selectedDates;
      }
      (0, _config2.default)(this.Component).setCalendarConfig('multi', true);
      this.setData({
        'calendar.days': days,
        'calendar.selectedDay': newSelectedDay
      });
    }
    /**
     * 禁用指定日期
     * @param {array} days  禁用
     */

  }, {
    key: 'disableDays',
    value: function disableDays(data) {
      var _getData5 = this.getData('calendar'),
          _getData5$disableDays = _getData5.disableDays,
          disableDays = _getData5$disableDays === undefined ? [] : _getData5$disableDays,
          days = _getData5.days;

      if (Object.prototype.toString.call(data) !== '[object Array]') {
        return logger.warn('disableDays 参数为数组');
      }
      var _disableDays = [];
      if (data.length) {
        _disableDays = (0, _utils.uniqueArrayByDate)(data.concat(disableDays));
        var disableDaysCol = _disableDays.map(function (d) {
          return d.year + '-' + d.month + '-' + d.day;
        });
        days.forEach(function (item) {
          var cur = item.year + '-' + item.month + '-' + item.day;
          if (disableDaysCol.includes(cur)) item.disable = true;
        });
      } else {
        days.forEach(function (item) {
          item.disable = false;
        });
      }
      this.setData({
        'calendar.days': days,
        'calendar.disableDays': _disableDays
      });
    }
  }, {
    key: '__judgeParam',
    value: function __judgeParam(params) {
      var start = params.start,
          end = params.end,
          startMonthDays = params.startMonthDays,
          endMonthDays = params.endMonthDays,
          startTimestamp = params.startTimestamp,
          endTimestamp = params.endTimestamp;

      if (start[2] > startMonthDays || start[2] < 1) {
        logger.warn('enableArea() 开始日期错误，指定日期不在当前月份天数范围内');
        return false;
      } else if (start[1] > 12 || start[1] < 1) {
        logger.warn('enableArea() 开始日期错误，月份超出1-12月份');
        return false;
      } else if (end[2] > endMonthDays || end[2] < 1) {
        logger.warn('enableArea() 截止日期错误，指定日期不在当前月份天数范围内');
        return false;
      } else if (end[1] > 12 || end[1] < 1) {
        logger.warn('enableArea() 截止日期错误，月份超出1-12月份');
        return false;
      } else if (startTimestamp > endTimestamp) {
        logger.warn('enableArea()参数最小日期大于了最大日期');
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: '__handleEnableArea',
    value: function __handleEnableArea() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var selectedDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var area = data.area,
          days = data.days,
          startTimestamp = data.startTimestamp,
          endTimestamp = data.endTimestamp;

      var enableDays = this.getData('calendar.enableDays') || [];
      var expectEnableDaysTimestamp = [];
      if (enableDays.length) {
        expectEnableDaysTimestamp = (0, _utils.delRepeatedEnableDay)(enableDays, area);
      }
      var dates = [].concat(_toConsumableArray(days));
      dates.forEach(function (item) {
        var timestamp = getDate.newDate(item.year, item.month, item.day).getTime();
        if ((+startTimestamp > +timestamp || +timestamp > +endTimestamp) && !expectEnableDaysTimestamp.includes(+timestamp)) {
          item.disable = true;
          if (item.choosed) {
            item.choosed = false;
            selectedDay = selectedDay.filter(function (d) {
              return item.year + '-' + item.month + '-' + item.day !== d.year + '-' + d.month + '-' + d.day;
            });
          }
        } else if (item.disable) {
          item.disable = false;
        }
      });
      return {
        dates: dates,
        selectedDay: selectedDay
      };
    }
  }, {
    key: '__handleEnableDays',
    value: function __handleEnableDays() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var selectedDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var days = data.days,
          expectEnableDaysTimestamp = data.expectEnableDaysTimestamp;

      var _getData6 = this.getData('calendar'),
          _getData6$enableAreaT = _getData6.enableAreaTimestamp,
          enableAreaTimestamp = _getData6$enableAreaT === undefined ? [] : _getData6$enableAreaT;

      var dates = [].concat(_toConsumableArray(days));
      dates.forEach(function (item) {
        var timestamp = getDate.newDate(item.year, item.month, item.day).getTime();
        var setDisable = false;
        if (enableAreaTimestamp.length) {
          if ((+enableAreaTimestamp[0] > +timestamp || +timestamp > +enableAreaTimestamp[1]) && !expectEnableDaysTimestamp.includes(+timestamp)) {
            setDisable = true;
          }
        } else if (!expectEnableDaysTimestamp.includes(+timestamp)) {
          setDisable = true;
        }
        if (setDisable) {
          item.disable = true;
          if (item.choosed) {
            item.choosed = false;
            selectedDay = selectedDay.filter(function (d) {
              return item.year + '-' + item.month + '-' + item.day !== d.year + '-' + d.month + '-' + d.day;
            });
          }
        } else {
          item.disable = false;
        }
      });
      return {
        dates: dates,
        selectedDay: selectedDay
      };
    }
  }, {
    key: '__handleSelectedDays',
    value: function __handleSelectedDays() {
      var days = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var newSelectedDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var selected = arguments[2];

      var _getData7 = this.getData('calendar'),
          selectedDay = _getData7.selectedDay,
          showLabelAlways = _getData7.showLabelAlways;

      if (selectedDay && selectedDay.length) {
        newSelectedDay = (0, _utils.uniqueArrayByDate)(selectedDay.concat(selected));
      } else {
        newSelectedDay = selected;
      }
      var _days$ = days[0],
          curYear = _days$.year,
          curMonth = _days$.month;

      var currentSelectedDays = [];
      newSelectedDay.forEach(function (item) {
        if (+item.year === +curYear && +item.month === +curMonth) {
          currentSelectedDays.push(item.year + '-' + item.month + '-' + item.day);
        }
      });
      [].concat(_toConsumableArray(days)).map(function (item) {
        if (currentSelectedDays.includes(item.year + '-' + item.month + '-' + item.day)) {
          item.choosed = true;
          if (showLabelAlways && item.showTodoLabel) {
            item.showTodoLabel = true;
          } else {
            item.showTodoLabel = false;
          }
        }
        return item;
      });
      return {
        dates: days,
        selectedDates: newSelectedDay
      };
    }
  }]);

  return Day;
}(_wxData2.default);

exports.default = function (component) {
  return new Day(component);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRheS5qcyJdLCJuYW1lcyI6WyJsb2dnZXIiLCJMb2dnZXIiLCJnZXREYXRlIiwiR2V0RGF0ZSIsIkRheSIsImNvbXBvbmVudCIsIkNvbXBvbmVudCIsImFyZWEiLCJsZW5ndGgiLCJzdGFydCIsImVuZCIsInN0YXJ0VGltZXN0YW1wIiwiZW5kVGltZXN0YW1wIiwic3RhcnRNb250aERheXMiLCJ0aGlzTW9udGhEYXlzIiwiZW5kTW9udGhEYXlzIiwiaXNSaWdodCIsIl9fanVkZ2VQYXJhbSIsImdldERhdGEiLCJkYXlzIiwic2VsZWN0ZWREYXkiLCJkYXRhQWZ0ZXJIYW5kbGUiLCJfX2hhbmRsZUVuYWJsZUFyZWEiLCJzZXREYXRhIiwiZGF0ZXMiLCJ3YXJuIiwiZW5hYmxlQXJlYSIsImV4cGVjdEVuYWJsZURheXNUaW1lc3RhbXAiLCJfX2hhbmRsZUVuYWJsZURheXMiLCJzZWxlY3RlZCIsImNvbmZpZyIsImdldENhbGVuZGFyQ29uZmlnIiwibXVsdGkiLCJuZXdTZWxlY3RlZERheSIsIm1hcCIsIml0ZW0iLCJjaG9vc2VkIiwic2hvd1RvZG9MYWJlbCIsIl9faGFuZGxlU2VsZWN0ZWREYXlzIiwic2VsZWN0ZWREYXRlcyIsInNldENhbGVuZGFyQ29uZmlnIiwiZGF0YSIsImRpc2FibGVEYXlzIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiX2Rpc2FibGVEYXlzIiwiY29uY2F0IiwiZGlzYWJsZURheXNDb2wiLCJkIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiZm9yRWFjaCIsImN1ciIsImluY2x1ZGVzIiwiZGlzYWJsZSIsInBhcmFtcyIsImVuYWJsZURheXMiLCJ0aW1lc3RhbXAiLCJuZXdEYXRlIiwiZ2V0VGltZSIsImZpbHRlciIsImVuYWJsZUFyZWFUaW1lc3RhbXAiLCJzZXREaXNhYmxlIiwic2hvd0xhYmVsQWx3YXlzIiwiY3VyWWVhciIsImN1ck1vbnRoIiwiY3VycmVudFNlbGVjdGVkRGF5cyIsInB1c2giLCJXeERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFTQSxJQUFNQSxTQUFTLElBQUlDLGFBQUosRUFBZjtBQUNBLElBQU1DLFVBQVUsSUFBSUMsY0FBSixFQUFoQjs7SUFFTUMsRzs7O0FBQ0osZUFBWUMsU0FBWixFQUF1QjtBQUFBOztBQUFBLDBHQUNmQSxTQURlOztBQUVyQixVQUFLQyxTQUFMLEdBQWlCRCxTQUFqQjtBQUZxQjtBQUd0QjtBQUNEOzs7Ozs7OztpQ0FJc0I7QUFBQSxVQUFYRSxJQUFXLHVFQUFKLEVBQUk7O0FBQ3BCLFVBQUlBLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFBQSxvQ0FNakIseUNBQTZCRCxJQUE3QixDQU5pQjtBQUFBLFlBRW5CRSxLQUZtQix5QkFFbkJBLEtBRm1CO0FBQUEsWUFHbkJDLEdBSG1CLHlCQUduQkEsR0FIbUI7QUFBQSxZQUluQkMsY0FKbUIseUJBSW5CQSxjQUptQjtBQUFBLFlBS25CQyxZQUxtQix5QkFLbkJBLFlBTG1COztBQU9yQixZQUFJLENBQUNILEtBQUQsSUFBVSxDQUFDQyxHQUFmLEVBQW9CO0FBQ3BCLFlBQU1HLGlCQUFpQlgsUUFBUVksYUFBUixDQUFzQkwsTUFBTSxDQUFOLENBQXRCLEVBQWdDQSxNQUFNLENBQU4sQ0FBaEMsQ0FBdkI7QUFDQSxZQUFNTSxlQUFlYixRQUFRWSxhQUFSLENBQXNCSixJQUFJLENBQUosQ0FBdEIsRUFBOEJBLElBQUksQ0FBSixDQUE5QixDQUFyQjtBQUNBLFlBQU1NLFVBQVUsS0FBS0MsWUFBTCxDQUFrQjtBQUNoQ1Isc0JBRGdDO0FBRWhDQyxrQkFGZ0M7QUFHaENHLHdDQUhnQztBQUloQ0Usb0NBSmdDO0FBS2hDSix3Q0FMZ0M7QUFNaENDO0FBTmdDLFNBQWxCLENBQWhCO0FBUUEsWUFBSUksT0FBSixFQUFhO0FBQUEseUJBQzJCLEtBQUtFLE9BQUwsQ0FBYSxVQUFiLENBRDNCO0FBQUEsdUNBQ0xDLElBREs7QUFBQSxjQUNMQSxJQURLLGlDQUNFLEVBREY7QUFBQSw4Q0FDTUMsV0FETjtBQUFBLGNBQ01BLFdBRE4sd0NBQ29CLEVBRHBCOztBQUVYLGNBQU1DLGtCQUFrQixLQUFLQyxrQkFBTCxDQUN0QjtBQUNFZixzQkFERjtBQUVFWSxzQkFGRjtBQUdFUiwwQ0FIRjtBQUlFQztBQUpGLFdBRHNCLEVBT3RCUSxXQVBzQixDQUF4QjtBQVNBLGVBQUtHLE9BQUwsQ0FBYTtBQUNYLG1DQUF1QmhCLElBRFo7QUFFWCw2QkFBaUJjLGdCQUFnQkcsS0FGdEI7QUFHWCxvQ0FBd0JILGdCQUFnQkQsV0FIN0I7QUFJWCw0Q0FBZ0MsQ0FBQ1QsY0FBRCxFQUFpQkMsWUFBakI7QUFKckIsV0FBYjtBQU1EO0FBQ0YsT0FwQ0QsTUFvQ087QUFDTFosZUFBT3lCLElBQVAsQ0FDRSxzREFERjtBQUdEO0FBQ0Y7QUFDRDs7Ozs7OztpQ0FJdUI7QUFBQSxVQUFaRCxLQUFZLHVFQUFKLEVBQUk7O0FBQUEsc0JBQ08sS0FBS04sT0FBTCxDQUFhLFVBQWIsQ0FEUDtBQUFBLDJDQUNiUSxVQURhO0FBQUEsVUFDYkEsVUFEYSx3Q0FDQSxFQURBOztBQUVyQixVQUFJQyw0QkFBNEIsRUFBaEM7QUFDQSxVQUFJRCxXQUFXbEIsTUFBZixFQUF1QjtBQUNyQm1CLG9DQUE0QixpQ0FBcUJILEtBQXJCLEVBQTRCRSxVQUE1QixDQUE1QjtBQUNELE9BRkQsTUFFTztBQUNMQyxvQ0FBNEIsd0NBQTRCSCxLQUE1QixDQUE1QjtBQUNEOztBQVBvQixzQkFRaUIsS0FBS04sT0FBTCxDQUFhLFVBQWIsQ0FSakI7QUFBQSxxQ0FRZkMsSUFSZTtBQUFBLFVBUWZBLElBUmUsa0NBUVIsRUFSUTtBQUFBLDRDQVFKQyxXQVJJO0FBQUEsVUFRSkEsV0FSSSx5Q0FRVSxFQVJWOztBQVNyQixVQUFNQyxrQkFBa0IsS0FBS08sa0JBQUwsQ0FDdEI7QUFDRVQsa0JBREY7QUFFRVE7QUFGRixPQURzQixFQUt0QlAsV0FMc0IsQ0FBeEI7QUFPQSxXQUFLRyxPQUFMLENBQWE7QUFDWCx5QkFBaUJGLGdCQUFnQkcsS0FEdEI7QUFFWCxnQ0FBd0JILGdCQUFnQkQsV0FGN0I7QUFHWCwrQkFBdUJJLEtBSFo7QUFJWCx3Q0FBZ0NHO0FBSnJCLE9BQWI7QUFNRDtBQUNEOzs7Ozs7O29DQUlnQkUsUSxFQUFVO0FBQ3hCLFVBQU1DLFNBQVMsc0JBQWUsS0FBS3hCLFNBQXBCLEVBQStCeUIsaUJBQS9CLEVBQWY7QUFDQSxVQUFJLENBQUNELE9BQU9FLEtBQVosRUFBbUI7QUFDakIsZUFBT2hDLE9BQU95QixJQUFQLENBQVksMEJBQVosQ0FBUDtBQUNEOztBQUp1QixzQkFLVCxLQUFLUCxPQUFMLENBQWEsVUFBYixDQUxTO0FBQUEsVUFLbEJDLElBTGtCLGFBS2xCQSxJQUxrQjs7QUFNeEIsVUFBSWMsaUJBQWlCLEVBQXJCO0FBQ0EsVUFBSSxDQUFDSixRQUFMLEVBQWU7QUFDYlYsYUFBS2UsR0FBTCxDQUFTLGdCQUFRO0FBQ2ZDLGVBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0FELGVBQUtFLGFBQUwsR0FBcUIsS0FBckI7QUFDRCxTQUhEO0FBSUFKLHlCQUFpQmQsSUFBakI7QUFDRCxPQU5ELE1BTU8sSUFBSVUsWUFBWUEsU0FBU3JCLE1BQXpCLEVBQWlDO0FBQUEsa0NBQ0wsS0FBSzhCLG9CQUFMLENBQy9CbkIsSUFEK0IsRUFFL0JjLGNBRitCLEVBRy9CSixRQUgrQixDQURLO0FBQUEsWUFDOUJMLEtBRDhCLHVCQUM5QkEsS0FEOEI7QUFBQSxZQUN2QmUsYUFEdUIsdUJBQ3ZCQSxhQUR1Qjs7QUFNdENwQixlQUFPSyxLQUFQO0FBQ0FTLHlCQUFpQk0sYUFBakI7QUFDRDtBQUNELDRCQUFlLEtBQUtqQyxTQUFwQixFQUErQmtDLGlCQUEvQixDQUFpRCxPQUFqRCxFQUEwRCxJQUExRDtBQUNBLFdBQUtqQixPQUFMLENBQWE7QUFDWCx5QkFBaUJKLElBRE47QUFFWCxnQ0FBd0JjO0FBRmIsT0FBYjtBQUlEO0FBQ0Q7Ozs7Ozs7Z0NBSVlRLEksRUFBTTtBQUFBLHNCQUNtQixLQUFLdkIsT0FBTCxDQUFhLFVBQWIsQ0FEbkI7QUFBQSw0Q0FDUndCLFdBRFE7QUFBQSxVQUNSQSxXQURRLHlDQUNNLEVBRE47QUFBQSxVQUNVdkIsSUFEVixhQUNVQSxJQURWOztBQUVoQixVQUFJd0IsT0FBT0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTCxJQUEvQixNQUF5QyxnQkFBN0MsRUFBK0Q7QUFDN0QsZUFBT3pDLE9BQU95QixJQUFQLENBQVksbUJBQVosQ0FBUDtBQUNEO0FBQ0QsVUFBSXNCLGVBQWUsRUFBbkI7QUFDQSxVQUFJTixLQUFLakMsTUFBVCxFQUFpQjtBQUNmdUMsdUJBQWUsOEJBQWtCTixLQUFLTyxNQUFMLENBQVlOLFdBQVosQ0FBbEIsQ0FBZjtBQUNBLFlBQU1PLGlCQUFpQkYsYUFBYWIsR0FBYixDQUNyQjtBQUFBLGlCQUFRZ0IsRUFBRUMsSUFBVixTQUFrQkQsRUFBRUUsS0FBcEIsU0FBNkJGLEVBQUVHLEdBQS9CO0FBQUEsU0FEcUIsQ0FBdkI7QUFHQWxDLGFBQUttQyxPQUFMLENBQWEsZ0JBQVE7QUFDbkIsY0FBTUMsTUFBU3BCLEtBQUtnQixJQUFkLFNBQXNCaEIsS0FBS2lCLEtBQTNCLFNBQW9DakIsS0FBS2tCLEdBQS9DO0FBQ0EsY0FBSUosZUFBZU8sUUFBZixDQUF3QkQsR0FBeEIsQ0FBSixFQUFrQ3BCLEtBQUtzQixPQUFMLEdBQWUsSUFBZjtBQUNuQyxTQUhEO0FBSUQsT0FURCxNQVNPO0FBQ0x0QyxhQUFLbUMsT0FBTCxDQUFhLGdCQUFRO0FBQ25CbkIsZUFBS3NCLE9BQUwsR0FBZSxLQUFmO0FBQ0QsU0FGRDtBQUdEO0FBQ0QsV0FBS2xDLE9BQUwsQ0FBYTtBQUNYLHlCQUFpQkosSUFETjtBQUVYLGdDQUF3QjRCO0FBRmIsT0FBYjtBQUlEOzs7aUNBQ1lXLE0sRUFBUTtBQUFBLFVBRWpCakQsS0FGaUIsR0FRZmlELE1BUmUsQ0FFakJqRCxLQUZpQjtBQUFBLFVBR2pCQyxHQUhpQixHQVFmZ0QsTUFSZSxDQUdqQmhELEdBSGlCO0FBQUEsVUFJakJHLGNBSmlCLEdBUWY2QyxNQVJlLENBSWpCN0MsY0FKaUI7QUFBQSxVQUtqQkUsWUFMaUIsR0FRZjJDLE1BUmUsQ0FLakIzQyxZQUxpQjtBQUFBLFVBTWpCSixjQU5pQixHQVFmK0MsTUFSZSxDQU1qQi9DLGNBTmlCO0FBQUEsVUFPakJDLFlBUGlCLEdBUWY4QyxNQVJlLENBT2pCOUMsWUFQaUI7O0FBU25CLFVBQUlILE1BQU0sQ0FBTixJQUFXSSxjQUFYLElBQTZCSixNQUFNLENBQU4sSUFBVyxDQUE1QyxFQUErQztBQUM3Q1QsZUFBT3lCLElBQVAsQ0FBWSxxQ0FBWjtBQUNBLGVBQU8sS0FBUDtBQUNELE9BSEQsTUFHTyxJQUFJaEIsTUFBTSxDQUFOLElBQVcsRUFBWCxJQUFpQkEsTUFBTSxDQUFOLElBQVcsQ0FBaEMsRUFBbUM7QUFDeENULGVBQU95QixJQUFQLENBQVksZ0NBQVo7QUFDQSxlQUFPLEtBQVA7QUFDRCxPQUhNLE1BR0EsSUFBSWYsSUFBSSxDQUFKLElBQVNLLFlBQVQsSUFBeUJMLElBQUksQ0FBSixJQUFTLENBQXRDLEVBQXlDO0FBQzlDVixlQUFPeUIsSUFBUCxDQUFZLHFDQUFaO0FBQ0EsZUFBTyxLQUFQO0FBQ0QsT0FITSxNQUdBLElBQUlmLElBQUksQ0FBSixJQUFTLEVBQVQsSUFBZUEsSUFBSSxDQUFKLElBQVMsQ0FBNUIsRUFBK0I7QUFDcENWLGVBQU95QixJQUFQLENBQVksZ0NBQVo7QUFDQSxlQUFPLEtBQVA7QUFDRCxPQUhNLE1BR0EsSUFBSWQsaUJBQWlCQyxZQUFyQixFQUFtQztBQUN4Q1osZUFBT3lCLElBQVAsQ0FBWSwyQkFBWjtBQUNBLGVBQU8sS0FBUDtBQUNELE9BSE0sTUFHQTtBQUNMLGVBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozt5Q0FDK0M7QUFBQSxVQUE3QmdCLElBQTZCLHVFQUF0QixFQUFzQjtBQUFBLFVBQWxCckIsV0FBa0IsdUVBQUosRUFBSTtBQUFBLFVBQ3RDYixJQURzQyxHQUNPa0MsSUFEUCxDQUN0Q2xDLElBRHNDO0FBQUEsVUFDaENZLElBRGdDLEdBQ09zQixJQURQLENBQ2hDdEIsSUFEZ0M7QUFBQSxVQUMxQlIsY0FEMEIsR0FDTzhCLElBRFAsQ0FDMUI5QixjQUQwQjtBQUFBLFVBQ1ZDLFlBRFUsR0FDTzZCLElBRFAsQ0FDVjdCLFlBRFU7O0FBRTlDLFVBQU0rQyxhQUFhLEtBQUt6QyxPQUFMLENBQWEscUJBQWIsS0FBdUMsRUFBMUQ7QUFDQSxVQUFJUyw0QkFBNEIsRUFBaEM7QUFDQSxVQUFJZ0MsV0FBV25ELE1BQWYsRUFBdUI7QUFDckJtQixvQ0FBNEIsaUNBQXFCZ0MsVUFBckIsRUFBaUNwRCxJQUFqQyxDQUE1QjtBQUNEO0FBQ0QsVUFBTWlCLHFDQUFZTCxJQUFaLEVBQU47QUFDQUssWUFBTThCLE9BQU4sQ0FBYyxnQkFBUTtBQUNwQixZQUFNTSxZQUFZMUQsUUFDZjJELE9BRGUsQ0FDUDFCLEtBQUtnQixJQURFLEVBQ0loQixLQUFLaUIsS0FEVCxFQUNnQmpCLEtBQUtrQixHQURyQixFQUVmUyxPQUZlLEVBQWxCO0FBR0EsWUFDRSxDQUFDLENBQUNuRCxjQUFELEdBQWtCLENBQUNpRCxTQUFuQixJQUFnQyxDQUFDQSxTQUFELEdBQWEsQ0FBQ2hELFlBQS9DLEtBQ0EsQ0FBQ2UsMEJBQTBCNkIsUUFBMUIsQ0FBbUMsQ0FBQ0ksU0FBcEMsQ0FGSCxFQUdFO0FBQ0F6QixlQUFLc0IsT0FBTCxHQUFlLElBQWY7QUFDQSxjQUFJdEIsS0FBS0MsT0FBVCxFQUFrQjtBQUNoQkQsaUJBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0FoQiwwQkFBY0EsWUFBWTJDLE1BQVosQ0FDWjtBQUFBLHFCQUNLNUIsS0FBS2dCLElBQVIsU0FBZ0JoQixLQUFLaUIsS0FBckIsU0FBOEJqQixLQUFLa0IsR0FBbkMsS0FDR0gsRUFBRUMsSUFETCxTQUNhRCxFQUFFRSxLQURmLFNBQ3dCRixFQUFFRyxHQUY1QjtBQUFBLGFBRFksQ0FBZDtBQUtEO0FBQ0YsU0FiRCxNQWFPLElBQUlsQixLQUFLc0IsT0FBVCxFQUFrQjtBQUN2QnRCLGVBQUtzQixPQUFMLEdBQWUsS0FBZjtBQUNEO0FBQ0YsT0FwQkQ7QUFxQkEsYUFBTztBQUNMakMsb0JBREs7QUFFTEo7QUFGSyxPQUFQO0FBSUQ7Ozt5Q0FDK0M7QUFBQSxVQUE3QnFCLElBQTZCLHVFQUF0QixFQUFzQjtBQUFBLFVBQWxCckIsV0FBa0IsdUVBQUosRUFBSTtBQUFBLFVBQ3RDRCxJQURzQyxHQUNGc0IsSUFERSxDQUN0Q3RCLElBRHNDO0FBQUEsVUFDaENRLHlCQURnQyxHQUNGYyxJQURFLENBQ2hDZCx5QkFEZ0M7O0FBQUEsc0JBRVQsS0FBS1QsT0FBTCxDQUFhLFVBQWIsQ0FGUztBQUFBLDRDQUV0QzhDLG1CQUZzQztBQUFBLFVBRXRDQSxtQkFGc0MseUNBRWhCLEVBRmdCOztBQUc5QyxVQUFNeEMscUNBQVlMLElBQVosRUFBTjtBQUNBSyxZQUFNOEIsT0FBTixDQUFjLGdCQUFRO0FBQ3BCLFlBQU1NLFlBQVkxRCxRQUNmMkQsT0FEZSxDQUNQMUIsS0FBS2dCLElBREUsRUFDSWhCLEtBQUtpQixLQURULEVBQ2dCakIsS0FBS2tCLEdBRHJCLEVBRWZTLE9BRmUsRUFBbEI7QUFHQSxZQUFJRyxhQUFhLEtBQWpCO0FBQ0EsWUFBSUQsb0JBQW9CeEQsTUFBeEIsRUFBZ0M7QUFDOUIsY0FDRSxDQUFDLENBQUN3RCxvQkFBb0IsQ0FBcEIsQ0FBRCxHQUEwQixDQUFDSixTQUEzQixJQUNDLENBQUNBLFNBQUQsR0FBYSxDQUFDSSxvQkFBb0IsQ0FBcEIsQ0FEaEIsS0FFQSxDQUFDckMsMEJBQTBCNkIsUUFBMUIsQ0FBbUMsQ0FBQ0ksU0FBcEMsQ0FISCxFQUlFO0FBQ0FLLHlCQUFhLElBQWI7QUFDRDtBQUNGLFNBUkQsTUFRTyxJQUFJLENBQUN0QywwQkFBMEI2QixRQUExQixDQUFtQyxDQUFDSSxTQUFwQyxDQUFMLEVBQXFEO0FBQzFESyx1QkFBYSxJQUFiO0FBQ0Q7QUFDRCxZQUFJQSxVQUFKLEVBQWdCO0FBQ2Q5QixlQUFLc0IsT0FBTCxHQUFlLElBQWY7QUFDQSxjQUFJdEIsS0FBS0MsT0FBVCxFQUFrQjtBQUNoQkQsaUJBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0FoQiwwQkFBY0EsWUFBWTJDLE1BQVosQ0FDWjtBQUFBLHFCQUNLNUIsS0FBS2dCLElBQVIsU0FBZ0JoQixLQUFLaUIsS0FBckIsU0FBOEJqQixLQUFLa0IsR0FBbkMsS0FDR0gsRUFBRUMsSUFETCxTQUNhRCxFQUFFRSxLQURmLFNBQ3dCRixFQUFFRyxHQUY1QjtBQUFBLGFBRFksQ0FBZDtBQUtEO0FBQ0YsU0FWRCxNQVVPO0FBQ0xsQixlQUFLc0IsT0FBTCxHQUFlLEtBQWY7QUFDRDtBQUNGLE9BN0JEO0FBOEJBLGFBQU87QUFDTGpDLG9CQURLO0FBRUxKO0FBRkssT0FBUDtBQUlEOzs7MkNBQzhEO0FBQUEsVUFBMUNELElBQTBDLHVFQUFuQyxFQUFtQztBQUFBLFVBQS9CYyxjQUErQix1RUFBZCxFQUFjO0FBQUEsVUFBVkosUUFBVTs7QUFBQSxzQkFDcEIsS0FBS1gsT0FBTCxDQUFhLFVBQWIsQ0FEb0I7QUFBQSxVQUNyREUsV0FEcUQsYUFDckRBLFdBRHFEO0FBQUEsVUFDeEM4QyxlQUR3QyxhQUN4Q0EsZUFEd0M7O0FBRTdELFVBQUk5QyxlQUFlQSxZQUFZWixNQUEvQixFQUF1QztBQUNyQ3lCLHlCQUFpQiw4QkFBa0JiLFlBQVk0QixNQUFaLENBQW1CbkIsUUFBbkIsQ0FBbEIsQ0FBakI7QUFDRCxPQUZELE1BRU87QUFDTEkseUJBQWlCSixRQUFqQjtBQUNEO0FBTjRELG1CQU9sQlYsS0FBSyxDQUFMLENBUGtCO0FBQUEsVUFPL0NnRCxPQVArQyxVQU9yRGhCLElBUHFEO0FBQUEsVUFPL0JpQixRQVArQixVQU90Q2hCLEtBUHNDOztBQVE3RCxVQUFNaUIsc0JBQXNCLEVBQTVCO0FBQ0FwQyxxQkFBZXFCLE9BQWYsQ0FBdUIsZ0JBQVE7QUFDN0IsWUFBSSxDQUFDbkIsS0FBS2dCLElBQU4sS0FBZSxDQUFDZ0IsT0FBaEIsSUFBMkIsQ0FBQ2hDLEtBQUtpQixLQUFOLEtBQWdCLENBQUNnQixRQUFoRCxFQUEwRDtBQUN4REMsOEJBQW9CQyxJQUFwQixDQUE0Qm5DLEtBQUtnQixJQUFqQyxTQUF5Q2hCLEtBQUtpQixLQUE5QyxTQUF1RGpCLEtBQUtrQixHQUE1RDtBQUNEO0FBQ0YsT0FKRDtBQUtBLG1DQUFJbEMsSUFBSixHQUFVZSxHQUFWLENBQWMsZ0JBQVE7QUFDcEIsWUFDRW1DLG9CQUFvQmIsUUFBcEIsQ0FBZ0NyQixLQUFLZ0IsSUFBckMsU0FBNkNoQixLQUFLaUIsS0FBbEQsU0FBMkRqQixLQUFLa0IsR0FBaEUsQ0FERixFQUVFO0FBQ0FsQixlQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLGNBQUk4QixtQkFBbUIvQixLQUFLRSxhQUE1QixFQUEyQztBQUN6Q0YsaUJBQUtFLGFBQUwsR0FBcUIsSUFBckI7QUFDRCxXQUZELE1BRU87QUFDTEYsaUJBQUtFLGFBQUwsR0FBcUIsS0FBckI7QUFDRDtBQUNGO0FBQ0QsZUFBT0YsSUFBUDtBQUNELE9BWkQ7QUFhQSxhQUFPO0FBQ0xYLGVBQU9MLElBREY7QUFFTG9CLHVCQUFlTjtBQUZWLE9BQVA7QUFJRDs7OztFQWhSZXNDLGdCOztrQkFtUkg7QUFBQSxTQUFhLElBQUluRSxHQUFKLENBQVFDLFNBQVIsQ0FBYjtBQUFBLEMiLCJmaWxlIjoiZGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFd4RGF0YSBmcm9tICcuL3d4RGF0YSc7XG5pbXBvcnQgQ2FsZW5kYXJDb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtcbiAgTG9nZ2VyLFxuICBHZXREYXRlLFxuICB1bmlxdWVBcnJheUJ5RGF0ZSxcbiAgZGVsUmVwZWF0ZWRFbmFibGVEYXksXG4gIGNvbnZlcnRFbmFibGVBcmVhVG9UaW1lc3RhbXAsXG4gIGNvbnZlckVuYWJsZURheXNUb1RpbWVzdGFtcFxufSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuY29uc3QgZ2V0RGF0ZSA9IG5ldyBHZXREYXRlKCk7XG5cbmNsYXNzIERheSBleHRlbmRzIFd4RGF0YSB7XG4gIGNvbnN0cnVjdG9yKGNvbXBvbmVudCkge1xuICAgIHN1cGVyKGNvbXBvbmVudCk7XG4gICAgdGhpcy5Db21wb25lbnQgPSBjb21wb25lbnQ7XG4gIH1cbiAgLyoqXG4gICAqIOaMh+WumuWPr+mAieaXpeacn+iMg+WbtFxuICAgKiBAcGFyYW0ge2FycmF5fSBhcmVhIOaXpeacn+iuv+mXruaVsOe7hFxuICAgKi9cbiAgZW5hYmxlQXJlYShhcmVhID0gW10pIHtcbiAgICBpZiAoYXJlYS5sZW5ndGggPT09IDIpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZCxcbiAgICAgICAgc3RhcnRUaW1lc3RhbXAsXG4gICAgICAgIGVuZFRpbWVzdGFtcFxuICAgICAgfSA9IGNvbnZlcnRFbmFibGVBcmVhVG9UaW1lc3RhbXAoYXJlYSk7XG4gICAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHJldHVybjtcbiAgICAgIGNvbnN0IHN0YXJ0TW9udGhEYXlzID0gZ2V0RGF0ZS50aGlzTW9udGhEYXlzKHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICBjb25zdCBlbmRNb250aERheXMgPSBnZXREYXRlLnRoaXNNb250aERheXMoZW5kWzBdLCBlbmRbMV0pO1xuICAgICAgY29uc3QgaXNSaWdodCA9IHRoaXMuX19qdWRnZVBhcmFtKHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZCxcbiAgICAgICAgc3RhcnRNb250aERheXMsXG4gICAgICAgIGVuZE1vbnRoRGF5cyxcbiAgICAgICAgc3RhcnRUaW1lc3RhbXAsXG4gICAgICAgIGVuZFRpbWVzdGFtcFxuICAgICAgfSk7XG4gICAgICBpZiAoaXNSaWdodCkge1xuICAgICAgICBsZXQgeyBkYXlzID0gW10sIHNlbGVjdGVkRGF5ID0gW10gfSA9IHRoaXMuZ2V0RGF0YSgnY2FsZW5kYXInKTtcbiAgICAgICAgY29uc3QgZGF0YUFmdGVySGFuZGxlID0gdGhpcy5fX2hhbmRsZUVuYWJsZUFyZWEoXG4gICAgICAgICAge1xuICAgICAgICAgICAgYXJlYSxcbiAgICAgICAgICAgIGRheXMsXG4gICAgICAgICAgICBzdGFydFRpbWVzdGFtcCxcbiAgICAgICAgICAgIGVuZFRpbWVzdGFtcFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2VsZWN0ZWREYXlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAnY2FsZW5kYXIuZW5hYmxlQXJlYSc6IGFyZWEsXG4gICAgICAgICAgJ2NhbGVuZGFyLmRheXMnOiBkYXRhQWZ0ZXJIYW5kbGUuZGF0ZXMsXG4gICAgICAgICAgJ2NhbGVuZGFyLnNlbGVjdGVkRGF5JzogZGF0YUFmdGVySGFuZGxlLnNlbGVjdGVkRGF5LFxuICAgICAgICAgICdjYWxlbmRhci5lbmFibGVBcmVhVGltZXN0YW1wJzogW3N0YXJ0VGltZXN0YW1wLCBlbmRUaW1lc3RhbXBdXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIud2FybihcbiAgICAgICAgJ2VuYWJsZUFyZWEoKeWPguaVsOmcgOS4uuaXtumXtOiMg+WbtOaVsOe7hO+8jOW9ouWmgu+8mltcIjIwMTgtOC00XCIgLCBcIjIwMTgtOC0yNFwiXSdcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDmjIflrprnibnlrprml6XmnJ/lj6/pgIlcbiAgICogQHBhcmFtIHthcnJheX0gZGF5cyDmjIflrprml6XmnJ/mlbDnu4RcbiAgICovXG4gIGVuYWJsZURheXMoZGF0ZXMgPSBbXSkge1xuICAgIGNvbnN0IHsgZW5hYmxlQXJlYSA9IFtdIH0gPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgbGV0IGV4cGVjdEVuYWJsZURheXNUaW1lc3RhbXAgPSBbXTtcbiAgICBpZiAoZW5hYmxlQXJlYS5sZW5ndGgpIHtcbiAgICAgIGV4cGVjdEVuYWJsZURheXNUaW1lc3RhbXAgPSBkZWxSZXBlYXRlZEVuYWJsZURheShkYXRlcywgZW5hYmxlQXJlYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cGVjdEVuYWJsZURheXNUaW1lc3RhbXAgPSBjb252ZXJFbmFibGVEYXlzVG9UaW1lc3RhbXAoZGF0ZXMpO1xuICAgIH1cbiAgICBsZXQgeyBkYXlzID0gW10sIHNlbGVjdGVkRGF5ID0gW10gfSA9IHRoaXMuZ2V0RGF0YSgnY2FsZW5kYXInKTtcbiAgICBjb25zdCBkYXRhQWZ0ZXJIYW5kbGUgPSB0aGlzLl9faGFuZGxlRW5hYmxlRGF5cyhcbiAgICAgIHtcbiAgICAgICAgZGF5cyxcbiAgICAgICAgZXhwZWN0RW5hYmxlRGF5c1RpbWVzdGFtcFxuICAgICAgfSxcbiAgICAgIHNlbGVjdGVkRGF5XG4gICAgKTtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgJ2NhbGVuZGFyLmRheXMnOiBkYXRhQWZ0ZXJIYW5kbGUuZGF0ZXMsXG4gICAgICAnY2FsZW5kYXIuc2VsZWN0ZWREYXknOiBkYXRhQWZ0ZXJIYW5kbGUuc2VsZWN0ZWREYXksXG4gICAgICAnY2FsZW5kYXIuZW5hYmxlRGF5cyc6IGRhdGVzLFxuICAgICAgJ2NhbGVuZGFyLmVuYWJsZURheXNUaW1lc3RhbXAnOiBleHBlY3RFbmFibGVEYXlzVGltZXN0YW1wXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOiuvue9ruWkmuS4quaXpeacn+mAieS4rVxuICAgKiBAcGFyYW0ge2FycmF5fSBzZWxlY3RlZCDpnIDpgInkuK3ml6XmnJ9cbiAgICovXG4gIHNldFNlbGVjdGVkRGF5cyhzZWxlY3RlZCkge1xuICAgIGNvbnN0IGNvbmZpZyA9IENhbGVuZGFyQ29uZmlnKHRoaXMuQ29tcG9uZW50KS5nZXRDYWxlbmRhckNvbmZpZygpO1xuICAgIGlmICghY29uZmlnLm11bHRpKSB7XG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oJ+WNlemAieaooeW8j+S4i+S4jeiDveiuvue9ruWkmuaXpeacn+mAieS4re+8jOivt+mFjee9riBtdWx0aScpO1xuICAgIH1cbiAgICBsZXQgeyBkYXlzIH0gPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgbGV0IG5ld1NlbGVjdGVkRGF5ID0gW107XG4gICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgZGF5cy5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uY2hvb3NlZCA9IHRydWU7XG4gICAgICAgIGl0ZW0uc2hvd1RvZG9MYWJlbCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgICBuZXdTZWxlY3RlZERheSA9IGRheXM7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZCAmJiBzZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHsgZGF0ZXMsIHNlbGVjdGVkRGF0ZXMgfSA9IHRoaXMuX19oYW5kbGVTZWxlY3RlZERheXMoXG4gICAgICAgIGRheXMsXG4gICAgICAgIG5ld1NlbGVjdGVkRGF5LFxuICAgICAgICBzZWxlY3RlZFxuICAgICAgKTtcbiAgICAgIGRheXMgPSBkYXRlcztcbiAgICAgIG5ld1NlbGVjdGVkRGF5ID0gc2VsZWN0ZWREYXRlcztcbiAgICB9XG4gICAgQ2FsZW5kYXJDb25maWcodGhpcy5Db21wb25lbnQpLnNldENhbGVuZGFyQ29uZmlnKCdtdWx0aScsIHRydWUpO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAnY2FsZW5kYXIuZGF5cyc6IGRheXMsXG4gICAgICAnY2FsZW5kYXIuc2VsZWN0ZWREYXknOiBuZXdTZWxlY3RlZERheVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDnpoHnlKjmjIflrprml6XmnJ9cbiAgICogQHBhcmFtIHthcnJheX0gZGF5cyAg56aB55SoXG4gICAqL1xuICBkaXNhYmxlRGF5cyhkYXRhKSB7XG4gICAgY29uc3QgeyBkaXNhYmxlRGF5cyA9IFtdLCBkYXlzIH0gPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkYXRhKSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdkaXNhYmxlRGF5cyDlj4LmlbDkuLrmlbDnu4QnKTtcbiAgICB9XG4gICAgbGV0IF9kaXNhYmxlRGF5cyA9IFtdO1xuICAgIGlmIChkYXRhLmxlbmd0aCkge1xuICAgICAgX2Rpc2FibGVEYXlzID0gdW5pcXVlQXJyYXlCeURhdGUoZGF0YS5jb25jYXQoZGlzYWJsZURheXMpKTtcbiAgICAgIGNvbnN0IGRpc2FibGVEYXlzQ29sID0gX2Rpc2FibGVEYXlzLm1hcChcbiAgICAgICAgZCA9PiBgJHtkLnllYXJ9LSR7ZC5tb250aH0tJHtkLmRheX1gXG4gICAgICApO1xuICAgICAgZGF5cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBjdXIgPSBgJHtpdGVtLnllYXJ9LSR7aXRlbS5tb250aH0tJHtpdGVtLmRheX1gO1xuICAgICAgICBpZiAoZGlzYWJsZURheXNDb2wuaW5jbHVkZXMoY3VyKSkgaXRlbS5kaXNhYmxlID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXlzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAnY2FsZW5kYXIuZGF5cyc6IGRheXMsXG4gICAgICAnY2FsZW5kYXIuZGlzYWJsZURheXMnOiBfZGlzYWJsZURheXNcbiAgICB9KTtcbiAgfVxuICBfX2p1ZGdlUGFyYW0ocGFyYW1zKSB7XG4gICAgY29uc3Qge1xuICAgICAgc3RhcnQsXG4gICAgICBlbmQsXG4gICAgICBzdGFydE1vbnRoRGF5cyxcbiAgICAgIGVuZE1vbnRoRGF5cyxcbiAgICAgIHN0YXJ0VGltZXN0YW1wLFxuICAgICAgZW5kVGltZXN0YW1wXG4gICAgfSA9IHBhcmFtcztcbiAgICBpZiAoc3RhcnRbMl0gPiBzdGFydE1vbnRoRGF5cyB8fCBzdGFydFsyXSA8IDEpIHtcbiAgICAgIGxvZ2dlci53YXJuKCdlbmFibGVBcmVhKCkg5byA5aeL5pel5pyf6ZSZ6K+v77yM5oyH5a6a5pel5pyf5LiN5Zyo5b2T5YmN5pyI5Lu95aSp5pWw6IyD5Zu05YaFJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChzdGFydFsxXSA+IDEyIHx8IHN0YXJ0WzFdIDwgMSkge1xuICAgICAgbG9nZ2VyLndhcm4oJ2VuYWJsZUFyZWEoKSDlvIDlp4vml6XmnJ/plJnor6/vvIzmnIjku73otoXlh7oxLTEy5pyI5Lu9Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChlbmRbMl0gPiBlbmRNb250aERheXMgfHwgZW5kWzJdIDwgMSkge1xuICAgICAgbG9nZ2VyLndhcm4oJ2VuYWJsZUFyZWEoKSDmiKrmraLml6XmnJ/plJnor6/vvIzmjIflrprml6XmnJ/kuI3lnKjlvZPliY3mnIjku73lpKnmlbDojIPlm7TlhoUnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGVuZFsxXSA+IDEyIHx8IGVuZFsxXSA8IDEpIHtcbiAgICAgIGxvZ2dlci53YXJuKCdlbmFibGVBcmVhKCkg5oiq5q2i5pel5pyf6ZSZ6K+v77yM5pyI5Lu96LaF5Ye6MS0xMuaciOS7vScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoc3RhcnRUaW1lc3RhbXAgPiBlbmRUaW1lc3RhbXApIHtcbiAgICAgIGxvZ2dlci53YXJuKCdlbmFibGVBcmVhKCnlj4LmlbDmnIDlsI/ml6XmnJ/lpKfkuo7kuobmnIDlpKfml6XmnJ8nKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIF9faGFuZGxlRW5hYmxlQXJlYShkYXRhID0ge30sIHNlbGVjdGVkRGF5ID0gW10pIHtcbiAgICBjb25zdCB7IGFyZWEsIGRheXMsIHN0YXJ0VGltZXN0YW1wLCBlbmRUaW1lc3RhbXAgfSA9IGRhdGE7XG4gICAgY29uc3QgZW5hYmxlRGF5cyA9IHRoaXMuZ2V0RGF0YSgnY2FsZW5kYXIuZW5hYmxlRGF5cycpIHx8IFtdO1xuICAgIGxldCBleHBlY3RFbmFibGVEYXlzVGltZXN0YW1wID0gW107XG4gICAgaWYgKGVuYWJsZURheXMubGVuZ3RoKSB7XG4gICAgICBleHBlY3RFbmFibGVEYXlzVGltZXN0YW1wID0gZGVsUmVwZWF0ZWRFbmFibGVEYXkoZW5hYmxlRGF5cywgYXJlYSk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGVzID0gWy4uLmRheXNdO1xuICAgIGRhdGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBnZXREYXRlXG4gICAgICAgIC5uZXdEYXRlKGl0ZW0ueWVhciwgaXRlbS5tb250aCwgaXRlbS5kYXkpXG4gICAgICAgIC5nZXRUaW1lKCk7XG4gICAgICBpZiAoXG4gICAgICAgICgrc3RhcnRUaW1lc3RhbXAgPiArdGltZXN0YW1wIHx8ICt0aW1lc3RhbXAgPiArZW5kVGltZXN0YW1wKSAmJlxuICAgICAgICAhZXhwZWN0RW5hYmxlRGF5c1RpbWVzdGFtcC5pbmNsdWRlcygrdGltZXN0YW1wKVxuICAgICAgKSB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZSA9IHRydWU7XG4gICAgICAgIGlmIChpdGVtLmNob29zZWQpIHtcbiAgICAgICAgICBpdGVtLmNob29zZWQgPSBmYWxzZTtcbiAgICAgICAgICBzZWxlY3RlZERheSA9IHNlbGVjdGVkRGF5LmZpbHRlcihcbiAgICAgICAgICAgIGQgPT5cbiAgICAgICAgICAgICAgYCR7aXRlbS55ZWFyfS0ke2l0ZW0ubW9udGh9LSR7aXRlbS5kYXl9YCAhPT1cbiAgICAgICAgICAgICAgYCR7ZC55ZWFyfS0ke2QubW9udGh9LSR7ZC5kYXl9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5kaXNhYmxlKSB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBkYXRlcyxcbiAgICAgIHNlbGVjdGVkRGF5XG4gICAgfTtcbiAgfVxuICBfX2hhbmRsZUVuYWJsZURheXMoZGF0YSA9IHt9LCBzZWxlY3RlZERheSA9IFtdKSB7XG4gICAgY29uc3QgeyBkYXlzLCBleHBlY3RFbmFibGVEYXlzVGltZXN0YW1wIH0gPSBkYXRhO1xuICAgIGNvbnN0IHsgZW5hYmxlQXJlYVRpbWVzdGFtcCA9IFtdIH0gPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgY29uc3QgZGF0ZXMgPSBbLi4uZGF5c107XG4gICAgZGF0ZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IGdldERhdGVcbiAgICAgICAgLm5ld0RhdGUoaXRlbS55ZWFyLCBpdGVtLm1vbnRoLCBpdGVtLmRheSlcbiAgICAgICAgLmdldFRpbWUoKTtcbiAgICAgIGxldCBzZXREaXNhYmxlID0gZmFsc2U7XG4gICAgICBpZiAoZW5hYmxlQXJlYVRpbWVzdGFtcC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICgrZW5hYmxlQXJlYVRpbWVzdGFtcFswXSA+ICt0aW1lc3RhbXAgfHxcbiAgICAgICAgICAgICt0aW1lc3RhbXAgPiArZW5hYmxlQXJlYVRpbWVzdGFtcFsxXSkgJiZcbiAgICAgICAgICAhZXhwZWN0RW5hYmxlRGF5c1RpbWVzdGFtcC5pbmNsdWRlcygrdGltZXN0YW1wKVxuICAgICAgICApIHtcbiAgICAgICAgICBzZXREaXNhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghZXhwZWN0RW5hYmxlRGF5c1RpbWVzdGFtcC5pbmNsdWRlcygrdGltZXN0YW1wKSkge1xuICAgICAgICBzZXREaXNhYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzZXREaXNhYmxlKSB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZSA9IHRydWU7XG4gICAgICAgIGlmIChpdGVtLmNob29zZWQpIHtcbiAgICAgICAgICBpdGVtLmNob29zZWQgPSBmYWxzZTtcbiAgICAgICAgICBzZWxlY3RlZERheSA9IHNlbGVjdGVkRGF5LmZpbHRlcihcbiAgICAgICAgICAgIGQgPT5cbiAgICAgICAgICAgICAgYCR7aXRlbS55ZWFyfS0ke2l0ZW0ubW9udGh9LSR7aXRlbS5kYXl9YCAhPT1cbiAgICAgICAgICAgICAgYCR7ZC55ZWFyfS0ke2QubW9udGh9LSR7ZC5kYXl9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBkYXRlcyxcbiAgICAgIHNlbGVjdGVkRGF5XG4gICAgfTtcbiAgfVxuICBfX2hhbmRsZVNlbGVjdGVkRGF5cyhkYXlzID0gW10sIG5ld1NlbGVjdGVkRGF5ID0gW10sIHNlbGVjdGVkKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZERheSwgc2hvd0xhYmVsQWx3YXlzIH0gPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgaWYgKHNlbGVjdGVkRGF5ICYmIHNlbGVjdGVkRGF5Lmxlbmd0aCkge1xuICAgICAgbmV3U2VsZWN0ZWREYXkgPSB1bmlxdWVBcnJheUJ5RGF0ZShzZWxlY3RlZERheS5jb25jYXQoc2VsZWN0ZWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U2VsZWN0ZWREYXkgPSBzZWxlY3RlZDtcbiAgICB9XG4gICAgY29uc3QgeyB5ZWFyOiBjdXJZZWFyLCBtb250aDogY3VyTW9udGggfSA9IGRheXNbMF07XG4gICAgY29uc3QgY3VycmVudFNlbGVjdGVkRGF5cyA9IFtdO1xuICAgIG5ld1NlbGVjdGVkRGF5LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoK2l0ZW0ueWVhciA9PT0gK2N1clllYXIgJiYgK2l0ZW0ubW9udGggPT09ICtjdXJNb250aCkge1xuICAgICAgICBjdXJyZW50U2VsZWN0ZWREYXlzLnB1c2goYCR7aXRlbS55ZWFyfS0ke2l0ZW0ubW9udGh9LSR7aXRlbS5kYXl9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgWy4uLmRheXNdLm1hcChpdGVtID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgY3VycmVudFNlbGVjdGVkRGF5cy5pbmNsdWRlcyhgJHtpdGVtLnllYXJ9LSR7aXRlbS5tb250aH0tJHtpdGVtLmRheX1gKVxuICAgICAgKSB7XG4gICAgICAgIGl0ZW0uY2hvb3NlZCA9IHRydWU7XG4gICAgICAgIGlmIChzaG93TGFiZWxBbHdheXMgJiYgaXRlbS5zaG93VG9kb0xhYmVsKSB7XG4gICAgICAgICAgaXRlbS5zaG93VG9kb0xhYmVsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLnNob3dUb2RvTGFiZWwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGVzOiBkYXlzLFxuICAgICAgc2VsZWN0ZWREYXRlczogbmV3U2VsZWN0ZWREYXlcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudCA9PiBuZXcgRGF5KGNvbXBvbmVudCk7XG4iXX0=