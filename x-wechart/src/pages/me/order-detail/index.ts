import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { getOrderDetail,queryCisOrderStatusInfoMobile } from '@/store/actions/order-detail';
import Toast from '@/components/vant/toast/toast';
import { request, baseUrl } from '@/utils/request';
import {checkCombinationPurchase, fillZero, formatDate, getDateDiff, getAlertInfo} from '@/utils/index';
import { dmsRequest } from '@/store/actions/dmsrequest';
import utilsWxs from '../../../wxs/utils.wxs';
import Dialog from '@/components/vant/dialog/dialog';
interface Data {
  stretchFlag: boolean,
  visible: boolean;
  orderpopup: boolean;
  id: string;
  viewmore: boolean;
  baseUrl: string;
  commentForm: object;
  commentVisible: boolean;
  calendarConfig: object;
  calendarVisible: boolean;
  currentOrderId: string;
  commentDetailVisible: boolean;
  commentDetail: object;
  statusObj: object;
  psType:string,
  isImg: boolean,
  isCheckedAll: boolean,
  checkedIds: any[],
  dynamicMessage:object,
}

@connect({
  orderdetail({ orderdetail }) {
    return orderdetail.orderdetail
  },
}, {
  getOrderDetail,
  queryCisOrderStatusInfoMobile
})
export default class orderdetail extends wepy.page {
  config = {
    navigationBarTitleText: '订单详情',
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
      'van-radio': '../../../components/vant/radio/index',
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-button': '../../../components/vant/button/index',
      'van-steps': '../../../components/vant/steps/index',
      'van-checkbox': '../../../components/vant/checkbox/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
      "van-dialog": "/components/vant/dialog/index",
    },
  };
  data: Data = {
    stretchFlag: false,
    visible: false,
    orderpopup: false,
    id: '',
    viewmore: false,
    baseUrl: baseUrl,
    commentForm: {},
    commentVisible: false,
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    calendarVisible: false,
    currentOrderId: '',
    commentDetailVisible: false,
    commentDetail: {},
    psType:'',
    statusObj: {'CUSTORDER':false,'REVIEWCOMPLETED':false,'WAITDELIVER':false,'PARTCHECKED':false,'CUSTSIGIN':false,'CANCEL':false},
    isImg: false,
    ImgArr: [],
    isCheckedAll: false,
    checkedIds: [], //选中的需要取消产品的ids
    dynamicMessage: { // 动态获取提示信息汇总
        evaluateTip: '', // 免运费提示信息
      },
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {

    // 组合购步进器加减赋值
    onCombinationPurchaseNumChange(e){
      const {dataset: { seriesindex, itemindex }} = e.currentTarget

      this.orderdetail.orderLines[seriesindex].child[itemindex].qty = Number(e.detail)
      this.orderdetail.orderLines.forEach((item, index)=>{
        let totleBuyNum = 0 // 每组取消的购买总数
        item.child.forEach((itm)=>{
          if(itm.isChecked){
            totleBuyNum += itm.qty
          }
        })
        this.orderdetail.orderLines[index].totleBuyNum = totleBuyNum
      })

      this.orderdetail.isPurchaseStandard = checkCombinationPurchase(this.orderdetail.orderLines)
    },

    // 组合购单个产品选择
    onCheckOrder(idx1, idx2, val){
      if(this.orderdetail.orderLines[idx1].child[idx2].canCancel =='N'){
        return
      }

      this.orderdetail.orderLines[idx1].child[idx2].isChecked = !val
      this.orderdetail.orderLines[idx1].child[idx2].qty = this.orderdetail.orderLines[idx1].child[idx2].maxQty

      let checkedIds = []
      let len = 0
      this.orderdetail.orderLines.forEach((item, index)=>{
        let totleBuyNum = 0 // 每组取消的购买总数
        item.child.forEach((itm)=>{
          len += 1
          if(itm.isChecked){
            checkedIds.push(itm.id)
            totleBuyNum += itm.qty
          }
        })
        this.orderdetail.orderLines[index].totleBuyNum = totleBuyNum
      })

      this.checkedIds = checkedIds
      this.isCheckedAll = false
      if(checkedIds.length == len){
        this.isCheckedAll = true
      }

      this.orderdetail.isPurchaseStandard = checkCombinationPurchase(this.orderdetail.orderLines)
    },

    // 组合购选择全部产品
    onCheckOrderAll(val){
      this.isCheckedAll = !val

      let checkedIds = []
      this.orderdetail.orderLines.forEach((item,index)=>{
        item.child.forEach((itm)=>{
          if(itm.canCancel =='Y'){
            itm.isChecked = !val
            if(!itm.isChecked){
              itm.qty = itm.maxQty
            }
            checkedIds.push(itm.id)
          }
        })
      })
      this.checkedIds = checkedIds

      this.orderdetail.orderLines.forEach((item, index)=>{
        let totleBuyNum = 0 // 每组取消的购买总数
        item.child.forEach((itm)=>{
          if(itm.isChecked){
            totleBuyNum += itm.qty
          }
        })
        this.orderdetail.orderLines[index].totleBuyNum = totleBuyNum
      })

      this.orderdetail.isPurchaseStandard = checkCombinationPurchase(this.orderdetail.orderLines)
    },

    // 组合购取消
    handleCancel(){
      let ids = []
      let idsCancelNum = []  //选中的需要取消产品的取消数量

      this.orderdetail.orderLines.forEach((item, index)=>{
        item.child.forEach((itm)=>{
          if(itm.isChecked){
            ids.push(itm.id)
            idsCancelNum.push(itm.qty)
          }
        })
      })

      let idsStr = ids.toString()
      let idsCancelNum = idsCancelNum.toString()
      //跳转到取消页面
      wx.navigateTo({
        url: `/pages/me/order-cancel/index?ids=${idsStr}&idsCancelNum=${idsCancelNum}&orderId=` + this.currentOrderId + `&ly=1&type=90605`
      })
    },

    // 组合购点击取消，选择产品比例不满足条件时提示
    handleCancelNoClick(){
      wx.showModal({
        title: '确认取消此订单？',
        content: '组合购的商品购买比例按照下单中产品分组的总数量计算，请选择符合要求的商品进行取消订单',
        showCancel: false,
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            console.log('用户点击确定')
          }
        }
      })
    },

    // 回单影像
    receiptEffect(item) {

      let id = item.sapOrderCode
      dmsRequest({
        data: {
          'cisCode': wepy.$instance.globalData.cisCode,
          'documentNum': id
        },
        method: 'toOmsView'
      }).then((res: any) => {
        if(res.data) {
          this.isImg = true
          this.ImgArr = res.data
        } else {
          Toast.fail('暂无回单影像');
        }
      })
    },
    sapCancle(item) {
      Dialog.confirm({
        title: '提示',
        message: `此申请审核通过后将会彻底取消订单，是否确认发起取消申请?`
      }).then(() => {
        let data = {
          sapOrderCode: item.sapOrderCode
        }
        request({ api: 'order/cancelSapOrderFlowStart.nd', method: 'POST', data }).then(res => {
          if(res.code == 0) {
            Toast.success({
              message: '提交成功',
              duration: 2000
            });
          } else {
            Toast.fail(res.msg)
          }
       })
        
      })
    },
    onClose(){
      this.isImg = false
    },
    stretchFlag: () => {
      this.stretchFlag = !this.stretchFlag
    },
    viewmore: () => {
      this.viewmore = !this.viewmore
    },
    // 动态选择
    chose: (id: any) => {
      this.orderdetail.erpList.forEach((res: { sapOrderCode: any; }) => {
        if (res.sapOrderCode == id) {
          res.active = true
          this.orderdetail.nowgoods = res
        } else {
          res.active = false
        }
      });
    },
    // 商品取消
    async beSure() {
      const id = this.id
      const data = { id: id };
      try {
        const res = await request({ api: 'order/cancelLine.nd', method: 'POST', data });
        if (res) {
          Toast.success({
            message: '取消成功',
            duration: 2000,
            onClose: () => {
              this.orderpopup = !this.orderpopup
              this.$apply();
              this.methods.getOrderDetail({ id: this.currentOrderId });
            },
          });
        } else {
          this.$apply();
        }
      } catch (error) {
        Toast.fail('取消失败失败');
      }
    },
    start: (e) => {
      this.id = e
      //跳转到取消页面
      wx.navigateTo({
        url: `/pages/me/order-cancel/index?id=${e}&orderId=` + this.currentOrderId + `&ly=1`
      })
    },
    cancel: () => {
      this.orderpopup = !this.orderpopup
    },
    orderfiltering: () => {
      this.visible = !this.visible
    },
    onToggleComment(erpOrder) {
      const { id, orderId, orgId } = erpOrder
      let form = { erpId: id, orderId, orgId, id: '' }
      this.commentForm = form
      this.commentVisible = !this.commentVisible
    },
    onChangeCommentLevel(e) {
      const { name } = e.target.dataset
      this.commentForm = { ...this.commentForm, [name]: e.detail }
    },
    onCommentContentChange(event) {
      this.commentForm = { ...this.commentForm, evaluationContent: event.detail}
    },
    async onToggleCommentDetail(item) {
      const { id, orderId, orgId } = item
      if(id) {
        const result = await request({ api: '/orderEvaluation/init.nd', method: 'POST', data: { erpId: id, orderId, orgId } })
        if(result.erpId) {
          this.commentDetailVisible = !this.commentDetailVisible
          this.commentDetail = result.productEvaluate
          this.$apply()
          return
        }
        Toast.fail('获取评价信息报错')
      }
      this.commentDetailVisible = !this.commentDetailVisible
      this.$apply()

    }
    async onSubmitComment() {
      const result = await request({ api: '/orderEvaluation/saveEvaluate.nd', method: 'POST', data: this.commentForm, })
      if(result === 'success') {
        Toast.success('评价成功')
        this.commentVisible = !this.commentVisible
        this.$apply()
        this.methods.getOrderDetail({ id: this.currentOrderId });
        return
      }
      Toast.fail(result)
    },
    openCalendar() {
      const { minDate, maxDate } = this.orderdetail
      this.$wxpage.calendar.enableArea([minDate, maxDate]);
      this.calendarVisible = !this.calendarVisible
    },
    closeCalendar() {
      this.calendarVisible = !this.calendarVisible
    },
    async chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`
      const result = await request({ api: '/order/updateDate.nd', method: 'POST', data: { id: this.currentOrderId, startDate: day } })
      if(result === 'Y') {
        Toast.success('修改成功')
      } else {
        Toast.fail(result)
      }
      this.calendarVisible = !this.calendarVisible
      this.$apply()
      this.methods.getOrderDetail({_loading: true, id: this.currentOrderId });
    },
  };

  onShow(){
    this.isCheckedAll = false
    let evaluateTip = getAlertInfo('14246556242') // 评价区域提示信息
    this.dynamicMessage.evaluateTip = evaluateTip
    this.$apply()
  }


  onLoad(e: { id: any; }) {
    const that = this;
    //商家下单->评审通过->待发货->发货中->客户签收
    this.statusObj = {'CUSTORDER':false,'REVIEWCOMPLETED':false,'WAITDELIVER':false,'PARTCHECKED':false,'CUSTSIGIN':false,'CANCEL':false}
    const { id } = e
    this.currentOrderId = id


    this.methods.getOrderDetail({_loading:true, id: this.currentOrderId }).then(() => {
      this.methods.queryCisOrderStatusInfoMobile( {orderCode: that.orderdetail.orderHeader.orderCode} ).then((res) => {
        if(res.payload.orderStatuInfo && res.payload.orderStatuInfo.length > 0) {
          for (let item of res.payload.orderStatuInfo) {
            for (let statusItem in that.statusObj) {
              if (statusItem == item.id) {
                if (statusItem == 'REVIEWCOMPLETED') {
                  that.psType = item.type;
                  that.$apply();
                }
                that.statusObj[statusItem] = true;
                that.$apply();
              }
            }
          }
        }
      })

    });
  }
}
