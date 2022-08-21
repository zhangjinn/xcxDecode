'use strict';

var _component = require('./../components/vant/common/component.js');

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _component.VantComponent)({
  data: {
    selected: 0,
    color: "#262626",
    selectedColor: "#00AAA6",
    backgroundColor: '#ffffff',
    isShowTabBar: true, //是否显示tabbar
    list: [{
      pagePath: '/pages/main/home/index',
      text: '首页',
      iconPath: '/images/tab/home.png',
      selectedIconPath: '/images/tab/homed.png',
      color: "#262626",
      selectedColor: "#00AAA6"
    }, {
      pagePath: '/pages/main/take/index',
      text: '产品采购',
      iconPath: '/images/tab/take.png',
      selectedIconPath: '/images/tab/taked.png',
      color: "#262626",
      selectedColor: "#00AAA6"
    }, {
      pagePath: '/pages/main/activity/index',
      text: '活动中心',
      iconPath: '/images/tab/logo.png',
      selectedIconPath: '/images/tab/logo.png',
      color: "#262626",
      selectedColor: "#00AAA6"
    }, {
      pagePath: '/pages/main/cart/index',
      text: '购物车',
      iconPath: '/images/tab/cart.png',
      selectedIconPath: '/images/tab/carted.png',
      color: "#262626",
      selectedColor: "#00AAA6"
    }, {
      pagePath: '/pages/main/me/index',
      text: '我的',
      iconPath: '/images/tab/me.png',
      selectedIconPath: '/images/tab/med.png',
      color: "#262626",
      selectedColor: "#00AAA6"
    }]
    // tabBarBg: 'http://3s-static.hisense.com/wechat/1/14722429883/1643096660130_c7cc58b17cd64033bf1d49955d73da15.png',
    // tabBarActive: 'http://3s-static.hisense.com/wechat/1/14722429883/1643096654868_5f98ba2e844447128b9776de7ac7642c.png'
  },
  created: function created() {
    this.getTabListData();
  },

  methods: {
    switchTab: function switchTab(e) {
      var data = e.currentTarget.dataset;
      var url = data.path;
      // this.setData({ // tab页面onShow内已赋值，无需赋值；
      //   selected: data.index
      // })
      _wepy2.default.$instance.globalData.isTab = true;
      if (url === '/pages/main/take/index') {
        // 跳转至产品采购需判断权限并全局变量赋值
        if (wx.getStorageSync('b2b_permission_list')) {
          var _JSON$parse = JSON.parse(wx.getStorageSync('b2b_permission_list')),
              productPurchaseAuthority = _JSON$parse.productPurchaseAuthority;

          _wepy2.default.$instance.globalData.isPermission = productPurchaseAuthority;
        }
      }
      wx.switchTab({ url: url });
    },


    // 首页底部导航配置-查询
    getTabListData: function getTabListData() {
      var _this = this;

      var param = {
        platform: 'XCX'
      };
      (0, _request.request)({
        api: 'footerNavigationConfig/findByPlatform.nd',
        method: 'GET',
        data: param
      }).then(function (res) {
        if (res && res.list && res.list.length) {
          var list = res.list.map(function (item) {
            return {
              pagePath: item.url,
              text: item.name,
              iconPath: item.iconUrlPathInfo,
              selectedIconPath: item.iconUrlSelectedPathInfo,
              color: item.font,
              selectedColor: item.fontSelected
            };
          });
          _this.set({
            list: list
          });
        }
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImRhdGEiLCJzZWxlY3RlZCIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImlzU2hvd1RhYkJhciIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJjcmVhdGVkIiwiZ2V0VGFiTGlzdERhdGEiLCJtZXRob2RzIiwic3dpdGNoVGFiIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwidXJsIiwicGF0aCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwiaXNUYWIiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiSlNPTiIsInBhcnNlIiwicHJvZHVjdFB1cmNoYXNlQXV0aG9yaXR5IiwiaXNQZXJtaXNzaW9uIiwicGFyYW0iLCJwbGF0Zm9ybSIsImFwaSIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwibmFtZSIsImljb25VcmxQYXRoSW5mbyIsImljb25VcmxTZWxlY3RlZFBhdGhJbmZvIiwiZm9udCIsImZvbnRTZWxlY3RlZCIsInNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0EsOEJBQWM7QUFDWkEsUUFBTTtBQUNKQyxjQUFVLENBRE47QUFFSkMsV0FBTyxTQUZIO0FBR0pDLG1CQUFlLFNBSFg7QUFJSkMscUJBQWlCLFNBSmI7QUFLSkMsa0JBQWMsSUFMVixFQUtnQjtBQUNwQkMsVUFBTSxDQUNKO0FBQ0VDLGdCQUFVLHdCQURaO0FBRUVDLFlBQU0sSUFGUjtBQUdFQyxnQkFBVSxzQkFIWjtBQUlFQyx3QkFBa0IsdUJBSnBCO0FBS0VSLGFBQU8sU0FMVDtBQU1FQyxxQkFBZTtBQU5qQixLQURJLEVBU0o7QUFDRUksZ0JBQVUsd0JBRFo7QUFFRUMsWUFBTSxNQUZSO0FBR0VDLGdCQUFVLHNCQUhaO0FBSUVDLHdCQUFrQix1QkFKcEI7QUFLRVIsYUFBTyxTQUxUO0FBTUVDLHFCQUFlO0FBTmpCLEtBVEksRUFpQko7QUFDRUksZ0JBQVUsNEJBRFo7QUFFRUMsWUFBTSxNQUZSO0FBR0VDLGdCQUFVLHNCQUhaO0FBSUVDLHdCQUFrQixzQkFKcEI7QUFLRVIsYUFBTyxTQUxUO0FBTUVDLHFCQUFlO0FBTmpCLEtBakJJLEVBeUJKO0FBQ0VJLGdCQUFVLHdCQURaO0FBRUVDLFlBQU0sS0FGUjtBQUdFQyxnQkFBVSxzQkFIWjtBQUlFQyx3QkFBa0Isd0JBSnBCO0FBS0VSLGFBQU8sU0FMVDtBQU1FQyxxQkFBZTtBQU5qQixLQXpCSSxFQWlDSjtBQUNFSSxnQkFBVSxzQkFEWjtBQUVFQyxZQUFNLElBRlI7QUFHRUMsZ0JBQVUsb0JBSFo7QUFJRUMsd0JBQWtCLHFCQUpwQjtBQUtFUixhQUFPLFNBTFQ7QUFNRUMscUJBQWU7QUFOakIsS0FqQ0k7QUEwQ047QUFDQTtBQWpESSxHQURNO0FBb0RaUSxTQXBEWSxxQkFvREY7QUFDUixTQUFLQyxjQUFMO0FBQ0QsR0F0RFc7O0FBdURaQyxXQUFTO0FBQ1BDLGFBRE8scUJBQ0dDLENBREgsRUFDTTtBQUNYLFVBQU1mLE9BQU9lLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQTdCO0FBQ0EsVUFBTUMsTUFBTWxCLEtBQUttQixJQUFqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxxQkFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxLQUExQixHQUFrQyxJQUFsQztBQUNBLFVBQUdMLFFBQVEsd0JBQVgsRUFBb0M7QUFBRTtBQUNwQyxZQUFHTSxHQUFHQyxjQUFILENBQWtCLHFCQUFsQixDQUFILEVBQTRDO0FBQUEsNEJBQ1BDLEtBQUtDLEtBQUwsQ0FBV0gsR0FBR0MsY0FBSCxDQUFrQixxQkFBbEIsQ0FBWCxDQURPO0FBQUEsY0FDbENHLHdCQURrQyxlQUNsQ0Esd0JBRGtDOztBQUUxQ1IseUJBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQk8sWUFBMUIsR0FBeUNELHdCQUF6QztBQUVEO0FBQ0Y7QUFDREosU0FBR1YsU0FBSCxDQUFhLEVBQUNJLFFBQUQsRUFBYjtBQUNELEtBaEJNOzs7QUFrQlA7QUFDQU4sa0JBbkJPLDRCQW1CUztBQUFBOztBQUNkLFVBQUlrQixRQUFRO0FBQ1ZDLGtCQUFVO0FBREEsT0FBWjtBQUdBLDRCQUFRO0FBQ05DLGFBQUssMENBREM7QUFFTkMsZ0JBQVEsS0FGRjtBQUdOakMsY0FBTThCO0FBSEEsT0FBUixFQUlHSSxJQUpILENBSVEsVUFBQ0MsR0FBRCxFQUFTO0FBQ2YsWUFBR0EsT0FBT0EsSUFBSTdCLElBQVgsSUFBbUI2QixJQUFJN0IsSUFBSixDQUFTOEIsTUFBL0IsRUFBc0M7QUFDcEMsY0FBSTlCLE9BQU82QixJQUFJN0IsSUFBSixDQUFTK0IsR0FBVCxDQUFhLFVBQUNDLElBQUQsRUFBUTtBQUM5QixtQkFBTztBQUNML0Isd0JBQVUrQixLQUFLcEIsR0FEVjtBQUVMVixvQkFBTThCLEtBQUtDLElBRk47QUFHTDlCLHdCQUFVNkIsS0FBS0UsZUFIVjtBQUlMOUIsZ0NBQWtCNEIsS0FBS0csdUJBSmxCO0FBS0x2QyxxQkFBT29DLEtBQUtJLElBTFA7QUFNTHZDLDZCQUFlbUMsS0FBS0s7QUFOZixhQUFQO0FBUUQsV0FUVSxDQUFYO0FBVUEsZ0JBQUtDLEdBQUwsQ0FBUztBQUNQdEMsa0JBQU1BO0FBREMsV0FBVDtBQUdEO0FBQ0YsT0FwQkQ7QUFxQkQ7QUE1Q007QUF2REcsQ0FBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3ZhbnQvY29tbW9uL2NvbXBvbmVudCdcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgcmVxdWVzdCB9IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnO1xuVmFudENvbXBvbmVudCh7XG4gIGRhdGE6IHtcbiAgICBzZWxlY3RlZDogMCxcbiAgICBjb2xvcjogXCIjMjYyNjI2XCIsXG4gICAgc2VsZWN0ZWRDb2xvcjogXCIjMDBBQUE2XCIsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXG4gICAgaXNTaG93VGFiQmFyOiB0cnVlLCAvL+aYr+WQpuaYvuekunRhYmJhclxuICAgIGxpc3Q6IFtcbiAgICAgIHtcbiAgICAgICAgcGFnZVBhdGg6ICcvcGFnZXMvbWFpbi9ob21lL2luZGV4JyxcbiAgICAgICAgdGV4dDogJ+mmlumhtScsXG4gICAgICAgIGljb25QYXRoOiAnL2ltYWdlcy90YWIvaG9tZS5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnL2ltYWdlcy90YWIvaG9tZWQucG5nJyxcbiAgICAgICAgY29sb3I6IFwiIzI2MjYyNlwiLFxuICAgICAgICBzZWxlY3RlZENvbG9yOiBcIiMwMEFBQTZcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhZ2VQYXRoOiAnL3BhZ2VzL21haW4vdGFrZS9pbmRleCcsXG4gICAgICAgIHRleHQ6ICfkuqflk4Hph4fotK0nLFxuICAgICAgICBpY29uUGF0aDogJy9pbWFnZXMvdGFiL3Rha2UucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy9pbWFnZXMvdGFiL3Rha2VkLnBuZycsXG4gICAgICAgIGNvbG9yOiBcIiMyNjI2MjZcIixcbiAgICAgICAgc2VsZWN0ZWRDb2xvcjogXCIjMDBBQUE2XCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlUGF0aDogJy9wYWdlcy9tYWluL2FjdGl2aXR5L2luZGV4JyxcbiAgICAgICAgdGV4dDogJ+a0u+WKqOS4reW/gycsXG4gICAgICAgIGljb25QYXRoOiAnL2ltYWdlcy90YWIvbG9nby5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnL2ltYWdlcy90YWIvbG9nby5wbmcnLFxuICAgICAgICBjb2xvcjogXCIjMjYyNjI2XCIsXG4gICAgICAgIHNlbGVjdGVkQ29sb3I6IFwiIzAwQUFBNlwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGFnZVBhdGg6ICcvcGFnZXMvbWFpbi9jYXJ0L2luZGV4JyxcbiAgICAgICAgdGV4dDogJ+i0reeJqei9picsXG4gICAgICAgIGljb25QYXRoOiAnL2ltYWdlcy90YWIvY2FydC5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnL2ltYWdlcy90YWIvY2FydGVkLnBuZycsXG4gICAgICAgIGNvbG9yOiBcIiMyNjI2MjZcIixcbiAgICAgICAgc2VsZWN0ZWRDb2xvcjogXCIjMDBBQUE2XCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlUGF0aDogJy9wYWdlcy9tYWluL21lL2luZGV4JyxcbiAgICAgICAgdGV4dDogJ+aIkeeahCcsXG4gICAgICAgIGljb25QYXRoOiAnL2ltYWdlcy90YWIvbWUucG5nJyxcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy9pbWFnZXMvdGFiL21lZC5wbmcnLFxuICAgICAgICBjb2xvcjogXCIjMjYyNjI2XCIsXG4gICAgICAgIHNlbGVjdGVkQ29sb3I6IFwiIzAwQUFBNlwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIC8vIHRhYkJhckJnOiAnaHR0cDovLzNzLXN0YXRpYy5oaXNlbnNlLmNvbS93ZWNoYXQvMS8xNDcyMjQyOTg4My8xNjQzMDk2NjYwMTMwX2M3Y2M1OGIxN2NkNjQwMzNiZjFkNDk5NTVkNzNkYTE1LnBuZycsXG4gICAgLy8gdGFiQmFyQWN0aXZlOiAnaHR0cDovLzNzLXN0YXRpYy5oaXNlbnNlLmNvbS93ZWNoYXQvMS8xNDcyMjQyOTg4My8xNjQzMDk2NjU0ODY4XzVmOThiYTJlODQ0NDQ3MTI4Yjk3NzZkZTdhYzc2NDJjLnBuZydcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICB0aGlzLmdldFRhYkxpc3REYXRhKClcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHN3aXRjaFRhYihlKSB7XG4gICAgICBjb25zdCBkYXRhID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcbiAgICAgIGNvbnN0IHVybCA9IGRhdGEucGF0aFxuICAgICAgLy8gdGhpcy5zZXREYXRhKHsgLy8gdGFi6aG16Z2ib25TaG935YaF5bey6LWL5YC877yM5peg6ZyA6LWL5YC877ybXG4gICAgICAvLyAgIHNlbGVjdGVkOiBkYXRhLmluZGV4XG4gICAgICAvLyB9KVxuICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5pc1RhYiA9IHRydWVcbiAgICAgIGlmKHVybCA9PT0gJy9wYWdlcy9tYWluL3Rha2UvaW5kZXgnKXsgLy8g6Lez6L2s6Iez5Lqn5ZOB6YeH6LSt6ZyA5Yik5pat5p2D6ZmQ5bm25YWo5bGA5Y+Y6YeP6LWL5YC8XG4gICAgICAgIGlmKHd4LmdldFN0b3JhZ2VTeW5jKCdiMmJfcGVybWlzc2lvbl9saXN0Jykpe1xuICAgICAgICAgIGNvbnN0IHsgcHJvZHVjdFB1cmNoYXNlQXV0aG9yaXR5IH09SlNPTi5wYXJzZSh3eC5nZXRTdG9yYWdlU3luYygnYjJiX3Blcm1pc3Npb25fbGlzdCcpKVxuICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuaXNQZXJtaXNzaW9uID0gcHJvZHVjdFB1cmNoYXNlQXV0aG9yaXR5XG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd3guc3dpdGNoVGFiKHt1cmx9KVxuICAgIH0sXG5cbiAgICAvLyDpppbpobXlupXpg6jlr7zoiKrphY3nva4t5p+l6K+iXG4gICAgZ2V0VGFiTGlzdERhdGEoKXtcbiAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgcGxhdGZvcm06ICdYQ1gnXG4gICAgICB9XG4gICAgICByZXF1ZXN0KHtcbiAgICAgICAgYXBpOiAnZm9vdGVyTmF2aWdhdGlvbkNvbmZpZy9maW5kQnlQbGF0Zm9ybS5uZCcsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGRhdGE6IHBhcmFtLFxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmKHJlcyAmJiByZXMubGlzdCAmJiByZXMubGlzdC5sZW5ndGgpe1xuICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmxpc3QubWFwKChpdGVtKT0+e1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcGFnZVBhdGg6IGl0ZW0udXJsLFxuICAgICAgICAgICAgICB0ZXh0OiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgIGljb25QYXRoOiBpdGVtLmljb25VcmxQYXRoSW5mbyxcbiAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogaXRlbS5pY29uVXJsU2VsZWN0ZWRQYXRoSW5mbyxcbiAgICAgICAgICAgICAgY29sb3I6IGl0ZW0uZm9udCxcbiAgICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcjogaXRlbS5mb250U2VsZWN0ZWQsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnNldCh7XG4gICAgICAgICAgICBsaXN0OiBsaXN0LFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59KVxuIl19