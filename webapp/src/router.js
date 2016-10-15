import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import User from './views/User.vue';
import Widgets from './views/Widgets.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            component: Home,
            children: [
                { path: '/', component: User },
                { path: '/widgets', component: Widgets }
            ]
        },
        { path: '/login', component: Login, meta: {auth: 'no'} },
        { path: '*', redirect: '/' }
    ]
});

/***
 * global router before event
 */
router.beforeEach((to, from, next) => {
    const auth = to.meta.auth;
    if (auth === 'no') {
        next();
        window.scrollTo(0, 0);
    } else {
        // authoriztion
        if(!window.userinfo) {
//            const redirect = encodeURIComponent(to.path);
//            next('/login?redirect=' + redirect);
            next();
        } else {
            next();
            window.scrollTo(0, 0);
        }
    }
});

export default router;
