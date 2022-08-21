import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import Toast from '@/components/vant/toast/toast';
import OrderDetail from '@/components/dms-order-addition-detail/index';
import { getNormalSalesOrderCustomerInfo, submitChannelOrder, getCisPrice } from '@/store/actions/dmsorder';
import { getBaseData } from '@/store/actions/purchaseshop';
import channelOrder from '@/mixins/channel-retail-order';
import { debounce } from 'throttle-debounce';
import { formatDate } from '@/utils/index';
import { DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR, DMS_CHANNEL_ORDER_ADD_ITEMS, DMS_CIS_CODE_INFO } from '@/store/types/dmsorder';
import Dialog from '@/components/vant/dialog/dialog';
import { DMS_ORDER_CHOOSE_CUSTOMER_INFO } from '@/store/types/dmsorder';
import { toNormalOrderEdit } from '@/store/actions/salesorderdetail';
import { getItemInvStatus } from '@/store/actions/dmsorder';
import PopupToast from '@/components/popup-toast/index';

interface ChooseInfo {
  id: number | string;
  name: string;
}

interface Data {
  showMore: boolean; // 是否显示更多
  org: ChooseInfo; // 供应商
  sendInventoryInfo: ChooseInfo; // 发货仓库信息
  receiveInventoryInfo: ChooseInfo; // 入库仓库信息
  receiveUnitInfo: ChooseInfo,  // 收货单位 删除
  receiverInfo: ChooseInfo; // 收货地址信息
  saleType: ChooseInfo; // 销售类型
  invoiceInfo: ChooseInfo; // 开票信息
  saler: ChooseInfo; // 业务员
  note: string; // 备注
  amount: string;
  popVisible: boolean;
  popList: Array<any>;  // pop弹出框 列表
  popTitle: string;   // pop弹出框 标题
  compareInfo: Object;
  popFiledName: string;
  refreshPrice: boolean; // 是否刷新价格
}

@connect({
  chooseCustomerInfo({ dmsorder }) {
    return dmsorder.chooseCustomerInfo
  },
  customerInfos({ dmsorder }) {
    return dmsorder.customerInfos
  },
  loading({ loading }) {
    return loading.loading
  },
  kpfList({ purchaseshop }) {
    return purchaseshop.kpfList
  },
  ywyList({ purchaseshop }) {
    return purchaseshop.ywyList
  },
  fhckList({ purchaseshop }) {
    return purchaseshop.fhckList
  },
  orderdetail({ salesorderdetail }) {
    return salesorderdetail.normalorderdetail
  },
  additionOrderDetailItem({ dmsorder }) {
    return dmsorder.chooseItemInfo
  }
}, {
  getBaseData,
  getNormalSalesOrderCustomerInfo,
  submitChannelOrder,
  toNormalOrderEdit,
  getItemInvStatus,
  getCisPrice
})
export default class ChannelOrder extends wepy.page {
  config = {
    navigationBarTitleText: '渠道订单编辑',
    usingComponents: {
      "van-popup": "/components/vant/popup/index",
      "van-toast": "/components/vant/toast/index",
      "item": "/components/dms-order-addition-detail-item/index",
      "van-icon": "/components/vant/icon/index",
      "van-submit-bar": "/components/vant/submit-bar/index",
      "van-transition": "/components/vant/transition/index",
      "van-field": "/components/vant/field/index",
      "van-dialog": "/components/vant/dialog/index"
    },
  };

  mixins = [channelOrder];

  saleTypes = [{
    id: 'wholesale',
    name: '批发'
  }, {
    id: 'engineering',
    name: '工程'
  }];

