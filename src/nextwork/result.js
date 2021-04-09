import {request} from './request'

export function getSearchData(keywords,type) { 
    return request({
        url: "/search",
        params: {
            keywords,
            limit:30,
            offset:10,
            type
        }
    })
}
