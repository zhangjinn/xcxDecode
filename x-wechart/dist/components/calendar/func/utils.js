'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getSystemInfo = getSystemInfo;
exports.isIos = isIos;
exports.getCurrentPage = getCurrentPage;
exports.getComponent = getComponent;
exports.uniqueArrayByDate = uniqueArrayByDate;
exports.delRepeatedEnableDay = delRepeatedEnableDay;
exports.convertEnableAreaToTimestamp = convertEnableAreaToTimestamp;
exports.converEnableDaysToTimestamp = converEnableDaysToTimestamp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var systemInfo = void 0;
function getSystemInfo() {
  if (systemInfo) return systemInfo;
  systemInfo = wx.getSystemInfoSync();
  return systemInfo;
}

var Logger = exports.Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, [{
    key: 'info',
    value: function info(msg) {
      console.log('%cInfo: %c' + msg, 'color:#FF0080;font-weight:bold', 'color: #FF509B');
    }
  }, {
    key: 'warn',
    value: function warn(msg) {
      console.log('%cWarn: %c' + msg, 'color:#FF6600;font-weight:bold', 'color: #FF9933');
    }
  }, {
    key: 'tips',
    value: function tips(msg) {
      console.log('%cTips: %c' + msg, 'color:#00B200;font-weight:bold', 'color: #00CC33');
    }
  }]);

  return Logger;
}();

