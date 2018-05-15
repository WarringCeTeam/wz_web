/**
* 描述：角色详情
*/
<style lang="scss" scoped>


</style>
<template>
  <div class="content">
    <div class="content-title">
      角色管理 - 详情
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
              <el-form-item label="角色名称：">{{detailInfo.name}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="角色编码：">{{detailInfo.code}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="备注：">{{detailInfo.remark}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </transition>
    </div>
  </div>
</template>
<script>
  import { roleList } from '@/service/user/roleService';

  export default {
    data () {
      return {
        detailInfo: {}
      };
    },
    created () {
      // 获取详情
      this._getDetail();
    },
    methods: {
      async _getDetail () {
        let result = await roleList(this.$route.query);
        this.detailInfo = result.data.content[0];
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
