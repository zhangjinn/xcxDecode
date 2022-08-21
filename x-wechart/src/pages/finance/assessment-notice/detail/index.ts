import wepy from 'wepy';
import {connect} from "wepy-redux";
import Toast from '@/components/vant/toast/toast';
import Dialog from '@/components/vant/dialog/dialog';
import {request} from '@/utils/request';
import $Toast from "@/components/vant/toast/toast";
import {DX} from "@/utils/index";
import utilsWxs from '../../../../wxs/utils.wxs';
import {
  assessmentNoticeAppealApplication,
  assessmentNoticeConfirm,
  uploadImg,
} from '@/store/actions/balance';

interface Data {
  currId: any;
  pageType: String;
  pageObj: Object;
  orderDetail: Object;
  tableData: Object;
  formData: Object;
  appealBtnShow: boolean;
  complaintReasonPopShow: boolean;
  complaintReasonOptions: any[];
  steps: any[];
  active: string;
  imgObj: object;
}

@connect({

}, {
  assessmentNoticeAppealApplication,
  assessmentNoticeConfirm,
  uploadImg,
})
export default class List extends wepy.page {
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      'van-icon': '/components/vant/icon/index',
      'van-popup': '/components/vant/popup/index',
      'van-field': '/components/vant/field/index',
      'van-toast': '/components/vant/toast/index',
      'van-picker': '/components/vant/picker/index',
      'van-stepper': '/components/vant/stepper/index',
      'van-dialog': '/components/vant/dialog/index',
      'van-checkbox': '/components/vant/checkbox/index',
      'van-button': '/components/vant/button/index',
      'van-uploader': '/components/vant/uploader/index',
    },
  };
  wxs = {
    utils: utilsWxs,
  };
  data: Data = {
    currId:'', // 考核通知单id
    pageType: '', // 考核通知单状态
    pageObj:{},
    orderDetail: {}, // 考核通知单详情
    tableData: {
      // 表格标题
      th: ["序号", "品类", "各品类分摊比例", "扣除金额(元)"],
      // 表格内容
      td: []
    },
    formData: {
      complaintReasonId: '', // 申诉原因id
      complaintReasonName: '', // 申诉原因名称
      gapReduction: '', // 申诉减免缺口
      reasonExplanation: '', // 原因说明
      fileList: [], // 证明文件
      gapAfterComplaintNum: 0, // 申诉后缺口
      actualAssessmentAmount: 0, // 实际考核金额
    },
    appealBtnShow: false,
    complaintReasonPopShow: false,
    complaintReasonOptions: [
      {id:'0',name:'不合作未在CIS系统冻结'},
      {id:'1',name:'重复门店'},
      {id:'2',name:'新建店未开业'},
      {id:'3',name:'其他'},
    ],
    steps:[
      {
        text: '开始',
        desc: '',
        icon:'icon-process-begins',
        isBorder: false,
      },
      {
        text: '商家发起',
        desc: '',
        icon:'icon-merchant-initiated',
        isBorder: true,
      },
      {
        text: '营销中心',
        desc: '客户发展部长',
        icon:'icon-development-minister',
        isBorder: true,
      },
      {
        text: '营销中心',
        desc: '总经理',
        icon:'icon-general-manager',
        isBorder: true,
      },
      {
        text: '中国区营销总部',
        desc: '客户发展部',
        icon:'icon-general-manager',
        isBorder: true,
      },
      {
        text: '结束',
        desc: '',
        icon:'icon-process-end',
        isBorder: false,
      },
    ],
    active:'0', // 流程图当前值
    imgObj: {
      'assessmentNoticeBg': 'http://3s-static.hisense.com/wechat/1/14722429883/1635993529577_0b7b5e76ef374c41b7db34441faf6b04.png',
    },
  }
  methods = {

    // 申诉原因弹框显示
    handleComplaintReasonPop(){
      this.complaintReasonPopShow = true
    },

    // 改变申诉原因
    chooseComplaintReason(item){
      this.formData.complaintReasonId = item.id
      this.formData.complaintReasonName = item.name
      this.complaintReasonPopShow = false
      this.$apply()
    },

    // 关闭申诉原因弹框
    onComplaintReasonPopClose(){
      this.complaintReasonPopShow = false
    },

    // 改变申诉减免缺口
    ongapReductionChange(event){

      if(event.detail > this.orderDetail.actualAssessCount){
        $Toast.fail('申诉减免缺口需小于缺口数');
        this.formData.gapReduction = ''
      }else{
        this.formData.gapReduction =  event.detail
      }

      // 申诉后缺口 = 缺口数 - 申诉减免缺口
      this.formData.gapAfterComplaintNum = this.orderDetail.actualAssessCount - this.formData.gapReduction

      // 实际考核金额 = 申诉后缺口 * 标准单价
      this.formData.actualAssessmentAmount = this.formData.gapAfterComplaintNum * this.orderDetail.standardPrice

      this.$apply()
    },

    // 改变原因说明
    onReasonExplanationChange(event){
      this.formData.reasonExplanation =  event.detail
    },

    //删除图片
    deleteImg(event) {
      this.formData.fileList.splice(event.detail.index, 1)
    },

    // 显示申诉form表单
    handleAppeal(){
      this.appealBtnShow = true
    },

    // 返回上一级
    handleCancel(){
      wx.navigateBack();
    },

    // 未申诉待确认》》弹出提示并返回上一级
    handleConfirm(){
      let that = this
      Dialog.confirm({
        title: '考核通知单确认',
        message: '请确定已经完成考核通知单的核对，后续将根据其明细做政策规则处罚，请知悉。',
      })
        .then(() => {
          that.appealFailConfirm()
        })
        .catch(() => {
          // on cancel
        });
    },

    // 提交申诉并返回上一页
    handleSubmitAppeal(){

      let checkResault = this.methods.checkParam()
      if(checkResault){
          const { complaintReasonName, gapReduction, reasonExplanation, fileList} = this.data.formData
          let fileIds = fileList.map((item)=>{
             return item.id
           })
          let appealList = [{
            id: this.orderDetail.id,
            appealDecreaseCount: gapReduction, // 申诉减免缺口
            appealReason: reasonExplanation, // 原因说明
            appealFile: fileIds.toString(), // 文件id
          }]
          let param = {
            id: this.currId,
            appealList: appealList,
            _loading: true
          }
          this.methods.assessmentNoticeAppealApplication(param).then((res)=>{
            const { payload } = res
            if(payload.code == 0){
              Toast.success({
                forbidClick: true,
                duration: 1000,
                message: '申诉成功',
                onClose: () => {
                  wx.navigateBack({
                    delta: 1,
                  });
                },
              });
            }else{
              Toast.fail(payload.msg)
            }
          })
      }

    },

    // 提交申诉前校验
    checkParam: () => {
      const { gapReduction, reasonExplanation } = this.data.formData

      // 1、如果是市场跑动类型的通知单。申诉原因显示，申诉原因、申诉减免缺口必填；原因说明非必填
      // 2、如果不是市场跑动类型的。申诉原因不显示，申诉减免缺口必填；原因说明必填
      // if(this.orderDetail.noticeType == 'SCPD' && !complaintReasonName){
      //   Toast.fail('请选择申诉原因')
      //   return false
      // }
      if(!gapReduction){
        Toast.fail('请填写申诉减免缺口')
        return false
      }
      if(!reasonExplanation){
        Toast.fail('请填写原因说明')
        return false
      }
      return true
    },

    // 未申诉取消申诉
    handleCancelAppeal(){
      this.appealBtnShow = false
    },

    // 已申诉待确认
    handleAppealFailConfirm(){
      this.appealFailConfirm()
    },

    // 已申诉点击取消
    handleAppealFailCancel(){
      wx.navigateBack();
    },

    //上传图片
    afterRead(event) {
      this.selImg(event.detail.file.path)
    },

  }

  //选择照片
  selImg(path) {
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
          'fileType': 'assessnotice',
          'file': 'image/jpeg;base64,' + res.data
        }
        that.methods.uploadImg(data).then(res => {
          obj.url = res.payload.url
          obj.id = res.payload.businessId
          obj.name = res.payload.fileNameString
          that.formData.fileList.push(obj)

          that.$apply()
        })
      }
    })
  }

  // 考核通知单确认
  appealFailConfirm(){
    let id = this.currId
    this.methods.assessmentNoticeConfirm(id).then((res)=>{
      const { payload } = res
      if(payload.type == 'success'){
        Toast.success({
          forbidClick: true,
          duration: 1000,
          message: '已确认',
          onClose: () => {
            wx.navigateBack({
              delta: 1,
            });
          },
        });

      }else{
        Toast.fail(payload.text || payload.msg)
      }
    })
  }

  // 获取订单详细信息
  getDetailsData(){
    Toast.loading({
      message: '正在加载',
      duration: 2000
    });
    request({
      api: `custAssessNotice/editSum/${this.currId}.nd`,
      method: 'GET',
      type: 'application/json',
      callback: (res: any) => {
        Toast.clear()
        const { data } = res
        
        this.pageObj = res.data.data;
        if(data && data.data){
          if(data.data.noticeList && data.data.noticeList.length>0){
            this.orderDetail = data.data.noticeList[0]
            // 待确认--ISSUED
            // 申诉待确认--APPEALED
            // 已确认--CONFIRMED
            // 申诉已确认--APPEALCONFIRMED
            // 申诉中--INAPPEAL
            this.pageType = this.orderDetail.noticeStatus
            let title = ''
            if(this.pageType == 'ISSUED'){
              title = '考核通知单处理'
            }else if(this.pageType == 'APPEALED' || this.pageType == 'INAPPEAL'){
              title = '考核通知单申诉'
            }else{
              title = '考核通知单详情'
            }
            wx.setNavigationBarTitle({ //动态修改页面标题
              title: title
            })

            this.active = this.orderDetail.checkIndex
            this.orderDetail.differenceAmtDx = this.orderDetail.actualAssessMoney ? DX(this.orderDetail.actualAssessMoney) : ''
          }

          if(data.data.details && data.data.details.length>0){
            this.tableData.td =data.data.details.map((item, index)=>{
              return {
                index: index, // 序号
                shopTypeName: item.shopTypeName, // 品类
                proportion: item.proportion, // 比例
                deductionAmount: item.deductionAmount, // 扣除金额
                capitalize: item.capitalize, // 大写
              }
            })
          }
        }

        this.$apply()
      }
    })
  }

  async onLoad({ id }) {
    this.currId = id
    this.getDetailsData()
  }
}
