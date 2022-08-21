import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { clone } from 'ramda';
import { request } from '@/utils/request';
import { checkPhone, checkEmail } from '@/utils/validators';
import Toast from '@/components/vant/toast/toast';
import {
  getPostOptionList,
  getUpcomingOptionList,
  getNoticeOptionList,
  getCustOptionList,
  getMatklOptionList,
} from '@/store/actions/addAccount'

interface Data {
  baseMatklVisible: boolean,
  custVisible: boolean,
  shopCkVisible: boolean,
  shopVisible: boolean,
  upcomingVisible: boolean,
  noticeVisible: boolean,
  otherInfoIndex: number,
  saleListVisible:boolean,
  saleIndex:number,
  saleList: any[],
  postList: any[],
  matklList: any[],
  custList: any[],
  shopCkList: any[],
  shopList: any[],
  upcomingList: any[],
  noticeList: any[],
  formData: object,
  postIndex:number,
  shop:boolean,
  postListVisible:boolean,
  customer:object,
}

@connect({
  editAccount({ account }) {
    return account.editAccount
  },
}, {
  getPostOptionList,
  getUpcomingOptionList,
  getNoticeOptionList,
  getCustOptionList,
  getMatklOptionList,
})
export default class AddAccount extends wepy.page {
  config = {
    navigationBarTitleText: '新增账号',
    usingComponents: {
      'van-button': '../../../../components/vant/button/index',
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'van-field': '../../../../components/vant/field/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-picker': '../../../../components/vant/picker/index',
      'van-icon': '../../../../components/vant/icon/index',
      'van-cell': '../../../../components/vant/cell/index',
    },
  };
  data: Data = {
    formData:{
      userName:'',
      mobile:'',
      email:'',
      sale:'',
      saleId:'',
      postNames:[],
      postIds:[],
      matklIds:[],
      matklNames:[],
      custIds:[],
      custNames:[],
      shopCkIds:[],
      shopCkNames:[],
      shopIds:[],
      shopNames:[],
      upcomingIds:[],
      upcomingNames:[],
      noticeIds:[],
      noticeNames:[],
    },

    baseMatklVisible: false,
    custVisible: false,
    shopCkVisible: false,
    shopVisible: false,
    upcomingVisible: false,
    noticeVisible: false,
    saleListVisible:false,
    postListVisible:false,
    otherInfoIndex: 0,
    saleIndex:-1,
    saleList:[
      {
        id:1,
        name:'是',
        selected:false,
      },
      {
        id:0,
        name:'否',
        selected:false,
      },
    ],
    postIndex:-1,
    postList:[],
    matklList:[],
    custList:[],
    shopCkList:[],
    shopList:[],
    upcomingList:[],
    noticeList:[],
    shop:false,
    customer:{}
  }

