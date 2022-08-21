'use strict';

/**
 * 处理装修数据返回的样式列表 paddingLeft -> padding-left, px -> rpx等
 */
module.exports = Behavior({
  data: {
    styles: []
  },
  attached: function attached() {
    var customStyle = this.data.customStyle;

    if (Array.isArray(customStyle) && customStyle.length > 0) {
      this.transformStyle(customStyle);
    }
  },

  methods: {
    // 通用跳转函数
    navigateAction: function navigateAction(_ref) {
      var type = _ref.type,
          pageType = _ref.pageType,
          page = _ref.page,
          query = _ref.query,
          value = _ref.value;

      if (!pageType) return;
      if (pageType === '1' || pageType === '2' || pageType === '3' || pageType === '7') {
        var url = page + '?' + query;
        switch (type) {
          case 'navigate':
            wx.navigateTo({ url: url });
            break;
          case 'navigateTo':
            wx.navigateTo({ url: url });
            break;
          case 'redirectTo':
            wx.redirectTo({ url: url });
            break;
          case 'navigateBack':
            wx.navigateBack();
            break;
          case 'switchTab':
            wx.switchTab({
              url: page
            });
            break;
          default:
            break;
        }
      } else {
        // 领劵 或者其他定义的事件则 callback 给父组件
        this.triggerEvent('callback', { pageType: pageType, page: page, query: query, value: value });
      }
    },
    getStyles: function getStyles() {
      var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var inlineStyles = [];
      var styles = this.data.styles;

      if (Array.isArray(styles)) {
        types.forEach(function (style) {
          var inlineStyle = styles.find(function (item) {
            return item.key === style;
          });
          if (inlineStyle && inlineStyle.key) {
            inlineStyles.push(inlineStyle.value);
          }
        });
      }
      return inlineStyles.join(';');
    },
    transformStyle: function transformStyle(styles) {
      var _this = this;

      var transform = [];
      for (var i = 0; i < styles.length; i++) {
        var _styles$i = styles[i],
            key = _styles$i.key,
            _styles$i$items = _styles$i.items,
            items = _styles$i$items === undefined ? [] : _styles$i$items;

        var styleItems = items || [];
        var styleArr = styleItems.map(function (item) {
          var key = _this.decamelize(item.key);
          var value = item.value;
          var unit = item.value.replace(/[0-9]/ig, '');
          var numberValue = parseFloat(item.value, 10);
          if (Number.isInteger(numberValue)) {
            if (numberValue > 0) {
              switch (unit) {
                case 'px':
                  // 装修系统的尺寸是 375px
                  value = numberValue * 2 + 'rpx';
                  break;
                default:
                  break;
              }
            } else {
              value = 0;
            }
          }
          return key + ':' + value;
        });
        transform.push({ key: key, value: styleArr.join(';') });
      }
      this.setData({ styles: transform });
    },
    decamelize: function decamelize(str, separator) {
      var separatorUnit = typeof separator === 'undefined' ? '-' : separator;
      return str.replace(/([a-z\d])([A-Z])/g, '$1' + separatorUnit + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separatorUnit + '$2').toLowerCase();
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJCZWhhdmlvciIsImRhdGEiLCJzdHlsZXMiLCJhdHRhY2hlZCIsImN1c3RvbVN0eWxlIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwidHJhbnNmb3JtU3R5bGUiLCJtZXRob2RzIiwibmF2aWdhdGVBY3Rpb24iLCJ0eXBlIiwicGFnZVR5cGUiLCJwYWdlIiwicXVlcnkiLCJ2YWx1ZSIsInVybCIsInd4IiwibmF2aWdhdGVUbyIsInJlZGlyZWN0VG8iLCJuYXZpZ2F0ZUJhY2siLCJzd2l0Y2hUYWIiLCJ0cmlnZ2VyRXZlbnQiLCJnZXRTdHlsZXMiLCJ0eXBlcyIsImlubGluZVN0eWxlcyIsImZvckVhY2giLCJpbmxpbmVTdHlsZSIsImZpbmQiLCJpdGVtIiwia2V5Iiwic3R5bGUiLCJwdXNoIiwiam9pbiIsInRyYW5zZm9ybSIsImkiLCJpdGVtcyIsInN0eWxlSXRlbXMiLCJzdHlsZUFyciIsIm1hcCIsImRlY2FtZWxpemUiLCJ1bml0IiwicmVwbGFjZSIsIm51bWJlclZhbHVlIiwicGFyc2VGbG9hdCIsIk51bWJlciIsImlzSW50ZWdlciIsInNldERhdGEiLCJzdHIiLCJzZXBhcmF0b3IiLCJzZXBhcmF0b3JVbml0IiwidG9Mb3dlckNhc2UiXSwibWFwcGluZ3MiOiI7O0FBQUE7OztBQUdBQSxPQUFPQyxPQUFQLEdBQWlCQyxTQUFTO0FBQ3hCQyxRQUFNO0FBQ0pDLFlBQVE7QUFESixHQURrQjtBQUl4QkMsVUFKd0Isc0JBSWI7QUFBQSxRQUNEQyxXQURDLEdBQ2UsS0FBS0gsSUFEcEIsQ0FDREcsV0FEQzs7QUFFVCxRQUFJQyxNQUFNQyxPQUFOLENBQWNGLFdBQWQsS0FBOEJBLFlBQVlHLE1BQVosR0FBcUIsQ0FBdkQsRUFBMEQ7QUFDeEQsV0FBS0MsY0FBTCxDQUFvQkosV0FBcEI7QUFDRDtBQUNGLEdBVHVCOztBQVV4QkssV0FBUztBQUNQO0FBQ0FDLGtCQUZPLGdDQUVnRDtB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RTtBQUNBMUIsMEJBQVc0QixjQUFjLENBQXpCO0FBQ0E7QUFDRjtBQUNFO0FBTko7QUFRRCxhQVRELE1BU087QUFDTDVCLHNCQUFRLENBQVI7QUFDRDtBQUNGO0FBQ0QsaUJBQVVlLEdBQVYsU0FBaUJmLEtBQWpCO0FBQ0QsU0FwQmdCLENBQWpCO0FBcUJBbUIsa0JBQVVGLElBQVYsQ0FBZSxFQUFFRixRQUFGLEVBQU9mLE9BQU91QixTQUFTTCxJQUFULENBQWMsR0FBZCxDQUFkLEVBQWY7QUFDRDtBQUNELFdBQUtjLE9BQUwsQ0FBYSxFQUFFN0MsUUFBUWdDLFNBQVYsRUFBYjtBQUNELEtBMUVNO0FBMkVQTSxjQTNFTyxzQkEyRUlRLEdBM0VKLEVBMkVTQyxTQTNFVCxFQTJFb0I7QUFDekIsVUFBTUMsZ0JBQWdCLE9BQU9ELFNBQVAsS0FBcUIsV0FBckIsR0FBbUMsR0FBbkMsR0FBeUNBLFNBQS9EO0FBQ0EsYUFBT0QsSUFBSU4sT0FBSixDQUFZLG1CQUFaLFNBQXNDUSxhQUF0QyxTQUF5RFIsT0FBekQsQ0FBaUUsMEJBQWpFLFNBQWtHUSxhQUFsRyxTQUFxSEMsV0FBckgsRUFBUDtBQUNEO0FBOUVNO0FBVmUsQ0FBVCxDQUFqQiIsImZpbGUiOiJzdHlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog5aSE55CG6KOF5L+u5pWw5o2u6L+U5Zue55qE5qC35byP5YiX6KGoIHBhZGRpbmdMZWZ0IC0+IHBhZGRpbmctbGVmdCwgcHggLT4gcnB4562JXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gQmVoYXZpb3Ioe1xuICBkYXRhOiB7XG4gICAgc3R5bGVzOiBbXVxuICB9LFxuICBhdHRhY2hlZCgpIHtcbiAgICBjb25zdCB7IGN1c3RvbVN0eWxlIH0gPSB0aGlzLmRhdGFcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjdXN0b21TdHlsZSkgJiYgY3VzdG9tU3R5bGUubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy50cmFuc2Zvcm1TdHlsZShjdXN0b21TdHlsZSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAvLyDpgJrnlKjot7Povazlh73mlbBcbiAgICBuYXZpZ2F0ZUFjdGlvbih7IHR5cGUsIHBhZ2VUeXBlLCBwYWdlLCBxdWVyeSwgdmFsdWUgfSkge1xuICAgICAgaWYgKCFwYWdlVHlwZSkgcmV0dXJuXG4gICAgICBpZiAocGFnZVR5cGUgPT09ICcxJyB8fCBwYWdlVHlwZSA9PT0gJzInIHx8IHBhZ2VUeXBlID09PSAnMycgfHwgcGFnZVR5cGUgPT09ICc3Jykge1xuICAgICAgICBjb25zdCB1cmwgPSBgJHtwYWdlfT8ke3F1ZXJ5fWBcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSAnbmF2aWdhdGUnOlxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7IHVybCB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICduYXZpZ2F0ZVRvJzpcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmwgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAncmVkaXJlY3RUbyc6XG4gICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHsgdXJsIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ25hdmlnYXRlQmFjayc6XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdzd2l0Y2hUYWInOlxuICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgdXJsOiBwYWdlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g6aKG5Yq1IOaIluiAheWFtuS7luWumuS5ieeahOS6i+S7tuWImSBjYWxsYmFjayDnu5nniLbnu4Tku7ZcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2NhbGxiYWNrJywgeyBwYWdlVHlwZSwgcGFnZSwgcXVlcnksIHZhbHVlIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRTdHlsZXModHlwZXMgPSBbXSkge1xuICAgICAgY29uc3QgaW5saW5lU3R5bGVzID0gW11cbiAgICAgIGNvbnN0IHsgc3R5bGVzIH0gPSB0aGlzLmRhdGFcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlcykpIHtcbiAgICAgICAgdHlwZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5saW5lU3R5bGUgPSBzdHlsZXMuZmluZChpdGVtID0+IGl0ZW0ua2V5ID09PSBzdHlsZSlcbiAgICAgICAgICBpZiAoaW5saW5lU3R5bGUgJiYgaW5saW5lU3R5bGUua2V5KSB7XG4gICAgICAgICAgICBpbmxpbmVTdHlsZXMucHVzaChpbmxpbmVTdHlsZS52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gaW5saW5lU3R5bGVzLmpvaW4oJzsnKVxuICAgIH0sXG4gICAgdHJhbnNmb3JtU3R5bGUoc3R5bGVzKSB7XG4gICAgICBjb25zdCB0cmFuc2Zvcm0gPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgeyBrZXksIGl0ZW1zID0gW10gfSA9IHN0eWxlc1tpXVxuICAgICAgICBjb25zdCBzdHlsZUl0ZW1zID0gaXRlbXMgfHwgW11cbiAgICAgICAgY29uc3Qgc3R5bGVBcnIgPSBzdHlsZUl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuZGVjYW1lbGl6ZShpdGVtLmtleSlcbiAgICAgICAgICBsZXQgdmFsdWUgPSBpdGVtLnZhbHVlXG4gICAgICAgICAgY29uc3QgdW5pdCA9IGl0ZW0udmFsdWUucmVwbGFjZSgvWzAtOV0vaWcsICcnKVxuICAgICAgICAgIGNvbnN0IG51bWJlclZhbHVlID0gcGFyc2VGbG9hdChpdGVtLnZhbHVlLCAxMClcbiAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihudW1iZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChudW1iZXJWYWx1ZSA+IDApIHtcbiAgICAgICAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncHgnOlxuICAgICAgICAgICAgICAgICAgLy8g6KOF5L+u57O757uf55qE5bC65a+45pivIDM3NXB4XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IGAke251bWJlclZhbHVlICogMn1ycHhgXG4gICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YWx1ZSA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGAke2tleX06JHt2YWx1ZX1gXG4gICAgICAgIH0pXG4gICAgICAgIHRyYW5zZm9ybS5wdXNoKHsga2V5LCB2YWx1ZTogc3R5bGVBcnIuam9pbignOycpIH0pXG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEoeyBzdHlsZXM6IHRyYW5zZm9ybSB9KVxuICAgIH0sXG4gICAgZGVjYW1lbGl6ZShzdHIsIHNlcGFyYXRvcikge1xuICAgICAgY29uc3Qgc2VwYXJhdG9yVW5pdCA9IHR5cGVvZiBzZXBhcmF0b3IgPT09ICd1bmRlZmluZWQnID8gJy0nIDogc2VwYXJhdG9yXG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbYS16XFxkXSkoW0EtWl0pL2csIGAkMSR7c2VwYXJhdG9yVW5pdH0kMmApLnJlcGxhY2UoLyhbQS1aXSspKFtBLVpdW2EtelxcZF0rKS9nLCBgJDEke3NlcGFyYXRvclVuaXR9JDJgKS50b0xvd2VyQ2FzZSgpXG4gICAgfVxuICB9XG59KVxuIl19