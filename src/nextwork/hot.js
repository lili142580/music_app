import {request} from './request'

export function getHotData(id,type) { 
    return request({
        url: "/comment/hot",
        params: {
            id,
            type
        }
    })
}

export function getHotListData(id,offset) { 
    return request({
        url: "/comment/playlist",
        params: {
            id,
            limit:20,
            offset
        }
    })
}
