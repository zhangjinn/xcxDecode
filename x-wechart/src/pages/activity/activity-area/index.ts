import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { trim, is, map, length, find, propEq, forEach } from 'ramda';
import Header from '@/components/goodsHeader/index';
import { Weapp } from 'definitions/weapp';
import systemMixin from '@/mixins/system';
import { getActivityList, getActivityStatus } from '@/store/actions/activityare'
import Toast from '@/components/vant/toast/toast';
import { getSpecialFilters } from '@/store/actions/classification'
import { RESET_ACTIVITY_LIST, RESET_ACTIVITY_IMG } from '@/store/types/activityare';
import { TOGGLE_SEARCH_COLLECTION } from '@/store/types/search';
import { fillZero, formatDate, getDateDiff } from '@/utils/index';
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  key: string;
  visible: boolean;
  statusBarHeight: string;
  visibelTop: boolean;
  scrollTop: number;
  filterIndex: number;
  filterSale: number;
  sortField: string,
  sortType: string,
  onOpen: boolean;
  searchstatuspopup: string,
  pageNo: number;
  time: any;
  filterForm: object;
  calendarConfig: object;
  calendarShow: boolean;
  wlz_visible: false;
  gys_visible: false;
  matklname: string;
  orgIdname: string;
  isPermission: boolean;
  moreModelPopup: boolean;
  popupShowMoreModelInfo: Object;
  imgObj: object;
}


