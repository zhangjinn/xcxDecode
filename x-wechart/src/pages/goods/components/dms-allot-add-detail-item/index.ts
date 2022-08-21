import { VantComponent } from '@/components/vant/common/component';
import {dmsRequest} from '@/store/actions/dmsrequest';
import Toast from '@/components/vant/toast/toast';
import wepy from 'wepy';
//子组件
VantComponent({
  props: {
    itemId: String,
    itemInfo: Object,
    index: Number,
    from: String,
    warehouseId: String,
    outInv: {
      type: Object,
      twoWay: true
    },
    orgId: String,
    isDisabled: {
      type: Boolean,
      default: false // true表单不可修改，，，false表单可修改
    },
  },

  data: {
    inventory: '',
    inventoryName: '请选择',
    invState: '',
    invStateName: '请选择',
    warehouseId: '',
    warehouseName: '请选择',
    quantity: '1',
    price: '',
    lock: false, // 是否锁定价格不能修改
    time: '',
    amount: '0.00', // toFixed(n)
    chooseInvShow: false,
    wareHouseShow: false,
    chooseInvStateShow: false,
    bavailqty: 0, //可用数量
    buchaShow:false
  },


  watch: {
    'outInv': function (newValue: any, oldValue: any) {
      return newValue;
    },

    'warehouseId': function (newValue: any, oldValue: any) {
      //查询可用数量
      this.getBavailqty();
      return newValue;
    },

    'orgId': function (newValue: any, oldValue: any) {
      // this.getBucha();
      return newValue;
    },

    'itemInfo': function(newValue: any, oldValue: any) {
      if (!newValue) {
        return
      }

      const { inventoryName } = this.data
      if (newValue.invStatusId && '请选择' === inventoryName && newValue.invStatus.length > 0) {
        const r = newValue.invStatus.filter((item: any) => newValue.invStatusId === item.key)
        if (r.length > 0) {
          this.setData({
            inventory: r[0].key,
            inventoryName: r[0].value
          })
        }
      }

      if ((newValue || {}).productCode !== (oldValue || {}).productCode) {
        const info = {
          inventory: '',
          inventoryName: '请选择',
          quantity: '1',
          price: '',
          lock: (newValue || {}).lock || false,
          time: (newValue || {}).time
        }
        let newAmount = '0.00'

        if (newValue.price) {
          info.price = newValue.price
        }

        if (newValue.invStatusId) {
          info.inventory = newValue.invStatusId
        }

        if (newValue.quantity) {
          info.quantity = newValue.quantity
        }

        this.setData(info)

        if (newValue.amount) {
          newAmount = newValue.amount
        }
        const { amount } = this.data
        if (amount !== newAmount) {
          this.setData({
            amount: newAmount,
          })
          this.$emit('amountChange', {
            amount: (+newAmount) - (+amount)
          })
        }
      } else if ((newValue || {}).price !== this.data.price && newValue.refreshPrice && newValue.time !== this.data.time) {
        const { amount, quantity } = this.data
        const newPrice = (newValue || {}).price
        const newAmount = (newPrice || 0) * (quantity || 0)
        this.setData({
          lock: (newValue || {}).lock || false,
          price: newPrice,
          amount: newAmount,
          time: (newValue || {}).time
        })
        if (amount !== newAmount) {
          this.$emit('amountChange', {
            amount: (+newAmount) - (+amount)
          })
        }
      } else if ((newValue || {}).lock !== this.data.lock) {
        this.setData({
          lock: (newValue || {}).lock || false,
          time: (newValue || {}).time
        })
      } else if ((newValue || {}).time !== this.data.time) {
        this.setData({
          time: newValue.time
        })
      }
      // this.calcVolume()
      //查询可用数量
      // this.getBavailqty();
      // 如果传参isDisabled=true，表单不可编辑（销售数量、销售价格除外），补差类型默认是选择产品带过来的数据
      if(this.data.isDisabled){
        this.setData({
          inventory: newValue.invStatusId ? newValue.invStatusId : '', // 库存状态id
          inventoryName: newValue.invStatusName ? newValue.invStatusName : '请选择', // 库存状态名称
          invState: newValue.invStatusType ? newValue.invStatusType : '', // 补差类型id
          invStateName: newValue.invStatusTypeName ? newValue.invStatusTypeName : '请选择', // 补差类型名称
          bavailqty: newValue.bigQty,//可用数量
        })

      }else{
        //查询可用库存
        this.getBavailqty()
      }
    }
  },

  methods: {
    getBucha(){
      const app = this
      dmsRequest({
          data: {
            'cisCode': wepy.$instance.globalData.cisCode,
            'orgCode': this.data.orgId
          },
          method: 'isEnableOrNot'
      }) .then(res => {
        this.buchaShow = res.data
        this.setData({
          'buchaShow':res.data,
        })
      })
    },
    chooseItem() {
      //销售组织必选
      // if(!this.data.orgId){
      //   debugger
      //   Toast.fail('请选择销售组织');
      //   return;
      // }
      // this.calcVolume()
      //调用dms-allot-add-detail页面的chooseItem方法
      this.$emit('chooseItem', {
        id: this.data.itemId
      })
    },
    del() {
      this.$emit('itemDel', {
        id: this.data.itemId,
        amount: this.data.amount
        // volume: this.data.volume
      })
    },
    openChooseInv() {
      const { isDisabled, itemInfo } = this.data
      if(isDisabled){
        return
      }
      if (itemInfo.invStatus.length > 0) {
        this.setData({
          chooseInvShow: true
        })
      }
    },
    onClose() {
      this.setData({
        chooseInvShow: false
      })
    },
    chooseInv({ currentTarget} : e) {
      const { dataset} = currentTarget
      const { key } = dataset
      const { invStatus } = this.data.itemInfo
      for (const index in invStatus) {
        const status = invStatus[index]
        if (status.key === key) {
          this.setData({
            inventory: status.key,
            inventoryName: status.value,
            chooseInvShow: false
          })
          break
        }
      }
      //查询可用数量
      this.getBavailqty();
    },

    openChooseInvState() {
      const { isDisabled, itemInfo } = this.data
      if(isDisabled){
        return
      }
      if (itemInfo.invStateTypes.length > 0) {
        this.setData({
          chooseInvStateShow: true
        })
      }
    },
    onCloseState() {
      this.setData({
        chooseInvStateShow: false
      })
    },
    chooseInvState({ currentTarget} : e) {

      const { dataset} = currentTarget
      const { key } = dataset
      const { invStateTypes } = this.data.itemInfo

      for (const index in invStateTypes) {
        const status = invStateTypes[index]
        if (status.key === key) {
          this.setData({
            invState: status.key,
            invStateName: status.value,
            chooseInvStateShow: false
          })
          break
        }
      }

      //查询可用数量
      this.getBavailqty();
    },

    openChooseWareHouse() {
      const { itemInfo } = this.data
      this.setData({
        wareHouseShow: true
      })
    },

    onCloseWarehouse() {
      this.setData({
        wareHouseShow: false
      })
    },

    chooseWarehouse({ currentTarget} : e) {
      // debugger
      const { dataset} = currentTarget
      const { key } = dataset
      const { inWarehouseList } = this.data.itemInfo
      for (const index in inWarehouseList) {
        const status = inWarehouseList[index]
        if (status.key === key) {
          this.setData({
            warehouseId: status.key,
            warehouseName: status.value,
            wareHouseShow: false
          })
          break
        }
      }
      //查询可用数量
      this.getBavailqty();
    },

    //获取可用库存
    getBavailqty() {
      try {
        const {itemInfo,warehouseId,invState,inventory} = this.data;
        if (itemInfo.productCode && warehouseId && inventory) {
          const bavailqtyPromise: any = dmsRequest({
            data: {
              productCode: itemInfo.productCode,
              warehouseId: warehouseId,//this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.warehouseId,
              invStatusType: invState,  //补差类型
              invStatusId: inventory,  //库存状态
              invBatchId: '', //库存批次id
            },
            method: 'getInvQty'
          }) .then(res => {
            const { bavailqty } = res;
            this.setData({
              bavailqty:bavailqty,
            })
          })
        }else{
          this.setData({
            bavailqty: 0,
          })
        }
      } catch (error) {

      }
    },


    // {
    // empty: false // 是否使用了
    // finish: false // 使用了是否填写完整
    // errMsg: '' // 提示错误信息
    // }
    checkParam() {

      const { itemInfo, inventory, quantity, price, index, outInv, invState, bavailqty } = this.data
      const empty = !itemInfo.productCode && !inventory && !price
      const finish = itemInfo.productCode && itemInfo.model && inventory && price
      let errMsg = ''

      //如果是否出库选择是，销售数量不可大于可用数量
      //是否出库选择否，仓库不是必填，如果没有选择仓库，产品行上没有可用数量字段，如果是否出库选择是，仓库必填
      if(outInv && outInv.name==='是') {
        // 验证数量
        if (quantity * 1 > bavailqty) {
          errMsg = `第${index + 1}个商品的调拨数量不可大于可用数量`;
        }
      }

      if (!empty && !finish) {
        // 错误
        errMsg = `第${index + 1}个商品的信息不完整`
      } else if (+price > 99999) {
        errMsg = `第${index + 1}个商品价格不能大于99999`
      } else if (+price === 0.00) {
        errMsg = `第${index + 1}个商品价格不能为0`
      } else if (+quantity === 0) {
        errMsg = `第${index + 1}个商品数量不能为0`
      }
      return {
        empty,
        finish,
        errMsg
      }
    },
    getParam() {
      const { itemInfo, inventory, quantity, price, amount,invState } = this.data
      const finish = itemInfo.productCode && itemInfo.model && inventory && quantity
      return {
        itemInfo,
        inventory,
        quantity,
        price,
        amount,
        finish,
        invState
      }
    },
    onQuantityChange({ detail }: wepy.Event) {
      this.data.quantity = detail
      console.log(detail);
      this.calcAmount()
      // this.calcVolume()
    },
    onPriceChange({ detail }: wepy.Event) {
      if (isNaN(+detail)) {
        let v = detail
        if (detail.startsWith('.')) {
          v = '0' + detail
        }
        v = v.replace(/(\d+\.\d{0,2})(.*)/, "$1")
        this.data.price = v
      } else {
        this.data.price = detail
      }
      this.calcAmount()
    },
    onPriceBlur({ detail }: wepy.Event) {
      const { value } = detail
      if (isNaN(+value)) {
        let v = value
        if (value.startsWith('.')) {
          v = '0' + value
        }
        v = v.replace(/(\d+\.\d{0,2})(.*)/, "$1")
        this.setData({
          price: v,
        })
      } else if ((+value).toFixed(2) !== value) {
        // 说明小数点后两位
        const price = (+value).toFixed(2)
        this.setData({
          price,
        })
      }

    },
    calcAmount() {
      const { price, quantity, amount } = this.data
      let newAmount = '0.00'
      if (price && quantity) {
        // 计算金额
        newAmount = (price * quantity).toFixed(2)
        this.setData({
          amount: newAmount,
        })
        this.$emit('amountChange', {
          amount: newAmount
        })
      }
    },
    //动态计算体积
    // calcVolume() {
    //   const { quantity } = this.data
    //   const { volume } = this.data.itemInfo
    //   let newVolume = '0.00'
    //   if (volume || volume === 0) {
    //     // 计算体积
    //     newVolume = (volume * quantity).toFixed(2)
    //     this.setData({
    //       volume: newVolume,
    //     })
    //     this.$emit('volumeChange', {
    //       volume: newVolume
    //     })
    //   }
    // }
  }
})
