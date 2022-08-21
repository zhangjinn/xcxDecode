import wepy from 'wepy';
import { request, baseUrl,  } from '@/utils/request';
import { formatImg, fillZero, } from '@/utils/index';
import Toast from '@/components/vant/toast/toast';
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  baseUrl: string,
  filterVisible: boolean,
  commentVisible: boolean,
  calendarShow: boolean,
  currentDateName: string,
  currentDate: number,
  totalPages: number,
  filterForm: object,
  commentList: any[],
  comment: object,
  calendarConfig: object,
}

export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '我的评价',
    usingComponents: {
      'van-card': '../../../components/vant/card/index',
      'van-button': '../../../components/vant/button/index',
      "van-toast": "../../../components/vant/toast/index",
      'van-popup': '../../../components/vant/popup/index',
      'van-rate': '../../../components/vant/rate/index',
      'van-field': '../../../components/vant/field/index',
      'calendar': '../../../components/calendar/index',
      'img': '../../../components/img/index'
    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {
    baseUrl: baseUrl,
    filterVisible: false,
    commentVisible: false,
    calendarShow: false,
    currentDateName: '',
    currentDate: new Date().getTime(),
    totalPages: 1,
    filterForm: {
      erpOrderNum: '',
      orderNum: '',
      beginDate: '',
      endDate: '',
    },
    commentList: [],
    comment: {},
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
  }

  // 页面内交互写在methods里
  methods = {
    onToggleFilter() {
      this.toggleFilter()
    }
    onToggleComment(e) {
      const { comment } = e.target.dataset
      this.comment = comment
      this.toggleComment()
    }
    onGetCommentListNext(event) {
      if(this.totalPages > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1 }
        this.getCommentList('concat')
      }
    }
    onSubmitFilterForm(event) {
      this.filterForm = { ...this.filterForm, ...event.detail.value }
      this.toggleFilter()
      this.getCommentList()
    }
    onNavigateToOrderDetail(e) {
      const { id } = e.target.dataset
      wx.navigateTo({ url: `/pages/me/order-detail/index?id=${id}`})
    },
    // 选择日期
    openCalendar(name) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { beginDate, endDate } = this.filterForm;
      this.currentDateName = name
      if(name.indexOf('eginDate') > -1) {
        this.$wxpage.calendar.enableArea([minDate, endDate ? endDate : maxDate]);
      }
      if(name.indexOf('ndDate') > -1) {
        this.$wxpage.calendar.enableArea([beginDate ? beginDate : minDate, maxDate]);
      }
      this.calendarShow = true;
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.filterForm = { ...this.filterForm, [this.currentDateName]: day }
      this.calendarShow = false;
    },
  }
  toggleFilter() {
    this.filterVisible = !this.filterVisible
  }
  toggleComment() {
    this.commentVisible = !this.commentVisible
  }
  async getCommentList(type) {
    // 后端获取评价列表
    Toast.loading({
      message: '正在加载',
      duration: 0
    })
    const result = await request({ api: '/orderEvaluation/orderEvaluationList.nd', data: this.filterForm })
    const { totalPages, orderList } = result
    this.totalPages = totalPages;
    (orderList || []).forEach(({items}) => {
      (items || []).forEach((item) => {
        if (item.img) {
          const imgs = item.img.split('/')
          item.img = formatImg({
            format: imgs[2],
            name: imgs[3],
            materialId: imgs[0],
            itemId: imgs[1]
          })
        }
        if (item.defaultImg) {
          const imgs = item.defaultImg.split('/')
          item.errImg = formatImg({
            name: imgs[imgs.length - 1]
          })
        }
      })
    })
    if(type) {
      this.commentList = this.commentList.concat(orderList)
    } else {
      this.commentList = orderList
    }
    Toast.clear()
    this.$apply()
  }
  onLoad() {
    this.getCommentList()
  }
}
