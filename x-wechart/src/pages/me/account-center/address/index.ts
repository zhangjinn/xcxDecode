/*
 * @Auth: Turbo
 * @Email: 691209942@qq.com
 * @Date: 2019-09-17 15:12:14
 * @Description:
 */
import wepy from 'wepy';
import { connect } from 'wepy-redux'
import { getAddressList } from '@/store/actions/address'
import Toast from '@/components/vant/toast/toast';
import emptyDataType from "@/components/empty-data-type/index";
import headerTab from "@/pages/components/header-tab/index";

interface Data {
  orgId: string,
  displayName: string
  pageNo: number,
  orgListVisible: boolean // 组织下拉列表是否可见
  showRightBtn: boolean;
  headerTabList: any[];
}

@connect({
  // 组织列表
  // [{"id":2354,"pId":613,"organizationCode":"4000","organizationName":"青岛海信通信有限公司","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null},{"id":1666,"pId":1418,"organizationCode":"6837","organizationName":"空调烟台","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null},{"id":154,"pId":5,"organizationCode":"2601","organizationName":"股份青岛","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null},{"id":1047,"pId":786,"organizationCode":"6734","organizationName":"冰箱青岛","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null},{"id":663,"pId":613,"organizationCode":"4103","organizationName":"通信青岛","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null},{"id":1653,"pId":1418,"organizationCode":"6834","organizationName":"空调青岛","organizationTypeCode":null,"organizationTypeName":null,"organizationDescrip":null,"organizationCatalogId":null,"organizationCatalogName":null,"organizationRegionCode":null,"forecastType":null,"manager":null,"address":null,"regAddress":null,"regDate":null,"capital":null,"no1":null,"no2":null,"no3":null,"pID":null,"pCodes":null,"pTitles":null,"ogLevel":null,"adminId":null,"adminName":null,"adminAccount":null,"adminJobNumber":null}]
  organizationList({ user }) {

    const orgs =  [{
      id: '',  // 查询地址列表时传的orgId
      organizationCode: '', // 组织代码
      organizationName: '全部销售组织' // 组织名称
    }].concat(user.organizationList || [])

    orgs.forEach((org) {
      org.displayName = org.organizationName + (org.organizationCode === '' ? '' : `(${org.organizationCode})`)
    })
    return orgs
  },
  addressList({ address }) {
    return address.list
  }
}, {
  getAddressList
})
export default class Address extends wepy.page {

  config = {
    navigationBarTitleText: '我的地址',
    usingComponents: {
      'van-popup': '../../../../components/vant/popup/index',
      "van-toast": "../../../../components/vant/toast/index",
    }
  }

  components = {
    emptyDataType,
    headerTab,
  };

  data: Data = {
    orgId: '',
    displayName: '全部销售组织',
    pageNo: 1,
    orgListVisible: false,
    showRightBtn: false,
    headerTabList: [
      { name: '销售组织', type: 'org', selectValue: '' },
    ], // 顶部搜索切换按钮列表
  }

  methods = {
    loadNextPage() {
      if (this.pageNo >= this.addressList.totalPages) {
        return
      }
      Toast.loading({
        message: '正在加载',
        duration: 0
      })
      this.pageNo = ++this.pageNo
      this.methods.getAddressList({ page: this.pageNo, orgId: this.orgId}).then(() => {
        Toast.clear()
      })
    },
    toggleOrgListVisible() {
      this.orgListVisible = !this.orgListVisible;
    },
    chooseOrg(id: string) {
      Toast.loading({
        message: '正在加载',
        duration: 0
      })
      this.headerTabList[0].selectValue = id
      this.orgListVisible = false
      this.orgId = id
      this.pageNo = 1
      this.displayName = this.organizationList.find((org) => {
        return +org.id === +id
      }).displayName
      this.methods.getAddressList({ _loading: true, page: this.pageNo, orgId: this.orgId}).then(() => {
        Toast.clear()
      })
    }
  }

  onLoad() {
    Toast.loading({
      message: '正在加载',
      duration: 0
    })
    this.methods.getAddressList({ _loading: true, page: this.pageNo, orgId: this.orgId }).then(() => {
      Toast.clear()
    })
  }
}
