'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WxCanvas = function () {
  function WxCanvas(ctx, canvasId) {
    _classCallCheck(this, WxCanvas);

    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;

    // this._initCanvas(zrender, ctx);
    this._initStyle(ctx);
    this._initEvent();
  }

  _createClass(WxCanvas, [{
    key: 'getContext',
    value: function getContext(contextType) {
      if (contextType === '2d') {
        return this.ctx;
      }
    }

    // canvasToTempFilePath(opt) {
    //   if (!opt.canvasId) {
    //     opt.canvasId = this.canvasId;
    //   }

    //   return wx.canvasToTempFilePath(opt, this);
    // }

  }, {
    key: 'setChart',
    value: function setChart(chart) {
      this.chart = chart;
    }
  }, {
    key: 'attachEvent',
    value: function attachEvent() {
      // noop
    }
  }, {
    key: 'detachEvent',
    value: function detachEvent() {
      // noop
    }
  }, {
    key: '_initCanvas',
    value: function _initCanvas(zrender, ctx) {
      zrender.util.getContext = function () {
        return ctx;
      };

      zrender.util.$override('measureText', function (text, font) {
        ctx.font = font || '12px sans-serif';
        return ctx.measureText(text);
      });
    }
  }, {
    key: '_initStyle',
    value: function _initStyle(ctx) {
      var _arguments = arguments;

      var styles = ['fillStyle', 'strokeStyle', 'globalAlpha', 'textAlign', 'textBaseAlign', 'shadow', 'lineWidth', 'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'];

      styles.forEach(function (style) {
        Object.defineProperty(ctx, style, {
          set: function set(value) {
            if (style !== 'fillStyle' && style !== 'strokeStyle' || value !== 'none' && value !== null) {
              ctx['set' + style.charAt(0).toUpperCase() + style.slice(1)](value);
            }
          }
        });
      });

      ctx.createRadialGradient = function () {
        return ctx.createCircularGradient(_arguments);
      };
    }
  }, {
    key: '_initEvent',
    value: function _initEvent() {
      var _this = this;

      this.event = {};
      var eventNames = [{
        wxName: 'touchStart',
        ecName: 'mousedown'
      }, {
        wxName: 'touchMove',
        ecName: 'mousemove'
      }, {
        wxName: 'touchEnd',
        ecName: 'mouseup'
      }, {
        wxName: 'touchEnd',
        ecName: 'click'
      }];

      eventNames.forEach(function (name) {
        _this.event[name.wxName] = function (e) {
          var touch = e.touches[0];
          _this.chart.getZr().handler.dispatch(name.ecName, {
            zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
            zrY: name.wxName === 'tap' ? touch.clientY : touch.y
          });
        };
      });
    }
  }]);

  return WxCanvas;
}();

