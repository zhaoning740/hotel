import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import R from '@/request';

import App from './App.vue';
import router from './router';
import 'iview/dist/styles/iview.css';

// R.post('/123', {h: 1})

Vue.use(iView);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})