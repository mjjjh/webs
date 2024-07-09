<template>
    <!-- 主页 -->
    <div class="AI-D-home">
        <!-- 顶部的功能栏 -->
        <TopFun class="AI-D-top AI-D-top-4 AI-D-top-3" v-model:popFlage="popFlage_">
            <template #item="funcs" >
                <div class="AI-D-top-child">
                    <div class="AI-D-top-icon" :style="'background-color:' + funcs.background">
                        <i :class='["iconfont "+ funcs.icon,"AI-D-icon"]' ></i>
                    </div>
                    <div class="AI-D-top-name">
                        <div class="AI-D-otext-1">
                            {{ funcs.name }}
                        </div>
                        <div class="AI-D-otext-1"> 
                            {{ funcs.describe }}
                        </div>
                    </div>
                </div>
            </template>
        </TopFun>
        
        <!-- 弹出绘图框 -->
            <div class="AI-D-Pop">
                <el-dialog
                v-model="popFlage_"
                width="95%" 
                top="1%"
                :close-on-click-modal="false"
                :show-close="false"
                style="height: 90%;border-radius: 10px;background-color: #f5f5f5;"
            >
                    <template #header="{close}">
                        <div class="AI-D-my-header">
                            <el-button type="danger" @click="close">Close</el-button>
                        </div>
                    </template>
                    <CreateImage ></CreateImage>
            </el-dialog>
            </div>
            
        
            
        
        <HomeFuncs v-for="item,index in funcListTitle" :key="index" :fTitle="item">
                <template #title>
                    {{ item.name }}
                </template>
                <template #icon1>
                    <i class="iconfont icon-dianzan" ></i>
                </template>
                <template #icon2>
                    <i class="iconfont" :class='index?"icon-pinglun":"icon-yunhang"' ></i>
                </template>
            </HomeFuncs>
        
    </div>
</template>

<script lang="ts" setup>
import TopFun from '@/components/home/TopFun.vue';
import HomeFuncs from '@/components/home/HomeFuncs.vue';
import CreateImage from '@/components/home/CreateImage.vue'
import { ref} from 'vue';

const funcListTitle = [
    {path:"module",index:0,name:"模型"},
    {path:"posts",index:1,name:"帖子"}
]


let popFlage_ = ref<boolean | undefined>(false);






</script>
<style lang="scss" scoped>
.AI-D-home {

    .AI-D-top {
        width: 100%;
        display: grid;
        gap: 20px;
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 10px;
        grid-template-columns: repeat(2,minmax(0,1fr));

        .AI-D-top-child {
            display: flex;
            height: 80px;
            border: 1px solid #e2e2e2;
            border-radius: 10px;
            background-color:#fff ;
            padding: 12px;
            gap: 8px;
            align-items: center;
            .AI-D-top-icon{
                padding:5px 12px;
                // margin-left: 10px;
                // justify-self:center;
                border-radius: 8px;
                .AI-D-icon{
                    font-weight: 700;
                    font-size:x-large;
                }
            }
            .AI-D-top-name{
                display: flex;
                flex-direction: column;
                font-weight: 500;
                gap: 4px;
                :nth-child(2){
                    font-size: 12px;
                }
            }
        }

    }
    .AI-D-Pop{
        :deep(.el-dialog__body){
            height: 90%;
        }
    }

}
    
.AI-D-otext-1{
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
}

.AI-D-my-header{
    position:absolute;
    right: 10px;;
}


// .AI-D-createImage{
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     translate: -50% -50%;
// }

@media (min-width: 768px){
    .AI-D-home{
        .AI-D-top-3{
            grid-template-columns:  repeat(3, minmax(0, 1fr));
        }
    }

}
@media (min-width: 1024px){
    .AI-D-home{
        .AI-D-top-4{
            grid-template-columns: repeat(4,1fr);
        }
    }
}

</style>