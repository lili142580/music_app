<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="List.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{List.name}}</p>
        <div class="author-wrap">
          <img class="avatar" :src="List.creator.avatarUrl" alt="" />
          <span class="name">{{List.creator.nickname}}</span>
          <span class="time">{{List.updateTime}}创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul >
            <li v-for="(item,index) in List.tags" :key="index">{{item}}</li>
            
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc"
            >{{List.description}}</span
          >
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
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
            <tr class="el-table__row" v-for="(item1,index1) in List.tracks" :key="index1" @click="pl(item1.id)">
              <td>{{index1+1}}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item1.al.picUrl" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item1.name}}</span>
                    <span class="iconfont icon-mv" v-if="item1.mv!=0" ></span>
                  </div>
                  
                </div>
              </td>
              <td>华晨宇</td>
              <td>{{item1.al.name}}</td>
              <td>06:03</td>
            </tr>
          
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">精彩评论<span class="number">({{comment}})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item3,index3) in hotList" :key="index3">
              <div class="icon-wrap">
                <img :src="item3.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item3.user.nickname}}</span>
                  <span class="comment">{{item3.content}}</span>
                </div>
                <div class="re-content" v-if="item3.beReplied.length!==0">
                  <span class="name">{{item3.beReplied[0].user.nickname}}</span>
                  <span class="comment">{{item3.beReplied[0].content}}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">最新评论<span class="number">({{hot}})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item4,index4) in commentList" :key="index4">
              <div class="icon-wrap">
                <img :src="item4.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item4.user.nickname}}</span>
                  <span class="comment">{{item4.content}}</span>
                </div>
                <div class="re-content" v-if="item4.beReplied.length!==0">
                  <span class="name">{{item4.beReplied[0].user.nickname}}</span>
                  <span class="comment">{{item4.beReplied[0].content}}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
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
          :page-size="5"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getPlayMusicData} from '../nextwork/newsong'
import { getHotData,getHotListData} from '../nextwork/hot'
import {getPlistData} from '../nextwork/playlist'
export default {
  name: 'playlist',
  data() {
    return {
      List:[],
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //热门评论
      hotList:[],
      //热门评论的个数
      comment:0,
      //热门评论的个数
      hot:0,
      //最新评论
      commentList:[],
      offset:0
    };
  },
 created(){
        this.getPlist()
       
 },
  methods: {
    //分页效果
    handleCurrentChange(val) {
      this.offset = (this.page-1)*10
      this.page = val
      this.getPlist()
    },
    getPlist(){
      const id = this.$route.query.q
      const type = 2
      getPlistData(id).then(res=>{
          this.List =res.playlist
          console.log(res);
         
      })
      //获取热门评论
      getHotData(id,type).then(res=>{
                this.hotList =res.hotComments
                this.comment = res.total
                
      })
     //获取最新评论 
      getHotListData(id,this.offset).then(res=>{
        this.commentList = res.comments
          this.hot =res.total
          this.total =res.total
        

      })
    },
    pl(id){
          getPlayMusicData(id).then(res=>{ 
              //获取到歌的url地址
                const url = res.data[0].url
                 //将数据存储到通过Vuex传过去
                   this.$store.commit('PlayMusic',url)
               })
    },
   /* toMv(id){
      this.$router.push('/mv?q='+id)
    }*/
  },
};
</script>

<style >

</style>
