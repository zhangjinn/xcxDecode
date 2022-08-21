import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { map, trim, indexOf, remove, append, join } from 'ramda';
import { getOrderList } from '@/store/actions/audit-order';
import { getOrderFilter } from '@/store/actions/order';
import { request } from '@/utils/request';
import CommonMixin from '@/mixins/common';
import $Toast from '@/components/vant/toast/toast';
import Dialog from '@/components/vant/dialog/dialog';
import { fillZero, getLastMonthYesterday } from '@/utils/index';
import utilsWxs from '../../../wxs/utils.wxs';
import emptyDataType from "@/components/empty-data-type/index";

@connect({
  items({ auditorder }) {
    return auditorder.items;
  },
  filter({ order }) {
    return order.filter;
  },
}, {
  getOrderList,
  getOrderFilter,
})
export default class AuditOrder extends wepy.page {
  config = {
    navigationBarTitleText: '直采订单审核',
    usingComponents: {
      'van-button': '../../../components/vant/button/index',
      'van-field': '../../../components/vant/field/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-checkbox': '../../../components/vant/checkbox/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-img': '../../../components/img/index',
      'calendar': '../../../components/calendar/index',
    },
    enablePullDownRefresh: true,
  };
  components = {
    emptyDataType,
  };
  wxs = {
    utils: utilsWxs,
  };
  mixins = [ CommonMixin ];

  params = {
    pageSize: 10,
    pageNo: 1,
    status: 'AGENTUNCHKED',
    type: 2,
    directBuy: 1,
  };
  isView = false;
  remark = '';
  typeName = 'agentCheckStart';
  data = {
    filterType: '',
    visible: false,
    viewVisible: false,
    chooses: [],
    totalPages: 0,
    rejectShow: false,
    // 加载数据中
    loading: false,
    // 是否全部加载完毕
    complete: false,
    // 过滤条件
    filterForm: {},
    matklList: [],
    matk: {},
    orgList: [],
    org: {},
    fxDict: [],
    fx: {},
    tranList: [],
    tran: {},
    agentCheckStart: '',
    agentCheckEnd: '',
    calendarShow: false,
    calendarConfig: {
      theme: 'elegant',
      onlyShowCurrentMonth: false,
    },
    timeFrameVisible: false,
    timeFrame: '',
    zzprdmodel: '',
    orderCode: '',
  };

