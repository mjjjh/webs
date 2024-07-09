<template>
    <!-- 模型 -->
    <h2>模型</h2>
    <h3>{{ modelSelect?.modelSelect }}</h3>
    <slot name="searchModel"></slot>
    <!-- sssssssssssss -->

    <!-- 导航栏 -->
    <div class="AI-D-modelNav">
        <div class="AI-D-NNN">   
            <el-button class="AI-D-navElement" type="primary" round color="#181818" v-for="item,index in modelNav" :key="index" :plain="!(clickDownIndex == index)" @click="handleBtnNav(index)">{{item}}</el-button>
        </div>
        <div class="navBar"></div>
    </div>
    <div>
        <!-- {{ modelNav[clickDownIndex] }} -->
        <OneShow :oList="getInfosStore.Models" @get-model-info-to-generate="getModelNameCallback">
            <template #icon1>
                <i class="iconfont icon-dianzan"></i>
            </template>
            <template #icon2>
                <i class="iconfont icon-yunhang"></i>
            </template>
        </OneShow>
    </div>
</template>

<script lang="ts" setup>
import { samllNav } from '@/config';
import { useGetInfosStore,useGeneratedStore } from '@/store';
import { onMounted, ref } from 'vue';
import OneShow from '@/components/home/OneShow.vue'
import {myScrollBar} from '@/utils'

const modelSelect = defineProps<{
    modelSelect?:string
}>();

//给生图选择模块通知
const emit = defineEmits<{
    noteModelSelectFinish : [void]
}>();

//选择的模型按类型存入
const generatedStore = useGeneratedStore();
function getModelNameCallback(modelInfos:{name:string,pic:string}){
    console.log("model模块：",modelInfos);
    const _type = modelSelect.modelSelect;
    console.log(_type);
    if(_type === "checkpoint"){
        generatedStore.CcheckpointSelect(modelInfos);
    }else if(_type === "lora"){
        generatedStore.CloraSelect(modelInfos);
    }else{
        generatedStore.CembeddingSelect(modelInfos);
    }
    //告诉生图界面可以关闭弹窗
    emit("noteModelSelectFinish");
}

//仓库行为
const getInfosStore = useGetInfosStore();

const modelNav = samllNav.modelNav;
const clickDownIndex = ref<number>(0);
const clickDownIndexPre = ref<number>(0);
const startCursor = ref<number>(0);
const oList = ref();
//点击获取不同数据
async function handleBtnNav(index:number){
    clickDownIndexPre.value = clickDownIndex.value;
    clickDownIndex.value = index;
    // console.log(modelNav[clickDownIndex.value],);
    
    if(getInfosStore.Models.length > 0 && clickDownIndexPre === clickDownIndex){
        oList.value = getInfosStore.Models;
        return;
    }
    //过滤请求模型
    oList.value = await getInfosStore.getModels({
        filter:modelNav[clickDownIndex.value],
        cursor:startCursor.value,
        size:10
    })
    
    
}



onMounted(()=>{
    //滚动条
    const element = document.querySelector<HTMLElement>('.AI-D-NNN') as HTMLElement;
    const elementB = document.querySelector<HTMLElement>('.navBar') as HTMLElement;
    
    myScrollBar(element,elementB,['--scrollbar-display','--navbar-transparent','--navbar-lfet',]);

    // 第一次获取数据
    console.log(11);
    handleBtnNav(0);
})


</script>


<style lang="scss" scoped>
.AI-D-modelNav{
    --scrollbar-display: 0;
    --navbar-lfet:0;
    --navbar-transparent:0;
    overflow: scroll;
    overscroll-behavior: contain;
    -ms-scroll-chaining: contain;
    scrollbar-color: transparent transparent;
    position: relative;
    margin-top: 10px;
    .AI-D-NNN{
        display: flex;
        transform: translate(var(--scrollbar-display)); 
        transition: transform 0.4s ease;    
        .AI-D-navElement{    
            border:none;
        }
    }
    .navBar{
        position: absolute;
        width: 30%;
        height: 8px;
        background-color: rgb(127,127,127,var(--navbar-transparent));
        bottom: 0;
        left: var(--navbar-lfet);
        border-radius: 4px;
        transition: left .8s ease,background-color .4s ease;
    }
}




</style>