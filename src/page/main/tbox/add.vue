/**
 * 描述：TBOX管理新增
 */
<style lang="scss" scoped>
  .clear{
    clear: both;
    zoom: 1;
  }
</style>
<template>
    <div class="content">
        <div class="content-title">
          终端管理 - {{title}}
            <div class="content-btn">
                <el-button type="primary" class="cicle" @click="validate()" :disabled="!btn01">确定</el-button>
                <el-button class="hy-default-btn" v-go-back>取消</el-button>
            </div>
        </div>
        <div class="content-body">
            <el-form label-position="right" :model="addInfo" ref="addInfo" label-width="120px" :rules="rules">
                <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                    <el-col :span="12" >
                        <el-form-item label="终端编号：" prop="tboxSn" required>
                            <el-input v-model.trim="addInfo.tboxSn" placeholder="请输入终端编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
              <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                <el-col :span="12">
                  <el-form-item label="型号：" prop="modelNo" required>
                    <el-input v-model.trim="addInfo.modelNo" placeholder="请输入型号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                <el-col :span="12">
                  <el-form-item label="VIN码：" prop="vin" required>
                    <el-input v-model.trim="addInfo.vin" placeholder="请输入VIN码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                <el-col :span="12">
                  <el-form-item label="项目：" prop="projectId" required>
                    <el-select v-model="pid"  placeholder="项目" @change="chooseP">
                      <el-option :label="item.projectName" :value="item.id" :key="item.id" v-for="item in projectLists"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
  import { addTBox, tBoxUpdate, tBoxDetail } from '@/service/tbox/tboxService';
  import { projectList } from '@/service/project/projectService';

    export default {
        data () {
            return {
                choose: false,
                title: '新增',
                addInfo: {},
                statusList: [],
                pid: '',
                projectLists: [],
                btn01: true, // 点击一次
                rules: {
                  tboxSn: [
                    {required: true, message: '请输入Tbox编号', trigger: 'blur'},
                    {pattern: /^[A-Za-z0-9]+$/, message: '只能输入数字和字母！', trigger: 'blur'}
                  ],
                  modelNo: [
                    {required: true, message: '请输入型号', trigger: 'blur'}
                  ],
                  vin: [
                    {required: true, message: '请输入VIN码', trigger: 'blur'}
                  ],
                  projectId: [
                    {required: true, type: 'number', message: '请选择项目', trigger: 'change'}
                  ]
                }
            };
        },
      created () {
          this.statusList = [{id: 0, name: '离线'}, {id: 1, name: '在线'}];
          this.init();
          this.searchPList();
      },
        methods: {
            async init () {
              let res = this.$route.query;
              if (res.id) {
                this.title = '编辑';
                let result = await tBoxDetail(res);
                this.addInfo = result.data;
                this.pid = this.addInfo.project.id;
                console.log(this.addInfo);
                console.log(this.projectLists);
              }
            },
            back () {
                window.history.back(-1);
            },
            chooseP () {
                this.addInfo.projectId = this.pid;
            },
            validate () {
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
                  this.btn01 = false;
                  let result;
                  if (this.addInfo.id) {
                    result = await tBoxUpdate({id: this.addInfo.id}, this.addInfo);
                  } else {
                    result = await addTBox(this.addInfo);
                  }
                    this.$message({
                        message: result.message,
                        type: 'success'
                    });
                    this.back();
                  this.btn01 = true;
                } catch (e) {
                    this.$message({
                        message: e,
                        type: 'error'
                    });
                  this.btn01 = true;
                }
            },
          // --------------------- 项目下拉搜索框部分 ---------------------------
          async searchPList () {
            let result = await projectList({pageNum: 1, pageSize: 50});
            this.projectLists = result.data && result.data.content || [];
          }
        }
    };
</script>
