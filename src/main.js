import Vue from 'vue'
import App from './App.vue'
import Toast from 'vue-easy-toast'
import router from './router'

Vue.config.productionTip = false

Vue.use(Toast);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
