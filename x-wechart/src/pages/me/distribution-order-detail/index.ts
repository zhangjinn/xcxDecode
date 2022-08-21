import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { clone } from 'ramda';
import { getOrderDetail } from '@/store/actions/order-detail';
import Toast from '@/components/vant/toast/toast';
import { request, baseUrl } from '@/utils/request';
import { fillZero, formatDate, getDateDiff } from '@/utils/index';

interface Data {
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
}

@connect({
  orderdetail({ orderdetail }) {
    return orderdetail.orderdetail
  },
}, {
  getOrderDetail
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
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
    },
  };
  data: Data = {
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
  };
  // 页面内交互写在methods里
  methods = {
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
      this.orderpopup = !this.orderpopup
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

  onLoad(e: { id: any; }) {
    const { id } = e
    this.currentOrderId = id
    this.methods.getOrderDetail({_loading:true, id: this.currentOrderId });
  }
}
