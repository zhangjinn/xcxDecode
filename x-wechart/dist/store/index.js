'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configStore = undefined;

var _redux = require('./../npm/redux/lib/index.js');

var _reduxPromise = require('./../npm/redux-promise/lib/index.js');

var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

var _index = require('./reducers/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * request 返回promise, 不管是resolve还是reject，到redux-promise-middleware后均会dispatch进reducer，
 * 而在reduce中，我们希望只接收正常处理返回后的数据，所以如果发生错误，要在此中间件中阻断promise进入reducer
 *
 */
function checkError(store) {
  return function wrapDispatchCheckError(next) {
    return function dispatchCheckError(action) {
      if (!action.error) {
        // next(action)后, result === action
        var result = next(action);
        return result;
      } else {
        return action;
      }
    };
  };
}

var configStore = exports.configStore = function configStore() {
  var store = (0, _redux.createStore)(_index2.default, (0, _redux.applyMiddleware)(_reduxPromise2.default, checkError));
  return store;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNoZWNrRXJyb3IiLCJzdG9yZSIsIndyYXBEaXNwYXRjaENoZWNrRXJyb3IiLCJuZXh0IiwiZGlzcGF0Y2hDaGVja0Vycm9yIiwiYWN0aW9uIiwiZXJyb3IiLCJyZXN1bHQiLCJjb25maWdTdG9yZSIsInJvb3RSZWR1Y2VyIiwicHJvbWlzZU1pZGRsZXdhcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7Ozs7QUFLQSxTQUFTQSxVQUFULENBQW9CQyxLQUFwQixFQUEyQjtBQUN6QixTQUFPLFNBQVNDLHNCQUFULENBQWdDQyxJQUFoQyxFQUFzQztBQUMzQyxXQUFPLFNBQVNDLGtCQUFULENBQTRCQyxNQUE1QixFQUFvQztBQUN6QyxVQUFJLENBQUNBLE9BQU9DLEtBQVosRUFBbUI7QUFDakI7QUFDQSxZQUFJQyxTQUFTSixLQUFLRSxNQUFMLENBQWI7QUFDQSxlQUFPRSxNQUFQO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsZUFBT0YsTUFBUDtBQUNEO0FBQ0YsS0FSRDtBQVNELEdBVkQ7QUFXRDs7QUFFTSxJQUFNRyxvQ0FBYyxTQUFkQSxXQUFjLEdBQU07QUFDL0IsTUFBTVAsUUFBUSx3QkFBWVEsZUFBWixFQUF5Qiw0QkFBZ0JDLHNCQUFoQixFQUFtQ1YsVUFBbkMsQ0FBekIsQ0FBZDtBQUNBLFNBQU9DLEtBQVA7QUFDRCxDQUhNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHByb21pc2VNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXByb21pc2UnXG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSAnLi9yZWR1Y2Vycy9pbmRleCdcblxuLyoqXG4gKiByZXF1ZXN0IOi/lOWbnnByb21pc2UsIOS4jeeuoeaYr3Jlc29sdmXov5jmmK9yZWplY3TvvIzliLByZWR1eC1wcm9taXNlLW1pZGRsZXdhcmXlkI7lnYfkvJpkaXNwYXRjaOi/m3JlZHVjZXLvvIxcbiAqIOiAjOWcqHJlZHVjZeS4re+8jOaIkeS7rOW4jOacm+WPquaOpeaUtuato+W4uOWkhOeQhui/lOWbnuWQjueahOaVsOaNru+8jOaJgOS7peWmguaenOWPkeeUn+mUmeivr++8jOimgeWcqOatpOS4remXtOS7tuS4remYu+aWrXByb21pc2Xov5vlhaVyZWR1Y2VyXG4gKlxuICovXG5mdW5jdGlvbiBjaGVja0Vycm9yKHN0b3JlKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwRGlzcGF0Y2hDaGVja0Vycm9yKG5leHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZGlzcGF0Y2hDaGVja0Vycm9yKGFjdGlvbikge1xuICAgICAgaWYgKCFhY3Rpb24uZXJyb3IpIHtcbiAgICAgICAgLy8gbmV4dChhY3Rpb24p5ZCOLCByZXN1bHQgPT09IGFjdGlvblxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV4dChhY3Rpb24pXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhY3Rpb25cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZ1N0b3JlID0gKCkgPT4ge1xuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBhcHBseU1pZGRsZXdhcmUocHJvbWlzZU1pZGRsZXdhcmUsIGNoZWNrRXJyb3IpKVxuICByZXR1cm4gc3RvcmVcbn1cbiJdfQ==