  data: Data = {
    refreshPrice: false, // 初次进来不刷新价格
    showMore: false,
    org: {
      id: '',
      name: '请选择'
    }, // 供应商  id name
    sendInventoryInfo: {
      id: '',
      name: '请选择'
    },  // id name
    receiveInventoryInfo: {
      id: '',
      name: '请选择'
    },
    receiveUnitInfo: {
      id: '',
      name: ''
    },
    receiverInfo: {
      id: '',
      name: '请选择'
    },   // id name
    saleType: {
      id: 'wholesale',
      name: '批发'
    },    // id name
    invoiceInfo: {
      id: '',
      name: '请选择'
    },  // id name
    saler: {
      id: '',
      name: '请选择'
    },   // id name
    note: '',
    amount: '0.00',
    popList: [],
    popTitle: '',
    popVisible: false,
    popFiledName: '',
    compareInfo: {}
  };

  components = {
    order: OrderDetail,
    popup: PopupToast
  };

  /**
   * TODO: 保存成功后删除客户信息，商品信息
   */
  methods = {
    // 应该获取那个值给popList   应该对比那个字段为选中信息
    openChoose: (propName: string, fieldName: string, titleName: string) => {
      let list = this[propName]
      if (!list) {
        list = this.customerInfos[propName]
      }
      if (list.length === 0) {
        // Toast(`暂无${titleName}`)
        return
      }
      this.popList = list

      this.compareInfo = this.data[fieldName]
      this.popFiledName = fieldName
      this.popTitle = titleName
      this.popVisible = true
    },
    onClose: () => {
      this.popVisible = false
    },
    onChoose: ({ currentTarget }: e) => {
      const { dataset } = currentTarget
      const { index } = dataset
      const { popFiledName, popList } = this.data
      this[popFiledName] = popList[index]
      this.popVisible = false

      if (popFiledName === 'store') {
        const orgId = popList[index]
        this.additionOrderDetailItem.orgId = orgId
        this.additionOrderDetailItem.cisCode = this.customerInfos.cisCode
        const productIds = []
        const orgIds = []

        for(const key in this.additionOrderDetailItem.itemInfo) {
          const item = this.additionOrderDetailItem.itemInfo[key]
          if (item.productCode) {
            productIds.push(item.productCode)
            orgIds.push(orgId)
          }
        }
        if(productIds.length > 0) {
          // 获取最新价格
          this.methods.getCisPrice({
            type: '2',
            cisCode: this.customerInfos.cisCode,
            orgId: orgIds.join(','),
            productId: productIds.join(',')
          })
        }
      }
    },

    showMore: () => {
      this.showMore = true
    },
    hiddenMore: () => {
      this.showMore = false
    },
    submit: () => {
      this.methods.submited('submitted')
    },
    cache: () => {
      this.methods.submited('draft')
    },
    // ”draft”为保存，”submitted”为提交
    /**
     * {
    "cisCode":"7111377",                    //cis编码
"userAccount":"7111377",
   "status":"draft",                              //”draft”为保存，”submitted”为提交
    "salesOrder":{
        "documentDate":"2019-09-09",             //下单时间
        "edt":"2019-09-09",                         //期望时间
        "customerCode":"7111377",                 //客户编码
        "customerName":"莱西孙受海信专卖店",       //客户名称
        "orgId":"1231",                             //组织编码
        "billFromId":"423432",                      //开票方id
        "addressId":"134234",                      //收货地址id
        "inWarehouseId":"3424",                      //入库仓库id
        "retailType":"wholesale",                    //销售类型
        "sellerCode":"1",                            //业务员编码
        "sellerName":"小明",                        //业务员名
        "message":"备注",                           //备注
        "salesOrderItem":[                          //渠道订单明细
            {
                "productCode":"4234",                  //产品编码
                "productName":"电视",                  //产品名称
                "model":"KAJOFEI",                     //型号
                "colour":"标准",                          //颜色
                "borderedQty":"3",                      //销售数量
                "bdemandQty":"3",                     //需求数量
                "bprice":"200",                         //销售价格
                "amount":"600",                        //金额小计
                "invStatus":"3242"                     //库存状态id
            },
            {
                "productCode":"4234",
                "productName":"电视",
                "model":"KAJOFEI",
                "colour":"标准",
                "borderedQty":"3",
                "bdemandQty":"3",
                "bprice":"200",
                "amount":"600",
                "invStatus":"3242"
            }
        ]
    }
}
     */
    submited: (status: string) => {
      if (this.methods.checkParam()) {
        const { chooseCustomerInfo } = this
        const { org, sendInventoryInfo, receiveUnitInfo,  receiveInventoryInfo, receiverInfo, saleType, invoiceInfo, saler, note } = this.data

        const params = this.$invoke('order', 'getParam')

        // 校验产品是否重复
        const paramObj : string[] = []
        for (const index in params) {
          const param = params[index]
          const key = `${param.itemInfo.model}_${param.itemInfo.colour}`
          if (paramObj.indexOf(key) > -1) {
            Toast(`产品型号${param.itemInfo.model}重复，请重新选择产品!`)
            return
          } else {
            paramObj.push(key)
          }
        }

        const time = formatDate(Date.parse(new Date()), 'Y-M-D')
        // 组装数据
        const orderInfo = {
          status,
          salesOrder: {
            id: this.currentOrderId,
            documentDate: time,
            edt: time,
            customerCode: chooseCustomerInfo.customerCode,
            customerName: chooseCustomerInfo.customerName,
            orgId: org.id,
            billFromId: invoiceInfo.id,
            billToId: receiveUnitInfo.id,
            addressId: receiverInfo.id,
            warehouseId: sendInventoryInfo.id,
            inWarehouseId: receiveInventoryInfo.id,
            retailType: saleType.id,
            sellerCode: saler.id,
            sellerName: saler.name,
            message: note,
            salesOrderItem: params.map((param: any) => {
              const itemInfo = param.itemInfo
              return {
                itemId: itemInfo.itemId || '',
                bigUom: itemInfo.uom,
                productCode: itemInfo.productCode,
                productName: itemInfo.productName,
                model: itemInfo.model,
                colour: itemInfo.colour,
                borderedQty: param.quantity,
                bdemandQty: param.quantity,
                bprice: (+param.price).toFixed(2),
                amount: param.amount,
                invStatus: param.inventory,
              }
            })
          }
        }

        Dialog.confirm({
          title: '提示',
          message: `本单据共有${params.length}个产品，确定要${ status === 'submitted' ? '提交' : '暂存'}吗?`
        }).then(() => {
          this.methods.submitChannelOrder({
            ...orderInfo,
            _ignoreToast: true,
            _popup: true
          }).then((res: any) => {
            const { code } = res.payload
            if (code === '0') {
              // 保存成功
              Toast.success({
                message: `${ status === 'submitted' ? '提交' : '暂存'}成功`,
                onClose: () => {
                  wx.navigateBack({
                    delta: 1,
                  });
                }
              })
            }
          })
        }).catch(() => {
          // on cancel
        });

      }
    },
    checkParam: () => {
      // 检查Head里面必填信息
      // 除发货仓库，其他均是必选
      const { chooseCustomerInfo } = this
      const { org, receiveInventoryInfo, receiverInfo, saleType, invoiceInfo, saler } = this.data
      if (!chooseCustomerInfo.customerCode) {
        Toast.fail('请选择客户信息')
        return false
      }
      if (!org.id) {
        Toast.fail('请选择供应商')
        return false
      }
      if (!receiveInventoryInfo.id) {
        Toast.fail('请选择入库仓库')
        return false
      }
      if (!receiverInfo.id) {
        Toast.fail('请选择收货地址')
        return false
      }
      if (!saleType.id) {
        Toast.fail('请选择销售类型')
        return false
      }
      if (!invoiceInfo.id) {
        Toast.fail('请选择开票方')
        return false
      }
      if (!saler.id) {
        Toast.fail('请选择业务员')
        return false
      }

      const { errMsg, submitLines } = this.$invoke('order', 'checkParam')
      if (errMsg !== '') {
        // toast
        Toast.fail(errMsg)
        return false
      } else if (submitLines === 0) {
        Toast.fail('请先添加产品再保存')
        return false
      }
      return true
    },
    onNoteChange: debounce(500, ({ detail } : any) => {
      this.note = detail
      this.$apply()
    })
  }

