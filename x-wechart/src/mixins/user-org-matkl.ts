import wepy from 'wepy';
import { connect } from 'wepy-redux';
import { getSpecialFilters } from '../store/actions/classification';
import any from 'ramda/es/any';

interface Data {

}

//
// 将此mixin放在第一个
//
// 供应商使用使用user.organizationList | 或者使用修改后的organizationList , 头部增加了全部, 数据格式为{id: '', name: ''}
// 物料组根据供应商变化, 选中organization.id, 在orgMatkl中查找有权限的物料组
//



@connect({
  user({ user }) {
    return user
  },
  specialfilters({ classification }) {
    return classification.specialfilters
  },
  classification({ classification }) {
    return classification
  }
}, {
  // 使用本mixins的页面|组件connect此方法
  getSpecialFilters
})
export default class SystemMixins extends wepy.mixin {
  data: Data = {
    orgMatkl: {},
    organizationList: [],
  };

  watch = {
    'user': function(newValue) {
      this.$mixins[0].methods.calcAuth(newValue, this.specialfilters, this)
    },
    'specialfilters': function(newValue) {
      this.$mixins[0].methods.calcAuth(this.user, newValue, this)
      this.$apply()
    }
  };

  methods = {
    calcAuth: (user: { orgAndMatklList: Array<any>; organizationList: Array<any>; }, specialfilters: { fwOrgsGroupMap: Array<any>; productGroupMap: Array<any>}, context: any) => {
      const auth = {};
      (user.orgAndMatklList || []).forEach((mapping) => {
        const orgId = Object.keys(mapping)[0]
        const matklId = mapping[orgId]
        const matklName = ((specialfilters.productGroupMap || []).find((item) => item.key === `${matklId}`) || {}).value

        if (matklName) {
          const key = `_${orgId}`
          if (auth[key]) {
            auth[key].push({
              id: matklId,
              name: matklName,
            })
          } else {
            auth[key] = [{
              id: '',
              name: '全部'
            }, {
              id: matklId,
              name: matklName,
            }]
          }
        }
      })

      const organizationList = (user.organizationList || []).map(({ id, organizationName }: any) => {
        return {
          id,
          name: organizationName,
        }
      })

      context.organizationList = [{
        id: '',
        name: '全部'
      }].concat(organizationList)
      context.orgMatkl = auth
      context.$apply()
    }
  }

  onLoad() {
   this.$mixins[0].methods.getSpecialFilters()
  }

  onUnload() {
    this.classification.specialfilters = []
  }
}