  // 页面内交互写在methods里
  methods = {
    async onSubmitForm() {
      if(!this.checkForm()) {
        return
      }
      const {userName, mobile, email, saleId, postIds, matklIds, custIds, shopCkIds, shopIds, upcomingIds, noticeIds}  = this.formData

      let param = {
        name: userName,
        phone: mobile,
        email: email,
        shopIds: shopIds.toString(),
        businessFlag: saleId,
        custAccountId: this.customer.id,
        roleIds: custIds.toString(),
        matklIds: matklIds.toString(),
        noticeIds: noticeIds.toString(),
        dealIds: upcomingIds.toString(),
        workIds: postIds.toString(),
        account: this.editAccount.account,
        wareIds: shopCkIds.toString(),
        // personId: '',
        }
      const result = await request({ api: '/customer/addUser.nd', method: 'POST', data: param });
      if(result.code == 0 ) {
        Toast.success('新增账号成功！初始密码已经发送至您设置的用户邮箱中！');
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }else {
        Toast.fail(result);
      }
    },

    inputName(event){
      this.formData.userName = event.detail
    },
    inputMobile(event){
      this.formData.mobile = event.detail
    },
    inputEmail(event){
      this.formData.email = event.detail
    },

    // 营销经理显示隐藏
    onToggleSaleListPopup(){
      this.saleListVisible = !this.saleListVisible
    },

    // 营销经理选择
    onSelecteSale(e) {
      if(e.id==0){
        this.formData.sale = e.name
        this.formData.saleId = e.id
        this.saleIndex = e.id
        this.saleListVisible = false
        return
      }
      this.modalTip()
    },

    // 岗位显示隐藏
    onTogglePostListPopup(){
      this.postListVisible = !this.postListVisible
    },

    // 岗位选择
    onSelectePost(selectItem){
      if(selectItem.id=='14181287852' || selectItem.id=='14181287847' || selectItem.id=='14181287855'){ // 营销经理-**
        this.modalTip()
      }else if(selectItem.id=='17594638392'){ // 下沉渠道专职运营经理
        this.modalTip()
      }else{
        const infoNew = clone(this.postList)
        const listNew = infoNew.map(item => {
          if(item.id === selectItem.id) {
            item.selected = !item.selected
          }
          return { ...item }
        });
        this.postList = listNew
      }
    },

    // 岗位选择确定
    onConfirmBasePostPopup(){
      const infoNew = clone(this.formData)
      const selectedList = this.postList.filter(item => item.selected)
      infoNew.postIds = selectedList.map(item => item.id)
      infoNew.postNames = selectedList.map(item => item.name)
      this.formData = infoNew
      this.postListVisible = !this.postListVisible
    },

    // 清空岗位
    onClearPostInfo(){
      const infoNew = clone(this.formData)
      let listnew = this.postList.map(item => {
        item.selected = false
        return {...item}
      })
      this.postList = listnew
      infoNew.postIds = []
      infoNew.postNames = []
      this.formData = infoNew
    },

    // 物料组弹框显示隐藏
    toggleBaseMaktlPopup() {
      this.baseMatklVisible = !this.baseMatklVisible
    },

    // 选择物料组
    onSelectBaseMatkl(selectItem) {
      const infoNew = clone(this.matklList)
      const listNew = infoNew.map(item => {
        if(item.id === selectItem.id) {
          item.selected = !item.selected
        }
        return { ...item }
      });
      this.matklList = listNew
    },

    // 选择物料组确定
    onConfirmBaseMatklPopup() {
      const infoNew = clone(this.formData)
      const selectedList = this.matklList.filter(item => item.selected)
      infoNew.matklIds = selectedList.map(item => item.id)
      infoNew.matklNames = selectedList.map(item => item.name)
      this.formData = infoNew
      this.baseMatklVisible = !this.baseMatklVisible
    },

    // 清空物料组
    onClearMatklInfo() {
      const infoNew = clone(this.formData)
      let listnew = this.matklList.map(item => {
        item.selected = false
        return {...item}
      })
      this.matklList = listnew
      infoNew.matklIds = []
      infoNew.matklNames = []
      this.formData = infoNew
    },

    // 角色弹框显示隐藏
    onToggleCustPopup() {
      this.custVisible = !this.custVisible
    },

    // 选择角色
    onSelectCust(selectItem) {
      const infoNew = clone(this.custList)
      const listNew = infoNew.map(item => {
        if(item.id === selectItem.id) {
          item.selected = !item.selected
        }
        return { ...item }
      });
      this.custList = listNew
    },

    // 选择角色确定
    onConfirmCustPopup() {
      const infoNew = clone(this.formData)
      const selectedList = this.custList.filter(item => item.selected)
      infoNew.custIds = selectedList.map(item => item.id)
      infoNew.custNames = selectedList.map(item => item.name)
      this.formData = infoNew
      this.custVisible = !this.custVisible
    },

    // 清空角色
    onClearCustInfo() {
      const infoNew = clone(this.formData)
      let listnew = this.custList.map(item => {
        item.selected = false
        return {...item}
      })
      this.custList = listnew
      infoNew.custIds = []
      infoNew.custNames = []
      this.formData = infoNew
    },

    // 待办弹框显示隐藏
    onToggleUpcomingPopup() {
      this.upcomingVisible = !this.upcomingVisible
    },

    // 选择待办
    onSelectUpcoming(selectItem) {
      const infoNew = clone(this.upcomingList)
      const listNew = infoNew.map(item => {
        if(item.id === selectItem.id) {
          item.selected = !item.selected
        }
        return { ...item }
      });
      this.upcomingList = listNew
    },

    // 选择待办确定
    onConfirmUpcomingPopup() {
      const infoNew = clone(this.formData)
      const selectedList = this.upcomingList.filter(item => item.selected)
      infoNew.upcomingIds = selectedList.map(item => item.id)
      infoNew.upcomingNames = selectedList.map(item => item.name)
      this.formData = infoNew
      this.upcomingVisible = !this.upcomingVisible
    },

    // 清空待办
    onClearUpcomingInfo() {
      const infoNew = clone(this.formData)
      let listnew = this.upcomingList.map(item => {
        item.selected = false
        return {...item}
      })
      this.upcomingList = listnew
      infoNew.upcomingIds = []
      infoNew.upcomingNames = []
      this.formData = infoNew
    },

    // 管理仓库弹框显示隐藏
    onToggleShopCkPopup() {
      this.shopCkVisible = !this.shopCkVisible
    },

    // 选择管理仓库
    onSelectShopCk(selectItem) {
      const infoNew = clone(this.shopCkList)
      const listNew = infoNew.map(item => {
        if(item.id === selectItem.id) {
          item.selected = !item.selected
        }
        return { ...item }
      });
      this.shopCkList = listNew
    },

    // 选择管理仓库确定
    onConfirmShopCkPopup() {
      const infoNew = clone(this.formData)
      const selectedList = this.shopCkList.filter(item => item.selected)
      infoNew.shopCkIds = selectedList.map(item => item.id)
      infoNew.shopCkNames = selectedList.map(item => item.name)
      this.formData = infoNew
      this.shopCkVisible = !this.shopCkVisible
    },

    // 清空管理仓库
    onClearShopCkInfo() {
      const infoNew = clone(this.formData)
      let listnew = this.shopCkList.map(item => {
        item.selected = false
        return {...item}
      })
      this.shopCkList = listnew
      infoNew.shopCkIds = []
      infoNew.shopCkNames = []
      this.formData = infoNew
    },

    // 管辖门店弹框显示隐藏
    onToggleShopPopup() {
      this.shopVisible = !this.shopVisible
    },

    // 选择管辖门店
    onSelectShop(selectItem) {
      const infoNew = clone(this.shopList)
      const listNew = infoNew.map(item => {
        if(item.id === selectItem.id) {
          item.selected = !item.selected
        }
        return { ...item }
      });
      this.shopList = listNew
    },

    // 选择管辖门店确定
    onConfirmShopPopup() {
      const infoNew = clone(this.formData)
      const selectedList = this.shopList.filter(item => item.selected)
      infoNew.shopIds = selectedList.map(item => item.id)
      infoNew.shopNames = selectedList.map(item => item.name)
      this.formData = infoNew
      this.shopVisible = !this.shopVisible
    },

    // 清空管辖门店
    onClearShopInfo() {
      const infoNew = clone(this.formData)
      let listnew = this.shopList.map(item => {
        item.selected = false
        return {...item}
      })
      this.shopList = listnew
      infoNew.shopIds = []
      infoNew.shopNames = []
      this.formData = infoNew
    },

    // 通知弹框显示隐藏
    onToggleNoticePopup() {
      this.noticeVisible = !this.noticeVisible
    },

    // 选择通知
    onSelectNotice(selectItem) {
      const infoNew = clone(this.noticeList)
      const listNew = infoNew.map(item => {
        if(item.id === selectItem.id) {
          item.selected = !item.selected
        }
        return { ...item }
      });
      this.noticeList = listNew
    },

    // 选择通知确定
    onConfirmNoticePopup() {
      const infoNew = clone(this.formData)
      const selectedList = this.noticeList.filter(item => item.selected)
      infoNew.noticeIds = selectedList.map(item => item.id)
      infoNew.noticeNames = selectedList.map(item => item.name)
      this.formData = infoNew
      this.noticeVisible = !this.noticeVisible
    },

    // 清空通知
    onClearNoticeInfo() {
      const infoNew = clone(this.formData)
      let listnew = this.noticeList.map(item => {
        item.selected = false
        return {...item}
      })
      this.noticeList = listnew
      infoNew.noticeIds = []
      infoNew.noticeNames = []
      this.formData = infoNew
    },
  }

