/**
 * 描述：菜单管理service
 */
import { fetch } from '@/service/baseService';

const getMenuListApi = '/api/menu';                      // 列表           method 'GET'

// 列表
export const menuList = (opt) => fetch.get(getMenuListApi, {params: opt});