@connect({
  ActivityList({ activityare }) {
    return activityare.ActivityList
  },
  totalPages({ activityare }) {
    return activityare.totalPages
  },
  listId({ activityare }) {
    return activityare.listId
  },
  specialfilters({ classification }) {
    return classification.specialfilters
  },
  user({ user }) {
    return user
  }
}, {
  getSpecialFilters,
  getActivityList,
  getActivityStatus
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'van-field': '../../../components/vant/field/index',
      'van-count-down': '../../../components/vant/count-down/index',
      'img': '../../../components/img/index',
      'calendar': '../../../components/calendar/index',
      'activity-good-info': '../activity-good-info/index',
      'van-loading': '../../../components/vant/loading/index',
      'item': '../../../components/list-item/index',
      'activity-count-down': '../../../components/activity-count-down/index',
      'activity-good-container': '../activity-good-container/index',
      'activity-good-more': '../activity-good-more/index'
    },
  }
  components = {
    header: Header,
    emptyDataType: emptyDataType,
    emptyDataAuth: emptyDataType,
  };
  watch = {
    listId() {
      if (this.listId && this.listId.length > 0) {
        this.methods.getActivityStatus({ ids: this.listId })
      }
    }
  };
  // 声明
  data: Data = {
    key: '',
    visible: false,
    wlz_visible: false,
    gys_visible: false,
    statusBarHeight: '',
    // 回到顶部
    visibelTop: false,
    scrollTop: -1,
    filterIndex: 0,
    filterSale: 0,
    sortField: '',
    sortType: '',
    onOpen: false,
    time: 74361,
    searchstatuspopup: '',
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    // 倒计时
    calendarShow: false,
    matklname: '全部',
    orgIdname: '全部',
    dataName: '',
    filterForm: {
      _loading: true,
      pageNo: 1,
      status: '2',
      startDate: '',
      endDate: '',
      activityName: '',
      matkl: '',
      orgId: '',
    },
    isPermission: false,
    moreModelPopup: false,
    popupShowMoreModelInfo:{
      containerItem: Object,
      item: Object,
      mark: String,
    },
    imgObj: {
      'activeHeaderBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552533_e99dd0572f5d485c993894060c749626.png',
      'activeHeaderLogo': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993518246_ff7aae8b32ec49e08b2260f648980a5d.png',
      'activeHeaderTab': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529283_6e66affe82df4efaa0a62c2a84752f25.png',
      'emptyActivity': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552691_234752c5bcf74f2c8293e1ab460b1c43.png',
      'share_item_info': 'http://3s-static.hisense.com/wechat/1/14722429883/1643097372976_061953fd860d42efa932dd721521a995.png',
    },
  }
  mixins = [systemMixin];
  // 页面内交互写在methods里
  methods = {
    moveHandle: () => {},
    onShareAppMessage: () => {
      let shareItemInfo = this.imgObj.share_item_info
      return {
        imageUrl: shareItemInfo,
        query: ''
      }
    },
    closeItUp: (id) => {
      forEach((item) => {
        if (item.id == id) {
          item.isShow = !item.isShow
        }
      },this.ActivityList)
    },
    // 选择物料组
    onSelectGysFrame: (value, key) => {
      this.orgIdname = value
      this.filterForm = { ...this.filterForm, orgId: key }
      this.gys_visible = false
    },
    // 选择物料组
    onSelectWlzFrame: (value, key) => {
      this.matklname = value
      this.filterForm = { ...this.filterForm, matkl: key }
      this.wlz_visible = false
    },
    // 活动名称
    onZzprdmodelChange: (e: { detail: any; }) => {
      this.filterForm = { ...this.filterForm, activityName: e.detail }
    },
    // 选择日期
    openCalendar(e: { target: { dataset: { name: any; type: any; }; }; }) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDate, endDate } = this.filterForm;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if (type === 'sapDate') {
        begin = startDate
        end = endDate
      }

      if (name.indexOf('eginDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('ndDate') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    clearCalendar(name: any) {
      let dataName = (name == "sapBeginDate" ? 'startDate': 'endDate')
      this.filterForm = { ...this.filterForm, [dataName]: '' }
    },
    chooseDay(evt: { detail: { year: any; month: any; day: any; }; }) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.dataName = (this.currentDateName == "sapBeginDate" ? 'startDate': 'endDate')
      this.filterForm = { ...this.filterForm, [this.dataName]: day }
      this.calendarShow = false;
    },
    chosebar: (status: any) => {
      // 切换tab是不需要重置了 如需要👇这行打开
      // this.methods.resetSearch()
      this.filterForm = { ...this.filterForm, status, pageNo: 1 }
      // TODO: 接一个搜索方法
      getStore().dispatch({ type: RESET_ACTIVITY_LIST, payload: [] })
      this.myGetOrderList()
    },
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
    //滚动触发
    onPullBottom: () => {
      // debugger
      let index = this.filterForm.pageNo + 1
      if (index < this.totalPages || index == this.totalPages) {
        this.filterForm = { ...this.filterForm, pageNo: index }
        this.myGetOrderList()
      }
    },
    // 筛选条件
    resetSearch: () => {
      this.filterForm = { ...this.filterForm, pageNo: 1, startDate: '', endDate: '', activityName: '', matkl: '', orgId: '' }
      this.matklname = '全部'
      this.orgIdname = '全部'
    },
    confirmSearch: () => {
      getStore().dispatch({ type: RESET_ACTIVITY_LIST, payload: [] })
      this.filterForm = { ...this.filterForm, pageNo: 1 }
      this.myGetOrderList()
      this.methods.scrollToTop()
      this.visible = false
    },
    // 运营商开关
    onOpen: (key: any) => {
      if (key == 'wlz') {
        this.wlz_visible = !this.wlz_visible
      } else if (key == 'gys') {
        this.gys_visible = !this.gys_visible
      }
    },
    onToggleTimeFrame(key) {
      if (key == 'wlz') {
        this.wlz_visible = !this.wlz_visible
      } else if (key == 'gys') {
        this.gys_visible = !this.gys_visible
      }
    },
    openDrawer: () => {
      this.visible = !this.visible
    },
    // 返回上一级
    goback: () => {
      let route = getCurrentPages()
      let url = route[0].route
      wx.switchTab({
        url: `../../../pages/main/home/index`
      })
    },
    // 回到顶部
    scrollToTop: () => {
      this.visibelTop = false
      this.scrollTop = 0
    },
    toggleCollection({ detail }: any) {
      getStore().dispatch({ type: TOGGLE_SEARCH_COLLECTION, payload: detail })
    },
    imgLose: ({ detail }: any) => {
      getStore().dispatch({ type: RESET_ACTIVITY_IMG, payload: detail })
    },

    // 子组件传参--列表页组合购改变型号默认型号跟着变化
    changeModel: ({ detail }: any) => {

      this.ActivityList.forEach((item, index) => {
        if (item.id == detail.activeId) {
          let currItem = item.setPurchaseList[detail.mark]
          currItem.forEach((val, i)=>{
            if(val.productGroup == detail.product.productGroup){

              val.child = val.child.map((child, idx)=>{
                child.isActive = false
                if(idx == detail.modelIndex){
                  child.isActive = true
                }
                return child
              })
               currItem[i] = {
                ...currItem[i],
                ...val.child[detail.modelIndex]
              }
            }
          })
          this.ActivityList[index] = item
        }
      })
      this.$apply()
    },

    // 子组件传参--组合购展示更多型号
    showMoreModel({ detail }: any){
      this.popupShowMoreModelInfo = detail
      this.moreModelPopup = true
      this.$apply()
    },

    // 关闭组合购更多弹框
    closeMoreModelPopup(){
      this.moreModelPopup = false
      this.$apply()
    },

    //弹框组合购改变型号默认型号跟着变化
    changePopModel({ detail }: any){
      this.popupShowMoreModelInfo = detail
      this.$apply()
    }
  }
  myGetOrderList() {
    this.methods.getActivityList(this.filterForm)
  }
  onShow() {
    let globalData = wepy.$instance.globalData;
    this.isPermission = globalData.isPermission
    getStore().dispatch({ type: RESET_ACTIVITY_LIST, payload: [] })
    this.myGetOrderList()
  }
  onLoad({ activityName }) {
    if (activityName) {
      this.filterForm.activityName = activityName
    }
    this.methods.getSpecialFilters()
  }
  onUnload() {
    this.listId = ''
  }
}
