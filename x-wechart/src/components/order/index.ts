import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { trim, isEmpty, split,clone } from 'ramda';
import { fillZero, formatDate, getDateDiff } from '@/utils/index';
import { getPeopleContacts, cartOrderWeek, moneyByWeek,serviceList } from '@/store/actions/order';
import { getDict } from '@/store/actions/store';
import { checkPhone } from '@/utils/validators';
import Toast from '@/components/vant/toast/toast';
import Address from '@/components/address/index';
import SearchAddress from '@/components/search-address/index';
import AddressDetail from '@/pages/components/select-address-details/index';

import { request } from '@/utils/request';
@connect({
  order({ order }) {
    return order.commonOrder;
  },
  common({ order }) {
    return order.common;
  },
}, {
  getPeopleContacts,
  cartOrderWeek,
  moneyByWeek,
  serviceList,
  getDict
})
export default class Order extends wepy.component {
  props = {
    grouplist: {},
    index: {},
    pageType: { // 调用该组件的页面类型，engineeringArea->工程专区调用；空为其他，
      type: String,
      default: ''
    },
  };
  formData = {
    address3: '',
    contact: '',
    mobile: '',
    orderCode: '',
  };
  inputChanges = {
    contact: false,
    mobile: false,
    address3: false,
  };
  toAddress = {};
  data = {
    deliveryShow: false,
    salesTypeShow: false,
    billShow: false,
    day: '',
    calendarShow: false,
    calendarConfig: { theme: 'elegant', onlyShowCurrentMonth: false },
    marketReceiver: {},
    weekShow: false,
    weekList: [],
    week:{},
    serviceShow: false,//服务方式
    serviceCheckedName:'',
    serviceList: [],
    salesTypeList: [],
    salesTypeItem: {
      id: '14934002581',
      name: '工程'
    },
    purchaseType: '',
    addressTitle: '收货地址',
    aheadSendShow:false,
    aheadSend:false,   //是否允许提前发货
    shopList:[],
    shopLists:{},
    salesShopInfoId:''
  };
  events = {
    'chooseAddressDetail': (payload: any) => { // 地址详情子组件传参
      this.formData['address3'] = trim(payload.addressName);
      this.inputChanges['address3'] = true;
    }
  }
  components = {
    address: Address,
    search: SearchAddress,
    customMarket: SearchAddress,
    customMarketAddress: SearchAddress,
    addressDetail: AddressDetail, // 详细地址
  };
  computed = {
    // 计算属性的 用于地址详情区编码
    chooseRegionId: function () {
      if(this.toAddress && this.toAddress.areaId){ // 选择省市区后会赋值给this.toAddress
        return this.toAddress.areaId
      }
      if(this.common && this.common.areaId){ // 进页面的时候的默认值
        return this.common.areaId
      }
      return ''
    }
  }
  onLoad() {
    const{ items, modelId } = this.order;
    const { orgId, matklId, purchaseType, isPujie, shareFlag, offices } = this.common;
    this.purchaseType = purchaseType;
    //默认为配送
    if(this.purchaseType ==='2'){
      this.common.delivery.id = 502001;
      this.common.delivery.propertyName = '配送';
    }
    //是否启用共享库存
    if(shareFlag==='Y'){
      this.addressTitle = '统仓地址';
    }
    //是否提前发货  默认否
    this.common.isAllowAdvancdeliver = this.aheadSend;
    //查询要求到货周次
    if(purchaseType) {
      this.methods.cartOrderWeek({
        orgId: orgId,
        matklId: matklId,
        purchaseType: purchaseType,
        productId: modelId ? items[0].productId : '',
        modelId: modelId ? modelId : ''
      }, (res: any) => {
        const {data} = res;
        this.weekList = data.list;
        if (this.weekList && this.weekList.length > 0) {
          this.week = this.weekList[0];
          this.day = this.week.code;
          //常规订单且为铺借商家取CIS余额 (1:应急 2:常规),其他取SAP余额
          if (purchaseType == 2 && isPujie) {
            this.methods.moneyByWeek({
              orgId: orgId,
              matkl: matklId,
              weekName: this.week.name,
            }, (res: any) => {
              const {data} = res;
              this.$emit('weekchange', {
                waitMoney: data.balance.waitMoney,
                canUseMoney: data.balance.balanceAccount - data.balance.waitMoney,
                balanceAccount: data.balance.balanceAccount
              })
              //this.order.balanceAccount = data.balance.balanceAccount;
              //this.order.waitMoney = data.balance.waitMoney;
              //this.order.canUseMoney = data.balance.balanceAccount - data.balance.waitMoney;
              //console.log(this.order.canUseMoney);
              //this.$apply();
            });
            this.$apply();
          }
          this.$apply();
        }
      });
    }

    if(purchaseType) {
      this.methods.cartOrderWeek({
        orgId: orgId,
        matklId: matklId,
        purchaseType: purchaseType,
        productId: modelId ? items[0].productId : '',
        modelId: modelId ? modelId : ''
      }, (res: any) => {
        const {data} = res;
        this.weekList = data.list;
        if (this.weekList && this.weekList.length > 0) {
          this.week = this.weekList[0];
          this.day = this.week.code;
          //常规订单且为铺借商家取CIS余额 (1:应急 2:常规),其他取SAP余额
          if (purchaseType == 2 && isPujie) {
            this.methods.moneyByWeek({
              orgId: orgId,
              matkl: matklId,
              weekName: this.week.name,
            }, (res: any) => {
              const {data} = res;
              this.$emit('weekchange', {
                waitMoney: data.balance.waitMoney,
                canUseMoney: data.balance.balanceAccount - data.balance.waitMoney,
                balanceAccount: data.balance.balanceAccount
              })
              // this.order.balanceAccount = data.balance.balanceAccount;
              // this.order.waitMoney = data.balance.waitMoney;
              // this.order.canUseMoney = this.order.balanceAccount - this.order.waitMoney;
              // this.$apply();
            });
          }
          this.$apply();
        }
      });
    }


    //服务方式
    this.methods.serviceList({}, (res: any) => {
       let serviceList_ = res.data
       serviceList_.map(it => {
        it.selected = false
        return { ...it }
      });
      this.serviceList = serviceList_;
      this.$apply();
    });

    if(this.pageType && this.pageType == 'engineeringArea'){
      // 销售类型
      this.methods.getDict({
        pid: '14934002578'
      }).then((res)=>{
        const { list } = res.payload
        if(list && list.length>0){
          this.salesTypeList = list.map((item)=>{
            return {
              id: item.code,
              name: item.name,
            }
          })
        }
        this.$apply();
      })
    }

  };
  methods = {
    // 选择日期
    openCalendar() {
      const { deadMaxDate, deadMinDate } = this.common;
      if (deadMaxDate && deadMinDate) {
        const now = formatDate('', 'Y-M-D');
        const minDate = getDateDiff(now, deadMinDate) ? now : deadMinDate;
        this.$wxpage.calendar.enableArea([minDate, deadMaxDate]);
        if (!this.day) {
          const dates = split('-', deadMaxDate);
          this.$wxpage.calendar.jump(dates[0], parseInt(dates[1], 10), parseInt(dates[2], 10));
        }
      }
      this.calendarShow = true;
    },
    closeCalendar() {
      this.calendarShow = false;
    },
    chooseDay(evt) {
      const { year, month, day } = evt.detail;
      this.day = `${year}-${fillZero(`${month}`)}-${fillZero(`${day}`)}`;
      this.calendarShow = false;
    },
    // 选择配送类型
    openDelivery() {
      this.deliveryShow = true;
    },
    closeDelivery() {
      this.deliveryShow = false;
    },
    openSalesType(){
      this.salesTypeShow = true;
    },
    closeSalesType(){
      this.salesTypeShow = false;
    },
    chooseDelivery(item: any) {
      if (item.id !== this.common.delivery.id) {
        this.common.delivery = item
        if (item.id === 502005) {
          this.marketReceiver = {
            contactPerson: this.common.custMarketAddress.contactPerson,
            contactPersonTel: this.common.custMarketAddress.contactPersonTel
          };
          if (this.inputChanges.mobile) {
            this.formData.mobile = this.common.custMarketAddress.contactPersonTel;
          }
          if (this.inputChanges.contact) {
            this.formData.contact = this.common.custMarketAddress.contactPerson;
          }
          this.methods.getPeopleContacts({sendToId: this.common.custMarketAddress.id}).then((res: { payload: { contact: any; phone: any; }; }) => {
            this.marketReceiver = {
              contactPerson: res.payload.contact,
              contactPersonTel: res.payload.phone
            };
            this.$apply();
          })
        } else if (item.id === 502004) {
          const { orgId, matklId } = this.common;
          let data = {
            orgId: orgId, // 组织id
            materialGroupId: matklId, // 物料组id
            ifEngineering:'1', // 是否为工程单标识符 1：是，0：否
          }
          if(this.pageType === 'engineeringArea'){ //父级为工程专区
            request({ api: 'comm/findCustomerShopInfoList.nd', method: 'POST', type: 'application/json', data }).then((res: any) => {
              this.shopList = res.list.map((item)=>{
                return{
                  ...item,
                  code: item.customerShopId,
                  name: item.customerShopName,
                }
              })
              const {salesShopInfoId } = this.common
              if( salesShopInfoId ) {
                this.shopLists.code = salesShopInfoId
                this.shopList.forEach(item => {
                  if(item.code == salesShopInfoId ) {
                    this.shopLists = {
                      ...item
                    }
                  }
                });
              } else {
                this.shopLists = {
                  ...this.shopList[0]
                }
              }
              this.salesShopInfoId =  this.shopLists.code
              this.$apply();
            })
          }else{
            let data = {
              orgId:orgId,
              matklId:matklId
            }
            request({ api: 'comm/querySalesShopInfoList.nd', method: 'POST', data }).then((res: any) => {
              this.shopList = res.list
              const {salesShopInfoId } = this.common
              if( salesShopInfoId ) {
                this.shopLists.code = salesShopInfoId
                this.shopList.forEach(item => {
                  if(item.code == salesShopInfoId ) {
                    this.shopLists.name = item.name
                  }
                });
              } else {
                this.shopLists = {
                  code:res.list[0].code,
                  name:res.list[0].name
                }
              }
              this.salesShopInfoId =  this.shopLists.code
              this.$apply();
            })
          }

        } else {
          // 配送方式不为直配到用户 销量所属门店的id清空
          this.salesShopInfoId = ''
          this.marketReceiver = {};
          this.inputChanges = {};
          this.formData = {};
        }
      }
      this.deliveryShow = false;
    },
    chooseSalesType(item){
      this.salesTypeItem = item
      this.salesTypeShow = false;
      this.$apply();
    },

    //选择销量所属门店
    openSaleShop() {
    this.$invoke('search', 'openNormal', this.shopList, this.shopLists.code, 'saleShop', (item: any) => {
      this.formData.salesShopInfoId  = item.code;
      this.salesShopInfoId =  item.code
      this.shopLists = item;
      this.$apply();
    });

  },

    //选择服务方式
    openService() {
      this.serviceShow = true;
    },
    closeService() {
      this.serviceShow = false;
    },


    chooseService(item: any) {
      let nameArr = [];
      const serviceListNew = clone(this.serviceList)
      serviceListNew.map(it => {
        //改变是否选中属性
        if(it.serviceTypeCode === item.serviceTypeCode) {
          it.selected = !item.selected
        }
        //赋值选中name
        if(it.selected){
          nameArr.push(it.serviceTypeName)
          }
        return { ...it }
      });
      this.serviceList = serviceListNew
      this.serviceCheckedName = nameArr.join("，")


    },
    // 开户票头
    openBill() {
      this.billShow = true;
    },
    closeBill() {
      this.billShow = false;
    },
    chooseBill(item: any) {
      if (item.id !== this.common.bill.id) {
        this.common.bill = item;
      }
      this.billShow = false;
    },
    // 选择分销商
    openCustMarket() {
      const { custMarkets, custMarket,orgId, matklId } = this.common;
      this.$invoke('customMarket', 'open', custMarkets, custMarket.id, orgId, matklId, 'fxs', (item: any) => {
        this.common.custMarket = item;
        this.marketReceiver = {
          contactPerson: item.contact,
          contactPersonTel: item.phone
        };
        if (item && item.address && item.address.length > 0 ) {
          this.common.custMarketsAddress = item.address
          this.common.custMarketAddress = {
            id: item.address[0].id,
            name: item.address[0].name
          }
        } else {
          this.common.custMarketsAddress = [ ]
          this.common.custMarketAddress = {
            id: '',
            name: '',
          }
        }
        this.$apply();
      });
    },
    // 选择分销商地址
    openCustMarketAddress() {
      const { custMarketsAddress, custMarketAddress, orgId, matklId } = this.common;
      this.$invoke('customMarketAddress', 'open', custMarketsAddress, custMarketAddress.id, orgId, matklId, 'fxsdz', (item: any) => {
        this.common.custMarketAddress = item;
        this.marketReceiver = {
          contactPerson: item.contact,
          contactPersonTel: item.phone
        }
        if (this.inputChanges.mobile) {
          this.formData.mobile = item.contactPersonTel;
          this.inputChanges.mobile = false
        }
        if (this.inputChanges.contact) {
          this.formData.contact = item.contactPerson;
          this.inputChanges.contact = false
        }
        this.$apply();
      });
    },
    // 选择地址
    openAddress() {
      // search 统一数据格式 [{ id, name, ...rest }]
      const { addresses, receiver } = this.common;
      this.$invoke('search', 'openNormal', addresses, receiver.id, 'common', (item: any) => {
        if(item && item.regionStatus === 'D'){ // 判断行政区域地址库是否失效 A有效，D失效。失效的话禁止选择
          Toast.fail('由于行政区划调整，请您及时更新您的收获地址信息')
          return false
        }
        this.common.receiver = item;
        if (this.inputChanges.mobile) {
          this.formData.mobile = item.contactPersonTel;
          this.inputChanges.mobile = false
        }
        if (this.inputChanges.contact) {
          this.formData.contact = item.contactPerson;
          this.inputChanges.contact = false
        }
        this.$apply();
      });
    },

    // 直送地址
    openTopAddress() {
      // search 统一数据格式 [{ id, name, ...rest }]
      const { provinceArr, provinceId, cityId, areaId } = this.common;
      this.$invoke('address', 'openAddressPopup', provinceArr, { provinceId, cityId, areaId }, (item: any, address: any) => {
        this.toAddress = address;
        this.common.toAddress = item;
        this.$apply();
      });
    },
    changeText:(type: string, evt: any)=> {
      this.formData[type] = trim(evt.detail);
      this.inputChanges[type] = true;
    },
    checkParams: async()=> {
      const { trans, address1, address3, mobile, contact, billTo, shopLists }: any = this.getParams();

      if (!billTo) {
        Toast('开票户头不能为空')
        return false;
      }

      // 新增收货地址校验  如果收货地址为空 不能提交订单
      if (!address1) {
        Toast('收货地址不能为空')
        return false;
      }

      // 如果是直配到用户地址是必填的
      // 活动校验
      if (trans === 502004) {
        if (!address3) {
          Toast('请输入地址详情');
          return false;
        }

        if (!shopLists.code) {
          Toast('请选择销量所属门店');
          return false;
        }

        // 校验详细地址
        // let checkAddressDetailResult = true
        // await this.$invoke('addressDetail', 'checkAddressDetail', (item: any)=>{
        //   checkAddressDetailResult = item
        // });
        // if(!checkAddressDetailResult){
        //   Toast.fail('当前选择的省市区与详细地址不一致，请前往修改')
        //   return false
        // }
      }

      // 联系人校验
      if (this.inputChanges.contact) {
        if (isEmpty(trim(this.formData.contact))) {
          Toast('请输入联系人');
          return false;
        }
      } else {
        if (!contact || isEmpty(trim(contact))) {
          Toast('请输入联系人');
          return false;
        }
      }
      // 不一致校验
      // 手机号码校验
      // this.inputChanges.mobile
      if (this.inputChanges.mobile) {
        if (!checkPhone(trim(this.formData.mobile))) {
          Toast('请输入正确的联系方式');
          return false;
        }
      } else {
        if (!mobile || isEmpty(trim(mobile))) {
          Toast('请输入正确的联系方式');
          return false;
        }
        // if (!checkPhone(trim(mobile))) {
        //   Toast('请输入正确的联系方式');
        //   return false;
        // }
      }
      if((!this.week.code || !this.week.name) && this.purchaseType){
        Toast('请选择要求到货周次');
        return false;
      }
      return true;
    },
    openWeek() {
      this.weekShow = true;
    },
    closeWeek() {
      this.weekShow = false;
    },
    chooseWeek(item: any) {
      if (item.code !== this.week.code) {
        this.week = item;
        this.day = item.code;
      }
      this.weekShow = false;
      const { orgId, matklId, purchaseType, isPujie } = this.common;
      //purchaseType = 2;
      //isPujie = true;
      //常规订单且为铺借商家取CIS余额 (1:应急 2:常规),其他取SAP余额
      if( purchaseType==2 && isPujie ){
        this.methods.moneyByWeek({
          orgId: orgId,
          matkl: matklId,
          weekName: item.name,
        }, (res: any) => {
          const { data } = res;
          this.$emit('weekchange', {
            waitMoney: data.balance.waitMoney,
            canUseMoney: data.balance.balanceAccount - data.balance.waitMoney,
            balanceAccount: data.balance.balanceAccount
          })
          //console.log(data)
          //this.order.balanceAccount  = data.balance.balanceAccount;
          //this.order.waitMoney = data.balance.waitMoney;
          //this.order.canUseMoney = this.order.balanceAccount - this.order.waitMoney;
        });
      }
    },
    //获取要求到货周
    getWeekName(){
      return this.week;
    },

    // 打开提前发货弹框
    openAheadSend() {
      this.aheadSendShow = true;
    },
    // 关闭提前发货弹框
    closeAheadSend() {
      this.aheadSendShow = false;
    },
    //选择是否提前发货
    chooseAheadSend({ detail }) {
      this.aheadSend = detail;
      this.common.isAllowAdvancdeliver = detail ? '1' : '0';
    },

    //选择办事处
    openOffice() {
      const { offices, office } = this.common;
      this.$invoke('search', 'openNormal', offices, office?office.id:null, '', (item: any) => {
        this.formData.officeId  = item.id;
        this.common.office = item;
        this.$apply();
      });
    },

  };
  getParams() {
    const { orgAndGroup, carts, versions, deadMaxDate, delivery, bill, receiver, toAddress, custMarketAddress, custMarket, provinceId, cityId, areaId, takeCode, office }: any = this.common;
    const {
      address3,
      contact,
      mobile,
      orderCode,
    } = this.formData;

    const date = this.day || deadMaxDate;
    // address3 详细地址
    const data: any = {
      orgAndGroup,
      orderCartIds: carts,
      versions,
      maxEndDate: date, // 有效期
      endDate: date,
      orderRebate: 'Y', // 返利金额
      trans: delivery.id, // 配送方式
      orderCode: orderCode || takeCode || '', // 客户采购编码
      billTo: bill.id,  // 开户票头
      contact: contact || receiver.contactPerson, // 联系人
      mobile: mobile || receiver.contactPersonTel, // 联系方式
      address1: receiver.id, // 收货地址
      weekName: this.week.name, //要求到货周次
      officeId: office && office.id ? office.id: '', //办事处
      isAllowAdvancdeliver:this.aheadSend?'1':'0',    //是否提前发货
      salesShopInfoId:this.salesShopInfoId,//销售所属门店
      serviceTypeCodes:this.serviceList.filter(m => m.selected).map(i => i.serviceTypeCode).join(",")//服务方式
    };
    // 直接送
    if (delivery.id === 502004) {
      data.district = this.toAddress.areaId || toAddress.id, // 直送地址街道
      data.address3 = address3;
      data.toAddress = this.toAddress && this.toAddress.areaId ? this.toAddress : {
        provinceId,
        cityId,
        areaId,
      };
      if(this.toAddress.townId){
        data.town = this.toAddress.townId;
      }
      data.shopLists = this.shopLists // 当前所选销售所属门店所有信息
      data.salesTypeItem = this.salesTypeItem // 销售类型

      // data.serviceTypeCodes = this.serviceList.filter(m => m.selected).map(i => i.serviceTypeCode).join(",")//服务方式
    }
    // 分销商
    if (delivery.id === 502005) {
      data.address4 = custMarketAddress.id; // 分销商地址
      data.address7 = custMarket.id;
      data.contact = contact || this.marketReceiver.contactPerson; // 联系人
      data.mobile = mobile || this.marketReceiver.contactPersonTel; // 联系方式
    }
    return data;
  };
}
