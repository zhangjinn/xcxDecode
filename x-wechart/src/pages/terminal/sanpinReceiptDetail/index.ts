import wepy, {Event} from 'wepy';
import utilsWxs from '../../../wxs/utils.wxs';
import {clone} from "ramda";
import Toast from "@/components/vant/toast/toast";
import {request} from "@/utils/request";
import { formatDate } from '@/utils/index';

interface Data {
  stepperValue: Number;
  pageType: String;
  pageId: String | Number;
  orderDetail: Object;
}

export default class List extends wepy.page {
  config = {
    navigationBarTitleText: '终包收货提报详情',
    usingComponents: {
      'van-icon': '/components/vant/icon/index',
      'van-popup': '/components/vant/popup/index',
      'van-field': '/components/vant/field/index',
      'van-toast': '/components/vant/toast/index',
      'van-picker': '/components/vant/picker/index',
      'van-stepper': '/components/vant/stepper/index',
      'van-dialog': '/components/vant/dialog/index',
      'van-checkbox': '/components/vant/checkbox/index',
      'van-button': '/components/vant/button/index',
    },
  };
  wxs = {
    utils: utilsWxs,
  };
  // mixins = [ CommonMixin ];
  data: Data = {
    stepperValue: 1,
    pageType: 'view',
    pageId: '',
    orderDetail: {},
  }
  methods = {
    onShippedBqtyChg(evt: Event) {
      const { detail, currentTarget: { dataset: { index } } } = evt
      // // bug:  触发两次
      if (typeof detail === 'undefined') {
        return
      }
      this.orderDetail.detailList[index].receiveQuantity = detail
    },

    sava(status){
      let detailList=[]
      this.orderDetail.detailList.forEach((item)=>{
        detailList.push({
          id: item.id,
          quantity: item.receiveQuantity
        })
      })

      let nowDay = new Date();
      let receiveDate = formatDate(nowDay.getTime(), 'Y-M-D h:m:s')

      const { account }=JSON.parse(wx.getStorageSync('b2b_token'))
      let userName = account

      let data = {
        id: this.orderDetail.taskId,
        userName: userName,
        receiveDate: receiveDate,
        status: status,
        detailList: detailList
      }
      request({
        api: `pms/pmsApi/omsShopDeliveryShopReceive.nd`,
        method: 'POST',
        data: data,
        type: 'application/json',
        callback: (res: any) => {
          const { data } = res
          if(data.success){

            Toast.success({
              message: `${ status == '1' ? '提交' : '暂存'}成功`,
              onClose: () => {
                wx.navigateBack({
                  delta: 1,
                });
              }
            })

          }else{
            Toast.success(data.msg);
          }

          this.$apply()
        }
      })
    }
  }

  // 获取订单详细信息
  async onLoad({ id, orgId = '', type }) {
    this.pageType = type
    Toast.loading({
      message: '正在加载',
      duration: 2000
    });
    let data = {
      id:id,
    }
    request({
      api: `pms/pmsApi/omsShopDeliveryShopPageQuery.nd`,
      method: 'POST',
      data: data,
      type: 'application/json',
      callback: (res: any) => {
        Toast.clear()
        const { data } = res.data
        this.orderDetail = data[0]
        // this.orderDetail.deliveryDate = this.orderDetail.deliveryDate ? formatDate( this.orderDetail.deliveryDate, 'Y-M-D') : ''

        this.$apply()

      }
    })
  }
}
