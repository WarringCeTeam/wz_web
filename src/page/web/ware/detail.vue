/**
* 描述：软件管理详情
*/
<style lang="scss" scoped>


</style>
<template>
  <div class="content">
    <div class="content-title">
      软件管理 - 详情
      <div class="content-btn">
        <el-button class="hy-default-btn" v-go-back>返回</el-button>
      </div>
    </div>
    <div class="content-body pd15">
      <!--<el-tabs v-model="activeName">-->
      <!--<el-tab-pane label="会员信息" name="first">-->
      <transition name="fade" mode="out-in">
        <!-- 详情 -->
        <el-form label-position="right" label-width="140px" class="l-detail">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="存储路径："><a class="tz" @click="down(detailInfo.fileId)">{{detailInfo.name}}</a>&emsp;(软件大小：{{detailInfo.size}}Kb)</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态："> {{detailInfo.status | statusType2}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类型：">{{detailInfo.type | wareType}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="软件号：">{{detailInfo.softwareNo}}</el-form-item>
            </el-col>
            <el-col :span="12" v-if="detailInfo.project">
              <el-form-item label="项目：">{{detailInfo.project.projectName}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="CRC校验：">{{detailInfo.crc}}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="兼容硬件号：">{{detailInfo.softwareCompatibleHardwareNo}}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="兼容项目号：">{{detailInfo.softwareCompatibleProjectNo}}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：">{{detailInfo.remark}}</el-form-item>
            </el-col>
            <!--<el-col :span="12">
              <el-form-item label="创建人：">{{detailInfo.createUserId}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间：">{{detailInfo.createTime}}</el-form-item>
            </el-col>-->
            <el-col :span="12">
              <el-form-item label="更新人：">{{detailInfo.updateUser}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="更新时间：">{{detailInfo.updateTime | formatTime}}</el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </transition>
    </div>
  </div>
</template>
<script>
  import { wareList } from '@/service/ware/wareService';

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
        let result = await wareList(this.$route.query);
        this.detailInfo = result.data.content[0];
        this.detailInfo.sff = this.getSff(this.detailInfo.fileId);
      },
      // 获取文件后缀
      getSff (address) {
        let index1 = address.lastIndexOf('.') + 1;
        let str = address.substring(index1, address.length);
        return str;
      },
      // 下载
      down () {
        window.location.href = '/api/file/' + this.detailInfo.fileId;
      }
    }
  };
</script>
