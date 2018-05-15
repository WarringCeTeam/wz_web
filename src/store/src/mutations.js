/**
 *  描述：定义mutations
 */
import tool from '@/js/core/utils/tool.js';

// 导入 types
import {
  SIDEBAR_AN,
	USER_INFO,
	LOGIN_OUT,
	LOGIN_IN,
	MENU_TREE,
  CAR_LIST,
  TASKMODAL_INFO,
  USER_ACTIVE
} from './mutation-types';

export default {
  // 控制导航
  [SIDEBAR_AN] (state, info) {
    state.sidebar_an = info.state;
  },
    // 保存用户信息
	[USER_INFO] (state, info) {
		state.userInfo = info;
	},
	// 退出登录
	[LOGIN_OUT] (state) {
		tool.removeStore('isLogin');
		state.isLogin = false;
	},
	// 登录
	[LOGIN_IN] (state) {
		tool.setStore('isLogin', true);
		state.isLogin = true;
	},
	// 获取菜单
	[MENU_TREE] (state, info) {
		state.menuTreeList = info;
	},
  // 获取全量车辆列表
  [CAR_LIST] (state, info) {
    state.carList = info;
  },
  [TASKMODAL_INFO] (state, res) {
    state.taskModal_info = res;
    // console.log(state.taskModal_info);
  },
  [USER_ACTIVE] (state, res) {
    state.userActive = res;
  }
};
