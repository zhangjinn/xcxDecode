import wepy from 'wepy'
import utilsWxs from '../../../../wxs/utils.wxs'
import { connect } from 'wepy-redux'
import { getOperatePlanReach } from '@/store/actions/home'
import { getFxDictCisCode, grtFilterItemGroup, getExclusiveShopByCisCode } from '@/store/actions/search'
import { forEach } from 'ramda'
import {previousDay, formatDate} from '@/utils/index';
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
  previousDayDate: string;
  showRightBtn: boolean;
  headerTabList: any[];
}

@connect({
  // supplierList({ search }) {
  //   return search.supplierList
  // },
  matklList({ search }) {
    return search.dmsmatklList2
  },
  operatePlanData({ home }) {
    return home.operatePlanData
  }
}, {
  grtFilterItemGroup,
  getOperatePlanReach,
  getFxDictCisCode,
  getExclusiveShopByCisCode
})
export default class extends wepy.page {
  config = {
    navigationBarTitleText: '运营计划达成情况表',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-popup': '../../../../../components/vant/popup/index',
      'van-datetime-picker': '../../../../../components/vant/datetime-picker/index'
    }
  }
  components = {
    headerTab
  }
  data: Data = {
    previousDayDate: '', // 前一天日期
    supplierList: [],
    operateDataArr: [],
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
      name: '全部品类',
      code: ''
    },
    selectDate: (new Date()).Format('yyyy年MM月'),
    filterForm: {
      month: (new Date()).Format('yyyyMM'),
      operatorCode: '',
      cisShopCode: '',
      matklCode: '',
      reSellCode: '',
      isShop: 0
    },
    reportFlag: false,
    showRightBtn: false,
    headerTabList: [
      { name: '供应商', type: 'supplier', selectValue: '' },
      { name: '物料组', type: 'material', selectValue: '' },
      { name: (new Date()).Format('yyyy年MM月'), type: 'date', selectValue: (new Date()).Format('yyyy年MM月') },
    ], // 顶部搜索切换按钮列表
  }
  watch = {
    supplierItem: (e: any) => {
      this.methods.grtFilterItemGroup({
        type: 2,
        orgId: e.code
      }).then((res) => {
        const { payload: { matklList } } = res
        if (matklList && matklList.length > 0) {
          this.materialItem = {
            name: '全部品类',
            code: ''
          }
        }
        this.filterForm.matklCode = this.materialItem.code
        this.$apply()
        this.methods.getData()
      })
    }
  }
  wxs = {
    utils: utilsWxs
  }
  /**
   * 生命周期函数--监听页面加载
   */
  methods = {
    deliveryScale: () => {
      this.deliveryScale = !this.deliveryScale
    },
    deliverySchedule: () => {
      this.deliverySchedule = !this.deliverySchedule
    },
    openNotice: (number: any) => {
      if (number == '1') {
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

    onChooseMa(e: any) {
      this.reportFlag = false
      forEach((res: any) => {
        if (res.code == e) {
          if (res.isES) {
            this.supplierItem.reSellCode = ''
            this.supplierItem = {
              name: res.name,
              code: res.code,
              reSellCode:''
            }
          } else {
            this.supplierItem = {
              name: res.name,
              code: '',
              reSellCode:res.code
            }
          }
        }
      }, this.supplierList)
      this.filterForm = {
        ...this.filterForm,
        cisShopCode: this.supplierItem.code,
        isShop: this.supplierItem.code ? 1 : 0,
        reSellCode: this.supplierItem.code ? '' : this.supplierItem.reSellCode
      }
      this.headerTabList[0].selectValue = this.supplierItem.reSellCode
      this.purchaseVisable = false
      this.$apply()
    },
    // 选择物料组
    onMaterial(e: any) {
      forEach((res: any) => {
        if (res.code == e) {
          this.materialItem = {
            name: res.name,
            code: res.code
          }
        }
      }, this.matklList)
      this.purchaseVisable = false
      this.reportFlag = false
      this.filterForm.matklCode = this.materialItem.code
      this.headerTabList[1].selectValue = this.materialItem.code
      this.$apply()
      this.methods.getData()
    },
    // 选择时间
    onInput(e: { detail: any; }) {
      this.currentDate = e.detail
    },
    onConfirm(e: { detail: string; }) {
      this.reportFlag = false
      this.purchaseVisable = false
      let date = new Date(parseInt(e.detail))
      let Y = date.getFullYear() + '年'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      const date1 = Y + M
      this.selectDate = date1
      this.headerTabList[2].name = this.selectDate
      let Y1 = date.getFullYear()
      let M1 = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      const a = Y1.toString()
      const date2 = a + M1
      this.filterForm.month = date2
      this.methods.getData()
    },
    onCancel() {
      this.reportFlag = false
      this.purchaseVisable = false
    },
    getData: () => {
      this.methods.getOperatePlanReach(this.filterForm).then(res => {
        if (this.filterForm.matklCode) {
          this.operateDataArr = this.operatePlanData.arr.slice(1)
        } else {
          this.operateDataArr = this.operatePlanData.arr
        }
        this.$apply()
      })
    }
  }

  onShow() {
    this.previousDayDate = previousDay() //前一天

    this.methods.getFxDictCisCode().then((res) => {
      const data = { cisCode: wepy.$instance.globalData.cisCode }
      this.methods.getExclusiveShopByCisCode(data).then((res2) => {
        this.supplierList = [];
        this.supplierItem = {
          name: '全部',
          code: ''
        };
        (res.payload.list || []).map(i => {
          this.supplierList.push({
            code: i.code,
            name: i.name
          })
        });
        (res2.payload || []).map(i => {
          this.supplierList.push({
            code: i.cisCode,
            name: i.searchTerm,
            isES: true
          })
        });
        this.$apply();
      })
      // if(res && res.payload && res.payload.list && res.payload.list.length > 0) {
      //   this.supplierItem = {
      //     name: '全部',
      //     code: ''
      //   }
      // }
      // this.filterForm = {...this.filterForm,cisShopCode: ''}
      this.$apply()
    })
    this.methods.grtFilterItemGroup({
      type: 2,
      orgId: ''
    }).then((res) => {
      const { payload: { matklList } } = res
      if (matklList && matklList.length > 0) {
        this.materialItem = {
          name: '全部品类',
          code: ''
        }
      }
      this.filterForm.matklCode = this.materialItem.code
      this.$apply()
    })
    // {
    //   month: moment(month).format("YYYYMM"),
    //     operatorCode: cisCode,
    //   reSellCode: exclusiveShopCode ? "" : reSellCode,
    //   matklCode: matklCode,
    //   cisShopCode: exclusiveShopCode,
    //   isShop: exclusiveShopCode ? 1 : 0,
    // }
    this.filterForm.operatorCode = wepy.$instance.globalData.cisCode
    this.methods.getData()
  }
}
