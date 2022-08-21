import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.prototype.axios = axios;
Vue.config.productionTip = false

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
