import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import { trim, is, map, length, find, propEq } from 'ramda';
import Header from '@/components/goodsHeader/index';
import emptyDataType from "@/components/empty-data-type/index";
import { Weapp } from 'definitions/weapp';
import systemMixin from '@/mixins/system';
import { getSearchList, getSearchStock, getSearchPrice, grtFilterItemGroup, getFilterDmsGoodsPrice,getDmsGoodsInventory } from '@/store/actions/search'
import { getSpecialFilters } from '@/store/actions/classification'
import { RESET_SEARCH_IMG, RESET_SEARCH_LIST } from '@/store/types/search';
import { TOGGLE_SEARCH_COLLECTION } from '@/store/types/search';

interface Data {
  key: string;
  visible: boolean;
  statusBarHeight: string;
  visibelTop: boolean;
  scrollTop: number;
  filterIndex: number;
  filterSale: number;
  sortField: string,
  sortType: string,
  onOpen: boolean;
  onOpenMatk: boolean;
  searchstatuspopup: string,
  pageNo: number;
  type: string;
  dmssearchstatuspopup: string;
  checkMainPrice: boolean;
}


@connect({
  searchList({ search }) {
    return search.search
  },
  dmsmatklList({ search }) {
    return search.dmsmatklList
  },
  dmsOrgList({ search }) {
    return search.dmsOrgList
  },
  totalPages({ search }) {
    return search.totalPages
  },
  currentPage({ search }) {
    return search.currentPage
  },
  orgIds({ search }) {
    return search.orgIds
  },
  specialfilters({ classification }) {
    return classification.specialfilters
  },
  loadingInfo({ search }) {
    return search.loadingInfo
  },
  user({ user }) {
    return user
  }
}, {
  getSearchList,
  getSpecialFilters,
  getSearchStock,
  getDmsGoodsInventory,
  getSearchPrice,
  grtFilterItemGroup,
  getFilterDmsGoodsPrice
})
export default class Filter extends wepy.page {
  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom',
    usingComponents: {
      'van-rate': '../../../components/vant/rate/index',
      'van-icon': '../../../components/vant/icon/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-picker': '../../../components/vant/picker/index',
      'van-search': '../../../components/vant/search/index',
      'van-tab': '../../../components/vant/tab/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'img': '../../../components/img/index',
      'van-loading': '../../../components/vant/loading/index',
      'item': '../../../components/list-item/index',
    },
  }
  components = {
    header: Header,
    emptyDataType,
  };
  watch = {
    loadingInfo() {
      this.searchList.forEach((element,i) => {
        if(this.searchList[i].isFenXiao != "Y"){//海信
          const data = {
            orgId: this.searchList[i].orgId,//组织id
            code: this.searchList[i].productCode,//产品编码
            queryType: 'purchase',//库存查询类型 海信
          }
          getSearchStock(data,res => {
            const {inventory,sharedInv} = res.data[0];
            if(this.searchList[i]) {
              this.searchList[i]['inventory'] = inventory;
              this.searchList[i]['sharedInv'] = sharedInv;
            }
            this.$apply();
          })
        }else{//渠道
          let productCodeArr = [];
          productCodeArr.push(this.searchList[i].productCode);
          const data = {
            orgId: this.searchList[i].orgId,
            productCodes: productCodeArr,
            supplierCode: this.searchList[i].agentCisCode,
          // { cisCode: wepy.$instance.globalData.cisCode, productCodes: arr,supplierCode:this.classification[i].agentCisCode }
          }
          getDmsGoodsInventory(data,res => {
            const { invQty,gicInvQty } = res.data.data[0];
            if(this.searchList[i]){
              this.searchList[i]['invQty'] = invQty;
              this.searchList[i]['gicInvQty'] = gicInvQty;
            }
            this.$apply();
          })
        }
      });
      if (this.loadingInfo.price) {
        this.methods.getSearchPrice(this.loadingInfo.price)
      }
      // TODO: 获取dms价格
      if (this.loadingInfo.loadingDms) {
        this.methods.getFilterDmsGoodsPrice({ orgId: this.loadingInfo.loadingDms.orgId, productId: this.loadingInfo.loadingDms.productId })
      }
    }
  };
  // 声明
  data: Data = {
    key: '',
    visible: false,
    statusBarHeight: '',
    // 回到顶部
    visibelTop: false,
    scrollTop: -1,
    filterIndex: 0,
    filterSale: 0,
    sortField: '',
    sortType: '',
    onOpen: false,
    onOpenMatk: false,
    searchstatuspopup: '',
    dmssearchstatuspopup: '',
    pageNo: 1,
    type: '',
    checkMainPrice: false,
    purchaseTypeOptions: [
      {
        key: 1,
        value: '应急采购',
        status: false
      },
      {
        key: 2,
        value: '常规采购',
        status: false
      }
    ],
    purchaseTypePopup: ''
  }
  mixins = [systemMixin];
  // 页面内交互写在methods里
  methods = {
    isGetSearchStock:(data) => {
      getSearchStock(data,(res:any) => {
        console.log(res);
      })
    },
    onScroll: (event: Weapp.Event) => {
      if (event.detail.scrollTop >= 350) {
        this.visibelTop = true
        if (this.scrollTop === 0) {
          this.scrollTop = event.detail.scrollTop
        }
      } else {
        this.visibelTop = false
      }
    },
    onPullBottom: () => {
      let index = this.currentPage + 1
      if (index < this.totalPages || index == this.totalPages) {
        this.pageNo = index
        this.methods.getSearch(index)
      }
    },
    dmssearchSelect: (key: any) => {
      this.dmsmatklList.forEach((element: { key: any; searchstatus: boolean; }) => {
        if (element.key == key) {
          element.searchstatus = !element.searchstatus
        }
      });
      const item = find(propEq('key', key))(this.dmsmatklList)
      this.methods.dmsselectedsearchSelect(item)
    },
    dmsselectedsearchSelect: (arr: { length: number; }) => {
      if (arr.length <= 0) {
        return
      }
      var attrs = this.dmsmatklList.filter(function (item: { searchstatus: boolean; }) {
        return item.searchstatus === true
      })
      let searchstatuspopup = attrs.map(function (item: { value: any; }) { return item.value })
      this.dmssearchstatuspopup = searchstatuspopup.join(',')
    },
    dmsOrgsearchSelect: (key: any) => {
      this.dmsOrgList.forEach((element: { key: any; searchstatus: boolean; }) => {
        if (element.key == key) {
          element.searchstatus = !element.searchstatus
        }
      });
      const item = find(propEq('key', key))(this.dmsOrgList)
      this.methods.dmsOrgselectedsearchSelect(item)
    },
    dmsOrgselectedsearchSelect: (arr: { length: number; }) => {
      if (arr.length <= 0) {
        return
      }
      var attrs = this.dmsOrgList.filter(function (item: { searchstatus: boolean; }) {
        return item.searchstatus === true
      })
      let searchstatuspopup = attrs.map(function (item: { value: any; }) { return item.value })
      this.searchstatuspopup = searchstatuspopup.join(',')
    },
    searchSelect: (key: any) => {
      this.specialfilters.fwOrgsGroupMap.forEach((element: { key: any; searchstatus: boolean; }) => {
        if (element.key == key) {
          element.searchstatus = !element.searchstatus
        }
      });
      const item = find(propEq('key', key))(this.specialfilters.fwOrgsGroupMap)
      this.methods.selectedsearchSelect(item)
    },
    selectedsearchSelect: (arr: { length: number; }) => {
      if (arr.length <= 0) {
        return
      }
      var attrs = this.specialfilters.fwOrgsGroupMap.filter(function (item: { searchstatus: boolean; }) {
        return item.searchstatus === true
      })
      let searchstatuspopup = attrs.map(function (item: { value: any; }) { return item.value })
      this.searchstatuspopup = searchstatuspopup.join(',')
    },
    // 筛选条件
    chageSort: (e: { currentTarget: { dataset: { id: any; }; }; }) => {
      const { id } = e.currentTarget.dataset
      if (id == '0') {
        this.filterIndex = 0
        this.sortField = ''
        this.sortType = ''
        this.filterSale = 0
      } else if (id == '1') {
        this.filterIndex = 1
        this.sortField = 'onlineDate'
        this.sortType = ''
        this.filterSale = 0
      } else if (id == '2') {
        this.filterIndex = 2
        this.sortField = ''
        if (this.filterSale == 0) {
          this.filterSale = 1
          this.sortField = 'sale'
          this.sortType = 'asc'
        } else if (this.filterSale == 1) {
          this.filterSale = 2
          this.sortField = 'sale'
          this.sortType = 'desc'
        } else if (this.filterSale == 2) {
          this.filterSale = 1
          this.sortField = 'sale'
          this.sortType = 'asc'
        }
      }
      getStore().dispatch({ type: RESET_SEARCH_LIST, payload: [] })
      this.methods.getSearch()
    },
    resetSearch: () => {
      this.searchstatuspopup = '',
      this.dmssearchstatuspopup = ''
      this.checkMainPrice = false
      if (this.specialfilters.fwOrgsGroupMap) {
        this.specialfilters.fwOrgsGroupMap.map((res: { searchstatus: boolean; }) => {
          if (res.searchstatus) {
            res.searchstatus = false
          }
        })
      }
      if (this.dmsOrgList && this.dmsOrgList.length > 0) {
        this.dmsOrgList.map((res: { searchstatus: boolean; }) => {
          if (res.searchstatus) {
            res.searchstatus = false
          }
        })
      }
      if (this.dmsmatklList && this.dmsmatklList.length > 0) {
        this.dmsmatklList.map((res: { searchstatus: boolean; }) => {
          if (res.searchstatus) {
            res.searchstatus = false
          }
        })
      }
    },
    confirmSearch: () => {
      this.pageNo = 1
      this.visible = !this.visible
      this.methods.scrollToTop()
      this.methods.getSearch()
    },
    goNext: (e: { currentTarget: { dataset: { url: any; }; }; }) => {
      const { url } = e.currentTarget.dataset
      wx.navigateTo({
        url: url
      })
    },
    // 运营商开关
    onOpen: () => {
      this.onOpen = !this.onOpen
    },
    // 物料组开关
    onOpenMatk: () => {
      this.onOpenMatk = !this.onOpenMatk
    },
    openDrawer: () => {
      if (this.user && this.user.organizationList) {
        this.user.organizationList.forEach((res) => {
          if (this.specialfilters && this.specialfilters.fwOrgsGroupMap) {
            this.specialfilters.fwOrgsGroupMap.forEach((s) => {
              if (res.organizationName == s.value) {
                s.relkey = res.organizationCode
              }
            })
          }
        })
      }
      this.visible = !this.visible
      if (this.orgIds) {
        this.orgIds.forEach((res) => {
          if (this.specialfilters && this.specialfilters.fwOrgsGroupMap) {
            this.specialfilters.fwOrgsGroupMap.forEach((e) => {
              if (e.key == res) {
                e.filter = false
              }
            })
          }
        })
      }
    },
    // 返回上一级
    goback: () => {
      let route = getCurrentPages()
      let url = route[0].route
      wx.switchTab({
        url: `../../../${url}`
      })
    },
    // 回到顶部
    scrollToTop: () => {
      this.visibelTop = false
      this.scrollTop = 0
    },
    goCollection: () => {
      wx.navigateTo({
        url: '/pages/goods/collection/index'
      })
    },
    // 添加/取消收藏
    getSearch: (number: number) => {
      if (!number) {
        number = 1
      }
      let orgId = ''
      let matklCodes = ''
      let purchaseType = ''
      if (this.type == '2') {
        if (this.specialfilters.fwOrgsGroupMap) {
          this.specialfilters.fwOrgsGroupMap.map((res: { searchstatus: any; key: string; }) => {
            if (res.searchstatus) {
              orgId = res.relkey + ',' + orgId
            }
          })
        }
      } else {
        if (this.dmsOrgList) {
          this.dmsOrgList.map((res: { searchstatus: any; key: string; }) => {
            if (res.searchstatus) {
              orgId = res.key + ',' + orgId
            }
          })
        }
      }
      if (this.dmsmatklList && this.user && this.user.fxPartInfo && this.user.fxPartInfo.length > 0) {
        this.dmsmatklList.map((res: { searchstatus: any; key: string; }) => {
          if (res.searchstatus) {
            matklCodes = res.key + ',' + matklCodes
          }
        })
      }
      this.purchaseTypeOptions.map((res: { status: any; key: string; }) => {
        if (res.status) {
          purchaseType = res.key + ',' + purchaseType
        }
      })
      orgId = orgId.substring(0, orgId.length - 1)
      matklCodes = matklCodes.substring(0, matklCodes.length - 1)
      purchaseType = purchaseType.substring(0, purchaseType.length - 1)

      this.methods.getSearchList({
        _loading: true,
        type: this.type,
        keyword: this.key,
        pageNum: number,
        orgId: orgId,
        matklCodes: matklCodes,
        sortField: this.sortField,
        sortType: this.sortType,
        havePrice: this.checkMainPrice ? 1 : 0,
        // 1:应急 2:常规 3:应急+常规
        purchaseType:  purchaseType.indexOf(",") >=0 ? '3' : purchaseType
       })
    },
    imgLose({ detail }: any) {
      getStore().dispatch({ type: RESET_SEARCH_IMG, payload: detail })
    },
    toggleCollection({ detail }: any) {
      getStore().dispatch({ type: TOGGLE_SEARCH_COLLECTION, payload: detail })
    },
    onCheckMainPrice: () => {
      this.checkMainPrice = !this.checkMainPrice
    },
    // 采购类型选中
    selectedPurchaseType: (key: any) => {
      this.purchaseTypeOptions.forEach((res: { key: any; status: boolean; }) => {
        if (res.key == key) {
          res.status = !res.status
        }
      })
      const item = find(propEq('key', key))(this.purchaseTypeOptions)
      this.methods.selectedPurchaseTypePopup(item)
    },
    selectedPurchaseTypePopup: (arr: { length: number; }) => {
      if (arr.length <= 0) {
        return
      }
      var attrs = this.purchaseTypeOptions.filter(function (item: { status: boolean; }) {
        return item.status === true
      })
      this.specialfilters.classificationpopup = attrs.map(function (item: { value: any; }) { return item.value })
      this.purchaseTypePopup = this.specialfilters.classificationpopup.join(',')
    }
  }
  onShow() {
    this.methods.getSearch()
    this.methods.grtFilterItemGroup({ catalogId: '', type: this.type })
  }
  onLoad(key: { q: any; }) {
    let { q } = key
    if (q == "undefined") {
      q = ''
    }
    this.key = q
    // this.methods.getSearch()
    this.methods.getSpecialFilters()
    const zyPartInfo = wepy.$instance.globalData.zyPartInfo
    const fxPartInfo = wepy.$instance.globalData.fxPartInfo
    if (zyPartInfo.length > 0 && fxPartInfo.length > 0) {
      this.type = ''
    } else if (zyPartInfo.length == 0 && fxPartInfo.length > 0) {
      this.type = '1'
    } else if (fxPartInfo.length == 0 && zyPartInfo.length > 0) {
      this.type = '2'
    } else {
      this.type = ''
    }
    this.$apply()
  }
}
