import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia'

import apis from "@/api";


const app = createApp(App)

const pinia = createPinia();

//导入请求api
app.provide("$api",apis);

app.use(router).use(pinia).use(ElementPlus)

app.mount('#app')
