/**
 * 描述：登录页面
 */
<style lang="scss" scoped>
    @import 'src/styles/mixins';
    .main-login {
        @include wh(100%, 100%);
        position: fixed;
        background: url('/static/images/bg.png') repeat repeat #fff center;
        background-size: cover;
        canvas{
            display: block;
            width: 100%;
            height: 100%;
        }
        .login {
            .logo {
                text-align: center;
                margin-bottom: 25px;
            }
            .login_content {
              width:100%;
                .input_item {
                    width: auto;
                    margin: 0 0 20px 30px;
                }
            }
          .login_bg{

            background: #fff;
            opacity: 0.3;
            width:400px;
            height:330px;
          }
        }
    }
    .inner_kuang{
      width: 100%;
      height:400px;
      transform: translate3d(0, -50%, 0);
      position: absolute;
      top: 50%;
      background-size: cover;
      /*background: -webkit-linear-gradient(to left, transparent, #4fa2db, transparent);*/
    }
    .form-control {
        display: block;
        width: 100%;
        height: 42px;
        padding: 10px 10px 10px 50px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #666;
        background-color: #f3f8fc;
        background-image: none;
        border: 1px solid #FFF;
        outline: none;
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        &:focus {
            border-color: #367bc8;
            outline: 0;
           -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
           -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
           transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        }
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #ddd; opacity:1;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #ddd;opacity:1;
    }

    input:-ms-input-placeholder{
      color: #ddd;opacity:1;
    }

    input::-webkit-input-placeholder{
      color: #ddd;opacity:1;
    }
    .btn {
        color: #FFFFFF;
        border-color: #EEE;
        font-weight: 500;
        font-size: 16px;
        font-family: "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        text-decoration: none;
        text-align: center;
        line-height: 40px;
        outline: none;
        height: 40px;
        padding: 0 40px;
        margin: 0;
        display: block;
        width: 100%;
        background: #6c6f6d;
        appearance: none;
        cursor: pointer;
        border: none;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: .3s;
        transition-duration: .3s;
        &:hover {
           text-decoration: none;
           border-color: #42d9c9;
           -webkit-transition-duration: 0s;
           transition-duration: 0s;
          opacity: 0.8;
         }
    }
    i.ic{
      position: absolute;
      padding: 10px;
      background: #e8f0f3;
      margin-left:1px;
      margin-top:1px;
    }
    .min_logo{
      text-align: center;
      display: block;
    }
    @media screen and (min-width:1601px){
      .login {
        float: right;
        padding:90px 20px;
        margin-left:4%;
        width: 30%;
        max-width:500px;
      }
      .inner{
        width:60%;
        max-width:1800px;
        min-width:1300px;
        margin:0 auto;
        height: 100%;
        clear:both;
      }
      .left_icon{margin-top: 70px;max-width:800px;float: left}
      .login_content {
        width:100%;
        height:100%;
      }
      .min_logo{
        display: none;
      }
      .main-login .login .login_content .input_item{padding-left:4%;}
    }
    @media screen and (min-width: 1010px) and (max-width: 1600px) {
      .login {
        margin:0 auto;
        width:500px;
      }
      .inner{
        width:80%;
        max-width:1300px;
        min-width: 800px;
        margin:0 auto;
        height: 100%;
        clear:both;
      }
      .left_icon{margin-top:80px;max-width:700px;float: left;width:60%;}
      .login_content {
        width:100%;
        height:100%;
      }
      .min_logo{

      }
    }
    @media screen and (max-width:1009px){
      .login {
        margin:0 auto;
        width:400px;
        padding:50px 20px;
      }
      .inner{
        width:400px;
        margin:0 auto;
        height: 100%;
        clear:both;
      }
      .left_icon{display: none;}
      .content{
        width:100%;
        height:100%;
      }
      .login_content {
      }

      @media screen and (max-width:400px){
        .login {
          margin:0 auto;
          width:80%;
        }
        .inner{
          width:100%;
          margin:0 auto;
          height: 100%;
          clear:both;
        }
      }
    }
