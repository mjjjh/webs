<template>
    <div>
        <!-- <el-scrollbar max-height="500px" > -->
        <div class="AI-D-TI">
            <div>
                <!-- 图生图的插槽 -->
                <slot name="ptp"></slot>
            </div>
            <!-- 提示词模块 -->
            <div class="AI-D-module-prompt">
                <h4 style="display: flex;align-items: center;gap: 10px;">提示词 <i class="iconfont icon-gongzuotai"></i>
                </h4>
                <div style="padding:0 10px;">
                    <el-input v-model="promptP" :autosize="{ minRows: 7 }" type="textarea" placeholder="Please input" />
                </div>
                <div style="display: flex;align-items: center;gap: 10px;">反向提示词<i class="iconfont icon-gongzuotai"></i>
                </div>
                <div style="padding:0 10px;">
                    <el-input v-model="promptN" :autosize="{ minRows: 4 }" type="textarea" placeholder="Please input" />
                </div>
            </div>

            <!-- 模型选择弹窗 -->
            <el-dialog top="5vh" width="80%" v-model="modleSelectFlag">
                <div class="AI-D-modelPop">
                    <ModuleView 
                    :modelSelect="generateModleTypeSelect"
                    @note-model-select-finish="closeModelPop"
                     >
                        <template #searchModel>
                            <el-input></el-input>
                        </template>
                    </ModuleView>
                </div>

            </el-dialog>
            <!-- 模型选择模块 -->
            <div class="AI-D-module-model">
                <h4>模型</h4>
                <div class="AI-D-model">
                    <div class="AI-D-model-select" @click="handleModleSelect('checkpoint')">
                        <div
                            style="position: absolute;top:0;left: 1px; border-radius: 18px 10px 10px 0;padding: 4px 8px;font-size: 10px;background-color: #fff">
                            基础模型</div>
                        <div style="aspect-ratio: 3/4;width: 64px; border-radius: 5px; overflow:hidden;">
                            <img style="width: 100%;height: 100%;object-fit: cover;object-position: center top;" :src="checkpointPic" alt="" >
                        </div>
                        <div style="flex: 1;display: flex;gap: 10px;">
                            <div class="AI-D-text">{{ checkpoint }}</div>
                            <i class="iconfont icon-gongzuotai"></i>
                        </div>
                        <div>
                            <i class="iconfont icon-gongzuotai"></i>
                        </div>
                    </div>
                    <div class="AI-D-model-detail">
                        <div style="grid-area: a;" class="AI-D-smallModel" @click="handleModleSelect('lora')">添加LoRA(风格)
                        </div>
                        <div style="grid-area: b;" class="AI-D-smallModel" @click="handleModleSelect('embedding')">
                            添加Embdding</div>
                        <div style="grid-area: c;" class="AI-D-smallModel" @click="handleModleSelect('controlnet')">
                            添加ControlNet</div>

                        <div style="grid-area: d;">
                            <span style="display: flex;align-items: center;gap: 10px;">VAE<i
                                    class="iconfont icon-gongzuotai"></i></span>
                            <el-select v-model="vaeValue" placeholder="请选择Vae">
                                <el-option v-for="item in vaeList" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 设置模块，生成的配置信息 -->
            <div class="AI-D-module-option">
                <h4>设置</h4>
                <div class="AI-D-option">
                    <!-- 图片大小 -->
                    <div style="padding:0 10px">
                        <span>图片大小</span>
                        <div class="AI-D-size">
                            <div v-for="item,index in picSize" :key="index" @click="handleSizeSelect(index)"
                                class="AI-D-picSize" :class="{'AI-D-btnDown': picSizeIndex== index}">
                                <i :class='"iconfont " + item.icon'></i>
                                {{ item.size[0] }}{{ item.size[1] }}{{ item.size[2] }}
                            </div>
                        </div>
                        <div v-if="customFlag">
                            <div style="margin: 10px 0;">
                                <div>
                                    <span>宽</span>
                                    <el-slider v-model="picHeightValue" show-input :max="1536" />
                                </div>
                                <div>
                                    <span>高</span>
                                    <el-slider v-model="picWidthValue" show-input :max="1536" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 采样算法 -->
                    <div class="AI-D-sample">
                        <div style="grid-area: a;">
                            <span style="display: flex;align-items: center;gap: 10px;">采样算法(Sample)<i
                                    class="iconfont icon-gongzuotai"></i></span>
                            <el-select v-model="sampleAlgorithmValue" placeholder="请选择采样算法">
                                <el-option v-for="item in sampleAlgoList" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <!-- 采样次数 -->
                        <div style="grid-area: b;font-size: 13px;">
                            <span>采样次数</span>
                            <div class="AI-D-slide">
                                <el-slider v-model="sampleNumValue" :max="60" size="small" show-input
                                    :show-input-controls="false" />
                                <!-- <input type="text" v-model="sampleNumValue"> -->
                            </div>

                        </div>
                        <!-- 采样CFG -->
                        <div style="grid-area: c; font-size: 13px;">
                            <span>提示词相关性(CFG Scale)</span>
                            <div class="AI-D-slide">
                                <el-slider v-model="sampleCFGValue" :max="30" size="small" show-input
                                    :show-input-controls="false" />
                                <!-- <input type="text" v-model="sampleCFGValue"> -->
                            </div>
                        </div>
                        <!-- 随机种子 -->
                        <div style="grid-area: d;display: flex;flex-direction: column;gap: 10px;">
                            <span>随机种子(Seed)</span>
                            <el-input v-model="sampleSeedValue" placeholder="请输入种子" :disabled="seedUse">
                                <template #suffix>
                                    <i class="iconfont icon-Random-yes"
                                        :style="'margin-left: 10px;cursor: pointer;'+'color:'+ randomColor"
                                        @click="handleRandom"></i>
                                </template>
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="AI-D-module-highFix">
                <div style="display: flex;justify-content: space-between;align-items: center">
                    <h4 style="display: flex;align-items: center;gap: 10px;">高清修复<i
                            class="iconfont icon-gongzuotai"></i></h4>
                    <el-switch v-model="fixMode" />
                </div>
                <div v-if="fixMode" class="AI-D-highFixDetail">
                    <div style="grid-area: a;">
                        <span>放大倍数(从 {{picHeightValue}}x{{ picWidthValue}} 到 {{picHeightValue * enlargeValue}}x{{
                            picWidthValue * enlargeValue}} )</span>
                        <div class="AI-D-highFix">
                            <div v-for="item,index in multi" :key="index" @click="handleenlargeSelect(index)"
                                :class="{'AI-D-btnDown': enlargeIndex == index}">
                                {{ item }}x
                            </div>
                        </div>
                    </div>

                    <div style="grid-area: b;">
                        <span style="display: flex;align-items: center;gap: 10px;">修复方式<i
                                class="iconfont icon-gongzuotai"></i></span>
                        <el-select v-model="fixMethodValue" placeholder="请选择高清修复方式">
                            <el-option v-for="item in fixMethodList" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div style="grid-area: c;">
                        <span>高清修复采样次数</span>
                        <div class="AI-D-slide">
                            <el-slider v-model="highFixSample" :max="60" size="small" show-input
                                :show-input-controls="false" />
                            <!-- <input type="text" v-model="sampleCFGValue"> -->
                        </div>
                    </div>
                    <div style="grid-area: d;">
                        <span>重绘噪声强度</span>
                        <div class="AI-D-slide">
                            <el-slider v-model="highFixRenoise" :max="1" size="small" :step="0.1" show-input
                                :show-input-controls="false" />
                            <!-- <input type="text" v-model="sampleCFGValue"> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- </el-scrollbar> -->
    </div>
