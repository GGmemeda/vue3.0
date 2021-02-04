/**
 * 路由
 */
import { RouteRecordRaw, createRouter, createWebHashHistory, Router } from 'vue-router';
import {getToken} from "../utils/auth";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/Home',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: {
            title: '数字建造管理系统首页大屏',
        },
    },
    {
        path: '/Login',
        name: 'Login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: '登录-数字建造管理系统',
        },
    },
    {
        path: '/hello',
        name: 'hello',
        component: () => import('../components/HelloWorld.vue'),
        meta: {
            title: 'demo',
        },
    },
];

 const router: Router = createRouter({
    history: createWebHashHistory(),
     routes
});

// const whiteRouter:array[string] = ['/login'];
router.beforeEach((to, _from, next) => {
    /* 路由发生变化修改页面title */
    // if (to.meta.title) {
    //     document.title = to.meta.title
    // }
    if (to.path === '/Login') {
        next();
    } else {
        if (getToken()) {
            next()
        } else {
            next('/Login')
        }
    }
})

export default router
