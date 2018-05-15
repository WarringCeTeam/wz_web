/**
* 描述：软件管理新增
*/
<style lang="scss" scoped>
  .mb20{
    margin-bottom: 20px;
  }
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
  .pSpan{
    width: 60px !important;
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
</style>
<template>
  <div class="content">
    <div class="content-title">
      软件管理 - {{title}}
      <div class="content-btn">
        <el-button type="primary" class="cicle" @click="validate()">确定</el-button>
        <el-button class="hy-default-btn" v-go-back>取消</el-button>
      </div>
    </div>
    <div class="content-body">
      <el-form label-position="right" :model="addInfo" ref="addInfo" label-width="140px" :rules="rules">
        <el-row :gutter="20" type="flex" class="row-bg" justify="center">
          <el-col :span="7"  class="mb20">
            <el-upload
              class="upload-demo"
              drag
              action="/api/file/software"
              :on-error="uploadError"
              :on-success="uploadSuccess"
              :before-upload="beforeUpload"
              :multiple="false"
              :show-file-list="false">
              <i class="el-icon-upload" v-if="!fileName"></i>
              <div class="el-upload__text" v-if="!fileName && !tip"><b style="color:red;font-size: medium">* </b> 将文件拖到此处，或<em>点击上传(最大5M)</em></div>
              <div class="file_success animation animation03" v-if="fileName"><hy-handler type="xiaoLian" :size="40" class="iconOk"></hy-handler>上传成功！</div>
              <div class="el-upload__text" v-if="tip">文件上传中，请稍等……</div>
              <div style="margin-top:15px;color:#666;" class="animation animation02" v-if="fileName">文件名称： {{fileName}}</div>
              <div style="margin-top:15px;color:#666;" class="animation animation01" v-if="fileSize">文件大小： {{fileSize}}Kb</div>
              <div style="margin-top:15px;color:red;" v-show="flieIsShow && !fileName">请上传文件</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="状态：" prop="status">
              {{addInfo.status | statusType2}}
             </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="软件名称：" prop="name" required>
              <el-input v-model.trim="addInfo.name" placeholder="请输入软件名称" :maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="类型：" prop="type" required>
              <el-select v-model="addInfo.type"  placeholder="类型" >
                <el-option :label="item.name" :value="+item.id" :key="+item.id" v-for="item in typeList"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="软件号：" prop="softwareNo" required>
              <el-input v-model.trim="addInfo.softwareNo" placeholder="请输入软件号(数字、字母、下划线)" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="项目：" prop="projectId">
              <el-select v-model="addInfo.projectId"  placeholder="项目" >
                <el-option :label="item.projectName" :value="+item.id" :key="+item.id" v-for="item in projectLists"></el-option>
              </el-select>
               <!-- <el-autocomplete v-model="project" :fetch-suggestions="querySearchAsync" placeholder="请输入项目名称选择" @select="handleSelect"
              ></el-autocomplete>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CRC校验：" prop="crc" required>
              <el-input v-model.trim="addInfo.crc" placeholder="请输入校验" @change="toUp"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="兼容硬件号：" prop="softwareCompatibleHardwareNo">
              <el-input v-model.trim="addInfo.softwareCompatibleHardwareNo" placeholder="请输入软件兼容硬件号" :maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="兼容项目号：" prop="softwareCompatibleProjectNo">
              <el-input v-model.trim="addInfo.softwareCompatibleProjectNo" placeholder="请输入软件兼容项目号" :maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark">
              <el-input type="textarea" v-model.trim="addInfo.remark" placeholder="请输入备注" :rows="3" :maxlength="500"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { addWare } from '@/service/ware/wareService';
  import { projectList } from '@/service/project/projectService';
  import hyHandler from '@/components/handler/handler';

  export default {
    data () {
      return {
        title: '新增',
        addInfo: {
          type: 1,
          projectId: ''
        },
        typeList: [],
        directory: '',
        importFileUrl: '',
        fileMassage: false,
        project: '',
        fileSize: '',
        fileName: '',
        projectLists: [],
        timeout: null,
        tip: false, // 提示上传中
        btn01: true, // 点击一次
        flieIsShow: false,
        rules: {
          name: [
            {required: true, message: '请输入软件名称', trigger: 'blur'}
          ],
          softwareNo: [
            {required: true, message: '请输入软件号', trigger: 'blur'},
            {pattern: /^\w+$/, message: '只能输入数字和字母、下划线', trigger: 'blur'}
          ],
          softwareProjectNo: [
            {required: true, message: '请输入软件项目号', trigger: 'blur'},
            {pattern: /^\w+$/, message: '只能输入数字和字母、下划线', trigger: 'blur'}
          ],
          crc: [
            {required: true, message: '请输入crc校验', trigger: 'blur'}
          ],
          projectId: [
            {required: true, type: 'number', message: '请选择项目', trigger: 'change'}
          ]
        }
      };
    },
    components: {
      hyHandler
    },
    created () {
      this.typeList = [{id: 1, name: 'BMU'}, {id: 2, name: 'HVM'}, {id: 3, name: 'CMU'}];
      this.statusList = [{id: 0, name: '未激活'}, {id: 1, name: '激活'}];
      this.searchPList();
      this.addInfo.type = 1;
      this.init();
      this.importFileUrl = 'api/file/software';
    },
    methods: {
      async init () {
        let res = this.$route.query;
        if (res.id) {
          this.title = '编辑';
          this.addInfo.projectId = this.addInfo.project.id;
        } else {
          this.addInfo.status = 0;
        }
      },
      back () {
        window.history.back(-1);
      },
      // 转换成大写字母
      toUp () {
          this.addInfo.crc = this.addInfo.crc.toUpperCase();
      },
      validate () {
        if (!this.addInfo.fileId) {
          this.flieIsShow = true;
        } else {
          this.flieIsShow = false;
        }
        this.$refs.addInfo.validate((valid) => {
          if (valid) {
            this.save();
          } else {
            return false;
          }
        });
      },
      // 提交
      async save () {
        try {
          if (!this.addInfo.fileId) {
                this.fileMassage = true;
                this.$message({
                  message: '请上传文件！',
                  type: 'error'
                });
                return;
            }
          // this.addInfo.status = this.selectStatus;
          // this.addInfo.type = this.selectType;
          let result;
          this.btn01 = false;
          this.addInfo.operatorUserId = 1;
          if (this.addInfo.id) {
          } else {
            result = await addWare(this.addInfo);
          }
          this.$message({
            message: result.message,
            type: 'success'
          });
          this.btn01 = true;
          this.back();
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      },
      // --------------------- 项目下拉搜索框部分 ---------------------------
      async searchPList () {
        let result = await projectList({pageNum: 1, pageSize: 50});
        this.projectLists = result.data && result.data.content || [];
      },
   /*   async querySearchAsync (queryString, cb) {
        let result = await projectList({pageNum: 1, pageSize: 50});
        this.pLists = result.data && result.data.content || [];
        for (let i of this.pLists) {
          i.value = i.projectName;
        }
        let results = queryString ? this.pLists.filter(this.createStateFilter(queryString)) : this.pLists;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 300 * Math.random());
      },
      createStateFilter (queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect (item) {
        this.project = item.value;
        this.addInfo.projectId = item.id;
      }, */
      // --------------------- 文件上传部分 ---------------------------
      // 上传前
      beforeUpload (file) {
        let size = file.size / 1024 / 1024; // M
        console.log('文件大小：' + size + 'M');
        if (size > 5) {
          this.$message({
            message: '文件大小不能超过5M！',
            type: 'error'
          });
          return false;
        }
        this.tip = true;
      },
      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        this.$message({
          message: response.message,
          type: 'success'
        });
        this.tip = false;
        this.addInfo.fileId = response.data.id;
        this.fileSize = Math.round(file.size / 1024);
        this.fileName = file.name;
      },
      // 上传错误
      uploadError (response, file, fileList) {
        this.$message({
          message: response.message,
          type: 'error'
        });
      }
    }
  };
</script>
