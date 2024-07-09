import { defineStore } from "pinia";
import { ref ,inject} from "vue";
import type {Mapi,MmodelsPost} from "@/config/Type"



//全部数据来源
export const useGetInfosStore = defineStore('GetInfos',() => {
    const $api = inject<Mapi.Tapi>("$api");
    const Models = ref<MmodelsPost.IhomeFuncs[]>([]);
    const Posts = ref<MmodelsPost.IhomeFuncs[]>([]);

    //获取模型数据api
   async function getModels(params:any)
   {
        
        let {cursor,size,filter} = params;
        if(filter === "全部")
        {
            Models.value = [];
            cursor = 0;
            size = size + 10;
        }
        if(filter === "模型")
        {
            Models.value = [];
            cursor = cursor + 4;
        }
        console.log(cursor,size);
        const _data = await $api?.getInfos.getModels({
            cursor,
            size
        }) as MmodelsPost.Iresponse;
        console.log(_data);
        
        Models.value?.push(..._data?.data);
        // console.group("模型数据");
        // console.log(Models.value);
        // console.groupEnd();
        return new Promise((resolve,reject)=>{
            console.log(Models.value);
            
            resolve(Models.value);
        })
   }

   //获取帖子数据api
   async function getPosts(params:any)
   {      

        let {cursor,size,filter} = params;
        //对数据进行筛选判断
            //////////.............../////////////
        //
        const _post = await $api?.getInfos.getPosts({
            cursor,
            size
        }) as MmodelsPost.Iresponse;
        Posts.value = _post.data;
        // console.group("帖子数据");
        // console.log(Posts.value);
        // console.groupEnd();
        return new Promise((resolve,reject)=>{
            resolve(Posts.value);
        })
   }

   

    return {
        Models,
        getModels,
        Posts,
        getPosts   
    }
})