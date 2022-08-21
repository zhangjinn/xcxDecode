'use strict';

var _wxCanvas = require('./wx-canvas.js');

var _wxCanvas2 = _interopRequireDefault(_wxCanvas);

var _echarts = require('./echarts@4.9.0.js');

var echarts = _interopRequireWildcard(_echarts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = void 0;

Component({
  properties: {
    canvasId: {
      type: String,
      value: 'ec-canvas'
    },

    ec: {
      type: Object
    }
  },

  data: {},

  ready: function ready() {
    if (!this.data.ec) {
      console.warn('组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' + 'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>');
      return;
    }

    if (!this.data.ec.lazyLoad) {
      this.init();
    }
  },

  methods: {
    init: function init(callback) {
      var _this = this;

      var version = wx.version.version.split('.').map(function (n) {
        return parseInt(n, 10);
      });
      var isValid = version[0] > 1 || version[0] === 1 && version[1] > 9 || version[0] === 1 && version[1] === 9 && version[2] >= 91;
      if (!isValid) {
        console.error('微信基础库版本过低，需大于等于 1.9.91。' + '参见：https://github.com/ecomfe/echarts-for-weixin' + '#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82');
        return;
      }

      ctx = wx.createCanvasContext(this.data.canvasId, this);

      var canvas = new _wxCanvas2.default(ctx, this.data.canvasId);

      echarts.setCanvasCreator(function () {
        return canvas;
      });

      var query = wx.createSelectorQuery().in(this);
      query.select('.ec-canvas').boundingClientRect(function (res) {
        if (typeof callback === 'function') {
          _this.chart = callback(canvas, res.width, res.height);
        } else if (_this.data.ec && typeof _this.data.ec.onInit === 'function') {
          _this.chart = _this.data.ec.onInit(canvas, res.width, res.height);
        } else {
          _this.triggerEvent('init', {
            canvas: canvas,
            width: res.width,
            height: res.height
          });
        }
      }).exec();
    },

    canvasToTempFilePath: function canvasToTempFilePath(opt) {
      var _this2 = this;

      if (!opt.canvasId) {
        opt.canvasId = this.data.canvasId;
      }

      ctx.draw(true, function () {
        wx.canvasToTempFilePath(opt, _this2);
      });
    },
    touchStart: function touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'start');
      }
    },
    touchMove: function touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'change');
      }
    },
    touchEnd: function touchEnd(e) {
      if (this.chart) {
        var touch = e.changedTouches ? e.changedTouches[0] : {};
        var handler = this.chart.getZr().handler;
        handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'end');
      }
    }
  }
});