</template>

<script lang="ts" setup>
import { useGeneratedStore } from '@/store';
import {ref} from 'vue';
import ModuleView from '@/views/ModuleView.vue';
import { baseURL } from '@/config';
import pic from '@/assets/pictures/Logo.png'
import {sampleMethods} from '@/config';


//提示词
const promptP = ref<string>();
const promptN = ref<string>();

//模型xxmix9realisticsdxl_v10.safetensors
const checkpoint = ref<string>("v1-5-pruned-emaonly.ckpt");
    
//lora
const lora = ref<string | null>("None");

//embedding
const embedding = ref<string | null>(null);

//vae选择
const vaeValue = ref('Baked VAE')

//图片宽高
const picHeightValue = ref<number>(512);
const picWidthValue = ref<number>(512);

//采样设置
const sampleAlgorithmValue = ref<string>("dpmpp_2m_sde_gpu");

const sampleNumValue = ref<number>(25);
const sampleCFGValue = ref<number>(7);

//随机种子
const sampleSeedValue = ref<number | null>(-1);
const randomColor = ref<string>("#50d0e5");
const seedUse = ref<boolean>(true);
function handleRandom()
{
    if(randomColor.value === "#50d0e5")
    {
        randomColor.value = "#a8abb2";
        sampleSeedValue.value = null;
        seedUse.value = false;
    }
    else 
    {
        randomColor.value = "#50d0e5";
        sampleSeedValue.value = -1;
        seedUse.value = true;
    }
}

