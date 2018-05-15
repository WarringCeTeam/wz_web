/**
* 描述：配置用户角色
*/
<style lang="scss" scoped>

</style>
<template>
  <div class="content">
    <div class="content-title">
      员工管理 - 员工角色配置
      <div class="content-btn">
        <el-button class="hy-default-btn" v-go-back>返回</el-button>
      </div>
    </div>
    <div class="hy-search-bar">
      <el-row :gutter="24">
        <el-col :span="4">
          员工名称：{{this.$route.query.name}}
        </el-col>
        <el-col :span="20">
          <el-button :plain="true" type="info" @click="openHandle()" class="l_action_btn">
            <hy-handler type="add" placement="top" tips="新增" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3"></hy-handler>
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-content">
      <el-table
        :data="userRoles"
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
          label="角色名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="code"
          label="角色编码"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <hy-handler v-if="scope.row.id != 1 || queryId != 1" type="empty" placement="top" tips="移除" bgColor="#69d610" size="14" color="#FFF" hover="rgb(139, 227, 67)" @click="confirmDel(scope.row.id)"></hy-handler>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="新增角色" :visible.sync="dialogHandle" size="large">
        <div class="hy-search-bar">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input v-model.trim="roleSearchData.name" class="hy-search-input" placeholder="角色名称"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model.trim="roleSearchData.code" class="hy-search-input" placeholder="角色编码"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" class="hy-search-button" icon="search" @click="search">搜索</el-button>
            </el-col>
            <el-col :span="12">
            </el-col>
          </el-row>
        </div>
        <div class="table-content">
          <el-table
            :data="roleList"
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
              label="角色名称"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="code"
              label="角色编码"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <hy-handler type="configure" placement="top" tips="确定添加" bgColor="#5faee3" size="14" color="#FFF" hover="rgb(131, 159, 165)" @click="_handleRole(scope.row.id)"></hy-handler>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <hy-page v-show="pageShowRole"
                   :current-page="roleSearchData.pageNum"
                   :page-size="roleSearchData.pageSize"
                   :total-element="totalElementRole"
                   @current-change="currentChange"></hy-page>
        </div>
      </el-dialog>
    </div>
  </div>

</template>
<script>
  import hyHandler from '@/components/handler/handler';
  import { userRoleList, updateUserRole } from '@/service/user/userService';
  import { roleList } from '@/service/user/roleService';

  export default {
    data () {
      return {
        ids: [],
        queryId: 0,
        loading: true,
        loadingText: '加载中',
        userRoles: [],
        dialogHandle: false,
        roleList: [],
        roleSearchData: {
          pageNum: this.$store.state.pageNum,              // 当前页码
          pageSize: this.$store.state.pageSize            // 分页大小
        },
        totalElementRole: this.$store.state.totalElement
      };
    },
    created () {
      this._getUserRoles();
    },
    components: {
      hyHandler
    },
    methods: {
      async _getUserRoles () {
          let result = await userRoleList(this.$route.query);
          this.loading = false;
          this.queryId = this.$route.query.id;
          this.ids = result.data.roleIdList;
          this.userRoles = [];
          for (let i of this.ids) {
            let res = await roleList({id: i, pageNum: 1, pageSize: 200});
            this.userRoles.push(res.data.content[0]);
          }
      },
      currentChange (val) {
        this.loading = true;
        this.roleSearchData.pageNum = val;
        // 获取列表
        this._getRoleList();
      },
      search () {
        this.currentChange();
      },
      async _getRoleList () {
        if (this.roleSearchData.pageNum === undefined) this.roleSearchData.pageNum = 1;
        let result = await roleList(this.roleSearchData);
        this.loading = false;
        this.roleList = result.data && result.data.content || [];
        this.totalElementRole = result.data.total;
      },
      // 角色列表分页是否展示
      pageShowRole () {
        return !!this.totalElementRole;
      },
      // 打开角色弹出框
      openHandle () {
        this.dialogHandle = true;
        this._getRoleList();
      },
      async _handleRole (id) {
        if (this.ids.indexOf(id) > -1) {
          this.$message({
            message: '该用户已拥有此角色！',
            type: 'warning'
          });
          return;
        }
        this.ids.push(id);
        let result = await updateUserRole({id: this.$route.query.id}, {roleIdList: this.ids});
        if (result.result) {
          this._getUserRoles();
          this.dialogHandle = false;
          this.$message({
            message: result.message,
            type: 'success'
          });
        } else {
          this.$message({
            message: result.message,
            type: 'error'
          });
        }
      },
      // delete
      confirmDel (id) {
        this.$confirm('是否删除当前员工的此角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(this.del.bind(this, id)).catch(() => {});
      },
      async del (id) {
        try {
          this.ids = this.ids.filter(item => item !== id);
          let result = await updateUserRole({id: this.$route.query.id}, {roleIdList: this.ids});
          this.$message({
            message: result.message,
            type: 'success'
          });
          this._getUserRoles();
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      }
    }
  };
</script>
