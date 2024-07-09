import axios from "axios";
import { baseURL } from "@/config";
import { cookiesOptions } from ".";
import { ElMessage } from 'element-plus'

//网络请求服务
const request = axios.create({
    baseURL:baseURL,
    timeout:3000
})

// request.defaults.withCredentials = true;

request.interceptors.request.use(
    function(config)
    {
        //发送请求前做些什么
        
        //每次请求判断登录状态来决定
        const cookies = cookiesOptions.judgeLoginStatus();
        if(cookies) config.headers["token"] = cookies;
        return config;
    },
    function(error)
    {
        //请求错误
        return Promise.reject(error);
    }
)


request.interceptors.response.use(
    function(response)
    {
        //对相应数据做些什么
        // console.log(response);
        // console.log(response);
        
        return response.data;
    },
    function(error)
    {
        //响应未登录
        if(error.request.status === 401){
            cookiesOptions.deleteCookie('token');
            localStorage.clear();
            ElMessage({
                message:"当前未登录或登录已过期，请重新登录",
                type:"error",
                duration:1000
            })
        }
        return Promise.reject(error);
    }
)

export default request;