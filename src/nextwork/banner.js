import {request} from './request'

export function getBannerData() { 
    return request({
        url: "/banner",
        params: {
             type: 0
        }
    })
}
