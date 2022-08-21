import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { queryAppCfRbDetailByRowId } from '@/store/actions/financecheck'
import filter from 'ramda/es/filter';
import any from 'ramda/es/any';
let wxbarcode = require('wxbarcode')

interface Data {
  filterForm: object;
  IKnow: boolean;
}

@connect({
  checkDetail({ financecheck }) {
    return financecheck.checkDetail
  }
}, {
  queryAppCfRbDetailByRowId

})

export default class ProblemList extends wepy.page {

  config = {
    navigationBarTitleText: '政策核对单明细',
    usingComponents: {
      'van-rate': '../../../../components/vant/rate/index',
      'van-field': '../../../../components/vant/field/index',
      'van-popup': '../../../../components/vant/popup/index',
    },
  };

  data: Data = {
    IKnow: false,
    filterForm: {
      rowId: '',//唯一单号
    },

  }

  methods = {
    allIKnow: () => {
      this.IKnow = false
    },
    onClick(e: any,ssqBind: any) {
      if(ssqBind == 0) {
        this.IKnow = true
      } else {
        wx.navigateTo({
          url: `/pages/finance/policy-check/signature/index?id=${e}`
        })
      }
    }
  }

  onLoad(e: { id: any; }) {
    const { id } = e
    this.filterForm.rowId = id

    this.methods.queryAppCfRbDetailByRowId({ _loading: false, ...this.filterForm }).then((res: any) => {
      wxbarcode.barcode('barcode',res.payload.rows.docNo, 250, 80);
    }
    )


  }
}
