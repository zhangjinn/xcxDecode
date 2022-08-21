import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { queryAppCfRbDetailByRowId, doAppCfRbCreateAndSign } from '@/store/actions/financecheck'
import { getAppSignatureViewSsq } from '@/store/actions/financepolicy'
let wxbarcode = require('wxbarcode')
import { DX } from '@/utils/index';
import $Toast from '@/components/vant/toast/toast';

interface Data {
  filterForm: object;
  from: string,
  statusFlag: number | string,
  chineseAmt: string,
  doType: string
}

@connect({
  checkDetail({ financecheck }) {
    return financecheck.checkDetail
  }
}, {
  queryAppCfRbDetailByRowId,
  getAppSignatureViewSsq,
  doAppCfRbCreateAndSign
})

export default class ProblemList extends wepy.page {

  config = {
    navigationBarTitleText: '政策核对单签章',
    usingComponents: {
      'van-rate': '../../../../components/vant/rate/index',
      'van-field': '../../../../components/vant/field/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-toast': '../../../../components/vant/toast/index',
    },
  };

  data: Data = {
    filterForm: {
      rowId: '',//唯一单号
    },
    chineseAmt:'',
    statusFlag: '',
    from: '',
    doType: ''
  }

  methods = {
    signature: () => {
      if (this.doType === '0') {
        return
      }
      $Toast.loading({ forbidClick: true, message: '处理中...', duration: 0 });
      this.methods.doAppCfRbCreateAndSign({
        "typeCode":"10",
        "docType":"RsRb",
        "rowId":this.checkDetail.rows.rowId,
        "ssqReturnUrl": this.from,
      }).then((res: { payload: { success: string, code: string, url: string, msg: string}}) => {
        if (res.payload.success === 'true' || res.payload.code === '0') {
          $Toast.clear()
          const urlStr = encodeURIComponent(res.payload.url);
          wx.navigateTo({ url: `/pages/me/webview/index?url=${urlStr}` });
        } else {
          $Toast.fail(res.payload.msg || '处理失败');
        }
      })
    },
    view: () => {
      if (this.doType === '0') {
        return
      }
      this.methods.getAppSignatureViewSsq({
        docType: 'CfRb',
        rowId: this.checkDetail.rows.rowId,
        typeCode: 10,
        caFid: this.checkDetail.rows.caFid,
        // caFid: '2435502970876461064'
        }).then((res: { payload: { code: string, url: string, msg: string }}) => {
          if (res.payload.code === '0') {
            const urlStr = encodeURIComponent(res.payload.url);
            wx.navigateTo({ url: `/pages/me/webview/index?url=${urlStr}` });
          } else {
            // 报错
            $Toast.fail(res.payload.msg || '处理失败');
          }
        })
    }

  }

  onLoad(e: { id: any; statusFlag: any, from: string, doType: string  }) {
    const { id, statusFlag, from, doType } = e
    this.statusFlag = statusFlag
    this.filterForm.rowId = id
    this.from = from === 'todo' ? '/pages/me/financial-todo/index' : "/pages/finance/policy-check/list/index"
    let self=this
    this.doType = doType
    this.methods.queryAppCfRbDetailByRowId({ _loading: false, ...this.filterForm }).then((res: any) => {
      wxbarcode.barcode('barcode',res.payload.rows.docNo, 250, 80);
      self.chineseAmt=DX(res.payload.rows.rbAmt)
      self.$apply()
    })

  }
}
