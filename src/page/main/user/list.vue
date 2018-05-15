/**
* 描述：员工管理
*/
<style lang="scss" scoped>

</style>
<template>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="员工管理" name="first">
          <div class="hy-search-bar">
            <el-row :gutter="20">
              <el-col :span="4">
                <el-input v-model.trim="searchData.name" class="hy-search-input" placeholder="名称"></el-input>
              </el-col>
              <el-col :span="4">
                <el-input v-model.trim="searchData.username" class="hy-search-input" placeholder="用户名"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" class="hy-search-button" icon="search" @click="search">搜索</el-button>
                <!--<el-button type="primary" class="hy-search-button" icon="search" @click="diagnoseAdd">诊断</el-button>-->
              </el-col>
              <el-col :span="12">
                <el-button :plain="true" type="info" @click="add(-1)" class="l_action_btn">
                  <hy-handler type="add" placement="top" tips="新增" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3"></hy-handler>
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table-content">
            <el-table
              :data="list"
              v-loading="loading"
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
                prop="name"
                label="名称"
                show-overflow-tooltip
                align="center">
              </el-table-column>
              <el-table-column
                prop="username"
                label="用户名"
                show-overflow-tooltip
                align="center">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                show-overflow-tooltip
                align="center">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="电话"
                show-overflow-tooltip
                align="center">
              </el-table-column>
              <el-table-column
                label="状态"
                show-overflow-tooltip
                align="center">
                <template scope="scope">
                  {{scope.row.status | userStatus}}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template scope="scope">
                  <hy-handler type="brush_fill" placement="top" tips="修改" bgColor="#fe8a7b" size="14" color="#FFF" hover="rgb(234, 87, 68)" @click="add(scope.row.id)"></hy-handler>
                  <hy-handler type="other" placement="top" tips="详情" bgColor="#f4ea2a" size="14" color="#FFF" hover="rgb(252, 240, 9)" @click="detail(scope.row.id)"></hy-handler>
                  <hy-handler type="password" placement="top" tips="修改密码" bgColor="#9f79ee" size="14" color="#FFF" hover="rgb(155,48,255)" @click="openHandle(scope.row.id)"></hy-handler>
                  <hy-handler type="configure" placement="top" tips="配置角色" bgColor="#5faee3" size="14" color="#FFF" hover="rgb(131, 159, 165)" @click="setRole(scope.row.id, scope.row.name)"></hy-handler>
                  <hy-handler type="lock" v-if="scope.row.status == 1 && scope.row.id != 1" placement="top" tips="冻结" bgColor="#69d610" size="14" color="#FFF" hover="rgb(139, 227, 67)" @click="confirmFreeze(scope.row.id, 1)"></hy-handler>
                  <hy-handler type="toEnable" v-if="scope.row.status == 0 && scope.row.id != 1" placement="top" tips="解冻" bgColor="#69d610" size="14" color="#FFF" hover="rgb(139, 227, 67)" @click="confirmFreeze(scope.row.id, 0)"></hy-handler>
                </template>
              </el-table-column>
            </el-table>

            <el-dialog title="修改密码" :visible.sync="dialogHandle">
              <el-row :gutter="20">
                <el-col :span="3">
                  <span>原密码：</span>
                </el-col>
                <el-col :span="16">
                  <el-input v-model.trim="passwordInfo.oldPassword" placeholder="请输入原密码" :maxlength="11"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="3">
                  <span>新密码：</span>
                </el-col>
                <el-col :span="16">
                  <el-input type="password" v-model.trim="passwordInfo.password" placeholder="请输入新密码" :maxlength="11"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="3">
                  <span>确认新密码：</span>
                </el-col>
                <el-col :span="16">
                  <el-input type="password" v-model.trim="passwordInfo.againPassword" placeholder="确认新密码" :maxlength="11"></el-input>
                </el-col>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogHandle = false">取 消</el-button>
                <el-button type="primary" @click="_handleInfo">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 分页 -->
            <hy-page v-show="pageShow"
                     :current-page="searchData.pageNum"
                     :page-size="searchData.pageSize"
                     :total-element="totalElement"
                     @current-change="currentChange"></hy-page>
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="second">
          <div class="hy-search-bar">
            <el-row :gutter="20">
              <el-col :span="4">
                <el-input v-model.trim="roleSearchData.name" class="hy-search-input" placeholder="角色名称"></el-input>
              </el-col>
              <el-col :span="4">
                <el-input v-model.trim="roleSearchData.code" class="hy-search-input" placeholder="角色编码"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" class="hy-search-button" icon="search" @click="search">搜索</el-button>
              </el-col>
              <el-col :span="12">
                <el-button :plain="true" type="info" @click="add(-1)" class="l_action_btn">
                  <hy-handler type="add" placement="top" tips="新增" bgColor="#006fbc" size="14" color="#FFF" hover="#5faee3"></hy-handler>
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table-content">
            <el-table
              :data="roleList"
              v-loading="loading"
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
                prop="name"
                label="角色名称"
                show-overflow-tooltip
                align="center">
              </el-table-column>
              <el-table-column
                prop="code"
                label="角色编码"
                show-overflow-tooltip
                align="center">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                show-overflow-tooltip
                align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template scope="scope">
                  <hy-handler type="brush_fill" placement="top" tips="修改" bgColor="#fe8a7b" size="14" color="#FFF" hover="rgb(234, 87, 68)" @click="add(scope.row.id)"></hy-handler>
                  <hy-handler type="other" placement="top" tips="详情" bgColor="#f4ea2a" size="14" color="#FFF" hover="rgb(252, 240, 9)" @click="detail(scope.row.id)"></hy-handler>
                  <hy-handler v-if="scope.row.id != 1" type="empty" placement="top" tips="删除" bgColor="#69d610" size="14" color="#FFF" hover="rgb(139, 227, 67)" @click="confirmDel(scope.row.id)"></hy-handler>
                  <hy-handler type="configure" placement="top" tips="配置菜单" bgColor="#5faee3" size="14" color="#FFF" hover="rgb(131, 159, 165)" @click="setMenu(scope.row.id, scope.row.name)"></hy-handler>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <hy-page v-show="pageShowRole"
                     :current-page="roleSearchData.pageNum"
                     :page-size="roleSearchData.pageSize"
                     :total-element="totalElementRole"
                     @current-change="currentChange"></hy-page>
          </div>
        </el-tab-pane>
        <!--<el-tab-pane label="菜单管理" name="third">

        </el-tab-pane>-->
      </el-tabs>
    </div>

