import {request} from '../request'

export function getTagesData(){
     return request({
         url:"/playlist/highquality/tags"
     })
}

 export function getMusicData(cat){
      return request({
          url:"/top/playlist/highquality",
          params: {
             limit:10,
             cat
        }
      })
 }

 
 export function getPlayMusicData(cat,offset){
    return request({
        url:"/top/playlist",
        params: {
           limit:10,
           offset,
           cat
      }
    })
}
