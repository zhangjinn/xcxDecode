import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { getSalesOrderConsult, submit } from '@/store/actions/consultTodoDetail';
import { baseUrl } from '@/utils/request';
import $Toast from "@/components/vant/toast/toast";
interface Data {
  id: string;
  baseUrl: string;
  currentOrderId: string;
  type: string;
  orderdetail: any
}

@connect({

}, {
  getSalesOrderConsult,
  submit
})
export default class consultTodoDetail extends wepy.page {
  config = {
    navigationBarTitleText: '待办详情',
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
    id: '',
    baseUrl: baseUrl,
    currentOrderId: '',
    type: 'view',
    orderdetail: {}
  };
  // 页面内交互写在methods里
  methods = {
    auditSubmit(e) {
      const status = e;
      this.methods.submit({id: this.currentOrderId, status: status}).then(res => {
        const result = res.payload;
        if (result.code == '200') {
          $Toast.success('提交成功');
          wx.navigateTo({url: '/pages/me/consult-todo/index'});
        } else {
          $Toast.success('提交失败：'+result.msg);
        }
      });
    }
  };

  onLoad(e: { id: any; }) {
    const {id} = e;
    this.type = e.type;
    this.currentOrderId = id;
    let that = this;
    this.methods.getSalesOrderConsult({id: this.currentOrderId}).then(res => {
      that.orderdetail = res.payload;
      this.$apply();
    });
    console.log(this.orderdetail);
  }
}
