<template>
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
</template>
<script>
import { getBannerData} from '../../nextwork/banner'
export default {
    name:'banner',
    data(){
        return{
            banners:[]
        }
    },
    created(){
          this.getBannerList()
    },
    methods:{
        //获取轮播图数据
           getBannerList(){
               getBannerData().then(res=>{
                   this.banners = res.banners
                
               })
           }
    }
}
</script>
<style scoped>

</style>