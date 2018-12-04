import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ProductsPage from './views/Products.vue'
import ProductDetailPage from './views/ProductDetail.vue'
import ProductsCreatePage from './views/ProductsCreate.vue'
import ProductsEditPage from './views/ProductsEdit.vue'
import LoginPage from './views/Login.vue'
import RegisterPage from './views/Register.vue'

import store from './store';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsPage,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/products/create',
      name: 'productsCreate',
      component: ProductsCreatePage,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/products/edit/:id',
      name: 'productsEdit',
      component: ProductsEditPage,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: '/product/:id',
      name: 'single-product',
      component: ProductDetailPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {

  if(to.matched.some(routeData => routeData.meta.requiresAuth)) {
    if(!store.state.session.auth) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;