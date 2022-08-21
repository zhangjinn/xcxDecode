import wepy from 'wepy';
import { clone } from 'ramda';
import { request } from '@/utils/request';
import Toast from '@/components/vant/toast/toast';
import { getStorage } from '@/utils';

interface Data {
  accountList: any[];
  longitude:number;
  latitude:number;
  markers:any[];
}

export default class Defaultaccount extends wepy.page {
  config = {
    navigationBarTitleText: '地图',
    usingComponents: {
      'van-row': '../../../components/vant/row/index',
      'van-col': '../../../components/vant/col/index',
      'van-switch': '../../../components/vant/switch/index',
      'van-toast': '../../../components/vant/toast/index',
    },
  };
  data = {
    accountList: [],
    longitude: 108.07332649827005,  //默认定位经度
    latitude: 34.28626496061992,   //默认定位纬度
    markers: [
    //八教垃圾桶位置
    {
      id: 0,
      iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
        latitude: 34.28594472914285,
        longitude: 108.07340294122699,
      width: 20,  //图片显示宽度
      height: 20  //图片显示高度
    },
      //三教垃圾桶位置
      {
        id: 1,
        iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
        latitude: 34.28345098172088,
        longitude: 108.07423643767835,
        width: 20,
        height: 20
      },
    //北秀垃圾桶位置
      {
        id: 2,
        iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
        latitude: 34.28520896777005,
        longitude: 108.0694815516472,
        width: 20,
        height: 20
      },
    //信工楼垃圾桶位置
    {
      id: 3,
      iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
      latitude: 34.2842427171466,
      longitude: 108.0724158883095,
      width: 20,
      height: 20
    },
    //10号寝室楼的位置
      {
        id: 4,
        iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
        latitude: 34.286067170734036,
        longitude: 108.0664473026991,
        width: 20,
        height: 20
      },
    //14号寝室楼的位置 
        {
        id: 5,
        iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
        latitude: 34.287375788724745,
          longitude: 108.06752823293209,
        width: 20,
        height: 20
      },
      //理学院垃圾桶位置
      {
        id: 6,
        iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
        latitude: 34.28801845563627,
        longitude: 108.07408086955549,
        width: 20,
        height: 20
      },
      //食品院垃圾桶位置
      {
        id: 7,
        iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
        latitude: 34.288367488192435,
        longitude: 108.07558692991735,
        width: 20,
        height: 20
      },
    //动科楼垃圾桶位置
        {
        id: 8,
        iconPath: "https://img-blog.csdnimg.cn/20191216212246695.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA0MjY4Mw==,size_16,color_FFFFFF,t_70",
          latitude: 34.28487044889044,
          longitude: 108.07326279580593,
        width: 20,
        height: 20
      }]
  };

  // 页面内交互写在methods里
  methods = {
    markertap:(e) => {
      console.log(e);
    },
    async onChangeToDefault(event) {
      const { account } = event.target.dataset
      const { unionid } = this.$parent.globalData
      const result = await request({ api: '/changeUnionidAccount.nd', method: 'POST', data: { unionid, account }})
      if(result.code !== 0) {
        Toast.fail(result.msg)
        return
      }
      const accountListNew = clone(this.accountList)
      accountListNew.forEach(item => {
        item.uDefault = '1'
        if(item.account === account) {
          item.uDefault = '0'
        }
      })
      this.accountList = accountListNew
      Toast.success('切换默认账号成功')
      this.$apply()
    },
  }
  async getAccountList() {
    const result = await request({ api: 'queryAccountUnionid.nd'})
    let accountList = result.list.map(item => {
      return { ...item, text: item.name, value: item.account }
    })
    this.accountList = accountList
    this.$apply()
  }
  async onLoad() {
    // this.getAccountList()
  }
}
