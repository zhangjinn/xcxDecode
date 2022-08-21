import wepy from 'wepy';
import systemMixin from '@/mixins/system';
import emptyDataType from "@/components/empty-data-type/index";
import customPop from '@/components/user-operation/custom-pop/index';
import utilsWxs from '../../../wxs/utils.wxs';
import {
  getShopPotentialHourse,
  getShopPotentialUserDetail,
  getShopPotentialProduct,
  getShopPotentialBuyRecord,
  getShopPotentialAfterSales,
  delShopPotentialProduct,
  delShopPotentialUserDetail,
} from '@/store/actions/order';
import {connect} from "wepy-redux";
import Toast from "@/components/vant/toast/toast";
import {getGreenCategoryPictures, getBlueCategoryPictures} from '@/utils/index'
interface Data {
  scrollTop: number;
  filterForm: object;
  imgObj: object;
  tabBarActive: string;
  tabBarList: any[];
  details: object;
  currIndex: any;
  purchaseHistoryActive: any;
  detailId: any;
  customPopTip: string;
}
@connect({

}, {
  getShopPotentialHourse, // 潜在客户明细-详细资料
  getShopPotentialUserDetail, // 获取意向用户详情
  getShopPotentialProduct, // 销售机会
  getShopPotentialBuyRecord, // 购买记录
  getShopPotentialAfterSales, // 售后记录
  delShopPotentialProduct, // 删除销售机会
  delShopPotentialUserDetail, // 删除房屋及家电
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-circle': '../../../components/vant/circle/index',
      'img': '../../../components/img/index',
      'van-steps': '../../../components/vant/steps/index',
    },
  };
  components = {
    emptyDataType,
    customPop,
  };
  mixins = [systemMixin];
  data: Data = {
    scrollTop: -1,
    filterForm: {
      terms: {
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        totalPage: 0,
      },
    },
    imgObj: {
      'opeBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719489_9dc7d354266c43418f0a4e6b2dcb65e7.png', // 用户运营-列表统计背景.png
      'girl': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_7a0b141e99a7428f926d6ab72dd9a6be.png', // 用户运营-女@2x.png
      'boy': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_cb1353c22eea4c82b55614da60c6e5cf.png', // 用户运营-男@2x.png
      'v1': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_5d96d88d4e7546c5bfcb264619138a6f.png', // 用户运营-VI@2x.png
      'v2': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719546_480a61ece00549dbabd496ba420774c4.png', // 用户运营-v2@2x.png
      'v3': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_03c839f9027748129c5bb8e6d4b00fd1.png', // 用户运营-v3@2x.png
      'v4': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719547_c56053fcc0cd4b7aa8eb2c887cbdd916.png', // 用户运营-v4@2x.png
      'v5': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719550_673d9f0af4b54c0db7198cc3e64da0b0.png', // 用户运营-v5@2x.png
      'more': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_84a1661d8f534418a3867bd0033bb1f6.png', // 用户运营-更多@2x.png
      'follow': 'http://3s-static.hisense.com/wechat/1/14722429883/1656484719470_ca174251190a4e86a395044306d9e78a.png', // 用户运营-去跟进@2x.png
      'houseType': 'http://3s-static.hisense.com/wechat/1/14722429883/1656488647900_21c6cb1cca7841fcb614a4870bd2ea4a.png', // 用户运营-户型@2x.png
      'texting': 'http://3s-static.hisense.com/wechat/1/14722429883/1657096257276_309df05e81b8495995b501ffbc38d6cd.png', // 用户运营-发短信@2x.png
      'callUp': 'http://3s-static.hisense.com/wechat/1/14722429883/1657096257246_ab632670c45342f193f6f67eee4f823a.png', // 用户运营-打电话@2x.png
    },
    tabBarActive: 'XSJH',
    tabBarList: [
      {id:'XSJH', name:'销售机会'},
      {id:'XXZL', name:'详细资料'},
      {id:'GMJL', name:'购买记录'},
      {id:'SHJL', name:'售后记录'},
    ],
    purchaseHistoryActive: 1,
    details: {
      baseInfo: {}, // 用户信息
      customerDetails: [], // 详细资料
      salesOpportunity: [], // 销售机会
      purchaseHistory: [], // 购买记录
      afterSalesRecords: [], // 售后记录
    },
    detailId: '', // 明细id
    customPopTip: '', // 提示弹框文字提示
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
    // 返回上一级
    goback(){
      wx.navigateBack()
    },
    // 切换tab
    changeTab(item){
      if(this.tabBarActive === item.id){
        return
      }
      this.tabBarActive = item.id
      this.filterForm.page.pageNo = 1
      this.filterForm.page.totalPage = 0
      this.methods.scrollToTop()
      this.loadCurrentTabList()

    },

    // 显示隐藏操作按钮
    showHandle(event){
      const {index, key} = event.currentTarget.dataset
      if(key === 'baseInfo'){
        let show = this.details.baseInfo.show
        this.details.baseInfo.show = !show
      }else{
        let show = this.details[key][index].show
        this.details[key][index].show = !show
        this.details[key] = this.details[key].map((item, idx)=>{
          if(idx!=index){
            item.show = false
          }
          return item
        })
      }

    },

    // 编辑销售机会
    salesOpportunityEdit(event){
      const { type, id } = event.currentTarget.dataset
      let itemId = id
      let detailId = this.detailId
      wx.navigateTo({
        url: `/pages/operation/edit-sales-opportunity/index?id=${detailId}&itemId=${itemId}&type=${type}`
      })
    },

    // 删除销售机会
    salesOpportunityDelete(index){
      this.currIndex = index
      this.customPopTip = '确认删除销售机会?'
      this.$invoke('customPop', 'showPopup')
    },

    // 确定删除
    onConfirm(){
      if(this.tabBarActive === 'XSJH'){ // 销售机会
        this.methods.delShopPotentialProduct({
          id: this.details.salesOpportunity[this.currIndex].id
        }).then((res)=>{
          const {code, msg} = res.payload
          if(code == 0){
            Toast.success('删除成功！')
            this.details.salesOpportunity.splice(this.currIndex, 1)
          }else{
            Toast.fail(msg)
          }
          this.$apply()
        })
      }
      if(this.tabBarActive === 'XXZL'){ // 详细资料
        this.methods.delShopPotentialUserDetail({
          id: this.details.customerDetails[this.currIndex].id
        }).then((res)=>{
          const {code, msg} = res.payload
          if(code == 0){
            Toast.success('删除成功！')
            this.details.customerDetails.splice(this.currIndex, 1)
          }else{
            Toast.fail(msg)
          }
          this.$apply()
        })
      }

      this.$invoke('customPop', 'hidePopup')
      this.$apply()
    },

    // 详细资料，编辑基本信息
    baseInfoEdit(){
      let id = this.detailId
      wx.navigateTo({
        url: `/pages/operation/edit-base-info/index?id=${id}`
      })
    },

    // 详细资料，编辑全屋家电
    goEditHouseAppliances(event){
      const { item } = event.currentTarget.dataset
      let id = this.detailId
      let itemId = item.id
      wx.navigateTo({
        url: `/pages/operation/edit-house-appliances/index?id=${id}&itemId=${itemId}`
      })
    },

    // 详细资料，新增全屋家电
    goAddHouseAppliances(){
      let id = this.detailId
      wx.navigateTo({
        url: `/pages/operation/add-house-appliances/index?id=${id}`
      })
    },

    // 删除全屋家电
    goDelHouseAppliances(event){
      const { item, index } = event.currentTarget.dataset
      let name = item.community || item.address || ''
      this.currIndex = index
      this.customPopTip = `确认删除${name}全屋家电信息？`
      this.$invoke('customPop', 'showPopup')
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
        this.loadCurrentTabList()
      }
    },

    // 获取意向用户详情
    getShopPotentialUserDetailInfo: () => {
      this.methods.getShopPotentialUserDetail({
        userId: this.detailId
      }).then((res)=>{
        const { data } = res.payload
        this.details.baseInfo = data
        if(this.details.baseInfo && this.details.baseInfo.phone){
          let reg=/(\d{3})\d{4}(\d{4})/;
          this.details.baseInfo.phoneZH = this.details.baseInfo.phone.replace(reg, "$1****$2")
        }
        this.$apply()
      })
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

  // tab切换获取对应明细列表
  loadCurrentTabList(){
    if(this.tabBarActive === 'XSJH'){ // 销售机会
      this.getShopPotentialProductInfo()
    }
    if(this.tabBarActive === 'XXZL'){ // 详细资料
      this.getShopPotentialHourseInfo()
    }
    if(this.tabBarActive === 'GMJL'){ // 购买记录
      this.getShopPotentialBuyRecordInfo()
    }
    if(this.tabBarActive === 'SHJL'){ // 售后记录
      this.getShopPotentialAfterSalesInfo()
    }
  }

  // 售后记录
  getShopPotentialAfterSalesInfo(){
    this.methods.getShopPotentialAfterSales({
      userId: this.detailId
    }).then((res)=>{
      const { list, totalPages, currentPage } = res.payload
      this.filterForm.page.totalPage = totalPages
      let activityList = list || []
      if ( currentPage > 1 ) {
        this.details.afterSalesRecords = this.details.afterSalesRecords.concat(activityList)
      } else {
        this.details.afterSalesRecords = activityList
      }
      this.$apply()
    })
  }

   // 购买记录
  getShopPotentialBuyRecordInfo(){
    this.methods.getShopPotentialBuyRecord({
      userId: this.detailId
    }).then((res)=>{
      const { list, totalPages, currentPage } = res.payload
      this.filterForm.page.totalPage = totalPages
      let activityList = list || []
      if ( currentPage > 1 ) {
        this.details.purchaseHistory = this.details.purchaseHistory.concat(activityList)
      } else {
        this.details.purchaseHistory = activityList
      }
      this.$apply()
    })
  }

  // 销售机会
  getShopPotentialProductInfo(){
    this.methods.getShopPotentialProduct({
      userId: this.detailId,
      pageSize: this.filterForm.page.pageSize,
      pageNo: this.filterForm.page.pageNo,
    }).then((res)=>{
      const { list, totalPages, currentPage } = res.payload
      list = list.map((item)=>{
        if(item.type === '套购' && item.detailList && item.detailList.length>0){
          item.detailList = item.detailList.map((product)=>{
            product.categoryPicture = getGreenCategoryPictures(product.spartId)
            return product
          })
        }
        if(item.type !== '套购' && item.detailList && item.detailList.length>0){
          item.detailList = item.detailList.map((product)=>{
            product.categoryPicture = getBlueCategoryPictures(product.spartId)
            return product
          })
        }
        return item
      })
      this.filterForm.page.totalPage = totalPages
      let activityList = list || []
      if ( currentPage > 1 ) {
        this.details.salesOpportunity = this.details.salesOpportunity.concat(activityList)
      } else {
        this.details.salesOpportunity = activityList
      }
      this.$apply()
    })
  }

  // 潜在客户明细
  getShopPotentialHourseInfo(){
    this.methods.getShopPotentialHourse({
      userId: this.detailId,
      pageSize: this.filterForm.page.pageSize,
      pageNo: this.filterForm.page.pageNo,
    }).then((res)=>{
      const { list, totalPages, currentPage } = res.payload
      list = list.map((item)=>{
        item.show = false
        if(item.hourseProductDtoList){
          item.hourseProductDtoList = item.hourseProductDtoList.map((product)=>{
            product.categoryPicture = getBlueCategoryPictures(product.spartId)
            return product
          })
        }
        return item
      })
      this.filterForm.page.totalPage = totalPages
      let activityList = list || []
      if ( currentPage > 1 ) {
        this.details.customerDetails = this.details.customerDetails.concat(activityList)
      } else {
        this.details.customerDetails = activityList
      }
      this.$apply()
    })
  }

  onShow() {
    this.filterForm.page.pageNo = 1
    this.filterForm.page.totalPage = 0
    this.methods.scrollToTop()
    this.loadCurrentTabList()
  }

  onLoad({ id, tabBarActive }){
    this.detailId = id
    if(tabBarActive){
      this.tabBarActive = tabBarActive
    }
    this.methods.getShopPotentialUserDetailInfo()
  }

}
