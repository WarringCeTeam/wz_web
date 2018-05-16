/**
 * 描述：登录service
 */
import { fetch } from '@/service/baseService';

// login
const loginApi = '/api/pub/user/login';                                    // 系统登陆           method 'GET'

// userInfo
const getUserInfoApi = '/api/sys/admin/loginInfo';                          // 获取用户信息       method 'GET'

// loginOut
const loginOutApi = '/api/pub/user/logout';                                // 系统注销           method 'GET'

// 登录
export const login = (payload) => fetch.post(loginApi, payload);

// 获取用户信息
export const getUserInfo = () => fetch.get(getUserInfoApi);

// 注销
export const loginOut = () => fetch.get(loginOutApi);
