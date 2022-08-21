import wepy from 'wepy';
import { connect, getStore } from 'wepy-redux';
import {forEach, find, propEq, multiply, forEachObjIndexed, includes, add, length, map, is, T} from 'ramda';
import Header from '@/components/goodsHeader/index';
import emptyDataType from "@/components/empty-data-type/index";
import systemMixin from '@/mixins/system';
import commonMixin from '@/mixins/common';
import Toast from '@/components/vant/toast/toast';
import {
  getThreeMaterialGroupAndSuppliers, getDmsGoodsPrice,
  getDmsGoodsInventory, getClassificationPrice,
  getClassificationStock, getEngineerList,
  getPreferentialList, getBuyoutList,
  getClassificationList, getGoodsFilters,
  getSpecialFilters,
  getAuthority,getProduct
} from '@/store/actions/classification';
import { getGoodsStock, getGoodsModel } from '@/store/actions/goods';
import { Weapp } from '@/components/vant/definitions/weapp';
import { userLogin } from '@/store/actions/user';
import { getAlertInfo } from '@/utils/index';

import {
  RESET_PRODUCT_IMG, RESET_CLASSIFICATION_LIST,
  RESET_ENGINEER_LIST, RESET_PREFERENTIAL_LIST,
  RESET_BUYOUT_LIST
} from '@/store/types/classification';
import { TOGGLE_CLASSIFICATION_COLLECTION } from '@/store/types/classification';
import utilsWxs from '../../../wxs/utils.wxs';
import {request} from '@/utils/request';
interface Data {
  vans: any[],
  showProduct: any[]
  statusBarHeight: string;
  menuWidth: number;
  visible: boolean;
  visibelTop: boolean;
  scrollTop: number;
  category: boolean;
  engineeringZone: boolean;
  specialZone: boolean;
  buyoutZone: boolean;
  customZone: boolean;
  index: number;
  servicesVisible: boolean;
  projectcode: string;
  projectname: string;
  projectstatus: number;
  categoryid: string;
  normalfiltering: string;
  Suppliersextend: boolean;
  Itemgroupextend: boolean;
  totalPrice: number;
  onNumber: number;
  notLogin: boolean;
  specialProcurement: boolean;
  dmscategoryIndex: number;
  dmsmatklListPopup: string;
  dmscategoryId: string;
  isCheckAll: boolean;
  onselectArr: any[];
  classificationpopupid: string;
  classificationpopup: string;
  specialpopup: string;
  productGrouppopup: string;
  categoryIndex: number;
  specialprojectstatus: number;
  onspecialProjectcodeChange: string;
  onspecialProjectnameChange: string;
  onspecialProjectChange: string;
  buyoutstatus: string;
  onBuyoutProjectcodeChange: string;
  onBuyoutProjectnameChange: string;
  pageNo: number;
  fill: boolean;
  selectItemNumber: number;
  onPopupItemNomber: string;
  onPopupItemName: string;
  checkMainPrice: boolean;
  isPermission: boolean;
  isTab: boolean;
  generalZonePermissions: boolean;
  freeShippingTip: string;
}
const { width } = wx.getMenuButtonBoundingClientRect();

