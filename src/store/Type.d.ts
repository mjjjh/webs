
///用户返回的数据信息
declare module 'MuserInfos' {
    interface IuserData {
        avatar:string
        nickname:string
        phone:string
        token:string
        username:string
        uuid:string
    }
    export interface IallUserInfo{
        code:Number
        data:IuserData
        message:string
    }
}
