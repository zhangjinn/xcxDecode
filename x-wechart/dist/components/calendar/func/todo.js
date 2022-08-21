'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wxData = require('./wxData.js');

var _wxData2 = _interopRequireDefault(_wxData);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = new _utils.Logger();

var Todo = function (_WxData) {
  _inherits(Todo, _WxData);

  function Todo(component) {
    _classCallCheck(this, Todo);

    var _this = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this, component));

    _this.Component = component;
    return _this;
  }
  /**
   * 单选时显示待办事项
   * @param {array} todoDays
   * @param {array} days
   * @param {array} selectedDays
   */


  _createClass(Todo, [{
    key: 'showTodoLabels',
    value: function showTodoLabels(todoDays, days, selectedDays) {
      var _this2 = this;

      todoDays.forEach(function (item) {
        if (_this2.Component.weekMode) {
          days.forEach(function (_item, idx) {
            if (+_item.day === +item.day) {
              var day = days[idx];
              day.hasTodo = true;
              day.todoText = item.todoText;
              if (selectedDays && selectedDays.length && +selectedDays[0].day === +item.day) {
                day.showTodoLabel = true;
              }
            }
          });
        } else {
          var day = days[item.day - 1];
          if (!day) return;
          day.hasTodo = true;
          day.todoText = item.todoText;
          if (selectedDays && selectedDays.length && +selectedDays[0].day === +item.day) {
            days[selectedDays[0].day - 1].showTodoLabel = true;
          }
        }
      });
    }
    /**
     * 设置待办事项标志
     * @param {object} options 待办事项配置
     */

  }, {
    key: 'setTodoLabels',
    value: function setTodoLabels(options) {
      var _this3 = this;

      if (options) this.Component.todoConfig = options;
      var calendar = this.getData('calendar');
      if (!calendar || !calendar.days) {
        return logger.warn('请等待日历初始化完成后再调用该方法');
      }
      var days = calendar.days.slice();
      var curYear = calendar.curYear,
          curMonth = calendar.curMonth;

      var _ref = options || this.Component.todoConfig || {},
          circle = _ref.circle,
          _ref$dotColor = _ref.dotColor,
          dotColor = _ref$dotColor === undefined ? '' : _ref$dotColor,
          _ref$pos = _ref.pos,
          pos = _ref$pos === undefined ? 'bottom' : _ref$pos,
          showLabelAlways = _ref.showLabelAlways,
          _ref$days = _ref.days,
          todoDays = _ref$days === undefined ? [] : _ref$days;

      var _calendar$todoLabels = calendar.todoLabels,
          todoLabels = _calendar$todoLabels === undefined ? [] : _calendar$todoLabels,
          todoLabelPos = calendar.todoLabelPos,
          todoLabelColor = calendar.todoLabelColor;

      var shouldMarkerTodoDay = todoDays.filter(function (item) {
        return +item.year === +curYear && +item.month === +curMonth;
      });
      var currentMonthTodoLabels = todoLabels.filter(function (item) {
        return +item.year === +curYear && +item.month === +curMonth;
      });
      shouldMarkerTodoDay.concat(currentMonthTodoLabels).forEach(function (item) {
        var target = {};
        if (_this3.Component.weekMode) {
          target = days.find(function (d) {
            return +d.day === +item.day;
          });
        } else {
          target = days[item.day - 1];
        }
        if (target) {
          if (showLabelAlways) {
            target.showTodoLabel = true;
          } else {
            target.showTodoLabel = !target.choosed;
          }
          if (target.showTodoLabel && item.todoText) {
            target.todoText = item.todoText;
          }
        }
      });
      var o = {
        'calendar.days': days,
        'calendar.todoLabels': (0, _utils.uniqueArrayByDate)(todoDays.concat(todoLabels))
      };
      if (!circle) {
        if (pos && pos !== todoLabelPos) o['calendar.todoLabelPos'] = pos;
        if (dotColor && dotColor !== todoLabelColor) {
          o['calendar.todoLabelColor'] = dotColor;
        }
      }
      o['calendar.todoLabelCircle'] = circle || false;
      o['calendar.showLabelAlways'] = showLabelAlways || false;
      this.setData(o);
    }
    /**
     * 过滤将删除的待办事项
     * @param {array} todos 需要删除待办事项
     */

  }, {
    key: 'filterTodos',
    value: function filterTodos(todos) {
      var todoLabels = this.getData('calendar.todoLabels') || [];
      var deleteTodo = todos.map(function (item) {
        return item.year + '-' + item.month + '-' + item.day;
      });
      return todoLabels.filter(function (item) {
        return !deleteTodo.includes(item.year + '-' + item.month + '-' + item.day);
      });
    }
    /**
     *  删除指定日期的待办事项
     * @param {array} todos 需要删除待办事项的日期
     */

  }, {
    key: 'deleteTodoLabels',
    value: function deleteTodoLabels(todos) {
      if (!(todos instanceof Array) || !todos.length) return;
      var todoLabels = this.filterTodos(todos);

      var _getData = this.getData('calendar'),
          days = _getData.days,
          curYear = _getData.curYear,
          curMonth = _getData.curMonth;

      var currentMonthTodoLabels = todoLabels.filter(function (item) {
        return curYear === +item.year && curMonth === +item.month;
      });
      days.forEach(function (item) {
        item.showTodoLabel = false;
      });
      currentMonthTodoLabels.forEach(function (item) {
        days[item.day - 1].showTodoLabel = !days[item.day - 1].choosed;
      });
      this.setData({
        'calendar.days': days,
        'calendar.todoLabels': todoLabels
      });
    }
    /**
     * 清空所有待办事项
     */

  }, {
    key: 'clearTodoLabels',
    value: function clearTodoLabels() {
      var _getData2 = this.getData('calendar'),
          _getData2$days = _getData2.days,
          days = _getData2$days === undefined ? [] : _getData2$days;

      var _days = [].concat(days);
      _days.forEach(function (item) {
        item.showTodoLabel = false;
      });
      this.setData({
        'calendar.days': _days,
        'calendar.todoLabels': []
      });
    }
    /**
     * 获取所有待办事项
     */

  }, {
    key: 'getTodoLabels',
    value: function getTodoLabels() {
      var todoLabels = this.getData('calendar.todoLabels') || [];
      return todoLabels;
    }
  }]);

  return Todo;
}(_wxData2.default);

