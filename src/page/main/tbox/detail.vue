/**
* 描述：TBOX管理详情
*/
<style lang="scss" scoped>

</style>
<template>
  <div class="content">
    <div class="content-title">
      终端管理 - 详情
      <div class="content-btn">
        <el-button class="hy-default-btn" v-go-back>返回</el-button>
        <!--<el-button  type="success" class="cicle" @click="getWareHistory(detailInfo.id)">软件版本回滚</el-button>-->

      </div>
    </div>
    <div class="content-body pd15">
          <el-form label-position="right" label-width="120px" class="l-detail">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="终端编号：">{{detailInfo.tboxSn}}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="状态："> {{detailInfo.status | statusType}}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="型号："> {{detailInfo.modelNo}}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="VIN码：">{{detailInfo.vin}}</el-form-item>
              </el-col>
              <el-col :span="24" v-if="detailInfo.project">
                <el-form-item label="项目：">{{detailInfo.project.projectName}}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="BMU软件版本：">{{detailInfo.bmuSoftwareNo}}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="CMU软件版本：">{{detailInfo.cmuSoftwareNo}}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="HVM软件版本：">{{detailInfo.hvmSoftwareNo}}</el-form-item>
              </el-col>
            </el-row>

          </el-form>
    </div>
    <div class="content-title">关联BMU列表</div>
    <div class="content-body pd15">
      <el-table
        :data="list"
        v-loading=""
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
          prop="serialNo"
          label="序列"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          label="状态"
          show-overflow-tooltip
          align="center">
          <template scope="scope">
            {{scope.row.status | statusType}}
          </template>
        </el-table-column>
        <el-table-column
          prop="tboxSn"
          label="TBOX编号"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          label="激活时间"
          show-overflow-tooltip
          align="center"
          width="200">
          <template scope="scope">
            {{scope.row.activationTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column
          prop="project.projectName"
          label="项目"
          show-overflow-tooltip
          align="center">
        </el-table-column>
       <!-- <el-table-column
          prop="customer"
          label="客户"
          show-overflow-tooltip
          align="center">
        </el-table-column>-->
        <el-table-column
          prop="hardwareNo"
          label="硬件号"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="softwareNo"
          label="软件号"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="installationSite"
          label="安装城市"
          show-overflow-tooltip
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出层--选择tbox -->
    <hy-modal :title="`选择回滚版本`" :styles="{width: '888px'}" :transition="this.$store.state.modalTransition" v-model="rollbackModal">
      <div class="hy-search-bar">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input v-model="searchWare.tboxSn" class="hy-search-input" placeholder="终端编号"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" class="hy-search-button" icon="search" @click="searchWareList()">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-content" style="height:300px;overflow-y:scroll;">
        <el-table
          :data="wareHList"
          style="width: 100%"
          class="text-center">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tboxSn"
            label="终端编号"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="bmuSoftwareNo"
            label="BMU软件号"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="cmuSoftwareNo"
            label="CMU软件号"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="hvmSoftwareNo"
            label="HVM软件号"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="最后发送时间"
            show-overflow-tooltip
            align="center">
            <template scope="scope">{{scope.row.lastSend | formatTime}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button size="small" :style="{primary: scope.row.id == refreshId}" @click="selectWare(scope.row.id)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: right;margin-right:20px;">
        <el-button @click="cancelWareModal()">取消</el-button>
        <el-button type="primary" @click="wareSelection()" :disabled="!refreshId">确定</el-button>
      </div>
    </hy-modal>
  </div>
</template>
<script>
  import { tBoxDetail } from '@/service/tbox/tboxService';
  import list from '@/js/mixins/list';
  import { rollBackWareHistory } from '@/service/ware/wareService';
  import { mapMutations } from 'vuex';

  export default {
    mixins: [list],
    data () {
      return {
        detailInfo: {},
        rollbackModal: false,
        searchWare: {
          tboxSn: ''
        },
        wareHList: [],
        refreshId: '',
        tboxId: ''
      };
    },
    created () {
      // 获取详情
      this._getDetail();
    },
    methods: {
      ...mapMutations([
        'TASKMODAL_INFO'
      ]),
      async _getDetail () {
        let result = await tBoxDetail(this.$route.query);
        this.detailInfo = result.data;
        this.loading = false;
        this.list = this.detailInfo.bmuModels || [];
      },
      async _getList () {
      },
      // -------------------------------------------- rollback -----------------------------------
      getWareHistory (id) {
        this.tboxId = id; // tboxId
        this.rollbackModal = true;
        delete this.searchWare.tboxSn;
        this.searchWareList();
      },
      async searchWareList () {
        this.searchWare.tboxSn = this.detailInfo.tboxSn;
        let result = await rollBackWareHistory(this.searchWare);
        this.loading = false;
        this.wareHList = result.data || [];
        this.totalElement = result.data.total;
      },
      selectWare (id) {
        if (id) {
          this.refreshId = id;
          console.log(this.refreshId);
        }
      },
      wareSelection () {
        // 給父組件傳值
        this.rollbackModal = false;
        this.TASKMODAL_INFO({show: true, type: 2, status: 1, refreshId: this.refreshId, ids: this.tboxId, taskId: 0}); // status 1开始 2进行 3结束
      },
      cancelWareModal () {
        this.rollbackModal = false;
      }
    }
  };
</script>
