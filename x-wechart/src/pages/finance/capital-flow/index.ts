import wepy from 'wepy';
import {connect} from 'wepy-redux';
import { getCapitalFlowQueryConditions, getCreditRange, getCapitalFlowList } from '@/store/actions/fund-claim';
import utilsWxs from '../../../wxs/utils.wxs'
import Toast from "@/components/vant/toast/toast";
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  visible: boolean;
  filterForm: object;
  scrollTop: number;
  CurrentFilterName: string,
  accountVisable:boolean;
  accountOption: any[];
  purchaseVisable:boolean;
  minDate: number,
  maxDate: number;
  currentDate: number,
  popupTitle: string,
  agentPopup: boolean,
  salesOrgList: any[],
  creditRangeList: any[],
  businessTypeList: any[],
  orderList: any[],
  partnershipList: any[],
  balanceInfo: object,
  imgObj: object,
}

@connect({

}, {
  getCapitalFlowQueryConditions, // 资金流水查询条件
  getCreditRange, // 资金流水信贷范围
  getCapitalFlowList, // 资金流水列表
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '资金流水',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      "van-datetime-picker": "../../../components/vant/datetime-picker/index",
      'calendar': '../../../components/calendar/index',

    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {
    imgObj: {
      'capitalFlowBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993552565_1e5b20e22972438db36ec5843b113356.png',
    },
    visible: false,
    scrollTop: -1,
    filterForm: {
      terms: {
        accountId: '',
        accountName: '',
        queryDate: (new Date()).Format('yyyy.MM'),
        status: 'ALL',
        salesOrgId: '',
        salesOrgName: '',
        partnershipId: '1',
        partnershipName: '是',
        creditRangeId: '',
        creditRangeName: '',
        certificate: '',
        businessTypeId: '',
        businessTypeName: '',
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        totalPages: 0,
        totalRows: 0,
      },
    },
    CurrentFilterName: '',
    accountVisable: false,
    accountOption:[],
    purchaseVisable: false,
    minDate: new Date(2000, 10, 1).getTime(),
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    popupTitle: '',
    agentPopup: false,
    salesOrgList: [],
    creditRangeList: [],
    businessTypeList: [],
    orderList: [],
    balanceInfo: {},
    partnershipList:[{ // 仅查合作关系 1仅合作 2全部
      id:'1',
      name:'是'
    },{
      id:'2',
      name:'否'
    }]
  };
  wxs = {
    utils: utilsWxs
  }
  // 页面内交互写在methods里
  methods = {
    // 选择快捷筛选内容列表
    onSelectStatus(status) {
      if(!status){
        return
      }
      this.filterForm.terms = { ...this.filterForm.terms, status }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    // 点击普通筛选按钮-显示或隐藏左侧筛选框
    orderfiltering: () => {
      this.visible = !this.visible
    },

    // 筛选确定
    onSubmitFilterForm() {
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
      this.methods.scrollToTop()
    },

    // 筛选重置
    async onResetFilterForm() {
      this.filterForm.terms = {
        ...this.filterForm.terms,
        salesOrgId: '',
        salesOrgName: '',
        partnershipId: '1',
        partnershipName: '是',
        creditRangeId: '',
        creditRangeName: '',
        certificate: '',
        businessTypeId: '',
        businessTypeName: '',
      }
      if(this.salesOrgList && this.salesOrgList.length){
        this.filterForm.terms = { ...this.filterForm.terms, salesOrgId: this.salesOrgList[0].id, salesOrgName: this.salesOrgList[0].name}
      }
      await this.getCreditRangeDate()
    },

    touchFilter: (name: string) => {
      if (!this.purchaseVisable) {
        this.purchaseVisable = true
        this.CurrentFilterName = name
        return
      }
      if (!name) {
        this.purchaseVisable = false
        this.CurrentFilterName = ''
        return
      }
      if (this.CurrentFilterName === name) {
        this.purchaseVisable = false
        this.CurrentFilterName = ''
        return
      }

      this.purchaseVisable = false
      this.CurrentFilterName = ''
    },

    // 选择账号
    async onAccountchange(item){
      this.filterForm.terms = { ...this.filterForm.terms, accountId: item.id, accountName: item.name }
      this.methods.touchFilter()
      await this.getCreditRangeDate()
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    // 选择时间
    onInput(e: { detail: any; }) {
      this.currentDate = e.detail
    },
    // 确定选择日期
    onConfirm(e: { detail: string; }) {
      this.purchaseVisable = false
      let date = new Date(parseInt(e.detail))
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      this.filterForm.terms = { ...this.filterForm.terms, queryDate: Y + '.' + M }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.scrollToTop()
    },

    // 侧边弹框输入框赋值
    onFilterFormChange(evt) {
      const { detail, currentTarget: { dataset: { name } } } = evt
      this.filterForm.terms = { ...this.filterForm.terms, [name]: detail }
    },

    // 右侧筛选弹框，弹框中各筛选列表显示切换
    selectAgentPopup: (e) => {
      if (e == 'salesOrg') {
        this.popupTitle = '销售组织'
      } else if (e == 'partnership') {
        this.popupTitle = '仅查合作关系'
      } else if (e == 'creditRange') {
        this.popupTitle = '信贷范围'
      } else if(e == 'businessType'){
        this.popupTitle = '业务类型'
      }
      this.agentPopup = !this.agentPopup
    },

    selectStatus: (value: any, id: any) => {
      if(this.popupTitle == '销售组织'){
        this.filterForm.terms = { ...this.filterForm.terms, salesOrgId: id, salesOrgName: value}
        this.getCreditRangeDate()
      }else if(this.popupTitle == '仅查合作关系'){
        this.filterForm.terms = { ...this.filterForm.terms, partnershipId: id, partnershipName: value}
        // this.getCreditRangeDate()
      }else if(this.popupTitle == '信贷范围'){
        this.filterForm.terms = { ...this.filterForm.terms, creditRangeId: id, creditRangeName: value}
      }else if(this.popupTitle == '业务类型'){
        this.filterForm.terms = { ...this.filterForm.terms, businessTypeId: id, businessTypeName: value}
      }
      this.methods.selectAgentPopup()
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
      let { page } = this.filterForm
      if (page.totalPages > page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.myGetOrderList()
      }
    },

  };

  myGetOrderList() {
    let { terms, page } = this.filterForm
    let yearMonth = ''
    if(terms.queryDate){
      yearMonth = terms.queryDate.split('.')[0] + terms.queryDate.split('.')[1]

    }
    let data = {
      mdmCode: terms.accountId, // 必填，选择账户
      djFlag: terms.partnershipId, // 仅查合作关系 1仅合作 2全部
      orgCode: terms.salesOrgId, // 必填，销售组织
      creditRange: terms.creditRangeId, // 必填，信贷范围
      yearMonth: yearMonth, // 必填，查询月份
      voucher: terms.certificate, // 交易凭证
      businessType: terms.businessTypeId, // 业务类型 1 订单支付  2重置 3其他
      inOutType: terms.status == 'ALL' ? '' : terms.status, // 1是支出，0收入
      pageSize: page.pageSize, // 必填
      pageNo: page.pageNo, //必填
    }
    Toast.loading({
      forbidClick: true,
      message: '加载中...',
    });
    this.methods.getCapitalFlowList(data).then((res)=>{
      Toast.clear()
      if(res && res.payload && res.payload){

        if(res.payload.balanceInfo){
          this.balanceInfo = res.payload.balanceInfo
        }
        if(res.payload.list){
          if(res.payload.currentPage>1){
            this.orderList=this.orderList.concat(res.payload.list)
          }else{
            this.orderList = res.payload.list
          }
        }

        this.filterForm.page = { ...this.filterForm.page, totalPages: res.payload.totalPages, totalRows: res.payload.totalRows }
      }
      this.$apply()
    })
  }

  async getFilterList(){
    await this.methods.getCapitalFlowQueryConditions().then((res)=>{
      if(res && res.payload && res.payload.data){
        let oData = res.payload.data

        this.accountOption = oData.custDict.map((item)=>{
          return {
            id:item.code,
            name:item.name,
          }
        })
        if(this.accountOption && this.accountOption.length){
          this.filterForm.terms = { ...this.filterForm.terms, accountId: this.accountOption[0].id, accountName: this.accountOption[0].name}
        }

        this.salesOrgList = oData.orgDict.map((item)=>{
          return {
            id:item.code,
            name:item.name,
          }
        })
        if(this.salesOrgList && this.salesOrgList.length){
          this.filterForm.terms = { ...this.filterForm.terms, salesOrgId: this.salesOrgList[0].id, salesOrgName: this.salesOrgList[0].name}
        }

        this.businessTypeList = oData.businessTypeDict.map((item)=>{
          return {
            id:item.code,
            name:item.name,
          }
        })
        this.$apply()
      }
    })
    await this.getCreditRangeDate()
    this.myGetOrderList()
  }

  // 获取信贷范围选择列表
  async getCreditRangeDate(){
    this.filterForm.terms = { ...this.filterForm.terms, creditRangeId: '', creditRangeName: ''}

    let { terms } = this.filterForm
    let param = {
      mdmCode: terms.accountId, // mdm编码
      orgCode: terms.salesOrgId, // 组织编码
      // djFlag: terms.partnershipId, // 1,仅查合作关系 2,全部 ；该值目前不传了
    }
   await this.methods.getCreditRange(param).then((res)=>{
      if(res && res.payload && res.payload.list){
        let oData = res.payload.list
        this.creditRangeList = oData.map((item)=>{
          return {
            id:item.code,
            name:item.name,
          }
        })
        if(this.creditRangeList && this.creditRangeList.length){
          this.filterForm.terms = { ...this.filterForm.terms, creditRangeId: this.creditRangeList[0].id, creditRangeName: this.creditRangeList[0].name}
        }
      }
      this.$apply()
    })
  }

  onShow() {
    this.getFilterList()

  }

}
