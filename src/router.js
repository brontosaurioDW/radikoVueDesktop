import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ProductsPage from './views/Products.vue';
import ProductDetailPage from './views/ProductDetail.vue';
import ProductsCreatePage from './views/ProductsCreate.vue';
import ProductsEditPage from './views/ProductsEdit.vue';
import LoginPage from './views/Login.vue';
import RegisterPage from './views/Register.vue';
import ChatPage from './views/Chat.vue';

import store from './store';

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Radiko - Inicio',
            requiresAuth: true
        }
    }, {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {
            title: 'Radiko - Login',
        }
    }, {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: {
            title: 'Radiko - Registro',
        }
    }, {
        path: '/products',
        name: 'products',
        component: ProductsPage,
        meta: {
            title: 'Radiko - Productos',
            requiresAuth: true
        }
    }, {
        path: '/products/create',
        name: 'productsCreate',
        component: ProductsCreatePage,
        meta: {
            title: 'Radiko - Nuevo Producto',
            requiresAuth: true
        }
    }, {
        path: '/products/edit/:id',
        name: 'productsEdit',
        component: ProductsEditPage,
        meta: {
            title: 'Radiko - Editar Producto',
            requiresAuth: true
        }
    }, {
        path: '/product/:id',
        name: 'single-product',
        component: ProductDetailPage,
        meta: {
            title: 'Radiko - Detalle',
            requiresAuth: true
        }
    }, {
        path: '/chat',
        name: 'chat',
        component: ChatPage,
        meta: {
            title: 'Radiko - Chat',
            requiresAuth: true
        }
    }]
});

router.beforeEach((to, from, next) => {

    if (to.matched.some(routeData => routeData.meta.requiresAuth)) {
        if (!store.state.session.auth) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }

    // DOC: https://alligator.io/vuejs/vue-router-modify-head/
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    if (nearestWithTitle) {
        if (nearestWithTitle) {
            document.title = nearestWithTitle.meta.title;
        }

        Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

        next();
    } else {
        next();
    }
});

export default router;