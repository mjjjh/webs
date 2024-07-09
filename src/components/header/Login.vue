<template>
    <div class="AI-D-login" @keyup.enter="handleLogin">
        <div class="AI-D-left" v-show="smallWindow">
            <div style="width:80px;align-self: center;">
                <img style="width: 100%;" src="@/assets/pictures/Logo.png" alt="">
            </div>
            <ul class="AI-D-intro">
                <li v-for="item,index in titleValue" :key="index">
                    <i class="iconfont icon-dui1" style="font-size: 20px;"></i>
                    {{ item }}
                </li>
            </ul>
            <h3 class="AI-D-go">马上开始绘画之旅</h3>
        </div>
        <div class="AI-D-right">
            <div v-if="loginMethods" class="AI-D-phoneLogin">
                <h2>登录</h2>
                <form>
                    <div class="AI-D-loginInfo">
                        <el-input style="width: 100%;height: 40px;" v-model="phoneValue" clearable placeholder="请输入手机号" />
                        <div style="display: flex;">
                            <el-input style="width: 70%;height: 40px;margin-right: 10px;" v-model="codeValue" clearable placeholder="请输入验证码" />
                            <el-button size="large" color="#262626" style="color: #fff;font-weight: 600;" :loading="isWaitingCode">获取验证码</el-button>
                        </div>
                    </div>
                    <el-button round size="large" color="#23caff" style="color: #fff;font-weight: 600;" @click="handleLogin">登录</el-button>
                </form>
                <div style="display: flex;flex-direction: column;gap: 18px;">
                    <small style="align-self: center;font-weight: 700;font-size: 13px;color: #c2c0c2;">登录/注册代表你同意服务与条款</small>
        
                    <!-- 微信登录 -->
                    <el-button round size="large" color="#f0f0f0" style="color: #000;font-weight: 600;height: 50px;" @click="handleLoginMethodsBtn"><i class="iconfont icon-weixin" style="color: #31b964;font-size: 25px;margin-right: 15px;"></i>微信扫码登录</el-button>
                </div>
            </div>
            <div v-else class="AI-D-phoneLogin">
                <h2>微信登录</h2>
                <div style="width:210px;align-self: center;">
                    <img style="width: 100%;" src="@/assets/pictures/Logo.png" alt="">
                </div>
                <div style="display: flex;flex-direction: column;gap: 18px;">
                    <small style=" align-self: center;font-weight: 600;font-size: 14px;">使用微信“扫一扫”关注</small>
                    <small style="align-self: center;font-weight: 700;font-size: 13px;color: #c2c0c2;">登录/注册代表你同意服务与条款</small>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref,onMounted,inject} from 'vue';
import { useUserStore } from '@/store';
import type { IloginInfo } from 'MuserLoginInfo';
import { ElMessage } from 'element-plus'
import router from '@/router';

const userStore = useUserStore();

//登录方式 true:手机登录 false:微信登录
const loginMethods = defineModel('loginMethods');

//登录弹窗
const loginPop = defineModel('loginPop');

const titleValue = ref<string[]>([
    "FREE images created",
    "Run directly online",
    "Model downloads",
    "Communication with others"
])


const smallWindow = ref<boolean>(true);
//手机号码
const phoneValue = ref<string>('');
//验证码
const codeValue = ref<string>('');
//等待验证码
const isWaitingCode = ref<boolean>(false);


//改变登录方式
function handleLoginMethodsBtn(){
    loginMethods.value = false;
    
}




//登录
async function handleLogin(){
    // 正则匹配手机号
    const regex = /^1[3-9]\d{9}$/;
    if(!regex.test(phoneValue.value)){
        ElMessage({
            message:"请输入正确的11位手机号",
            type:"error",
            duration:1000
        })
        return;
    }
    const _code = codeValue.value;
    if(!_code){
        ElMessage({
            message:"请输入正确的6位验证码",
            type:"error",
            duration:1000
        })
        return;
    }
    const param:IloginInfo = {
        phone:phoneValue.value,
        verification_code:codeValue.value
    }
    //发送login请求存入pinia
    userStore.CallUserInfo(param);
    loginPop.value = false;
}


onMounted(() => {
    
  updateVisibility();
  window.addEventListener('resize', updateVisibility);
})
//监视窗口是否小于600
const updateVisibility = () => {
  const windowWidth: number = window.innerWidth;
  if(windowWidth <= 800)
  {
    //窗口过小收缩
    smallWindow.value = false;
  }
  if(windowWidth >= 800)
  {
    //窗口大
    smallWindow.value = true;
  }
};





</script>
<style lang="scss" scoped>
ul,li{
    list-style: none;
}

.AI-D-login{
    height: 440px;
    // width: 100%;
    display: flex;
    // background-color: #56e5aa;
}
.AI-D-left{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    padding: 40px 10px 40px 25px;
    background-image:linear-gradient(to left , rgb(86 229 169),rgb(35 202 255));

    .AI-D-intro{
        display: flex;
        flex-direction: column;
        font-size: 20px;
        color: #fff;
        gap: 10px;
        white-space: nowrap;
    }
    .AI-D-go{
        align-self: center;
        color: #fff;
        text-shadow: 0px 4px 12px black;
    }
}

.AI-D-right{
    flex:1;
    margin-left: -8px;
    border-radius: 10px 0 0 10px;
    border-left: solid 10px #fff;
    .AI-D-phoneLogin{
        height: 100%;
        width: 440px;
        background-color: #fff;
        padding: 4px 18px 30px 14px;
        display: flex;
        flex-direction: column;  
        justify-content: space-evenly;
        gap: 24px;
        form{
            display: flex;
            flex-direction: column;
            gap: 30px;
            .AI-D-loginInfo{
                display: flex;
                flex-direction: column;
                gap:20px;
            }
        } 

    }
}

</style>