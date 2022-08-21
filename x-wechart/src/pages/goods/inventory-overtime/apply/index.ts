import wepy from 'wepy'
import { request } from '@/utils/request'
import Toast from '@/components/vant/toast/toast'
import emptyDataType from "@/components/empty-data-type/index";

export default class InventoryOverTime extends wepy.page {
  config = {
    navigationBarTitleText: '库存共享申请',
    usingComponents: {
      'van-rate': '../../../../components/vant/rate/index',
      'van-icon': '../../../../components/vant/icon/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-picker': '../../../../components/vant/picker/index',
      'van-search': '../../../../components/vant/search/index',
      'van-tab': '../../../../components/vant/tab/index',
      'van-row': '../../../../components/vant/row/index',
      'van-col': '../../../../components/vant/col/index',
      'van-tabs': '../../../../components/vant/tabs/index',
      'van-checkbox': '../../../../components/vant/checkbox/index',
      'van-radio': '../../../../components/vant/radio/index',
      'van-radio-group': '../../../../components/vant/radio-group/index',
      'van-cell': '../../../../components/vant/cell/index',
      'van-field': '../../../../components/vant/field/index',
      'van-loading': '../../../../components/vant/loading/index',
      'van-stepper': '../../../../components/vant/stepper/index',
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'van-button': '../../../../components/vant/button/index',
      'calendar': '../../../../components/calendar/index',
      'img': '../../../../components/img/index',
      'van-datetime-picker': '../../../../components/vant/datetime-picker/index'
    }
  }
  components = {
    emptyDataType,
  };
  data = {
    showResult: false,
    inventoryList: [],
    filterForm: {},
    appleCode: ''
  }
  // 页面内交互写在methods里
  methods = {
    onCountChange(item, index, e) {
      this.inventoryList[index].quantity = e.detail
    },
    removeItem(index) {
      if(this.inventoryList.length<2){
        Toast('请至少保留一条记录！')
        return
      }
      this.inventoryList.splice(index, 1)
    },
    getList: () => {
      request({
        api: `exceedStockList/applyShare.htm`, method: 'get', data: {
          _loading: true,
          ...this.filterForm
        }
      }).then(res => {
        res.list.forEach(item => {
          item.quantity = Math.max((item.avbshareqty - (item.checkqty || 0)),0)
          item.maxQuantity =  item.quantity
          if(item.ininvdate){
            item.ininvdate = new Date(item.ininvdate).Format('yyyy/MM/dd')
          }
        })
        this.inventoryList = res.list
        this.$apply()
      })
    },
    submit: () => {
      let applys = ''
      let flag = true
      if(this.inventoryList.length<1){
        return
      }
      for (let i = 0; i < this.inventoryList.length; i++) {
        if (this.inventoryList[i].quantity > 0) {
          flag = false
        }
        applys += this.inventoryList[i].gicId
        applys += ','
        applys += this.inventoryList[i].quantity
        applys += ',2'
        if (i != this.inventoryList[i].length - 1) {
          applys += 'ytjl'
        }
      }
      if (flag) {
        Toast('共享数不能为0！')
        return
      }
      request({
        api: `exceedStockList/submitApply.nd`, method: 'POST', data: {
          _loading: true,
          applys: applys
        }
      }).then(res => {
        if (res.code == 0) {
          this.showResult = true
          this.appleCode = res.msg.replace('提交成功，申请单号为：', '')
          this.$apply()
        } else {
          Toast(res.msg)
        }
      })
    },
    goHome() {
      wx.reLaunch({
        url: '/pages/main/home/index'
      })
    },
    cancle() {
      wx.navigateBack()
    },
    goApply() {
      wx.navigateTo({
        url: '/pages/goods/inventory-overtime/index'
      })
    }
  }

  onLoad() {
    var self = this
    const eventChannel = this.$wxpage.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      const ids = data.data.map(it => it.gicId).join(',')
      self.filterForm.ids = ids
      self.filterForm.stockName = data.stockName
      self.filterForm.orgName = data.orgName
      console.log(data)
      self.methods.getList()
    })
  }
}
