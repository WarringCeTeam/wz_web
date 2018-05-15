/**
* 描述：TBOX管理
*/
<style lang="scss" scoped>
  .file_success{
    color: #13ce66;
    font-size: 20px;
    line-height:60px;
    font-style: normal;
    margin-top:20px;
  i.iconOk{
    font-size: 60px;
    width: 40px;
    display: inline-block;
    height: 40px;
    margin-right:20px !important;
  }
  }
  /*缓慢淡进*/
  .animation{
    opacity:0;
    animation-name: fadeIn;
    animation-duration: 1s;
    animation-fill-mode: forwards ;/**延迟动画**/
  }
  .animation01{
    animation-delay:1.5s;
  }
  .animation02{
    animation-delay:1s;
  }
  .animation03{
    animation-delay:0.5s;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0
    }
    50% {
      opacity: 0.3
    }
    100% {
      opacity: 1
    }
  }
  primary{
    background: blue !important;
  }
  .ccc{
    min-width: 1000px;
    overflow: auto;
  }
</style>
<template>
  <div class="content">
      <div class="content-title">
        终端管理
      </div>
      <div class="hy-search-bar">
        <el-row :gutter="24">
          <!--<el-col :span="4">-->
          <!--<el-input v-model.trim="searchData.tboxSn" class="hy-search-input" placeholder="TBox编号"></el-input>-->
          <!--</el-col>-->
          <el-col :span="3">
            <el-autocomplete class="hy-search-input" :props="{
                            value: 'tboxSn',
                            label: 'tboxSn'
                            }"
                             v-model.trim="searchData.tboxSn"
                             :fetch-suggestions="_querySearchAsync"
                             placeholder="终端编号"
                             @select="handleSelect"
            ></el-autocomplete>
          </el-col>
          <el-col :span="3">
            <el-input v-model.trim="searchData.modelNo" class="hy-search-input" placeholder="型号"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model.trim="searchData.vin" class="hy-search-input" placeholder="VIN码"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="searchData.projectId"  clearable placeholder="项目"  class="cicle">
              <el-option :label="item.projectName" :value="item.id" :key="+item.id" v-for="item in projectLists"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="searchData.status" clearable class="cicle" placeholder="状态">
              <el-option label="离线" :value="0"></el-option>
              <el-option label="在线" :value="1"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" class="hy-search-button" icon="search" @click="search">搜索</el-button>
          </el-col>
          <el-col :span="6">
            <el-button :plain="true" type="info" @click="add(-1)" class="l_action_btn">
              <hy-handler type="add" placement="top" tips="新增" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3"></hy-handler>
            </el-button>
            <el-button :plain="true" type="info" @click="exportTBox()" class="l_action_btn">
              <hy-handler type="export" placement="top" tips="导出" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3"></hy-handler>
            </el-button>
            <el-button :plain="true" type="info" @click="importTBox()" class="l_action_btn">
              <hy-handler type="import" placement="top" tips="导入" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3"></hy-handler>
            </el-button>
            <el-button :plain="true" type="info" @click="diagnoseAdd" class="l_action_btn">
              <hy-handler type="diagnose" placement="top" tips="诊断" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3"></hy-handler>
            </el-button>
            <!--<el-button :plain="true" type="info" @click="rollBack()" class="l_action_btn" :disabled="!btn01">
              <hy-handler type="huigun" placement="top" tips="批量回滚" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3" :disabled="btn01"></hy-handler>
            </el-button>-->
          </el-col>
        </el-row>
      </div>
      <div class="table-content">
        <el-table
          :data="list"
          v-loading="loading"
          :element-loading-text="loadingText"
          style="width: 100%"
          @selection-change="tboxChange"
          class="text-center">
          <!--<el-table-column
            type="selection"
            width="55">
          </el-table-column>-->
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            label="终端编号" prop="tboxSn"
            show-overflow-tooltip
            align="center">
            <template scope="scope">
              <a class="tz" @click="detail(scope.row.id)">{{scope.row.tboxSn}}</a>
            </template>
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
            prop="project.projectName"
            label="项目"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="绑定ECU编号" prop="serialNo"
            show-overflow-tooltip
            align="center">
            <template scope="scope">
              <el-popover
                ref="popover4"
                placement="right"
                width="300"
                trigger="click">
                最新刷新软件号(BMU):  {{ecuInfo.softwareNo}}<span v-show="!ecuInfo.softwareNo">无</span><br>
                最新刷新软件号(CMU):  {{ecuInfo.cmuSoftwareNo}}<span v-show="!ecuInfo.cmuSoftwareNo">无</span><br>
                最新刷新软件号(HVM):  {{ecuInfo.hvmSoftwareNo}}<span v-show="!ecuInfo.hvmSoftwareNo">无</span><br>
              </el-popover>

              <el-button type="text" v-popover:popover4 v-for="bmu in scope.row.bmuModels" v-if="scope.row.bmuModels" @click="showEcu(bmu)">{{bmu.serialNo}}&emsp;</el-button>
              <span v-if="!scope.row.bmuModels" style="color:#92a3c1;">未绑定</span>

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
          <el-table-column label="操作" align="center" width="150">
            <template scope="scope">
              <hy-handler type="brush_fill" placement="top" tips="修改" bgColor="#fe8a7b" size="14" color="#FFF" hover="#666" @click="add(scope.row.id)"></hy-handler>
              <hy-handler type="other" placement="top" tips="详情" bgColor="#f4ea2a" size="14" color="#FFF" hover="#f8c60f" @click="detail(scope.row.id)"></hy-handler>
              <hy-handler type="empty" placement="top" tips="删除" bgColor="#69d610" size="14" color="#FFF" hover="#f8c60f" @click="confirmDel(scope.row.id)"></hy-handler>
              <hy-handler type="createtask_fill" placement="top" tips="日志" bgColor="#ccc" size="14" color="#FFF" hover="#f8c60f" @click="getLog(scope.row.tboxSn)"></hy-handler>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <hy-page v-show="pageShow"
                 :current-page="searchData.pageNum"
                 :page-size="searchData.pageSize"
                 :total-element="totalElement"
                 @current-change="currentChange"
                 @page-sizes="changeSize"></hy-page>
      </div>
    <!-- 弹出层-- 导入T-BOX -->
    <hy-modal :title="`导入T-BOX`" :styles="{width: '666px'}" :transition="this.$store.state.modalTransition" v-model="importModal">
      <el-row :gutter="20" type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-select v-model="uploadData.projectId"  clearable placeholder="选择项目"  class="cicle">
            <el-option :label="item.projectName" :value="item.id" :key="+item.id" v-for="item in projectLists"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" class="row-bg" justify="center" style="margin-top: 15px;">
        <el-col :span="15">
          <el-upload
            class="upload-demo"
            drag
            action="/api/tbox/read"
            :data="uploadData"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            :multiple="false"
            :show-file-list="false">
            <i class="el-icon-upload" v-if="!fileName"></i>
            <div class="el-upload__text" v-if="!fileName"> 将excel文件拖到此处，或<em>点击上传(最大5M)</em></div>
            <div class="el-upload__text" style="color:red;font-size: medium" v-if="errorMessage">{{errorMessage}}</div>
            <div class="file_success animation animation03" v-if="fileName"><hy-handler type="xiaoLian" :size="40" class="iconOk"></hy-handler> &nbsp;导入成功！</div>
            <div style="margin-top:15px;color:#666;" class="animation animation02" v-if="fileName">文件名称： {{fileName}}</div>
            <div style="margin-top:15px;color:#666;" class="animation animation01" v-if="fileSize">文件大小： {{fileSize}}Kb</div>
          </el-upload>
        </el-col>
      </el-row>

      <!--<div style="text-align: right;margin-right:20px;" v-if="fileName">
        <el-button @click="fileName = null;fileSize = null">继续导入</el-button>
      </div>-->
    </hy-modal>
  </div>

