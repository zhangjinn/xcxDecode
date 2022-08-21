import wepy from 'wepy';
import { connect,getStore } from 'wepy-redux'
import { doAppRsFtInvoiceListJson,doAppRsFtShipNoInvoiceListJson,doAppRsFtIncomeListJson,doAppRsFtReturnNoRefundListJson } from '@/store/actions/financefund'

import { RESET_RS_FT_LIST } from '@/store/types/financefund';
interface Data {
}

@connect({
    list({ financefund }) {
      return financefund.list
    }
  }, {
    doAppRsFtInvoiceListJson,
    doAppRsFtShipNoInvoiceListJson,
    doAppRsFtIncomeListJson,
    doAppRsFtReturnNoRefundListJson
})
export default class filter extends wepy.page {

  config = {
    navigationBarTitleText: '发票',
    usingComponents: {

    },
  };

  data: Data = {
    pagetype:'',
    filter:{
      sheetId:'',
      voucherNo:'',
      page:{
        pageSize:1,
        pageNo:10
      },
    },
    pageInfo:{
      sheetNo:'',
      prfcName:'',
      periodEndDate:'',
      currencyName:''
    },
    height:wx.getSystemInfoSync().windowHeight-138,
  }
  
  methods = {
    loadNextPage(){
      if (this.filter.page.pageSize >= this.list.totalPage) {
        //
      } else {
        this.filter.page = { ...this.filter.page, pageSize: this.filter.page.pageSize + 1 }
        this.choosePage()
      }
    }
  }
  choosePage(){
    switch (this.pagetype) {
      case 1:
        this.methods.doAppRsFtInvoiceListJson({...this.filter})
        break
      case 2:
        this.methods.doAppRsFtIncomeListJson({...this.filter})
        break
      case 3:
        this.methods.doAppRsFtShipNoInvoiceListJson({...this.filter})
        break
      case 4:
        this.methods.doAppRsFtReturnNoRefundListJson({...this.filter})
        break
    }
  }
  onLoad(e: { type: any,voucherNo:any}) {
    const res = wx.getStorageSync('InvoiceData');
    const {sheetNo,sheetId,prfcName,periodEndDate,currencyName}=JSON.parse(res)

    const { type,voucherNo } = e;
    this.pagetype=Number(type);

    this.filter={...this.filter,sheetId,voucherNo}
    this.pageInfo={...this.pageInfo,sheetNo,prfcName,periodEndDate,currencyName}
    
    let title
    switch (this.pagetype) {
      case 1:
        title = '发票明细';
        break
      case 2:
        title = '回款明细';
        break
      case 3:
        title = '海信方已发货未开票';
        break
      case 4:
        title = '客户方已退货未退税';
        break
    }
    wx.setNavigationBarTitle({
      title: title
    })
    this.choosePage()
  }

  onUnload() {
    getStore().dispatch({
      type: RESET_RS_FT_LIST,
      payload: []
    })
  }
  
}
