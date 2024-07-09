<template>
    <!-- 生成图片 -->
    <div class="AI-D-createImage" v-if="useUIStore().expandFlag">
        <div class="AI-D-createImgLeft">
            <el-tabs v-model="activeName" style="height: 100%;">
                <el-tab-pane label="文生图" name="first" style="height: 100%;">
                    <ToImageInfo ref="TToP"></ToImageInfo>
                </el-tab-pane>
                <el-tab-pane label="图生图" name="second">图生图</el-tab-pane>
                <el-tab-pane label="文生动图" name="third">文生动图</el-tab-pane>
                <el-tab-pane label="SD3" name="fourth">SD3</el-tab-pane>
            </el-tabs>
            <div class="AI-D-createBtn" @click="handleBtnGenerate">
                {{ btnTitle }}
            </div>
        </div>

        <div class="AI-D-createImgRight" style="display: flex;justify-content: center;"
            v-if="!useUserStore().stateLogin">
            <el-empty image="" description="登录后查看历史记录">
                <el-button style="width: 100%;" type="primary" size="large"
                    @click="useUIStore().CloginPop(true)">登录</el-button>
            </el-empty>
        </div>
        <div v-else class="AI-D-createImgRight">
            <!-- 历史记录筛选按钮 -->
            <el-button><i class="iconfont icon-gongzuotai"></i></el-button>
            <ImageGenera :imageCreateInfos="imageCreateInfo"></ImageGenera>
        </div>
    </div>
    <div v-else class="AI-D-bigBored">
        <el-tabs v-model="activeBigName" style="height: 100%;">
            <el-tab-pane label="工作台" name="left">
                <div class="AI-D-createImage" style="display: block">
                    <div class="AI-D-createImgLeft AI-D-createImgLeft2">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="文生图" name="first" >
                                <ToImageInfo ref="TToP"></ToImageInfo>
                            </el-tab-pane>
                            <el-tab-pane label="图生图" name="second">图生图</el-tab-pane>
                            <el-tab-pane label="文生动图" name="third">文生动图</el-tab-pane>
                            <el-tab-pane label="SD3" name="fourth">SD3</el-tab-pane>
                        </el-tabs>
                    <div class="AI-D-createBtn" @click="handleBtnGenerate">
                        {{ btnTitle }}
                    </div>
                </div>
                </div>
               
            </el-tab-pane>
            <el-tab-pane label="生成列表" name="right" style="height: 100%;">
                <div class="AI-D-createImgRight" style="display: flex;justify-content: center;"
                    v-if="!useUserStore().stateLogin">
                    <el-empty image="" description="登录后查看历史记录">
                        <el-button style="width: 100%;" type="primary" size="large"
                            @click="useUIStore().CloginPop(true)">登录</el-button>
                    </el-empty>
                </div>
                <div v-else class="AI-D-createImgRight">
                    <!-- 历史记录筛选按钮 -->
                    <el-button><i class="iconfont icon-gongzuotai"></i></el-button>
                    <ImageGenera :imageCreateInfos="imageCreateInfo"></ImageGenera>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script lang="ts" setup>
import ImageGenera from '../image/ImageGenera.vue';
import ToImageInfo from '../image/ToImageInfo.vue'
import { ElMessage } from 'element-plus'
import type {MimageParams , MsocketRes} from '@/config/Type'
import {ref} from 'vue'
import { useGeneratedStore,useUserStore,useUIStore } from '@/store';
import {useWebSocket} from '@/utils'


const activeName = ref<string>('first');
const activeBigName = ref<string>('left')
// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
// }
/* 
*生成进度以及历史记录 
*/
//点击生成后把数据传入
const imageCreateInfo = ref();

// 仓库 获取
const userStore = useUserStore();

/* 
*实现文生图请求以及websocket连接
*/
//图片生成Store
const generatedStore = useGeneratedStore();


let ws:WebSocket | null = null;

//子组件ref接收的expose信息
const TToP = ref<InstanceType<typeof ToImageInfo>>();



const btnTitle = ref<string>("生成图片");
// const bckColor = ref<string>("linear-gradient(to right, #23cafe,#54e4ab)");
//可生成

const exeFlag = ref<boolean>(true);

function btnAble(){
    btnTitle.value = "生成图片";
    // bckColor.value = "linear-gradient(to right, #23cafe,#54e4ab)";
    exeFlag.value = true;
}

function btnDisAble(){
    btnTitle.value = "正在生成中";
    // bckColor.value = "linear-gradient(to right, #23cafe,#54e4ab)";
    exeFlag.value = false;
}


//生成handleBtnGenerate
function handleBtnGenerate()
{
    const status = ref<boolean>(useUserStore().stateLogin);
    if(!status.value){
        //未登录状态/先提示登录
        useUIStore().CloginPop(true);
        return;
    }
    if(!exeFlag.value) return;
    //文生图模式
    let params:MimageParams.ItToImageInfo = {} as MimageParams.ItToImageInfo;
    //clientid获取
    const client_id:string = (userStore.allUserInfo?.data.uuid) as string;
    console.log(client_id);
    if(activeName.value === "first")
    {
        //生成参数
        params = {... TToP.value,client_id:client_id} as MimageParams.ItToImageInfo;
    }
    //先传参
    console.log(params);
    if(!params.promptP)
    {
        ElMessage({
            message: '请输出正向提示词',
            type: 'error',
            plain: true,
        })
        return;
    }
    btnDisAble();
    //发送请求存数据到store中
    generatedStore.generateImage(params);
    //webSocket实例化连接
    console.log(userStore.allUserInfo);
    
    ws = useWebSocket(handleMessage,client_id,userStore.allUserInfo?.data.token as string);
    
}

