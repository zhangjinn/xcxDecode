import wepy from 'wepy';
import { connect } from 'wepy-redux';
import {
  getBoothReportList,
  getCustomerShop,
  getQueryOrg,
  getMaterialGroups,
  getProcessState,
  getPlanProjectNameComboBox,
} from '@/store/actions/store'
import sideFilter from "../../../components/side-filter/index";
import headerFilter from "../../../components/header-filter/index";
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  visible: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  filterForm: object;
  scrollTop: number;
  activityList: any[];
  statusOptions: any[];
  sideFilterForm: any[];
  headerTabList: any[];
}

@connect({

}, {
  getBoothReportList,
  getCustomerShop,
  getQueryOrg,
  getMaterialGroups,
  getProcessState,
  getPlanProjectNameComboBox,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '展台需求提报',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-loading': '../../../../components/vant/loading/index',
      'calendar': '../../../../components/calendar/index',
      'van-field': '../../../../components/vant/field/index',
      "van-datetime-picker": "../../../../components/vant/datetime-picker/index",
      'van-search': '../../../../components/vant/search/index',
    },
  };
  components = {
    sideFilter,
    headerFilter,
    emptyDataType,
    headerTab,
  };
  data: Data = {
    visible: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        activityTime:'', // 提报日期
        projectOrg:'', // 立项组织
        store:'', // 门店
        materialGroup:[], // 物料组
        status:'', // 流程状态
        planProject:'', // 计划项目名称
        account:'', // 提报人账号
        singleNumber:'', // 需求提报单号
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        totalPage: 0,
      },
    },
    activityList: [],
    statusOptions: [], // 活动状态筛选列表
    sideFilterForm: [
      { // 年月 日期
        key: 'activityTime',
        label: '提报日期',
        value: '',
        placeholder: '请选择时间',
        type: 'yearMonth'
      },
      {
        key: 'projectOrg',
        label: '立项组织',
        value: '',
        name: '',
        placeholder: '请选择立项组织',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'store',
        label: '门店',
        value: '',
        name: '',
        placeholder: '请选择门店',
        type: 'select',
        multiple: false,
        isSearch: true,
        isNotAll: true,
        options: [],
      },
      {
        key: 'materialGroup',
        label: '物料组',
        value: [],
        name: [],
        placeholder: '请选择物料组',
        type: 'select',
        multiple: true,
        options: [],
      },
      {
        key: 'status',
        label: '流程状态',
        value: '',
        name: '',
        placeholder: '请选择流程状态',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'planProject',
        label: '计划项目名称',
        value: '',
        name: '',
        placeholder: '请选择计划项目名称',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'account', // 为了方便赋值
        label: '提报人账号',
        value: '',
        placeholder: '请输入提报人账号',
        type: 'field'
      },
      {
        key: 'singleNumber',
        label: '需求提报单号',
        value: '',
        placeholder: '请输入需求提报单号',
        type: 'field'
      },
    ],
    headerTabList: [
      { name: '流程状态', type: 'status', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };

  // 页面内交互写在methods里
  methods = {

    // 跳转到详情
    viewDetail: (e: any) => {
      const { dataset: { type, id, source } } = e.currentTarget
      let url = `/pages/terminal/booth-report/add/index?id=${id}&type=${type}&dataSource=${source}`
      wx.navigateTo({
        url: url
      })
    },

    // 切换顶部快捷筛选
    touchOrderSFilter: (tabItem) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      if (!this.OrderSFilterVisible) {
        this.OrderSFilterVisible = true
        this.CurrentOrderSFilterName = name
        return
      }
      if (!name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if (this.CurrentOrderSFilterName === name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if (['type', 'status'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 顶部状态快捷筛选
    onSelectStatus(e) {
      const {dataset: { name, id }} = e.currentTarget
      this.filterForm.terms[name] = id
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[0].selectValue = id
      this.myGetOrderList()
      this.methods.touchOrderSFilter()
      this.methods.scrollToTop()
    },

    // 点击普通筛选按钮-显示或隐藏左侧筛选框
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 回到顶部
    scrollToTop: () => {
      this.scrollTop = 0
    },

    // 滚动列表
    onScroll: (event: Weapp.Event) => {
      if (this.scrollTop === 0) {
        this.scrollTop = event.detail.scrollTop
      }
    },

    // 列表分页
    onGetOrderListNext() {
      const totalPage = this.filterForm.page.totalPage
      if (totalPage > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.myGetOrderList()
      }
    },

    // 侧边筛选列表可搜索，并重新赋值
    onSideSearch(searchObj){
      const { key, searchValue } = searchObj
      if( key && key == 'store' ){
        this.getCustomerShopData(searchValue)
      }
    },

    // 选择筛选时触发事件
    handleFormDataChange(e){
      const { currIndex, sideFilterForm } = e
      this.sideFilterForm = sideFilterForm
      if(currIndex !== '' && this.sideFilterForm[currIndex] && this.sideFilterForm[currIndex].key == 'store'){
        this.getMaterialGroupsData(this.sideFilterForm[currIndex].value)
        this.sideFilterForm = this.sideFilterForm.map((item)=>{
          if(item.key === 'materialGroup'){
            item.value = []
            item.name = []
          }
          return item
        })
      }
      this.$apply()
    },

    // 侧边筛选确定
    handleConfirm(e){
      let filterForm = e.sideFilterForm
      if(filterForm){
        filterForm.forEach((item)=>{
          this.filterForm.terms[item.key] = item.value
        })
      }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
    },

  };

  // 获取筛选列表并给对应值赋值
  optionsConversion(list, key){
    if(list){
      list = list.map((item)=>{
        return {
          ...item,
          id: item.code,
          value: item.name
        }
      })
      this.sideFilterForm = this.sideFilterForm.map((item)=>{
        if(item.key === key){
          item.options = list
        }
        return item
      })
    }
    this.$apply()
  }

  // 获取计划项目名称下拉框列表
  async getPlanProjectNameComboBoxData(){
    await this.methods.getPlanProjectNameComboBox().then((res)=>{
      let { data } = res.payload
      if(data){
        data = data.map((item)=>{
          return {
            ...item,
            id: item.code,
            value: item.name
          }
        })
        this.sideFilterForm = this.sideFilterForm.map((item)=>{
          if(item.key === 'planProject'){
            item.options = data
            if( item.options && item.options.length>0 ){
              item.value = item.options[0].id
              item.name = item.options[0].value
              this.filterForm.terms['planProject'] = item.options[0].id
            }
          }
          return item
        })
      }

    })
  }

  // 获取流程状态下拉查询列表
  getProcessStateData(){
    this.methods.getProcessState().then((res)=>{
      let { data } = res.payload
      if(data){
        data = data.map((item)=>{
          return {
            id: item,
            value: item
          }
        })
        this.sideFilterForm = this.sideFilterForm.map((item)=>{
          if(item.key === 'status'){
            item.options = data
            this.statusOptions = data
          }
          return item
        })
      }
      this.$apply()
    })
  }

  // 获取立项组织列表
  getQueryOrgData(){
    let param = {
      type: ''  // 1:分销，2:直营和代理，3或者不填:全部
    }
    this.methods.getQueryOrg(param).then((res)=>{
      const { orgList } = res.payload
      this.optionsConversion(orgList,'projectOrg')
      this.$apply()
    })
  }

  // 根据门店id查询物料组
  getMaterialGroupsData(customerShopId){
    if(!customerShopId){
      return
    }
    let param = {
      customerShopId: customerShopId
    }
    this.methods.getMaterialGroups(param).then((res)=>{
      const { data } = res.payload
      if(data && data[0] && data[0].params){
        this.optionsConversion(data[0].params,'materialGroup')
      }
      this.$apply()
    })
  }

  // 获取门店列表
  getCustomerShopData(searchKeyWords){
    let words = searchKeyWords || ''
    let param = {
      isSpecialShop: '212400', // 表征非专卖店
      searchKeyWords: words, // 搜索关键字
    }
    this.methods.getCustomerShop(param).then((res)=>{
      const { data } = res.payload
      this.optionsConversion(data,'store')
      this.$apply()
    })
  }

  myGetOrderList() {
    let { terms, page } = this.filterForm
    let data = {
      submitDate: terms.activityTime, // 提报时间
      orgId: terms.projectOrg, // 立项组织
      customerShopId: terms.store, // 门店
      materialGroupIdList: terms.materialGroup, // 物料组
      checkStatusName: terms.status, // 流程状态
      planProjectNameCode: terms.planProject, // 计划项目名称
      submitter: terms.account, // 提报人
      demandCode: terms.singleNumber, // 需求提报单号
      pageNo: page.pageNo,
      pageSize: page.pageSize,
    }
    this.methods.getBoothReportList({ _loading: true, ...data }).then((res)=>{
      let data = res.payload.data
      this.filterForm.page = { ...this.filterForm.page, totalPage: data.totalPage }
      let activityList = data.content || []
      if ( data.page > 1 ) {
        this.activityList = this.activityList.concat(activityList)
      } else {
        this.activityList = activityList
      }
      this.$apply()
    })
  }
  onShow() {
    this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
    this.myGetOrderList()
  }
  async onLoad() {
    await this.getPlanProjectNameComboBoxData()
    this.getQueryOrgData()
    this.getProcessStateData()
  }

}
