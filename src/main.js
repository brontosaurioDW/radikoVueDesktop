import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('./assets/css/main.css')
require('./assets/js/vuejs-dialog.min.js')

Vue.use(VuejsDialog.main.default)

Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')