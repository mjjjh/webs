import { defineStore } from "pinia";
import { ref,inject } from "vue";
import { cookiesOptions } from "@/utils";
import type {Mapi} from '@/config/Type'
import type {IallUserInfo} from 'MuserInfos'
import type {IloginInfo} from 'MuserLoginInfo'

export const useUserStore = defineStore('User',() => {
    const $api = inject<Mapi.Tapi>("$api");
    //用户是否登录 true:登录 false:未登录
    const stateLogin = ref<boolean>(false);

    //用户信息
    const allUserInfo = ref<IallUserInfo>();

    //获取用户信息 登录
    async function CallUserInfo(param:IloginInfo){
        const infos = await $api?.userLogin.userLogin(param);
        console.log(infos);
        if(infos?.message === "登录成功"){
            allUserInfo.value = infos;
            stateLogin.value = true;
            //这是登录token一天时效
            cookiesOptions.setCookie("token",infos.data.token,1);
            //保存信息
            localStorage.setItem('_alluserinfos',JSON.stringify(allUserInfo.value));
        }
    }
    function assignAllUserInfo(param:string){
        allUserInfo.value = JSON.parse(param);
    }

    //退出登录
    function logOut(){
        stateLogin.value = false;
        cookiesOptions.deleteCookie("token");
        localStorage.clear();
    }

    return{
        stateLogin,
        allUserInfo,
        CallUserInfo,
        assignAllUserInfo,
        logOut
    }

})