<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
     <banner/>
    <!-- 推荐歌单 -->    
       <proed/>    
    <!-- 最新音乐 -->
    <newsong/>
    <!-- 推荐MV -->
   <new-mv/>
  </div>
</template>

<script>
import newMv from './discoveryChildren/newMv'
import proed from './discoveryChildren/proed'
import banner from './discoveryChildren/banner'
import newsong from './discoveryChildren/newsong'
export default {
  name: 'discovery',
  components:{
     banner,
     proed,
     newsong,
     newMv
  }
};
</script>

<style >

</style>
