import { handleActions } from 'redux-actions';
import { GET_BALANCE_INIT_DATA, RESET_BALANCE_DATA, GET_BALANCE_INFO, GET_WAIT_BALANCE_INFO_LIST, GET_ASSESSMENT_NOTICE_LIST, RESET_ASSESSMENT_NOTICE_LIST,GET_ASSESSMENT_NOTICE_FILTER_LIST,ASSESSMENT_NOTICE_APPEAL_APPLICATION,ASSESSMENT_NOTICE_CONFIRM } from '@/store/types/balance';
import { formatDate } from '@/utils/index';
export default handleActions({
  [GET_BALANCE_INIT_DATA](state, action) {
    return {
      ...state,
      initData: action.payload
    }
  }, [RESET_BALANCE_DATA] (state, action) {
    return {
      ...state,
      balance: {
        show: false
      }
    }
  }, [GET_BALANCE_INFO] (state, action) {
      const { payload } = action
      return {
        ...state,
        balance: { ...payload, show: true }
    }
  }, [GET_WAIT_BALANCE_INFO_LIST] (state, action) {
    const { payload } = action;
    return {
      ...state,
      waitBalanceList: payload
    }
  },
  //  重置考核通知单列表
  [RESET_ASSESSMENT_NOTICE_LIST](state, action) {
    return {
      ...state,
      assessmentNoticeList: []
    }
  },

  // 获取考核通知单列表
  [GET_ASSESSMENT_NOTICE_LIST] (state, action) {
    const { orderList } = state
    const { payload } = action
    let orderListNew = payload
    if(orderListNew && orderListNew.list){
      orderListNew.list = orderListNew.list.map((item)=>{
        // item.noticeTime = item.noticeTime ? formatDate(item.noticeTime, 'Y-M-D h:m:s') : ''
        return item
      })
    }

    if (orderList && orderList.list && orderList.list.length > 0 ) {
      orderListNew = { ...payload, list: orderList.list.concat(payload.data) }
    } else {
      orderListNew = {...payload, list: payload.list}
    }
    return {
      ...state,
      loading: false,
      assessmentNoticeList: orderListNew
    }
  },

  // 查询考核通知单筛选列表
  [GET_ASSESSMENT_NOTICE_FILTER_LIST] (state, action) {
    const { payload } = action;
    let filterList = payload.systemConfigForm.paramList
    let assessmentNoticeFilterList = {}
    let typeList = [] // 考核通知单筛选类型列表
    let statusList = [] // 考核通知单筛选状态列表
    filterList.forEach((item)=>{
      if(item.field=='noticeStatus'){
        statusList=item.dictList.map((val)=>{
          return {id: val.code,value: val.name}
        })
      }
      if(item.field=='noticeType'){
        typeList=item.dictList.map((val)=>{
          return {id: val.code,value: val.name}
        })
      }
    })
    assessmentNoticeFilterList.statusList=statusList
    assessmentNoticeFilterList.typeList=typeList
    return {
      ...state,
      assessmentNoticeFilterList: assessmentNoticeFilterList
    }
  },
  [ASSESSMENT_NOTICE_APPEAL_APPLICATION] (state, action) {
    const { payload } = action;
    return {
      ...state,
      appealApplication: payload
    }
  },
  [ASSESSMENT_NOTICE_CONFIRM] (state, action) {
    const { payload } = action;
    return {
      ...state,
      appealApplicationConfirm: payload
    }
  },
}, {
  initData: {
    enterpriseUser: {},
    orgList: [],
    matkls: []
  },
  balance: {
    show: false
  },
  assessmentNoticeList: [],
  assessmentNoticeFilterList: [],
  appealApplication: {},
  appealApplicationConfirm: {},
});
