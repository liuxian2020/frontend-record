import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import 'multi-items-input'
import 'multi-items-input/dist/multi-items-input.css'

import "./directive/index.js";
import commonMixin from "./mixins/index.js";
Vue.mixin(commonMixin);
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
// import waves from "@/directive/waves/index.js"; // 水波纹指令

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // render(h) {
  //   // console.log(h('div', [h('h1', 'titleq1'), h('h2', 'title2')]), '====hhh')
  //   return h('div', [h('h1', 'title1'), h('h2', 'title2')])
  // }
})
