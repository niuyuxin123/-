import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import {ipcRenderer} from 'electron'
const electron = window.require('electron');

Vue.config.productionTip = false

Vue.use(router)
Vue.use(ElementUI)
Vue.prototype.$electron = electron
// Vue.use(FontAwesomeIcon)

library.add(fas,far,fab)
Vue.component('font-awesome-icon', FontAwesomeIcon);
// Vue.protoType.ipcRenderer =ipcRenderer

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
