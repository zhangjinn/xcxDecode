import wepy from 'wepy';
import { connect,getStore} from 'wepy-redux';
import { getcommitQuestion, getMaterialCode, postMineQuestion, uploadImg} from '@/store/actions/consultation';
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
  getMaterialCode,
  uploadImg,
})


export default class DistributorOrder extends wepy.page {
  config = {
    navigationBarTitleText: '举报',
    usingComponents: {
      'van-popup': '../../../components/vant/popup/index',
      "van-toast": "../../../components/vant/toast/index",
      "van-uploader": "../../../components/vant/uploader/index"
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
      materialGroupCode: '',
      level: '1', //0:咨询 1:投诉
      businessIds: [],
      fileList: [],
      needPicture: false
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
      this.popVisible = false
      this.data.orgId = this.data.ctQuestion.salesOrg.code
      if (popFiledName == 'questionType') {
        this.form.questionType = popList[index].code
        // 切换分类，重置图片
        if(popList[index].code) {
          this.form.fileList = []
          this.form.businessIds = []
          this.form.needPicture = false
        }
        // 分类为ZBTSSC01-市场秩序时，附件必填
        if(popList[index].code === 'ZBTSSC01' || popList[index].code === 'ZBTSSC04' ||
          popList[index].code === 'ZBTSSC05' || popList[index].code === 'ZBTSSC06' ){
          this.form.needPicture = true
        }else{
          this.form.needPicture = false
        }

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

      if (this.form.needPicture && this.form.fileList.length<2){
        Toast.fail('需提供机型条码照片及整机实景照~');
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
          this.form={...this.form,questionType:'',organization:'',title:'',question:'',materialGroupCode:'',businessIds:[],fileList:[]}
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

    },

    //删除图片
    delImg(event) {
      this.form.fileList.splice(event.detail.index, 1)
      this.form.businessIds.splice(event.detail.index, 1)
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
          'fileType': 'question',
          'file': 'image/jpeg;base64,' + res.data
        }
        that.methods.uploadImg(data).then(res2 => {
          obj.url = res2.payload.url
          obj.id = res2.payload.businessId
          obj.name = res2.payload.fileNameString

          // 上传完成需要更新 fileList
          that.form.businessIds.push(obj.id)
          that.form.fileList.push(obj)

          that.$apply()
        })
      }
    })
  }

  getcommitQuestion(level) {
    this.methods.getcommitQuestion(level).then((res) => {
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
    //1：投诉
    this.getcommitQuestion(1)
  }
  onUnload() {
    getStore().dispatch({ type: RS_CONSULT_LIST, payload: [] })
  }

}