  // plsChoose = {
  //   id: '',
  //   name: '请选择'
  // }

  watch = {
    'org': (newValue: any, oldValue: any) => {
      if (newValue.id) {
        this.additionOrderDetailItem.orgId = newValue.id
        this.additionOrderDetailItem.cisCode = this.customerInfos.cisCode
        let productIds = []
        const orgIds = []
        for(const key in this.additionOrderDetailItem.itemInfo) {
          const item = this.additionOrderDetailItem.itemInfo[key]
          if (item.productCode) {
            orgIds.push(newValue.id)
            productIds.push(item.productCode)
          }
        }
        if(productIds.length > 0) {
          // 获取最新价格
          this.methods.getCisPrice({
            type: '2',
            cisCode: this.customerInfos.cisCode,
            refreshPrice: this.refreshPrice,
            orgId: orgIds.join(','),
            productId: productIds.join(',')
          })
        }
      }
      this.refreshPrice = true
    },
    'customerInfos': (newValue: any) => {
      const { orgId, inWarehouseId, billToId, addressId } = this.chooseCustomerInfo

      // 收货地址
      if (newValue.customerAddressAllList.length > 0) {
        const chooseItem = newValue.customerAddressAllList.find((item: any) => item.id === addressId)
        if (chooseItem) {
          this.receiverInfo = chooseItem
        } else {
          const item = newValue.customerAddressAllList[0]
          this.receiverInfo = item
        }
      } else {
        this.receiverInfo = {
          id: '',
          name: '请选择'
        }
      }

      if (newValue.customerAllList.length > 0) {
        // billToId
        const chooseItem = newValue.customerAllList.find((item: any) => item.id === billToId)
        if (chooseItem) {
          this.receiveUnitInfo = chooseItem
        } else {
          const item = newValue.customerAllList[0]
          this.receiveUnitInfo = item
        }
      } else {
        this.receiveUnitInfo = {
          id: '',
          name: '请选择'
        }
      }

      // 入库仓库
      // receiveInventoryInfo
      if (newValue.inWarehouseList.length > 0) {
        const chooseItem = newValue.inWarehouseList.find((item: any) => item.id === inWarehouseId)
        if (chooseItem) {
          this.receiveInventoryInfo = chooseItem
        } else {
          this.receiveInventoryInfo = newValue.inWarehouseList[0]
        }
      } else {
        this.receiveInventoryInfo = {
          id: '',
          name: '请选择'
        }
      }

      //
      // 供应商
      if (newValue.orgList.length > 0) {
        const chooseItem = newValue.orgList.find((item: any) => item.id === orgId)
        if (chooseItem) {
          this.org = chooseItem
        } else {
          const item = newValue.orgList[0]
          this.org = item
        }
      } else {
        this.org = {
          id: '',
          name: '请选择'
        }
      }
      this.$apply()
    },
    // 'kpfList': (newValue: Array<Object>) => {
    //   if (newValue.length > 0) {
    //     const { invoiceInfo } = this.data
    //     const item = newValue.find(({ name }: ChooseInfo) => name === salesOrder.billFromName)
    //     if (item) {
    //       this.invoiceInfo = item
    //     } else {
    //       this.invoiceInfo = {
    //         id: '',
    //         name: salesOrder.billFromName
    //       }
    //     }
    //   } else {
    //     this.invoiceInfo = {
    //       id: '',
    //       name: '请选择'
    //     }
    //   }
      // if (newValue.length > 0) {
      //   const item = newValue[0]
      //   this.invoiceInfo = item
      // } else {
      //   this.invoiceInfo = {
      //     id: '',
      //     name: '请选择'
      //   }
      // }
    //   this.$apply()
    // },
    // 'ywyList': (newValue: Array<Object>) => {
    //   if (newValue.length > 0) {
    //     const item = newValue[0]
    //     this.saler = item
    //   } else {
    //     this.saler = {
    //       id: '',
    //       name: '请选择'
    //     }
    //   }
    //   this.$apply()
    // },
    // 'fhckList': (newValue: Array<Object>) => {
    //   if (newValue.length > 0) {
    //     const item = newValue[0]
    //     this.sendInventoryInfo = item
    //   } else {
    //     this.sendInventoryInfo = {
    //       id: '',
    //       name: '请选择'
    //     }
    //   }
    //   this.$apply()
    // },
  }

