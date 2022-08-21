'use strict';

String.prototype.splice = function () {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var deleteCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var addStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (start < 0) start = this.length + start;
  if (deleteCount < 0) deleteCount = 0;
  return this.substring(0, start) + addStr + this.substring(start + deleteCount);
};
module.exports = {
  versionHigherThan: function versionHigherThan() {
    var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var v1 = wx.getSystemInfoSync().SDKVersion.split('.');
    var v2 = version.split('.');
    var len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
      v1.push('0');
    }
    while (v2.length < len) {
      v2.push('0');
    }
    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i]);
      var num2 = parseInt(v2[i]);
      if (num1 > num2) {
        return true;
      } else if (num1 < num2) {
        return false;
      }
    }
    return true;
  },
  html2nodes: function html2nodes(html, tagStyle) {
    var Parser = require('./Parser.js');
    return Parser(html, tagStyle);
  },
  css2object: function css2object(style, tagStyle) {
    var CssTokenizer = require('./CssTokenizer.js');
    return new CssTokenizer(style, tagStyle).parse();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJTdHJpbmciLCJwcm90b3R5cGUiLCJzcGxpY2UiLCJzdGFydCIsImRlbGV0ZUNvdW50IiwiYWRkU3RyIiwibGVuZ3RoIiwic3Vic3RyaW5nIiwibW9kdWxlIiwiZXhwb3J0cyIsInZlcnNpb25IaWdoZXJUaGFuIiwidmVyc2lvbiIsInYxIiwid3giLCJnZXRTeXN0ZW1JbmZvU3luYyIsIlNES1ZlcnNpb24iLCJzcGxpdCIsInYyIiwibGVuIiwiTWF0aCIsIm1heCIsInB1c2giLCJpIiwibnVtMSIsInBhcnNlSW50IiwibnVtMiIsImh0bWwybm9kZXMiLCJodG1sIiwidGFnU3R5bGUiLCJQYXJzZXIiLCJyZXF1aXJlIiwiY3NzMm9iamVjdCIsInN0eWxlIiwiQ3NzVG9rZW5pemVyIiwicGFyc2UiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLFNBQVAsQ0FBaUJDLE1BQWpCLEdBQTBCLFlBQWtEO0FBQUEsTUFBekNDLEtBQXlDLHVFQUFqQyxDQUFpQztBQUFBLE1BQTlCQyxXQUE4Qix1RUFBaEIsQ0FBZ0I7QUFBQSxNQUFiQyxNQUFhLHVFQUFKLEVBQUk7O0FBQzFFLE1BQUlGLFFBQVEsQ0FBWixFQUFlQSxRQUFRLEtBQUtHLE1BQUwsR0FBY0gsS0FBdEI7QUFDZixNQUFJQyxjQUFjLENBQWxCLEVBQXFCQSxjQUFjLENBQWQ7QUFDckIsU0FBTyxLQUFLRyxTQUFMLENBQWUsQ0FBZixFQUFrQkosS0FBbEIsSUFBMkJFLE1BQTNCLEdBQW9DLEtBQUtFLFNBQUwsQ0FBZUosUUFBUUMsV0FBdkIsQ0FBM0M7QUFDRCxDQUpEO0FBS0FJLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsbUJBRGUsK0JBQ2lCO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUM5QixRQUFJQyxLQUFLQyxHQUFHQyxpQkFBSCxHQUF1QkMsVUFBdkIsQ0FBa0NDLEtBQWxDLENBQXdDLEdBQXhDLENBQVQ7QUFDQSxRQUFJQyxLQUFLTixRQUFRSyxLQUFSLENBQWMsR0FBZCxDQUFUO0FBQ0EsUUFBTUUsTUFBTUMsS0FBS0MsR0FBTCxDQUFTUixHQUFHTixNQUFaLEVBQW9CVyxHQUFHWCxNQUF2QixDQUFaO0FBQ0EsV0FBT00sR0FBR04sTUFBSCxHQUFZWSxHQUFuQixFQUF3QjtBQUN0Qk4sU0FBR1MsSUFBSCxDQUFRLEdBQVI7QUFDRDtBQUNELFdBQU9KLEdBQUdYLE1BQUgsR0FBWVksR0FBbkIsRUFBd0I7QUFDdEJELFNBQUdJLElBQUgsQ0FBUSxHQUFSO0FBQ0Q7QUFDRCxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUosR0FBcEIsRUFBeUJJLEdBQXpCLEVBQThCO0FBQzVCLFVBQU1DLE9BQU9DLFNBQVNaLEdBQUdVLENBQUgsQ0FBVCxDQUFiO0FBQ0EsVUFBTUcsT0FBT0QsU0FBU1AsR0FBR0ssQ0FBSCxDQUFULENBQWI7QUFDQSxVQUFJQyxPQUFPRSxJQUFYLEVBQWlCO0FBQ2YsZUFBTyxJQUFQO0FBQ0QsT0FGRCxNQUVPLElBQUlGLE9BQU9FLElBQVgsRUFBaUI7QUFDdEIsZUFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNELFdBQU8sSUFBUDtBQUNELEdBckJjO0FBc0JmQyxZQXRCZSxzQkFzQkpDLElBdEJJLEVBc0JFQyxRQXRCRixFQXNCWTtBQUN6QixRQUFNQyxTQUFTQyxRQUFRLGFBQVIsQ0FBZjtBQUNBLFdBQU9ELE9BQU9GLElBQVAsRUFBYUMsUUFBYixDQUFQO0FBQ0QsR0F6QmM7QUEwQmZHLFlBMUJlLHNCQTBCSkMsS0ExQkksRUEwQkdKLFFBMUJILEVBMEJhO0FBQzFCLFFBQU1LLGVBQWVILFFBQVEsbUJBQVIsQ0FBckI7QUFDQSxXQUFPLElBQUlHLFlBQUosQ0FBaUJELEtBQWpCLEVBQXdCSixRQUF4QixFQUFrQ00sS0FBbEMsRUFBUDtBQUNEO0FBN0JjLENBQWpCIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlN0cmluZy5wcm90b3R5cGUuc3BsaWNlID0gZnVuY3Rpb24oc3RhcnQgPSAwLCBkZWxldGVDb3VudCA9IDAsIGFkZFN0ciA9ICcnKSB7XHJcbiAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSB0aGlzLmxlbmd0aCArIHN0YXJ0O1xyXG4gIGlmIChkZWxldGVDb3VudCA8IDApIGRlbGV0ZUNvdW50ID0gMDtcclxuICByZXR1cm4gdGhpcy5zdWJzdHJpbmcoMCwgc3RhcnQpICsgYWRkU3RyICsgdGhpcy5zdWJzdHJpbmcoc3RhcnQgKyBkZWxldGVDb3VudCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgdmVyc2lvbkhpZ2hlclRoYW4odmVyc2lvbiA9ICcnKSB7XHJcbiAgICB2YXIgdjEgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLlNES1ZlcnNpb24uc3BsaXQoJy4nKTtcclxuICAgIHZhciB2MiA9IHZlcnNpb24uc3BsaXQoJy4nKTtcclxuICAgIGNvbnN0IGxlbiA9IE1hdGgubWF4KHYxLmxlbmd0aCwgdjIubGVuZ3RoKTtcclxuICAgIHdoaWxlICh2MS5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgdjEucHVzaCgnMCcpO1xyXG4gICAgfVxyXG4gICAgd2hpbGUgKHYyLmxlbmd0aCA8IGxlbikge1xyXG4gICAgICB2Mi5wdXNoKCcwJyk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IG51bTEgPSBwYXJzZUludCh2MVtpXSk7XHJcbiAgICAgIGNvbnN0IG51bTIgPSBwYXJzZUludCh2MltpXSk7XHJcbiAgICAgIGlmIChudW0xID4gbnVtMikge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKG51bTEgPCBudW0yKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIGh0bWwybm9kZXMoaHRtbCwgdGFnU3R5bGUpIHtcclxuICAgIGNvbnN0IFBhcnNlciA9IHJlcXVpcmUoJy4vUGFyc2VyLmpzJyk7XHJcbiAgICByZXR1cm4gUGFyc2VyKGh0bWwsIHRhZ1N0eWxlKTtcclxuICB9LFxyXG4gIGNzczJvYmplY3Qoc3R5bGUsIHRhZ1N0eWxlKSB7XHJcbiAgICBjb25zdCBDc3NUb2tlbml6ZXIgPSByZXF1aXJlKCcuL0Nzc1Rva2VuaXplci5qcycpO1xyXG4gICAgcmV0dXJuIG5ldyBDc3NUb2tlbml6ZXIoc3R5bGUsIHRhZ1N0eWxlKS5wYXJzZSgpO1xyXG4gIH1cclxufSJdfQ==