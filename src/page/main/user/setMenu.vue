/**
* 描述：配置角色菜单
*/
<style lang="scss" scoped>

</style>
<template>
  <div class="content">
    <div class="content-title">
      员工管理 - 角色菜单配置
      <div class="content-btn">
        <el-button class="hy-default-btn" v-go-back>返回</el-button>
      </div>
    </div>
    <div class="hy-search-bar">
      <el-row :gutter="24">
        <el-col :span="4">
          角色名称：{{this.$route.query.name}}
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
        :data="roleMenus"
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
          label="菜单"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <!--<el-table-column
          prop="url"
          label="菜单地址"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderNumber"
          label="菜单顺序"
          show-overflow-tooltip
          align="center">
        </el-table-column>-->
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <hy-handler type="empty" placement="top" tips="移除" bgColor="#69d610" size="14" color="#FFF" hover="rgb(139, 227, 67)" @click="confirmDel(scope.row.id)"></hy-handler>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加菜单" :visible.sync="dialogHandle" size="large">
        <div class="table-content">
          <el-table
            ref="multipleTable"
            :data="menuList"
            v-loading="loading"
            :element-loading-text="loadingText"
            style="width: 100%"
            @selection-change="handleCheck"
            class="text-center">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="菜单名称"
              show-overflow-tooltip
              align="center">
            </el-table-column>
            <!--<el-table-column
              prop="code"
              label="菜单地址"
              show-overflow-tooltip
              align="center">
            </el-table-column>-->
            <el-table-column
              prop="orderNumber"
              label="菜单顺序"
              show-overflow-tooltip
              align="center">
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogHandle = false">取 消</el-button>
          <el-button type="primary" @click="_handleRole">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>
<script>
  import hyHandler from '@/components/handler/handler';
  import { roleMenuList, updateRoleMenu } from '@/service/user/roleService';
  import { menuList } from '@/service/user/menuService';

  export default {
    data () {
      return {
        ids: [],
        chooseMenus: [],
        loading: true,
        loadingText: '加载中',
        roleMenus: [],
        dialogHandle: false,
        menuList: [],
        roleSearchData: {
          pageNum: this.$store.state.pageNum,              // 当前页码
          pageSize: this.$store.state.pageSize            // 分页大小
        },
        totalElementRole: this.$store.state.totalElement
      };
    },
    created () {
      this._getRoleMenus();
    },
    components: {
      hyHandler
    },
    methods: {
      async _getRoleMenus () {
          let result = await roleMenuList(this.$route.query);
          this.loading = false;
          this.ids = result.data.menuIdList;
          this.roleMenus = [];
          for (let i of this.ids) {
            let res = await menuList({id: i, pageNum: 1, pageSize: 200});
            this.roleMenus.push(res.data[0]);
          }
      },
      async _getMenuList () {
        let result = await menuList(this.roleSearchData);
        this.loading = false;
        this.menuList = result.data && result.data || [];
        setTimeout(() => {
          this.menuList.forEach(menu => {
            if (this.ids.indexOf(menu.id) !== -1) this.$refs.multipleTable.toggleRowSelection(menu);
          });
        }, 500);
      },
      // 打开菜单弹出框
      openHandle () {
        this.dialogHandle = true;
        this._getMenuList();
      },
      handleCheck (val) {
        this.chooseMenus = val;
      },
      async _handleRole () {
        let newIds = [];
        this.chooseMenus.forEach(item => {
          newIds.push(item.id);
        });
        let result = await updateRoleMenu({id: this.$route.query.id}, {menuIdList: newIds});
        if (result.result) {
          this._getRoleMenus();
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
        this.$confirm('是否删除当前角色的此菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(this.del.bind(this, id)).catch(() => {});
      },
      async del (id) {
        try {
          this.ids = this.ids.filter(item => item !== id);
          let result = await updateRoleMenu({id: this.$route.query.id}, {menuIdList: this.ids});
          this.$message({
            message: result.message,
            type: 'success'
          });
          this._getRoleMenus();
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
