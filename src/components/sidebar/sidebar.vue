/**
* 描述：sidebar部分
*/
<style lang="scss" scoped>
  @import 'src/styles/vars';
  @import 'src/styles/mixins';
  .clear{
    clear: both;
    zoom: 1;
  }
  .hy-sidebar-nav {
    @include wh(200px, 100%);
    position: fixed;
    transition: all 0.5s;
    color: #FFFFFF;
    background: #3b96d5;
    /*background: url(../../images/bg_left.png) #5c7aff no-repeat bottom center;*/
    z-index: 999;
    user-select: none;
    .hy-sidebar-scroll {
      @include wh(100%, calc(100% - 68px));
      overflow-y: auto;
    }
    .el-menu--dark {
      background: none;
    }
  .el-menu{
    background: url(/static/img/bg_left.png) linear-gradient(#408bfb, #7275f9) no-repeat bottom center;
  }
    &.hy-sidebar-zoom {
      width: 70px;
    }
    .hy-sidebar-title {
      background: #3b96d5;
      position: relative;
      height: 60px;
      line-height: 30px;
      color: #fff;
      white-space: nowrap;
      font-size: 16px;
      text-align: center;
      .hy-sidebar-list {
        position: absolute;
        top: 50%;
        left: 115%;
        line-height: 1;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: left 0.5s;
        cursor: pointer;
        &.hy-sidebar-icon {
          left: 50%;
        }
      }
      .hy-sidebar-name{
        font-size: 18px;
        background: #3b96d5;
        color: #fff;
        height: 60px;
        line-height:60px;

      }
    }
    .hy-sidebar-iconList {
      li {
        margin-bottom: 10px;
        height: 50%;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        overflow-x: hidden;
        &:hover,
        &.active {
          background: $body-bg;
        }
      }
    }
  }
  .hy-nav-li{
    color:#fff;
    padding: 10px;
    text-align: center;
    height: 50px;
    border-left:3px solid #6198f7;
    padding-left:30px !important;

  }
  .blockName{
    font-size: 14px;
    line-height: 30px;
    float: left;
  }
  .hy-header-dropMenu{
    width:100%;
  }
  .hy-header-dropMenu img{
    margin:0 auto;
    width:70px;
    display: block;
    magin-top: 20px;
  }
  .admin_name{
    text-align: center;
    font-size: 14px;
    width:100%;
    line-height: 50px;
  }
  div.icon{
    width:50px;
    height:30px;
    float: left;
  }
  .open_hoverNav, .hy-nav-li:hover {
    border-left:3px solid #f8be6f;
    background: #2d8ac4;
    color:#fff;
  }
  .back_f1{
    background: #f1f1f1;
    padding-left: 30px;
  }
  .color_red{
    color: #d1293c;
  }
  .submenu{
    color: #b7b7b7;
    span{
      color: #797979;
    }
  }
  .mr5 {
    margin-right: 15px !important;
  }
  // 动画
  .fade-enter-active{
    transition: all 0.5s ease-in-out;
  }
  .fade-leave-active {
    transition: all 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .fade-menu-enter-active {
    transition: all 0.5s ease-in-out;
  }
  .fade-menu-leave-active {
    transition: all 0.3s;
  }
  .fade-menu-enter, .fade-menu-leave-to {
    opacity: 0
  }
  .l-sidebar-icon{
    color:#fff;
  }
  .close_hoverNav, li:hover .l-sidebar-icon{
    color:#7b9cdd;
  }
  .login-out{
    position: fixed;
    width:200px;
    height:40px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    bottom:0;
    left:0;
    text-align: center;
    z-index:10;

  }
  .quit_min{
    width:100%;
    cursor: pointer;
  }
</style>
<template>
  <div class="hy-sidebar-nav" :class="classes">
    <div class="hy-sidebar-title">
      <transition name="fade">
        <div v-if="!sidebar_an" class="hy-sidebar-name" style="cursor:pointer;" @click="zoom()">
          <img :src="'/static/images/logoB.png'" alt="logo" height="27" width="84"/>
          <!--ECU远程监控系统-->
        </div>
      </transition>
      <span class="hy-sidebar-list" :class="classStyle" @click="zoom()">
          <hy-closed></hy-closed>
      </span>
    </div>
    <ul class="hy-header-admin" v-if="!sidebar_an">
      <li class="hy-header-dropMenu" :class="classes">
        <img :src="'/static/images/touxiang03.png'" alt="touxiang" height="70"/>
        <!--<a href="javascript:void(0);" @mouseover="mouseover()" @mouseout="mouseout()">
        </a>-->
      </li>
      <div  class="admin_name">Hi， {{loginInfo.name}}</div>
    </ul>
    <div class="hy-sidebar-scroll">
      <transition name="fade-menu" mode="out-in">
        <div v-if="!sidebar_an" key="!sidebar_an">
          <el-menu :default-openeds="sidebar_openeds" theme="dark" :unique-opened="true" style="padding-bottom: 200px;">
            <ul v-for="(item, index) in navList" :key="index">
              <router-link :to="changeUrl(item.url)">
                <el-menu-item class="hy-nav-li"  :index="item.url" :class="{'open_hoverNav': isActive === item.url}">
                  <div class="icon">
                    <hy-icon :type="item.icon" :size="item.size" style="position: relative;top: -12px !important;left:0 !important;"></hy-icon>
                  </div>
                  <span class="blockName">{{item.name}}</span>
                </el-menu-item>
              </router-link>
            </ul>
          </el-menu>
          <a id="bigMenu" style="background-color: #3b96d5" v-if="!sidebar_an" key="!sidebar_an" class="login-out" @click="loginOut()"><img src="../../images/eqit02.png" width="40" height="29" style="padding:2px 10px;margin-left:-30px;">退出登录</a>
        </div>
        <ul v-else key="sidebar_an" class="hy-sidebar-iconList">
          <div style="padding:10px 0;">
            <img src="/static/images/touxiang03.png" class="min_eqit" width="40" height="40" style="display: block;margin:0 auto;">
          </div>
          <li :class="{'active': isActive === item.url}" v-for="(item, index) in navList" :key="index">
            <router-link :to="changeUrl(item.url)">
            <hy-icon :type="item.icon" :size="30" class="l-sidebar-icon"  :class="{'close_hoverNav': isActive === item.url}" style="width: 70px;height:50px;display: block;"></hy-icon>
            </router-link>
          </li>
          <div class="quit_min" @click="loginOut()" >
            <img src="../../images/eqit02.png" class="min_eqit" width="20" height="25" style="display: block;margin:0 auto;">
            <div style="text-align: center;line-height:20px;font-size: 12px;">退出</div>
          </div>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
  import hyClosed from './closed.vue';
  import { mapState, mapMutations, mapActions } from 'vuex';
  const prefixCls = 'hy-sidebar';
  import { loginOut, getUserInfo } from '@/service/login/loginService';
  let timer = null;

  export default {
    data () {
      return {
        sidebar_openeds: [],
        navList: [],
        navList11: [
          {name: '项目管理', icon: 'qrcode', url: '/main/project', size: 30},
          {name: '软件管理', icon: 'xiazaiguanli', url: '/main/ware', size: 30},
          {name: 'ECU管理', icon: 'bmu', url: '/main/bmu', size: 24},
          {name: '终端管理', icon: 'ITBox', url: '/main/tbox', size: 24},
          {name: '任务管理', icon: 'createtask', url: '/main/task', size: 24},
          {name: '实时数据', icon: 'datagram', url: '/main/datagram', size: 24},
          {name: '历史数据', icon: 'dataHistory', url: '/main/dataHistory/data', size: 24},
          {name: 'bin文件', icon: 'file', url: '/main/binFile', size: 24},
          {name: '报警管理', icon: 'alarm', url: '/main/alarm', size: 24},
          {name: '报警配置管理', icon: 'configure', url: '/main/alarmConfigure', size: 24},
          {name: '信号管理', icon: 'signal', url: '/main/signal', size: 24},
          {name: '员工管理', icon: 'user', url: '/main/user', size: 24}
        ],
        countActive: false,         // 是否渲染
        animateAlarm: 0,
        state: false,                // 展开/收缩状态
        loginInfo: {}
      };
    },
    components: {
      hyClosed
    },
    computed: {
      ...mapState([
        'sidebar_an',
        'userInfo',
        'taskModal_info'
      ]),
      classes () {
        return {
          [`${prefixCls}-zoom`]: this.sidebar_an,
          'active': this.state
        };
      },
      classStyle () {
        return {
          [`${prefixCls}-icon`]: this.sidebar_an
        };
      },
      isActive: function () {
        return this.$route.path;
      }
    },
    created () {
      this.getLoginInfo();
      if (this.userInfo.id) {
        this.getUserData();
      }
    },
    mounted () {
    },
    methods: {
      ...mapActions([
        'getUserData'
      ]),
      ...mapMutations([
        'SIDEBAR_AN',
        'LOGIN_OUT',
        'USER_ACTIVE'
      ]),
      zoom () {
        let aa = document.getElementById('bigMenu');
        if (aa) {
          aa.style.backgroundColor = null;
          console.log(aa.style.backgroundColor);
        }
        let state = !this.sidebar_an;
        this.SIDEBAR_AN({state: state});
      },
      // 鼠标移入
      mouseover () {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        this.state = true;
      },
      // 鼠标移出
      mouseout () {
        timer = setTimeout(() => {
          this.state = false;
        }, 500);
      },
      async getLoginInfo () {
        let result = await getUserInfo();
        this.loginInfo = result.data;
        this.navList = result.data.menuList;
      },
      // 退出登录
      async loginOut () {
        try {
          let result = await loginOut();
          this.LOGIN_OUT();
          this.$message({
            message: result.data,
            type: 'success'
          });
          this.$router.push('/login');
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      },
      changeUrl (tag) {
        if (this.$route.path.indexOf('user') === -1) this.USER_ACTIVE('first');
        let taskModal = JSON.parse(sessionStorage.getItem('taskModal'));
        if (taskModal && this.$route.path !== '/main/ware/toRefresh') {
          this.$message({
            message: '请点击右上角收起按钮',
            type: 'warning'
          });
        }
        return tag;
      },
      rePass () {
        this.$router.push({path: '/main/rePassword', query: {id: this.userInfo.id}});
      }
    },
    watch: {
      countAlarm: {
        immediate: true,
        handler (val) {
          if (this.countActive) {
            this.animateAlarm = val;
            return;
          }
        }
      }
    }
  };
</script>
