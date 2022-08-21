import { VantComponent } from '../common/component';

VantComponent({
  relation: {
    name: 'tabs',
    type: 'ancestor'
  },

  props: {
    dot: Boolean,
    info: null,
    title: String,
    subtitle: String,
    disabled: Boolean,
    titleStyle: String
  },

  data: {
    width: null,
    inited: false,
    active: false,
    animated: false
  },

  watch: {
    title: 'update',
    subtitle: 'update',
    disabled: 'update',
    dot: 'update',
    info: 'update',
    titleStyle: 'update'
  },

  methods: {
    update() {
      const parent = this.getRelationNodes('../tabs/index')[0];
      if (parent) {
        parent.updateTabs();
      }
    }
  }
});
