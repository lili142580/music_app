<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item " v-for="(item1,index) in tag" :key="index"   :class="{active:currentIndex ===index}"  @click="btn(index,item1.id)">{{item1.name}}</span>

    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row"  v-for="(item,index) in songList" :key="index" @click="playmusic(item.id)">
          <td>{{index+1}}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{item.name}}</span>
                <span class="iconfont icon-mv" v-if="item.mvid!=0"></span>
              </div>
              <span>{{item.album.name}}</span>
            </div>
          </td>
          <td>{{item.album.artists[0].name}}</td>
          <td>{{item.album.name}}</td>
          <td>{{item.duration}}</td>
        </tr>
       
      </tbody>
    </table>
  </div>
</template>

<script>
import {getTopSongData} from '../nextwork/topsong'
import {getPlayMusicData} from '../nextwork/newsong'
export default {
  name: 'songs',
  data() {
    return {
      type:0,
      currentIndex:0,
        // 歌曲数据
            songList:[],
            //导航栏
            tag:[
              {
                name:'全部',
                id:0
              },
               {
                name:'华语',
                id:7
              },
               {
                name:'欧美',
                id:96
              },
               {
                name:'日本',
                id:8
              },
               {
                name:'韩国',
                id:16
              },
            ]
    }
  },
  created(){
        this.getTopSongList()
  },
  methods:{
    getTopSongList(){
      getTopSongData(this.type).then(res=>{
        this.songList = res.data
        console.log(this.songList);
        //把时间转换为分秒
        for(let i = 0; i<this.songList.length;i++){
          let duration = this.songList[i].duration
          let min = parseInt(duration / 1000 / 60)
          if(min <10){
            min = '0'+min
          }
          let sec = parseInt((duration / 1000 )% 60)
          if(sec <10){
            sec = '0'+sec
          }
       
          this.songList[i].duration = `${min}:${sec}`
        }
      
      })
    },
    playmusic(id){ 

      // 这个需要加个判断 有些音乐播放不了
         getPlayMusicData(id).then(res=>{
          
              //获取到歌的url地址
             
                const url = res.data[0].url
                 //将数据存储到通过Vuex传过去
                   this.$store.commit('PlayMusic',url)
                    })
      
    },
    btn(index,id){
      this.currentIndex =index;
  
      this.type =id
      this.getTopSongList()
      
    }
  }
};
</script>

<style >

</style>
