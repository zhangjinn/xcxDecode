import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { queryAppRsFtSheetByRowId,doAppRsFtThreecolumnListJson } from '@/store/actions/financefund'
let wxbarcode = require('wxbarcode')

interface Data {

}

@connect({
  fundDetail({ financefund }) {
    return financefund.fundDetail
  }
  threecolumn({ financefund }) {
    return financefund.threecolumn
  }
}, {
  queryAppRsFtSheetByRowId,
  doAppRsFtThreecolumnListJson
})

export default class ProblemList extends wepy.page {

  config = {
    navigationBarTitleText: '资金电子账单明细',
    usingComponents: {
      'van-icon': '../../../../components/vant/icon/index',
      'van-tab': '../../../../components/vant/tab/index',
      'van-tabs': '../../../../components/vant/tabs/index',
      'van-popup': '../../../../components/vant/popup/index',
    },
  };

  data: Data = {
    IKnow: false,
    rows: {
      sheetId:'',
      _loading:true
    },
    tcfilter:{
      sheetId:'',
      businessType:'',
      page: {
        pageNo: 10,
        pageSize: 1,
      },
    }
  }

  methods = {
    allIKnow: () => {
      this.IKnow = false
    },
    viewSignature(e:any,ssqBind: any){
      if(ssqBind == 0) {
        this.IKnow = true
      } else {
        wx.navigateTo({
          url: `/pages/finance/fund-electronic/signature/index?id=${e}`
        })
      }
    },
    viewInvoice(type:any,voucherNo:any){
      wx.navigateTo({
        url: `/pages/finance/invoice/index?type=${type}&voucherNo=${voucherNo}`
      })
    },
    loadNextPage(){

      if (this.tcfilter.page.pageSize >= this.threecolumn.totalPage) {
        //
      } else {
        this.tcfilter.page = { ...this.tcfilter.page, pageSize: this.tcfilter.page.pageSize + 1 }
        this.methods.doAppRsFtThreecolumnListJson({ ...this.tcfilter })
      }
    },
    onChooseType(e){
      const {detail}=e
      switch(detail.index){
        case 0:
          this.tcfilter.businessType=''
          break;
        case 1:
          this.tcfilter.businessType='10'
          break;
        case 2:
          this.tcfilter.businessType='20'
          break;
        case 3:
          this.tcfilter.businessType='30'
          break;
      }
      this.tcfilter.page = { ...this.tcfilter.page, pageSize: 1 }
      this.methods.doAppRsFtThreecolumnListJson({ ...this.tcfilter })
    }
  }

  onLoad(e: { sheetId:any }) {
    const { sheetId } = e
    this.rows={...this.rows,sheetId}
    this.tcfilter={...this.tcfilter,sheetId}

    this.methods.queryAppRsFtSheetByRowId({ ...this.rows }).then((res: any) => {
      wxbarcode.barcode('barcode', res.payload.rsFtSheet.sheetNo, 250, 80);

      let  sheetId=res.payload.rsFtSheet.rowId
      let sheetNo=res.payload.rsFtSheet.sheetNo
      let  prfcName=res.payload.rsFtSheet.prfcName
      let  periodEndDate=res.payload.rsFtSheet.periodEndDate
      let  currencyName=res.payload.rsFtSheet.currencyName
      wx.setStorageSync('InvoiceData', JSON.stringify({sheetId,sheetNo,prfcName,periodEndDate,currencyName}));
    });
    this.tcfilter.page = { ...this.tcfilter.page, pageSize: 1 }
    this.methods.doAppRsFtThreecolumnListJson({ ...this.tcfilter })

  }
}
