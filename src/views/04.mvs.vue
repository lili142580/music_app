<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title " v-for="(item1,index1) in tag" :key="index1" :class="{active:currentIndex===index1}" @click="btnclick1(item1,index1)">{{item1}}</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title " v-for="(item2,index2) in types" :key="index2" :class="{active:currentIndex1===index2}" @click="btnclick2(item2,index2)">{{item2}}</span>
          </li>
          
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title " v-for="(item3,index3) in orders" :key="index3" :class="{active:currentIndex2===index3}" @click="btnclick3(item3,index3)">{{item3}}</span>
          </li>
        
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item"  v-for="(item,index) in mvList" :key="index" @click="toMv(item.id)"> 
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
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
  </div>
</template>

<script>
import {getMvListData} from '../nextwork/mvs'
export default {
  name: 'mvs',
  data() {
    return {
      currentIndex:0,
      currentIndex1:0,
      currentIndex2:0, 
      tag:[
        "全部",
        "内地",
        "港台",
        "欧美",
        "日本",
        "韩国",
      ],
      types:[
        "全部",
        "官方版",
        "原声",
        "现场版",
        "网易出品",
      ],
      orders:[
        "上升最快",
        "最热",
        "最新",
      ],
      //mv数据
      mvList:[],
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      area:"全部",
      type:"全部",
      order:"上升最快",
      offset:0
    };
  },
  beforeUpdate(){
       this.offset =(this.page-1)*10
        this.getMvList()
  },
  created(){
    
            this.getMvList()
  },
  methods: {
    getMvList(){
      getMvListData(this.type,this.area,this.order,this.offset).then(res=>{
          this.mvList= res.data
          //处理播放量
          for( let i =0;i<this.mvList.length;i++){
            if(this.mvList[i].playCount>100000){
              this.mvList[i].playCount =parseInt(this.mvList[i].playCount/10000) + '万'
            }
          }
          if(res.count){
            this.total = res.count
          }
               
      })
    },


    handleCurrentChange(val) {
        this.page =val
      
    },
    btnclick1(item1,index1){
      this.currentIndex =index1
      this.area = item1
      this.getMvList()
      this.page=1
    },
    btnclick2(item2,index2){
      this.type = item2
      this.getMvList()
      this.currentIndex1 =index2
      this.page=1
    },
    btnclick3(item3,index3){
      this.order=item3
      this.getMvList()
      this.currentIndex2 = index3
      this.page=1
    },
     toMv(id){
           this.$router.push('/mv?q='+id)
           }
  }
};
</script>

<style >

</style>
