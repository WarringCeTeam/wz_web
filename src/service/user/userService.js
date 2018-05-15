/**
 * 描述：员工管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

const getUserListApi = '/api/sys/admin/list';                      // 列表           method 'GET'
const addUserApi = '/api/sys/admin';                    // 添加            method 'POST'
const modifyUserApi = '/api/sys/admin/{id}';                    // 修改           method 'PUT'
const modifyUserPasswordApi = '/api/sys/admin/{id}/password';                    // 修改密码           method 'PUT'
const freezeUserApi = '/api/sys/admin/{id}/freeze';                    // 冻结          method 'PUT'
const unfreezeUserApi = '/api/sys/admin/{id}/unfreeze';                    // 解冻          method 'PUT'
const userRoleListApi = '/api/sys/admin/{id}/role';                      // 已有角色列表           method 'GET'
const updateUserRoleApi = '/api/sys/admin/{id}/role';                      // 修改用户角色           method 'PUT'

// 列表
export const userList = (opt) => fetch.get(getUserListApi, {params: opt});

// 添加
export const addUser = (payload) => fetch.post(addUserApi, payload);

// 修改
export const UserUpdate = (opt, payload) => fetch.put(apiFormat(modifyUserApi, opt), payload);

// 修改密码
export const UserUpdatePassword = (opt, payload) => fetch.put(apiFormat(modifyUserPasswordApi, opt), payload);

// 冻结
export const UserFreeze = (opt) => fetch.put(apiFormat(freezeUserApi, opt));

// 解冻
export const UserUnFreeze = (opt) => fetch.put(apiFormat(unfreezeUserApi, opt));

// 查询已有角色
export const userRoleList = (opt) => fetch.get(apiFormat(userRoleListApi, opt));

// 修改角色列表
export const updateUserRole = (opt, payload) => fetch.put(apiFormat(updateUserRoleApi, opt), payload);
