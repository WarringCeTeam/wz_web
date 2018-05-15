/**
 * 描述：路由文件
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './src/router.js';
// import { Message } from 'element-ui';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes,
    strict: process.env.NODE_ENV !== 'production'
});

// 路由未登录拦截
// router.beforeEach((to, from, next) => {
//   let info = Vue._hyTool.getStore('isLogin');
//     if (to.path !== '/login' && !info) {
//         Message({
//             message: '暂无登录信息, 请登录',
//             type: 'error'
//         });
//         next({
//         path: '/login'
//         });
//     } else {
//         next();
//     }
// });

export default router;
