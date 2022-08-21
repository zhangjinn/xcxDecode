'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateNextWeekDays = exports.calculatePrevWeekDays = exports.whenMulitSelect = exports.whenSingleSelect = exports.renderCalendar = exports.whenChangeDate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getCurrentYM = getCurrentYM;
exports.getSelectedDay = getSelectedDay;
exports.cancelAllSelectedDay = cancelAllSelectedDay;
exports.jump = jump;
exports.setTodoLabels = setTodoLabels;
exports.deleteTodoLabels = deleteTodoLabels;
exports.clearTodoLabels = clearTodoLabels;
exports.getTodoLabels = getTodoLabels;
exports.disableDay = disableDay;
exports.enableArea = enableArea;
exports.enableDays = enableDays;
exports.setSelectedDays = setSelectedDays;
exports.getCalendarConfig = getCalendarConfig;
exports.setCalendarConfig = setCalendarConfig;
exports.getCalendarDates = getCalendarDates;
exports.switchView = switchView;

var _day = require('./func/day.js');

var _day2 = _interopRequireDefault(_day);

var _week = require('./func/week.js');

var _week2 = _interopRequireDefault(_week);

var _todo = require('./func/todo.js');

var _todo2 = _interopRequireDefault(_todo);

var _wxData = require('./func/wxData.js');

var _wxData2 = _interopRequireDefault(_wxData);

var _render = require('./func/render.js');

var _render2 = _interopRequireDefault(_render);

var _config = require('./func/config.js');

var _config2 = _interopRequireDefault(_config);

var _convertSolarLunar = require('./func/convertSolarLunar.js');

var _convertSolarLunar2 = _interopRequireDefault(_convertSolarLunar);

var _utils = require('./func/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Component = {};
var logger = new _utils.Logger();
var getDate = new _utils.GetDate();
var dataInstance = null;

/**
 * 全局赋值正在操作的组件实例，方便读/写各自的 data
 * @param {string} componentId 要操作的日历组件ID
 */
function bindCurrentComponent(componentId) {
  if (componentId) {
    Component = (0, _utils.getComponent)(componentId);
  }
}
/**
 * 获取日历内部数据
 * @param {string} key 获取值的键名
 * @param {string} componentId 要操作的日历组件ID
 */
function getData(key, componentId) {
  bindCurrentComponent(componentId);
  dataInstance = new _wxData2.default(Component);
  return dataInstance.getData(key);
}
/**
 * 设置日历内部数据
 * @param {object}} data 待设置的数据
 * @param {function} callback 设置成功回调函数
 */
function setData(data) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  var dataInstance = new _wxData2.default(Component);
  return dataInstance.setData(data, callback);
}

var conf = {
  /**
   * 渲染日历
   * @param {number} curYear
   * @param {number} curMonth
   * @param {number} curDate
   */
  renderCalendar: function renderCalendar(curYear, curMonth, curDate) {
    return new Promise(function (resolve, reject) {
      (0, _render2.default)(Component).renderCalendar(curYear, curMonth, curDate).then(function () {
        mountEventsOnPage((0, _utils.getCurrentPage)());
        Component.triggerEvent('afterCalendarRender', Component);
        Component.firstRender = true;
        _utils.initialTasks.flag = 'finished';
        if (_utils.initialTasks.tasks.length) {
          _utils.initialTasks.tasks.shift()();
        }
        resolve();
      });
    });
  },

  /**
   * 当改变月份时触发
   * @param {object} param
   */
  whenChangeDate: function whenChangeDate(_ref) {
    var curYear = _ref.curYear,
        curMonth = _ref.curMonth,
        newYear = _ref.newYear,
        newMonth = _ref.newMonth;

    Component.triggerEvent('whenChangeMonth', {
      current: {
        year: curYear,
        month: curMonth
      },
      next: {
        year: newYear,
        month: newMonth
      }
    });
  },

  /**
   * 多选
   * @param {object} opts
   */
  whenMulitSelect: function whenMulitSelect() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this && this.config) Component = this;
    var currentSelected = opts.currentSelected,
        _opts$selectedDays = opts.selectedDays,
        selectedDays = _opts$selectedDays === undefined ? [] : _opts$selectedDays;
    var days = opts.days,
        idx = opts.idx;

    var day = days[idx];
    if (!day) return;
    day.choosed = !day.choosed;
    if (!day.choosed) {
      day.cancel = true; // 该次点击是否为取消日期操作
      currentSelected = day;
      selectedDays = selectedDays.filter(function (item) {
        return item.year + '-' + item.month + '-' + item.day !== currentSelected.year + '-' + currentSelected.month + '-' + currentSelected.day;
      });
      if (opts.todoLabels) {
        opts.todoLabels.forEach(function (item) {
          if (currentSelected.year + '-' + currentSelected.month + '-' + currentSelected.day === item.year + '-' + item.month + '-' + item.day) {
            currentSelected.showTodoLabel = true;
          }
        });
      }
    } else {
      currentSelected = day;
      currentSelected.cancel = false;

      var _getData = getData('calendar'),
          showLabelAlways = _getData.showLabelAlways;

      if (showLabelAlways && currentSelected.showTodoLabel) {
        currentSelected.showTodoLabel = true;
      } else {
        currentSelected.showTodoLabel = false;
      }
      selectedDays.push(currentSelected);
    }
    var config = (0, _config2.default)(Component).getCalendarConfig();
    if (config.takeoverTap) {
      return Component.triggerEvent('onTapDay', currentSelected);
    }
    setData({
      'calendar.days': days,
      'calendar.selectedDay': selectedDays
    });
    conf.afterTapDay(currentSelected, selectedDays);
  },

  /**
   * 单选
   * @param {object} opts
   */
  whenSingleSelect: function whenSingleSelect() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this && this.config) Component = this;
    var currentSelected = opts.currentSelected,
        _opts$selectedDays2 = opts.selectedDays,
        selectedDays = _opts$selectedDays2 === undefined ? [] : _opts$selectedDays2;

    var shouldMarkerTodoDay = [];
    var _opts$days = opts.days,
        days = _opts$days === undefined ? [] : _opts$days,
        idx = opts.idx;

    var selectedDay = selectedDays[0] || {};
    var date = selectedDay.day;
    var preSelectedDate = date && days[date - 1] || {};

    var _ref2 = days[0] || {},
        dMonth = _ref2.month,
        dYear = _ref2.year;

    var _getData2 = getData(),
        _getData2$calendar = _getData2.calendar,
        calendar = _getData2$calendar === undefined ? {} : _getData2$calendar;

    var currentDay = days[idx];
    if (!currentDay) return;
    var config = (0, _config2.default)(Component).getCalendarConfig();
    currentSelected = currentDay;
    if (config.takeoverTap) {
      return Component.triggerEvent('onTapDay', currentSelected);
    }
    conf.afterTapDay(currentSelected);
    if (!config.inverse && preSelectedDate.day === currentDay.day) return;
    if (Component.weekMode) {
      days.forEach(function (item, idx) {
        if (item.day === date) days[idx].choosed = false;
      });
    }
    if (calendar.todoLabels) {
      // 筛选当月待办事项的日期
      shouldMarkerTodoDay = calendar.todoLabels.filter(function (item) {
        return +item.year === dYear && +item.month === dMonth;
      });
    }
    (0, _todo2.default)(Component).showTodoLabels(shouldMarkerTodoDay, days, selectedDays);
    var tmp = {
      'calendar.days': days
    };
    if (preSelectedDate.day !== currentDay.day) {
      preSelectedDate.choosed = false;
      currentDay.choosed = true;
      if (!calendar.showLabelAlways || !currentDay.showTodoLabel) {
        currentDay.showTodoLabel = false;
      }
      tmp['calendar.selectedDay'] = [currentSelected];
    } else if (config.inverse) {
      currentDay.choosed = !currentDay.choosed;
      if (currentDay.choosed) {
        if (currentDay.showTodoLabel && calendar.showLabelAlways) {
          currentDay.showTodoLabel = true;
        } else {
          currentDay.showTodoLabel = false;
        }
      }
      tmp['calendar.selectedDay'] = [];
    }
    setData(tmp);
  },

  /**
   * 点击日期后触发事件
   * @param {object} currentSelected 当前选择的日期
   * @param {array} selectedDays  多选状态下选中的日期
   */
  afterTapDay: function afterTapDay(currentSelected, selectedDays) {
    var config = (0, _config2.default)(Component).getCalendarConfig();
    var multi = config.multi;

    if (!multi) {
      Component.triggerEvent('afterTapDay', currentSelected);
    } else {
      Component.triggerEvent('afterTapDay', {
        currentSelected: currentSelected,
        selectedDays: selectedDays
      });
    }
  },

  /**
   * 跳转至今天
   */
  jumpToToday: function jumpToToday() {
    var _getDate$todayDate = getDate.todayDate(),
        curYear = _getDate$todayDate.year,
        curMonth = _getDate$todayDate.month,
        curDate = _getDate$todayDate.date;

    var timestamp = getDate.todayTimestamp();
    var config = (0, _config2.default)(Component).getCalendarConfig();
    setData({
      'calendar.curYear': curYear,
      'calendar.curMonth': curMonth,
      'calendar.selectedDay': [{
        year: curYear,
        day: curDate,
        month: curMonth,
        choosed: true,
        lunar: config.showLunar ? _convertSolarLunar2.default.solar2lunar(curYear, curMonth, curDate) : null
      }],
      'calendar.todayTimestamp': timestamp
    });
    conf.renderCalendar(curYear, curMonth, curDate);
  }
};

