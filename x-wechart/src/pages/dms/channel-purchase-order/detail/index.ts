import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { clone } from 'ramda';
import { getPurchaseOrderDetail,getPurchaseExamInfo } from '@/store/actions/salesorderdetail';
import { getOrderDetail } from '@/store/actions/order-detail';
import Toast from '@/components/vant/toast/toast';
import { request, baseUrl } from '@/utils/request';
import { fillZero, formatDate, getDateDiff } from '@/utils/index';
import utilsWxs from '../../../../wxs/utils.wxs';
import { dmsRequest } from '@/store/actions/dmsrequest';
import { getAlert } from '@/store/actions/user';

interface Data {
  visible: boolean;
  id: string;
  viewmore: boolean;
  baseUrl: string;
  currentOrderId: string;
  isBillsShow: boolean;
  outActiveIdx:string;
}

@connect({
  orderdetail({ salesorderdetail }) {
    return salesorderdetail.purchaseorderdetail
  },
  channelOrderdetail({ orderdetail }) {
    return orderdetail.orderdetail
  },
  purchaseExamInfo({ salesorderdetail }) {
    return salesorderdetail.purchaseExamInfo
  }
}, {
  getPurchaseOrderDetail,
  getOrderDetail,
  getPurchaseExamInfo
})
export default class orderdetail extends wepy.page {
  config = {
    navigationBarTitleText: '订单详情',
    usingComponents: {
      'van-icon': '/components/vant/icon/index',
      'van-toast': '/components/vant/toast/index',
      'van-popup': '/components/vant/popup/index',
      'van-picker': '/components/vant/picker/index',
      'van-search': '/components/vant/search/index',
      'van-tab': '/components/vant/tab/index',
      'van-row': '/components/vant/row/index',
      'van-col': '/components/vant/col/index',
      'van-tabs': '/components/vant/tabs/index',
      'van-radio': '/components/vant/radio/index',
      'van-radio-group': '/components/vant/radio-group/index',
      'van-cell': '/components/vant/cell/index',
      'van-field': '/components/vant/field/index',
      'van-loading': '/components/vant/loading/index',
      'van-stepper': '/components/vant/stepper/index',
      'van-cell-group': '/components/vant/cell-group/index',
      'van-button': '/components/vant/button/index',
      'van-steps': '/components/vant/steps/index',
      'calendar': '/components/calendar/index',
      'img': '/components/img/index',
    },
  };
  data: Data = {
    visible: false,
    id: '',
    baseUrl: baseUrl,
    currentOrderId: '',
    viewmore: false,
    isBillsShow: false,
    outActiveIdx:0,
    isImg: false,
    ImgArr:[],
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
   
    // 回单影像
    receiptEffect(item) {
      let id = item.documentNum
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
    onClose(){
      this.isImg = false
    },
    viewmore: () => {
      this.viewmore = !this.viewmore
    },
    // 动态选择
    chose: (id: any) => {
      this.channelOrderdetail.erpList.forEach((res: { sapOrderCode: any; }) => {
        if (res.sapOrderCode == id) {
          res.active = true
          this.channelOrderdetail.nowgoods = res
        } else {
          res.active = false
        }
      });
    },
    //出库信息 更多单号显示
    isBillsShowFun(){
      this.isBillsShow = !this.isBillsShow
    },
    outActiveShowFun(idx){
        for (const item of this.orderdetail.data.outBoundItem) {
            item.isActive = false;
        }
        this.orderdetail.data.outBoundItem[idx].isActive = true;
    //   this.outActiveIdx = idx;
    },
  };
  onLoad(e: { id: any; }) {
    const { id } = e
    this.currentOrderId = id
    this.methods.getPurchaseOrderDetail({ purchaseOrderId: this.currentOrderId }).then((res: any) => {
        if(res.payload.data.BHOid){
          this.methods.getOrderDetail({_loading:true, id: res.payload.data.BHOid });
        }else{
          //this.channelOrderdetail = {}
          this.setData({ channelOrderdetail: null });
        }
      }
    );
    this.methods.getPurchaseExamInfo({ orderId: this.currentOrderId});
  }
}
