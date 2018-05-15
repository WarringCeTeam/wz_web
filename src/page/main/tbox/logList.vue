/**
* 描述：T-BOX管理-日志
*/
<style lang="scss" scoped>

</style>
<template>
  <div class="content">
    <div class="content-title">
      终端管理——日志
      <div class="content-btn">
        <el-button class="hy-default-btn" v-go-back>返回</el-button>
      </div>
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
      <hy-page v-show="pageShow"
               :current-page="searchData.pageNum"
               :page-size="searchData.pageSize"
               :total-element="totalElement"
               @current-change="currentChange"></hy-page>
    </div>
  </div>

</template>
<script>
  import list from '@/js/mixins/list';
  import { logList } from '@/service/tbox/tboxService';

  export default {
    mixins: [list],
    data () {
      return {
        searchData: {}
      };
    },
    methods: {
      async _getList () {
        let res = this.$route.query;
        if (!res.tboxSn) {
          return;
        }
        this.searchData.tboxSn = res.tboxSn;
        let result = await logList(this.searchData);
        this.loading = false;
        this.list = result.data.content;
        this.totalElement = result.data.total;
      }
    },
    filters: {
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
