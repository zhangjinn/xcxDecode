import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { getSpecialShopActivityList,getSpecialShopDictBytype } from '@/store/actions/activityare'
import sideFilter from "../../../components/side-filter/index";
import headerFilter from "../../../components/header-filter/index";
import emptyDataType from "../../../../components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
interface Data {
  showSearch: boolean;
  tabList: any[];
  tabActive: any;
  activeLineStyle: object;
  drawerTopHeight: string;
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
  getSpecialShopActivityList,
  getSpecialShopDictBytype,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '市场活动',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-loading': '../../../../components/vant/loading/index',
      'calendar': '../../../../components/calendar/index',
      'van-field': '../../../../components/vant/field/index',
    },
  };
  components = {
    sideFilter,
    headerFilter,
    emptyDataType,
    headerTab,
  };
  data: Data = {
    showSearch: false,
    tabList: [
      {name: '代理商市场活动'},
      {name: '专卖店市场活动'},
    ],
    tabActive: '1',
    activeLineStyle: {
      width: '56rpx',
      height: '4rpx'
    },
    drawerTopHeight: '154',
    visible: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        company:'', // 分公司
        cisCode:'', // 门店编码
        fullName:'', // 门店名称
        specialShopCode:'', // 专卖店编码
        specialShopLevel:'', // 行政分类
        specialShopType:'', // 专卖店类别
        firstModifier:'', // 修改人1姓名
        secondModifier:'', // 修改人2姓名
        activityTheme:'', // 活动主题
        activityLabel:'', // 活动类别
        startDate:'', // 活动开始时间
        endDate:'', // 活动结束时间
        status:'', // 活动状态
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
      {
        key: 'activityLabel',
        label: '活动类别',
        value: '',
        name: '',
        placeholder: '请选择活动类别',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'company', // 为了方便赋值
        label: '分公司',
        value: '',
        placeholder: '请输入分公司',
        type: 'field'
      },
      {
        key: 'cisCode',
        label: '门店编码',
        value: '',
        placeholder: '请输入门店编码',
        type: 'field'
      },
      {
        key: 'fullName',
        label: '门店名称',
        value: '',
        placeholder: '请输入门店名称',
        type: 'field'
      },
      {
        key: 'specialShopCode',
        label: '专卖店编码',
        value: '',
        placeholder: '请输入专卖店编码',
        type: 'field'
      },
      {
        key: 'specialShopLevel',
        label: '行政分类',
        value: '',
        name: '',
        placeholder: '请选择行政分类',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'specialShopType',
        label: '专卖店类别',
        value: '',
        name: '',
        placeholder: '请选择专卖店类别',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'firstModifier',
        label: '修改人1姓名',
        value: '',
        placeholder: '请输入修改人1姓名',
        type: 'field'
      },
      {
        key: 'secondModifier',
        label: '修改人2姓名',
        value: '',
        placeholder: '请输入修改人2姓名',
        type: 'field'
      },
      {
        key: 'activityTheme',
        label: '活动主题',
        value: '',
        placeholder: '请输入活动主题',
        type: 'field'
      },
      {
        key: 'activityTime',
        label: '时间',
        startDate: '',
        endDate: '',
        placeholderStart: '请选择开始时间',
        placeholderEnd: '请选择结束时间',
        type: 'date',
      },
    ],
    headerTabList: [
      { name: '状态', type: 'status', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };

  // 页面内交互写在methods里
  methods = {

    // 跳转至代理商市场活动列表
    tabChange(){
      let url = `/pages/activity/agency-activity/list/index`
      wx.redirectTo({
        url: url
      })
    },

    // 跳转到详情
    viewDetail: (e: any) => {
      const { dataset: { type, id, source } } = e.currentTarget
      let url = `/pages/activity/specialty-activity/add/index?id=${id}&type=${type}&dataSource=${source}`
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

    // 筛选确定
    handleConfirm(e){
      let filterForm = e.sideFilterForm
      if(filterForm){
        filterForm.forEach((item)=>{
          if(item.key === 'activityTime'){
            this.filterForm.terms.startDate = item.startDate
            this.filterForm.terms.endDate = item.endDate
          }else{
            this.filterForm.terms[item.key] = item.value
          }
        })
      }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
    }

  };

  // 获取筛选列表接口
  getDictBytype(type){
    let param = {
      categoryName: type
    }
     return this.methods.getSpecialShopDictBytype(param).then((res)=>{
      let categoryList = []
      if(res.payload && res.payload.data){
        categoryList = res.payload.data.map((item)=>{
          return {
            ...item,
            id: item.code,
            value: item.name
          }
        })
      }
      return categoryList
    })
  }

  // 获取筛选条件列表并赋值
  getAllDictBytype(){
    // 活动类别
    this.getDictBytype('specialActivityType').then(res=>{
      this.sideFilterForm = this.sideFilterForm.map((item)=>{
        if(item.key === 'activityLabel'){
          item.options = res
        }
        return item
      })
      this.$apply()
    })
    // 行政分类
    this.getDictBytype('specialShopLevel').then(res=>{
      this.sideFilterForm = this.sideFilterForm.map((item)=>{
        if(item.key === 'specialShopLevel'){
          item.options = res
        }
        return item
      })
      this.$apply()
    })
    // 专卖店类别
     this.getDictBytype('specialShopType').then(res=>{
       this.sideFilterForm = this.sideFilterForm.map((item)=>{
         if(item.key === 'specialShopType'){
           item.options = res
         }
         return item
       })
       this.$apply()
    })
    // 活动状态
    this.getDictBytype('SPECIAL_ACTIVITY_STATUS').then(res=>{
      this.statusOptions = res
      this.$apply()
    })

  }

  myGetOrderList() {
    let { terms, page } = this.filterForm
    let statusName = ''
    if(terms.status && this.statusOptions.length){ // 根据id获取活动状态名称
      let filter = this.statusOptions.find((res)=>{
        return res.id == terms.status
      })
      statusName = filter.name
    }
    let data = {
      company: terms.company, // 分公司
      cisCode: terms.cisCode, // 门店编码
      fullName: terms.fullName, // 门店名称
      specialShopCode: terms.specialShopCode, // 专卖店编码
      specialShopLevel: terms.specialShopLevel, // 行政分类
      specialShopType: terms.specialShopType, // 专卖店类
      firstModifier: terms.firstModifier, // 修改人1姓名
      secondModifier: terms.secondModifier, // 修改人2姓名
      activityTheme: terms.activityTheme, // 活动主题
      activityLabel: terms.activityLabel, // 活动类别
      startTime: terms.startDate, // 活动开始时间
      endTime: terms.endDate, // 活动结束时间
      status: statusName, // 活动状态名称
      pageNo: page.pageNo,
      pageSize: page.pageSize,
    }
    this.methods.getSpecialShopActivityList({ _loading: true, ...data }).then((res)=>{
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
  onLoad() {
   this.getAllDictBytype()
  }

}
