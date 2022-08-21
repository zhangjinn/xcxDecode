import wepy from 'wepy';
import { getStore } from 'wepy-redux';
import { clone } from 'ramda';
import { request } from '@/utils/request';
import { checkPhone } from '@/utils/validators';
import { SET_RETURN_BASE_INFO } from '@/store/types/index'
import Toast from '@/components/vant/toast/toast';
import { baseUrl } from '@/utils/request'

interface Data {
  userInfo: object,
  errorMessage: object,
  edtVisible: boolean,
  edtList: any[],
  edtListOri: any[],
  orgVisible: boolean,
  orgList: any[],
  maktlVisible: false,
  maktlList: any[],
  reAddressVisible: false,
  reAddressList: any[],
  form: object,
  formExtra: object,
  needPicture: boolean,
}

const stores = getStore()

export default class ReturnBase extends wepy.page {
  config = {
    navigationBarTitleText: '残次品退换',
    usingComponents: {
      'van-button': '../../../../components/vant/button/index',
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'van-field': '../../../../components/vant/field/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-picker': '../../../../components/vant/picker/index',
      'van-search': '../../../../components/vant/search/index',
    },
  };
  data: Data = {
    userInfo: {},
    edtVisible: false,
    edtList: [],
    orgVisible: false,
    orgList: [],
    orgListOri: [],
    maktlVisible: false,
    maktlList: [],
    reAddressVisible: false,
    reAddressList: [],
    form: {
      fileFlag: '',
      file1: '',
      returnAddressId: '',
      returnAdr: '',
      rebackCode: '',
      reback: '',
      proposerName: '',
      proposerTel: '',
      organizationCode: '',
      type: 'handle',
    },
    formExtra: {
      customerName: '',
      orgName: '',
      maktlCode: '',
      maktlName: '',
    },
    errorMessage: {
      orgName: '',
      maktlName: '',
      proposerName: '',
      proposerTel: '',
      returnAdr: '',
      reback: '',

    },
    needPicture: false,
  }

