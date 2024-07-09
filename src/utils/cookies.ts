import { useUserStore } from "@/store";

// 设置cookie的操作
function setCookie(name:string,value:string,Days:number)
{
    const date = new Date();
    //Days*24*60*60*1000
    date.setTime(date.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ value + ";expires=" + date.toUTCString();
}

//读取cookies
function getCookie(name:string) {
    const cookieArr = document.cookie.split("; ");
    // console.log(cookieArr);
    
    const cookie = cookieArr.find(function (c) {
        return c.startsWith(name + "=");
    });

    if (cookie) {
        return cookie.split('=')[1];
    }
    return null;
}


//删除cookies
function deleteCookie(name:string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}


/**
 * 根据cookies判断状态
 * 存放/清除Pinia数据
 */
function judgeLoginStatus():string | null{
    const userStore = useUserStore();
    //检测是否登录，内存赋值
    const cookies = getCookie('token');
    //没有cookies删除用户信息
    if(!cookies){
        localStorage.clear();
    }else {
        //页面刷新，状态重新获取
        //有cookies
        if(localStorage.getItem('_alluserinfos')){
            const _userInfo = localStorage.getItem('_alluserinfos') as string;
            userStore.assignAllUserInfo(_userInfo);
        }
        userStore.stateLogin = true;
    }
    return cookies;
}




export default {
    setCookie,
    getCookie,
    deleteCookie,
    judgeLoginStatus
}