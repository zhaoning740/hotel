import Vue from 'vue';
import VueRouter from 'vue-router';
import Test from './view/Test';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Test },
]

export default new VueRouter({
  mode: 'history',
  routes: routes,
});