import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { getOrderDetail,getCancelReasonList } from '@/store/actions/order-detail';
import Toast from '@/components/vant/toast/toast';
import { request, baseUrl } from '@/utils/request';
import { RESET_ORDER_DETAIL } from '@/store/types/order-detail';
import Dialog from '@/components/vant/dialog/dialog';
interface Data {
  visible: boolean;
  orderpopup: boolean;
  id: string;
  ids: string;
  idsCancelNum: string;
  type: string;
  viewmore: boolean;
  baseUrl: string;
  commentForm: object;
  commentVisible: boolean;
  calendarConfig: object;
  calendarVisible: boolean;
  currentOrderId: string;
  commentDetailVisible: boolean;
  commentDetail: object;
  cancelReasonList: object;
  popList: object;

}

@connect({
  orderdetail({ orderdetail }) {
    return orderdetail.orderdetail
  },
  cancelReasonList({ orderdetail }) {
    return orderdetail.cancelReasonList
  },
}, {
  getOrderDetail,
  getCancelReasonList
})

export default class orderCancel extends wepy.page {
  config = {
    navigationBarTitleText: '订单取消',
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
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
      'van-dialog': '../../../../components/vant/dialog/index',
    },
  };
  data: Data = {
    orderpopup: false,
    baseUrl: baseUrl,
    id: '',
    ids: '', // 组合购取消产品id集合
    idsCancelNum: '', // 组合购取消产品数量集合
    type: '', // 明细传参，主要用来区分是否是组合购
    ly: '',
    orderCode: '',
    currentOrderId: '',
    popList: [],
    popTitle: '',
    display: false,
    popVisible: false,
    popFiledName: '',
    compareInfo: {},
    reasonVisible: false,
    cancel: {
      cancelReasonList: {
        code: '',
        name: '请选择'
      }
    },
    form: {
      reason: ''
    }
  };
  // 页面内交互写在methods里
  methods = {

    // 应该获取那个值给popList   应该对比那个字段为选中信息
    openChoose: (propName: string, questionType: string, name: string) => {
      let list = this[propName].list;
      if (!list) {
        list = this.cancelReasonList[propName]
      }
      if (list.length === 0) {
        return
      }
      this.popList = list
      this.compareInfo = this.data.cancel[questionType]
      this.popFiledName = questionType
      this.popTitle = name
      this.popVisible = true

    },

    onClose: () => {
      this.popVisible = false
    },

    onChoose: ({ currentTarget }: e) => {
      const { dataset } = currentTarget
      const { index } = dataset
      const { popFiledName, popList } = this.data
      this.data.cancel[popFiledName] = popList[index]
      this.popVisible = false

      //其他原因
      if(popList[index].code === '14963960682'){
        this.reasonVisible = true
      }else{
        this.reasonVisible = false
      }
    },

    onDescChange({ detail }: any) {
      this.form.reason = detail.value
    },

    // 商品取消
    async beSure() {
      const ly = this.ly
      let reason = this.cancel.cancelReasonList.name
      //其他原因
      if(this.cancel.cancelReasonList.code === '14963960682'){
        reason = this.form.reason
      }

      // ly=1明细取消
      if(ly === '1'){
        let data = {}
        data = {
          id: this.id,
          cancelReason: reason
        };
        if(this.orderdetail.orderHeader.productGroupFlag == 'Y'){
          data = {
            ids: this.ids, //我的订单》订单详情》组合购取消ids
            nums: this.idsCancelNum, //我的订单》订单详情》组合购取消ids
            cancelReason: reason
          }
        }

        try {
          const res = await request({ api: 'order/cancelLine.nd', method: 'POST', data });
          if (res) {
            Toast.success({
              message: '取消成功',
              duration: 2000,
              onClose: () => {
                this.orderpopup = !this.orderpopup
                this.$apply();
                wx.navigateTo({
                  url: `/pages/me/order/index`
                })
              },
            });
          } else {
            this.$apply();
          }
        } catch (error) {
          Toast.fail('取消失败失败');
        }
      }else{
        //整单取消
        Toast.loading({
          message: '取消中...',
          forbidClick: true,
          duration: 0,
          zIndex: 9999999
        });
        const id = this.orderCode;
        request({ api: `order/cancelOrder.nd?orderCode=${id}&cancelReason=${reason}`, callback: (res: any) => {
            Toast.clear();
            if (res && res.data && res.data.code == '0') {
              Toast.success('取消订单成功')
              wx.navigateTo({
                url: `/pages/me/order/index`
              })
            } else {
              Toast.fail('取消订单失败');
            }
          }})
      }
    },

    start: () => {
      //其他原因
      if(this.cancel.cancelReasonList.code === '14963960682'){
        if(!this.form.reason){
          Toast.fail('请输入取消原因');
          return;
        }
      }

      if(this.cancel.cancelReasonList.name==='请选择'){
        Toast.fail('请选择取消原因');
        return;
      }

      //在评审通过、已安排生产、待排发货计划下，‘待发货’,‘发货中’ 取消时给出原有的提醒违约的提示
      /*let orderStatusCode = this.orderdetail.orderHeader.orderStatusCode;
      if(this.orderdetail.orderHeader.orderTypeCode == 'routine' && (orderStatusCode == 'ALREADYPLANPRODUCT' || orderStatusCode == 'ARRANGEDPRODUCT' || orderStatusCode == 'UNCHKED' || orderStatusCode== 'WAITDELIVER' || orderStatusCode== 'PARTCHECKED' )){
        Dialog.confirm({
          message: "取消‘评审通过’,‘已安排生产’,‘待排发货计划’,‘待发货’,‘发货中’状态的常规订单，会判定为商家违约，请确认是否取消？",
        }).then(() => {
          this.orderpopup = !this.orderpopup
        }).catch(() => {
          // on cancel
        });
      }else{
        this.orderpopup = !this.orderpopup
      }*/

      this.orderpopup = !this.orderpopup

    },
    cancel: () => {
      this.orderpopup = !this.orderpopup
    },

  };

  async onLoad(e: { id: any; orderId: any; orderCode: any; ly: any; ids: any; type: any; idsCancelNum: any; }) {
    getStore().dispatch({ type: RESET_ORDER_DETAIL, payload: [] })
    const { id, orderId, orderCode, ly, ids, type, idsCancelNum } = e
    this.id = id
    this.ids = ids
    this.idsCancelNum = idsCancelNum
    this.type = type
    this.ly = ly
    this.orderCode = orderCode;
    this.currentOrderId = orderId
    await this.methods.getOrderDetail({_loading:true, id: this.currentOrderId });

    if(this.orderdetail.orderHeader.productGroupFlag == 'Y' && this.ids && this.idsCancelNum){
      let idsArr = this.ids.split(',')
      let idsCancelNumArr = this.idsCancelNum.split(',')

      this.orderdetail.orderLines.forEach((item, index)=>{
        let child = []
        item.child.forEach((itm)=>{
          let oIndex = idsArr.indexOf(itm.id.toString())
          if(oIndex>-1){
            itm.qty = idsCancelNumArr[oIndex]
            child.push(itm)
          }
        })
        this.orderdetail.orderLines[index].child = child
      })
    }

    this.methods.getCancelReasonList();
  }


}
