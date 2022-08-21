import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { debounce } from 'throttle-debounce';
import Toast from '@/components/vant/toast/toast';
import { getDesignById } from '@/store/actions/design';

const MAPS = {
  '4': 'engineeringZone',
  '5': 'specialZone',
  '6': 'buyoutZone',
}

@connect({
  design({ design }) {
    return design.other;
  },
}, {
  getDesignById,
})
export default class Design extends wepy.page {
  config = {
    navigationBarTitleText: '海信信天翁',
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
    },
    enablePullDownRefresh: true,
  };
  designId = '';
  id = '';
  data = {
    tabIndex: 0,
    visibelTop: false,
  };
  methods = {
    handleCallback: ({ detail }) => {
      const { pageType } = detail
      // 1-商品，2-政策公告，3-营销活动，4-工程单，5-特惠单，6-套购
      this.$parent.globalData.zone = MAPS[pageType]
      wx.switchTab({
        url: '/pages/main/take/index'
      });
    },
    getDesignDataById: ({ detail }) => {
      this.designId = detail
      this.methods.getDesignById(detail)
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
    Toast.loading('加载中');
    if (this.id) {
      this.methods.getDesignById(this.id, (res) => {
        Toast.clear();
        wx.stopPullDownRefresh();
        if (res && res.data && res.data.name) {
          wx.setNavigationBarTitle({
            title: res.data.name || '海信信天翁',
          });
        }
      });
    }
  }
  onLoad({ id }) {
    Toast.loading('加载中');
    if (id) {
      this.id = id;
      this.methods.getDesignById(id, (res) => {
        Toast.clear();
        if (res && res.data && res.data.name) {
          wx.setNavigationBarTitle({
            title: res.data.name || '海信信天翁',
          });
        }
      });
    }
  }
}
