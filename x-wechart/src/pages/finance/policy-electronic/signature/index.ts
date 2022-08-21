import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { queryAppRsRbDetailByRowId,queryAppRsOcRbSheetByRowId, getAppSignatureViewSsq, doAppRsRbCreateAndSign } from '@/store/actions/financepolicy'
let wxbarcode = require('wxbarcode')
import $Toast from '@/components/vant/toast/toast';

interface Data {
  filterForm:object;
  rsRbSheet: object;
  rows: object;
  statusFlag: string | number;
  from: string
}

@connect({
  policyDetail({ financepolicy }) {
    return financepolicy.policyDetail
  },
  policyCurtom({financepolicy}){
    return financepolicy.policyCurtom
  }
}, {
  queryAppRsRbDetailByRowId,
  queryAppRsOcRbSheetByRowId,
  getAppSignatureViewSsq,
  doAppRsRbCreateAndSign
})
export default class Signature extends wepy.page {

  config = {
    navigationBarTitleText: '政策电子签章',
    usingComponents: {
      'van-toast': '../../../../components/vant/toast/index',
    },
  };

  data: Data = {
    rsRbSheet: {
      rowId: ''
    },
    rows: {
      rowId: '',
      cashedClassify:''
    },
    statusFlag: '',
    showMore: false,
    from: '',
    doType: ''
  }

  methods = {
    signature: () => {
      if (this.doType === '0') {
        return
      }
      $Toast.loading({ forbidClick: true, message: '处理中...', duration: 0 });
      this.methods.doAppRsRbCreateAndSign({
        "typeCode":"10",
        "docType":"RsRb",
        "rowId":this.rows.rowId,
        "ssqReturnUrl": this.from
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
        docType: 'RsR',
        rowId: this.policyDetail.rsRbSheet.rowId,
        typeCode: 10,
        caFid: this.policyDetail.rsRbSheet.caFid,
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
getCurtom(){
  this.methods.queryAppRsOcRbSheetByRowId({_loading: false, ...this.rsRbSheet});
}
  onLoad(e: { id: any; statusFlag: any, from: string, doType: string }) {
    const { id, statusFlag, from, doType } = e
    this.statusFlag = statusFlag
    this.rsRbSheet.rowId=id
    this.rows.rowId=id
    this.doType = doType
    this.from = from === 'todo' ? '/pages/me/financial-todo/index' : '/pages/finance/policy-electronic/list/index'
    this.getCurtom()
    this.methods.queryAppRsRbDetailByRowId({ _loading: false, ...this.rsRbSheet}).then((res: any) => {
      wxbarcode.barcode('barcode',res.payload.rsRbSheet.rsRbSheet.sheetNo, 250, 80);
    })


  }

}
