import wepy from 'wepy';
import { connect } from 'wepy-redux';
import {
  getAgentActivityList,
  getSpecialShopDictBytype,
  getMarketCenter,
  getCheckStatus,
  deleteActivityById,
  saveAgree,
  terminalActivityById,
} from '@/store/actions/activityare'
import {
  uploadImg,
} from '@/store/actions/record'
import sideFilter from "../../../components/side-filter/index";
import headerFilter from "../../../components/header-filter/index";
import emptyDataType from "../../../../components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";
import utilsWxs from '../../../../wxs/utils.wxs';
import Toast from "@/components/vant/toast/toast";
import { formatDate } from '@/utils/index'

interface Data {
  showSearch: boolean;
  tabList: any[];
  tabActive: any;
  activeLineStyle: object;
  drawerTopHeight: string;
  visible: boolean;
  OrderSFilterVisible: boolean;
  CurrentOrderSFilterName: string;
  filterForm: object;
  scrollTop: number;
  activityList: any[];
  statusOptions: any[];
  sideFilterForm: any[];
  certificateShow: boolean;
  selectActivityItem: any;
  formData: object;
  headerTabList: any[];
  currentDate: string
}

@connect({

}, {
  uploadImg,
  getAgentActivityList,
  getSpecialShopDictBytype,
  getMarketCenter,
  getCheckStatus,
  deleteActivityById,
  saveAgree,
  terminalActivityById,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '市场活动',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-dialog': '../../../../components/vant/dialog/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-loading': '../../../../components/vant/loading/index',
      'calendar': '../../../../components/calendar/index',
      "van-datetime-picker": "../../../../components/vant/datetime-picker/index",
      'van-field': '../../../../components/vant/field/index',
      'van-uploader': '../../../../components/vant/uploader/index',
    },
  };
  components = {
    sideFilter,
    headerFilter,
    emptyDataType,
    headerTab,
  };
  wxs = {
    utils: utilsWxs,
  };
  data: Data = {
    showSearch: false,
    tabList: [
      {name: '代理商市场活动'},
      {name: '专卖店市场活动'},
    ],
    tabActive: '0',
    activeLineStyle: {
      width: '56rpx',
      height: '4rpx'
    },
    drawerTopHeight: '154',
    visible: false,
    OrderSFilterVisible: false,
    CurrentOrderSFilterName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        status:'', // 状态
        marketCenter:'', // 营销中心
        office:'', // 办事处
        agent:'', // 活动承接代理商
        timeStart:'', // 活动开始时间
        theme:'', // 活动主题
        place:'', // 活动地点
        distributor:'', // 参与分销商
        adCompany:'', // 待制作广告公司
        checkStatus:'', // 审批状态
        creator:'', // 提报人
        activityCode:'', // 活动编码
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        totalPage: 0,
      },
    },
    activityList: [],
    statusOptions: [
      { id: '申请中', value: '申请中'},
      { id: '已申请', value: '已申请'},
      { id: '核销中', value: '核销中'},
      { id: '已核销', value: '已核销'},
      { id: '作废', value: '作废'},
    ], // 活动状态筛选列表
    sideFilterForm: [
      {
        key: 'marketCenter',
        label: '营销中心',
        value: '',
        name: '',
        placeholder: '请选择营销中心',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'office',
        label: '办事处',
        value: '',
        placeholder: '请输入办事处',
        type: 'field'
      },
      {
        key: 'agent',
        label: '活动承接代理商',
        value: '',
        placeholder: '请输入活动承接代理商',
        type: 'field'
      },
      {
        key: 'timeStart',
        label: '活动开始时间',
        value: '',
        placeholder: '请选择活动开始时间',
        type: 'yearMonth'
      },
      {
        key: 'theme',
        label: '活动主题',
        value: '',
        placeholder: '请输入活动主题',
        type: 'field'
      },
      {
        key: 'place',
        label: '活动地点',
        value: '',
        placeholder: '请输入活动地点',
        type: 'field'
      },
      {
        key: 'distributor',
        label: '参与分销商',
        value: '',
        placeholder: '请输入参与分销商',
        type: 'field'
      },
      {
        key: 'adCompany',
        label: '待制作广告公司',
        value: '',
        placeholder: '请输入待制作广告公司',
        type: 'field'
      },
      {
        key: 'checkStatus',
        label: '审批状态',
        value: '',
        name: '',
        placeholder: '请选择审批状态',
        type: 'select',
        multiple: false,
        options: [],
      },
      {
        key: 'creator',
        label: '提报人',
        value: '',
        placeholder: '请输入提报人',
        type: 'field'
      },
      {
        key: 'activityCode',
        label: '活动编码',
        value: '',
        placeholder: '请输入活动编码',
        type: 'field'
      },
    ],
    certificateShow: false, // 是否显示结算凭证弹框
    selectActivityItem: {}, // 弹出结算凭证的活动列表项
    formData: {
      experienceSharing: []
    }, // 结算凭证图片集合
    headerTabList: [
      { name: '状态', type: 'status', selectValue: '' },
    ], // 顶部搜索切换按钮列表
    currentDate: '', // 当前日期
  };

  // 页面内交互写在methods里
  methods = {
    // 跳转至专卖店市场活动列表
    tabChange(){
      let url = `/pages/activity/specialty-activity/list/index`
      wx.redirectTo({
        url: url
      })
    },

    // 跳转到新增、编辑、详情
    viewDetail: (e: any) => {
      const { dataset: { type, id } } = e.currentTarget
      let url = ''
      if(type === 'detail'){ // 详情
        url = `/pages/activity/agency-activity/detail/index?id=${id}&type=${type}`
      }else if(type === 'off'){ // 核销
        url = `/pages/activity/agency-activity/off/index?id=${id}&type=${type}`
      }else{ // 编辑、新增
        url = `/pages/activity/agency-activity/add/index?id=${id}&type=${type}`
      }
      wx.navigateTo({
        url: url
      })
    },

    // 弹出凭证弹框
    uploadCertificate: (e: any) => {
      const { dataset: { item } } = e.currentTarget
      this.selectActivityItem = item
      this.certificateShow = true
      this.$apply()
    },

    // 确定上传结算凭证
    onCertificateConfirm() {
      const { activityInstId, id, processInstId } = this.data.selectActivityItem
      const { experienceSharing } = this.data.formData

      let voucherAttachs = []
      if(experienceSharing && experienceSharing.length > 0){
        voucherAttachs = experienceSharing.map((item)=>{
          return { id: item.id }
        })
      }

      let param = {
        activityInstId: activityInstId,
        id: id,
        processInstId: processInstId,
        voucherAttachs: voucherAttachs,
      }
      this.methods.saveAgree(param).then((res)=>{
        const { code, msg } = res.payload
        if(code == '0'){
          Toast.success({
            forbidClick: true,
            duration: 1000,
            message: msg || '上传成功',
            onClose: () => {
              this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
              this.myGetOrderList()
            },
          });
        }else {
          Toast.fail(msg)
        }
        this.formData.experienceSharing = []
      })
    },

    // 只要关闭凭证弹框都会触发
    onCertificateClose() {
      this.certificateShow = false
      this.$apply()
    },

    // 取消上产凭证
    onCertificateCancel(){
      this.formData.experienceSharing = []
    },

    // 活动作废
    viewVoid: (e: any) => {
      const { dataset: { item } } = e.currentTarget
      if(item.status !== '申请中' && item.status !== '核销中'){
        Toast.fail('只有申请中和核销中的活动才可以作废，请检查活动状态。')
        return false
      }
      let that = this
      wx.showModal({
        title: '提示',
        content: '您的操作将会作废该活动并且只能重新发起活动申请，请问您确认吗？点击确认按钮则继续后台操作。',
        success: async function (res) {
          if (res.confirm) {
            let param = {
              id: item.id,
            }
            that.methods.terminalActivityById(param).then((res1)=>{
              const { code } = res1.payload
              if(code == '0'){
                Toast.success({
                  forbidClick: true,
                  duration: 1000,
                  message: '已作废',
                  onClose: () => {
                    that.filterForm.page = { ...that.filterForm.page, pageNo: 1 }
                    that.myGetOrderList()
                  },
                });
              }
            })
          }
        },
      })
    },

    // 活动删除
    viewDelete: (e: any) => {
      const { dataset: { id } } = e.currentTarget
      let that = this
      wx.showModal({
        title: '提示',
        content: '确定删除',
        success: async function (res) {
          if (res.confirm) {
            let param = {
              id: id,
            }
            that.methods.deleteActivityById(param).then((res1)=>{
              const { code } = res1.payload
              if(code == '0'){
                Toast.success({
                  forbidClick: true,
                  duration: 1000,
                  message: '删除成功',
                  onClose: () => {
                    that.filterForm.page = { ...that.filterForm.page, pageNo: 1 }
                    that.myGetOrderList()
                  },
                });
              }
            })
          }
        },
      })
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
      const {dataset: { name, id }} = e.currentTarget
      this.filterForm.terms[name] = id
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList[0].selectValue = id
      this.myGetOrderList()
      this.methods.touchOrderSFilter()
      this.methods.scrollToTop()
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

    // 筛选确定
    handleConfirm(e){
      let filterForm = e.sideFilterForm
      if(filterForm){
        filterForm.forEach((item)=>{
          if(item.key === 'activityTime'){
            this.filterForm.terms.startDate = item.startDate
            this.filterForm.terms.endDate = item.endDate
          }else{
            this.filterForm.terms[item.key] = item.value
          }
        })
      }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
    },

    // 删除图片
    deleteImg(event){
      let { key } = event.currentTarget.dataset
      let { index } = event.detail
      this.formData[key].splice(index, 1)
      this.$apply()
    },

    //上传图片
    afterRead(event) {
      this.selImg(event.detail.file.path, event.currentTarget.dataset.key)
    },

  };

  //选择照片
  selImg(path, key) {
    if(!path){
      return
    }
    let that = this
    let fileNameArr = path.split('/')
    let fileName = fileNameArr[fileNameArr.length-1]
    let obj = {}
    let FSM = wx.getFileSystemManager()
    FSM.readFile({
      filePath: path,
      encoding: 'base64',
      success: function(res) {
        const data = {
          'fileName': fileName,
          'fileType': 'custApply',
          'file': 'image/jpeg;base64,' + res.data
        }
        that.methods.uploadImg(data).then(res2 => {
          obj.url = res2.payload.url
          obj.id = res2.payload.businessId
          obj.name = res2.payload.fileNameString
          that.formData[key].push(obj)
          that.$apply()
        })
      }
    })
  }

  // 获取筛选列表接口
  getDictBytype(type){
    let param = {
      categoryName: type
    }
     return this.methods.getSpecialShopDictBytype(param).then((res)=>{
      let categoryList = []
      if(res.payload && res.payload.data){
        categoryList = res.payload.data.map((item)=>{
          return {
            ...item,
            id: item.code,
            value: item.name
          }
        })
      }
      return categoryList
    })
  }
  // 代理商活动筛选条件-营销中心列表
  getMarketCenterData(){
    this.methods.getMarketCenter().then((res)=>{
      let { data } = res.payload
      data = data.map((item)=>{
        return {
          ...item,
          value: item.name
        }
      })
      this.sideFilterForm = this.sideFilterForm.map((item)=>{
        if(item.key === 'marketCenter'){
          item.options = data
        }
        return item
      })
      this.$apply()
    })
  }

  // 代理商活动筛选条件-审批状态列表
  getCheckStatusData(){
    this.methods.getCheckStatus().then((res)=>{
      let { data } = res.payload
      data = data.map((item)=>{
        return {
          id: item,
          value: item,
        }
      })
      this.sideFilterForm = this.sideFilterForm.map((item)=>{
        if(item.key === 'checkStatus'){
          item.options = data
        }
        return item
      })
      this.$apply()
    })
  }

  myGetOrderList() {
    let { terms, page } = this.filterForm
    let data = {
      marketCenter: terms.marketCenter, // 营销中心编码
      office: terms.office, // 办事处名称
      agent: terms.agent, // 代理商名称
      distributor: terms.distributor, // 分销商名称
      timeStart: terms.timeStart, // 活动时间开始
      timeEnd: '', // 活动时间结束，暂无
      theme: terms.theme, // 活动主题
      place: terms.place, // 活动地点
      adCompany: terms.adCompany, // 待制作广告公司
      checkStatus: terms.checkStatus, // 审批状态
      creator: terms.creator, // 提报人
      status: terms.status, // 状态
      activityCode: terms.activityCode, // 活动编码
      pageNo: page.pageNo,
      pageSize: page.pageSize,
    }
    Toast.loading({
      message: '正在加载',
      duration: 2000
    });
    this.methods.getAgentActivityList({ ...data }).then((res)=>{
      Toast.clear()
      let data = res.payload.data
      this.filterForm.page = { ...this.filterForm.page, totalPage: data.totalPage }
      let activityList = data.content || []
      if ( data.page > 1 ) {
        this.activityList = this.activityList.concat(activityList)
      } else {
        this.activityList = activityList
      }
      this.$apply()
    })
  }
  onShow() {
    this.currentDate = formatDate(new Date().getTime(), 'Y-M-D')
    this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
    this.myGetOrderList()
  }
  onLoad() {
    this.getMarketCenterData()
    this.getCheckStatusData()
  }

}
