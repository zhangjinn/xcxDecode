import wepy, {Event} from 'wepy';
import Toast from '@/components/vant/toast/toast';
import utilsWxs from '../../../wxs/utils.wxs';
import { request } from '@/utils/request';
interface Data {
  stepperValue: Number;
  pageType: String;
  pageId: String | Number;
  orderDetail: Object;
}

export default class List extends wepy.page {
  config = {
    navigationBarTitleText: '终包采购计划提报详情',
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
  data: Data = {
    stepperValue: 1,
    pageType: 'view',
    pageId: '',
    orderDetail: {},
  }
  methods = {
    onShippedBqtyChg(evt: Event) {
      const { detail, currentTarget: { dataset: { index } } } = evt
      // bug:  触发两次
      if (typeof detail === 'undefined') {
        return
      }
      this.orderDetail.detailList[index].submitQuantity = detail
    },
    onChange(evt: Event){
      const { detail, currentTarget: { dataset: { index, type } } } = evt
      this.orderDetail.detailList[index][type] = detail
      this.$apply()
    },

    sava(status){
      let detailList=[]
      this.orderDetail.detailList.forEach((item)=>{
        item.itemMeters = item.itemMeters || 0
        item.itemLength = item.itemLength || 0
        item.itemWidth = item.itemWidth || 0
        let remark = item.remark || ''
        if(item.unit == '米(M)'){
          remark = `${remark} {米数${item.itemMeters}*数量${item.submitQuantity}}`
        }
        if(item.unit == '平方米(M2)'){
          remark = `${remark} {长${item.itemLength}*宽${item.itemWidth}*数量${item.submitQuantity}}`
        }
        detailList.push({
          id: item.id,
          quantity: item.submitQuantity,
          remark: remark
        })
      })
      let data = {
        id:this.orderDetail.taskId,
        status:status,
        detailList:detailList
      }
      request({
        api: `pms/pmsApi/pmsShopPlanShopSubmit.nd`,
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
            Toast.fail(data.msg);
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
      api: `pms/pmsApi/pmsShopPlanShopPageQuery.nd`,
      method: 'POST',
      data: data,
      type: 'application/json',
      callback: (res: any) => {
        Toast.clear()
        const { data } = res.data
        this.orderDetail = data[0]
        this.orderDetail.detailList = this.orderDetail.detailList.map((res)=>{
          res.itemLength = '0'
          res.itemWidth = '0'
          res.itemMeters = '0'

          let oRemark = []
          let oNewRemark = res.remark

          // 编辑状态并且备注有值执行
          if(res.remark && this.pageType == 'handle'){
            if (res.remark.indexOf(" ") > -1) {
              oRemark = res.remark.split(' ')
              if(oRemark[1]){
                // 字符串中提取数字
                let numArr = oRemark[1].match(/\d+/g)
                if(res.unit == '米(M)'){
                  res.itemMeters = numArr[0]
                }
                if(res.unit == '平方米(M2)'){
                  res.itemLength = numArr[0]
                  res.itemWidth = numArr[1]
                }
              }
              oNewRemark = oRemark[0]
            }
          }
          res.remark = oNewRemark
          return res
        })

        this.$apply()

      }
    })


  }
}