var Slide = exports.Slide = function () {
  function Slide() {
    _classCallCheck(this, Slide);
  }

  _createClass(Slide, [{
    key: 'isUp',

    /**
     * 上滑
     * @param {object} e 事件对象
     * @returns {boolean} 布尔值
     */
    value: function isUp() {
      var gesture = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var touche = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var startX = gesture.startX,
          startY = gesture.startY;

      var deltaX = touche.clientX - startX;
      var deltaY = touche.clientY - startY;
      if (deltaY < -60 && deltaX < 20 && deltaX > -20) {
        this.slideLock = false;
        return true;
      } else {
        return false;
      }
    }
    /**
     * 下滑
     * @param {object} e 事件对象
     * @returns {boolean} 布尔值
     */

  }, {
    key: 'isDown',
    value: function isDown() {
      var gesture = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var touche = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var startX = gesture.startX,
          startY = gesture.startY;

      var deltaX = touche.clientX - startX;
      var deltaY = touche.clientY - startY;
      if (deltaY > 60 && deltaX < 20 && deltaX > -20) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 左滑
     * @param {object} e 事件对象
     * @returns {boolean} 布尔值
     */

  }, {
    key: 'isLeft',
    value: function isLeft() {
      var gesture = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var touche = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var startX = gesture.startX,
          startY = gesture.startY;

      var deltaX = touche.clientX - startX;
      var deltaY = touche.clientY - startY;
      if (deltaX < -60 && deltaY < 20 && deltaY > -20) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 右滑
     * @param {object} e 事件对象
     * @returns {boolean} 布尔值
     */

  }, {
    key: 'isRight',
    value: function isRight() {
      var gesture = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var touche = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var startX = gesture.startX,
          startY = gesture.startY;

      var deltaX = touche.clientX - startX;
      var deltaY = touche.clientY - startY;

      if (deltaX > 60 && deltaY < 20 && deltaY > -20) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Slide;
}();

var GetDate = exports.GetDate = function () {
  function GetDate() {
    _classCallCheck(this, GetDate);
  }

  _createClass(GetDate, [{
    key: 'newDate',

    /**
     * new Date 区分平台
     * @param {number} year
     * @param {number} month
     * @param {number} day
     */
    value: function newDate(year, month, day) {
      var cur = +year + '-' + +month + '-' + +day;
      if (isIos()) {
        cur = +year + '/' + +month + '/' + +day;
      }
      return new Date(cur);
    }
    /**
     * 计算指定月份共多少天
     * @param {number} year 年份
     * @param {number} month  月份
     */

  }, {
    key: 'thisMonthDays',
    value: function thisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    }
    /**
     * 计算指定月份第一天星期几
     * @param {number} year 年份
     * @param {number} month  月份
     */

  }, {
    key: 'firstDayOfWeek',
    value: function firstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    }
    /**
     * 计算指定日期星期几
     * @param {number} year 年份
     * @param {number} month  月份
     * @param {number} date 日期
     */

  }, {
    key: 'dayOfWeek',
    value: function dayOfWeek(year, month, date) {
      return new Date(Date.UTC(year, month - 1, date)).getDay();
    }
  }, {
    key: 'todayDate',
    value: function todayDate() {
      var _date = new Date();
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1;
      var date = _date.getDate();
      return {
        year: year,
        month: month,
        date: date
      };
    }
  }, {
    key: 'todayTimestamp',
    value: function todayTimestamp() {
      var _todayDate = this.todayDate(),
          year = _todayDate.year,
          month = _todayDate.month,
          date = _todayDate.date;

      var timestamp = this.newDate(year, month, date).getTime();
      return timestamp;
    }
  }]);

  return GetDate;
}();

function isIos() {
  var sys = getSystemInfo();
  return (/iphone|ios/i.test(sys.platform)
  );
}

/**
 * 获取当前页面实例
 */
function getCurrentPage() {
  var pages = getCurrentPages();
  var last = pages.length - 1;
  return pages[last];
}

function getComponent(componentId) {
  var logger = new Logger();
  var page = getCurrentPage() || {};
  if (page.selectComponent && typeof page.selectComponent === 'function') {
    if (componentId) {
      return page.selectComponent(componentId);
    } else {
      logger.warn('请传入组件ID');
    }
  } else {
    logger.warn('该基础库暂不支持多个小程序日历组件');
  }
}

/**
 * 日期数组根据日期去重
 * @param {array} array 数组
 */
function uniqueArrayByDate() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var uniqueObject = {};
  var uniqueArray = [];
  array.forEach(function (item) {
    uniqueObject[item.year + '-' + item.month + '-' + item.day] = item;
  });
  for (var i in uniqueObject) {
    uniqueArray.push(uniqueObject[i]);
  }
  return uniqueArray;
}

/**
 * 指定可选日期及可选日期数组去重
 * @param {array} enableDays 特定可选日期数组
 * @param {array} enableArea 可选日期区域数组
 */
function delRepeatedEnableDay() {
  var enableDays = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var enableArea = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _startTimestamp = void 0;
  var _endTimestamp = void 0;
  if (enableArea.length === 2) {
    var _convertEnableAreaToT = convertEnableAreaToTimestamp(enableArea),
        startTimestamp = _convertEnableAreaToT.startTimestamp,
        endTimestamp = _convertEnableAreaToT.endTimestamp;

    _startTimestamp = startTimestamp;
    _endTimestamp = endTimestamp;
  }
  var enableDaysTimestamp = converEnableDaysToTimestamp(enableDays);
  var tmp = enableDaysTimestamp.filter(function (item) {
    return item < _startTimestamp || item > _endTimestamp;
  });
  return tmp;
}

/**
 *  指定日期区域转时间戳
 * @param {array} timearea 时间区域
 */
function convertEnableAreaToTimestamp() {
  var timearea = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var getDate = new GetDate();
  var start = timearea[0].split('-');
  var end = timearea[1].split('-');
  var logger = new Logger();
  if (start.length !== 3 || end.length !== 3) {
    logger.warn('enableArea() 参数格式为: ["2018-2-1", "2018-3-1"]');
    return {};
  }
  var startTimestamp = getDate.newDate(start[0], start[1], start[2]).getTime();
  var endTimestamp = getDate.newDate(end[0], end[1], end[2]).getTime();
  return {
    start: start,
    end: end,
    startTimestamp: startTimestamp,
    endTimestamp: endTimestamp
  };
}

/**
 *  指定特定日期数组转时间戳
 * @param {array} enableDays 指定时间数组
 */
function converEnableDaysToTimestamp() {
  var enableDays = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var logger = new Logger();
  var getDate = new GetDate();
  var enableDaysTimestamp = [];
  enableDays.forEach(function (item) {
    if (typeof item !== 'string') return logger.warn('enableDays()入参日期格式错误');
    var tmp = item.split('-');
    if (tmp.length !== 3) return logger.warn('enableDays()入参日期格式错误');
    var timestamp = getDate.newDate(tmp[0], tmp[1], tmp[2]).getTime();
    enableDaysTimestamp.push(timestamp);
  });
  return enableDaysTimestamp;
}

// 同一页面多个日历组件按先后顺序渲染
var initialTasks = exports.initialTasks = {
  flag: 'finished', // process 处理中，finished 处理完成
  tasks: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImdldFN5c3RlbUluZm8iLCJpc0lvcyIsImdldEN1cnJlbnRQYWdlIiwiZ2V0Q29tcG9uZW50IiwidW5pcXVlQXJyYXlCeURhdGUiLCJkZWxSZXBlYXRlZEVuYWJsZURheSIsImNvbnZlcnRFbmFibGVBcmVhVG9UaW1lc3RhbXAiLCJjb252ZXJFbmFibGVEYXlzVG9UaW1lc3RhbXAiLCJzeXN0ZW1JbmZvIiwid3giLCJnZXRTeXN0ZW1JbmZvU3luYyIsIkxvZ2dlciIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJTbGlkZSIsImdlc3R1cmUiLCJ0b3VjaGUiLCJzdGFydFgiLCJzdGFydFkiLCJkZWx0YVgiLCJjbGllbnRYIiwiZGVsdGFZIiwiY2xpZW50WSIsInNsaWRlTG9jayIsIkdldERhdGUiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJjdXIiLCJEYXRlIiwiZ2V0RGF0ZSIsIlVUQyIsImdldERheSIsImRhdGUiLCJfZGF0ZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJ0b2RheURhdGUiLCJ0aW1lc3RhbXAiLCJuZXdEYXRlIiwiZ2V0VGltZSIsInN5cyIsInRlc3QiLCJwbGF0Zm9ybSIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwibGFzdCIsImxlbmd0aCIsImNvbXBvbmVudElkIiwibG9nZ2VyIiwicGFnZSIsInNlbGVjdENvbXBvbmVudCIsIndhcm4iLCJhcnJheSIsInVuaXF1ZU9iamVjdCIsInVuaXF1ZUFycmF5IiwiZm9yRWFjaCIsIml0ZW0iLCJpIiwicHVzaCIsImVuYWJsZURheXMiLCJlbmFibGVBcmVhIiwiX3N0YXJ0VGltZXN0YW1wIiwiX2VuZFRpbWVzdGFtcCIsInN0YXJ0VGltZXN0YW1wIiwiZW5kVGltZXN0YW1wIiwiZW5hYmxlRGF5c1RpbWVzdGFtcCIsInRtcCIsImZpbHRlciIsInRpbWVhcmVhIiwic3RhcnQiLCJzcGxpdCIsImVuZCIsImluaXRpYWxUYXNrcyIsImZsYWciLCJ0YXNrcyJd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SUFBUCxLQUFnQixRQUFwQixFQUNFLE9BQU9SLE9BQU9HLElBQVAsQ0FBWSxzQkFBWixDQUFQO0FBQ0YsUUFBTWUsTUFBTVYsS0FBS2MsS0FBTCxDQUFXLEdBQVgsQ0FBWjtBQUNBLFFBQUlKLElBQUlwQixNQUFKLEtBQWUsQ0FBbkIsRUFBc0IsT0FBT0UsT0FBT0csSUFBUCxDQUFZLHNCQUFaLENBQVA7QUFDdEIsUUFBTWQsWUFBWVIsUUFBUVMsT0FBUixDQUFnQjRCLElBQUksQ0FBSixDQUFoQixFQUF3QkEsSUFBSSxDQUFKLENBQXhCLEVBQWdDQSxJQUFJLENBQUosQ0FBaEMsRUFBd0MzQixPQUF4QyxFQUFsQjtBQUNBMEIsd0JBQW9CUCxJQUFwQixDQUF5QnJCLFNBQXpCO0FBQ0QsR0FQRDtBQVFBLFNBQU80QixtQkFBUDtBQUNEOztBQUVEO0FBQ08sSUFBTU8sc0NBQWU7QUFDMUJDLFFBQU0sVUFEb0IsRUFDUjtBQUNsQkMsU0FBTztBQUZtQixDQUFyQiIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBzeXN0ZW1JbmZvO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN5c3RlbUluZm8oKSB7XG4gIGlmIChzeXN0ZW1JbmZvKSByZXR1cm4gc3lzdGVtSW5mbztcbiAgc3lzdGVtSW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gIHJldHVybiBzeXN0ZW1JbmZvO1xufVxuXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgaW5mbyhtc2cpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICclY0luZm86ICVjJyArIG1zZyxcbiAgICAgICdjb2xvcjojRkYwMDgwO2ZvbnQtd2VpZ2h0OmJvbGQnLFxuICAgICAgJ2NvbG9yOiAjRkY1MDlCJ1xuICAgICk7XG4gIH1cbiAgd2Fybihtc2cpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICclY1dhcm46ICVjJyArIG1zZyxcbiAgICAgICdjb2xvcjojRkY2NjAwO2ZvbnQtd2VpZ2h0OmJvbGQnLFxuICAgICAgJ2NvbG9yOiAjRkY5OTMzJ1xuICAgICk7XG4gIH1cbiAgdGlwcyhtc2cpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICclY1RpcHM6ICVjJyArIG1zZyxcbiAgICAgICdjb2xvcjojMDBCMjAwO2ZvbnQtd2VpZ2h0OmJvbGQnLFxuICAgICAgJ2NvbG9yOiAjMDBDQzMzJ1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNsaWRlIHtcbiAgLyoqXG4gICAqIOS4iua7kVxuICAgKiBAcGFyYW0ge29iamVjdH0gZSDkuovku7blr7nosaFcbiAgICogQHJldHVybnMge2Jvb2xlYW59IOW4g+WwlOWAvFxuICAgKi9cbiAgaXNVcChnZXN0dXJlID0ge30sIHRvdWNoZSA9IHt9KSB7XG4gICAgY29uc3QgeyBzdGFydFgsIHN0YXJ0WSB9ID0gZ2VzdHVyZTtcbiAgICBjb25zdCBkZWx0YVggPSB0b3VjaGUuY2xpZW50WCAtIHN0YXJ0WDtcbiAgICBjb25zdCBkZWx0YVkgPSB0b3VjaGUuY2xpZW50WSAtIHN0YXJ0WTtcbiAgICBpZiAoZGVsdGFZIDwgLTYwICYmIGRlbHRhWCA8IDIwICYmIGRlbHRhWCA+IC0yMCkge1xuICAgICAgdGhpcy5zbGlkZUxvY2sgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDkuIvmu5FcbiAgICogQHBhcmFtIHtvYmplY3R9IGUg5LqL5Lu25a+56LGhXG4gICAqIEByZXR1cm5zIHtib29sZWFufSDluIPlsJTlgLxcbiAgICovXG4gIGlzRG93bihnZXN0dXJlID0ge30sIHRvdWNoZSA9IHt9KSB7XG4gICAgY29uc3QgeyBzdGFydFgsIHN0YXJ0WSB9ID0gZ2VzdHVyZTtcbiAgICBjb25zdCBkZWx0YVggPSB0b3VjaGUuY2xpZW50WCAtIHN0YXJ0WDtcbiAgICBjb25zdCBkZWx0YVkgPSB0b3VjaGUuY2xpZW50WSAtIHN0YXJ0WTtcbiAgICBpZiAoZGVsdGFZID4gNjAgJiYgZGVsdGFYIDwgMjAgJiYgZGVsdGFYID4gLTIwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog5bem5ruRXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBlIOS6i+S7tuWvueixoVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0g5biD5bCU5YC8XG4gICAqL1xuICBpc0xlZnQoZ2VzdHVyZSA9IHt9LCB0b3VjaGUgPSB7fSkge1xuICAgIGNvbnN0IHsgc3RhcnRYLCBzdGFydFkgfSA9IGdlc3R1cmU7XG4gICAgY29uc3QgZGVsdGFYID0gdG91Y2hlLmNsaWVudFggLSBzdGFydFg7XG4gICAgY29uc3QgZGVsdGFZID0gdG91Y2hlLmNsaWVudFkgLSBzdGFydFk7XG4gICAgaWYgKGRlbHRhWCA8IC02MCAmJiBkZWx0YVkgPCAyMCAmJiBkZWx0YVkgPiAtMjApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDlj7Pmu5FcbiAgICogQHBhcmFtIHtvYmplY3R9IGUg5LqL5Lu25a+56LGhXG4gICAqIEByZXR1cm5zIHtib29sZWFufSDluIPlsJTlgLxcbiAgICovXG4gIGlzUmlnaHQoZ2VzdHVyZSA9IHt9LCB0b3VjaGUgPSB7fSkge1xuICAgIGNvbnN0IHsgc3RhcnRYLCBzdGFydFkgfSA9IGdlc3R1cmU7XG4gICAgY29uc3QgZGVsdGFYID0gdG91Y2hlLmNsaWVudFggLSBzdGFydFg7XG4gICAgY29uc3QgZGVsdGFZID0gdG91Y2hlLmNsaWVudFkgLSBzdGFydFk7XG5cbiAgICBpZiAoZGVsdGFYID4gNjAgJiYgZGVsdGFZIDwgMjAgJiYgZGVsdGFZID4gLTIwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2V0RGF0ZSB7XG4gIC8qKlxuICAgKiBuZXcgRGF0ZSDljLrliIblubPlj7BcbiAgICogQHBhcmFtIHtudW1iZXJ9IHllYXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1vbnRoXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkYXlcbiAgICovXG4gIG5ld0RhdGUoeWVhciwgbW9udGgsIGRheSkge1xuICAgIGxldCBjdXIgPSBgJHsreWVhcn0tJHsrbW9udGh9LSR7K2RheX1gO1xuICAgIGlmIChpc0lvcygpKSB7XG4gICAgICBjdXIgPSBgJHsreWVhcn0vJHsrbW9udGh9LyR7K2RheX1gO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoY3VyKTtcbiAgfVxuICAvKipcbiAgICog6K6h566X5oyH5a6a5pyI5Lu95YWx5aSa5bCR5aSpXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyIOW5tOS7vVxuICAgKiBAcGFyYW0ge251bWJlcn0gbW9udGggIOaciOS7vVxuICAgKi9cbiAgdGhpc01vbnRoRGF5cyh5ZWFyLCBtb250aCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMCkuZ2V0RGF0ZSgpO1xuICB9XG4gIC8qKlxuICAgKiDorqHnrpfmjIflrprmnIjku73nrKzkuIDlpKnmmJ/mnJ/lh6BcbiAgICogQHBhcmFtIHtudW1iZXJ9IHllYXIg5bm05Lu9XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCAg5pyI5Lu9XG4gICAqL1xuICBmaXJzdERheU9mV2Vlayh5ZWFyLCBtb250aCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIDEpKS5nZXREYXkoKTtcbiAgfVxuICAvKipcbiAgICog6K6h566X5oyH5a6a5pel5pyf5pif5pyf5YegXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyIOW5tOS7vVxuICAgKiBAcGFyYW0ge251bWJlcn0gbW9udGggIOaciOS7vVxuICAgKiBAcGFyYW0ge251bWJlcn0gZGF0ZSDml6XmnJ9cbiAgICovXG4gIGRheU9mV2Vlayh5ZWFyLCBtb250aCwgZGF0ZSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIGRhdGUpKS5nZXREYXkoKTtcbiAgfVxuICB0b2RheURhdGUoKSB7XG4gICAgY29uc3QgX2RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHllYXIgPSBfZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IG1vbnRoID0gX2RhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZGF0ZSA9IF9kYXRlLmdldERhdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgeWVhcixcbiAgICAgIG1vbnRoLFxuICAgICAgZGF0ZVxuICAgIH07XG4gIH1cbiAgdG9kYXlUaW1lc3RhbXAoKSB7XG4gICAgY29uc3QgeyB5ZWFyLCBtb250aCwgZGF0ZSB9ID0gdGhpcy50b2RheURhdGUoKTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLm5ld0RhdGUoeWVhciwgbW9udGgsIGRhdGUpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gdGltZXN0YW1wO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0lvcygpIHtcbiAgY29uc3Qgc3lzID0gZ2V0U3lzdGVtSW5mbygpO1xuICByZXR1cm4gL2lwaG9uZXxpb3MvaS50ZXN0KHN5cy5wbGF0Zm9ybSk7XG59XG5cbi8qKlxuICog6I635Y+W5b2T5YmN6aG16Z2i5a6e5L6LXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50UGFnZSgpIHtcbiAgY29uc3QgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcbiAgY29uc3QgbGFzdCA9IHBhZ2VzLmxlbmd0aCAtIDE7XG4gIHJldHVybiBwYWdlc1tsYXN0XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudChjb21wb25lbnRJZCkge1xuICBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gIGxldCBwYWdlID0gZ2V0Q3VycmVudFBhZ2UoKSB8fCB7fTtcbiAgaWYgKHBhZ2Uuc2VsZWN0Q29tcG9uZW50ICYmIHR5cGVvZiBwYWdlLnNlbGVjdENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChjb21wb25lbnRJZCkge1xuICAgICAgcmV0dXJuIHBhZ2Uuc2VsZWN0Q29tcG9uZW50KGNvbXBvbmVudElkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLndhcm4oJ+ivt+S8oOWFpee7hOS7tklEJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxvZ2dlci53YXJuKCfor6Xln7rnoYDlupPmmoLkuI3mlK/mjIHlpJrkuKrlsI/nqIvluo/ml6Xljobnu4Tku7YnKTtcbiAgfVxufVxuXG4vKipcbiAqIOaXpeacn+aVsOe7hOagueaNruaXpeacn+WOu+mHjVxuICogQHBhcmFtIHthcnJheX0gYXJyYXkg5pWw57uEXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVBcnJheUJ5RGF0ZShhcnJheSA9IFtdKSB7XG4gIGxldCB1bmlxdWVPYmplY3QgPSB7fTtcbiAgbGV0IHVuaXF1ZUFycmF5ID0gW107XG4gIGFycmF5LmZvckVhY2goaXRlbSA9PiB7XG4gICAgdW5pcXVlT2JqZWN0W2Ake2l0ZW0ueWVhcn0tJHtpdGVtLm1vbnRofS0ke2l0ZW0uZGF5fWBdID0gaXRlbTtcbiAgfSk7XG4gIGZvciAobGV0IGkgaW4gdW5pcXVlT2JqZWN0KSB7XG4gICAgdW5pcXVlQXJyYXkucHVzaCh1bmlxdWVPYmplY3RbaV0pO1xuICB9XG4gIHJldHVybiB1bmlxdWVBcnJheTtcbn1cblxuLyoqXG4gKiDmjIflrprlj6/pgInml6XmnJ/lj4rlj6/pgInml6XmnJ/mlbDnu4Tljrvph41cbiAqIEBwYXJhbSB7YXJyYXl9IGVuYWJsZURheXMg54m55a6a5Y+v6YCJ5pel5pyf5pWw57uEXG4gKiBAcGFyYW0ge2FycmF5fSBlbmFibGVBcmVhIOWPr+mAieaXpeacn+WMuuWfn+aVsOe7hFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsUmVwZWF0ZWRFbmFibGVEYXkoZW5hYmxlRGF5cyA9IFtdLCBlbmFibGVBcmVhID0gW10pIHtcbiAgbGV0IF9zdGFydFRpbWVzdGFtcDtcbiAgbGV0IF9lbmRUaW1lc3RhbXA7XG4gIGlmIChlbmFibGVBcmVhLmxlbmd0aCA9PT0gMikge1xuICAgIGNvbnN0IHsgc3RhcnRUaW1lc3RhbXAsIGVuZFRpbWVzdGFtcCB9ID0gY29udmVydEVuYWJsZUFyZWFUb1RpbWVzdGFtcChcbiAgICAgIGVuYWJsZUFyZWFcbiAgICApO1xuICAgIF9zdGFydFRpbWVzdGFtcCA9IHN0YXJ0VGltZXN0YW1wO1xuICAgIF9lbmRUaW1lc3RhbXAgPSBlbmRUaW1lc3RhbXA7XG4gIH1cbiAgY29uc3QgZW5hYmxlRGF5c1RpbWVzdGFtcCA9IGNvbnZlckVuYWJsZURheXNUb1RpbWVzdGFtcChlbmFibGVEYXlzKTtcbiAgY29uc3QgdG1wID0gZW5hYmxlRGF5c1RpbWVzdGFtcC5maWx0ZXIoXG4gICAgaXRlbSA9PiBpdGVtIDwgX3N0YXJ0VGltZXN0YW1wIHx8IGl0ZW0gPiBfZW5kVGltZXN0YW1wXG4gICk7XG4gIHJldHVybiB0bXA7XG59XG5cbi8qKlxuICogIOaMh+WumuaXpeacn+WMuuWfn+i9rOaXtumXtOaIs1xuICogQHBhcmFtIHthcnJheX0gdGltZWFyZWEg5pe26Ze05Yy65Z+fXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RW5hYmxlQXJlYVRvVGltZXN0YW1wKHRpbWVhcmVhID0gW10pIHtcbiAgY29uc3QgZ2V0RGF0ZSA9IG5ldyBHZXREYXRlKCk7XG4gIGNvbnN0IHN0YXJ0ID0gdGltZWFyZWFbMF0uc3BsaXQoJy0nKTtcbiAgY29uc3QgZW5kID0gdGltZWFyZWFbMV0uc3BsaXQoJy0nKTtcbiAgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuICBpZiAoc3RhcnQubGVuZ3RoICE9PSAzIHx8IGVuZC5sZW5ndGggIT09IDMpIHtcbiAgICBsb2dnZXIud2FybignZW5hYmxlQXJlYSgpIOWPguaVsOagvOW8j+S4ujogW1wiMjAxOC0yLTFcIiwgXCIyMDE4LTMtMVwiXScpO1xuICAgIHJldHVybiB7fTtcbiAgfVxuICBjb25zdCBzdGFydFRpbWVzdGFtcCA9IGdldERhdGVcbiAgICAubmV3RGF0ZShzdGFydFswXSwgc3RhcnRbMV0sIHN0YXJ0WzJdKVxuICAgIC5nZXRUaW1lKCk7XG4gIGNvbnN0IGVuZFRpbWVzdGFtcCA9IGdldERhdGUubmV3RGF0ZShlbmRbMF0sIGVuZFsxXSwgZW5kWzJdKS5nZXRUaW1lKCk7XG4gIHJldHVybiB7XG4gICAgc3RhcnQsXG4gICAgZW5kLFxuICAgIHN0YXJ0VGltZXN0YW1wLFxuICAgIGVuZFRpbWVzdGFtcFxuICB9O1xufVxuXG4vKipcbiAqICDmjIflrprnibnlrprml6XmnJ/mlbDnu4Tovazml7bpl7TmiLNcbiAqIEBwYXJhbSB7YXJyYXl9IGVuYWJsZURheXMg5oyH5a6a5pe26Ze05pWw57uEXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJFbmFibGVEYXlzVG9UaW1lc3RhbXAoZW5hYmxlRGF5cyA9IFtdKSB7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbiAgY29uc3QgZ2V0RGF0ZSA9IG5ldyBHZXREYXRlKCk7XG4gIGNvbnN0IGVuYWJsZURheXNUaW1lc3RhbXAgPSBbXTtcbiAgZW5hYmxlRGF5cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ3N0cmluZycpXG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oJ2VuYWJsZURheXMoKeWFpeWPguaXpeacn+agvOW8j+mUmeivrycpO1xuICAgIGNvbnN0IHRtcCA9IGl0ZW0uc3BsaXQoJy0nKTtcbiAgICBpZiAodG1wLmxlbmd0aCAhPT0gMykgcmV0dXJuIGxvZ2dlci53YXJuKCdlbmFibGVEYXlzKCnlhaXlj4Lml6XmnJ/moLzlvI/plJnor68nKTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBnZXREYXRlLm5ld0RhdGUodG1wWzBdLCB0bXBbMV0sIHRtcFsyXSkuZ2V0VGltZSgpO1xuICAgIGVuYWJsZURheXNUaW1lc3RhbXAucHVzaCh0aW1lc3RhbXApO1xuICB9KTtcbiAgcmV0dXJuIGVuYWJsZURheXNUaW1lc3RhbXA7XG59XG5cbi8vIOWQjOS4gOmhtemdouWkmuS4quaXpeWOhue7hOS7tuaMieWFiOWQjumhuuW6j+a4suafk1xuZXhwb3J0IGNvbnN0IGluaXRpYWxUYXNrcyA9IHtcbiAgZmxhZzogJ2ZpbmlzaGVkJywgLy8gcHJvY2VzcyDlpITnkIbkuK3vvIxmaW5pc2hlZCDlpITnkIblrozmiJBcbiAgdGFza3M6IFtdXG59O1xuIl19