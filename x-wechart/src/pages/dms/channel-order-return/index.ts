import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { forEachObjIndexed, all, propEq } from 'ramda';
import { getPurchaseDetail, getPurchaseOrderIn } from '@/store/actions/purchasedetail';
import Toast from '@/components/vant/toast/toast';
import { baseUrl } from '@/utils/request';
import { getBaseData } from '@/store/actions/purchaseshop';
import utilsWxs from '../../../wxs/utils.wxs';
import { getNewReturnOrderChannelInfo, returnAddAndOut } from '@/store/actions/returnentry';
import { dmsRequest } from '@/store/actions/dmsrequest';
import { formatDate } from '@/utils/index';

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
  WarehouseListVisible: boolean;
  morencangku: string;
  morencangkuid: string;
  morencangkuzhuangtai: string;
  ywyListVisible: boolean;
  ywyName: string;
  ywyId: string;
  note: string;
  date: string;
  tabsIndex: string;
  selectBatchVisible: boolean;
  productCode: string;
  invStatusId: string;
  formData: any;
}

@connect({
  user({ user }) {
    return user
  },
  channelReturnInfo({ returnentry }) {
    return returnentry.channelReturnInfo
  },
  baseData({ purchaseshop }) {
    return purchaseshop.baseData
  },
  ywyList({ purchaseshop }) {
    return purchaseshop.ywyList
  },
}, {
  getBaseData,
  returnAddAndOut,
  getPurchaseDetail,
  getPurchaseOrderIn,
  getNewReturnOrderChannelInfo
})
export default class orderdetail extends wepy.page {
  config = {
    navigationBarTitleText: '渠道退货出库',
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
    tabsIndex: '',
    WarehouseListVisible: false,
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
    ywyListVisible: false,
    ywyName: '',
    ywyId: '',
    note: '',
    date: formatDate(Date.parse(new Date()), 'Y-M-D'),
    selectBatchVisible: false,
    productCode: '',
    invStatusId: '',
    formData: {
    }
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
    choosePc: async (value: string, key: string) => {
      this.selectBatchVisible = false
      if (this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchId !== key) {
        this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchIdName = value
        this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchId = key
      } else {
        this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchIdName = ''
        this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchId = ''
      }
      try {
        const bavailqtyPromise: any = await dmsRequest({
          data: {
            productCode: this.productCode,
            warehouseId: this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.warehouseId,
            invStatusId: this.invStatusId,
            invBatchId: key
          },
          method: 'getInvQty'
        })
        const { bavailqty } = bavailqtyPromise
        this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.bavailqty = bavailqty
      } catch (error) {
        this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.bavailqty = 0
      }
      this.$apply()
    },
    selectBatch: (itemindex: any, tabsIndex: any, index: any, productCode: string, invStatusId: string) => {
      this.itemindex = itemindex
      this.tabsIndex = tabsIndex
      this.index = index
      this.productCode = productCode
      this.invStatusId = invStatusId
      this.selectBatchVisible = !this.selectBatchVisible
    },
    onNoteChange: (e: { detail: any; }) => {
      const { detail } = e
      this.note = detail
    },
    chooseYwy: (name: string, id: string) => {
      if (id !== this.ywyId) {
        this.ywyId = id
        this.ywyName = name
      } else {
        this.ywyId = ''
        this.ywyName = ''
      }
      this.ywyListVisible = false
      this.$apply()
    },
    onShippedBqtyChg(evt: Event) {
      const { detail, target: { dataset: { itemIndex, outIndex, index } } } = evt
      if (typeof detail === 'undefined') {
        return
      }
      if (/^(0|[1-9][0-9]*)$/.test(detail)) {
        this.channelReturnInfo.items[itemIndex].outTabs[outIndex].selectInfo[index].info.realBuy = detail
      } else {
        if (detail !== '') {
          Toast.fail({
            message: '请输入正确的数字',
            duration: 1000,
          });
        } else {
          this.channelReturnInfo.items[itemIndex].outTabs[outIndex].selectInfo[index].info.realBuy = detail
        }
      }
    },
    besureHouse: (itemindex: any, tabsIndex: any, index: any, productCode: string, invStatusId: string) => {
      this.itemindex = itemindex
      this.tabsIndex = tabsIndex
      this.index = index
      this.productCode = productCode
      this.invStatusId = invStatusId
      this.WarehouseListVisible = !this.WarehouseListVisible
    },
    closePolicy: () => {
      this.WarehouseListVisible = false
      this.WarehouseStatus = false
      this.ywyListVisible = false
      this.selectBatchVisible = false
    },
    openYwyList: () => {
      this.ywyListVisible = true
    },
    chooseWarehouse: async (key: any, value: any) => {
      this.WarehouseListVisible = false
      this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].morencangku = value
      this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.warehouseId = key
      // 获取批次
      try {
        const invBatchPromise: any = await dmsRequest({
          data: {
            productCode: this.productCode,
            warehouseId: key,
          },
          method: 'getInvBatch'
        })
        const { invBatch } = invBatchPromise
        const invBatchList: any = []
        if (invBatch) {
          forEachObjIndexed((value, key) => {
            const item = {
              value,
              key
            }
            invBatchList.push(item)
          }, invBatch)
        }
        this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].invBatchList = invBatchList
      } catch (error) {
        this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].invBatchList = []
      }
      // 批次重置
      this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchIdName = ''
      this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.invBatchId = ''
      try {
        const bavailqtyPromise: any = await dmsRequest({
          data: {
            productCode: this.productCode,
            warehouseId: key,
            invStatusId: this.invStatusId,
            invBatchId: ''
          },
          method: 'getInvQty'
        })
        const { bavailqty } = bavailqtyPromise
        this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.bavailqty = bavailqty
      } catch (error) {
        this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.bavailqty = 0
      }
      this.$apply()
    },
    submitOrder: () => {
      // 订单信息
      let purchaseOrderItem = []
      // 判断填入数量是否超过可用库存
      let channelOrderItem: any = []
      // 判断是否全部传完
      let purchaseOrderNumberItem = []
      // 判断是否全为零
      let allNull = []
      for (let index in this.channelReturnInfo.items) {
        const res = this.channelReturnInfo.items[index]
        for (let newIndex in res.outTabs) {
          const newRes = this.channelReturnInfo.items[index].outTabs[newIndex]
          let itemWillCount = newRes.canOutQty
          let itemInputCount = 0
          if (newRes.selectInfo.length > 0) {
            for (let itemindex in newRes.selectInfo) {
              const item = newRes.selectInfo[itemindex].info
              if (item.realBuy === '') {
                Toast.fail({
                  message: '退货出库数量不能为空',
                  duration: 1000,
                });
                return
              }
              if (item.bavailqty === 0) {
                Toast.fail({
                  message: '可用库存不能为零',
                  duration: 1000,
                });
                return
              }
              const all = {
                number: item.realBuy
              }
              allNull.push(all)
              const finInfo = {
                productCode: item.productCode,
                warehouseId: item.warehouseId,
                invStatusId: item.invStatusId,
                borderedQty: item.realBuy,
                bprice: item.price
              }
              const newFinInfo = {
                unionId: item.productCode + '_' + item.warehouseId + '_' + item.invStatusId,
                ...item
              }
              channelOrderItem.push(newFinInfo)
              purchaseOrderItem.push(finInfo)
            }
            newRes.selectInfo.forEach((item: { info: any; }) => {
              itemInputCount = parseInt(item.info.realBuy) + itemInputCount
            })
          }
          if (itemWillCount < itemInputCount) {
            Toast.fail({
              message: '退货出库数总量已超出总数量，请重新输入',
              duration: 1000,
            });
            return
          } else if (itemWillCount == itemInputCount) {
            const item = {
              itemNumber: true
            }
            purchaseOrderNumberItem.push(item)
          } else if (itemWillCount > itemInputCount) {
            const item = {
              itemNumber: false
            }
            purchaseOrderNumberItem.push(item)
          }
        }
      }
      let finalItemNumber = true
      purchaseOrderNumberItem.forEach((res) => {
        if (res.itemNumber == false) {
          finalItemNumber = false
        }
        return
      })
      if (all(propEq('number', 0), allNull)) {
        Toast.fail({
          message: '退货出库数量不能全为零',
          duration: 1000,
        });
        return
      }
      const statusNames = channelOrderItem.map(item => item.unionId).filter((item, index, arr) => {
        return arr.indexOf(item, 0) === index
      })
      let fit = true
      statusNames.forEach(name => {
        const is = channelOrderItem.filter(item => item.unionId === name)
        const amount = is.reduce((total, i) => parseInt(total) + parseInt(i.realBuy), 0)
        if (amount > parseInt(is[0].bavailqty) || amount > parseInt(is[0].canOutQty)) {
          fit = false && fit
        }
      })
      if (!fit) {
        Toast.fail({
          message: '请填写正确的出库数量',
          duration: 1000,
        });
        return
      }
      this.methods.returnAddAndOut({
        _loading: true, cisCode: wepy.$instance.globalData.cisCode, userAccount: wepy.$instance.globalData.account,
        data: {
          id: this.channelReturnInfo.id,
          documentNum: this.channelReturnInfo.documentNum,
          returnNum: this.channelReturnInfo.returnNum,
          isLastBatch: finalItemNumber,
          userId: this.ywyId,
          message: this.note,
          orderItems: purchaseOrderItem
        }
      }).then((res: { payload: { data: { code: string; msg: any; }; code: string; }; }) => {
        if (res && res.payload && res.payload.data && res.payload.data.code && res.payload.data.code == "1") {
          // TODO: 错误情况
        } else if (res && res.payload && res.payload.code && res.payload.code == "0") {
          Toast.success({
            message: '出库成功',
            duration: 1000,
          })
          setTimeout(() => {
            // TODO:
            const { itemId, documentNum, returnNum, supplierName, returnBy } = this.formData
            this.getAllBaseData(itemId, documentNum, returnNum, supplierName, returnBy)
          }, 1000)
        }
      })
    },
    addItem: async (key: any, itemindex: any, tabsIndex: any) => {
      let productCode = ''
      let model = ''
      let colour = ''
      let price = ''
      let morencangku = this.morencangku
      let warehouseId = this.morencangkuid
      let invBatchId = ''
      let realBuy = this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].canOutQty
      let canOutQty = this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].canOutQty
      let invStatusId = this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].invStatusId
      let invStatusName = this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].invStatusName
      this.channelReturnInfo.items.forEach((element: { productCode: string; model: string; colour: string; price: string; orderedQty: string; waitStockBQty: number; outQty: number; invStatusId: number; }) => {
        if (element.productCode == key) {
          productCode = element.productCode
          model = element.model
          colour = element.colour
          price = element.price
        }
      });
      let newInvBatch = []
      try {
        const batch: any = await dmsRequest({
          data: {
            productCode,
            warehouseId,
            _ignoreToast: true
          },
          method: 'getInvBatch'
        })
        const { invBatch } = batch
        newInvBatch = invBatch
      } catch (error) {
        console.log(error)
      }
      const invBatchList: any = []
      forEachObjIndexed((value, key) => {
        const item = {
          value,
          key
        }
        invBatchList.push(item)
      }, newInvBatch)
      // 获取可用库存
      let newBavailqty = 0
      try {
        const availableStock: any = await dmsRequest({
          data: {
            productCode,
            warehouseId,
            invStatusId,
            invBatchId,
            _ignoreToast: true
          },
          method: 'getInvQty'
        })
        const { bavailqty } = availableStock
        newBavailqty = bavailqty
      } catch (error) {
        console.log(error)
      }
      let item = {
        info: {
          productCode,
          model,
          colour,
          price,
          warehouseId,
          invBatchId,
          bavailqty: newBavailqty,
          realBuy,
          canOutQty,
          invStatusId,
          invStatusName
        },
        morencangku,
        invBatchList
      }
      this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].selectInfo.push(item)
      this.$apply()
    },
    // 删除item
    delItem: (itemindex: string | number, tabsIndex: string, index: any) => {
      this.channelReturnInfo.items[itemindex].outTabs[tabsIndex].selectInfo.splice(index, 1)
    },
  };
  getAllBaseData(itemId: any, documentNum: string, returnNum: string, supplierName: string, returnBy: string) {
    this.methods.getBaseData({
      type: 'ywy'
    }).then((res: { payload: any; }) => {
      if (res && res.payload && res.payload.data && res.payload.data.length > 0) {
        const { payload: { data } } = res
        forEachObjIndexed((value, key) => {
          this.ywyName = value
          this.ywyId = key
        }, data[0])
      }
    })
    this.methods.getBaseData({
      cisCode: wepy.$instance.globalData.cisCode, "type": 'cglrrkck','orgId':'', userAccount: wepy.$instance.globalData.account
    }).then((res: { payload: { data: any[]; }; }) => {
      forEachObjIndexed((value, key) => {
        this.morencangku = value
        this.morencangkuid = key
      }, res.payload.data[0])
    }),
      this.methods.getNewReturnOrderChannelInfo({ _loading: true, id: itemId, documentNum, returnNum, supplierName, returnBy }).then((res: { payload: { data: { items: any[]; }; }; }) => {
        if (res && res.payload && res.payload.data && res.payload.data.items && res.payload.data.items.length > 0) {
          res.payload.data.items.forEach(async (resItem: any) => {
            resItem.baseData = this.baseData
            if (resItem && resItem.outTabs && resItem.outTabs.length > 0) {
              resItem.outTabs.forEach(async (outTabsItem: any) => {
                // 获取批次
                const invBatchList: any = []
                try {
                  const batch: any = await dmsRequest({
                    data: {
                      productCode: resItem.productCode,
                      warehouseId: this.morencangkuid,
                      _ignoreToast: true
                    },
                    method: 'getInvBatch'
                  })
                  const { invBatch } = batch
                  if (invBatch) {
                    forEachObjIndexed((value, key) => {
                      const item = {
                        value,
                        key
                      }
                      invBatchList.push(item)
                    }, invBatch)
                  }
                } catch (error) {
                  console.log(error)
                }
                // 获取可用库存
                let finBavailqty = 0
                try {
                  const availableStock: any = await dmsRequest({
                    data: {
                      productCode: resItem.productCode,
                      warehouseId: this.morencangkuid,
                      invStatusId: outTabsItem.invStatusId,
                      invBatchId: '',
                      _ignoreToast: true
                    },
                    method: 'getInvQty'
                  })
                  const { bavailqty } = availableStock
                  finBavailqty = bavailqty
                } catch (error) {
                  console.log(error)
                }
                let productCode = resItem.productCode
                let model = resItem.model
                let colour = resItem.colour
                let price = resItem.price
                let morencangku = this.morencangku
                let warehouseId = this.morencangkuid
                let item = {
                  info: {
                    productCode,
                    model,
                    colour,
                    price,
                    warehouseId: warehouseId, // 仓库id
                    invBatchId: '', // 批次默认为空
                    invBatchIdName: '', // 批次名字默认为空
                    bavailqty: finBavailqty,
                    realBuy: outTabsItem.canOutQty,
                    ...outTabsItem
                  },
                  morencangku,
                  invBatchList, // 默认批次列表
                }
                outTabsItem.selectInfo = [] // 存储信息 不改变原来信息
                outTabsItem.selectInfo.push(item)
                this.$apply()
              })
            }
          })
        }
      })
  }
  onLoad(e: { itemId: any, documentNum: string, returnNum: string, supplierName: string, returnBy: string }) {
    const { itemId, documentNum, returnNum, supplierName, returnBy } = e
    this.formData = {
      ...e
    }
    this.getAllBaseData(itemId, documentNum, returnNum, supplierName, returnBy)
  }
  onUnload() {
    this.formData = {}
    this.channelReturnInfo = {}
  }
}