interface Iselect {
    value:string,
    label:string
}

//采样方式
const sampleAlgoList:Iselect[] = sampleMethods.reduce((sum,next)=>{
    sum.push({
        value:next,
        label:next
    })
    return sum;
},[] as Iselect[]) 


const generatedStore = useGeneratedStore();
//模型选择处理
const checkpointPic = ref<string>(`${baseURL}/resource/model_pic/xxmix9realistic_v40.png`);
const modleSelectFlag = ref<boolean>(false);
const generateModleTypeSelect = ref<string>("");
//类型
function handleModleSelect(modelSelect:string)
{
    modleSelectFlag.value = true;
    console.log("模型选择:",modelSelect);
    generateModleTypeSelect.value = modelSelect;
}

function closeModelPop(){
    modleSelectFlag.value = false;
    checkpoint.value = `${generatedStore.checkpointSelect?.name as string}.safetensors`;
    // lora.value = generatedStore.loraSelect?.name as string;
    embedding.value = generatedStore.embeddingSelect?.name as string;
    checkpointPic.value = `${baseURL}/${generatedStore.checkpointSelect?.pic as string}`;
}

// function getModelNameCallback(modelName:string){
//     //checkpoint选择
//     if(generateModleTypeSelect.value === "checkpoint"){
//         checkpoint.value = modelName;
//     }else if(generateModleTypeSelect.value === "lora"){
//         //lora选择
//     }else if(generateModleTypeSelect.value === "embedding"){
//         //embedding选择
//     }
// }




