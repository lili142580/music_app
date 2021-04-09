<template>
<div class="recommend"> 
      <h3 class="title">
        推荐歌单
      </h3>
 <div class="items">
   <div class="item" v-for="(item,index) in List" :key="index" @click="toPlayMusic(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>
        </div>
          </div>
</template>
<script>
import { getPRoedData} from '../../nextwork/personalized'
export default {
    name:'proed',
    data(){
        return{
            List:[]
        }
    },
    created(){
          this.getProedList()
    },
    methods:{
           getProedList(){
               getPRoedData().then(res=>{
                   this.List = res.result
                   
               })
           },
           toPlayMusic(id){
           this.$router.push('/playlist?q='+id)
           }
    }
}
</script>
<style scoped>

</style>