import wepy from 'wepy';
import { connect, } from 'wepy-redux';
import { clone, trim } from 'ramda';
import { request } from '@/utils/request';
import { checkPhone, checkEmail } from '@/utils/validators';
import Toast from '@/components/vant/toast/toast';
import CommonMixin from '@/mixins/common';

interface Data {
  errorMessage: object,
  loginSystemVisible: boolean,
  baseMatklVisible: boolean,
  editLoginSystem: number,
  otherInfo: any[],
  otherInfoIndex: number,
  saleListVisible:boolean,
  saleIndex:number,
  saleList: any[],
  shopList: any[],
  hasShopList:any[],
  searchVal:String,
}

@connect({
  editAccount({ account }) {
    return account.editAccount
  },
  loginSystemList({ account }) {
    return account.loginSystemList
    return account.loginSystemList.map(item => {
      return { value: item.id, text: item.propertyName }
    })
  },
  baseMatklList({ account }) {
    return account.baseMatklList
    return account.baseMatklList.map(item => {
      return { value: item.id, text: item.matklName }
    })
  },
  shopList({ account }) {
    return account.custShopList
    return account.custShopList.map(item => {
      return { value: item.code, text: item.name }
    })
  },
  mixinCurrentUser({ user }) {
    return user.info || {}
  },
}, {

})
export default class EditPassword extends wepy.page {
  config = {
    navigationBarTitleText: '管理管辖门店',
    usingComponents: {
      'van-button': '../../../../components/vant/button/index',
      'van-cell-group': '../../../../components/vant/cell-group/index',
      'van-field': '../../../../components/vant/field/index',
      'van-toast': '../../../../components/vant/toast/index',
      'van-popup': '../../../../components/vant/popup/index',
      'van-picker': '../../../../components/vant/picker/index',
      'van-icon': '../../../../components/vant/icon/index',
    },
  };
  mixins = [ CommonMixin ];
  data: Data = {
    editLoginSystem: 0,
    errorMessage: {
      name: '',
      phone: '',
      email: '',
      businessFlagName:'',
      businessFlagId:''
    },
    loginSystemVisible: false,
    baseMatklVisible: false,
    saleListVisible: false,
    otherInfo: [],
    otherInfoIndex: 0,
    saleIndex:-1,
    saleList:[
      {
        id:1,
        name:'是'
      },
      {
        id:0,
        name:'否'
      },
    ],
    shopList:[],
    hasShopList:[],
    searchVal:""
  }

