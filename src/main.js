import Vue from 'vue';
import App from './App.vue';
import Toasted from 'vue-toasted';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Toasted);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
