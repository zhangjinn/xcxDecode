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
  pageType: string;
  orderDetail: object;
  tableData: object;
  formData: any[];
  appealBtnShow: boolean;
  popupTitle: string;
  selectIndex: any;
  complaintReasonPopShow: boolean;
  complaintReasonOptions: any[];
  steps: any[];
  active: string;
  imgObj: object;
  examTypeOption: any[];
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
    orderDetail: {}, // 考核通知单详情
    tableData: {
      // 表格标题
      th: ["序号", "品类", "各品类分摊比例", "扣除金额(元)"],
      // 表格内容
      td: []
    },
    formData: [{
      examType: {
        id: '',
        name: ''
      }, // 考核类型
      gapReduction: '', // 申诉减免缺口
      reasonExplanation: '', // 申诉原因
      fileList: [], // 证明文件
      gapAfterComplaintNum: 0, // 申诉后缺口
      actualAssessmentAmount: 0, // 实际考核金额
    }],
    appealBtnShow: false,
    popupTitle: '',
    selectIndex: 0, // 当前选择的表单模块下标
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
      'marketMovement': 'http://3s-static.hisense.com/wechat/1/14722429883/1653961341882_b9a04fef3e704509b4900d1a1b4827cc.png', // 市场跑动
      'networkExpansion': 'http://3s-static.hisense.com/wechat/1/14722429883/1653961371003_a305666f37ca4a89a5ea63b1368b3783.png', // 分销网络拓展
      'promotionsExecution': 'http://3s-static.hisense.com/wechat/1/14722429883/1653961371137_542376c603c54530afab6ee644e97c2d.png', // 促销活动执行
      'trainingImplementation': 'http://3s-static.hisense.com/wechat/1/14722429883/1653961356509_d4a5ac29b0e6475e8403cf9212ed1194.png', // 培训实施
    },
    examTypeOption: [], // 考核类型选择列表
  }
  methods = {
    // 添加申诉
    addAppeal(){
      this.formData.push({
        examType: {
          id: '',
          name: ''
        }, // 考核类型
        gapReduction: '', // 申诉减免缺口
        reasonExplanation: '', // 申诉原因
        fileList: [], // 证明文件
        gapAfterComplaintNum: 0, // 申诉后缺口
        actualAssessmentAmount: 0, // 实际考核金额
      })
    },

    // 删除申诉
    delAppeal(event){
      let { index } = event.currentTarget.dataset
      this.formData.splice(index, 1)
      this.$apply()
    },

    // 弹出弹框
    handleComplaintReasonPop(event){
      let { title, index } = event.currentTarget.dataset
      this.popupTitle = title
      this.selectIndex = index
      this.complaintReasonPopShow = true
    },

    // 改变考核类型
    chooseExamType(item){
      let identicalItem = this.formData.filter(itm => item.id == itm.examType.id)
      if(identicalItem.length>0){
        $Toast.fail('每个类型只能添加一次');
        return false;
      }
      this.formData[this.selectIndex].examType.id = item.id
      this.formData[this.selectIndex].examType.name = item.name
      this.formData[this.selectIndex].actualAssessCount = item.actualAssessCount // 缺口数
      this.formData[this.selectIndex].standardPrice = item.standardPrice // 标准单价
      this.formData[this.selectIndex].gapReduction = ''
      this.formData[this.selectIndex].gapAfterComplaintNum = ''
      this.formData[this.selectIndex].actualAssessmentAmount = ''
      this.complaintReasonPopShow = false
      this.$apply()
    },

    // 关闭弹框
    onComplaintReasonPopClose(){
      this.complaintReasonPopShow = false
    },

    // 改变申诉减免缺口
    ongapReductionChange(event){
      let { index } = event.currentTarget.dataset
      if(event.detail > this.formData[index].actualAssessCount){
        $Toast.fail('申诉减免缺口需小于缺口数');
        this.formData[index].gapReduction = ''
      }else{
        this.formData[index].gapReduction =  event.detail
      }

      // 申诉后缺口 = 缺口数 - 申诉减免缺口
      this.formData[index].gapAfterComplaintNum = this.formData[index].actualAssessCount - this.formData[index].gapReduction

      // 实际考核金额 = 申诉后缺口 * 标准单价
      this.formData[index].actualAssessmentAmount = this.formData[index].gapAfterComplaintNum * this.formData[index].standardPrice

      this.$apply()
    },

    // 改变原因说明
    onReasonExplanationChange(event){
      let { index } = event.currentTarget.dataset
      this.formData[index].reasonExplanation =  event.detail
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
          let salesInfo = this.data.formData
          let salesInfoCommit = []
          salesInfoCommit = salesInfo.map((item)=>{
            let fileIds = item.fileList.map((itm)=>{
              return itm.id
            })
            let obj = {
              id: item.examType.id, // 考核类型id
              appealDecreaseCount: item.gapReduction, // 申诉减免缺口
              appealReason: item.reasonExplanation, // 申诉原因
              appealFile: fileIds.toString(), // 文件id
            }
           return obj
          })

          let param = {
            id: this.currId,
            appealList: salesInfoCommit,
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
      const salesInfo = this.data.formData
      if(salesInfo && salesInfo.length>0){
        let tip = this.isEmpty(salesInfo)
        if(tip){
          Toast.fail(tip)
          return false
        }
      }else{
        Toast.fail('请先添加申诉')
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

    // 预览图片
    previewSqs(event) {
      // 拿到图片的地址url
      let { src, index } = event.currentTarget.dataset;
      index = 0
      let imgList = []; //定义一个放图片的数组
      // 循环模拟数据的数组取其中的图片字段，将其添加到imgList数组中
      let fileList = this.orderDetail.appealList[index].attaches
      for (let i = 0; i < fileList.length; i++) {
        imgList.push(fileList[i].url);
      }
      // 调用微信小程序预览图片的方法
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
    },

    //删除图片
    deleteImg(event) {
      let { index } = event.currentTarget.dataset
      this.formData[index].fileList.splice(event.detail.index, 1)
    },

    //上传图片
    afterRead(event) {
      let { index } = event.currentTarget.dataset
      this.selImg(event.detail.file.path, index)
    },

  }
  isEmpty(arr){
    // 1、如果是市场跑动类型的通知单。申诉原因显示，申诉原因、申诉减免缺口必填；原因说明非必填
    // 2、如果不是市场跑动类型的。申诉原因不显示，申诉减免缺口必填；原因说明必填
    for(let i=0;i<arr.length;i++){
      if (!arr[i].examType.id) {
        return `第${i+1}条商家申诉 考核类型 不能为空`
      }

      if (!arr[i].gapReduction) {
        return `第${i+1}条商家申诉 申诉减免缺口 不能为空`
      }

      if (!arr[i].reasonExplanation) {
        return `第${i+1}条商家申诉 申诉原因 不能为空`
      }
    }
    return false
  }

  //选择照片
  selImg(path, index) {
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
          that.formData[index].fileList.push(obj)

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
        Toast.fail(payload.text)
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

        if(data && data.data){
          this.orderDetail = data.data

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

          // 表格列表
          if(this.orderDetail.details && this.orderDetail.details.length>0){
            this.tableData.td =this.orderDetail.details.map((item, index)=>{
              return {
                index: index, // 序号
                shopTypeName: item.shopTypeName, // 品类
                proportion: item.proportion, // 比例
                deductionAmount: item.deductionAmount, // 扣除金额
                capitalize: item.capitalize, // 大写
              }
            })
          }

          if(this.orderDetail.noticeList && this.orderDetail.noticeList.length>0){
            this.examTypeOption = this.orderDetail.noticeList.map((item)=>{
              return {
                ...item,
                id: item.id,
                name: item.noticeTypeName
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
