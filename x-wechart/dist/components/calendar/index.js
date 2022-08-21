'use strict';

var _week = require('./func/week.js');

var _week2 = _interopRequireDefault(_week);

var _utils = require('./func/utils.js');

var _main = require('./main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var slide = new _utils.Slide();
var logger = new _utils.Logger();

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    calendarConfig: {
      type: Object,
      value: {}
    }
  },
  data: {
    handleMap: {
      prev_year: 'chooseYear',
      prev_month: 'chooseMonth',
      next_month: 'chooseMonth',
      next_year: 'chooseYear'
    }
  },
  lifetimes: {
    attached: function attached() {
      this.initComp();
    }
  },
  attached: function attached() {
    this.initComp();
  },
  methods: {
    initComp: function initComp() {
      var calendarConfig = this.properties.calendarConfig || {};
      this.setTheme(calendarConfig.theme);
      (0, _main2.default)(this, calendarConfig);
    },
    setTheme: function setTheme(theme) {
      this.setData({
        'calendarConfig.theme': theme || 'default'
      });
    },
    chooseDate: function chooseDate(e) {
      var type = e.currentTarget.dataset.type;

      if (!type) return;
      var methodName = this.data.handleMap[type];
      this[methodName](type);
    },
    chooseYear: function chooseYear(type) {
      var _data$calendar = this.data.calendar,
          curYear = _data$calendar.curYear,
          curMonth = _data$calendar.curMonth;

      if (!curYear || !curMonth) return logger.warn('异常：未获取到当前年月');
      if (this.weekMode) {
        return console.warn('周视图下不支持点击切换年月');
      }
      var newYear = +curYear;
      var newMonth = +curMonth;
      if (type === 'prev_year') {
        newYear -= 1;
      } else if (type === 'next_year') {
        newYear += 1;
      }
      this.render(curYear, curMonth, newYear, newMonth);
    },
    chooseMonth: function chooseMonth(type) {
      var _data$calendar2 = this.data.calendar,
          curYear = _data$calendar2.curYear,
          curMonth = _data$calendar2.curMonth;

      if (!curYear || !curMonth) return logger.warn('异常：未获取到当前年月');
      if (this.weekMode) return console.warn('周视图下不支持点击切换年月');
      var newYear = +curYear;
      var newMonth = +curMonth;
      if (type === 'prev_month') {
        newMonth = newMonth - 1;
        if (newMonth < 1) {
          newYear -= 1;
          newMonth = 12;
        }
      } else if (type === 'next_month') {
        newMonth += 1;
        if (newMonth > 12) {
          newYear += 1;
          newMonth = 1;
        }
      }
      this.render(curYear, curMonth, newYear, newMonth);
    },
    render: function render(curYear, curMonth, newYear, newMonth) {
      _main.whenChangeDate.call(this, {
        curYear: curYear,
        curMonth: curMonth,
        newYear: newYear,
        newMonth: newMonth
      });
      this.setData({
        'calendar.curYear': newYear,
        'calendar.curMonth': newMonth
      });
      _main.renderCalendar.call(this, newYear, newMonth);
    },

    /**
     * 日期点击事件
     * @param {!object} e 事件对象
     */
    tapDayItem: function tapDayItem(e) {
      var _e$currentTarget$data = e.currentTarget.dataset,
          idx = _e$currentTarget$data.idx,
          disable = _e$currentTarget$data.disable;

      if (disable) return;
      var currentSelected = {}; // 当前选中日期

      var _ref = this.data.calendar || [],
          days = _ref.days,
          selectedDays = _ref.selectedDay,
          todoLabels = _ref.todoLabels; // 所有选中日期


      var config = this.config || {};
      var multi = config.multi,
          onTapDay = config.onTapDay;

      var opts = {
        e: e,
        idx: idx,
        onTapDay: onTapDay,
        todoLabels: todoLabels,
        selectedDays: selectedDays,
        currentSelected: currentSelected,
        days: days.slice()
      };
      if (multi) {
        _main.whenMulitSelect.call(this, opts);
      } else {
        _main.whenSingleSelect.call(this, opts);
      }
    },
    doubleClickToToday: function doubleClickToToday() {
      if (this.config.multi || this.weekMode) return;
      if (this.count === undefined) {
        this.count = 1;
      } else {
        this.count += 1;
      }
      if (this.lastClick) {
        var difference = new Date().getTime() - this.lastClick;
        if (difference < 500 && this.count >= 2) {
          _main.jump.call(this);
        }
        this.count = undefined;
        this.lastClick = undefined;
      } else {
        this.lastClick = new Date().getTime();
      }
    },

    /**
     * 日历滑动开始
     * @param {object} e
     */
    calendarTouchstart: function calendarTouchstart(e) {
      var t = e.touches[0];
      var startX = t.clientX;
      var startY = t.clientY;
      this.slideLock = true; // 滑动事件加锁
      this.setData({
        'gesture.startX': startX,
        'gesture.startY': startY
      });
    },

    /**
     * 日历滑动中
     * @param {object} e
     */
    calendarTouchmove: function calendarTouchmove(e) {
      var gesture = this.data.gesture;

      if (!this.slideLock) return;
      if (slide.isLeft(gesture, e.touches[0])) {
        this.setData({
          'calendar.leftSwipe': 1
        });
        if (this.weekMode) {
          this.slideLock = false;
          this.currentDates = (0, _main.getCalendarDates)();
          this.currentYM = (0, _main.getCurrentYM)();
          (0, _week2.default)(this).calculateNextWeekDays();
          this.onSwipeCalendar('next_week');
          this.onWeekChange('next_week');
          return;
        }
        this.chooseMonth('next_month');
        this.onSwipeCalendar('next_month');
        this.slideLock = false;
      }
      if (slide.isRight(gesture, e.touches[0])) {
        this.setData({
          'calendar.rightSwipe': 1
        });
        if (this.weekMode) {
          this.slideLock = false;
          this.currentDates = (0, _main.getCalendarDates)();
          this.currentYM = (0, _main.getCurrentYM)();
          (0, _week2.default)(this).calculatePrevWeekDays();
          this.onSwipeCalendar('prev_week');
          this.onWeekChange('prev_week');
          return;
        }
        this.chooseMonth('prev_month');
        this.onSwipeCalendar('prev_month');
        this.slideLock = false;
      }
    },
    calendarTouchend: function calendarTouchend(e) {
      this.setData({
        'calendar.leftSwipe': 0,
        'calendar.rightSwipe': 0
      });
    },
    onSwipeCalendar: function onSwipeCalendar(direction) {
      this.triggerEvent('onSwipe', {
        directionType: direction
      });
    },
    onWeekChange: function onWeekChange(direction) {
      this.triggerEvent('whenChangeWeek', {
        current: {
          currentYM: this.currentYM,
          dates: [].concat(_toConsumableArray(this.currentDates))
        },
        next: {
          currentYM: (0, _main.getCurrentYM)(),
          dates: (0, _main.getCalendarDates)()
        },
        directionType: direction
      });
      this.currentDates = null;
      this.currentYM = null;
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNsaWRlIiwiU2xpZGUiLCJsb2dnZXIiLCJMb2dnZXIiLCJDb21wb25lbnQiLCJvcHRpb25zIiwibXVsdGlwbGVTbG90cyIsInByb3BlcnRpZXMiLCJjYWxlbmRhckNvbmZpZyIsInR5cGUiLCJPYmplY3QiLCJ2YWx1ZSIsImRhdGEiLCJoYW5kbGVNYXAiLCJwcmV2X3llYXIiLCJwcmV2X21vbnRoIiwibmV4dF9tb250aCIsIm5leHRfeWVhciIsImxpZmV0aW1lcyIsImF0dGFjaGVkIiwiaW5pdENvbXAiLCJtZXRob2RzIiwic2V0VGhlbWUiLCJ0aGVtZSIsInNldERhdGEiLCJjaG9vc2VEYXRlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwibWV0aG9kTmFtZSIsImNob29zZVllYXIiLCJjYWxlbmRhciIsImN1clllYXIiLCJjdXJNb250aCIsIndhcm4iLCJ3ZWVrTW9kZSIsImNvbnNvbGUiLCJuZXdZZWFyIiwibmV3TW9udGgiLCJyZW5kZXIiLCJjaG9vc2VNb250aCIsIndoZW5DaGFuZ2VEYXRlIiwiY2FsbCIsInJlbmRlckNhbGVuZGFyIiwidGFwRGF5SXRlbSIsImlkeCIsImRpc2FibGUiLCJjdXJyZW50U2VsZWN0ZWQiLCJkYXlzIiwic2VsZWN0ZWREYXlzIiwic2VsZWN0ZWREYXkiLCJ0b2RvTGFiZWxzIiwiY29uZmlnIiwibXVsdGkiLCJvblRhcERheSIsIm9wdHMiLCJzbGljZSIsIndoZW5NdWxpdFNlbGVjdCIsIndoZW5TaW5nbGVTZWxlY3QiLCJkb3VibGVDbGlja1RvVG9kYXkiLCJjb3VudCIsInVuZGVmaW5lZCIsImxhc3RDbGljayIsImRpZmZlcmVuY2UiLCJEYXRlIiwiZ2V0VGltZSIsImp1bXAiLCJjYWxlbmRhclRvdWNoc3RhcnQiLCJ0IiwidG91Y2hlcyIsInN0YXJ0WCIsImNsaWVudFgiLCJzdGFydFkiLCJjbGllbnRZIiwic2xpZGVMb2NrIiwiY2FsZW5kYXJUb3VjaG1vdmUiLCJnZXN0dXJlIiwiaXNMZWZ0IiwiY3VycmVudERhdGVzIiwiY3VycmVudFlNIiwiY2FsY3VsYXRlTmV4dFdlZWtEYXlzIiwib25Td2lwZUNhbGVuZGFyIiwib25XZWVrQ2hhbmdlIiwiaXNSaWdodCIsImNhbGN1bGF0ZVByZXZXZWVrRGF5cyIsImNhbGVuZGFyVG91Y2hlbmQiLCJkaXJlY3Rpb24iLCJ0cmlnZ2VyRXZlbnQiLCJkaXJlY3Rpb25UeXBlIiwiY3VycmVudCIsImRhdGVzIiwibmV4dCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7OztBQVVBLElBQU1BLFFBQVEsSUFBSUMsWUFBSixFQUFkO0FBQ0EsSUFBTUMsU0FBUyxJQUFJQyxhQUFKLEVBQWY7O0FBRUFDLFVBQVU7QUFDUkMsV0FBUztBQUNQQyxtQkFBZSxJQURSLENBQ2E7QUFEYixHQUREO0FBSVJDLGNBQVk7QUFDVkMsb0JBQWdCO0FBQ2RDLFlBQU1DLE1BRFE7QUFFZEMsYUFBTztBQUZPO0FBRE4sR0FKSjtBQVVSQyxRQUFNO0FBQ0pDLGVBQVc7QUFDVEMsaUJBQVcsWUFERjtBQUVUQyxrQkFBWSxhQUZIO0FBR1RDLGtCQUFZLGFBSEg7QUFJVEMsaUJBQVc7QUFKRjtBQURQLEdBVkU7QUFrQlJDLGFBQVc7QUFDVEMsY0FBVSxvQkFBVztBQUNuQixXQUFLQyxRQUFMO0FBQ0Q7QUFIUSxHQWxCSDtBQXVCUkQsWUFBVSxvQkFBVztBQUNuQixTQUFLQyxRQUFMO0FBQ0QsR0F6Qk87QUEwQlJDLFdBQVM7QUFDUEQsWUFETyxzQkFDSTtBQUNULFVBQU1aLGlCQUFpQixLQUFLRCxVQUFMLENBQWdCQyxjQUFoQixJQUFrQyxFQUF6RDtBQUNBLFdBQUtjLFFBQUwsQ0FBY2QsZUFBZWUsS0FBN0I7QUFDQSwwQkFBYSxJQUFiLEVBQW1CZixjQUFuQjtBQUNELEtBTE07QUFNUGMsWUFOTyxvQkFNRUMsS0FORixFQU1TO0FBQ2QsV0FBS0MsT0FBTCxDQUFhO0FBQ1gsZ0NBQXdCRCxTQUFTO0FBRHRCLE9BQWI7QUFHRCxLQVZN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WixZQUFoQjtBQUZPLFNBRHlCO0FBS2xDYSxjQUFNO0FBQ0paLHFCQUFXLHlCQURQO0FBRUpXLGlCQUFPO0FBRkgsU0FMNEI7QUFTbENGLHVCQUFlRjtBQVRtQixPQUFwQztBQVdBLFdBQUtSLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0Q7QUFoTU07QUExQkQsQ0FBViIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWVrIGZyb20gJy4vZnVuYy93ZWVrJztcbmltcG9ydCB7IExvZ2dlciwgU2xpZGUgfSBmcm9tICcuL2Z1bmMvdXRpbHMnO1xuaW1wb3J0IGluaXRDYWxlbmRhciwge1xuICBqdW1wLFxuICBnZXRDdXJyZW50WU0sXG4gIHdoZW5DaGFuZ2VEYXRlLFxuICByZW5kZXJDYWxlbmRhcixcbiAgd2hlbk11bGl0U2VsZWN0LFxuICB3aGVuU2luZ2xlU2VsZWN0LFxuICBnZXRDYWxlbmRhckRhdGVzXG59IGZyb20gJy4vbWFpbi5qcyc7XG5cbmNvbnN0IHNsaWRlID0gbmV3IFNsaWRlKCk7XG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbkNvbXBvbmVudCh7XG4gIG9wdGlvbnM6IHtcbiAgICBtdWx0aXBsZVNsb3RzOiB0cnVlIC8vIOWcqOe7hOS7tuWumuS5ieaXtueahOmAiemhueS4reWQr+eUqOWkmnNsb3TmlK/mjIFcbiAgfSxcbiAgcHJvcGVydGllczoge1xuICAgIGNhbGVuZGFyQ29uZmlnOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICB2YWx1ZToge31cbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBoYW5kbGVNYXA6IHtcbiAgICAgIHByZXZfeWVhcjogJ2Nob29zZVllYXInLFxuICAgICAgcHJldl9tb250aDogJ2Nob29zZU1vbnRoJyxcbiAgICAgIG5leHRfbW9udGg6ICdjaG9vc2VNb250aCcsXG4gICAgICBuZXh0X3llYXI6ICdjaG9vc2VZZWFyJ1xuICAgIH1cbiAgfSxcbiAgbGlmZXRpbWVzOiB7XG4gICAgYXR0YWNoZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbml0Q29tcCgpO1xuICAgIH1cbiAgfSxcbiAgYXR0YWNoZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5pdENvbXAoKTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGluaXRDb21wKCkge1xuICAgICAgY29uc3QgY2FsZW5kYXJDb25maWcgPSB0aGlzLnByb3BlcnRpZXMuY2FsZW5kYXJDb25maWcgfHwge307XG4gICAgICB0aGlzLnNldFRoZW1lKGNhbGVuZGFyQ29uZmlnLnRoZW1lKTtcbiAgICAgIGluaXRDYWxlbmRhcih0aGlzLCBjYWxlbmRhckNvbmZpZyk7XG4gICAgfSxcbiAgICBzZXRUaGVtZSh0aGVtZSkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgJ2NhbGVuZGFyQ29uZmlnLnRoZW1lJzogdGhlbWUgfHwgJ2RlZmF1bHQnXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNob29zZURhdGUoZSkge1xuICAgICAgY29uc3QgeyB0eXBlIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgIGlmICghdHlwZSkgcmV0dXJuO1xuICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IHRoaXMuZGF0YS5oYW5kbGVNYXBbdHlwZV07XG4gICAgICB0aGlzW21ldGhvZE5hbWVdKHR5cGUpO1xuICAgIH0sXG4gICAgY2hvb3NlWWVhcih0eXBlKSB7XG4gICAgICBjb25zdCB7IGN1clllYXIsIGN1ck1vbnRoIH0gPSB0aGlzLmRhdGEuY2FsZW5kYXI7XG4gICAgICBpZiAoIWN1clllYXIgfHwgIWN1ck1vbnRoKSByZXR1cm4gbG9nZ2VyLndhcm4oJ+W8guW4uO+8muacquiOt+WPluWIsOW9k+WJjeW5tOaciCcpO1xuICAgICAgaWYgKHRoaXMud2Vla01vZGUpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUud2Fybign5ZGo6KeG5Zu+5LiL5LiN5pSv5oyB54K55Ye75YiH5o2i5bm05pyIJyk7XG4gICAgICB9XG4gICAgICBsZXQgbmV3WWVhciA9ICtjdXJZZWFyO1xuICAgICAgbGV0IG5ld01vbnRoID0gK2N1ck1vbnRoO1xuICAgICAgaWYgKHR5cGUgPT09ICdwcmV2X3llYXInKSB7XG4gICAgICAgIG5ld1llYXIgLT0gMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ25leHRfeWVhcicpIHtcbiAgICAgICAgbmV3WWVhciArPSAxO1xuICAgICAgfVxuICAgICAgdGhpcy5yZW5kZXIoY3VyWWVhciwgY3VyTW9udGgsIG5ld1llYXIsIG5ld01vbnRoKTtcbiAgICB9LFxuICAgIGNob29zZU1vbnRoKHR5cGUpIHtcbiAgICAgIGNvbnN0IHsgY3VyWWVhciwgY3VyTW9udGggfSA9IHRoaXMuZGF0YS5jYWxlbmRhcjtcbiAgICAgIGlmICghY3VyWWVhciB8fCAhY3VyTW9udGgpIHJldHVybiBsb2dnZXIud2Fybign5byC5bi477ya5pyq6I635Y+W5Yiw5b2T5YmN5bm05pyIJyk7XG4gICAgICBpZiAodGhpcy53ZWVrTW9kZSkgcmV0dXJuIGNvbnNvbGUud2Fybign5ZGo6KeG5Zu+5LiL5LiN5pSv5oyB54K55Ye75YiH5o2i5bm05pyIJyk7XG4gICAgICBsZXQgbmV3WWVhciA9ICtjdXJZZWFyO1xuICAgICAgbGV0IG5ld01vbnRoID0gK2N1ck1vbnRoO1xuICAgICAgaWYgKHR5cGUgPT09ICdwcmV2X21vbnRoJykge1xuICAgICAgICBuZXdNb250aCA9IG5ld01vbnRoIC0gMTtcbiAgICAgICAgaWYgKG5ld01vbnRoIDwgMSkge1xuICAgICAgICAgIG5ld1llYXIgLT0gMTtcbiAgICAgICAgICBuZXdNb250aCA9IDEyO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICduZXh0X21vbnRoJykge1xuICAgICAgICBuZXdNb250aCArPSAxO1xuICAgICAgICBpZiAobmV3TW9udGggPiAxMikge1xuICAgICAgICAgIG5ld1llYXIgKz0gMTtcbiAgICAgICAgICBuZXdNb250aCA9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucmVuZGVyKGN1clllYXIsIGN1ck1vbnRoLCBuZXdZZWFyLCBuZXdNb250aCk7XG4gICAgfSxcbiAgICByZW5kZXIoY3VyWWVhciwgY3VyTW9udGgsIG5ld1llYXIsIG5ld01vbnRoKSB7XG4gICAgICB3aGVuQ2hhbmdlRGF0ZS5jYWxsKHRoaXMsIHtcbiAgICAgICAgY3VyWWVhcixcbiAgICAgICAgY3VyTW9udGgsXG4gICAgICAgIG5ld1llYXIsXG4gICAgICAgIG5ld01vbnRoXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICdjYWxlbmRhci5jdXJZZWFyJzogbmV3WWVhcixcbiAgICAgICAgJ2NhbGVuZGFyLmN1ck1vbnRoJzogbmV3TW9udGhcbiAgICAgIH0pO1xuICAgICAgcmVuZGVyQ2FsZW5kYXIuY2FsbCh0aGlzLCBuZXdZZWFyLCBuZXdNb250aCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDml6XmnJ/ngrnlh7vkuovku7ZcbiAgICAgKiBAcGFyYW0geyFvYmplY3R9IGUg5LqL5Lu25a+56LGhXG4gICAgICovXG4gICAgdGFwRGF5SXRlbShlKSB7XG4gICAgICBjb25zdCB7IGlkeCwgZGlzYWJsZSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICBpZiAoZGlzYWJsZSkgcmV0dXJuO1xuICAgICAgbGV0IGN1cnJlbnRTZWxlY3RlZCA9IHt9OyAvLyDlvZPliY3pgInkuK3ml6XmnJ9cbiAgICAgIGxldCB7IGRheXMsIHNlbGVjdGVkRGF5OiBzZWxlY3RlZERheXMsIHRvZG9MYWJlbHMgfSA9XG4gICAgICAgIHRoaXMuZGF0YS5jYWxlbmRhciB8fCBbXTsgLy8g5omA5pyJ6YCJ5Lit5pel5pyfXG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbnN0IHsgbXVsdGksIG9uVGFwRGF5IH0gPSBjb25maWc7XG4gICAgICBjb25zdCBvcHRzID0ge1xuICAgICAgICBlLFxuICAgICAgICBpZHgsXG4gICAgICAgIG9uVGFwRGF5LFxuICAgICAgICB0b2RvTGFiZWxzLFxuICAgICAgICBzZWxlY3RlZERheXMsXG4gICAgICAgIGN1cnJlbnRTZWxlY3RlZCxcbiAgICAgICAgZGF5czogZGF5cy5zbGljZSgpXG4gICAgICB9O1xuICAgICAgaWYgKG11bHRpKSB7XG4gICAgICAgIHdoZW5NdWxpdFNlbGVjdC5jYWxsKHRoaXMsIG9wdHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hlblNpbmdsZVNlbGVjdC5jYWxsKHRoaXMsIG9wdHMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZG91YmxlQ2xpY2tUb1RvZGF5KCkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLm11bHRpIHx8IHRoaXMud2Vla01vZGUpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLmNvdW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb3VudCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5sYXN0Q2xpY2spIHtcbiAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5sYXN0Q2xpY2s7XG4gICAgICAgIGlmIChkaWZmZXJlbmNlIDwgNTAwICYmIHRoaXMuY291bnQgPj0gMikge1xuICAgICAgICAgIGp1bXAuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvdW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmxhc3RDbGljayA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGFzdENsaWNrID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDml6Xljobmu5HliqjlvIDlp4tcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZVxuICAgICAqL1xuICAgIGNhbGVuZGFyVG91Y2hzdGFydChlKSB7XG4gICAgICBjb25zdCB0ID0gZS50b3VjaGVzWzBdO1xuICAgICAgY29uc3Qgc3RhcnRYID0gdC5jbGllbnRYO1xuICAgICAgY29uc3Qgc3RhcnRZID0gdC5jbGllbnRZO1xuICAgICAgdGhpcy5zbGlkZUxvY2sgPSB0cnVlOyAvLyDmu5Hliqjkuovku7bliqDplIFcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICdnZXN0dXJlLnN0YXJ0WCc6IHN0YXJ0WCxcbiAgICAgICAgJ2dlc3R1cmUuc3RhcnRZJzogc3RhcnRZXG4gICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOaXpeWOhua7keWKqOS4rVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlXG4gICAgICovXG4gICAgY2FsZW5kYXJUb3VjaG1vdmUoZSkge1xuICAgICAgY29uc3QgeyBnZXN0dXJlIH0gPSB0aGlzLmRhdGE7XG4gICAgICBpZiAoIXRoaXMuc2xpZGVMb2NrKSByZXR1cm47XG4gICAgICBpZiAoc2xpZGUuaXNMZWZ0KGdlc3R1cmUsIGUudG91Y2hlc1swXSkpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAnY2FsZW5kYXIubGVmdFN3aXBlJzogMVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMud2Vla01vZGUpIHtcbiAgICAgICAgICB0aGlzLnNsaWRlTG9jayA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuY3VycmVudERhdGVzID0gZ2V0Q2FsZW5kYXJEYXRlcygpO1xuICAgICAgICAgIHRoaXMuY3VycmVudFlNID0gZ2V0Q3VycmVudFlNKCk7XG4gICAgICAgICAgV2Vlayh0aGlzKS5jYWxjdWxhdGVOZXh0V2Vla0RheXMoKTtcbiAgICAgICAgICB0aGlzLm9uU3dpcGVDYWxlbmRhcignbmV4dF93ZWVrJyk7XG4gICAgICAgICAgdGhpcy5vbldlZWtDaGFuZ2UoJ25leHRfd2VlaycpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNob29zZU1vbnRoKCduZXh0X21vbnRoJyk7XG4gICAgICAgIHRoaXMub25Td2lwZUNhbGVuZGFyKCduZXh0X21vbnRoJyk7XG4gICAgICAgIHRoaXMuc2xpZGVMb2NrID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoc2xpZGUuaXNSaWdodChnZXN0dXJlLCBlLnRvdWNoZXNbMF0pKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgJ2NhbGVuZGFyLnJpZ2h0U3dpcGUnOiAxXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy53ZWVrTW9kZSkge1xuICAgICAgICAgIHRoaXMuc2xpZGVMb2NrID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZXMgPSBnZXRDYWxlbmRhckRhdGVzKCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50WU0gPSBnZXRDdXJyZW50WU0oKTtcbiAgICAgICAgICBXZWVrKHRoaXMpLmNhbGN1bGF0ZVByZXZXZWVrRGF5cygpO1xuICAgICAgICAgIHRoaXMub25Td2lwZUNhbGVuZGFyKCdwcmV2X3dlZWsnKTtcbiAgICAgICAgICB0aGlzLm9uV2Vla0NoYW5nZSgncHJldl93ZWVrJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hvb3NlTW9udGgoJ3ByZXZfbW9udGgnKTtcbiAgICAgICAgdGhpcy5vblN3aXBlQ2FsZW5kYXIoJ3ByZXZfbW9udGgnKTtcbiAgICAgICAgdGhpcy5zbGlkZUxvY2sgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbGVuZGFyVG91Y2hlbmQoZSkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgJ2NhbGVuZGFyLmxlZnRTd2lwZSc6IDAsXG4gICAgICAgICdjYWxlbmRhci5yaWdodFN3aXBlJzogMFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvblN3aXBlQ2FsZW5kYXIoZGlyZWN0aW9uKSB7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnb25Td2lwZScsIHtcbiAgICAgICAgZGlyZWN0aW9uVHlwZTogZGlyZWN0aW9uXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uV2Vla0NoYW5nZShkaXJlY3Rpb24pIHtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCd3aGVuQ2hhbmdlV2VlaycsIHtcbiAgICAgICAgY3VycmVudDoge1xuICAgICAgICAgIGN1cnJlbnRZTTogdGhpcy5jdXJyZW50WU0sXG4gICAgICAgICAgZGF0ZXM6IFsuLi50aGlzLmN1cnJlbnREYXRlc11cbiAgICAgICAgfSxcbiAgICAgICAgbmV4dDoge1xuICAgICAgICAgIGN1cnJlbnRZTTogZ2V0Q3VycmVudFlNKCksXG4gICAgICAgICAgZGF0ZXM6IGdldENhbGVuZGFyRGF0ZXMoKVxuICAgICAgICB9LFxuICAgICAgICBkaXJlY3Rpb25UeXBlOiBkaXJlY3Rpb25cbiAgICAgIH0pO1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZXMgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW50WU0gPSBudWxsO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=