exports.default = WxCanvas;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4LWNhbnZhcy5qcyJdLCJuYW1lcyI6WyJXeENhbnZhcyIsImN0eCIsImNhbnZhc0lkIiwiY2hhcnQiLCJfaW5pdFN0eWxlIiwiX2luaXRFdmVudCIsImNvbnRleHRUeXBlIiwienJlbmRlciIsInV0aWwiLCJnZXRDb250ZXh0IiwiJG92ZXJyaWRlIiwidGV4dCIsImZvbnQiLCJtZWFzdXJlVGV4dCIsInN0eWxlcyIsImZvckVhY2giLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInN0eWxlIiwic2V0IiwidmFsdWUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiY3JlYXRlUmFkaWFsR3JhZGllbnQiLCJjcmVhdGVDaXJjdWxhckdyYWRpZW50IiwiYXJndW1lbnRzIiwiZXZlbnQiLCJldmVudE5hbWVzIiwid3hOYW1lIiwiZWNOYW1lIiwibmFtZSIsInRvdWNoIiwiZSIsInRvdWNoZXMiLCJnZXRaciIsImhhbmRsZXIiLCJkaXNwYXRjaCIsInpyWCIsImNsaWVudFgiLCJ4IiwienJZIiwiY2xpZW50WSIsInkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUJBLFE7QUFDbkIsb0JBQVlDLEdBQVosRUFBaUJDLFFBQWpCLEVBQTJCO0FBQUE7O0FBQ3pCLFNBQUtELEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQWI7O0FBRUE7QUFDQSxTQUFLQyxVQUFMLENBQWdCSCxHQUFoQjtBQUNBLFNBQUtJLFVBQUw7QUFDRDs7OzsrQkFFVUMsVyxFQUFhO0FBQ3RCLFVBQUlBLGdCQUFnQixJQUFwQixFQUEwQjtBQUN4QixlQUFPLEtBQUtMLEdBQVo7QUFDRDtBQUNGOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7NkJBRVNFLEssRUFBTztBQUNkLFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNEOzs7a0NBRWM7QUFDYjtBQUNEOzs7a0NBRWE7QUFDWjtBQUNEOzs7Z0NBRVdJLE8sRUFBU04sRyxFQUFLO0FBQ3hCTSxjQUFRQyxJQUFSLENBQWFDLFVBQWIsR0FBMEIsWUFBWTtBQUNwQyxlQUFPUixHQUFQO0FBQ0QsT0FGRDs7QUFJQU0sY0FBUUMsSUFBUixDQUFhRSxTQUFiLENBQXVCLGFBQXZCLEVBQXNDLFVBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQzFEWCxZQUFJVyxJQUFKLEdBQVdBLFFBQVEsaUJBQW5CO0FBQ0EsZUFBT1gsSUFBSVksV0FBSixDQUFnQkYsSUFBaEIsQ0FBUDtBQUNELE9BSEQ7QUFJRDs7OytCQUVVVixHLEVBQUs7QUFBQTs7QUFDZCxVQUFJYSxTQUFTLENBQUMsV0FBRCxFQUFjLGFBQWQsRUFBNkIsYUFBN0IsRUFDWCxXQURXLEVBQ0UsZUFERixFQUNtQixRQURuQixFQUM2QixXQUQ3QixFQUVYLFNBRlcsRUFFQSxVQUZBLEVBRVksVUFGWixFQUV3QixZQUZ4QixFQUVzQyxVQUZ0QyxDQUFiOztBQUlBQSxhQUFPQyxPQUFQLENBQWUsaUJBQVM7QUFDdEJDLGVBQU9DLGNBQVAsQ0FBc0JoQixHQUF0QixFQUEyQmlCLEtBQTNCLEVBQWtDO0FBQ2hDQyxlQUFLLG9CQUFTO0FBQ1osZ0JBQUlELFVBQVUsV0FBVixJQUF5QkEsVUFBVSxhQUFuQyxJQUNDRSxVQUFVLE1BQVYsSUFBb0JBLFVBQVUsSUFEbkMsRUFFRTtBQUNBbkIsa0JBQUksUUFBUWlCLE1BQU1HLE1BQU4sQ0FBYSxDQUFiLEVBQWdCQyxXQUFoQixFQUFSLEdBQXdDSixNQUFNSyxLQUFOLENBQVksQ0FBWixDQUE1QyxFQUE0REgsS0FBNUQ7QUFDRDtBQUNGO0FBUCtCLFNBQWxDO0FBU0QsT0FWRDs7QUFZQW5CLFVBQUl1QixvQkFBSixHQUEyQixZQUFNO0FBQy9CLGVBQU92QixJQUFJd0Isc0JBQUosQ0FBMkJDLFVBQTNCLENBQVA7QUFDRCxPQUZEO0FBR0Q7OztpQ0FFWTtBQUFBOztBQUNYLFdBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBTUMsYUFBYSxDQUFDO0FBQ2xCQyxnQkFBUSxZQURVO0FBRWxCQyxnQkFBUTtBQUZVLE9BQUQsRUFHaEI7QUFDREQsZ0JBQVEsV0FEUDtBQUVEQyxnQkFBUTtBQUZQLE9BSGdCLEVBTWhCO0FBQ0RELGdCQUFRLFVBRFA7QUFFREMsZ0JBQVE7QUFGUCxPQU5nQixFQVNoQjtBQUNERCxnQkFBUSxVQURQO0FBRURDLGdCQUFRO0FBRlAsT0FUZ0IsQ0FBbkI7O0FBY0FGLGlCQUFXYixPQUFYLENBQW1CLGdCQUFRO0FBQ3pCLGNBQUtZLEtBQUwsQ0FBV0ksS0FBS0YsTUFBaEIsSUFBMEIsYUFBSztBQUM3QixjQUFNRyxRQUFRQyxFQUFFQyxPQUFGLENBQVUsQ0FBVixDQUFkO0FBQ0EsZ0JBQUsvQixLQUFMLENBQVdnQyxLQUFYLEdBQW1CQyxPQUFuQixDQUEyQkMsUUFBM0IsQ0FBb0NOLEtBQUtELE1BQXpDLEVBQWlEO0FBQy9DUSxpQkFBS1AsS0FBS0YsTUFBTCxLQUFnQixLQUFoQixHQUF3QkcsTUFBTU8sT0FBOUIsR0FBd0NQLE1BQU1RLENBREo7QUFFL0NDLGlCQUFLVixLQUFLRixNQUFMLEtBQWdCLEtBQWhCLEdBQXdCRyxNQUFNVSxPQUE5QixHQUF3Q1YsTUFBTVc7QUFGSixXQUFqRDtBQUlELFNBTkQ7QUFPRCxPQVJEO0FBU0Q7Ozs7OztrQkEvRmtCM0MsUSIsImZpbGUiOiJ3eC1jYW52YXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBXeENhbnZhcyB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgY2FudmFzSWQpIHtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLmNhbnZhc0lkID0gY2FudmFzSWQ7XG4gICAgdGhpcy5jaGFydCA9IG51bGw7XG5cbiAgICAvLyB0aGlzLl9pbml0Q2FudmFzKHpyZW5kZXIsIGN0eCk7XG4gICAgdGhpcy5faW5pdFN0eWxlKGN0eCk7XG4gICAgdGhpcy5faW5pdEV2ZW50KCk7XG4gIH1cblxuICBnZXRDb250ZXh0KGNvbnRleHRUeXBlKSB7XG4gICAgaWYgKGNvbnRleHRUeXBlID09PSAnMmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdHg7XG4gICAgfVxuICB9XG5cbiAgLy8gY2FudmFzVG9UZW1wRmlsZVBhdGgob3B0KSB7XG4gIC8vICAgaWYgKCFvcHQuY2FudmFzSWQpIHtcbiAgLy8gICAgIG9wdC5jYW52YXNJZCA9IHRoaXMuY2FudmFzSWQ7XG4gIC8vICAgfVxuXG4gIC8vICAgcmV0dXJuIHd4LmNhbnZhc1RvVGVtcEZpbGVQYXRoKG9wdCwgdGhpcyk7XG4gIC8vIH1cblxuICBzZXRDaGFydChjaGFydCkge1xuICAgIHRoaXMuY2hhcnQgPSBjaGFydDtcbiAgfVxuXG4gIGF0dGFjaEV2ZW50ICgpIHtcbiAgICAvLyBub29wXG4gIH1cblxuICBkZXRhY2hFdmVudCgpIHtcbiAgICAvLyBub29wXG4gIH1cblxuICBfaW5pdENhbnZhcyh6cmVuZGVyLCBjdHgpIHtcbiAgICB6cmVuZGVyLnV0aWwuZ2V0Q29udGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjdHg7XG4gICAgfTtcblxuICAgIHpyZW5kZXIudXRpbC4kb3ZlcnJpZGUoJ21lYXN1cmVUZXh0JywgZnVuY3Rpb24gKHRleHQsIGZvbnQpIHtcbiAgICAgIGN0eC5mb250ID0gZm9udCB8fCAnMTJweCBzYW5zLXNlcmlmJztcbiAgICAgIHJldHVybiBjdHgubWVhc3VyZVRleHQodGV4dCk7XG4gICAgfSk7XG4gIH1cblxuICBfaW5pdFN0eWxlKGN0eCkge1xuICAgIHZhciBzdHlsZXMgPSBbJ2ZpbGxTdHlsZScsICdzdHJva2VTdHlsZScsICdnbG9iYWxBbHBoYScsIFxuICAgICAgJ3RleHRBbGlnbicsICd0ZXh0QmFzZUFsaWduJywgJ3NoYWRvdycsICdsaW5lV2lkdGgnLFxuICAgICAgJ2xpbmVDYXAnLCAnbGluZUpvaW4nLCAnbGluZURhc2gnLCAnbWl0ZXJMaW1pdCcsICdmb250U2l6ZSddO1xuXG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgc3R5bGUsIHtcbiAgICAgICAgc2V0OiB2YWx1ZSA9PiB7XG4gICAgICAgICAgaWYgKHN0eWxlICE9PSAnZmlsbFN0eWxlJyAmJiBzdHlsZSAhPT0gJ3N0cm9rZVN0eWxlJyBcbiAgICAgICAgICAgIHx8IHZhbHVlICE9PSAnbm9uZScgJiYgdmFsdWUgIT09IG51bGxcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGN0eFsnc2V0JyArIHN0eWxlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3R5bGUuc2xpY2UoMSldKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50ID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIGN0eC5jcmVhdGVDaXJjdWxhckdyYWRpZW50KGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIF9pbml0RXZlbnQoKSB7XG4gICAgdGhpcy5ldmVudCA9IHt9O1xuICAgIGNvbnN0IGV2ZW50TmFtZXMgPSBbe1xuICAgICAgd3hOYW1lOiAndG91Y2hTdGFydCcsXG4gICAgICBlY05hbWU6ICdtb3VzZWRvd24nXG4gICAgfSwge1xuICAgICAgd3hOYW1lOiAndG91Y2hNb3ZlJyxcbiAgICAgIGVjTmFtZTogJ21vdXNlbW92ZSdcbiAgICB9LCB7XG4gICAgICB3eE5hbWU6ICd0b3VjaEVuZCcsXG4gICAgICBlY05hbWU6ICdtb3VzZXVwJ1xuICAgIH0sIHtcbiAgICAgIHd4TmFtZTogJ3RvdWNoRW5kJyxcbiAgICAgIGVjTmFtZTogJ2NsaWNrJ1xuICAgIH1dO1xuXG4gICAgZXZlbnROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgdGhpcy5ldmVudFtuYW1lLnd4TmFtZV0gPSBlID0+IHtcbiAgICAgICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgICAgIHRoaXMuY2hhcnQuZ2V0WnIoKS5oYW5kbGVyLmRpc3BhdGNoKG5hbWUuZWNOYW1lLCB7XG4gICAgICAgICAgenJYOiBuYW1lLnd4TmFtZSA9PT0gJ3RhcCcgPyB0b3VjaC5jbGllbnRYIDogdG91Y2gueCxcbiAgICAgICAgICB6clk6IG5hbWUud3hOYW1lID09PSAndGFwJyA/IHRvdWNoLmNsaWVudFkgOiB0b3VjaC55XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl19