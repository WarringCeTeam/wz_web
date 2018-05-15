/**
 * 描述：角色管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

const getRoleListApi = '/api/role';                      // 列表           method 'GET'
const addRoleApi = '/api/role';                    // 添加            method 'POST'
const modifyRoleApi = '/api/role/{id}';                    // 修改           method 'PUT'
const deleteRoleApi = '/api/role/{id}';                    // 删除          method 'delete'
const roleMenuListApi = '/api/role/{id}/menu';                      // 已有菜单列表           method 'GET'
const updateRoleMenuApi = '/api/role/{id}/menu';                      // 修改菜单角色           method 'PUT'

// 列表
export const roleList = (opt) => fetch.get(getRoleListApi, {params: opt});

// 添加
export const addRole = (payload) => fetch.post(addRoleApi, payload);

// 修改
export const roleUpdate = (opt, payload) => fetch.put(apiFormat(modifyRoleApi, opt), payload);

// 删除
export const roleDelete = (opt) => fetch.delete(apiFormat(deleteRoleApi, opt));

// 查询已有菜单
export const roleMenuList = (opt) => fetch.get(apiFormat(roleMenuListApi, opt));

// 修改菜单列表
export const updateRoleMenu = (opt, payload) => fetch.put(apiFormat(updateRoleMenuApi, opt), payload);
