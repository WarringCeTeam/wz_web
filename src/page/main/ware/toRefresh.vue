/**
* 描述：软件管理-刷新
*/
<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card-right {
    width: 50%;
    height: 80%;
    position:absolute;
    right: 20px;
  }
  .box-card-left {
    width: 50%;
    position:absolute;
    left: 20px;
  }
  .close{
    color: #999;
    font-size:20px;
    font-style: normal;
    float: right;
    cursor: pointer;
  }
  .modal{
    background: rgba(0, 0, 0, 0.8);
    z-index:2010;
    .modal_kuang{
      margin:10% auto;
      width:400px;
      .title{
        font-size: 20px;
        color: #fff;
        text-align: center;
        line-height:60px;
      }
      .main .font{
        font-size: 12px;
        font-style: normal;
        line-height:20px;
        color: #f1f1f1;
        i{
          font-style: normal;
          font-size:16px;
          color: #4f80e1;
          padding:0 6px;
        }
      }

    }
  }
  .clear{
    clear: both;
    zoom:1;
    overflow: hidden;
  }
  .ware_name{
    float: left;
    line-height:30px;
    font-size: 20px;
    color:#4f80e1;
  }
  .ware_btn{
    float: right;
    margin-left:3px;
  }
  .wareInfo{
    font-size:12px;
    padding-right:5px;
    display: inline-block;
    margin-top:10px;
  }
  .otherInfo{
    font-size:12px;
    padding-right:5px;
    margin-top:10px;
    display: inline-block;
  }
  .mb24{
    margin-bottom: 24px;
  }
