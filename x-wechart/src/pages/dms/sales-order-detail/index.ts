import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { getSalesOrderDetail,canselOms } from '@/store/actions/salesorderdetail';
import { baseUrl } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import { dmsRequest } from '@/store/actions/dmsrequest';
import $Toast from "@/components/vant/toast/toast";
import utilsWxs from '../../../wxs/utils.wxs';
interface Data {
  visible: boolean;
  orderpopup: boolean;
  id: string;
  baseUrl: string;
  commentForm: object;
  commentVisible: boolean;
  calendarConfig: object;
  calendarVisible: boolean;
  currentOrderId: string;
  commentDetailVisible: boolean;
  commentDetail: object;
  showMore: boolean;
  isBillsShow: boolean;
  outActiveIdx: string;
}

@connect({
  orderdetail({ salesorderdetail }) {
    return salesorderdetail.orderdetail
  },
}, {
  getSalesOrderDetail,
  canselOms
})
export default class orderdetail extends wepy.page {
  config = {
    navigationBarTitleText: '订单详情',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'van-radio': '../../../components/vant/radio/index',
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'van-button': '../../../components/vant/button/index',
      'van-steps': '../../../components/vant/steps/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index',
    },
  };
  data: Data = {
    visible: false,
    orderpopup: false,
    id: '',
    showMore: false,
    isBillsShow: false,
    baseUrl: baseUrl,
    commentForm: {},
    commentVisible: false,
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    calendarVisible: false,
    currentOrderId: '',
    commentDetailVisible: false,
    commentDetail: {},
    outActiveIdx:0,
    active:0,
    isImg: false,
    ImgArr:[],
    showCanselExamle:false, // 取消审核弹窗
    ExamineId:'', // 取消审核单号id
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
    downFile: (e) => {
      let path = e.currentTarget.dataset.path
      $Toast.loading({ forbidClick: true, message: '文件下载中...', duration: 0 });
      const { sessionId, modifySession } = this.$parent.globalData;
      wx.downloadFile({
        url: path,
        header: {
          Cookie: `JSESSIONID=${sessionId || modifySession};`,
        },
        complete: () => {
          $Toast.clear();
        },
        success: (res) => {
          if (res.statusCode == 200) {
            let imageFilePath = res.tempFilePath;
            wx.saveImageToPhotosAlbum({
              filePath: imageFilePath,
              success: function () {
                $Toast.success('保存成功');
              },
              fail: function (err) {
                if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                  // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                  wx.showModal({
                    title: '提示',
                    content: '需要您授权保存相册',
                    showCancel: false,
                    success: modalSuccess => {
                      wx.openSetting({
                        success(settingdata) {
                          if (settingdata.authSetting['scope.writePhotosAlbum']) {
                            $Toast.success('获取权限成功,再次点击图片即可保存');
                          } else {
                            $Toast.success('获取权限失败，将无法保存到相册哦~');
                          }
                        }
                      })
                    }
                  })
                }else{
                  $Toast.fail('保存失败');
                }
              }
            })
          } else {
            $Toast.fail('文件下载失败, 请重试');
          }
        },

      });
    },
     // 取消物流弹窗
     cancelExamine:() =>{
      this.showCanselExamle = false
    },
    // 打开取消物流弹框
    ordercanselExamine: (item: any) => {
      // console.log('item',item,item.data.outBoundItem[0].stvId);

      this.ExamineId = item.data.outBoundItem[0].stvId
      this.showCanselExamle = true
      this.$apply()
    },
    // TODO:取消审核接口对接
    canselExamine: () => {
      this.showCanselExamle = false
      const id = this.ExamineId
      const account = wepy.$instance.globalData.account
      this.methods.canselOms({
        _loading: true,
        userAccount:account,
        stvId: id
      }).then((res) => {
        if(res && res.payload && res.payload.code == '0') {
          Toast.success('取消物流成功');
          this.methods.getSalesOrderDetail({ salesOrderId: this.currentOrderId });
        }
      })
    },
    // 回单影像
    receiptEffect(item) {
      let id = item.documentNum
      dmsRequest({
        data: {
          'cisCode': wepy.$instance.globalData.cisCode,
          'documentNum': id
        },
        method: 'toOmsView'
      }).then((res: any) => {
        if(res.data) {
          this.isImg = true
          this.ImgArr = res.data
        } else {
          Toast.fail('暂无回单影像');
        }
      })
    },
    onClose(){
      this.isImg = false
    },
    showMore: () => {
      this.showMore = true
    },
    hiddenMore: () => {
      this.showMore = false
    },
    isBillsShowFun(){
      this.isBillsShow = !this.isBillsShow
    },
    // 动态选择
    outActiveShowFun(idx){
      console.log(idx)
      this.outActiveIdx = idx;
      console.log(this.outActiveIdx)
    },
    foramtLogix(logic){
      // debugger
      return logic.map(it=>{
        // {orderStatusName: "单据在途", vehicleNo: "", carrierName: "江苏苏宁物流有限公司", reserveTime: "2020-10-28 18:00:00",…}
        // carrierCode: "D731-02"
        // carrierName: "江苏苏宁物流有限公司"
        // dispatchCode: "M20102800013"
        // driverName: "李晓瞒"
        // driverPhone: "17318989712"
        // orderCode: "DC20113832010280001"
        // orderStatus: "ORDER_ONROAD"
        // orderStatusName: "单据在途"
        // reserveTime: "2020-10-28 18:00:00"
        // reservetimeRemarks: ""
        // vehicleNo: ""
        return {
          text:`[${it.orderStatusName}] ${it.carrierName}`,
          desc:it.reserveTime
        }
        }
      )
    }
  };

  onLoad(e: { id: any; }) {
    const { id } = e
    this.currentOrderId = id
    this.methods.getSalesOrderDetail({ salesOrderId: this.currentOrderId });
  }
}
