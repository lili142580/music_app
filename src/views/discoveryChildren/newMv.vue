<template>
     <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in MvList" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt=""   @click="tomv(item.id)"/>
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { getMvData } from '../../nextwork/newMV'
export default {
    name:'newMv',
    data(){
         return{
             //推荐Mv数据
            MvList:[]
         }
    },
    created(){
           this.getMvList()
    },
    methods:{
        //获取mv数据
        getMvList(){
            getMvData().then(res=>{
                this.MvList =res.result
               
            })
        },
        tomv(id){
          this.$router.push('/mv?q='+id)
        }
          
    }
}
</script>
<style scoped>

</style>