import { request } from "@/utils";
import type { MmodelsPost } from "@/config/Type";
//获取模型
function getModels(param = {}) : Promise<MmodelsPost.Iresponse>{
    return request({
        method:"get",
        url:"/query_model",
        params:{
            ...param
        }
    })
}



//获取帖子
function getPosts(param = {}): Promise<MmodelsPost.Iresponse>{
    return request({
        method:"get",
        url:"/query_post",
        params:{
            ...param
        }
    })
}

export default {
    getModels,
    getPosts
}