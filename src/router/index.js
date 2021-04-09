import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入对应的路由

const discovery =()=>import('../views/01.discovery')
const playlists =()=>import('../views/02.playlists')
const songs =()=>import('../views/03.songs')
const mvs =()=>import('../views/04.mvs')
const result =()=>import('../views/05.result')
const playlist =()=>import('../views/06.playlist')
const mv =()=>import('../views/07.mv.vue')


const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/discovery'
    },
    {
      // 发现音乐
      path: '/discovery',
      component: discovery
    },
    {
      // 推荐歌单
      path: '/playlists',
      component: playlists
    },
    {
      // 推荐歌单
      path: '/playlist',
      component: playlist
    },
    {
      // 最新音乐
      path: '/songs',
      component: songs
    },
    {
      // 最新音乐
      path: '/mvs',
      component: mvs
    },
    // mv详情
    {
      path: '/mv',
      component: mv
    },
    // 搜索结果页
    {
      path: '/result',
      component: result
    }
  ]
})
export default router