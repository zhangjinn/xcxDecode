import { VantComponent } from '../components/vant/common/component'
import wepy from 'wepy';
import { request } from '../utils/request';
VantComponent({
  data: {
    selected: 0,
    color: "#262626",
    selectedColor: "#00AAA6",
    backgroundColor: '#ffffff',
    isShowTabBar: true, //是否显示tabbar
    list: [
      {
        pagePath: '/pages/main/home/index',
        text: '首页',
        iconPath: '/images/tab/home.png',
        selectedIconPath: '/images/tab/homed.png',
        color: "#262626",
        selectedColor: "#00AAA6",
      },
      {
        pagePath: '/pages/main/take/index',
        text: '产品采购',
        iconPath: '/images/tab/take.png',
        selectedIconPath: '/images/tab/taked.png',
        color: "#262626",
        selectedColor: "#00AAA6",
      },
      {
        pagePath: '/pages/main/activity/index',
        text: '活动中心',
        iconPath: '/images/tab/logo.png',
        selectedIconPath: '/images/tab/logo.png',
        color: "#262626",
        selectedColor: "#00AAA6",
      },
      {
        pagePath: '/pages/main/cart/index',
        text: '购物车',
        iconPath: '/images/tab/cart.png',
        selectedIconPath: '/images/tab/carted.png',
        color: "#262626",
        selectedColor: "#00AAA6",
      },
      {
        pagePath: '/pages/main/me/index',
        text: '我的',
        iconPath: '/images/tab/me.png',
        selectedIconPath: '/images/tab/med.png',
        color: "#262626",
        selectedColor: "#00AAA6",
      },
    ],
    // tabBarBg: 'http://3s-static.hisense.com/wechat/1/14722429883/1643096660130_c7cc58b17cd64033bf1d49955d73da15.png',
    // tabBarActive: 'http://3s-static.hisense.com/wechat/1/14722429883/1643096654868_5f98ba2e844447128b9776de7ac7642c.png'
  },
  created() {
    this.getTabListData()
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      // this.setData({ // tab页面onShow内已赋值，无需赋值；
      //   selected: data.index
      // })
      wepy.$instance.globalData.isTab = true
      if(url === '/pages/main/take/index'){ // 跳转至产品采购需判断权限并全局变量赋值
        if(wx.getStorageSync('b2b_permission_list')){
          const { productPurchaseAuthority }=JSON.parse(wx.getStorageSync('b2b_permission_list'))
          wepy.$instance.globalData.isPermission = productPurchaseAuthority

        }
      }
      wx.switchTab({url})
    },

    // 首页底部导航配置-查询
    getTabListData(){
      let param = {
        platform: 'XCX'
      }
      request({
        api: 'footerNavigationConfig/findByPlatform.nd',
        method: 'GET',
        data: param,
      }).then((res) => {
        if(res && res.list && res.list.length){
          let list = res.list.map((item)=>{
            return {
              pagePath: item.url,
              text: item.name,
              iconPath: item.iconUrlPathInfo,
              selectedIconPath: item.iconUrlSelectedPathInfo,
              color: item.font,
              selectedColor: item.fontSelected,
            }
          })
          this.set({
            list: list,
          })
        }
      })
    }
  }
})
