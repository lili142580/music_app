<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="TopMusic.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{TopMusic.copywriter}}
        </div>
        <div class="info">
          {{TopMusic.description}}
        </div>
      </div>
      <img :src="TopMusic.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item" v-for=" (item,index) in tag" :key="index"  :class="{active:currentIndex===index}" @click="btnclick(item,index)">{{item}}</span>   
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item,index) in MusicList" :key="index" @click="toPlayMusic(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
      
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getMusicData,getPlayMusicData } from '../nextwork/playlists/tags'
export default {
  name: 'recommend',
  data() {
    return {
      offset: 0,
      // 总条数
      total:0,
      // 页码
      page:1,
      //歌曲分类
      cat:'全部',
      //歌曲数据
      MusicList:[],
      //顶部数据
      TopMusic:[],
      tag:[
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
      ],
      currentIndex:0

    };
  },
  //在数据更新是重新调取
  updated(){
         this.offset =(this.page-1)*10
         this.getPlayMusicList()
  },
  created(){
           this.getMusicList()
           this.getPlayMusicList()
  },
  methods: {
    //点击事件
    btnclick(item,index){
            this.currentIndex =index,
            this.cat =item,
              this.getMusicList()
           this.getPlayMusicList()
           this.page=1
    },
    handleCurrentChange(val) {
      this.page =val
      
      
    },
    //获取顶部的数据
    getMusicList(){
        getMusicData(this.cat).then(res=>{
          this.TopMusic =res.playlists[0]
         
        })
    },
    //获取列表歌单数据
    getPlayMusicList(){
      getPlayMusicData(this.cat,this.offset).then(res=>{
        this.MusicList =res.playlists
        this.total =res.total
     
      })
    },
     toPlayMusic(id){
           this.$router.push('/playlist?q='+id)
           }
  }
};
</script>

<style >

</style>
