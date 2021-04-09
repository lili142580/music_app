import {request} from './request'

export function getMvData() { 
    return request({
        url: "/personalized/mv",
        params: {
            
        }
    })
}
