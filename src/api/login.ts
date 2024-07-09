import { request } from "@/utils";
import type {IloginInfo} from 'MuserLoginInfo'
import type {IallUserInfo} from 'MuserInfos'
//用户注册登录
function userLogin(param:IloginInfo):Promise<IallUserInfo>{
    return request({
        method:"post",
        url:"/phone_login",
        data:param
    })
}



export default {
    userLogin
}