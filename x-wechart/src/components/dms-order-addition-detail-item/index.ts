import { VantComponent } from '../vant/common/component'
import {dmsRequest} from '@/store/actions/dmsrequest';
import Toast from '../vant/toast/toast';
import wepy from 'wepy';
import {checkTel} from "@/utils/index";
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
    ly: String,
    isDisabled: {
      type: Boolean,
      default: false // true表单不可修改，，，false表单可修改
    },
    requiredParameters: Object
  },

  data: {
    materialCode: '', // 物料编码
    inventory: '', // 库存状态id
    inventoryName: '请选择', // 库存状态名称
    invState: '', // 补差类型id
    invStateName: '请选择', // 补差类型名称
    warehouseName: '', // 仓库名称
    zoneB2cService: [], // 服务方式id
    zoneB2cServiceName: [], // 服务方式名称
    serverPopVisible: false, // 服务列表是否展示
    quantity: '1',
    price: '',
    suggestPrice: '', // 建议零售价
    lock: false, // 是否锁定价格不能修改
    time: '',
    amount: '0.00', // toFixed(n) 小计金额
    volumeTotal: '0.00', // toFixed(n)
    chooseInvShow: false,
    wareHouseShow: false,
    chooseInvStateShow: false,
    bavailqty: 0, //可用数量
    buchaShow:true,
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
      // this.getBucha()
      return newValue;

    },

    'itemInfo': function(newValue: any, oldValue: any) {
      if (!newValue) {
        return
      }
      //库存状态
      const { inventoryName } = this.data
      if (newValue.invStatusId && '请选择' === inventoryName && newValue.invStatus && newValue.invStatus.length > 0) {
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
        let newVolume = '0.00'

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

        //体积计算
        if (newValue.volumeTotal) {
          newVolume = newValue.volumeTotal
        }
        const { volumeTotal } = this.data
        if (volumeTotal !== newVolume) {
          this.setData({
            volumeTotal: newVolume,
          })
          this.$emit('volumeChange', {
            volumeTotal: (+newVolume) - (+volumeTotal)
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
      this.calcVolume()

      // 重置建议零售价格
      this.setData({
        suggestPrice: this.data.itemInfo.price,
        price: this.data.price || this.data.itemInfo.price,
      })

      // 如果传参isDisabled=true，表单不可编辑（销售数量、销售价格除外），补差类型默认是选择产品带过来的数据;并且添加物料编码字段
      if(this.data.isDisabled){
          this.setData({
            inventory: this.data.itemInfo.invStatusId ? this.data.itemInfo.invStatusId : '', // 库存状态id
            inventoryName: this.data.itemInfo.invStatusName ? this.data.itemInfo.invStatusName : '', // 库存状态名称
            invState: this.data.itemInfo.invStatusType ? this.data.itemInfo.invStatusType : '', // 补差类型id
            invStateName: this.data.itemInfo.invStatusTypeName ? this.data.itemInfo.invStatusTypeName : '', // 补差类型名称
            materialCode: this.data.itemInfo.materialCode ? this.data.itemInfo.materialCode : '', //物料编码
            warehouseName: this.data.itemInfo.gicWarehouseName ? this.data.itemInfo.gicWarehouseName : '', //仓库名称
            bavailqty:this.data.itemInfo.bigQty,//可用数量
          })

      }else{
        //查询可用库存
        this.getBavailqty()
      }

      // 零售录入新版本给服务列表、销售数量赋值
      if(this.data.ly == 'retailNew'){
        this.setData({
          zoneB2cService: this.data.itemInfo.zoneB2cService && this.data.itemInfo.zoneB2cService.length > 0 ? this.data.itemInfo.zoneB2cService : [], // 服务方式id
          zoneB2cServiceName: this.data.itemInfo.zoneB2cServiceName && this.data.itemInfo.zoneB2cServiceName.length > 0 ? this.data.itemInfo.zoneB2cServiceName : [], // 服务方式名称
          quantity: this.data.itemInfo.quantity ? this.data.itemInfo.quantity : '1', // 销售数量
        })
      }
      // 分销录入新版本给销售数量赋值
      if(this.data.ly == 'channelNew'){
        this.setData({
          quantity: this.data.itemInfo.quantity ? this.data.itemInfo.quantity : '1', // 销售数量
        })
      }

      this.calcAmount()

    }
  },
  onload () {

  },

  methods: {

    getBucha(){
        let abbbaa = this
        try {
            const aaa: any = dmsRequest({
              data: {
                'cisCode': wepy.$instance.globalData.cisCode,
                'orgCode': this.data.orgId
              },
              method: 'isEnableOrNot'
            }) .then(res => {
              this.buchaShow = res.data
              abbbaa.setData({
                'buchaShow':res.data,
              })
              this.$apply()

            }).catch(res=>{

            })

        } catch (error) {

        }

    },
    checkRequiredParameters() {
      const { store, customerName, customerPhone, chooseProvinceInfo, saleType, receiverDetail, deliveryMethod } = this.data.requiredParameters
      if (customerName === '') {
        Toast.fail('请填写客户名称')
        return false
      }
      if (customerPhone === '') {
        Toast.fail('请填写联系电话')
        return false
      }
      if (!checkTel(customerPhone)) {
        Toast.fail('请填写正确手机号或座机')
        return false
      }
      if(!chooseProvinceInfo.id){
        Toast.fail('请选择省市区县')
        return false
      }
      if (receiverDetail === '') {
        Toast.fail('请填写详细地址')
        return false
      }
      if (!deliveryMethod.id) {
        Toast.fail('请选择配送方式')
        return false
      }
      return true
    },
    chooseItem() {
      if(this.data.ly === 'retailNew'){ // 零售录入新版必填项判断
        const checkResult = this.checkRequiredParameters()
        if(!checkResult){
          return;
        }
      }else{
        if(this.data.ly !== 'channelNew'){
          if(this.data.ly !== 'channel') {
            //销售组织必选
            if(!this.data.orgId){
              Toast.fail('请选择销售组织');
              return;
            }
          }
          //仓库必选
          if(!this.data.warehouseId) {
            Toast.fail('请选择仓库');
            return;
          }
        }
      }

      this.calcVolume()
      this.calcAmount()
      this.$emit('chooseItem', {
        id: this.data.itemId,
        ly: this.data.ly
      })
    },
    del() {
      this.$emit('itemDel', {
        id: this.data.itemId,
        amount: this.data.amount,
        volume: this.data.volume
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
      if (itemInfo.invStatus.length > 0) {
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
        const {itemInfo,warehouseId,invState,inventory,orgId} = this.data;
        if (itemInfo.productCode && warehouseId && inventory) {
          const aaa: any = dmsRequest({
            data: {
              productCode: itemInfo.productCode,
              warehouseId: warehouseId,//this.channelReturnInfo.items[this.itemindex].outTabs[this.tabsIndex].selectInfo[this.index].info.warehouseId,
              invStatusType: invState,  //补差类型
              invStatusId: inventory,  //库存状态
              invBatchId: '', //库存批次id
              orgCode: orgId,  //可用库存
            },
            method: 'getInvQty'
          }) .then(res => {
            const { bavailqty } = res;
            this.setData({
              bavailqty:bavailqty,
            })
          }).catch(res=>{
            this.setData({
              bavailqty: 0
            })
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

      const { itemInfo, inventory, quantity, price, index, outInv, bavailqty,suggestPrice } = this.data
      const empty = !itemInfo.productCode && !inventory && !price
      const finish = itemInfo.productCode && itemInfo.model && inventory && price
      let errMsg = ''

      //如果是否出库选择是，销售数量不可大于可用数量
      //是否出库选择否，仓库不是必填，如果没有选择仓库，产品行上没有可用数量字段，如果是否出库选择是，仓库必填
      if(outInv && outInv.name==='是') {
        // 验证数量
        if (quantity * 1 > bavailqty) {
          errMsg = `第${index + 1}个商品的销售数量不可大于可用数量`;
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
      if(this.data.ly === 'retail' || this.data.ly === 'retailNew'){
        if (suggestPrice && (( +price < suggestPrice * 0.5 ) || ( +price > suggestPrice * 1.75 ))){
          errMsg = `第${index + 1}个商品建议零售价L为${suggestPrice}元，可填范围在0.5 倍到1.75倍之间。`
        }
      }
      return {
        empty,
        finish,
        errMsg
      }
    },
    getParam() {
      const { itemInfo, inventory, quantity, price, amount,invState } = this.data
      const finish = itemInfo.productCode && itemInfo.model && inventory && quantity && price

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
      this.$emit('quantityChange', {
        quantity: detail,
        index: this.data.index,
      })
      this.calcAmount()
      this.calcVolume()
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
      this.calcAmount('onPriceChange') // 手动输入调用calcAmount函数，传参onPriceChange，方便在函数中进行特殊处理
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
    calcAmount(type) {
      const { price, quantity, amount } = this.data
      let newAmount = '0.00'
      if (price && quantity) {
        // 计算金额
        newAmount = (price * quantity).toFixed(2)
        this.setData({
          amount: newAmount,
        })
        this.$emit('amountChange', {
          amount: (+newAmount) - (+amount)
        })
      }else{
        this.setData({
          amount: 0,
        })
        if(type && type === 'onPriceChange'){ // 有type参数，且参数 type ==='onPriceChange' 为手动输入金额，手动输入金额如果金额为空的话依然向父组件传值
          this.$emit('amountChange', {
            amount: (+newAmount) - (+amount)
          })
        }
      }
    },
    //动态计算体积
    calcVolume() {
      const { quantity, volumeTotal } = this.data
      const { volume } = this.data.itemInfo
      let newVolume = '0.00'
      if (volume || volume === 0) {
        // 计算体积
        newVolume = (volume * quantity).toFixed(2)
        this.setData({
          volumeTotal: newVolume,
        })
        this.$emit('volumeChange', {
          volume: (+newVolume) - (+volumeTotal)
        })
      }
    },

    // 展示服务列表
    openServerPopVisible() {
      const { itemInfo } = this.data
      if (itemInfo.serviceList && itemInfo.serviceList.length > 0) {
        this.setData({
          serverPopVisible: true
        })
      }
    },
    // 关闭服务列表
    closeServerPopVisible() {
      this.setData({
        serverPopVisible: false
      })
    },
    // 选择服务列表
    onChooseService({ currentTarget} : e) {
      if (currentTarget.dataset.issupport == 0) {
        return
      }
      const key = currentTarget.dataset.key
      const name = currentTarget.dataset.name
      const ids = new Set(this.data.zoneB2cService)
      if (ids.has(key)) {
        ids.delete(key)
      } else {
        ids.add(key)
      }
      let zoneB2cService = Array.from(ids)
      const names = new Set(this.data.zoneB2cServiceName)
      if (names.has(name)) {
        names.delete(name)
      } else {
        names.add(name)
      }
      let zoneB2cServiceName = Array.from(names)
      this.setData({
        zoneB2cService: zoneB2cService,
        zoneB2cServiceName: zoneB2cServiceName
      })
      this.$emit('serviceChange', {
        zoneB2cService: zoneB2cService,
        zoneB2cServiceName: zoneB2cServiceName,
        index: this.data.index,
      })
    },
  }
})
