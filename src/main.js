import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueIconFont from 'vue-icon-font'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import '@/assets/css/BaseCss.css'
import PluginAxios from '@/plugin/axios'
import '@/plugin/antd'
import 'ant-design-vue/dist/antd.css'

Vue.use(VueIconFont)
Vue.use(PluginAxios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