var whenChangeDate = exports.whenChangeDate = conf.whenChangeDate;
var renderCalendar = exports.renderCalendar = conf.renderCalendar;
var whenSingleSelect = exports.whenSingleSelect = conf.whenSingleSelect;
var whenMulitSelect = exports.whenMulitSelect = conf.whenMulitSelect;
var calculatePrevWeekDays = exports.calculatePrevWeekDays = conf.calculatePrevWeekDays;
var calculateNextWeekDays = exports.calculateNextWeekDays = conf.calculateNextWeekDays;

/**
 * 获取当前年月
 * @param {string} componentId 要操作的日历组件ID
 */
function getCurrentYM(componentId) {
  bindCurrentComponent(componentId);
  return {
    year: getData('calendar.curYear'),
    month: getData('calendar.curMonth')
  };
}

/**
 * 获取已选择的日期
 * @param {string} componentId 要操作的日历组件ID
 */
function getSelectedDay(componentId) {
  bindCurrentComponent(componentId);
  return getData('calendar.selectedDay');
}

/**
 * 取消所有选中日期
 * @param {string} componentId 要操作的日历组件ID
 */
function cancelAllSelectedDay(componentId) {
  bindCurrentComponent(componentId);
  var days = [].concat(_toConsumableArray(getData('calendar.days')));
  days.map(function (item) {
    item.choosed = false;
    return item;
  });
  setData({
    'calendar.days': days,
    'calendar.selectedDay': []
  });
}

/**
 * 跳转至指定日期
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @param {string} componentId 要操作的日历组件ID
 */
function jump(year, month, day, componentId) {
  bindCurrentComponent(componentId);

  var _ref3 = getData('calendar') || {},
      _ref3$selectedDay = _ref3.selectedDay,
      selectedDay = _ref3$selectedDay === undefined ? [] : _ref3$selectedDay;

  var _ref4 = selectedDay[0] || {},
      y = _ref4.year,
      m = _ref4.month,
      d = _ref4.day;

  if (+y === +year && +m === +month && +d === +day) {
    return;
  }
  if (year && month) {
    if (typeof +year !== 'number' || typeof +month !== 'number') {
      return logger.warn('jump 函数年月日参数必须为数字');
    }
    var timestamp = getDate.todayTimestamp();
    var tmp = {
      'calendar.curYear': year,
      'calendar.curMonth': month,
      'calendar.todayTimestamp': timestamp
    };
    setData(tmp, function () {
      if (typeof +day === 'number') {
        return conf.renderCalendar(year, month, day);
      }
      conf.renderCalendar(year, month);
    });
  } else {
    conf.jumpToToday();
  }
}

/**
 * 设置待办事项日期标记
 * @param {object} todos  待办事项配置
 * @param {string} [todos.pos] 标记显示位置，默认值'bottom' ['bottom', 'top']
 * @param {string} [todos.dotColor] 标记点颜色，backgroundColor 支持的值都行
 * @param {object[]} [todos.days] 需要标记的所有日期，如：[{year: 2015, month: 5, day: 12}]，其中年月日字段必填
 * @param {string} componentId 要操作的日历组件ID
 */
function setTodoLabels(todos, componentId) {
  bindCurrentComponent(componentId);
  (0, _todo2.default)(Component).setTodoLabels(todos);
}

/**
 * 删除指定日期待办事项
 * @param {array} todos 需要删除的待办日期数组
 * @param {string} componentId 要操作的日历组件ID
 */
function deleteTodoLabels(todos, componentId) {
  bindCurrentComponent(componentId);
  (0, _todo2.default)(Component).deleteTodoLabels(todos);
}

/**
 * 清空所有待办事项
 * @param {string} componentId 要操作的日历组件ID
 */
function clearTodoLabels(componentId) {
  bindCurrentComponent(componentId);
  (0, _todo2.default)(Component).clearTodoLabels();
}

/**
 * 获取所有待办事项
 * @param {string} componentId 要操作的日历组件ID
 */
function getTodoLabels(componentId) {
  bindCurrentComponent(componentId);
  return (0, _todo2.default)(Component).getTodoLabels();
}

/**
 * 禁用指定日期
 * @param {array} days 日期
 * @param {number} [days.year]
 * @param {number} [days.month]
 * @param {number} [days.day]
 * @param {string} componentId 要操作的日历组件ID
 */
function disableDay() {
  var days = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var componentId = arguments[1];

  bindCurrentComponent(componentId);
  (0, _day2.default)(Component).disableDays(days);
}

/**
 * 指定可选日期范围
 * @param {array} area 日期访问数组
 * @param {string} componentId 要操作的日历组件ID
 */
function enableArea() {
  var area = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var componentId = arguments[1];

  bindCurrentComponent(componentId);
  (0, _day2.default)(Component).enableArea(area);
}

/**
 * 指定特定日期可选
 * @param {array} days 指定日期数组
 * @param {string} componentId 要操作的日历组件ID
 */
function enableDays() {
  var days = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var componentId = arguments[1];

  bindCurrentComponent(componentId);
  (0, _day2.default)(Component).enableDays(days);
}

/**
 * 设置选中日期（多选模式下）
 * @param {array} selected 需选中日期
 * @param {string} componentId 要操作的日历组件ID
 */
function setSelectedDays(selected, componentId) {
  bindCurrentComponent(componentId);
  (0, _day2.default)(Component).setSelectedDays(selected);
}

/**
 * 获取当前日历配置
 * @param {string} componentId 要操作的日历组件ID
 */
function getCalendarConfig(componentId) {
  bindCurrentComponent(componentId);
  (0, _config2.default)(Component).getCalendarConfig();
}

/**
 * 设置日历配置
 * @param {string} key
 * @param {string|boolean} value
 * @param {string} componentId 要操作的日历组件ID
 */
function setCalendarConfig(key, value, componentId) {
  bindCurrentComponent(componentId);
  (0, _config2.default)(Component).setCalendarConfig(key, value);
}

/**
 * 获取当前日历面板日期
 * @param {string} componentId 要操作的日历组件ID
 */
function getCalendarDates(componentId) {
  bindCurrentComponent(componentId);
  return getData('calendar.days', componentId);
}

/**
 * 切换周月视图
 * 切换视图时可传入指定日期，如: {year: 2019, month: 1, day: 3}
 * args[0] view 视图模式[week, month]
 * args[1]|args[2]为day object或者 componentId
 */