const picUrl = ref<MsocketRes.IoutImage[]|undefined|null>();

function handleMessage(e:any)
{
    const _e:MsocketRes.IsocketRes = JSON.parse(e.data);
    // console.group("Socket Message");
    // console.log(_e);
    
    // console.log("消息类型： " + _e.type);
    // console.log("队列消息：" + _e.data?.status?.exec_info?.queue_remaining);
    // console.log("step: " + _e.data?.value);
    
    // console.log("图片结果：" +_e.data?.output?.images[0].filename);
    imageCreateInfo.value = {
        sid:_e.data.sid,
        type:_e.type,
        que_re: _e.data.status?.exec_info.queue_remaining,
        step: _e.data?.value,
        max:_e.data?.max,
        id:_e.data?.prompt_id
    }
    if(_e.type == "finish" && _e.data.node === "20"){
        picUrl.value = [...(_e.data?.output?.images as [])];
        // console.log(imageCreateInfo.value);
        //获取到图片关闭ws
        setTimeout(()=>{
            imageCreateInfo.value = {
                //输出节点编号
                node:_e.data.node,
                picUrlList : picUrl.value,
                type:_e.type,
                id:_e.data?.prompt_id
            }
            ws?.close();
            console.log("Socket Close");
    
            //可再次生成（按钮可点）
            btnAble();
        },1000)
    }
    // console.groupEnd();   
}











</script>

<style lang="scss" scoped>
.AI-D-createImage {
    height: 100%;
    display: flex;
    gap: 15px;

    .AI-D-createImgLeft {
        height: 100%;
        position: relative;
        background-color: #f5f5f5;
        // flex: 1;
        flex: 0 0 calc(30% - 1.5px);

        :deep(.el-tabs__content) {
            height: 85%;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                width: 12px;
                /* 滚动条宽度 */
                background-color: transparent;
                /* 滚动条背景色 */
            }

            &::-webkit-scrollbar-thumb {
                background-color: #30d1e6;
                /* 滑块颜色 */
                border-radius: 10px;
                /* 滑块圆角 */
            }
        }
        
        .AI-D-createBtn {
            position: absolute;
            bottom: -8%;
            width: 100%;
            z-index: 30;

            // height: 40px;
            background: linear-gradient(to right, #23cafe, #54e4ab);
            border-radius: 10px;
            color: #fff;
            display: flex;
            justify-content: center;
            font-size: 14px;
            font-weight: 600;
            line-height: 40px;
            cursor: pointer;
        }
    }
    .AI-D-createImgLeft2{
        :deep(.el-tabs__content) {
        height: 100%;
        overflow-y:none;

        &::-webkit-scrollbar {
            width: 0px;
            /* 滚动条宽度 */
            /* 滚动条背景色 */
        }

        &::-webkit-scrollbar-thumb {
            background-color: transparent;
            /* 滑块颜色 */
            border:none;
            /* 滑块圆角 */
        }
    }
    }
    .AI-D-createImgRight {
        // flex: 1;
        flex: 0 0 calc(70% - 1.5px);
        overflow: scroll;

        /* 隐藏滚动条 */
        &::-webkit-scrollbar {
            width: 0;
            // height: 0;
        }
    }

}


.AI-D-bigBored{
    height: 100%;
    background-color: #f5f5f5;
    :deep(.el-tabs__content) {
            height: 85%;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                width: 12px;
                /* 滚动条宽度 */
                background-color: transparent;
                /* 滚动条背景色 */
            }

            &::-webkit-scrollbar-thumb {
                background-color: #30d1e6;
                /* 滑块颜色 */
                border-radius: 10px;
                /* 滑块圆角 */
            }
        }
}


@media (max-height:570px) {
    .AI-D-createImage{
        .AI-D-createImgLeft{
            :deep(.el-tabs__content){
                height: 80%;
            }
        }
    }
}

@media (max-height:480px) {
    .AI-D-createImage{
        .AI-D-createImgLeft{
            :deep(.el-tabs__content){
                height: 75%;
            }
        }
    }
}

@media (max-height:410px) {
    .AI-D-createImage{
        .AI-D-createImgLeft{
            :deep(.el-tabs__content){
                height: 70%;
            }
        }
    }
}

@media (max-height:340px) {
    .AI-D-createImage{
        .AI-D-createImgLeft{
            :deep(.el-tabs__content){
                height: 60%;
            }
        }
    }
}

@media (max-height:290px) {
    .AI-D-createImage{
        .AI-D-createImgLeft{
            :deep(.el-tabs__content){
                height: 50%;
            }
        }
    }
}
@media (max-height:170px) {
    .AI-D-createImage{
        .AI-D-createImgLeft{
            :deep(.el-tabs__content){
                height: 20%;
            }
        }
    }
}


</style>