  // 页面内交互写在methods里
  methods = {
    async onSubmitForm(e) {
      const form = { ...this.form, ...this.formExtra, ...e.detail.value }
      if(this.checkForm(form)) {
        stores.dispatch({ type: SET_RETURN_BASE_INFO, payload: { baseInfo: { ...this.form, ...this.formExtra, ...form } } })
        wx.navigateTo({ url: '/pages/me/return/add-product/index'})
      }

    }
    onClearError(column) {
      this.clearError(column)
    }
    onToggleEdt() {
      this.clearError('reback')
      this.toggleEdt()
    }
    onSelectEdt(e) {
      const { text, value } = e.detail.value
      this.form = { ...this.form, rebackCode: value, reback: text }
      this.toggleEdt()
    }
    onToggleOrg() {
      this.clearError('orgName')
      this.toggleOrg()
    }
    onSelectOrg(e) {
      const { text, value } = e.detail.value
      let edtListNew;
      if(value.startsWith('4')) {  // 通信的配送方式多一个
        edtListNew = clone(this.edtListOri)
      } else {
        edtListNew = this.edtListOri.filter(item => item.text.indexOf('通信') === -1)
      }
      let formNew = { organizationCode: value, }
      const rebackCodeOri = this.form.rebackCode
      if(!edtListNew.some(item => item.value === rebackCodeOri)) {
        formNew = { ...formNew, reback: edtListNew[0].text, rebackCode: edtListNew[0].value, }
      }
      this.form = { ...this.form, ...formNew  }
      this.formExtra = { ...this.formExtra, orgName: text }
      // 冰箱需要上传照片
      this.needPicture = value.startsWith('67') ? true : false
      this.edtList = edtListNew
      this.toggleOrg()
      this.getMaktlByOrgCode()
    }
    onToggleMaktl() {
      this.clearError('maktlName')
      this.toggleMaktl()
    }
    onSelectMaktl(e) {
      const { text, value } = e.detail.value
      this.formExtra = { ...this.formExtra, maktlCode: value, maktlName: text }
      this.toggleMaktl()
      this.getReAddressByOrgCode()
    }
    onToggleReAddress() {
      this.clearError('returnAdr')
      this.toggleReAddress()
    }
    onSelectReAddress(reAddress) {
      const { text, value } = reAddress
      this.form = { ...this.form, returnAddressId: value, returnAdr: text }
      this.toggleReAddress()
    }
    onReAddressSearch(event) {
      const value = event.detail
      const reAddressListNew = this.reAddressList.slice()
      reAddressListNew.forEach(item => {
        item.filtered = true
        if(value && item.text.indexOf(value) === -1) {
          item.filtered = false
        }
      })
      this.reAddressList = reAddressListNew
    }
    onAddPicture() {
      const { sessionId, modifySession } = this.$parent.globalData;
      let Cookie;
      if (sessionId || modifySession) {
        Cookie = `JSESSIONID=${sessionId || modifySession}`;
      }
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths[0]
          const that =  this
          wx.uploadFile({
            url: `${baseUrl}/comm/uploadFile.nd`, //仅为示例，非真实的接口地址
            filePath: tempFilePaths,
            header: { Cookie },
            name: 'file1',
            formData: {
              fileFlag: that.form.fileFlag,
              file1: tempFilePaths,
            },
            success: (res) => {
              const { statusCode, data } = res
              const dataJson = JSON.parse(data)
              if(statusCode === 200 && dataJson.flag) {
                Toast.success(`${that.form.file1 ? '重新' : ''}上传图片成功`)
                that.form = { ...that.form , file1: dataJson.fileNameString }
                that.$apply()
              }
            }
          })

        }
      })
    }
  }
  toggleEdt() {
    this.edtVisible = !this.edtVisible
  }
  toggleOrg() {
    this.orgVisible = !this.orgVisible
  }
  toggleMaktl() {
    this.maktlVisible = !this.maktlVisible
  }
  toggleReAddress() {
    this.reAddressVisible = !this.reAddressVisible
  }
  clearError(column) {
    this.errorMessage = { ...this.errorMessage, [column]: '' }
  }
  checkForm(form) {
    let status = true
    const { orgName, maktlName, proposerName, proposerTel, returnAdr, reback } = form
    if(!orgName) {
      status = false
      this.errorMessage = { ...this.errorMessage, orgName: '请选择供应商' }
    }
    if(!maktlName) {
      status = false
      this.errorMessage = { ...this.errorMessage, maktlName: '请选择物料组' }
    }
    if(!proposerName) {
      status = false
      this.errorMessage = { ...this.errorMessage, proposerName: '请输入联系人' }
    }
    if(!proposerTel) {
      status = false
      this.errorMessage = { ...this.errorMessage, proposerTel: '请输入联系电话' }
    }
    if(!returnAdr) {
      status = false
      this.errorMessage = { ...this.errorMessage, returnAdr: '请选择商家地址' }
    }
    if(!reback) {
      status = false
      this.errorMessage = { ...this.errorMessage, reback: '请选择拉货方式' }
    }
    if(!checkPhone(proposerTel)) {
      status = false
      this.errorMessage = { ...this.errorMessage, proposerTel: '请输入正确的联系电话' }
    }
    this.$apply()
    return status
  }
  async getMaktlByOrgCode() {
    const result = await request({ api: '/defectiveProduct/setMaterialCode.nd', data: { orgCode: this.form.organizationCode } })
    const maktlList = !result ? [] : Object.keys(result).map(key => {
      return { value: key, text: result[key] }
    })
    this.maktlList = maktlList
    if(maktlList.length) {
      this.formExtra = { ...this.formExtra, maktlName: maktlList[0].text, maktlCode: maktlList[0].value}
      this.getReAddressByOrgCode()
    } else {
      this.reAddressList = []
    }
    this.clearError('maktlName')
    this.$apply()
  }
  async getReAddressByOrgCode() {
    const result = await request({ api: '/defectiveProduct/getReturnAdd.nd', data: { orgCode: this.form.organizationCode, productModel: this.formExtra.maktlCode }})
    this.reAddressList = !result ? [] : Object.keys(result).map(key => {
      return { value: key, text: result[key], filtered: true }
    })
    this.form = {
      ...this.form,
      returnAdr: this.reAddressList.length ? this.reAddressList[0].text : '',
      returnAddressId: this.reAddressList.length ? this.reAddressList[0].value : '',
    }
    this.clearError('returnAdr')
    this.$apply()
  }
  async getBaseInfo() {
    const result = await request({ api: 'defectiveProduct/submissionInit.nd'})
    const { defectiveProductModel, edtList, orgList, uuid } = result
    this.formExtra = { ...this.formExtra, customerName: defectiveProductModel.customerName }

    const edtListOri = edtList.map(edt => {
      return { text: edt.propertyName, value: edt.propertyValue }
    })
    this.edtListOri = edtListOri
    this.edtList = edtListOri
    this.orgList = orgList.map(org => {
      return { text: org.organizationName, value: org.organizationCode }
    })
    const currentEdt = edtListOri[0]
    this.form = {
      ...this.form,
      fileFlag: uuid,
      proposerName: defectiveProductModel.proposerName,
      proposerTel: defectiveProductModel.proposerTel,
      reback: currentEdt.text,
      rebackCode: currentEdt.value,
    }
    this.$apply()
  }
  onLoad() {
    this.getBaseInfo()
  }
}
