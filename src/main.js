// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import store from './store.js'

import VueLocalStorage from 'vue-localstorage'
import VueClipboards from 'vue-clipboards'
import VueHtmlToPaper from 'vue-html-to-paper'

const options = {
  'name': '_blank',
  'specs': [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  'styles': ['http://comunicacionescloudberry.com/admin/static/css/styleprint.css']
}

Vue.use(Buefy)
Vue.use(VueLocalStorage)
Vue.use(VueClipboards)
Vue.use(VueHtmlToPaper, options)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
