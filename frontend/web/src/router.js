import Vue from 'vue';
import VueRouter from 'vue-router';
/** View */
import Welcome from './view/Welcome';
import NotFound from './view/Common/NotFound';

import User from './view/User';
import Shop from './view/Shop';
import ShopCreate from './view/Shop/Create';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Welcome,
  },
  {
    path: '/usermanager',
    component: User,
  },
  {
    path: '/shop',
    component: Shop,
  },
  {
    path: '/shop/create',
    component: ShopCreate,
  },
  {
    // 会匹配所有路径
    path: '*',
    component: NotFound,
  }
]

export default new VueRouter({
  // mode: 'history',
  routes: routes,
});