</style>
<template>
    <div class="main-login">
        <canvas ref="canvas" style="position: fixed;"></canvas>
        <transition :name="transition">
          <div class="inner_kuang">
            <div class="inner">
              <!--<div class="left_icon" style="">微职网站登录</div>-->
              <div class="login" v-show="showLogin" @keydown.enter="login()">
               <!--<div class="logo">-->
                    <!--<img src="../../../images/c.png" alt="logo" width="280" height="34"/>-->
                <!--</div>-->
                <!--<div class="login_bg">-->

                  <!--<img src="../../../images/k.png" alt="logo"/>-->
                  <!--<img src="../../../images/k.png" alt="logo" style="transform:rotate(90deg);position: absolute;margin-left:320px;"/>-->
                  <!--<div class="clear"></div>-->
                  <!--<img src="../../../images/k.png" alt="logo" style="transform:rotate(270deg);position: absolute;margin-top:250px;"/>-->
                  <!--<div class="clear"></div>-->
                  <!--<img src="../../../images/k.png" alt="logo" style="transform:rotate(180deg);position: absolute;margin-left:360px;margin-top:250px;"/>-->
                  <!--<div class="clear"></div>-->
                <!--</div>-->
                <div class="login_content clearfix">
                    <div class="input_item min_logo" style="font-size: 29px;color: #fff;">微职网站登录</div>
                    <div class="input_item clearfix">
                      <i class="ic"><img src="../../../images/user2.png" width="20" height="20" /></i>
                      <input type="text" autocomplete="off" class="form-control" v-bubble="{duration: 3000, end: 100, color: '#0c9577'}" v-model="loginInfo.username" placeholder="用户名" />
                    </div>
                    <div class="input_item clearfix">
                      <i class="ic"><img src="../../../images/m2.png" width="20" height="20" /></i>
                      <input type="password" autocomplete="new-password" v-bubble="{duration: 1000, end: 50}" class="form-control" v-model="loginInfo.password" placeholder="密码" />
                    </div>
                    <div class="input_item">
                      <hy-switch v-model="isRemember" name="check" style="color:#fff">记住密码</hy-switch>
                    </div>
                    <div class="input_item" style="position: relative;margin-bottom: 0;">
                      <button class="btn" @click="login()">登 录</button>
                    </div>
                </div>
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
          </div>
        </transition>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import md5 from 'js-md5';
    import { login } from '@/service/login/loginService';
    import hySwitch from '@/components/common/switch/switch';
    import canvas from './canvas.js';
    import { userList } from '@/service/user/userService';

    export default {
        mixins: [canvas],
        data () {
            return {
                isRemember: false,
                showLogin: false,
                loginInfo: {}
            };
        },
        computed: {
            transition () {
                let transitions = ['slideDown', 'zoomDown', 'bounceDown'];
                let index = this.getRandom(0, transitions.length - 1);
                return transitions[index];
            }
        },
        components: {
            hySwitch
        },
        mounted () {
            this.showLogin = true;
            this.getRemember();
            // canvas 动画
          try {
            this.init();
          } catch (e) {
          }
        },
        methods: {
            ...mapMutations([
                'LOGIN_IN',
                'USER_INFO'
            ]),
            getRandom (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            // 获取密码
            getRemember () {
                let info = this._hyTool.getCookie('remember');
                if (info) {
                    this.loginInfo = JSON.parse(info);
                    this.isRemember = true;
                }
            },
            // 登录
            async login () {
                try {
                    if (!this.loginInfo.username) {
                        this.$message({
                            message: '请输入用户名',
                            type: 'warning'
                        });
                        return;
                    }
                    if (!this.loginInfo.password) {
                        this.$message({
                            message: '请输入密码',
                            type: 'warning'
                        });
                        return;
                    }
                    let loginInfo = this._hyTool.deepCopy(this.loginInfo);
                    loginInfo.password = md5(loginInfo.password);
                    let result = await login(loginInfo);
                    let res = await userList({'username': this.loginInfo.username, 'pageNum': 1, 'pageSize': 50});
                    this.info = res.data.content[0];
                    this.USER_INFO(this.info);
                    this.LOGIN_IN();
                    // 保存密码
                    if (this.isRemember) {
                        this._hyTool.setCookie('remember', JSON.stringify(this.loginInfo));
                    } else {
                        this._hyTool.setCookie('remember', 1, -1);
                    }
                    this.$message({
                        message: result.data,
                        type: 'success'
                    });
                    let redirect = this.$route.query.redirect || '/main/home';
                    this.$router.push(redirect);
                } catch (e) {
                    this.$message({
                        message: e,
                        type: 'error'
                    });
                }
            }
        }
        // watch: {
        //     userInfo: {
        //         deep: true,
        //         handler: function (val) {
        //             if (val.id) {
        //                 this.$message({
        //                     type: 'success',
        //                     message: '检测到您之前登录过，将自动登录'
        //                 });
        //                 this.$router.push('/main/home');
        //             }
        //         }
        //     }
        // }
    };
</script>
