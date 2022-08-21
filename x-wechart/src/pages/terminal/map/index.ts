import wepy from 'wepy'

const qqmap = require('@/pages/terminal/utils/qqmap-wx-jssdk.min.js')
import Address from '@/components/address/index'
import { connect } from 'wepy-redux'
import { getRegin,fixAddress } from '@/store/actions/record'
import Dialog from '@/components/vant/dialog/dialog'

interface Data {
  accountList: any[];
  longitude: number;
  latitude: number;
  markers: any[];
}

@connect({
  regins({ record }) {
    return record.regins
  }
}, {
  getRegin,
  fixAddress
})
export default class Defaultaccount extends wepy.page {
  components = {
    address: Address
  }
  config = {
    navigationBarTitleText: '巡店',
    usingComponents: {
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-switch': '../../../components/vant/switch/index',
      'van-toast': '../../../components/vant/toast/index',
      'van-popup': '../../../components/vant/popup/index',
      'van-field': '../../../components/vant/field/index'
    }
  }
  data = {
    qqmapsdk: null,
    showMap: true,
    optionsTemp: null,//页面参数
    mapCtx: null,
    shAddress: '',
    city: '',//省市区
    scale: 16,
    accountList: [],
    longitude: 120.371257,  //默认定位经度
    longitude2: 120.371257,  //默认定位经度
    latitude: 36.070476,   //默认定位纬度
    latitude2: 36.070476,   //默认定位纬度
    showCompass: 'true',
    markers: [{
      id: '0',
      iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png', // weizhi.png
      longitude: 120.371257,  //默认定位经度
      latitude: 36.070476,
      width: 30,
      height: 30,
      anchor: {x: .5, y: .5}
    }],
    toAddress: null,
    circle: [{
      latitude: 120.371257,
      longitude: 36.070476,
      fillColor: '#B4F3F188',
      color: '#00B7B3',
      strokeWidth: '0.5',
      radius: 200
    }]
  }

