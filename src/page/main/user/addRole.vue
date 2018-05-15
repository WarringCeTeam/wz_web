/**
 * 描述：角色新增
 */
<style lang="scss" scoped>

</style>
<template>
    <div class="content">
        <div class="content-title">
          角色管理 - {{title}}
            <div class="content-btn">
                <el-button type="primary" class="cicle" @click="validate()" :disabled="!btn01">确定</el-button>
                <el-button class="hy-default-btn" v-go-back>取消</el-button>
            </div>
        </div>
        <div class="content-body">
            <el-form label-position="right" :model="addInfo" ref="addInfo" label-width="120px" :rules="rules">
                <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                    <el-col :span="15">
                        <el-form-item label="角色名称：" prop="name" required>
                            <el-input v-model.trim="addInfo.name" placeholder="请输入角色名称" :maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                  <el-col :span="15">
                    <el-form-item label="角色编码：" prop="code" required>
                      <el-input v-model.trim="addInfo.code" placeholder="请输入角色编码" :maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                  <el-col :span="15">
                    <el-form-item label="备注：" prop="remark">
                      <el-input type="textarea" :row="3" v-model.trim="addInfo.remark" placeholder="请输入备注" :maxlength="300"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
  import { roleList, addRole, roleUpdate } from '@/service/user/roleService';

    export default {
        data () {
            return {
                title: '新增',
                addInfo: {},
                btn01: true, // 点击一次
                rules: {
                  name: [
                    {required: true, message: '请输入角色名称', trigger: 'blur'}
                  ],
                  code: [
                    {required: true, message: '请输入角色编码', trigger: 'blur'}
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
                let result = await roleList(res);
                this.addInfo = result.data.content[0];
                console.log(this.addInfo);
              }
            },
            // 提交
            async save () {
                try {
                    this.btn01 = false;
                    let result;
                    if (this.addInfo.id) {
                        result = await roleUpdate({id: this.addInfo.id}, this.addInfo);
                    } else {
                      result = await addRole(this.addInfo);
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
            back () {
              window.history.back(-1);
            },
            validate () {
                this.$refs.addInfo.validate((valid) => {
                    console.log(valid);
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
