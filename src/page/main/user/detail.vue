/**
* 描述：用户信息详情
*/
<style lang="scss" scoped>


</style>
<template>
  <div class="content">
    <div class="content-title">
      员工管理 - 详情
      <div class="content-btn">
        <el-button class="hy-default-btn" v-go-back>返回</el-button>
      </div>
    </div>
    <div class="content-body pd15">
      <transition name="fade" mode="out-in">
        <!-- 详情 -->
        <el-form label-position="right" label-width="120px" class="l-detail">
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="用户名：">{{detailInfo.username}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="名称：">{{detailInfo.name}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="邮箱：">{{detailInfo.email}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="电话：">{{detailInfo.phone}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="状态：">{{detailInfo.status | userStatus}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </transition>
    </div>
    <div class="content">
      <div class="content-title">
        员工角色配置情况
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
      </el-table>
    </div>
    </div>
  </div>
</template>
<script>
  import { userList, userRoleList } from '@/service/user/userService';
  import { roleList } from '@/service/user/roleService';

  export default {
    data () {
      return {
        detailInfo: {},
        userRoles: [],
        loading: true,
        loadingText: '加载中'
      };
    },
    created () {
      // 获取详情
      this._getDetail();
      this._getUserRoles();
    },
    methods: {
      async _getDetail () {
        let result = await userList(this.$route.query);
        this.detailInfo = result.data.content[0];
      },
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
      }
    },
    filters: {
      userStatus (value) {
        switch (value) {
          case 0:
            return '冻结';
          case 1:
            return '可用';
        }
      }
    }
  };
</script>
