import wepy from 'wepy';
import {connect} from 'wepy-redux';
import { getToBeAnsweredQuestion, getAnsweredQuestionList } from '@/store/actions/service-comment';
import {fillZero, modifyUrl} from '@/utils/index';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  visible: boolean;
  calendarShow: boolean;
  filterForm: object;
  calendarConfig: object;
  currentDateName: string;
  scrollTop: number;
  headerTabList: any[];
}

@connect({
  orderList({serviceComment}) {
    return serviceComment.orderList
  },

}, {
  getToBeAnsweredQuestion,
  getAnsweredQuestionList,
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '调研问卷',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'calendar': '../../../components/calendar/index',
    },
  };
  components = {
    emptyDataType,
    headerTab,
  };
  data: Data = {
    visible: false,
    calendarShow: false,
    currentDateName: '',
    scrollTop: -1,
    filterForm: {
      terms: {
        status: '0',
        startDate: '',
        endDate: '',
        title: '',
      },
      page: {
        pageNo: 1,
        pageSize: 10,
      },
    },
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    headerTabList: [
      { name: '待答问卷', type: '0', selectValue: '' },
      { name: '已答问卷', type: '1', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  };

  // 页面内交互写在methods里
  methods = {

    // 跳转到调研作答
    viewDetail: (item: any) => {
      let { terms } = this.filterForm
      if (item) {
        let url = ''
        if(terms.status == '0'){ // 提交答题
          let questionId = item.id
          let account = wepy.$instance.globalData.account
          url = `${wepy.$appConfig.baseUrl}/questionnaire/answer?questionId=${questionId}&account=${account}&source=XCX&xcxFromCode=1`
          console.log(url)
        }else{// 查看答题
          let relationId = item.relationId
          url = `${wepy.$appConfig.baseUrl}/questionnaire/checkAnswer?questionId=${relationId}`
        }
        url = modifyUrl(url)
        const urlStr = encodeURIComponent(url);
        let jumpUrl = `/pages/me/webview/index?url=${urlStr}&postName=调研问卷答题列表`
        wx.navigateTo({
          url: jumpUrl
        })
      }
    },

    // 选择快捷筛选内容列表
    onSelectStatus(tabItem) {
      let status = ''
      if(tabItem){
        status = tabItem.type
      }
      if(!status){
        return
      }
      this.filterForm.terms = { ...this.filterForm.terms, status }
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.headerTabList.forEach((item)=>{
        item.selectValue = ''
        if(item.type == status){
          item.selectValue = status
        }
      })
      this.myGetOrderList()
      // this.methods.scrollToTop()
    },

    // 点击普通筛选按钮-显示或隐藏左侧筛选框
    orderfiltering: () => {
      this.visible = !this.visible
    },

    // 筛选确定
    onSubmitFilterForm() {
      this.filterForm.page = { ...this.filterForm.page, pageNo: 1 }
      this.myGetOrderList()
      this.methods.orderfiltering()
      // this.methods.scrollToTop()
    },

    // 筛选重置
    onResetFilterForm() {
      this.filterForm.terms = {
        ...this.filterForm.terms,
        title: '',
        startDate: '',
        endDate: ''
      }
    },

    // 打开日历
    openCalendar(e) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDate, endDate } = this.filterForm.terms;
      const { name, type } = e.target.dataset
      this.currentDateName = name
      let begin, end;
      if (type === 'date') {
        begin = startDate
        end = endDate
      }
      if (type === 'sapDate') {
        begin = startDate
        end = endDate
      }
      if (name.indexOf('startDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if (name.indexOf('ndDate') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },

    // 关闭日历
    closeCalendar() {
      this.calendarShow = false;
    },

    // 清空已选日期
    clearCalendar(name) {
      this.filterForm.terms = { ...this.filterForm.terms, [name]: '' }
    },

    // 选择日期
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.filterForm.terms = { ...this.filterForm.terms, [this.currentDateName]: day }
      this.calendarShow = false;
    },

    // 改变问卷标题
    onTitleChange(e) {
      this.filterForm.terms = { ...this.filterForm.terms, title: e.detail }
    },

    // 回到顶部
    // scrollToTop: () => {
    //   this.scrollTop = 0
    // },

    // 滚动列表
    // onScroll: (event: Weapp.Event) => {
    //   if (this.scrollTop === 0) {
    //     this.scrollTop = event.detail.scrollTop
    //   }
    // },

    // 列表分页
    // onGetOrderListNext() {
    //   const { count } = this.orderList
    //   let totalPage = Math.ceil(count/this.filterForm.page.pageSize)
    //   if (totalPage > this.filterForm.page.pageNo) {
    //     this.filterForm.page = { ...this.filterForm.page, pageNo: this.filterForm.page.pageNo + 1 }
    //     this.myGetOrderList()
    //   }
    // },

  };

  myGetOrderList() {
    let { terms } = this.filterForm
    let data = {
      title:terms.title,
      startDate:terms.startDate ? terms.startDate.replace(/\-/g,'') : '',
      endDate:terms.endDate ? terms.endDate.replace(/\-/g,'') : '',
    }
    if(terms.status == '0'){
      this.methods.getToBeAnsweredQuestion({ _loading: true, ...data })
    }else{
      this.methods.getAnsweredQuestionList({ _loading: true, ...data })
    }

  }
  onShow() {
    this.myGetOrderList()
  }

}