</style>
<template>
  <div class="content">
    <el-alert
      :title="errorTitle" v-show="errorShow"
      type="error"
      show-icon>
    </el-alert>
    <div class="content-title">
      软件管理 - 刷新
      <div class="content-btn">
        <el-button type="primary" class="cicle" @click="_validate()">确定</el-button>
        <el-button class="hy-default-btn" v-go-back>取消</el-button>
      </div>
    </div>
    <div class="content-body">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-card class="box-card mb24">
            <el-select v-model="projectId" length="10px" @change="findByProjectId" clearable placeholder="项目"  class="cicle">
              <el-option :label="item.projectName" :value="item.id" :key="item.id" v-for="item in projectLists"></el-option>
            </el-select>
          </el-card>
          <!--cmu-->
          <el-card class="box-card mb24">
            <span class="ware_name">CMU</span>
              <el-button :plain="true" type="info" class="ware_btn" size="small" @click="clean(1)" v-if="cmuStr.name">清除</el-button>
              <el-button :plain="true" type="info" class="ware_btn" size="small" @click="openWareModel('CMU')">选择</el-button>

            <div class="clear"></div>
            <div v-if="cmuStr.name">
                <div class="wareInfo">{{cmuStr.name}}</div>
                <el-tag type="warning" v-if="cmuStr.status == 1">激活</el-tag>
                <el-tag v-if="cmuStr.status == 0">未激活</el-tag>
                <div class="clear"></div>
                <div class="otherInfo">软件号：{{cmuStr.softwareNo}}</div> &emsp;
                <div class="otherInfo">软件大小：{{cmuStr.size}}kb</div>
            </div>
          </el-card>
          <!--bmu-->
          <el-card class="box-card mb24">
            <span class="ware_name">BMU</span>
            <el-button :plain="true" type="info" class="ware_btn" size="small" @click="clean(2)" v-if="bmuStr.name">清除</el-button>
            <el-button :plain="true" type="info" class="ware_btn" size="small" @click="openWareModel('BMU')">选择</el-button>

            <div class="clear"></div>
            <div v-if="bmuStr.name">
              <div class="wareInfo">{{bmuStr.name}}</div>
              <el-tag type="warning" v-if="bmuStr.status == 1">激活</el-tag>
              <el-tag v-if="bmuStr.status == 0">未激活</el-tag>
              <div class="clear"></div>
              <div class="otherInfo">软件号：{{bmuStr.softwareNo}}</div> &emsp;
              <div class="otherInfo">软件大小：{{bmuStr.size}}kb</div>
            </div>
          </el-card>
          <!--hvm-->
          <el-card class="box-card mb24">
            <span class="ware_name">HVM</span>
            <el-button :plain="true" type="info" class="ware_btn" size="small" @click="clean(3)" v-if="hvmStr.name">清除</el-button>
            <el-button :plain="true" type="info" class="ware_btn" size="small" @click="openWareModel('HVM')">选择</el-button>

            <div class="clear"></div>
            <div v-if="hvmStr.name">
              <div class="wareInfo">{{hvmStr.name}}</div>
              <el-tag type="warning" v-if="hvmStr.status == 1">激活</el-tag>
              <el-tag v-if="hvmStr.status == 0">未激活</el-tag>
              <div class="clear"></div>
              <div class="otherInfo">软件号：{{hvmStr.softwareNo}}</div> &emsp;
              <div class="otherInfo">软件大小：{{hvmStr.size}}kb</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card class="box-card">
            <span style="line-height: 36px;">选择终端：</span>
            <div class="hy-search-bar">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-input v-model="searchTbox.tboxSn" class="hy-search-input" placeholder="终端编号"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="searchTbox.modelNo" class="hy-search-input" placeholder="型号"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="searchTbox.vin" class="hy-search-input" placeholder="VIN码"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" class="hy-search-button" icon="search" @click="_getList()">搜索</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="table-content" style="height:600px;overflow-y:scroll;">
              <el-table
                :data="list"
                style="width: 100%"
                class="text-center"
                @selection-change="tboxChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
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
                  prop="modelNo"
                  label="型号"
                  show-overflow-tooltip
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="vin"
                  label="VIN码"
                  show-overflow-tooltip
                  align="center">
                </el-table-column>
                <el-table-column
                  label="ECU编号"
                  show-overflow-tooltip
                  align="center">
                  <template scope="scope">
                    <span v-for="bmu in scope.row.bmuModels">{{bmu.serialNo}}&emsp;</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="bmuSoftwareNo"
                  label="最新下载软件号(BMU)"
                  show-overflow-tooltip
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="cmuSoftwareNo"
                  label="最新下载软件号(CMU)"
                  show-overflow-tooltip
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="hvmSoftwareNo"
                  label="最新下载软件号(HVM)"
                  show-overflow-tooltip
                  align="center">
                </el-table-column>
                <el-table-column
                  label="状态"
                  show-overflow-tooltip
                  align="center">
                  <template scope="scope">{{scope.row.status | tboxStatus}}</template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 分页 -->
            <!--<hy-page v-show="pageShow"
                     :current-page="searchTbox.pageNum"
                     :page-size="searchTbox.pageSize"
                     :total-element="totalElement"
                     @current-change="currentChange"
                     @page-sizes="changeSize"></hy-page>-->
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 弹出层--选择软件 -->
    <hy-modal :title="`选择软件 -- ` + wareName" :styles="{width: '888px'}" :transition="this.$store.state.modalTransition" v-model="wareModal">
      <div class="hy-search-bar">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input v-model="searchData.softwareNo" class="hy-search-input" placeholder="软件号"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" class="hy-search-button" icon="search" @click="_getWareList()">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-content" style="height:300px;overflow-y:scroll;">
        <el-table
          :data="wareList"
          v-loading="loading"
          :element-loading-text="loadingText"
          style="width: 100%"
          :fit="true"
          class="text-center">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            label="软件名称"
            show-overflow-tooltip
            align="center">
            <template scope="scope">
              <a class="tz" @click="detail(scope.row.id)">{{scope.row.name}}</a>
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            show-overflow-tooltip
            align="center">
            <template scope="scope">{{scope.row.type | wareType}}</template>
          </el-table-column>
          <el-table-column
            label="是否激活"
            show-overflow-tooltip
            align="center">
            <template scope="scope">{{scope.row.status | statusType}}</template>
          </el-table-column>
          <el-table-column
            prop="softwareNo"
            label="软件号"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="size"
            label="文件大小（kb）"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="确认选择"
            show-overflow-tooltip
            align="center">
            <template scope="scope"><el-button type="primary" size="mini" class="cicle" @click="chooseWare(scope.row)">选中</el-button></template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!--<hy-page v-show="pageShow"
                 :current-page="searchData.pageNum"
                 :page-size="searchData.pageSize"
                 :total-element="totalElement"
                 @current-change="currentChange"
                 @page-sizes="changeSize"></hy-page>-->
      </div>
      <div style="text-align: right;margin-right:20px;">
        <el-button @click="cancelWareModal()">取消</el-button>
      </div>
    </hy-modal>

  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import { wareList } from '@/service/ware/wareService';
  import { tBoxList } from '@/service/tbox/tboxService';
  import { projectList } from '@/service/project/projectService';
  import { mapMutations, mapState } from 'vuex';

  export default {
    mixins: [list],
    data () {
      return {
        projectLists: [],
        projectId: '',
        errorShow: false,
        errorTitle: '?',
        wareList: [],
        bmuSoftwareNo: '',
        cmuSoftwareNo: '',
        hvmSoftwareNo: '',
        wareName: 'BMU',
        btn01: true, // 点击一次
        searchData: {
            type: 2
        },
        wareData: [{
            ware: 'BMU'
        }, {
          ware: 'CMU'
        }, {
          ware: 'HVM'
        }],
        wareModal: false,
        searchTbox: {
//          pageNum: this.$store.state.pageNum,              // 当前页码
//          pageSize: this.$store.state.pageSize
        },
        chooseIds: [],
        taskModal: false, // 弹出框
        ok: false, // 是否成功
        taskData: {},
        cmuStr: {},
        bmuStr: {},
        hvmStr: {},
        justList: []
      };
    },
    created () {
      this.searchPList();
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
        this.loading = true;
        // 获取列表
        this._getList();
      },
      // 判断能否选择
      ableSelect (row, index) {
        if (row.status < 1) {
          return false;
        }
        return true;
      },
      async _getList () {
        let result = await tBoxList(this.searchTbox);
        this.loading = false;
        this.list = result.data && result.data || [];
        this.justList = this.list;
        // this.list = this.list.filter(item => item.bmuModels !== null);
        // this.totalElement = result.data.total;
        this.getNewList();
      },
      openWareModel (data) {
        if (!this.projectId || this.projectId < 1) {
          this.$message({
            message: '请先选择项目',
            type: 'warning'
          });
          return;
        }
        this.wareModal = true;
        if (data === 'BMU') this.searchData.type = 1;
        if (data === 'CMU') this.searchData.type = 3;
        if (data === 'HVM') this.searchData.type = 2;
        this.wareName = data;
        this._getWareList();
      },
      // 清除
      clean (type) {
          if (type === 1) {
            this.cmuStr = {};
            delete this.cmuSoftwareNo;
          }
          if (type === 2) {
            this.bmuStr = {};
            delete this.bmuSoftwareNo;
          }
          if (type === 3) {
            this.hvmStr = {};
            delete this.hvmSoftwareNo;
          }
        this._getList();
      },
      // 获取软件列表
      async _getWareList () {
        delete this.searchData.pageNum;
        delete this.searchData.pageSize;
        let result = await wareList(this.searchData);
        this.loading = false;
        this.wareList = result.data && result.data || [];
        this.wareList = this.wareList.filter(item => item.status === 1);
        // this.totalElement = result.data.total;
      },
      // 选择软件
      chooseWare (data) {
        this.wareModal = false;
        let { name, type, status, softwareNo, size } = data;
        if (type === 3) {
          this.cmuSoftwareNo = softwareNo;
          this.cmuStr = {ware: 'CMU', name, type, status, softwareNo, size};
        } else if (type === 1) {
          this.bmuSoftwareNo = softwareNo;
          this.bmuStr = {ware: 'BMU', name, type, status, softwareNo, size};
        } else if (type === 2) {
          this.hvmSoftwareNo = softwareNo;
          this.hvmStr = {ware: 'HVM', name, type, status, softwareNo, size};
        }
        this.getNewList();
      },
      // 过滤TBOX列表
      getNewList () {
        this.list = this.justList;
        if (this.cmuStr.softwareNo) {
          this.list = this.list.filter(item => item.cmuSoftwareNo === this.cmuStr.softwareNo);
        }
        if (this.bmuStr.softwareNo) {
          this.list = this.list.filter(item => item.bmuSoftwareNo === this.bmuStr.softwareNo);
        }
        if (this.hvmStr.softwareNo) {
          this.list = this.list.filter(item => item.hvmSoftwareNo === this.hvmStr.softwareNo);
        }
      },
      // 关闭选择软件弹出框
      cancelWareModal () {
        this.wareModal = false;
      },
      tboxChange (val) {
          if (!this.projectId || this.projectId < 1) {
            this.$message({
              message: '请先选择项目',
              type: 'warning'
            });
            return;
          }
          this.errorShow = false;
        this.multipleSelection = val;
      },
      async _validate () {
        this.chooseIds = [];
        if (!this.multipleSelection || this.multipleSelection.length < 1) {
          this.$message({
            message: '需至少选择一个终端',
            type: 'error'
          });
          return;
        }
        if (!this.bmuSoftwareNo && !this.cmuSoftwareNo && !this.hvmSoftwareNo) {
          this.$message({
            message: '需至少选择一个软件',
            type: 'error'
          });
          return;
        }
        this.btn01 = false;
        this.multipleSelection.forEach(row => {
          this.chooseIds.push(row.id);
        });
        this.TASKMODAL_INFO({show: true, type: 1, status: 1, ids: this.chooseIds, cmu: this.cmuSoftwareNo, bmu: this.bmuSoftwareNo, hvm: this.hvmSoftwareNo, projectId: this.projectId, taskId: 0, ware: ''}); // status 1开始 2进行 3结束
        this.btn01 = true;
      },
      // --------------------- 查项目 ---------------------------
      async searchPList () {
        let result = await projectList({pageNum: 1, pageSize: 50});
        this.projectLists = result.data && result.data.content || [];
      },
      findByProjectId () {
        this.searchTbox.projectId = this.projectId;
        this._getList();
      }
    },
    filters: {
      // 刷新状态
      statusType (value) {
        switch (value) {
          case 0:
            return '未激活';
          case 1:
            return '已激活';
        }
      },
      tboxStatus (value) {
        switch (value) {
          case 0:
            return '离线';
          case 1:
            return '在线';
        }
      }
    }
  };
</script>
