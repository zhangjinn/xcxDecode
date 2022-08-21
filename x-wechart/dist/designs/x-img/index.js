'use strict';

var styleBehavior = require('./../behaviors/style.js');
Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    src: '',
    contentStyle: null
  },
  lifetimes: {
    attached: function attached() {
      this.initContentData();
    },
    ready: function ready() {
      var height = this.data.content.data.height;

      var contentStyle = this.getStyles(['margin', 'img']);
      this.setData({
        contentStyle: contentStyle + ';height:' + height * 2 + 'rpx'
      });
    }
  },

  methods: {
    initContentData: function initContentData() {
      var data = this.data.content.data;

      this.setData({
        src: data.src
      });
    },
    onTap: function onTap() {
      var data = this.data.content.data;

      if (data.url) {
        this.navigateAction(data.url);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0eWxlQmVoYXZpb3IiLCJyZXF1aXJlIiwiQ29tcG9uZW50IiwiYmVoYXZpb3JzIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJPYmplY3QiLCJjdXN0b21TdHlsZSIsImRhdGEiLCJzcmMiLCJjb250ZW50U3R5bGUiLCJsaWZldGltZXMiLCJhdHRhY2hlZCIsImluaXRDb250ZW50RGF0YSIsInJlYWR5IiwiaGVpZ2h0IiwiZ2V0U3R5bGVzIiwic2V0RGF0YSIsIm1ldGhvZHMiLCJvblRhcCIsInVybCIsIm5hdmlnYXRlQWN0aW9uIl0sIm1hcHBpbmdzIjoiOztBQUNBLElBQU1BLGdCQUFnQkMsUUFBUSxvQkFBUixDQUF0QjtBQUNBQyxVQUFVO0FBQ1JDLGFBQVcsQ0FBQ0gsYUFBRCxDQURIO0FBRVJJLGNBQVk7QUFDVkMsYUFBU0MsTUFEQztBQUVWQyxpQkFBYUQ7QUFGSCxHQUZKO0FBTVJFLFFBQU07QUFDSkMsU0FBSyxFQUREO0FBRUpDLGtCQUFjO0FBRlYsR0FORTtBQVVSQyxhQUFXO0FBQ1RDLFlBRFMsc0JBQ0U7QUFDVCxXQUFLQyxlQUFMO0FBQ0QsS0FIUTtBQUlUQyxTQUpTLG1CQUlEO0FBQUEsVUFDcUJDLE1BRHJCLEdBQ29DLEtBQUtQLElBRHpDLENBQ0VILE9BREYsQ0FDYUcsSUFEYixDQUNxQk8sTUFEckI7O0FBRU4sVUFBTUwsZUFBZSxLQUFLTSxTQUFMLENBQWUsQ0FBQyxRQUFELEVBQVcsS0FBWCxDQUFmLENBQXJCO0FBQ0EsV0FBS0MsT0FBTCxDQUFhO0FBQ1hQLHNCQUFpQkEsWUFBakIsZ0JBQXdDSyxTQUFTLENBQWpEO0FBRFcsT0FBYjtBQUdEO0FBVlEsR0FWSDs7QUF1QlJHLFdBQVM7QUFDUEwsbUJBRE8sNkJBQ1c7QUFBQSxVQUNHTCxJQURILEdBQ2MsS0FBS0EsSUFEbkIsQ0FDUkgsT0FEUSxDQUNHRyxJQURIOztBQUVoQixXQUFLUyxPQUFMLENBQWE7QUFDWFIsYUFBS0QsS0FBS0M7QUFEQyxPQUFiO0FBR0QsS0FOTTtBQU9QVSxTQVBPLG1CQU9DO0FBQUEsVUFDRVgsSUFERixHQUNXLEtBQUtBLElBQUwsQ0FBVUgsT0FEckIsQ0FDRUcsSUFERjs7QUFFTixVQUFJQSxLQUFLWSxHQUFULEVBQWM7QUFDWixhQUFLQyxjQUFMLENBQW9CYixLQUFLWSxHQUF6QjtBQUNEO0FBQ0Y7QUFaTTtBQXZCRCxDQUFWIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBzdHlsZUJlaGF2aW9yID0gcmVxdWlyZSgnLi4vYmVoYXZpb3JzL3N0eWxlJylcbkNvbXBvbmVudCh7XG4gIGJlaGF2aW9yczogW3N0eWxlQmVoYXZpb3JdLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgY29udGVudDogT2JqZWN0LFxuICAgIGN1c3RvbVN0eWxlOiBPYmplY3RcbiAgfSxcbiAgZGF0YToge1xuICAgIHNyYzogJycsXG4gICAgY29udGVudFN0eWxlOiBudWxsXG4gIH0sXG4gIGxpZmV0aW1lczoge1xuICAgIGF0dGFjaGVkKCkge1xuICAgICAgdGhpcy5pbml0Q29udGVudERhdGEoKVxuICAgIH0sXG4gICAgcmVhZHkoKSB7XG4gICAgICBjb25zdCB7IGNvbnRlbnQ6IHsgZGF0YTogeyBoZWlnaHQgfSB9IH0gPSB0aGlzLmRhdGFcbiAgICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IHRoaXMuZ2V0U3R5bGVzKFsnbWFyZ2luJywgJ2ltZyddKVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgY29udGVudFN0eWxlOiBgJHtjb250ZW50U3R5bGV9O2hlaWdodDoke2hlaWdodCAqIDJ9cnB4YFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGluaXRDb250ZW50RGF0YSgpIHtcbiAgICAgIGNvbnN0IHsgY29udGVudDogeyBkYXRhIH0gfSA9IHRoaXMuZGF0YVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgc3JjOiBkYXRhLnNyY1xuICAgICAgfSlcbiAgICB9LFxuICAgIG9uVGFwKCkge1xuICAgICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzLmRhdGEuY29udGVudFxuICAgICAgaWYgKGRhdGEudXJsKSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGVBY3Rpb24oZGF0YS51cmwpXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl19