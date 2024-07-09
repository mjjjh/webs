import { defineStore } from "pinia";
import { ref ,inject} from "vue";
import type {Mapi,MmodelsPost} from "@/config/Type"





//主页数据来源
export const useHomeStore = defineStore('Home',() => {
    const $api = inject<Mapi.Tapi>("$api");
    const Models = ref<MmodelsPost.IhomeFuncs[]>();
    const Posts = ref<any>();

    //获取模型数据api
   async function getModels(params:any):Promise<MmodelsPost.IhomeFuncs[]>
   {
        Models.value = (await $api?.getInfos.getModels(params))?.data;
        // console.group("模型数据");
        // console.log(Models.value);
        // console.groupEnd();
        return new Promise((resolve,reject)=>{
            resolve(Models.value as MmodelsPost.IhomeFuncs[]);
        })
   }

   //获取模型数据api
   async function getPosts(params:any)
   {      
        Posts.value = (await $api?.getInfos.getPosts(params))?.data;
        // console.group("帖子数据");
        // console.log(Posts.value);
        // console.groupEnd();
        return new Promise((resolve,reject)=>{
            resolve(Posts.value);
        })
   }

   const ModelsPosts = [Models.value,Posts.value];
   const getModelPost = [getModels, getPosts];

    return {
        ModelsPosts,
        getModelPost
    }
})