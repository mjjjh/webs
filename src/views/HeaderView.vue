<template>
    <!-- 头部 -->
    <div class="headerview">
        <Header></Header>
    </div>
    <el-backtop :right="100" :bottom="100" />
</template>

<script setup lang="ts">
import Header from '@/components/header/Header.vue';
import { cookiesOptions } from '@/utils';
import { useUserStore } from '@/store';
import { onMounted } from 'vue';

const userStore = useUserStore();

onMounted(()=>{

    
})
</script>
<style scoped>
.headerview{
    width: 100%;
}
</style>