</template>
<script>
  import list from '@/js/mixins/list';
  import hyHandler from '@/components/handler/handler';
  import { userList, UserFreeze, UserUnFreeze, UserUpdatePassword } from '@/service/user/userService';
  import { roleList, roleDelete } from '@/service/user/roleService';
  import md5 from 'js-md5';
  import { mapMutations, mapState } from 'vuex';

  export default {
    mixins: [list],
    data () {
      return {
        dialogHandle: false,
        passwordInfo: {},
        passwordConfirm: {},
        operationId: '',
        searchData: {},
        roleList: [],
        roleSearchData: {
          pageNum: this.$store.state.pageNum,              // 当前页码
          pageSize: this.$store.state.pageSize            // 分页大小
        },
        totalElementRole: this.$store.state.totalElement,        // 总数量
        activeName: 'first'
      };
    },
    created () {
      // this.USER_ACTIVE('first');
      this.activeName = this.userActive;
      this.currentChange();
    },
    components: {
      hyHandler
    },
    computed: {
      ...mapState([
        'userActive'
      ])
    },
    methods: {
      ...mapMutations([
        'USER_ACTIVE'
      ]),
      currentChange (val) {
        if (val === 1) val = undefined;
        if (val && val !== 1) this.backData = true;
        this.loading = true;
        this.searchData.pageNum = val;
        if (this.searchData.pageNum === undefined) this.searchData.pageNum = 1;
        this.roleSearchData.pageNum = val;
        // 获取列表
        if (this.activeName === 'first') this._getList();
        if (this.activeName === 'second') this._getRoleList();
      },
      search () {
          console.log(this.userActive);
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
        let result = await userList(this.searchData);
        this.loading = false;
        this.list = result.data && result.data.content || [];
        this.totalElement = result.data.total;
      },
      async _getRoleList () {
        if (sessionStorage) {
          let back = JSON.parse(sessionStorage.getItem('back'));
          if (back) {
            this.roleSearchData = {
              ...back
            };
            sessionStorage.removeItem('back');
          }
        }
        if (this.roleSearchData.pageNum === undefined) this.roleSearchData.pageNum = 1;
        let result = await roleList(this.roleSearchData);
        this.loading = false;
        this.roleList = result.data && result.data.content || [];
        this.totalElementRole = result.data.total;
      },
      // 角色分页是否展示
      pageShowRole () {
        return !!this.totalElementRole;
      },
      handleClick (tab, event) {
        if (tab.label === '员工管理') {
          this._getList();
          this.USER_ACTIVE('first');
        }
        if (tab.label === '角色管理') {
          this._getRoleList();
          this.USER_ACTIVE('second');
        }
        if (tab.label === '菜单管理') {
          this._getList();
          this.USER_ACTIVE('third');
        }
      },
      diagnoseAdd () {
        this.$router.push({path: '/main/diagnose/add'});
      },
      // add
      add (id) {
          // 根据情况 存储查询条件和分页
          if (this.backData) {
            if (this.activeName === 'first') sessionStorage.setItem('back', JSON.stringify(this.searchData));
            if (this.activeName === 'second') sessionStorage.setItem('back', JSON.stringify(this.roleSearchData));
          }
          if (id < 0) {
            if (this.activeName === 'first') this.$router.push({path: '/main/user/add'});
            if (this.activeName === 'second') this.$router.push({path: '/main/user/roleAdd'});
          }
          if (id > -1) {
            if (this.activeName === 'first') this.$router.push({path: '/main/user/add', query: {id: id, pageNum: this.searchData.pageNum, pageSize: this.searchData.pageSize}});
            if (this.activeName === 'second') this.$router.push({path: '/main/user/roleAdd', query: {id: id, pageNum: this.roleSearchData.pageNum, pageSize: this.roleSearchData.pageSize}});
          }
      },
      // detail
      detail (id) {
        // 根据情况 存储查询条件和分页
        if (this.backData) {
          if (this.activeName === 'first') sessionStorage.setItem('back', JSON.stringify(this.searchData));
          if (this.activeName === 'second') sessionStorage.setItem('back', JSON.stringify(this.roleSearchData));
        }
        if (this.activeName === 'first') this.$router.push({path: '/main/user/detail/', query: {id: id, pageNum: this.searchData.pageNum, pageSize: this.searchData.pageSize}});
        if (this.activeName === 'second') this.$router.push({path: '/main/user/roleDetail/', query: {id: id, pageNum: this.roleSearchData.pageNum, pageSize: this.roleSearchData.pageSize}});
      },
      // setRole
      setRole (id, name) {
        // 根据情况 存储查询条件和分页
        if (this.backData) {
            sessionStorage.setItem('back', JSON.stringify(this.searchData));
        }
        this.$router.push({path: '/main/user/setRole/', query: {id: id, name: name}});
      },
      // setMenu
      setMenu (id, name) {
        // 根据情况 存储查询条件和分页
        if (this.backData) {
          sessionStorage.setItem('back', JSON.stringify(this.roleSearchData));
        }
        this.$router.push({path: '/main/user/setMenu/', query: {id: id, name: name}});
      },
      // freeze
      confirmFreeze (id, type) {
        let msg = '';
        if (type === 1) msg = '确定冻结此用户？'; else msg = '确定激活此用户？';
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(this.freeze.bind(this, id, type)).catch(() => {});
      },
      async freeze (id, type) {
        try {
          let result;
          if (type === 1) {
            result = await UserFreeze({id: id});
          } else {
            result = await UserUnFreeze({id: id});
          }
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
      // delete
      confirmDel (id) {
        this.$confirm('是否删除此角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(this.del.bind(this, id)).catch(() => {});
      },
      async del (id) {
        try {
          let result = await roleDelete({id: id});
          this.$message({
            message: result.message,
            type: 'success'
          });
          this.currentChange();
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      },
      // 修改密码
      openHandle (id) {
        this.passwordInfo = {};
        this.operationId = id;
        this.dialogHandle = true;
      },
      async _handleInfo () {
        if (this.passwordInfo.oldPassword == null || this.passwordInfo.oldPassword === '') {
          this.$message({
            message: '请输入原密码',
            type: 'warning'
          });
          return;
        }
        if (this.passwordInfo.password == null || this.passwordInfo.password === '') {
          this.$message({
            message: '请输入新密码',
            type: 'warning'
          });
          return;
        }
        if (this.passwordInfo.againPassword == null || this.passwordInfo.againPassword === '') {
          this.$message({
            message: '请再次输入新密码',
            type: 'warning'
          });
          return;
        }
        if (this.passwordInfo.password !== this.passwordInfo.againPassword) {
          this.$message({
            message: '两次新密码输入不一致',
            type: 'warning'
          });
          return;
        }
        let passwordPattern = /^(\w+){6,}$/;
        if (!passwordPattern.test(this.passwordInfo.password)) {
            this.$message({
              message: '密码只能输入数字和字母、下划线,最少6位',
              type: 'warning'
            });
            return;
        }
        this.passwordConfirm.oldPassword = md5(this.passwordInfo.oldPassword);
        this.passwordConfirm.password = md5(this.passwordInfo.password);
        try {
          let result = await UserUpdatePassword({id: this.operationId}, this.passwordConfirm);
          this._getList();
          this.dialogHandle = false;
          this.$message({
            message: result.message,
            type: 'success'
          });
        } catch (e) {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      }
    },
    filters: {
      userStatus (value) {
        switch (value) {
          case 0:
            return '冻结';
          case 1:
            return '可用';
        }
      }
    }
  };
</script>
