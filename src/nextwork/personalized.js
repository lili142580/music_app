import {request} from './request'

export function getPRoedData() { 
    return request({
        url: "/personalized",
        params: {
            limit:10
        }
    })
}
