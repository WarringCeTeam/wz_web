/**
 *  描述：定义actions
 */

import { getUserInfo } from '@/service/login/loginService';
import { menuList } from '@/service/sidebar/sidebarService';
import { home } from '@/service/home/homeService';

// 导入 types
import {
  USER_INFO,
  MENU_TREE,
  CAR_LIST
} from './mutation-types';

export default {
  // getUserData
  async getUserData ({
                       commit
                     }) {
    // 获取用户信息
    let result = await getUserInfo();
    commit(USER_INFO, result.data);
  },
  // getMenuTree
  async getMenuTree ({
                       commit
                     }) {
    // 获取菜单信息
    let result = await menuList();
    commit(MENU_TREE, result.data);
  },
  // 获取全量车辆列表
  async getCarList ({
                      commit
                    }) {
    // 获取菜单信息
    let result = await home();
    commit(CAR_LIST, result.data);
  }
};
