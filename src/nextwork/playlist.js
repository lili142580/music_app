import {request} from './request'

export function getPlistData(id) { 
    return request({
        url: "/playlist/detail",
        params: {
            id
        }
    })
}
