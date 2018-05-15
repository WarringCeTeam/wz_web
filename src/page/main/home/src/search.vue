/**
* 描述：首页搜索
*/
<style lang="scss" scoped>
  .hy-search-button {
    border-radius: 18px;
  }
</style>
<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <el-select v-model="searchData.chooseSelect" @change="handlerChange" clearable class="cicle" placeholder="请选择">
        <el-option label="车牌号" value="1"></el-option>
        <el-option label="停车场" value="2"></el-option>
      </el-select>
    </el-col>
    <el-col :span="10">
      <el-select v-model="searchData.modelSearch" clearable class="cicle" filterable :placeholder="`请输入${placeholder}`">
        <el-option
          v-for="item in modelList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" class="hy-search-button" icon="search" @click="search">搜索</el-button>
    </el-col>
  </el-row>
</template>
<script>
  import { mapState } from 'vuex';
  import { parkAll } from '@/service/home/homeService';

  export default {
    name: 'hySearch',
    data () {
      return {
        searchData: {
          chooseSelect: '1',
          modelSearch: ''
        },
        parkAllList: [],
        placeholder: '车牌号'
      };
    },
    created () {
      // 获取所有停车场
      this._getParkAll();
    },
    computed: {
      ...mapState([
        'carList'
      ]),
      modelList: {
        get: function () {
          if (this.searchData.chooseSelect === '1') {
            let temp = [];
            this.carList.forEach(item => {
              temp.push({
                id: item.id,
                name: item.license
              });
            });
            return temp;
          } else {
            return this.parkAllList;
          }
        }
      }
    },
    methods: {
      async _getParkAll () {
        let result = await parkAll();
        this.parkAllList = result.data;
      },
      // 搜索
      search () {
        this.$emit('search', this.searchData);
      },
      // select变化
      handlerChange (val) {
        switch (val) {
          case '2':                             //  停车场
            this.placeholder = '停车场';
            break;
          case '1':                             //  车牌号
            this.placeholder = '车牌号';
            break;
        }
        this.searchData.modelSearch = '';
      }
    }
  };
</script>
