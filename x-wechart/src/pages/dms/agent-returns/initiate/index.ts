import wepy, {Event} from 'wepy';
import {connect} from 'wepy-redux';
import {
  getReturnShowSalesOrder,
  createChannelCreationReturn,
} from '@/store/actions/returnbefore';
import popupCustomize from "../../../components/popup-customize/index";
import Toast from "@/components/vant/toast/toast";
import {clone, forEach} from "ramda";

interface Data {
  formData: object;
  orderdetail: object;
  itemIndex: number;
  outIndex: number;
  documentNum: string;
}

@connect({
}, {
  getReturnShowSalesOrder,
  createChannelCreationReturn,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '销售退货录入',
    usingComponents: {
      'van-icon': '/components/vant/icon/index',
      'van-toast': '/components/vant/toast/index',
      'van-loading': '/components/vant/loading/index',
      'van-popup': '/components/vant/popup/index',
      'van-field': '/components/vant/field/index',
      'van-stepper': '/components/vant/stepper/index',
    },
  };
  components = {
    popupCustomize,
  };
  data: Data = {
    formData: {
      remark: '', // 备注
    },
    orderdetail: {}, // 明细信息
    itemIndex: 0,
    outIndex: 0,
    documentNum: '', // 销售单号
  };

  // 页面内交互写在methods里
  methods = {
    returnBack(){
      wx.navigateBack({
        delta: 1 //返回上一级页面
      })
    },
    onRemarkChange(e){
      const { key } = e.currentTarget.dataset
      let detail =e.detail
      this.formData[key] = detail
    },
    onShippedBqtyChg(evt: Event) {
      const { detail, target: { dataset: { itemIndex, outIndex } } } = evt
      // bug:  触发两次
      if (typeof detail === 'undefined') {
        return
      }
      const newOrderDetail = clone(this.orderdetail)
      let bprice = newOrderDetail.itemList[itemIndex].outItems[outIndex].bprice
      newOrderDetail.itemList[itemIndex].outItems[outIndex].bactualQty = detail
      let subtotal = detail * bprice
      newOrderDetail.itemList[itemIndex].outItems[outIndex].subtotal = subtotal.toFixed(2)
      this.orderdetail = newOrderDetail
    },

    // 退货发起提交
    onInitSubmit(){
      const { remark } = this.formData
      const { itemList } = this.orderdetail
      let orderItem = []
      let totalAmount = 0
      let mag = [] // 提交前校验入库数量是否满足
      let warehousingQty = 0
      forEach((item: any)=> {
        if(item.outItems && item.outItems.length>0) { //item.outItems只允许有一条数据
          forEach((out: any) => {
            const data = {
              model: item.model, // 型号
              productCode: item.productCode,// 产品编码
              borderedQty: out.bactualQty, // 退货数量
              bprice: out.bprice, // 价格
              amount: out.subtotal // 退货金额
            };
            totalAmount += Number(out.subtotal)
            warehousingQty += Number(out.bactualQty)
            if(out.bactualQty > 0 ){ // 数量大于0才进行提交，等于0的忽略
              orderItem.push(data);
            }
          }, item.outItems);
        }
      },itemList);

      if(warehousingQty <= 0){
        mag.push(`退货数量需大于0！`)
      }

      if(mag.length>0){
        Toast.fail(mag[0])
        return false
      }

      let param = {
        cisCode: wepy.$instance.globalData.cisCode, // cis编码
        returnOrder: { // 退货单信息
          documentNum: this.documentNum, // 销售单号
          message: remark, // 备注
          amount: totalAmount, // 退货金额总数
          itemList: orderItem
        }
      }
      this.methods.createChannelCreationReturn(param).then((res)=>{
        const { code } = res.payload
        if(code == '0'){
          Toast.success({
            forbidClick: true,
            duration: 1000,
            message: '提交成功',
            onClose: () => {
              wx.navigateBack({
                delta: 1,
              });
            },
          });
        }
      })
    },

  };
  // 添加或修改产品赋值
  productAssignment(chooseItem, itemIndex, outIndex){
    let outItems = this.orderdetail.itemList[itemIndex].outItems;
    let outBoundItem = {
      bactualQty: 0, // 退货数量
      bprice: chooseItem.bprice, // 退货价格(元)
      subtotal: 0.00, // 小计
    };
    outBoundItem.subtotal = outBoundItem.subtotal.toFixed(2)
    if(!Array.isArray(outItems){
      outItems =[];
    })
    if(outIndex && outIndex !== 'undefined'){ // 如果outIndex有值为编辑直接替换数据；否则为新增
      outItems[outIndex] = outBoundItem ;
    }else{
      outItems.push(outBoundItem);
    }
    this.orderdetail.itemList[itemIndex].outItems = outItems
    this.$apply()
  }

  // 获取退货发起详情
  getMyOrderDetail(){
    let param={
      cisCode: wepy.$instance.globalData.cisCode,
      documentNum: this.documentNum,
    }
    Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
    this.methods.getReturnShowSalesOrder(param).then((res)=>{
      Toast.clear()
      const { data } = res.payload
      this.orderdetail = data
      this.formData.remark = this.orderdetail.message || ''
      if(this.orderdetail.itemList && this.orderdetail.itemList.length>0){
        this.orderdetail.itemList.forEach((item, index)=>{
          this.productAssignment(item, index, 0)
        })
      }

      this.$apply()
    })
  }

  onShow() {

  }
  onLoad(e: { documentNum: any }) {
    const { documentNum } = e
    this.documentNum = documentNum
    this.getMyOrderDetail()
    this.$apply()
  }

}
