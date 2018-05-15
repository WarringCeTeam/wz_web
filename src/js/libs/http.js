/**
 * 描述：http
 */
import axios from 'axios';
import router from '@/router/';
import store from '@/store/';
import { Message } from 'element-ui';

axios.defaults.timeout = 10000;

// 拦截
axios.interceptors.request.use(function (config) {
    // config.headers.TOKEN = 1;
    return config;
}, function (error) {
    console.log('error111111111111111111111111:' + error);
    Message.error({
        message: '加载超时'
    });
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.data.result) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response.data.message);
    }
}, function (error) {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 401 清除token信息并跳转到登录页面
                store.commit('LOGIN_OUT');
                Message.error({
                    message: '登录超时， 请重新登录！'
                });
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                });
                break;
            case 404:
                return Promise.reject('当前api未找到，错误代码：404');
            case 500:
                return Promise.reject('未知原因，错误代码：500');
        }
    }
    console.log('接受超时:' + error);
    Message.error({
      message: '请求超时，请返回重新处理。'
    });
    return Promise.reject(error);
});

export default axios;