function wrapTouch(event) {
  for (var i = 0; i < event.touches.length; ++i) {
    var touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVjLWNhbnZhcy5qcyJdLCJuYW1lcyI6WyJlY2hhcnRzIiwiY3R4IiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNhbnZhc0lkIiwidHlwZSIsIlN0cmluZyIsInZhbHVlIiwiZWMiLCJPYmplY3QiLCJkYXRhIiwicmVhZHkiLCJjb25zb2xlIiwid2FybiIsImxhenlMb2FkIiwiaW5pdCIsIm1ldGhvZHMiLCJjYWxsYmFjayIsInZlcnNpb24iLCJ3eCIsInNwbGl0IiwibWFwIiwicGFyc2VJbnQiLCJuIiwiaXNWYWxpZCIsImVycm9yIiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsImNhbnZhcyIsIld4Q2FudmFzIiwic2V0Q2FudmFzQ3JlYXRvciIsInF1ZXJ5IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsImluIiwic2VsZWN0IiwiYm91bmRpbmdDbGllbnRSZWN0IiwiY2hhcnQiLCJyZXMiLCJ3aWR0aCIsImhlaWdodCIsIm9uSW5pdCIsInRyaWdnZXJFdmVudCIsImV4ZWMiLCJjYW52YXNUb1RlbXBGaWxlUGF0aCIsIm9wdCIsImRyYXciLCJ0b3VjaFN0YXJ0IiwiZSIsInRvdWNoZXMiLCJsZW5ndGgiLCJ0b3VjaCIsImhhbmRsZXIiLCJnZXRaciIsImRpc3BhdGNoIiwienJYIiwieCIsInpyWSIsInkiLCJwcm9jZXNzR2VzdHVyZSIsIndyYXBUb3VjaCIsInRvdWNoTW92ZSIsInRvdWNoRW5kIiwiY2hhbmdlZFRvdWNoZXMiLCJldmVudCIsImkiLCJvZmZzZXRYIiwib2Zmc2V0WSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOztJQUFZQSxPOzs7Ozs7QUFFWixJQUFJQyxZQUFKOztBQUVBQyxVQUFVO0FBQ1JDLGNBQVk7QUFDVkMsY0FBVTtBQUNSQyxZQUFNQyxNQURFO0FBRVJDLGFBQU87QUFGQyxLQURBOztBQU1WQyxRQUFJO0FBQ0ZILFlBQU1JO0FBREo7QUFOTSxHQURKOztBQVlSQyxRQUFNLEVBWkU7O0FBZ0JSQyxTQUFPLGlCQUFZO0FBQ2pC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LEVBQTRCO0FBQzFCQyxlQUFLSixNQUFNSyxDQURlO0FBRTFCQyxlQUFLTixNQUFNTztBQUZlLFNBQTVCO0FBSUFOLGdCQUFRRSxRQUFSLENBQWlCLE9BQWpCLEVBQTBCO0FBQ3hCQyxlQUFLSixNQUFNSyxDQURhO0FBRXhCQyxlQUFLTixNQUFNTztBQUZhLFNBQTFCO0FBSUFOLGdCQUFRTyxjQUFSLENBQXVCQyxVQUFVWixDQUFWLENBQXZCLEVBQXFDLEtBQXJDO0FBQ0Q7QUFDRjtBQTFGTTtBQTVCRCxDQUFWOztBQTBIQSxTQUFTWSxTQUFULENBQW1CSSxLQUFuQixFQUEwQjtBQUN4QixPQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUQsTUFBTWYsT0FBTixDQUFjQyxNQUFsQyxFQUEwQyxFQUFFZSxDQUE1QyxFQUErQztBQUM3QyxRQUFNZCxRQUFRYSxNQUFNZixPQUFOLENBQWNnQixDQUFkLENBQWQ7QUFDQWQsVUFBTWUsT0FBTixHQUFnQmYsTUFBTUssQ0FBdEI7QUFDQUwsVUFBTWdCLE9BQU4sR0FBZ0JoQixNQUFNTyxDQUF0QjtBQUNEO0FBQ0QsU0FBT00sS0FBUDtBQUNEIiwiZmlsZSI6ImVjLWNhbnZhcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXeENhbnZhcyBmcm9tICcuL3d4LWNhbnZhcyc7XG5pbXBvcnQgKiBhcyBlY2hhcnRzIGZyb20gJy4vZWNoYXJ0c0A0LjkuMCc7XG5cbmxldCBjdHg7XG5cbkNvbXBvbmVudCh7XG4gIHByb3BlcnRpZXM6IHtcbiAgICBjYW52YXNJZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICdlYy1jYW52YXMnXG4gICAgfSxcblxuICAgIGVjOiB7XG4gICAgICB0eXBlOiBPYmplY3RcbiAgICB9XG4gIH0sXG5cbiAgZGF0YToge1xuXG4gIH0sXG5cbiAgcmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuZGF0YS5lYykge1xuICAgICAgY29uc29sZS53YXJuKCfnu4Tku7bpnIDnu5HlrpogZWMg5Y+Y6YeP77yM5L6L77yaPGVjLWNhbnZhcyBpZD1cIm15Y2hhcnQtZG9tLWJhclwiICdcbiAgICAgICAgKyAnY2FudmFzLWlkPVwibXljaGFydC1iYXJcIiBlYz1cInt7IGVjIH19XCI+PC9lYy1jYW52YXM+Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmRhdGEuZWMubGF6eUxvYWQpIHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgaW5pdDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICBjb25zdCB2ZXJzaW9uID0gd3gudmVyc2lvbi52ZXJzaW9uLnNwbGl0KCcuJykubWFwKG4gPT4gcGFyc2VJbnQobiwgMTApKTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSB2ZXJzaW9uWzBdID4gMSB8fCAodmVyc2lvblswXSA9PT0gMSAmJiB2ZXJzaW9uWzFdID4gOSlcbiAgICAgICAgfHwgKHZlcnNpb25bMF0gPT09IDEgJiYgdmVyc2lvblsxXSA9PT0gOSAmJiB2ZXJzaW9uWzJdID49IDkxKTtcbiAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCflvq7kv6Hln7rnoYDlupPniYjmnKzov4fkvY7vvIzpnIDlpKfkuo7nrYnkuo4gMS45Ljkx44CCJ1xuICAgICAgICAgICsgJ+WPguinge+8mmh0dHBzOi8vZ2l0aHViLmNvbS9lY29tZmUvZWNoYXJ0cy1mb3Itd2VpeGluJ1xuICAgICAgICAgICsgJyMlRTUlQkUlQUUlRTQlQkYlQTElRTclODklODglRTYlOUMlQUMlRTglQTYlODElRTYlQjElODInKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KHRoaXMuZGF0YS5jYW52YXNJZCwgdGhpcyk7XG5cbiAgICAgIGNvbnN0IGNhbnZhcyA9IG5ldyBXeENhbnZhcyhjdHgsIHRoaXMuZGF0YS5jYW52YXNJZCk7XG5cbiAgICAgIGVjaGFydHMuc2V0Q2FudmFzQ3JlYXRvcigoKSA9PiB7XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgICB9KTtcblxuICAgICAgdmFyIHF1ZXJ5ID0gd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpLmluKHRoaXMpO1xuICAgICAgcXVlcnkuc2VsZWN0KCcuZWMtY2FudmFzJykuYm91bmRpbmdDbGllbnRSZWN0KHJlcyA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLmNoYXJ0ID0gY2FsbGJhY2soY2FudmFzLCByZXMud2lkdGgsIHJlcy5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0YS5lYyAmJiB0eXBlb2YgdGhpcy5kYXRhLmVjLm9uSW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuY2hhcnQgPSB0aGlzLmRhdGEuZWMub25Jbml0KGNhbnZhcywgcmVzLndpZHRoLCByZXMuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnaW5pdCcsIHtcbiAgICAgICAgICAgIGNhbnZhczogY2FudmFzLFxuICAgICAgICAgICAgd2lkdGg6IHJlcy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVzLmhlaWdodFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KS5leGVjKCk7XG4gICAgfSxcblxuICAgIGNhbnZhc1RvVGVtcEZpbGVQYXRoKG9wdCkge1xuICAgICAgaWYgKCFvcHQuY2FudmFzSWQpIHtcbiAgICAgICAgb3B0LmNhbnZhc0lkID0gdGhpcy5kYXRhLmNhbnZhc0lkO1xuICAgICAgfVxuXG4gICAgICBjdHguZHJhdyh0cnVlLCAoKSA9PiB7XG4gICAgICAgIHd4LmNhbnZhc1RvVGVtcEZpbGVQYXRoKG9wdCwgdGhpcyk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgdG91Y2hTdGFydChlKSB7XG4gICAgICBpZiAodGhpcy5jaGFydCAmJiBlLnRvdWNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5jaGFydC5nZXRacigpLmhhbmRsZXI7XG4gICAgICAgIGhhbmRsZXIuZGlzcGF0Y2goJ21vdXNlZG93bicsIHtcbiAgICAgICAgICB6clg6IHRvdWNoLngsXG4gICAgICAgICAgenJZOiB0b3VjaC55XG4gICAgICAgIH0pO1xuICAgICAgICBoYW5kbGVyLmRpc3BhdGNoKCdtb3VzZW1vdmUnLCB7XG4gICAgICAgICAgenJYOiB0b3VjaC54LFxuICAgICAgICAgIHpyWTogdG91Y2gueVxuICAgICAgICB9KTtcbiAgICAgICAgaGFuZGxlci5wcm9jZXNzR2VzdHVyZSh3cmFwVG91Y2goZSksICdzdGFydCcpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b3VjaE1vdmUoZSkge1xuICAgICAgaWYgKHRoaXMuY2hhcnQgJiYgZS50b3VjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuY2hhcnQuZ2V0WnIoKS5oYW5kbGVyO1xuICAgICAgICBoYW5kbGVyLmRpc3BhdGNoKCdtb3VzZW1vdmUnLCB7XG4gICAgICAgICAgenJYOiB0b3VjaC54LFxuICAgICAgICAgIHpyWTogdG91Y2gueVxuICAgICAgICB9KTtcbiAgICAgICAgaGFuZGxlci5wcm9jZXNzR2VzdHVyZSh3cmFwVG91Y2goZSksICdjaGFuZ2UnKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG91Y2hFbmQoZSkge1xuICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgICAgY29uc3QgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IHt9O1xuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuY2hhcnQuZ2V0WnIoKS5oYW5kbGVyO1xuICAgICAgICBoYW5kbGVyLmRpc3BhdGNoKCdtb3VzZXVwJywge1xuICAgICAgICAgIHpyWDogdG91Y2gueCxcbiAgICAgICAgICB6clk6IHRvdWNoLnlcbiAgICAgICAgfSk7XG4gICAgICAgIGhhbmRsZXIuZGlzcGF0Y2goJ2NsaWNrJywge1xuICAgICAgICAgIHpyWDogdG91Y2gueCxcbiAgICAgICAgICB6clk6IHRvdWNoLnlcbiAgICAgICAgfSk7XG4gICAgICAgIGhhbmRsZXIucHJvY2Vzc0dlc3R1cmUod3JhcFRvdWNoKGUpLCAnZW5kJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxuZnVuY3Rpb24gd3JhcFRvdWNoKGV2ZW50KSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQudG91Y2hlcy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHRvdWNoID0gZXZlbnQudG91Y2hlc1tpXTtcbiAgICB0b3VjaC5vZmZzZXRYID0gdG91Y2gueDtcbiAgICB0b3VjaC5vZmZzZXRZID0gdG91Y2gueTtcbiAgfVxuICByZXR1cm4gZXZlbnQ7XG59XG4iXX0=