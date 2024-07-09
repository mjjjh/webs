<template>
    <!-- 主页模块 -->
    <div style="margin-bottom: 100px;">
        <h2 style="margin: 40px 0 20px; font-weight: 600;font-size: 32px;">
            <slot name="title">
            </slot>
        </h2>
        
        <OneShow :oList="funcs">
            <template #icon1>
                <slot name="icon1"></slot>
            </template>
            <template #icon2>
                <slot name="icon2"></slot>
            </template>
        </OneShow>

        <div class="AI-D-moduleBottom">
            <el-button round style="width: 100%;height: 100%;font-size: 24px; font-weight: 600;" @click="handleToMenu">查看所有<slot name="title"></slot></el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, toRefs } from 'vue';
import router from '@/router';
import { useHomeStore } from '@/store';
import { baseURL } from '@/config';
import type {MmodelsPost} from "@/config/Type"
import OneShow from './OneShow.vue';
// 组件内部请求各部分数据
const funcName = defineProps<{
    fTitle:{
        path:string,
        index:number,
        name:string
    }
}>()
const homeStore = useHomeStore();

const funcs = ref<MmodelsPost.IhomeFuncs[]>([]);

onMounted(async ()=>{
    // console.log(getInfosStore.ModelsPosts[funcName.fTitle.index]);
    
    //有数据就不请求
    if(homeStore.ModelsPosts[funcName.fTitle.index]) {
        funcs.value = homeStore.ModelsPosts[funcName.fTitle.index];
        return;
    }
    // 否则
    //请求存到useHomeStore
    funcs.value = await homeStore.getModelPost[funcName.fTitle.index]({
        cursor:0,
        size:7
    }) as MmodelsPost.IhomeFuncs[];
    
    // InitHomePic();
})




// 使用 computed 来创建一个只包含前八个元素的响应式引用
// const firstEightFuncs = computed(() => getInfosStore.Models.slice(0, 7));

//底部跳转
function handleToMenu(){
    // localStorage.setItem("LeftItem",funcName.fTitle.index as any);
    // UIstore.CleftClickindex(funcName.fTitle.index);
    // console.log(`路径/${funcName.fTitle.index}`);
    
    router.push(`/${funcName.fTitle.path}`);
}

function numFormat(num:string)
{
    const _num = Number(num);
    return _num >= 1000 ? `${(_num/1000).toFixed(2)}k`:_num; 
}

</script>
<style lang="scss" scoped>
 .AI-D-homeModule{
    width: 100%;
    display: grid;
    grid-template-rows: repeat(2,1fr);
    grid-template-columns: repeat(2,1fr);
    gap: 16px;
    .AI-D-anounce{
        border: 1px solid rgba(0,0,0,.06);
        border-radius: 8px;
    }
    .AI-D-moduleChild{
        border: 1px solid rgba(0,0,0,.06);
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        color: white;
        transition-duration: .15s;
        cursor: pointer;
        
        .AI-D-moduleType{
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 10;
            background: rgb(84, 78, 69);
            border-radius: 16px;
            padding: 3px 8px;

        }
        .AI-D-modulePic{
            aspect-ratio: 3/4;
            // height: 100%;
            // width: 100px;
            // height: 100%;
            overflow: hidden;
            .AI-D-Pics{
                height: 100%;
                width: 100%;
                object-fit: cover;
                object-position: center top;
                transition-duration: 0.15s;
            }
        }
        &:hover{
            box-shadow: 0 0 transparent,
                        0 0 transparent,
                        0 4px 16px rgba(0,0,0,.06 );
            border-color: rgba(0,0,0,.12);
            .AI-D-Pics{
                scale: 1.08;
            }
        }
        .AI-D-moduleName{
            font-weight: 600;
            line-height: 20px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
        }
        .AI-D-moduleUser{
            padding: 5px;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;

            .AI-D-moduleIcon{
                display: flex;

                gap:4px;
            }
        }
            
    }
 }
 .AI-D-moduleBottom {
    width: 85%;
    height: 48px;
    margin: 40px auto;
    line-height: 24px;
 }
@media (min-width: 768px){
    .AI-D-homeModule-C{
        grid-template-columns: repeat(3,1fr);
    }
}
@media (min-width: 1024px){
    .AI-D-homeModule-C{
        grid-template-columns: repeat(4,1fr);
    }
}


</style>