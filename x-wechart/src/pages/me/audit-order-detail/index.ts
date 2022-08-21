import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { trim, join } from 'ramda';
import { getOrderDetail } from '@/store/actions/audit-order';
import { request } from '@/utils/request';
import $Toast from '@/components/vant/toast/toast';
import $Dialog from '@/components/vant/dialog/dialog';
import utilsWxs from '../../../wxs/utils.wxs';

@connect({
  order({ auditorder }) {
    return auditorder.order;
  },
}, {
  getOrderDetail,
})
export default class AuditOrderDetail extends wepy.page {
  config = {
    navigationBarTitleText: '订单详情',
    usingComponents: {
      'van-button': '../../../components/vant/button/index',
      'van-field': '../../../components/vant/field/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-checkbox': '../../../components/vant/checkbox/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-img': '../../../components/img/index',
    }
  };
  wxs = {
    utils: utilsWxs,
  };
  orderId = '';
  remark = '';
  data = {
    rejectShow: false,
  };

  // 页面内交互写在methods里
  methods = {
    onRemarkChange: ({ detail }: any) => {
      this.remark = trim(detail.value);
    },
    reject: () => {
      this.rejectShow = true;
    },
    closeRejectDialog: () => {
      this.rejectShow = false;
    },
    confirmReject: () => {
      this.rejectShow = false;
      if (!this.remark) {
        $Toast('请输入驳回原因');
        return;
      }
      $Toast.loading({ forbidClick: true, message: '处理中...', duration: 0 });
      request({
        api: 'order/disAgreeOrders.nd',
        method: 'POST',
        data: {
          ids: this.orderId,
          remark: this.remark,
        },
        callback: (res: any) => {
          const { msg, code } = res.data;
          $Toast.clear();
          if (code === 0) {
            wx.navigateBack();
          } else {
            $Toast.fail(msg || '审核失败');
          }
        },
      });
    },
    accept: () => {
      $Dialog.confirm({
        title: '确认审核通过？',
        message: '不可撤销此操作',
      }).then(() => {
        $Toast.loading({ forbidClick: true, message: '处理中...', duration: 0 });
        request({
          api: 'order/agreeOrders.nd',
          method: 'POST',
          data: {
            ids: this.orderId,
            remark: '同意',
          },
          callback: (res: any) => {
            const { msg, code } = res.data;
            $Toast.clear();
            if (code === 0) {
              wx.navigateBack();
            } else {
              $Toast.fail(msg || '审核失败');
            }
          },
        });
      }).catch(() => {
        // on cancel
      });
    },
  };

  onLoad({ id }: any) {
    this.orderId = id;
    $Toast.loading({ forbidClick: true, message: '处理中...', duration: 0 });
    this.methods.getOrderDetail({id}).then(() => {
      $Toast.clear();
    });
  }
}
