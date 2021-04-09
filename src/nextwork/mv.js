import {request} from './request'
export function getGETmVData(id) { 
    return request({
        url: "/mv/url",
        params: {
            id,
        }
    })
}
export function getSimiData(mvid) { 
    return request({
        url: "/simi/mv",
        params: {
            mvid,
        }
    })
}

export function getDetailData(mvid) { 
    return request({
        url: "/mv/detail",
        params: {
            mvid,
        }
    })
}

export function getArtistslData(id) { 
    return request({
        url: "/artist/detail",
        params: {
            id,
        }
    })
}




