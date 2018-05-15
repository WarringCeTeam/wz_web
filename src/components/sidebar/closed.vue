/**
 * 描述：关闭
 */
<style lang="scss" scoped>
    .hy-closed {
        position: relative;
        width: 56px;
        height: 68px;
        background: url(../../images/shouqi02.png) no-repeat center center;
        &.is-active {
            .menu-icon {
                width: 36px;
                float: left;
                background: transparent;
                &:after {
                    transform: translateY(0) rotate(45deg);
                }
                &:before {
                    transform: translateY(0) rotate(-45deg);
                }
            }
        }
    }
    .border_right{
      /*border-right:1px solid #f1f1f1;*/
      height: 100%;
      margin-right: -6px
    }
</style>
<template>
  <div>
   <!-- <div :class="classes" v-if="!sidebar_an">
        <div class="menu-icon"></div>
        <div class="border_right"></div>
    </div>-->
    <div v-if="sidebar_an">
      <img :src="'/static/images/logo02.png'" alt="touxiang" height="40"/>
    </div>
  </div>
</template>
<script>
    import { mapState } from 'vuex';
    const prefixCls = 'hy-closed';

    export default {
        name: 'hyClosed',
        computed: {
            ...mapState([
                'sidebar_an'
            ]),
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        'is-active': !this.sidebar_an
                    }
                ];
            }
        }
    };
</script>
