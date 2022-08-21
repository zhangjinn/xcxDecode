import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { trim, subtract } from 'ramda';
import { Weapp } from 'definitions/weapp';
import { formatMobile } from '@/utils/index';
import Toast from '@/components/vant/toast/toast';

import {
  sendMsg,
  checkMsg,
  getCancellationReason,
  applyCancelAccount,
} from '@/store/actions/user';

interface Data {
  noticeChecked: boolean;
  stepStatus: string;
  mobile: string;
  code: string;
  verifyCode: boolean;
  timer: number;
  timerEl: any;
  reasonRadio: string;
  reasonRadioList: any[];
  reasonText: string;
}

@connect({}, {
  sendMsg,
  checkMsg,
  getCancellationReason,
  applyCancelAccount,
})
export default class MobileLogin extends wepy.page {
  config = {
    navigationBarTitleText: '账户注销',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-button': '../../../../components/vant/button/index',
      'van-dialog': '../../../../components/vant/dialog/index',
      'van-field': '../../../../components/vant/field/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-checkbox': '../../../../components/vant/checkbox/index',
      'van-radio': '../../../../components/vant/radio/index',
      'van-radio-group': '../../../../components/vant/radio-group/index',
    },
  };
  data: Data = {
    noticeChecked: false, // 注销须知是否选中
    stepStatus: '1', // 申请注销账户第几步；1->申请注销信天翁账号；2->申请人身份验证；3->注销原因；4->注销确认；5->申请注销完成; notice->阅读须知；
    mobile: '', // 短信验证码发送手机号
    code: '', // 用户输入的短信验证码
    verifyCode: false, // 是否获取到验证码
    timer: 60, // 短信验证码倒计时
    timerEl: '', // 定时器
    reasonRadio: '', // 注销原因
    reasonRadioList: [], // 原因列表
    reasonText: '', // 手动输入注销原因
  };
  methods = {
    // 查看注销须知
    cancellationNotice(){
      this.stepStatus = 'notice'
      this.$apply()
    },

    // 注销须知已阅读并同意
    readAndAgree(){
      this.stepStatus = '1'
      this.noticeChecked = true
      this.$apply()
    },

    // 勾选同意注销须知
    onChange(event) {
      this.noticeChecked = event.detail
      this.$apply()
    },

    // 切换至短信验证
    toSMSVerification(){
      this.stepStatus = '2'
      this.$apply()
    },

    // 修改验证码
    onCodeChange(event: Weapp.Event) {
      this.code = trim(event.detail);
      this.$apply()
    },

    // 清空验证码
    clearCode() {
      this.code = '';
      this.$apply()
    },

    // 发送验证码
    getSmsCode() {
      if (this.timer === 60){
        this.methods.sendMsg({
          type: 'applyCancelAccount'
        }).then((res)=>{
          const {code, msg } = res.payload
          if (code == '0') {
            this.verifyCode = true
            const { accountInfo }=JSON.parse(wx.getStorageSync('b2b_token'))
            this.mobile = formatMobile(accountInfo.mobile)
            this.startTimer();
          } else {
            this.verifyCode = false
            Toast.fail(msg);
          }
          this.$apply()
        })
      }
    },

    // 切换至注销原因
    toCancellationReason: () => {
      if(!this.verifyCode){
        Toast.fail('请先获取验证码！')
        return
      }
      let param = {
        type: 'applyCancelAccount', // 类型申请注销账号 applyCancelAccount  固定参数。
        code: this.code,
      }
      this.methods.checkMsg(param).then((result)=>{
        const { code } = result.payload
        if(code == 0){
          this.stepStatus = '3'
          this.methods.getCancellationReason().then((res)=>{
            const { list } = res.payload
            this.reasonRadioList = list
            if(this.reasonRadioList && this.reasonRadioList.length>0){
              this.reasonRadio = this.reasonRadioList[0].code
            }
            this.$apply()
          })
        }else{
          Toast.fail('您输入的验证码有误！')
        }
      })
    },

    // 修改单选选项注销原因
    onReasonRadioChange(event){
      this.reasonRadio = event.detail
      this.$apply()
    },

    // 修改输入框注销原因
    onReasonTextChange(event){
      this.reasonText = event.detail
      this.$apply()
    },

    // 提交注销原因，此步骤不做任何处理，直接切换至注销确认
    submitCancelReason(){
      this.stepStatus = '4'
      this.$apply()
    },

    // 注销确认
    submitConfirmation(){
      let reasonObj = this.reasonRadioList.find((item)=> item.code == this.reasonRadio)
      let reason = ''
      if(reasonObj.name && this.reasonText){
        reason = reasonObj.name + ',' + this.reasonText // 选中的原因名称 逗号 手动输入的原因
      }else if(reasonObj.name && !this.reasonText){
        reason = reasonObj.name
      }else if(!reasonObj.name && this.reasonText){
        reason = this.reasonText
      }else{
        reason = ''
      }
      let param = {
        code: this.code, // 短信验证码
        reason: reason, // 申请原因，都是汉字，选其他用输入框的信息
      }
      Toast.loading({ forbidClick: true, message: '申请中...', duration: 0 });
      this.methods.applyCancelAccount(param).then((res)=>{
        Toast.clear()
        const {code, msg} = res.payload
        if (code == '0') {
          this.stepStatus = '5'
          this.$apply()
        } else {
          Toast.fail(msg);
        }
      })
    },

    // 返回首页
    goBackHome(){
      wx.reLaunch({
        url: '/pages/main/home/index'
      })
    }
  };
  startTimer() {
    this.timerEl = setInterval(() => {
      this.timer = subtract(this.timer, 1);
      if (this.timer === 0) {
        this.timer = 60;
        this.verifyCode = false
        clearInterval(this.timerEl);
      }
      this.$apply();
    }, 1000);
  }
  onUnload() {
    if (this.timerEl) {
      clearInterval(this.timerEl);
    }
  }

}
