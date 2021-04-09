import {request} from './request'

export function getMVtData(id,offset) { 
    return request({
        url: "/comment/mv",
        params: {
            id,
            offset
        }
    })
}
