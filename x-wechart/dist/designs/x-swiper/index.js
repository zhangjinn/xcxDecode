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
    interval: 3000,
    contentStyle: null,
    swiperItemStyle: null
  },
  lifetimes: {
    attached: function attached() {
      this.initContentData();
    },
    ready: function ready() {
      var contentStyle = this.getStyles(['img', 'margin']);
      var swiperItemStyle = this.getStyles(['img']);
      this.setData({
        contentStyle: contentStyle,
        swiperItemStyle: swiperItemStyle
      });
    }
  },
  methods: {
    initContentData: function initContentData() {
      var data = this.data.content.data;

      var items = this.transformSwiperItems(data.items);
      this.setData({
        items: items,
        interval: data.interval
      });
    },
    transformSwiperItems: function transformSwiperItems(items) {
      if (Array.isArray(items) && items.length) {
        return items.map(function (_ref) {
          var key = _ref.key,
              src = _ref.src,
              url = _ref.url;

          return {
            key: key,
            url: url,
            src: src
          };
        });
      }
    },
    onTap: function onTap(_ref2) {
      var currentTarget = _ref2.currentTarget;
      var index = currentTarget.dataset.index;
      var items = this.data.items;

      var item = items[index];
      if (item && item.url) {
        this.navigateAction(item.url);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0eWxlQmVoYXZpb3IiLCJyZXF1aXJlIiwiQ29tcG9uZW50IiwiYmVoYXZpb3JzIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJPYmplY3QiLCJjdXN0b21TdHlsZSIsImRhdGEiLCJpdGVtcyIsImludGVydmFsIiwiY29udGVudFN0eWxlIiwic3dpcGVySXRlbVN0eWxlIiwibGlmZXRpbWVzIiwiYXR0YWNoZWQiLCJpbml0Q29udGVudERhdGEiLCJyZWFkeSIsImdldFN0eWxlcyIsInNldERhdGEiLCJtZXRob2RzIiwidHJhbnNmb3JtU3dpcGVySXRlbXMiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJtYXAiLCJrZXkiLCJzcmMiLCJ1cmwiLCJvblRhcCIsImN1cnJlbnRUYXJnZXQiLCJpbmRleCIsImRhdGFzZXQiLCJpdGVtIiwibmF2aWdhdGVBY3Rpb24iXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBTUEsZ0JBQWdCQyxRQUFRLG9CQUFSLENBQXRCOztBQUVBQyxVQUFVO0FBQ1JDLGFBQVcsQ0FBQ0gsYUFBRCxDQURIO0FBRVJJLGNBQVk7QUFDVkMsYUFBU0MsTUFEQztBQUVWQyxpQkFBYUQ7QUFGSCxHQUZKO0FBTVJFLFFBQU07QUFDSkMsV0FBTyxFQURIO0FBRUpDLGNBQVUsSUFGTjtBQUdKQyxrQkFBYyxJQUhWO0FBSUpDLHFCQUFpQjtBQUpiLEdBTkU7QUFZUkMsYUFBVztBQUNUQyxZQURTLHNCQUNFO0FBQ1QsV0FBS0MsZUFBTDtBQUNELEtBSFE7QUFJVEMsU0FKUyxtQkFJRDtBQUNOLFVBQU1MLGVBQWUsS0FBS00sU0FBTCxDQUFlLENBQUMsS0FBRCxFQUFRLFFBQVIsQ0FBZixDQUFyQjtBQUNBLFVBQU1MLGtCQUFrQixLQUFLSyxTQUFMLENBQWUsQ0FBQyxLQUFELENBQWYsQ0FBeEI7QUFDQSxXQUFLQyxPQUFMLENBQWE7QUFDWFAsa0NBRFc7QUFFWEM7QUFGVyxPQUFiO0FBSUQ7QUFYUSxHQVpIO0FBeUJSTyxXQUFTO0FBQ1BKLG1CQURPLDZCQUNXO0FBQUEsVUFDR1AsSUFESCxHQUNjLEtBQUtBLElBRG5CLENBQ1JILE9BRFEsQ0FDR0csSUFESDs7QUFFaEIsVUFBTUMsUUFBUSxLQUFLVyxvQkFBTCxDQUEwQlosS0FBS0MsS0FBL0IsQ0FBZDtBQUNBLFdBQUtTLE9BQUwsQ0FBYTtBQUNYVCxvQkFEVztBQUVYQyxrQkFBVUYsS0FBS0U7QUFGSixPQUFiO0FBSUQsS0FSTTtBQVNQVSx3QkFUTyxnQ0FTY1gsS0FUZCxFQVNxQjtBQUMxQixVQUFJWSxNQUFNQyxPQUFOLENBQWNiLEtBQWQsS0FBd0JBLE1BQU1jLE1BQWxDLEVBQTBDO0FBQ3hDLGVBQU9kLE1BQU1lLEdBQU4sQ0FBVSxnQkFBdUI7QUFBQSxjQUFwQkMsR0FBb0IsUUFBcEJBLEdBQW9CO0FBQUEsY0FBZkMsR0FBZSxRQUFmQSxHQUFlO0FBQUEsY0FBVkMsR0FBVSxRQUFWQSxHQUFVOztBQUN0QyxpQkFBTztBQUNMRixvQkFESztBQUVMRSxvQkFGSztBQUdMRDtBQUhLLFdBQVA7QUFLRCxTQU5NLENBQVA7QUFPRDtBQUNGLEtBbkJNO0FBb0JQRSxTQXBCTyx3QkFvQmtCO0FBQUEsVUFBakJDLGFBQWlCLFNBQWpCQSxhQUFpQjtBQUFBLFVBQ2ZDLEtBRGUsR0FDTEQsY0FBY0UsT0FEVCxDQUNmRCxLQURlO0FBQUEsVUFFZnJCLEtBRmUsR0FFTCxLQUFLRCxJQUZBLENBRWZDLEtBRmU7O0FBR3ZCLFVBQU11QixPQUFPdkIsTUFBTXFCLEtBQU4sQ0FBYjtBQUNBLFVBQUlFLFFBQVFBLEtBQUtMLEdBQWpCLEVBQXNCO0FBQ3BCLGFBQUtNLGNBQUwsQ0FBb0JELEtBQUtMLEdBQXpCO0FBQ0Q7QUFDRjtBQTNCTTtBQXpCRCxDQUFWIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBzdHlsZUJlaGF2aW9yID0gcmVxdWlyZSgnLi4vYmVoYXZpb3JzL3N0eWxlJylcblxuQ29tcG9uZW50KHtcbiAgYmVoYXZpb3JzOiBbc3R5bGVCZWhhdmlvcl0sXG4gIHByb3BlcnRpZXM6IHtcbiAgICBjb250ZW50OiBPYmplY3QsXG4gICAgY3VzdG9tU3R5bGU6IE9iamVjdFxuICB9LFxuICBkYXRhOiB7XG4gICAgaXRlbXM6IFtdLFxuICAgIGludGVydmFsOiAzMDAwLFxuICAgIGNvbnRlbnRTdHlsZTogbnVsbCxcbiAgICBzd2lwZXJJdGVtU3R5bGU6IG51bGxcbiAgfSxcbiAgbGlmZXRpbWVzOiB7XG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICB0aGlzLmluaXRDb250ZW50RGF0YSgpXG4gICAgfSxcbiAgICByZWFkeSgpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IHRoaXMuZ2V0U3R5bGVzKFsnaW1nJywgJ21hcmdpbiddKVxuICAgICAgY29uc3Qgc3dpcGVySXRlbVN0eWxlID0gdGhpcy5nZXRTdHlsZXMoWydpbWcnXSlcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNvbnRlbnRTdHlsZSxcbiAgICAgICAgc3dpcGVySXRlbVN0eWxlXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGluaXRDb250ZW50RGF0YSgpIHtcbiAgICAgIGNvbnN0IHsgY29udGVudDogeyBkYXRhIH0gfSA9IHRoaXMuZGF0YVxuICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLnRyYW5zZm9ybVN3aXBlckl0ZW1zKGRhdGEuaXRlbXMpXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBpdGVtcyxcbiAgICAgICAgaW50ZXJ2YWw6IGRhdGEuaW50ZXJ2YWxcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0cmFuc2Zvcm1Td2lwZXJJdGVtcyhpdGVtcykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbXMpICYmIGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gaXRlbXMubWFwKCh7IGtleSwgc3JjLCB1cmwgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBzcmNcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBvblRhcCh7IGN1cnJlbnRUYXJnZXQgfSkge1xuICAgICAgY29uc3QgeyBpbmRleCB9ID0gY3VycmVudFRhcmdldC5kYXRhc2V0XG4gICAgICBjb25zdCB7IGl0ZW1zIH0gPSB0aGlzLmRhdGFcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF1cbiAgICAgIGlmIChpdGVtICYmIGl0ZW0udXJsKSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGVBY3Rpb24oaXRlbS51cmwpXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl19