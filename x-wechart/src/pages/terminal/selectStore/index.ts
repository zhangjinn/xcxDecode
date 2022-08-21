import wepy from 'wepy';
const qqmap = require('@/pages/terminal/utils/qqmap-wx-jssdk.min.js');
import { request } from '@/utils/request';

export default class WebViewPage extends wepy.page {

  config = {
    navigationBarTitleText: '选择门店',
    usingComponents: {
      'van-icon': '../../../components/vant/icon/index',
      'van-field': '../../../components/vant/field/index',
      'van-button': '../../../components/vant/button/index',
      'van-action-sheet': '../../../components/vant/action-sheet/index',
      'van-dialog': '../../../components/vant/dialog/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-search': '../../../components/vant/search/index',
      "van-loading": "../../../components/vant/loading/index"
    },
  };
  data= {
    value: '',
    latitude:'',//精度
    longitude:'',//维度
    userAccount:'dsfs',
    storeList:[],
    page:1,
    totalPage: 1,
    shopFullName:'',
    history:[],
    loading:false,
    addStorePermissions: false, // 新增门店权限
  },

  methods = {
    // 新增门店
    addStore(){
      let url = `/pages/terminal/addStore/index`
      wx.navigateTo({
        url: url
      })
    },
    onChange(event) {
      // event.detail 为当前输入的值
      this.shopFullName=event.detail
    },
    //上拉刷新
    upper:function(){
      this.page=1
      this.getStore(this.page,2)
    },
    //下一页
    toLowerFun:function () {
      // ('toLower')
      if(this.totalPage <= this.page) {
        wx.showToast({
          title: '已经到底啦',
          icon: 'none'
        })
        return
      }
      this.page=this.page+1
      this.getStore(this.page,1)
    },
    //当前输入值
    onchange(event){
      this.shopFullName=event.detail
      this.page=1
      this.getStore(this.page)
    },
    selStore(e){
      let that=this
      let index=e.currentTarget.dataset.index
      wx.redirectTo({
        url:'/pages/terminal/addrecord/index?fullName='+that.storeList[index].shopFullName
          +'&distance='+that.storeList[index].distance+'&shAddress='+that.storeList[index].shAddress
          +'&longitude='+that.storeList[index].longitude+'&latitude='+that.storeList[index].latitude
          +'&shopId='+that.storeList[index].shopId+'&shopCisCode='+that.storeList[index].shopCisCode+'&isSpecialShop='+that.storeList[index].isSpecialShop
          +'&provinceId='+that.storeList[index].provinceId+'&provinceName='+that.storeList[index].provinceName
          +'&cityId='+that.storeList[index].cityId+'&cityName='+that.storeList[index].cityName
          +'&countyId='+that.storeList[index].countyId+'&countyName='+that.storeList[index].countyName
          +'&townName='+that.storeList[index].townName+'&townId='+that.storeList[index].townId
      })
    }
  };
  //获取当前地理位置
  //获取当前位置
  getLocation () {
    let that=this
    // 初始化时间
    let day = new Date()
    that.currentTime = day.Format('MM-dd hh:mm:ss');
    let qqmapsdk = new qqmap({
      key: wepy.$appConfig.qqMapKey
    });
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        that.latitude=res.latitude
        that.longitude=res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            that.setData({location:res.result.address})
            that.location=res.result.address;
            that.getStore(that.page)
          },
          fail: function (res) {
            wx.showToast({
              title: '解析地址失败',
              icon: 'none'
            })
          },
        })
      }
    })
  }
  //附近门店
  getStore(page,fenye){
    let that=this
    if(fenye==2){
      that.loading=true
      // that.storeList=[]
    }
    if( that.longitude == 'undefined' || that.longitude == '' ||  that.longitude == null) {
      that.longitude = ''
    }
    if( that.longitude == 'undefined' || that.longitude == '' ||  that.longitude == null) {
      that.latitude = ''
    }
    request({
      api: `/custShop/queryShopListByCust.nd`,
      header: {
        'Content-Type': 'application/json', // 默认值
      },
      data: {
        "cisCode": that.userAccount.cisCode,
        "shopFullName": that.shopFullName,
        "distance": "",
        "longitude": that.longitude,
        "latitude": that.latitude,
        "matkls": [],
        matkl: '',
        "label": "",
        isMine: '',
        isSinkChannel: '',
        "isBrandGarden": "",
        "isSpecialShop": "",
        "isSmartShop": "",
        "provinceId": "",
        "cityId": "",
        "countyId": "",
        "townId": "",
        "marketModel": "",
        "shopLevel": "",
        "sortType": "1",
        "page": page,
        "pageSize": 20,
        'queryParamList':[]
      },
      method:'POST',
      callback: (res) => {
        that.loading=false
        that.setData({loading:false})
        for(let i=0;i<res.data.data.content.length;i++){
          if(res.data.data.content[i].distance!='null'){
            res.data.data.content[i].distance=parseFloat(res.data.data.content[i].distance).toFixed(1)
          }
        }
        this.totalPage = res.data.data.totalPage
        if(fenye==1){
          that.storeList=that.storeList.concat(res.data.data.content)
          that.setData({storeList:that.storeList})
        }else {
          that.storeList=res.data.data.content
          that.setData({storeList:that.storeList})
        }
      }
    })
  }
  onShow(){
    let that=this
    wx.getStorage({
      key: 'b2b_token',
      success (res) {
        that.userAccount=JSON.parse(res.data)
        const { basePartInfo } = that.userAccount

        //新增门店权限； basePartInfo为空或者只有厨卫的时候不显示，其他显示
        that.addStorePermissions = true
        if((basePartInfo && basePartInfo.length == 0) ||(basePartInfo && basePartInfo.length == 1 && basePartInfo[0].code == '52')){
          that.addStorePermissions = false
        }

        //得到当前位置
        that.getLocation()
        //获取历史记录
        // that.getSearchHistory()
      }
    })
  }
  onLoad() {
    wx.setNavigationBarTitle({
      title: '选择门店'
    })
  },

}
