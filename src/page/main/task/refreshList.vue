/**
* 描述：软件任务纪录列表
*/
<style lang="scss" scoped>
.clear{
  clear: both;
  zoom:1;
}
</style>
<template>
    <div class="content">
      <div class="content-title">
        {{titName}}任务纪录
        <span v-if="tzTitle" style="color: #4f80e1;font-size:14px;padding-left:10px;">- {{tzTitle}} 查询结果</span>
        <div class="content-btn">
          <el-button class="hy-default-btn" v-go-back>返回</el-button>
        </div>
      </div>
      <div class="hy-search-bar">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-select v-model="searchData.status" clearable class="cicle" placeholder="状态" v-if="routeQuery.type < 2">
              <el-option label="未下发" :value="0"></el-option>
              <el-option label="进行中" :value="1"></el-option>
              <el-option label="完成" :value="2"></el-option>
              <el-option label="失败" :value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="searchData.status" clearable class="cicle" placeholder="状态" v-if="routeQuery.type == 2">
              <el-option label="回滚刷新成功" :value="8"></el-option>
              <el-option label="回滚刷新失败" :value="9"></el-option>
            </el-select>
          </el-col>
          <el-col :span="16">
            <el-button type="primary" class="hy-search-button" icon="search" @click="search">搜索</el-button>
          </el-col>
          <!--<el-col :span="4" v-if="this.routeQuery.type == 1">-->
            <!--<el-button :plain="true" type="info" @click="rollBack()" class="l_action_btn" :disabled="!btn01">-->
              <!--<hy-handler type="huigun" placement="top" tips="批量回滚" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3"></hy-handler>-->
            <!--</el-button>-->
          <!--</el-col>-->
        </el-row>
      </div>
      <div class="table-content">
        <el-table
          :data="list"
          v-loading="loading"
          :element-loading-text="loadingText"
          style="width: 100%"
          @selection-change="tboxChange"
          class="text-center">
          <el-table-column v-if="this.routeQuery.type == 1"
                           :selectable="isSel"
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
            label="终端设备号"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="软件类型"
            show-overflow-tooltip
            align="center" v-if="routeQuery.type == 0">
            <template scope="scope">{{scope.row.softwareType | wareType}}</template>
          </el-table-column>
          <el-table-column
            prop="softwareNo"
            label="软件号"
            show-overflow-tooltip
            align="center" v-if="routeQuery.type  == 0">
          </el-table-column>
          <!--刷新-->
          <!-- <el-table-column
             label="BMU硬件号"
             show-overflow-tooltip
             align="center" v-if="routeQuery.type  > 0">
             <template scope="scope">
               <span v-if="scope.row.bmuHardwareNo">{{scope.row.bmuHardwareNo}}</span>
               <span v-if="!scope.row.bmuHardwareNo">&#45;&#45;</span>
             </template>
           </el-table-column>-->
          <el-table-column
            label="原ECU上BMU软件号"
            show-overflow-tooltip
            align="center" v-if="routeQuery.type  == 1">
            <template scope="scope">
              <span v-if="scope.row.bmuOldSoftwareNo">{{scope.row.bmuOldSoftwareNo}}</span>
              <span v-if="!scope.row.bmuOldSoftwareNo">--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="原ECU上CMU软件号"
            show-overflow-tooltip
            align="center" v-if="routeQuery.type  == 1">
            <template scope="scope">
              <span v-if="scope.row.cmuOldSoftwareNo">{{scope.row.cmuOldSoftwareNo}}</span>
              <span v-if="!scope.row.cmuOldSoftwareNo">--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="原ECU上HVM软件号"
            show-overflow-tooltip
            align="center" v-if="routeQuery.type  == 1">
            <template scope="scope">
              <span v-if="scope.row.hvmOldSoftwareNo">{{scope.row.hvmOldSoftwareNo}}</span>
              <span v-if="!scope.row.hvmOldSoftwareNo">--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="升级BMU软件号"
            show-overflow-tooltip
            align="center" v-if="routeQuery.type  > 0">
            <template scope="scope">
              <span v-if="scope.row.bmuSoftwareNo">{{scope.row.bmuSoftwareNo}}</span>
              <span v-if="!scope.row.bmuSoftwareNo">--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="升级CMU软件号"
            show-overflow-tooltip
            align="center" v-if="routeQuery.type  > 0">
            <template scope="scope">
              <span v-if="scope.row.cmuSoftwareNo">{{scope.row.cmuSoftwareNo}}</span>
              <span v-if="!scope.row.cmuSoftwareNo">--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="升级HVM软件号"
            show-overflow-tooltip
            align="center" v-if="routeQuery.type > 0">
            <template scope="scope">
              <span v-if="scope.row.hvmSoftwareNo">{{scope.row.hvmSoftwareNo}}</span>
              <span v-if="!scope.row.hvmSoftwareNo">--</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column v-if="routeQuery.type < 2"
                           label="状态"
                           show-overflow-tooltip
                           align="center">
            <template scope="scope">{{scope.row.status | downloadStatus}}</template>
          </el-table-column>
          <el-table-column
            label="完成进度"
            show-overflow-tooltip
            align="center">
            <template scope="scope">{{scope.row.percent}}%</template>
          </el-table-column>
          <el-table-column v-if="routeQuery.type == 2"
                           label="状态"
                           show-overflow-tooltip
                           align="center">
            <template scope="scope">
              <span v-if="scope.row.status * 1 == 0">回滚下载BMU指令未下发</span>
              <span v-if="scope.row.status * 1 == 1">回滚下载BMU中</span>
              <span v-if="scope.row.status * 1 == 2">回滚下载HVM指令未下发</span>
              <span v-if="scope.row.status * 1 == 3">回滚下载HVM中</span>
              <span v-if="scope.row.status * 1 == 4">回滚下载CMU指令未下发</span>
              <span v-if="scope.row.status * 1 == 5">回滚下载CMU中</span>
              <span v-if="scope.row.status * 1 == 6">回滚刷新指令未下发</span>
              <span v-if="scope.row.status * 1 == 7">回滚刷新中</span>
              <span v-if="scope.row.status * 1 == 8">回滚刷新成功</span>
              <span v-if="scope.row.status * 1 == 9">回滚刷新失败</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" v-if="routeQuery.type < 2">
            <template scope="scope">
              <hy-handler type="other" placement="top" tips="详情" bgColor="#f4ea2a" size="14" color="#FFF" hover="#f8c60f" @click="detail(scope.row.id, routeQuery.type)"></hy-handler>
              <hy-handler type="createtask_fill" placement="top" tips="日志" bgColor="#ccc" size="14" color="#FFF" hover="#f8c60f" @click="openLog(scope.row.tboxSn)"></hy-handler>
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
      <el-dialog title="日志" :visible.sync="dialogTableVisible">
        <div class="table-content" style="height:600px;overflow-y:scroll;">
          <el-table
            :data="logList"
            v-loading="loading"
            :element-loading-text="loadingText"
            style="width: 100%"
            class="text-center">
            <el-table-column
              type="index"
              label="序号"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="type"
              label="日志类型"
              show-overflow-tooltip
              align="center">
              <template scope="scope">{{scope.row.type | logType}}</template>
            </el-table-column>
            <el-table-column
              prop="tboxSn"
              label="终端编号"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="content"
              label="日志内容"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              label="创建时间"
              show-overflow-tooltip
              align="center">
              <template scope="scope">{{scope.row.createTime | formatTime}}</template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <hy-page v-show="pageShow2"
                   :current-page="searchData2.pageNum"
                   :page-size="searchData2.pageSize"
                   :total-element="totalElement2"
                   @current-change="currentChange"></hy-page>
        </div>
      </el-dialog>
      <!--<div class="content-body">
      </div>-->
    </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import hyHandler from '@/components/handler/handler';
  import { wareRefreshList, wareDownloadList, rollBackWareTaskList } from '@/service/ware/wareService';
  import { mapMutations, mapState } from 'vuex';
  import { logListId, tBoxList } from '@/service/tbox/tboxService';

  export default {
    mixins: [list],
    data () {
      return {
          titName: '',
        searchData: {
          status: '',
          id: ''
        },
        dialogTableVisible: false,
        btn01: true, // 点击一次
        routeQuery: {}, // 下载刷新跳转路径参数
        tzTitle: '', // 跳转过来的名称
        chooseIds: [], // 选中的数组
        multipleSelection: [], // 选中的数据
        // 日志
        logList: [],
        searchData2: {
          pageNum: this.$store.state.pageNum,              // 当前页码
          pageSize: this.$store.state.pageSize
        },
        totalElement2: this.$store.state.totalElement,
        searchInput: {
          pageNum: 1,
          pageSize: 50
        }
      };
    },
    computed: {
      ...mapState([
        'taskModal_info'
      ]),
      // 日志分页是否展示
      pageShow2 () {
        return !!this.totalElement2;
      }
    },
    components: {
      hyHandler
    },
    created () {
    },
    methods: {
      ...mapMutations([
        'TASKMODAL_INFO'
      ]),
      handleClick (tab, event) {
        if (tab.label === '查询结果') {
          this.search();
        } else if (tab.label === '日志列表') {
          this._getLogList();
        }
      },
      async _getList () {
        this.getRouteQuery();
        let result;
        if (this.routeQuery && this.routeQuery.type * 1 === 0) {
           result = await wareDownloadList(this.searchData);
        }
        if (this.routeQuery && this.routeQuery.type * 1 === 1) {
           result = await wareRefreshList(this.searchData);
        }
        if (this.routeQuery && this.routeQuery.type * 1 === 2) {
          result = await rollBackWareTaskList(this.searchData);
        }
        this.loading = false;
        this.list = result.data && result.data.content || [];
        this.totalElement = result.data && result.data.total;
      },
      getRouteQuery () {
        if (this.$route.query) {
          this.routeQuery = this.$route.query;
          if (this.routeQuery.type === 0) this.titName = '下载';
          if (this.routeQuery.type === 1) this.titName = '刷新';
          if (this.routeQuery.type === 2) this.titName = '回滚';
          this.tzTitle = `任务${this.routeQuery.softwareTaskId}`;
          this.searchData.softwareTaskId = this.routeQuery.softwareTaskId;
          this.searchData.type = this.routeQuery.type;
        }
        if (this.$route.softwareTaskId) this.searchData.softwareTaskId = this.$route.softwareTaskId;
        if (this.$route.type) this.searchData.type = this.$route.type;
        if (this.$route.status) this.searchData.status = this.$route.status;
        if (this.$route.pageNum) this.searchData.pageNum = this.$route.pageNum;
        if (this.$route.pageSize) this.searchData.pageSize = this.$route.pageSize;
      },
      detail (id, type) {
          let url;
          if (type * 1 === 0) url = '/main/ware/downloadDetail/';
          if (type * 1 === 1) url = '/main/ware/refreshDetail/';
          this.$router.push({path: url, query: {id: id}});
          console.log(url);
      },
      openLog (tboxSn) {
        this.dialogTableVisible = true;
        this.searchData2.tboxSn = tboxSn;
        this._getLogList();
      },
      tboxChange (val) {
        this.chooseIds = [];
        this.multipleSelection = val;
        this.multipleSelection.forEach(row => {
          this.chooseIds.push(row.tboxSn);
        });
      },
      isSel (row, index) {
        if (row.status === 3) {
          return true;
        } else {
          return false;
        }
      },
      rollBack () {
        this.btn01 = false;
        if (this.chooseIds.length < 1) {
          this.$message({
            message: '请至少选择一个再进行此操作！',
            type: 'error'
          });
          return false;
        }
        if (this.taskModal_info && this.taskModal_info.status) {
          if (this.taskModal_info.status === 1 || this.taskModal_info.status === 2) {
            this.$message({
              message: '请先等待当前任务执行完毕。',
              type: 'error'
            });
            return;
          }
        }
        // 給父組件傳值
        this.tboxModal = false;
        this.TASKMODAL_INFO({show: true, type: 3, status: 1, ids: this.chooseIds, ware: this.wareId, taskId: 0}); // status 1开始 2进行 3结束
        this.btn01 = true;
      },

      // 日志列表
      async _getLogList () {
        if (!this.searchData2.tboxSn || this.searchData2.tboxSn === undefined) {
          this.searchData2 = {
            pageNum: this.$store.state.pageNum,
            pageSize: this.$store.state.pageSize
          };
        }
        let result = await logListId({logId: this.routeQuery.softwareTaskId}, this.searchData2);
        this.logList = result.data;
        this.totalElement2 = result.data.total;
      },
      // 下拉输入框搜索
      async _querySearchAsync (queryString, cb) {
        this.searchInput.tboxSn = queryString;
        let result = await tBoxList(this.searchInput);
        cb(result.data.content);
      },
      handleSelect (item) {
        console.log(item);
      },
      exportLog () {
        let url = '/api/bms/upgrade/log/list/' + this.routeQuery.softwareTaskId + '/export?';
        if (this.searchData2.tboxSn) {
          url += 'tboxSn=' + this.searchData2.tboxSn;
        }
        window.location.href = url;
      }
    },
    filters: {
      // 下载状态
      downloadStatus (value) {
        switch (value) {
          case 0:
            return '未下发';
          case 1:
            return '进行中';
          case 2:
            return '完成';
          case 3:
            return '失败';
        }
      },
      logType (value) {
        switch (value) {
          case 1:
            return '下载指令';
          case 2:
            return '下载指令回复';
          case 3:
            return '下载结果';
          case 4:
            return '刷新指令';
          case 5:
            return '刷新指令回复';
          case 6:
            return '刷新结果';
        }
      }
    }
  };
</script>
