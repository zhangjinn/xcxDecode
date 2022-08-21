import wepy from 'wepy';
import { getSystemInfo } from '@/utils/index';
import { Weapp } from 'definitions/weapp';
import { connect, getStore } from 'wepy-redux';
import emptyDataType from "@/components/empty-data-type/index";
import {
  getCollectionByGroupAndCategory, getCollectionFromCart,
  getCollectionPrice, getCollectionStock,
  getCollectionDmsGoodsPrice
} from '@/store/actions/collection';
import { RESET_COLLECTION_EMPTY, RESET_COLLECTION_IMG, RESET_COLLECTION_LOAD } from '@/store/types/collection';
interface Data {
  visibelTop: boolean;
  scrollTop: number;
  collectionShow: boolean;
  catalogId: string;
  groupId: string;
  from: string;
  type: string
}

@connect({
  loading({ loading }) {
    return loading.loading
  },
  loadingInfo({ collection }) {
    return collection.loadingInfo
  },
  list({ collection }) {
    return collection.list;
  }, {
  getCollectionByGroupAndCategory,
  getCollectionFromCart,
  getCollectionPrice,
  getCollectionStock,
  getCollectionDmsGoodsPrice
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '收藏夹',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'item': '../../../components/list-item/index',
      'container': '../../../components/container/index'
    },
  }
  watch = {
    loadingInfo() {
      if (this.loadingInfo.inventory) {
        this.methods.getCollectionStock(this.loadingInfo.inventory)
      }
      if (this.loadingInfo.price) {
        this.methods.getCollectionPrice(this.loadingInfo.price)
      }
      if (this.loadingInfo.loadingDms) {
        this.methods.getCollectionDmsGoodsPrice({ orgId: this.loadingInfo.loadingDms.orgId, productId: this.loadingInfo.loadingDms.productId })
      }
    }
  };
  components = {
    emptyDataType,
  };
  // 声明
  visible: boolean | undefined;
  data: Data = {
    // 回到顶部
    visibelTop: false,
    scrollTop: 0,
    collectionShow: false,
    catalogId: '',
    groupId: '',
    from: '',
    type: ''
  }
  // 页面内交互写在methods里
  methods = {
    // 页面滚动
    // TODO: 缺一个防抖
    onScroll: (event: Weapp.Event) => {
      if (event.detail.scrollTop >= 350) {
        this.visibelTop = true
        if (this.scrollTop === 0) {
          this.scrollTop = event.detail.scrollTop
        }
      } else {
        this.visibelTop = false
      }
    },
    // 回到顶部
    scrollToTop: () => {
      this.visibelTop = false
      this.scrollTop = 0
    },
    imgLose({ detail }: any) {
      getStore().dispatch({ type: RESET_COLLECTION_IMG, payload: detail })
    },
  }

  onShow() {
    if (this.from !== 'cart') {
      this.methods.getCollectionByGroupAndCategory({ catalogId: this.catalogId, groupId: this.groupId, type: this.type })
    } else {
      this.methods.getCollectionFromCart({ catalogId: this.catalogId, groupId: this.groupId })
    }
  }

  /**
   *
   * @param from other|cart
   */
  onLoad({ catalogId, groupId, from = 'other', type }: any) {
    getSystemInfo()
    getStore().dispatch({ type: RESET_COLLECTION_LOAD, payload: [] })
    this.type = type || ''
    this.catalogId = catalogId || ''
    this.groupId = groupId || ''
    this.from = from
    if (!type && from !== 'cart') {
      const zyPartInfo = wepy.$instance.globalData.zyPartInfo
      const fxPartInfo = wepy.$instance.globalData.fxPartInfo

      if ((zyPartInfo.length > 0 && fxPartInfo.length > 0) || (zyPartInfo.length == 0 && fxPartInfo.length == 0)) {
        this.type = ''
      } else if (zyPartInfo.length == 0 && fxPartInfo.length > 0) {
        this.type = 1
      } else if (zyPartInfo.length > 0 && fxPartInfo.length == 0) {
        this.type = 2
      }
    }
    this.$apply()
  }

  onUnload() {
    getStore().dispatch({ type: RESET_COLLECTION_EMPTY, payload: [] })
  }
}