  // 页面内交互写在methods里
  methods = {
    // 前端查询门店列表
    onChangeSearchVal(event: Weapp.Event){
        this.searchVal = trim(event.detail.value)
        this.setData({
            searchVal:event.detail.value
        })
        //根据搜索内容控制展示内容
        const otherInfoNew = clone(this.otherInfo)
        otherInfoNew[this.otherInfoIndex].shopList.map(item => {
          if(item.name.includes(this.searchVal)) {
            item.isNotView = false
          }else{
            item.isNotView = true
          }
          return { ...item }
        });
        this.otherInfo = otherInfoNew
        this.$apply();
      },
      //开启关闭弹窗
      onToggleBaseMaktlPopup(e) {
        this.otherInfoIndex = 0
        this.searchVal = "";
        //全部显示
        const otherInfoNew = clone(this.otherInfo)
        otherInfoNew[this.otherInfoIndex].shopList.map(item => {
            item.isNotView = false
          return { ...item }
        });
        this.otherInfo = otherInfoNew
        this.$apply();
        this.toggleBaseMaktlPopup()
      }
      //选择
      onSelectBaseMatkl(baseMatkl) {
        const otherInfoNew = clone(this.otherInfo)
        const baseMatklListNew = otherInfoNew[this.otherInfoIndex].shopList.map(item => {
          if(item.code === baseMatkl.code) {
            item.selected = !item.selected
          }
          return { ...item }
        });
        this.otherInfo = otherInfoNew
  
      }
    async onSubmitForm(e) {
      const form = e.detail.value
      if(this.checkForm(form)) {
        form.custAccountId = this.editAccount.id
        form.ids= this.otherInfo[0].shopList.filter(base => base.selected).map(base => base.code)
        const result = await request({ api: '/custShop/saveCustShop.nd', method: 'POST', data: form });
        console.log('result',result);

        if(result.code === "0") {
          Toast.success('修改门店信息成功');
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }else {
          Toast.fail(result);
        }
      }
    }
    onClearError(column) {
      this.errorMessage = { ...this.errorMessage, [column]: '' }
    }
    onToggleLoginSystemPopup(e) {
      const { index } = e.target.dataset
      this.otherInfoIndex = index
      this.toggleLoginSystemPopup()
    }
    onSelectLoginSystem(loginSystem) {
      // const { picker, value, index } = event.detail;
      const otherInfo = clone(this.otherInfo)
      const isExisted = otherInfo.some((item, index) => {
        if(index !== this.otherInfoIndex && item.id === loginSystem.id) {
          return true
        }
        return false
      })
      if(isExisted) {
        Toast.fail('该登录系统已选过，请重新选择！')
      }
      otherInfo[this.otherInfoIndex].loginSystem = loginSystem
      this.otherInfo = otherInfo
      this.toggleLoginSystemPopup()
    }
    
    onConfirmBaseMatklPopup() {
      const otherInfoNew = clone(this.otherInfo)
      const selectBaseMatklList = otherInfoNew[this.otherInfoIndex].shopList.filter(item => item.selected)
      otherInfoNew[this.otherInfoIndex].shopIds = selectBaseMatklList.map(item => item.code)
      otherInfoNew[this.otherInfoIndex].shopName = selectBaseMatklList.map(item => item.name)
      this.otherInfo = otherInfoNew
      this.toggleBaseMaktlPopup()
    }
    onAddOtherInfo() {
      const otherInfoNew = clone(this.otherInfo)
      otherInfoNew.push({ loginSystem: {} , baseMatklList: this.baseMatklList, baseMatklIdList: [], baseMatklNameList: [] })
      this.otherInfo = otherInfoNew
    }
    onRemoveOtherInfo() {
      // const otherInfoNew = clone(this.otherInfo)
      // otherInfoNew.splice(index, 1)
      // this.otherInfo = otherInfoNew
      console.log('shanchu')
      const otherInfoNew = clone(this.otherInfo)
      otherInfoNew[this.otherInfoIndex].shopList.forEach(item =>{
        item.selected= false
      })
      otherInfoNew[this.otherInfoIndex].shopIds = []
      otherInfoNew[this.otherInfoIndex].shopName = []
      this.otherInfo = otherInfoNew
    }
    onToggleSaleListPopup(){
      this.saleListVisible = !this.saleListVisible
    },
    toggleSalelPopup() {
      this.saleListVisible = !this.saleListVisible
    }
    onSelecteSale(e) {
      // console.log(e)
      // const { index } = e.target.dataset
      // this.saleIndex = index
      this. editAccount.businessFlagName = e.name
      this. editAccount.businessFlagId = e.id
      this.saleIndex = e.id
      this.saleListVisible = false
    },
    // getOWn(id){
    //   let data = {
    //     custAccountId:id
    //   }
    //   request({ api: '/custShop/getShopListByCustId.nd', method: 'POST',data}).then((res: any) => {
    //     this.hasShopList = res.data
    //     // console.log('this.hasShopList',this.hasShopList);
    //   })
    // }

  }
  toggleLoginSystemPopup() {
    this.loginSystemVisible = !this.loginSystemVisible
  }
  toggleBaseMaktlPopup() {
    this.baseMatklVisible = !this.baseMatklVisible
  }
  checkForm(form) {
    let status = true
    const { name, phone, email } = form
    if(!name) {
      status = false
      this.errorMessage = { ...this.errorMessage, name: '请填写姓名' }
    }
    if(!phone) {
      status = false
      this.errorMessage = { ...this.errorMessage, phone: '请填写手机' }
    }
    if(phone && !checkPhone(phone)) {
      status = false
      this.errorMessage = { ...this.errorMessage, phone: '请填写正确的手机' }
    }
    if(!email) {
      status = false
      this.errorMessage = { ...this.errorMessage, email: '请填写邮箱' }
    }
    if(email && !checkEmail(email)) {
      status = false
      this.errorMessage = { ...this.errorMessage, email: '请填写正确的邮箱' }
    }
    this.$apply()
    return status
  }
  onShow(){
    // console.log('this.editAccount.id',this.editAccount.id);
     // 获取当前账号的有的门店数据

    const editAccount = this.editAccount
    let data = {
      custAccountId:this.editAccount.id
    }
    request({ api: '/custShop/getShopListByCustId.nd', method: 'POST',data}).then((res: any) => {
      console.log('res',res);
      this.hasShopList = res.idData
      // console.log('this.hasShopList',this.hasShopList);
      if(editAccount.type === 'user') {
        const { loginSystemList = [], loginSystemMatklsMapJson = {} } = editAccount
        const loginSystemListOri = clone(this.loginSystemList)
        const baseMatklListOri = clone(this.baseMatklList)

        const shopListori = clone(this.shopList)
        const otherInfo = !loginSystemList ? [] : loginSystemList.map(item => {
          const loginSystem = loginSystemListOri.filter(i => i.id === Number(item))[0]
          const baseMatklIdList = loginSystemMatklsMapJson[item] || []

          const baseMatklNameList = []
          const baseMatklList = baseMatklListOri.map(base => {
            const selected = baseMatklIdList.includes(base.id)
            if(selected) {
              baseMatklNameList.push(base.matklName)
            }
            return { ...base, selected, }
          })

          let shopIds = []
          let selectedRow = this.hasShopList
          // console.log('this.hasShopList',this.hasShopList);

          for (let items of selectedRow) {
            shopIds.push(String(items));
          }
          // console.log('shopIds',shopIds);


          const shopName = []
          const shopList_ = shopListori.map(shopbase => {
            let shopBaseCode = shopbase.code + ''
            const selected = shopIds.includes(shopBaseCode)
            if(selected) {
              shopName.push(shopbase.name)
            }
            return { ...shopbase, selected, }
          })
            //按中文首字母排序
            const shopList = shopList_.sort(
                function compareFunction(param1, param2) {
                    // return param1.fullName.localeCompare(param2.fullName, 'zh-Hans-CN', {sensitivity: 'accent'});
                    return param1.name.localeCompare(param2.name, 'zh');
                }
            );
            

          return { loginSystem, baseMatklIdList, baseMatklList, baseMatklNameList,shopList,shopIds,shopName}

        })
        
        this.otherInfo = otherInfo
        this.$apply()

      }

      if(this.editAccount.businessFlagName == '是'){
        this.editAccount.businessFlagId = 1
      }
      if(this.editAccount.businessFlagName == '否'){
        this.editAccount.businessFlagId = 0
      }
      this.saleIndex = this.editAccount.businessFlagId
    })
    // console.log('this.editAccount',this.editAccount);

    // console.log('this.editAccount.businessFlagName',this.editAccount.businessFlagName);
    // console.log(' this.editAccount', this.editAccount);
    // console.log(' this.otherInfo', this.otherInfo);
  }
}