function switchView() {
  var _this = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    var view = args[0];
    if (!args[1]) {
      return (0, _week2.default)(Component).switchWeek(view).then(resolve).catch(reject);
    }
    if (typeof args[1] === 'string') {
      bindCurrentComponent(args[1], _this);
      (0, _week2.default)(Component).switchWeek(view, args[2]).then(resolve).catch(reject);
    } else if (_typeof(args[1]) === 'object') {
      if (typeof args[2] === 'string') {
        bindCurrentComponent(args[1], _this);
      }
      (0, _week2.default)(Component).switchWeek(view, args[1]).then(resolve).catch(reject);
    }
  });
}

/**
 * 绑定日历事件至当前页面实例
 * @param {object} page 当前页面实例
 */
function mountEventsOnPage(page) {
  page.calendar = {
    jump: jump,
    switchView: switchView,
    disableDay: disableDay,
    enableArea: enableArea,
    enableDays: enableDays,
    getCurrentYM: getCurrentYM,
    getSelectedDay: getSelectedDay,
    cancelAllSelectedDay: cancelAllSelectedDay,
    setTodoLabels: setTodoLabels,
    getTodoLabels: getTodoLabels,
    deleteTodoLabels: deleteTodoLabels,
    clearTodoLabels: clearTodoLabels,
    setSelectedDays: setSelectedDays,
    getCalendarConfig: getCalendarConfig,
    setCalendarConfig: setCalendarConfig,
    getCalendarDates: getCalendarDates
  };
}

function setWeekHeader(firstDayOfWeek) {
  var weeksCh = ['日', '一', '二', '三', '四', '五', '六'];
  if (firstDayOfWeek === 'Mon') {
    weeksCh = ['一', '二', '三', '四', '五', '六', '日'];
  }
  setData({
    'calendar.weeksCh': weeksCh
  });
}

function autoSelectDay(defaultDay) {
  if (defaultDay && typeof defaultDay === 'string') {
    var day = defaultDay.split('-');
    if (day.length < 3) {
      return logger.warn('配置 jumpTo 格式应为: 2018-4-2 或 2018-04-02');
    }
    jump(+day[0], +day[1], +day[2]);
  } else if (defaultDay === false) {
    Component.config.noDefault = true;
    jump();
  } else {
    jump();
  }
}

function init(component, config) {
  _utils.initialTasks.flag = 'process';
  Component = component;
  Component.config = config;
  setWeekHeader(config.firstDayOfWeek);
  autoSelectDay(config.defaultDay);
  logger.tips('使用中若遇问题请反馈至 https://github.com/treadpit/wx_calendar/issues ✍️');
}

