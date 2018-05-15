/**
 * 描述：定义states
 */

export default {
  // 全局公共部分
  pageNum: 1,                                   // 当前页
  totalElement: 0,                              // 总数
  pageSize: 20,                                  // 分页数
  pageSize_options: [20, 50, 100, 200],             // 分页选择
  modalTransition: 'bounceLeft',              // 弹出动画
  userInfo: {},                                 // 用户信息
  isLogin: true,                                // 是否登录
  carList: [],                                  // 所有车辆列表
  menuTreeList: [],                             // 菜单
  sidebar_an: false,                            // 控制导航
  taskModal_info: {},
  userActive: 'first',                         // 员工管理tab
  // 电子围栏绘制样式
  baseDraw: {
    strokeColor: '#5D87AF',
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: '#5D87AF',
    fillOpacity: 0.3
  }
};
