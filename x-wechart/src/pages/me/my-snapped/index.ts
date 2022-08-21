import wepy from 'wepy';
import filter from '@/components/my-snapped-filter/index';
import item from '@/components/my-snapped-item/index';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import { connect } from 'wepy-redux';
import { pagingActivityResult, PagingActivityResultParams } from '@/store/actions/activityare';

interface Data {
}

@connect({
  loading({ loading }) {
    return loading.loading
  },
  pagingActivityResult({ activityare }) {
    return activityare.pagingActivityResult
  }
}, {
  pagingActivityResult
})
export default class MySnapped extends wepy.page {
  config = {
    navigationBarTitleText: '认购结果',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-icon": "/components/vant/icon/index",
      "img": "/components/img/index",
      "van-overlay": "/components/vant/overlay/index",
      'calendar': '/components/calendar/index',
      'van-field': '/components/vant/field/index',
      'van-toast': '/components/vant/toast/index'
    },
  };

  // filterParam: PagingActivityResultParams = {
  filterParam = {
    type: '',
    // status: '',
    startDate: '',
    endDate: '',
    activityName: '',
    productModel: '',
    matkl: '',
    orgId: '',
    custName: '',
    pageNo: 1,
    pageSize: 20
  };

  data: Data = {
    currentPage: 'my',
    visibelTop: false,
    scrollPosition: 0,
  }

  components = {
    filter,
    item,
    emptyDataType,
    headerTab,
  };

  // test: 'xxx';

  methods = {
    loadNextPage: () => {
      const { filterParam } = this
      if (this.pagingActivityResult.total <= filterParam.pageNo * filterParam.pageSize) {
        return
      }
      this.filterParam.pageNo++
      const { pagingActivityResult } = this.methods
      pagingActivityResult({
        ...this.filterParam
      })
    },

    // 提交搜索
    submitFilter: (param: PagingActivityResultParams) => {
      this.filterParam = {
        ...param,
        pageNo: 1,
        pageSize: 20
      };
      const { pagingActivityResult } = this.methods
      pagingActivityResult({
        ...this.filterParam
      })
    },

    openFilter: () => {
      this.$invoke('filter', 'openDrawer')
    },
    closeFilter: () => {
      this.data.$filter$filterVisible = false
    },
    onScroll: (event: Weapp.Event) => {
      if (event.detail.scrollTop >= 350) {
        this.visibelTop = true
        if(this.scrollPosition === 0){
          this.scrollPosition = event.detail.scrollTop
        }
      } else {
        this.visibelTop = false
      }
    },
    scrollToTop: () => {
      this.scrollPosition = 0
      this.visibelTop = false
    }
  };

  onShow() {
    const { pagingActivityResult } = this.methods
    pagingActivityResult({
      ...this.filterParam
    })
  }

  onUnload() {
    this.filterParam = {
      type: '',
      // status: '',
      startDate: '',
      endDate: '',
      activityName: '',
      productModel: '',
      matkl: '',
      orgId: '',
      custName: '',
      pageNo: 1,
      pageSize: 20
    }
  }
}
