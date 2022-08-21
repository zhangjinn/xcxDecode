import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { debounce } from 'throttle-debounce';
import { head } from 'ramda';
import commonMixin from '@/mixins/common';
import Toast from '@/components/vant/toast/toast';
import { getActivityDesignData, getActivityById, getDesignAll, getTabActivityById } from '@/store/actions/design';
import {request} from "@/utils/request";
import emptyDataType from "@/components/empty-data-type/index";

const MAPS = {
  '4': 'engineeringZone',
  '5': 'specialZone',
  '6': 'buyoutZone',
}

@connect({
  configs({ design }) {
    return design.config;
  },
  tabs({ design }) {
    return design.tabs;
  },
  design({ design }) {
    return design.activity;
  },
}, {
  getActivityDesignData,
  getActivityById,
  getDesignAll,
  getTabActivityById
})
export default class Activity extends wepy.page {
  config = {
    navigationBarTitleText: '活动',
    navigationBarBackgroundColor: '#ffffff',
    usingComponents: {
      'x-img': '../../../designs/x-img/index',
      'x-thermal-zone': '../../../designs/x-thermal-zone/index',
      'x-swiper': '../../../designs/x-swiper/index',
      'x-goods-card': '../../../designs/x-goods-card/index',
      'x-goods-slider': '../../../designs/x-goods-slider/index',
      'x-title': '../../../designs/x-title/index',
      'x-text': '../../../designs/x-text/index',
      'x-tabs': '../../../designs/x-tabs/index',
      'x-navigation-bar': '../../../designs/x-navigation-bar/index',
      'van-toast': '../../../components/vant/toast/index',
      'no-permission': '../../../components/no-permission/index',
    },
    enablePullDownRefresh: true,
  };
  components = {
    emptyDataType,
  };
  designId = '';
  data = {
    tabIndex: 0,
    visibelTop: false,
  };

  mixins = [commonMixin];

  watch = {
    configs: (newValue: any) => {
      if (newValue && newValue.length > 0) {
        const { getActivityById } = this.methods;
        Toast.loading('加载中');
        const designData: any = head(newValue);
        getActivityById(designData.id, () => {
          Toast.clear();
        });
      }
    },
  };
  methods = {
    onShareAppMessage: () => {
      let designConfig = this.configs;
      let tabIndex = this.tabIndex;
      let imageUrl = `http://3s-static.hisense.com/wechat/1/14722429883/1635993518803_3a9eae942ac64682b0fa7abc50817c0c.jpg`
      if(designConfig && designConfig[tabIndex] && designConfig[tabIndex].shareImgUrl){
        imageUrl = designConfig[tabIndex].shareImgUrl
      }
      return {
        imageUrl,
        query: ''
      }
    },
    onItemTap: ({ currentTarget }) => {
      const { id, index } = currentTarget.dataset
      this.tabIndex = index;
      this.designId = id;
      this.methods.getActivityById(id);
    },
    handleCallback: ({ detail }) => {
      // TODO: 456 应该设置单独参数
      const { pageType, value, page, query } = detail
      // 1-商品，2-政策公告，3-营销活动，4-工程单，5-特惠单，6-套购 8-直播

      this.$parent.globalData.zone = MAPS[pageType]
      // projectApplyCode 工程 reportCode 特惠 packageCode 套购
      if (pageType == 4 ) {
        this.$parent.globalData.projectApplyCode = value
      }
      if (pageType == 5 ) {
        this.$parent.globalData.reportCode = value
      }
      if (pageType == 6 ) {
        this.$parent.globalData.packageCode = value
      }
      if (pageType == 8 ) {
        let param = {
          method: 'live',
          platform: 'XCX'
        }
        request({
          api: 'footerNavigationConfig/findByPlatform.nd',
          method: 'GET',
          data: param,
        })

        wx.navigateTo({
          url: page + '?' + query + '&custom_params={"ly":1}'
        });
        return;
      }
      wx.switchTab({
        url: '/pages/main/take/index'
      })
    },
    getDesignDataById: ({ detail }) => {
      this.designId = detail
      this.methods.getActivityById(detail)
    },
    tabCallback: ({ detail }) => {
      this.methods.getTabActivityById(detail.id, detail.designIndex)
    },
    // 回到顶部
    scrollToTop: () => {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
      this.visibelTop = false;
    },
    // 监听页面滚动事件
    onPageScroll: debounce(200, ({ scrollTop }) => {
      if (scrollTop >= 350) {
        this.visibelTop = true;
      } else {
        this.visibelTop = false;
      }
      this.$apply();
    }),
  };
  onPullDownRefresh() {
    if (this.isLogin()) {
      const { getDesignAll, getActivityById,getActivityDesignData } = this.methods;
      const configList = this.configs || [];
      Toast.loading('加载中');
      // 刷新获取全部配置
      getActivityDesignData()

      this.tabIndex = 0
      if (configList.length > 0) {
        const designData: any = head(configList);
        getActivityById(designData.id, () => {
          wx.stopPullDownRefresh();
          Toast.clear();
        });
      } else {
        getDesignAll(() => {
          wx.stopPullDownRefresh();
          Toast.clear();
        });
      }
    }
    // const { getActivityDesignData, getActivityById } = this.methods;
    // if (this.designId) {
    //   getActivityById(this.designId, () => {
    //     wx.stopPullDownRefresh();
    //   });
    // } else {
    //   getActivityDesignData().then(() => {
    //     wx.stopPullDownRefresh();
    //   });
    // }
  }
  onUnload() {
    this.tabIndex = 0;
    this.designId = '';
  }

  onShow() {
    // 自定义底部导航栏-如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态
    if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
      this.$wxpage.getTabBar().setData({
        selected: 2
      })
    }
  }
  onLoad() {
    if (this.isLogin()) {
      const { getDesignAll, getActivityById } = this.methods;
      const configList = this.configs || [];
      Toast.loading('加载中');
      if (configList.length > 0) {
        const designData: any = head(configList);
        getActivityById(designData.id, () => {
          Toast.clear();
        });
      } else {
        getDesignAll(() => {
          Toast.clear();
        });
      }
    }
  }
}
