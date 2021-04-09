import {request} from './request'

export function getTopSongData(type) { 
    return request({
        url: "/top/song",
        params: {
            type
            
        }
    })
}