  // 页面内交互写在methods里
  methods = {
    closeFilter: () => {
      this.visible = false;
    },
    onModelChange: ({detail}: any) => {
      this.zzprdmodel = detail;
    },
    onOrderChange: ({detail}: any) => {
      this.orderCode = detail;
    },
    // 选择日期
    openCalendar: (e) => {
      const minDate = '1970-01-01';
      const maxDate = '9999-12-31';
      const { name } = e.target.dataset;
      const begin = this.agentCheckStart;
      const end = this.agentCheckEnd;
      this.typeName = name;
      if(name.indexOf('agentCheckStart') > -1) {
        this.$wxpage.calendar.enableArea([minDate, end ? end : maxDate]);
      }
      if(name.indexOf('agentCheckEnd') > -1) {
        this.$wxpage.calendar.enableArea([begin ? begin : minDate, maxDate]);
      }
      this.calendarShow = true;
    },
    clearCalendar(name) {
      this[name] = '';
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      const day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this[this.typeName] = day;
      this.calendarShow = false;
      this.timeFrame = '';
    },
    onSelectTimeFrame(timeFrame) {
      this.timeFrame = timeFrame;
      this.viewVisible = false;
      this.agentCheckStart = '';
      this.agentCheckEnd = '';
    },
    onToggleTimeFrame() {
      this.viewVisible = !this.viewVisible;
    },
    cancelFilter: () => {
      this.viewVisible = false;
    },
    chooseFilter: (type: string) => {
      this.viewVisible = true;
      if (type === 'queryMatkl') {
        this.getQueryMatkl();
      } else if (type === 'queryOrg') {
        this.getQueryOrg();
      } else if (type === 'queryFxDict') {
        this.getFxDict();
      } else if (type === 'getTransList') {
        this.getTransList();
      } else if (type === 'timeFrame') {
        this.filterType = '单据日期';
      }
    },
    chooseMatk: (item: any) => {
      this.viewVisible = false;
      this.matk = item;
    },
    chooseOrg: (item: any) => {
      this.viewVisible = false;
      this.org = item;
    },
    chooseFx: (item: any) => {
      this.viewVisible = false;
      this.fx = item;
    },
    chooseTran: (item: any) => {
      this.viewVisible = false;
      this.tran = item;
    },
    onRemarkChange: ({ detail }: any) => {
      this.remark = trim(detail.value);
    },
    rejectAll: () => {
      if (this.chooses.length === 0) {
        $Toast('请至少选择一个订单');
        return;
      }
      this.rejectShow = true;
    },
    closeRejectDialog: () => {
      this.rejectShow = false;
    },
    confirmReject: () => {
      this.rejectShow = false;
      if (!this.remark) {
        $Toast('请输入驳回原因');
        return;
      }
      $Toast.loading({ forbidClick: true, message: '处理中...', duration: 0 });
      request({
        api: 'order/disAgreeOrders.nd',
        method: 'POST',
        data: {
          ids: join(',', this.chooses),
          remark: this.remark,
        },
        callback: (res: any) => {
          const { msg, code } = res.data;
          $Toast.clear();
          if (code === 0) {
            this.methods.search(this.params);
          } else {
            $Toast.fail(msg || '批量审核失败');
          }
        },
      });
    },
    acceptAll: () => {
      if (this.chooses.length === 0) {
        $Toast('请至少选择一个订单');
        return;
      }
      Dialog.confirm({
        title: '确认批量审核通过？',
        message: '不可撤销此操作',
      }).then(() => {
        $Toast.loading({ forbidClick: true, message: '处理中...', duration: 0 });
        request({
          api: 'order/agreeOrders.nd',
          method: 'POST',
          data: {
            ids: join(',', this.chooses),
            remark: '',
          },
          callback: (res: any) => {
            const { msg, code } = res.data;
            $Toast.clear();
            if (code === 0) {
              this.methods.search(this.params);
            } else {
              $Toast.fail(msg || '批量审核失败');
            }
          },
        });
      }).catch(() => {
        // on cancel
      });
    },
    checkAll: () => {
      if (this.chooses.length === this.items.length) {
        this.chooses = [];
      } else {
        this.chooses = map(({id}) => id, this.items);
      }
    },
    chooseItem: (id: string) => {
      const index = indexOf(id, this.chooses);
      if (index >= 0) {
        this.chooses = remove(index, 1, this.chooses);
      } else {
        this.chooses = append(id, this.chooses);
      }
    },
    onSearch: (event: any) => {
      const key = trim(event.detail || '');
      if (key) {
        this.params.searchTerm = key;
      } else {
        delete this.params.searchTerm;
      }
      this.methods.search(this.params);
    },
    // 过滤数据
    search: (params: any) => {
      $Toast.loading({ forbidClick: true, message: '加载中...', duration: 0 });
      this.methods.getOrderList(params, (res: any) => {
        // 接口返回 关闭对应状态
        wx.stopPullDownRefresh();
        $Toast.clear();
        if (res && res.data && res.data.priceDelegateMessageList) {
          const { orderHeaderList, totalPages } = res.data;
          this.complete = orderHeaderList.length === 0;
          this.totalPages = totalPages;
        }
      });
    },
    toggleFilter: () => {
      this.visible = !this.visible;
    },
    onResetFilterForm: () => {
      const params: any = {
        pageSize: 10,
        pageNo: 1,
        status: 'AGENTUNCHKED',
        type: 2,
        directBuy: 1,
      };
      this.matk = {};
      this.org = {};
      this.fx = {};
      this.tran = {};
      this.agentCheckStart = '';
      this.agentCheckEnd = '';
      this.timeFrame = '';
      this.zzprdmodel = '';
      this.orderCode = '';
      this.params = params;
      this.visible = false;
      this.methods.search(params);
    },
    onSubmitFilterForm: () => {
      const params: any = {
        pageSize: 10,
        pageNo: 1,
        status: 'AGENTUNCHKED',
        type: 2,
        directBuy: 1,
      };

      if (!!this.zzprdmodel) {
        params['zzprdmodel'] = this.zzprdmodel;
      }
      if (!!this.orderCode) {
        params['orderCode'] = this.orderCode;
      }
      if (!!this.matk.code) {
        params['matklId'] = this.matk.code;
      }
      if (!!this.timeFrame) {
        params['timeFrame'] = this.timeFrame;
      }
      if (!!this.agentCheckStart) {
        params['beginDate'] = this.agentCheckStart;
      }
      if (!!this.agentCheckEnd) {
        params['endDate'] = this.agentCheckEnd;
      }
      // customerCode
      if (!!this.fx.code) {
        params['customerCode'] = this.fx.code;
      }
      if (!!this.org.code) {
        params['fullName'] = this.org.code;
      }
      if (!!this.tran.code) {
        params['trans'] = this.tran.code;
      }
      this.params = params;
      this.visible = false;
      this.methods.search(params);
    },

    onPullBottom() {
      const { pageNo } = this.params
      let index = pageNo + 1;
      if (!this.loading && !this.complete && pageNo < this.totalPages) {
        this.loading = true;
        this.params.pageNo = index;
        this.methods.search({ ...this.params, pull: true });
      }
    },
  };

