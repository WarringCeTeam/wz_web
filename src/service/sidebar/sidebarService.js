/**
 * 描述：导航service
 */
import { fetch, apiFormat } from '@/service/baseService';

// 导航
const menuListApi = '/api/sys/menu';                                    // 菜单列表           method 'GET'

const menuAddApi = '/api/sys/menu';                                     // 菜单新增           method 'POST'

const menuDelApi = '/api/sys/menu/{id}';                                // 菜单删除           method 'DELETE'

const menuUpdateApi = '/api/sys/menu/{id}';                             // 菜单修改           method 'PUT'

// 列表
export const menuList = (opt) => fetch.get(menuListApi, {params: opt});

// 删除
export const menuDel = (opt) => fetch.delete(apiFormat(menuDelApi, opt));

// 新增
export const menuAdd = (payload) => fetch.post(menuAddApi, payload);

// 修改
export const menuUpdate = (opt, payload) => fetch.put(apiFormat(menuUpdateApi, opt), payload);
