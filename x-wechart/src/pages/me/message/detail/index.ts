import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux'
import { getNoticeList, getMessageList } from '@/store/actions/notice'
import { RESET_MESSAGE_LIST } from '@/store/types/notice';
import { request } from '@/utils/request';
import emptyDataType from "@/components/empty-data-type/index";
interface Data {
  filterForm: object;
  isCanJump: boolean;
}

@connect({
  list({ notice }) {
    return notice.list
  },
  messageList({ notice }) {
    return notice.messageList
  },
  totalPages({ notice }) {
    return notice.totalPages
  }
}, {
  getNoticeList,
  getMessageList
})

export default class filter extends wepy.page {
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      'van-rate': '../../../../components/vant/rate/index',
      'van-icon': '../../../../components/vant/icon/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-picker': '../../../../components/vant/picker/index',
      'van-search': '../../../../components/vant/search/index',
      'van-tab': '../../../../components/vant/tab/index',
      'van-row': '../../../../components/vant/row/index',
      'van-col': '../../../../components/vant/col/index',
      'van-tabs': '../../../../components/vant/tabs/index',
      'van-radio': '../../../../components/vant/radio/index',
      'van-radio-group': '../../../../components/vant/radio-group/index',
      'van-cell': '../../../../components/vant/cell/index',
      'van-field': '../../../../components/vant/field/index',
      'van-loading': '../../../../components/vant/loading/index',
      'van-stepper': '../../../../components/vant/stepper/index',
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'img': '../../../../components/img/index',
      'item': '../../../../components/list-item/index',
      'container': '../../../../components/container/index',
      'no-permission': '../../../../components/no-permission/index',
    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {
    filterForm: {
      pageNo: 1,
      fwOrgId: '',
      type: '',
      status: '',
      beginDate: '',
      endDate: '',
    },
    isCanJump: false, // 是否可以跳转页面 ture可跳转,默认false不可跳转
  }

  methods = {
    viewDetail: (e: any, type: any, itemId: any,orgCode:any) => {
      if (e && type && type == '14170774247') { // 订单状态变更
        wx.navigateTo({
          url: `/pages/me/order-detail/index?id=${e}`
        })
      }
      if (e && type && type == '14171002147') { // 渠道订单消息
        wx.navigateTo({
          url: `/pages/dms/channel-purchase-order/detail/index?id=${e}`
        })
      }
      if (e && type && type == '14924754140') { // 销售订单消息
        wx.navigateTo({
          url: `/pages/dms/sales-distributors-detail/index?id=${e}&orgId=${orgCode}`
        })
      }
      if (e && type && type == '14171893218') { // 咨询信息回复
        wx.navigateTo({
          url: `/pages/me/my-consultation/detail/index?id=${e}`
        })
      }
      if (e && type && type == '14171893222') { // 资金认领通知
        wx.navigateTo({
          url: `/pages/finance/fund-claim/handle/index?id=${e}&salenum=${orgCode}`
        })
      }
      if (e && type && type == '14171893226') { // 库龄超期预警
        wx.navigateTo({
          url: `/pages/goods/inventory-age/index?id=${e}&isWarning=YC`
        })
      }
      if (e && type && type == '14171893229') { // 政策合同
        wx.navigateTo({
          url: `/pages/me/policyContract/index/index`
        })
      }
      if (e && type && type == '20220408001') { // 分销商拒收通知
        // TODO：暂不确定跳转
      }
      if (e && type && type == '14187583094') { // 促销资源兑现
        wx.navigateTo({
          url: `/pages/me/promotional-message-detail/index?id=${e}`
        })
      }
    },
    loadNextPage() {
      let { pageNo } = this.filterForm
      if (pageNo < this.totalPages) {
        let pageNos = pageNo + 1
        this.filterForm = { ...this.filterForm, pageNo: pageNos }
        this.$apply()
        this.myGetMessageList()
      }
    }
  }
  myGetMessageList() {
    const { pageNo, fwOrgId, type, status, beginDate, endDate } = this.filterForm
    this.methods.getMessageList({
      pageNo,
      fwOrgId,
      type,
      status,
      beginDate,
      endDate
    })
  }
  // 判断该通知是否可跳转
  checkCanJump(type){
    switch(type) {
      case '14171893229': // 政策合同
      case '14170774247': // 订单状态变更
      case '14171002147': // 渠道订单消息
      case '14924754140': // 销售订单消息
      case '14171893218': // 咨询信息回复
      case '14171893222': // 资金认领通知
      case '14171893226': // 库龄超期预警
      case '20220408001': // 分销商拒收通知
      case '14187583094': // 促销资源兑现
        return true;
      default:
        return false;
    }
  }
  onShow() {
    getStore().dispatch({ type: RESET_MESSAGE_LIST, payload: [] })
    this.filterForm = { ...this.filterForm, pageNo: 1 }
    this.$apply()
    this.myGetMessageList()
  }
  onLoad(e) {
    getStore().dispatch({ type: RESET_MESSAGE_LIST, payload: [] })
    const { type, typeName } = e
    let types = ''
    if(type){
      types = type
    }
    this.filterForm = { ...this.filterForm, type: types, pageNo: 1 }
    this.isCanJump = this.checkCanJump(types)

    if(typeName){
      wx.setNavigationBarTitle({
        title: typeName
      })
    }

    const data = {
      priceMessageId: '',
      type: types,
    }
    this.$apply()
    // 某个type下的全部已读
    request({ api: 'priceMessage/read.nd', method: 'POST', data })
  }
}
