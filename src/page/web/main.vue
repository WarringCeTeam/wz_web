<style lang="scss" scoped>
  @import 'src/styles/vars';
  @import 'src/styles/mixins';
  .hy-main-box {
    @include wh(100%, 100%);
    position: relative;
    overflow: hidden;
    .hy-content-left {
      @include wh(auto, 100%);
      position: relative;
      transition: all 0.5s;
      margin: 0 0 0 200px;
      /*padding-top: 60px;*/
      .hy-main {
        @include wh(100%, 100%);
        overflow: auto;
        background: $body-bg;
      }
      &.hy-content-an {
        margin:0 0 0 70px;
      }
    }
  }
  // 动画
  .slide-both-enter-active,
  .slide-both-leave-active {
    transition: all 0.3s;
  }
  .slide-both-enter {
    opacity: 0;
    transform: scale3d(0.95, 0.95, 0.95);
  }
  .slide-both-leave-to {
    opacity: 0;
    transform: scale3d(0.95, 0.95, 0.95);
  }
  .l-sidebar_btn{
    position: fixed;
    display: block;
    z-index:1000;
    top:100px;
    right:0;
    background: #edf2f5;
    width:76px;
    height:38px;
    border-top-left-radius:20px;
    border-bottom-left-radius:20px;
    border:3px #f8f9fb solid;
    cursor:pointer;
    i{
      float: left;
      margin-top:11px;
      margin-left:6px;
      margin-right:4px;
    }
    span{
      float: left;
      font-size:12px;
      line-height: 32px;
      color:#626b74;
    }
  }
</style>
<template>
  <div class="hy-main-box">
    <!--导航-->
    <hy-sidebar></hy-sidebar>
    <div class="hy-content-left" :class="classes">
      <!--头部-->
      <!--<hy-header></hy-header>-->
      <!--内容部分-->
      <div class="hy-main">
        <div>web页面</div>
        <transition name="slide-both" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>

</template>
<script>
  import { mapMutations, mapState } from 'vuex';
  import hyHeader from '@/components/header/header';
  import hySidebar from '@/components/sidebar/sidebar';
  const prefixCls = 'hy-content';
  import hyUpload from '@/components/upload/upload';

  export default {
    name: 'main',
    computed: {
      ...mapState([
        'sidebar_an',
        'taskModal_info'
      ]),
      classes () {
        return {
          [`${prefixCls}-an`]: this.sidebar_an
        };
      }
    },
    components: {
      hyHeader,
      hySidebar,
      hyUpload
    },
    data () {
      return {
        instance: null,
        modalBtn: false,
        taskModal: false,
        downLoadData: {},
        taskBtn: false,
        webSocket: null,
        socketUrl: 'ws://47.97.25.159:8326/alarmWebSocket'
        // socketUrl: 'ws://127.0.0.1:8326/alarmWebSocket'
      };
    },
    created () {
      // this.websocket.onclose();
      this.taskModal = false;
      sessionStorage.removeItem('taskModal');
      if ('WebSocket' in window) {
        this.webSocket = new WebSocket(this.socketUrl);
      }
      this.webSocket.onerror = event => {
        this.onError(event);
      };
      this.webSocket.onopen = event => {
        this.onOpen(event);
      };
      this.webSocket.onmessage = event => {
        this.onMessage(event);
      };
    },
    methods: {
      ...mapMutations([
        'TASKMODAL_INFO'
      ]),
      changeClose () {
        this.taskModal = !this.taskModal;
        sessionStorage.setItem('taskModal', this.taskModal);
        if (this.taskModal) {
          console.log(this.taskModal_info);
          let taskId = this.taskModal_info.taskId;
          let type = this.taskModal_info.type;
          this.TASKMODAL_INFO({show: true, type: type, status: 2, taskId: taskId}); // status 1开始 2进行 3结束
        }
      },
      onError (event) {
//        console.log(JSON.stringify(event));
//        this.$Notice.error({
//          title: 'websocket连接失败',
//          desc: event
//        });
      },
      onOpen (event) {
//        console.log('onOpen:' + event);
//        console.log(JSON.stringify(event));
//        document.getElementById('message').innerHTML = 'Connection established';
//        this.tipsOper();
      },
      onMessage (event) {
        if (this.instance) this.instance.close();
        // console.log('onMessage:' + event.data);
        let obj = JSON.parse(event.data);
        let data = [];
        if (obj.signalName && obj.signalName !== null) {
          data = ['信号名称：' + obj.signalName, 'T-BOX编号：' + obj.tboxSn, '采集时间：' + new Date(obj.collectTime).toLocaleString(), '报警内容：' + obj.content];
        } else if (event.data.content) {
          data = ['报警类型：刷新报警', 'T-BOX编号：' + obj.tboxSn, '报警内容：' + obj.content];
        } else {
            return;
        }
        let newDatas = [];
        const h = this.$createElement;
        for (let i in data) {
          newDatas.push(h('p', null, data[i]));
        };
        this.instance = this.$notify({
          title: '报警提示',
          message: h('div', null, newDatas),
          duration: 9000,
          onClick: this.toDetail(obj.id),
          type: 'warning',
          offset: 100
        });
//        console.log(JSON.stringify(this.socketList));
      },
      toDetail (id) {
          // console.log(id);
      }
    },
    watch: {
      taskModal_info () {
           // console.log(this.taskModal_info);
        this.downLoadData = this.taskModal_info;
        setTimeout(() => {
          this.taskModal = this.taskModal_info.show;
          if (this.taskModal_info.status === 1 || this.taskModal_info.status === 2) this.taskBtn = true;
          if (this.taskModal_info.status === 3) {
            this.taskBtn = false;
          }
        }, 1000);
      }
    }
  };
</script>
