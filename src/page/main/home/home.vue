/**
* 描述：首页
*/
<style lang="scss" scoped>
.l-home{
  padding-top: 100px;
  color: #4e73b4;
  font-size: 50px;
  text-align: center;
  i{
    color: #9999bd;
    font-size: 20px;
    font-style: normal;
  }
  .bg{
    background: #fff;
    width:100%;
    height:100%;
  }
}
</style>
<template>
  <div style="background: #fff; width:100%; height:100%;">
    <transition name="fade">
    <div class="l-home">
      <img src="/static/images/index.png" width="700">
    </div>
    </transition>
  </div>
</template>
<script>
  export default {
  };
</script>
