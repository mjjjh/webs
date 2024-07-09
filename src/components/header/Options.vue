<template>
    <div class="AI-D-options">
        <!-- 头像姓名 -->
        <el-avatar :src="baseURL + '/' + userStore.allUserInfo?.data.avatar" />
        <span>{{ userStore.allUserInfo?.data.nickname.slice(0,10) }}</span>
        <el-card style="width: 100%" shadow="always">Always</el-card>
        <el-card style="width: 100%" shadow="hover">Hover</el-card>
        <el-card style="width: 100%" shadow="never">Never</el-card>
        <button @click="logOut">退出登录</button>
    </div>
</template>

<script lang="ts" setup>
import { baseURL } from '@/config';
import { useUserStore } from '@/store';
import { ElMessage } from 'element-plus'

const userStore = useUserStore();

function logOut(){
    userStore.logOut();
    ElMessage({
        message:"成功退出",
        type:"success",
        duration:1000
    })
}

</script>
<style lang="scss" scoped>
.AI-D-options{
    min-width: 160px;
}
</style>