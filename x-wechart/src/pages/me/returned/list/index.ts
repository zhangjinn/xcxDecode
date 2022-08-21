import wepy from 'wepy';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import emptyDataType from "@/components/empty-data-type/index";

interface Data {
  statusLabel: string,
  statusVisible: boolean,
  filterVisible: boolean,
  commentVisible: boolean,
  dateVisible: boolean,
  currentDateName: string,
  currentDate: number,
  totalPages: number,
  filterForm: object,
  statusList: any[],
  returnedList: any[],
  formatter: any,
}

export default class Returned extends wepy.page {
  config = {
    navigationBarTitleText: '退换货查询',
    usingComponents: {
      'van-button': '../../../../components/vant/button/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-field': '../../../../components/vant/field/index',
      "van-toast": "/components/vant/toast/index",
      'van-picker': '../../../../components/vant/picker/index',
    },
  };
  components = {
    emptyDataType,
  };
  data: Data = {
    statusLabel: '未选择',
    statusVisible: false,
    filterVisible: false,
    totalPages: 1,
    filterForm: {
      pageNo: 1,
      dealState: '',
      serialCode: '',
      productName: '',
    },
    statusList: [
      { value: '', text: '未选择' },
      { value: 0, text: '待处理' },
      { value: 1, text: '已处理' },
    ],
    returnedList: [],
  }

  // 页面内交互写在methods里
  methods = {
    onToggleStatus() {
      this.toggleStatus()
    }
    onChangeStatus(event) {
      const { picker, value, index } = event.detail;
      this.statusLabel = value.text
      this.filterForm = { ...this.filterForm, pageNo: 1, dealState: value.value }
      this.toggleStatus()
      this.getReturnedList()
    }
    onToggleFilter() {
      this.toggleFilter()
    }
    onGetReturnedListNext(event) {
      if(this.totalPages > this.filterForm.pageNo) {
        this.filterForm = { ...this.filterForm, pageNo: this.filterForm.pageNo + 1 }
        this.getReturnedList('concat')
      }
    }
    onSubmitFilterForm(event) {
      this.filterForm = { ...this.filterForm, ...event.detail.value, pageNo: 1 }
      this.toggleFilter()
      this.getReturnedList()
    }
  }
  toggleStatus() {
    this.statusVisible = !this.statusVisible
  }
  toggleFilter() {
    this.filterVisible = !this.filterVisible
  }
  async getReturnedList(type: undefined) {
    Toast.loading({
      message: '正在加载',
      duration: 0
    })
    const result = await request({ api: '/defectiveProduct/defectiveStateInit.nd', data: this.filterForm })
    const { totalPages, dpList } = result
    this.totalPages = totalPages
    if(type) {
      this.returnedList = this.returnedList.concat(dpList)
    } else {
      this.returnedList = dpList
    }
    Toast.clear()
    this.$apply();
  }
  onLoad() {
    this.getReturnedList()
  }
}