exports.default = function (component) {
  return new Todo(component);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8uanMiXSwibmFtZXMiOlsibG9nZ2VyIiwiTG9nZ2VyIiwiVG9kbyIsImNvbXBvbmVudCIsIkNvbXBvbmVudCIsInRvZG9EYXlzIiwiZGF5cyIsInNlbGVjdGVkRGF5cyIsImZvckVhY2giLCJ3ZWVrTW9kZSIsIl9pdGVtIiwiaWR4IiwiZGF5IiwiaXRlbSIsImhhc1RvZG8iLCJ0b2RvVGV4dCIsImxlbmd0aCIsInNob3dUb2RvTGFiZWwiLCJvcHRpb25zIiwidG9kb0NvbmZpZyIsImNhbGVuZGFyIiwiZ2V0RGF0YSIsIndhcm4iLCJzbGljZSIsImN1clllYXIiLCJjdXJNb250aCIsImNpcmNsZSIsImRvdENvbG9yIiwicG9zIiwic2hvd0xhYmVsQWx3YXlzIiwidG9kb0xhYmVscyIsInRvZG9MYWJlbFBvcyIsInRvZG9MYWJlbENvbG9yIiwic2hvdWxkTWFya2VyVG9kb0RheSIsImZpbHRlciIsInllYXIiLCJtb250aCIsImN1cnJlbnRNb250aFRvZG9MYWJlbHMiLCJjb25jYXQiLCJ0YXJnZXQiLCJmaW5kIiwiZCIsImNob29zZWQiLCJvIiwic2V0RGF0YSIsInRvZG9zIiwiZGVsZXRlVG9kbyIsIm1hcCIsImluY2x1ZGVzIiwiQXJyYXkiLCJmaWx0ZXJUb2RvcyIsIl9kYXlzIiwiV3hEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLElBQUlDLGFBQUosRUFBZjs7SUFFTUMsSTs7O0FBQ0osZ0JBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFBQSw0R0FDZkEsU0FEZTs7QUFFckIsVUFBS0MsU0FBTCxHQUFpQkQsU0FBakI7QUFGcUI7QUFHdEI7QUFDRDs7Ozs7Ozs7OzttQ0FNZUUsUSxFQUFVQyxJLEVBQU1DLFksRUFBYztBQUFBOztBQUMzQ0YsZUFBU0csT0FBVCxDQUFpQixnQkFBUTtBQUN2QixZQUFJLE9BQUtKLFNBQUwsQ0FBZUssUUFBbkIsRUFBNkI7QUFDM0JILGVBQUtFLE9B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QUVYLCtCQUF1QndCO0FBRlosT0FBYjtBQUlEO0FBQ0Q7Ozs7OztzQ0FHa0I7QUFBQSxzQkFDTSxLQUFLVCxPQUFMLENBQWEsVUFBYixDQUROO0FBQUEscUNBQ1JmLElBRFE7QUFBQSxVQUNSQSxJQURRLGtDQUNELEVBREM7O0FBRWhCLFVBQU02QyxRQUFRLEdBQUdiLE1BQUgsQ0FBVWhDLElBQVYsQ0FBZDtBQUNBNkMsWUFBTTNDLE9BQU4sQ0FBYyxnQkFBUTtBQUNwQkssYUFBS0ksYUFBTCxHQUFxQixLQUFyQjtBQUNELE9BRkQ7QUFHQSxXQUFLMkIsT0FBTCxDQUFhO0FBQ1gseUJBQWlCTyxLQUROO0FBRVgsK0JBQXVCO0FBRlosT0FBYjtBQUlEO0FBQ0Q7Ozs7OztvQ0FHZ0I7QUFDZCxVQUFNckIsYUFBYSxLQUFLVCxPQUFMLENBQWEscUJBQWIsS0FBdUMsRUFBMUQ7QUFDQSxhQUFPUyxVQUFQO0FBQ0Q7Ozs7RUE1SmdCc0IsZ0I7O2tCQStKSjtBQUFBLFNBQWEsSUFBSWxELElBQUosQ0FBU0MsU0FBVCxDQUFiO0FBQUEsQyIsImZpbGUiOiJ0b2RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFd4RGF0YSBmcm9tICcuL3d4RGF0YSc7XG5pbXBvcnQgeyBMb2dnZXIsIHVuaXF1ZUFycmF5QnlEYXRlIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcblxuY2xhc3MgVG9kbyBleHRlbmRzIFd4RGF0YSB7XG4gIGNvbnN0cnVjdG9yKGNvbXBvbmVudCkge1xuICAgIHN1cGVyKGNvbXBvbmVudCk7XG4gICAgdGhpcy5Db21wb25lbnQgPSBjb21wb25lbnQ7XG4gIH1cbiAgLyoqXG4gICAqIOWNlemAieaXtuaYvuekuuW+heWKnuS6i+mhuVxuICAgKiBAcGFyYW0ge2FycmF5fSB0b2RvRGF5c1xuICAgKiBAcGFyYW0ge2FycmF5fSBkYXlzXG4gICAqIEBwYXJhbSB7YXJyYXl9IHNlbGVjdGVkRGF5c1xuICAgKi9cbiAgc2hvd1RvZG9MYWJlbHModG9kb0RheXMsIGRheXMsIHNlbGVjdGVkRGF5cykge1xuICAgIHRvZG9EYXlzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAodGhpcy5Db21wb25lbnQud2Vla01vZGUpIHtcbiAgICAgICAgZGF5cy5mb3JFYWNoKChfaXRlbSwgaWR4KSA9PiB7XG4gICAgICAgICAgaWYgKCtfaXRlbS5kYXkgPT09ICtpdGVtLmRheSkge1xuICAgICAgICAgICAgY29uc3QgZGF5ID0gZGF5c1tpZHhdO1xuICAgICAgICAgICAgZGF5Lmhhc1RvZG8gPSB0cnVlO1xuICAgICAgICAgICAgZGF5LnRvZG9UZXh0ID0gaXRlbS50b2RvVGV4dDtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgc2VsZWN0ZWREYXlzICYmXG4gICAgICAgICAgICAgIHNlbGVjdGVkRGF5cy5sZW5ndGggJiZcbiAgICAgICAgICAgICAgK3NlbGVjdGVkRGF5c1swXS5kYXkgPT09ICtpdGVtLmRheVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGRheS5zaG93VG9kb0xhYmVsID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGF5ID0gZGF5c1tpdGVtLmRheSAtIDFdO1xuICAgICAgICBpZiAoIWRheSkgcmV0dXJuO1xuICAgICAgICBkYXkuaGFzVG9kbyA9IHRydWU7XG4gICAgICAgIGRheS50b2RvVGV4dCA9IGl0ZW0udG9kb1RleHQ7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxlY3RlZERheXMgJiZcbiAgICAgICAgICBzZWxlY3RlZERheXMubGVuZ3RoICYmXG4gICAgICAgICAgK3NlbGVjdGVkRGF5c1swXS5kYXkgPT09ICtpdGVtLmRheVxuICAgICAgICApIHtcbiAgICAgICAgICBkYXlzW3NlbGVjdGVkRGF5c1swXS5kYXkgLSAxXS5zaG93VG9kb0xhYmVsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDorr7nva7lvoXlip7kuovpobnmoIflv5dcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMg5b6F5Yqe5LqL6aG56YWN572uXG4gICAqL1xuICBzZXRUb2RvTGFiZWxzKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucykgdGhpcy5Db21wb25lbnQudG9kb0NvbmZpZyA9IG9wdGlvbnM7XG4gICAgY29uc3QgY2FsZW5kYXIgPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgaWYgKCFjYWxlbmRhciB8fCAhY2FsZW5kYXIuZGF5cykge1xuICAgICAgcmV0dXJuIGxvZ2dlci53YXJuKCfor7fnrYnlvoXml6XljobliJ3lp4vljJblrozmiJDlkI7lho3osIPnlKjor6Xmlrnms5UnKTtcbiAgICB9XG4gICAgY29uc3QgZGF5cyA9IGNhbGVuZGFyLmRheXMuc2xpY2UoKTtcbiAgICBjb25zdCB7IGN1clllYXIsIGN1ck1vbnRoIH0gPSBjYWxlbmRhcjtcbiAgICBjb25zdCB7XG4gICAgICBjaXJjbGUsXG4gICAgICBkb3RDb2xvciA9ICcnLFxuICAgICAgcG9zID0gJ2JvdHRvbScsXG4gICAgICBzaG93TGFiZWxBbHdheXMsXG4gICAgICBkYXlzOiB0b2RvRGF5cyA9IFtdXG4gICAgfSA9IG9wdGlvbnMgfHwgdGhpcy5Db21wb25lbnQudG9kb0NvbmZpZyB8fCB7fTtcbiAgICBjb25zdCB7IHRvZG9MYWJlbHMgPSBbXSwgdG9kb0xhYmVsUG9zLCB0b2RvTGFiZWxDb2xvciB9ID0gY2FsZW5kYXI7XG4gICAgY29uc3Qgc2hvdWxkTWFya2VyVG9kb0RheSA9IHRvZG9EYXlzLmZpbHRlcihcbiAgICAgIGl0ZW0gPT4gK2l0ZW0ueWVhciA9PT0gK2N1clllYXIgJiYgK2l0ZW0ubW9udGggPT09ICtjdXJNb250aFxuICAgICk7XG4gICAgbGV0IGN1cnJlbnRNb250aFRvZG9MYWJlbHMgPSB0b2RvTGFiZWxzLmZpbHRlcihcbiAgICAgIGl0ZW0gPT4gK2l0ZW0ueWVhciA9PT0gK2N1clllYXIgJiYgK2l0ZW0ubW9udGggPT09ICtjdXJNb250aFxuICAgICk7XG4gICAgc2hvdWxkTWFya2VyVG9kb0RheS5jb25jYXQoY3VycmVudE1vbnRoVG9kb0xhYmVscykuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGxldCB0YXJnZXQgPSB7fTtcbiAgICAgIGlmICh0aGlzLkNvbXBvbmVudC53ZWVrTW9kZSkge1xuICAgICAgICB0YXJnZXQgPSBkYXlzLmZpbmQoZCA9PiArZC5kYXkgPT09ICtpdGVtLmRheSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSBkYXlzW2l0ZW0uZGF5IC0gMV07XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChzaG93TGFiZWxBbHdheXMpIHtcbiAgICAgICAgICB0YXJnZXQuc2hvd1RvZG9MYWJlbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0LnNob3dUb2RvTGFiZWwgPSAhdGFyZ2V0LmNob29zZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldC5zaG93VG9kb0xhYmVsICYmIGl0ZW0udG9kb1RleHQpIHtcbiAgICAgICAgICB0YXJnZXQudG9kb1RleHQgPSBpdGVtLnRvZG9UZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgbyA9IHtcbiAgICAgICdjYWxlbmRhci5kYXlzJzogZGF5cyxcbiAgICAgICdjYWxlbmRhci50b2RvTGFiZWxzJzogdW5pcXVlQXJyYXlCeURhdGUodG9kb0RheXMuY29uY2F0KHRvZG9MYWJlbHMpKVxuICAgIH07XG4gICAgaWYgKCFjaXJjbGUpIHtcbiAgICAgIGlmIChwb3MgJiYgcG9zICE9PSB0b2RvTGFiZWxQb3MpIG9bJ2NhbGVuZGFyLnRvZG9MYWJlbFBvcyddID0gcG9zO1xuICAgICAgaWYgKGRvdENvbG9yICYmIGRvdENvbG9yICE9PSB0b2RvTGFiZWxDb2xvcikge1xuICAgICAgICBvWydjYWxlbmRhci50b2RvTGFiZWxDb2xvciddID0gZG90Q29sb3I7XG4gICAgICB9XG4gICAgfVxuICAgIG9bJ2NhbGVuZGFyLnRvZG9MYWJlbENpcmNsZSddID0gY2lyY2xlIHx8IGZhbHNlO1xuICAgIG9bJ2NhbGVuZGFyLnNob3dMYWJlbEFsd2F5cyddID0gc2hvd0xhYmVsQWx3YXlzIHx8IGZhbHNlO1xuICAgIHRoaXMuc2V0RGF0YShvKTtcbiAgfVxuICAvKipcbiAgICog6L+H5ruk5bCG5Yig6Zmk55qE5b6F5Yqe5LqL6aG5XG4gICAqIEBwYXJhbSB7YXJyYXl9IHRvZG9zIOmcgOimgeWIoOmZpOW+heWKnuS6i+mhuVxuICAgKi9cbiAgZmlsdGVyVG9kb3ModG9kb3MpIHtcbiAgICBjb25zdCB0b2RvTGFiZWxzID0gdGhpcy5nZXREYXRhKCdjYWxlbmRhci50b2RvTGFiZWxzJykgfHwgW107XG4gICAgY29uc3QgZGVsZXRlVG9kbyA9IHRvZG9zLm1hcChcbiAgICAgIGl0ZW0gPT4gYCR7aXRlbS55ZWFyfS0ke2l0ZW0ubW9udGh9LSR7aXRlbS5kYXl9YFxuICAgICk7XG4gICAgcmV0dXJuIHRvZG9MYWJlbHMuZmlsdGVyKFxuICAgICAgaXRlbSA9PiAhZGVsZXRlVG9kby5pbmNsdWRlcyhgJHtpdGVtLnllYXJ9LSR7aXRlbS5tb250aH0tJHtpdGVtLmRheX1gKVxuICAgICk7XG4gIH1cbiAgLyoqXG4gICAqICDliKDpmaTmjIflrprml6XmnJ/nmoTlvoXlip7kuovpoblcbiAgICogQHBhcmFtIHthcnJheX0gdG9kb3Mg6ZyA6KaB5Yig6Zmk5b6F5Yqe5LqL6aG555qE5pel5pyfXG4gICAqL1xuICBkZWxldGVUb2RvTGFiZWxzKHRvZG9zKSB7XG4gICAgaWYgKCEodG9kb3MgaW5zdGFuY2VvZiBBcnJheSkgfHwgIXRvZG9zLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IHRvZG9MYWJlbHMgPSB0aGlzLmZpbHRlclRvZG9zKHRvZG9zKTtcbiAgICBjb25zdCB7IGRheXMsIGN1clllYXIsIGN1ck1vbnRoIH0gPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyJyk7XG4gICAgY29uc3QgY3VycmVudE1vbnRoVG9kb0xhYmVscyA9IHRvZG9MYWJlbHMuZmlsdGVyKFxuICAgICAgaXRlbSA9PiBjdXJZZWFyID09PSAraXRlbS55ZWFyICYmIGN1ck1vbnRoID09PSAraXRlbS5tb250aFxuICAgICk7XG4gICAgZGF5cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5zaG93VG9kb0xhYmVsID0gZmFsc2U7XG4gICAgfSk7XG4gICAgY3VycmVudE1vbnRoVG9kb0xhYmVscy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgZGF5c1tpdGVtLmRheSAtIDFdLnNob3dUb2RvTGFiZWwgPSAhZGF5c1tpdGVtLmRheSAtIDFdLmNob29zZWQ7XG4gICAgfSk7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICdjYWxlbmRhci5kYXlzJzogZGF5cyxcbiAgICAgICdjYWxlbmRhci50b2RvTGFiZWxzJzogdG9kb0xhYmVsc1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmuIXnqbrmiYDmnInlvoXlip7kuovpoblcbiAgICovXG4gIGNsZWFyVG9kb0xhYmVscygpIHtcbiAgICBjb25zdCB7IGRheXMgPSBbXSB9ID0gdGhpcy5nZXREYXRhKCdjYWxlbmRhcicpO1xuICAgIGNvbnN0IF9kYXlzID0gW10uY29uY2F0KGRheXMpO1xuICAgIF9kYXlzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLnNob3dUb2RvTGFiZWwgPSBmYWxzZTtcbiAgICB9KTtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgJ2NhbGVuZGFyLmRheXMnOiBfZGF5cyxcbiAgICAgICdjYWxlbmRhci50b2RvTGFiZWxzJzogW11cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICog6I635Y+W5omA5pyJ5b6F5Yqe5LqL6aG5XG4gICAqL1xuICBnZXRUb2RvTGFiZWxzKCkge1xuICAgIGNvbnN0IHRvZG9MYWJlbHMgPSB0aGlzLmdldERhdGEoJ2NhbGVuZGFyLnRvZG9MYWJlbHMnKSB8fCBbXTtcbiAgICByZXR1cm4gdG9kb0xhYmVscztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQgPT4gbmV3IFRvZG8oY29tcG9uZW50KTtcbiJdfQ==