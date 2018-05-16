/**
* 描述：首页
*/
<style lang="scss" scoped>
  #container{
    height: 100%;
    margin: 0px;
  }
</style>
<template>
  <div style="background: #fff; width:100%; height:100%;">
    <div id="container" tabindex="0"></div>
  </div>
</template>
<script>
  import AMap from 'AMap';
   export default {
    data () {
      return {
        map: null
      };
    },
     mounted () {
      this.getList();
    },
    methods: {
      getList () {
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 10,
          center: [116.480983, 40.0958]
        });
      }
    }
  };
</script>
