'use strict';

var styleBehavior = require('./../behaviors/style.js');

Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    designIndex: Number, // 标记在装修页面的第多少个元素上
    customStyle: Object,
    needAutoCallback: Boolean // 自动选中第一个时，是否需要callback,预防一些手动触发
  },
  data: {
    border: false,
    items: [],
    tabItemStyle: null,
    tabItemActiveStyle: null,
    contentStyle: null,
    tabIndex: 0
  },
  lifetimes: {
    attached: function attached() {
      this.initContentData();
    },
    ready: function ready() {
      var content = this.data.content;

      if (content && content.data) {
        var border = content.data.border;

        var contentStyle = this.getStyles(['tabStyle', 'margin']);
        var tabItemStyle = this.getStyles(['tabItemStyle']);
        var tabItemActiveStyle = this.getStyles(border ? ['tabItemStyle', 'tabBorder', 'tabItemActiveStyle'] : ['tabItemStyle', 'tabItemActiveStyle']);
        this.setData({
          contentStyle: contentStyle,
          tabItemStyle: tabItemStyle,
          tabItemActiveStyle: tabItemActiveStyle
        });
      }
    }
  },
  methods: {
    initContentData: function initContentData() {
      var _data = this.data,
          content = _data.content,
          designIndex = _data.designIndex,
          needAutoCallback = _data.needAutoCallback;

      if (content && content.data) {
        var _content$data = content.data,
            border = _content$data.border,
            items = _content$data.items;

        this.setData({
          items: items,
          border: border
        });
        if (needAutoCallback) {
          this.triggerEvent('callback', {
            id: items[0].id,
            designIndex: designIndex
          });
        }
      }
    },
    onTap: function onTap(evt) {
      var _evt$currentTarget$da = evt.currentTarget.dataset,
          id = _evt$currentTarget$da.id,
          index = _evt$currentTarget$da.index;

      this.setData({
        tabIndex: index
      });
      this.triggerEvent('callback', {
        id: id,
        designIndex: this.data.designIndex
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0eWxlQmVoYXZpb3IiLCJyZXF1aXJlIiwiQ29tcG9uZW50IiwiYmVoYXZpb3JzIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJPYmplY3QiLCJkZXNpZ25JbmRleCIsIk51bWJlciIsImN1c3RvbVN0eWxlIiwibmVlZEF1dG9DYWxsYmFjayIsIkJvb2xlYW4iLCJkYXRhIiwiYm9yZGVyIiwiaXRlbXMiLCJ0YWJJdGVtU3R5bGUiLCJ0YWJJdGVtQWN0aXZlU3R5bGUiLCJjb250ZW50U3R5bGUiLCJ0YWJJbmRleCIsImxpZmV0aW1lcyIsImF0dGFjaGVkIiwiaW5pdENvbnRlbnREYXRhIiwicmVhZHkiLCJnZXRTdHlsZXMiLCJzZXREYXRhIiwibWV0aG9kcyIsInRyaWdnZXJFdmVudCIsImlkIiwib25UYXAiLCJldnQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImluZGV4Il0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLGdCQUFnQkMsUUFBUSxvQkFBUixDQUF0Qjs7QUFFQUMsVUFBVTtBQUNSQyxhQUFXLENBQUNILGFBQUQsQ0FESDtBQUVSSSxjQUFZO0FBQ1ZDLGFBQVNDLE1BREM7QUFFVkMsaUJBQWFDLE1BRkgsRUFFVztBQUNyQkMsaUJBQWFILE1BSEg7QUFJVkksc0JBQWtCQyxPQUpSLENBSWdCO0FBSmhCLEdBRko7QUFRUkMsUUFBTTtBQUNKQyxZQUFRLEtBREo7QUFFSkMsV0FBTyxFQUZIO0FBR0pDLGtCQUFjLElBSFY7QUFJSkMsd0JBQW9CLElBSmhCO0FBS0pDLGtCQUFjLElBTFY7QUFNSkMsY0FBVTtBQU5OLEdBUkU7QUFnQlJDLGFBQVc7QUFDVEMsWUFEUyxzQkFDRTtBQUNULFdBQUtDLGVBQUw7QUFDRCxLQUhRO0FBSVRDLFNBSlMsbUJBSUQ7QUFBQSxVQUNFakIsT0FERixHQUNjLEtBQUtPLElBRG5CLENBQ0VQLE9BREY7O0FBRU4sVUFBSUEsV0FBV0EsUUFBUU8sSUFBdkIsRUFBNkI7QUFBQSxZQUNuQkMsTUFEbUIsR0FDUlIsUUFBUU8sSUFEQSxDQUNuQkMsTUFEbUI7O0FBRTNCLFlBQU1JLGVBQWUsS0FBS00sU0FBTCxDQUFlLENBQUMsVUFBRCxFQUFhLFFBQWIsQ0FBZixDQUFyQjtBQUNBLFlBQU1SLGVBQWUsS0FBS1EsU0FBTCxDQUFlLENBQUMsY0FBRCxDQUFmLENBQXJCO0FBQ0EsWUFBTVAscUJBQXFCLEtBQUtPLFNBQUwsQ0FBZVYsU0FBUyxDQUFDLGNBQUQsRUFBaUIsV0FBakIsRUFBOEIsb0JBQTlCLENBQVQsR0FBK0QsQ0FBQyxjQUFELEVBQWlCLG9CQUFqQixDQUE5RSxDQUEzQjtBQUNBLGFBQUtXLE9BQUwsQ0FBYTtBQUNYUCxvQ0FEVztBQUVYRixvQ0FGVztBQUdYQztBQUhXLFNBQWI7QUFLRDtBQUNGO0FBakJRLEdBaEJIO0FBbUNSUyxXQUFTO0FBQ1BKLG1CQURPLDZCQUNXO0FBQUEsa0JBQ21DLEtBQUtULElBRHhDO0FBQUEsVUFDUlAsT0FEUSxTQUNSQSxPQURRO0FBQUEsVUFDQ0UsV0FERCxTQUNDQSxXQUREO0FBQUEsVUFDY0csZ0JBRGQsU0FDY0EsZ0JBRGQ7O0FBRWhCLFVBQUlMLFdBQVdBLFFBQVFPLElBQXZCLEVBQTZCO0FBQUEsNEJBQ0RQLFFBQVFPLElBRFA7QUFBQSxZQUNuQkMsTUFEbUIsaUJBQ25CQSxNQURtQjtBQUFBLFlBQ1hDLEtBRFcsaUJBQ1hBLEtBRFc7O0FBRTNCLGFBQUtVLE9BQUwsQ0FBYTtBQUNYVixzQkFEVztBQUVYRDtBQUZXLFNBQWI7QUFJQSxZQUFJSCxnQkFBSixFQUFzQjtBQUNwQixlQUFLZ0IsWUFBTCxDQUFrQixVQUFsQixFQUE4QjtBQUM1QkMsZ0JBQUliLE1BQU0sQ0FBTixFQUFTYSxFQURlO0FBRTVCcEI7QUFGNEIsV0FBOUI7QUFJRDtBQUNGO0FBQ0YsS0FoQk07QUFpQlBxQixTQWpCTyxpQkFpQkRDLEdBakJDLEVBaUJJO0FBQUEsa0NBQ2FBLElBQUlDLGFBQUosQ0FBa0JDLE9BRC9CO0FBQUEsVUFDREosRUFEQyx5QkFDREEsRUFEQztBQUFBLFVBQ0dLLEtBREgseUJBQ0dBLEtBREg7O0FBRVQsV0FBS1IsT0FBTCxDQUFhO0FBQ1hOLGtCQUFVYztBQURDLE9BQWI7QUFHQSxXQUFLTixZQUFMLENBQWtCLFVBQWxCLEVBQThCO0FBQzVCQyxjQUQ0QjtBQUU1QnBCLHFCQUFhLEtBQUtLLElBQUwsQ0FBVUw7QUFGSyxPQUE5QjtBQUlEO0FBMUJNO0FBbkNELENBQVYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzdHlsZUJlaGF2aW9yID0gcmVxdWlyZSgnLi4vYmVoYXZpb3JzL3N0eWxlJylcblxuQ29tcG9uZW50KHtcbiAgYmVoYXZpb3JzOiBbc3R5bGVCZWhhdmlvcl0sXG4gIHByb3BlcnRpZXM6IHtcbiAgICBjb250ZW50OiBPYmplY3QsXG4gICAgZGVzaWduSW5kZXg6IE51bWJlciwgLy8g5qCH6K6w5Zyo6KOF5L+u6aG16Z2i55qE56ys5aSa5bCR5Liq5YWD57Sg5LiKXG4gICAgY3VzdG9tU3R5bGU6IE9iamVjdCxcbiAgICBuZWVkQXV0b0NhbGxiYWNrOiBCb29sZWFuIC8vIOiHquWKqOmAieS4reesrOS4gOS4quaXtu+8jOaYr+WQpumcgOimgWNhbGxiYWNrLOmihOmYsuS4gOS6m+aJi+WKqOinpuWPkVxuICB9LFxuICBkYXRhOiB7XG4gICAgYm9yZGVyOiBmYWxzZSxcbiAgICBpdGVtczogW10sXG4gICAgdGFiSXRlbVN0eWxlOiBudWxsLFxuICAgIHRhYkl0ZW1BY3RpdmVTdHlsZTogbnVsbCxcbiAgICBjb250ZW50U3R5bGU6IG51bGwsXG4gICAgdGFiSW5kZXg6IDBcbiAgfSxcbiAgbGlmZXRpbWVzOiB7XG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICB0aGlzLmluaXRDb250ZW50RGF0YSgpXG4gICAgfSxcbiAgICByZWFkeSgpIHtcbiAgICAgIGNvbnN0IHsgY29udGVudCB9ID0gdGhpcy5kYXRhXG4gICAgICBpZiAoY29udGVudCAmJiBjb250ZW50LmRhdGEpIHtcbiAgICAgICAgY29uc3QgeyBib3JkZXIgfSA9IGNvbnRlbnQuZGF0YVxuICAgICAgICBjb25zdCBjb250ZW50U3R5bGUgPSB0aGlzLmdldFN0eWxlcyhbJ3RhYlN0eWxlJywgJ21hcmdpbiddKVxuICAgICAgICBjb25zdCB0YWJJdGVtU3R5bGUgPSB0aGlzLmdldFN0eWxlcyhbJ3RhYkl0ZW1TdHlsZSddKVxuICAgICAgICBjb25zdCB0YWJJdGVtQWN0aXZlU3R5bGUgPSB0aGlzLmdldFN0eWxlcyhib3JkZXIgPyBbJ3RhYkl0ZW1TdHlsZScsICd0YWJCb3JkZXInLCAndGFiSXRlbUFjdGl2ZVN0eWxlJ10gOiBbJ3RhYkl0ZW1TdHlsZScsICd0YWJJdGVtQWN0aXZlU3R5bGUnXSlcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBjb250ZW50U3R5bGUsXG4gICAgICAgICAgdGFiSXRlbVN0eWxlLFxuICAgICAgICAgIHRhYkl0ZW1BY3RpdmVTdHlsZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGluaXRDb250ZW50RGF0YSgpIHtcbiAgICAgIGNvbnN0IHsgY29udGVudCwgZGVzaWduSW5kZXgsIG5lZWRBdXRvQ2FsbGJhY2sgfSA9IHRoaXMuZGF0YVxuICAgICAgaWYgKGNvbnRlbnQgJiYgY29udGVudC5kYXRhKSB7XG4gICAgICAgIGNvbnN0IHsgYm9yZGVyLCBpdGVtcyB9ID0gY29udGVudC5kYXRhXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgaXRlbXMsXG4gICAgICAgICAgYm9yZGVyXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChuZWVkQXV0b0NhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2NhbGxiYWNrJywge1xuICAgICAgICAgICAgaWQ6IGl0ZW1zWzBdLmlkLFxuICAgICAgICAgICAgZGVzaWduSW5kZXhcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBvblRhcChldnQpIHtcbiAgICAgIGNvbnN0IHsgaWQsIGluZGV4IH0gPSBldnQuY3VycmVudFRhcmdldC5kYXRhc2V0XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB0YWJJbmRleDogaW5kZXhcbiAgICAgIH0pXG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnY2FsbGJhY2snLCB7XG4gICAgICAgIGlkLFxuICAgICAgICBkZXNpZ25JbmRleDogdGhpcy5kYXRhLmRlc2lnbkluZGV4XG4gICAgICB9KVxuICAgIH1cbiAgfVxufSlcbiJdfQ==