import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import CommonMixin from '@/mixins/common';
import systemMixin from '@/mixins/system';
import Toast from '@/components/vant/toast/toast';
import utilsWxs from '../../../wxs/utils.wxs';
import { userLogin, userPermissions, getAlert, addMenuRecord } from '@/store/actions/user';
import { maximumLimit } from '@/utils/index';
import { getUserUnreadNumbers, getUnreadDmsNumber,getUserUnreadCisAuditOrder,writeLog,getUnTreatNum } from '@/store/actions/home';
import { forEachObjIndexed } from 'ramda';
import { getFundClaimCounts } from '@/store/actions/fund-claim';
import {request} from "@/utils/request";
interface Data {
  deviceInfo:any,
  loginStatus: boolean,
  currentAccount: object,
  accountList: any[],
  cgrk: number,
  ddsh: number,
  xsck: number,
  waitCheckNum: number,
  fundClaimListQuery:object,
  zjrl:number,
  permissionList: any[],
  imgObj: object;
  notificationList: any[];
}
const store = getStore()
@connect({
  mixinCurrentUser({ user }) {
    return user.info || {}
  }
}, {
  userLogin,
  getUserUnreadNumbers,
  getUnreadDmsNumber,
  getUserUnreadCisAuditOrder,
  writeLog,
  userPermissions,
  getAlert,
  getUnTreatNum,
  addMenuRecord,
})
export default class Take extends wepy.page {
  mixins = [ CommonMixin, systemMixin ];
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom',
    usingComponents: {
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'no-permission': '../../../components/no-permission/index',
    },
  };
  wxs = {
    utils: utilsWxs,
  };
  data: Data = {
    imgObj: {
      myAvatar: 'http://3s-static.hisense.com/wechat/1/14722429883/1646011215983_37c22408ce4e47dea1e818d83cee31b3.png',
      myBg: 'http://3s-static.hisense.com/wechat/1/14722429883/1643096641792_77a391f88d3f4cd7ad6dd88674125bc8.png',
      myBgNew: 'http://3s-static.hisense.com/wechat/1/14722429883/1642582924572_a2f20f2c14f744e0854e66f5d835dddd.png',
    },
    deviceInfo:{},
    loginStatus: false,
    currentAccount: {},
    accountList: [],
    waitCheckNum: 0,
    cgrk: 0, // 采购入库
    ddsh: 0, // 订单审核
    xsck: 0, // 销售出库
    zjrl:0, // 资金认领
    fundClaimListQuery:{ //资金认领数据
      method: "queryNoticeBills",
      params: {
        pageno: 1,
        pagesize:5,
        claimstatus:"0",
        tradetimeS:"",
        tradetimeE:"",
        hifi_flowstatus:''
      }
    },
    permissionList: [],
    notificationList: [
      { id: 1, name: '公告', icon:'wodegonggao1', isShow: true, unReadNumber:0, switchUrl: '/pages/message/announcement/list/index' },
      { id: 2, name: '待办', icon:'daiban', isShow: true, unReadNumber:0, switchUrl: '/pages/message/upcoming/list/index' },
      { id: 3, name: '通知', icon:'tongzhi', isShow: true, unReadNumber:0, switchUrl: '/pages/message/notice/list/index' },
    ]
  };
  methods = {
    goPage(subItem:any) {
      let name = subItem && subItem.sourceName
      let url = subItem && subItem.url
      let id = subItem && subItem.id
      if(name && url){
        try {
          this.methods.writeLog({
            menuName: name,
            routePath: url,
            ...this.deviceInfo
          })
        } catch (e) {}
      }
      if(id){
        try {
          // 客户访问菜单记录-新增
          this.methods.addMenuRecord({
            menuId: id,
            clientPlatform: 'mip',
          })
        } catch (e) {}
      }
      this.navigator({ link: { url } });
    },
    // 跳转意向商家页面
    goMIC(url: any,auth:boolean) {
      this.navigator({ link: { url },auth :false });
    },
    // 跳转到切换账户
    goSwitchAccount() {
      if(this.accountList.length<=1){
        return
      }
      let url= '/pages/me/switch-account/index'
      this.navigator({ link: { url } });
    },
    onLogin() {
      wx.navigateTo({ url: '/pages/auth/wechat/index' });
    },
    navigateTo(url) {
      if(!this.loginStatus) {
        Toast.fail({
          message: '请先登录',
          onClose: () => {
            wx.reLaunch({
              url: '/pages/main/take/index',
            });
          }
        })
        return
      }
      wx.navigateTo({url})
    },
    // 跳转到公告、待办、通知对应页
    goMessageCenter(item){
      if(item.switchUrl){
        let url = item.switchUrl
        wx.navigateTo({url})
      }
    }
  };

  getUnreadList() {
    const arr: any = []
    const {loginSystem,marketModels } = this.mixinCurrentUser
    if(loginSystem && loginSystem.indexOf('14168810879') > -1 ) {
      arr.push('cgrk')
    }
    if((marketModels.indexOf('17453') > -1) && ( loginSystem && loginSystem.indexOf('14168810879') > -1)) {
      arr.push('ddsh')
    }
    if (loginSystem && loginSystem.indexOf('14168810879') > -1 ) {
      arr.push('xsck')
    }
    if(arr && arr.length > 0) {
      this.methods.getUnreadDmsNumber(arr.join(',')).then((res: { payload: { data: any; }; }) => {
        if (res) {
          const { data } = res.payload
          forEachObjIndexed((value, key: any) => {
            this.setData(key, value)
          }, data)
        }
      })
    }
    if((marketModels.indexOf('17453') > -1)  && ((loginSystem && loginSystem.indexOf('14168810879') > -1) || (loginSystem && loginSystem.indexOf('14168810880') > -1 ))) {
      this.methods.getUserUnreadCisAuditOrder().then((res: { payload: any; }) => {
        const { payload } = res
        if (payload.code == 0) {
          this.waitCheckNum = payload.waitCheckNum
        } else {
          this.waitCheckNum = 0
        }
        this.$apply()
      })
    }
  }
  getFunClaimList() { // 资金认领数量获取
    getFundClaimCounts(this.fundClaimListQuery, res => {
      if(res.data.success){
        this.zjrl = res.data.data.count
        this.setData({
          zjrl: res.data.data.count
        })
      }
    })
    this.$apply()
 }

  // 获取账号列表
  async getAccountList() {
    const result = await request({ api: 'queryAccountUnionid.nd'})
    if(result && result.list){
      this.accountList = result.list
    }
    this.$apply()
  }

  // 获取未读公告数量、未处理待办数量、未读消息数量
  getUnTreatNumList(){
    this.methods.getUnTreatNum().then((res) => {
      let ggNum = 0
      let msgNum = 0
      let taskNum = 0
      if (res && res.payload) {
        if(res.payload.GG && res.payload.GG.item){
          ggNum = res.payload.GG.item.unreadNum
        }
        if(res.payload.MSG && res.payload.MSG.item && res.payload.MSG.item.length){
          res.payload.MSG.item.forEach((item)=>{
            msgNum += item.unreadNum
          })
        }
        if(res.payload.TASK && res.payload.TASK.item && res.payload.TASK.item.length){
          res.payload.TASK.item.forEach((item)=>{
            taskNum += item.unreadNum
          })
        }
      }
      this.notificationList[0].unReadNumber = maximumLimit(ggNum) // 公告
      this.notificationList[1].unReadNumber = maximumLimit(taskNum) // 代办
      this.notificationList[2].unReadNumber = maximumLimit(msgNum) // 通知
      this.$apply()
    })
  }

  // 获取菜单权限列表
  getPermissionList(){
    if(wx.getStorageSync('b2b_permission_list')){
      const { list }=JSON.parse(wx.getStorageSync('b2b_permission_list'))
      this.permissionList=list
    }
    this.$apply()
  }
  async onShow() {
    // 自定义底部导航栏-如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态
    if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
      this.$wxpage.getTabBar().setData({
        selected: 4
      })
    }
    this.loginStatus = this.isLogin()
    const { userName, account } = this.mixinCurrentUser
    this.currentAccount = { text: userName, value: account }
    if(this.loginStatus) {
      await this.methods.userPermissions()
      await this.getPermissionList()
      await this.methods.getAlert()
      this.getUnTreatNumList()
      this.getAccountList()
      //请求未读订单数量
      this.getUnreadList()
      this.getFunClaimList()
    }
  }
  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.deviceInfo = {
      system:systemInfo.system.replace(' ','/'),
      brower:'miniprogram/'+systemInfo.SDKVersion
    }
  }
}
