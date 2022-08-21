
import { VantComponent } from '../vant/common/component'
import { dmsRequest } from '../../store/actions/dmsrequest';
import Toast from '../vant/toast/toast';
import { length, map, is } from 'ramda';
import wepy from 'wepy';

VantComponent({
  props: {
    item: Object, // 两个参数customerCode： 门店编码 orgId： 门店组织
  },
  data: {
    materialGroup: []
  },
  watch: {
    // 监听传入参数
    'item': function(item) {
      const { customerCode = '', orgId = '' } = item
      const context = this
      const cisCode = wepy.$instance.globalData.cisCode
      if(customerCode !== '') {
        dmsRequest({
          data: {
            cisCode,
            customerCode,
            orgId,
          },
          method: 'findMaterialByCustomer'
        }).then((res) => {
          if(res && res.code == '0' ) {
            context.setData({
              materialGroup: res.materialGroup
            })

          }
        })
      }
    }
  },
  methods: {
  },
})
