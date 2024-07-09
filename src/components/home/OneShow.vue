<template>
    <div class="AI-D-homeModule AI-D-homeModule-C">
            <div class="AI-D-anounce" v-if="$route.name === '/'">
                <el-carousel trigger="click" style="height: 100%;">
                    <el-carousel-item v-for="item in 2" :key="item" >
                        <img loading="lazy" class="AI-D-Pics" src="https://bfs.esheep.com/bfs/aikobo-bfs/activity/851dc272db04cdca93a894f7892cfc67d6225a0d.png@640w_480h_1c.avif" alt="">
                        <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div v-for="item, index in allParts.oList" :key="index" class="AI-D-moduleChild" @click="handleBtnModelIndex(item.name,item.pic_path)">
                <div class="AI-D-moduleType" v-if="item.type"><span>{{ item.type }}</span></div>
                <div class="AI-D-modulePic">
                    <div style="height: 100%;width: 100%;">
                        <img loading="lazy" class="AI-D-Pics" :src="baseURL + '/' +item.pic_path" alt="">
                    </div>
                </div>
                <div style="padding: 8px;background-color: #ffffff;color: #000;">
                    <div class="AI-D-moduleName">
                        {{ item.name }}{{ item.title }}
                    </div>
                    <div class="AI-D-moduleUser">
                        {{ item.author }}
                        {{ item.username }}
                        <div style="display: flex;gap: 8px;justify-content: end;">
                            <div class="AI-D-moduleIcon" @click="btnhandleUpVote([item.name,item.title,index])">
                                <div class="iconhover" >
                                    <i v-if="isInUpVote(index)" class="iconfont icon-dianzan1" style="color: red;"></i>
                                    <div v-else>
                                        <slot name="icon1"></slot>
                                    </div>
                                </div>
                                {{ numFormat(item.rate,isInUpVote(index))}}
                            </div>
                            <div class="AI-D-moduleIcon"  @click="btnhandleRunComment([item.name,item.title])">
                                <div class="iconhover">
                                    <slot name="icon2"></slot>
                                </div>
                                {{ numFormat(item.active) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script lang="ts" setup>
import type {MmodelsPost} from "@/config/Type"
import { baseURL } from '@/config';
import { ref} from "vue";

// 组件内部请求各部分数据
const allParts = defineProps<{
    oList:MmodelsPost.IhomeFuncs[]
}>()

//发送选择的模型名字
const emit = defineEmits<{
    getModelInfoToGenerate:[modelInfos:{name:string,pic:string}]
}>();

function handleBtnModelIndex(name:string,pic:string){
    emit('getModelInfoToGenerate',{
        name,
        pic
    });
}



const upVote = ref<number[]>([]);


// 点赞传递
function btnhandleUpVote(partName:(string | number )[]){
    //已点赞再次点击说明取消点赞
    const indexToRemove = partName[2];
    if(isInUpVote(partName[2] as number)){
        upVote.value = upVote.value.filter((val)=> val !== indexToRemove);   
        return;
    }
    //发送请求
    //帖子根据title,[1]
    // console.log(partName[1]);
    // if(partName[0]){
    //     //模型请求
    // }
    // if(partName[1]){
    //     //帖子请求
    // }
    upVote.value.push(partName[2] as number);
    
}

//判断点赞的模块是否已经点赞
function isInUpVote(index:number):boolean{
    return upVote.value.includes(index);
}

//运行/评论
function btnhandleRunComment(partName:string[]){
    // partName.slice()
}


function numFormat(num:string,isUp:boolean = false)
{
    let _num = Number(num);
    if(isUp){
        _num++;
    }
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
    .AI-D-Pics{
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center top;
        transition-duration: 0.15s;
    }
    .AI-D-anounce{
        border: 1px solid rgba(0,0,0,.06);
        border-radius: 8px;
        // min-width: 200px;
        &:deep(.el-carousel__container){
            height: 100%;
        }
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
                align-items: center;
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

.iconhover{
    display: flex;
    align-items: center;
    transition-duration: .3s;
    &:hover{
        scale: (1.5);
    }
}
</style>