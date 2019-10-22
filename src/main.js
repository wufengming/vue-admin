import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import App from './App'
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // 全局样式

import store from './store'
import router from './router'
import i18n from './lang' // 国际化语言
import './icons' // 图标
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // 全局过滤器
import VueAnalytics from 'vue-analytics'
import MessageBox from './components/messageDialog'

import ajax from './utils/ajax'
Vue.use(ajax)
Vue.use(MessageBox)
Vue.use(VueAnalytics, {
  id: 'UA-109340118-1',
  router
})
import axios from './utils/request'
// 注册组件到Vue
Vue.prototype.$axios = axios

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// 完整引入element-ui 和 i18n语言
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// 注册全局实用过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
