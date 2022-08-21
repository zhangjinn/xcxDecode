import wepy from 'wepy';
import {connect, getStore} from 'wepy-redux';
import filter from "./../../../components/header-filter/index";
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import sideFilter from "../../../components/side-filter/index";
import {getShopInfoPrototype, getSMterialInfoPrototype} from '@/store/actions/dmsorder';
import {dmsRequest} from "@/store/actions/dmsrequest";
import Toast from "@/components/vant/toast/toast";
import {request} from "@/utils/requestJSON";
import $Toast from "@/components/vant/toast/toast";
import {getfindTaojiInventoryTotal} from "@/store/actions/inventory";
interface Data {
  scrollTop: any;
  tabList: any[];
  tabActive: any;
  filterForm: object;
  showSearch: boolean,
  visible: boolean,
  OrderSFilterVisible: boolean,
  statusOptions: any[],
  shopOptions: any[],
  materialOptions: any[],
  headerTabList: any[],
  CurrentOrderSFilterName: string,
  sideFilterForm: any[];
  activityList: any[];
  page:object
}

@connect({
  materialOptions({dmsorder}) {
    return dmsorder.materialGroupList
  },
}, {
  getShopInfoPrototype,
  getSMterialInfoPrototype,
  getfindTaojiInventoryTotal
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '样机管理',
    usingComponents: {
      'van-toast': '../../../../components/vant/toast/index',
      'van-loading': '../../../../components/vant/loading/index',
      'van-search': '../../../../components/vant/search/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-icon': '../../../../components/vant/icon/index',
      'calendar': '../../../../components/calendar/index',
      'van-field': '../../../../components/vant/field/index',
    },
  };
  components = {
    filter,
    emptyDataType,
    headerTab,
    sideFilter
  };

  data: Data = {
    activityList: [], // 列表数据
    showSearch: false,
    scrollTop: -1,
    tabList: [
      {
        name: '上样'
      },
      {
        name: '撤样'
      },
      {
        name: '我的样机'
      }
    ],
    tabActive: '0',
    filterForm: {
      storeCode: '',
      storeName: '', // 门店
      matklCode: '', // 物料组
      orderStatus: 'YWC'// 通知单状态
    },
    page: {
      pageNum: 1,
      pageSize: 10,
      totalPage: 0,
    },
    sideFilterForm: [
      {
        key: 'matklCode',
        label: '物料组',
        value: '',
        name: '',
        placeholder: '请选择物料组',
        type: 'select',
        multiple: false,
        options: []
      },
      {
        key: 'modeName',
        label: '型号',
        placeholder: '请输入型号',
        value: '',
        type: 'field'
      },

      {
        key: 'storeName',
        label: '门店',
        value: '',
        name: '',
        placeholder: '请选择门店',
        type: 'select',
        multiple: false,
        options: []
      },

      {
        key: 'orderStatus',
        label: '状态',
        value: 'YWC',
        name: '已上样',
        placeholder: '请选择流程状态',
        type: 'select',
        multiple: false,
        options: [
          {
            id: 'YWC',
            value: '已上样'
          },
          {
            id: 'SHZ',
            value: '上样中'
          },
          {
            id: 'YBH',
            value: '已驳回'
          },
          {
            id: 'TJSB',
            value: '上样失败'
          }
        ]
      },
      {
        key: 'isEnjoyPolicy',
        label: '是否享受补贴',
        value: '',
        name: '',
        placeholder: '请选择是否享受补贴',
        type: 'select',
        multiple: false,
        options: [
          {
            id: 'T',
            value: '是'
          },
          {
            id: 'F',
            value: '否'
          }
        ]
      }
    ],
    visible: false,
    OrderSFilterVisible: false,
    headerTabList: [
      {name: '门店', type: 'shop', selectValue: ''},
      {name: '物料组', type: 'material', selectValue: ''},
      {name: '状态', type: 'status', selectValue: 'YWC'}
    ],
    // 活动状态筛选列表
    statusOptions: [
      {
        id: 'YWC',
        value: '已上样'
      },
      {
        id: 'SHZ',
        value: '上样中'
      },
      {
        id: 'YBH',
        value: '已驳回'
      },
      {
        id: 'TJSB',
        value: '上样失败'
      }
    ],
    shopOptions: [],
    materialOptions: [],
    CurrentOrderSFilterName: ''
  };

  onLoad(e) {
    if (e) {
      this.tabActive = e.tabActive
    }
    //查询列表
    this.methods.myGetOrderList()
    this.methods.getSMterialInfoPrototype('')
    this.methods.getShopList()
  };

  // ;面内交互写在methods里
  methods = {
    // 获取门店你
    getShopList: () => {
      let data = {
        orgId: '',
        matklId: '',
        searchStr: ''
      }
      request({
        api: 'comm/querySalesShopInfoList.nd',
        method: 'POST',
        data: data,
        callback: (res: any) => {
          const {list} = res.data
          if (res.data.code == 0) {
            this.shopOptions = []
            list.forEach(value => {
              this.shopOptions.push({
                name: value.name,
                code: value.code
              })
            })
            this.$apply()
          } else {
            this.shopOptions = []
          }
        }
      })
      // this.methods.getShopInfoPrototype(data).then(res=>{
      //   this.shopOptions2 = res.payload.list
      //   this.$apply()
      // })
    },
    // 列表分页
    onGetOrderListNext() {
      if (this.page.totalPage > (this.page.pageNum * this.page.pageSize)) {
        this.page = { ...this.page, pageNum: this.page.pageNum + 1 }
        this.methods.myGetOrderList()
      }
    },
    // 查询列表
    myGetOrderList: () => {
      let data = {
        customerMdmCode: wepy.$instance.globalData.customerCode,
        ...this.filterForm,
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        serviceCode: 'listMyWork'
      }
      Toast.loading({forbidClick: true, message: '加载中...', duration: 0});
      request({
        api: `cts/ctsApi.nd?`,
        data: data,
        method: 'POST',
        callback: (res) => {
          Toast.clear()
          const {data} = res
          if (data.code == 200 && data.data && data.data.length > 0) {
            this.page = { ...this.page, totalPage: data.totalSize }
            let activityList = data.data || []
            if (data.pageNum > 1 ) {
              this.activityList = this.activityList.concat(activityList)
            } else {
              this.activityList = activityList
            }
            // 循环列表
            this.activityList.forEach(item => {
              if (item.storeOrderStatus == 'YWC') {
                item.storeOrderStatusName = '已上样'
              }
              if (item.storeOrderStatus == 'YWC' && item.isYjDown == 'T') {
                item.storeOrderStatusName = '撤样中'
              }
              if (item.storeOrderStatus == 'SHZ') {
                item.storeOrderStatusName = '上样中'
              }
              if (item.storeOrderStatus == 'YBH') {
                item.storeOrderStatusName = '已驳回'
              }
              if (item.storeOrderStatus == 'TJSB') {
                item.storeOrderStatusName = '上样失败'
              }

              // 循环查库存 给样机库存赋值
              let param = {
                _loading: true,
                cisCode: wepy.$instance.globalData.cisCode,
                terms: {
                  isFuzzy: false,
                  zzprdmodel: item.modeName,
                  model: item.modeName,
                  colour: '',
                  warehouseId: '', // 仓库编码
                  invStatusId: '', // 质量等级
                  isLock: '',
                  qualitylv: '样机(已审核)',
                  dealerMaterialGroupFlag: '',
                  materialGroupCode: item.baseMatklCode,
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
              this.methods.getfindTaojiInventoryTotal(param).then(res => {
                let {data} = res.payload
                item.totalActQty = data && data.totalActQty ? data.totalActQty : '0'
                this.$apply()
              })
              //  循环查门店是否是专卖店
              this.methods.getShopInfoPrototype({orgId: '', matklId: '', searchStr: item.storeName}).then(res2 => {
                if (res2.payload.code == 0) {
                  item.isExclusiveShop = (res2.payload && res2.payload.list) ? res2.payload.list[0].isExclusiveShop : ''
                } else {
                  item.isExclusiveShop = ''
                }
              })
            })
          } else if (data.code == -200) {
            this.activityList = []
            $Toast.fail(data.msg)
          } else {
            this.activityList = []
          }
          this.$apply()
        }
      })
    },
    // 侧边筛选列表可搜索，并重新赋值
    onSideSearch(searchObj) {
    },
    // 选择筛选时触发事件
    handleFormDataChange(e) {
      const {currIndex, sideFilterForm} = e
      this.sideFilterForm = sideFilterForm
      // 循环遍历 给顶部筛选条件也赋值 和侧边保持一致
      this.sideFilterForm.forEach(item => {
        if (item.key == 'storeName') {
          this.filterForm.storeCode = item.value
          this.filterForm.storeName = item.name
          this.headerTabList[0].selectValue =  item.name
        }
        if (item.key == 'matklCode') {
          this.filterForm.matklCode = item.value
          this.headerTabList[1].selectValue =  item.value
        }
        if (item.key == 'orderStatus') {
          this.filterForm.orderStatus = item.value
          this.headerTabList[2].selectValue =  item.value
        }
      })
      this.$apply()
    },

    // 侧边筛选确定
    handleConfirm(e) {
      let filterForm = e.sideFilterForm
      if (filterForm) {
        filterForm.forEach((item) => {
          // 侧边栏筛选确定 除了门店要赋值的是name 其余的都是id
          if (item.key == 'storeName') {
            this.filterForm[item.key] = item.name
            this.headerTabList[0].selectValue =  item.name
            if (item.name == '全部') {
              this.filterForm[item.key] = ''
              this.headerTabList[0].selectValue =  ''
            }
          } else {
            this.filterForm[item.key] = item.value
          }
          if (item.key == 'matklCode') {
            this.filterForm.matklCode = item.value
            this.headerTabList[1].selectValue =  item.value
          }
          if (item.key == 'orderStatus') {
            this.filterForm.orderStatus = item.value
            this.headerTabList[2].selectValue =  item.value
          }
        })
      }
      this.page.pageNum = 1
      this.methods.myGetOrderList()
      this.visible = !this.visible
    },
    // 回到顶部
    scrollToTop: () => {
      this.scrollTop = 0
    },
    // tab切换
    tabChange(param) {
      this.tabActive = param.tabActive
      if (this.tabActive !== 2) {
        // let url = `/pages/goods/prototypeManagement/list/index`
        let url = "/pages/goods/prototypeManagement/loadingWithdrawal/index?tabActive=" + this.tabActive
        wx.redirectTo({
          url: url
        })
      }
    },

    // 切换顶部快捷筛选
    touchOrderSFilter: (tabItem) => {
      let name = ''
      if (tabItem) {
        name = tabItem.type
      }
      if (!this.OrderSFilterVisible) {
        this.OrderSFilterVisible = true
        this.CurrentOrderSFilterName = name
        this.$apply()
        return
      }
      if (!name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if (this.CurrentOrderSFilterName === name) {
        this.OrderSFilterVisible = false
        this.CurrentOrderSFilterName = ''
        return
      }
      if (['shop', 'status'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 顶部门店快捷筛选
    onSelectType(storeCode, storeName) {
      this.filterForm = {...this.filterForm, storeCode}
      this.filterForm = {...this.filterForm, storeName}
      this.headerTabList[0].selectValue = storeCode
      // 联动侧边栏的筛选
      this.sideFilterForm.forEach(item => {
        if (item.key == 'storeName') {
          item.value = storeCode
          item.name = storeName
        }
      })
      this.page.pageNum = 1
      this.methods.touchOrderSFilter()
      this.methods.myGetOrderList()
      this.methods.scrollToTop()
    },
    // 顶部物料组筛选
    onSelectMaterial(matklCode, matklName) {
      this.filterForm = {...this.filterForm, matklCode}
      this.headerTabList[1].selectValue = matklCode
      // 给侧边栏物料组筛选赋值
      this.sideFilterForm.forEach(item => {
        if (item.key == 'matklCode') {
          item.value = matklCode
          item.name = matklName
        }
      })
      this.page.pageNum = 1
      this.methods.touchOrderSFilter()
      this.methods.scrollToTop()
      this.methods.myGetOrderList()
    },

    // 顶部状态快捷筛选
    onSelectStatus(orderStatus, orderStatusName) {
      this.filterForm = {...this.filterForm, orderStatus}
      this.headerTabList[2].selectValue = orderStatus
      this.sideFilterForm.forEach(item => {
        // orderStatus
        if (item.key == 'orderStatus') {
          item.value = orderStatus
          item.name = orderStatusName
        }
      })
      this.page.pageNum = 1
      this.methods.touchOrderSFilter()
      this.methods.scrollToTop()
      this.methods.myGetOrderList()
    },
    // 点击普通筛选按钮-显示或隐藏左侧筛选框
    orderfiltering: () => {
      this.visible = !this.visible
      this.sideFilterForm.forEach(item => {
        if (item.key == 'storeName') {
          this.shopOptions.forEach(value => {
            item.options.push({
              value: value.name,
              id: value.code
            })
          })
        }
        if (item.key == 'matklCode') {
          this.materialOptions.forEach(value => {
            item.options.push({
              value: value.name,
              id: value.code
            })
          })
          this.$apply()
        }
      })
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },
    // 滚动列表
    onScroll: (event: Weapp.Event) => {
      if (this.scrollTop === 0) {
        this.scrollTop = event.detail.scrollTop
      }
    }
  };

  onShow() {
  }
}
