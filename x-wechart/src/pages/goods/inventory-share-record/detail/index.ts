import wepy from 'wepy'
import { request } from '@/utils/request'

export default class InventoryOverTime extends wepy.page {
  config = {
    navigationBarTitleText: '共享申请详情',
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
      'van-steps': '../../../../components/vant/steps/index',
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
  data = {
    active:0,
    applyNo:'',
    detail:{},
    list:[],
    steps: []
  }
  // 页面内交互写在methods里
  methods = {
    getDetail:()=>{
      request({
        api: `exceedStockList/applyLog.htm`, method: 'POST', data: {
          applyNo:this.applyNo
        }
      }).then(res => {
        res.list.forEach(it=>{
          it.ininvdate =  new Date(it.ininvdate).Format('yyyy/MM/dd')
        })
        this.list = res.list
        this.$apply()
      })
    }
  }

  onLoad(option) {
    this.applyNo=option.applyNo
    this.methods.getDetail()
    var self = this
    const eventChannel = this.$wxpage.getOpenerEventChannel()
    eventChannel.on('inventory_share_record_page', function(data) {
      if(data.data.modifiedDate){
        data.data.modifiedDate2= new Date(data.data.modifiedDate).Format('yyyy/MM/dd hh:mm:ss')
        data.data.modifiedDate= new Date(data.data.modifiedDate).Format('yyyy/MM/dd')
      }
      if(data.data.createdDate){
        data.data.createdDate2= new Date(data.data.createdDate).Format('yyyy/MM/dd hh:mm:ss')
        data.data.createdDate= new Date(data.data.createdDate).Format('yyyy/MM/dd')
      }
      self.detail = data.data
      const steps =[
        {
          'text':'发起审批', 'desc':  data.data.createdDate2+'　　申请人：'+data.data.creator
        }
      ]
      if(data.data.modifier&&data.data.modifiedDate){
        steps.unshift(
          {
            'text':'分公司审批', 'desc':  data.data.modifiedDate2+'　　审批人：'+data.data.modifier
          })
      }
      self.steps= steps
      console.log(data)
    })
  }
}
