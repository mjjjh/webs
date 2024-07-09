import apis from "@/api";
//类型声明




//api的类型
declare module Mapi{
    type Tapi = typeof apis;
}

// /////////////////////////////////
//模型和帖子类型
declare module MmodelsPost{
    interface IhomeFuncs {
        title:string,
        name:string,
        type?:string,
        pic_path:string,
        author:string,
        username:string,
        rate:string,
        active:string
    }
    
    interface Iresponse {
        code:number,
        data:IhomeFuncs[],
        message:string
    }

}


///////////////////////////////////////
//路径分类
declare module Mpath {
    
    interface Ipath {
        [UrlPath:string]:string
    }

    //侧边栏
    const funs = ["首页","模型","帖子"] as const;

    type Tfuns = typeof funs[number];
    type TfunsPath = {
        [key in Tfuns] :string
    }
    
    //风格
    const style = ["real","eranimation","tfD","national","game"] as const;
    type Tstyle = typeof style[number];
    type TstylePath = {
        [key in Tstyle]:string
    }


    // 不同风格的标签导航名
    type TstyleNav = {
        [key in Tstyle]:string[];
    }
}

//生成图片参数
declare module MimageParams {
    interface ItToImageInfo {
        client_id:string,
        promptP:string,
        promptN:string,
        checkpoints:string,
        lora:string | null,
        embedding:string | null,
        vaeValue:string,
        picWidthValue:number,
        picHeightValue:number,

        sampleAlgorithmValue:string,
        sampleNumValue:number,
        sampleCFGValue:number,
        sampleSeedValue:number,

        fixMode:boolean,
        fixMethodValue?:string,
        enlargeValue?:number,
        highFixSample?:number,
        highFixRenoise?:number
    }
}


//socket数据
declare module MsocketRes {
    interface IstatusRes {
        exec_info:{
            queue_remaining:number
        }
    }
    interface IoutImage {
        filename:string,
        subfolder:string,
        type:string
    }
    interface IoutImageList {
        images:IoutImage[]
    }
    interface IsocketRes {
        type:string,
        data:{
            sid?:string,
            status?:IstatusRes,
            node?:string,
            prompt_id?:string,
            value?:number,
            max?:number,
            output?:IoutImageList
        }
    }
    // const a : IsocketRes = {
    //     data:{
    //         output:{
    //             images:[{filename}]
    //         }
    //     }
    // }
}


