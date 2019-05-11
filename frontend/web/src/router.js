import Vue from 'vue';
import VueRouter from 'vue-router';
/** View */
import Welcome from './view/Welcome';
import NotFound from './view/Common/NotFound';

import User from './view/User';
import Shop from './view/Shop';
import ShopCreate from './view/Shop/Create';
import ShopDetail from './view/Shop/Detail';
import Order from './view/Order';
import House from './view/House';
import HouseMutate from './view/House/Mutate';

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
    path: '/shop/detail',
    component: ShopDetail,
  },
  {
    path: '/ordermanager',
    component: Order,
  },
  {
    path: '/housemanager',
    component: House,
  },
  {
    path: '/house/(create|detail)/',
    component: HouseMutate,
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