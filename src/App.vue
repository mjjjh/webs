<script setup lang="ts">
import { ref } from 'vue';
import { useUIStore } from './store';
import Header from './views/HeaderView.vue'
import LeftMenuView from './views/LeftMenuView.vue';

const UIstore = useUIStore();

</script>

<template>
  <div class="AI-D-body">
    <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-divider />
    <el-container>
      <el-aside :width='UIstore.expandFlag ? "250px":"100px"' class="AI-D-Anima" >
      <nav class="AI-D-leftslid">
          <LeftMenuView></LeftMenuView>
      </nav>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
    </el-container>
  </el-container>
  </div>
  
</template>

<style>
.AI-D-body{
  /* height: 100vh; */
  /* overflow: auto; 
  scrollbar-gutter:auto; */
}
.AI-D-leftslid{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

a {
  text-decoration: none;
}

.AI-D-Anima {
  transition:width ease 0.5s;
}
</style>
