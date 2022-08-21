import wepy from 'wepy'
import { request } from '@/utils/request'
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

export default class InventoryOverTime extends wepy.page {
  config = {
    navigationBarTitleText: '共享申请明细',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'van-checkbox': '../../../components/vant/checkbox/index',
      'van-radio': '../../../components/vant/radio/index',
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-button': '../../../components/vant/button/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
      'van-datetime-picker': '../../../components/vant/datetime-picker/index'
    }
  }
  components = {
    emptyDataType,
    headerTab,
  };
  data = {
    shareFlag: '流程状态',
    visible: false,
    warehouseVisible: false,
    qualityGradeVisible: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    currentDateName: '',
    dateSelVisable: false,
    currentDate: new Date().getTime(),
    dateType: 'endTime',
    filterForm: {
      productName: '',   //主题
      shareFlag: '', //流程状态
      pageSize: 15,
      pageNo: 1,
      dateEnd: '',
      dateStart: '',
      checkDateEnd:'',
      checkDateStart:'',
    },
    startTimeStr: '',
    endTimeStr: '',
    startTimeStr1: '',
    endTimeStr1: '',
    shareFlagList: [
      {
        'key': '0', 'value': '运行'
      },
      {
        'key': '1', 'value': '结束'
      }
    ],
    scrollTop:0,
    totalPage:0,
    list: [],
    headerTabList: [
      { name: '流程状态', type: 'shareFlag', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  }
  // 页面内交互写在methods里
  methods = {
    onGetOrderListNext:()=> {
      if (this.totalPage > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1 }
        this.methods.getList('next')
      }
    },
    gotoDetail(item) {
      wx.navigateTo({
        url: '/pages/goods/inventory-share-record/detail/index?applyNo='+item.applyNo,
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('inventory_share_record_page', { data: JSON.parse(JSON.stringify(item)) })
        }
      })
    },
    getList:(type)=> {
      if(type!='next'){
        this.filterForm.pageNo =1
      }
      const form ={
        status:this.filterForm.shareFlag,
        pageSize:this.filterForm.pageSize,
        pageNo:this.filterForm.pageNo,
        theme:this.filterForm.productName,
        checkDateStart:this.filterForm.checkDateStart,
        checkDateEnd:this.filterForm.checkDateEnd,
        dateStart:this.filterForm.dateStart,
        dateEnd:this.filterForm.dateEnd,
      }
      request({
        api: `exceedStockList/applyFlowLog.htm`, method: 'POST', data: form
      }).then(res => {
        this.totalPage = res.totalPages
        res.list.forEach(it=>{
          it.createdDateShow = new Date(it.createdDate).Format('yyyy/MM/dd')
        })
        let data = res.list
        if (this.list && this.list.length > 0 && data.length > 0&&type=='next') {
          this.list = [].concat(this.list, data)
        } else {
          this.list = data
          this.scrollTop=this.scrollTop?0:1
        }
        this.$apply()
      })
    },
    openDateSel: (dateType) => {
      if (dateType === 'startTime' && this.filterForm.dateStart) {
        this.currentDate = new Date(this.filterForm.dateStart).getTime()
      } else if (dateType === 'endTime' &&this.filterForm.dateEnd) {
        this.currentDate = new Date(this.filterForm.dateEnd).getTime()
      }else if (dateType === 'startTime1' && this.filterForm.checkDateStart) {
        this.currentDate = new Date(this.filterForm.checkDateStart).getTime()
      } else if (dateType === 'endTime1' &&this.filterForm.checkDateEnd) {
        this.currentDate = new Date(this.filterForm.checkDateEnd).getTime()
      }
      this.dateType = dateType
      this.dateSelVisable = true
    },
    clearTime:()=>{
      this.filterForm.dateStart = ''
      this.startTimeStr = ''
      this.filterForm.dateEnd = ''
      this.endTimeStr = ''
    },
    clearTime1:()=>{
      this.filterForm.checkDateStart = ''
      this.startTimeStr1 = ''
      this.filterForm.checkDateEnd = ''
      this.endTimeStr1 = ''
    },
    onConfirm: (e) => {
      this.dateSelVisable = false
      var date = new Date(parseInt(e.detail))
      var Y = date.getFullYear()
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      var date1 = Y + '年' + M + '月' + D + '日'
      var date2 = Y + '-' + M + '-' + D
      if (this.dateType === 'startTime') {
        this.filterForm.dateStart = date2
        this.startTimeStr = date1
      } else if (this.dateType === 'endTime'){
        this.filterForm.dateEnd = date2
        this.endTimeStr = date1
      }else  if (this.dateType === 'startTime1') {
        this.filterForm.checkDateStart = date2
        this.startTimeStr1 = date1
      } else if (this.dateType === 'endTime1'){
        this.filterForm.checkDateEnd = date2
        this.endTimeStr1 = date1
      }
    },
    onCancel: () => {
      this.dateSelVisable = false
    },
    // 供应商选择
    touchOrderSFilter: (tabItem) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      this.OrderSFilterVisible = !this.OrderSFilterVisible
      this.CurrentOrderSFilterName = name
    },
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 流程状态
    onshareFlagType(code: any, name: string) {
      this.shareFlag = name
      this.filterForm = { ...this.filterForm, shareFlag: code, pageNo: 1 }
      this.headerTabList[0].selectValue = code
      this.methods.touchOrderSFilter()
      this.methods.getList()
    },
    onSubmitFilterForm() {
      this.filterForm = { ...this.filterForm, pageNo: 1 }
      this.methods.getList()
      this.visible = !this.visible
    },
    // 重置侧边栏
    onSubmitFilterFormReset() {
      this.filterForm.productName = ''
      this.filterForm.dateStart = ''
      this.filterForm.dateEnd = ''
      this.filterForm.checkDateStart = ''
      this.filterForm.checkDateEnd = ''
      this.filterForm.shareFlag = ''
      this.shareFlag = '流程状态'
        this.endTimeStr = ''
      this.endTimeStr1 = ''
      this.startTimeStr = ''
      this.startTimeStr1 = ''
      this.filterForm.pageNo = 1
    },
    setproductName: (e) => {
      this.filterForm.productName = e.detail
    }
  }

  onLoad() {
    this.methods.getList()
  }
}
