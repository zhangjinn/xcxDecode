import wepy from 'wepy';
import utilsWxs from '../../../../wxs/utils.wxs';
import { connect } from 'wepy-redux';
import { getO2oShopList,getSettleStatistic } from '@/store/actions/home';
import { forEach } from 'ramda';
import Dialog from '@/components/vant/dialog/dialog';
import {previousDay, formatDate, getAlertInfo} from '@/utils/index';
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  option1: null,
  option2: null,
  ringChart: Object,
  purchaseVisable: boolean,
  CurrentFilterName: string,
  maxDate: number;
  currentDate: number,
  minDate: number,
  supplierItem: Object,
  materialItem: Object,
  selectDate: string,
  filterForm: Object,
  reportFlag: boolean,
  deliveryAmount: boolean;
  whichPopup: boolean;
  deliverySchedule: boolean;
  deliveryScale: boolean;
  dynamicMessage: object;
  previousDayDate: string;
  showRightBtn: boolean;
  headerTabList: any[];
}
@connect({
  operatePlanData({ home }) {
    return home.operatePlanData
  }
}, {
  getO2oShopList,
  getSettleStatistic
})
export default class extends wepy.page {
  config = {
    navigationBarTitleText: '我的收入(O2O)',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-popup': '../../../../../components/vant/popup/index',
      "van-datetime-picker": "../../../../../components/vant/datetime-picker/index",
      'van-dialog': '../../../../../components/vant/dialog/index'
    },
  };
  components = {
    headerTab
  }
  data: Data = {
    previousDayDate: '', // 前一天日期
    dynamicMessage: { // 动态获取提示信息汇总
      incomeStatement: '', // 收入说明
    },
    supplierList:[],
    deliveryAmount: false,
    whichPopup: false,
    deliverySchedule: false,
    deliveryScale: false,
    option1: null,
    option2: null,
    ringChart: {},
    purchaseVisable: false,
    CurrentFilterName: '',
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(2000, 10, 1).getTime(),
    supplierItem: {
      name: '全部',
      code: ''
    },
    materialItem: {
      name: '全部',
      code: ''
    },
    selectDate: (new Date()).Format('yyyy年MM月'),
    filterForm: {
      shopCisCode: ''
    },
    reportFlag: false,
    incomeData:{},
    showRightBtn: false,
    headerTabList: [ // 只有供应商
      { name: '供应商', type: 'supplier', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };
  wxs = {
    utils: utilsWxs,
  };
  /**
   * 生命周期函数--监听页面加载
   */
  methods = {
    openQuestionDialog:()=>{
      Dialog.alert({
        className:'o2o-dialog',
        confirmButtonText:'我知道了',
        title: '收入说明',
        message: this.dynamicMessage.incomeStatement,
      }).then(() => {
        // on close
      });
      // this.surePopShow = true
    },
    deliveryScale:() => {
      this.deliveryScale = !this.deliveryScale
    },
    deliverySchedule:() => {
      this.deliverySchedule = !this.deliverySchedule
    },
    openNotice:(number: any) => {
      if(number == '1') {
        this.deliveryAmount = !this.deliveryAmount
        this.whichPopup = false
      } else if (number == '2') {
        this.whichPopup = !this.whichPopup
        this.deliveryAmount = false
      }
    },
    // 选择供应商
    touchFilter: (tabItem) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      if (!this.purchaseVisable) {
        this.purchaseVisable = true
        this.reportFlag = true
        this.CurrentFilterName = name
        return
      }
      if (!name) {
        this.purchaseVisable = false
        this.reportFlag = false
        this.CurrentFilterName = ''
        return
      }
      if (this.CurrentFilterName === name) {
        this.purchaseVisable = false
        this.reportFlag = false
        this.CurrentFilterName = ''
        return
      }
      if (['supplier', 'material'].indexOf(name) > -1) {
        this.CurrentFilterName = name
        return
      }
      this.purchaseVisable = false
      this.reportFlag = false
      this.CurrentFilterName = ''
    },

    onChooseMa( e: any ) {
      this.reportFlag = false
      forEach((res: any) => {
        if(res.code == e) {
          this.supplierItem = {
            name: res.name,
            code: res.code
          }
        }
      },this.supplierList)
      this.filterForm = {...this.filterForm,shopCisCode: this.supplierItem.code}
      this.headerTabList[0].selectValue = this.supplierItem.code
      this.purchaseVisable = false
      this.methods.getData();
      this.$apply()
    },
    // 选择物料组
    onMaterial(e: any) {
      forEach((res: any) => {
        if(res.code == e) {
          this.materialItem = {
            name: res.name,
            code: res.code
          }
        }
      },this.matklList)
      this.purchaseVisable = false
      this.reportFlag = false
      this.filterForm = {...this.filterForm, matklCode: this.materialItem.code}
      this.$apply()
      this.methods.getData();
    },
    // 选择时间
    onInput(e: { detail: any; }) {
      this.currentDate = e.detail
    },
    onConfirm(e: { detail: string; }) {
      this.reportFlag = false
      this.purchaseVisable = false
      let date = new Date(parseInt(e.detail))
      let Y = date.getFullYear() + '年';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
      const date1 = Y + M
      this.selectDate = date1
      let Y1 = date.getFullYear();
      let M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      const a = Y1.toString()
      const date2 = a + M1
      this.filterForm.month = date2
      this.methods.getData();
    },
    onCancel() {
      this.reportFlag = false
      this.purchaseVisable = false
    },
    getData:()=>{
      if(!this.filterForm.shopCisCode){
        return
      }
      this.methods.getSettleStatistic(this.filterForm).then(res=>{
        if(res.payload.code!==0){
          this.incomeData =  {
            lastMonthRebate: 0,
            lastMonthReward: 0,
            lastMonthTotalFee: 0,
            monthSaleFee: 0,
            sumAlreadyRebateFee: 0,
            thisMonthRebate: 0,
            thisMonthReward: 0,
            thisMonthTotalFee: 0,
            waitSettleRebate: 0,
            waitSettleReward: 0,
            yearSaleFee: 0,
          }
        }else{
          this.incomeData = res.payload.data
        }
       this.$apply();
      })
    }
  }
  // 动态获取提示信息
  getAlert(){
    let incomeStatement = getAlertInfo('14922074377')
    this.dynamicMessage = { // 动态获取提示信息汇总
      ...this.dynamicMessage,
      incomeStatement, // 收入说明
    }
  }
  onShow() {
    this.methods.getO2oShopList().then((res) => {
      if(res && res.payload && res.payload.list && res.payload.list.length > 0) {
        this.supplierList = res.payload.list.map(it=>{
          return{
            code:it.cisCode,
            name:it.name
          }
        })
        this.supplierItem = {
          name: this.supplierList[0].name,
          code: this.supplierList[0].code
        }
      }else{
        this.supplierList = []
        this.supplierItem = {
          name: '',
          code: ''
        }
      }
      this.filterForm = {...this.filterForm,shopCisCode:  this.supplierItem.code}
      this.headerTabList[0].selectValue = this.supplierItem.code
      this.methods.getData();
      this.$apply()
    })
  }
  onLoad() {
    this.previousDayDate = previousDay()
    this.getAlert()
    this.$apply();
  }
}
