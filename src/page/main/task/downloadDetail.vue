/**
* 描述：任务下载记录详情
*/
<style lang="scss" scoped>


</style>
<template>
  <div class="content">
    <div class="content-title">
      任务下载记录 - 详情
      <div class="content-btn">
        <el-button class="hy-default-btn" v-go-back>返回</el-button>
      </div>
    </div>
    <div class="content-body pd15">
      <!--<el-tabs v-model="activeName">-->
      <!--<el-tab-pane label="会员信息" name="first">-->
      <transition name="fade" mode="out-in">
        <!-- 详情 -->
        <el-form label-position="right" label-width="120px" class="l-detail">
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="终端设备号：">{{detailInfo.tboxSn}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="状态：">{{detailInfo.status | downloadStatus}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="软件类型：">{{detailInfo.softwareType | wareType}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="软件号：">{{detailInfo.softwareNo}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="备注：">{{detailInfo.remark}}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="16">
              <el-form-item label="创建时间：">{{detailInfo.createTime | formatTime}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </transition>
    </div>
  </div>
</template>
<script>
  import { wareDownload } from '@/service/ware/wareService';

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
        let result = await wareDownload(this.$route.query);
        this.detailInfo = result.data;
      }
    },
    filters: {
      // 刷新状态
      downloadStatus (value) {
        switch (value) {
          case 0:
            return '未下发';
          case 1:
            return '下载中';
          case 2:
            return '下载完成';
          case 3:
            return '下载失败';
        }
      }
    }
  };
</script>