  events = {
    'amount-change': (payload: any) => {
      this.amount = `${((+this.amount) + (+payload.amount)).toFixed(2)}`
    }
  }

  onShow() {
    if (this.loading) {
      Toast.loading({
        message: '正在加载',
        duration: 0
      })
    }
  }

  onLoad(e: { id: any; }) {
  // onLoad(params) {
    // if (params.loadCustomerInfo) {
    //   this.methods.getNormalSalesOrderCustomerInfo({ customerCode: chooseCustomerInfo.customerCode })
    // }
    this.methods.getBaseData({
      type: 'kpf'
    })
    this.methods.getBaseData({
      type: 'ywy'
    })
    this.methods.getBaseData({
      type: 'fhck'
    })
    const { id } = e
    this.currentOrderId = id
    this.methods.toNormalOrderEdit({ salesOrderId: this.currentOrderId }).then((res: { payload: { code: string; }; }) => {
      const { salesOrder } = res.payload
      const { orgId } = salesOrder
      const {
        retailType, // 销售类型
      } = salesOrder

      this.note = salesOrder.message
      this.sendInventoryInfo = {
        id: salesOrder.warehouseId,
        name: `${ salesOrder.warehouseName ? salesOrder.warehouseName : '请选择'}`
      }
      this.saler = {
        id: salesOrder.sellerCode,
        name: salesOrder.sellerName
      }
      this.invoiceInfo = {
        id: salesOrder.billFromId,
        name: salesOrder.billFromName
      }

      const saleType = this.saleTypes.find((item) => item.id === retailType) || this.saleTypes[0]
      this.saleType = saleType

      getStore().dispatch({
          type: DMS_ORDER_CHOOSE_CUSTOMER_INFO,
          payload: res.payload.salesOrder
        })
        const keys: Array<String> = []
        const items = {}
        const productIds = []
        const orgIds = []
        res.payload.salesOrder.salesOrderItem.forEach(({ invStatus, itemId, bigUom, productCode, productName, model, colour, borderedQty, bprice, amount } : any) => {
          const key = `_${(new Date()).valueOf()}`
          keys.push(key)
          productIds.push(productCode)
          orgIds.push(orgId)
          this.methods.getItemInvStatus({
            productCode,
          })
          items[key] = {
            itemId,
            productCode,               //产品编码
            productName,               //产品名称
            model,                  //型号
            colour,                      //颜色
            quantity: borderedQty,                   //销售数量
            price: bprice,                       //销售价格
            amount: (+amount).toFixed(2),                      //金额
            invStatusId:invStatus,                   //库存状态id
            invStatus: [],  // 发送获取库存接口
            uom: bigUom                           //单位
          }
        })
        // this.methods.getCisPrice({
        //   type: '2',
        //   cisCode: this.customerInfos.cisCode,
        //   productId: productIds.join(','),
        //   orgId: orgIds.join(',')
        // })
        // DMS_CHANNEL_ORDER_ADD_ITEMS
        getStore().dispatch({
          type: DMS_CHANNEL_ORDER_ADD_ITEMS,
          payload: items,
        })
        this.$broadcast('details',keys.join(','))
        this.methods.getNormalSalesOrderCustomerInfo({ customerCode: res.payload.salesOrder.customerCode })
        this.$apply()

        // getStore().dispatch({
        //   type: DMS_CIS_CODE_INFO,
        //   payload: {
        //     cisCode: this.customerInfos.cisCode,
        //     orgId,
        //   }
        // })
      });
  }
}
