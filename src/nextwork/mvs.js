import {request} from './request'

export function getMvListData(type,area,order,offset) { 
    return request({
        url: "/mv/all",
        params: {
            type,
            area,
            order,
            limit:28,
            offset
        }
    })
}
