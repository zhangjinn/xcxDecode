import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { forEachObjIndexed, all, propEq } from 'ramda';
import { getPurchaseDetail, getPurchaseOrderIn } from '@/store/actions/purchasedetail';
import Toast from '@/components/vant/toast/toast';
import { baseUrl } from '@/utils/request';
import { getBaseData } from '@/store/actions/purchaseshop';
import { dmsRequest } from '@/store/actions/dmsrequest';
import utilsWxs from '../../../wxs/utils.wxs';

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
  morencangkuzhuangtaiid: string;
  WarehouseStatus: boolean;
  itemindex: string;
  index: string;
  WarehouseListvisible: boolean;
  morencangku: string;
  morencangkuid: string;
  morencangkuzhuangtai: string;
  deliveryTypeCode: string;
}

@connect({
  user({ user }) {
    return user
  },
  orderdetail({ purchasedetail }) {
    return purchasedetail.orderdetail
  },
  baseData({ purchaseshop }) {
    return purchaseshop.baseData
  },
}, {
  getBaseData,
  getPurchaseDetail,
  getPurchaseOrderIn
})
export default class orderdetail extends wepy.page {
  config = {
    navigationBarTitleText: '入库单详情',
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
    WarehouseStatus: false,
    itemindex: '',
    index: '',
    WarehouseListvisible: false,
    morencangku: '',
    morencangkuid: '',
    morencangkuzhuangtai: '',
    morencangkuzhuangtaiid: '',
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
    deliveryTypeCode: '',
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
    onShippedBqtyChg(evt: Event) {
      const { detail, target: { dataset: { itemIndex, index } } } = evt
      if (typeof detail === 'undefined') {
        return
      }
      if (/^(0|[1-9][0-9]*)$/.test(detail)) {
        this.orderdetail.purchaseOrderItem[itemIndex].selectInfo[index].info.shippedBqty = detail
      } else {
        if (detail !== '') {
          Toast.fail({
            message: '请输入正确的数字',
            duration: 1000,
          });
        } else {
          this.orderdetail.purchaseOrderItem[itemIndex].selectInfo[index].info.shippedBqty = detail
        }
      }
    },
    besureHouse: (itemindex: any, index: any) => {
      this.itemindex = itemindex
      this.index = index
      this.WarehouseListvisible = !this.WarehouseListvisible
    },
    closePolicy: () => {
      this.WarehouseListvisible = false
      this.WarehouseStatus = false
    },
    chooseWarehouse: (key: any, value: any) => {
      this.orderdetail.purchaseOrderItem[this.itemindex].baseData.forEach((res: { key: any; isSelect: boolean; }) => {
        if (res.key == key) {
          res.isSelect = true
        } else {
          res.isSelect = false
        }
      })
      this.WarehouseListvisible = false
      this.orderdetail.purchaseOrderItem[this.itemindex].selectInfo[this.index].morencangku = value
      this.orderdetail.purchaseOrderItem[this.itemindex].selectInfo[this.index].info.warehouseId = key
    },
    // besureHouseStatus: (itemindex: any, index: any) => {
    //   this.itemindex = itemindex
    //   this.index = index
    //   this.WarehouseStatus = !this.WarehouseStatus
    // },
    // 查询库存状态
    // WarehouseStatuse: (key: any, value: any) => {
    //   this.orderdetail.purchaseOrderItem[this.itemindex].selectInfo[this.index].morencangkuzhuangtai = value
    //   this.orderdetail.purchaseOrderItem[this.itemindex].selectInfo[this.index].info.invStatusId = key
    //   this.orderdetail.purchaseOrderItem[this.itemindex].InvStatusList.forEach((res: { key: any; isSelect: boolean; }) => {
    //     if (res.key == key) {
    //       res.isSelect = true
    //     } else {
    //       res.isSelect = false
    //     }
    //   })
    //   this.WarehouseStatus = false
    // },
    submitOrder: () => {
      // 订单信息
      let purchaseOrderItem = []
      // 判断是否全部传完
      let purchaseOrderNumberItem = []
      // 判断是否全为零  自己额以前写的逻辑自己傻逼
      let allNull = []
      for (let index in this.orderdetail.purchaseOrderItem) {
        const res = this.orderdetail.purchaseOrderItem[index]
        // let itemwillcount = res.outQty - (res.orderedQty - res.waitStockBQty)
        let itemwillcount = res.waitStockBQty
        let iteminputcount = 0
        if (res.selectInfo.length > 0) {
          for (let itemindex in res.selectInfo) {
            const item = res.selectInfo[itemindex].info
            if (item.shippedBqty === '') {
              Toast.fail({
                message: '入库数量不能为空',
                duration: 1000,
              });
              return
            }
            const all = {
              number: item.shippedBqty
            }
            allNull.push(all)
            // if (item.shippedBqty == 0 || item.shippedBqty == '') {
            //   Toast.fail({
            //     message: '入库数量不能为零或空',
            //     duration: 1000,
            //   });
            //   return
            // }
            purchaseOrderItem.push(item)
          }
          res.selectInfo.forEach((item: { info: any; }) => {
            iteminputcount = parseInt(item.info.shippedBqty) + iteminputcount
          })
        }
        if (itemwillcount < iteminputcount) {
          Toast.fail({
            message: '入库数总量已超出采购数量，请重新输入',
            duration: 1000,
          });
          return
        } else if (itemwillcount == iteminputcount) {
          const item = {
            itemNumber: true
          }
          purchaseOrderNumberItem.push(item)
        } else if (itemwillcount > iteminputcount) {
          const item = {
            itemNumber: false
          }
          purchaseOrderNumberItem.push(item)
        }
      }
      let finalitemNumber = true
      purchaseOrderNumberItem.forEach((res) => {
        if (res.itemNumber == false) {
          finalitemNumber = false
        }
        return
      })
      if (all(propEq('number', 0), allNull)) {
        Toast.fail({
          message: '入库数量不能全为零',
          duration: 1000,
        });
        return
      }
      this.methods.getPurchaseOrderIn({
        _loading: true, cisCode: wepy.$instance.globalData.cisCode, userAccount: wepy.$instance.globalData.account, data: {
          isFinished: finalitemNumber,
          purchaseOrderId: this.orderdetail.id,
          purchaseOrderItem
        }
      }).then((res: { payload: { data: { code: string; msg: any; }; code: string; }; }) => {
        if (res && res.payload && res.payload.data && res.payload.data.code && res.payload.data.code == "1") {
          // TODO: 错误情况
        } else if (res && res.payload && res.payload.code && res.payload.code == "0") {
          Toast.success({
            message: '入库成功',
            duration: 1000,
          })
          setTimeout(() => {
            this.getAllBaseData(this.orderdetail.id)
          }, 1000)
        }
      })
    },
    onChange: (itemindex: string | number, index: string | number, e: { detail: any; }) => {
      // TODO:
      if (/^(0|[1-9][0-9]*)$/.test(e.detail)) {
        this.orderdetail.purchaseOrderItem[itemindex].selectInfo[index].info.shippedBqty = e.detail
      } else {
        if (e.detail !== '') {
          Toast.fail({
            message: '请输入正确的数字',
            duration: 1000,
          });
        } else {
          this.orderdetail.purchaseOrderItem[itemindex].selectInfo[index].info.shippedBqty = e.detail
        }
      }
    },
    addItem: (key: any, index: string | number) => {
      let productCode = ''
      let model = ''
      let colour = ''
      let price = ''
      let shippedBqty
      let orderedQty = ''
      let outQty
      let morencangku = this.morencangku
      let warehouseId = this.morencangkuid
      // let morencangkuzhuangtai = this.morencangkuzhuangtai
      // let morencangkuzhuangtaiid = this.morencangkuzhuangtaiid
      let invStatusId
      this.orderdetail.purchaseOrderItem.forEach((element: { productCode: string; model: string; colour: string; price: string; orderedQty: string; waitStockBQty: number; outQty: number; invStatusId: number; }) => {
        if (element.productCode == key) {
          productCode = element.productCode
          model = element.model
          colour = element.colour
          price = element.price
          orderedQty = element.orderedQty
          outQty = element.outQty
          shippedBqty = element.outQty > 0 ? element.outQty - (Number(element.orderedQty) - element.waitStockBQty) : 0
          invStatusId = element.invStatusId
        }
      });
      let item = {
        info: {
          productCode,
          model,
          colour,
          price,
          shippedBqty, //待入库
          waitshippedBqty: shippedBqty,
          invStatusId, // 库存状态
          warehouseId: warehouseId, // 仓库id
          // TODO:
          orderedQty, //总量
          outQty, //出库数量
          priceGroupName: ''
        },
        morencangku
      }
      this.orderdetail.purchaseOrderItem[index].selectInfo.push(item)
    },
    // 删除item
    delItem: (itemindex: string | number, index: any) => {
      this.orderdetail.purchaseOrderItem[itemindex].selectInfo.splice(index, 1)
    },
  };
  getAllBaseData(purchaseOrderId: any) {
    this.methods.getBaseData({
      _loading: true, cisCode: wepy.$instance.globalData.cisCode, "type": 'cgrkrkck', userAccount: wepy.$instance.globalData.account
    }).then((res: { payload: { data: any[]; }; }) => {
      forEachObjIndexed((value, key) => {
        this.morencangku = value
        this.morencangkuid = key
      }, res.payload.data[0])
    }),
      this.methods.getPurchaseDetail({ _loading: true, purchaseOrderId }).then((res: { payload: { data: { purchaseOrderItem: { length: number; forEach: (arg0: (resItem: any) => Promise<void>) => void; }; soNum: any; }; }; }) => {
        if (res && res.payload && res.payload.data &&
          res.payload.data.purchaseOrderItem && res.payload.data.purchaseOrderItem.length > 0) {
          res.payload.data.purchaseOrderItem.forEach(async (resItem) => {
            const relproductCode = resItem.productCode
            const Status = {
              cisCode: wepy.$instance.globalData.cisCode,
              productCode: relproductCode
            }
            // 改成不能修改库存状态 2019-12-30
            // const InvStatus = await dmsRequest({
            //   data: Status,
            //   method: 'getInvStatus'
            // })
            // let InvStatusList = []
            // forEachObjIndexed((value, key) => {
            //   forEachObjIndexed((value, key) => {
            //     const item = {
            //       key,
            //       value,
            //       isSelect: false
            //     }
            //     InvStatusList.push(item)
            //   }, value)
            // }, InvStatus.invStatus)
            // if (InvStatusList && InvStatusList.length > 0) {
            //   InvStatusList[0].isSelect = true
            //   this.morencangkuzhuangtai = InvStatusList[0].value
            //   this.morencangkuzhuangtaiid = InvStatusList[0].key
            // }
            resItem.baseData = this.baseData
            // resItem.InvStatusList = InvStatusList
            let productCode = resItem.productCode
            let model = resItem.model
            let colour = resItem.colour
            let price = resItem.price
            let shippedBqty = resItem.outQty > 0 ? resItem.outQty - (resItem.orderedQty - resItem.waitStockBQty) : 0
            let orderedQty = resItem.orderedQty
            let outQty = resItem.outQty
            let morencangku = this.morencangku
            let warehouseId = this.morencangkuid
            // let morencangkuzhuangtai = this.morencangkuzhuangtai
            // let morencangkuzhuangtaiid = this.morencangkuzhuangtaiid
            let item = {
              info: {
                productCode,
                model,
                colour,
                price,
                shippedBqty, //待入库
                waitshippedBqty: shippedBqty,
                invStatusId: resItem.invStatusId, // 库存状态
                warehouseId: warehouseId, // 仓库id
                // TODO:
                orderedQty, //总量
                outQty, //出库数量
                priceGroupName: ''
              },
              morencangku
            }
            resItem.selectInfo.push(item)
            this.$apply()
          })
        }
      })
  }
  onShow() {

  }
  onLoad(e: { purchaseOrderId: any,deliveryTypeCode: any }) {
    const { purchaseOrderId, deliveryTypeCode} = e
    //配送方式
    this.deliveryTypeCode = deliveryTypeCode
    this.getAllBaseData(purchaseOrderId)
  }
}
