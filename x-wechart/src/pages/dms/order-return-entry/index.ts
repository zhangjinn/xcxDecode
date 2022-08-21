import { isScanDealer } from './../../../store/actions/dmsoutwarehouse';
import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { getNewReturnOrderInfo, getNewConfirmationInbound } from '@/store/actions/returnentry';
import { getOutWarehouseList } from '@/store/actions/dmsoutwarehouse';
import { forEach, findIndex, propEq, all, indexOf, includes } from 'ramda';
import Toast from '@/components/vant/toast/toast';
import { getInvBatch } from '@/store/actions/dmsoutwarehouse';
import { getBaseData } from '@/store/actions/purchaseshop';

interface Data {
  beSure: boolean;
  itemId: string;
  purchaseId: string;
  remark: string;
  warehouseVisible: boolean;
  invBatchVisible: boolean;
  currentGood: object;
  currentInvBatchList: Array<any>;
  popVisible: boolean;
  ywyList: Array<any>;
  ywyId: string;
  ywyName: string;
  inType: string;
  inStatus: boolean;
  orderName: string;
}

@connect({
  returnInfo({ returnentry }) {
    return returnentry.returnInfo
  },
  warehouseList({ dmsoutwarehouse }) {
    return dmsoutwarehouse.warehouseList
  },
}, {
  getNewReturnOrderInfo,
  getNewConfirmationInbound,
  getOutWarehouseList,
  getBaseData,
})
export default class ReturnEntry extends wepy.page {
  config = {
    navigationBarTitleText: '退货入库',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "van-field": "/components/vant/field/index",
      "van-dialog": "/components/vant/dialog/index",
      'van-picker': '/components/vant/picker/index',
      'order-return-entry-item': '/components/order-return-entry-item/index',
      "van-icon": "/components/vant/icon/index",
    },
  };
  data: Data = {
    beSure: false,
    itemId: '',
    purchaseId: '',
    remark: '',
    warehouseVisible: false,
    invBatchVisible: false,
    currentGood: {
      index: '',
      id: ''
    },
    currentInvBatchList: [],
    popVisible: false,
    ywyList: [],
    ywyId: '',
    ywyName: '',
    inType: '',
    inStatus: true,
    orderName: '',
  };

  methods = {
    openChoose: () => {
      this.popVisible = true;
    },
    closePolicy: () => {
      this.popVisible = false;
    },
    chooseYwy: (itemName, itemId) => {
      this.ywyName = itemName;
      this.ywyId = itemId;
      this.popVisible = false;
    },
    onChangeRemark: (e) => {
      const {detail} = e
      this.remark = detail
    },
    goBack() {
      wx.navigateBack({
        delta: 1,
      });
    },
    beStorage() {
      this.beSure = !this.beSure
      const { salesOrderItem } = this.returnInfo
      const stocks = salesOrderItem.map(item => item.stock).flat(1).filter(item => item.returnQty > 0)
      const orderItems: any = []
      forEach((res: any) => {
        const item = {
          itemId: res.itemId,
          warehouseId: res.warehouseId,
          invBatchId: res.batchId ? res.batchId : '',
          borderedQty: res.returnQty,
          bprice: res.bprice,
          amount: res.amount,
          invStatusId: res.invStatusId,
        }
        orderItems.push(item)
      }, stocks)
      const account = wepy.$instance.globalData.account
      this.methods.getNewConfirmationInbound({
        _loading: true,
        userAccount: account,
        data: {
          salesOrderId: this.itemId,
          purchaseOrderId: this.purchaseId ? this.purchaseId : '',
          userId: this.ywyId,
          message: this.remark,
          orderItems
        }
      }).then((res: any) => {
        if (res && res.payload && res.payload.code == '0') {
          Toast.success(`${this.inType}成功`);
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            });
          }, 2000)
        }
      })
    },
    tryNumber(e: any) {
      const { amount } = e
      const isNumber = /^[0-9]\d*\,\d*|[0-9]\d*$/
      return isNumber.test(amount)
    },
    OnseleWarehouse() {
      if (!this.inStatus) {
        Toast.fail('需等待分销商完成出库')
        return
      }
      const { salesOrderItem } = this.returnInfo
      const items = salesOrderItem.map(item => item.stock).flat(1)
      const statusNames = items.map(item => item.invStatusName).filter((item, index, arr) => {
        return arr.indexOf(item, 0) === index
      })
      let fit = true;
      statusNames.forEach(name => {
        const is = items.filter(item => item.invStatusName === name)
        const amount = is.reduce((total, i) => parseInt(total) + parseInt(i.returnQty), 0)
        if (amount > parseInt(is[0].relreturnQty)) {
          fit = false &&  fit
        }
      })
      console.log(fit)
      if (!fit) {
        Toast.fail('商品退货数量大于可退货数量')
        return
      }
      const orderItems: any = []
      forEach((res: any) => {
        const item = {
          itemId: res.itemId,
          borderedQty: res.returnQty,
          bprice: res.bprice,
          amount: res.amount
        }
        orderItems.push(item)
      }, items)
      if (all(propEq('borderedQty', 0), orderItems)) {
        Toast.fail('商品数量不能全为零')
      } else {
        this.beSure = !this.beSure
      }
    },
    returnInfo({ detail }: e) {
      const { salesOrderItem } = this.returnInfo
      const { num, index, itemId } = detail
      const newItem = findIndex(propEq('itemId', itemId), salesOrderItem)
      let count = num > salesOrderItem[newItem].relreturnQty ? salesOrderItem[newItem].relreturnQty: num
      if (newItem !== -1) {
        salesOrderItem[newItem].stock.forEach((item, i) => {
          if (index === i) {
            item.returnQty = count
            item.amount = count * item.bprice
          }
        })
      }
    },
    async choose({detail}: e) {
      this.currentGood = {index: detail.index, id: detail.itemId}
      if (detail.type === 'warehouse') {
        this.warehouseVisible = true;
        this.invBatchVisible = false;
      } else if (detail.type === 'batch') {
        console.log(detail)
        // 通过仓库请求批次
        const { salesOrderItem } = this.returnInfo
        const newItem = findIndex(propEq('itemId', this.currentGood.id), salesOrderItem)
        const productCode = this.currentGood.id
        let warehouseId: number
        if (newItem !== -1) {
          salesOrderItem[newItem].stock.forEach((item, i) => {
            if (this.currentGood.index === i) {
              warehouseId = item.warehouseId
            }
          })
        }
        const invBatchResult: any = await getInvBatch({ productCode: '3451028', warehouseId: '7286958' })
        // const invBatchResult: any = await getInvBatch({ productCode, warehouseId })
        const invBatchList = Object.keys(invBatchResult.invBatch).map(key => {
            return { id: key, value: invBatchResult.invBatch[key] }
        })
        invBatchList.splice(0,0, {id: '', value: '请选择批次'})
        this.currentInvBatchList = invBatchList;
        this.warehouseVisible = false;
        this.invBatchVisible = true;
        this.$apply()
      }
    },
    handle({ detail }: e) {
      const {type, itemId, index} = detail
      if (type === 'add') {
        const { salesOrderItem } = this.returnInfo
        const newItem = findIndex(propEq('itemId', itemId), salesOrderItem)
        const {invStatusName, relreturnQty, returnQty, bprice, stock} = salesOrderItem[newItem]
        if (newItem !== -1) {
          stock.push(
            {
              itemId,
              invStatusName,
              relreturnQty,
              returnQty,
              bprice,
              warehouse: this.warehouseList.length > 0 ? this.warehouseList[0].value : '',
              warehouseId: this.warehouseList.length > 0 ? this.warehouseList[0].id : '',
              batch: '请选择批次',
              batchId: '',
              amount: returnQty * bprice,
            }
          )
        }
      } else if (type === 'del') {
        const { salesOrderItem } = this.returnInfo
        const newItem = findIndex(propEq('itemId', itemId), salesOrderItem)
        if (newItem !== -1 && salesOrderItem[newItem].stock.length >= 1) {
          salesOrderItem[newItem].stock.splice(index, 1)
        }
        this.$apply()
      }
      
    },
    onWarehouseCancel() {
      this.warehouseVisible = false;
    },
    onCloseInvBatch() {
      this.invBatchVisible = false;
    },
    onInvBatchConfirm(evt: { detail: { value: { id: any; value: any; }; }; }) {
      // 设计批次
      const { detail: { value: { id, value } } } = evt
      console.log(id)
      console.log(value)
      const { salesOrderItem } = this.returnInfo
      const newItem = findIndex(propEq('itemId', this.currentGood.id), salesOrderItem)
      if (newItem !== -1) {
        salesOrderItem[newItem].stock.forEach((item, i) => {
          if (this.currentGood.index === i) {
            item.batchId = id
            item.batch = value
          }
        })
      }
      this.invBatchVisible = false;
    },
    onWarehouseConfirm(evt: { detail: { value: { id: any; value: any; }; }; }) {
      const { detail: { value: { id, value } } } = evt
      this.warehouseVisible = false;
      const { salesOrderItem } = this.returnInfo
      const newItem = findIndex(propEq('itemId', this.currentGood.id), salesOrderItem)
      if (newItem !== -1) {
        salesOrderItem[newItem].stock.forEach((item, i) => {
          if (this.currentGood.index === i) {
            item.warehouseId = id
            item.warehouse = value
          }
        })
      }
      this.$apply()
    },
  }
  async onLoad(e: any) {
    const { itemId, purchaseId } = e
    this.itemId = itemId
    this.purchaseId = purchaseId
    await this.methods.getNewReturnOrderInfo({ _loading: true, salesOrderId: itemId, purchaseOrderId: purchaseId ? purchaseId : ''})
    await this.methods.getOutWarehouseList()
    const { salesOrderItem } = this.returnInfo;
    salesOrderItem.forEach(item => {
      item.stock.forEach(st => {
        st.warehouse = this.warehouseList.length > 0 ? this.warehouseList[0].value : ''
        st.warehouseId = this.warehouseList.length > 0 ? this.warehouseList[0].id : ''
      })
    })
    this.methods.getBaseData({
      type: 'ywy'
    }).then(res => {
      const {payload: {data}} = res
      this.ywyList = data.map(item => {
        return Object.keys(item).map(id => { return {id, name: item[id]}})
      }).flat(1)
      if (this.ywyList) {
        const ywy = this.ywyList[0]
        this.ywyId = ywy.id
        this.ywyName = ywy.name
      }
      
      this.$apply()
    })
    // 判断按钮展示
    const {canIn, returnBy, documentType, documentNum} = this.returnInfo
    this.orderName = documentNum.includes('S') ? '销售单号' : '退货单号'
    if (documentType === 'retail') {
      this.inType = '退货入库'
    } else if (documentType === 'normal' || documentType === 'return'){
      if (returnBy === '') {
        this.inType = '退货'
      } else if (returnBy === 'bySales' && !canIn ) { // 代理发起
        this.inType = '入库'
        this.inStatus = false
      } else if (returnBy === 'bySales' && canIn) {
        this.inType = '入库'
      } else { //分销发起
        this.inType = '入库'
      }
    }
    this.$apply()
  }
}
