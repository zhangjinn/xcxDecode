'use strict';

var styleBehavior = require('./../behaviors/style.js');

Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    items: [],
    moreImg: '',
    display: [],
    contentStyle: null
  },
  observers: {
    'content': function content(value) {
      this.initContentData();
    }
  },
  lifetimes: {
    attached: function attached() {
      this.initContentData();
    },
    ready: function ready() {
      var contentStyle = this.getStyles(['margin']);
      this.setData({
        contentStyle: contentStyle
      });
    }
  },
  methods: {
    initContentData: function initContentData() {
      var _data$content$data = this.data.content.data,
          items = _data$content$data.items,
          moreImg = _data$content$data.moreImg,
          display = _data$content$data.display;

      var goodsArr = items.map(function (item) {
        item.src = item.src;
        return item;
      });
      this.setData({
        moreImg: moreImg,
        display: display,
        items: goodsArr
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0eWxlQmVoYXZpb3IiLCJyZXF1aXJlIiwiQ29tcG9uZW50IiwiYmVoYXZpb3JzIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJPYmplY3QiLCJjdXN0b21TdHlsZSIsImRhdGEiLCJpdGVtcyIsIm1vcmVJbWciLCJkaXNwbGF5IiwiY29udGVudFN0eWxlIiwib2JzZXJ2ZXJzIiwidmFsdWUiLCJpbml0Q29udGVudERhdGEiLCJsaWZldGltZXMiLCJhdHRhY2hlZCIsInJlYWR5IiwiZ2V0U3R5bGVzIiwic2V0RGF0YSIsIm1ldGhvZHMiLCJnb29kc0FyciIsIm1hcCIsIml0ZW0iLCJzcmMiLCJvblRhcCIsInVybCIsIm5hdmlnYXRlQWN0aW9uIl0sIm1hcHBpbmdzIjoiOztBQUNBLElBQU1BLGdCQUFnQkMsUUFBUSxvQkFBUixDQUF0Qjs7QUFFQUMsVUFBVTtBQUNSQyxhQUFXLENBQUNILGFBQUQsQ0FESDtBQUVSSSxjQUFZO0FBQ1ZDLGFBQVNDLE1BREM7QUFFVkMsaUJBQWFEO0FBRkgsR0FGSjtBQU1SRSxRQUFNO0FBQ0pDLFdBQU8sRUFESDtBQUVKQyxhQUFTLEVBRkw7QUFHSkMsYUFBUyxFQUhMO0FBSUpDLGtCQUFjO0FBSlYsR0FORTtBQVlSQyxhQUFXO0FBQ1QsZUFBVyxpQkFBU0MsS0FBVCxFQUFnQjtBQUN6QixXQUFLQyxlQUFMO0FBQ0Q7QUFIUSxHQVpIO0FBaUJSQyxhQUFXO0FBQ1RDLFlBRFMsc0JBQ0U7QUFDVCxXQUFLRixlQUFMO0FBQ0QsS0FIUTtBQUlURyxTQUpTLG1CQUlEO0FBQ04sVUFBTU4sZUFBZSxLQUFLTyxTQUFMLENBQWUsQ0FBQyxRQUFELENBQWYsQ0FBckI7QUFDQSxXQUFLQyxPQUFMLENBQWE7QUFDWFI7QUFEVyxPQUFiO0FBR0Q7QUFUUSxHQWpCSDtBQTRCUlMsV0FBUztBQUNQTixtQkFETyw2QkFDVztBQUFBLCtCQUMyQyxLQUFLUCxJQURoRCxDQUNSSCxPQURRLENBQ0dHLElBREg7QUFBQSxVQUNXQyxLQURYLHNCQUNXQSxLQURYO0FBQUEsVUFDa0JDLE9BRGxCLHNCQUNrQkEsT0FEbEI7QUFBQSxVQUMyQkMsT0FEM0Isc0JBQzJCQSxPQUQzQjs7QUFFaEIsVUFBTVcsV0FBV2IsTUFBTWMsR0FBTixDQUFVLFVBQUNDLElBQUQsRUFBVTtBQUNuQ0EsYUFBS0MsR0FBTCxHQUFXRCxLQUFLQyxHQUFoQjtBQUNBLGVBQU9ELElBQVA7QUFDRCxPQUhnQixDQUFqQjtBQUlBLFdBQUtKLE9BQUwsQ0FBYTtBQUNYVix3QkFEVztBQUVYQyx3QkFGVztBQUdYRixlQUFPYTtBQUhJLE9BQWI7QUFLRCxLQVpNO0FBYVBJLFNBYk8sbUJBYUM7QUFBQSxVQUNFbEIsSUFERixHQUNXLEtBQUtBLElBQUwsQ0FBVUgsT0FEckIsQ0FDRUcsSUFERjs7QUFFTixVQUFJQSxLQUFLbUIsR0FBVCxFQUFjO0FBQ1osYUFBS0MsY0FBTCxDQUFvQnBCLEtBQUttQixHQUF6QjtBQUNEO0FBQ0Y7QUFsQk07QUE1QkQsQ0FBViIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3Qgc3R5bGVCZWhhdmlvciA9IHJlcXVpcmUoJy4uL2JlaGF2aW9ycy9zdHlsZScpXG5cbkNvbXBvbmVudCh7XG4gIGJlaGF2aW9yczogW3N0eWxlQmVoYXZpb3JdLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgY29udGVudDogT2JqZWN0LFxuICAgIGN1c3RvbVN0eWxlOiBPYmplY3RcbiAgfSxcbiAgZGF0YToge1xuICAgIGl0ZW1zOiBbXSxcbiAgICBtb3JlSW1nOiAnJyxcbiAgICBkaXNwbGF5OiBbXSxcbiAgICBjb250ZW50U3R5bGU6IG51bGxcbiAgfSxcbiAgb2JzZXJ2ZXJzOiB7XG4gICAgJ2NvbnRlbnQnOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdGhpcy5pbml0Q29udGVudERhdGEoKVxuICAgIH1cbiAgfSxcbiAgbGlmZXRpbWVzOiB7XG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICB0aGlzLmluaXRDb250ZW50RGF0YSgpXG4gICAgfSxcbiAgICByZWFkeSgpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IHRoaXMuZ2V0U3R5bGVzKFsnbWFyZ2luJ10pXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBjb250ZW50U3R5bGVcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaW5pdENvbnRlbnREYXRhKCkge1xuICAgICAgY29uc3QgeyBjb250ZW50OiB7IGRhdGE6IHsgaXRlbXMsIG1vcmVJbWcsIGRpc3BsYXkgfSB9IH0gPSB0aGlzLmRhdGFcbiAgICAgIGNvbnN0IGdvb2RzQXJyID0gaXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uc3JjID0gaXRlbS5zcmNcbiAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgIH0pXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBtb3JlSW1nLFxuICAgICAgICBkaXNwbGF5LFxuICAgICAgICBpdGVtczogZ29vZHNBcnJcbiAgICAgIH0pXG4gICAgfSxcbiAgICBvblRhcCgpIHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5kYXRhLmNvbnRlbnRcbiAgICAgIGlmIChkYXRhLnVybCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRlQWN0aW9uKGRhdGEudXJsKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdfQ==