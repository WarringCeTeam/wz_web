/**
 * 描述：路由文件
 */
// import App from '../../App';
import Web from '../../web';

// 404
const _404 = r => require.ensure([], () => r(require('../../page/404/404')), '_404');

// login
const login = r => require.ensure([], () => r(require('../../page/login/login')), 'login');

// main
const main = r => require.ensure([], () => r(require('../../page/main/main')), 'main');

// 首页
const home = r => require.ensure([], () => r(require('../../page/main/home/home')), 'home');

// web 前端页面
const index = r => require.ensure([], () => r(require('../../page/web/home/home')), 'index');
const webLogin = r => require.ensure([], () => r(require('../../page/web/login/login')), 'webLogin');

export default [
  // 未匹配到则404页面
  {
    path: '*',
    component: _404
  },
  {
    path: '/',
    component: Web,
    children: [
      {
        path: '',
        redirect: 'web/login'
      },
      {
        path: '/web/',
        component: Web,
        children: [
          {
            path: 'home',
            component: index
          },
          {
            path: 'login',
            component: webLogin
          }
        ]
      },
      {
        path: '404',
        component: _404
      },
      {
        path: 'login',
        component: login
      },
      {
        path: 'main',
        component: main,
        children: [
          {
            path: 'home',
            component: home
          }
        ]
      }
    ]
  }
];