//vae
const vaeList = [
  {
    value: 'Baked VAE',
    label: 'Baked VAE',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]



interface IpicSize {
    icon:string,
    size:((number | string)[] | string)
}

//图片大小选择
const picSize:IpicSize[]= [
    {
        icon:"icon-a-Screen3and4",
        size:[512,"x",512]
    },
    {
        icon:"icon-a-Screen16and9",
        size:[1280,"x",720]
    },
    {
        icon:"icon-a-Screen1",
        size:[1024,"x",1024]},
    {
        icon:"icon-shebeizidingyi-",
        size:"自定义"
    }
]
const picSizeIndex = ref<number>(0);
const customFlag = ref<boolean>(false);


//图片尺寸选择
function handleSizeSelect(val:number){
    console.log(val);
    picSizeIndex.value = val;
    if(val == 3)
    {
        customFlag.value = true;
    }
    else{
        customFlag.value = false;
        picWidthValue.value = picSize[val].size[0] as number;
        picHeightValue.value = picSize[val].size[2] as number;
    }
}




//高清修复
//高清修复模型
const fixMethodValue = ref<string>("4x-UltraSharp.pth");
const fixMode = ref<boolean>(false);
const enlargeValue = ref<number>(1);
const enlargeIndex = ref<number>(0);
const multi = [1,1.5,2,3,4];

const highFixSample = ref<number>(25);
const highFixRenoise = ref<number>(0.5);

function handleenlargeSelect(val:number){
    enlargeValue.value = multi[val];
    enlargeIndex.value = val;
}

const fixMethodList:Iselect[] = [
    {
        value: '4x-UltraSharp.pth',
        label: '4x-UltraSharp.pth',
    },
    {
        value:"BSRGAN.pth",
        label:"BSRGAN.pth"
    },
    {
        value:"ESRGAN_4x.pth",
        label:"ESRGAN_4x.pth"
    },
    {
        value:"RealESRGAN_x4plus.pth",
        label:"RealESRGAN_x4plus.pth"
    },
    {
        value:"RealESRGAN_x4plus_anime_6B.pth",
        label:"RealESRGAN_x4plus_anime_6B.pth"
    },
    {
        value:"SwinIR_4x.pth",
        label:"SwinIR_4x.pth"
    }
];


defineExpose({
        promptP,
        promptN,
        checkpoint,
        lora,
        embedding,
        vaeValue,
        picWidthValue,
        picHeightValue,

        sampleAlgorithmValue,
        sampleNumValue,
        sampleCFGValue,
        sampleSeedValue,

        fixMode,
        fixMethodValue,
        enlargeValue,
        highFixSample,
        highFixRenoise
})



</script>
<style lang="scss" scoped>
.AI-D-TI{
    height: 100%;
    display: flex;
    flex-direction: column;
    // overflow: scroll;
    // column-gap: 10px;
    // margin-bottom: 10vh;
        [class^="AI-D-module-"]{
            // height: 500px;
            margin: 10px;
            padding: 10px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            gap: 10px;
            border-radius: 10px;
            box-shadow: 0 4px 16px rgba(0,0,0,.04 );
    }
    .AI-D-modelPop{
        height: 80vh;
        overflow-y: scroll;
    }
    .AI-D-model{
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding:0 10px;
        cursor: pointer;
        .AI-D-model-select{
            width: 100%;
            height: 100px;
            // background-color: aqua;
            border: 1px solid #c0c4cc;
            border-radius: 20px;
            padding: 12px;
            display: flex;
            gap: 10px;
            align-items: center;
            position: relative;
            &:hover{
                    border-color: #50d0e5;
                }
            .AI-D-text{
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                word-break: break-all;
    }
        }
        .AI-D-model-detail{
            display: grid;
            grid-template: repeat(3,1fr) / 1fr 1fr;
            grid-template-areas: "a b"
                                "c c"
                                "d d";
            gap: 10px;
            
            .AI-D-smallModel{
                border: 1px solid #c0c4cc;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: 600;
                &:hover{
                    border-color: #50d0e5;
                }

            }
        }
    }
    .AI-D-option{
        .AI-D-size{
            display: grid;
            grid-template-columns: repeat(4,1fr);
            
            .AI-D-picSize{
                display: flex;
                flex-direction: column;
                align-items: center;
                color:#606266;
        }
        
        >:nth-child(n)
        {
            border: 1px solid #c0c4cc;
        }
        >:nth-child(1)
        {
            border-radius: 10px 0 0 10px;
        }
        >:last-child{
            border-radius: 0 10px 10px 0;
        }
            .AI-D-btnDown{
                color: #50d0e5;
                border-color: #50d0e5;
                border-width: 2px;
                box-shadow:3px 3px 5px #888888;
                transition: box-shadow .3s ease;
            }
        }
    }
    .AI-D-sample{
        display: grid;
        grid-template: repeat(3,1fr) / repeat(2,1fr);
        grid-template-areas:"a a"
                            "b c"
                            "d d";
        gap:10px;
        padding: 10px;
    }
    .AI-D-module-highFix{
        .AI-D-highFix{
            width: 100%;
            display: grid;
            align-items: center;
            text-align: center;
            grid-template-columns: repeat(5,1fr);
            >:nth-child(n)
            {
                border: 1px solid #c0c4cc;
            }
            >:nth-child(1)
            {
                border-radius: 10px 0 0 10px;
            }
            >:last-child{
                border-radius: 0 10px 10px 0;
            }
            .AI-D-btnDown{
                color: #50d0e5;
                border-color: #50d0e5;
                border-width: 2px;
                box-shadow:1px 2px 2px #888888;
                transition: box-shadow .3s ease;
            }
        }
        .AI-D-highFixDetail{
            display: grid;
            gap: 10px;
            padding:0 10px;
            grid-template: repeat(3,1fr) / repeat(2,1fr);
            grid-template-areas: "a a"
                                "b b"
                                "c d";
        }
    }
}



.AI-D-slide{
    :deep(.el-slider)
    {
        display: grid;
        gap: 3px;
        grid-template-columns: repeat(8,1fr);
        .el-slider__runway{
            margin-right: 0;
            grid-column: 1 / 4;
        }
        .el-input-number{
            width: auto;
            grid-column: 5/8;
        }
    }

    
}
</style>


