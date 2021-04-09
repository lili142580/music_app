import {request} from './request'

export function getSongData() { 
    return request({
        url: "/personalized/newsong",
        params: {
        
        }
    })
}


export function getPlayMusicData(id) { 
    return request({
        url: "/song/url",
        params: {
            id
        }
    })
}