  // 页面内交互写在methods里
  methods = {
    onShAddressChange: (e) => {
      this.shAddress = e.detail
    },
    // 选择地址
    openAddress: () => {
      const provinceArr = this.regins
      this.$invoke('address', 'openAddressPopup', provinceArr, {
        'provinceId': this.optionsTemp.provinceId,
        'cityId': this.optionsTemp.cityId,
        'areaId': this.optionsTemp.countryId
      }, (item: any, address: any) => {
        this.city = item.name
        this.toAddress = address
        this.$apply()
      })
    },
    recovery: () => {
      var pages = getCurrentPages()
      // var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2]
      const newAdress = prevPage.data.newAdress
      newAdress.recoveryType = '1'
      if (this.toAddress && this.toAddress.areaId) {
        newAdress.dlatitude = this.latitude
        newAdress.dlongitude = this.longitude
        newAdress.gpsProvinceName = this.toAddress.provinceName
        newAdress.gpsProvinceCode = this.toAddress.provinceId
        newAdress.gpsCityName = this.toAddress.cityName
        newAdress.gpsCityCode = this.toAddress.cityId
        newAdress.countyName = this.toAddress.areaName
        newAdress.countyId = this.toAddress.areaId
        newAdress.townId = this.toAddress.townId
        newAdress.townName = this.toAddress.townName
        newAdress.shAddress = (newAdress.gpsProvinceName||'')+(newAdress.gpsCityName||'')+(newAdress.countyName||'')+this.shAddress;
        const data={
          longitude: newAdress.dlongitude,
          latitude: newAdress.dlatitude,
          province: newAdress.gpsProvinceName, //省名称
          provinceId: newAdress.gpsProvinceCode, //省ID
          city: newAdress.gpsCityName, //市名称
          cityId: newAdress.gpsCityCode, //市ID
          area: newAdress.countyName, //区名称
          areaId: newAdress.countyId, //区ID
          town: newAdress.townName, //街道名称
          townId: newAdress.townId, //街道ID
          storeAddress: newAdress.shAddress, //修改后门店地址
          storeCode: this.optionsTemp.shopCisCode, //门店编码
          storeName: this.optionsTemp.storeName,//门店名称
          gpsAddress: newAdress.shAddress, //用户当前地址
          userLatiTude: this.latitude, //用户当前纬度
          userLongiTude: this.longitude//用户当前经度
        }
        this.methods.fixAddress(data).then(res=>{
          if (res.payload.success === true) {
            wx.showToast({
              title: '提交纠错成功！',
              icon: 'none'
            })
            prevPage.data.markers[0] = {
              id: Math.random(),
              latitude: this.latitude,
              longitude: this.longitude,
              iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png', // weizhi.png
              width: 30,
              height: 30,
              anchor: {x: .5, y: .5}
            }
            prevPage.setData({
              recoveryType: 1
            })
            this.qqmapsdk.calculateDistance({
              mode: 'straight',
              to: [{
                latitude: this.latitude,
                longitude: this.longitude
              }],
              from: {
                latitude: this.latitude2,
                longitude:  this.longitude2
              },
              success: function(res) {
                const distance = res.result.elements[0].distance
                newAdress.distance = (distance||1)/1000
                wx.navigateBack({
                  delta: 1
                })
              },
              fail: function(res) {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }else{
            wx.showToast({
              title: res.payload.returnMsg,
              icon: 'none'
            })
          }
        })

      } else {
        wx.showToast({
          title: '请重新选择所在地区！',
          icon: 'none'
        })
        return
      }
    },
    mapTap: (e) => {
      this.latitude = e.detail.latitude
      this.longitude = e.detail.longitude
      const that = this
      const market = {
        id: Math.random(),
        latitude: e.detail.latitude,
        longitude: e.detail.longitude,
        iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png', // weizhi.png
        width: 30,
        height: 30,
        anchor: {x: .5, y: .5}
      }
      const circle = {
        id: Math.random(),
        latitude: e.detail.latitude,
        longitude: e.detail.longitude,
        fillColor: '#B4F3F188',
        color: '#00B7B3',
        strokeWidth: '0.5',
        radius: 200
      }
      this.markers = [market]
      this.circle = [circle]
      this.qqmapsdk.reverseGeocoder({
        location: {
          latitude: e.detail.latitude,
          longitude: e.detail.longitude
        },
        success: function(res) {
          that.adInfo = res.result.ad_info
          that.setData({ location: res.result.address })
          that.location = res.result.formatted_addresses && res.result.formatted_addresses.recommend
          that.shAddress = res.result.formatted_addresses && res.result.formatted_addresses.recommend
          // that.city=res.result.address
          that.$apply()
        },
        fail: function(res) {
          wx.showToast({
            title: '解析地址失败',
            icon: 'none'
          })
        }
      })
    },
    regionchange: ({ type }) => {
      if (type == 'end') {
        const market = this.markers[0]
        market.id = Math.random()
        const circle = this.circle[0]
        circle.id = Math.random()
        this.markers = [market]
        this.circle = [circle]
      }
    },
    scaleJia() {
      this.scale = this.scale + 1
      this.setData({
        scale: this.scale
      })
    },
    scaleJian() {
      this.scale = this.scale - 1
      this.setData({
        scale: this.scale
      })
    },
    location() {
      this.getLocation()
      this.city = ''
    },
    reset: () => {
      this.methods.initMap()
      var pages = getCurrentPages()
      // var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2]
      const newAdress = prevPage.data.newAdress
      newAdress.recoveryType = '0'
      newAdress.distance = ''
      newAdress.dlatitude = ''
      newAdress.dlongitude = ''
      newAdress.gpsProvinceName = ''
      newAdress.gpsProvinceCode = ''
      newAdress.gpsCityName = ''
      newAdress.gpsCityCode = ''
      newAdress.countyName = ''
      newAdress.countyId = ''
      newAdress.townId = ''
      newAdress.townName = ''
      newAdress.shAddress = ''
    },
    initMap: () => {
      const options = this.optionsTemp
      this.shAddress = options.shAddress
      const latitude = parseFloat(options.dlatitude)
      const longitude = parseFloat(options.dlongitude)
      this.city = (options.provinceName||'') + (options.cityName||'') + (options.countyName||'')+ (options.townName||'')
      if(!longitude){
        return
      }
      this.longitude = longitude
      this.latitude = latitude
      const market = {
        id: Math.random(),
        latitude: latitude,
        longitude: longitude,
        iconPath: 'http://3s-static.hisense.com/wechat/1/14722429883/1655865963285_a60bce54f9a147ba9e173f025974cf45.png', // weizhi.png
        width: 30,
        height: 30,
        anchor: {x: .5, y: .5}
      }
      const circle = {
        id: Math.random(),
        latitude: latitude,
        longitude: longitude,
        fillColor: '#B4F3F188',
        color: '#00B7B3',
        strokeWidth: '0.5',
        radius: 200
      }
      setTimeout(() => {
        this.markers = [market]
        this.circle = [circle]
        this.$apply()
      }, 300)
    }
  }

  //获取当前位置
  getLocation() {
    let that = this
    // 初始化时间
    let day = new Date()
    that.currentTime = day.Format('MM-dd hh:mm:ss')
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.latitude = res.latitude
        that.latitude2 = res.latitude
        that.longitude = res.longitude
        that.longitude2 = res.longitude
        that.$apply()
        that.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            that.adInfo = res.result.ad_info
            that.setData({ location: res.result.address })
            that.location = res.result.formatted_addresses && res.result.formatted_addresses.recommend
            that.shAddress = res.result.formatted_addresses && res.result.formatted_addresses.recommend
            // that.city=res.result.address
            that.$apply()
          },
          fail: function(res) {
            wx.showToast({
              title: '解析地址失败',
              icon: 'none'
            })
          }
        })
      },
      fail(res) {
        that.show4 = true
        that.setData({ show4: true })
      }
    })
  }

,

  onLoad(options) {
    this.optionsTemp = JSON.parse(JSON.stringify(options))
    this.methods.initMap()
    this.methods.getRegin({ pCode: 0 })
    this.qqmapsdk = new qqmap({
      key: wepy.$appConfig.qqMapKey
    })
  }
}
