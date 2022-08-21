'use strict';

var styleBehavior = require('./../behaviors/style.js');

Component({
  behaviors: [styleBehavior],
  properties: {
    content: Object,
    customStyle: Object
  },
  data: {
    title: '',
    url: '',
    moreSwitch: true,
    contentStyle: null
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
      var title = data.title,
          url = data.url,
          _data$moreSwitch = data.moreSwitch,
          moreSwitch = _data$moreSwitch === undefined ? true : _data$moreSwitch;

      this.setData({
        title: title,
        url: url,
        moreSwitch: moreSwitch
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0eWxlQmVoYXZpb3IiLCJyZXF1aXJlIiwiQ29tcG9uZW50IiwiYmVoYXZpb3JzIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJPYmplY3QiLCJjdXN0b21TdHlsZSIsImRhdGEiLCJ0aXRsZSIsInVybCIsIm1vcmVTd2l0Y2giLCJjb250ZW50U3R5bGUiLCJsaWZldGltZXMiLCJhdHRhY2hlZCIsImluaXRDb250ZW50RGF0YSIsInJlYWR5IiwiZ2V0U3R5bGVzIiwic2V0RGF0YSIsIm1ldGhvZHMiLCJvblRhcCIsIm5hdmlnYXRlQWN0aW9uIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLGdCQUFnQkMsUUFBUSxvQkFBUixDQUF0Qjs7QUFFQUMsVUFBVTtBQUNSQyxhQUFXLENBQUNILGFBQUQsQ0FESDtBQUVSSSxjQUFZO0FBQ1ZDLGFBQVNDLE1BREM7QUFFVkMsaUJBQWFEO0FBRkgsR0FGSjtBQU1SRSxRQUFNO0FBQ0pDLFdBQU8sRUFESDtBQUVKQyxTQUFLLEVBRkQ7QUFHSkMsZ0JBQVksSUFIUjtBQUlKQyxrQkFBYztBQUpWLEdBTkU7QUFZUkMsYUFBVztBQUNUQyxZQURTLHNCQUNFO0FBQ1QsV0FBS0MsZUFBTDtBQUNELEtBSFE7QUFJVEMsU0FKUyxtQkFJRDtBQUNOLFVBQU1KLGVBQWUsS0FBS0ssU0FBTCxDQUFlLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FBZixDQUFyQjtBQUNBLFdBQUtDLE9BQUwsQ0FBYTtBQUNYTjtBQURXLE9BQWI7QUFHRDtBQVRRLEdBWkg7QUF1QlJPLFdBQVM7QUFDUEosbUJBRE8sNkJBQ1c7QUFBQSxVQUNHUCxJQURILEdBQ2MsS0FBS0EsSUFEbkIsQ0FDUkgsT0FEUSxDQUNHRyxJQURIO0FBQUEsVUFFUkMsS0FGUSxHQUUwQkQsSUFGMUIsQ0FFUkMsS0FGUTtBQUFBLFVBRURDLEdBRkMsR0FFMEJGLElBRjFCLENBRURFLEdBRkM7QUFBQSw2QkFFMEJGLElBRjFCLENBRUlHLFVBRko7QUFBQSxVQUVJQSxVQUZKLG9DQUVpQixJQUZqQjs7QUFHaEIsV0FBS08sT0FBTCxDQUFhO0FBQ1hULG9CQURXO0FBRVhDLGdCQUZXO0FBR1hDO0FBSFcsT0FBYjtBQUtELEtBVE07QUFVUFMsU0FWTyxtQkFVQztBQUFBLFVBQ0VaLElBREYsR0FDVyxLQUFLQSxJQUFMLENBQVVILE9BRHJCLENBQ0VHLElBREY7O0FBRU4sVUFBSUEsS0FBS0UsR0FBVCxFQUFjO0FBQ1osYUFBS1csY0FBTCxDQUFvQmIsS0FBS0UsR0FBekI7QUFDRDtBQUNGO0FBZk07QUF2QkQsQ0FBViIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0eWxlQmVoYXZpb3IgPSByZXF1aXJlKCcuLi9iZWhhdmlvcnMvc3R5bGUnKVxuXG5Db21wb25lbnQoe1xuICBiZWhhdmlvcnM6IFtzdHlsZUJlaGF2aW9yXSxcbiAgcHJvcGVydGllczoge1xuICAgIGNvbnRlbnQ6IE9iamVjdCxcbiAgICBjdXN0b21TdHlsZTogT2JqZWN0XG4gIH0sXG4gIGRhdGE6IHtcbiAgICB0aXRsZTogJycsXG4gICAgdXJsOiAnJyxcbiAgICBtb3JlU3dpdGNoOiB0cnVlLFxuICAgIGNvbnRlbnRTdHlsZTogbnVsbFxuICB9LFxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpIHtcbiAgICAgIHRoaXMuaW5pdENvbnRlbnREYXRhKClcbiAgICB9LFxuICAgIHJlYWR5KCkge1xuICAgICAgY29uc3QgY29udGVudFN0eWxlID0gdGhpcy5nZXRTdHlsZXMoWyd0aXRsZScsICdtYXJnaW4nXSlcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNvbnRlbnRTdHlsZVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbml0Q29udGVudERhdGEoKSB7XG4gICAgICBjb25zdCB7IGNvbnRlbnQ6IHsgZGF0YSB9IH0gPSB0aGlzLmRhdGFcbiAgICAgIGNvbnN0IHsgdGl0bGUsIHVybCwgbW9yZVN3aXRjaCA9IHRydWUgfSA9IGRhdGFcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICB1cmwsXG4gICAgICAgIG1vcmVTd2l0Y2hcbiAgICAgIH0pXG4gICAgfSxcbiAgICBvblRhcCgpIHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcy5kYXRhLmNvbnRlbnRcbiAgICAgIGlmIChkYXRhLnVybCkge1xuICAgICAgICB0aGlzLm5hdmlnYXRlQWN0aW9uKGRhdGEudXJsKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdfQ==