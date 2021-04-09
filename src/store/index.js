import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
 const store = new Vuex.Store({
        state:{
            //歌曲url地址
           Music:""
        },
        mutations:{
            //播放歌曲的url地址
            PlayMusic(state,url){
                  state.Music=url;
              }
        },
        actions:{

        }
        
 })
 export default store