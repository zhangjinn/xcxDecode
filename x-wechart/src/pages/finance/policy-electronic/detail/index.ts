import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { queryAppRsRbDetailByRowId,queryAppCurConfirmedByRowId,queryAppRsRbCashedByRowId} from '@/store/actions/financepolicy';
import { FINANCE_POST_RSRB_DETAIL_BY_ROWID, FINANCE_POST_CUR_CONFIRMED_BY_ROWID } from '@/store/types/financepolicy';
let wxbarcode = require('wxbarcode');

interface Data {
  code: string,
  msg: string,
  rsRbSheet: object,
  preUncashSum: string,
  curConfirmedSum: string,
  balanceSum: string,
  otherCashedSum: string,
  cashedSum: string,
  sheetNo: string,
  rows: object,
  IKnow: boolean;
}


@connect({
  policyDetail({ financepolicy }) {
    return financepolicy.policyDetail
  },
  curConfirmed({ financepolicy }) {
    return financepolicy.curConfirmed
  },
  cashed({financepolicy}){
    return financepolicy.cashed
  }
}, {
  queryAppRsRbCashedByRowId,
  queryAppCurConfirmedByRowId,
  queryAppRsRbDetailByRowId
})

export default class ProblemList extends wepy.page {

  config = {
    navigationBarTitleText: '政策电子账单明细',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-tab': '../../../../components/vant/tab/index',
      'van-tabs': '../../../../components/vant/tabs/index',
      'van-popup': '../../../../components/vant/popup/index',
    },
  };

  data: Data = {
    IKnow: false,
    rsRbSheet: {
      rowId: 10879334
    },
    rows: {
      rowId: 10879334,
      cashedClassify:''
    },
    showMore: false,
  }

  methods = {
    showMore: () => {
      this.showMore = true
    },
    hiddenMore: () => {
      this.showMore = false
    },
    allIKnow: () => {
      this.IKnow = false
    },
    viewSignature(e: any,ssqBind: any) {
      if(ssqBind == 0) {
        this.IKnow = true
      } else {
        wx.navigateTo({
          url: `/pages/finance/policy-electronic/signature/index?id=${e}`
        })
      }
    },
    onClick(e){
      const {detail}=e
      if(detail.index==1){
        this.rows.cashedClassify='01'
        this.getcashed()
      }else if (detail.index==2){
        this.rows.cashedClassify='02'
        this.getcashed()
      }else{
        this.curConfirmeds()
      }
    }
  }
  onLoad(e: { id: any; }) {
    const { id } = e

    this.rsRbSheet.rowId=id
    this.rows.rowId=id
    this.curConfirmeds()
    this.methods.queryAppRsRbDetailByRowId({ ...this.rsRbSheet }).then((res: any) => {
      wxbarcode.barcode('barcode', res.payload.rsRbSheet.rsRbSheet.sheetNo, 250, 80);
    });
  }

  curConfirmeds() {
    this.methods.queryAppCurConfirmedByRowId({ ...this.rows })
  }
  getcashed(){
    this.methods.queryAppRsRbCashedByRowId({ ...this.rows })
  }
}
