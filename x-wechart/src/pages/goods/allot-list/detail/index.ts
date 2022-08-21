import wepy from 'wepy'
import {  baseUrl } from '@/utils/request'
import { dmsRequest } from '@/store/actions/dmsrequest'
import { formatDmsImg } from '@/utils/index';
import { canselOms } from '@/store/actions/salesorderdetail'
import { connect } from 'wepy-redux'
import Toast from '@/components/vant/toast/toast';
@connect({
}, {
  canselOms
})
export default class orderdetail extends wepy.page {
  config = {
    navigationBarTitleText: '调拨订单详情',
    usingComponents: {
      'van-button': '../../../../components/vant/button/index',
      'van-steps': '../../../../components/vant/steps/index',
      'van-popup': '../../../../components/vant/popup/index',
      'img': '../../../../components/img/index'
    }
  }
  data = {
    stretchFlag: true,
    baseUrl: baseUrl,
    documentNum: '',
    orderdetail: {},
    showCanselExamle:false, // 取消审核弹窗
    ExamineId:'' // 取消审核单号id
  }
  // 页面内交互写在methods里
  methods = {
    // 取消审核弹窗
    cancelExamine:() =>{
      this.showCanselExamle = false
    },
    // 打开审核弹框
    ordercanselExamine: () => {
      this.ExamineId = this.orderdetail.stvId
      this.showCanselExamle = true
      this.$apply()
    },
    // TODO:取消审核接口对接
    canselExamine: () => {
      this.showCanselExamle = false
      const id = this.ExamineId
      const account = wepy.$instance.globalData.account
      this.methods.canselOms({
        _loading: true,
        userAccount:account,
        stvId: id
      }).then((res) => {
        if(res && res.payload && res.payload.code == '0') {
          Toast.success('取消物流成功');
          this.methods.getAllotOrderDetail({ _loading: true, documentNum: this.documentNum })
        }
      })
    },
    stretchFlag: () => {
      this.stretchFlag = !this.stretchFlag
    },
    getAllotOrderDetail: (data) => {
      dmsRequest({
        data,
        method: 'getGicStockTransDetail'
      }).then(res => {
        this.orderdetail = res.data
        this.orderdetail.omsOrderStatus=this.orderdetail.omsOrderStatus.filter(it=>it.orderStatusName||it.remark)
        this.orderdetail.omsOrderStatus.forEach(item => {
          if(item.orderStatusName){
            item.text = `[${item.orderStatusName}] ${item.remark}`
          }else {
            item.text = item.remark
          }
          // item.desc = item.reserveTime
        })
        this.orderdetail.staItems.forEach((item) => {
          if (item.bdemandQty) {
            item.bdemandQty = Number(item.bdemandQty)
          }
          const { img, err } = formatDmsImg({ model: item.model, material: item.materialGroupCode})
          item.img = img
          item.err = err
        })
        this.$apply();
      })
    }
  }

  onLoad(e: { id: any; }) {
    const { documentNum } = e
    this.documentNum = documentNum
    this.methods.getAllotOrderDetail({ _loading: true, documentNum: this.documentNum })
  }
}
