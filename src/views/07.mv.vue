<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="url"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img src="../assets/avatar.jpg" alt="" />
          </div>
          <span class="name">{{mvdetail.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvdetail.name}}</h2>
          <span class="date">发布：2014-11-04</span>
          <span class="number">播放：{{mvdetail.playCount}}</span>
          <p class="desc">
            {{mvdetail.desc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number"></span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,index) in hotcomment" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length!==0">
                <span class="name">{{item.beReplied[0].user.nickname}}</span>
                <span class="comment">{{item.beReplied[0].content}}</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">最新评论<span class="number"></span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item1,index1) in comment" :key="index1">
            <div class="icon-wrap">
              <img :src="item1.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item1.user.nickname}}</span>
                <span class="comment">{{item1.content}}</span>
              </div>
              <div class="re-content" v-if="item1.beReplied.length!==0">
                <span class="name">{{item1.beReplied[0].user.nickname}}</span>
                <span class="comment">{{item1.beReplied[0].content}}</span>
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
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item,index) in mvid" :key="index"> 
            <div class="img-wrap">
              <img :src="item.cover" alt=""   />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount}}</div>
              </div>
              <span class="time">{{item.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getGETmVData,getSimiData,getDetailData} from '../nextwork/mv'
import {getMVtData} from '../nextwork/commentMV'
export default {
  name: 'mv',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      url:'',
      //相关推荐
      mvid:[],
      //mv详细
      mvdetail:[],
      //歌手id
     // iid:0
     //热门评论
     hotcomment:[],
     //最新评论
     comment:[],
     offset:0
    };
  },
  created(){
   this.getGETmVList() 
   //this.getSongList()
   
  
  },
  methods: {
    handleCurrentChange(val) {
      this.page =val
      this.offset = (this.page-1)*10
      this.getGETmVList()
    },
    getGETmVList(){
      const mvid = this.$route.query.q
      const id = this.$route.query.q
     // const iid = this.mvdetail.artists[0].id
      
      // 获取mv的url
      getGETmVData(id).then(res=>{
        this.url =res.data.url
      })
      //获取相关推荐的
     getSimiData(mvid).then(res=>{
       this.mvid = res.mvs
         for(let i = 0; i<this.mvid.length;i++){
          let duration = this.mvid[i].duration
          let min = parseInt(duration / 1000 / 60)
          if(min <10){
            min = '0'+min
          }
          let sec = parseInt((duration / 1000 )% 60)
          if(sec <10){
            sec = '0'+sec
          }
       
          this.mvid[i].duration = `${min}:${sec}`
        }

         for( let i =0;i<this.mvid.length;i++){
            if(this.mvid[i].playCount>100000){
              this.mvid[i].playCount =parseInt(this.mvid[i].playCount/10000) + '万'
            }
          }
     })
     //歌曲详细
     getDetailData(mvid).then(res=>{
       this.mvdetail =res.data
        //this.iid =  res.data.artists[0].id
       //console.log(this.mvdetail);
       //console.log(iid);   
     })
     getMVtData(id,this.offset).then(res=>{
       this.total =res.total
       this.hotcomment = res.hotComments
       this.comment =res.comments
       console.log(res);
     })
    },
 /*getSongList(){
    //const iid = this.mvdetail.artists[0].id
               //console.log(iid);

       getArtistslData(4292).then(res=>{
      console.log(res);
    })
 }*/
    
     
  }
};
</script>

<style></style>