@connect({
  user({ user }) {
    return user
  },
  mixinCurrentUser({ user }) {
    return user.info || {}
  },
  engineerList({ classification }) {
    return classification.categories
  },
  dmsmatklList({ classification }) {
    return classification.dmsmatklList
  },
  dmsOrgList({ classification }) {
    return classification.dmsOrgList
  },
  preferential({ classification }) {
    return classification.preferential
  },
  buyoutList({ classification }) {
    return classification.buyout
  },
  classification({ classification }) {
    return classification.classification
  },
  orgIds({ classification }) {
    return classification.orgIds
  },
  loadingInfo({ classification }) {
    return classification.loadingInfo
  },
  filters({ classification }) {
    return classification.filters
  },
  specialfilters({ classification }) {
    return classification.specialfilters
  },
  totalPages({ classification }) {
    return classification.totalPages
  },
  currentPage({ classification }) {
    return classification.currentPage
  },
  products({ classification }) {
    return classification.products
  }
}, {
  getEngineerList,
  getPreferentialList,
  getBuyoutList,
  getClassificationList,
  getGoodsFilters,
  getSpecialFilters,
  userLogin,
  getClassificationPrice,
  getClassificationStock,
  getDmsGoodsPrice,
  getDmsGoodsInventory,
  getThreeMaterialGroupAndSuppliers,
  getGoodsModel,
  getGoodsStock,
  getAuthority,
  getProduct
})
export default class Take extends wepy.page {
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
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-tabs': '../../../components/vant/tabs/index',
      'van-radio': '../../../components/vant/radio/index',
      'van-radio-group': '../../../components/vant/radio-group/index',
      'van-cell': '../../../components/vant/cell/index',
      'van-field': '../../../components/vant/field/index',
      'van-loading': '../../../components/vant/loading/index',
      'van-stepper': '../../../components/vant/stepper/index',
      'van-cell-group': '../../../components/vant/cell-group/index',
      'img': '../../../components/img/index',
      'item': '../../../components/list-item/index',
      'container': '../../../components/container/index',
      'no-permission': '../../../components/no-permission/index',
    },
  }
  data: Data = {
    dmsmatklListPopup: '',
    dmscategoryIndex: 0,
    specialProcurement: false,
    projectstatus: 1,
    projectcode: '',
    projectname: '',
    // 供应商
    servicesVisible: true,
    statusBarHeight: '',
    menuWidth: width,
    visible: false,
    // 回到顶部
    visibelTop: false,
    scrollTop: -1,
    // 显隐开关
    category: false,
    engineeringZone: true,
    specialZone: true,
    buyoutZone: true,
    customZone: true,
    // popup控制
    index: 0,
    Suppliersextend: false,
    Itemgroupextend: false,
    categoryid: '1',
    dmscategoryId: '1',
    normalfiltering: '',
    totalPrice: 0,
    isCheckAll: false,
    onselectArr: [],
    // 普通分类物料组id
    classificationpopupid: '',
    classificationpopup: '',
    specialpopup: '',
    productGrouppopup: '',
    categoryIndex: 0,// 当前品类子品类
    specialprojectstatus: 2,
    onspecialProjectcodeChange: '',
    onspecialProjectnameChange: '',
    onspecialProjectChange: '',
    buyoutstatus: 'begin',
    onBuyoutProjectcodeChange: '',
    onBuyoutProjectnameChange: '',
    pageNo: 1,
    fill: false,
    onNumber: 0,
    notLogin: false,
    selectItemNumber: 0,
    onPopupItemNomber: '',
    onPopupItemName: '专区采购',
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
    purchaseTypePopup: '',
    goodModelAll: [],
    goodModelMatkls: [],
    goodModelSelect: '',
    goodModelList: [],
    conditonShow: true,
    vans: [
      { label: '电视' },
      { label: '空调' },
      { label: '冰箱' },
      { label: '手机' },
      { label: '洗衣机' },
      { label: '冷柜' },
      { label: '厨卫' }
    ],
    showProduct: [],
    isPermission: false,
    isTab: false,
    zoneButtonShowArr: [],
    generalZonePermissions: false,
    freeShippingTip: '',
  }

  mixins = [systemMixin, commonMixin];

  components = {
    header: Header,
    emptyDataType: emptyDataType,
    emptyDataAuth: emptyDataType,
  };

  watch = {
    loadingInfo() {
      if (this.loadingInfo.inventory) {
          /**
       * queryType
       * 1.海信采购 purchase
       * 2.渠道分销 distribute
       * 3.渠道订单审核 check
       * 4.商家库存查询 stock
       */
      if(this.loadingInfo.inventory.queryType == 'purchase'){
        this.methods.getClassificationStock(this.loadingInfo.inventory)
      }else if(this.loadingInfo.inventory.queryType == 'distribute')
          this.classification.forEach((element,i) => {
          let arr = [];
          arr.push(this.classification[i].productCode);
          getDmsGoodsInventory({ cisCode: wepy.$instance.globalData.cisCode, productCodes: arr,supplierCode:this.classification[i].agentCisCode },res => {
            const { invQty,gicInvQty } = res.data.data[0];
            if(this.classification[i]) {
              this.classification[i]['invQty'] = invQty;
              this.classification[i]['gicInvQty'] = gicInvQty;
            }
            this.$apply();
          })
        });
      }
      if (this.loadingInfo.price) {
        this.methods.getClassificationPrice(this.loadingInfo.price)
      }
      if (this.loadingInfo.loadingDms) {
        this.methods.getDmsGoodsPrice({ orgId: this.loadingInfo.loadingDms.orgId, productId: this.loadingInfo.loadingDms.productId })
      }

      // if (this.loadingInfo.loadingDmsInventory && this.loadingInfo.loadingDmsInventory.length > 0) {
      //   // this.methods.getDmsGoodsInventory({ cisCode: wepy.$instance.globalData.cisCode, productCodes: this.loadingInfo.loadingDmsPrice })
      //   this.methods.getDmsGoodsInventory({ cisCode: wepy.$instance.globalData.cisCode, productCodes: this.loadingInfo.loadingDmsInventory,supplierCode:'7097639' })
      // }
    }
  };
  wxs = {
    utils: utilsWxs,
  };
  // 页面内交互写在methods里
  methods = {
    onminiSelecte2: (e) => {

      if(e&&e.detail){
        switch (e.detail.title){
          case '电视':
            this.showProduct = this.products.hotProductDTOs;
            break;
          case '空调':
            this.showProduct = this.products.hotProductDTOs1;
            break;
          case '冰箱':
            this.showProduct = this.products.hotProductDTOs5;
            break;
          case '手机':
            this.showProduct = this.products.hotProductDTOs3;
            break;
          case '洗衣机':
            this.showProduct = this.products.hotProductDTOs2;
            break;
          case '冷柜':
            this.showProduct = this.products.hotProductDTOs4;
            break;
          case '厨卫':
            this.showProduct = this.products.hotProductDTOs6;
            break;
        }
      }else{
        this.showProduct = this.products.hotProductDTOs
      }
      this.$apply()
    },
    // 套购确认
    confirmbuyout: () => {
      this.pageNo = 1
      this.visible = !this.visible
      this.methods.scrollToTop();
      this.methods.getBuyoutList({ page: 1, status: this.buyoutstatus, packageCode: this.onBuyoutProjectcodeChange, packageName: this.onBuyoutProjectnameChange });
    },
    buyoutselect: (string: any) => {
      this.buyoutstatus = string
    },
    onBuyoutProjectcodeChange: (event: { detail: any; }) => {
      this.onBuyoutProjectcodeChange = event.detail
    },
    onBuyoutProjectnameChange: (event: { detail: any; }) => {
      this.onBuyoutProjectnameChange = event.detail
    },
    specialselect: (number: any) => {
      this.specialprojectstatus = number
    },
    // 特惠编码
    onspecialProjectcodeChange: (event: { detail: any; }) => {
      this.onspecialProjectcodeChange = event.detail
    },
    // 特惠商品型号
    onspecialProjectnameChange: (event: { detail: any; }) => {
      this.onspecialProjectnameChange = event.detail
    },
    // 特惠商品批次
    onspecialProjectChange: (event: { detail: any; }) => {
      this.onspecialProjectChange = event.detail
    },
    // 特惠供应商选中
    specialpopup: (key: any) => {
      this.specialfilters.fwOrgsGroupMap.forEach((res: { key: any; specialstatus: boolean; }) => {
        if (res.key == key) {
          res.specialstatus = !res.specialstatus
        }
      })
      const item = find(propEq('key', key))(this.specialfilters.fwOrgsGroupMap)
      this.methods.selectedspecialpopup(item)
    },
    selectedspecialpopup: (arr: { length: number; }) => {
      if (arr.length <= 0) {
        return
      }
      var attrs = this.specialfilters.fwOrgsGroupMap.filter(function (item: { classificationstatus: boolean; }) {
        return item.specialstatus === true
      })
      let specialpopup = attrs.map(function (item: { value: any; }) { return item.value })
      this.specialpopup = specialpopup.join(',')
    },
    // 特惠物料组选中
    productGrouppopup: (key: any) => {
      this.specialfilters.productGroupMap.forEach((res: { key: any; specialstatus: boolean; }) => {
        if (res.key == key) {
          res.specialstatus = !res.specialstatus
        }
      })
      const item = find(propEq('key', key))(this.specialfilters.productGroupMap)
      this.methods.selectedproductGrouppopup(item)
    },
    selectedproductGrouppopup: (arr: { length: number; }) => {
      if (arr.length <= 0) {
        return
      }
      var attrs = this.specialfilters.productGroupMap.filter(function (item: { specialstatus: boolean; }) {
        return item.specialstatus === true
      })
      let productGrouppopup = attrs.map(function (item: { value: any; }) { return item.value })
      this.productGrouppopup = productGrouppopup.join(',')
    },
    // 特惠搜索确认
    confirmSpecial: (key: string, number: number) => {
      if (key !== "false") {
        this.visible = !this.visible
      }
      if (!number) {
        number = 1
      }
      if (key == "changestatus") {
        this.pageNo = 1
      }
      this.methods.scrollToTop();
      let specialItemgroup = ''
      let specialSuppliers = ''
      if (this.specialfilters.fwOrgsGroupMap) {
        this.specialfilters.fwOrgsGroupMap.map((res: { specialstatus: any; key: string; }) => {
          if (res.specialstatus) {
            specialSuppliers = res.key + ',' + specialSuppliers
          }
        })
      }
      if (this.specialfilters.productGroupMap) {
        this.specialfilters.productGroupMap.map((res: { specialstatus: any; key: string; }) => {
          if (res.specialstatus) {
            specialItemgroup = res.key + ',' + specialItemgroup
          }
        })
      }
      specialItemgroup = specialItemgroup.substring(0, specialItemgroup.length - 1)
      specialSuppliers = specialSuppliers.substring(0, specialSuppliers.length - 1)
      this.methods.getPreferentialList({ _loading: true, pageNo: number, productModel: this.onspecialProjectnameChange, status: this.specialprojectstatus, batch: this.onspecialProjectChange, reportCode: this.onspecialProjectcodeChange, orgId: specialSuppliers, matkl: specialItemgroup });
    },
    // 品类物料组选中
    dmsclassification: (key: any) => {
      this.dmsOrgList.forEach((res: { key: any; classificationstatus: boolean; }) => {
        if (res.key == key) {
          res.classificationstatus = !res.classificationstatus
        }
      })
      const item = find(propEq('key', key))(this.dmsOrgList)
      this.methods.dmsselectedclassificationpopup(item)
    },
    dmsselectedclassificationpopup: (arr: { length: number; }) => {
      if (arr.length <= 0) {
        return
      }
      var attrs = this.dmsOrgList.filter(function (item: { classificationstatus: boolean; }) {
        return item.classificationstatus === true
      })
      this.specialfilters.classificationpopup = attrs.map(function (item: { value: any; }) { return item.value })
      this.classificationpopup = this.specialfilters.classificationpopup.join(',')
    },
    dmsmatkl: (key: any) => {
      this.dmsmatklList.forEach((res: { key: any; classificationstatus: boolean; }) => {
        if (res.key == key) {
          res.classificationstatus = !res.classificationstatus
        }
      })
      const item = find(propEq('key', key))(this.dmsmatklList)
      this.methods.dmselectedmsmatkl(item)
    },
    dmselectedmsmatkl: (arr: { length: number; }) => {
      if (arr.length <= 0) {
        return
      }
      var attrs = this.dmsmatklList.filter(function (item: { classificationstatus: boolean; }) {
        return item.classificationstatus === true
      })
      this.specialfilters.classificationpopup = attrs.map(function (item: { value: any; }) { return item.value })
      this.dmsmatklListPopup = this.specialfilters.classificationpopup.join(',')
    },
    classificationpopup: (key: any) => {
      this.specialfilters.fwOrgsGroupMap.forEach((res: { key: any; classificationstatus: boolean; }) => {
        if (res.key == key) {
          res.classificationstatus = !res.classificationstatus
        }
      })
      const item = find(propEq('key', key))(this.specialfilters.fwOrgsGroupMap)
      this.methods.selectedclassificationpopup(item)
    },
    // 选中物料组获取商品信息
    selectedclassificationpopup: (arr: { length: number; }) => {
      if (arr.length <= 0) {
        return
      }
      var attrs = this.specialfilters.fwOrgsGroupMap.filter(function (item: { classificationstatus: boolean; }) {
        return item.classificationstatus === true
      })
      this.specialfilters.classificationpopup = attrs.map(function (item: { value: any; }) { return item.value })
      this.classificationpopup = this.specialfilters.classificationpopup.join(',')
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
    },

    // 提交选择商品数量传至特惠单下单
    submitOrder: () => {
      let idString = ''
      let countString = ''
      let same = ''
      let matklId = ''
      let isgo = true
      let isgomatklId = true
      this.preferential.forEach((res: { select: any; id: any; iscount: any; }) => {
        if (res.select) {
          idString = res.id + ',' + idString,
            countString = res.iscount + ',' + countString,
            same = res.fwOrgName,
            matklId = res.matklId
        }
      })
      this.preferential.forEach((res: { select: any; id: any; iscount: any; }) => {
        if (res.select) {
          if (same !== res.fwOrgName) {
            Toast.fail({
              message: '请选择同一供应商',
              duration: 1000,
            });
            isgo = false
            isgomatklId = false
            return
          }
        }
      })
      if (isgomatklId) {
        this.preferential.forEach((res: { select: any; matklId: string; }) => {
          if (res.select) {
            if (matklId !== res.matklId) {
              Toast.fail({
                message: '请选择同一物料组',
                duration: 1000,
              });
              isgomatklId = false
              return
            }
          }
        })
      }
      idString = idString.substring(0, idString.length - 1);
      let arrString = idString + ':' + countString
      if (arrString !== ':' && isgo && isgomatklId) {
        wx.navigateTo({
          url: `../../goods/preference/index?arr=${arrString}`
        })
        this.preferential.forEach((res: { iscount: number; }) => {
          res.iscount = 0
        })
      }
    },
    // 查看所选择特惠商品
    checkAll: () => {
      this.isCheckAll = !this.isCheckAll
      this.preferential.forEach((res: { select: boolean; relSelect: boolean; }) => {
        if (res.select !== true) {
          res.relSelect = !res.relSelect
        }
      })
    },
    // 特惠选择商品
    preferentialSelect: (id: any, status: string) => {
      this.preferential.forEach((res: { id: any; select: boolean; price: any; billPrice: number; iscount: number; }) => {
        if (res.id == id) {
          if (status == 'false') {
            res.select = !res.select
            if (this.isCheckAll == true) {
              res.relSelect = true
              res.iscount = 0
            }
          } else if (status == "select") {
            res.select = true
            if (this.isCheckAll == true) {
              if (res.iscount == 0) {
                res.relSelect = true
              }
            }
          }
          if (res.iscount == 0) {
            res.select = false
          }
          res.price = (multiply(res.billPrice, res.iscount)).toFixed(2)
        }
      })
      let itemprice = 0.00
      this.preferential.forEach((res: { select: any; price: number; }) => {
        if (res.select) {
          itemprice = add(itemprice, res.price)
        }
      })
      this.totalPrice = itemprice.toFixed(2)
    },
    // 获取商品选择数量
    onSelectNumber: (id: any, event: any) => {
      this.preferential.forEach((res: { id: any; iscount: any; }) => {
        if (res.id == id) {
          res.iscount = event.detail
          this.methods.preferentialSelect(id, 'select')
        }
      })
    },
    // 选择供应商
    chooseSpecialServices: (value: any, key: any) => {
      this.servicesVisible = !this.servicesVisible
      if (value == "全部" && key == '') {
        this.specialfilters.orgMatkl.forEach((element: { key: any; active: boolean; }) => {
          if (element.key == key) {
            element.active = true
          } else {
            element.active = false
          }
        });
        this.specialfilters.fwOrgsGroupMap.forEach((res: { specialstatus: boolean; }) => {
          res.specialstatus = false
        })
        this.specialfilters.productGroupMap.forEach((res: { specialstatus: boolean; }) => {
          res.specialstatus = false
        })
      } else {
        this.specialfilters.orgMatkl.forEach((element: { key: any; active: boolean; }) => {
          if (element.key == key) {
            element.active = true
          } else {
            element.active = false
          }
        });
        let arr = key.split('-')
        this.specialfilters.fwOrgsGroupMap.forEach((res: { key: any; specialstatus: boolean; }) => {
          if (res.key == arr[0]) {
            res.specialstatus = true
          } else {
            res.specialstatus = false
          }
        })
        this.specialfilters.productGroupMap.forEach((res: { key: any; specialstatus: boolean; }) => {
          if (res.key == arr[1]) {
            res.specialstatus = true
          } else {
            res.specialstatus = false
          }
        })
      }
      this.specialfilters.firstorg = value
      this.methods.confirmSpecial('false')
      this.$apply();
    },
    // 物料组
    Itemgroup: () => {
      this.Itemgroupextend = !this.Itemgroupextend
    },
    // 供应商
    Suppliers: () => {
      this.Suppliersextend = !this.Suppliersextend
    },
    // 确定搜索
    confirmSearch: () => {
      this.pageNo = 1
      this.visible = !this.visible
      this.methods.getClassification();
      this.methods.scrollToTop();
    },
    // 重置选项
    resetSearch: () => {
      this.normalfiltering = ''
      this.classificationpopup = ''
      this.dmsmatklListPopup = ''
      this.checkMainPrice = false
      if (this.filters) {
        this.filters.map((res: { value: { map: (arg0: (item: any) => void) => void; }; filter: never[]; }) => {
          if (res.value) {
            res.value.map((item) => {
              if (item.active == true) {
                item.active = !item.active
              }
            })
          }
          if (res.filter.length > 0) {
            res.filter = []
          }
        })
      }
      if (this.specialfilters && this.specialfilters.fwOrgsGroupMap) {
        this.specialfilters.fwOrgsGroupMap.forEach((res: { classificationstatus: boolean; }) => {
          if (res.classificationstatus == true) {
            res.classificationstatus = false
          }
        })
      }
      if (this.dmsOrgList && this.dmsOrgList.length > 0 && this.selectItemNumber == 1) {
        forEach((item: { classificationstatus: boolean }) => {
          if (item.classificationstatus == true) {
            item.classificationstatus = false
          }
        }, this.dmsOrgList)
      }
      if (this.dmsmatklList && this.dmsmatklList.length > 0 && this.selectItemNumber == 1) {
        forEach((item: { classificationstatus: boolean }) => {
          if (item.classificationstatus == true) {
            item.classificationstatus = false
          }
        }, this.dmsmatklList)
      }
    },
    // 选中
    selectedStr: (arr: { value: { length: number; filter: (arg0: (item: { active: boolean; }) => boolean) => void; }; filter: { join: (arg0: string) => void; }; }) => {
      if (arr.value.length <= 0) {
        return
      }
      var attrs = arr.value.filter(function (item: { active: boolean; }) {
        return item.active === true
      })
      arr.filter = attrs.map(function (item: { value: any; }) { return item.value })
      return arr.filter.join(',')
    },
    // 抽屉选中
    chooseAttr: (group: any, name: any) => {
      const item = find(propEq('key', group))(this.filters)
      if (item) {
        const attr = find(propEq('value', name))(item.value)
        if (attr) {
          attr.active = !attr.active
        }
      }
      this.methods.selectedStr(item)
    },
    // 抽屉显隐
    toggleExtend: (group: any) => {
      const item = find(propEq('key', group))(this.filters)
      if (item) {
        item.extend = !item.extend
      }
    },
    onminiSelecte: (event: Weapp.Event) => {
      getStore().dispatch({ type: RESET_CLASSIFICATION_LIST, payload: [] })
      this.methods.resetSearch()
      if (this.user && this.user.zyPartInfo && this.user.zyPartInfo.length > 0) {
        this.categoryid = this.user.zyPartInfo[event.detail.index].id
        this.pageNo = 1
      }
      this.categoryIndex = event.detail.index
      // 滚动到最上面
      this.methods.getcollectionpopup();
      this.methods.scrollToTop();
      this.methods.getClassification();
      this.methods.getThreeMaterialGroupAndSuppliers({ catalogId: this.selectItemNumber == 0 ? this.categoryid : this.dmscategoryId, type: this.selectItemNumber == 0 ? '2' : '1' })
      this.methods.getGoodsFilters({ catalogId: this.selectItemNumber == 0 ? this.categoryid : this.dmscategoryId });
    },
    onminiDmsSelecte: (event: Weapp.Event) => {
      getStore().dispatch({ type: RESET_CLASSIFICATION_LIST, payload: [] })
      this.methods.resetSearch()
      if (this.user && this.user.fxPartInfo && this.user.fxPartInfo.length > 0) {
        this.dmscategoryId = this.user.fxPartInfo[event.detail.index].id
        this.pageNo = 1
      }
      this.dmscategoryIndex = event.detail.index
      // 滚动到最上面
      this.methods.getcollectionpopup();
      this.methods.scrollToTop();
      this.methods.getClassification();
      this.methods.getThreeMaterialGroupAndSuppliers({ catalogId: this.selectItemNumber == 0 ? this.categoryid : this.dmscategoryId, type: this.selectItemNumber == 0 ? '2' : '1' })
      this.methods.getGoodsFilters({ catalogId: this.selectItemNumber == 0 ? this.categoryid : this.dmscategoryId });
    },
    //定制专区物料组选择
    onModelSelecte: (event: Weapp.Event) => {
      getStore().dispatch({ type: RESET_CLASSIFICATION_LIST, payload: [] })
      this.methods.resetSearch()
      if (this.goodModelMatkls.length > 0) {
        this.goodModelSelect = this.goodModelMatkls[event.detail.index]
        this.pageNo = 1
      }
      this.goodModelSelect = event.detail.index
      // 滚动到最上面
      this.methods.getcollectionpopup();
      this.methods.scrollToTop();
      this.methods.getClassification();
      this.methods.getThreeMaterialGroupAndSuppliers({ catalogId: this.selectItemNumber == 0 ? this.categoryid : this.dmscategoryId, type: this.selectItemNumber == 0 ? '2' : '1' })
      //切换物料组
      this.goodModelList = this.goodModelAll[this.goodModelMatkls[this.goodModelSelect]];
      //查询价格/库存
      if(this.goodModelList) {
        for (var i = 0; i < this.goodModelList.length; i++) {
          this.methods.getPrice(this.goodModelList[i]);
          this.methods.getStock(this.goodModelList[i]);
        }
      }
    },

    // 工程单条件搜索
    confirmEngineer: () => {
      this.pageNo = 1
      this.methods.scrollToTop();
      this.methods.getEngineerList({ pageNo: 1, projectApplyCode: this.projectcode, projectName: this.projectname, status: this.projectstatus })
      this.visible = !this.visible
    },
    // 项目编码
    onProjectcodeChange: (event: Weapp) => {
      this.projectcode = event.detail
    },
    // 项目名称
    onProjectnameChange: (event: Weapp) => {
      this.projectname = event.detail
    },
    // 供应商
    toggleServicesVisible() {
      this.servicesVisible = !this.servicesVisible;
    },
    specialPopup() {
      this.specialProcurement = !this.specialProcurement;
    },
    select: (e: any) => {
      this.projectstatus = e.currentTarget.dataset.name
    },
    onPopupList: (index: number) => {
      this.selectItemNumber = 2
      this.specialProcurement = false
      this.onPopupItemNomber = index
      if (index == 1) {
        this.onPopupItemName = '工程专区'
        this.index = 1,
          this.category = true,
          this.engineeringZone = false,
          this.specialZone = true,
          this.buyoutZone = true
        this.pageNo = 1,
          this.fill = false;
        this.conditonShow = true;
        getStore().dispatch({ type: RESET_ENGINEER_LIST, payload: [] })
        this.methods.getEngineerList({ _loading: true, pageNo: 1, status: this.projectstatus, projectApplyCode: this.projectcode });
      } else if (index == 2) {
        this.index = 2,
          this.onPopupItemName = '特惠专区'
        this.category = true,
          this.engineeringZone = true,
          this.specialZone = false,
          this.buyoutZone = true
        this.totalPrice = 0
        this.isCheckAll = false
        this.pageNo = 1,
          this.fill = false;
        this.conditonShow = true;
        getStore().dispatch({ type: RESET_PREFERENTIAL_LIST, payload: [] })
        this.methods.confirmSpecial('false');
      } else if (index == 3) {
        this.index = 3,
          this.onPopupItemName = '套购专区'
        this.category = true,
          this.engineeringZone = true,
          this.specialZone = true,
          this.buyoutZone = false,
          this.pageNo = 1,
          this.fill = false;
        this.conditonShow = true;
        getStore().dispatch({ type: RESET_BUYOUT_LIST, payload: [] })
        this.methods.getBuyoutList({ _loading: true, page: 1, status: this.buyoutstatus, packageCode: this.onBuyoutProjectcodeChange, packageName: this.onBuyoutProjectnameChange });
      }else if (index == 4){
        //定制专区
        this.index = 4;
        this.onPopupItemName = '定制专区';
        this.category = true;
        this.engineeringZone = true;
        this.specialZone = true;
        this.buyoutZone = true;
        //隐藏查询条件
        this.conditonShow = false;


        this.goodModelList = this.goodModelAll[this.goodModelMatkls[0]];
        //查询价格/库存
        if (this.goodModelList) {
          for (var i = 0; i < this.goodModelList.length; i++) {
            this.methods.getPrice(this.goodModelList[i]);
            this.methods.getStock(this.goodModelList[i]);
          }
        }

      }
    },

    //查询价格
    getPrice: (item: any) => {
      const data = { code: item.productId, orgId: item.orgId, orgCode: item.orgCode }
      request({ api: 'product/getPrices.nd', method: 'POST', data }).then((res: any) => {
        if (is(Array, res) && length(res) > 0) {
          const prices = map(({ productCode, fixedDiscount, makeUpType, price, standardPrice, pricingGroupName }) => ({
            productCode, fixedDiscount, makeUpType, price, standardPrice, pricingGroupName,
          }), res);
          item.price = prices[0].price;
          this.$apply();
        }
      })
    },

    //库存查询
    // getStock: (item: any) => {
    //   const data = { code: item.productId, orgId: item.orgId, orgCode: item.orgCode }
    //   this.methods.getGoodsStock(data).then((res) => {
    //     if(res && res.payload) {
    //       item.inventory = res.payload.inventory;
    //     }
    //     this.$apply();
    //   })
    // },


    //库存查询
    getStock: (item: any) => {
      /**
       * queryType
       * 1.海信采购 purchase
       * 2.渠道分销 distribute
       * 3.渠道订单审核 check
       * 4.商家库存查询 stock
       */
      let type = this.loadingInfo.inventory ? this.loadingInfo.inventory.queryType:'purchase'
      const data = { code: item.productId, orgId: item.orgId, queryType:type }
      this.methods.getGoodsStock(data).then((res) => {
        if(res &&  res.payload.length > 0) {
          item.inventory = res.payload[0].inventory;
          item.ownInv = res.payload[0].ownInv;
          item.sharedInv = res.payload[0].sharedInv;
        }
        this.$apply();
      })
    },
    // 页面选择交互
    onSelecte: (index: number) => {
      this.onPopupItemName = index == 2 ? this.onPopupItemName : '专区采购'
      this.onPopupItemNomber = index == 2 ? this.onPopupItemNomber : ''
      if (index == 0) {
        this.selectItemNumber = 0
        this.index = 0,
          this.category = false,
          this.engineeringZone = true,
          this.specialZone = true,
          this.buyoutZone = true
        // 切换时，重新触发搜索
        const mockTap = {
          type: 'tap',
          timeStamp: 1,
          target: {
            id: '',
            tagName: '',
            dataset: {}
          },
          currentTarget: {
            id: '',
            tagName: '',
            dataset: {}
          },
          detail: {
            index: this.categoryIndex
          }
        }
        this.pageNo = 1,
          this.fill = false
        this.specialProcurement = false
        this.methods.onminiSelecte(mockTap)
        getStore().dispatch({ type: RESET_CLASSIFICATION_LIST, payload: [] })
      } else if (index == 1) {
        // TODO: 新的专区
        this.selectItemNumber = 1
        this.category = false,
          this.index = 0,
          this.engineeringZone = true,
          this.specialZone = true,
          this.buyoutZone = true
        const mockTap = {
          type: 'tap',
          timeStamp: 1,
          target: {
            id: '',
            tagName: '',
            dataset: {}
          },
          currentTarget: {
            id: '',
            tagName: '',
            dataset: {}
          },
          detail: {
            index: this.dmscategoryIndex
          }
        }
        this.pageNo = 1,
          this.fill = false
        this.specialProcurement = false
        this.methods.onminiDmsSelecte(mockTap)
        getStore().dispatch({ type: RESET_CLASSIFICATION_LIST, payload: [] })
      } else if (index == 2) {
        // TODO: 应该还有些什么我还没想到
        this.specialProcurement = true
      }
    },
    // 滑动监听
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
    // 跳转统一方法
    goNext: (e: { currentTarget: { dataset: { url: any; }; }; }) => {
      const { url } = e.currentTarget.dataset
      wx.navigateTo({
        url: url
      })
    },
    // 回到顶部
    scrollToTop: () => {
      this.visibelTop = false
      this.scrollTop = 0
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
      this.visible = true
      if (this.orgIds) {
        this.orgIds.forEach((res: any) => {
          if (this.specialfilters && this.specialfilters.fwOrgsGroupMap) {
            this.specialfilters.fwOrgsGroupMap.forEach(element => {
              if (element.key == res) {
                element.classificationOnsee = false
              }
            });
          }
        })
      }
    },
    onClose: () => {
      this.visible = false;
    },
    // 应该有个统一的滚动方法
    onPullBottom: () => {
      if (this.pageNo < this.totalPages) {
        if (!this.category) {
          let index = this.currentPage + 1
          this.pageNo = index
          this.methods.getClassification(index)
        }
        if (!this.engineeringZone) {
          let index = this.pageNo + 1
          this.pageNo = index
          this.methods.getEngineerList({ _loading: true, pageNo: index, status: this.projectstatus })
        }
        if (!this.specialZone) {
          let index = this.pageNo + 1
          this.pageNo = index
          if (!this.isCheckAll) {
            this.methods.confirmSpecial('false', index)
          }
        }
        if (!this.buyoutZone) {
          let index = this.pageNo + 1
          this.pageNo = index
          this.methods.getBuyoutList({ _loading: true, page: index, status: this.buyoutstatus, packageCode: this.onBuyoutProjectcodeChange, packageName: this.onBuyoutProjectnameChange });
        }
      } else {
        if (!this.specialZone) {
          this.fill = true
        }
      }
    },
    // 普通分类页筛选条件
    getClassification: (key: number) => {

      if (!key) {
        key = 1
      }
      let normalfiltering = ''
      let classificationpopupid = ''
      let dmsitempopup = ''
      let purchaseType = ''
      if (this.filters.length > 0) {
        this.filters.map((res: { filter: { length: number; map: (arg0: (item: any) => void) => void; }; }) => {
          if (res.filter.length > 0) {
            res.filter.map((item) => {
              normalfiltering = res.categoryid + ':' + item + ',' + normalfiltering
            })
          }
        })
      }
      if (this.specialfilters.fwOrgsGroupMap && this.selectItemNumber == 0) {
        this.specialfilters.fwOrgsGroupMap.map((res: { classificationstatus: any; key: string; }) => {
          if (res.classificationstatus) {
            classificationpopupid = res.relkey + ',' + classificationpopupid
          }
        })
      } else {
        this.dmsOrgList.map((res: { classificationstatus: any; key: string; }) => {
          if (res.classificationstatus) {
            classificationpopupid = res.key + ',' + classificationpopupid
          }
        })
      }
      if (this.dmsmatklList && this.dmsmatklList.length > 0 && this.selectItemNumber == 1) {
        this.dmsmatklList.map((res: { classificationstatus: any; key: string; }) => {
          if (res.classificationstatus) {
            dmsitempopup = res.key + ',' + dmsitempopup
          }
        })
      }
      if(this.selectItemNumber == 0){
        this.purchaseTypeOptions.map((res: { status: any; key: string; }) => {
          if (res.status) {
            purchaseType = res.key + ',' + purchaseType
          }
        })
      }
      dmsitempopup = dmsitempopup.substring(0, dmsitempopup.length - 1)
      normalfiltering = normalfiltering.substring(0, normalfiltering.length - 1)
      classificationpopupid = classificationpopupid.substring(0, classificationpopupid.length - 1)
      purchaseType = purchaseType.substring(0, purchaseType.length - 1)

      this.methods.getClassificationList({
        type: this.selectItemNumber == 0 ? '2' : '1',
        _loading: true,
        pageNum: key,
        keyword: '',
        productId: '',
        filter: normalfiltering,
        sortField: '',
        catalogId: this.selectItemNumber == 0 ? this.categoryid : this.dmscategoryId,
        orgId: classificationpopupid,
        matklCodes: dmsitempopup ,
        havePrice: this.checkMainPrice ? 1 : 0,
        purchaseType:  purchaseType.indexOf(",") >=0 ? '3' : purchaseType
      }).then(() => {
      })
      this.normalfiltering = ''
    },

    // 跳转到收藏
    show() {
      // type 1 为分销 2 是海信  3 为全部
      const id = this.selectItemNumber == 0 ? this.categoryid : this.dmscategoryId
      const type = this.selectItemNumber == 0 ? '2' : '1'
      wx.navigateTo({
        url: `/pages/goods/collection/index?catalogId=${id}&type=${type}`
      })
    },
    //举报
    tipOff() {
      wx.navigateTo({
        url: `/pages/me/my-complaints/index`
      })
    },
    // 图片优化
    imgLose({ detail }: any) {
      getStore().dispatch({ type: RESET_PRODUCT_IMG, payload: detail })
    },
    toggleCollection({ detail }: any) {
      getStore().dispatch({ type: TOGGLE_CLASSIFICATION_COLLECTION, payload: detail })
    },
    // 获取筛选条件
    getcollectionpopup: () => {
      this.methods.getSpecialFilters().then((res: { payload: { orgMatkl: any; }; }) => {
        let specialfilters: never[] | { value: any; key: string | number | symbol; }[] | { key: { split: (arg0: string) => void; }; }[] = []
        forEachObjIndexed((value, key) => {
          let item = {
            value,
            key,
          }
          specialfilters.push(item)
        }, res.payload.orgMatkl)
        // let arr = specialfilters[0].key.split('-')
        // this.specialfilters.fwOrgsGroupMap.forEach((res: { key: any; specialstatus: boolean; }) => {
        //   if (res.key == arr[0]) {
        //     res.specialstatus = true
        //   } else {
        //     res.specialstatus = false
        //   }
        // })
        // this.specialfilters.productGroupMap.forEach((res: { key: any; specialstatus: boolean; }) => {
        //   if (res.key == arr[1]) {
        //     res.specialstatus = true
        //   } else {
        //     res.specialstatus = false
        //   }
        // })
      })
    },
    // 选中已维护价格的商品
    onCheckMainPrice: () => {
      this.checkMainPrice = !this.checkMainPrice
    },

    // 定制产品详情
    goods(item: any) {
      wx.navigateTo({
        url: `/pages/goods/custom/index?code=${item.id}&orgId=${item.orgId}&orgCode=${item.orgCode}&agentCisCode=${item.agentCisCode}`,
      })
    },

  }
  // 当前是 tab 页时，点击 tab 时触发； 使用自定义菜单custom-tab-bar该功能失效；保留兼容低版本
  onTabItemTap () {
    if(!this.notLogin && wx.getStorageSync('b2b_permission_list')){
      const { productPurchaseAuthority }=JSON.parse(wx.getStorageSync('b2b_permission_list'))
      this.isTab = true
      this.isPermission = productPurchaseAuthority
    }
  }
  onShow() {
    // 自定义底部导航栏-如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态
    if (typeof this.$wxpage.getTabBar === 'function' && this.$wxpage.getTabBar()) {
      this.$wxpage.getTabBar().setData({
        selected: 1
      })
    }
    this.notLogin = !this.isLogin()
    if(this.notLogin){
      return
    }

    if(wx.getStorageSync('b2b_permission_list')){
      const { specialArea, generalZonePermissions }=JSON.parse(wx.getStorageSync('b2b_permission_list'))
      this.zoneButtonShowArr = specialArea
      this.generalZonePermissions = generalZonePermissions
    }

    let globalData = wepy.$instance.globalData;
    // <!-- 17451 分销 17452 直营 17453 代理-->
    if(this.isLogin() == true && globalData.marketModels && globalData.marketModels.indexOf("17451") !== -1) {
      this.methods.getAuthority().then((res: { payload: { data: any; }; })=>{
        if(res.payload.data.isOpen == 'false') {
            wx.showToast({
              title: '您暂无权限访问该功能，请联系上级代理在DMS主数据管理中为您激活账号',
              icon:'none',
              duration: 3000//持续的时间
            })
        }
      })
    }
    this.notLogin = !this.isLogin()
    // 判断身份账号身份
    const zyPartInfo = wepy.$instance.globalData.zyPartInfo
    const fxPartInfo = wepy.$instance.globalData.fxPartInfo
    const loginSystem = wepy.$instance.globalData.loginSystem
    this.isTab=globalData.isTab
    this.isPermission = globalData.isPermission

    if (zyPartInfo.length > 0 && includes('14168810880', loginSystem)) {
      this.categoryid = zyPartInfo[0].id || ''
      if (this.selectItemNumber == 1) {
        this.selectItemNumber = 0
      }
      this.category = false
      this.engineeringZone = true
      this.specialZone = true
      this.buyoutZone = true
    } else if (zyPartInfo.length == 0 && fxPartInfo.length > 0 && includes('14168810879', loginSystem)) {
      if (this.selectItemNumber == 0) {
        this.selectItemNumber = 1
      }
      this.category = false
      this.engineeringZone = true
      this.specialZone = true
      this.buyoutZone = true
      this.specialProcurement = false
      this.dmscategoryId = fxPartInfo[0].id || ''
    } else {
      this.category = true
      this.engineeringZone = true
      this.specialZone = true
      this.buyoutZone = true
      this.categoryid = ''
    }
    this.$apply()
    // else if (zyPartInfo.length == 0 && fxPartInfo.length == 0 && (includes('14168810879',loginSystem) || includes('14168810880',loginSystem) )) {
    //   this.selectItemNumber = 2
    //   // 默认特惠专区
    //   this.methods.onPopupList(2)
    // }
    // 重置step数据
    this.setData({
      onNumber: 0
    })
    if (this.isLogin()) {
      // 获取筛选条件对应的供应商
      // this.methods.getcollectionpopup()
      // 模拟vant进行参数传递
      this.methods.getSpecialFilters()
      const mockTap = {
        type: 'tap',
        timeStamp: 1,
        target: {
          id: '',
          tagName: '',
          dataset: {}
        },
        currentTarget: {
          id: '',
          tagName: '',
          dataset: {}
        },
        detail: {
          index: this.index
        }
      }
      // 拼凑数据
      let mockTapCategory = {
        ...mockTap,
        detail: {
          index: 0
          // index: this.selectItemNumber == 0 ? this.categoryIndex : this.dmscategoryIndex
        }
      }
      const from = this.$parent.globalData.zone
      const categoryIndex = this.$parent.globalData.zoneIndex
      const { projectApplyCode = '', reportCode = '', packageCode = '' } = this.$parent.globalData
      if (projectApplyCode) {
        this.projectcode = projectApplyCode
      }
      if (reportCode) {
        this.onspecialProjectcodeChange = reportCode
      }
      if (packageCode) {
        this.onBuyoutProjectcodeChange = packageCode
      }
      this.$apply()
      if (from) {
        this.$parent.globalData.zone = ''
        this.$parent.globalData.zoneIndex = ''
        if (from === 'engineeringZone') {
          mockTap.detail.index = 1
        } else if (from === 'specialZone') {
          mockTap.detail.index = 2
        } else if (from === 'buyoutZone') {
          mockTap.detail.index = 3
        } else if(from === 'customZone'){
          mockTap.detail.index = 4
        } else if (from === 'category') {
          mockTap.detail.index = 0
          this.categoryIndex = +categoryIndex
        }
        if (from !== 'category') {
          this.methods.onPopupList(mockTap.detail.index);
        } else {
          if (this.selectItemNumber !== 2) {
            this.methods.onSelecte(mockTap.detail.index);
          } else {
            if (categoryIndex) {
              this.methods.onSelecte(mockTap.detail.index);
            } else {
              this.methods.onPopupList(this.onPopupItemNomber || 0)
            }
          }
        }
      } else {
        // 直接触发需要的搜索
        if (this.index !== 0) {
          if (this.selectItemNumber !== 2) {
            this.methods.onSelecte(mockTap.detail.index);
          } else {
            this.methods.onPopupList(this.onPopupItemNomber || 0)
          }
        } else {
          if (zyPartInfo.length > 0) {
            this.methods.onminiSelecte(mockTapCategory)
          } else if (zyPartInfo.length == 0 && fxPartInfo.length > 0) {
            this.methods.onminiDmsSelecte(mockTapCategory)
          }
        }
      }
    }
    //显示上一次的结果
    if(this.goodModelAll) {
      this.goodModelList = this.goodModelAll[this.goodModelMatkls[this.goodModelSelect]];
    }


    //查询定制专区产品
    this.methods.getGoodsModel().then((res: { payload: { data: any; }; }) => {
      if (res) {
        if(res.error==true){
          return;
        }
        this.goodModelMatkls = [];
        const { modelList } = res.payload
        for(var key in modelList) {
          this.goodModelMatkls.push(key);
        }
        this.goodModelAll = modelList;

        //切换物料组
        this.goodModelList = this.goodModelAll[this.goodModelMatkls[0]];
        //查询价格/库存
        if(this.goodModelList) {
          for (var i = 0; i < this.goodModelList.length; i++) {
            this.methods.getPrice(this.goodModelList[i]);
            this.methods.getStock(this.goodModelList[i]);
          }
        }

        this.goodModelSelect = this.goodModelMatkls[0];
      }
    });

    this.freeShippingTip = getAlertInfo('14187495683') // 免运费提示信息

  }
  onLoad() {
    this.methods.getProduct().then(() => {
      this.methods.onminiSelecte2()
    })
  }
  onUnload() {
    this.pageNo = 1
  }
}
