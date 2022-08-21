import wepy from 'wepy';
import { connect,getStore} from 'wepy-redux';
import { getcommitQuestion, getMaterialCode, postMineQuestion } from '@/store/actions/consultation';
import Toast from '@/components/vant/toast/toast';
import {RS_CONSULT_LIST} from '@/store/types/consultation'
import { checkEmail } from '@/utils/validators';
import { clone } from 'ramda';

interface Data {
  filterForm: object;
  info: object;
  orgId: number;
  commitQuestion: object;
  ctQuestion: object;

}
const defaultctQuestion = {
    questionType: {
      code: '',
      name: '请选择'
    },
    salesOrg: {
      code: '',
      name: '请选择'
    },
    materialCode: {
      code: '',
      name: '请选择'
    }
}

@connect({

  commitQuestion({ consultation }) {
    return consultation.commitQuestion

  },

  materialCode({ consultation }) {
    return consultation.materialCode
  }
}, {
  // getBaseData,
  postMineQuestion,
  getcommitQuestion,
  getMaterialCode
})


export default class DistributorOrder extends wepy.page {
  config = {
    navigationBarTitleText: '我要提问',
    usingComponents: {
      'van-popup': '../../../components/vant/popup/index',
      "van-toast": "../../../components/vant/toast/index"
    },
  }
  watch = {


  };
  // 声明
  data: Data = {
    orgId: '',
    ctQuestion: {
        questionType: {
          code: '',
          name: '请选择'
        },
        salesOrg: {
          code: '',
          name: '请选择'
        },
        materialCode: {
          code: '',
          name: '请选择'
        }
    },
    form: {
      questionType: '',
      organization: '',
      title: '',
      question: '',
      name: '',
      phone: '',
      department: '',
      email: '',
      account: '',
      materialGroupCode: ''
    },

    popList: [],
    popTitle: '',
    display: false,
    popVisible: false,
    popFiledName: '',
    compareInfo: {},
    color: 1
  }
  watch = {
    form() {
      if ((this.form.materialGroupCode && this.form.organization && this.form.questionType && this.form.phone && this.form.department && this.form.name && this.form.title && this.form.question) != "" && (this.ctQuestion.questionType.name && this.ctQuestion.salesOrg.name && this.ctQuestion.materialCode.name) != "请选择") {
        this.color = 2
      } else {
        this.color = 1
      }
    }
  }

  // 页面内交互写在methods里
  methods = {
    // 应该获取那个值给popList   应该对比那个字段为选中信息
    openChoose: (propName: string, questionType: string, name: string) => {

      let list = this[propName]
      if (!list) {
        list = this.commitQuestion[propName]
      }
      if (list.length === 0) {
        return
      }
      this.popList = list
      this.compareInfo = this.data.ctQuestion[questionType]
      this.popFiledName = questionType
      this.popTitle = name
      this.popVisible = true
    },
    openChooseMa: () => {
      this.display = true
    },
    onClose: () => {
      this.popVisible = false
    },
    onChooseMa: ({ currentTarget }: e) => {
      const { dataset } = currentTarget
      const { index } = dataset
      this.data.ctQuestion["materialCode"] = this.materialCode[index]
      this.display = false
      this.form.materialGroupCode = this.materialCode[index].code
    },
    onCloseMa: () => {
      this.display = false
    },
    onChoose: ({ currentTarget }: e) => {
      const { dataset } = currentTarget
      const { index } = dataset
      const { popFiledName, popList } = this.data

      let oldordcode = this.data.ctQuestion.salesOrg.code

      this.data.ctQuestion[popFiledName] = popList[index]
      // console.log( this.data.ccommitQuestion.questionType)
      this.popVisible = false
      this.data.orgId = this.data.ctQuestion.salesOrg.code
      if (popFiledName == 'questionType') {
        this.form.questionType = popList[index].code
      }

      if (popFiledName == 'salesOrg') {
        this.form.organization = popList[index].code
        if (popList[index].code != oldordcode && oldordcode != '') {
          this.data.ctQuestion.materialCode.name = "请选择"
          this.data.ctQuestion.materialCode.code = ""
          this.form.materialCode = ""
        }
        this.getMaterialCode()
      }
    },
    onNameChange({ detail }: any) {
      this.form.name = detail.value
    },
    onPhoneChange({ detail }: any) {
      this.form.phone = detail.value
    },
    onDepChange({ detail }: any) {
      this.form.department = detail.value
    },
    onEmailChange({ detail }: any) {
      this.form.email = detail.value
    },
    onTitleChange({ detail }: any) {
      this.form.title = detail.value
    },
    onDescChange({ detail }: any) {
      this.form.question = detail.value
    },
    onBtnChange() {

      if(!this.form.name){
        Toast.fail('请输入您的姓名~');
        return
      }
      if(this.form.name.length<2||this.form.name.length>16){
        Toast.fail('姓名长度为2~16');
        return
      }
      if(!this.form.phone){
        Toast.fail('请输入您的电话~');
        return
      }
      const mobileReg = /^1\d{10}$/;
      const telReg = /^\d{3,4}-?\d{7,9}$/;
      if(!mobileReg.test(this.form.phone)&&!telReg.test(this.form.phone)){
        Toast.fail('请填写正确的电话号码~');
        return
      }
      if(!this.form.email) {
        Toast.fail('请填写您的邮箱~');
        return
      }
      if(this.form.email && !checkEmail(this.form.email)) {
        Toast.fail('请填写正确的邮箱~');
        return
      }
      if (this.form.question == "") {
        Toast.fail('请填写您的问题描述~');
        return
      }

      if (this.form.title == "") {
        Toast.fail('请填写您的问题标题~');
        return
      }
      if (this.form.department == "") {
        Toast.fail('请填写您所属部门~');
        return
      }
      if (this.form.questionType == "") {
        Toast.fail('请选择问题分类~');
        return
      }
      if (this.form.organization == "") {
        Toast.fail('请选择供应商~');
        return
      }
      if (this.form.materialGroupCode == "") {
        Toast.fail('请选择物料组~');
        return
      }

      Toast.loading({
        message: '提交中....',
        duration: 0,
      });


      this.methods.postMineQuestion(this.form).then((res: { payload: { code: string; }; }) => {
        if (res.payload.indexOf('success') != -1) {
          Toast.success('提交成功');
          getStore().dispatch({ type: RS_CONSULT_LIST, payload: [] })
          let emptyct=clone(defaultctQuestion)
          this.ctQuestion = emptyct
          this.form={...this.form,questionType:'',organization:'',title:'',question:'',materialGroupCode:''}
          this.$apply();
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/me/my-consultation/list/index`,
            });
          }, 2000);
        } else {
          Toast.fail(res.payload || '提交失败');
        }
      });

    }
  }
  getcommitQuestion() {
    this.methods.getcommitQuestion().then((res) => {
      this.form.account = res.payload.account
      this.form.dept = res.payload.dept
      this.form.email = res.payload.email
      this.form.name = res.payload.name
      this.form.phone = res.payload.phone
      this.$apply()
    })
  }

  getMaterialCode() {
    this.methods.getMaterialCode(this.data.orgId: Number)
  }
  onLoad() {
    this.getcommitQuestion()
  }
  onUnload() {
    getStore().dispatch({ type: RS_CONSULT_LIST, payload: [] })
  }
}
