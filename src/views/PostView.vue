<template>
    <!-- 帖子 -->
    <h2>帖子</h2>
    <!-- <h3>{{ modelSelect?.modelSelect }}</h3> -->
    <!-- <slot name="searchModel"></slot> -->
    <!-- sssssssssssss -->

    <!-- 导航栏 -->
    <div class="AI-D-modelNav">
        <div class="AI-D-NNN">   
            <el-button class="AI-D-navElement" type="primary" round color="#181818" v-for="item,index in postNav" :key="index" :plain="!(clickDownIndex == index)" @click="handleBtnNav(index)">{{item}}</el-button>
        </div>
        <div class="navBar"></div>
    </div>
    <div>
        <!-- {{ postNav[clickDownIndex] }} -->
        <OneShow :oList="getInfosStore.Posts">
            <template #icon1>
                <i class="iconfont icon-dianzan iconhover" ></i>
            </template>
            <template #icon2>
                <i class="iconfont icon-pinglun iconhover"></i>
            </template>
        </OneShow>
    </div>

</template>

<script lang="ts" setup>
import { samllNav } from '@/config';
import { useGetInfosStore } from '@/store';
import { onMounted, ref } from 'vue';
import OneShow from '@/components/home/OneShow.vue'
import {myScrollBar} from '@/utils'

onMounted(()=>{
     //滚动条
    const element = document.querySelector<HTMLElement>('.AI-D-NNN') as HTMLElement;
    const elementB = document.querySelector<HTMLElement>('.navBar') as HTMLElement;
    
    myScrollBar(element,elementB,['--scrollbar-display','--navbar-transparent','--navbar-lfet',]);
    handleBtnNav(0);
})


//仓库行为
const getInfosStore = useGetInfosStore();

const postNav = samllNav.postNav;
const clickDownIndex = ref<number>(0);
const clickDownIndexPre = ref<number>(0);
const startCursor = ref<number>(0);
const oList = ref();
//点击获取不同数据
async function handleBtnNav(index:number){
    clickDownIndexPre.value = clickDownIndex.value;
    clickDownIndex.value = index;
    // console.log(modelNav[clickDownIndex.value],);
    
    //已经存了有数据，且没有新的筛选情况不用再发请求
    if(getInfosStore.Posts.length > 0 && clickDownIndexPre === clickDownIndex){
        oList.value = getInfosStore.Posts;
        return;
    }
    //过滤
    oList.value = await getInfosStore.getPosts({
        filter:postNav[clickDownIndex.value],
        cursor:startCursor.value,
        size:10
    })
}



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