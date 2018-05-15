/**
* 描述：任务管理
*/
<style lang="scss" scoped>

</style>
<template>
    <div class="content">
      <div class="content-title">
        任务管理
      </div>
      <div class="hy-search-bar">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-select v-model="searchData.type" clearable class="cicle" placeholder="类型">
              <el-option label="下载" :value="0"></el-option>
              <el-option label="刷新" :value="1"></el-option>
              <el-option label="诊断" :value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" class="hy-search-button" icon="search" @click="search">搜索</el-button>
          </el-col>
          <!--<el-col :span="12">
            <el-button :plain="true" type="info" @click="diagnoseAdd" class="l_action_btn">
              <hy-handler type="add" placement="top" tips="新增诊断任务" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3"></hy-handler>
            </el-button>
          </el-col>-->
        </el-row>
      </div>
      <div class="table-content">
        <el-table
          :data="list"
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
            label="类型"
            show-overflow-tooltip
            align="center">
            <template scope="scope">
              <a class="tz" @click="detail(scope.row.id, scope.row.type)" v-if="scope.row.type == 0">下载</a>
              <a class="tz" @click="detail(scope.row.id, scope.row.type)" v-if="scope.row.type == 1">刷新</a>
              <a class="tz" @click="detail(scope.row.id, scope.row.type)" v-if="scope.row.type == 3">诊断</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalNumber"
            label="总数"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="successNumber"
            label="成功数"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="failNumber"
            label="失败数"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="开始时间"
            show-overflow-tooltip
            align="center">
            <template scope="scope">{{scope.row.createTime | formatTime}}</template>
          </el-table-column>
          <el-table-column
            label="完成时间"
            show-overflow-tooltip
            align="center">
            <template scope="scope">{{scope.row.updateTime | formatTime}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <hy-handler type="other" placement="top" tips="详情" bgColor="#f4ea2a" size="14" color="#FFF" hover="#f8c60f" @click="detail(scope.row.id, scope.row.type)"></hy-handler>
              <hy-handler v-show="scope.row.type<3" type="renwu2" placement="top" tips="预览" bgColor="#f8830b" size="10" color="#FFF" hover="#fa9261" @click="view(scope.row)"></hy-handler>
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
    </div>

</template>
<script>
  import list from '@/js/mixins/list';
  import hyHandler from '@/components/handler/handler';
  import { taskList } from '@/service/ware/wareService';
  import { mapMutations, mapState } from 'vuex';

  export default {
    mixins: [list],
    data () {
      return {
        projectLists: [],
        searchData: {
          type: ''
        },

        bmuList: []
      };
    },
    components: {
      hyHandler
    },
    created () {
    },
    computed: {
      ...mapState([
        'taskModal_info'
      ])
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
        let result = await taskList(this.searchData);
        this.loading = false;
        this.list = result.data && result.data.content || [];
        this.totalElement = result.data.total;
      },
      // detail
      detail (id, type) {
        // 根据情况 存储查询条件和分页
        if (this.backData) sessionStorage.setItem('back', JSON.stringify(this.searchData));
        if (type < 3) {
          this.$router.push({path: '/main/ware/refreshList', query: {softwareTaskId: id, type: type}});
        } else {
          this.$router.push({path: '/main/diagnose', query: {id: id}});
        }
      },
      view (tag) {
          this.TASKMODAL_INFO({show: true, type: tag.type, status: 2, taskId: tag.id}); // status 1开始 2进行 3结束
//          if (tag.failNumber + tag.successNumber < tag.totalNumber) {
//            this.TASKMODAL_INFO({show: true, type: tag.type, status: 2, taskId: tag.id}); // status 1开始 2进行 3结束
//          } else {
//            this.$message({
//              message: '任务已完成，无法预览',
//              type: 'warning'
//            });
//          }
      }
      /* diagnoseAdd () {
        this.$router.push({path: '/main/diagnose/add'});
      } */
    }
  };
</script>
