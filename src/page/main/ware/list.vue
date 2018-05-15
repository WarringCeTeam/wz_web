/**
* 描述：软件管理
*/
<style lang="scss" scoped>
  .el-input__inner{
    border-radius: 30px;
  }
  .modal{
    background: rgba(0, 0, 0, 0.8);
    z-index:2010;
    .modal_kuang{
      margin:10% auto;
      width:400px;
      .title{
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height:60px;
      }
      .main .font{
        font-size: 12px;
        font-style: normal;
        line-height:20px;
        color: #f1f1f1;
        i{
          font-style: normal;
          font-size:16px;
          color: #4f80e1;
          padding:0 6px;
        }
      }

    }
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
</style>
<template>
    <div class="content">
      <div class="content-title">
        软件管理
      </div>
      <div class="hy-search-bar">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-select v-model="searchData.type" clearable class="cicle" placeholder="类型">
              <el-option label="BMU" :value="1"></el-option>
              <el-option label="HVM" :value="2"></el-option>
              <el-option label="CMU" :value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
              <el-input v-model.trim="searchData.softwareNo" class="hy-search-input" placeholder="软件号"></el-input>
          </el-col>
          <el-col :span="4">
          <el-select v-model="searchData.projectId"  clearable placeholder="项目"  class="cicle">
            <el-option :label="item.projectName" :value="item.id" :key="item.id" v-for="item in projectLists"></el-option>
          </el-select>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" class="hy-search-button" icon="search" @click="search">搜索</el-button>
          </el-col>
          <el-col :span="8">
            <el-button :plain="true" type="info" @click="refreshes()" class="l_action_btn">
              <hy-handler type="flashlight2" placement="top" tips="执行刷新" bgColor="rgb(131, 159, 165)" size="10" color="#FFF" hover="#5faee3" style="margin-top:1px;"></hy-handler>
            </el-button>
            <el-button :plain="true" type="info" @click="add(-1)" class="l_action_btn">
              <hy-handler type="add" placement="top" tips="新增" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3"></hy-handler>
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-content">
        <el-table
          :data="list"
          v-loading="loading"
          :element-loading-text="loadingText"
          style="width: 100%"
          :fit="true"
          class="text-center">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            label="软件名称"
            show-overflow-tooltip
            align="center">
            <template scope="scope">
              <a class="tz" @click="detail(scope.row.id)">{{scope.row.name}}</a>
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            show-overflow-tooltip
            align="center">
            <template scope="scope">{{scope.row.type | wareType}}</template>
          </el-table-column>
          <el-table-column
            label="是否激活"
            show-overflow-tooltip
            align="center">
            <template scope="scope">
              <!--<el-tooltip :content="scope.row.status | statusType2" placement="top">-->
              <el-switch
                :width="50"
                v-model="scope.row.status"
                on-text="是"
                :on-value="1"
                active-color="#13ce66"
                off-text="否"
                :off-value="0"
                inactive-color="#ff4949"
                @change="confirmStateM(scope.row.id)">
              </el-switch>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="softwareNo"
            label="软件号"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="project.projectName"
            label="项目"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="softwareCompatibleHardwareNo"
            label="软件兼容硬件号"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="softwareCompatibleProjectNo"
            label="软件兼容项目号"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="文件大小"
            show-overflow-tooltip
            align="center">
            <template scope="scope">{{(scope.row.size / 1024).toFixed(2)}}kb</template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="updateUser"
            label="最后操作人"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="最后操作时间"
            show-overflow-tooltip
            align="center">
            <template scope="scope">{{scope.row.updateTime | formatTime}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template scope="scope">
              <hy-handler type="upload" placement="top" tips="下载" bgColor="rgb(131, 159, 165)" size="14" color="#FFF" hover="#5faee3" @click="getTBoxList(scope.row, 0)"></hy-handler>
              <!--<hy-handler type="flashlight" placement="top" tips="刷新" bgColor="#a1d8ee" size="10" style="margin-left:2px;" color="#FFF" hover="#70c5e6" @click="getTBoxList(scope.row, 1)"></hy-handler>-->
              <hy-handler type="activity" placement="top" tips="下载记录" bgColor="#ddb7b7" size="14" color="#FFF" hover="#dda0a0" @click="taskDetail(scope.row.softwareNo, scope.row.type, 0)"></hy-handler>
              <hy-handler type="renwu2" placement="top" tips="刷新记录" bgColor="#f8830b" size="10" color="#FFF" hover="#fa9261" @click="taskDetail(scope.row.softwareNo, scope.row.type, 1)"></hy-handler>
              <hy-handler type="other" placement="top" tips="详情" bgColor="#f4ea2a" size="14" color="#FFF" hover="#f8c60f" @click="detail(scope.row.id)"></hy-handler>
              <hy-handler v-if="scope.row.status == 0" type="empty" placement="top" tips="删除" bgColor="#69d610" size="14" color="#FFF" hover="rgb(83, 168, 14)" @click="confirmDel(scope.row.id)"></hy-handler>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <hy-page v-show="pageShow"
                 :current-page="searchData.pageNum"
                 :page-size="searchData.pageSize"
                 :total-element="totalElement"
                 @current-change="currentChange"
                 @page-sizes="changeSize"></hy-page>
      </div>
      <!-- 弹出层-- 下载记录 -->
      <hy-modal :title="`下载记录`" :styles="{width: '666px'}" :transition="this.$store.state.modalTransition" v-model="downloadModal">
        <el-table :data="seeTaskLists" style="padding-left:6px;">
          <el-table-column prop="totalNumber" label="总数" align="center"></el-table-column>
          <el-table-column  prop="successNumber" label="成功数" align="center"></el-table-column>
          <el-table-column prop="failNumber" label="失败数" align="center"></el-table-column>
          <el-table-column label="下载时间" align="center"><template scope="scope">{{scope.row.updateTime | formatTime}}</template></el-table-column>
        </el-table>
      </hy-modal>
      <!-- 弹出层-- 刷新记录 -->
      <hy-modal :title="`刷新记录`" :styles="{width: '666px'}" :transition="this.$store.state.modalTransition" v-model="refreshModal">
        <el-table
          :data="seeTaskLists" style="width: 100%" class="text-center">
          <el-table-column label="总数" prop="totalNumber" align="center"></el-table-column>
          <el-table-column prop="successNumber" label="成功数" align="center"></el-table-column>
          <el-table-column prop="failNumber" label="失败数" align="center"></el-table-column>
          <el-table-column label="刷新时间" align="center"><template scope="scope">{{scope.row.updateTime | formatTime}}</template></el-table-column>
        </el-table>
      </hy-modal>
      <!-- 弹出层--选择tbox -->
      <hy-modal :title="`选择终端`" :styles="{width: '888px'}" :transition="this.$store.state.modalTransition" v-model="tboxModal">
        <div class="hy-search-bar">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input v-model="searchTbox.tboxSn" class="hy-search-input" placeholder="终端编号"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="searchTbox.modelNo" class="hy-search-input" placeholder="型号"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="searchTbox.vin" class="hy-search-input" placeholder="VIN码"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" class="hy-search-button" icon="search" @click="searchList()">搜索</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table-content" style="height:300px;overflow-y:scroll;">
          <el-table
            :data="tboxList"
            style="width: 100%"
            class="text-center"
            @selection-change="tboxChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tboxSn"
              label="终端编号"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="modelNo"
              label="型号"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="vin"
              label="VIN码"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              label="ECU编号"
              show-overflow-tooltip
              align="center">
              <template scope="scope">
                <span v-for="bmu in scope.row.bmuModels">{{bmu.serialNo}}&emsp;</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              show-overflow-tooltip
              align="center">
              <template scope="scope">{{scope.row.status | tboxStatus}}</template>
            </el-table-column>
          </el-table>
        </div>
        <div style="text-align: right;margin-right:20px;">
          <el-button @click="cancelTboxModal()">取消</el-button>
          <el-button type="primary" @click="TboxSelection()">确定</el-button>
        </div>
      </hy-modal>
    </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import hyHandler from '@/components/handler/handler';
  import { wareList, wareDel, stateModify, wareTaskListHistory } from '@/service/ware/wareService';
  import { projectList } from '@/service/project/projectService';
  import { tBoxList } from '@/service/tbox/tboxService';
  import { mapMutations, mapState } from 'vuex';

  export default {
    mixins: [list],
    data () {
      return {
        projectLists: [],
        searchData: {
          type: '',
          softwareNo: '',
          projectId: ''
        },
        fullScreenLoading: false,
        tboxModal: false,
        refreshModal: false,
        downloadModal: false,
        searchTbox: {
          tboxSn: '',
          modelNo: '',
          vin: ''
        },
        tboxList: [],
        dataList: [],
        chooseIds: [], // 选中的数组
        multipleSelection: [], // 选中的数据
        wareId: '',
        searchTask: {},
        taskModal: false, // 弹出框
        taskData: {},
        ok: false, // 是否成功
        seeTaskLists: [],
        boxTitle: '', // 0下载 1刷新
        wType: 0, // 操作类型 0下载 1刷新
        reType: 0, // 刷软类型 1cmu 2bmu 3hvm
        reNo: '', // 刷软号
        taskInterval: '' // 成功

      };
    },
    computed: {
      ...mapState([
        'taskModal_info'
      ])
    },
    components: {
      hyHandler
    },
    created () {
      this.searchPList();
    },
    methods: {
      ...mapMutations([
        'TASKMODAL_INFO'
      ]),
      currentChange (val) {
        if (val === 1) val = undefined;
        if (val && val !== 1) this.backData = true;
        this.loading = true;
        this.searchData.pageNum = val;
        // 获取列表
        this._getList();
      },
      search () {
        this.backData = true;
        this.currentChange();
      },
      async _getList () {
        if (sessionStorage) {
          let back = JSON.parse(sessionStorage.getItem('back'));
          if (back) {
            this.searchData = {
              ...back
          };
            sessionStorage.removeItem('back');
          }
        }
        if (this.searchData.pageNum === undefined) this.searchData.pageNum = 1;
        let result = await wareList(this.searchData);
        this.loading = false;
        this.list = result.data && result.data.content || [];
        this.totalElement = result.data.total;
      },
      // add
      add (id) {
          // 根据情况 存储查询条件和分页
          if (this.backData) sessionStorage.setItem('back', JSON.stringify(this.searchData));
          if (id < 0) this.$router.push({path: '/main/ware/add'});
      },
      // detail
      detail (id) {
        // 根据情况 存储查询条件和分页
        if (this.backData) sessionStorage.setItem('back', JSON.stringify(this.searchData));
        this.$router.push({path: '/main/ware/detail/', query: {id: id, pageNum: this.searchData.pageNum, pageSize: this.searchData.pageSize}});
      },
      // delete
      confirmDel (id) {
        this.$confirm('此操作不可恢复，是否删除此软件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(this.del.bind(this, id)).catch(() => {});
      },
      refreshes () {
        // 根据情况 存储查询条件和分页
        if (this.backData) sessionStorage.setItem('back', JSON.stringify(this.searchData));
        this.$router.push({path: '/main/ware/toRefresh'});
      },
      async del (id) {
        try {
          let result = await wareDel({id: id});
          this.$message({
            message: result.message,
            type: 'success'
          });
          this._getList();
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      },
      // 激活
      confirmStateM (id) {
        this.stateM(id);
        // this._getList();
      },
      async stateM (id) {
        try {
          let result = await stateModify({id: id});
          this.$message({
            message: result.message,
            type: 'success'
          });
          this._getList();
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      },
      task () {
        // 根据情况 存储查询条件和分页
        if (this.backData) sessionStorage.setItem('back', JSON.stringify(this.searchData));
        this.$router.push({path: '/main/ware/refreshList'});
      },
      // --------------------- 查项目 ---------------------------
      async searchPList () {
        let result = await projectList({pageNum: 1, pageSize: 50});
        this.projectLists = result.data && result.data.content || [];
      },

      // --------------------- 选择tbox -----------------
      getTBoxList (data, type) {
        if (data.status === 0) {
          this.$message({
            message: '该软件未激活，请先激活再使用。',
            type: 'error'
          });
          return;
        }
        this.wareId = data.id; // 软件id
        this.tboxModal = true;
        this.chooseIds = [];
        delete this.searchTbox.tboxSn;
        delete this.searchTbox.modelNo;
        delete this.searchTbox.vin;
        this.wType = type; // 0下载1刷新
        if (type === 0) this.boxTitle = '下载';
        if (type === 1) this.boxTitle = '刷新';
        this.searchList();
        this.reType = data.type; // 刷软类型
        this.reNo = data.softwareNo;
      },
      async searchList () {
        this.searchTbox.pageNum = 1;
        this.searchTbox.pageSize = 100;
        let result = await tBoxList(this.searchTbox);
        this.loading = false;
        this.tboxList = result.data && result.data.content || [];
        this.totalElement = result.data.total;
      },
      cancelTboxModal () {
        this.tboxModal = false;
      },
      // 判断能否选择
      ableSelect (row, index) {
          if (row.status < 1) {
            return false;
          }
          return true;
      },
      TboxSelection () {
        if (this.multipleSelection) {
          this.multipleSelection.forEach(row => {
              this.chooseIds.push(row.id);
          });
          this.chooseIds = this.qc(this.chooseIds);
        }
        if (this.chooseIds && this.chooseIds.length < 1) {
          this.$message({
            message: '请先选择终端。',
            type: 'error'
          });
          return;
        }
        console.log(this.taskModal_info);
        // 給父組件傳值
        this.tboxModal = false;
        this.TASKMODAL_INFO({show: true, type: 0, status: 1, ids: this.chooseIds, ware: this.wareId, taskId: 0}); // status 1开始 2进行 3结束
      },
      // 去重
      qc (array) {
        let temp = [];
        for (let i = 0; i < array.length; i++) {
          if (array.indexOf(array[i]) === i) {
            temp.push(array[i]);
          }
        }
        return temp;
      },
      tboxChange (val) {
        this.multipleSelection = val;
      },
      // 下载记录 0下载 1刷新
      async taskDetail (no, wareType, type) {
        try {
          if (type > 0) {
            this.refreshModal = true;
          } else {
            this.downloadModal = true;
          }
          let result;
          result = await wareTaskListHistory({taskType: type, softwareType: wareType, softwareNo: no});
          this.seeTaskLists = result.data;
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      },
      // 跳转下载刷新
      tzDownloadOrRe (id, type) {
        this.$router.push({path: '/main/ware/refreshList', query: {id: id, type: type}});
      }
    },
    filters: {
      tboxStatus (value) {
        switch (value) {
          case 0:
            return '离线';
          case 1:
            return '在线';
        }
      }
    }
  };
</script>
