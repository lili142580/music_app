<template>
      <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in song" :key="index" @click="PlayMusic(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import {getSongData,getPlayMusicData} from '../../nextwork/newsong'
export default {
    name:'newsong',
    data(){
        return {
          //最新音乐数据
            song:[]
        }
    },
     created(){
       //在该生命周期钩子函数中调用
          this.getSongList()
          
    },
    methods:{
      //获取最新音乐
          getSongList(){
               getSongData().then(res=>{
                   this.song = res.result
                 
               })
           },
           //根据歌手id获取播放地址
           PlayMusic(id){
               getPlayMusicData(id).then(res=>{ 
              //获取到歌的url地址
                const url = res.data[0].url
                 //将数据存储到通过Vuex传过去
                   this.$store.commit('PlayMusic',url)
               })
           }
    }
}
</script>
<style scoped>

</style>