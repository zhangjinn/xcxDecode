'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WxData = function () {
  function WxData(component) {
    _classCallCheck(this, WxData);

    this.Component = component;
  }

  _createClass(WxData, [{
    key: 'getData',
    value: function getData(key) {
      var data = this.Component.data;
      if (!key) return data;
      if (key.includes('.')) {
        var keys = key.split('.');
        var tmp = keys.reduce(function (prev, next) {
          return prev[next];
        }, data);
        return tmp;
      } else {
        return this.Component.data[key];
      }
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (!data) return;
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        this.Component.setData(data, cb);
      }
    }
  }]);

  return WxData;
}();

exports.default = WxData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4RGF0YS5qcyJdLCJuYW1lcyI6WyJXeERhdGEiLCJjb21wb25lbnQiLCJDb21wb25lbnQiLCJrZXkiLCJkYXRhIiwiaW5jbHVkZXMiLCJrZXlzIiwic3BsaXQiLCJ0bXAiLCJyZWR1Y2UiLCJwcmV2IiwibmV4dCIsImNiIiwic2V0RGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQU1BLE07QUFDSixrQkFBWUMsU0FBWixFQUF1QjtBQUFBOztBQUNyQixTQUFLQyxTQUFMLEdBQWlCRCxTQUFqQjtBQUNEOzs7OzRCQUNPRSxHLEVBQUs7QUFDWCxVQUFNQyxPQUFPLEtBQUtGLFNBQUwsQ0FBZUUsSUFBNUI7QUFDQSxVQUFJLENBQUNELEdBQUwsRUFBVSxPQUFPQyxJQUFQO0FBQ1YsVUFBSUQsSUFBSUUsUUFBSixDQUFhLEdBQWIsQ0FBSixFQUF1QjtBQUNyQixZQUFJQyxPQUFPSCxJQUFJSSxLQUFKLENBQVUsR0FBVixDQUFYO0FBQ0EsWUFBTUMsTUFBTUYsS0FBS0csTUFBTCxDQUFZLFVBQUNDLElBQUQsRUFBT0MsSUFBUCxFQUFnQjtBQUN0QyxpQkFBT0QsS0FBS0MsSUFBTCxDQUFQO0FBQ0QsU0FGVyxFQUVUUCxJQUZTLENBQVo7QUFHQSxlQUFPSSxHQUFQO0FBQ0QsT0FORCxNQU1PO0FBQ0wsZUFBTyxLQUFLTixTQUFMLENBQWVFLElBQWYsQ0FBb0JELEdBQXBCLENBQVA7QUFDRDtBQUNGOzs7NEJBQ09DLEksRUFBcUI7QUFBQSxVQUFmUSxFQUFlLHVFQUFWLFlBQU0sQ0FBRSxDQUFFOztBQUMzQixVQUFJLENBQUNSLElBQUwsRUFBVztBQUNYLFVBQUksUUFBT0EsSUFBUCx5Q0FBT0EsSUFBUCxPQUFnQixRQUFwQixFQUE4QjtBQUM1QixhQUFLRixTQUFMLENBQWVXLE9BQWYsQ0FBdUJULElBQXZCLEVBQTZCUSxFQUE3QjtBQUNEO0FBQ0Y7Ozs7OztrQkFHWVosTSIsImZpbGUiOiJ3eERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBXeERhdGEge1xuICBjb25zdHJ1Y3Rvcihjb21wb25lbnQpIHtcbiAgICB0aGlzLkNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgfVxuICBnZXREYXRhKGtleSkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLkNvbXBvbmVudC5kYXRhO1xuICAgIGlmICgha2V5KSByZXR1cm4gZGF0YTtcbiAgICBpZiAoa2V5LmluY2x1ZGVzKCcuJykpIHtcbiAgICAgIGxldCBrZXlzID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICBjb25zdCB0bXAgPSBrZXlzLnJlZHVjZSgocHJldiwgbmV4dCkgPT4ge1xuICAgICAgICByZXR1cm4gcHJldltuZXh0XTtcbiAgICAgIH0sIGRhdGEpO1xuICAgICAgcmV0dXJuIHRtcDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuQ29tcG9uZW50LmRhdGFba2V5XTtcbiAgICB9XG4gIH1cbiAgc2V0RGF0YShkYXRhLCBjYiA9ICgpID0+IHt9KSB7XG4gICAgaWYgKCFkYXRhKSByZXR1cm47XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5Db21wb25lbnQuc2V0RGF0YShkYXRhLCBjYik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFd4RGF0YTtcbiJdfQ==