<template>
    <!-- 生成图片的模板 -->
    <div v-for="item,index in srcList" :key="index">
        <div id="picsShow">
            <p>
                时间 + id
            </p>
            <p v-if="index === srcList.length - 1">
                生成状态:{{ imageCreateInfo.imageCreateInfos?.type }}
                <div v-if="imageCreateInfo.imageCreateInfos?.que_re"> 
                    前面还有{{ imageCreateInfo.imageCreateInfos?.que_re }}人
                </div>
            </p>
            
            <!-- 生图完成触发 -->
            <!-- <div v-if="imageCreateInfo.imageCreateInfos?.type === 'finsih'">
                {{ addPicshow()}}   
            </div> --> 
            <div style="position: relative; width: 200px;height: 200px;">
                    <!-- v-if="imageCreateInfo.imageCreateInfos?.type == 'progress'" -->
                <div v-if="index === srcList.length - 1 && imageCreateInfo.imageCreateInfos?.type === 'progress'" style="position: absolute;z-index: 100;">
                    <el-progress type="dashboard" :percentage="percentGene" width="200">
                        <template #default="{percentage}">
                            <p>生成中</p>
                            <p>{{ percentage}}%</p>
                        </template>
                    </el-progress>
                    <!-- 生成进度：{{ percentGene}}%  -->
                </div>
                <el-image 
                    @error="handleErrorOne(index)"
                    style="width: 100%; height: 100%"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="item"
                    :src="item[0]"
                    :initial-index="4"
                    fit="cover"
                    lazy
                >
                <template #error>
                    <div style="background-color: #fff;">
                    </div>
                </template>
            </el-image>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import pic from "@/assets/pictures/Logo.png"
import type {MsocketRes,Mapi} from '@/config/Type'
import { computed, inject, ref, watchEffect, } from "vue";
import { imageUrl } from "@/config/server";
import { httpGetImageUrl } from "@/utils";
import basePic from './ll'


const $api = inject<Mapi.Tapi>("$api");


//图片数量

let srcList = ref<string[][]>([]);

interface Props {
    imageCreateInfos:{
        sid?:string,
        node?:string,
        id?:string,
        type?:string,
        que_re?:string,
        step:number,
        max?:number,
        picUrlList?:MsocketRes.IoutImage[]
    }|undefined
}

const imageCreateInfo = withDefaults(defineProps<Props>(),{
    // imageCreateInfos : ((props: Props) => {
    //     type:"";
    //     max : 1;
    //     step : 1;
    // })
})



const percentGene = computed(() => 
    (imageCreateInfo.imageCreateInfos?.step as number / (imageCreateInfo.imageCreateInfos?.max as number) * 100).toFixed(2)
);

const showPics = computed(()=> imageCreateInfo.imageCreateInfos?.picUrlList?.reduce((sum,next)=>{ return sum += next.filename;},"") );


let add_empty:boolean = true;
let finsh_first:boolean = true;
watchEffect(()=>{
    //只一次出现sid，表示开始执行
    if(imageCreateInfo.imageCreateInfos?.sid){
            console.log("开始绘制");
            srcList.value.push([]);
    }
    //工作流中19号节点为低画质输出 20为高清
    if(imageCreateInfo.imageCreateInfos?.type === 'finish' && imageCreateInfo.imageCreateInfos.node === "20" ){
            addPicshow();
    }
})

const picError = ref<boolean>(false);
function handleErrorOne(index:number){
    console.log("failed on this pic");
    
    picError.value = true;
}


function addPicshow(){
    // console.log("picinfo:",showPics.value);
    // for(let i in srcList){
    //     if(!srcList[i][0]){
    //         srcList.pop();
    //     }
    // }
    
    if(showPics.value)
    {
        const _param = {
            filename:showPics.value
        }
        
        new Promise((resolve,reject)=>{
            const imgURL = httpGetImageUrl(_param);
            resolve(imgURL) 
        }).then((res) =>{
            const _url:string = res as string;
            
            document.querySelector("#iiii")?.setAttribute('src',_url);
            if(picError){   
                srcList.value.pop();
                const one = [_url];
                srcList.value.push(one)
                picError.value = false;
            }
        })
        
        // picNow = _url;


    }

}


</script>

<style lang="scss" scoped>

</style>