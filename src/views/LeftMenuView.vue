<template>
    <RouterLink :to=item v-for="item,key,index in Funpath" :key="index"><LeftMenu :class="{clickActive:index == leftIndex}">
        <template #icon>
            <i :class='"iconfont "+ icon[index]' style="font-size: 25px;"></i>
        </template>
        <template #title>
            <div>
                {{key}}
            </div>
        </template>
    </LeftMenu></RouterLink>
    <div style="margin: 10px 0;">
        <el-tag type="primary" color="#fff" style="margin: 2px 10px;">分区</el-tag> 
    </div>
    <RouterLink :to='"/style/" + key' v-for="item,key,index in stylepath" :key="index"><LeftMenu :class="{clickActive:index + 10 == leftIndex}">
        <template #icon>
            <i :class='"iconfont "+ icon[index + 3]' style="font-size: 25px;"></i>
        </template>
        <template #title>
            <div>
                {{item}}
            </div>
        </template>
    </LeftMenu></RouterLink>


</template>

<script lang="ts" setup>
import LeftMenu from '@/components/leftmenu/LeftMenu.vue'
import { onMounted, ref, watchEffect } from 'vue'
import {Funpath,stylepath} from '@/config'
import { useUIStore } from '@/store';
import router from '@/router';

//点击确认变色规则
const UIstore = useUIStore();
const leftIndex = ref<number>(0);
// function setActive(val:number):void{
//     leftIndex.value = val;
//     UIstore.CleftClickindex(val);
//     localStorage.setItem("LeftItem",`${val}`);
// }
onMounted(() => {
      console.log('页面已刷新，组件已挂载');
    //   // 这里可以执行页面刷新时需要的特定逻辑
    //   leftIndex.value = localStorage.getItem("LeftItem") as any;
    //   UIstore.CleftClickindex(leftIndex.value);
});




//图标
const icon:string[] = [
    "icon-shouye",
    "icon-liti",
    "icon-tupian",
    "icon-paizhao",
    "icon-erciyuan",
    "icon-a-25wei",
    "icon-erciyuan1",
    "icon-youxiyouxiji"
]

//切换实现监听
watchEffect(()=>{
    if(router.currentRoute.value.name == "/")
    {
        leftIndex.value = 0;
    }
    else if(router.currentRoute.value.name == "module")
    {
        leftIndex.value = 1;
    }
    else if(router.currentRoute.value.name == "posts")
    {
        leftIndex.value = 2;
    }
    let i = 10;
    for (let num in stylepath)
    {     
        if(router.currentRoute.value.params.type == num) 
            leftIndex.value = i;
        i++;
    }
    
})

</script>

<style scoped>
.clickActive {
    background-color: #e9faff;
    color: #41d1ff;
    border-radius: 10px;
}
</style>