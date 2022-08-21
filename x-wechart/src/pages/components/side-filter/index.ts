import wepy from 'wepy';
import {fillZero, quickDateInterval} from "@/utils/index";
import utilsWxs from '../../../wxs/utils.wxs';

/**
* sideFilterForm入参格式参考
 formData: [
 { // 输入框
    key: 'company', // 非必要，以下对象同理（方便赋值可以参考专卖店活动调用组件）
    label: '分公司',
    value: '',
    placeholder: '请输入分公司',
    type: 'field'
  },
 { // 下拉框单选
    label: '行政分类',
    value: '', // id
    name: '', // 名称
    placeholder: '请选择行政分类',
    type: 'select',
    multiple: false, // 是否多选 默认false
    isSearch: false, // 是否可搜索 默认false
    isNotAll: false, // 是否不显示搜全部 默认false，false为搜全部；true不可搜全部
    options: [{id:1,value:'状态1'},{id:2,value:'状态2'},{id:3,value:'状态3'}],
  },
 { // 下拉框多选
    label: '专卖店类别',
    value: [], // id
    name: [], // 名称
    placeholder: '请选择专卖店类别',
    type: 'select',
    multiple: true,
    options: [{id:1,value:'类别1'},{id:2,value:'类别2'},{id:3,value:'类别3'}],
  },
 { // 起始结束日期,年月日
    label: '时间',
    startDate: '', // 开始时间
    endDate: '', // 结束时间
    placeholderStart: '请选择开始时间',
    placeholderEnd: '请选择结束时间',
    type: 'date',
  },
 { // 年月日期
    key: 'timeStart',
    label: '时间',
    value: '',
    placeholder: '请选择时间',
    type: 'yearMonth'
  },
 { // 日期快速筛选
    key: 'dateInterval',
    label: '快速筛选日期区间',
    value: '',
    name: '',
    type: 'quickDate',
  },
 ],
* */