  modalTip(tip){
    let nowTip = '此岗位需要先创建档案，然后再绑定账号，请到PC端操作'
    if(tip){
      nowTip = tip
    }
    wx.showModal({
      title: '温馨提示',
      content: nowTip,
      confirmText: '我知道了',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }

  checkForm() {

    const { formData: {userName, mobile, email, sale, postNames, matklNames, custNames, upcomingNames, noticeNames} } = this.data

    let status = true
    if(!userName) {
      status = false
      Toast.fail(`请填写姓名`)
    }else if(!mobile) {
      status = false
      Toast.fail(`请填写手机`)
    }else if(mobile && !checkPhone(mobile)) {
      status = false
      Toast.fail(`请填写正确的手机`)
      // this.errorMessage = { ...this.errorMessage, phone: '请填写正确的手机' }
    }else if(!email) {
      status = false
      Toast.fail(`请填写邮箱`)
    }else if(email && !checkEmail(email)) {
      status = false
      Toast.fail(`请填写正确的邮箱`)
    }else if(!sale) {
      status = false
      Toast.fail(`请选择是否为营销经理`)
    }else if(postNames.length == 0) {
      status = false
      Toast.fail(`请选择岗位`)
    }else if(matklNames.length == 0) {
      status = false
      Toast.fail(`请选择物料组`)
    }else if(custNames.length == 0) {
      status = false
      Toast.fail(`请选择角色分配`)
    }else if(upcomingNames.length == 0) {
      status = false
      Toast.fail(`请选择待办`)
    }else if(noticeNames.length == 0) {
      status = false
      Toast.fail(`请选择通知`)
    }

    this.$apply()
    return status
  }

  // 获取所有选择项列表项
  getOptions(){
    const res: any = wx.getStorageSync('b2b_token');
     const { customer } = JSON.parse(res);
     this.customer = customer

    // 岗位
    this.methods.getPostOptionList().then((res)=>{
      const { payload: { list } }: any = res;

      let listnew = list.map(item => {
          return {id: item.code, name: item.name, selected: false}
        })
      this.postList = listnew
    })

    // 待办
    this.methods.getUpcomingOptionList().then((res)=>{
      const { payload: { list } }: any = res;

      let listnew = list.map(item => {
        return {id: item.code, name: item.name, selected: false}
      })
      this.upcomingList = listnew
    })

    // 通知
    this.methods.getNoticeOptionList().then((res)=>{
      const { payload: { list } }: any = res;

      let listnew = list.map(item => {
        return {id: item.code, name: item.name, selected:false}
      })
      this.noticeList = listnew
    })

    // 角色、管理仓库、管辖门店
    this.methods.getCustOptionList({
      custId:this.customer.id,
      queryPage:{
        custId:this.customer.id,
        page: 1,
        pageSize: 10
      }
    }).then((res)=>{
      const { payload: { data: { roleList, shopCkList, shopList } } }: any = res;
      this.custList = roleList
      this.shopCkList = shopCkList
      this.shopList = shopList
    })

    // 物料组
    this.methods.getMatklOptionList().then((res)=>{
      const { payload: { data: { baseMatklList } } }: any = res;
      this.matklList = baseMatklList.map(item => {
        return {id: item.id, name: item.matklName, selected: false}
      })
    })
  }
  onUnload(){
    // const { formData: {userName, mobile, email, sale, postNames, matklNames, custNames, shopCkNames, shopNames, upcomingNames, noticeNames} } = this.data
    //
    // if(userName|| mobile || email || sale || postNames || matklNames.length>0 || custNames.length>0 || shopCkNames.length>0 || shopNames.length>0 || upcomingNames.length>0 || noticeNames.length>0){
    //   wx.showModal({
    //     title: '',
    //     content: '尚未保存，是否要离开？',
    //     success: function(res) {
    //       if (res.confirm) {
    //         wx.navigateBack()
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }
  }
  onShow(){

    this.getOptions()
  }
}
