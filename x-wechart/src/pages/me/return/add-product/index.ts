import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { clone, split } from 'ramda';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import Dialog from '@/components/vant/dialog/dialog';
import { fillZero, } from '@/utils/index';

interface Data {
  calendarShow: boolean,
  productIndex: number,
  errorMessage: object,
  productList: any[],
  productNameVisible: boolean,
  productNameList: any[],
  submitMessage: string,
}

const productInit = {
  productModel: '',
  materialName: '',
  productName: '',
  productColor: '',
  organizationCode: '',
  organizationName: '',
  checkDate: '',
  machineNum: '',
  crmCode: '',
  remarks: '',
}
const keyMap = {
  productModel: 'maktlCode',
  materialName: 'maktlName',
  organizationName: 'orgName',
  organizationCode: 'organizationCode',
}

@connect({
  baseInfo({ applyreturn }) {
    return applyreturn.baseInfo
  },
}, {

})
export default class ReturnAddProduct extends wepy.page {
  config = {
    navigationBarTitleText: '添加产品',
    usingComponents: {
      'van-notice-bar': '../../../../components/vant/notice-bar/index',
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'van-field': '../../../../components/vant/field/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-dialog': '../../../../components/vant/dialog/index',
      'van-button': '../../../../components/vant/button/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-datetime-picker': '../../../../components/vant/datetime-picker/index',
      'van-search': '../../../../components/vant/search/index',
      'van-row': '../../../../components/vant/row/index',
      'van-col': '../../../../components/vant/col/index',
      'calendar': '../../../../components/calendar/index',
    },
  };
  data: Data = {
    calendarShow: false,
    productIndex: 0,
    errorMessage: {
      rowpassword: '',
      password: '',
      npassword: '',
    },
    productList: [
      { ...productInit },
    ],
    productNameVisible: false,
    productNameList: [],
    submitMessage: '',
  }

  // 页面内交互写在methods里
  methods = {
    onSubmitForm(e) {
      this.submitForm()
    }
    onClearError(column) {
      this.errorMessage = { ...this.errorMessage, [column]: '' }
    }
    onInputChange(e) {
      const { productIndex, columnName } = e.target.dataset
      this.productIndex = productIndex
      const productListNew = [...this.productList]
      productListNew[productIndex][columnName] = e.detail
      this.productList = productListNew
    }
    onRemoveProductLine(productIndex) {
      const productListNew = [...this.productList]
      productListNew.splice(productIndex, 1)
      if(productListNew.length === 0) {
        productListNew.push({ ...productInit })
      }
      this.productList = productListNew
    }
    onAddProductLine() {
      const productListNew = [...this.productList]
      productListNew.push({ ...productInit })
      this.productList = productListNew
    }
    onToggleProductName(e) {
      const { productIndex } = e.target.dataset
      if(productIndex !== this.productIndex) {
        this.productIndex = productIndex
        this.productNameList = []
      }
      this.toggleProductName()
    }
    async onProductModelSearch(event) {
      const term = event.detail
      const productNameList = await request({ api: '/product/getDefevtivePro.nd', data: { term }})
      this.productNameList = productNameList
      this.$apply()
    }
    onSelectProductName(productName) {
      const productListNew = this.productList.slice()
      productListNew[this.productIndex].productName = productName
      this.productList = productListNew
      this.toggleProductName()
    }
    // 选择日期
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { productIndex } = e.target.dataset
      this.productIndex = productIndex
      this.$wxpage.calendar.enableArea([minDate, maxDate]);
      if(this.productList[this.productIndex].checkDate) {
        const dates = split('-', this.productList[this.productIndex].checkDate);
        this.$wxpage.calendar.jump(dates[0], parseInt(dates[1], 10), parseInt(dates[2], 10));
      }
      this.calendarShow = true;
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      const productListNew = clone(this.productList)
      productListNew[this.productIndex].checkDate = day
      this.productList = productListNew
      this.calendarShow = false;
    },
  }
  async submitForm() {
    if(!this.checkForm(this.productList)) {
      return
    }
    const { fileFlag, returnAddressId, returnAdr, rebackCode, reback, proposerName, proposerTel, organizationCode, type, isConfirm } = this.baseInfo
    const form = { fileFlag, returnAddressId, returnAdr, rebackCode, reback, proposerName, proposerTel, organizationCode, type, file1: '' }
    if(isConfirm) {
      form.isConfirm = isConfirm
    }
    const fromString = []
    this.productList.forEach(product => {
      Object.keys(product).forEach(key => {
        fromString.push({ name: key, value: ['productModel', 'materialName', 'organizationCode', 'organizationName'].includes(key) ? this.baseInfo[keyMap[key]] : product[key] })
      })
    })
    form.fromString = JSON.stringify(fromString)
    this.reSubmitForm(form)

  }
  async reSubmitForm(form) {
    const result = await request({ api: '/defectiveProduct/submissionInfo.nd', method: 'POST', data: form });
    if(result.flag) {
      if(!result.message) {
        Toast.success( {
          message: '提交退货信息成功',
          onClose: () => {
            wx.navigateBack({ delta: 2 })
          }
        })
        return
      }
      Dialog.confirm({
        message: result.message,
      }).then(() => {
        // on confirm
        this.reSubmitForm({ ...form, isConfirm: true })
      }).catch(() => {
        // on cancel
      });
    }
    if(!result.flag) {
      Toast.fail(result.message)
      return
    }
  }
  toggleDatePopup() {
    this.identifyDateVisible = !this.identifyDateVisible
  }
  toggleProductName() {
    this.productNameVisible = !this.productNameVisible
  }
  checkForm(productList) {
    let status = true
    for(let i = 0; i < productList.length; i++) {
      const index = i + 1
      const { productModel, materialName, productName, productColor, organizationCode, organizationName, checkDate, machineNum, crmCode, remarks, } = productList[i]
      if(!productName) {
        status = false
        Toast.fail(`请填写第${index}个产品的产品型号`)
        break;
      }
      if(!machineNum) {
        status = false
        Toast.fail(`请填写第${index}个产品的机号`)
        break;
      }
      if(machineNum.length !== 23) {
        status = false
        Toast.fail(`第${index}个产品的机号有误，必须是23位`)
        break;
      }
    }
    return status
  }
  onLoad() {
  }
}
