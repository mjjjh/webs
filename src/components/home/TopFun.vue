<template>
    <div class="AI-D-TopFun">
        <div v-for="item,index in homeFunList" :key="index" style="cursor: pointer;"  @click="handlehomeTop(index)">
            <slot name="item" v-bind="item"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface IfunDescribe {
    icon:string,
    name:string,
    describe:string
    background:string
}

const homeFunList = ref<IfunDescribe[]>([
    {
        icon:"icon-gongzuotai",
        name:"经典工作台",
        describe:"文生图、图生图",
        background:"#e9faff"
    },
    {
        icon:"icon-liuchengguanli-",
        name:"工作流模式",
        describe:"ComfyUI在线生图",
        background:"#fdf3e5"
    },
    {
        icon:"icon-tuichu-",
        name:"上传模型",
        describe:"便捷上传",
        background:"#deebff"
    },
    {
        icon:"icon-chanpingongzuotai",
        name:"在线训练",
        describe:"轻松制作模型",
        background:"#f3e8f8"
    }
]);


const popFlage = defineModel<boolean | undefined>("popFlage");


//点击事件
function handlehomeTop(val:number)
{
    if(val == 0)
    {
        popFlage.value = true;
    }
}

</script>
<style lang="scss" scoped>

</style>