/**
* 描述：下载
*/
<style lang="scss" scoped>
  .l-modal{
    position: absolute;
    background: #fff;
    z-index:997;
    .modal_kuang{
      margin:8% auto;
      width:70%;
      min-width:600px;
      .title{
        font-size: 16px;
        color: #999;
        text-align: center;
        line-height:60px;
      }
      .l-left{
        float: left;
        width: 50%;
      }
      .l-right{
        float: right;
        margin-top:70px;
        width: 50%;
        .font{
          font-size: 14px;
          font-style: normal;
          line-height:40px;
          float: left;
          color: #666;
            i.zi{
              font-style: normal;
              font-size:16px;
              padding:0 6px;
            }
            i.fang{
              width:10px;
              height:10px;
              display: inline-block;
              border-radius:2px;
              margin-right:2px;
              margin-left:4px;
            }
            i.fang_success{
              background: #61c6be;
            }
            i.fang_total{
              background: #3489cc;
            }
            i.fang_fail{
              background: #f1522a;
            }
        }
        .fontNo{
          font-size: 18px;
          font-style: normal;
          line-height:20px;
          color: #a5a6ba;
          text-align: left;
            i{
              font-style: normal;
              font-size:18px;
              padding:0 2px;
              font-style: normal;
            }
        }
      }

    }
  }
  .l-line{
    border-bottom: #ccc 1px solid;
    width:100%;
    margin:20px 0 10px;
  }
  .main{
    width:100%;
    max-height:300px;
    overflow-y: auto;
    i{
      font-size: 12px;
      color: #999;
      padding:2px 5px;
      height:24px;
      font-style: normal;
      min-width:70px;
    }
    .wthProgress{
      width: 150px;
    }
    .con{
      width:20px !important;
      min-width:20px !important;
      margin-right:30px;
    }
  }
  .r{
    float: right
  }
  .l{
    float: left;
  }
  .close{
    color: #999;
    font-size:20px;
    font-style: normal;
    float: right;
    cursor: pointer;
  }
  .clear{
    clear: both;
    zoom:1;
  }
  .tran
  {
    transition: 2s;
  }
