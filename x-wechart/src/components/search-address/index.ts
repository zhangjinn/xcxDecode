import wepy from 'wepy';
import { trim, filter, includes, map } from 'ramda';
import { connect } from 'wepy-redux';
import { getDistributorAddress, getPeopleContacts } from '@/store/actions/order';

@connect({
  user({ user }) {
    return user.info;
  },
  list({ cart }) {
    return cart.list;
  },
}, {
  getPeopleContacts,
  getDistributorAddress
})
export default class Address extends wepy.component {
  props = {
    title: {
      type: String,
    },
  };
  itemsCache = [];
  callback = null;
  data = {
    show: false,
    id: '',
    code:'',
    items: [],
    matklId: '',
    orgId: '',
    type: '',
  };
  methods = {
    onSearchChange(evt: any) {
      const key = trim(evt.detail);
      if (key) {
        this.items = filter(({ name }) => includes(key, name), this.itemsCache);
      } else {
        this.items = this.itemsCache;
      }
    },
    fixadress(list: any) {
      return map(({ id, address }) => {
        return {
          id,
          name: address,
        }
      }, list || [])
    },
    chooseItem(item: any) {
      if (this.type == 'fxs') {
        this.id = item.id;
        this.code = item.code
        const allinfo = {
          id: '',
          code:'',
          name: '',
          address: [],
          contact: '',
          phone: ''
        }
        allinfo.id = item.id
        allinfo.code = item.code
        allinfo.name = item.name
        this.methods.getDistributorAddress({
          customerId: item.id,
          orgId: this.orgId,
          matklId: this.matklId
        }).then((res) => {
          if (res && res.payload && res.payload.length > 0) {
            allinfo.address = this.methods.fixadress(res.payload)
            const id = res.payload[0].id
            this.methods.getPeopleContacts({ sendToId: id }).then((item) => {
              allinfo.contact = item.payload.contact
              allinfo.phone = item.payload.phone
            }).then(() => {
              this.callback && this.callback(allinfo);
            })
          } else {
            allinfo.contact = ''
            allinfo.phone = ''
            this.callback && this.callback(allinfo);
          }
        })
      } else {
        this.id = item.id;
        this.code = item.code
        const allinfo = {
          ...item
        }
        this.methods.getPeopleContacts({ sendToId: item.id }).then((item) => {
          allinfo.contact = item.payload.contact
          allinfo.phone = item.payload.phone
        }).then(() => {
          this.callback && this.callback(allinfo);
        })
        this.items = this.itemsCache;
        this.show = false;
      }
      this.items = this.itemsCache;
      this.show = false;
    },
    closeSearch() {
      this.show = false;
    },
    open(items: any, id: any, orgId: any, matklId: any, type: any, callback: any) {
      this.matklId = matklId
      this.orgId = orgId
      this.itemsCache = items;
      this.type = type
      this.id = id;
      this.items = items;
      this.callback = callback;
      this.show = true;
    },
    openNormal(items: any, id: any, type: any, callback: any) {
      this.type = type
      this.itemsCache = items;
      this.id = id;
      this.code = id
      this.items = items;
      this.callback = callback;
      this.show = true;
    }
  };
}
