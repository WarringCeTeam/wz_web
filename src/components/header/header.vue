/**
* 描述：头部
*/
<style lang="scss" scoped>
  @import 'src/styles/vars';
  @import 'src/styles/mixins';


  .mg-t42{
    margin-top: 42px;
  }

  .mg-le20{
    margin-left: 20px;
  }

  .hy-header {
    position: fixed;
    top: 0;
    right: 0;
    @include wh(100%, 60px);
    line-height: 60px;
    background: #fff;
    padding-left: 0px;
    box-shadow:0px 2px 10px -2px $border_color;
    border-bottom:1px solid $border_color;
    user-select: none;
    z-index: 998;
    span.hy-header-title {
      display: inline-block;
      padding-left: 90px;
      font-size: 20px;
      color: #666;
    }
    .hy-header-admin {
      float: right;
      li {
        float: left;
        position: relative;
        a {
          position: relative;
          line-height: 1;
          color: #000;
          font-weight: 400;
          span.hy-header-tips {
            background-color: #FA7252;
            border-radius: 10px;
            color: #000;
            display: inline-block;
            font-size: 12px;
            height: 14px;
            line-height: 14px;
            padding: 0 6px;
            text-align: center;
            white-space: nowrap;
          }
        }
        &.hy-header-warn {
          margin-right: 10px;
          &:after {
            content: '';
            display: block;
            @include wh(1px, 40%);
            background: #DEE1E4;
            position: absolute;
            right: -11px;
            top: 50%;
            z-index: 11;
            transform: translateY(-50%);
          }
          .wobble_icon {
            display: inline-block;
            transform-origin: top center;
            transform: translateZ(0);
          }
          &:hover .wobble_icon{
            animation-name: wobble;
            animation-duration: 1s;
            animation-timing-function: ease-in-out;
            animation-iteration-count: 1;
          }
        }
        &.hy-header-dropMenu {
          padding-left: 11px;
          padding-right: 15px;
          .hy-header-drop {
            position: absolute;
            left: 65px;
            top: 40px;
            width: 100% - 50;
            line-height: 1.5;
            padding: 10px 0;
            text-align: center;
            border: 1px solid #F5F5F5;
            border-top: 1px solid transparent;
            border-right: 1px solid transparent;
            background: #FFF;
          }
          p {
            padding: 5px 0;
            a:hover {
              color: #62B0E4;
            }
          }
          .hy-header-caret {
            margin-left: 4px;
            display: inline-block;
            color: #fff;
            transition: transform 0.5s;
          }
          &:before {
            content: '';
            @include wh(1px, 100%);
            position: absolute;
            top: 0;
            left: 0px;
            z-index: 10;
            background: transparent;
            transition: background 0.5s;
          }
          &.active {
            .hy-header-caret {
              transform: rotate(0.5turn);
            }
          }
          &.active:before {
            /*background: #CC0066;*/
          }
        }
      }
    }
  }
  .login-out{
    font-size: 14px;
    margin-left: 5px;
    color: #f6f2f3 !important;
    cursor: pointer
  }
  // 动画
  .drop-enter-active,
  .drop-leave-active {
    transition: all 0.5s ease-in-out;
  }
  .drop-enter, .drop-leave-to {
    opacity: 0;
    transform: translate3d(0, -40px, 0);
  }
  // 动画
  .slide-top-enter-active,
  .slide-top-leave-active {
    transition: all 0.5s;
  }
  .slide-top-enter, .slide-top-leave-to {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  @keyframes wobble {
    16.65% {
      transform: skew(0deg) scale(1, 1);
    }
    16.65% {
      transform: skew(-10deg) scale(1.1, 1.1);
    }
    33.3% {
      transform: skew(10deg) scale(1.1, 1.1);
    }
    49.95% {
      transform: skew(-6deg) scale(1.1, 1.1);
    }
    66.6% {
      transform: skew(4deg) scale(1.1, 1.1);
    }
    83.25% {
      transform: skew(-2deg) scale(1.1, 1.1);
    }
    100% {
      transform: skew(0) scale(1, 1);
    }
  }
</style>
<template>
  <div class="hy-header">
    <transition name="drop">
          <span v-if="sidebar_an" class="hy-header-title">
              ECU远程监控系统
          </span>
    </transition>
 <!--   <ul class="hy-header-admin">
      <li class="hy-header-dropMenu" :class="classes">
        <img :src="'/static/images/touxiang02.png'" style="margin-right: 10px;" alt="touxiang" height="40"/>
        <a href="javascript:void(0);" @mouseover="mouseover()" @mouseout="mouseout()">
          <span class="cl-fff">Hi， {{userInfo.name}}</span>
          &lt;!&ndash;<i class="el-icon-caret-bottom hy-header-caret" :class="classes"></i>&ndash;&gt;
        </a>
       &lt;!&ndash; <transition name="slide-top">
          <div class="hy-header-drop" v-if="state" @mouseover="mouseover()" @mouseout="mouseout()">
            <p>
              <a href="javascript: void(0);">账户信息</a>
            </p>
            <p>
              <a href="javascript: void(0);" @click="rePass">密码修改</a>
            </p>
          </div>
        </transition>&ndash;&gt;
        <span style="margin-left: 5px;color: #E0E0E0">|</span>
        <a class="login-out" @click="loginOut()"><img src="../../images/eqit.png" width="24" height="18"></a>
      </li>
    </ul>-->
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import { loginOut } from '@/service/login/loginService';
  let timer = null;

  export default {
    data () {
      return {
        countActive: false,         // 是否渲染
        animateAlarm: 0,
        state: false                // 展开/收缩状态
      };
    },
    created () {
      if (!this.userInfo.id) {
        this.getUserData();
      }
    },
    computed: {
      ...mapState([
        'sidebar_an',
        'userInfo'
      ]),
      classes () {
        return {
          'active': this.state
        };
      }
    },
    methods: {
      ...mapActions([
        'getUserData'
      ]),
      ...mapMutations([
        'LOGIN_OUT'
      ]),
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
      rePass () {
        this.$router.push({path: '/main/rePassword', query: {id: this.userInfo.id}});
      }
    },
    mounted () {
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
