<template>
  <div class="AI-D-header">
    <!-- 图标位置 -->
    <div class="AI-D-left">
      <div @click="handleExpand">
        <i :class='"iconfont "+expandChange[iconId]' style="margin-right: 10px;font-weight: 700;font-size:x-large;"></i>
      </div>
      <div style="width: 100px; height: 50px">
        <img style="width: 100px;height: 50px;" src="@/assets/pictures/Logo.png"><img>
      </div>
    </div>
    <!--搜索部分 -->
    <!-- 所搜框 -->
    <div class="AI-D-middle">
      <div class="AI-D-mt-4">
        <el-input v-if="!isSearchBoxChange" v-model="inputsearch" style="max-width: 800px;height: 40px;"
          placeholder="搜索">
          <template #append>
            <el-button><i class="iconfont icon-sousuo"></i></el-button>
          </template>
        </el-input>
        <el-button v-else style="width:100%"><i class="iconfont icon-sousuo"></i></el-button>
      </div>
      <!-- 在线生图 -->
      <div>
        <div class="AI-D-gegeBtn">
          <i class="iconfont icon-Brushinghuabi"></i>
          <text>在线生图</text>
        </div>
      </div>
    </div>
    <div class="AI-D-right">
      <!-- 对话 -->
      <el-popover placement="bottom" title="QQ群" :width="200" :show-arrow="false"  trigger="click">
        <template #default>
          <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" />
        </template>
        <template #reference>
          <i class="iconfont icon-duihua AI-D-icon"></i>
        </template>
      </el-popover>
      <!-- 扩展 -->
      <el-popover placement="bottom" :width="200" :show-arrow="false"  trigger="hover">
        <template #reference>
          <i class="iconfont icon-yingyongzhongxin AI-D-icon"></i>
        </template>
        <template #default>
          <ul>
            <li>App</li>
            <li>资源</li>
          </ul>
        </template>
      </el-popover>
      <!-- 登录状态 -->

        <!-- 通知 -->
          <el-popover v-if="!userStore.stateLogin" placement="bottom" :show-arrow="false" :width="200" trigger="hover">
          <template #reference>
            <i class="iconfont icon-tongzhi AI-D-icon"></i>
          </template>
          <template #default>
            <ul>
              <li>App</li>
              <li>资源</li>
            </ul>
          </template>
        </el-popover>
        <!-- 头像 -->
        <el-popover v-if="userStore.stateLogin" placement="bottom" :width="300" hide-after="400" :show-arrow="false" trigger="hover">
          <template #reference>
            <el-avatar v-if="userStore.stateLogin" :src="baseURL + '/' + userStore.allUserInfo?.data.avatar" />
          </template>
          <template #default>
            <Options></Options>
          </template>
        </el-popover>
      <!-- 未登录 -->
      <el-button v-else color="#262626" round style="font-size: 14px;" @click="btnLogin">登录</el-button>
    </div>

    <!-- 登录弹窗 -->
    <div class="AI-D-pop">
      <el-dialog v-model="loginPop"
        :style="'padding: 0;width:'+ loginWidth + 'px;transition:width .7s cubic-bezier(0.2, -2, 0.8, 2);'"
        @closed="handleLoginMethodsBtn">
        <Login v-model:loginMethods="loginMethods" v-model:loginPop="loginPop"></Login>
      </el-dialog>

    </div>
  </div>


</template>

<script setup lang="ts">
import Login from './Login.vue'
import Options from './Options.vue';
import { onMounted, ref, watchEffect } from 'vue';
import { useUIStore,useUserStore} from '@/store';
import { baseURL } from '@/config';

const UIstore = useUIStore();

//搜索栏
let inputsearch = ref('');

//登录弹出
// let loginPop = ref<boolean>(false);
let loginPop = ref<boolean>(false);

watchEffect(()=>{
  loginPop.value = UIstore.loginPop;
})

//弹出框宽度
let loginWidth = ref<string>("");


//登陆方式
const loginMethods = ref<boolean>(true);

// 计算属性，根据视口宽度决定搜索框是否可见
let isSearchBoxChange = ref<boolean>(false);

onMounted(() => {
  updateVisibility();
  window.addEventListener('resize', updateVisibility);
})

//监视窗口是否小于600
const updateVisibility = () => {
  const windowWidth: number = window.innerWidth;
  isSearchBoxChange.value = windowWidth <= 500;
  if(windowWidth <= 800)
  {
    //窗口过小收缩
    iconId.value = 1;
    UIstore.CexpandFlag(iconId.value == 0);
    loginWidth.value = "450";
  }
  if(windowWidth >= 800)
  {
    //窗口大
    iconId.value = 0;
    UIstore.CexpandFlag(iconId.value == 0);
    loginWidth.value = "800";
  }
};

//展开收缩
const expandChange = ["icon-shousuo","icon-zhankai"];
let iconId = ref<number>(0);

function handleExpand(){
  iconId.value = (iconId.value + 1) % 2;
  //改变expand状态
  UIstore.CexpandFlag(iconId.value == 0);
}


const userStore = useUserStore();

//登录方式还原
function handleLoginMethodsBtn(){
  
  loginMethods.value = true;
  UIstore.CloginPop(false);
  // console.log(loginMethods.value);
  console.log(loginPop.value);
}


// 登录
function btnLogin(){
  loginPop.value = true;
}

defineExpose()

</script>


<style scoped>
.AI-D-header {
  width: 100%;
  margin:10px auto;
  display: grid;
  grid-template-columns: 2fr 5fr 2fr;
  gap: 10px;
}

.AI-D-mr {
  height: 100%;
  align-self: center;
}

.el-row {
  margin: 0 auto 20px;
  width: 100%;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.AI-D-left {
  display: flex;
  align-items: center;
}

.AI-D-middle {
  display: grid;
  grid-template-columns: 5fr 2fr;
  align-items: center;
  column-gap:20px;
}

.AI-D-right {
  justify-self:right;
  display: flex;
  gap: 20px;
  align-items: center;
}

.AI-D-gegeBtn{
  height: 40px;
  width:100%;
  min-width: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  gap: 10px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(90deg, #23caff 0%, #56e5a9 100%);
}
.AI-D-gegeBtn:hover{
  color:cyan;
}

.AI-D-icon{
  cursor: pointer;
  font-size: 28px;
}
.AI-D-icon:hover{
  color: #23caff;
}


.AI-D-pop:deep(header){
  display: none;
}
.AI-D-pop:deep(.el-dialog){
  border-radius: 10px;
  overflow: hidden;
}
</style>