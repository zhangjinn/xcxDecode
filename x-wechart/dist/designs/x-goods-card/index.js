'use strict';

var styleBehavior = require('./../behaviors/style.js');

Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    type: 'full',
    items: [],
    buyButton: true,
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
          type = _data$content$data.type,
          buyButton = _data$content$data.buyButton,
          items = _data$content$data.items;

      var goodsArr = items.map(function (item) {
        return item;
      });
      this.setData({
        type: type,
        buyButton: buyButton,
        items: goodsArr
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0eWxlQmVoYXZpb3IiLCJyZXF1aXJlIiwiQ29tcG9uZW50IiwiYmVoYXZpb3JzIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJPYmplY3QiLCJjdXN0b21TdHlsZSIsImRhdGEiLCJ0eXBlIiwiaXRlbXMiLCJidXlCdXR0b24iLCJjb250ZW50U3R5bGUiLCJvYnNlcnZlcnMiLCJ2YWx1ZSIsImluaXRDb250ZW50RGF0YSIsImxpZmV0aW1lcyIsImF0dGFjaGVkIiwicmVhZHkiLCJnZXRTdHlsZXMiLCJzZXREYXRhIiwibWV0aG9kcyIsImdvb2RzQXJyIiwibWFwIiwiaXRlbSJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFNQSxnQkFBZ0JDLFFBQVEsb0JBQVIsQ0FBdEI7O0FBRUFDLFVBQVU7QUFDUkMsYUFBVyxDQUFDSCxhQUFELENBREg7QUFFUkksY0FBWTtBQUNWQyxhQUFTQyxNQURDO0FBRVZDLGlCQUFhRDtBQUZILEdBRko7QUFNUkUsUUFBTTtBQUNKQyxVQUFNLE1BREY7QUFFSkMsV0FBTyxFQUZIO0FBR0pDLGVBQVcsSUFIUDtBQUlKQyxrQkFBYztBQUpWLEdBTkU7QUFZUkMsYUFBVztBQUNULGVBQVcsaUJBQVVDLEtBQVYsRUFBaUI7QUFDMUIsV0FBS0MsZUFBTDtBQUNEO0FBSFEsR0FaSDtBQWlCUkMsYUFBVztBQUNUQyxZQURTLHNCQUNFO0FBQ1QsV0FBS0YsZUFBTDtBQUNELEtBSFE7QUFJVEcsU0FKUyxtQkFJRDtBQUNOLFVBQU1OLGVBQWUsS0FBS08sU0FBTCxDQUFlLENBQUMsUUFBRCxDQUFmLENBQXJCO0FBQ0EsV0FBS0MsT0FBTCxDQUFhO0FBQ1hSO0FBRFcsT0FBYjtBQUdEO0FBVFEsR0FqQkg7QUE0QlJTLFdBQVM7QUFDUE4sbUJBRE8sNkJBQ1c7QUFBQSwrQkFDMEMsS0FBS1AsSUFEL0MsQ0FDUkgsT0FEUSxDQUNHRyxJQURIO0FBQUEsVUFDV0MsSUFEWCxzQkFDV0EsSUFEWDtBQUFBLFVBQ2lCRSxTQURqQixzQkFDaUJBLFNBRGpCO0FBQUEsVUFDNEJELEtBRDVCLHNCQUM0QkEsS0FENUI7O0FBRWhCLFVBQU1ZLFdBQVdaLE1BQU1hLEdBQU4sQ0FBVSxVQUFDQyxJQUFELEVBQVU7QUFDbkMsZUFBT0EsSUFBUDtBQUNELE9BRmdCLENBQWpCO0FBR0EsV0FBS0osT0FBTCxDQUFhO0FBQ1hYLGtCQURXO0FBRVhFLDRCQUZXO0FBR1hELGVBQU9ZO0FBSEksT0FBYjtBQUtEO0FBWE07QUE1QkQsQ0FBViIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3Qgc3R5bGVCZWhhdmlvciA9IHJlcXVpcmUoJy4uL2JlaGF2aW9ycy9zdHlsZScpXG5cbkNvbXBvbmVudCh7XG4gIGJlaGF2aW9yczogW3N0eWxlQmVoYXZpb3JdLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgY29udGVudDogT2JqZWN0LFxuICAgIGN1c3RvbVN0eWxlOiBPYmplY3RcbiAgfSxcbiAgZGF0YToge1xuICAgIHR5cGU6ICdmdWxsJyxcbiAgICBpdGVtczogW10sXG4gICAgYnV5QnV0dG9uOiB0cnVlLFxuICAgIGNvbnRlbnRTdHlsZTogbnVsbFxuICB9LFxuICBvYnNlcnZlcnM6IHtcbiAgICAnY29udGVudCc6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdGhpcy5pbml0Q29udGVudERhdGEoKVxuICAgIH1cbiAgfSxcbiAgbGlmZXRpbWVzOiB7XG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICB0aGlzLmluaXRDb250ZW50RGF0YSgpXG4gICAgfSxcbiAgICByZWFkeSgpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IHRoaXMuZ2V0U3R5bGVzKFsnbWFyZ2luJ10pXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBjb250ZW50U3R5bGVcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaW5pdENvbnRlbnREYXRhKCkge1xuICAgICAgY29uc3QgeyBjb250ZW50OiB7IGRhdGE6IHsgdHlwZSwgYnV5QnV0dG9uLCBpdGVtcyB9IH0gfSA9IHRoaXMuZGF0YVxuICAgICAgY29uc3QgZ29vZHNBcnIgPSBpdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgIH0pXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB0eXBlLFxuICAgICAgICBidXlCdXR0b24sXG4gICAgICAgIGl0ZW1zOiBnb29kc0FyclxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pXG4iXX0=