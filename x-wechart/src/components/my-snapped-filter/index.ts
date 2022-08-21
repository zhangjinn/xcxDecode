import wepy from 'wepy';
import orgMatkl from '@/mixins/user-org-matkl';
import customerInfo from '@/mixins/channel-retail-order';
import { fillZero } from '@/utils/index';
import { connect, getStore } from 'wepy-redux';
import { DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR } from '@/store/types/dmsorder';
import systemMixin from '@/mixins/system';

interface ChooseItem {
  id: number | string;
  name: string;
}

interface Data {
  filterVisible: Boolean;
  chooseOrg: ChooseItem;
  chooseMatkl: ChooseItem;

  // 二级选择信息
  chooseType: string;
  chooseVisible: Boolean;
  compareInfo: ChooseItem;
  chooseTitle: string;
  chooseList: Array<ChooseItem>;

  calendarShow: Boolean; // 日历是否展示
  calendarConfig: Object;

  form: Object;
}

@connect({
  chooseCustomerInfo({ dmsorder }) {
    return dmsorder.chooseCustomerInfo
  },
}, {

})
export default class SnappedFilter extends wepy.component {

  props = {
    currentPage: String,
  };

  data: Data = {
    filterVisible: false,
    chooseOrg: {
      id: '',
      name: '全部'
    },
    chooseMatkl: {
      id: '',
      name: '全部'
    },

    chooseType: '',
    chooseVisible: false,
    compareInfo: {
      id: '',
      name: ''
    },
    chooseTitle: '',
    chooseList: [],

    calendarShow: false,
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },

    form: {
      status: '',
      startDate: '',
      endDate: '',
      activityName: '',
      productModel: '',
    }
  };

  // 打开日历类型| 开始时间.结束时间
  openCalendarType = '';

  mixins = [orgMatkl, customerInfo, systemMixin];

  methods = {
    closeChoose: () => {
      this.chooseVisible = false
    },
    openChoose: (type: string) => {
      this.chooseType = type
      switch (type) {
        case 'org':
          const { organizationList, chooseOrg } = this.data
          this.chooseList = organizationList

          // 只有全部，没有供应商
          if (organizationList.length <= 1) {
            return
          }
          this.compareInfo = chooseOrg
          this.chooseTitle = '供应商'
          break;
        case 'matkl':
          const { chooseOrg, orgMatkl } = this.data

          // 没有产品组列表，不显示
          if (!orgMatkl[`_${chooseOrg.id}`]) {
            return
          }

          this.chooseTitle = '物料组'
          this.chooseList = orgMatkl[`_${chooseOrg.id}`]
          this.compareInfo = this.data.chooseMatkl
          break;
        default:
      }

      this.chooseVisible = true
    },
    onSelect: (item: ChooseItem) => {
      const { chooseType } = this.data
      switch (chooseType) {
        case 'org':
          this.chooseOrg = item
          this.chooseMatkl = {
            id: '',
            name: '全部'
          }
          break;
        case 'matkl':
          this.chooseMatkl = item
          break;
        default:
      }
      this.chooseVisible = false
    },
    closeDrawer: () => {
      this.filterVisible = false
      if (this.data.chooseVisible) {
        this.chooseVisible = false
      }
    },
    openDrawer: () => {
      this.filterVisible = true
    },

    // 选择日期
    openCalendar(e: { target: { dataset: { name: any; }; }; }) {
      const minDate = '1970-01-01'
      const maxDate = '9999-12-31'
      const { startDate, endDate } = this.form
      const { name } = e.target.dataset
      this.openCalendarType = name

      if (name === 'startDate') {
        this.$wxpage.calendar.enableArea([minDate, endDate ? endDate : maxDate]);
      }
      if (name === 'endDate') {
        this.$wxpage.calendar.enableArea([startDate ? startDate : minDate, maxDate]);
      }
      this.calendarShow = true;
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    clearCalendar(name: any) {
      this.form = { ...this.form, [name]: '' }
    },
    chooseDay(evt: { detail: { year: any; month: any; day: any; }; }) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.form = { ...this.form, [this.openCalendarType]: day }
      this.calendarShow = false;
    },

    onZzprdmodelChange: (e: { detail: any; }) => {
      this.form = { ...this.form, activityName: e.detail }
    },
    onModelChange: (e: { detail: any; }) => {
      this.form = { ...this.form, productModel: e.detail }
    },
    onCustomerNameChange: (e: { detail: any; }) => {
      this.form = { ...this.form, custName: e.detail }
    },
    chooseStatus: (status: string) => {
      if (this.form.status === status) {
        status = ''
      }
      this.form = { ...this.form, status, }
    },

    resetSearch: () => {
      this.chooseMatkl = {
        id: '',
        name: '全部'
      }
      this.chooseOrg = {
        id: '',
        name: '全部'
      }
      this.form = {
        status: '',
        startDate: '',
        endDate: '',
        activityName: '',
        productModel: '',
        custName: ''
      }

      const store = getStore()
      store.dispatch({
        type: DMS_ORDER_CHANNAL_OR_RETAIL_CLEAR,
      })
    },
    confirmSearch: () => {
      const { chooseCustomerInfo } = this
      const { chooseMatkl, chooseOrg, form } = this.data
      const filterForm = {
        ...form
      }
      if (filterForm.status === '') {
        delete filterForm['status']
      }
      this.$emit('submitFilter', {
        ...filterForm,
        custName: chooseCustomerInfo.customerCode,
        orgId: chooseOrg.id,
        matkl: chooseMatkl.id,
      })
      this.filterVisible = false
    }
  }

}