exports.default = function (component) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (_utils.initialTasks.flag === 'process') {
    return _utils.initialTasks.tasks.push(function () {
      init(component, config);
    });
  }
  init(component, config);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZ2V0Q3VycmVudFlNIiwiZ2V0U2VsZWN0ZWREYXkiLCJjYW5jZWxBbGxTZWxlY3RlZERheSIsImp1bXAiLCJzZXRUb2RvTGFiZWxzIiwiZGVsZXRlVG9kb0xhYmVscyIsImNsZWFyVG9kb0xhYmVscyIsImdldFRvZG9MYWJlbHMiLCJkaXNhYmxlRGF5IiwiZW5hYmxlQXJlYSIsImVuYWJsZURheXMiLCJzZXRTZWxlY3RlZERheXMiLCJnZXRDYWxlbmRhckNvbmZpZyIsInNldENhbGVuZGFyQ29uZmlnIiwiZ2V0Q2FsZW5kYXJEYXRlcyIsInN3aXRjaFZpZXciLCJDb21wb25lbnQiLCJsb2dnZXIiLCJMb2dnZXIiLCJnZXREYXRlIiwiR2V0RGF0ZSIsImRhdGFJbnN0YW5jZSIsImJpbmRDdXJyZW50Q29tcG9uZW50IiwiY29tcG9uZW50SWQiLCJnZXREYXRhIiwia2V5IiwiV3hEYXRhIiwic2V0RGF0YSIsImRhdGEiLCJjYWxsYmFjayIsImNvbmYiLCJyZW5kZXJDYWxlbmRhciIsImN1clllYXIiLCJjdXJNb250aCIsImN1ckRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRoZW4iLCJtb3VudEV2ZW50c09uUGFnZSIsInRyaWdnZXJFdmVudCIsImZpcnN0UmVuZGVyIiwiaW5pdGlhbFRhc2tzIiwiZmxhZyIsInRhc2tzIiwibGVuZ3RoIiwic2hpZnQiLCJ3aGVuQ2hhbmdlRGF0ZSIsIm5ld1llYXIiLCJuZXdNb250aCIsImN1cnJlbnQiLCJ5ZWFyIiwibW9udGgiLCJuZXh0Iiwid2hlbk11bGl0U2VsZWN0Iiwib3B0cyIsImNvbmZpZyIsImN1cnJlbnRTZWxlY3RlZCIsInNlbGVjdGVkRGF5cyIsImRheXMiLCJpZHgiLCJkYXkiLCJjaG9vc2VkIiwiY2FuY2VsIiwiZmlsdGVyIiwiaXRlbSIsInRvZG9MYWJlbHMiLCJmb3JFYWNoIiwic2hvd1RvZG9MYWJlbCIsInNob3dMYWJlbEFsd2F5cyIsInB1c2giLCJ0YWtlb3ZlclRhcCIsImFmdGVyVGFwRGF5Iiwid2hlblNpbmdsZVNlbGVjdCIsInNob3VsZE1hcmtlclRvZG9EYXkiLCJzZWxlY3RlZERheSIsImRhdGUiLCJwcmVTZWxlY3RlZERhdGUiLCJkTW9udGgiLCJkWWVhciIsImNhbGVuZGFyIiwiY3VycmVudERheSIsImludmVyc2UiLCJ3ZWVrTW9kZSIsInNob3dUb2RvTGFiZWxzIiwidG1wIiwibXVsdGkiLCJqdW1wVG9Ub2RheSIsInRvZGF5RGF0ZSIsInRpbWVzdGFtcCIsInRvZGF5VGltZXN0YW1wIiwibHVuYXIiLCJzaG93THVuYXIiLCJjb252ZXJ0U29sYXJMdW5hciIsInNvbGFyMmx1bmFyIiwiY2FsY3VsYXRlUHJldldlZWtEYXlzIiwiY2FsY3VsYXRlTmV4dFdlZWtEYXlzIiwibWFwIiwieSIsIm0iLCJkIiwid2FybiIsInRvZG9zIiwiZGlzYWJsZURheXMiLCJhcmVhIiwic2VsZWN0ZWQiLCJ2YWx1ZSIsImFyZ3MiLCJ2aWV3Iiwic3dpdGNoV2VlayIsImNhdGNoIiwicGFnZSIsInNldFdlZWtIZWFkZXIiLCJmaXJzdERheU9mV2VlayIsIndlZWtzQ2giLCJhdXRvU2VsZWN0RGF5IiwiZGVmYXVsdERheSIsInNwbGl0Iiwibm9EZWZhdWx0IiwiaW5pdCIsImNvbXBvbmVudCIsInRpcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQWtRZ0JBLFksR0FBQUEsWTtRQVlBQyxjLEdBQUFBLGM7UUFTQUMsb0IsR0FBQUEsb0I7UUFvQkFDLEksR0FBQUEsSTtRQW9DQUMsYSxHQUFBQSxhO1FBVUFDLGdCLEdBQUFBLGdCO1FBU0FDLGUsR0FBQUEsZTtRQVNBQyxhLEdBQUFBLGE7UUFhQUMsVSxHQUFBQSxVO1FBVUFDLFUsR0FBQUEsVTtRQVVBQyxVLEdBQUFBLFU7UUFVQUMsZSxHQUFBQSxlO1FBU0FDLGlCLEdBQUFBLGlCO1FBV0FDLGlCLEdBQUFBLGlCO1FBU0FDLGdCLEdBQUFBLGdCO1FBV0FDLFUsR0FBQUEsVTs7QUE5YmhCOzs7O0FBQ0E7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Q0F4RyxZQUFVd0MsTUFBVixHQUFtQkEsTUFBbkI7QUFDQXdELGdCQUFjeEQsT0FBT3lELGNBQXJCO0FBQ0FFLGdCQUFjM0QsT0FBTzRELFVBQXJCO0FBQ0FuRyxTQUFPd0csSUFBUCxDQUNFLCtEQURGO0FBR0Q7O2tCQUVjLFVBQUNELFNBQUQsRUFBNEI7QUFBQSxNQUFoQmhFLE1BQWdCLHVFQUFQLEVBQU87O0FBQ3pDLE1BQUlkLG9CQUFhQyxJQUFiLEtBQXNCLFNBQTFCLEVBQXFDO0FBQ25DLFdBQU9ELG9CQUFhRSxLQUFiLENBQW1CMEIsSUFBbkIsQ0FBd0IsWUFBVztBQUN4Q2lELFdBQUtDLFNBQUwsRUFBZ0JoRSxNQUFoQjtBQUNELEtBRk0sQ0FBUDtBQUdEO0FBQ0QrRCxPQUFLQyxTQUFMLEVBQWdCaEUsTUFBaEI7QUFDRCxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGF5IGZyb20gJy4vZnVuYy9kYXknO1xuaW1wb3J0IFdlZWsgZnJvbSAnLi9mdW5jL3dlZWsnO1xuaW1wb3J0IFRvZG8gZnJvbSAnLi9mdW5jL3RvZG8nO1xuaW1wb3J0IFd4RGF0YSBmcm9tICcuL2Z1bmMvd3hEYXRhJztcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2Z1bmMvcmVuZGVyJztcbmltcG9ydCBDYWxlbmRhckNvbmZpZyBmcm9tICcuL2Z1bmMvY29uZmlnJztcbmltcG9ydCBjb252ZXJ0U29sYXJMdW5hciBmcm9tICcuL2Z1bmMvY29udmVydFNvbGFyTHVuYXInO1xuaW1wb3J0IHtcbiAgTG9nZ2VyLFxuICBHZXREYXRlLFxuICBpbml0aWFsVGFza3MsXG4gIGdldEN1cnJlbnRQYWdlLFxuICBnZXRDb21wb25lbnRcbn0gZnJvbSAnLi9mdW5jL3V0aWxzJztcblxubGV0IENvbXBvbmVudCA9IHt9O1xubGV0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbmxldCBnZXREYXRlID0gbmV3IEdldERhdGUoKTtcbmxldCBkYXRhSW5zdGFuY2UgPSBudWxsO1xuXG4vKipcbiAqIOWFqOWxgOi1i+WAvOato+WcqOaTjeS9nOeahOe7hOS7tuWunuS+i++8jOaWueS+v+ivuy/lhpnlkIToh6rnmoQgZGF0YVxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIOimgeaTjeS9nOeahOaXpeWOhue7hOS7tklEXG4gKi9cbmZ1bmN0aW9uIGJpbmRDdXJyZW50Q29tcG9uZW50KGNvbXBvbmVudElkKSB7XG4gIGlmIChjb21wb25lbnRJZCkge1xuICAgIENvbXBvbmVudCA9IGdldENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gIH1cbn1cbi8qKlxuICog6I635Y+W5pel5Y6G5YaF6YOo5pWw5o2uXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IOiOt+WPluWAvOeahOmUruWQjVxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIOimgeaTjeS9nOeahOaXpeWOhue7hOS7tklEXG4gKi9cbmZ1bmN0aW9uIGdldERhdGEoa2V5LCBjb21wb25lbnRJZCkge1xuICBiaW5kQ3VycmVudENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gIGRhdGFJbnN0YW5jZSA9IG5ldyBXeERhdGEoQ29tcG9uZW50KTtcbiAgcmV0dXJuIGRhdGFJbnN0YW5jZS5nZXREYXRhKGtleSk7XG59XG4vKipcbiAqIOiuvue9ruaXpeWOhuWGhemDqOaVsOaNrlxuICogQHBhcmFtIHtvYmplY3R9fSBkYXRhIOW+heiuvue9rueahOaVsOaNrlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sg6K6+572u5oiQ5Yqf5Zue6LCD5Ye95pWwXG4gKi9cbmZ1bmN0aW9uIHNldERhdGEoZGF0YSwgY2FsbGJhY2sgPSAoKSA9PiB7fSkge1xuICBjb25zdCBkYXRhSW5zdGFuY2UgPSBuZXcgV3hEYXRhKENvbXBvbmVudCk7XG4gIHJldHVybiBkYXRhSW5zdGFuY2Uuc2V0RGF0YShkYXRhLCBjYWxsYmFjayk7XG59XG5cbmNvbnN0IGNvbmYgPSB7XG4gIC8qKlxuICAgKiDmuLLmn5Pml6XljoZcbiAgICogQHBhcmFtIHtudW1iZXJ9IGN1clllYXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGN1ck1vbnRoXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJEYXRlXG4gICAqL1xuICByZW5kZXJDYWxlbmRhcihjdXJZZWFyLCBjdXJNb250aCwgY3VyRGF0ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBDYWxlbmRhcihDb21wb25lbnQpXG4gICAgICAgIC5yZW5kZXJDYWxlbmRhcihjdXJZZWFyLCBjdXJNb250aCwgY3VyRGF0ZSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIG1vdW50RXZlbnRzT25QYWdlKGdldEN1cnJlbnRQYWdlKCkpO1xuICAgICAgICAgIENvbXBvbmVudC50cmlnZ2VyRXZlbnQoJ2FmdGVyQ2FsZW5kYXJSZW5kZXInLCBDb21wb25lbnQpO1xuICAgICAgICAgIENvbXBvbmVudC5maXJzdFJlbmRlciA9IHRydWU7XG4gICAgICAgICAgaW5pdGlhbFRhc2tzLmZsYWcgPSAnZmluaXNoZWQnO1xuICAgICAgICAgIGlmIChpbml0aWFsVGFza3MudGFza3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBpbml0aWFsVGFza3MudGFza3Muc2hpZnQoKSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICAvKipcbiAgICog5b2T5pS55Y+Y5pyI5Lu95pe26Kem5Y+RXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxuICAgKi9cbiAgd2hlbkNoYW5nZURhdGUoeyBjdXJZZWFyLCBjdXJNb250aCwgbmV3WWVhciwgbmV3TW9udGggfSkge1xuICAgIENvbXBvbmVudC50cmlnZ2VyRXZlbnQoJ3doZW5DaGFuZ2VNb250aCcsIHtcbiAgICAgIGN1cnJlbnQ6IHtcbiAgICAgICAgeWVhcjogY3VyWWVhcixcbiAgICAgICAgbW9udGg6IGN1ck1vbnRoXG4gICAgICB9LFxuICAgICAgbmV4dDoge1xuICAgICAgICB5ZWFyOiBuZXdZZWFyLFxuICAgICAgICBtb250aDogbmV3TW9udGhcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIOWkmumAiVxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICAgKi9cbiAgd2hlbk11bGl0U2VsZWN0KG9wdHMgPSB7fSkge1xuICAgIGlmICh0aGlzICYmIHRoaXMuY29uZmlnKSBDb21wb25lbnQgPSB0aGlzO1xuICAgIGxldCB7IGN1cnJlbnRTZWxlY3RlZCwgc2VsZWN0ZWREYXlzID0gW10gfSA9IG9wdHM7XG4gICAgY29uc3QgeyBkYXlzLCBpZHggfSA9IG9wdHM7XG4gICAgY29uc3QgZGF5ID0gZGF5c1tpZHhdO1xuICAgIGlmICghZGF5KSByZXR1cm47XG4gICAgZGF5LmNob29zZWQgPSAhZGF5LmNob29zZWQ7XG4gICAgaWYgKCFkYXkuY2hvb3NlZCkge1xuICAgICAgZGF5LmNhbmNlbCA9IHRydWU7IC8vIOivpeasoeeCueWHu+aYr+WQpuS4uuWPlua2iOaXpeacn+aTjeS9nFxuICAgICAgY3VycmVudFNlbGVjdGVkID0gZGF5O1xuICAgICAgc2VsZWN0ZWREYXlzID0gc2VsZWN0ZWREYXlzLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PlxuICAgICAgICAgIGAke2l0ZW0ueWVhcn0tJHtpdGVtLm1vbnRofS0ke2l0ZW0uZGF5fWAgIT09XG4gICAgICAgICAgYCR7Y3VycmVudFNlbGVjdGVkLnllYXJ9LSR7Y3VycmVudFNlbGVjdGVkLm1vbnRofS0ke1xuICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkLmRheVxuICAgICAgICAgIH1gXG4gICAgICApO1xuICAgICAgaWYgKG9wdHMudG9kb0xhYmVscykge1xuICAgICAgICBvcHRzLnRvZG9MYWJlbHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBgJHtjdXJyZW50U2VsZWN0ZWQueWVhcn0tJHtjdXJyZW50U2VsZWN0ZWQubW9udGh9LSR7XG4gICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3RlZC5kYXlcbiAgICAgICAgICAgIH1gID09PSBgJHtpdGVtLnllYXJ9LSR7aXRlbS5tb250aH0tJHtpdGVtLmRheX1gXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuc2hvd1RvZG9MYWJlbCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudFNlbGVjdGVkID0gZGF5O1xuICAgICAgY3VycmVudFNlbGVjdGVkLmNhbmNlbCA9IGZhbHNlO1xuICAgICAgY29uc3QgeyBzaG93TGFiZWxBbHdheXMgfSA9IGdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgICBpZiAoc2hvd0xhYmVsQWx3YXlzICYmIGN1cnJlbnRTZWxlY3RlZC5zaG93VG9kb0xhYmVsKSB7XG4gICAgICAgIGN1cnJlbnRTZWxlY3RlZC5zaG93VG9kb0xhYmVsID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRTZWxlY3RlZC5zaG93VG9kb0xhYmVsID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBzZWxlY3RlZERheXMucHVzaChjdXJyZW50U2VsZWN0ZWQpO1xuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSBDYWxlbmRhckNvbmZpZyhDb21wb25lbnQpLmdldENhbGVuZGFyQ29uZmlnKCk7XG4gICAgaWYgKGNvbmZpZy50YWtlb3ZlclRhcCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudC50cmlnZ2VyRXZlbnQoJ29uVGFwRGF5JywgY3VycmVudFNlbGVjdGVkKTtcbiAgICB9XG4gICAgc2V0RGF0YSh7XG4gICAgICAnY2FsZW5kYXIuZGF5cyc6IGRheXMsXG4gICAgICAnY2FsZW5kYXIuc2VsZWN0ZWREYXknOiBzZWxlY3RlZERheXNcbiAgICB9KTtcbiAgICBjb25mLmFmdGVyVGFwRGF5KGN1cnJlbnRTZWxlY3RlZCwgc2VsZWN0ZWREYXlzKTtcbiAgfSxcbiAgLyoqXG4gICAqIOWNlemAiVxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICAgKi9cbiAgd2hlblNpbmdsZVNlbGVjdChvcHRzID0ge30pIHtcbiAgICBpZiAodGhpcyAmJiB0aGlzLmNvbmZpZykgQ29tcG9uZW50ID0gdGhpcztcbiAgICBsZXQgeyBjdXJyZW50U2VsZWN0ZWQsIHNlbGVjdGVkRGF5cyA9IFtdIH0gPSBvcHRzO1xuICAgIGxldCBzaG91bGRNYXJrZXJUb2RvRGF5ID0gW107XG4gICAgY29uc3QgeyBkYXlzID0gW10sIGlkeCB9ID0gb3B0cztcbiAgICBjb25zdCBzZWxlY3RlZERheSA9IHNlbGVjdGVkRGF5c1swXSB8fCB7fTtcbiAgICBjb25zdCBkYXRlID0gc2VsZWN0ZWREYXkuZGF5O1xuICAgIGNvbnN0IHByZVNlbGVjdGVkRGF0ZSA9IChkYXRlICYmIGRheXNbZGF0ZSAtIDFdKSB8fCB7fTtcbiAgICBjb25zdCB7IG1vbnRoOiBkTW9udGgsIHllYXI6IGRZZWFyIH0gPSBkYXlzWzBdIHx8IHt9O1xuICAgIGNvbnN0IHsgY2FsZW5kYXIgPSB7fSB9ID0gZ2V0RGF0YSgpO1xuICAgIGNvbnN0IGN1cnJlbnREYXkgPSBkYXlzW2lkeF07XG4gICAgaWYgKCFjdXJyZW50RGF5KSByZXR1cm47XG4gICAgY29uc3QgY29uZmlnID0gQ2FsZW5kYXJDb25maWcoQ29tcG9uZW50KS5nZXRDYWxlbmRhckNvbmZpZygpO1xuICAgIGN1cnJlbnRTZWxlY3RlZCA9IGN1cnJlbnREYXk7XG4gICAgaWYgKGNvbmZpZy50YWtlb3ZlclRhcCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudC50cmlnZ2VyRXZlbnQoJ29uVGFwRGF5JywgY3VycmVudFNlbGVjdGVkKTtcbiAgICB9XG4gICAgY29uZi5hZnRlclRhcERheShjdXJyZW50U2VsZWN0ZWQpO1xuICAgIGlmICghY29uZmlnLmludmVyc2UgJiYgcHJlU2VsZWN0ZWREYXRlLmRheSA9PT0gY3VycmVudERheS5kYXkpIHJldHVybjtcbiAgICBpZiAoQ29tcG9uZW50LndlZWtNb2RlKSB7XG4gICAgICBkYXlzLmZvckVhY2goKGl0ZW0sIGlkeCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5kYXkgPT09IGRhdGUpIGRheXNbaWR4XS5jaG9vc2VkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGNhbGVuZGFyLnRvZG9MYWJlbHMpIHtcbiAgICAgIC8vIOetm+mAieW9k+aciOW+heWKnuS6i+mhueeahOaXpeacn1xuICAgICAgc2hvdWxkTWFya2VyVG9kb0RheSA9IGNhbGVuZGFyLnRvZG9MYWJlbHMuZmlsdGVyKFxuICAgICAgICBpdGVtID0+ICtpdGVtLnllYXIgPT09IGRZZWFyICYmICtpdGVtLm1vbnRoID09PSBkTW9udGhcbiAgICAgICk7XG4gICAgfVxuICAgIFRvZG8oQ29tcG9uZW50KS5zaG93VG9kb0xhYmVscyhzaG91bGRNYXJrZXJUb2RvRGF5LCBkYXlzLCBzZWxlY3RlZERheXMpO1xuICAgIGNvbnN0IHRtcCA9IHtcbiAgICAgICdjYWxlbmRhci5kYXlzJzogZGF5c1xuICAgIH07XG4gICAgaWYgKHByZVNlbGVjdGVkRGF0ZS5kYXkgIT09IGN1cnJlbnREYXkuZGF5KSB7XG4gICAgICBwcmVTZWxlY3RlZERhdGUuY2hvb3NlZCA9IGZhbHNlO1xuICAgICAgY3VycmVudERheS5jaG9vc2VkID0gdHJ1ZTtcbiAgICAgIGlmICghY2FsZW5kYXIuc2hvd0xhYmVsQWx3YXlzIHx8ICFjdXJyZW50RGF5LnNob3dUb2RvTGFiZWwpIHtcbiAgICAgICAgY3VycmVudERheS5zaG93VG9kb0xhYmVsID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0bXBbJ2NhbGVuZGFyLnNlbGVjdGVkRGF5J10gPSBbY3VycmVudFNlbGVjdGVkXTtcbiAgICB9IGVsc2UgaWYgKGNvbmZpZy5pbnZlcnNlKSB7XG4gICAgICBjdXJyZW50RGF5LmNob29zZWQgPSAhY3VycmVudERheS5jaG9vc2VkO1xuICAgICAgaWYgKGN1cnJlbnREYXkuY2hvb3NlZCkge1xuICAgICAgICBpZiAoY3VycmVudERheS5zaG93VG9kb0xhYmVsICYmIGNhbGVuZGFyLnNob3dMYWJlbEFsd2F5cykge1xuICAgICAgICAgIGN1cnJlbnREYXkuc2hvd1RvZG9MYWJlbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudERheS5zaG93VG9kb0xhYmVsID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRtcFsnY2FsZW5kYXIuc2VsZWN0ZWREYXknXSA9IFtdO1xuICAgIH1cbiAgICBzZXREYXRhKHRtcCk7XG4gIH0sXG4gIC8qKlxuICAgKiDngrnlh7vml6XmnJ/lkI7op6blj5Hkuovku7ZcbiAgICogQHBhcmFtIHtvYmplY3R9IGN1cnJlbnRTZWxlY3RlZCDlvZPliY3pgInmi6nnmoTml6XmnJ9cbiAgICogQHBhcmFtIHthcnJheX0gc2VsZWN0ZWREYXlzICDlpJrpgInnirbmgIHkuIvpgInkuK3nmoTml6XmnJ9cbiAgICovXG4gIGFmdGVyVGFwRGF5KGN1cnJlbnRTZWxlY3RlZCwgc2VsZWN0ZWREYXlzKSB7XG4gICAgY29uc3QgY29uZmlnID0gQ2FsZW5kYXJDb25maWcoQ29tcG9uZW50KS5nZXRDYWxlbmRhckNvbmZpZygpO1xuICAgIGNvbnN0IHsgbXVsdGkgfSA9IGNvbmZpZztcbiAgICBpZiAoIW11bHRpKSB7XG4gICAgICBDb21wb25lbnQudHJpZ2dlckV2ZW50KCdhZnRlclRhcERheScsIGN1cnJlbnRTZWxlY3RlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENvbXBvbmVudC50cmlnZ2VyRXZlbnQoJ2FmdGVyVGFwRGF5Jywge1xuICAgICAgICBjdXJyZW50U2VsZWN0ZWQsXG4gICAgICAgIHNlbGVjdGVkRGF5c1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvKipcbiAgICog6Lez6L2s6Iez5LuK5aSpXG4gICAqL1xuICBqdW1wVG9Ub2RheSgpIHtcbiAgICBjb25zdCB7XG4gICAgICB5ZWFyOiBjdXJZZWFyLFxuICAgICAgbW9udGg6IGN1ck1vbnRoLFxuICAgICAgZGF0ZTogY3VyRGF0ZVxuICAgIH0gPSBnZXREYXRlLnRvZGF5RGF0ZSgpO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IGdldERhdGUudG9kYXlUaW1lc3RhbXAoKTtcbiAgICBjb25zdCBjb25maWcgPSBDYWxlbmRhckNvbmZpZyhDb21wb25lbnQpLmdldENhbGVuZGFyQ29uZmlnKCk7XG4gICAgc2V0RGF0YSh7XG4gICAgICAnY2FsZW5kYXIuY3VyWWVhcic6IGN1clllYXIsXG4gICAgICAnY2FsZW5kYXIuY3VyTW9udGgnOiBjdXJNb250aCxcbiAgICAgICdjYWxlbmRhci5zZWxlY3RlZERheSc6IFtcbiAgICAgICAge1xuICAgICAgICAgIHllYXI6IGN1clllYXIsXG4gICAgICAgICAgZGF5OiBjdXJEYXRlLFxuICAgICAgICAgIG1vbnRoOiBjdXJNb250aCxcbiAgICAgICAgICBjaG9vc2VkOiB0cnVlLFxuICAgICAgICAgIGx1bmFyOiBjb25maWcuc2hvd0x1bmFyXG4gICAgICAgICAgICA/IGNvbnZlcnRTb2xhckx1bmFyLnNvbGFyMmx1bmFyKGN1clllYXIsIGN1ck1vbnRoLCBjdXJEYXRlKVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICAnY2FsZW5kYXIudG9kYXlUaW1lc3RhbXAnOiB0aW1lc3RhbXBcbiAgICB9KTtcbiAgICBjb25mLnJlbmRlckNhbGVuZGFyKGN1clllYXIsIGN1ck1vbnRoLCBjdXJEYXRlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHdoZW5DaGFuZ2VEYXRlID0gY29uZi53aGVuQ2hhbmdlRGF0ZTtcbmV4cG9ydCBjb25zdCByZW5kZXJDYWxlbmRhciA9IGNvbmYucmVuZGVyQ2FsZW5kYXI7XG5leHBvcnQgY29uc3Qgd2hlblNpbmdsZVNlbGVjdCA9IGNvbmYud2hlblNpbmdsZVNlbGVjdDtcbmV4cG9ydCBjb25zdCB3aGVuTXVsaXRTZWxlY3QgPSBjb25mLndoZW5NdWxpdFNlbGVjdDtcbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVQcmV2V2Vla0RheXMgPSBjb25mLmNhbGN1bGF0ZVByZXZXZWVrRGF5cztcbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVOZXh0V2Vla0RheXMgPSBjb25mLmNhbGN1bGF0ZU5leHRXZWVrRGF5cztcblxuLyoqXG4gKiDojrflj5blvZPliY3lubTmnIhcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnRJZCDopoHmk43kvZznmoTml6Xljobnu4Tku7ZJRFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFlNKGNvbXBvbmVudElkKSB7XG4gIGJpbmRDdXJyZW50Q29tcG9uZW50KGNvbXBvbmVudElkKTtcbiAgcmV0dXJuIHtcbiAgICB5ZWFyOiBnZXREYXRhKCdjYWxlbmRhci5jdXJZZWFyJyksXG4gICAgbW9udGg6IGdldERhdGEoJ2NhbGVuZGFyLmN1ck1vbnRoJylcbiAgfTtcbn1cblxuLyoqXG4gKiDojrflj5blt7LpgInmi6nnmoTml6XmnJ9cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnRJZCDopoHmk43kvZznmoTml6Xljobnu4Tku7ZJRFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VsZWN0ZWREYXkoY29tcG9uZW50SWQpIHtcbiAgYmluZEN1cnJlbnRDb21wb25lbnQoY29tcG9uZW50SWQpO1xuICByZXR1cm4gZ2V0RGF0YSgnY2FsZW5kYXIuc2VsZWN0ZWREYXknKTtcbn1cblxuLyoqXG4gKiDlj5bmtojmiYDmnInpgInkuK3ml6XmnJ9cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnRJZCDopoHmk43kvZznmoTml6Xljobnu4Tku7ZJRFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsQWxsU2VsZWN0ZWREYXkoY29tcG9uZW50SWQpIHtcbiAgYmluZEN1cnJlbnRDb21wb25lbnQoY29tcG9uZW50SWQpO1xuICBjb25zdCBkYXlzID0gWy4uLmdldERhdGEoJ2NhbGVuZGFyLmRheXMnKV07XG4gIGRheXMubWFwKGl0ZW0gPT4ge1xuICAgIGl0ZW0uY2hvb3NlZCA9IGZhbHNlO1xuICAgIHJldHVybiBpdGVtO1xuICB9KTtcbiAgc2V0RGF0YSh7XG4gICAgJ2NhbGVuZGFyLmRheXMnOiBkYXlzLFxuICAgICdjYWxlbmRhci5zZWxlY3RlZERheSc6IFtdXG4gIH0pO1xufVxuXG4vKipcbiAqIOi3s+i9rOiHs+aMh+WumuaXpeacn1xuICogQHBhcmFtIHtudW1iZXJ9IHllYXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aFxuICogQHBhcmFtIHtudW1iZXJ9IGRheVxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIOimgeaTjeS9nOeahOaXpeWOhue7hOS7tklEXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqdW1wKHllYXIsIG1vbnRoLCBkYXksIGNvbXBvbmVudElkKSB7XG4gIGJpbmRDdXJyZW50Q29tcG9uZW50KGNvbXBvbmVudElkKTtcbiAgY29uc3QgeyBzZWxlY3RlZERheSA9IFtdIH0gPSBnZXREYXRhKCdjYWxlbmRhcicpIHx8IHt9O1xuICBjb25zdCB7IHllYXI6IHksIG1vbnRoOiBtLCBkYXk6IGQgfSA9IHNlbGVjdGVkRGF5WzBdIHx8IHt9O1xuICBpZiAoK3kgPT09ICt5ZWFyICYmICttID09PSArbW9udGggJiYgK2QgPT09ICtkYXkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHllYXIgJiYgbW9udGgpIHtcbiAgICBpZiAodHlwZW9mICt5ZWFyICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgK21vbnRoICE9PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCdqdW1wIOWHveaVsOW5tOaciOaXpeWPguaVsOW/hemhu+S4uuaVsOWtlycpO1xuICAgIH1cbiAgICBjb25zdCB0aW1lc3RhbXAgPSBnZXREYXRlLnRvZGF5VGltZXN0YW1wKCk7XG4gICAgbGV0IHRtcCA9IHtcbiAgICAgICdjYWxlbmRhci5jdXJZZWFyJzogeWVhcixcbiAgICAgICdjYWxlbmRhci5jdXJNb250aCc6IG1vbnRoLFxuICAgICAgJ2NhbGVuZGFyLnRvZGF5VGltZXN0YW1wJzogdGltZXN0YW1wXG4gICAgfTtcbiAgICBzZXREYXRhKHRtcCwgKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiArZGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gY29uZi5yZW5kZXJDYWxlbmRhcih5ZWFyLCBtb250aCwgZGF5KTtcbiAgICAgIH1cbiAgICAgIGNvbmYucmVuZGVyQ2FsZW5kYXIoeWVhciwgbW9udGgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbmYuanVtcFRvVG9kYXkoKTtcbiAgfVxufVxuXG4vKipcbiAqIOiuvue9ruW+heWKnuS6i+mhueaXpeacn+agh+iusFxuICogQHBhcmFtIHtvYmplY3R9IHRvZG9zICDlvoXlip7kuovpobnphY3nva5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9kb3MucG9zXSDmoIforrDmmL7npLrkvY3nva7vvIzpu5jorqTlgLwnYm90dG9tJyBbJ2JvdHRvbScsICd0b3AnXVxuICogQHBhcmFtIHtzdHJpbmd9IFt0b2Rvcy5kb3RDb2xvcl0g5qCH6K6w54K56aKc6Imy77yMYmFja2dyb3VuZENvbG9yIOaUr+aMgeeahOWAvOmDveihjFxuICogQHBhcmFtIHtvYmplY3RbXX0gW3RvZG9zLmRheXNdIOmcgOimgeagh+iusOeahOaJgOacieaXpeacn++8jOWmgu+8mlt7eWVhcjogMjAxNSwgbW9udGg6IDUsIGRheTogMTJ9Xe+8jOWFtuS4reW5tOaciOaXpeWtl+auteW/heWhq1xuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIOimgeaTjeS9nOeahOaXpeWOhue7hOS7tklEXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRUb2RvTGFiZWxzKHRvZG9zLCBjb21wb25lbnRJZCkge1xuICBiaW5kQ3VycmVudENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gIFRvZG8oQ29tcG9uZW50KS5zZXRUb2RvTGFiZWxzKHRvZG9zKTtcbn1cblxuLyoqXG4gKiDliKDpmaTmjIflrprml6XmnJ/lvoXlip7kuovpoblcbiAqIEBwYXJhbSB7YXJyYXl9IHRvZG9zIOmcgOimgeWIoOmZpOeahOW+heWKnuaXpeacn+aVsOe7hFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIOimgeaTjeS9nOeahOaXpeWOhue7hOS7tklEXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVUb2RvTGFiZWxzKHRvZG9zLCBjb21wb25lbnRJZCkge1xuICBiaW5kQ3VycmVudENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gIFRvZG8oQ29tcG9uZW50KS5kZWxldGVUb2RvTGFiZWxzKHRvZG9zKTtcbn1cblxuLyoqXG4gKiDmuIXnqbrmiYDmnInlvoXlip7kuovpoblcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnRJZCDopoHmk43kvZznmoTml6Xljobnu4Tku7ZJRFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJUb2RvTGFiZWxzKGNvbXBvbmVudElkKSB7XG4gIGJpbmRDdXJyZW50Q29tcG9uZW50KGNvbXBvbmVudElkKTtcbiAgVG9kbyhDb21wb25lbnQpLmNsZWFyVG9kb0xhYmVscygpO1xufVxuXG4vKipcbiAqIOiOt+WPluaJgOacieW+heWKnuS6i+mhuVxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIOimgeaTjeS9nOeahOaXpeWOhue7hOS7tklEXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2RvTGFiZWxzKGNvbXBvbmVudElkKSB7XG4gIGJpbmRDdXJyZW50Q29tcG9uZW50KGNvbXBvbmVudElkKTtcbiAgcmV0dXJuIFRvZG8oQ29tcG9uZW50KS5nZXRUb2RvTGFiZWxzKCk7XG59XG5cbi8qKlxuICog56aB55So5oyH5a6a5pel5pyfXG4gKiBAcGFyYW0ge2FycmF5fSBkYXlzIOaXpeacn1xuICogQHBhcmFtIHtudW1iZXJ9IFtkYXlzLnllYXJdXG4gKiBAcGFyYW0ge251bWJlcn0gW2RheXMubW9udGhdXG4gKiBAcGFyYW0ge251bWJlcn0gW2RheXMuZGF5XVxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIOimgeaTjeS9nOeahOaXpeWOhue7hOS7tklEXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlRGF5KGRheXMgPSBbXSwgY29tcG9uZW50SWQpIHtcbiAgYmluZEN1cnJlbnRDb21wb25lbnQoY29tcG9uZW50SWQpO1xuICBEYXkoQ29tcG9uZW50KS5kaXNhYmxlRGF5cyhkYXlzKTtcbn1cblxuLyoqXG4gKiDmjIflrprlj6/pgInml6XmnJ/ojIPlm7RcbiAqIEBwYXJhbSB7YXJyYXl9IGFyZWEg5pel5pyf6K6/6Zeu5pWw57uEXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50SWQg6KaB5pON5L2c55qE5pel5Y6G57uE5Lu2SURcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUFyZWEoYXJlYSA9IFtdLCBjb21wb25lbnRJZCkge1xuICBiaW5kQ3VycmVudENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gIERheShDb21wb25lbnQpLmVuYWJsZUFyZWEoYXJlYSk7XG59XG5cbi8qKlxuICog5oyH5a6a54m55a6a5pel5pyf5Y+v6YCJXG4gKiBAcGFyYW0ge2FycmF5fSBkYXlzIOaMh+WumuaXpeacn+aVsOe7hFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIOimgeaTjeS9nOeahOaXpeWOhue7hOS7tklEXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVEYXlzKGRheXMgPSBbXSwgY29tcG9uZW50SWQpIHtcbiAgYmluZEN1cnJlbnRDb21wb25lbnQoY29tcG9uZW50SWQpO1xuICBEYXkoQ29tcG9uZW50KS5lbmFibGVEYXlzKGRheXMpO1xufVxuXG4vKipcbiAqIOiuvue9rumAieS4reaXpeacn++8iOWkmumAieaooeW8j+S4i++8iVxuICogQHBhcmFtIHthcnJheX0gc2VsZWN0ZWQg6ZyA6YCJ5Lit5pel5pyfXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50SWQg6KaB5pON5L2c55qE5pel5Y6G57uE5Lu2SURcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFNlbGVjdGVkRGF5cyhzZWxlY3RlZCwgY29tcG9uZW50SWQpIHtcbiAgYmluZEN1cnJlbnRDb21wb25lbnQoY29tcG9uZW50SWQpO1xuICBEYXkoQ29tcG9uZW50KS5zZXRTZWxlY3RlZERheXMoc2VsZWN0ZWQpO1xufVxuXG4vKipcbiAqIOiOt+WPluW9k+WJjeaXpeWOhumFjee9rlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudElkIOimgeaTjeS9nOeahOaXpeWOhue7hOS7tklEXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYWxlbmRhckNvbmZpZyhjb21wb25lbnRJZCkge1xuICBiaW5kQ3VycmVudENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gIENhbGVuZGFyQ29uZmlnKENvbXBvbmVudCkuZ2V0Q2FsZW5kYXJDb25maWcoKTtcbn1cblxuLyoqXG4gKiDorr7nva7ml6XljobphY3nva5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW59IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50SWQg6KaB5pON5L2c55qE5pel5Y6G57uE5Lu2SURcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldENhbGVuZGFyQ29uZmlnKGtleSwgdmFsdWUsIGNvbXBvbmVudElkKSB7XG4gIGJpbmRDdXJyZW50Q29tcG9uZW50KGNvbXBvbmVudElkKTtcbiAgQ2FsZW5kYXJDb25maWcoQ29tcG9uZW50KS5zZXRDYWxlbmRhckNvbmZpZyhrZXksIHZhbHVlKTtcbn1cblxuLyoqXG4gKiDojrflj5blvZPliY3ml6XljobpnaLmnb/ml6XmnJ9cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnRJZCDopoHmk43kvZznmoTml6Xljobnu4Tku7ZJRFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FsZW5kYXJEYXRlcyhjb21wb25lbnRJZCkge1xuICBiaW5kQ3VycmVudENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gIHJldHVybiBnZXREYXRhKCdjYWxlbmRhci5kYXlzJywgY29tcG9uZW50SWQpO1xufVxuXG4vKipcbiAqIOWIh+aNouWRqOaciOinhuWbvlxuICog5YiH5o2i6KeG5Zu+5pe25Y+v5Lyg5YWl5oyH5a6a5pel5pyf77yM5aaCOiB7eWVhcjogMjAxOSwgbW9udGg6IDEsIGRheTogM31cbiAqIGFyZ3NbMF0gdmlldyDop4blm77mqKHlvI9bd2VlaywgbW9udGhdXG4gKiBhcmdzWzFdfGFyZ3NbMl3kuLpkYXkgb2JqZWN05oiW6ICFIGNvbXBvbmVudElkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hWaWV3KC4uLmFyZ3MpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCB2aWV3ID0gYXJnc1swXTtcbiAgICBpZiAoIWFyZ3NbMV0pIHtcbiAgICAgIHJldHVybiBXZWVrKENvbXBvbmVudClcbiAgICAgICAgLnN3aXRjaFdlZWsodmlldylcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJpbmRDdXJyZW50Q29tcG9uZW50KGFyZ3NbMV0sIHRoaXMpO1xuICAgICAgV2VlayhDb21wb25lbnQpXG4gICAgICAgIC5zd2l0Y2hXZWVrKHZpZXcsIGFyZ3NbMl0pXG4gICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMl0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGJpbmRDdXJyZW50Q29tcG9uZW50KGFyZ3NbMV0sIHRoaXMpO1xuICAgICAgfVxuICAgICAgV2VlayhDb21wb25lbnQpXG4gICAgICAgIC5zd2l0Y2hXZWVrKHZpZXcsIGFyZ3NbMV0pXG4gICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICog57uR5a6a5pel5Y6G5LqL5Lu26Iez5b2T5YmN6aG16Z2i5a6e5L6LXG4gKiBAcGFyYW0ge29iamVjdH0gcGFnZSDlvZPliY3pobXpnaLlrp7kvotcbiAqL1xuZnVuY3Rpb24gbW91bnRFdmVudHNPblBhZ2UocGFnZSkge1xuICBwYWdlLmNhbGVuZGFyID0ge1xuICAgIGp1bXAsXG4gICAgc3dpdGNoVmlldyxcbiAgICBkaXNhYmxlRGF5LFxuICAgIGVuYWJsZUFyZWEsXG4gICAgZW5hYmxlRGF5cyxcbiAgICBnZXRDdXJyZW50WU0sXG4gICAgZ2V0U2VsZWN0ZWREYXksXG4gICAgY2FuY2VsQWxsU2VsZWN0ZWREYXksXG4gICAgc2V0VG9kb0xhYmVscyxcbiAgICBnZXRUb2RvTGFiZWxzLFxuICAgIGRlbGV0ZVRvZG9MYWJlbHMsXG4gICAgY2xlYXJUb2RvTGFiZWxzLFxuICAgIHNldFNlbGVjdGVkRGF5cyxcbiAgICBnZXRDYWxlbmRhckNvbmZpZyxcbiAgICBzZXRDYWxlbmRhckNvbmZpZyxcbiAgICBnZXRDYWxlbmRhckRhdGVzXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNldFdlZWtIZWFkZXIoZmlyc3REYXlPZldlZWspIHtcbiAgbGV0IHdlZWtzQ2ggPSBbJ+aXpScsICfkuIAnLCAn5LqMJywgJ+S4iScsICflm5snLCAn5LqUJywgJ+WFrSddO1xuICBpZiAoZmlyc3REYXlPZldlZWsgPT09ICdNb24nKSB7XG4gICAgd2Vla3NDaCA9IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5pelJ107XG4gIH1cbiAgc2V0RGF0YSh7XG4gICAgJ2NhbGVuZGFyLndlZWtzQ2gnOiB3ZWVrc0NoXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhdXRvU2VsZWN0RGF5KGRlZmF1bHREYXkpIHtcbiAgaWYgKGRlZmF1bHREYXkgJiYgdHlwZW9mIGRlZmF1bHREYXkgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZGF5ID0gZGVmYXVsdERheS5zcGxpdCgnLScpO1xuICAgIGlmIChkYXkubGVuZ3RoIDwgMykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCfphY3nva4ganVtcFRvIOagvOW8j+W6lOS4ujogMjAxOC00LTIg5oiWIDIwMTgtMDQtMDInKTtcbiAgICB9XG4gICAganVtcCgrZGF5WzBdLCArZGF5WzFdLCArZGF5WzJdKTtcbiAgfSBlbHNlIGlmIChkZWZhdWx0RGF5ID09PSBmYWxzZSkge1xuICAgIENvbXBvbmVudC5jb25maWcubm9EZWZhdWx0ID0gdHJ1ZTtcbiAgICBqdW1wKCk7XG4gIH0gZWxzZSB7XG4gICAganVtcCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoY29tcG9uZW50LCBjb25maWcpIHtcbiAgaW5pdGlhbFRhc2tzLmZsYWcgPSAncHJvY2Vzcyc7XG4gIENvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgQ29tcG9uZW50LmNvbmZpZyA9IGNvbmZpZztcbiAgc2V0V2Vla0hlYWRlcihjb25maWcuZmlyc3REYXlPZldlZWspO1xuICBhdXRvU2VsZWN0RGF5KGNvbmZpZy5kZWZhdWx0RGF5KTtcbiAgbG9nZ2VyLnRpcHMoXG4gICAgJ+S9v+eUqOS4reiLpemBh+mXrumimOivt+WPjemmiOiHsyBodHRwczovL2dpdGh1Yi5jb20vdHJlYWRwaXQvd3hfY2FsZW5kYXIvaXNzdWVzIOKcje+4jydcbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKGNvbXBvbmVudCwgY29uZmlnID0ge30pID0+IHtcbiAgaWYgKGluaXRpYWxUYXNrcy5mbGFnID09PSAncHJvY2VzcycpIHtcbiAgICByZXR1cm4gaW5pdGlhbFRhc2tzLnRhc2tzLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICBpbml0KGNvbXBvbmVudCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfVxuICBpbml0KGNvbXBvbmVudCwgY29uZmlnKTtcbn07XG4iXX0=