</template>
<script>
  import list from '@/js/mixins/list';
  import hyHandler from '@/components/handler/handler';
  import { tBoxList, tBoxDel } from '@/service/tbox/tboxService';
  import { mapMutations } from 'vuex';
  import { projectList } from '@/service/project/projectService';

  export default {
    mixins: [list],
    data () {
      return {
        projectLists: [],
        // orgList: [],
        searchData: {
          tboxSn: '',
          modelNo: '',
          vin: ''
        },
        uploadData: {},
        backData: false,
        btn01: true, // 点击一次
        dataList: [],
        importModal: false,
        fileName: '',
        fileSize: '',
        errorMessage: null,
        searchInput: {
          pageNum: 1,
          pageSize: 50
        },
        ecuInfo: {},
        timeout: null,
        chooseIds: [], // 选中的数组
        multipleSelection: [] // 选中的数据
      };
    },
    components: {
      hyHandler
    },
    created () {
      this.searchPList();
    },
    methods: {
      ...mapMutations([
        'TASKMODAL_INFO'
      ]),
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
        let result = await tBoxList(this.searchData);
        this.loading = false;
        this.list = result.data && result.data.content || [];
        this.totalElement = result.data.total;
      },
      // 下拉输入框搜索
      async _querySearchAsync (queryString, cb) {
        this.searchInput.tboxSn = queryString;
        let result = await tBoxList(this.searchInput);
        cb(result.data.content);
      },
      handleSelect (item) {
        console.log(item);
      },
      // add
      add (id) {
        // 根据情况 存储查询条件和分页
        if (this.backData) sessionStorage.setItem('back', JSON.stringify(this.searchData));
        if (id < 0) this.$router.push({path: '/main/tbox/add'});
        if (id > -1) this.$router.push({path: '/main/tbox/add', query: {id: id, pageNum: this.searchData.pageNum, pageSize: this.searchData.pageSize}});
      },
      exportTBox () {
        let url = '/api/tbox/export?';
        if (this.searchData.tboxSn) {
          url += 'tboxSn=' + this.searchData.tboxSn + '&';
        }
        if (this.searchData.modelNo) {
          url += 'modelNo=' + this.searchData.modelNo + '&';
        }
        if (this.searchData.vin) {
          url += 'vin=' + this.searchData.vin;
        }
        window.location.href = url;
      },
      importTBox () {
        this.importModal = true;
        this.errorMessage = null;
        this.uploadData = {};
        this.fileName = null;
        this.fileSize = null;
      },
      // 上传前
      beforeUpload (file) {
        this.errorMessage = null;
        let size = file.size / 1024 / 1024; // M
        if (size > 5) {
          this.$message({
            message: '文件大小不能超过5M！',
            type: 'error'
          });
          return false;
        }
        if (!this.uploadData.projectId) {
          this.$message({
            message: '请先选择项目！',
            type: 'error'
          });
          return false;
        }
      },
      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        if (response.result) {
          this.$message({
            message: response.message,
            type: 'success'
          });
        } else {
          this.$message({
            message: response.message,
            type: 'error'
          });
        }
        if (response.data) {
          this.fileSize = Math.round(file.size / 1024);
          this.fileName = response.data;
          this._getList();
          setTimeout(() => {
            this.importModal = false;
            this.fileName = null;
            this.fileSize = null;
          }, 3000);
        } else {
          this.errorMessage = response.message;
        }
      },
      // 上传错误
      uploadError (response, file, fileList) {
        this.$message({
          message: response.message,
          type: 'error'
        });
        this.errorMessage = response.message;
      },
      // detail
      detail (id) {
        // 根据情况 存储查询条件和分页
        if (this.backData) sessionStorage.setItem('back', JSON.stringify(this.searchData));
        this.$router.push({path: '/main/tbox/detail/', query: {id: id, pageNum: this.searchData.pageNum, pageSize: this.searchData.pageSize}});
      },
      // 诊断
      diagnoseAdd () {
        // 根据情况 存储查询条件和分页
        if (this.backData) sessionStorage.setItem('back', JSON.stringify(this.searchData));
        this.$router.push({path: '/main/diagnose/add'});
      },
      showEcu (bmu) {
          this.ecuInfo = bmu;
      },
      getLog (tboxSn) {
        // 根据情况 存储查询条件和分页
        if (this.backData) sessionStorage.setItem('back', JSON.stringify(this.searchData));
        this.$router.push({path: '/main/tbox/logList/', query: {tboxSn: tboxSn}});
      },
      // delete
      confirmDel (id) {
        this.$confirm('是否删除此终端设备?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(this.del.bind(this, id)).catch(() => {});
      },
      async del (id) {
        try {
          let result = await tBoxDel({id: id});
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
      tboxChange (val) {
        this.chooseIds = [];
        this.multipleSelection = val;
        this.multipleSelection.forEach(row => {
          this.chooseIds.push(row.tboxSn);
        });
      },
      rollBack () {
        if (this.chooseIds.length < 1) {
          this.$message({
            message: '请至少选择一个再进行此操作！',
            type: 'error'
          });
          return false;
        }
        this.btn01 = false;
        // 給父組件傳值
        this.tboxModal = false;
        this.TASKMODAL_INFO({show: true, type: 3, status: 1, ids: this.chooseIds, ware: this.wareId, taskId: 0}); // status 1开始 2进行 3结束
        this.btn01 = true;
      },
      // --------------------- 查项目 ---------------------------
      async searchPList () {
        let result = await projectList({pageNum: 1, pageSize: 50});
        this.projectLists = result.data && result.data.content || [];
      }
    },
    filters: {
      statusType (value) {
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
