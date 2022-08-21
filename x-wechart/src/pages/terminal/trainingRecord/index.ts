import wepy from 'wepy';
import {request} from "@/utils/requestJSON";
import Toast from "@/components/vant/toast/toast";
import {concat} from "ramda";
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  visible: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  filterForm: object;
  filterFormExtra: object;
  scrollTop: number;
  popupTitle: string;
  agentPopup: boolean;
  dateOption: object[];
  currentYear: number | string;
  currentMonth: number | string;
  lookSelfOption: object[];
  trainingRecordList: object[];
  headerTabList: any[];
}

export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '培训记录',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
    },
  };
  data: Data = {
    visible: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        date: '',
        startTime: '',
        endTime: '',
        name: '', // 任务主题
        isSelf: '', // 是否仅自己-1仅自己 0或不传 查全部
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: 0
      },
    },
    filterFormExtra: {
      isSelfName: '',
    },
    popupTitle: '',
    agentPopup: false,
    dateOption: [],
    currentYear: '',
    currentMonth: '',
    lookSelfOption:[
      {
        key: '1',
        value: '是'
      },
      {
        key: '0',
        value: '否'
      }
    ],
    trainingRecordList: [],
    headerTabList: [
      { name: '本月', type: 'orderDate', selectValue: '本月' },
    ], // 顶部搜索切换按钮列表
  };
  components = {
    emptyDataType,
    headerTab,
  };
  // 页面内交互写在methods里
  methods = {

    // 跳转到详情
    viewDetail: (id: any) => {
      if (id) {
        let url = `/pages/terminal/trainingDetails/index?id=${id}`
        wx.navigateTo({
          url: url
        })
      }
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
      if (['orderDate'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 选择快捷筛选内容列表
    onSelectDate(date) {
      let param = `${this.currentYear}-${date}`
      let dateRange = this.getDateTime(param)
      let newDate = {
        date: date,
        startTime: dateRange.startTime,
        endTime: dateRange.endTime,
      }
      this.filterForm.terms = { ...this.filterForm.terms, ...newDate }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      if(this.currentMonth == this.filterForm.terms.date){
        this.headerTabList[0].name = '本月'
      }else {
        this.headerTabList[0].name = `${this.currentYear}年${this.filterForm.terms.date}月`
      }
      this.trainingRecordList = []
      this.methods.touchOrderSFilter()
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    // 点击普通筛选按钮-显示或隐藏左侧筛选框
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 筛选确定
    onSubmitFilterForm() {
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.trainingRecordList=[]
      this.myGetOrderList()
      this.methods.orderfiltering()
      this.methods.scrollToTop()
    },

    // 筛选重置
    onResetFilterForm() {
      this.filterForm.terms = {
        ...this.filterForm.terms,
        name: '',
        isSelf: '',
      }
      this.filterFormExtra = {
          isSelfName: '',
      }
    },

    // 改变活动名称
    onNameChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, name: e.detail }
    },

    // 改变仅看自己
    onSelectMethodChange(org: any) {
      const { key, value } = org
      if (this.filterForm.terms.isSelf === key) {
        this.filterForm.terms = { ...this.filterForm.terms, isSelf: '' }
        this.filterFormExtra = { ...this.filterFormExtra, isSelfName: '' }
        return
      }
      this.filterForm.terms = { ...this.filterForm.terms, isSelf: key }
      this.filterFormExtra = { ...this.filterFormExtra, isSelfName: value }
      this.agentPopup = false
    },

    // 修改筛选条件列表弹框标题，并显示对应列表内容
    selectagentPopup: (e) => {
      // if (e == 'source') {
      //   this.popupTitle = '活动来源'
      // } else
      if (e == 'isSelf') {
        this.popupTitle = '仅看自己'
      }
      this.agentPopup = !this.agentPopup
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
      if (this.filterForm.page.totalPages > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.myGetOrderList()
      }
    },

  };

  //js根据年-月获取开始和结束时间
  getDateTime(date) {
    let timeArr = date.split('-')
    let year = parseInt(timeArr[0])
    let month = parseInt(timeArr[1])

    let startTime = new Date(year,month - 1);
    let endTime = new Date(new Date(year, month).valueOf()-60*60*1000*24)

    function datasFormat(d){
      let datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      return datetime;
    }

    let formatStartTime = datasFormat(startTime)
    let formatEndTime = datasFormat(endTime)
    return {
      startTime: formatStartTime,
      endTime: formatEndTime
    }
  }

  // 获取培训记录
  myGetOrderList() {
    let { terms, page } = this.filterForm
    let data = {
      pageNo: page.pageNo, // 页码
      pageSize: page.pageSize, // 每页数量
      startTime: terms.startTime,
      endTime: terms.endTime,
      title: terms.name, // 任务主题
      isSelf: terms.isSelf, // 是否仅自己-1仅自己 0或不传 查全部
      serviceCode:'getTrainingRecordAppXtw'
    }
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
    request({
      api: `cts/ctsApi.nd?`,
      data: data,
      method:'POST',
      callback: (res) => {
        Toast.clear();
        const { data } = res

        if(data.returnData && data.returnData.list){
          this.filterForm.page.totalPages = data.returnData.totalPages
          this.filterForm.page.totalCount = data.returnData.totalCount
          if (this.filterForm.page.pageNo > 1) {
            this.trainingRecordList = concat(this.trainingRecordList, data.returnData.list)
          } else {
            this.trainingRecordList = data.returnData.list
          }
        }
        this.$apply()
      }
    })
  }

  // 获取日期
  async getDate(){
    //初始化年
    let now = new Date();
    this.currentYear = now.getFullYear();

    //初始化月
    for (let i = 1;i <= 12; i++) {
      let j=i<10 ? '0'+i : i;
      this.dateOption.push({
        month:j,
        monthName:`${this.currentYear}年${j}月`
      })
    }
    let month = now.getMonth() + 1;
    month = month < 10 ? '0' + month : month;

    let param = `${this.currentYear}-${month}`
    let dateRange = await this.getDateTime(param)

    let newDate = {
      date: month,
      startTime: dateRange.startTime,
      endTime: dateRange.endTime,
    }
    this.filterForm.terms = { ...this.filterForm.terms, ...newDate }
    this.currentMonth = month

    this.trainingRecordList = []
    this.myGetOrderList()
    this.$apply()
  }
  onShow() {
    this.getDate()
  }

}
