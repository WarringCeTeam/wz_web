/**
 * 描述：员工新增
 */
<style lang="scss" scoped>

</style>
<template>
    <div class="content">
        <div class="content-title">
          员工管理 - {{title}}
            <div class="content-btn">
                <el-button type="primary" class="cicle" @click="validate()" :disabled="!btn01">确定</el-button>
                <el-button class="hy-default-btn" v-go-back>取消</el-button>
            </div>
        </div>
        <div class="content-body">
            <el-form label-position="right" :model="addInfo" ref="addInfo" label-width="120px" :rules="rules">
                <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                    <el-col :span="15">
                        <el-form-item label="用户名：" prop="username" required>
                            <el-input v-model.trim="addInfo.username" :disabled="addInfo.id > 0" placeholder="请输入用户名" :maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" justify="center" v-if="!addInfo.id">
                  <el-col :span="15">
                    <el-form-item label="密码：" prop="password" required>
                      <el-input v-model.trim="addInfo.password" type="password" placeholder="请输入密码" :maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" justify="center" v-if="!addInfo.id">
                  <el-col :span="15">
                    <el-form-item label="确认密码：" prop="checkPassword" required>
                      <el-input v-model.trim="addInfo.checkPassword" type="password" placeholder="请再次输入密码" :maxlength="20" @blur="passwordCheck"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                  <el-col :span="15">
                    <el-form-item label="名称：" prop="name" required>
                      <el-input v-model.trim="addInfo.name" placeholder="请输入姓名" :maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                  <el-col :span="15">
                    <el-form-item label="邮箱：" prop="email" required>
                      <el-input v-model.trim="addInfo.email" placeholder="请输入邮箱" :maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                  <el-col :span="15">
                    <el-form-item label="电话：" prop="phone" required>
                      <el-input v-model.trim="addInfo.phone" placeholder="请输入电话" :maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
  import md5 from 'js-md5';
  import { userList, addUser, UserUpdate } from '@/service/user/userService';

    export default {
        data () {
            return {
                title: '新增',
                addInfo: {},
                btn01: true, // 点击一次
                rules: {
                  username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {pattern: /^\w+$/, message: '只能输入数字和字母、下划线', trigger: 'blur'}
                  ],
                  password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {pattern: /^(\w+){6,}$/, message: '只能输入数字和字母、下划线,最少6位', trigger: 'blur'}
                  ],
                  checkPassword: [
                    {required: true, message: '请确认密码', trigger: 'blur'},
                    {pattern: /^(\w+){6,}$/, message: '只能输入数字和字母、下划线,最少6位', trigger: 'blur'}
                  ],
                  name: [
                    {required: true, message: '请输入名称', trigger: 'blur'}
                  ],
                  email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                    {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确', trigger: 'blur'}
                  ],
                  phone: [
                    {required: true, message: '请输入电话', trigger: 'blur'},
                    {pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur'}
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
                let result = await userList(res);
                this.addInfo = result.data.content[0];
                console.log(this.addInfo);
              }
            },
            // 提交
            async save () {
                try {
                    if (this.addInfo.checkPassword !== this.addInfo.password) {
                      this.$message({
                        message: '两次密码输入不一致',
                        type: 'warning'
                      });
                      return;
                    }
                    this.btn01 = false;
                    let result;
                    if (this.addInfo.id) {
                        result = await UserUpdate({id: this.addInfo.id}, this.addInfo);
                    } else {
                      let newAddInfo = {
                        ...this.addInfo
                      };
                      newAddInfo.password = md5(this.addInfo.password);
                      result = await addUser(newAddInfo);
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
            passwordCheck () {
                if (this.addInfo.password == null || this.addInfo.password === '') {
                  if (this.addInfo.checkPassword != null && this.addInfo.checkPassword !== '') {
                    this.$message({
                      message: '请先输入密码',
                      type: 'warning'
                    });
                  }
                } else {
                  if (this.addInfo.checkPassword !== this.addInfo.password) {
                    if (this.addInfo.checkPassword != null && this.addInfo.checkPassword !== '') {
                      this.$message({
                        message: '两次密码输入不一致',
                        type: 'warning'
                      });
                    }
                  }
                }
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
