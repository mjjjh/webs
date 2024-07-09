import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore('UI',() => {
    // 侧边栏展开标志
    let expandFlag = ref<boolean>(true);
    function CexpandFlag(val:boolean){ expandFlag.value = val }

    // //登录弹窗
    let loginPop = ref<boolean>(false);
    function CloginPop(val:boolean){ loginPop.value = val;console.log(loginPop.value);}
    

    //

    return {
        expandFlag,
        CexpandFlag,
        loginPop,
        CloginPop
    }
})