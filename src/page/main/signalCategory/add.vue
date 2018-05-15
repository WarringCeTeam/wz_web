/**
 * 描述：信号新增修改
 */
<style lang="scss" scoped>

</style>
<template>
    <div class="content">
        <div class="content-title">
          信号管理 - {{title}}
            <div class="content-btn">
                <el-button type="primary" class="cicle" @click="validate()" :disabled="!btn01">确定</el-button>
                <el-button class="hy-default-btn" v-go-back>取消</el-button>
            </div>
        </div>
        <div class="content-body">
            <el-form label-position="right" :model="addInfo" ref="addInfo" label-width="120px" :rules="rules">
                <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                    <el-col :span="15">
                        <el-form-item label="类名：" prop="name" required>
                            <el-input v-model.trim="addInfo.name" placeholder="请输入类名" :maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--<el-row :gutter="20" type="flex" class="row-bg" justify="center">
                  <el-col :span="15">
                    <el-form-item label="序号：" prop="serialNumber" required>
                      <el-input type="number" v-model.trim="addInfo.serialNumber" placeholder="请输入序号" :maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>-->
            </el-form>
        </div>
    </div>
</template>
<script>
  import { getSignalCategoryList, createSignalCategory, updateSignalCategory } from '@/service/signal/signalCategoryService';

    export default {
        data () {
            return {
                signalList: [],
                title: '新增',
                addInfo: {},
                btn01: true, // 点击一次
                rules: {
                  name: [
                    {required: true, message: '请输入类名', trigger: 'blur'}
                  ],
                  serialNumber: [
                    {required: true, message: '请输入序号', trigger: 'blur'},
                    {pattern: /^[1-9]+$/, message: '只能输入正整数', trigger: 'blur'}
                  ]
                }
            };
        },
        created () {
            this.init();
        },
        methods: {
            async init () {
              let res = this.$route.query;
              if (res.id) {
                this.title = '编辑';
                let result = await getSignalCategoryList(res);
                this.addInfo = result.data.content[0];
              }
            },
            // 提交
            async save () {
                try {
                    this.btn01 = false;
                    let result;
                    if (this.addInfo.id) {
                      result = await updateSignalCategory(this.addInfo);
                    } else {
                      console.log(this.addInfo);
                      result = await createSignalCategory(this.addInfo);
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
                    this.btn01 = true;
                }
            },
            // 查询信号名称
//            async _getSignalList () {
//              let result = await getSignalList({pageNum: 1, pageSize: 100});
//              this.signalList = result.data && result.data.content || [];
//            },
            back () {
              window.history.back(-1);
            },
            validate () {
                this.$refs.addInfo.validate((valid) => {
                    if (valid) {
                    this.save();
                } else {
                    return false;
                }
              });
            }
        }
    };
</script>
