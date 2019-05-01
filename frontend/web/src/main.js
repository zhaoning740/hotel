import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import R from '@/request';

Vue.use(iView);

R.post('/123', {h: 1})

new Vue({
  render: h => h(App)
}).$mount('#app')