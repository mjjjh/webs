import { request } from "@/utils";


//文生图
function textToImg(params = {}){
    return request({
        method:"post",
        url:"/workbench/generateImage",
        data:params
    })
}



//获取图片
function getImageShow(params = {}){
    return request({
        method:"get",
        url:"/workbench/getImage",
        params:params,
        responseType:"arraybuffer"
    })
}

export default {
    textToImg,
    getImageShow
}