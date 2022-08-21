'use strict';

var styleBehavior = require('./../behaviors/style.js');

Component({
  externalClasses: ['i-class'],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0eWxlQmVoYXZpb3IiLCJyZXF1aXJlIiwiQ29tcG9uZW50IiwiZXh0ZXJuYWxDbGFzc2VzIiwiYmVoYXZpb3JzIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJPYmplY3QiLCJjdXN0b21TdHlsZSIsImRhdGEiLCJ0aXRsZSIsInVybCIsIm1vcmVTd2l0Y2giLCJjb250ZW50U3R5bGUiLCJsaWZldGltZXMiLCJhdHRhY2hlZCIsImluaXRDb250ZW50RGF0YSIsInJlYWR5IiwiZ2V0U3R5bGVzIiwic2V0RGF0YSIsIm1ldGhvZHMiLCJvblRhcCIsIm5hdmlnYXRlQWN0aW9uIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLGdCQUFnQkMsUUFBUSxvQkFBUixDQUF0Qjs7QUFFQUMsVUFBVTtBQUNSQyxtQkFBaUIsQ0FBQyxTQUFELENBRFQ7QUFFUkMsYUFBVyxDQUFDSixhQUFELENBRkg7QUFHUkssY0FBWTtBQUNWQyxhQUFTQyxNQURDO0FBRVZDLGlCQUFhRDtBQUZILEdBSEo7QUFPUkUsUUFBTTtBQUNKQyxXQUFPLEVBREg7QUFFSkMsU0FBSyxFQUZEO0FBR0pDLGdCQUFZLElBSFI7QUFJSkMsa0JBQWM7QUFKVixHQVBFO0FBYVJDLGFBQVc7QUFDVEMsWUFEUyxzQkFDRTtBQUNULFdBQUtDLGVBQUw7QUFDRCxLQUhRO0FBSVRDLFNBSlMsbUJBSUQ7QUFDTixVQUFNSixlQUFlLEtBQUtLLFNBQUwsQ0FBZSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBQWYsQ0FBckI7QUFDQSxXQUFLQyxPQUFMLENBQWE7QUFDWE47QUFEVyxPQUFiO0FBR0Q7QUFUUSxHQWJIO0FBd0JSTyxXQUFTO0FBQ1BKLG1CQURPLDZCQUNXO0FBQUEsVUFDR1AsSUFESCxHQUNjLEtBQUtBLElBRG5CLENBQ1JILE9BRFEsQ0FDR0csSUFESDtBQUFBLFVBRVJDLEtBRlEsR0FFMEJELElBRjFCLENBRVJDLEtBRlE7QUFBQSxVQUVEQyxHQUZDLEdBRTBCRixJQUYxQixDQUVERSxHQUZDO0FBQUEsNkJBRTBCRixJQUYxQixDQUVJRyxVQUZKO0FBQUEsVUFFSUEsVUFGSixvQ0FFaUIsSUFGakI7O0FBR2hCLFdBQUtPLE9BQUwsQ0FBYTtBQUNYVCxvQkFEVztBQUVYQyxnQkFGVztBQUdYQztBQUhXLE9BQWI7QUFLRCxLQVRNO0FBVVBTLFNBVk8sbUJBVUM7QUFBQSxVQUNFWixJQURGLEdBQ1csS0FBS0EsSUFBTCxDQUFVSCxPQURyQixDQUNFRyxJQURGOztBQUVOLFVBQUlBLEtBQUtFLEdBQVQsRUFBYztBQUNaLGFBQUtXLGNBQUwsQ0FBb0JiLEtBQUtFLEdBQXpCO0FBQ0Q7QUFDRjtBQWZNO0FBeEJELENBQVYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzdHlsZUJlaGF2aW9yID0gcmVxdWlyZSgnLi4vYmVoYXZpb3JzL3N0eWxlJylcblxuQ29tcG9uZW50KHtcbiAgZXh0ZXJuYWxDbGFzc2VzOiBbJ2ktY2xhc3MnXSxcbiAgYmVoYXZpb3JzOiBbc3R5bGVCZWhhdmlvcl0sXG4gIHByb3BlcnRpZXM6IHtcbiAgICBjb250ZW50OiBPYmplY3QsXG4gICAgY3VzdG9tU3R5bGU6IE9iamVjdFxuICB9LFxuICBkYXRhOiB7XG4gICAgdGl0bGU6ICcnLFxuICAgIHVybDogJycsXG4gICAgbW9yZVN3aXRjaDogdHJ1ZSxcbiAgICBjb250ZW50U3R5bGU6IG51bGxcbiAgfSxcbiAgbGlmZXRpbWVzOiB7XG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICB0aGlzLmluaXRDb250ZW50RGF0YSgpXG4gICAgfSxcbiAgICByZWFkeSgpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IHRoaXMuZ2V0U3R5bGVzKFsndGl0bGUnLCAnbWFyZ2luJ10pXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBjb250ZW50U3R5bGVcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaW5pdENvbnRlbnREYXRhKCkge1xuICAgICAgY29uc3QgeyBjb250ZW50OiB7IGRhdGEgfSB9ID0gdGhpcy5kYXRhXG4gICAgICBjb25zdCB7IHRpdGxlLCB1cmwsIG1vcmVTd2l0Y2ggPSB0cnVlIH0gPSBkYXRhXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgdXJsLFxuICAgICAgICBtb3JlU3dpdGNoXG4gICAgICB9KVxuICAgIH0sXG4gICAgb25UYXAoKSB7XG4gICAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMuZGF0YS5jb250ZW50XG4gICAgICBpZiAoZGF0YS51cmwpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZUFjdGlvbihkYXRhLnVybClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iXX0=