</style>
<template>
  <div >
    <!-- 弹出层-- 进度条 -->
    <div class="el-message-box__wrapper l-modal">
      <transition name="el-zoom-in-center">
        <div class="modal_kuang">
            <div class="l-left">
              <el-progress type="circle" :percentage="taskData.points" :stroke-width="12" :width="120" v-if="!ok"></el-progress>
              <el-progress type="circle" :percentage="100" status="success" :stroke-width="12" :width="120" v-if="ok"></el-progress>
              <div class="title">{{boxTitle}}</div>
            </div>
            <div class="l-right" v-if="taskData.totalNumber">
              <div class="fontNo">总数 <i>{{taskData.totalNumber}}</i>个</div>
              <div class="clear"></div>
              <div class="font"><i class="fang fang_total"></i>完成<i class="zi">{{taskData.successNumber * 1 + taskData.failNumber * 1}}</i>个</div>
              <div class="font"><i class="fang fang_success"></i>成功<i class="zi">{{taskData.successNumber}}</i>个</div>
              <div class="font"><i class="fang fang_fail"></i>失败<i class="zi">{{taskData.failNumber}}</i>个</div>
            </div>
            <div class="clear"></div>
          <div class="l-line"></div>
          <div class="main">
              <div class="one" v-for="detail in taskLists" :key="detail.id">
                <i class="l">Tbox</i>
                <i class="l" style="width:100px;">{{detail.tboxSn}}</i>
                <i class="l" style="width:100px;" v-if="test.type == 0">{{detail.softwareNo}}</i>
                <i class="l" style="width:100px;" v-if="test.type == 0">下载{{detail.softwareType | wareType}}</i>
                <i class="l" style="width:100px;" v-if="test.type == 1">刷新{{detail.softwareType | wareType}}</i>
                <i class="l" style="width:100px;" v-if="test.type == 2">回滚{{detail.softwareType | wareType}}</i>
                <i class="l" style="width:200px;">{{detail.lastSend | formatTime}}</i>
                <i class="r con l-icon l-icon-sad" v-if="detail.status == 0 && test.type < 2"></i><!--未下发-->
                <i class="r con l-icon l-icon-smiley" v-if="detail.status == 1 && test.type < 2"></i><!--下载中-->
                <i class="r con l-icon l-icon-happy" v-if="detail.status == 2 && test.type < 2"></i><!--下载完成-->
                <i class="r con l-icon l-icon-angry" v-if="detail.status == 3 && test.type < 2"></i><!--下载失败-->
                <i class="r con l-icon l-icon-smiley" v-if="detail.status < 8 && test.type > 1"></i><!--下载中-->
                <i class="r con l-icon l-icon-happy" v-if="detail.status == 8 && test.type > 1"></i><!--下载完成-->
                <i class="r con l-icon l-icon-angry" v-if="detail.status == 9 && test.type > 1"></i><!--下载失败-->
                <i class="r" style="width:30px !important;margin-left:10px;margin-right:10px;min-width:30px !important;">{{detail.percent}}%</i>
                <i class="wthProgress r l-progress">
                  <el-progress v-show="detail.status == 0" :show-text="false" :stroke-width="6" :percentage="detail.percent" style="color: #ccc;"></el-progress>
                  <el-progress v-show="detail.status == 1" :show-text="false" :stroke-width="6" :percentage="detail.percent" style="color: #ccc;"></el-progress>
                  <el-progress v-show="detail.status == 2" :show-text="false" :stroke-width="6" :percentage="detail.percent" style="color: #ccc;" status="success"></el-progress>
                  <el-progress v-show="detail.status == 3" :show-text="false" :stroke-width="6" :percentage="detail.percent" style="color: #ccc;" status="exception"></el-progress>
                  <el-progress v-show="detail.status == 8" :show-text="false" :stroke-width="6" :percentage="detail.percent" style="color: #ccc;" status="success"></el-progress>
                  <el-progress v-show="detail.status == 9" :show-text="false" :stroke-width="6" :percentage="detail.percent" style="color: #ccc;" status="exception"></el-progress>
                </i>
                <div class="clear"></div>
              </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import { downloadWare, refreshWare, taskList, refreshHistory, downloadHistory, rollBackWare, rollBackWareTaskList, rollBackWareSome } from '@/service/ware/wareService';
  import { downloadProjectTask, refreshProjectTask } from '@/service/project/projectService';
  import { mapState, mapMutations } from 'vuex';
  export default {
    name: 'hyUpload',
    props: [
      'test'
    ],
    computed: {
      ...mapState([
        'taskModal_info'
      ])
    },
    data () {
      return {
        intervals: [],
        taskModal: true, // 弹出框
        taskData: {
          totalNumber: 0,
          successNumber: 0,
          failNumber: 0,
          points: 0
        },
        boxTitle: '',
        ok: false,
        dStr: {}, // 下载数据对象
        rStr: {}, // 刷新数据对象
        taskLists: {}, // 任务明细
        taskInterval: '',
        detailInterval: '',
        pdOne: 0 // 判断明细是不是第一次查询
      };
    },
    created () {
    },
    methods: {
      ...mapMutations([
        'TASKMODAL_INFO'
      ]),
      // --------------------- 0下载 1刷新 ---------------------------
      async _downloadWare () {
        this.taskData = {};
        this.taskLists = {};
        this.ok = false;
        this.pdOne = 0;
        try {
          let result;
          console.log(JSON.stringify(this.test));
            // 下载
            if (this.test.type === 0) {
              this.boxTitle = '正在下载……';
              if (this.test.projectId) {
                // 基于项目
                result = await downloadProjectTask({projectId: this.test.projectId, softwareId: this.test.ware});
              } else {
                result = await downloadWare({tboxIds: this.test.ids, softwareId: this.test.ware});
              }
            }
            // 刷新
            if (this.test.type === 1) {
              this.boxTitle = '正在刷新……';
              console.log(this.test.ids);
              if (this.test.projectId && !this.test.ids) {
                // 基于项目
                result = await refreshProjectTask({projectId: this.test.projectId, cmuSoftwareNo: this.test.cmu, bmuSoftwareNo: this.test.bmu, hvmSoftwareNo: this.test.hvm});
              } else {
                  result = await refreshWare({tboxIds: this.test.ids, cmuSoftwareNo: this.test.cmu, bmuSoftwareNo: this.test.bmu, hvmSoftwareNo: this.test.hvm});
              }
            }
          // 回滚单个
          if (this.test.type === 2) {
            this.boxTitle = '正在回滚……';
            result = await rollBackWare({tboxId: this.test.ids, refreshId: this.test.refreshId});
          }
          // 回滚批量
          if (this.test.type === 3) {
            this.boxTitle = '正在批量回滚……';
            result = await rollBackWareSome({tboxSnList: this.test.ids});
          }
          this.tboxModal = false;
          this.taskData = result.data;
          this._getDetail(this.taskData.id);
          this.taskData.points = Math.round((this.taskData.successNumber + this.taskData.failNumber) / this.taskData.totalNumber * 100);
          this.taskModal = true;
          this.ok = false;
          this.TASKMODAL_INFO({show: true, type: this.test.type, status: 2, taskId: this.taskData.id}); // status 1开始 2进行 3结束
            setTimeout(() => {
               this.pdOne = 1;
              if (this.taskInterval) {
                if (this.taskInterval) clearInterval(this.taskInterval);
              }
               this.setIntervalSelect(this.taskData.id, 1);
            }, 1000);
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
          this.TASKMODAL_INFO({status: 3, show: false});
        }
      },
      // 定时器
      setIntervalSelect (id, type) {
          let setTime;
        setTime = 10000;
        if (type > 1) {
          this.pdOne = 0;
          if (this.taskInterval) clearInterval(this.taskInterval);
          this._getDetail(id);
          this.SelectResult(id);
        }
        sessionStorage.setItem('taskModal', true);
        this.taskInterval = setInterval(() => {
          let taskModal = JSON.parse(sessionStorage.getItem('taskModal'));
          if (taskModal) {
            if (this.taskData.totalNumber > 0 && this.taskData.successNumber * 1 + this.taskData.failNumber * 1 === this.taskData.totalNumber) {
              this._getDetail(id);
              sessionStorage.removeItem('taskModal');
              this.ok = true;
              this.boxTitle = '已完成！';
              this.pdOne = 0;
              clearInterval(this.taskInterval);
              setTimeout(() => {
                this.TASKMODAL_INFO({status: 3, type: this.test.type, show: false});
                this.taskData.points = 0;
              }, 3000);
            } else {
              this._getDetail(id);
              this.SelectResult(id);
            }
          }
        }, setTime);
      },
      async SelectResult (id) {
        try {
          let result;
          result = await taskList({id: id, pageNum: 1, pageSize: 6});
          this.taskData = result.data && result.data.content[0];
          this.taskData.points = Math.round((this.taskData.successNumber + this.taskData.failNumber) / this.taskData.totalNumber * 100);
          // alert(this.taskData.points);
          if (this.taskData.points >= 100) this.boxTitle = '已完成！';
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      },
      async SelectDetail (id) {
        try {
          let result;
          result = await downloadHistory({id: id, pageNum: 1, pageSize: 100});
          this.taskData = result.data && result.data.content[0];
          this.taskData.points = Math.round((this.taskData.successNumber + this.taskData.failNumber) / this.taskData.totalNumber * 100);
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      },
      async _getDetail (id) {
        let result;
        if (this.test.type === 0) result = await downloadHistory({softwareTaskId: id, pageNum: 1, pageSize: 100});
        if (this.test.type === 1) result = await refreshHistory({softwareTaskId: id, pageNum: 1, pageSize: 100});
        if (this.test.type === 2) result = await rollBackWareTaskList({softwareTaskId: id, pageNum: 1, pageSize: 100});
        if (this.test.type === 3) result = await rollBackWareTaskList({softwareTaskId: id, pageNum: 1, pageSize: 100});
        this.loading = false;
        let n = result.data && result.data.content || [];
        // 非第一次返回
        if (this.pdOne > 0 && n && n.length > 0) {
            console.log(111111);
            for (let i = 0; i < n.length; i++) {
            this.taskLists[i].lastSend = n[i].lastSend;
            this.taskLists[i].status = n[i].status;
            this.taskLists[i].percent = n[i].percent;
            }
        } else {
          this.taskLists = n;
        }
      },
      action () {
        if (this.test) {
          if (this.test.status === 1) {
            // 第一次创建
            this._downloadWare();
          }
          if (this.test.status === 2) {
            if (this.taskInterval) {
              if (this.taskInterval) clearInterval(this.taskInterval);
            }
            if (this.test.taskId) {
              this.setIntervalSelect(this.test.taskId, 2);
            } else {
              this.setIntervalSelect(this.taskData.id, 1);
            }
          }
        }
      }
    },
    watch: {
      taskModal_info () {
          this.action();
      }
    },
    destroyed () {
      if (this.taskInterval) {
        if (this.taskInterval) clearInterval(this.taskInterval);
      }
    }
  };
</script>
