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
    coordinates: [],
    contentStyle: null
  },
  lifetimes: {
    attached: function attached() {
      this.initContentData();
    },
    ready: function ready() {
      var data = this.data.content.data;

      var contentStyle = this.getStyles(['margin', 'img']);
      var contentHeight = data.height * 2 || 0;
      this.setData({
        contentStyle: contentStyle + ';height:' + contentHeight + 'rpx'
      });
    }
  },
  methods: {
    transformCoordinatesStyle: function transformCoordinatesStyle(coordinates) {
      if (Array.isArray(coordinates) && coordinates.length) {
        return coordinates.map(function (_ref) {
          var id = _ref.id,
              url = _ref.url,
              width = _ref.width,
              height = _ref.height,
              x = _ref.x,
              y = _ref.y;

          var styles = 'width:' + width * 2 + 'rpx;height:' + height * 2 + 'rpx;left:' + x * 2 + 'rpx;top:' + y * 2 + 'rpx';
          return {
            id: id,
            url: url,
            styles: styles
          };
        });
      }
    },
    initContentData: function initContentData() {
      var data = this.data.content.data;

      var coordinates = this.transformCoordinatesStyle(data.coordinates) || [];
      this.setData({
        src: data.src,
        coordinates: coordinates
      });
    },
    onTap: function onTap(_ref2) {
      var currentTarget = _ref2.currentTarget;
      var index = currentTarget.dataset.index;
      var coordinates = this.data.coordinates;

      var coordinate = coordinates[index];
      if (coordinate && coordinate.url) {
        this.navigateAction(coordinate.url);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0eWxlQmVoYXZpb3IiLCJyZXF1aXJlIiwiQ29tcG9uZW50IiwiYmVoYXZpb3JzIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJPYmplY3QiLCJjdXN0b21TdHlsZSIsImRhdGEiLCJzcmMiLCJjb29yZGluYXRlcyIsImNvbnRlbnRTdHlsZSIsImxpZmV0aW1lcyIsImF0dGFjaGVkIiwiaW5pdENvbnRlbnREYXRhIiwicmVhZHkiLCJnZXRTdHlsZXMiLCJjb250ZW50SGVpZ2h0IiwiaGVpZ2h0Iiwic2V0RGF0YSIsIm1ldGhvZHMiLCJ0cmFuc2Zvcm1Db29yZGluYXRlc1N0eWxlIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwibWFwIiwiaWQiLCJ1cmwiLCJ3aWR0aCIsIngiLCJ5Iiwic3R5bGVzIiwib25UYXAiLCJjdXJyZW50VGFyZ2V0IiwiaW5kZXgiLCJkYXRhc2V0IiwiY29vcmRpbmF0ZSIsIm5hdmlnYXRlQWN0aW9uIl0sIm1hcHBpbmdzIjoiOztBQUNBLElBQU1BLGdCQUFnQkMsUUFBUSxvQkFBUixDQUF0Qjs7QUFFQUMsVUFBVTtBQUNSQyxhQUFXLENBQUNILGFBQUQsQ0FESDtBQUVSSSxjQUFZO0FBQ1ZDLGFBQVNDLE1BREM7QUFFVkMsaUJBQWFEO0FBRkgsR0FGSjtBQU1SRSxRQUFNO0FBQ0pDLFNBQUssRUFERDtBQUVKQyxpQkFBYSxFQUZUO0FBR0pDLGtCQUFjO0FBSFYsR0FORTtBQVdSQyxhQUFXO0FBQ1RDLFlBRFMsc0JBQ0U7QUFDVCxXQUFLQyxlQUFMO0FBQ0QsS0FIUTtBQUlUQyxTQUpTLG1CQUlEO0FBQUEsVUFDYVAsSUFEYixHQUN3QixLQUFLQSxJQUQ3QixDQUNFSCxPQURGLENBQ2FHLElBRGI7O0FBRU4sVUFBTUcsZUFBZSxLQUFLSyxTQUFMLENBQWUsQ0FBQyxRQUFELEVBQVcsS0FBWCxDQUFmLENBQXJCO0FBQ0EsVUFBTUMsZ0JBQWdCVCxLQUFLVSxNQUFMLEdBQWMsQ0FBZCxJQUFtQixDQUF6QztBQUNBLFdBQUtDLE9BQUwsQ0FBYTtBQUNYUixzQkFBaUJBLFlBQWpCLGdCQUF3Q00sYUFBeEM7QUFEVyxPQUFiO0FBR0Q7QUFYUSxHQVhIO0FBd0JSRyxXQUFTO0FBQ1BDLDZCQURPLHFDQUNtQlgsV0FEbkIsRUFDZ0M7QUFDckMsVUFBSVksTUFBTUMsT0FBTixDQUFjYixXQUFkLEtBQThCQSxZQUFZYyxNQUE5QyxFQUFzRDtBQUNwRCxlQUFPZCxZQUFZZSxHQUFaLENBQWdCLGdCQUFzQztBQUFBLGNBQW5DQyxFQUFtQyxRQUFuQ0EsRUFBbUM7QUFBQSxjQUEvQkMsR0FBK0IsUUFBL0JBLEdBQStCO0FBQUEsY0FBMUJDLEtBQTBCLFFBQTFCQSxLQUEwQjtBQUFBLGNBQW5CVixNQUFtQixRQUFuQkEsTUFBbUI7QUFBQSxjQUFYVyxDQUFXLFFBQVhBLENBQVc7QUFBQSxjQUFSQyxDQUFRLFFBQVJBLENBQVE7O0FBQzNELGNBQU1DLG9CQUFrQkgsUUFBUSxDQUExQixtQkFBeUNWLFNBQVMsQ0FBbEQsaUJBQStEVyxJQUFJLENBQW5FLGdCQUErRUMsSUFBSSxDQUFuRixRQUFOO0FBQ0EsaUJBQU87QUFDTEosa0JBREs7QUFFTEMsb0JBRks7QUFHTEk7QUFISyxXQUFQO0FBS0QsU0FQTSxDQUFQO0FBUUQ7QUFDRixLQVpNO0FBYVBqQixtQkFiTyw2QkFhVztBQUFBLFVBQ0dOLElBREgsR0FDYyxLQUFLQSxJQURuQixDQUNSSCxPQURRLENBQ0dHLElBREg7O0FBRWhCLFVBQU1FLGNBQWMsS0FBS1cseUJBQUwsQ0FBK0JiLEtBQUtFLFdBQXBDLEtBQW9ELEVBQXhFO0FBQ0EsV0FBS1MsT0FBTCxDQUFhO0FBQ1hWLGFBQUtELEtBQUtDLEdBREM7QUFFWEM7QUFGVyxPQUFiO0FBSUQsS0FwQk07QUFxQlBzQixTQXJCTyx3QkFxQmtCO0FBQUEsVUFBakJDLGFBQWlCLFNBQWpCQSxhQUFpQjtBQUFBLFVBQ2ZDLEtBRGUsR0FDTEQsY0FBY0UsT0FEVCxDQUNmRCxLQURlO0FBQUEsVUFFZnhCLFdBRmUsR0FFQyxLQUFLRixJQUZOLENBRWZFLFdBRmU7O0FBR3ZCLFVBQU0wQixhQUFhMUIsWUFBWXdCLEtBQVosQ0FBbkI7QUFDQSxVQUFJRSxjQUFjQSxXQUFXVCxHQUE3QixFQUFrQztBQUNoQyxhQUFLVSxjQUFMLENBQW9CRCxXQUFXVCxHQUEvQjtBQUNEO0FBQ0Y7QUE1Qk07QUF4QkQsQ0FBViIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3Qgc3R5bGVCZWhhdmlvciA9IHJlcXVpcmUoJy4uL2JlaGF2aW9ycy9zdHlsZScpXG5cbkNvbXBvbmVudCh7XG4gIGJlaGF2aW9yczogW3N0eWxlQmVoYXZpb3JdLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgY29udGVudDogT2JqZWN0LFxuICAgIGN1c3RvbVN0eWxlOiBPYmplY3RcbiAgfSxcbiAgZGF0YToge1xuICAgIHNyYzogJycsXG4gICAgY29vcmRpbmF0ZXM6IFtdLFxuICAgIGNvbnRlbnRTdHlsZTogbnVsbFxuICB9LFxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpIHtcbiAgICAgIHRoaXMuaW5pdENvbnRlbnREYXRhKClcbiAgICB9LFxuICAgIHJlYWR5KCkge1xuICAgICAgY29uc3QgeyBjb250ZW50OiB7IGRhdGEgfSB9ID0gdGhpcy5kYXRhXG4gICAgICBjb25zdCBjb250ZW50U3R5bGUgPSB0aGlzLmdldFN0eWxlcyhbJ21hcmdpbicsICdpbWcnXSlcbiAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSBkYXRhLmhlaWdodCAqIDIgfHwgMFxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgY29udGVudFN0eWxlOiBgJHtjb250ZW50U3R5bGV9O2hlaWdodDoke2NvbnRlbnRIZWlnaHR9cnB4YFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB0cmFuc2Zvcm1Db29yZGluYXRlc1N0eWxlKGNvb3JkaW5hdGVzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb29yZGluYXRlcykgJiYgY29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBjb29yZGluYXRlcy5tYXAoKHsgaWQsIHVybCwgd2lkdGgsIGhlaWdodCwgeCwgeSB9KSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVzID0gYHdpZHRoOiR7d2lkdGggKiAyfXJweDtoZWlnaHQ6JHtoZWlnaHQgKiAyfXJweDtsZWZ0OiR7eCAqIDJ9cnB4O3RvcDoke3kgKiAyfXJweGBcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBzdHlsZXNcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBpbml0Q29udGVudERhdGEoKSB7XG4gICAgICBjb25zdCB7IGNvbnRlbnQ6IHsgZGF0YSB9IH0gPSB0aGlzLmRhdGFcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy50cmFuc2Zvcm1Db29yZGluYXRlc1N0eWxlKGRhdGEuY29vcmRpbmF0ZXMpIHx8IFtdXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBzcmM6IGRhdGEuc3JjLFxuICAgICAgICBjb29yZGluYXRlc1xuICAgICAgfSlcbiAgICB9LFxuICAgIG9uVGFwKHsgY3VycmVudFRhcmdldCB9KSB7XG4gICAgICBjb25zdCB7IGluZGV4IH0gPSBjdXJyZW50VGFyZ2V0LmRhdGFzZXRcbiAgICAgIGNvbnN0IHsgY29vcmRpbmF0ZXMgfSA9IHRoaXMuZGF0YVxuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGVzW2luZGV4XVxuICAgICAgaWYgKGNvb3JkaW5hdGUgJiYgY29vcmRpbmF0ZS51cmwpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZUFjdGlvbihjb29yZGluYXRlLnVybClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iXX0=