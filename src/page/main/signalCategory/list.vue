/**
* 描述：信号类别管理
*/
<style lang="scss" scoped>

</style>
<template>
    <div class="content">
      <div class="content-title">
        信号类别管理
        <div class="content-btn">
          <el-button class="hy-default-btn" v-go-back>返回</el-button>
        </div>
      </div>
      <div class="hy-search-bar">
        <el-row :gutter="24">
          <el-col :span="4">
            <el-input v-model.trim="searchData.name" class="hy-search-input" placeholder="信号类名"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" class="hy-search-button" icon="search" @click="search">搜索</el-button>
          </el-col>
          <el-col :span="16">
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
          class="text-center">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="信号类别名称"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="serialNumber"
            label="排序号"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="创建时间"
            show-overflow-tooltip
            align="center"
            width="200">
            <template scope="scope">
              {{scope.row.createTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <hy-handler type="brush_fill" placement="top" tips="修改" bgColor="#fe8a7b" size="14" color="#FFF" hover="rgb(199, 41, 21)" @click="add(scope.row.id)"></hy-handler>
              <!--<hy-handler type="other" placement="top" tips="详情" bgColor="#f4ea2a" size="14" color="#FFF" hover="rgb(252, 240, 9)" @click="detail(scope.row.id)"></hy-handler>-->
              <hy-handler type="empty" placement="top" tips="删除" bgColor="#69d610" size="14" color="#FFF" hover="rgb(79, 166, 9)" @click="confirmDel(scope.row.id)"></hy-handler>
              <hy-handler type="up" placement="top" tips="上移" bgColor="#71fdf0" size="14" color="#FFF" hover="rgb(8, 228, 208)" @click="_upMove(scope.$index)" v-show="scope.$index > 0"></hy-handler>
              <hy-handler type="down" placement="top" tips="下移" bgColor="#71fdf0" size="14" color="#FFF" hover="rgb(8, 228, 208)" @click="_downMove(scope.$index)" v-show="scope.$index < list.length - 1"></hy-handler>
            </template>
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
  import hyHandler from '@/components/handler/handler';
  import { getSignalCategoryList, deleteSignalCategory, changePosition } from '@/service/signal/signalCategoryService';

  export default {
    mixins: [list],
    data () {
      return {
        dialogHandle: false,
        operationInfo: '',
        operationId: '',
        searchData: {
          level: '',
          type: '',
          status: ''
        }
      };
    },
    components: {
      hyHandler
    },
    created () {
    },
    methods: {
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
        let result = await getSignalCategoryList(this.searchData);
        this.loading = false;
        this.list = result.data && result.data.content || [];
        this.totalElement = result.data.total;
      },
      // add
      add (id) {
          sessionStorage.setItem('back', JSON.stringify(this.searchData));
        if (id < 0) this.$router.push({path: '/main/signal/category/add'});
        if (id > -1) this.$router.push({path: '/main/signal/category/add', query: {id: id, pageNum: this.searchData.pageNum, pageSize: this.searchData.pageSize}});
      },
      // detail
      detail (id) {
        // 根据情况 存储查询条件和分页
        sessionStorage.setItem('back', JSON.stringify(this.searchData));
        this.$router.push({path: '/main/alarm/detail/', query: {id: id, pageNum: this.searchData.pageNum, pageSize: this.searchData.pageSize}});
      },
      // delete
      confirmDel (id) {
        this.$confirm('是否删除此信号类别?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(this.del.bind(this, id)).catch(() => {});
      },
      async del (id) {
        try {
          let result = await deleteSignalCategory({id: id});
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
      async _upMove (index) {
          await changePosition({up: this.list[index].id, down: this.list[index - 1].id});
          this._getList();
      },
      async _downMove (index) {
        console.log(index);
        await changePosition({up: this.list[index + 1].id, down: this.list[index].id});
        this._getList();
      }
      // --------------------- 查项目 ---------------------------
//      async searchPList () {
//        let result = await projectList({pageNum: 1, pageSize: 50});
//        this.projectLists = result.data && result.data.content || [];
//      }
    },
    filters: {
      alarmLevel (value) {
        switch (value) {
          case 0:
            return '0级';
          case 1:
            return '1级';
          case 2:
            return '2级';
          case 3:
            return '3级';
          case 4:
            return '4级';
          case 5:
            return '5级';
        }
      },
      alarmType (value) {
        switch (value) {
          case 0:
            return '刷新报警';
          case 1:
            return '信号报警';
        }
      },
      alarmStatus (value) {
        switch (value) {
          case 0:
            return '未处理';
          case 1:
            return '已处理';
        }
      }
    }
  };
</script>
