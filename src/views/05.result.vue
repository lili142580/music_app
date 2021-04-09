<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{$route.query.q}}</h2>
      <span class="sub-title">找到{{count}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row"  v-for="(item,index) in List" :key="index" @click="PlayMusci(item.id)" >
              <td>{{index+1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv" v-if="item.mvid!=0"></span>
                  </div>
                  <span v-if="item.alias.length!=0">{{item.alias[0]}}</span>
                </div>
              </td>
              <td>{{item.artists[0].name}}</td>
              <td>{{item.album.name}}</td>
              <td>{{item.duration}}</td>
            </tr>

          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item1,index1) in songList" :key="index1" @click="toPlaylist(item1.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item1.playCount}}</span>
              </div>
              <img :src="item1.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item1.name}}</p>
          </div>
        
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item3,index3) in mvList" :key="index3" @click="toMv(item3.id)" >
            <div class="img-wrap">
              <img :src="item3.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item3.playCount}}</div>
              </div>
              <span class="time">{{item3.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item3.name}}</div>
              <div class="singer">{{item3.artistName}}</div>
            </div>
          </div>
        
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getPlayMusicData} from '../nextwork/newsong'
import {getSearchData} from '../nextwork/result'
export default {
  name: 'result',
  data() {
    return {
      activeIndex: 'songs',

      List:[],
      songList:[],
      mvList:[],
      count:0,
      type:1
 
    };
  },
  updated(){
          //this.getSearchList()
  },
  created(){
        this.getSearchList()
  },
  //利用监听器进行判断
  watch:{
      activeIndex(){
          switch (this.activeIndex) {
            case 'songs':
               this.type=1
              break;
              case 'lists':
               this.type=1000
              
              break;
              case 'mv':
               this.type=1004
              break;
          
            default:
              break;
          }
          this.getSearchList()
      }

  },
  methods:{
    //获取数据
    getSearchList(){
      const keywords =this.$route.query.q
      const type = this.type
      getSearchData(keywords,type).then(res=>{
        if(type == 1){
          this.count = res.result.songCount
         this.List = res.result.songs
          for(let i = 0; i<this.List.length;i++){
          let duration = this.List[i].duration
          let min = parseInt(duration / 1000 / 60)
          if(min <10){
            min = '0'+min
          }
          let sec = parseInt((duration / 1000 )% 60)
          if(sec <10){
            sec = '0'+sec
          }
       
          this.List[i].duration = `${min}:${sec}`
        }
      
        }else if(type == 1000){
          this.songList =res.result.playlists
          this.count = res.result.playlistCount
           for( let i =0;i<this.songList.length;i++){
            if(this.songList[i].playCount>100000){
              this.songList[i].playCount =parseInt(this.songList[i].playCount/10000) + '万'
            }
          }
          
        }else{
          this.mvList = res.result.mvs
          this.count = res.result.mvCount
          console.log(this.mvList);
       
           for( let i =0;i<this.mvList.length;i++){
            if(this.mvList[i].playCount>100000){
              this.mvList[i].playCount =parseInt(this.mvList[i].playCount/10000) + '万'
            }
          }
           for(let i = 0; i<this.mvList.length;i++){
          let duration = this.mvList[i].duration
          let min = parseInt(duration / 1000 / 60)
          if(min <10){
            min = '0'+min
          }
          let sec = parseInt((duration / 1000 )% 60)
          if(sec <10){
            sec = '0'+sec
          }
       
          this.mvList[i].duration = `${min}:${sec}`
        }
        }
       
      })
    },
     PlayMusci(id){
      // 这个需要加个判断 有些音乐播放不了
         getPlayMusicData(id).then(res=>{ 
              //获取到歌的url地址   
                const url = res.data[0].url
                 //将数据存储到通过Vuex传过去
                   this.$store.commit('PlayMusic',url)
                    })
      
    },
    toPlaylist(id){
        
        this.$router.push('/playlist?q='+id)
    },
    toMv(id){
           this.$router.push('/mv?q='+id)
    }
  }
};
</script>

<style >

</style>