  getQueryMatkl() {
    this.filterType = '物料组';
    if (this.matklList && this.matklList.length === 0) {
      request({
        api: 'comm/queryMatkl.nd',
        method: 'GET',
        callback: (res: any) => {
          const { matklList } = res.data;
          if (matklList && matklList.length > 0) {
            this.matklList = matklList;
            this.$apply();
          }
        },
      });
    }
  }

  getQueryOrg() {
    this.filterType = '供应商';
    if (this.orgList && this.orgList.length === 0) {
      request({
        api: 'comm/queryOrg.nd?type=2',
        method: 'GET',
        callback: (res: any) => {
          const { orgList } = res.data;
          if (orgList && orgList.length > 0) {
            this.orgList = orgList;
            this.$apply();
          }
        },
      });
    }

  }

  getFxDict() {
    this.filterType = '分销商';
    if (this.fxDict && this.fxDict.length === 0) {
      request({
        api: 'comm/fxDict.nd',
        method: 'GET',
        callback: (res: any) => {
          const { list } = res.data;
          if (list && list.length > 0) {
            this.fxDict = list;
            this.$apply();
          }
        },
      });
    }

  }

  // 获取配送方式
  getTransList() {
    this.filterType = '配送方式';
    if (this.tranList && this.tranList.length === 0) {
      request({
        api: 'comm/dict.nd?pid=50200&type=2',
        method: 'GET',
        callback: (res: any) => {
          const { list } = res.data;
          if (list && list.length > 0) {
            this.tranList = list;
            this.$apply();
          }
        },
      });
    }
  }
  onPullDownRefresh() {
    this.params = { ...this.params, pageNo: 1 };
    if (this.params.searchTerm) {
      delete this.params.searchTerm;
    }
    this.methods.search({...this.params});
  }
  onShow() {
    this.params = { pageSize: 10, pageNo: 1, type: 2, directBuy: 1, status: 'AGENTUNCHKED' };
    this.methods.search(this.params);
  }

  onLoad() {
    this.getTransList();
    this.methods.getOrderFilter({ type: 1});
  }

}
