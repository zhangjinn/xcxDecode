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
    lateralSwitch: true
  },
  lifetimes: {
    attached: function attached() {
      this.initContentData();
    },
    ready: function ready() {
      var contentStyle = this.getStyles(['title', 'margin']);
      this.setData({
        contentStyle: contentStyle
      });
    }
  },
  methods: {
    initContentData: function initContentData() {
      var data = this.data.content.data;
      var items = data.items,
          lateralSwitch = data.lateralSwitch;

      this.setData({
        items: items,
        lateralSwitch: lateralSwitch
      });
    },
    onTap: function onTap(_ref) {
      var currentTarget = _ref.currentTarget;
      var index = currentTarget.dataset.index;
      var items = this.data.items;
      var url = items[index].url;

      if (url) {
        this.navigateAction(url);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0eWxlQmVoYXZpb3IiLCJyZXF1aXJlIiwiQ29tcG9uZW50IiwiYmVoYXZpb3JzIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJPYmplY3QiLCJjdXN0b21TdHlsZSIsImRhdGEiLCJpdGVtcyIsImxhdGVyYWxTd2l0Y2giLCJsaWZldGltZXMiLCJhdHRhY2hlZCIsImluaXRDb250ZW50RGF0YSIsInJlYWR5IiwiY29udGVudFN0eWxlIiwiZ2V0U3R5bGVzIiwic2V0RGF0YSIsIm1ldGhvZHMiLCJvblRhcCIsImN1cnJlbnRUYXJnZXQiLCJpbmRleCIsImRhdGFzZXQiLCJ1cmwiLCJuYXZpZ2F0ZUFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxnQkFBZ0JDLFFBQVEsb0JBQVIsQ0FBdEI7O0FBRUFDLFVBQVU7QUFDUkMsYUFBVyxDQUFDSCxhQUFELENBREg7QUFFUkksY0FBWTtBQUNWQyxhQUFTQyxNQURDO0FBRVZDLGlCQUFhRDtBQUZILEdBRko7QUFNUkUsUUFBTTtBQUNKQyxXQUFPLEVBREg7QUFFSkMsbUJBQWU7QUFGWCxHQU5FO0FBVVJDLGFBQVc7QUFDVEMsWUFEUyxzQkFDRTtBQUNULFdBQUtDLGVBQUw7QUFDRCxLQUhRO0FBSVRDLFNBSlMsbUJBSUQ7QUFDTixVQUFNQyxlQUFlLEtBQUtDLFNBQUwsQ0FBZSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBQWYsQ0FBckI7QUFDQSxXQUFLQyxPQUFMLENBQWE7QUFDWEY7QUFEVyxPQUFiO0FBR0Q7QUFUUSxHQVZIO0FBcUJSRyxXQUFTO0FBQ1BMLG1CQURPLDZCQUNXO0FBQUEsVUFDR0wsSUFESCxHQUNjLEtBQUtBLElBRG5CLENBQ1JILE9BRFEsQ0FDR0csSUFESDtBQUFBLFVBRVJDLEtBRlEsR0FFaUJELElBRmpCLENBRVJDLEtBRlE7QUFBQSxVQUVEQyxhQUZDLEdBRWlCRixJQUZqQixDQUVERSxhQUZDOztBQUdoQixXQUFLTyxPQUFMLENBQWE7QUFDWFIsb0JBRFc7QUFFWEM7QUFGVyxPQUFiO0FBSUQsS0FSTTtBQVNQUyxTQVRPLHVCQVNrQjtBQUFBLFVBQWpCQyxhQUFpQixRQUFqQkEsYUFBaUI7QUFBQSxVQUNmQyxLQURlLEdBQ0xELGNBQWNFLE9BRFQsQ0FDZkQsS0FEZTtBQUFBLFVBRWZaLEtBRmUsR0FFTCxLQUFLRCxJQUZBLENBRWZDLEtBRmU7QUFBQSxVQUdmYyxHQUhlLEdBR1BkLE1BQU1ZLEtBQU4sQ0FITyxDQUdmRSxHQUhlOztBQUl2QixVQUFJQSxHQUFKLEVBQVM7QUFDUCxhQUFLQyxjQUFMLENBQW9CRCxHQUFwQjtBQUNEO0FBQ0Y7QUFoQk07QUFyQkQsQ0FBViIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0eWxlQmVoYXZpb3IgPSByZXF1aXJlKCcuLi9iZWhhdmlvcnMvc3R5bGUnKVxuXG5Db21wb25lbnQoe1xuICBiZWhhdmlvcnM6IFtzdHlsZUJlaGF2aW9yXSxcbiAgcHJvcGVydGllczoge1xuICAgIGNvbnRlbnQ6IE9iamVjdCxcbiAgICBjdXN0b21TdHlsZTogT2JqZWN0XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBpdGVtczogW10sXG4gICAgbGF0ZXJhbFN3aXRjaDogdHJ1ZVxuICB9LFxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpIHtcbiAgICAgIHRoaXMuaW5pdENvbnRlbnREYXRhKClcbiAgICB9LFxuICAgIHJlYWR5KCkge1xuICAgICAgY29uc3QgY29udGVudFN0eWxlID0gdGhpcy5nZXRTdHlsZXMoWyd0aXRsZScsICdtYXJnaW4nXSlcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNvbnRlbnRTdHlsZVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbml0Q29udGVudERhdGEoKSB7XG4gICAgICBjb25zdCB7IGNvbnRlbnQ6IHsgZGF0YSB9IH0gPSB0aGlzLmRhdGFcbiAgICAgIGNvbnN0IHsgaXRlbXMsIGxhdGVyYWxTd2l0Y2ggfSA9IGRhdGFcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGl0ZW1zLFxuICAgICAgICBsYXRlcmFsU3dpdGNoXG4gICAgICB9KVxuICAgIH0sXG4gICAgb25UYXAoeyBjdXJyZW50VGFyZ2V0IH0pIHtcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IGN1cnJlbnRUYXJnZXQuZGF0YXNldFxuICAgICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcy5kYXRhXG4gICAgICBjb25zdCB7IHVybCB9ID0gaXRlbXNbaW5kZXhdXG4gICAgICBpZiAodXJsKSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGVBY3Rpb24odXJsKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdfQ==