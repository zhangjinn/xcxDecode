import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { queryAppRsFtSheetByRowId, queryAppRsOcFtSheetByRowId, doAppRsFtCreateAndSign } from '@/store/actions/financefund'
import any from 'ramda/es/any';
let wxbarcode = require('wxbarcode')
import $Toast from '@/components/vant/toast/toast';
import { getAppSignatureViewSsq } from '@/store/actions/financepolicy'

interface Data {


}

@connect({
    fundDetail({ financefund }) {
        return financefund.fundDetail
    },
    fundCustom({ financefund }) {
        return financefund.fundCustom
    }

}, {
    queryAppRsFtSheetByRowId,
    queryAppRsOcFtSheetByRowId,
    doAppRsFtCreateAndSign,
    getAppSignatureViewSsq
})

export default class ProblemList extends wepy.page {

    config = {
        navigationBarTitleText: '资金电子签章',
        usingComponents: {

          'van-toast': '/components/vant/toast/index',

        },
    };

    data: Data = {
        rows: {
            sheetId: '',
            _loading: true

        },


        up: true,
        up1: true,
        contents: '展开详情',
        contents1: '展开详情',
        statusFlag: '',
        from: '',
        doType: ''

    }

    methods = {
        onshowClick() {
            this.up = !this.up
            if (this.up) {
                this.contents = "展开详情"
            } else {
                this.contents = "收起详情"
            }
        },
        onshowClick1() {
            this.up1 = !this.up1
            if (this.up1) {
                this.contents1 = "展开详情"
            } else {
                this.contents1 = "收起详情"
            }
        },
        signature: () => {
          if (this.doType === '0') {
            return
          }
          $Toast.loading({ forbidClick: true, message: '处理中...', duration: 0 });
          this.methods.doAppRsFtCreateAndSign({
            "typeCode":"10",
            "docType":"RsFt",
            "rowId":this.fundDetail.rowId,
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
            docType: 'RsFt',
            rowId: this.fundDetail.rowId,
            typeCode: 10,
            caFid: this.fundDetail.caFid,
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
    getfundcustom() {
        this.methods.queryAppRsOcFtSheetByRowId({ ...this.rows })
    }
    onLoad(e: { id: any; statusFlag: any, from: string, doType: string  }) {
        const { id, statusFlag, from, doType } = e
        this.rows.sheetId = id
        this.statusFlag = statusFlag
        this.doType = doType
        this.from = from === 'todo' ? '/pages/me/financial-todo/index' : "/pages/finance/fund-electronic/list/index"

        this.getfundcustom()
        this.methods.queryAppRsFtSheetByRowId({ ...this.rows }).then((res: any) => {
            wxbarcode.barcode('barcode', res.payload.rsFtSheet.sheetNo, 250, 80);
        });

    }

}
