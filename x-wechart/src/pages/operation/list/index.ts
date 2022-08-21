import wepy from 'wepy';
import { connect } from 'wepy-redux';
import {quickDateInterval} from "@/utils/index";

import {
  getShopInfoPrototype,
} from '@/store/actions/dmsorder';
import {
  getShopPotentialCustNum,
  getShopPotentialUser,
  findLabelList,
  commDict,
  getPotentialSpart,
} from '@/store/actions/order';
import sideFilter from "../../components/side-filter/index";
import emptyDataType from "../../../components/empty-data-type/index";
import headerTab from "../../components/header-tab/index";

interface Data {
  drawerTopHeight: string;
  visible: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  filterForm: object;
  scrollTop: number;
  activityList: any[];
  sortOptions: any[];
  typeOptions: any[];
  dateOptions: any[];
  sideFilterForm: any[];
  showRightBtnLine: boolean;
  headerTabList: any[];
  imgObj: object;
  userStatistics: object;
}

@connect({

}, {
  getShopPotentialCustNum, // 顶部商家潜在客户数量
  getShopPotentialUser, // 潜在客户列表
  findLabelList, // 获取意向标签列表
  getShopInfoPrototype, // 获取所属门店
  commDict, // 获取所属门店
  getPotentialSpart, // 获取意向品类
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '用户运营',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-loading': '../../../components/vant/loading/index',
      'calendar': '../../../components/calendar/index',
      'van-field': '../../../components/vant/field/index',
    },
  };
  components = {
    sideFilter,
    emptyDataType,
    headerTab,
  };
  data: Data = {
    drawerTopHeight: '96',
    visible: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        username:'', // 用户姓名
        phoneNum:'', // 用户手机号
        community:'', // 所在小区
        userTag:'', // 用户标签
        store:'', // 所属门店
        follower:'', // 跟进人
        category:'', // 购买/意向品类
        interval:'', // 购买力区间
        userType:'', // 用户类型
        startDate:'', // 活动开始时间
        endDate:'', // 活动结束时间
        dateInterval:'', // 统计日期区间
        sort:'t.sort' // 综合排序 -- 默认跟踪优先级
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        totalPage: 0,
      },
    },
    activityList: [],
    typeOptions: [], // 用户类型筛选列表
    sortOptions: [
      {id: 't.sort', value: '跟踪优先级'},
      {id: 't.id desc', value: '录入时间倒序'},
    ], // 综合排序筛选列表
    dateOptions: [
      {id: '', value: '全部时间'},
      {id: 'lastWeek', value: '最近一周'},
      {id: 'lastMonth', value: '最近一个月'},
      {id: 'lastThreeMonths', value: '最近三个月'},
      {id: 'lastHalfYear', value: '最近半年'},
    ], // 统计日期筛选
    sideFilterForm: [
      {
        key: 'username', // 为了方便赋值
        label: '用户姓名',
        value: '',
        placeholder: '请输入用户姓名',
        type: 'field'
      },
      {
        key: 'phoneNum',
        label: '用户手机号',
        value: '',
        placeholder: '请输入用户手机号',
        type: 'field'
      },
      {
        key: 'community',
        label: '所在小区',
        value: '',
        placeholder: '请输入所在小区',
        type: 'field'
      },
      {
        key: 'userTag',
        label: '用户标签',
        value: '',
        name: '',
        placeholder: '请选择用户标签',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'store',
        label: '所属门店',
        value: '',
        name: '',
        placeholder: '请选择所属门店',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'follower',
        label: '跟进人',
        value: '',
        placeholder: '请输入跟进人',
        type: 'field'
      },
      {
        key: 'category',
        label: '购买/意向品类',
        value: '',
        name: '',
        placeholder: '请选择购买/意向品类',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'interval',
        label: '购买力区间',
        value: '',
        name: '',
        placeholder: '请选择购买力区间',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'userType',
        label: '用户类型',
        value: '',
        name: '',
        placeholder: '请选择用户类型',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'activityTime',
        label: '录入时间',
        startDate: '',
        endDate: '',
        placeholderStart: '请选择开始时间',
        placeholderEnd: '请选择结束时间',
        type: 'date',
      },
      {
        key: 'dateInterval',
        label: '快速筛选日期区间',
        value: '',
        name: '',
        type: 'quickDate',
      },
    ],
    showRightBtnLine: false,
    headerTabList: [
      { name: '跟踪优先级', type: 'status', selectValue: '' },
      { name: '用户类型', type: 'type', selectValue: '' },
    ], // 顶部搜索切换按钮列表
    imgObj: {
      'opeBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719489_9dc7d354266c43418f0a4e6b2dcb65e7.png', // 用户运营-列表统计背景.png
      'girl': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_7a0b141e99a7428f926d6ab72dd9a6be.png', // 用户运营-女@2x.png
      'boy': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_cb1353c22eea4c82b55614da60c6e5cf.png', // 用户运营-男@2x.png
      'v1': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_5d96d88d4e7546c5bfcb264619138a6f.png', // 用户运营-VI@2x.png
      'v2': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719546_480a61ece00549dbabd496ba420774c4.png', // 用户运营-v2@2x.png
      'v3': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_03c839f9027748129c5bb8e6d4b00fd1.png', // 用户运营-v3@2x.png
      'v4': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_c56053fcc0cd4b7aa8eb2c887cbdd916.png', // 用户运营-v4@2x.png
      'v5': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719550_673d9f0af4b54c0db7198cc3e64da0b0.png', // 用户运营-v5@2x.png
      'texting': 'http://3s-static.hisense.com/wechat/1/14722429883/1657096257276_309df05e81b8495995b501ffbc38d6cd.png', // 用户运营-发短信@2x.png
      'callUp': 'http://3s-static.hisense.com/wechat/1/14722429883/1657096257246_ab632670c45342f193f6f67eee4f823a.png', // 用户运营-打电话@2x.png
    },
    userStatistics: {
      conversionNum: 0, // 意向转化
      potentialUserNum: 0, // 潜在客户
      transactionUserNum: 0, // 成交用户
      userNum: 0 // 用户数量
    }
  };
  watch = {
    filterForm: function (newVal, oldVal){
      if(newVal.terms.dateInterval !== oldVal.terms.dateInterval){
        this.getShopPotentialCustNumInfo()
      }
    }
  };
  // 页面内交互写在methods里
  methods = {
    // 跳转到详情
    viewDetail: (e: any) => {
      const { dataset: { item } } = e.currentTarget
      let url = `/pages/operation/detail/index?id=${item.id}`
      wx.navigateTo({
        url: url
      })
    },
    // 新增意向用户
    goAddIntendedUsers(){
      wx.navigateTo({
        url: `/pages/operation/intended-users-order/index`
      })
    },
    openDatePop(){
      this.OrderSFilterVisible = true
      this.CurrentOrderSFilterName = 'date'
    },

    // 切换顶部快捷筛选
    touchOrderSFilter: (tabItem) => {
      let name = ''
      if(tabItem){
        name = tabItem.type
      }
      if (!this.OrderSFilterVisible) {
        this.OrderSFilterVisible = true
        this.CurrentOrderSFilterName = name
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
      if (['type', 'status'].indexOf(name) > -1) {
        this.CurrentOrderSFilterName = name
        return
      }
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 顶部状态快捷筛选
    onSelectStatus(e) {
      const {dataset: { name, id, value }} = e.currentTarget
      this.filterForm.terms[name] = id
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      if(name === 'sort'){
        this.headerTabList[0].name = value
      }
      if(name === 'userType'){ // 用户类型-》同侧边筛选条件联动
        this.headerTabList[1].name = value || '用户类型'
        this.sideFilterForm = this.sideFilterForm.map((item)=>{
          if(item.key === 'userType'){
            item.value = id
            item.name = value
          }
          return item
        })
      }
      if(name === 'dateInterval'){ // 快速筛选时间-》同侧边筛选条件联动
        this.sideFilterForm = this.sideFilterForm.map((item)=>{
          if(item.key === 'dateInterval'){
            item.value = id
            item.name = value
          }
          return item
        })
      }
      this.myGetOrderList()
      this.methods.touchOrderSFilter()
      this.methods.scrollToTop()
      this.$apply()
    },

    // 点击普通筛选按钮-显示或隐藏左侧筛选框
    orderfiltering: () => {
      this.visible = !this.visible
      this.OrderSFilterVisible = false
      this.CurrentOrderSFilterName = ''
    },

    // 回到顶部
    scrollToTop: () => {
      this.scrollTop = 0
    },

    // 滚动列表
    onScroll: (event: Weapp.Event) => {
      if (this.scrollTop === 0) {
        this.scrollTop = event.detail.scrollTop
      }
    },

    // 列表分页
    onGetOrderListNext() {
      const totalPage = this.filterForm.page.totalPage
      if (totalPage > this.filterForm.page.pageNo) {
        this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
        this.myGetOrderList()
      }
    },

    // 侧边筛选确定
    handleConfirm(e){
      let filterForm = e.sideFilterForm
      if(filterForm){
        filterForm.forEach((item)=>{
          if(item.key === 'activityTime'){
            this.filterForm.terms.startDate = item.startDate
            this.filterForm.terms.endDate = item.endDate
          }else{
            this.filterForm.terms[item.key] = item.value
            if(item.key === 'userTag'){
              this.filterForm.terms[item.key] = item.name
            }
            if(item.key === 'userType'){
              this.headerTabList[1].name = item.value ? item.name : '用户类型'
            }
          }
        })
      }

      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
    },

    // 打电话
    call(event) {
      const { item } = event.currentTarget.dataset
      if(item && item.phone){
        wx.makePhoneCall({
          phoneNumber: item.phone
        })
      }
    }
  };

  // 获取筛选列表并给对应值赋值
  optionsConversion(list, key){
    if(list){
      list = list.map((item)=>{
        return {
          ...item,
          id: item.code,
          value: item.name
        }
      })
      this.sideFilterForm = this.sideFilterForm.map((item)=>{
        if(item.key === key){
          item.options = list
          if(key === 'userType'){
            this.typeOptions = list
          }
        }
        return item
      })
    }
    this.$apply()
  }

  // 获取筛选列表
  filterInfo(){
    const { customer }=JSON.parse(wx.getStorageSync('b2b_token'))

    // 获取标签列表
    this.methods.findLabelList({
      custInfoId: customer && customer.id // 	商家id
    }).then((res)=>{
      let { data } = res.payload
      data = data.map((item)=>{
        return {
          ...item,
          code: item.id,
          name: item.label
        }
      })
      this.optionsConversion(data,'userTag')
      this.$apply()
    })

    // 获取所属门店
    this.methods.getShopInfoPrototype().then((res)=>{
      const { list } = res.payload
      this.optionsConversion(list,'store')
      this.$apply()
    })

    // 获取意向品类选择列表
    this.methods.getPotentialSpart().then((res)=>{
      const { list } = res.payload
      this.optionsConversion(list,'category')
      this.$apply()
    })

    // 获取购买预算选择列表
    this.methods.commDict({
      pid: '14927471376'
    }).then((res)=>{
      const { list } = res.payload
      this.optionsConversion(list,'interval')
      this.$apply()
    })

    // 获取用户类型
    this.methods.commDict({
      pid: '14927471377'
    }).then((res)=>{
      const { list } = res.payload
      this.optionsConversion(list,'userType')
      this.$apply()
    })
  }

  // 顶部商家潜在客户数量
  getShopPotentialCustNumInfo(){
    let { terms } = this.filterForm
    let date = ''
    if(terms.dateInterval){
      let interval = quickDateInterval(terms.dateInterval)
      let startDate = interval.start
      let endDate = interval.end
      date = startDate + '_' + endDate
    }
    this.methods.getShopPotentialCustNum({
      inCreatedDate: date, // 录入时间  格式 2011-11-11_2011-12-12
    }).then((res)=>{
      const { list, code } = res.payload
      if(code == 0){
        this.userStatistics = list[0]
      }
      this.$apply()
    })
  }
  myGetOrderList() {
    let { terms, page } = this.filterForm

    let date = ''
    if(terms.dateInterval){
      let interval = quickDateInterval(terms.dateInterval)
      let startDate = interval.start
      let endDate = interval.end
      date = startDate + '_' + endDate
    }else{
      if(terms.startDate && terms.endDate){
        date = terms.startDate + '_' + terms.endDate
      }else if(terms.startDate && !terms.endDate){
        date = terms.startDate + '_'
      }else if(!terms.startDate && terms.endDate){
        date = '_' + terms.endDate
      }
    }

    let data = {
      orderBy: terms.sort, // 综合排序
      userName: terms.username, // 用户姓名
      phone: terms.phoneNum, // 手机号
      community: terms.community, // 小区
      label: terms.userTag, // 标签
      shopInfoId: terms.store, // 所属门店
      followPeople: terms.follower, // 跟进人
      spartId: terms.category, // 意向品类
      buyPowerId: terms.interval, // 购买力区间
      userTypeId: terms.userType, // 用户类型
      inCreatedDate: date, // 录入时间  格式 2011-11-11_2011-12-12
      pageNo: page.pageNo,
      pageSize: page.pageSize,
    }
    this.methods.getShopPotentialUser({ _loading: true, ...data }).then((res)=>{
      const { code, list, totalPages, currentPage } = res.payload
      if(code == 0){
        this.filterForm.page.totalPage = totalPages
        let activityList = list || []
        activityList = activityList.map((item)=>{
          if(item.phone){
            let reg=/(\d{3})\d{4}(\d{4})/;
            item.phoneZH = item.phone.replace(reg, "$1****$2")
          }
          return item
        })
        if ( currentPage > 1 ) {
          this.activityList = this.activityList.concat(activityList)
        } else {
          this.activityList = activityList
        }
      }
      this.$apply()
    })
  }
  onShow() {
    this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
    this.myGetOrderList()
  }
  onLoad() {
    this.getShopPotentialCustNumInfo()
    this.filterInfo()
  }

}
