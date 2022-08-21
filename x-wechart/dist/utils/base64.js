'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var fsm = wx.getFileSystemManager();
var FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名

function base64src(base64data, cb) {
  var _ref = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [],
      _ref2 = _slicedToArray(_ref, 3),
      format = _ref2[1],
      bodyData = _ref2[2];

  if (!format) {
    return new Error('ERROR_BASE64SRC_PARSE');
  }
  var filePath = wx.env.USER_DATA_PATH + '/' + FILE_BASE_NAME + '.' + format;
  var buffer = wx.base64ToArrayBuffer(bodyData);
  fsm.writeFile({
    filePath: filePath,
    data: buffer,
    encoding: 'binary',
    success: function success() {
      cb(filePath);
    },
    fail: function fail() {
      return new Error('ERROR_BASE64SRC_WRITE');
    }
  });
};

exports.base64src = base64src;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2U2NC5qcyJdLCJuYW1lcyI6WyJmc20iLCJ3eCIsImdldEZpbGVTeXN0ZW1NYW5hZ2VyIiwiRklMRV9CQVNFX05BTUUiLCJiYXNlNjRzcmMiLCJiYXNlNjRkYXRhIiwiY2IiLCJleGVjIiwiZm9ybWF0IiwiYm9keURhdGEiLCJFcnJvciIsImZpbGVQYXRoIiwiZW52IiwiVVNFUl9EQVRBX1BBVEgiLCJidWZmZXIiLCJiYXNlNjRUb0FycmF5QnVmZmVyIiwid3JpdGVGaWxlIiwiZGF0YSIsImVuY29kaW5nIiwic3VjY2VzcyIsImZhaWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBTUEsTUFBTUMsR0FBR0Msb0JBQUgsRUFBWjtBQUNBLElBQU1DLGlCQUFpQixlQUF2QixDLENBQXdDOztBQUV4QyxTQUFTQyxTQUFULENBQW1CQyxVQUFuQixFQUErQkMsRUFBL0IsRUFBbUM7QUFBQSxhQUNKLGdDQUFnQ0MsSUFBaEMsQ0FBcUNGLFVBQXJDLEtBQW9ELEVBRGhEO0FBQUE7QUFBQSxNQUN4QkcsTUFEd0I7QUFBQSxNQUNoQkMsUUFEZ0I7O0FBRWpDLE1BQUksQ0FBQ0QsTUFBTCxFQUFhO0FBQ1gsV0FBUSxJQUFJRSxLQUFKLENBQVUsdUJBQVYsQ0FBUjtBQUNEO0FBQ0QsTUFBTUMsV0FBY1YsR0FBR1csR0FBSCxDQUFPQyxjQUFyQixTQUF1Q1YsY0FBdkMsU0FBeURLLE1BQS9EO0FBQ0EsTUFBTU0sU0FBU2IsR0FBR2MsbUJBQUgsQ0FBdUJOLFFBQXZCLENBQWY7QUFDQVQsTUFBSWdCLFNBQUosQ0FBYztBQUNaTCxzQkFEWTtBQUVaTSxVQUFNSCxNQUZNO0FBR1pJLGNBQVUsUUFIRTtBQUlaQyxXQUpZLHFCQUlGO0FBQ1JiLFNBQUdLLFFBQUg7QUFDRCxLQU5XO0FBT1pTLFFBUFksa0JBT0w7QUFDTCxhQUFRLElBQUlWLEtBQUosQ0FBVSx1QkFBVixDQUFSO0FBQ0Q7QUFUVyxHQUFkO0FBV0Q7O1FBRVFOLFMsR0FBQUEsUyIsImZpbGUiOiJiYXNlNjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmc20gPSB3eC5nZXRGaWxlU3lzdGVtTWFuYWdlcigpO1xuY29uc3QgRklMRV9CQVNFX05BTUUgPSAndG1wX2Jhc2U2NHNyYyc7IC8v6Ieq5a6a5LmJ5paH5Lu25ZCNXG5cbmZ1bmN0aW9uIGJhc2U2NHNyYyhiYXNlNjRkYXRhLCBjYikge1xuICBjb25zdCBbLCBmb3JtYXQsIGJvZHlEYXRhXSA9IC9kYXRhOmltYWdlXFwvKFxcdyspO2Jhc2U2NCwoLiopLy5leGVjKGJhc2U2NGRhdGEpIHx8IFtdO1xuICBpZiAoIWZvcm1hdCkge1xuICAgIHJldHVybiAobmV3IEVycm9yKCdFUlJPUl9CQVNFNjRTUkNfUEFSU0UnKSk7XG4gIH1cbiAgY29uc3QgZmlsZVBhdGggPSBgJHt3eC5lbnYuVVNFUl9EQVRBX1BBVEh9LyR7RklMRV9CQVNFX05BTUV9LiR7Zm9ybWF0fWA7XG4gIGNvbnN0IGJ1ZmZlciA9IHd4LmJhc2U2NFRvQXJyYXlCdWZmZXIoYm9keURhdGEpO1xuICBmc20ud3JpdGVGaWxlKHtcbiAgICBmaWxlUGF0aCxcbiAgICBkYXRhOiBidWZmZXIsXG4gICAgZW5jb2Rpbmc6ICdiaW5hcnknLFxuICAgIHN1Y2Nlc3MoKSB7XG4gICAgICBjYihmaWxlUGF0aCk7XG4gICAgfSxcbiAgICBmYWlsKCkge1xuICAgICAgcmV0dXJuIChuZXcgRXJyb3IoJ0VSUk9SX0JBU0U2NFNSQ19XUklURScpKTtcbiAgICB9LFxuICB9KTtcbn07XG5cbmV4cG9ydCB7IGJhc2U2NHNyYyB9OyJdfQ==