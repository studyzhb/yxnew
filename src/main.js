import Vue from 'vue'
import App from './App'

// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import router from './router/index.js'
import axios from 'axios'

//页面顶部进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import 'common/stylus/index.styl'

Vue.use(ElementUI)
NProgress.configure({ showSpinner: false })

// Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.baseUrl = 'http://a.ejiabl.com'

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})
router.afterEach(transition => {
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})