export default class extends wepy.component {
  config = {
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-popup': '../../../components/vant/popup/index',
      'calendar': '../../../components/calendar/index',
      "van-datetime-picker": "../../../components/vant/datetime-picker/index",
      'van-field': '../../../components/vant/field/index',
      'van-search': '../../../components/vant/search/index',
    },
  };
  props = {
    drawerTopHeight: { // 侧边弹框paddingTop
      type: String,
      default: '96'
    },
    sideFilterForm: { // 侧边弹框form表单
      type: Array,
      default: [],
    },
  }
  wxs = {
    utils: utilsWxs,
  };
  // 监听器
  watch = {
    sideFilterForm: function (newVal, oldVal) {
      let formData = JSON.parse(JSON.stringify(newVal))
      if(this.currIndex !== ''){
        if(formData[this.currIndex] && formData[this.currIndex].isSearch){ // 监听sideFilterForm值如果有isSearch属性，搜索关键字后需重新给列表赋值
          this.selectOptions = JSON.parse(JSON.stringify(formData[this.currIndex].options))
          if(!formData[this.currIndex].multiple && !formData[this.currIndex].isNotAll){ // 只有单选列表加全部
            let defaultObj = { id:'', value:'全部' }
            this.selectOptions.unshift(defaultObj)
          }
        }
      }
      this.$apply()
    }
  }
  data = {
    calendarConfig: { // 日历配置
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    agentPopup: false, // 单选、多选 选择列表弹框显示隐藏
    popupTitle: '', //单选、多选 选择列表弹框标题
    selectOptions: [], // 单选、多选 选择列表
    currIndex: '', // formData下标
    calendarShow: false,
    currentDateName: '',
    formData: [],
    yearsVisable: false, // 年月日期是否显示
    maxDate: new Date(2100, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(2000, 10, 1).getTime(),
    searchStr: '',
    quickFilterDateOption: [
      {id: '', value: '全部'},
      {id: 'lastWeek', value: '最近一周'},
      {id: 'lastMonth', value: '最近一个月'},
      {id: 'lastThreeMonths', value: '最近三个月'},
      {id: 'lastHalfYear', value: '最近半年'},
    ]
  };

  // 页面内交互写在methods里
  methods = {
    // 关闭选择框
    closeAgentPopup(){
      this.agentPopup = false
    },

    // 打开选择框
    selectagentPopup: (e) => {
      const {dataset: { popuptitle, index }} = e.currentTarget
      this.searchStr = ''
      this.currIndex = index
      this.selectOptions = JSON.parse(JSON.stringify(this.formData[index].options))
      if(!this.formData[index].multiple && !this.formData[this.currIndex].isNotAll){ // 只有单选列表加全部
        let defaultObj = { id:'', value:'全部' }
        this.selectOptions.unshift(defaultObj)
      }
      this.popupTitle = popuptitle
      this.agentPopup = !this.agentPopup
      this.$apply()
    },

    // 筛选列表可搜索并重新赋值
    onSearch(e){
      const {dataset: { key }} = e.currentTarget
      let searchValue = e.detail
      this.searchStr = searchValue
      let obj = {
        key: key,
        searchValue: searchValue,
      }
      this.$emit('onSideSearch', obj)
    },

    // 单选、多选修改赋值
    selectChangeFilterStatus: (e) => {
      const { item } = e.currentTarget.dataset
      let index = this.currIndex
      if(this.formData[index].multiple){ // 多选
        let oIndex = this.formData[index].value.indexOf(item.id)
        if (oIndex > -1) {
          this.formData[index].value.splice(oIndex, 1)
          this.formData[index].name.splice(oIndex, 1)
        } else {
          this.formData[index].value.push(item.id)
          this.formData[index].name.push(item.value)
        }
      }else{ // 单选
        this.formData[index].value = item.id
        this.formData[index].name = item.value
        this.agentPopup = false
      }
      this.onFormDataChange()
      this.$apply()
    },

    // 输入框修改赋值
    onFieldChange(e) {
      const {dataset: { index }} = e.currentTarget
      let value = e.detail
      this.currIndex = index
      this.formData[index].value = value
      this.onFormDataChange()
      this.$apply()
    },

    // 日期快速筛选
    onChangeQuickDate(e){
      const {dataset: { index, item }} = e.currentTarget
      this.formData[index].value = item.id
      this.formData[index].name = item.value
      this.formData[index].startDate = item.startDate
      this.formData[index].endDate = item.endDate
      this.onFormDataChange()
    },

    // 打开日历
    openCalendar(e) {
      const {dataset: { index, name }} = e.currentTarget
      this.currIndex = index
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDate, endDate } = this.formData[index];
      this.currentDateName = name
      let begin, end;
      begin = startDate
      end = endDate

      if (name.indexOf('startDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('endDate') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },

    // 关闭日历
    closeCalendar() {
      this.calendarShow = false;
    },

    // 清空已选日期
    clearCalendar(e) {
      const {dataset: { index, name }} = e.currentTarget
      this.formData[index] = { ...this.formData[index], [name]: '' }
      this.onFormDataChange()
    },

    // 选择日期
    chooseDay(evt) {
      let index = this.currIndex
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.formData[index] = { ...this.formData[index], [this.currentDateName]: day }
      this.calendarShow = false;
      this.onFormDataChange()
    },

    // 打开年月日历
    selectYearMonthPopup(e){
      const {dataset: { index, name }} = e.currentTarget
      this.currIndex = index
      this.currentDateName = name
      this.yearsVisable = true
      this.$apply()
    },

    // 选择年月日历
    onInput(e: { detail: any; }) {
      this.currentDate = e.detail
    },

    // 年月日历确定
    onConfirm(e: { detail: string; }) {
      let date = new Date(parseInt(e.detail))
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      this.formData[this.currIndex] = { ...this.formData[this.currIndex], value: Y + '-' + M }
      this.yearsVisable = false
      this.onFormDataChange()
    },

    // 年月日历取消
    onCancel() {
      this.yearsVisable = false
    },

    // 筛选确定
    onSubmitFilterForm() {
      this.$emit('handleConfirm', {
        sideFilterForm: this.formData,
      })
    },

    // 筛选重置
    onResetFilterForm() {
      this.formData = this.formData.map((item)=>{
        if(item.type === 'field'){
          item.value = ''
        }
        if(item.type === 'select' && !item.multiple){
          item.value = ''
          item.name = ''
        }
        if(item.type === 'select' && item.multiple){
          item.value = []
          item.name = []
        }
        if(item.type === 'date'){
          item.startDate = ''
          item.endDate = ''
        }
        if(item.type === 'yearMonth'){
          item.value = ''
        }
        if(item.type === 'quickDate'){
          item.value = ''
          item.name = ''
        }
        return item
      })
      this.currIndex = ''
      this.onFormDataChange()
      this.$apply()
    },
  };
  onFormDataChange(){
    let obj = {
      currIndex: this.currIndex,
      sideFilterForm: this.formData,
    }
    this.$emit('onFormDataChange', obj)
  }
  onLoad(){
    this.formData = this.sideFilterForm
    this.$apply()
  }

}
