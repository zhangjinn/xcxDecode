import wepy from 'wepy';
import {connect, getStore} from 'wepy-redux';
import filter from "./../../../components/header-filter/index";
import Toast from "@/components/vant/toast/toast";
import popupCustomize from "../../../components/popup-customize/index";
import {getShopInfoPrototype, getSMterialInfoPrototype} from '@/store/actions/dmsorder';
import {getInventoryQueriesListNew,getSingerMaterialInventoryPage} from '@/store/actions/inventory';
import {
  upload2Img
} from '@/store/actions/record';
import {request} from "@/utils/requestJSON";
import $Toast from "@/components/vant/toast/toast";

interface Data {
  tabList: any[];
  tabActive: any;
  isPopShow: boolean;
  popTitle: string;
  formData: object;
  storeNameOptions: any[];
  currId: any;
  isClickable: boolean;
  calendarShow: boolean;
  calendarConfig: object;
  salesInfo: any[];
  materialGroupOptions: any[];
  proIndex: any;
  activeDetail: any;
  modifyCount: any;
  showSearch: boolean;
  currentOptions: any[];
  isSearch: boolean;
  ProductInfo: any[];
  popSelectedOption: object;
  SampleformData: object;
  formKey: string;
  multiple: boolean,
  account: object;
  formOptions: object;
  isPopShowC: boolean,
  ishowM: boolean,
  currentOptionsC: any[],
  modelLiatc: any[],
  customerInfo: object
}
@connect({
  storeNameOptions({dmsorder}) {
    return dmsorder.protoTypeInfor.storeInfo
  },
  customerInfo({dmsorder}) {
    return dmsorder.protoTypeInfor.customerInfo
  },
}, {
  getShopInfoPrototype,
  getInventoryQueriesListNew,
  getSingerMaterialInventoryPage,
  upload2Img,
  getSMterialInfoPrototype
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '样机管理',
    usingComponents: {
      'van-toast': '../../../../components/vant/toast/index',
      'van-loading': '../../../../components/vant/loading/index',
      'van-search': '../../../../components/vant/search/index',
      "van-field": "../../../../components/vant/field/index",
      "van-cell": "../../../../components/vant/cell/index",
      'van-uploader': '../../../../components/vant/uploader/index',
      "van-icon": "../../../../components/vant/icon/index",
      'van-popup': '../../../../components/vant/popup/index',
      'van-dialog': '../../../../components/vant/dialog/index'
    }
  };
  components = {
    filter,
    popupCustomize
  };
  data: Data = {
    customerInfo: {},
    currentOptions: [],
    currentOptionsC: [],
    isPopShowC: false,// 撤样选择弹出框
    ishowM: false,
    showSearch: false,// tab是否展示搜索，该页面不需要搜索
    // tab循环
    tabList: [
      {
        name: '上样',
      },
      {
        name: '撤样',
      },
      {
        name: '我的样机',
      },
    ],
    tabActive: '0',
    isPopShow: false,
    popTitle: '',
    // 上样
    formData: {
      store: '', // 门店id
      storeName: '',// 门店名称
      storeType: '',// 门店类别id
      storeTypeName: '',// 门店类别名称
      materialGroup: '', // 物料组id
      materialGroupName: '',// 物料组名称
    },
    // 门店
    storeNameOptions: [],
    // 物料组
    materialGroupOptions: [], // 物料组列表
    ProductInfo: [
      // {
      //   model: {
      //     id: '',
      //     name: '',
      //     qty: ''
      //   },
      //   fileList: []
      // }
    ], // 产品信息
    popSelectedOption: {},
    proIndex: 0, // 产品信息下标
    // 撤样
    SampleformData: {
      store: '', // 门店id
      storeName: '', // 门店名称
      storeType: '', // 门店类别
      storeTypeName: '', // 门店类别名称
      type: '信天翁非铺借撤样', // 类型
      model: {
        name: [], // 型号
        id: []
      }
    },
    formKey: '', // 选择当前数据
    modelLiatc: [],
    isSearch: true,
    multiple: true,
    formOptions: {
      proList: []
    },

  };

  onLoad(e) {
    if (e) {
      this.tabActive = e.tabActive
    }
    let data = {
      orgId:'',
      matklId:'',
      searchStr:''
    }
    this.methods.getShopInfoPrototype(data)
  }

  // 页面内交互写在methods里
  methods = {
    // tab切换
    tabChange(param) {
      this.tabActive = param.tabActive
      if (this.tabActive == 2) {
        let url = "/pages/goods/prototypeManagement/list/index?tabActive=" + this.tabActive
        wx.redirectTo({
          url: url
        })
      }
      this.$apply()
    },
    // 删除产品信息
    delSales(event) {
      let {index} = event.currentTarget.dataset
      this.ProductInfo.splice(index, 1)
      this.$apply()
    },
    // 添加销售信息
    addProInfo() {
      // 判断是否有物料组 有的话继续没有提示
      if(!this.formData.materialGroup ){
        $Toast.fail('请先选择物料组')
        return;
      }
      this.ProductInfo.push({
        model: {
          id: '',
          name: ''
        }, // 预计销售额
        fileList: [],
        modeList: []
      })
      this.$apply()
    },

    // 产品信息型号更改
    onFilterFormChange(evt) {
      const {detail, currentTarget: {dataset: {name, index}}} = evt
      if (name == 'model') {
        this.ProductInfo[index].model = detail
      } else {
        this.formData = {
          ...this.formData,
          [name]: detail
        }
      }
    },


    // 打开下拉选项
    onPopOpen(e) {
      const {dataset: {name, key, index}} = e.currentTarget
      this.formKey = key
      this.currentOptions = this.formOptions[this.formKey]
      // 撤样门店的
      if (name == '门店撤样') {
        this.isPopShowC = true
        this.popTitle = '门店'
        this.proIndex = index
        return
      }
      if (key == 'cModel') {
        this.currentOptions = this.modelLiatc
        this.popTitle = '型号'
        this.proIndex = index
        this.popSelectedOption = this.SampleformData.model
        this.multiple = true
        this.$invoke('popupCustomize', 'onShow')
        this.$apply()
        return
      }
      if (name === '型号') { // 型号弹窗展开
        this.isSearch = true
        this.popTitle = name
        this.proIndex = index
        if (this.ProductInfo[this.proIndex].modeList && this.ProductInfo[this.proIndex].modeList.length <= 0) {
          this.currentOptions = this.formOptions.proList
          this.popSelectedOption = this.ProductInfo[this.proIndex][this.formKey]
        } else {
          this.currentOptions = this.ProductInfo[this.proIndex].modeList
          this.popSelectedOption = this.ProductInfo[this.proIndex][this.formKey]
        }
        this.$invoke('popupCustomize', 'onShow')
        this.$apply()
        return
      }
      this.popTitle = name
      this.proIndex = index
      this.isPopShow = true

    },

    // 筛选列表弹框搜索触发事件
    async onSearchOption(searchValue) {
      let words = searchValue || ''
      let param = {
        _loading: true,
        cisCode: wepy.$instance.globalData.cisCode,
        terms: {
          isFuzzy: true,
          zzprdmodel: words,
          model: words,
          colour: '',
          warehouseId: '', // 仓库编码
          invStatusId: '', // 质量等级
          isLock: '',
          dealerMaterialGroupFlag: '',
          materialGroupCode:this.tabActive == 1 ?  '' : this.formData.materialGroup,
          materialGroupName: '',
          gicWarehouseType: '', // 仓库类型
          invStatusType: '', // 补差类型
          invType: '', // 订单审核查询时默认传110，代表在库; 其他情况传空
          bigQtyMin: 0,  //0最小可用库存数量,dms后台取 >0 的结果
          orgId: '',
          gicInvStatus: '110' //库存状态只查正品
        },
        page: {
          pageNo: 1,
          pageSize: 100
        }
      }
      await this.methods.getSingerMaterialInventoryPage(param).then(res => {
        this.currentOptions = []
        let {data} = res.payload
        data = data.map((item) => {
          return {
            id: item.uniqueFlag,
            name: item.zzprdmodel,
            qty: item.bigQty
          }
        })
        if (this.formKey == 'cModel') {
          this.modelLiatc = data
          this.currentOptions = this.modelLiatc
        } else {
          this.ProductInfo[this.proIndex].modeList = data
          this.formOptions.proList = data
          this.currentOptions = this.ProductInfo[this.proIndex].modeList
        }
        this.$apply()
      })
    },
    // 选择对应列表项并赋值
    chooseOption(item) {
      if (this.formKey == 'cModel') {
        if (this.multiple) {
          let oIndex = this.SampleformData['model'].id.indexOf(item.id)
          if (oIndex > -1) {
            this.SampleformData['model'].id.splice(oIndex, 1)
            this.SampleformData['model'].name.splice(oIndex, 1)
          } else {
            this.SampleformData['model'].id.push(item.id)
            this.SampleformData['model'].name.push(item.name)
          }
          return
        }
      }
      if (this.formKey === 'model') { //
        this.ProductInfo[this.proIndex]['model'].id = item.id
        this.ProductInfo[this.proIndex]['model'].name = item.name
        this.ProductInfo[this.proIndex]['model'].qty = item.qty
      }
      this.$invoke('popupCustomize', 'onClose')
      this.$apply()
    },
    // 关闭下拉
    onPopClose(e) {
      this.isPopShow = false
      this.isPopShowC = false
    },

    // 选择门店
    chooseStore(item) {
      this.formData.store = item.code
      this.formData.storeName = item.name
      this.formData.materialGroup = ''
      this.formData.materialGroupName = ''
      this.materialGroupOptions = []
      this.ProductInfo = []
      // 根据门店id获取物料组数据
      let shopData  = {
        shopId:this.formData.store
      }
      this.methods.getSMterialInfoPrototype(shopData).then(res=>{
        if(res.payload.code == 0) {
          this.materialGroupOptions = res.payload.list
        } else {
          this.materialGroupOptions = []
        }

      })

      // 门店类别通过门店带出
      if (item.isExclusiveShop == '1') {
        this.formData.storeType = '专卖店'
      } else {
        this.formData.storeType = '非专卖店'
      }
      this.isPopShow = false
    },
    // 撤样的门店选择
    chooseStorec(item) {
      this.SampleformData.store = item.code
      this.SampleformData.storeName = item.name
      // 门店类别通过门店带出
      if (item.isExclusiveShop == '1') {
        this.SampleformData.storeType = '专卖店'
      } else {
        this.SampleformData.storeType = '非专卖店'
      }
      this.isPopShowC = false
    },
    // 撤样型号修改
    chooseModelc(item) {
      this.SampleformData.modelId = item.id
      this.SampleformData.storeName = item.name
      this.multiple = false
      this.isPopShowC = false
    },
    // 选择物料组
    chooseMaterialGroup(item) {
      this.formData.materialGroup = item.code
      this.formData.materialGroupName = item.name
      this.ProductInfo = []
      this.isPopShow = false
    },

    // 上样提交
    toAddStore: () => {
      // 增加渠道类别上样控制 全国性连锁、电子商务不能操作
      if(wepy.$instance.globalData.customer.channelId == 5600 || wepy.$instance.globalData.customer.channelId == 5605) {
        $Toast.fail('该商家的渠道类别属于全国性连锁、电子商务，不可发起上样流程，如有疑问请联系中国区客户发展部' )
        return
      }
      // 获取当前时间戳new Date().getTime()
      let modeList1 = []
      if (this.ProductInfo && this.ProductInfo.length > 0) {
        this.ProductInfo.forEach(item => {
          modeList1.push({
            modeName: item.model.name,
            machineSn: '',
            yjCheckStatus: '1',
            yjCheckPicture: item.fileList && item.fileList[0] ? item.fileList[0].name : '',
          })
        })
      }

      let data = {
        type: 23,
        systemFlag: 'XTW',
        requestNo: new Date().getTime(),
        workName: '',
        workLevel: '3',
        applyContent: 1,
        startDate: '',
        deliveryTypeId: '',
        storeCode: this.formData.store,
        storeName: this.formData.storeName,
        customerCode: this.customerInfo.custmerCode,
        customerMdmCode: this.customerInfo.custmerMdmCode,
        customerName: this.customerInfo.custmerName,
        contact: '',
        contactPhone: '',
        userAccount: 'merchant',
        //wepy.$instance.globalData.account
        userName: wepy.$instance.globalData.accountInfo.userName,
        modeList: modeList1,
        serviceCode: 'saveSmWork'
      }
      Toast.loading({
        forbidClick: true,
        duration: 1000,
        message: '加载中...'
      });
      request({
        api: `cts/ctsApi.nd?`,
        data: data,
        method: 'POST',
        callback: (res) => {
          Toast.clear()
          const {data} = res
          if (res.data.code == 200) {
            $Toast.success('提交成功')
            let url = "/pages/goods/prototypeManagement/list/index?tabActive=" + 2
            wx.redirectTo({
              url: url
            })

          } else {
            $Toast.fail('提交失败：' + res.data.msg)
          }
          this.$apply()
        }
      })
    },
    // 撤样提交
    toAddStoreCY: () => {
      let modeList1 = []
      if (this.SampleformData.model && this.SampleformData.model.name.length > 0) {
        this.SampleformData.model.name.forEach(item => {
          modeList1.push({
            modeName: item,
            machineSn: '',
            yjCheckStatus: '1',
            yjCheckPicture: ''
          })
        })
      }
      let data = {
        type: 24,
        systemFlag: 'XTW',
        requestNo: new Date().getTime(),
        workName: '',
        workLevel: '3',
        applyContent: 2,
        startDate: '',
        deliveryTypeId: '',
        storeCode: this.SampleformData.store ,
        storeName: this.SampleformData.storeName,
        customerCode: this.customerInfo.custmerCode,
        customerMdmCode: this.customerInfo.custmerMdmCode,
        customerName: this.customerInfo.custmerName,
        contact: '',
        contactPhone: '',
        userAccount: 'merchant',
        userName: wepy.$instance.globalData.accountInfo.userName,
        modeList: modeList1,
        serviceCode: 'saveSmWork'
      }
      Toast.loading({
        forbidClick: true,
        duration: 1000,
        message: '加载中...',
      });
      request({
        api: `cts/ctsApi.nd?`,
        data: data,
        method: 'POST',
        callback: (res) => {
          Toast.clear()
          const {data} = res
          if (res.data.code == 200) {
            $Toast.success('提交成功')
            let url = "/pages/goods/prototypeManagement/list/index?tabActive=" + 2
            wx.redirectTo({
              url: url
            })
          } else {
            $Toast.fail('提交失败：' + res.data.msg);
          }
          this.$apply()
        }
      })
    },
    checkParam: () => {
      const {store, activityTheme, activityType, startDate, endDate} = this.data.formData
      const salesInfo = this.data.salesInfo
      if (!store) {
        Toast.fail('请选择门店名称')
        return false
      }
      if (!activityTheme) {
        Toast.fail('请填写活动主题')
        return false
      }
      if (!activityType) {
        Toast.fail('请选择活动类型')
        return false
      }
      if (!startDate) {
        Toast.fail('请选择活动开始时间')
        return false
      }
      if (!endDate) {
        Toast.fail('请选择活动结束时间')
        return false
      }

      // 可以没有物料；如果有物料，物料组必填且物料组不能重复，
      if (salesInfo && salesInfo.length > 0) {
        let isMatklEmpty = this.isEmpty(salesInfo)
        if (isMatklEmpty) {
          Toast.fail('物料组必填')
          return false
        }
        let isMatklRepeat = this.isRepeat(salesInfo)
        if (isMatklRepeat) {
          Toast.fail('物料组不能重复')
          return false
        }
      }
      return true
    }
    // 删除图片
    deleteImg: function (event) {
      let index = event.currentTarget.dataset.index
      this.ProductInfo[index].fileList.splice(event.detail.index, 1)
      this.$apply()
    },
    // 上传图片
    afterRead: function (event) {
      this.selImg(event.detail.file.path, event.currentTarget.dataset.key, event.currentTarget.dataset.index);
    },
  };
  // 选择照片
  selImg(path, key, index) {
    if (!path) {
      return
    }
    let that = this
    let obj = {}
    let FSM = wx.getFileSystemManager()
    FSM.readFile({
      filePath: path,
      encoding: 'base64',
      success: function (res) {
        const data = {
          'serviceCode': 'uploadSingleFileByXtw',
          'file': 'data:image/jpeg;base64,' + res.data
        }
        that.methods.upload2Img (data).then(res2 => {
          if(res2.payload && res2.payload.code == 200){
            obj.url = res2.payload.data.url
            obj.name = res2.payload.data.fileName
            that.ProductInfo[index].fileList.push(obj)
            that.$apply()
          } else {
            $Toast.fail('上传失败' + res2.data.msg)
          }
        })
      }
    })
  }


}
