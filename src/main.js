import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VeeValidate from 'vee-validate'
import VueFire from 'vuefire';
import VueChatScroll from 'vue-chat-scroll';

require('./assets/css/vuejs-dialog.min.css')
require('./assets/css/main.css')

require('./assets/js/vuejs-dialog.min.js')

Vue.use(Vuelidate);
Vue.use(VeeValidate);
Vue.use(VuejsDialog.main.default);
Vue.use(VueFire);
Vue.use(VueChatScroll);

Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')